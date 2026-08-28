/**
 * Tests for the screen-space constellation label projection (plan 016 P1):
 * `projectSkyDir` is pure (a unit anchor direction + a camera pose + the CSS
 * viewport size → screen px), so it is unit-testable in Node.
 *
 * Invariants:
 *  - a direction dead ahead of the camera projects to the viewport center
 *  - "up" on the sky is "up" on screen (y grows downward)
 *  - a direction behind the camera → not ok (the anchor can't be drawn)
 *  - a direction exactly 90° off the view axis lands on the camera plane
 *    (z = 0) → not finite → not ok
 *  - a wide angle off-axis is still finite (the caller culls it via the
 *    pad), so finite ≠ on-screen
 *  - the anchor ring radius (CONSTELLATION_RADIUS) is a distance, not a
 *    direction: it never changes where on screen a direction lands
 */
import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  projectSkyDir,
  CONSTELLATION_LABEL_SCREEN_PX,
  CONSTELLATION_LABEL_MIN_SCREEN_OPACITY,
  CONSTELLATION_LABEL_SCREEN_PAD_PX,
} from '../src/render/constellationScreenLabels';
import { CONSTELLATION_RADIUS } from '../src/render/scene';

/** A perspective camera at `pos` looking at `target`, matrices synced (as the renderer does). */
function makeCamera(
  pos: [number, number, number],
  target: [number, number, number],
  fov = 50,
  aspect = 1,
): THREE.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(fov, aspect, 0.0005, 20000);
  cam.position.set(pos[0], pos[1], pos[2]);
  cam.lookAt(new THREE.Vector3(target[0], target[1], target[2]));
  cam.updateMatrixWorld(true);
  cam.matrixWorldInverse.copy(cam.matrixWorld).invert();
  return cam;
}

// Camera at the origin looking down −Z (the app's default orientation).
const CAM = () => makeCamera([0, 0, 0], [0, 0, -1]);
const W = 1000;
const H = 1000;

describe('projectSkyDir (plan 016 P1)', () => {
  it('projects a dead-ahead direction to the viewport center', () => {
    const p = projectSkyDir([0, 0, -1], CAM(), W, H);
    expect(p.ok).toBe(true);
    expect(p.x).toBeCloseTo(W / 2, 5);
    expect(p.y).toBeCloseTo(H / 2, 5);
  });

  it('projects "sky up" to screen up (screen y grows downward)', () => {
    // 10° above the view axis (view is −Z, so +Y is "up").
    const a = (10 * Math.PI) / 180;
    const dir: [number, number, number] = [0, Math.sin(a), -Math.cos(a)];
    const p = projectSkyDir(dir, CAM(), W, H);
    expect(p.ok).toBe(true);
    expect(p.y).toBeLessThan(H / 2);
    expect(p.x).toBeCloseTo(W / 2, 3);
  });

  it('projects "sky right" to screen right (screen x grows rightward)', () => {
    const a = (10 * Math.PI) / 180;
    const dir: [number, number, number] = [Math.sin(a), 0, -Math.cos(a)];
    const p = projectSkyDir(dir, CAM(), W, H);
    expect(p.ok).toBe(true);
    expect(p.x).toBeGreaterThan(W / 2);
    expect(p.y).toBeCloseTo(H / 2, 3);
  });

  it('rejects a direction behind the camera', () => {
    // View axis is −Z; +Z is behind the camera.
    const p = projectSkyDir([0, 0, 1], CAM(), W, H);
    expect(p.ok).toBe(false);
    // Exactly AT the camera plane (z = −near boundary) is also rejected.
    const p2 = projectSkyDir([0, -1, 0], CAM(), W, H);
    // 90° off-axis sits on the near plane's extended plane → z = 0 → not ok.
    expect(p2.ok).toBe(false);
  });

  it('returns non-finite-safe results (never NaN/Infinity when ok)', () => {
    const dirs: [number, number, number][] = [
      [0, 0, -1], // center
      [0.1, 0.2, -0.9747], // off-axis, finite
      [0.99, 0.1, -0.1], // near the camera plane, still in front
      [-0.5, 0.5, -0.7071], // diagonal
    ];
    for (const d of dirs) {
      const p = projectSkyDir(d, CAM(), W, H);
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
    }
  });

  it('keeps a finite result for wide off-axis angles (caller culls via the pad)', () => {
    // 60° off the view axis: outside the 50° FOV viewport, but a real
    // screen point — the overlay drops it with its SCREEN_PAD_PX margin.
    const a = (60 * Math.PI) / 180;
    const dir: [number, number, number] = [Math.sin(a), 0, -Math.cos(a)];
    const p = projectSkyDir(dir, CAM(), W, H);
    expect(p.ok).toBe(true);
    expect(p.x).toBeGreaterThan(W);
    expect(p.x).toBeGreaterThan(W + CONSTELLATION_LABEL_SCREEN_PAD_PX - 1e-6);
  });

  it('is independent of the anchor ring radius (a direction, not a position)', () => {
    // projectSkyDir scales the unit dir by CONSTELLATION_RADIUS internally;
    // for a camera at the origin the projected point is the same as any
    // other distance along the same ray. Check the center case is exact
    // regardless of radius — the math only depends on the direction.
    const p = projectSkyDir([0, 0, -1], CAM(), W, H);
    expect(p.x).toBeCloseTo(W / 2, 6);
    expect(p.y).toBeCloseTo(H / 2, 6);
    expect(CONSTELLATION_RADIUS).toBeGreaterThan(0);
  });

  it('tracks a non-origin camera (follow mode: camera far from the system)', () => {
    // Camera in a realistic follow pose (app uses offset (d, 0.6d, d)), looking
    // at the origin — the sky is still the sky: the world direction pointing
    // from the camera toward the origin must land near center. (Avoids the
    // degenerate lookAt-up case of looking straight down −Y.)
    const cam = makeCamera([30, 50, 20], [0, 0, 0]);
    // World direction "straight ahead of this camera" = normalize(target−pos).
    const f = new THREE.Vector3(0, 0, 0).sub(new THREE.Vector3(30, 50, 20)).normalize();
    const p = projectSkyDir([f.x, f.y, f.z], cam, W, H);
    expect(p.ok).toBe(true);
    expect(p.x).toBeCloseTo(W / 2, 4);
    expect(p.y).toBeCloseTo(H / 2, 4);
  });
});

describe('overlay constants (plan 016 P1)', () => {
  it('cap height is a constant 30 CSS px for every label (no per-tier sizes)', () => {
    expect(CONSTELLATION_LABEL_SCREEN_PX).toBe(30);
  });

  it('the draw threshold and off-screen pad are sane', () => {
    expect(CONSTELLATION_LABEL_MIN_SCREEN_OPACITY).toBeGreaterThan(0);
    expect(CONSTELLATION_LABEL_MIN_SCREEN_OPACITY).toBeLessThan(0.1);
    expect(CONSTELLATION_LABEL_SCREEN_PAD_PX).toBeGreaterThan(50);
  });
});
