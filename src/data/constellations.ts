/**
 * Constellation star data + equatorial->scene projection. Pure and
 * Node-testable (no three.js, no DOM).
 *
 * Coordinates are J2000 right ascension (hours) and declination (degrees)
 * for each star. `lines` are index pairs into the constellation's `stars`
 * array, drawn as the figure's connecting lines.
 *
 * Projection: the equatorial frame is mapped onto the scene with the same
 * "north up" convention as the ecliptic starfield (see scene.ts). The 23.4°
 * obliquity between equatorial and ecliptic is intentionally ignored — these
 * are decorative sky lines, not an astrometric reference, and the shared
 * north-up axis keeps them visually consistent with the rest of the sky.
 */

export interface Star {
  name: string;
  /** Right ascension in hours (0-24). */
  raHours: number;
  /** Declination in degrees (-90 to 90). */
  decDeg: number;
}

export interface Constellation {
  name: string;
  stars: Star[];
  /** Pairs of indices into `stars`, drawn as line segments. */
  lines: [number, number][];
}

/**
 * Map J2000 RA/Dec to a unit direction vector in scene space (north up).
 *   RA 0h, Dec 0  -> [-1, 0, 0]
 *   RA 6h, Dec 0  -> [ 0, 0,-1]
 *   RA12h, Dec 0  -> [ 1, 0, 0]
 *   RA18h, Dec 0  -> [ 0, 0, 1]
 *   Dec +90       -> [ 0, 1, 0]   (north pole, straight up)
 *   Dec -90       -> [ 0,-1, 0]
 */
export function raDecToUnit(
  raHours: number,
  decDeg: number,
): [number, number, number] {
  const d2r = Math.PI / 180;
  const ra = raHours * 15 * d2r;
  const dec = decDeg * d2r;
  const cosD = Math.cos(dec);
  // Equatorial unit vector (X toward RA 0, Y toward RA 6h, Z north).
  const xEq = cosD * Math.cos(ra);
  const yEq = cosD * Math.sin(ra);
  const zEq = Math.sin(dec);
  // Same north-up remap used by scene.ts eclipticToScene.
  return [-xEq, zEq, -yEq];
}

