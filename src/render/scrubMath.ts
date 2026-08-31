/**
 * Plan 023 F1 — time-scrub gesture math (pure, unit-tested).
 *
 * The scrub gesture (right-drag on desktop, 3-finger drag on touch) is a
 * 2D pad: horizontal travel moves through time, vertical travel moves the
 * speed slider. All state and DOM wiring lives in main.ts.
 *
 * Horizontal model (plan 023, superseding plan 022's fixed 0.002 d/px):
 * - Travel is proportional to the CURRENT speed: full span = one hour of
 *   sim time at the gesture's starting speed, capped at ±SCRUB_CLAMP_DAYS.
 *   A 300 px drag therefore travels a large fraction of that span at any
 *   setting — "the actual speed", never a fixed slow crawl.
 * - The shape is f(x) = sign(x)·x²/(1+x²) with x = px/SCRUB_SPAN_PX:
 *   ZERO slope at the press point (a twitch near the center moves almost no
 *   time — the deliberate "slower near the center" easing that kills
 *   oscillation around the click point), rising steeply and saturating to
 *   the full span (max speed × 1 h) at the drag edges. A tanh was rejected:
 *   it is FASTEST at the center — the exact opposite of what is wanted.
 * - The speed reference is the gesture's STARTING speed (startLog), so a
 *   simultaneous vertical speed-drag cannot rescale the time axis
 *   mid-gesture.
 * - Y rate is logarithmic so "up = faster" spans the whole slider range in
 *   a reasonable drag: 100 px ≈ one order of magnitude.
 */

/** Max |Δt| in sim days a single gesture may apply (≈ 27.4 yrs). */
export const SCRUB_CLAMP_DAYS = 10_000;
/** Drag pixels that approach the full span (quadratic-saturation argument scale). */
export const SCRUB_SPAN_PX = 500;
/** Sim seconds of time covered by the full span at any speed. */
export const SCRUB_SPAN_SIM_SECONDS = 3600;
/** log10(days/s) per pixel of vertical drag (up = faster). 100 px ≈ 1 decade. */
export const SCRUB_SPEED_LOG_PER_PY = 0.01;
/** The speed slider's own domain (mirrors index.html #speed min/max). */
export const SPEED_LOG_MIN = -3;
export const SPEED_LOG_MAX = 2.5;

/**
 * Full span (sim days) of one horizontal scrub at a given speed: one hour
 * of sim time at that speed, capped at ±SCRUB_CLAMP_DAYS.
 */
export function scrubSpanDays(maxSpeedDaysPerSec: number): number {
  return Math.min(SCRUB_CLAMP_DAYS, maxSpeedDaysPerSec * SCRUB_SPAN_SIM_SECONDS);
}

/**
 * Signed travel fraction in (−1, 1) for a horizontal drag in pixels:
 * f(x) = sign(x)·x²/(1+x²) with x = px/SCRUB_SPAN_PX — zero slope at the
 * press point, 0.26 at ±300 px, 0.5 at ±500 px, 0.95 at ±2179 px.
 * Right = future.
 */
export function scrubXToT(deltaPx: number): number {
  const x = deltaPx / SCRUB_SPAN_PX;
  return (Math.sign(x) * (x * x)) / (1 + x * x);
}

/**
 * Sim days added to the press epoch for a horizontal drag, at a speed of
 * `maxSpeedDaysPerSec` (the gesture's starting speed, days/second).
 * Positive px = future. Bounded by ±scrubSpanDays(speed).
 */
export function scrubDeltaDays(maxSpeedDaysPerSec: number, deltaPx: number): number {
  return scrubSpanDays(maxSpeedDaysPerSec) * scrubXToT(deltaPx);
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
