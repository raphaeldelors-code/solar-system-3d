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
 * The 2 constellations with no pre-1922 atlas figure (Puppis, Vela — the
 * Argo Navis was only split in 1922/1930, and old painted plates defeat
 * clean extraction) use ORIGINAL generated line-art (a ship's stern and a
 * two-mast sail rig, respectively) placed on the star cloud: centered on
 * the cloud centroid, sized to the cloud's PCA-rotated extent, rotated to
 * its principal axis. Same struct, same renderer.
 *
 * Plan 016 P3: Serpens is the 87th — deliberately OMITTED. It originally
 * got a generated serpent silhouette (plan 012 trio), but the plate audit
 * (plans/016-...-plate-audit.md) showed it is the sky's #5 ink-on-ink
 * duplicate: the Ophiuchus Stellarium plate already contains a full,
 * star-registered serpent (head raised at his shoulder, body coiled at his
 * waist, tail in both hands), and the generated silhouette sat on top of it
 * (≈48 k overlapping ink points). The sky keeps Ophiuchus' registered
 * serpent; Serpens' stars/lines/label remain — only the plate is gone.
 *
 * 3D placement (mesh position/up/size) is computed here (pure) and
 * rendered by `buildConstellationFigures` in render/scene.ts:
 * image-right = east, image-up = celestial north, CCW rotation.
 *
 * Plan 013 (pilot): Delphinus, Ursa Major and Draco were re-anchored
 * SEMANTICALLY — the Stellarium art for these three is the horizontal
 * mirror image of the sky pattern under a pure similarity (the 3-anchor
 * fits' true residuals were 2–18° and no similarity can fix chirality),
 * so their PNGs are stored pre-mirrored and the fits below anchor the
 * art's head/tail feature points to their sky stars (Al Salib/Aldulfin,
 * Muscida/Alkaid, Eltanin/Giausar) then refine the center until every
 * constellation star sits on the ink (max 0.07°). See
 * plans/013-semantic-reanchor-pilot.md.
 *
 * Plan 014 (rollout): all 88 figures re-solved from Stellarium's own
 * 3-anchor correspondences (closed-form similarity — same data the
 * renderer uses, no hand-tuning). The anchor chirality test shows the
 * stored art is the horizontal mirror of the sky pattern for 80 figures,
 * so those 80 PNGs are stored pre-mirrored (the 3 pilots were already
 * mirrored in plan 013; Puppis/Vela/Serpens originals and Circinus/Sagitta
 * keep their stored orientation). Fits were then de-collided: per-figure
 * center/size nudges minimize art-on-art overlap on the sphere while the
 * star-ink match stays at 742/757 stars on the art. See
 * plans/014-generalize-all88-and-decollide.md.
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

