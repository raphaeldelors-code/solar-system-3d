/**
 * Classic constellation figure fits (plan 007). Pure data + math —
 * no three.js, no DOM, Node-testable.
 *
 * Each fit describes one transparent plate extracted from Bode's
 * Uranographia (1801, public domain; plates via Wikimedia Commons):
 * the plate's aspect ratio, its angular size on the sky, and an
 * optional anchor offset.
 *
 * `TANGENT_PLANE_SIZE` is only the fallback box (degrees) for fits
 * that carry no `sizeDeg`; in practice every fit sets `sizeDeg`
 * explicitly (fitted from the star pattern's angular span).
 * `FIGURE_BOX_PADDING` shrinks the plate within the box so the
 * constellation's stars keep a margin around the figure.
 * 3D placement (mesh position/up/size) is computed here (pure) and
 * rendered by `buildConstellationFigures` in render/scene.ts.
 *
 * Fits are per constellation (15 of 88 — plan-007 prototype 5 plus the
 * plan-011 batch-1 dedicated 1801 plates); the full-88 pass reuses the
 * same struct for every plate.
 */

/** Fallback angular box (degrees) for fits without an explicit `sizeDeg`. */
export const TANGENT_PLANE_SIZE = 15;

/** Fraction of the box kept empty on each side (margin for stars). */
export const FIGURE_BOX_PADDING = 0.06;

export interface FigureFit {
  /** Constellation name (matches `Constellation.name`). */
  constellation: string;
  /** Plate width / height. */
  aspect: number;
  /**
   * Angular box (degrees) the plate is scaled to cover, defaulting to
   * `TANGENT_PLANE_SIZE`. Per-constellation because each figure spans a
   * different arc on the sky (Ursa Major is far wider than Lyra).
   */
  sizeDeg?: number;
  /**
   * Anchor offset (hours) added to the star-cloud centroid's RA before the
   * plate is placed — shifts the art so the *figure's body* (not the mean
   * star position) sits over the densest part of the pattern.
   */
  offsetRAHours?: number;
  /** Anchor offset (degrees) added to the star-cloud centroid's Dec. */
  offsetDecDeg?: number;
  /**
   * In-plane rotation in degrees applied after the default
   * "image north = celestial north" orientation. 0 = upright.
   * Hand-tuned per plate; the 1801 orientation is approximate by
   * nature (loose, star-adjacent art, not star-anchored).
   */
  rotationDeg?: number;
}

/** Plan-007 prototype set + plan-011 batch 1 — Bode plates. Values
 * fitted to the star patterns (see scripts/fit_figures.py), not
 * hand-guessed. */
export const FIGURE_FITS: FigureFit[] = [
  { constellation: 'Orion', aspect: 1.412, sizeDeg: 38.5 },
  {
    constellation: 'Ursa Major',
    aspect: 0.832,
    sizeDeg: 70,
    offsetRAHours: 0.25,
    offsetDecDeg: -2,
  },
  { constellation: 'Cygnus', aspect: 0.844, sizeDeg: 39, offsetDecDeg: 1 },
  { constellation: 'Scorpius', aspect: 1.418, sizeDeg: 37.7, offsetDecDeg: -1 },
  { constellation: 'Leo', aspect: 1.37, sizeDeg: 44.5, offsetDecDeg: 1 },
  // Batch 1 of the full-88 pass (plan 011) — dedicated 1801 plates,
  // full star-chart extractions (figure + stars + lines + graticule).
  { constellation: 'Aries', aspect: 1.271, sizeDeg: 19, offsetRAHours: -0.25, offsetDecDeg: -2 },
  {
    constellation: 'Cancer',
    aspect: 1.261,
    sizeDeg: 26,
    offsetDecDeg: 1,
  },
  {
    constellation: 'Cetus',
    aspect: 1.176,
    sizeDeg: 54.6,
    offsetRAHours: -0.25,
    offsetDecDeg: -2,
  },
  { constellation: 'Gemini', aspect: 1.274, sizeDeg: 29.1 },
  {
    constellation: 'Ophiuchus',
    aspect: 1.35,
    sizeDeg: 53.1,
    offsetRAHours: -0.25,
    offsetDecDeg: -1,
  },
  { constellation: 'Pegasus', aspect: 1.266, sizeDeg: 48.5, offsetDecDeg: 2 },
  { constellation: 'Perseus', aspect: 1.333, sizeDeg: 38.1, offsetDecDeg: 1 },
  { constellation: 'Pisces', aspect: 1.267, sizeDeg: 51.5, offsetDecDeg: -1 },
  { constellation: 'Taurus', aspect: 1.259, sizeDeg: 48.1, offsetDecDeg: 1 },
  { constellation: 'Virgo', aspect: 1.272, sizeDeg: 57.3, offsetDecDeg: -1 },
];

