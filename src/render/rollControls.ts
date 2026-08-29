/**
 * Plan 017 F3 + Plan 018 — ROLL gesture with an EXCLUSIVE 2-finger mode.
 *
 * Mouse: RIGHT-drag rolls the view AROUND ITS OWN Z AXIS (the view axis),
 * i.e. spins the screen in place. LEFT drag stays on the trackball (free
 * X+Y rotation, pole-passing). The view center never moves: the roll axis
 * passes through the camera and the target — so `rollPose` rotates ONLY
 * `camera.up`; position and target sit on the axis and stay exactly fixed.
 *
 * Touch: 1 finger = trackball orbit. 2 fingers = ONE exclusive gesture,
 * decided by a startup race (plan 018): a real 2-finger gesture always
 * contains a bit of pinch AND a bit of twist, so running both in parallel
 * made the pinch (visually dominant) "win" and roll felt dead. Instead,
 * from the second finger's touch-down the race accumulates (a) the total
 * inter-finger ANGLE change and (b) the total inter-finger DISTANCE change;
 * whichever crosses its threshold first locks the gesture mode:
 *   - angle ≥ TWO_FINGER_TWIST_THRESHOLD  → ROLL mode: twist applies 1:1
 *     (including the pre-lock accumulation), the trackball's pinch zoom is
 *     suppressed for the rest of the gesture, and the tiny pre-lock zoom
 *     the trackball already applied is undone so position/target stay
 *     EXACTLY fixed;
 *   - distance ≥ TWO_FINGER_PINCH_THRESHOLD → ZOOM mode: stock trackball
 *     pinch does everything, the roll listener stays silent.
 * A micro-gesture below both thresholds decides nothing; the race restarts
 * from the live pose on the next move. Releasing one finger ends the
 * gesture — the survivor becomes a 1-finger orbit and the next 2-finger
 * gesture races afresh.
 *
 * Panning is deleted entirely (the stock trackball is created with
 * `noPan = true`), so the right button and the 2-finger midpoint pan are
 * inert there and the two input paths never fight.
 *
 * This listener runs in PARALLEL with TrackballControls on the same canvas
 * and honors `controls.enabled` (flights / the sky tour disable the
 * controls while they run).
 *
 * PURE CORES (no DOM dependency — unit-tested in Node,
 * tests/rollControls.test.ts): {@link twistDelta}, {@link rollPose},
 * {@link twistOrPinch} and {@link TwistPinchRace}.
 */
import * as THREE from 'three';
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

/**
 * Roll speed: radians of view-axis rotation per CSS pixel of horizontal
 * drag, per 1.0 of the trackball `rotateSpeed`. Derived so a roll gesture
 * turns the screen at the same on-screen speed as a trackball drag:
 * trackball's screen-rotation-per-pixel ≈ 0.00184 × rotateSpeed at the
 * default 50° FOV viewport circle (2·f·tan(fov/2)/viewportHeight, where
 * f = viewportHeight/2/tan(fov/2) → 1/tan(fov/2) ≈ 1.19 for fov 50°).
 */
export const ROLL_SPEED_FACTOR = 0.00184;

/**
 * Plan 018 — total inter-finger ANGLE change (radians) that locks a 2-finger
 * gesture as ROLL. ≈3.4°: a deliberate twist accumulates ≥1° per pointermove
 * at 60 Hz, so ~3 events (≈50 ms) of clear twist wins the race, while the
 * incidental angle noise of a deliberate pinch stays under it.
 */
export const TWO_FINGER_TWIST_THRESHOLD = 0.0592;

/**
 * Plan 018 — total inter-finger DISTANCE change (as a fraction of the start
 * distance) that locks a 2-finger gesture as ZOOM. 10%: a deliberate pinch
 * moves 20–50% within a few events; a deliberate twist keeps the distance
 * within a few percent.
 */
