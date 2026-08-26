/**
 * Constellation figure placements (plan 012). Pure data + math —
 * no three.js, no DOM, Node-testable.
 *
 * Each entry places one registered illustration on the sky dome. For 85
 * constellations the art is the Stellarium "western" sky-culture
 * illustration — each figure carries 3 Hipparcos-star anchor points, so
 * placement is SOLVED, not hand-tuned: a least-squares similarity transform
 * (scale + rotation + translation) maps the image onto the J2000 sky,
 * residuals 0.01-0.45 deg.
 *
 * Per-constellation fields:
 *   centerRAHours / centerDecDeg — the art's solved sky center (RA in
 *   hours, Dec in degrees). The figure plane sits at this point on the dome.
 *   sizeW / sizeH — the art's full width/height in degrees of sky.
 *   rotationDeg — in-plane rotation, CCW in the (east, north) frame,
 *   applied by the renderer via mesh.rotateZ (the renderer is the sole
 *   rotation authority; this value is the solved transform angle).
 *
 * The 3 constellations with no pre-1922 atlas figure (Puppis, Vela, Serpens
 * — the Argo Navis was only split in 1922/1930, and old painted plates
 * defeat clean extraction) use ORIGINAL generated line-art (a ship's stern,
 * a two-mast sail rig, and a serpent, respectively) placed on the star
 * cloud: centered on the cloud centroid, sized to the cloud's PCA-rotated
 * extent, rotated to its principal axis. Same struct, same renderer.
 *
 * 3D placement (mesh position/up/size) is computed here (pure) and
 * rendered by `buildConstellationFigures` in render/scene.ts:
 * image-right = east, image-up = celestial north, CCW rotation.
 */

export interface FigureFit {
  /** Constellation name (matches `Constellation.name`). */
  constellation: string;
  /** Solved sky center of the figure, RA in hours (0-24). */
  centerRAHours: number;
  /** Solved sky center of the figure, Dec in degrees (-90..90). */
  centerDecDeg: number;
  /** Full art width in degrees of sky. */
  sizeW: number;
  /** Full art height in degrees of sky. */
  sizeH: number;
  /** In-plane rotation, degrees, CCW in the (east, north) frame. */
  rotationDeg: number;
}

