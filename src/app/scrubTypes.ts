/**
 * Scrub gesture state types (plan 045 D6).
 *
 * These used to live in `main.ts` and were re-exported from there. They were
 * extracted to this module so the whole app-init section of `main.ts` can be
 * wrapped in an IIFE (the WebGL-availability guard needs an early `return`,
 * which is illegal at module top level, and `export` statements can't live
 * inside a function). `frameLoop.ts` and `scrub.ts` import these types from
 * here now.
 */

export type ScrubState = {
  startX: number;
  startY: number;
  startDays: number;
  startLog: number;
  movedX: boolean;
  movedY: boolean;
  /** Plan 024 F1: the PRESS year the gesture is clamped to — Jan 1 00:00 in
   *  days since J2000 + its length in days. "Zero" of the gesture is Jan 1
   *  of that year; it can never scrub out of it. */
  span0Days: number;
  spanLenDays: number;
};

export type ThreeFingerScrub = ScrubState & {
  live: boolean; // a scrub was once live (re-armed while <3 fingers remain)
  ended: boolean; // the end path already ran (lift or cancel)
};
