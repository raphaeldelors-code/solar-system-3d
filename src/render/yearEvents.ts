/**
 * Plan 023 F3 — per-year event cache for the scrub timeline (DOM-free).
 *
 * The timeline shows the CURRENT calendar year's celestial events (the user's
 * ask: "a timeline representing the year on which the main events for this
 * year are positioned"). Scanning is expensive — one year of findEvents costs
 * ≈ 90–170 ms measured (coarse 0.5 d), so events are computed LAZILY, one
 * sweep per year, and cached in a Map for the page's lifetime: the first
 * touch of a year pays one deferred sweep, every later year-crossing scrub
 * over the same span is free.
 *
 * The caller (main.ts) owns scheduling: it defers each sweep to a
 * requestAnimationFrame so the gesture's own frame (caret + ticks) paints
 * first and the ~0.1 s scan never blocks a pointermove.
 */
import { findEvents, type Event as SimEvent } from '../sim/events';
import { J2000_UTC } from '../sim/types';

export interface YearEvents {
  year: number;
  /** Jan 1 00:00 of `year`, days since J2000. */
  span0Days: number;
  /** Length of `year` in days (365 or 366). */
  spanLenDays: number;
  events: SimEvent[];
}

/** Coarse scan step for timeline sweeps (half a day — the panel's 0.2 d is
 *  overkill for a 12 px-per-month strip; 0.5 d still catches every event
 *  the detectors refine on, measured identical event counts). */
const TIMELINE_COARSE_STEP_DAYS = 0.5;
const DAY_MS = 86_400_000;

const cache = new Map<number, YearEvents>();

/**
 * Pure date math: Jan 1 00:00 of `year` in days since J2000 + the year's
 * length in days (365/366). Cheap — the event sweep is NOT included, so the
 * timeline can position its caret/ticks for a not-yet-swept year.
 */
export function yearSpan(year: number): { span0Days: number; spanLenDays: number } {
  const jan1 = Date.UTC(year, 0, 1);
  const jan1Next = Date.UTC(year + 1, 0, 1);
  return {
    span0Days: (jan1 - J2000_UTC) / DAY_MS,
    spanLenDays: (jan1Next - jan1) / DAY_MS,
  };
}

/** Cache probe: has `year` already been swept? (no sweep is triggered). */
export function hasYearEvents(year: number): boolean {
  return cache.has(year);
}

/**
 * Events for one calendar year, Jan 1 00:00 → Jan 1 of the next year,
 * computed on first call and cached afterwards (same result for the same
 * year — the ephemeris is deterministic).
 */
export function yearEvents(year: number): YearEvents {
  const hit = cache.get(year);
  if (hit) return hit;
  const { span0Days, spanLenDays } = yearSpan(year);
  const events = findEvents(span0Days, span0Days + spanLenDays, {
    coarseStepDays: TIMELINE_COARSE_STEP_DAYS,
  });
  const out: YearEvents = { year, span0Days, spanLenDays, events };
  cache.set(year, out);
  return out;
}

/** Test hook: drop one year (or all) from the cache. */
export function _clearYearEventsCache(year?: number): void {
  if (year === undefined) cache.clear();
  else cache.delete(year);
}
