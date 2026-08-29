import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { rollPose, ROLL_SPEED_FACTOR, twistDelta } from '../src/render/rollControls';

/**
 * Plan 017 F3 — the ROLL gesture (right-drag / 2-finger twist) rotates the
 * view AROUND ITS OWN Z AXIS (the view axis). `rollPose` is the pure core:
 * the roll axis passes through the camera position AND the target, so both
 * stay EXACTLY fixed — only the up vector spins in the view plane — and the
 * roll must be composable (a roll after a roll = a roll of the sum).
 */
function makeCamera(): THREE.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(50, 800 / 600, 0.001, 100000);
  cam.position.set(3, 4, 12); // arbitrary pose, not axis-aligned
  cam.up.set(0, 1, 0);
  return cam;
}

describe('rollPose (plan 017 F3)', () => {
  it('theta=0 is a no-op', () => {
    const cam = makeCamera();
    const target = new THREE.Vector3(1, -2, 0);
    const p0 = cam.position.clone();
    const up0 = cam.up.clone();
    rollPose(cam, target, 0);
    expect(cam.position.equals(p0)).toBe(true);
    expect(cam.up.equals(up0)).toBe(true);
  });

  it('preserves the camera position and the target EXACTLY (roll axis = view axis through both)', () => {
    const cam = makeCamera();
    const target = new THREE.Vector3(5, -1, 3);
    const p0 = cam.position.clone();
    const t0 = target.clone();
    for (const theta of [0.1, -0.7, Math.PI / 2, 2.5]) {
      rollPose(cam, target, theta);
      // The roll axis passes through position AND target — both stay exactly fixed.
      expect(cam.position.equals(p0)).toBe(true);
      expect(target.equals(t0)).toBe(true);
    }
  });

  it('spins the up vector: in-plane part rotates by exactly theta, in-axis part preserved', () => {
    const cam = makeCamera();
    const target = new THREE.Vector3(0, 0, 0);
    const theta = Math.PI / 3;
    // Pre-roll decomposition: up = inPlane + axisComp·f (the trackball
    // preserves this in-axis component too — rotations keep dot products —
    // and the roll must not destroy it either, nor change the in-plane
    // magnitude).
    const f = target.clone().sub(cam.position).normalize();
    const up0 = cam.up.clone();
    const axisComp = up0.dot(f);
    const inPlane0 = up0.clone().addScaledVector(f, -axisComp); // un-normalized
    rollPose(cam, target, theta);
    const expected = inPlane0.applyAxisAngle(f, theta).addScaledVector(f, axisComp);
    expect(cam.up.angleTo(expected)).toBeLessThan(1e-9);
    expect(cam.up.length()).toBeCloseTo(up0.length(), 9);
  });

  it('rolls add: roll(a) then roll(b) == roll(a+b)', () => {
    const target = new THREE.Vector3(-2, 3, 1);
    const camA = makeCamera();
    rollPose(camA, target, 0.4);
    rollPose(camA, target, -1.1);
    const camB = makeCamera();
    rollPose(camB, target, 0.4 - 1.1);
    expect(camA.position.distanceTo(camB.position)).toBeLessThan(1e-6);
    expect(camA.up.angleTo(camB.up)).toBeLessThan(1e-6);
  });

  it('a full 2π roll brings the up vector back exactly (composition is drift-free)', () => {
    const cam = makeCamera();
    const target = new THREE.Vector3(0, 0, 5);
    const p0 = cam.position.clone();
    const up0 = cam.up.clone();
    // Integrate in 64 steps (like a real drag). Position must never move;
    // the up vector must return to its start with zero drift — a per-step
    // magnitude loss (the old normalize bug) would show up here.
    for (let i = 0; i < 64; i++) rollPose(cam, target, (2 * Math.PI) / 64);
    expect(cam.position.equals(p0)).toBe(true);
    expect(cam.up.angleTo(up0)).toBeLessThan(1e-6);
    expect(cam.up.length()).toBeCloseTo(up0.length(), 9);
  });

  it('handles the degenerate case (up parallel to the view axis) without NaN', () => {
    const cam = new THREE.PerspectiveCamera(50, 1, 0.001, 100000);
    // Looking down +Z with up also pointing down the view axis (degenerate).
    cam.position.set(0, 0, 10);
    cam.up.set(0, 0, 1);
    const target = new THREE.Vector3(0, 0, 0);
    const p0 = cam.position.clone();
    rollPose(cam, target, Math.PI / 4);
    // The pose must still be finite, the position untouched, and the view
    // direction preserved.
    expect(Number.isFinite(cam.position.x)).toBe(true);
    expect(Number.isFinite(cam.up.y)).toBe(true);
    expect(cam.position.equals(p0)).toBe(true);
    const dir = cam.position.clone().sub(target).normalize();
    expect(dir.angleTo(new THREE.Vector3(0, 0, 1))).toBeLessThan(1e-9);
  });

  it('roll speed: 1 px of drag rolls a small, finite angle (factor sanity)', () => {
    // The factor must keep a 200 px drag comfortably below one full turn
    // at rotateSpeed 4: 200 × 0.00184 × 4 ≈ 1.47 rad < 2π.
    const dragPx = 200;
    const rotateSpeed = 4.0;
    const theta = dragPx * ROLL_SPEED_FACTOR * rotateSpeed;
    expect(theta).toBeGreaterThan(0.1);
    expect(theta).toBeLessThan(Math.PI * 2);
  });
});

