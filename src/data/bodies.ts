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
 * Dwarf planets (JPL/Standish-style J2000 mean elements). a in AU.
 * Pluto's large eccentricity and 17° inclination are what make it interesting.
 */
export const DWARF_PLANETS: BodyDefinition[] = [
  {
    id: 'pluto', name: 'Pluto', kind: 'dwarf', parent: 'sun',
    elements: {
      a: 39.48211675, e: 0.2488273, i: 17.14,
      node: 110.299, peri: 113.834, M0: 14.53,
      n: 0.003964,
    },
    radiusKm: 1188.3,
    rotationHours: -153.29, // retrograde spin
    tiltDeg: 119.6,
    color: rgb(0xb8a694),
    color2: rgb(0x8f7f6e),
    texture: 'rock',
  },
  {
    id: 'ceres', name: 'Ceres', kind: 'dwarf', parent: 'sun',
    elements: {
      a: 2.7675, e: 0.0758, i: 10.594,
      node: 80.305, peri: 73.597, M0: 32.84,
      n: 0.21426,
    },
    radiusKm: 469.7,
    rotationHours: 9.07,
    tiltDeg: 3.8,
    color: rgb(0x8c8c8c),
    color2: rgb(0x6a6a6a),
    texture: 'rock',
  },
  {
    id: 'eris', name: 'Eris', kind: 'dwarf', parent: 'sun',
    elements: {
      a: 67.864, e: 0.4360, i: 44.04,
      node: 35.95, peri: 151.61, M0: 235.7,
      n: 0.001763,
    },
    radiusKm: 1163,
    rotationHours: 25.9,
    tiltDeg: 26.6,
    color: rgb(0xc4c4c4),
    color2: rgb(0x9a9a9a),
    texture: 'ice',
  },
  {
    id: 'haumea', name: 'Haumea', kind: 'dwarf', parent: 'sun',
    elements: {
      a: 43.11, e: 0.1948, i: 28.26,
      node: 122.29, peri: 239.75, M0: 202.4,
      n: 0.003482,
    },
    radiusKm: 745,
    rotationHours: 15.94,
    tiltDeg: 0,
    color: rgb(0xd8d4cc),
    color2: rgb(0xa8a49c),
    texture: 'ice',
  },
  {
    id: 'makemake', name: 'Makemake', kind: 'dwarf', parent: 'sun',
    elements: {
      a: 45.43, e: 0.1611, i: 29.0,
      node: 79.35, peri: 294.2, M0: 16.2,
      n: 0.003219,
    },
    radiusKm: 715,
    rotationHours: 22.8,
    tiltDeg: 0,
    color: rgb(0xc49a78),
    color2: rgb(0x9a7458),
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
      n: 13.17635,
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
      n: 1128.96,
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
      n: 285.16,
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
      node: 150.8, peri: 137.3, M0: 100.0,
      n: 203.494,
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
      node: 124.8, peri: 160.4, M0: 100.0,
      n: 101.375,
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
      n: 50.318,
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
      n: 21.570,
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
      node: 125.8, peri: 346.8, M0: 100.0,
      n: 22.577,
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
      n: 61.256,
    },
    radiusKm: 1353.4,
    rotationHours: -5.88,
    tiltDeg: 156.74,
    color: rgb(0xc8bfae),
    color2: rgb(0x9c9484),
    texture: 'ice',
  },
  {
    id: 'amalthea', name: 'Amalthea', kind: 'moon', parent: 'jupiter',
    elements: {
      a: 181353, e: 0.0761, i: 0.32,
      node: 206.9, peri: 271.2, M0: 200.0,
      n: 722.57,
    },
    radiusKm: 85.5,
    rotationHours: 11.96, // tidally locked
    tiltDeg: 0.32,
    color: rgb(0x8a4a3a),
    color2: rgb(0x6e3a2c),
    texture: 'rock',
  },
  {
    id: 'himalia', name: 'Himalia', kind: 'moon', parent: 'jupiter',
    elements: {
      a: 11509150, e: 0.1137, i: 28.57,
      node: 96.9, peri: 186.0, M0: 100.0,
      n: 2.131,
    },
    radiusKm: 85.0,
    rotationHours: 382.7,
    tiltDeg: 28.57,
    color: rgb(0x8c8880),
    color2: rgb(0x6a6660),
    texture: 'rock',
  },
  {
    id: 'enceladus', name: 'Enceladus', kind: 'moon', parent: 'saturn',
    elements: {
      a: 237948, e: 0.0047, i: 0.01,
      node: 272.9, peri: 130.8, M0: 200.0,
      n: 262.74,
    },
    radiusKm: 252.1,
    rotationHours: 32.89, // tidally locked
    tiltDeg: 0.01,
    color: rgb(0xe8f0f2),
    color2: rgb(0xc4d4d8),
    texture: 'ice',
  },
  {
    id: 'tethys', name: 'Tethys', kind: 'moon', parent: 'saturn',
    elements: {
      a: 294600, e: 0.0001, i: 1.09,
      node: 127.0, peri: 193.8, M0: 90.0,
      n: 225.87,
    },
    radiusKm: 531.1,
    rotationHours: 38.25, // tidally locked
    tiltDeg: 1.09,
    color: rgb(0xd8d4c8),
    color2: rgb(0xb4b0a4),
    texture: 'ice',
  },
  {
    id: 'dione', name: 'Dione', kind: 'moon', parent: 'saturn',
    elements: {
      a: 377300, e: 0.0022, i: 0.02,
      node: 117.3, peri: 127.4, M0: 200.0,
      n: 131.53,
    },
    radiusKm: 561.4,
    rotationHours: 65.69, // tidally locked
    tiltDeg: 0.02,
    color: rgb(0xc0bcb0),
    color2: rgb(0x9c988c),
    texture: 'ice',
  },
  {
    id: 'rhea', name: 'Rhea', kind: 'moon', parent: 'saturn',
    elements: {
      a: 527108, e: 0.0013, i: 0.35,
      node: 250.4, peri: 130.1, M0: 100.0,
      n: 79.68,
    },
    radiusKm: 763.8,
    rotationHours: 108.44, // tidally locked
    tiltDeg: 0.35,
    color: rgb(0xb0aca0),
    color2: rgb(0x8c8880),
    texture: 'ice',
  },
  {
    id: 'iapetus', name: 'Iapetus', kind: 'moon', parent: 'saturn',
    elements: {
      a: 3560820, e: 0.0286, i: 15.47,
      node: 213.9, peri: 198.1, M0: 200.0,
      n: 4.54,
    },
    radiusKm: 734.5,
    rotationHours: 1903.7, // tidally locked
    tiltDeg: 15.47,
    color: rgb(0x9a8a78),
    color2: rgb(0x4e4438), // dark leading hemisphere
    texture: 'rock',
  },
  {
    id: 'miranda', name: 'Miranda', kind: 'moon', parent: 'uranus',
    elements: {
      a: 129390, e: 0.0013, i: 0.10,
      node: 180.9, peri: 222.9, M0: 100.0,
      n: 254.69,
    },
    radiusKm: 235.8,
    rotationHours: 33.92, // tidally locked
    tiltDeg: 0.10,
    color: rgb(0xa8a49c),
    color2: rgb(0x84807a),
    texture: 'rock',
  },
  {
    id: 'ariel', name: 'Ariel', kind: 'moon', parent: 'uranus',
    elements: {
      a: 190900, e: 0.0012, i: 0.26,
      node: 169.5, peri: 294.9, M0: 100.0,
      n: 142.86,
    },
    radiusKm: 578.9,
    rotationHours: 60.48, // tidally locked
    tiltDeg: 0.26,
    color: rgb(0xc0bcae),
    color2: rgb(0x9c9a8e),
    texture: 'ice',
  },
  {
    id: 'umbriel', name: 'Umbriel', kind: 'moon', parent: 'uranus',
    elements: {
      a: 266000, e: 0.0039, i: 0.13,
      node: 133.3, peri: 250.7, M0: 100.0,
      n: 86.87,
    },
    radiusKm: 584.7,
    rotationHours: 99.46, // tidally locked
    tiltDeg: 0.13,
    color: rgb(0x6e6a64),
    color2: rgb(0x54504a),
    texture: 'ice',
  },
  {
    id: 'titania', name: 'Titania', kind: 'moon', parent: 'uranus',
    elements: {
      a: 435910, e: 0.0011, i: 0.34,
      node: 98.7, peri: 290.8, M0: 100.0,
      n: 41.35,
    },
    radiusKm: 788.4,
    rotationHours: 208.9, // tidally locked
    tiltDeg: 0.34,
    color: rgb(0x9c968c),
    color2: rgb(0x7a746a),
    texture: 'ice',
  },
  {
    id: 'oberon', name: 'Oberon', kind: 'moon', parent: 'uranus',
    elements: {
      a: 583520, e: 0.0008, i: 0.06,
      node: 79.3, peri: 70.6, M0: 100.0,
      n: 26.75,
    },
    radiusKm: 761.4,
    rotationHours: 323.0, // tidally locked
    tiltDeg: 0.06,
    color: rgb(0x88827a),
    color2: rgb(0x66605a),
    texture: 'ice',
  },
  {
    id: 'nereid', name: 'Nereid', kind: 'moon', parent: 'neptune',
    elements: {
      a: 5513700, e: 0.7482, i: 7.31,
      node: 130.0, peri: 5.2, M0: 100.0,
      n: 1.1731,
    },
    radiusKm: 170.0,
    rotationHours: 5.2, // rotation poorly constrained
    tiltDeg: 7.31,
    color: rgb(0x908878),
    color2: rgb(0x6a6458),
    texture: 'rock',
  },
];

export const ALL_BODIES: BodyDefinition[] = [SUN, ...PLANETS, ...DWARF_PLANETS, ...MOONS];

/** Body by id (for resolving moon parents / UI). */
export function findBody(id: string): BodyDefinition | undefined {
  return ALL_BODIES.find((b) => b.id === id);
}