export const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Orion',
    stars: [
      { name: 'Betelgeuse', raHours: 5.9195, decDeg: 7.407 },
      { name: 'Bellatrix', raHours: 5.4187, decDeg: 6.3504 },
      { name: 'Mintaka', raHours: 5.5334, decDeg: -0.2991 },
      { name: 'Alnilam', raHours: 5.6036, decDeg: -1.2021 },
      { name: 'Alnitak', raHours: 5.6793, decDeg: -1.9431 },
      { name: 'Saiph', raHours: 5.7959, decDeg: -9.6703 },
      { name: 'Rigel', raHours: 5.2423, decDeg: -8.2016 },
      { name: 'Meissa', raHours: 5.585, decDeg: 9.9351 },
    ],
    lines: [[0, 1], [1, 2], [0, 4], [2, 3], [3, 4], [4, 5], [2, 6], [5, 6], [1, 7], [7, 0]],
  },
  {
    name: 'Ursa Major',
    stars: [
      { name: 'Dubhe', raHours: 11.0621, decDeg: 61.751 },
      { name: 'Merak', raHours: 11.0307, decDeg: 56.3814 },
      { name: 'Phecda', raHours: 11.8972, decDeg: 53.6954 },
      { name: 'Megrez', raHours: 12.2573, decDeg: 57.0329 },
      { name: 'Alioth', raHours: 12.9, decDeg: 55.9601 },
      { name: 'Mizar', raHours: 13.3993, decDeg: 54.9255 },
      { name: 'Alkaid', raHours: 13.7923, decDeg: 49.3133 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  },
  {
    name: 'Ursa Minor',
    stars: [
      { name: 'Polaris', raHours: 2.5302, decDeg: 89.2641 },
      { name: 'Epsilon UMi', raHours: 17.5376, decDeg: 82.0374 },
      { name: 'Zeta UMi', raHours: 16.7661, decDeg: 77.7949 },
      { name: 'Eta UMi', raHours: 15.7335, decDeg: 75.7555 },
      { name: 'Kochab', raHours: 14.8451, decDeg: 74.1553 },
      { name: 'Pherkad', raHours: 15.3167, decDeg: 71.8348 },
      { name: 'Yildun', raHours: 17.5375, decDeg: 86.586 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [2, 6]],
  },
  {
    name: 'Cassiopeia',
    stars: [
      { name: 'Caph', raHours: 0.1529, decDeg: 59.1499 },
      { name: 'Schedar', raHours: 0.675, decDeg: 56.5371 },
      { name: 'Navi', raHours: 0.9453, decDeg: 60.7167 },
      { name: 'Ruchbah', raHours: 1.4303, decDeg: 60.2358 },
      { name: 'Segin', raHours: 1.9068, decDeg: 63.6705 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: 'Cygnus',
    stars: [
      { name: 'Deneb', raHours: 20.6905, decDeg: 45.2802 },
      { name: 'Sadr', raHours: 20.371, decDeg: 40.2561 },
      { name: 'Albireo', raHours: 19.5117, decDeg: 27.9599 },
      { name: 'Gienah', raHours: 20.7702, decDeg: 33.9651 },
      { name: 'Delta Cyg', raHours: 19.7492, decDeg: 45.131 },
    ],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]],
  },
  {
    name: 'Leo',
    stars: [
      { name: 'Regulus', raHours: 10.1395, decDeg: 11.9672 },
      { name: 'Algieba', raHours: 10.3329, decDeg: 19.8421 },
      { name: 'Adhafera', raHours: 10.2781, decDeg: 23.4173 },
      { name: 'Rasalas', raHours: 9.879, decDeg: 26.0067 },
      { name: 'Zosma', raHours: 11.2351, decDeg: 20.5235 },
      { name: 'Chertan', raHours: 11.2376, decDeg: 15.4298 },
      { name: 'Denebola', raHours: 11.8171, decDeg: 14.5732 },
    ],
    lines: [[3, 2], [2, 1], [1, 0], [0, 5], [1, 4], [4, 6], [6, 5]],
  },
  {
    name: 'Canis Major',
    stars: [
      { name: 'Sirius', raHours: 6.7525, decDeg: -16.7161 },
      { name: 'Mirzam', raHours: 6.3783, decDeg: -17.9561 },
      { name: 'Wezen', raHours: 7.1399, decDeg: -26.3936 },
      { name: 'Adhara', raHours: 6.9773, decDeg: -28.9724 },
      { name: 'Aludra', raHours: 7.4015, decDeg: -29.303 },
    ],
    lines: [[1, 0], [0, 2], [2, 3], [2, 4]],
  },
  {
    name: 'Scorpius',
    stars: [
      { name: 'Dschubba', raHours: 16.0053, decDeg: -22.6222 },
      { name: 'Sigma Sco', raHours: 16.3533, decDeg: -25.5935 },
      { name: 'Antares', raHours: 16.4901, decDeg: -26.432 },
      { name: 'Tau Sco', raHours: 16.5984, decDeg: -28.2166 },
      { name: 'Mu Sco', raHours: 16.836, decDeg: -30.2219 },
      { name: 'Zeta Sco', raHours: 16.9118, decDeg: -34.2934 },
      { name: 'Eta Sco', raHours: 17.202, decDeg: -37.2979 },
      { name: 'Iota Sco', raHours: 17.2, decDeg: -39.0302 },
      { name: 'Kappa Sco', raHours: 17.4796, decDeg: -38.3223 },
      { name: 'Sargas', raHours: 17.622, decDeg: -42.9987 },
      { name: 'Shaula', raHours: 17.5602, decDeg: -37.1041 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
  },
  {
    name: 'Gemini',
    stars: [
      { name: 'Castor', raHours: 7.5767, decDeg: 31.8883 },
      { name: 'Pollux', raHours: 7.7553, decDeg: 28.0262 },
      { name: 'Wasat', raHours: 7.335, decDeg: 21.1461 },
      { name: 'Mebsuta', raHours: 6.7321, decDeg: 25.1303 },
      { name: 'Tejat', raHours: 6.3834, decDeg: 22.5101 },
      { name: 'Alhena', raHours: 6.6278, decDeg: 16.3993 },
    ],
    lines: [[0, 1], [0, 4], [4, 5], [1, 2], [2, 3], [3, 5]],
  },
  {
    name: 'Taurus',
    stars: [
      { name: 'Aldebaran', raHours: 4.5987, decDeg: 16.5093 },
      { name: 'Elnath', raHours: 5.4382, decDeg: 28.6084 },
      { name: 'Epsilon Tau', raHours: 4.4775, decDeg: 12.4868 },
      { name: 'Zeta Tau', raHours: 5.6248, decDeg: 21.1436 },
    ],
    lines: [[2, 0], [0, 3], [3, 1]],
  },
  {
    name: 'Lyra',
    stars: [
      { name: 'Vega', raHours: 18.6156, decDeg: 38.7836 },
      { name: 'Delta Lyr', raHours: 18.9014, decDeg: 36.8994 },
      { name: 'Zeta Lyr', raHours: 18.7461, decDeg: 37.605 },
      { name: 'Sheliak', raHours: 18.8342, decDeg: 33.3639 },
      { name: 'Sulafat', raHours: 18.982, decDeg: 32.6905 },
    ],
    lines: [[0, 2], [2, 1], [1, 3], [3, 4], [4, 2]],
  },
  {
    name: 'Aquila',
    stars: [
      { name: 'Tarazed', raHours: 19.771, decDeg: 10.6133 },
      { name: 'Altair', raHours: 19.8464, decDeg: 8.8683 },
      { name: 'Alshain', raHours: 19.9221, decDeg: 6.4078 },
    ],
    lines: [[0, 1], [1, 2]],
  },
  {
    name: 'Aries',
    stars: [
      { name: 'Hamal', raHours: 2.1208, decDeg: 23.4625 },
      { name: 'Sheratan', raHours: 1.9114, decDeg: 20.8082 },
      { name: 'Mesarthim', raHours: 1.8971, decDeg: 19.2932 },
    ],
    lines: [[0, 1], [1, 2]],
  },
];
