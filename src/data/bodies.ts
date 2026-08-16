/**
 * Solar-system body data.
 *
 * Orbital elements are J2000 MEAN elements from JPL/Standish ("Approximate
 * Positions of the Planets 1800-2050"), converted to the convention used by
 * src/sim/kepler.ts:
 *   M0   = L - varpi      (mean anomaly at epoch, deg)
 *   peri = varpi - node   (argument of perihelion, deg)
 *   node = Omega          (longitude of ascending node, deg)
 *   n    = dL / dT        (mean motion, deg/day)
 * a in AU for planets; in km for moons (position offset from the parent).
 * Retrograde orbits are encoded by i > 90 deg (Triton), never by n < 0.
 *
 * Precision: good to a few 0.01 deg of longitude over a few decades —
 * plenty for a visual simulation; not an ephemeris.
 */
import type { BodyDefinition } from '../sim/types';

/** Convert 0xrrggbb to an RGB tuple for BodyDefinition.color. */
const rgb = (hex: number): [number, number, number] => [
  ((hex >> 16) & 0xff) / 255,
  ((hex >> 8) & 0xff) / 255,
  (hex & 0xff) / 255,
];

export const SUN: BodyDefinition = {
  id: 'sun',
  name: 'Sun',
  kind: 'star',
  radiusKm: 695700,
  rotationHours: 609.12, // ~25.38 days, equatorial
  tiltDeg: 7.25,
  color: rgb(0xffd27f),
  color2: rgb(0xff9d3f),
  texture: 'sun',
};

export const PLANETS: BodyDefinition[] = [
  {
    id: 'mercury', name: 'Mercury', kind: 'planet', parent: 'sun',
    elements: {
      a: 0.38709893, e: 0.20563069, i: 7.00524868,
      node: 48.33129135, peri: -23.9435788, M0: 174.79115238,
      n: 4.09233444,
    },
    radiusKm: 2439.7,
    rotationHours: 1407.5,
    tiltDeg: 0.034,
    color: rgb(0x9c9c9c),
    color2: rgb(0x77746f),
    texture: 'rock',
  },
  {
    id: 'venus', name: 'Venus', kind: 'planet', parent: 'sun',
    elements: {
      a: 0.72333199, e: 0.00677323, i: 3.39471722,
      node: 76.68021837, peri: 54.95479212, M0: 50.58151601,
      n: 1.60213034,
    },
    radiusKm: 6051.8,
    rotationHours: -5832.5, // retrograde spin
    tiltDeg: 177.36,
    color: rgb(0xe6c98a),
    color2: rgb(0xc9a86a),
    texture: 'gas',
  },
  {
    id: 'earth', name: 'Earth', kind: 'planet', parent: 'sun',
    elements: {
      a: 1.00000261, e: 0.01671123, i: -0.00001531,
      node: 0.0, peri: 102.93768193, M0: -2.47311,
      n: 0.98560912,
    },
    radiusKm: 6371.0,
    rotationHours: 23.93,
    tiltDeg: 23.44,
    color: rgb(0x4f86c6),
    color2: rgb(0x3f7d3f),
    texture: 'earth',
  },
  {
    id: 'mars', name: 'Mars', kind: 'planet', parent: 'sun',
    elements: {
      a: 1.52371034, e: 0.0933941, i: 1.84969142,
      node: 49.55953891, peri: -73.5031685, M0: 19.39019048,
      n: 0.52402078,
    },
    radiusKm: 3389.5,
    rotationHours: 24.62,
    tiltDeg: 25.19,
    color: rgb(0xc1583b),
    color2: rgb(0x8f3d28),
    texture: 'rock',
  },
  {
    id: 'jupiter', name: 'Jupiter', kind: 'planet', parent: 'sun',
    elements: {
      a: 5.20336301, e: 0.04838624, i: 1.30530838,
      node: 100.4738848, peri: 14.81452005, M0: 19.89500253,
      n: 0.08305566,
    },
    radiusKm: 69911,
    rotationHours: 9.93,
    tiltDeg: 3.13,
    color: rgb(0xd8b98d),
    color2: rgb(0xa87c50),
    texture: 'gas',
  },
  {
    id: 'saturn', name: 'Saturn', kind: 'planet', parent: 'sun',
    elements: {
      a: 9.53707032, e: 0.05386179, i: 2.48446465,
      node: 113.66242448, peri: 92.81254132, M0: 319.56276892,
      n: 0.03343968,
    },
    radiusKm: 58232,
    rotationHours: 10.66,
    tiltDeg: 26.73,
    color: rgb(0xe3d3a3),
    color2: rgb(0xbfa77a),
    texture: 'gas',
    rings: { inner: 1.24, outer: 2.27, opacity: 0.85, color: rgb(0xcfc4a6) },
  },
  {
    id: 'uranus', name: 'Uranus', kind: 'planet', parent: 'sun',
    elements: {
      a: 19.19126393, e: 0.04725744, i: 0.76986308,
      node: 74.01692503, peri: 171.65786469, M0: 145.00115509,
      n: 0.01175261,
    },
    radiusKm: 25362,
    rotationHours: -17.24, // retrograde spin
    tiltDeg: 97.77,
    color: rgb(0x9fd8e0),
    color2: rgb(0x7cc2cc),
    texture: 'ice',
    rings: { inner: 1.64, outer: 2.0, opacity: 0.25, color: rgb(0x9fb8c0) },
  },
  {
    id: 'neptune', name: 'Neptune', kind: 'planet', parent: 'sun',
    elements: {
      a: 30.06896348, e: 0.00859048, i: 1.76684385,
      node: 131.78063601, peri: 44.80244713, M0: 261.64306417,
      n: 0.00600423,
    },
    radiusKm: 24622,
    rotationHours: 16.11,
    tiltDeg: 28.32,
    color: rgb(0x4666c9),
    color2: rgb(0x2f4a9e),
    texture: 'ice',
  },
];