/** All 88 figures, one per IAU constellation. */
export const FIGURE_FITS: FigureFit[] = [
  {
    constellation: 'Andromeda',
    centerRAHours: 1.1351,
    centerDecDeg: 38.4093,
    sizeW: 25.78,
    sizeH: 25.78,
    rotationDeg: 141.5,
  },
  {
    constellation: 'Antlia',
    centerRAHours: 9.9227,
    centerDecDeg: -31.5938,
    sizeW: 5.9,
    sizeH: 5.9,
    rotationDeg: 131.0,
  },
  {
    constellation: 'Apus',
    centerRAHours: 15.299,
    centerDecDeg: -77.6685,
    sizeW: 13.25,
    sizeH: 13.25,
    rotationDeg: -141.4,
  },
  {
    constellation: 'Aquarius',
    centerRAHours: 22.2671,
    centerDecDeg: -10.1419,
    sizeW: 27.58,
    sizeH: 27.58,
    rotationDeg: 105.1,
  },
  {
    constellation: 'Aquila',
    centerRAHours: 19.2585,
    centerDecDeg: 6.9682,
    sizeW: 8.95,
    sizeH: 8.95,
    rotationDeg: -38.2,
  },
  {
    constellation: 'Ara',
    centerRAHours: 17.5573,
    centerDecDeg: -56.2006,
    sizeW: 10.51,
    sizeH: 10.51,
    rotationDeg: 147.9,
  },
  {
    constellation: 'Aries',
    centerRAHours: 2.4305,
    centerDecDeg: 23.3498,
    sizeW: 14.05,
    sizeH: 14.05,
    rotationDeg: 162.9,
  },
  {
    constellation: 'Auriga',
    centerRAHours: 5.3897,
    centerDecDeg: 39.3306,
    sizeW: 4.14,
    sizeH: 4.14,
    rotationDeg: -43.0,
  },
  {
    constellation: 'Bo\u00f6tes',
    centerRAHours: 14.3283,
    centerDecDeg: 28.7147,
    sizeW: 30.8,
    sizeH: 30.8,
    rotationDeg: 7.9,
  },
  {
    constellation: 'Caelum',
    centerRAHours: 4.6679,
    centerDecDeg: -40.1419,
    sizeW: 8.35,
    sizeH: 8.35,
    rotationDeg: 36.0,
  },
  {
    constellation: 'Camelopardalis',
    centerRAHours: 3.8516,
    centerDecDeg: 69.8063,
    sizeW: 26.23,
    sizeH: 26.23,
    rotationDeg: -81.5,
  },
  {
    constellation: 'Cancer',
    centerRAHours: 8.4227,
    centerDecDeg: 17.9239,
    sizeW: 13.27,
    sizeH: 13.27,
    rotationDeg: 62.1,
  },
  {
    constellation: 'Canes Venatici',
    centerRAHours: 12.7388,
    centerDecDeg: 36.0951,
    sizeW: 3.55,
    sizeH: 3.55,
    rotationDeg: 58.6,
  },
  {
    constellation: 'Canis Major',
    centerRAHours: 6.9174,
    centerDecDeg: -23.2907,
    sizeW: 8.38,
    sizeH: 8.38,
    rotationDeg: 11.6,
  },
  {
    constellation: 'Canis Minor',
    centerRAHours: 7.615,
    centerDecDeg: 7.9418,
    sizeW: 3.8,
    sizeH: 3.8,
    rotationDeg: -49.7,
  },
  {
    constellation: 'Capricornus',
    centerRAHours: 20.9707,
    centerDecDeg: -19.5008,
    sizeW: 7.72,
    sizeH: 7.72,
    rotationDeg: 124.3,
  },
  {
    constellation: 'Carina',
    centerRAHours: 9.5329,
    centerDecDeg: -44.7866,
    sizeW: 35.6,
    sizeH: 35.6,
    rotationDeg: 33.9,
  },
  {
    constellation: 'Cassiopeia',
    centerRAHours: 1.0258,
    centerDecDeg: 61.2258,
    sizeW: 16.63,
    sizeH: 16.63,
    rotationDeg: 53.5,
  },
  {
    constellation: 'Centaurus',
    centerRAHours: 14.097,
    centerDecDeg: -53.8086,
    sizeW: 26.58,
    sizeH: 26.58,
    rotationDeg: -82.0,
  },
  {
    constellation: 'Cepheus',
    centerRAHours: 21.5133,
    centerDecDeg: 67.2592,
    sizeW: 25.55,
    sizeH: 25.55,
    rotationDeg: -135.3,
  },
  {
    constellation: 'Cetus',
    centerRAHours: 1.7958,
    centerDecDeg: -10.8562,
    sizeW: 34.78,
    sizeH: 34.78,
    rotationDeg: -127.3,
  },
  {
    constellation: 'Chamaeleon',
    centerRAHours: 10.0627,
    centerDecDeg: -77.821,
    sizeW: 12.57,
    sizeH: 12.57,
    rotationDeg: 121.5,
  },
  {
    constellation: 'Circinus',
    centerRAHours: 15.068,
    centerDecDeg: -62.052,
    sizeW: 6.08,
    sizeH: 6.08,
    rotationDeg: -80.0,
  },
  {
    constellation: 'Columba',
    centerRAHours: 5.9721,
    centerDecDeg: -37.2688,
    sizeW: 2.64,
    sizeH: 2.64,
    rotationDeg: -55.8,
  },
  {
    constellation: 'Coma Berenices',
    centerRAHours: 13.0143,
    centerDecDeg: 26.4984,
    sizeW: 10.01,
    sizeH: 10.01,
    rotationDeg: 86.3,
  },
  {
    constellation: 'Corona Australis',
    centerRAHours: 18.8763,
    centerDecDeg: -39.8659,
    sizeW: 2.67,
    sizeH: 2.67,
    rotationDeg: -174.6,
  },
  {
    constellation: 'Corona Borealis',
    centerRAHours: 15.7581,
    centerDecDeg: 29.1993,
    sizeW: 1.54,
    sizeH: 1.54,
    rotationDeg: 114.0,
  },
  {
    constellation: 'Corvus',
    centerRAHours: 12.4452,
    centerDecDeg: -20.7559,
    sizeW: 3.42,
    sizeH: 3.42,
    rotationDeg: -59.7,
  },
  {
    constellation: 'Crater',
    centerRAHours: 11.5378,
    centerDecDeg: -19.2251,
    sizeW: 6.75,
    sizeH: 6.75,
    rotationDeg: -72.5,
  },
  {
    constellation: 'Crux',
    centerRAHours: 12.648,
    centerDecDeg: -60.2688,
    sizeW: 4.17,
    sizeH: 4.17,
    rotationDeg: 36.2,
  },
  {
    constellation: 'Cygnus',
    centerRAHours: 20.2688,
    centerDecDeg: 35.9479,
    sizeW: 14.12,
    sizeH: 14.12,
    rotationDeg: 115.8,
  },
  {
    constellation: 'Delphinus',
    centerRAHours: 20.6925,
    centerDecDeg: 13.1224,
    sizeW: 4.59,
    sizeH: 4.59,
    rotationDeg: -93.8,
  },
  {
    constellation: 'Dorado',
    centerRAHours: 4.8829,
    centerDecDeg: -59.5496,
    sizeW: 19.55,
    sizeH: 19.55,
    rotationDeg: 87.8,
  },
  {
    constellation: 'Draco',
    centerRAHours: 17.3673,
    centerDecDeg: 73.8226,
    sizeW: 24.64,
    sizeH: 24.64,
    rotationDeg: -59.8,
  },
  {
    constellation: 'Equuleus',
    centerRAHours: 21.2935,
    centerDecDeg: 6.9728,
    sizeW: 5.65,
    sizeH: 5.65,
    rotationDeg: -90.0,
  },
  {
    constellation: 'Eridanus',
    centerRAHours: 2.987,
    centerDecDeg: -25.2191,
    sizeW: 49.69,
    sizeH: 49.69,
    rotationDeg: -70.0,
  },
  {
    constellation: 'Fornax',
    centerRAHours: 2.9298,
    centerDecDeg: -29.4499,
    sizeW: 3.63,
    sizeH: 3.63,
    rotationDeg: -156.0,
  },
  {
    constellation: 'Gemini',
    centerRAHours: 6.9239,
    centerDecDeg: 18.9838,
    sizeW: 12.44,
    sizeH: 12.44,
    rotationDeg: -144.2,
  },
  {
    constellation: 'Grus',
    centerRAHours: 22.607,
    centerDecDeg: -43.7259,
    sizeW: 14.08,
    sizeH: 14.08,
    rotationDeg: 97.3,
  },
  {
    constellation: 'Hercules',
    centerRAHours: 16.9574,
    centerDecDeg: 32.1201,
    sizeW: 2.4,
    sizeH: 2.4,
    rotationDeg: -152.4,
  },
  {
    constellation: 'Horologium',
    centerRAHours: 3.5759,
    centerDecDeg: -53.2107,
    sizeW: 18.75,
    sizeH: 18.75,
    rotationDeg: -168.4,
  },
  {
    constellation: 'Hydra',
    centerRAHours: 11.2697,
    centerDecDeg: 4.625,
    sizeW: 60.42,
    sizeH: 60.42,
    rotationDeg: 102.1,
  },
  {
    constellation: 'Hydrus',
    centerRAHours: 2.3186,
    centerDecDeg: -71.5831,
    sizeW: 6.76,
    sizeH: 6.76,
    rotationDeg: -116.1,
  },
  {
    constellation: 'Indus',
    centerRAHours: 20.7508,
    centerDecDeg: -52.1078,
    sizeW: 12.65,
    sizeH: 12.65,
    rotationDeg: -115.3,
  },
  {
    constellation: 'Lacerta',
    centerRAHours: 22.3407,
    centerDecDeg: 43.8267,
    sizeW: 14.01,
    sizeH: 14.01,
    rotationDeg: 43.4,
  },
  {
    constellation: 'Leo',
    centerRAHours: 10.7524,
    centerDecDeg: 18.4026,
    sizeW: 28.1,
    sizeH: 28.1,
    rotationDeg: 120.1,
  },
  {
    constellation: 'Leo Minor',
    centerRAHours: 10.1026,
    centerDecDeg: 34.3029,
    sizeW: 12.74,
    sizeH: 12.74,
    rotationDeg: -170.8,
  },
  {
    constellation: 'Lepus',
    centerRAHours: 5.4872,
    centerDecDeg: -15.5647,
    sizeW: 7.18,
    sizeH: 7.18,
    rotationDeg: -126.2,
  },
  {
    constellation: 'Libra',
    centerRAHours: 15.358,
    centerDecDeg: -17.6634,
    sizeW: 7.64,
    sizeH: 7.64,
    rotationDeg: -100.1,
  },
  {
    constellation: 'Lupus',
    centerRAHours: 14.9355,
    centerDecDeg: -43.7322,
    sizeW: 11.78,
    sizeH: 11.78,
    rotationDeg: 55.7,
  },
  {
    constellation: 'Lynx',
    centerRAHours: 8.4635,
    centerDecDeg: 51.8654,
    sizeW: 38.76,
    sizeH: 38.76,
    rotationDeg: 132.8,
  },
  {
    constellation: 'Lyra',
    centerRAHours: 18.8253,
    centerDecDeg: 35.5124,
    sizeW: 8.31,
    sizeH: 8.31,
    rotationDeg: 35.8,
  },
  {
    constellation: 'Mensa',
    centerRAHours: 5.4265,
    centerDecDeg: -72.311,
    sizeW: 4.06,
    sizeH: 4.06,
    rotationDeg: -169.9,
  },
  {
    constellation: 'Microscopium',
    centerRAHours: 21.1179,
    centerDecDeg: -34.7345,
    sizeW: 9.34,
    sizeH: 9.34,
    rotationDeg: 149.2,
  },
  {
    constellation: 'Monoceros',
    centerRAHours: 7.1376,
    centerDecDeg: 0.085,
    sizeW: 15.58,
    sizeH: 15.58,
    rotationDeg: 168.9,
  },
  {
    constellation: 'Musca',
    centerRAHours: 12.297,
    centerDecDeg: -69.0798,
    sizeW: 4.44,
    sizeH: 4.44,
    rotationDeg: -138.2,
  },
  {
    constellation: 'Norma',
    centerRAHours: 16.1885,
    centerDecDeg: -51.0253,
    sizeW: 5.06,
    sizeH: 5.06,
    rotationDeg: -139.2,
  },
  {
    constellation: 'Octans',
    centerRAHours: 20.8458,
    centerDecDeg: -85.299,
    sizeW: 11.45,
    sizeH: 11.45,
    rotationDeg: 91.3,
  },
  {
    constellation: 'Ophiuchus',
    centerRAHours: 17.4456,
    centerDecDeg: 0.2094,
    sizeW: 19.69,
    sizeH: 19.69,
    rotationDeg: 108.5,
  },
  {
    constellation: 'Orion',
    centerRAHours: 5.4291,
    centerDecDeg: 4.507,
    sizeW: 14.52,
    sizeH: 14.52,
    rotationDeg: -28.6,
  },
  {
    constellation: 'Pavo',
    centerRAHours: 19.5322,
    centerDecDeg: -65.8465,
    sizeW: 11.72,
    sizeH: 11.72,
    rotationDeg: -118.4,
  },
  {
    constellation: 'Pegasus',
    centerRAHours: 22.9069,
    centerDecDeg: 20.0198,
    sizeW: 21.29,
    sizeH: 21.29,
    rotationDeg: 32.4,
  },
  {
    constellation: 'Perseus',
    centerRAHours: 3.4386,
    centerDecDeg: 43.0682,
    sizeW: 4.93,
    sizeH: 4.93,
    rotationDeg: -108.0,
  },
  {
    constellation: 'Phoenix',
    centerRAHours: 1.0148,
    centerDecDeg: -51.2818,
    sizeW: 9.45,
    sizeH: 9.45,
    rotationDeg: 116.2,
  },
  {
    constellation: 'Pictor',
    centerRAHours: 6.0388,
    centerDecDeg: -55.4139,
    sizeW: 12.19,
    sizeH: 12.19,
    rotationDeg: 76.7,
  },
  {
    constellation: 'Pisces',
    centerRAHours: 0.691,
    centerDecDeg: 13.4076,
    sizeW: 12.21,
    sizeH: 12.21,
    rotationDeg: 165.1,
  },
  {
    constellation: 'Piscis Austrinus',
    centerRAHours: 22.2894,
    centerDecDeg: -29.62,
    sizeW: 12.45,
    sizeH: 12.45,
    rotationDeg: -51.6,
  },
  {
    constellation: 'Puppis',
    centerRAHours: 7.608,
    centerDecDeg: -34.72,
    sizeW: 43.46,
    sizeH: 21.14,
    rotationDeg: 67.2,
  },
  {
    constellation: 'Pyxis',
    centerRAHours: 8.5333,
    centerDecDeg: -34.2283,
    sizeW: 4.98,
    sizeH: 4.98,
    rotationDeg: 144.1,
  },
  {
    constellation: 'Reticulum',
    centerRAHours: 4.1544,
    centerDecDeg: -61.6267,
    sizeW: 2.65,
    sizeH: 2.65,
    rotationDeg: -149.7,
  },
  {
    constellation: 'Sagitta',
    centerRAHours: 19.8636,
    centerDecDeg: 18.8067,
    sizeW: 4.97,
    sizeH: 4.97,
    rotationDeg: -115.1,
  },
  {
    constellation: 'Sagittarius',
    centerRAHours: 18.7978,
    centerDecDeg: -30.8936,
    sizeW: 4.25,
    sizeH: 4.25,
    rotationDeg: -2.1,
  },
  {
    constellation: 'Scorpius',
    centerRAHours: 16.7143,
    centerDecDeg: -32.4789,
    sizeW: 21.67,
    sizeH: 21.67,
    rotationDeg: 77.9,
  },
  {
    constellation: 'Sculptor',
    centerRAHours: 0.2523,
    centerDecDeg: -32.7303,
    sizeW: 20.78,
    sizeH: 20.78,
    rotationDeg: 165.7,
  },
  {
    constellation: 'Scutum',
    centerRAHours: 18.6951,
    centerDecDeg: -11.6765,
    sizeW: 7.86,
    sizeH: 7.86,
    rotationDeg: -46.4,
  },
  {
    constellation: 'Serpens',
    centerRAHours: 16.601,
    centerDecDeg: 3.27,
    sizeW: 60.98,
    sizeH: 38.47,
    rotationDeg: 150.7,
  },
  {
    constellation: 'Sextans',
    centerRAHours: 10.1552,
    centerDecDeg: -2.206,
    sizeW: 12.54,
    sizeH: 12.54,
    rotationDeg: -115.8,
  },
  {
    constellation: 'Taurus',
    centerRAHours: 4.2518,
    centerDecDeg: 19.4342,
    sizeW: 26.7,
    sizeH: 26.7,
    rotationDeg: -125.0,
  },
  {
    constellation: 'Telescopium',
    centerRAHours: 18.5449,
    centerDecDeg: -47.3095,
    sizeW: 0.87,
    sizeH: 0.87,
    rotationDeg: -139.5,
  },
  {
    constellation: 'Triangulum',
    centerRAHours: 2.0496,
    centerDecDeg: 31.458,
    sizeW: 7.93,
    sizeH: 7.93,
    rotationDeg: -116.3,
  },
  {
    constellation: 'Triangulum Australe',
    centerRAHours: 16.0714,
    centerDecDeg: -67.4073,
    sizeW: 2.64,
    sizeH: 2.64,
    rotationDeg: 75.2,
  },
  {
    constellation: 'Tucana',
    centerRAHours: 23.5167,
    centerDecDeg: -60.3669,
    sizeW: 19.68,
    sizeH: 19.68,
    rotationDeg: 172.9,
  },
  {
    constellation: 'Ursa Major',
    centerRAHours: 10.952,
    centerDecDeg: 55.7295,
    sizeW: 33.63,
    sizeH: 33.63,
    rotationDeg: -149.4,
  },
  {
    constellation: 'Ursa Minor',
    centerRAHours: 14.6138,
    centerDecDeg: 82.284,
    sizeW: 2.96,
    sizeH: 2.96,
    rotationDeg: 17.7,
  },
  {
    constellation: 'Vela',
    centerRAHours: 9.494,
    centerDecDeg: -48.98,
    sizeW: 32.58,
    sizeH: 19.03,
    rotationDeg: -171.6,
  },
  {
    constellation: 'Virgo',
    centerRAHours: 13.3239,
    centerDecDeg: -3.1907,
    sizeW: 35.9,
    sizeH: 35.9,
    rotationDeg: 128.4,
  },
  {
    constellation: 'Volans',
    centerRAHours: 8.1007,
    centerDecDeg: -67.5621,
    sizeW: 15.28,
    sizeH: 15.28,
    rotationDeg: -146.4,
  },
  {
    constellation: 'Vulpecula',
    centerRAHours: 19.6595,
    centerDecDeg: 25.3933,
    sizeW: 14.42,
    sizeH: 14.42,
    rotationDeg: -149.5,
  },
];

