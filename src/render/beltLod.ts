/**
 * F6 belt LOD — pure decision layer, no three/DOM (unit-testable in Node).
 *
 * Two belt representations exist per field: a full instanced-mesh of icosahedron
 * rocks (crisp when zoomed in) and a cheap THREE.Points cloud (one draw call,
 * no per-instance transform) that reads as a soft dust ring from afar. The
 * renderer picks per-frame from camera distance; the *decision* (mode + cross-fade
 * blend) is pure so it can be asserted without a WebGL context.
 */

export type BeltLodMode = 'near' | 'far';

export interface BeltLodDecision {
  /** 'near' = instanced rocks drive the frame, 'far' = point cloud does. */
  mode: BeltLodMode;
  /**
   * Cross-fade weight: 1 → instanced rocks at full opacity, 0 → point cloud at
   * full opacity. The two representations are shown additively during the
   * transition so the belt never pops when the LOD flips.
   */
  blend: number;
}

/** Camera-distance (scene units) at which a belt flips near→far. */
export const LOD_NEAR_DIST = 120;
/** Transition width (scene units) over which the two representations cross-fade. */
export const LOD_BLEND_WIDTH = 40;

/**
 * Pick the belt LOD for a camera `camDist` (scene units from origin) looking at
 * a belt whose mean radius is `beltDist`.
 *
 * Properties (asserted in tests):
 *  - fully near when `camDist <= beltDist + LOD_NEAR_DIST` (blend 1);
 *  - fully far  when `camDist >= beltDist + LOD_NEAR_DIST + LOD_BLEND_WIDTH` (blend 0);
 *  - monotonic non-increasing in `camDist` between those bounds;
 *  - continuous (no jump) at either boundary.
 */
export function beltLod(camDist: number, beltDist: number): BeltLodDecision {
  const t = camDist - (beltDist + LOD_NEAR_DIST);
  // t <= 0 → near, t >= BLEND_WIDTH → far; smoothstep in between.
  const x = clamp01(t / LOD_BLEND_WIDTH);
  const blend = 1 - x * x * (3 - 2 * x); // 1 (near) → 0 (far)
  return { mode: blend >= 0.5 ? 'near' : 'far', blend };
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** Cap a pixel ratio to at most 2 (F6: keep composer RT + fill-rate bounded). */
export function clampPixelRatio(pr: number): number {
  return Math.min(Math.max(1, pr), 2);
}
