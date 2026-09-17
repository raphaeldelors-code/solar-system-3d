/**
 * Plan 044 A5 tests: screen-space planet/body label projection + selection.
 * `projectWorldToScreen` and `selectPlanetLabels` are pure (a world position +
 * a camera pose + the CSS viewport → screen px / a ranked selection), so they
 * are unit-testable in Node (no canvas needed — only the draw path touches
 * the DOM).
 *
 * Invariants:
 *  - a world point dead ahead of the camera projects to the viewport center
 *  - a point behind the camera → not ok
 *  - a point exactly on the camera plane (z=0) → not ok (infinite)
 *  - distance fade: near → 1, far → 0, monotonic
 *  - selection: max 8, picked body always shown, tier 0 > 1 > 2
 *  - de-collision: two overlapping labels → the lower-priority one is dropped
 */
import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import {
  projectWorldToScreen,
  selectPlanetLabels,
  planetLabelFade,
  PLANET_LABEL_MAX_VISIBLE,
  PLANET_LABEL_FADE_NEAR,
  PLANET_LABEL_FADE_FAR,
  PLANET_LABEL_FADE_FLOOR,
  type PlanetLabelInput,
} from '../src/render/planetScreenLabels';

/** A perspective camera at `pos` looking at `target`, matrices synced. */
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

describe('projectWorldToScreen (plan 044 A5)', () => {
  it('projects a dead-ahead world point to the viewport center', () => {
    const p = projectWorldToScreen(new THREE.Vector3(0, 0, -10), CAM(), W, H);
    expect(p.ok).toBe(true);
    expect(p.x).toBeCloseTo(W / 2, 3);
    expect(p.y).toBeCloseTo(H / 2, 3);
  });

  it('projects "up" to screen up (screen y grows downward)', () => {
    // 10° above the view axis (view is −Z, so +Y is "up").
    const a = (10 * Math.PI) / 180;
    const p = projectWorldToScreen(
      new THREE.Vector3(0, Math.sin(a) * 10, -Math.cos(a) * 10),
      CAM(),
      W,
      H,
    );
    expect(p.ok).toBe(true);
    expect(p.y).toBeLessThan(H / 2);
  });

  it('rejects a point behind the camera', () => {
    const p = projectWorldToScreen(new THREE.Vector3(0, 0, 10), CAM(), W, H);
    expect(p.ok).toBe(false);
  });

  it('rejects a point on the camera plane (z = 0)', () => {
    const p = projectWorldToScreen(new THREE.Vector3(0, 0, 0), CAM(), W, H);
    expect(p.ok).toBe(false);
  });

  it('is finite for a wide off-axis angle (the caller culls via the pad)', () => {
    // 80° off-axis: still finite, just near the edge / off-screen.
    const a = (80 * Math.PI) / 180;
    const p = projectWorldToScreen(
      new THREE.Vector3(Math.sin(a) * 10, 0, -Math.cos(a) * 10),
      CAM(),
      W,
      H,
    );
    expect(p.ok).toBe(true);
    expect(Number.isFinite(p.x)).toBe(true);
  });
});

describe('planetLabelFade (plan 044 A5)', () => {
  it('is 1 at the near distance and the legibility floor at the far distance', () => {
    expect(planetLabelFade(PLANET_LABEL_FADE_NEAR)).toBeCloseTo(1, 5);
    expect(planetLabelFade(PLANET_LABEL_FADE_FAR)).toBeCloseTo(PLANET_LABEL_FADE_FLOOR, 5);
  });

  it('is monotonic decreasing with distance', () => {
    let prev = Infinity;
    for (let d = PLANET_LABEL_FADE_NEAR; d <= PLANET_LABEL_FADE_FAR; d += 10) {
      const f = planetLabelFade(d);
      expect(f).toBeLessThanOrEqual(prev + 1e-9);
      prev = f;
    }
  });

  it('clamps to [floor,1] outside the fade range (never blanks a label)', () => {
    expect(planetLabelFade(0)).toBe(1);
    expect(planetLabelFade(PLANET_LABEL_FADE_FAR * 10)).toBe(PLANET_LABEL_FADE_FLOOR);
    // The floor is well above the draw-skip threshold — distant labels stay
    // readable, just dimmer (the old sprites were legible at every scale).
    expect(PLANET_LABEL_FADE_FLOOR).toBeGreaterThan(0.3);
  });
});