/**
 * twistDelta — the 2-finger twist gesture (plan 017 F3). Regression lock for
 * the silent-no-op bug: the handler must sample the PREVIOUS pose before
 * writing the moved finger, and the delta must be the inter-finger ANGLE
 * change (1:1), never the distance change (pinch).
 */
describe('twistDelta (plan 017 F3)', () => {
  const P = (x: number, y: number) => ({ x, y });

  it('identical poses → 0 (no movement, no roll)', () => {
    expect(twistDelta(P(600, 400), P(700, 400), P(600, 400), P(700, 400))).toBe(0);
  });

  it('pure pinch (fingers slide along the line between them) → 0', () => {
    // Fingers on the x-axis: (600,400)+(700,400) pinch to (625,400)+(675,400):
    // same direction, half the distance → an angle change of exactly 0,
    // even though the distance changed by 50% (zoom, not roll).
    const d = twistDelta(P(600, 400), P(700, 400), P(625, 400), P(675, 400));
    expect(Math.abs(d)).toBeLessThan(1e-12);
  });

  it('pure twist (fingers rotate about their midpoint) → the rotation angle, 1:1', () => {
    // Fingers ±50 px around (640,400) on the x-axis (angle A→B = 0), rotating
    // the pair by 30° about the midpoint → delta = 30° exactly.
    const r = 50;
    const cx = 640,
      cy = 400;
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const at = (deg: number) => P(cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg)));
    const d = twistDelta(at(0), at(180), at(30), at(210));
    expect(d).toBeCloseTo(rad(30), 9);
  });

  it('opposite twist direction → negative delta (rolls the other way)', () => {
    const r = 50;
    const cx = 640,
      cy = 400;
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const at = (deg: number) => P(cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg)));
    const d = twistDelta(at(0), at(180), at(-30), at(150));
    expect(d).toBeCloseTo(rad(-30), 9);
  });

  it('crossing the ±180° wrap normalizes to the short way (no jump)', () => {
    // Start: A→B at 170°. End: A→B at −170° (=190°): the short way is a
    // +20° twist, NOT a −340° jump.
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const at = (deg: number, r = 60) =>
      P(640 + r * Math.cos(rad(deg)), 400 + r * Math.sin(rad(deg)));
    const d = twistDelta(at(170), at(350), at(190), at(10));
    expect(d).toBeCloseTo(rad(20), 9);
  });

  it('twists add across consecutive pose pairs (gesture integration)', () => {
    // 4 × 15° steps ≈ one 60° gesture — the same integration shape the
    // handler performs move-after-move must accumulate linearly.
    const r = 60;
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const at = (deg: number) => P(640 + r * Math.cos(rad(deg)), 400 + r * Math.sin(rad(deg)));
    let total = 0;
    for (let a = 0; a < 60; a += 15)
      total += twistDelta(at(a), at(a + 180), at(a + 15), at(a + 195));
    expect(total).toBeCloseTo(rad(60), 9);
  });
});