export const TWO_FINGER_PINCH_THRESHOLD = 0.1;

/** A 2-D pointer position (CSS pixels). */
export interface Pt {
  x: number;
  y: number;
}

/**
 * Change in the inter-finger angle (radians) between two 2-finger poses — the
 * ROLL a twist gesture should apply, 1:1. A is the first finger, B the second;
 * the angle is that of the A→B vector (`atan2(B−A)`), so a pure PINCH (fingers
 * sliding radially toward/away from each other) changes no angle and returns 0,
 * while a TWIST (fingers rotating about their midpoint) returns the rotation.
 * The result is normalized to (−π, π] so crossing the ±180° wrap doesn't jump.
 *
 * PURE: no DOM dependency — unit-tested in Node (tests/rollControls.test.ts).
 */
export function twistDelta(a0: Pt, b0: Pt, a1: Pt, b1: Pt): number {
  const ang = (a: Pt, b: Pt): number => Math.atan2(b.y - a.y, b.x - a.x);
  let d = ang(a1, b1) - ang(a0, b0);
  if (d > Math.PI) d -= 2 * Math.PI;
  else if (d < -Math.PI) d += 2 * Math.PI;
  return d;
}

/**
 * Classify a 2-finger pose pair (gesture start → now) as roll, zoom, or
 * pending — the plan 018 exclusive-gesture rule. Each accumulated component
 * is normalized by its own threshold; whichever has the LARGER ratio wins
 * (it must have crossed its threshold, ratio ≥ 1). This is pace-robust: a
 * slow pinch that drifts a few degrees never loses to a slow twist, and a
 * fast twist that nudges the fingers inward is not swallowed by the pinch.
 * A true tie (equal ratios ≥ 1) goes to ROLL — the rarer, harder-to-trigger
 * gesture (the whole point of plan 018 is making it reachable).
 *
 * PURE: unit-tested in Node (tests/rollControls.test.ts).
 */
export function twistOrPinch(
  start: { a: Pt; b: Pt },
  now: { a: Pt; b: Pt },
  opts: { twistThreshold?: number; pinchThreshold?: number } = {},
): { twist: number; pinch: number; decision: 'roll' | 'zoom' | 'pending' } {
  const t = opts.twistThreshold ?? TWO_FINGER_TWIST_THRESHOLD;
  const p = opts.pinchThreshold ?? TWO_FINGER_PINCH_THRESHOLD;
  const twist = twistDelta(start.a, start.b, now.a, now.b);
  const d0 = Math.hypot(start.b.x - start.a.x, start.b.y - start.a.y);
  const d1 = Math.hypot(now.b.x - now.a.x, now.b.y - now.a.y);
  const pinch = d0 > 1e-6 ? (d1 - d0) / d0 : 0;
  const rT = Math.abs(twist) / t;
  const rP = Math.abs(pinch) / p;
  let decision: 'roll' | 'zoom' | 'pending' = 'pending';
  if (rT >= 1 && rT >= rP) decision = 'roll';
  else if (rP >= 1) decision = 'zoom';
  return { twist, pinch, decision };
}

/** The effective mode of a 2-finger gesture. */
export type TwoFingerMode = 'none' | 'roll' | 'zoom';

/**
 * The per-gesture state machine behind the exclusive 2-finger input (plan
 * 018). Feed it the live pair via {@link TwistPinchRace.update} on every
 * pointermove; it applies roll callbacks 1:1 once (and only once the race
 * has locked the gesture) as ROLL, and stays completely silent in ZOOM mode
 * (the stock trackball pinch owns the gesture then).
 *
 * PURE: no DOM dependency — unit-tested in Node
 * (tests/rollControls.test.ts).
 */