describe('selectPlanetLabels (plan 044 A5)', () => {
  /** A body dead-ahead at distance `d`, screen-center, tier `t`. */
  function ahead(id: string, d: number, tier: 0 | 1 | 2, name = id): PlanetLabelInput {
    return {
      id,
      name,
      world: new THREE.Vector3(0, 0, -d),
      dist: d,
      discRadiusPx: 4,
      tier,
    };
  }

  it('caps the visible count at the max (8)', () => {
    // 20 bodies spread across the screen (different angles) so they do NOT
    // overlap — de-collision must not be what limits the count, the cap is.
    const inputs: PlanetLabelInput[] = [];
    for (let i = 0; i < 20; i++) {
      const ang = ((i - 9.5) * 6 * Math.PI) / 180; // 6° apart, centered
      inputs.push({
        id: `b${i}`,
        name: `B${i}`,
        world: new THREE.Vector3(Math.sin(ang) * 30, 0, -Math.cos(ang) * 30),
        dist: 30,
        discRadiusPx: 4,
        tier: 1,
      });
    }
    const sel = selectPlanetLabels(inputs, CAM(), W, H);
    expect(sel.length).toBe(PLANET_LABEL_MAX_VISIBLE);
  });

  it('always shows the picked body (tier 0) even when the cap is full', () => {
    // 10 tier-1 bodies (fill the cap) + 1 picked tier-0 body.
    const inputs: PlanetLabelInput[] = [];
    for (let i = 0; i < 10; i++) inputs.push(ahead(`b${i}`, 20 + i, 1));
    inputs.push(ahead('picked', 20, 0, 'Picked'));
    const sel = selectPlanetLabels(inputs, CAM(), W, H);
    expect(sel.some((s) => s.id === 'picked')).toBe(true);
  });

  it('prefers tier 1 (sun+planets) over tier 2 (moons/dwarfs)', () => {
    // 9 tier-2 bodies + 1 tier-1 body. The tier-1 body must win a slot.
    const inputs: PlanetLabelInput[] = [];
    for (let i = 0; i < 9; i++) inputs.push(ahead(`moon${i}`, 20 + i, 2));
    inputs.push(ahead('earth', 20, 1, 'Earth'));
    const sel = selectPlanetLabels(inputs, CAM(), W, H);
    expect(sel.some((s) => s.id === 'earth')).toBe(true);
  });

  it('de-collides: two overlapping labels → the lower-priority one is dropped', () => {
    // Two bodies at the SAME screen position (both dead-ahead, same distance).
    // They overlap exactly; only the higher-priority (tier 1) should be kept.
    const a: PlanetLabelInput = {
      id: 'a',
      name: 'Alpha',
      world: new THREE.Vector3(0, 0, -20),
      dist: 20,
      discRadiusPx: 4,
      tier: 1,
    };
    const b: PlanetLabelInput = {
      id: 'b',
      name: 'Beta',
      world: new THREE.Vector3(0, 0, -20),
      dist: 20,
      discRadiusPx: 4,
      tier: 2,
    };
    const sel = selectPlanetLabels([a, b], CAM(), W, H);
    expect(sel.length).toBe(1);
    expect(sel[0].id).toBe('a');
  });

  it('keeps well-separated labels (no false de-collision)', () => {
    // Two bodies far apart on screen (one dead-ahead, one 30° off-axis).
    const a: PlanetLabelInput = {
      id: 'a',
      name: 'Alpha',
      world: new THREE.Vector3(0, 0, -20),
      dist: 20,
      discRadiusPx: 4,
      tier: 1,
    };
    const ang = (30 * Math.PI) / 180;
    const b: PlanetLabelInput = {
      id: 'b',
      name: 'Beta',
      world: new THREE.Vector3(Math.sin(ang) * 20, 0, -Math.cos(ang) * 20),
      dist: 20,
      discRadiusPx: 4,
      tier: 1,
    };
    const sel = selectPlanetLabels([a, b], CAM(), W, H);
    expect(sel.length).toBe(2);
  });
});
