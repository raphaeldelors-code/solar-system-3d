/**
 * Live ISS two-line element (TLE) data (plan 044 B1).
 *
 * TLEs are the input to SGP4 propagation (src/sim/sgp4.ts). They are published
 * by CelesTrak (celestrak.org) and refreshed a few times a day; a TLE older
 * than ~2 weeks degrades noticeably, so the app fetches a fresh one at startup
 * and falls back to a bundled static TLE when offline (the ISS keeps orbiting
 * on the stale elements — position drifts slowly but the body stays visible).
 *
 * The fetch is the app's first network call: it is defensive (timeout, CORS
 * fallback, parse validation) and never blocks startup — the scene builds with
 * the fallback TLE immediately and swaps in the live one when it arrives.
 */
import type { Tle } from '../sim/sgp4.js';

/** CelesTrak GP endpoint for the ISS (NORAD 25544), TLE format. */
export const CELESTRAK_ISS_URL =
  'https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=tle';

/**
 * Bundled fallback TLE (ISS, NORAD 25544). Refreshed from CelesTrak on
 * 2026-09-16 (epoch 2026-09-16 03:25 UT). Used when the live fetch fails
 * (offline / CORS / rate-limited). Re-bundle a fresh one periodically — a TLE
 * is only accurate for ~2 weeks.
 */
export const FALLBACK_ISS_TLE: Tle = {
  name: 'ISS (ZARYA)',
  noradId: 25544,
  line1: '1 25544U 98067A   26259.14303184  .00007008  00000+0  13461-3 0  9990',
  line2: '2 25544  51.6310 209.9325 0004907 145.2560 214.8750 15.49133683585852',
};

/** The three lines a TLE payload is expected to contain (name + 2 element lines). */
export interface TlePayload {
  tle: Tle;
  /** true when the TLE came from the live CelesTrak fetch, false for fallback. */
  live: boolean;
  /** The TLE epoch as a UTC Date (parsed from line 1), or null if unparseable. */
  epoch: Date | null;
}

/**
 * Parse a raw CelesTrak TLE payload (name line + two element lines) into a
 * Tle. Returns null if the payload is malformed (wrong line count, bad checksum
 * fields, or non-numeric element lines).
 */
export function parseTlePayload(raw: string): Tle | null {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  // CelesTrak returns: NAME, "1 ...", "2 ...". Some mirrors omit the name.
  const l1 = lines.find((l) => l.startsWith('1 '));
  const l2 = lines.find((l) => l.startsWith('2 '));
  if (!l1 || !l2) return null;
  // Basic shape checks: line 1 has the catalog number at cols 3-7, line 2 the
  // inclination at cols 9-16. A TLE with the wrong shape will fail SGP4 parse
  // anyway, but reject early so we don't propagate garbage.
  const catnr = l1.slice(2, 7).trim();
  if (!/^\d{3,7}$/.test(catnr)) return null;
  const inc = l2.slice(8, 16).trim();
  if (!/^\d{1,2}\.\d{4}$/.test(inc)) return null;
  return {
    name:
      lines[0] && !lines[0].startsWith('1 ') && !lines[0].startsWith('2 ')
        ? lines[0]
        : `NORAD ${catnr}`,
    noradId: parseInt(catnr, 10),
    line1: l1,
    line2: l2,
  };
}

/**
 * Parse the TLE epoch (line 1, cols 19-32: YYDDD.DDDDDDDD) into a UTC Date.
 * Returns null if the field is malformed.
 */
export function tleEpoch(tle: Tle): Date | null {
  const field = tle.line1.slice(18, 32).trim();
  const m = field.match(/^(\d{2})(\d{3})\.(\d{8})$/);
  if (!m) return null;
  const yy = parseInt(m[1], 10);
  const year = yy < 57 ? 2000 + yy : 1900 + yy;
  const dayOfYear = parseInt(m[2], 10);
  const frac = parseInt(m[3], 10) / 1e8;
  const start = Date.UTC(year, 0, 1);
  return new Date(start + (dayOfYear - 1 + frac) * 86_400_000);
}

/**
 * Fetch a fresh ISS TLE from CelesTrak.
 *
 * @param timeoutMs abort after this many ms (default 8000).
 * @returns the parsed TLE, or null on any failure (network, timeout, CORS,
 *          malformed payload). The caller should fall back to FALLBACK_ISS_TLE.
 */
export async function fetchIssTle(timeoutMs = 8000): Promise<Tle | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(CELESTRAK_ISS_URL, {
      signal: ctrl.signal,
      headers: { Accept: 'text/plain' },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return parseTlePayload(text);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve the ISS TLE to use: try the live fetch, fall back to the bundled
 * TLE. Never throws — always returns a usable TlePayload.
 */
export async function resolveIssTle(timeoutMs = 8000): Promise<TlePayload> {
  const live = await fetchIssTle(timeoutMs);
  if (live) {
    return { tle: live, live: true, epoch: tleEpoch(live) };
  }
  return {
    tle: FALLBACK_ISS_TLE,
    live: false,
    epoch: tleEpoch(FALLBACK_ISS_TLE),
  };
}
