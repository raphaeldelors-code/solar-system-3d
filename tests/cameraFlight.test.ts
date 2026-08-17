import { describe, it, expect } from 'vitest';
import {
  easeInOutCubic, dirTo, frameBody, frameSystem, frameConstellations,
  stepFlight, type Flight, type CamAnchor,
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
  const mk = (): Flight => ({
    fromPos: [0, 0, 0], fromTarget: [0, 0, 0],
    toPos: [10, 0, 0], toTarget: [10, 0, 0],
    duration: 1, t: 0, followId: null,
  });
  it('starts at fromPos and lands exactly on toPos', () => {
    const f = mk();
    const start = stepFlight(f, 0.0001);
    expect(start.done).toBe(false);
    approx(start.pos[0], 0, 1e-3);
    // run past the end
    stepFlight(f, 10);
    const end = stepFlight(f, 0.0001);
    expect(end.done).toBe(true);
    approx(end.pos[0], 10, 1e-9);
    approx(end.target[0], 10, 1e-9);
  });
  it('is symmetric about the midpoint (eased)', () => {
    const f = mk();
    stepFlight(f, 0.25); // t=0.25
    const p1 = stepFlight(f, 0.25).pos[0];   // t=0.5
    stepFlight(f, 0.25); // t=0.75
    const p3 = stepFlight(f, 0.25).pos[0];   // t=1.0
    // t=0.5 should be the midpoint of the *distance* travel for this ease
    approx(p1, 5, 1e-9);
    approx(p3, 10, 1e-9);
  });
});
