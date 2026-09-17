/**
 * Real starfield from the Yale Bright Star Catalogue (plan 044 B3).
 *
 * Replaces the old 9000-point PROCEDURAL starfield (random positions/colors)
 * with the actual naked-eye sky: the complete BSC5 catalog (8,999 stars,
 * V ≈ −1.5 … 8.0, J2000 positions). This is the same catalog the 88 IAU
 * constellation figures are keyed to, so the constellation lines now connect
 * stars that are actually drawn — the figures finally read as real star
 * patterns instead of lines over a random speckle.
 *
 * The data is BAKED (src/data/starfield.json): a flat array of
 * [ux,uy,uz, mag, size, r,g,b, spike] per star, where (ux,uy,uz) is the
 * unit direction in the scene's north-up frame (the same projection as
 * `raDecToUnit` in src/data/constellations.ts), `size` is a magnitude-driven
 * pixel size, (r,g,b) is a spectral-type color, and `spike` marks the ~200
 * brightest stars that get diffraction spikes. Baking keeps the bundle small
 * and the render path allocation-free.
 *
 * Pure + dependency-free (no THREE) so the table build is unit-testable in
 * Node, mirroring the existing `makeStarAttributes` / `zodiacalPeakOpacity`
 * split in src/render/skybox.ts.
 */
import starfieldJson from '../data/starfield.json';

/** One baked star record (scene-frame unit direction + render channels). */
export interface StarRecord {
  /** Unit direction in the scene's north-up frame (|v| = 1). */
  u: [number, number, number];
  /** Apparent V magnitude (brighter = smaller). */
  mag: number;
  /** Pixel size at pixelRatio 1 (magnitude-driven). */
  size: number;
  /** Spectral-type color (r,g,b in 0..1). */
  c: [number, number, number];
  /** 1 = one of the brightest stars (gets diffraction spikes). */
  spike: number;
}

/** The baked BSC5 star table, decoded from the flat JSON array. */
export const STARFIELD: StarRecord[] = (() => {
  const d = starfieldJson as unknown as { data: number[]; n: number };
  const out: StarRecord[] = [];
  for (let i = 0; i < d.n; i++) {
    const o = i * 9;
    out.push({
      u: [d.data[o], d.data[o + 1], d.data[o + 2]],
      mag: d.data[o + 3],
      size: d.data[o + 4],
      c: [d.data[o + 5], d.data[o + 6], d.data[o + 7]],
      spike: d.data[o + 8],
    });
  }
  return out;
})();

/**
 * Build the THREE `Points` attributes for the real starfield: positions on a
 * shell in [rMin, rMax] (parallax layer, same as the old procedural field),
 * per-star color, per-star pixel size, and a per-star spike flag. Pure (no
 * THREE) so it is unit-testable.
 */
export function realStarAttributes(
  stars: StarRecord[],
  rMin: number,
  rMax: number,
): {
  position: Float32Array;
  color: Float32Array;
  size: Float32Array;
  spike: Float32Array;
} {
  const n = stars.length;
  const position = new Float32Array(n * 3);
  const color = new Float32Array(n * 3);
  const size = new Float32Array(n);
  const spike = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const s = stars[i];
    // The baked directions are rounded (4 dp) so |u| is ~1 to within ~7e-4;
    // normalize so the shell radius is EXACTLY in [rMin, rMax].
    const il = 1 / Math.hypot(s.u[0], s.u[1], s.u[2]);
    const ux = s.u[0] * il;
    const uy = s.u[1] * il;
    const uz = s.u[2] * il;
    // Place on the shell at a radius proportional to brightness: the brightest
    // stars sit slightly CLOSER (bigger parallax, read as "in front"), the
    // faintest at the far edge — a subtle depth cue without any per-star RNG.
    const t = Math.min(1, Math.max(0, (s.mag - 0) / 8)); // 0=brightest, 1=faintest
    const r = rMax - t * (rMax - rMin);
    position[i * 3] = ux * r;
    position[i * 3 + 1] = uy * r;
    position[i * 3 + 2] = uz * r;
    color[i * 3] = s.c[0];
    color[i * 3 + 1] = s.c[1];
    color[i * 3 + 2] = s.c[2];
    size[i] = s.size;
    spike[i] = s.spike;
  }
  return { position, color, size, spike };
}

/** The indices of the stars that carry diffraction spikes (the brightest). */
export function spikeIndices(stars: StarRecord[]): number[] {
  const idx: number[] = [];
  for (let i = 0; i < stars.length; i++) if (stars[i].spike) idx.push(i);
  return idx;
}
