/**
 * B5 (plan 046): NASA CNEOS "Near Earth Object" feed — pure parsing.
 *
 * No DOM / three.js dependencies (runs in Node under vitest), mirroring
 * `spaceWeather.ts`. The DOM client (main.ts) fetches the CNEOS feed and
 * hands the raw JSON to `parseNeoFeed()`; the result drives a small panel
 * row ("Next close approach: 2024 YQ4 · 0.6 lunar distances · in 3d").
 *
 * CNEOS feed shape (https://api.nasa.gov/neo/rest/v1/feed):
 *   {
 *     element_count: 11,
 *     near_earth_objects: {
 *       "2026-09-18": [
 *         {
 *           name: "260277 (2004 TR12)",
 *           id: "2260277",
 *           is_potentially_hazardous_asteroid: false,
 *           estimated_diameter: { kilometers: { estimated_diameter_min, _max } },
 *           close_approach_data: [
 *             {
 *               close_approach_date_full: "2026-Sep-18 12:25",
 *               miss_distance: { kilometers: 30398631.06 },
 *               relative_velocity: { kilometers_per_second: 15.45 },
 *               orbiting_body: "earth",
 *             },
 *           ],
 *         },
 *       ],
 *     },
 *   }
 *
 * The feed is keyed by UTC day; each object lists every close approach in
 * the requested window. We want the SOONEST approach across the whole feed.
 */

export interface NeoApproach {
  /** Designation, e.g. "2024 YQ4" (the human name from CNEOS). */
  name: string;
  /** CNEOS numeric id (for the JPL link). */
  id: string;
  /** ISO date-time of the closest approach, e.g. "2026-09-18T12:25:00". */
  approachUtc: string;
  /** Miss distance in kilometres. */
  missDistanceKm: number;
  /** Relative velocity in km/s. */
  velocityKmS: number;
  /** Estimated diameter range in km (min, max). */
  diameterKm: [number, number];
  /** True if CNEOS flags it potentially hazardous. */
  hazardous: boolean;
  /** JPL small-body database URL. */
  jplUrl: string;
}

/** The soonest approach in the feed, or null if the feed is empty/invalid. */
export interface NeoFeedResult {
  soonest: NeoApproach | null;
  /** Total objects in the feed window (for the "N objects this week" line). */
  count: number;
}

const LUNAR_DISTANCE_KM = 384_400;

/**
 * Parse a CNEOS feed response into the soonest approach + object count.
 * Defensive: any malformed shape returns `{ soonest: null, count: 0 }`
 * rather than throwing — the panel row shows "—" on bad data.
 */
export function parseNeoFeed(raw: unknown): NeoFeedResult {
  if (typeof raw !== 'object' || raw === null) return { soonest: null, count: 0 };
  const feed = raw as Record<string, unknown>;
  const neo = feed.near_earth_objects;
  if (typeof neo !== 'object' || neo === null) return { soonest: null, count: 0 };

  let soonest: NeoApproach | null = null;
  let soonestMs = Infinity;
  let count = 0;

  for (const day of Object.keys(neo as Record<string, unknown>)) {
    const list = (neo as Record<string, unknown>)[day];
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      const approach = parseOne(item);
      if (!approach) continue;
      count++;
      const ms = Date.parse(approach.approachUtc);
      if (ms < soonestMs) {
        soonestMs = ms;
        soonest = approach;
      }
    }
  }
  return { soonest, count };
}

function parseOne(item: unknown): NeoApproach | null {
  if (typeof item !== 'object' || item === null) return null;
  const o = item as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name : null;
  const id = typeof o.id === 'string' ? o.id : null;
  const cad = o.close_approach_data;
  if (!name || !id || !Array.isArray(cad) || cad.length === 0) return null;
  const ca = cad[0] as Record<string, unknown>;
  const dateFull =
    typeof ca.close_approach_date_full === 'string' ? ca.close_approach_date_full : null;
  const miss = (ca.miss_distance as Record<string, unknown> | undefined)?.kilometers;
  const vel = (ca.relative_velocity as Record<string, unknown> | undefined)?.kilometers_per_second;
  if (!dateFull || typeof miss !== 'number' || typeof vel !== 'number') return null;

  // "2026-Sep-18 12:25" → "2026-09-18T12:25:00" (Date.parse wants ISO).
  const approachUtc = normalizeCneosDate(dateFull);
  if (!approachUtc) return null;

  const diam = (o.estimated_diameter as Record<string, unknown> | undefined)?.kilometers as
    Record<string, unknown> | undefined;
  const dMin = typeof diam?.estimated_diameter_min === 'number' ? diam.estimated_diameter_min : 0;
  const dMax =
    typeof diam?.estimated_diameter_max === 'number' ? diam.estimated_diameter_max : dMin;

  return {
    name,
    id,
    approachUtc,
    missDistanceKm: miss,
    velocityKmS: vel,
    diameterKm: [dMin, dMax],
    hazardous: o.is_potentially_hazardous_asteroid === true,
    jplUrl:
      typeof o.nasa_jpl_url === 'string'
        ? o.nasa_jpl_url
        : `https://ssd.jpl.nasa.gov/sbdb/dbobj/${id}`,
  };
}

/** "2026-Sep-18 12:25" → "2026-09-18T12:25:00Z". Null if unparseable.
 *  CNEOS close-approach times are UTC, so the `Z` is required — a no-offset
 *  ISO string is parsed as *local* time by Date.parse, which would shift the
 *  date by the host's UTC offset (e.g. +2 in CEST). */
function normalizeCneosDate(s: string): string | null {
  const m = s.match(/^(\d{4})-([A-Za-z]{3})-(\d{2}) (\d{2}):(\d{2})/);
  if (!m) return null;
  const months: Record<string, string> = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const mm = months[m[2]];
  if (!mm) return null;
  return `${m[1]}-${mm}-${m[3]}T${m[4]}:${m[5]}:00Z`;
}

/** Miss distance in lunar distances (1 LD = 384,400 km). */
export function toLunarDistances(km: number): number {
  return km / LUNAR_DISTANCE_KM;
}

/**
 * Human label for the panel row, e.g.
 * "2024 YQ4 · 0.6 LD · in 3d" or "2024 YQ4 · 0.6 LD · today".
 * `nowMs` is injected for testability.
 */
export function formatNeoLabel(a: NeoApproach, nowMs: number): string {
  const ld = toLunarDistances(a.missDistanceKm);
  const ldStr = ld < 10 ? ld.toFixed(1) : Math.round(ld).toString();
  const approachMs = Date.parse(a.approachUtc);
  const dtMs = approachMs - nowMs;
  // Whole-UTC-day difference (calendar days, not a ceil of the ms delta —
  // Sep-19 03:10 vs Sep-16 00:00 is "in 3d", not "in 4d").
  const daySerial = (ms: number) => {
    const d = new Date(ms);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86_400_000;
  };
  const dayDiff = Math.round(daySerial(approachMs) - daySerial(nowMs));
  let when: string;
  if (dtMs <= 0) when = 'now';
  else if (dayDiff <= 0) when = 'today';
  else if (dayDiff === 1) when = 'tomorrow';
  else when = `in ${dayDiff}d`;
  const hazard = a.hazardous ? ' ⚠' : '';
  return `${a.name}${hazard} · ${ldStr} LD · ${when}`;
}
