import { describe, it, expect } from 'vitest';
import {
  easeInOutCubic, dirTo, frameBody, frameSystem, frameConstellations,
  stepFlight, makeFlight, type Flight, type CamAnchor,
} from '../src/render/cameraFlight';

const approx = (got: number, want: number, tol = 1e-6) =>
  expect(Math.abs(got - want), `got ${got}, want ${want}`).toBeLessThanOrEqual(tol);

describe('easeInOutCubic', () => {
  it('clamps and endpoints', () => {
    approx(easeInOutCubic(0), 0);
    approx(easeInOutCubic(1), 1);
    approx(easeInOutCubic(0.5), 0.5);
    approx(easeInOutCubic(-0.5), 0);   // clamped
    approx(easeInOutCubic(1.5), 1);    // clamped
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
    approx(d[0], 0); approx(d[1], 0); approx(d[2], 1);
  });
  it('coincident points -> [0,1,0]', () => {
    const d = dirTo([1, 2, 3], [1, 2, 3]);
    expect(d).toEqual([0, 1, 0]);
  });
});

describe('frameBody', () => {
  it('looks at the body and keeps the current bearing', () => {
    const anchor: CamAnchor = frameBody([10, 0, 0], [0, 0, 0], 1, 50);
    // target is the body
    expect(anchor.target).toEqual([0, 0, 0]);
    // camera is along the SAME bearing (from body toward current pos) => +x
    approx(anchor.pos[0], Math.hypot(anchor.pos[0], anchor.pos[1], anchor.pos[2]), 1e-9);
    approx(anchor.pos[1], 0);
    approx(anchor.pos[2], 0);
  });
  it('bigger body => camera farther away', () => {
    const near = frameBody([10, 0, 0], [0, 0, 0], 1, 50);
    const far = frameBody([10, 0, 0], [0, 0, 0], 5, 50);
    const d = (a: CamAnchor) => Math.hypot(a.pos[0], a.pos[1], a.pos[2]);
    expect(d(far)).toBeGreaterThan(d(near));
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
    expect(dist).toBeLessThan(4800);           // inside the constellation shell
    expect(dist).toBeGreaterThan(0);
  });
});

describe('stepFlight', () => {
  // Flight from camera [0,0,0] orbiting origin, to camera [10,0,0] orbiting
  // [5,0,0]. target: [0,0,0]->[5,0,0]; offset(camera−target): [0,0,0]->[5,0,0].
  const mk = (): Flight => ({
    fromTarget: [0, 0, 0], fromOffset: [0, 0, 0],
    toTarget: [5, 0, 0], toOffset: [5, 0, 0],
    duration: 1, t: 0, followId: null,
    fromFov: 50, toFov: 50,
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
      [0, 0, 0], [0, 0, 0], // from: cam at origin orbiting origin
      { target: [100, 0, 0], pos: [105, 0, 0] }, // to: orbit [100,0,0] at +5 offset
      1, 'jupiter',
      50, 50,
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
      liveBody[0] + end.offset[0], liveBody[1] + end.offset[1], liveBody[2] + end.offset[2],
    ];
    // offset at landing = toOffset = [5,0,0]
    approx(camAtLanding[0], 142, 1e-6);
    expect(end.done).toBe(true);
  });
});