export class TwistPinchRace {
  private readonly twistThreshold: number;
  private readonly pinchThreshold: number;
  private readonly cb: {
    onRoll?: (theta: number) => void;
    onLock?: (mode: 'roll' | 'zoom') => void;
    onUnlock?: () => void;
  };
  private startA: Pt | null = null;
  private startB: Pt | null = null;
  private prevA: Pt | null = null;
  private prevB: Pt | null = null;
  private _mode: TwoFingerMode = 'none';

  constructor(
    opts: {
      twistThreshold?: number;
      pinchThreshold?: number;
      onRoll?: (theta: number) => void;
      onLock?: (mode: 'roll' | 'zoom') => void;
      onUnlock?: () => void;
    } = {},
  ) {
    this.twistThreshold = opts.twistThreshold ?? TWO_FINGER_TWIST_THRESHOLD;
    this.pinchThreshold = opts.pinchThreshold ?? TWO_FINGER_PINCH_THRESHOLD;
    this.cb = opts;
  }

  /** Current mode (latched once the race locks, until reset). */
  get mode(): TwoFingerMode {
    return this._mode;
  }

  /** The pose the race was seeded with (gesture start), if any. */
  get startPose(): { a: Pt; b: Pt } | null {
    return this.startA && this.startB ? { a: this.startA, b: this.startB } : null;
  }

  /** The last pose fed via update(), if any. */
  get nowPose(): { a: Pt; b: Pt } | null {
    return this.prevA && this.prevB ? { a: this.prevA, b: this.prevB } : null;
  }

  /** Begin a fresh 2-finger gesture (call when the second finger lands). */
  seed(a: Pt, b: Pt): void {
    if (this._mode !== 'none') this.cb.onUnlock?.();
    this._mode = 'none';
    this.startA = { x: a.x, y: a.y };
    this.startB = { x: b.x, y: b.y };
    this.prevA = this.startA;
    this.prevB = this.startB;
  }

  /** Feed the live 2-finger pose. Returns the effective mode. */
  update(a: Pt, b: Pt): TwoFingerMode {
    if (!this.startA || !this.startB || !this.prevA || !this.prevB) {
      return this._mode;
    }
    if (this._mode === 'none') {
      const cls = twistOrPinch(
        { a: this.startA, b: this.startB },
        { a, b },
        {
          twistThreshold: this.twistThreshold,
          pinchThreshold: this.pinchThreshold,
        },
      );
      if (cls.decision !== 'pending') {
        this._mode = cls.decision;
        this.cb.onLock?.(cls.decision);
        if (cls.decision === 'roll') {
          // Apply the FULL accumulation from the gesture start, not just
          // this event's delta, so the roll is 1:1 over the whole gesture.
          this.cb.onRoll?.(cls.twist);
        }
      }
    } else if (this._mode === 'roll') {
      // Latched: keep applying 1:1 increments for the rest of the gesture.
      this.cb.onRoll?.(twistDelta(this.prevA, this.prevB, a, b));
    }
    this.prevA = { x: a.x, y: a.y };
    this.prevB = { x: b.x, y: b.y };
    return this._mode;
  }

  /** End the gesture (finger lifted): latch released, re-armed via seed(). */
  reset(): void {
    if (this._mode !== 'none') this.cb.onUnlock?.();
    this._mode = 'none';
    this.startA = this.startB = this.prevA = this.prevB = null;
  }
}

/**
 * Rotate the camera by `theta` radians AROUND the view axis (Z), in place.
 * The roll axis passes through the camera position and the target, so BOTH
 * stay exactly fixed; only `camera.up` spins (its in-plane component rotates
 * by `theta`, its in-axis component is preserved) — the definition of a
 * screen-space roll: the image turns, the point of aim does not.
 *
 * Degenerate case: when `up` is (near-)parallel to the view axis (looking
 * straight along it) the roll is ambiguous; we pick a deterministic
 * reference perpendicular to the axis and roll from there (the result is a
 * finite, well-defined pose).
 */
