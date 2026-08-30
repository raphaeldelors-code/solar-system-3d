/**
 * Plan 022 — time-scrub gesture math (pure, unit-tested).
 *
 * The scrub gesture (right-drag on desktop, 3-finger drag on touch) is a
 * 2D pad: horizontal travel moves through time, vertical travel moves the
 * speed slider. Both axes are computed here from raw pixel deltas; all
 * state and DOM wiring lives in main.ts.
 *
 * Design choices (see plans/022-time-scrub-right-drag-3finger-hud.md):
 * - X rate is FIXED and independent of the speed slider: the slider is a
 *   RATE (0.001…316 d/s), and tying travel to it would make a 300 px drag
 *   span 1 second at the slowest setting and ~15 000 days at the fastest.
 *   300 px ≈ 0.6 years of time travel, at every setting.
 * - Y rate is logarithmic so "up = faster" spans the whole slider range in
 *   a reasonable drag: 100 px ≈ one order of magnitude.
 */

/** Sim days advanced per pixel of horizontal drag (right = future). */
export const SCRUB_DAYS_PER_PX = 0.002;
/** Max |Δt| in sim days a single gesture may apply (≈ 27.4 yrs). */
export const SCRUB_CLAMP_DAYS = 10_000;
/** log10(days/s) per pixel of vertical drag (up = faster). 100 px ≈ 1 decade. */
export const SCRUB_SPEED_LOG_PER_PY = 0.01;
/** The speed slider's own domain (mirrors index.html #speed min/max). */
export const SPEED_LOG_MIN = -3;
export const SPEED_LOG_MAX = 2.5;

/**
 * Sim days added to the press epoch for a horizontal drag in pixels.
 * Positive px = future. Clamped to ±SCRUB_CLAMP_DAYS.
 */
export function scrubDeltaDays(deltaPx: number): number {
  return Math.max(-SCRUB_CLAMP_DAYS, Math.min(SCRUB_CLAMP_DAYS, deltaPx * SCRUB_DAYS_PER_PX));
}

/**
 * New speed slider value (log10 days/s) for a vertical drag. Up (negative
 * screen Δy) = faster. Clamped to the slider domain.
 */
export function scrubSpeedLog(baseLog: number, deltaPy: number): number {
  const v = baseLog - deltaPy * SCRUB_SPEED_LOG_PER_PY;
  return Math.max(SPEED_LOG_MIN, Math.min(SPEED_LOG_MAX, v));
}

/**
 * Human "how far did I travel" string: "+128 d" / "−5.3 yrs" / "0 d".
 */
export function formatScrubDelta(days: number): string {
  const a = Math.abs(days);
  if (a < 365) {
    const r = Math.round(a);
    const sign = r === 0 ? '' : days < 0 ? '−' : '+';
    return `${sign}${r} d`;
  }
  const r = Number((a / 365.25).toFixed(1));
  const sign = r === 0 ? '' : days < 0 ? '−' : '+';
  return `${sign}${r.toFixed(1)} yrs`;
}
