/**
 * F6 idle-skip — pure predicate, no three/DOM (unit-testable in Node).
 *
 * The render loop calls this every frame with the set of "is something
 * animating right now?" flags. When the answer is false AND the previous
 * frame already settled (no camera motion last frame) AND no input has
 * dirtied the scene, the loop can skip the expensive WebGL render +
 * per-frame DOM passes entirely, keeping the rAF chain alive so the next
 * interaction re-renders immediately.
 *
 * The one subtlety: OrbitControls with damping keeps nudging the camera for
 * ~a few frames after a drag ends. That motion is detected in the loop as a
 * camera-position delta and surfaced here as `cameraMoving`, so we never
 * skip while the view is still settling.
 */
export interface IdleFlags {
  /** Sim clock paused (planets/belts frozen). */
  paused: boolean;
  /** Camera position changed since the last frame (drag / damping / flight). */
  cameraMoving: boolean;
  /** Time scrub in progress (right-drag or 3-finger) — clock frozen, but the
   *  scrub overlay + moon line update, so we must render. */
  scrubbing: boolean;
  /** Camera flight in progress (find/pick/jump). */
  flightActive: boolean;
  /** Scale (visible<->true) morph in progress (B3 / `t`). */
  morphActive: boolean;
  /** Constellation sky-tour auto-yaw in progress. */
  skyTourActive: boolean;
  /** Cinematic intro (F5) in progress. */
  introActive: boolean;
}

/**
 * True when NOTHING is animating and the scene may be considered static.
 * Every animating signal must be off AND the sim paused.
 */
export function sceneIsStatic(f: IdleFlags): boolean {
  return (
    f.paused &&
    !f.cameraMoving &&
    !f.scrubbing &&
    !f.flightActive &&
    !f.morphActive &&
    !f.skyTourActive &&
    !f.introActive
  );
}

/**
 * True when we may skip the render pass this frame: the scene is static AND
 * we have already rendered at least once since the last dirty-mark (so the
 * very first frame / the frame right after any input is always rendered).
 */
export function maySkipRender(f: IdleFlags, sceneDirty: boolean): boolean {
  return sceneIsStatic(f) && !sceneDirty;
}
