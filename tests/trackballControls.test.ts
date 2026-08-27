import { describe, it, expect, beforeAll } from 'vitest';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

/**
 * Plan 015 P2 — the camera must be able to rotate a FULL 360° over the
 * poles. OrbitControls structurally cannot do this: it keeps camera.up=+Y
 * and clamps the polar angle to [0, π], so "blocked around the poles" was
 * baked into the control. TrackballControls rotates the view around an
 * arbitrary screen-space axis and rolls camera.up with it, so a single
 * drag can carry the view OVER a pole (the camera's Y coordinate changes
 * sign). This test drives the real vendored TrackballControls with
 * synthetic pointer events on a mock canvas and asserts the crossing —
 * the same drag on the old OrbitControls would have stopped at the pole.
 */

// TrackballControls.connect/handleResize touch `window` (pageXOffset) and
// the element's style/rect. Minimal stubs — the test runs in the Node env.
beforeAll(() => {
  if (!(globalThis as { window?: unknown }).window) {
    (globalThis as { window?: unknown }).window = {
      addEventListener() {},
      removeEventListener() {},
      pageXOffset: 0,
      pageYOffset: 0,
    };
  }
});

function mockCanvas(w = 800, h = 600) {
  const listeners: Record<string, Array<(ev: unknown) => void>> = {};
  return {
    width: w,
    height: h,
    style: {},
    getBoundingClientRect: () => ({
      left: 0,
      top: 0,
      width: w,
      height: h,
      right: w,
      bottom: h,
      x: 0,
      y: 0,
    }),
    addEventListener: (t: string, fn: (ev: unknown) => void) => {
      (listeners[t] ??= []).push(fn);
    },
    removeEventListener: (t: string, fn: (ev: unknown) => void) => {
      listeners[t] = (listeners[t] ?? []).filter((f) => f !== fn);
    },
    setPointerCapture: () => {},
    releasePointerCapture: () => {},
    ownerDocument: { documentElement: { clientLeft: 0, clientTop: 0 } },
    dispatch(t: string, ev: unknown) {
      (listeners[t] ?? []).slice().forEach((fn) => fn(ev));
    },
  };
}

function pointer(pageX: number, pageY: number, extra: Record<string, unknown> = {}) {
  return { pointerId: 1, pointerType: 'mouse', button: 0, pageX, pageY, ...extra };
}

/** A left-button drag from (x0,y0) through the given waypoints. */
function drag(
  c: HTMLCanvasElement,
  ctrl: TrackballControls,
  x0: number,
  y0: number,
  moves: Array<[number, number]>,
) {
  const d = c as unknown as { dispatch(t: string, ev: unknown): void };
  d.dispatch('pointerdown', pointer(x0, y0));
  for (const [x, y] of moves) {
    d.dispatch('pointermove', pointer(x, y));
    ctrl.update(); // the app calls update() every frame
  }
  const last = moves[moves.length - 1];
  d.dispatch('pointerup', pointer(last[0], last[1]));
  ctrl.update();
}

describe('TrackballControls pole crossing (plan 015 P2)', () => {
  it('rotates the view over the north pole in one drag (y sign flips)', () => {
    const cam = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 100000);
    cam.position.set(0, 29, 4); // near the north pole, looking at the origin
    const c = mockCanvas() as unknown as HTMLCanvasElement;
    const ctrl = new TrackballControls(cam, c);
    ctrl.rotateSpeed = 4.0; // the value buildScene uses
    ctrl.target.set(0, 0, 0);
    cam.lookAt(0, 0, 0);
    ctrl.update();

    expect(cam.position.y).toBeGreaterThan(0); // start north of the equator

    // Drag DOWN the screen — tips the view over the pole.
    drag(c, ctrl, 400, 200, [
      [400, 140],
      [400, 80],
      [400, 20],
      [400, -40],
      [400, -100],
    ]);

    expect(cam.position.y).toBeLessThan(0); // crossed to the southern side
    // And camera.up rolled away from +Y — the mechanism that makes the
    // crossing possible (OrbitControls would have refused this).
    expect(cam.up.y).toBeLessThan(0.5);
    // The pivot was not touched: still centred on the origin.
    expect(ctrl.target.length()).toBeCloseTo(0, 6);
  });

  it('keeps the target fixed while rotating (free orbit around it)', () => {
    const cam = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 100000);
    cam.position.set(30, 0, 0); // equator
    const c = mockCanvas() as unknown as HTMLCanvasElement;
    const ctrl = new TrackballControls(cam, c);
    ctrl.rotateSpeed = 4.0;
    ctrl.target.set(5, 1, -2); // an off-origin pivot (like a followed planet)
    cam.lookAt(5, 1, -2);
    ctrl.update();
    const distBefore = cam.position.distanceTo(ctrl.target);

    drag(c, ctrl, 300, 300, [
      [380, 300],
      [460, 300],
      [540, 300],
      [620, 300],
      [700, 300],
    ]);

    // Rotation must orbit the pivot at (near) constant distance.
    expect(cam.position.distanceTo(ctrl.target)).toBeCloseTo(distBefore, 3);
    // And the view must have actually moved.
    expect(cam.position.x).not.toBeCloseTo(30, 1);
  });

  it('update() is idempotent when idle (no drift on parked frames)', () => {
    const cam = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 100000);
    cam.position.set(0, 29, 4);
    const c = mockCanvas() as unknown as HTMLCanvasElement;
    const ctrl = new TrackballControls(cam, c);
    ctrl.target.set(0, 0, 0);
    cam.lookAt(0, 0, 0);
    ctrl.update();
    const p0 = cam.position.clone();
    const up0 = cam.up.clone();
    // Simulate a parked camera: 10 idle frames of update().
    for (let i = 0; i < 10; i++) ctrl.update();
    expect(cam.position.distanceTo(p0)).toBeLessThan(1e-6);
    expect(cam.up.angleTo(up0)).toBeLessThan(1e-6);
  });
});
