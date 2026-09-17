/**
 * Plan 044 C2 — 3-step first-run onboarding.
 *
 * A first-timer used to land on a key map. Instead: after the cinematic
 * intro ends, a dismissible 3-card coach overlay walks through the three
 * core gestures — (1) drag to look, (2) click a planet to fly to it,
 * (3) scrub the timeline to travel through time.
 *
 * Shown at most ONCE per browser (localStorage `ss3d.onboarded.v1`).
 * The pure state logic lives here (unit-tested); the DOM wiring is in
 * main.ts (showOnboarding / dismissOnboarding).
 */

export const ONBOARD_KEY = 'ss3d.onboarded.v1';

export interface OnboardStep {
  /** Short imperative title. */
  title: string;
  /** One-sentence body. */
  body: string;
  /** Emoji glyph (user preference: plain, instantly-readable symbols). */
  icon: string;
  /**
   * CSS selector of the element to spotlight (dimmed + outlined) while
   * this step is active. null = center of screen (the 3D view itself).
   */
  target: string | null;
}

export const ONBOARD_STEPS: readonly OnboardStep[] = [
  {
    title: 'Drag to look around',
    body: 'Click and drag anywhere in the sky to orbit the camera. Scroll or pinch to zoom in and out.',
    icon: '🖐️',
    target: null,
  },
  {
    title: 'Click a planet to fly to it',
    body: 'Click any planet, moon, or star — or type a name in the Find box — and the camera flies there with live facts.',
    icon: '🪐',
    target: '#find',
  },
  {
    title: 'Scrub the timeline to travel in time',
    body: 'Drag the thin line at the top of the screen to jump across years and centuries. The speed slider sets how fast time flows.',
    icon: '⏳',
    target: '#hud-timeline',
  },
] as const;

/**
 * True when the coach overlay should be shown: the user has never
 * completed/dismissed it (no localStorage flag). Safe in non-browser
 * environments (returns true — the caller decides).
 */
export function shouldShowOnboarding(
  storage: Pick<Storage, 'getItem'> = globalThis.localStorage,
): boolean {
  try {
    return storage.getItem(ONBOARD_KEY) !== '1';
  } catch {
    return true; // private mode / no storage — show once per session
  }
}

/** Persist "done" so the overlay never shows again. */
export function markOnboarded(storage: Pick<Storage, 'setItem'> = globalThis.localStorage): void {
  try {
    storage.setItem(ONBOARD_KEY, '1');
  } catch {
    /* ignore — overlay simply reappears next load */
  }
}
