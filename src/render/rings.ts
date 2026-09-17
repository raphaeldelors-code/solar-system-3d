/**
 * Translucent ring bands with a Cassini division (plan 035 F4).
 *
 * three.js `RingGeometry` bakes 2D (position) UVs, so a radial band texture
 * can't be applied directly. `remapRingUVRadial` rewrites the geometry's UVs
 * so `u` runs 0→1 across the annulus (radial) and `v` is constant; then a
 * 1-D radial strip texture gives concentric bands + the dark Cassini gap.
 *
 * Two profiles are available:
 *   - `ringBandProfile` — a simple 2-bump procedural curve (Cassini + Encke),
 *     kept for non-Saturn ringed bodies (Uranus) and backward compatibility.
 *   - `saturnRingProfile` (plan 044 A4) — a DATA-DRIVEN radial profile built
 *     from the real, public-domain Saturn ring structure (documented km
 *     boundaries + relative opacities). Deterministic + pure, so it's
 *     unit-testable and carries zero asset-licensing risk (important for a
 *     product that may be sold).
 *
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

// --- Plan 044 A4: real Saturn ring structure (data-driven) -----------------
//
// The real ring system, in km from Saturn's centre, with relative opacity
// (normalised so the dense B ring = 1.0). Boundaries are the well-documented
// public-domain values (NASA/JPL + the IAU ring nomenclature). The mesh spans
// inner=1.24 → outer=2.27 planet-radii (see bodies.ts); the real km→planet-
// radius→normalised-t mapping is done once here so the texture's radial bands
// line up with the real ring structure.
//
//   D ring   66,900–74,510 km   (faint dust)
//   C ring   74,658–91,975 km   (incl. Maxwell/Bond/Dawes ringlets)
//   B ring   91,975–117,570 km  (densest, brightest)
//   Cassini 117,570–122,170 km  (dark division)
//   A ring  122,170–136,780 km  (incl. Encke + Huygens gaps)
//   F ring  ~140,180 km         (thin, bright)
//
// Planet radius R = 60,268 km. The mesh inner edge (1.24 R = 74,732 km) sits
// just inside the C ring; the outer edge (2.27 R = 136,808 km) sits at the A
// ring's outer edge. The D ring (66,900–74,510 km) falls INSIDE the mesh inner
// edge and the F ring (~140,180 km = 2.33 R) falls just OUTSIDE the outer edge,
// so neither is drawn (the mesh annulus spans C→A only).

/** A single named ring band: [tStart, tEnd, opacity] in normalised t. */
interface RingBand {
  name: string;
  t0: number;
  t1: number;
  opacity: number;
}

/** Convert a km radius to normalised t across the mesh annulus. */
function kmToT(km: number): number {
  const R = 60268; // Saturn equatorial radius, km
  const innerKm = 1.24 * R;
  const outerKm = 2.27 * R;
  return THREE.MathUtils.clamp((km - innerKm) / (outerKm - innerKm), 0, 1);
}

/** The real Saturn ring bands, in normalised t (computed from km). */
const SATURN_BANDS: RingBand[] = [
  { name: 'C', t0: kmToT(74658), t1: kmToT(91975), opacity: 0.42 },
  // C-ring ringlets (narrow bright features inside the C ring)
  { name: 'Maxwell', t0: kmToT(87480), t1: kmToT(87539), opacity: 0.6 },
  { name: 'Bond', t0: kmToT(88702), t1: kmToT(88719), opacity: 0.55 },
  { name: 'Dawes', t0: kmToT(90138), t1: kmToT(90200), opacity: 0.4 },
  { name: 'B', t0: kmToT(91975), t1: kmToT(117570), opacity: 1.0 },
  { name: 'Cassini', t0: kmToT(117570), t1: kmToT(122170), opacity: 0.06 },
  { name: 'A', t0: kmToT(122170), t1: kmToT(136780), opacity: 0.72 },
  // A-ring gaps
  { name: 'Encke', t0: kmToT(133589), t1: kmToT(133599), opacity: 0.05 },
  { name: 'Huygens', t0: kmToT(129480), t1: kmToT(129880), opacity: 0.12 },
];