export function findFigureFit(name: string): FigureFit | undefined {
  return FIGURE_FITS.find((f) => f.constellation === name);
}

/** Placement of one figure mesh on the sky dome. */
export interface FigurePlacement {
  /** Outward unit direction (mesh sits at position * RADIUS). */
  position: [number, number, number];
  /**
   * Up hint: the world direction the art's image-top should point at
   * before `rotationRad` is applied (perpendicular to position). The
   * renderer applies the rotation via mesh.rotateZ, so this stays the
   * plain north projection — pre-rotating here AND in the renderer
   * would double-apply the angle.
   */
  upHint: [number, number, number];
  /** World size of the figure plane in RADIANS (width, height). */
  planeSize: [number, number];
  /** In-plane rotation, radians (positive = counter-clockwise
   * looking from outside the dome). */
  rotationRad: number;
}

/**
 * Compute the placement for a registered figure.
 *
 * The plane lies on the tangent plane through the solved center:
 * image-up points to celestial north (local frame derived from a
 * non-parallel reference), image-right to east, then the solved
 * in-plane rotation (applied by the renderer).
 *
 * This frame is the exact 3D equivalent of the 2D anchor-registration
 * frame (east = cross(center, north), north up): `lookAt(origin)` +
 * `rotateZ` on a mesh built from this reproduces the solved similarity
 * transform term-by-term, so the art lands where the fit says it does.
 */