export function findFigureFit(name: string): FigureFit | undefined {
  return FIGURE_FITS.find((f) => f.constellation === name);
}

/** Placement of one figure mesh on the sky dome. */
export interface FigurePlacement {
  /** Outward unit direction (mesh sits at position * RADIUS). */
  position: [number, number, number];
  /**
   * Up hint: the world direction the plate's image-top should point
   * at before `rotationDeg` is applied (perpendicular to position).
   */
  upHint: [number, number, number];
  /** World size of the plate plane (width, height). */
  planeSize: [number, number];
  /** In-plane rotation, radians (positive = counter-clockwise
   * looking from outside the dome). */
  rotationRad: number;
}

/**
 * Compute the tangent-plane placement for a figure fit.
 *
 * The plate lies on the plane through `centroid` perpendicular to it:
 * image-up points to celestial north (the local frame derived from a
 * non-parallel reference), then is rotated `rotationDeg` around the
 * outward normal. The plate is scaled to fill the `TANGENT_PLANE_SIZE`
 * box minus `FIGURE_BOX_PADDING`, preserving `aspect`.
 */
export function figurePlacement(
  fit: FigureFit,
  centroid: [number, number, number],
): FigurePlacement {
  const [cx, cy, cz] = centroid;
  const m = Math.hypot(cx, cy, cz);
  const n: [number, number, number] = m < 1e-9 ? [0, 0, 1] : [cx / m, cy / m, cz / m];

  // Image-up (UN-rotated) = celestial north projected onto the tangent
  // plane. The per-plate in-plane rotation is applied by the renderer via
  // mesh.rotateZ, so upHint stays the plain north projection — pre-rotating
  // it here AND rotating in the renderer would double-apply the angle.
  let up: [number, number, number] = [-n[1] * n[0], 1 - n[1] * n[1], -n[1] * n[2]];
  if (up[0] * up[0] + up[1] * up[1] + up[2] * up[2] < 1e-6) {
    up = [1, 0, 0];
  }
  const upHint: [number, number, number] = normalize(up);
  const rotationRad = (fit.rotationDeg ?? 0) * (Math.PI / 180);

  // Plate size: inscribe the plate (aspect = W/H) in the square box of
  // side `usable` (the padded box), keeping aspect. The larger dimension
  // touches the box, the other is derived.
  const box = ((fit.sizeDeg ?? TANGENT_PLANE_SIZE) * Math.PI) / 180;
  const usable = box * (1 - 2 * FIGURE_BOX_PADDING);
  let pw: number;
  let ph: number;
  if (fit.aspect >= 1) {
    pw = usable;
    ph = usable / fit.aspect;
  } else {
    ph = usable;
    pw = usable * fit.aspect;
  }

  return { position: n, upHint, planeSize: [pw, ph], rotationRad };
}

/**
 * Inverse of `raDecToUnit` (scene frame -> equatorial coords). Used to
 * apply the optional anchor offsets in `FigureFit`.
 */
export function unitToRaDec(p: [number, number, number]): [number, number] {
  const [x, y, z] = p;
  const dec = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
  const raRad = Math.atan2(-z, -x);
  return [(raRad * (180 / Math.PI)) / 15, dec];
}

function normalize(p: [number, number, number]): [number, number, number] {
  const m = Math.hypot(p[0], p[1], p[2]) || 1;
  return [p[0] / m, p[1] / m, p[2] / m];
}