/**
 * Major moons. Elements are J2000 mean elements (GRE-2019 / JPL tables).
 * a in km from the parent planet; n in deg/day. Triton's retrograde orbit
 * is i = 156.74 deg (> 90 => orbits backwards).
 */
export const MOONS: BodyDefinition[] = [
  {
    id: 'moon', name: 'Moon', kind: 'moon', parent: 'earth',
    elements: {
      a: 384400, e: 0.0549, i: 5.145,
      node: 125.08, peri: 318.15, M0: 115.36,
      n: 13.06499,
    },
    radiusKm: 1737.4,
    rotationHours: 655.72, // tidally locked
    tiltDeg: 6.68,
    color: rgb(0xbdbdbd),
    color2: rgb(0x8f8f8f),
    texture: 'rock',
  },
  {
    id: 'phobos', name: 'Phobos', kind: 'moon', parent: 'mars',
    elements: {
      a: 9376, e: 0.0151, i: 1.075,
      node: 318.7, peri: 260.0, M0: 140.0,
      n: 714.9,
    },
    radiusKm: 11.27,
    rotationHours: 7.65,
    tiltDeg: 1.08,
    color: rgb(0x8a7f72),
    texture: 'rock',
  },
  {
    id: 'deimos', name: 'Deimos', kind: 'moon', parent: 'mars',
    elements: {
      a: 23460, e: 0.0003, i: 1.796,
      node: 104.4, peri: 305.6, M0: 180.0,
      n: 17.36,
    },
    radiusKm: 6.2,
    rotationHours: 30.3,
    tiltDeg: 1.78,
    color: rgb(0x9c9084),
    texture: 'rock',
  },
  {
    id: 'io', name: 'Io', kind: 'moon', parent: 'jupiter',
    elements: {
      a: 421700, e: 0.0041, i: 0.04,
      node: 150.7, peri: 36.1, M0: 190.0,
      n: 5.567,
    },
    radiusKm: 1821.6,
    rotationHours: 42.46,
    tiltDeg: 0.05,
    color: rgb(0xd9c56a),
    color2: rgb(0xb8863b),
    texture: 'volcanic',
  },
  {
    id: 'europa', name: 'Europa', kind: 'moon', parent: 'jupiter',
    elements: {
      a: 671100, e: 0.009, i: 0.47,
      node: 145.8, peri: 322.5, M0: 125.0,
      n: 3.233,
    },
    radiusKm: 1560.8,
    rotationHours: 43.45,
    tiltDeg: 0.47,
    color: rgb(0xcfc4ae),
    color2: rgb(0xa08d78),
    texture: 'ice',
  },
  {
    id: 'ganymede', name: 'Ganymede', kind: 'moon', parent: 'jupiter',
    elements: {
      a: 1070400, e: 0.0013, i: 0.2,
      node: 197.0, peri: 118.5, M0: 105.0,
      n: 2.008,
    },
    radiusKm: 2634.1,
    rotationHours: 71.94,
    tiltDeg: 0.2,
    color: rgb(0xa89c8c),
    color2: rgb(0x7d7468),
    texture: 'rock',
  },
  {
    id: 'callisto', name: 'Callisto', kind: 'moon', parent: 'jupiter',
    elements: {
      a: 1882700, e: 0.0074, i: 0.19,
      node: 308.5, peri: 332.5, M0: 35.0,
      n: 1.236,
    },
    radiusKm: 2410.3,
    rotationHours: 89.56,
    tiltDeg: 0.19,
    color: rgb(0x7d7468),
    color2: rgb(0x5c564d),
    texture: 'rock',
  },
  {
    id: 'titan', name: 'Titan', kind: 'moon', parent: 'saturn',
    elements: {
      a: 1221870, e: 0.0288, i: 0.35,
      node: 126.0, peri: 172.0, M0: 180.0,
      n: 1.387,
    },
    radiusKm: 2574.7,
    rotationHours: 15.94,
    tiltDeg: 0.35,
    color: rgb(0xd6a95a),
    color2: rgb(0xa87e3c),
    texture: 'gas',
  },
  {
    id: 'triton', name: 'Triton', kind: 'moon', parent: 'neptune',
    elements: {
      a: 354759, e: 0.000016, i: 156.74, // retrograde orbit
      node: 47.4, peri: 5.4, M0: 145.0,
      n: 5.382,
    },
    radiusKm: 1353.4,
    rotationHours: -5.88,
    tiltDeg: 156.74,
    color: rgb(0xc8bfae),
    color2: rgb(0x9c9484),
    texture: 'ice',
  },
];

export const ALL_BODIES: BodyDefinition[] = [SUN, ...PLANETS, ...MOONS];

/** Body by id (for resolving moon parents / UI). */
export function findBody(id: string): BodyDefinition | undefined {
  return ALL_BODIES.find((b) => b.id === id);
}
