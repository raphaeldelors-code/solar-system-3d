/**
 * Plan 044 B6 — exoplanet system data (baked from the NASA Exoplanet Archive).
 *
 * The TAP API (exoplanetarchive.ipac.caltech.edu) has NO CORS headers, so the
 * data is baked at build time (same pattern as B2/B4). Source: `pscomppars`
 * table, confirmed planets with full Keplerian elements, curated to the 13
 * richest multi-planet systems (45 planets). Fetched 2026-09-17.
 *
 * Each planet carries the elements the Archive provides: period, semi-major
 * axis, eccentricity, inclination, longitude of perihelion (ϖ), and a mean
 * anomaly phase at the current epoch (derived from time-of-periastron). The
 * Archive's pscomppars has no node/arg-periast columns, so we render the orbit
 * in its ecliptic orientation using ϖ as the in-plane rotation — a real,
 * defensible position, not an invented one.
 */
import type { OrbitalElements } from './types';
import raw from '../data/exoplanets.json';

/** Days since J2000 at the bake epoch (2026-09-17). */
export const EXO_EPOCH_DAYS = 10000;

export interface ExoPlanet {
  name: string;
  /** Orbital period [days]. */
  P: number;
  /** Semi-major axis [AU]. */
  a: number;
  /** Eccentricity [-]. */
  e: number;
  /** Inclination [deg]. */
  i: number;
  /** Longitude of perihelion [deg]. */
  L: number;
  /** Mean anomaly at the bake epoch [rad]. */
  M0: number;
  /** Mass [Earth masses] (null if unknown). */
  M: number | null;
  /** Radius [Earth radii] (null if unknown). */
  R: number | null;
}

export interface ExoSystem {
  /** Host star name. */
  star: string;
  planets: ExoPlanet[];
}

interface RawPlanet {
  name: string;
  P: number;
  a: number;
  e: number;
  i: number;
  L: number;
  M0: number;
  M: number | null;
  R: number | null;
}
interface RawSystem {
  star: string;
  planets: RawPlanet[];
}

const rawSystems = raw as RawSystem[];

export const EXO_SYSTEMS: ExoSystem[] = rawSystems.map((s) => ({
  star: s.star,
  planets: s.planets.map((p) => ({ ...p })),
}));

/** Total confirmed planets across the curated systems. */
export const EXO_PLANET_COUNT = EXO_SYSTEMS.reduce((n, s) => n + s.planets.length, 0);

/**
 * Convert an exoplanet's baked elements to the app's `OrbitalElements` shape
 * so the existing Kepler solver (`positionAt`) can place it. Angles in degrees,
 * distances in AU, time in days since J2000.
 */
export function exoElements(p: ExoPlanet): OrbitalElements {
  return {
    a: p.a,
    e: p.e,
    i: p.i,
    // No node column in pscomppars → orbit lies in the ecliptic, rotated by ϖ.
    node: 0,
    peri: p.L,
    // Mean anomaly at the bake epoch (M0 is in radians → degrees).
    M0: (p.M0 * 180) / Math.PI,
    n: 360 / p.P,
  };
}