export function rollPose(
  camera: THREE.PerspectiveCamera,
  target: THREE.Vector3,
  theta: number,
): void {
  if (theta === 0) return;
  const f = _rollF.subVectors(target, camera.position).normalize();
  const u = _rollU.copy(camera.up);
  // Split up into its in-view-plane component (what a screen-space roll
  // acts on) and its in-axis component (lookAt ignores it, but we PRESERVE
  // both magnitudes so repeated rolls compose exactly — a 2π roll returns
  // to the start).
  const axisComp = u.dot(f);
  u.addScaledVector(f, -axisComp);
  let planeLen = u.length();
  if (planeLen < 1e-10) {
    // up ≈ parallel to the axis: pick a deterministic reference in-plane.
    _rollRef.set(0, 1, 0);
    if (Math.abs(f.dot(_rollRef)) > 0.9) _rollRef.set(1, 0, 0);
    u.copy(_rollRef).addScaledVector(f, -f.dot(_rollRef)).normalize();
    planeLen = 1;
  } else {
    u.divideScalar(planeLen);
  }
  _rollQ.setFromAxisAngle(f, theta);
  u.applyQuaternion(_rollQ).multiplyScalar(planeLen).addScaledVector(f, axisComp);
  camera.up.copy(u);
}

// Allocation-free scratch (one set — the roll math is never reentrant).
const _rollF = new THREE.Vector3();
const _rollU = new THREE.Vector3();
const _rollRef = new THREE.Vector3();
const _rollQ = new THREE.Quaternion();

export interface RollControls {
  dispose: () => void;
}

/**
 * Attach the roll gesture to the renderer canvas. Must be called with the
 * trackball controls ALREADY configured (`noPan = true`), so the right
 * button and the 2-finger midpoint pan are inert there.
 */