/**
 * Smoothstep edge blend: 0 below `a`, 1 above `b`, smooth in between.
 */
function smoothEdge(t: number, a: number, b: number): number {
  const x = THREE.MathUtils.clamp((t - a) / (b - a || 1), 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * Real Saturn ring opacity 0..1 at normalised radial position t∈[0,1].
 * Data-driven from `SATURN_BANDS` (real km boundaries + relative opacities).
 * Deterministic + pure. Includes a subtle fine-structure modulation so the
 * dense B ring reads as textured rather than a flat band.
 */
export function saturnRingProfile(t: number): number {
  if (t < 0 || t > 1) return 0;
  // Base: the strongest band that covers t (bands are ordered inner→outer;
  // later/more-specific bands like ringlets + gaps override the broad ones).
  let base = 0;
  for (const b of SATURN_BANDS) {
    if (t >= b.t0 && t <= b.t1) {
      // Smooth the band edges (a few % of the annulus) so there are no hard
      // steps; the Cassini division + gaps stay sharp because their opacity
      // is low and their width is narrow.
      const inEdge = smoothEdge(t, b.t0 - 0.004, b.t0 + 0.004);
      const outEdge = 1 - smoothEdge(t, b.t1 - 0.004, b.t1 + 0.004);
      const edge = Math.min(inEdge, outEdge);
      base = Math.max(base, b.opacity * edge);
    }
  }
  // Fine structure: a deterministic pseudo-random modulation, strongest in the
  // dense B ring (where the real ring has intricate density waves), faint
  // elsewhere. Keeps the profile pure (no Math.random) + unit-testable.
  const fine =
    0.5 + 0.5 * Math.sin(t * 220.0) * Math.sin(t * 61.0 + 1.7) * Math.sin(t * 13.0 + 0.4);
  const fineAmt = 0.12 * base; // scale with local opacity
  let a = base + (fine - 0.5) * 2 * fineAmt;
  // Fade both edges (limb transparency)
  const edge = Math.min(t, 1 - t);
  a *= THREE.MathUtils.clamp(edge / 0.02, 0, 1);
  return THREE.MathUtils.clamp(a, 0, 1);
}

/**
 * Real Saturn ring colour (sRGB 0..255) at normalised radial position t.
 * The inner rings (D/C) read warmer/tan; the outer rings (A/F) read cooler
 * and whiter. A smooth gradient between the two.
 */
export function saturnRingColor(t: number): [number, number, number] {
  // Warm inner (tan) → cool outer (bluish white).
  const warm: [number, number, number] = [214, 196, 158]; // #d6c49e
  const cool: [number, number, number] = [226, 224, 214]; // #e2e0d6
  const f = THREE.MathUtils.clamp(t, 0, 1);
  return [
    Math.round(warm[0] + (cool[0] - warm[0]) * f),
    Math.round(warm[1] + (cool[1] - warm[1]) * f),
    Math.round(warm[2] + (cool[2] - warm[2]) * f),
  ];
}

/**
 * Radial-strip ring texture for a body. 1024×1, sRGB.
 *
 * For Saturn (plan 044 A4) this uses the real data-driven profile
 * (`saturnRingProfile` + `saturnRingColor`); for other ringed bodies it falls
 * back to the simple procedural `ringBandProfile`.
 */
export function makeRingTexture(color: [number, number, number], bodyId?: string): THREE.Texture {
  const w = 1024,
    h = 1;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const isSaturn = bodyId === 'saturn';
  for (let x = 0; x < w; x++) {
    const t = x / (w - 1);
    let r: number, g: number, b: number, a: number;
    if (isSaturn) {
      a = saturnRingProfile(t);
      [r, g, b] = saturnRingColor(t);
    } else {
      a = ringBandProfile(t);
      const [cr, cg, cb] = color;
      const boost = a;
      r = cr * (0.7 + 0.3 * boost);
      g = cg * (0.7 + 0.3 * boost);
      b = cb * (0.7 + 0.3 * boost);
    }
    img.data[x * 4 + 0] = r;
    img.data[x * 4 + 1] = g;
    img.data[x * 4 + 2] = b;
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
