/**
 * Translucent ring bands with a Cassini division (plan 035 F4).
 *
 * three.js `RingGeometry` bakes 2D (position) UVs, so a radial band texture
 * can't be applied directly. `remapRingUVRadial` rewrites the geometry's UVs
 * so `u` runs 0→1 across the annulus (radial) and `v` is constant; then a
 * 1-D radial strip texture gives concentric bands + the dark Cassini gap.
 *
 * The texture is pure function of (id, inner, outer, color) so it's unit-test-
able via the exported `ringBandProfile` (returns per-radius alpha/intensity).
 * Built as a `CanvasTexture` at runtime (no asset file), kept cached per body.
 */
import * as THREE from 'three';

/**
 * Band alpha 0..1 at a normalized radial position t∈[0,1] (0=inner edge,
 * 1=outer edge). Encodes the main rings + a hard Cassini division (~t≈0.72)
 * + a thin Encke gap near the outer edge. Deterministic + pure.
 */
export function ringBandProfile(t: number, opts?: { cassini?: number }): number {
  const c = opts?.cassini ?? 0.72;
  // base: bright inner (B) + outer (A), dip at Cassini, dip at Encke
  const inner = 1 - Math.abs(t - 0.42) * 1.4; // B ring ~t 0.4
  const outer = 1 - Math.abs(t - 0.86) * 2.2; // A ring ~t 0.86
  let a = Math.max(inner, outer * 0.8);
  // Cassini division: sharp dark notch
  a *= 1 - Math.exp(-Math.pow((t - c) / 0.012, 2)) * 0.9;
  // Encke gap (thin, near outer)
  a *= 1 - Math.exp(-Math.pow((t - 0.95) / 0.008, 2)) * 0.5;
  // fade both edges (limb transparency)
  const edge = Math.min(t, 1 - t);
  a *= THREE.MathUtils.clamp(edge / 0.03, 0, 1);
  return THREE.MathUtils.clamp(a, 0, 1);
}

/** Radial-strip ring texture for a body. 1024×1, sRGB. */
export function makeRingTexture(color: [number, number, number]): THREE.Texture {
  const w = 1024,
    h = 1;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const [cr, cg, cb] = color;
  for (let x = 0; x < w; x++) {
    const t = x / (w - 1);
    const a = ringBandProfile(t);
    // slight color gradation: brighter (whiter) at the bright rings
    const boost = a;
    img.data[x * 4 + 0] = cr * (0.7 + 0.3 * boost);
    img.data[x * 4 + 1] = cg * (0.7 + 0.3 * boost);
    img.data[x * 4 + 2] = cb * (0.7 + 0.3 * boost);
    img.data[x * 4 + 3] = a * 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Rewrite a `RingGeometry`'s UVs so u = radial fraction (0 inner → 1 outer),
 * v = 0. In-place on the existing geometry (no allocation).
 */
export function remapRingUVRadial(geo: THREE.BufferGeometry): void {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      y = pos.getY(i);
    const r = Math.hypot(x, y);
    // The geometry spans some [minR,maxR]; normalise across the vertex set.
    uv.setXY(i, r, 0); // raw radius; we normalise below via stored extents
  }
  // compute radius extents from the position buffer
  let minR = Infinity,
    maxR = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const r = Math.hypot(pos.getX(i), pos.getY(i));
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
  }
  const span = maxR - minR || 1;
  for (let i = 0; i < pos.count; i++) {
    const r = Math.hypot(pos.getX(i), pos.getY(i));
    uv.setXY(i, (r - minR) / span, 0);
  }
  uv.needsUpdate = true;
}