export function createRollControls(
  domElement: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  controls: TrackballControls,
): RollControls {
  /** Live mouse (non-touch) pointer currently down, if any. */
  let mouseId: number | null = null;
  let lastMouseX = 0;
  /** The two touch pointers being tracked for the 2-finger gesture, if any. */
  let touchA: { id: number; x: number; y: number } | null = null;
  let touchB: { id: number; x: number; y: number } | null = null;
  /** The active 2-finger gesture's race (plan 018). */
  let race: TwistPinchRace | null = null;
  /**
   * Eye length at the moment the second finger landed — the zoom reference
   * the lock restores, so a roll gesture ends with position and target
   * EXACTLY where the 2-finger gesture began (the trackball zooms on every
   * frame before the race decides, so its baked-in zoom is undone).
   */
  let seedEyeLen = 0;

  /** Apply a roll of `theta` radians around the view axis (Z). */
  const applyRoll = (theta: number): void => {
    if (!controls.enabled) return;
    if (theta === 0) return;
    rollPose(camera, controls.target, theta);
    // The trackball re-reads the position (its _eye) on its next update()
    // and lookAt() honors the rolled camera.up — so the roll composes with
    // trackball rotation and the follow-pivot shift. Emit change so the
    // shareable URL stays in sync (same event the trackball emits).
    controls.dispatchEvent({ type: 'change' });
  };

  /**
   * Suppress (or re-arm) the stock trackball's pinch zoom for the duration
   * of a gesture locked as ROLL. three's update() gates _zoomCamera() on
   * noZoom, and _checkDistances() skips while noZoom && noPan (noPan is
   * permanent here) — safe, because a locked roll gesture never changes the
   * eye length (position is re-dodged back to exactly start length below).
   */
  const gateZoom = (suppress: boolean): void => {
    controls.noZoom = suppress;
  };

  const onPointerDown = (e: PointerEvent): void => {
    if (!controls.enabled) return;
    if (e.pointerType === 'touch') {
      // Track the first two fingers; the SECOND finger's landing seeds a
      // fresh exclusive-gesture race (plan 018).
      if (!touchA) touchA = { id: e.pointerId, x: e.clientX, y: e.clientY };
      else if (!touchB && e.pointerId !== touchA.id) {
        touchB = { id: e.pointerId, x: e.clientX, y: e.clientY };
        // Zoom reference for the roll-lock undo: the eye length AT gesture
        // start (before the trackball has zoomed on this gesture's frames).
        seedEyeLen = camera.position.distanceTo(controls.target);
        race = new TwistPinchRace({
          onRoll: applyRoll,
          onLock: (mode) => {
            if (mode !== 'roll') return;
            gateZoom(true);
            // The trackball zoomed on every frame BEFORE our lock (it owns
            // the gesture until the race decides) — its update() scaled the
            // eye by the inter-finger distance ratio. A roll must keep
            // position and target EXACTLY where the gesture began, so undo
            // the baked-in zoom by re-scaling the eye to its seed length.
            // update() re-reads the eye from the camera position on its
            // next call, so this is exact.
            if (seedEyeLen > 1e-6) {
              const lenNow = camera.position.distanceTo(controls.target);
              if (lenNow > 1e-6) {
                const f = seedEyeLen / lenNow;
                camera.position.sub(controls.target).multiplyScalar(f).add(controls.target);
              }
            }
          },
          onUnlock: () => gateZoom(false),
        });
        race.seed(touchA, touchB);
      }
      return;
    }
    // Mouse: only the RIGHT button rolls; ignore if another pointer is
    // already active (mixing gestures is not a real input).
    if (e.button === 2 && mouseId === null && !touchA) {
      mouseId = e.pointerId;
      lastMouseX = e.clientX;
    }
  };

  const onPointerMove = (e: PointerEvent): void => {
    if (!controls.enabled) return;
    if (e.pointerType === 'touch') {
      const pt = touchA?.id === e.pointerId ? touchA : touchB?.id === e.pointerId ? touchB : null;
      if (!pt) return;
      pt.x = e.clientX;
      pt.y = e.clientY;
      // Drive the exclusive-gesture race: it decides roll vs zoom once and
      // applies only the winning component (plan 018).
      if (touchA && touchB && race) {
        race.update({ x: touchA.x, y: touchA.y }, { x: touchB.x, y: touchB.y });
      }
      return;
    }
    if (e.pointerId !== mouseId) return;
    // Right drag: horizontal delta drives the roll (vertical delta is
    // ignored — it is not part of the gesture; the trackball ignores it
    // too now that pan is off). The factor matches the trackball's
    // on-screen rotation speed at the same drag distance.
    applyRoll((e.clientX - lastMouseX) * ROLL_SPEED_FACTOR * controls.rotateSpeed);
    lastMouseX = e.clientX;
  };

  const release = (e: PointerEvent): void => {
    if (e.pointerType === 'touch') {
      if (touchA?.id === e.pointerId) touchA = touchB; // the remaining finger continues
      if (touchB?.id === e.pointerId) touchB = null;
      if (!touchA && !touchB) touchA = touchB = null;
      // The pair is broken (or gone): the 2-finger gesture ends — unlock
      // any roll latch and re-arm. The survivor finger is now a plain
      // 1-finger orbit (stock trackball); a NEW second finger seeds a
      // fresh race. A lift of an untracked (third) finger leaves the pair
      // and the race intact.
      if (!touchA || !touchB) {
        race?.reset();
        race = null;
      }
      return;
    }
    if (e.pointerId === mouseId) mouseId = null;
  };

  const onPointerCancel = release;

  domElement.addEventListener('pointerdown', onPointerDown);
  domElement.addEventListener('pointermove', onPointerMove);
  domElement.addEventListener('pointerup', release);
  domElement.addEventListener('pointercancel', onPointerCancel);

  return {
    dispose: () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', release);
      domElement.removeEventListener('pointercancel', onPointerCancel);
      race?.reset();
      race = null;
      mouseId = null;
      touchA = null;
      touchB = null;
    },
  };
}
