/**
 * SGP4 satellite propagation for the live ISS (plan 044 B1).
 *
 * The core SGP4/SDP4 algorithm is provided by the `satellite.js` package
 * (MIT-licensed, pure TypeScript, no native deps) — a maintained port of
 * Vallado's SGP4. We validated it against the authoritative Python `sgp4`
 * package (Braddock Gaskill, whose C++ backend passes Vallado's official
 * `tcppver` reference) to ~8 m over a full orbit (see tests/sgp4.test.ts).
 *
 * This module is a thin, testable wrapper that:
 *   - parses a two-line element set (TLE) into a satellite record,
 *   - propagates it to a J2000 **ecliptic** position (AU) — the same frame the
 *     planet ephemeris and the Moon use in this project,
 *   - converts the app's sim time (days from J2000, TT) to the UTC instant
 *     satellite.js expects,
 *   - samples the orbit path for the orbit line.
 *
 * All functions are pure (no DOM, no network) so they are unit-testable.
 */
import * as sat from 'satellite.js';

/**
 * Terrestrial Time (TT) minus Universal Time (UT), in seconds. The app's sim
 * clock is TT (the planet ephemeris is in TT); TLEs are referenced to UT.
 * TT − UT ≈ 69.184 s for the 2000–2100 range (fixed offset since 2006).
 */
export const TT_MINUS_UT_S = 69.184;

/** J2000.0 epoch as a UTC Date (2000-01-01 12:00:00 UT). */
export const J2000_UTC_MS = Date.UTC(2000, 0, 1, 12, 0, 0);

/** Obliquity of the ecliptic at J2000 (degrees). */
export const OBLIQUITY_J2000_DEG = 23.439281;

/** One astronomical unit in kilometres. */
export const AU_KM = 149_597_870.7;

/** A parsed two-line element set. */
export interface Tle {
  name: string;
  noradId: number;
  line1: string;
  line2: string;
}

/** A satellite record (satellite.js `SatRec`) plus its TLE provenance. */
export interface Satellite {
  satrec: sat.SatRec;
  tle: Tle;
}

/** ECI (equatorial, inertial) position + velocity in km / km·s⁻¹. */
export interface EciState {
  position: [number, number, number];
  velocity: [number, number, number];
}

/**
 * The ISS orbital period in days (~92.9 min). Used to sample one full orbit
 * for the ISS orbit line (src/render/scene.ts).
 */
export const ISS_ORBIT_PERIOD_DAYS = 0.0643;

/**
 * Parse a two-line element set into a satellite.js `satrec`.
 *
 * @throws if the TLE is malformed (satellite.js returns an error code).
 */
export function parseTle(tle: Tle): Satellite {
  const satrec = sat.twoline2satrec(tle.line1, tle.line2);
  // satellite.js 7.x does not always set `error` on a bad TLE — a malformed
  // line yields NaN orbital elements. Validate the key fields directly.
  if (
    satrec.error !== 0 ||
    !isFinite(satrec.no) ||
    !isFinite(satrec.inclo) ||
    !isFinite(satrec.ecco)
  ) {
    throw new Error(`TLE parse failed for ${tle.name} (error ${satrec.error})`);
  }
  return { satrec, tle };
}

/**
 * Convert the app's sim time (days from J2000.0, TT) to the UTC epoch
 * milliseconds satellite.js expects. Subtracts the TT−UT offset so the
 * propagation is referenced to the same UT instant the TLE epoch uses.
 */
export function simDaysToUtcMs(tDays: number): number {
  return J2000_UTC_MS + (tDays - TT_MINUS_UT_S / 86400) * 86_400_000;
}

/**
 * Rotate an ECI (equatorial) vector into the J2000 ecliptic frame.
 *
 * The ecliptic is the equator tilted by the obliquity ε about the x-axis
 * (the vernal equinox direction, which is shared by both frames). A point in
 * the equatorial frame maps to the ecliptic frame by:
 *   x' = x
 *   y' = y·cos ε − z·sin ε
 *   z' = y·sin ε + z·cos ε
 */
export function eciToEcliptic(
  v: [number, number, number],
  obliquityDeg: number = OBLIQUITY_J2000_DEG,
): [number, number, number] {
  const e = (obliquityDeg * Math.PI) / 180;
  const c = Math.cos(e);
  const s = Math.sin(e);
  const [x, y, z] = v;
  return [x, y * c - z * s, y * s + z * c];
}

/**
 * Propagate a satellite to a J2000 ecliptic position (AU) + ECI velocity.
 *
 * @returns null if propagation failed (e.g. the TLE is too old / the orbit
 *          has decayed) — the caller should hide the body rather than render
 *          a stale position.
 */
export function propagateEcliptic(
  satellite: Satellite,
  tDays: number,
): { posAu: [number, number, number]; eci: EciState } | null {
  const date = new Date(simDaysToUtcMs(tDays));
  const pv = sat.propagate(satellite.satrec, date);
  // satellite.js 7.x: a failed propagation returns null or NaN coordinates.
  if (!pv || !isFinite(pv.position.x) || !isFinite(pv.position.y) || !isFinite(pv.position.z)) {
    return null;
  }
  const eci: EciState = {
    position: [pv.position.x, pv.position.y, pv.position.z],
    velocity: [pv.velocity.x, pv.velocity.y, pv.velocity.z],
  };
  const posAu = eciToEcliptic(eci.position).map((v) => v / AU_KM) as [number, number, number];
  return { posAu, eci };
}

/**
 * Sample the satellite's orbit over one full period (geocentric ecliptic, AU)
 * for the orbit line. Points are evenly spaced in time across the period.
 *
 * @param tDays  the sim time to sample from (the orbit is ~periodic, so the
 *               start offset only rotates the line).
 * @param n      number of samples (default 128).
 */
export function orbitPath(
  satellite: Satellite,
  tDays: number,
  n = 128,
): [number, number, number][] {
  const periodMin = satellite.satrec.no ? 1440 / satellite.satrec.no : 92.9;
  const periodDays = periodMin / 1440;
  const pts: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const t = tDays + (i / n) * periodDays;
    const p = propagateEcliptic(satellite, t);
    if (p) pts.push(p.posAu);
  }
  return pts;
}
