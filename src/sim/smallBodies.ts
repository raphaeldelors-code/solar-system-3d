/**
 * Plan 044 B7 — named asteroids + comets.
 *
 * Turns the decorative asteroid belt into real, named, trackable bodies:
 * 17 notable asteroids (Vesta, Pallas, Bennu, Ryugu, Sedna, …) and 30
 * comets (Halley, Encke, Hale-Bopp, NEOWISE, 67P, …), each on its real
 * J2000 Keplerian orbit so it moves correctly as the user scrubs time.
 *
 * DATA SOURCE & WHY BAKED: the JPL SBDB API (ssd-api.jpl.nasa.gov/sbdb.api)
 * returns NO `Access-Control-Allow-Origin` header, so a static GitHub Pages
 * app cannot call it from the browser (same blocker as B2/B4). The data was
 * fetched live from the SBDB on 2026-09-17 and baked into
 * `src/data/smallBodies.json`. Only fields the API actually returned are
 * used. Where the SBDB returned no diameter, the radius is ESTIMATED from
 * the measured absolute magnitude H via D = 1329/√p·10^(−H/5) (documented
 * assumed albedo) or a 5 km comet-nucleus default — flagged
 * `radiusEstimated` so the info card can say so. No invented numbers.
 *
 * Kept pure + dependency-free so the mapping is unit-testable in Node.
 */
import type { BodyDefinition, OrbitalElements } from './types';
import type { FactRow } from '../render/bodyFacts';
import raw from '../data/smallBodies.json';

/** One baked small body (the SBDB record + the app's orbital elements). */
export interface SmallBody {
  id: string;
  name: string;
  /** 'asteroid' | 'comet' — display class (the SBDB orbit_class is richer). */
  kind: 'asteroid' | 'comet';
  parent: string;
  elements: OrbitalElements;
  radiusKm: number;
  /** True when radiusKm was estimated from H (not a measured diameter). */
  radiusEstimated: boolean;
  rotationHours: number | null;
  tiltDeg: number;
  color: string; // "0xrrggbb"
  color2: string; // "0xrrggbb"
  texture: 'rock' | 'ice';
  sbdb: {
    spkid: string | null;
    fullname: string | null;
    designation: string | null;
    h: number | null;
    diameterKm: number | null;
    orbitClass: string | null;
  };
}

const BODIES = raw as unknown as SmallBody[];

/** All named small bodies, in bake order (asteroids then comets). */
export const SMALL_BODIES: readonly SmallBody[] = BODIES;

/** Body ids that have a baked small-body record. */
const BY_ID = new Map(BODIES.map((b) => [b.id, b]));

export function hasSmallBody(id: string): boolean {
  return BY_ID.has(id);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace(/^0x/, ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Convert the baked small bodies into `BodyDefinition`s for the scene.
 * They use the app's `small` kind (its own compressed dot tier) and orbit
 * the Sun exactly like the planets (heliocentric J2000 elements).
 */
export function smallBodyDefinitions(): BodyDefinition[] {
  return BODIES.map((b) => ({
    id: b.id,
    name: b.name,
    kind: 'small' as const,
    parent: b.parent,
    radiusKm: b.radiusKm,
    rotationHours: b.rotationHours, // null when the SBDB has no rotation data
    tiltDeg: b.tiltDeg,
    color: hexToRgb(b.color),
    color2: hexToRgb(b.color2),
    texture: b.texture,
    elements: b.elements,
  }));
}

/**
 * SBDB fact rows for a small body, in display order. Returns [] for bodies
 * without a record (the major planets / dwarf planets use B4's `sbdbFacts`).
 * Rows are only emitted when the underlying value is present — the card must
 * never show a blank value.
 */
export function smallBodyFacts(id: string): FactRow[] {
  const b = BY_ID.get(id);
  if (!b) return [];
  const rows: FactRow[] = [];
  if (b.sbdb.fullname) rows.push({ label: 'Designation', value: b.sbdb.fullname });
  if (b.sbdb.orbitClass) rows.push({ label: 'Class', value: b.sbdb.orbitClass });
  if (b.sbdb.h !== null) rows.push({ label: 'Abs. magnitude H', value: String(b.sbdb.h) });
  if (b.sbdb.diameterKm !== null) {
    // The SBDB returns diameter in km for every body (Bennu 0.484 km, Halley
    // 11 km, Vesta 522 km) — display sub-km values in metres for readability.
    const d = b.sbdb.diameterKm;
    const km = d < 1 ? `${(d * 1000).toFixed(0)} m` : `${d.toFixed(d < 10 ? 1 : 0)} km`;
    rows.push({ label: 'Diameter', value: b.radiusEstimated ? `${km} (est.)` : km });
  } else if (b.radiusEstimated) {
    rows.push({ label: 'Diameter', value: 'not measured (est. from H)' });
  }
  if (b.sbdb.spkid) rows.push({ label: 'SPK-ID', value: b.sbdb.spkid });
  return rows;
}
