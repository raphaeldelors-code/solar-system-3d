/** J2000.0 epoch: 2000-01-01 12:00:00 TT (UTC used here, ~64s drift is negligible). */
export const J2000_UTC = Date.UTC(2000, 0, 1, 12, 0, 0);

/** One Julian century. */
export const JULIAN_CENTURY_DAYS = 36525;

/** One astronomical unit in kilometres (IAU nominal). */
export const AU_KM = 1.495978707e8;

/**
 * Keplerian orbital elements (J2000 frame, heliocentric ecliptic).
 * Angles in degrees, distances in AU, time in days since J2000.
 */
export interface OrbitalElements {
  /** Semi-major axis [AU] (moons: in their own unit, see BodyDefinition). */
  a: number;
  /** Eccentricity [-]. */
  e: number;
  /** Inclination [deg]. */
  i: number;
  /** Longitude of ascending node [deg]. */
  node: number;
  /** Argument of perihelion [deg]. */
  peri: number;
  /** Mean anomaly at J2000 [deg]. */
  M0: number;
  /** Mean motion [deg/day] (= 360 / period). */
  n: number;
  /** Optional secular rates [deg/Julian century] for slow element drift. */
  rates?: { a?: number; e?: number; i?: number; node?: number; peri?: number; M0?: number };
}

export type BodyKind = 'star' | 'planet' | 'moon' | 'dwarf';

/**
 * A celestial body. The single source of truth for the whole simulation.
 *
 * Moons: `elements.a` is in **km**, and the computed position is added to the
 * parent's heliocentric position (converted via AU_TO_KM). `elements.n` is
 * still deg/day.
 */
export interface BodyDefinition {
  id: string;
  name: string;
  kind: BodyKind;
  /** Parent body id. Planets: 'sun'. Moons: their planet. */
  parent?: string;
  /** Display radius [km] (also used for true-scale rendering). */
  radiusKm: number;
  /** Rotation period [hours]; negative = retrograde. */
  rotationHours: number;
  /** Axial tilt [deg] relative to orbital plane. */
  tiltDeg: number;
  /** Surface color used by the procedural texture generator. */
  color: [number, number, number];
  /** Secondary color (bands/poles). */
  color2?: [number, number, number];
  /** Ring system (inner/outer radius multiples of body radius, opacity). */
  rings?: { inner: number; outer: number; opacity: number; color: [number, number, number] };
  /** Orbital elements. Absent for the star. */
  elements?: OrbitalElements;
  /** Texture style for the procedural generator. */
  texture?: 'gas' | 'rock' | 'ice' | 'earth' | 'sun' | 'volcanic';
}
