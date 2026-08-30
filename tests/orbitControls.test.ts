import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Plan 021 — the free-view camera is the restored OrbitControls: the polar
 * angle is clamped to [0, π] (rotation stops AT the poles — the "180°
 * limit" the user had before plan 015), camera.up never rolls, and panning
 * stays disabled (enablePan=false — the one thing kept from the 015–018
 * era). This test drives the real vendored OrbitControls (three r168) with
 * synthetic pointer events on a mock canvas and asserts each restored /
 * kept behaviour. It is the inverse of the deleted plan-015
 * trackballControls.test.ts: that test's pole-crossing drag must now STOP
 * at the pole.
 *
 * Vendored source (three/examples/jsm/controls/OrbitControls.js, r168):
 *  - mouse rotate reads clientX/clientY, touch rotate reads pageX/pageY;
 *  - right button defaults to MOUSE.PAN, gated by enablePan (L1271);
 *  - A/S/D keyboard pan is gated by enablePan (L1343/L1371);
 *  - two-finger pinch (TOUCH.DOLLY_PAN) dollies while the pan half is
 *    gated: _handleTouchMoveDollyPan runs the zoom part independently of
 *    enablePan (L1004-1006);
 *  - connect() adds a keydown listener on domElement.getRootNode() and
 *    sets style.touchAction — both stubbed below;
 *  - bounds: mouse rotate divides by element.clientHeight (L713-715) —
 *    the mock canvas must expose clientWidth/clientHeight;
 *  - ROTATION DIRECTION (measured, r168): a DOWNWARD mouse drag (y
 *    increasing) DECREASES phi (toward the north pole); an upward drag
 *    increases phi (toward the south pole) — the classic OrbitControls
 *    feel, opposite of the deleted Trackball. Damping (0.08) decays the
 *    pending delta 8% per move, so reaching a pole from near-pole needs
 *    a decisive drag — the values below come from an actual measurement
 *    run, not a prediction;
 *  - POLE SINGULARITY: when phi is clamped exactly to a pole, the offset
 *    vector is (nearly) parallel to camera.up; calling update() again
 *    can NaN setFromVector3 (atan2(0,0)). The pole tests therefore assert
 *    on the state left by the drag's own final update() and call no
 *    further update(); the separate idle test parks the camera well away
 *    from the poles.
 */

function mockCanvas(w = 800, h = 600) {
  const listeners: Record<string, Array<(ev: unknown) => void>> = {};
  return {
    width: w,
    height: h,
    // r168 OrbitControls reads clientHeight (not getBoundingClientRect) for
    // mouse-rotate deltas — must be present or the deltas become NaN.
    clientWidth: w,
    clientHeight: h,
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
    getRootNode: () => ({
      addEventListener() {},
      removeEventListener() {},
    }),
    dispatch(t: string, ev: unknown) {
      (listeners[t] ?? []).slice().forEach((fn) => fn(ev));
    },
  };
}

type C = ReturnType<typeof mockCanvas> & { dispatch: (t: string, ev: unknown) => void };

// OrbitControls handlers call e.preventDefault() / e.stopPropagation();
// provide no-ops on every synthetic event.
const ev = (o: Record<string, unknown>) => ({
  preventDefault: () => {},
  stopPropagation: () => {},
  ...o,
});
function mouse(pageX: number, pageY: number, button: number, extra: Record<string, unknown> = {}) {
  return ev({
    pointerId: 1,
    pointerType: 'mouse',
    button,
    pageX,
    pageY,
    clientX: pageX,
    clientY: pageY,
    ...extra,
  });
}

function touch(
  pageX: number,
  pageY: number,
  pointerId: number,
  extra: Record<string, unknown> = {},
) {
  return ev({
    pointerId,
    pointerType: 'touch',
    button: 0,
    pageX,
    pageY,
    clientX: pageX,
    clientY: pageY,
    ...extra,
  });
}

/**
 * A left-button (or other-button) mouse drag through the given waypoints.
 * NOTE: NO trailing update() — _handleMouseMoveRotate already calls update()
 * after every move. A second update() on a pole-clamped pose NaNs the camera
 * (see POLE SINGULARITY in the header). Tests needing extra updates call
 * ctrl.update() themselves only on non-pole poses.
 */
function drag(c: C, button: number, x0: number, y0: number, moves: Array<[number, number]>) {
  c.dispatch('pointerdown', mouse(x0, y0, button));
  for (const [x, y] of moves) {
    c.dispatch('pointermove', mouse(x, y, button));
  }
  const last = moves[moves.length - 1];
  c.dispatch('pointerup', mouse(last[0], last[1], button));
  c.dispatch('contextmenu', mouse(last[0], last[1], button));
}

function makeCtrl(camPos: [number, number, number], target: [number, number, number] = [0, 0, 0]) {
  const cam = new THREE.PerspectiveCamera(50, 800 / 600, 0.0005, 20000);
  cam.position.set(...camPos);
  const c = mockCanvas() as C;
  const ctrl = new OrbitControls(cam, c as unknown as HTMLCanvasElement);
  // Exactly what buildScene sets (plan 021): original damping feel, panning
  // disabled, default rotate/zoom speeds, default polar range [0, π].
  ctrl.enableDamping = true;
  ctrl.dampingFactor = 0.08;
  ctrl.enablePan = false;
  ctrl.target.set(...target);
  cam.lookAt(...target);
  ctrl.update();
  return { cam, c, ctrl };
}

describe('OrbitControls free view (plan 021 — restored pre-015 behaviour)', () => {
  it('clamps at the north pole: a decisive downward drag stops at polar 0, never crosses', () => {
    // Same starting pose as the deleted plan-015 trackball test ([0, 29, 4],
    // ~0.137 rad from the north pole). In r168 OrbitControls a downward drag
    // decreases phi; 3×80px drives it into the clamp. Measured: phi lands
    // at ~1e-6, camera still on the northern side, no NaN, no crossing.
    const { cam, c, ctrl } = makeCtrl([0, 29, 4]);
    const phi0 = ctrl.getPolarAngle();
    expect(phi0).toBeGreaterThan(0); // near the north pole, looking at origin
    expect(phi0).toBeLessThan(0.2);
    expect(cam.position.y).toBeGreaterThan(0);

    c.dispatch('pointerdown', mouse(400, 300, 0));
    for (const y of [380, 460, 540]) c.dispatch('pointermove', mouse(400, y, 0));
    c.dispatch('pointerup', mouse(400, 540, 0));
    // No update() here: the drag's own final update() already applied the
    // clamp; another one risks NaN'ing a pole pose.

    const phi = ctrl.getPolarAngle();
    expect(phi).toBeGreaterThanOrEqual(0);
    expect(phi).toBeLessThanOrEqual(Math.PI);
    expect(phi).toBeLessThan(phi0); // the drag moved toward the pole…
    expect(phi).toBeCloseTo(0, 3); // …and stopped there (no crossing).
    // The camera stayed on the northern side — the trackball would have
    // flipped it below the equator.
    expect(cam.position.y).toBeGreaterThan(0);
    // No roll: camera.up is still world +Y.
    expect(cam.up.y).toBeCloseTo(1, 6);
    // Pivot untouched.
    expect(ctrl.target.length()).toBeCloseTo(0, 6);
  });

  it('clamps at the south pole: a large upward drag stops at polar π, never crosses', () => {
    // Mirror of the north-pole test: starting 0.137 rad from the SOUTH pole
    // ([0, -29, 4]), an upward drag increases phi toward π. 12×600px is
    // needed to overcome the 0.08 damping decay. Measured: phi lands at
    // exactly π, camera still on the southern side.
    const { cam, c, ctrl } = makeCtrl([0, -29, 4]);
    const phi0 = ctrl.getPolarAngle();
    expect(phi0).toBeGreaterThan(Math.PI - 0.2);
    expect(phi0).toBeLessThan(Math.PI);
    expect(cam.position.y).toBeLessThan(0);

    c.dispatch('pointerdown', mouse(400, 300, 0));
    let y = 300;
    for (let i = 0; i < 12; i++) {
      y -= 600;
      c.dispatch('pointermove', mouse(400, y, 0));
    }
    c.dispatch('pointerup', mouse(400, y, 0));

    const phi = ctrl.getPolarAngle();
    expect(phi).toBeGreaterThanOrEqual(0);
    expect(phi).toBeLessThanOrEqual(Math.PI);
    expect(phi).toBeGreaterThanOrEqual(phi0); // the drag moved toward the pole…
    expect(phi).toBeCloseTo(Math.PI, 3); // …and stopped there (no crossing).
    // The camera stayed on the southern side.
    expect(cam.position.y).toBeLessThan(0);
    expect(cam.up.y).toBeCloseTo(1, 6); // no roll
    expect(ctrl.target.length()).toBeCloseTo(0, 6); // pivot untouched
  });

  it('keeps the target fixed while rotating (free orbit around it)', () => {
    const { cam, c, ctrl } = makeCtrl([30, 0, 0], [5, 1, -2]); // off-origin pivot
    const distBefore = ctrl.getDistance();

    drag(c, 0, 300, 300, [
      [380, 300],
      [460, 300],
      [540, 300],
      [620, 300],
      [700, 300],
    ]);
    // Let damping settle (safe here: not a pole-clamped pose).
    for (let i = 0; i < 200; i++) ctrl.update();

    expect(ctrl.getDistance()).toBeCloseTo(distBefore, 3); // rotation orbits at constant radius
    expect(cam.position.distanceTo(new THREE.Vector3(5, 1, -2))).toBeCloseTo(distBefore, 3);
    expect(ctrl.target.distanceTo(new THREE.Vector3(5, 1, -2))).toBeCloseTo(0, 6); // pivot fixed
    expect(cam.position.x).not.toBeCloseTo(30, 1); // and the view actually moved
  });

  it('right-drag does NOTHING with enablePan=false (no pan, no roll)', () => {
    const { cam, c, ctrl } = makeCtrl([0, 16, 30]);
    expect(ctrl.enablePan).toBe(false);
    const p0 = cam.position.clone();
    const t0 = ctrl.target.clone();
    const up0 = cam.up.clone();

    // A deliberate right-button drag with movement (would pan in stock
    // OrbitControls; was the Z-roll input in the 015–018 era).
    drag(c, 2, 400, 300, [
      [450, 300],
      [500, 300],
      [550, 300],
    ]);
    for (let i = 0; i < 10; i++) ctrl.update();

    expect(cam.position.distanceTo(p0)).toBeLessThan(1e-6);
    expect(ctrl.target.distanceTo(t0)).toBeLessThan(1e-6);
    expect(cam.up.distanceTo(up0)).toBeLessThan(1e-6);
  });

  it('two-finger PINCH still dollies with enablePan=false (zoom kept, pan killed)', () => {
    const { c, ctrl } = makeCtrl([0, 16, 30]);
    const distBefore = ctrl.getDistance();
    const t0 = ctrl.target.clone();

    // Two fingers 200 px apart, spread incrementally to 400 px. r168's touch
    // dolly is INCREMENTAL: each move multiplies _scale by (currentDistance /
    // previousDistance)^zoomSpeed and _dollyStart is re-copied each move, so
    // the total factor over the whole gesture is 400/200 = 2 → _scale = 0.5,
    // i.e. the camera ends at half the radius (2× closer). The pivot must not
    // move: with enablePan=false the pan half of the two-finger gesture is
    // skipped (_handleTouchMoveDollyPan).
    c.dispatch('pointerdown', touch(300, 300, 1));
    c.dispatch('pointerdown', touch(500, 300, 2));
    for (const [x1, x2] of [
      [275, 525],
      [250, 550],
      [225, 575],
      [200, 600],
    ] as Array<[number, number]>) {
      c.dispatch('pointermove', touch(x1, 300, 1));
      c.dispatch('pointermove', touch(x2, 300, 2));
    }
    c.dispatch('pointerup', touch(200, 300, 1));
    c.dispatch('pointerup', touch(600, 300, 2));
    ctrl.update();

    expect(ctrl.getDistance()).toBeCloseTo(distBefore * 0.5, 4);
    expect(ctrl.target.distanceTo(t0)).toBeCloseTo(0, 6);
  });

  it('one-finger (mouse) drag rotates — baseline sanity', () => {
    const { cam, c, ctrl } = makeCtrl([30, 0, 0]);
    const theta0 = ctrl.getAzimuthalAngle();
    const phi0 = ctrl.getPolarAngle();

    drag(c, 0, 400, 300, [
      [420, 310],
      [440, 320],
      [460, 330],
    ]);

    expect(ctrl.getAzimuthalAngle()).not.toBeCloseTo(theta0, 3);
    expect(ctrl.getPolarAngle()).not.toBeCloseTo(phi0, 3);
    expect(cam.up.y).toBeCloseTo(1, 6); // rotation never rolls up
  });

  it('update() is idempotent when idle (no drift on parked frames)', () => {
    // Mid-sky pose (deliberately far from both poles: a pole-parked pose
    // would NaN a repeated update(), which is not what this test checks).
    const { cam, c, ctrl } = makeCtrl([0, 16, 30]);
    const p0 = cam.position.clone();
    const up0 = cam.up.clone();
    for (let i = 0; i < 200; i++) ctrl.update();
    expect(cam.position.distanceTo(p0)).toBeLessThan(1e-6);
    expect(cam.up.angleTo(up0)).toBeLessThan(1e-6);
    void c;
  });
});
