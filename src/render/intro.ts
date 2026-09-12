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

/** One intro camera leg. `bodyId` is the follow target (tracked while flying). */
export interface IntroLeg {
  bodyId: string;
  /** Leg duration in seconds. */
  duration: number;
  /** Camera offset multiplier for this leg (1 = default framing, <1 closer). */
  zoom: number;
}

/** The three intro legs, in order. Total ≈ 5.8 s (≤ 6 s per spec). */
export const INTRO_LEGS: IntroLeg[] = [
  { bodyId: 'sun', duration: 2.0, zoom: 3.0 }, // far-out establishing pull
  { bodyId: 'sun', duration: 1.6, zoom: 1.0 }, // settle / orbit the Sun
  // Push to Earth (landing). The target eases Sun→Earth over the whole leg
  // (see stepFlight's liveTarget) so it reads as a deliberate sweep, not a
  // jump — the leg is deliberately the longest to keep that sweep graceful.
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
 */
export function introShouldPlay(
  reducedMotion: boolean,
  introParam: string | null,
  urlPinsView: boolean,
): boolean {
  if (reducedMotion) return false;
  if (introParam === '0') return false;
  if (urlPinsView) return false;
  return true;
}

/**
 * Title opacity at a given intro time (0..INTRO_DURATION). Ramps in over
 * [TITLE_FADE_IN_START, TITLE_FADE_IN_END], holds at 1, then ramps out over
 * [TITLE_FADE_OUT_START, TITLE_FADE_OUT_END]. Clamped; returns 0 outside the
 * intro window.
 */
export function titleOpacity(t: number): number {
  if (t < TITLE_FADE_IN_START || t > TITLE_FADE_OUT_END) return 0;
  if (t < TITLE_FADE_IN_END) {
    return (t - TITLE_FADE_IN_START) / (TITLE_FADE_IN_END - TITLE_FADE_IN_START);
  }
  if (t < TITLE_FADE_OUT_START) return 1;
  return (TITLE_FADE_OUT_END - t) / (TITLE_FADE_OUT_END - TITLE_FADE_OUT_START);
}
