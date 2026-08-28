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
  selectVisibleLabels,
  CONSTELLATION_LABEL_SCREEN_PX,
  CONSTELLATION_LABEL_MIN_SCREEN_OPACITY,
  CONSTELLATION_LABEL_SCREEN_PAD_PX,
  CONSTELLATION_LABEL_MAX_VISIBLE,
  type ScreenLabelUpdate,
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

  it('plan 017 F2: the visible-label cap is a small handful', () => {
    expect(CONSTELLATION_LABEL_MAX_VISIBLE).toBe(8);
  });
});

describe('selectVisibleLabels (plan 017 F2 — view cone + de-collision + cap)', () => {
  /** Build a ScreenLabelUpdate looking `deg` off the view axis, in screen +x. */
  function upd(
    name: string,
    deg: number,
    extra: Partial<ScreenLabelUpdate> = {},
  ): ScreenLabelUpdate {
    const a = (deg * Math.PI) / 180;
    return {
      name,
      dir: [Math.sin(a), 0, -Math.cos(a)],
      emphasis: 1,
      emphasized: false,
      occluded: false,
      ...extra,
    };
  }

  it('excludes figures outside the 48° emphasis cone (emphasis 0)', () => {
    // 60° off axis → emphasis 0 (outside the 48° out-band).
    const sel = selectVisibleLabels([upd('ORION', 60, { emphasis: 0 })], CAM(), W, H, 1);
    expect(sel).toEqual([]);
  });

  it('includes figures inside the cone', () => {
    const sel = selectVisibleLabels([upd('ORION', 20, { emphasis: 0.8 })], CAM(), W, H, 1);
    expect(sel.map((s) => s.name)).toEqual(['ORION']);
  });

  it('hides a label whose box overlaps a stronger one (keeps the stronger)', () => {
    // Two labels at 5° and 8° on the same horizontal (same y): 3° projects
    // to ~56 px on a 1000 px square — well inside a CAMELOPARDALIS ink box
    // (~108 px + pad each side), so they MUST collide. The one with higher
    // emphasis wins.
    const strong = upd('CAMELOPARDALIS', 5, { emphasis: 0.9 });
    const weak = upd('CAMELOPARDALIS', 8, { emphasis: 0.4 });
    const sel = selectVisibleLabels([strong, weak], CAM(), W, H, 1);
    expect(sel.length).toBe(1);
    expect(sel[0].opacity).toBeGreaterThan(0.6); // the stronger (higher emph) one
  });

  it('caps the list at MAX_VISIBLE even with many well-separated candidates', () => {
    // 12 candidates spread VERTICALLY (same x, 5° steps → ≥44 px apart on a
    // 1000 px square, more than the 38 px box height) so none de-collide:
    // the only thing that can trim the list is the cap. Angles past ~52°
    // project beyond the 260 px off-screen pad and are culled — 10 of the
    // 12 stay candidates, and the cap must still win: 8 out, not 10.
    const updates: ScreenLabelUpdate[] = [];
    for (let i = 0; i < 12; i++) {
      const deg = 2.5 + i * 5; // 2.5°…57.5° — first 10 within cone + pad
      const a = (deg * Math.PI) / 180;
      updates.push({
        name: 'ORION',
        dir: [0, Math.sin(a), -Math.cos(a)],
        emphasis: 1 - i * 0.03,
        emphasized: false,
        occluded: false,
      });
    }
    const sel = selectVisibleLabels(updates, CAM(), W, H, 1);
    expect(sel.length).toBeLessThanOrEqual(CONSTELLATION_LABEL_MAX_VISIBLE);
    expect(sel.length).toBe(8);
  });

  it('the picked label survives even when it overlaps a stronger one', () => {
    // Picked at 0° (its emphasis would rank it LAST), another label at 2°
    // with far higher emphasis overlapping its box (2° ≈ 37 px < the ~52 px
    // LYRA ink box + pad). The picked figure must still win the slot (rank 1
    // beats any emphasis), and the weaker-overlapping one must be hidden.
    const picked = upd('LYRA', 0, { emphasized: true, emphasis: 0.3 });
    const other = upd('LYRA', 2, { emphasis: 0.95 });
    const sel = selectVisibleLabels([other, picked], CAM(), W, H, 1);
    expect(sel.map((s) => s.name)).toEqual(['LYRA']);
    expect(sel[0].emphasized).toBe(true);
  });

  it('returns an empty list when presence is below the floor', () => {
    const sel = selectVisibleLabels([upd('ORION', 0, { emphasis: 1 })], CAM(), W, H, 0.005);
    expect(sel).toEqual([]);
  });

  it('never returns more than the cap and always keeps the picked figure first', () => {
    const updates: ScreenLabelUpdate[] = [upd('LYRA', 0, { emphasized: true, emphasis: 0.1 })];
    for (let i = 0; i < 10; i++) {
      updates.push(upd('ORION', 3 + i * 2, { emphasis: 1 - i * 0.04 }));
    }
    const sel = selectVisibleLabels(updates, CAM(), W, H, 1);
    expect(sel[0].name).toBe('LYRA');
    expect(sel[0].emphasized).toBe(true);
    expect(sel.length).toBeLessThanOrEqual(CONSTELLATION_LABEL_MAX_VISIBLE);
  });
});