/** 87 figures: one per IAU constellation EXCEPT Serpens (plate omitted, plan 016 P3). */
export const FIGURE_FITS: FigureFit[] = [
  {
    constellation: 'Andromeda',
    centerRAHours: 1.0395,
    centerDecDeg: 38.3081,
    sizeW: 33.58,
    sizeH: 33.58,
    rotationDeg: 104.8,
  },
  {
    constellation: 'Antlia',
    centerRAHours: 10.2756,
    centerDecDeg: -28.7018,
    sizeW: 18.52,
    sizeH: 18.52,
    rotationDeg: -7.06,
  },
  {
    constellation: 'Apus',
    centerRAHours: 15.2834,
    centerDecDeg: -81.9025,
    sizeW: 14.06,
    sizeH: 14.06,
    rotationDeg: -8.04,
  },
  {
    constellation: 'Aquarius',
    centerRAHours: 22.2682,
    centerDecDeg: -12.0784,
    sizeW: 39.52,
    sizeH: 39.52,
    rotationDeg: 36.19,
  },
  {
    constellation: 'Aquila',
    centerRAHours: 19.3715,
    centerDecDeg: 4.6274,
    sizeW: 33.34,
    sizeH: 33.34,
    rotationDeg: 8.17,
  },
  {
    constellation: 'Ara',
    centerRAHours: 17.4865,
    centerDecDeg: -54.3975,
    sizeW: 14.37,
    sizeH: 14.37,
    rotationDeg: 123.01,
  },
  {
    constellation: 'Aries',
    centerRAHours: 2.4582,
    centerDecDeg: 21.6925,
    sizeW: 15.47,
    sizeH: 15.47,
    rotationDeg: 53.16,
  },
  {
    constellation: 'Auriga',
    centerRAHours: 5.6464,
    centerDecDeg: 37.7631,
    sizeW: 27.38,
    sizeH: 27.38,
    rotationDeg: -50.09,
  },
  {
    constellation: 'Bo\u00f6tes',
    centerRAHours: 14.0786,
    centerDecDeg: 30.7778,
    sizeW: 41.45,
    sizeH: 41.45,
    rotationDeg: -59.35,
  },
  {
    constellation: 'Caelum',
    centerRAHours: 4.8036,
    centerDecDeg: -38.5623,
    sizeW: 8.61,
    sizeH: 8.61,
    rotationDeg: -64.4,
  },
  {
    constellation: 'Camelopardalis',
    centerRAHours: 4.8352,
    centerDecDeg: 66.1305,
    sizeW: 27.7,
    sizeH: 27.7,
    rotationDeg: 31.64,
  },
  {
    constellation: 'Cancer',
    centerRAHours: 8.514,
    centerDecDeg: 18.7572,
    sizeW: 23.95,
    sizeH: 23.95,
    rotationDeg: -36.21,
  },
  {
    constellation: 'Canes Venatici',
    centerRAHours: 12.374,
    centerDecDeg: 37.7938,
    sizeW: 13.4,
    sizeH: 13.4,
    rotationDeg: -1.44,
  },
  {
    constellation: 'Canis Major',
    centerRAHours: 6.7685,
    centerDecDeg: -22.5863,
    sizeW: 21.77,
    sizeH: 21.77,
    rotationDeg: -22.51,
  },
  {
    constellation: 'Canis Minor',
    centerRAHours: 7.511,
    centerDecDeg: 6.5471,
    sizeW: 8.05,
    sizeH: 8.05,
    rotationDeg: -15.14,
  },
  {
    constellation: 'Capricornus',
    centerRAHours: 20.9965,
    centerDecDeg: -16.7297,
    sizeW: 19.54,
    sizeH: 19.54,
    rotationDeg: 38.18,
  },
  {
    constellation: 'Carina',
    centerRAHours: 8.5278,
    centerDecDeg: -49.9536,
    sizeW: 56.59,
    sizeH: 56.59,
    rotationDeg: 5.3,
  },
  {
    constellation: 'Cassiopeia',
    centerRAHours: 1.012,
    centerDecDeg: 61.2874,
    sizeW: 14.38,
    sizeH: 14.38,
    rotationDeg: -174.71,
  },
  {
    constellation: 'Centaurus',
    centerRAHours: 13.4657,
    centerDecDeg: -48.339,
    sizeW: 43.27,
    sizeH: 43.27,
    rotationDeg: 19.52,
  },
  {
    constellation: 'Cepheus',
    centerRAHours: 21.8497,
    centerDecDeg: 62.7364,
    sizeW: 27.44,
    sizeH: 27.44,
    rotationDeg: 110.54,
  },
  {
    constellation: 'Cetus',
    centerRAHours: 1.9036,
    centerDecDeg: -4.0029,
    sizeW: 46.26,
    sizeH: 46.26,
    rotationDeg: -30.44,
  },
  {
    constellation: 'Chamaeleon',
    centerRAHours: 9.806,
    centerDecDeg: -80.5706,
    sizeW: 12.92,
    sizeH: 12.92,
    rotationDeg: 38.7,
  },
  {
    constellation: 'Circinus',
    centerRAHours: 15.068,
    centerDecDeg: -62.052,
    sizeW: 6.08,
    sizeH: 6.08,
    rotationDeg: -80,
  },
  {
    constellation: 'Columba',
    centerRAHours: 6.0208,
    centerDecDeg: -36.9013,
    sizeW: 12.03,
    sizeH: 12.03,
    rotationDeg: -59.17,
  },
  {
    constellation: 'Coma Berenices',
    centerRAHours: 12.7221,
    centerDecDeg: 21.8852,
    sizeW: 13.67,
    sizeH: 13.67,
    rotationDeg: -5.4,
  },
  {
    constellation: 'Corona Australis',
    centerRAHours: 18.9382,
    centerDecDeg: -38.9407,
    sizeW: 5.73,
    sizeH: 5.73,
    rotationDeg: 49.76,
  },
  {
    constellation: 'Corona Borealis',
    centerRAHours: 15.7454,
    centerDecDeg: 28.8407,
    sizeW: 7.46,
    sizeH: 7.46,
    rotationDeg: 35.96,
  },
  {
    constellation: 'Corvus',
    centerRAHours: 12.3689,
    centerDecDeg: -19.8,
    sizeW: 10.05,
    sizeH: 10.05,
    rotationDeg: 12.08,
  },
  {
    constellation: 'Crater',
    centerRAHours: 11.4061,
    centerDecDeg: -16.6513,
    sizeW: 15.03,
    sizeH: 15.03,
    rotationDeg: -59.19,
  },
  {
    constellation: 'Crux',
    centerRAHours: 12.4909,
    centerDecDeg: -59.4203,
    sizeW: 6.16,
    sizeH: 6.16,
    rotationDeg: -51,
  },
  {
    constellation: 'Cygnus',
    centerRAHours: 20.5417,
    centerDecDeg: 40.7423,
    sizeW: 33.49,
    sizeH: 33.49,
    rotationDeg: -3.98,
  },
  {
    constellation: 'Delphinus',
    centerRAHours: 20.6889,
    centerDecDeg: 14.1666,
    sizeW: 5.38,
    sizeH: 5.38,
    rotationDeg: 11.94,
  },
  {
    constellation: 'Dorado',
    centerRAHours: 4.9914,
    centerDecDeg: -59.9197,
    sizeW: 17.18,
    sizeH: 17.18,
    rotationDeg: 2.95,
  },
  {
    constellation: 'Draco',
    centerRAHours: 16.4625,
    centerDecDeg: 68.1989,
    sizeW: 53.91,
    sizeH: 53.91,
    rotationDeg: 157.16,
  },
  {
    constellation: 'Equuleus',
    centerRAHours: 21.2857,
    centerDecDeg: 7.0768,
    sizeW: 6.82,
    sizeH: 6.82,
    rotationDeg: 140.86,
  },
  {
    constellation: 'Eridanus',
    centerRAHours: 3.6997,
    centerDecDeg: -29.3322,
    sizeW: 62.38,
    sizeH: 62.38,
    rotationDeg: 15.76,
  },
  {
    constellation: 'Fornax',
    centerRAHours: 2.9332,
    centerDecDeg: -27.6337,
    sizeW: 10.35,
    sizeH: 10.35,
    rotationDeg: 32.8,
  },
  {
    constellation: 'Gemini',
    centerRAHours: 6.8661,
    centerDecDeg: 23.0133,
    sizeW: 23.64,
    sizeH: 23.64,
    rotationDeg: -16.6,
  },
  {
    constellation: 'Grus',
    centerRAHours: 22.4926,
    centerDecDeg: -45.9337,
    sizeW: 21.03,
    sizeH: 21.03,
    rotationDeg: -3.05,
  },
  {
    constellation: 'Hercules',
    centerRAHours: 16.9534,
    centerDecDeg: 32.6047,
    sizeW: 34.25,
    sizeH: 34.25,
    rotationDeg: -154.02,
  },
  {
    constellation: 'Horologium',
    centerRAHours: 3.3301,
    centerDecDeg: -52.1545,
    sizeW: 21.4,
    sizeH: 21.4,
    rotationDeg: 82.8,
  },
  {
    constellation: 'Hydra',
    centerRAHours: 10.7434,
    centerDecDeg: -13.0387,
    sizeW: 69,
    sizeH: 69,
    rotationDeg: 25.08,
  },
  {
    constellation: 'Hydrus',
    centerRAHours: 1.7871,
    centerDecDeg: -70.8057,
    sizeW: 18.13,
    sizeH: 18.13,
    rotationDeg: 116.07,
  },
  {
    constellation: 'Indus',
    centerRAHours: 20.9868,
    centerDecDeg: -51.0624,
    sizeW: 19.37,
    sizeH: 19.37,
    rotationDeg: 158.9,
  },
  {
    constellation: 'Lacerta',
    centerRAHours: 22.4731,
    centerDecDeg: 43.7246,
    sizeW: 14.83,
    sizeH: 14.83,
    rotationDeg: -52.15,
  },
  {
    constellation: 'Leo',
    centerRAHours: 10.6939,
    centerDecDeg: 15.7158,
    sizeW: 34.87,
    sizeH: 34.87,
    rotationDeg: 41.32,
  },
  {
    constellation: 'Leo Minor',
    centerRAHours: 10.0684,
    centerDecDeg: 33.1938,
    sizeW: 15.92,
    sizeH: 15.92,
    rotationDeg: -30.85,
  },
  {
    constellation: 'Lepus',
    centerRAHours: 5.5834,
    centerDecDeg: -18.7299,
    sizeW: 15.47,
    sizeH: 15.47,
    rotationDeg: -17.59,
  },
  {
    constellation: 'Libra',
    centerRAHours: 15.4844,
    centerDecDeg: -18.4806,
    sizeW: 20.85,
    sizeH: 20.85,
    rotationDeg: 56.73,
  },
  {
    constellation: 'Lupus',
    centerRAHours: 15.2093,
    centerDecDeg: -44.014,
    sizeW: 24.43,
    sizeH: 24.43,
    rotationDeg: -95.96,
  },
  {
    constellation: 'Lynx',
    centerRAHours: 7.8559,
    centerDecDeg: 43.9368,
    sizeW: 41.1,
    sizeH: 41.1,
    rotationDeg: -19.6,
  },
  {
    constellation: 'Lyra',
    centerRAHours: 18.837,
    centerDecDeg: 34.8687,
    sizeW: 12.31,
    sizeH: 12.31,
    rotationDeg: 17.08,
  },
  {
    constellation: 'Mensa',
    centerRAHours: 5.3062,
    centerDecDeg: -72.4754,
    sizeW: 10.83,
    sizeH: 10.83,
    rotationDeg: 85.44,
  },
  {
    constellation: 'Microscopium',
    centerRAHours: 20.8316,
    centerDecDeg: -33.2382,
    sizeW: 2.54,
    sizeH: 2.54,
    rotationDeg: 60.01,
  },
  {
    constellation: 'Monoceros',
    centerRAHours: 7.186,
    centerDecDeg: -0.671,
    sizeW: 30.36,
    sizeH: 30.36,
    rotationDeg: 0.47,
  },
  {
    constellation: 'Musca',
    centerRAHours: 12.3534,
    centerDecDeg: -69.5563,
    sizeW: 8.77,
    sizeH: 8.77,
    rotationDeg: -118.48,
  },
  {
    constellation: 'Norma',
    centerRAHours: 16.293,
    centerDecDeg: -52.2943,
    sizeW: 8.41,
    sizeH: 8.41,
    rotationDeg: 112.64,
  },
  {
    constellation: 'Octans',
    centerRAHours: 21.5805,
    centerDecDeg: -81.1772,
    sizeW: 9.36,
    sizeH: 9.36,
    rotationDeg: -168.38,
  },
  {
    constellation: 'Ophiuchus',
    centerRAHours: 17.1828,
    centerDecDeg: -4.6091,
    sizeW: 56.3,
    sizeH: 56.3,
    rotationDeg: 3.97,
  },
  {
    constellation: 'Orion',
    centerRAHours: 5.6152,
    centerDecDeg: 3.5699,
    sizeW: 29.12,
    sizeH: 29.12,
    rotationDeg: 27.5,
  },
  {
    constellation: 'Pavo',
    centerRAHours: 19.4327,
    centerDecDeg: -65.8902,
    sizeW: 26.78,
    sizeH: 26.78,
    rotationDeg: 0.78,
  },
  {
    constellation: 'Pegasus',
    centerRAHours: 23.0709,
    centerDecDeg: 21.6673,
    sizeW: 48.7,
    sizeH: 48.7,
    rotationDeg: 138.12,
  },
  {
    constellation: 'Perseus',
    centerRAHours: 3.5718,
    centerDecDeg: 44.6834,
    sizeW: 29.4,
    sizeH: 29.4,
    rotationDeg: -8.39,
  },
  {
    constellation: 'Phoenix',
    centerRAHours: 0.9855,
    centerDecDeg: -47.5277,
    sizeW: 16.91,
    sizeH: 16.91,
    rotationDeg: 54.9,
  },
  {
    constellation: 'Pictor',
    centerRAHours: 6.1132,
    centerDecDeg: -57.6748,
    sizeW: 13.08,
    sizeH: 13.08,
    rotationDeg: -2.22,
  },
  {
    constellation: 'Pisces',
    centerRAHours: 0.6197,
    centerDecDeg: 9.4168,
    sizeW: 44.47,
    sizeH: 44.47,
    rotationDeg: 40.9,
  },
  {
    constellation: 'Piscis Austrinus',
    centerRAHours: 22.3306,
    centerDecDeg: -32.5012,
    sizeW: 14.14,
    sizeH: 14.14,
    rotationDeg: -124.26,
  },
  {
    constellation: 'Puppis',
    centerRAHours: 7.608,
    centerDecDeg: -36.52,
    sizeW: 43.46,
    sizeH: 21.14,
    rotationDeg: 67.2,
  },
  {
    constellation: 'Pyxis',
    centerRAHours: 8.7629,
    centerDecDeg: -31.3781,
    sizeW: 7.45,
    sizeH: 7.45,
    rotationDeg: -67.04,
  },
  {
    constellation: 'Reticulum',
    centerRAHours: 4.057,
    centerDecDeg: -62.2078,
    sizeW: 6.14,
    sizeH: 6.14,
    rotationDeg: 104.71,
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
    centerRAHours: 18.9367,
    centerDecDeg: -29.5732,
    sizeW: 30.49,
    sizeH: 30.49,
    rotationDeg: 23.71,
  },
  {
    constellation: 'Scorpius',
    centerRAHours: 16.7957,
    centerDecDeg: -32.1996,
    sizeW: 26.41,
    sizeH: 26.41,
    rotationDeg: -0.89,
  },
  {
    constellation: 'Sculptor',
    centerRAHours: 0.2885,
    centerDecDeg: -31.0322,
    sizeW: 23.27,
    sizeH: 23.27,
    rotationDeg: 41.08,
  },
  {
    constellation: 'Scutum',
    centerRAHours: 18.6347,
    centerDecDeg: -9.8787,
    sizeW: 11.56,
    sizeH: 11.56,
    rotationDeg: 34.15,
  },
  {
    constellation: 'Sextans',
    centerRAHours: 10.2407,
    centerDecDeg: -2.1621,
    sizeW: 15.91,
    sizeH: 15.91,
    rotationDeg: 20.26,
  },
  {
    constellation: 'Taurus',
    centerRAHours: 4.3438,
    centerDecDeg: 18.0278,
    sizeW: 34.74,
    sizeH: 34.74,
    rotationDeg: -19.7,
  },
  {
    constellation: 'Telescopium',
    centerRAHours: 18.39,
    centerDecDeg: -46.7658,
    sizeW: 4.91,
    sizeH: 4.91,
    rotationDeg: 12.21,
  },
  {
    constellation: 'Triangulum',
    centerRAHours: 2.0458,
    centerDecDeg: 31.5524,
    sizeW: 7.92,
    sizeH: 7.92,
    rotationDeg: 32.51,
  },
  {
    constellation: 'Triangulum Australe',
    centerRAHours: 16.142,
    centerDecDeg: -68.6055,
    sizeW: 9.97,
    sizeH: 9.97,
    rotationDeg: 58.74,
  },
  {
    constellation: 'Tucana',
    centerRAHours: 23.3453,
    centerDecDeg: -62.819,
    sizeW: 23.69,
    sizeH: 23.69,
    rotationDeg: -16.67,
  },
  {
    constellation: 'Ursa Major',
    centerRAHours: 11.4059,
    centerDecDeg: 54.6756,
    sizeW: 55.12,
    sizeH: 55.12,
    rotationDeg: -34.58,
  },
  {
    constellation: 'Ursa Minor',
    centerRAHours: 14.914,
    centerDecDeg: 78.7873,
    sizeW: 18.67,
    sizeH: 18.67,
    rotationDeg: 49.09,
  },
  {
    constellation: 'Vela',
    centerRAHours: 9.494,
    centerDecDeg: -49.58,
    sizeW: 32.58,
    sizeH: 19.03,
    rotationDeg: -171.6,
  },
  {
    constellation: 'Virgo',
    centerRAHours: 13.2926,
    centerDecDeg: 1.7026,
    sizeW: 40.52,
    sizeH: 40.52,
    rotationDeg: 34.44,
  },
  {
    constellation: 'Volans',
    centerRAHours: 7.9189,
    centerDecDeg: -71.7208,
    sizeW: 11.99,
    sizeH: 11.99,
    rotationDeg: -9.09,
  },
  {
    constellation: 'Vulpecula',
    centerRAHours: 19.7674,
    centerDecDeg: 25.1729,
    sizeW: 14.78,
    sizeH: 14.78,
    rotationDeg: 31.89,
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
