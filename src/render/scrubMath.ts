import type { EventType } from '../sim/events';
import { J2000_UTC } from '../sim/types';

/**
 * Plan 024 F1 — time-scrub gesture math (pure, unit-tested).
 *
 * The scrub gesture (right-drag on desktop, 3-finger drag on touch) is a
 * 2D pad: horizontal travel moves through time, vertical travel moves the
 * speed slider. All state and DOM wiring lives in main.ts.
 *
 * Horizontal model (plan 024 — speed coupling and easing REMOVED per user
 * request: "the speed of the drag left or right should be consistent
 * regardless of the playback speed"):
 * - LINEAR and speed-independent: `SCRUB_DAYS_PER_PX = 1` — one pixel of
 *   horizontal drag is always one sim day, at every playback speed.
 *   A ~365 px drag therefore sweeps a full year: the full range of the
 *   gesture covers the current year.
 * - The gesture is CLAMPED to the calendar year the pointer was pressed in
 *   (bounds = Jan 1 → Dec 31 of that year). "Zero" is always Jan 1 of the
 *   current year — it does NOT reset to the press/landing date, and the
 *   scrub can never cross out of that year. Year hopping is the job of
 * the ±1/±5 year-jump buttons (plan 024 F3). Plan 025 F2 then dropped those
 * buttons from the minimal pane: year hopping now lives on the TOP full-
 * width event bar (plan 025 F3).
 * - Y rate is logarithmic so "up = faster" spans the whole slider range in
 *   a reasonable drag: 100 px ≈ one order of magnitude.
 */

/** Sim days of time per pixel of horizontal drag (speed-independent). */
export const SCRUB_DAYS_PER_PX = 1;
/** log10(days/s) per pixel of vertical drag (up = faster). 100 px ≈ 1 decade. */
export const SCRUB_SPEED_LOG_PER_PY = 0.01;
/** The speed slider's own domain (mirrors index.html #speed min/max). */
export const SPEED_LOG_MIN = -3;
export const SPEED_LOG_MAX = 2.5;

/**
 * Pure date math: Jan 1 00:00 UTC of `year` in days since J2000, plus the
 * year's length in days (365 or 366). J2000 is at 2000-01-01 12:00 UTC, so
 * `yearSpanDays(2000).span0Days === -0.5`.
 */
export function yearSpanDays(year: number): { span0Days: number; spanLenDays: number } {
  const jan1 = Date.UTC(year, 0, 1);
  const jan1Next = Date.UTC(year + 1, 0, 1);
  return {
    span0Days: (jan1 - J2000_UTC) / 86_400_000,
    spanLenDays: (jan1Next - jan1) / 86_400_000,
  };
}

/**
 * Plan 024 F3: add whole CALENDAR years to a UTC date, preserving month,
 * day, and time of day (so "June 15, 2026 +1 y" is June 15, 2027 — the
 * jump lands on the same season of the target year). Feb 29 clamps to
 * Feb 28 in non-leap years (the calendar date that does not exist).
 * Pure date math — unit-tested.
 */
export function addYearsUtc(date: Date, years: number): Date {
  const y = date.getUTCFullYear() + years;
  const m = date.getUTCMonth();
  let d = date.getUTCDate();
  const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  if (d > daysInMonth) d = daysInMonth;
  return new Date(
    Date.UTC(
      y,
      m,
      d,
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds(),
    ),
  );
}

/**
 * Sim days for a horizontal scrub move: the press epoch plus a LINEAR
 * `deltaPx · SCRUB_DAYS_PER_PX`, clamped to the press year
 * `[span0Days, span0Days + spanLenDays)`. Right = future. Independent of
 * any playback speed.
 */
