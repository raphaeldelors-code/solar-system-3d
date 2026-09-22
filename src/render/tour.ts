/**
 * Plan 047 R8 — the click-through guided tour.
 *
 * The old intro was an auto-dolly (a fixed 9.6 s camera path that played once
 * and then a 3-step coach card). The user wanted it back as a CLICK-THROUGH
 * tour: it opens on the Sky view (with free rotation while the step is up),
 * then each "Next" click shifts the camera to the next stop (System → Sun →
 * Earth) and waits for the next click, ending on the three core gestures.
 *
 * This module is PURE (no THREE, no DOM) so the step sequence is unit-testable.
 * The camera flights + card wiring live in main.ts.
 */

/** One tour stop. */
export interface TourStep {
  /**
   * Where the camera flies for this stop. Exactly one of `anchor` / `bodyId`
   * is set for a CAMERA stop; a GESTURE stop (the core-gesture cards) sets
   * neither and the camera stays where the previous stop left it.
   */
  anchor?: 'system' | 'constellations';
  bodyId?: string;
  /**
   * Arm `skyMode` for this stop: the constellation web stays visible, zoom is
   * locked, and the user can freely ROTATE while reading the card. Used by the
   * opening Sky stop.
   */
  sky?: boolean;
  /** Card content (the overlay the user liked). */
  icon: string;
  title: string;
  body: string;
  /** Camera flight duration in seconds (0 for gesture stops — no flight). */
  duration: number;
}

/**
 * The full tour, in order. Opens on the Sky (rotate freely), then the camera
 * shifts to the System, the Sun, and Earth on successive "Next" clicks, then
 * walks the three core gestures. The last three are the original plan-044 C2
 * onboarding steps, now folded into the tour so there is ONE overlay, not two.
 */
export const TOUR_STEPS: readonly TourStep[] = [
  {
    anchor: 'constellations',
    sky: true,
    icon: '🌌',
    title: 'The night sky',
    body: 'This is the sky around us. Drag to look around — the constellations stay with you as you rotate.',
    duration: 2.2,
  },
  {
    anchor: 'system',
    icon: '☀️',
    title: 'The solar system',
    body: 'Now the whole system: every planet and its moons, orbiting the Sun. Drag to orbit, scroll to zoom.',
    duration: 1.8,
  },
  {
    bodyId: 'sun',
    icon: '🔆',
    title: 'The Sun',
    body: 'The Sun anchors the system. Click it — or any body — to see its live facts.',
    duration: 1.8,
  },
  {
    bodyId: 'earth',
    icon: '🌍',
    title: 'Earth',
    body: 'Home. The camera follows it as it orbits — and its Moon orbits it in turn.',
    duration: 1.8,
  },
  {
    icon: '🖐️',
    title: 'Drag to look around',
    body: 'Click and drag anywhere in the sky to orbit the camera. Scroll or pinch to zoom in and out.',
    duration: 0,
  },
  {
    icon: '🪐',
    title: 'Click a planet to fly to it',
    body: 'Click any planet, moon, or star — or type a name in the Find box — and the camera flies there with live facts.',
    duration: 0,
  },
  {
    icon: '⏳',
    title: 'Scrub the timeline to travel in time',
    body: 'Drag the thin line at the top of the screen to jump across years and centuries. The speed slider sets how fast time flows.',
    duration: 0,
  },
] as const;

/** Total number of tour stops (drives the progress dots). */
export const TOUR_LENGTH = TOUR_STEPS.length;

/**
 * The camera stop a tour step flies to, or null for a gesture stop (no flight —
 * the camera stays where the previous stop left it).
 */
export function tourStepCamera(
  step: TourStep,
): { anchor?: 'system' | 'constellations'; bodyId?: string } | null {
  if (step.anchor) return { anchor: step.anchor };
  if (step.bodyId) return { bodyId: step.bodyId };
  return null;
}

/**
 * `sessionStorage` key marking that the tour already played in this session.
 * Set by the tour's finish handler; read once at boot. `sessionStorage` (not
 * `localStorage`) on purpose: the tour replays in a NEW session/tab, but not on
 * a refresh within the same tab — the standard "don't replay this intro"
 * semantics.
 */
export const TOUR_SEEN_KEY = 'solar_tour_seen';

/**
 * Whether the tour should play at all on this load.
 *
 * @param reducedMotion  `prefers-reduced-motion: reduce` (skip entirely).
 * @param introParam     the `?intro=` URL value (`'0'` = opt out), or null.
 * @param urlPinsView    true when a shared URL already pins a camera/follow —
 *                       a restore must not be overridden by the tour.
 * @param alreadySeen    true when the tour already finished in THIS browser
 *                       session (`sessionStorage` flag) — a plain reload must
 *                       not replay it.
 */
export function tourShouldPlay(
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
