/**
 * Plan 035 F5 — cinematic intro timeline (pure; no THREE).
 *
 * The intro is a short, skippable dolly that plays ONCE on first load:
 * pull in from far-out → settle on the Sun → push to Earth, with the title
 * fading in over the first seconds and fading out near the end. The actual
 * camera legs are driven by the existing flight system in main.ts; this module
 * only describes the SEQUENCE (which body, how long) and the title timing, so
 * the math is unit-testable without a scene.
 *
 * Respect reduced-motion: `introShouldPlay()` returns false for reduced-motion
 * users, for an explicit `?intro=0`, and whenever a shared URL already pins a
 * view (so a restore link never gets overridden by a fly-around).
 */
import { cineEase } from './cameraFlight';

/** One intro camera leg. `bodyId` is the follow target (tracked while flying). */
export interface IntroLeg {
  bodyId: string;
  /** Leg duration in seconds. */
  duration: number;
  /** Camera offset multiplier for this leg (1 = default framing, <1 closer). */
  zoom: number;
  /**
   * Plan 047 R7: optional GLOBAL anchor override. When set, the leg flies to
   * `camAnchorFor(anchor)` (the Sky / System view) instead of framing a body —
   * and does NOT arm a body follow. Used by the new Sky + System establishing
   * legs that open the tour before the Sun→Earth dolly.
   */
  anchor?: 'system' | 'constellations';
}

/**
 * The intro legs, in order. Plan 047 R7: the tour now OPENS with a quick
 * Sky-view establishing shot (the constellation dome), then settles to the
 * System view, then runs the ORIGINAL Sun→Earth dolly + A6 tail unchanged.
 * Total ≈ 12.2 s.
 */
export const INTRO_LEGS: IntroLeg[] = [
  // NEW: quick SKY establishing shot — the constellation dome fills the frame
  // (the "we're deep in space" opening, now showing the sky).
  { bodyId: 'sun', duration: 2.4, zoom: 1.0, anchor: 'constellations' },
  // NEW: switch to the SYSTEM view (planets + orbits) — the hand-off the user
  // asked for before the original tour continues.
  { bodyId: 'sun', duration: 1.4, zoom: 1.0, anchor: 'system' },
  // ORIGINAL leg 1: far-out establishing pull into the Sun.
  { bodyId: 'sun', duration: 2.0, zoom: 3.0 },
  // ORIGINAL leg 2: settle / orbit the Sun.
  { bodyId: 'sun', duration: 1.6, zoom: 1.0 },
  // ORIGINAL leg 3: push to Earth (landing). The target eases Sun→Earth over
  // the whole leg (see stepFlight's liveTarget) so it reads as a deliberate
  // sweep, not a jump — the leg is deliberately the longest to keep that
  // sweep graceful.
  { bodyId: 'earth', duration: 2.2, zoom: 1.0 },
];

/** Total intro length in seconds (sum of the legs). */
export const INTRO_DURATION = INTRO_LEGS.reduce((a, l) => a + l.duration, 0);

/** Title element timing (seconds from intro start). */
export const TITLE_FADE_IN_START = 0.3;
export const TITLE_FADE_IN_END = 1.4;
export const TITLE_FADE_OUT_START = INTRO_DURATION - 1.6;
export const TITLE_FADE_OUT_END = INTRO_DURATION - 0.6;

/**
 * Whether the intro should play at all on this load.
 *
 * @param reducedMotion  `prefers-reduced-motion: reduce` (skip entirely).
 * @param introParam     the `?intro=` URL value (`'0'` = opt out), or null.
 * @param urlPinsView    true when a shared URL already pins a camera/follow —
 *                       a restore must not be overridden by the fly-around.
 * @param alreadySeen    true when an intro already finished in THIS browser
 *                       session (`sessionStorage` flag set by finishIntro) —
 *                       a plain reload must not replay the dolly.
 */
export function introShouldPlay(
  reducedMotion: boolean,
  introParam: string | null,
  urlPinsView: boolean,
  alreadySeen: boolean,
): boolean {
  if (reducedMotion) return false;
  if (introParam === '0') return false;
  if (urlPinsView) return false;
  if (alreadySeen) return false;
  return true;
}

/**
 * `sessionStorage` key marking that the intro already played in this session.
 * Set by `finishIntro` (main.ts); read once at boot. `sessionStorage` (not
 * `localStorage`) on purpose: the intro replays in a NEW session/tab, but not
 * on a refresh within the same tab — the standard "don't replay this intro"
 * semantics.
 */
export const INTRO_SEEN_KEY = 'solar_intro_seen';

/**
 * Title opacity at a given intro time. `t` is measured from the intro start
 * and SPANS the whole intro INCLUDING the A6 tail (0 .. INTRO_DURATION +
 * INTRO_TAIL_DURATION). Ramps in over [TITLE_FADE_IN_START,
 * TITLE_FADE_IN_END], holds at 1, then ramps out over the last ~1.6 s of the
 * intro (the tail) so the title is gone by the time the strip glows. Returns
 * 0 outside the intro window.
 */
export function titleOpacity(t: number): number {
  const total = INTRO_DURATION + INTRO_TAIL_DURATION;
  const outStart = total - 1.6;
  const outEnd = total - 0.6;
  if (t < TITLE_FADE_IN_START || t > outEnd) return 0;
  if (t < TITLE_FADE_IN_END) {
    return (t - TITLE_FADE_IN_START) / (TITLE_FADE_IN_END - TITLE_FADE_IN_START);
  }
  if (t < outStart) return 1;
  return (outEnd - t) / (outEnd - outStart);
}

// --- Plan 044 A6: the intro TAIL (ends on the time-scrub) ---
//
// The old intro ended the moment the camera landed on Earth — the app's
// signature feature (the live time-scrub timeline) was never shown. A6 adds a
// short TAIL after the last camera leg: the camera settles, the timeline strip
// glows into view, time visibly accelerates, and an event marker pops at the
// "you are here" position. The tail is pure timing math here (unit-tested);
// main.ts wires it to the DOM + clock. The cinematic easing itself
// (`cineEase`) lives in cameraFlight.ts, next to the cubic it replaces.

/** Tail length in seconds (camera settled on Earth; the strip glows + time ramps). */
export const INTRO_TAIL_DURATION = 2.5;

/**
 * The timeline speed (log scale, the `speedEl` value) at tail time `t`.
 * Eases from `fromSpeed` (the speed at the moment the tail starts) to
 * `toSpeed` (a pleasant "time is flowing" default) over the tail, using the
 * same quintic `cineEase` so the acceleration reads as deliberate. Clamped to
 * [0, INTRO_TAIL_DURATION].
 */
export function introTailSpeed(t: number, fromSpeed: number, toSpeed: number): number {
  const k = cineEase(t / INTRO_TAIL_DURATION);
  return fromSpeed + (toSpeed - fromSpeed) * k;
}

/**
 * The timeline strip's glow opacity at tail time `t`: 0 at the start, ramps to
 * 1 over the first ~40% of the tail (the strip "lights up"), holds, then fades
 * back to 0 over the last ~25% so the strip settles into its normal resting
 * state as the intro hands back to the user.
 */
export function introTailGlow(t: number): number {
  const d = INTRO_TAIL_DURATION;
  const inEnd = d * 0.4;
  const outStart = d * 0.75;
  if (t <= 0) return 0;
  if (t < inEnd) return t / inEnd;
  if (t < outStart) return 1;
  if (t >= d) return 0;
  return (d - t) / (d - outStart);
}