export function figurePlacement(fit: FigureFit): FigurePlacement {
  const ra = (fit.centerRAHours * 15 * Math.PI) / 180;
  const dec = (fit.centerDecDeg * Math.PI) / 180;
  const cd = Math.cos(dec);
  // Scene equatorial frame (same as constellations.ts raDecToUnit).
  const n: [number, number, number] = [-cd * Math.cos(ra), Math.sin(dec), -cd * Math.sin(ra)];

  // Image-up (UN-rotated) = celestial north projected onto the tangent
  // plane; pole fallback keeps it unit and perpendicular.
  let up: [number, number, number] = [-n[1] * n[0], 1 - n[1] * n[1], -n[1] * n[2]];
  if (up[0] * up[0] + up[1] * up[1] + up[2] * up[2] < 1e-6) {
    up = [1, 0, 0];
  }
  const upHint: [number, number, number] = normalize(up);

  return {
    position: n,
    upHint,
    planeSize: [(fit.sizeW * Math.PI) / 180, (fit.sizeH * Math.PI) / 180],
    rotationRad: (fit.rotationDeg * Math.PI) / 180,
  };
}

function normalize(p: [number, number, number]): [number, number, number] {
  const m = Math.hypot(p[0], p[1], p[2]) || 1;
  return [p[0] / m, p[1] / m, p[2] / m];
}
