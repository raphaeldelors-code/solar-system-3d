import type { EventType } from '../sim/events';

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

// --- Plan 023 F3: per-year event timeline (pure, unit-tested) --------------
// While scrubbing, the mini strip shows the CURRENT calendar year as a
// Jan→Dec track: the year's celestial events as small emoji at their day-of-
// year fraction, and a "you are here" caret at the current day-of-year. As
// the scrub crosses into a new year the strip reloads that year's events
// (lazy per-year findEvents, cached in src/render/yearEvents.ts). All the
// geometry here is width-agnostic (fractions in 0..1) so the strip can be any
// pixel width (desktop 180 px, phone 140 px) without re-deriving positions.

/** Astrological body symbols (the "small icons" the user asked for). */
export const BODY_SYMBOL: Record<string, string> = {
  mercury: '☿',
  venus: '♀',
  earth: '⊕',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
};
/** Fixed-emoji events that do not depend on a body id. */
export const EVENT_EMOJI: Partial<Record<EventType, string>> = {
  'solar-eclipse': '🌑',
  'lunar-eclipse': '🌕',
  'saturn-edge-on': '♄',
};
/** Structural shape of the events the timeline consumes (matches SimEvent). */
export interface TimelineEventLike {
  type: EventType;
  tDays: number;
  title: string;
  bodyId?: string;
  bodyId2?: string;
}
/**
 * Emoji for one event: fixed glyphs for eclipses / Saturn edge-on, the
 * body's astrological symbol for a transit / opposition, and the pair's two
 * symbols for a conjunction (e.g. "☿♀").
 */
export function eventEmoji(e: TimelineEventLike): string {
  const fixed = EVENT_EMOJI[e.type];
  if (fixed) return fixed;
  const sym = (id?: string) => (id && BODY_SYMBOL[id]) || '●';
  if (e.type === 'transit') return sym(e.bodyId);
  if (e.type === 'conjunction') return sym(e.bodyId) + sym(e.bodyId2);
  if (e.type === 'opposition') return sym(e.bodyId);
  return '✦';
}
export interface TimelineMarker {
  /** Day-of-year fraction 0..1 (Jan 1 → 0, Dec 31 → 1). */
  frac: number;
  emoji: string;
  title: string;
}
export interface TimelineLayoutResult {
  markers: TimelineMarker[]; // sorted by frac, capped at `cap`
  overflow: number; // markers beyond the cap (rendered as a "+N" chip)
  caretFrac: number; // "you are here" 0..1, clamped
}
/** Max event markers painted per year (busy years collapse the rest). */
export const TIMELINE_MARKER_CAP = 40;

/**
 * Lay out one calendar year's timeline. Pure + width-agnostic: returns
 * 0..1 fractions the caller turns into `left: <frac>·100%`. `span0Days` is
 * Jan 1 00:00 of the year (days since J2000); `spanLenDays` is that year's
 * length (365 or 366). Events outside the year are dropped; the caret is the
 * current sim time clamped to the year.
 */
export function timelineLayout(
  span0Days: number,
  spanLenDays: number,
  events: TimelineEventLike[],
  caretTDays: number,
  cap = TIMELINE_MARKER_CAP,
): TimelineLayoutResult {
  const span = spanLenDays > 0 ? spanLenDays : 1;
  const toFrac = (t: number) => Math.max(0, Math.min(1, (t - span0Days) / span));
  const markers: TimelineMarker[] = events
    .filter((e) => e.tDays >= span0Days - 1e-6 && e.tDays < span0Days + span + 1e-6)
    .map((e) => ({ frac: toFrac(e.tDays), emoji: eventEmoji(e), title: e.title }))
    .sort((a, b) => a.frac - b.frac);
  const overflow = Math.max(0, markers.length - cap);
  return { markers: markers.slice(0, cap), overflow, caretFrac: toFrac(caretTDays) };
}
