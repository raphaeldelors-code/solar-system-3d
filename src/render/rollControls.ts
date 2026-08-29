/**
 * Plan 017 F3 — ROLL gesture: right-drag (mouse) and 2-finger twist (touch)
 * rotate the view AROUND ITS OWN Z AXIS (the view axis), i.e. spin the
 * screen in place. Left drag / 1 finger stays on the trackball (free X+Y
 * rotation, pole-passing); 2-finger pinch stays on the trackball too (zoom).
 *
 * The view center never moves: the roll axis IS the view axis, and it
 * passes through the camera and the target — so `rollPose` rotates ONLY
 * `camera.up`; position and target sit on the axis and stay exactly fixed.
 * Panning was deleted entirely (the stock trackball is created with
 * `noPan = true`, which also removes the A/S/D keyboard pan).
 *
 * This listener runs in PARALLEL with TrackballControls on the same canvas:
 * trackball's right-button branch goes to its (disabled) pan state and
 * two-finger pan goes to the same, so the two never fight over an input.
 * It honors `controls.enabled` (flights / the sky tour disable the controls
 * while they run).
 *
 * PURE CORE: {@link rollPose} has no DOM dependency — unit-tested in Node
 * (tests/rollControls.test.ts).
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
 * Change in the inter-finger angle (radians) between two 2-finger poses — the
 * ROLL a twist gesture should apply, 1:1. A is the first finger, B the second;
 * the angle is that of the A→B vector (`atan2(B−A)`), so a pure PINCH (fingers
 * sliding radially toward/away from each other) changes no angle and returns 0
 * (the trackball zooms on that part), while a TWIST (fingers rotating about
 * their midpoint) returns the rotation. The result is normalized to (−π, π] so
 * crossing the ±180° wrap doesn't jump.
 *
 * PURE: no DOM dependency — unit-tested in Node (tests/rollControls.test.ts).
 */
export function twistDelta(
  a0: { x: number; y: number },
  b0: { x: number; y: number },
  a1: { x: number; y: number },
  b1: { x: number; y: number },
): number {
  const ang = (a: { x: number; y: number }, b: { x: number; y: number }): number =>
    Math.atan2(b.y - a.y, b.x - a.x);
  let d = ang(a1, b1) - ang(a0, b0);
  if (d > Math.PI) d -= 2 * Math.PI;
  else if (d < -Math.PI) d += 2 * Math.PI;
  return d;
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
  /** The two touch pointers being tracked for the twist, if any. */
  let touchA: { id: number; x: number; y: number } | null = null;
  let touchB: { id: number; x: number; y: number } | null = null;

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

  const onPointerDown = (e: PointerEvent): void => {
    if (!controls.enabled) return;
    if (e.pointerType === 'touch') {
      // Track the first two fingers for the twist gesture.
      if (!touchA) touchA = { id: e.pointerId, x: e.clientX, y: e.clientY };
      else if (!touchB && e.pointerId !== touchA.id)
        touchB = { id: e.pointerId, x: e.clientX, y: e.clientY };
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
      // 2-finger twist: the change in the inter-finger angle IS the roll,
      // applied 1:1 (a 360° twist rolls the screen 360°). A pure pinch —
      // equal-length scale — changes no angle and rolls nothing; the
      // trackball zooms on that part. The PREVIOUS pose must be sampled
      // BEFORE the moved finger is written, or prev === next and the delta
      // is always 0 (silent no-op twist).
      const beforeA = { x: touchA?.x ?? 0, y: touchA?.y ?? 0 };
      const beforeB = { x: touchB?.x ?? 0, y: touchB?.y ?? 0 };
      pt.x = e.clientX;
      pt.y = e.clientY;
      if (!touchA || !touchB) return;
      applyRoll(twistDelta(beforeA, beforeB, touchA, touchB));
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
      mouseId = null;
      touchA = null;
      touchB = null;
    },
  };
}
