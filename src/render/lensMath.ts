/**
 * Plan 029 F1 — true circular magnifier lens (radial zoom, transparent glass).
 *
 * The lens is a circular disc centered on the cursor (focal point = the point
 * on the timeline line under the cursor). Content is magnified by a RADIAL
 * profile: maximum at the focal point, falling off to exactly 1.0 at the disc
 * rim — so the rim blends seamlessly into the real strip and everything
 * closer to the center is bigger ("a transparent lens that makes what's near
 * the center bigger, so packed events fan out and you can pick the exact
 * one").
 *
 * Renderer strategy (main.ts): each strip element (line, fill, caret, month
 * ticks, month labels, event emojis, year) is re-drawn into the disc with a
 * per-element radial transform — displaced outward to (offset · local zoom)
 * and scaled by the local zoom. The local zoom varies with the element's
 * distance from the focal point, so elements near the center are big and ones
 * near the rim are ~1×. Cheap (a few dozen draw ops/frame) and fully in 2D
 * canvas — no shaders, no DOM snapshot.
 *
 * This module is pure math only (no DOM) — kept testable per project
 * convention (see scrubMath.ts).
 */

/** Disc radius in CSS px (Ø 112). The line sits at the disc center. */
export const LENS_R = 56;
/** Max zoom at the focal point (center); the rim is always exactly 1.0. 4×
 *  is strong enough that a 13px emoji reads as ~50px (clearly "bigger") while
 *  the quadratic falloff keeps the rim blend smooth — it never snaps. */
export const LENS_ZOOM = 4;

/**
 * Radial zoom profile: LENS_ZOOM at r=0, exactly 1.0 at r=LENS_R, smooth in
 * between (quadratic falloff — gentle at the rim, faster in the middle).
 * Clamped to 1.0 for r ≥ LENS_R (outside the disc the real strip shows at 1×).
 */
export function lensZoomAt(r: number): number {
  const t = Math.max(0, 1 - r / LENS_R);
  return 1 + (LENS_ZOOM - 1) * t * t;
}

/**
 * Per-element radial transform. Given a 1× offset (dx, dy) in strip pixels
 * from the focal point (dy>0 = below the line), return the offset in the
 * magnified disc (px from the disc center) plus the local scale to draw the
 * element at. Returns null when the element's center is at/ beyond the rim
 * (r ≥ LENS_R) — the caller skips it (it maps to the real, un-magnified
 * strip outside the glass).
 *
 * Monotonic in r (zoom ∈ [1, LENS_ZOOM] and the falloff is slow enough that
 * d·zoom(d) is strictly increasing), so elements never fold over each other —
 * packed events fan out cleanly around the focal point.
 */
export function lensDisplace(
  dx: number,
  dy: number,
): { x: number; y: number; scale: number } | null {
  const r = Math.sqrt(dx * dx + dy * dy);
  if (r >= LENS_R) return null;
  const scale = lensZoomAt(r);
  return { x: dx * scale, y: dy * scale, scale };
}

/**
 * Focal x in strip CSS px, clamped to the strip so the cursor always lands at
 * the disc center (the glass may extend past the strip edge — it's clipped by
 * the viewport, like a real glass held at the window edge). Best picking
 * precision: the element under the cursor is always dead-center, 3×.
 */
export function lensClampX(x: number, w: number): number {
  return Math.max(0, Math.min(w, x));
}