export function scrubClampToYear(
  startDays: number,
  span0Days: number,
  spanLenDays: number,
  deltaPx: number,
): number {
  const t = startDays + deltaPx * SCRUB_DAYS_PER_PX;
  return Math.max(span0Days, Math.min(span0Days + spanLenDays - 1e-6, t));
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

/**
 * Recognizable per-body EMOJI (plan 024 F2 — the old astrological
 * symbols ☿♀♂♄ were meaningless to most users, per the user). The emoji
 * names the body itself, so a marker reads at a glance: ⚪ Mercury,
 * 💛 Venus, 🌍 Earth, 🔴 Mars, 🟠 Jupiter, 🪐 Saturn (rings), 🔵
 * Uranus, 🟣 Neptune.
 */
export const BODY_EMOJI: Record<string, string> = {
  sun: '☀️',
  moon: '🌙',
  mercury: '⚪',
  venus: '💛',
  earth: '🌍',
  mars: '🔴',
  jupiter: '🟠',
  saturn: '🪐',
  uranus: '🔵',
  neptune: '🟣',
};
/** Fixed-emoji events that do not depend on a body id. */
export const EVENT_EMOJI: Partial<Record<EventType, string>> = {
  'solar-eclipse': '🌑',
  'lunar-eclipse': '🌕',
  'saturn-edge-on': '🪐',
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
 * body's emoji for a transit / opposition, and the pair's two emojis for a
 * conjunction (e.g. "⚪💛" Mercury–Venus).
 */
export function eventEmoji(e: TimelineEventLike): string {
  const fixed = EVENT_EMOJI[e.type];
  if (fixed) return fixed;
  const sym = (id?: string) => (id && BODY_EMOJI[id]) || '●';
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

// --- Plan 025 F3: top full-width bar month axis + hover probe ---------------

const MONTH_ABBR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Plan 025 F3 — pure month-axis geometry. The top bar spans the whole year,
 * so it gets 12 month starts (Jan 1 … Dec 1) each carrying its short label,
 * rotated 45° (the CSS does the rotation; this is position data). The bar's
 * right edge IS year-end, so there is no "Dec 31" tick — the months read
 * Jan…Dec left→right. `spanLenDays` is 365/366. (The static DOM uses the
 * 365-day fractions; on a leap year they drift < 0.2 % — invisible.)
 */
export interface MonthTick {
  abbr: string;
  /** day-of-year (0-indexed) of the 1st of this month, per the fixed 2001
   *  (non-leap) calendar — Jan=0 … Dec=334. The static DOM hardcodes these
   *  /365 fractions; on a leap year they drift < 0.2 % (invisible). */
  day: number;
  /** 0..1 fraction across `spanLenDays` (day / spanLenDays). */
  frac: number;
}

/** Pure: the 12 month starts (Jan 1 … Dec 1) for a year of `spanLenDays` days. */
export function monthSeparators(spanLenDays: number): MonthTick[] {
  const span = spanLenDays > 0 ? spanLenDays : 365;
  const out: MonthTick[] = [];
  for (let m = 0; m < 12; m++) {
    const day = (Date.UTC(2001, m, 1) - Date.UTC(2001, 0, 1)) / 86_400_000;
    if (day >= span) continue; // defensive: never for 365/366
    out.push({ abbr: MONTH_ABBR[m], day, frac: day / span });
  }
  return out;
}

/** Plan 025 F3 — pure "MMM D" UTC readout for a year + day-of-year. */
export function fmtMonthDayUtc(year: number, dayOfYear: number): string {
  const d = new Date(Date.UTC(year, 0, 1 + Math.floor(dayOfYear)));
  return `${MONTH_ABBR[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** The events the bar's hover probe consumes (positions in px from bar left). */
export interface BarEvent {
  /** day-of-year (0-indexed) the event falls on. */
  day: number;
  /** x, px from the bar's left edge (caller precomputes: frac · width). */
  x: number;
  emoji: string;
  title: string;
}

/**
 * Plan 025 F3 — pure nearest-event probe for the hover tooltip. Returns the
 * event whose x is closest to `xPx` within `radiusPx`, else null (ties →
 * the leftmost/earlier one, since strict < keeps the first best).
 */
export function nearestEventX(events: BarEvent[], xPx: number, radiusPx: number): BarEvent | null {
  let best: BarEvent | null = null;
  let bestDist = Infinity;
  for (const ev of events) {
    const d = Math.abs(ev.x - xPx);
    if (d <= radiusPx && d < bestDist) {
      bestDist = d;
      best = ev;
    }
  }
  return best;
}

/** Plan 025 F4 — magnifier geometry constants. */
export const LENS_ZOOM = 8; // horizontal zoom inside the lens
// The magnifier window's WIDTH in px (== #hud-tl-lens width:220px). It is the
// horizontal window re-rendered at LENS_ZOOM×, so it drives toLensPx, the
// pointer clamp, and the event cull in main.ts. ~220 px wide keeps the 8×
// window readable on a phone without a huge disc.
export const LENS_W = 220;
// The magnifier window's HEIGHT in px (== #hud-tl-lens height:96px). Not used
// by the mapping (the window is LENS_W wide); kept so the CSS/JS box stays in
// one place. A wide 220×96 pill — not a circle — suits the top strip: it
// hangs below the line and reads 8× without swallowing the month labels.
export const LENS_H = 96;

/**
 * Plan 025 F4 — pure lens mapping. The magnifier window is LENS_W px wide,
 * centered on `lensX` (px, bar space). It re-renders the LENS_W-px bar-space
 * window around `lensX` magnified LENS_ZOOM×. `toLensPx` maps any bar-space x
 * into lens-track coordinates (px from the window's left edge); `centerDay`
 * is the day-of-year at the window center — the value shown in the date
 * readout.
 */
export function lensMap(
  lensX: number,
  width: number,
  spanLenDays: number,
): { centerDay: number; toLensPx: (barX: number) => number } {
  const span = spanLenDays > 0 ? spanLenDays : 365;
  const centerDay = (lensX / width) * span;
  return {
    centerDay,
    toLensPx: (barX: number) => (barX - lensX) * LENS_ZOOM + LENS_W / 2,
  };
}
