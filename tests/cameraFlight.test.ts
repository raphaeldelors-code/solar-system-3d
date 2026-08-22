import { describe, it, expect } from 'vitest';
import {
  easeInOutCubic,
  dirTo,
  frameBody,
  frameSystem,
  frameConstellations,
  stepFlight,
  makeFlight,
  type Flight,
  type CamAnchor,
  type Vec3,
} from '../src/render/cameraFlight';

const approx = (got: number, want: number, tol = 1e-6) =>
  expect(Math.abs(got - want), `got ${got}, want ${want}`).toBeLessThanOrEqual(tol);

describe('easeInOutCubic', () => {
  it('clamps and endpoints', () => {
    approx(easeInOutCubic(0), 0);
    approx(easeInOutCubic(1), 1);
    approx(easeInOutCubic(0.5), 0.5);
    approx(easeInOutCubic(-0.5), 0); // clamped
    approx(easeInOutCubic(1.5), 1); // clamped
  });
  it('accelerates then decelerates (mid slow at ends, fast in middle)', () => {
    // slope near 0 is ~0, slope at 0.5 is ~2x the average.
    const s0 = easeInOutCubic(0.01) - easeInOutCubic(0);
    const sMid = easeInOutCubic(0.51) - easeInOutCubic(0.49);
    const s1 = easeInOutCubic(1) - easeInOutCubic(0.99);
    expect(sMid).toBeGreaterThan(s0);
    expect(sMid).toBeGreaterThan(s1);
  });
});

describe('dirTo', () => {
  it('unit vector along the axis', () => {
    const d = dirTo([0, 0, 0], [0, 0, 10]);
    approx(d[0], 0);
    approx(d[1], 0);
    approx(d[2], 1);
  });
  it('coincident points -> [0,1,0]', () => {
    const d = dirTo([1, 2, 3], [1, 2, 3]);
    expect(d).toEqual([0, 1, 0]);
  });
});

describe('frameBody', () => {
  it('lands from a natural 3/4 bearing, NOT straight down: camera lifted +Y AND offset along +Z', () => {
    const center: Vec3 = [3, 0, -4];
    const anchor: CamAnchor = frameBody(center, 1, 50);
    // target is the body
    expect(anchor.target).toEqual([3, 0, -4]);
    // Plan 008 S3: a 38° elevation above the ecliptic, on the +Z bearing.
    // Camera is ABOVE the body (pos.y > center.y) AND pushed OUT along +Z
    // (pos.z > center.z) — a 3/4 view, not the old pure overhead (which had
    // pos.z === center.z and pos.x === center.x).
    expect(anchor.pos[1]).toBeGreaterThan(center[1]); // lifted +Y
    expect(anchor.pos[2]).toBeGreaterThan(center[2]); // pushed +Z (not top-down)
    approx(anchor.pos[0], center[0], 1e-9); // bearing is along Z, x unchanged
  });
  it('landing elevation is ~38° above the ecliptic (within 30–45°)', () => {
    const a = frameBody([0, 0, 0], 1, 50);
    const dy = a.pos[1] - a.target[1];
    const dh = Math.hypot(a.pos[0] - a.target[0], a.pos[2] - a.target[2]);
    const elevDeg = (Math.atan2(dy, dh) * 180) / Math.PI;
    expect(elevDeg).toBeGreaterThan(30);
    expect(elevDeg).toBeLessThan(45);
  });
  it('bigger body => camera farther away', () => {
    const near = frameBody([0, 0, 0], 1, 50);
    const far = frameBody([0, 0, 0], 5, 50);
    const d = (a: CamAnchor) =>
      Math.hypot(a.pos[0] - a.target[0], a.pos[1] - a.target[1], a.pos[2] - a.target[2]);
    expect(d(far)).toBeGreaterThan(d(near));
  });
  it('a portrait canvas (aspect < 1) pulls the camera FARTHER — the narrower horizontal FOV then binds', () => {
    const square = frameBody([0, 0, 0], 10, 50, 1);
    const portrait = frameBody([0, 0, 0], 10, 50, 0.6);
    const d = (a: CamAnchor) =>
      Math.hypot(a.pos[0] - a.target[0], a.pos[1] - a.target[1], a.pos[2] - a.target[2]);
    // aspect < 1 => horizontal half-fov is NARROWER than vertical, so it is the
    // binding constraint and the camera must back up further than the square.
    expect(d(portrait)).toBeGreaterThan(d(square));
  });
  it('a landscape canvas (aspect > 1) keeps the same framing distance (vertical FOV binds)', () => {
    const square = frameBody([0, 0, 0], 10, 50, 1);
    const wide = frameBody([0, 0, 0], 10, 50, 1.6);
    const d = (a: CamAnchor) =>
      Math.hypot(a.pos[0] - a.target[0], a.pos[1] - a.target[1], a.pos[2] - a.target[2]);
    // aspect > 1 => horizontal half-fov is WIDER, vertical stays binding, so the
    // distance is unchanged (a wide satellite system fits MORE easily on a wide
    // canvas, never cut off).
    approx(d(wide), d(square), 1e-6);
  });
  it('frames the extent at ~BODY_FILL of the smaller axis (not full-screen)', () => {
    const a = frameBody([0, 0, 0], 10, 50, 1);
    const dist = Math.hypot(a.pos[0], a.pos[1], a.pos[2]);
    const vHalf = (50 * Math.PI) / 360;
    // extent / (2 * tan(vHalf) * dist) = the vertical fill fraction.
    const fill = 10 / (2 * Math.tan(vHalf) * dist);
    // With aspect 1 the horizontal half-fov > vertical, so vertical is binding
    // and fill should be exactly BODY_FILL (0.62) — a comfortable margin, well
    // under the old 0.9 full-screen.
    approx(fill, 0.62, 1e-3);
  });
});

describe('frameSystem', () => {
  it('targets the origin from above the ecliptic', () => {
    const a = frameSystem(100, 50);
    expect(a.target).toEqual([0, 0, 0]);
    expect(a.pos[0]).toBe(0);
    expect(a.pos[1]).toBeGreaterThan(0);
  });
  it('farther extent => farther camera', () => {
    const d = (a: CamAnchor) => Math.hypot(a.pos[0], a.pos[1], a.pos[2]);
    expect(d(frameSystem(200, 50))).toBeGreaterThan(d(frameSystem(100, 50)));
  });
});

describe('frameConstellations', () => {
  it('stays inside the shell and looks at the origin', () => {
    const a = frameConstellations(4800, 140, 50);
    expect(a.target).toEqual([0, 0, 0]);
    const dist = Math.hypot(a.pos[0], a.pos[1], a.pos[2]);
    expect(dist).toBeLessThan(4800); // inside the constellation shell
    expect(dist).toBeGreaterThan(0);
  });
});

describe('stepFlight', () => {
  // Flight from camera [0,0,0] orbiting origin, to camera [10,0,0] orbiting
  // [5,0,0]. target: [0,0,0]->[5,0,0]; offset(camera−target): [0,0,0]->[5,0,0].
  const mk = (): Flight => ({
    fromTarget: [0, 0, 0],
    fromOffset: [0, 0, 0],
    toTarget: [5, 0, 0],
    toOffset: [5, 0, 0],
    duration: 1,
    t: 0,
    followId: null,
    fromFov: 50,
    toFov: 50,
  });
  it('starts at the from pose and lands exactly on the to pose', () => {
    const f = mk();
    const start = stepFlight(f, 0.0001);
    expect(start.done).toBe(false);
    approx(start.target[0], 0, 1e-3);
    approx(start.pos[0], 0, 1e-3); // pos = target + offset = 0
    // run past the end
    stepFlight(f, 10);
    const end = stepFlight(f, 0.0001);
    expect(end.done).toBe(true);
    approx(end.target[0], 5, 1e-9);
    approx(end.pos[0], 10, 1e-9); // target 5 + offset 5
  });
  it('is eased (slow start, gentle landing)', () => {
    const f = mk();
    // stepFlight advances t by dt and returns the sample for the NEW t, so
    // read the sample the step that reaches t=0.5 returns (k=0.5 => mid).
    const mid = stepFlight(f, 0.5); // t=0.5 -> eased k=0.5
    approx(mid.target[0], 2.5, 1e-6);
    approx(mid.pos[0], 5, 1e-6); // target 2.5 + offset 2.5
    const end = stepFlight(f, 0.5); // t=1.0 -> k=1
    approx(end.target[0], 5, 1e-6);
    approx(end.pos[0], 10, 1e-6);
  });
  it('rigidly tracks a moving body: offset preserved, target substituted', () => {
    const f = makeFlight(
      [0, 0, 0],
      [0, 0, 0], // from: cam at origin orbiting origin
      { target: [100, 0, 0], pos: [105, 0, 0] }, // to: orbit [100,0,0] at +5 offset
      1,
      'jupiter',
      50,
      50,
    );
    // Mid-flight (t=0.5): offset is halfway between [0,0,0] and [5,0,0] = [2.5,0,0].
    f.t = 0.5;
    const s = stepFlight(f, 0);
    approx(s.offset[0], 2.5, 1e-6);
    // The render loop substitutes the body's LIVE position for the target;
    // the camera lands rigidly at liveTarget + offset, so a body that moved
    // to [137,0,0] is still framed exactly at landing.
    const liveBody = [137, 0, 0];
    f.t = 1.0;
    const end = stepFlight(f, 0);
    const camAtLanding = [
      liveBody[0] + end.offset[0],
      liveBody[1] + end.offset[1],
      liveBody[2] + end.offset[2],
    ];
    // offset at landing = toOffset = [5,0,0]
    approx(camAtLanding[0], 142, 1e-6);
    expect(end.done).toBe(true);
  });
});
