import { describe, it, expect } from 'vitest';
import { SimClock } from '../src/sim/clock';
import { J2000_UTC } from '../src/sim/types';

describe('SimClock', () => {
  it('starts at the given date (default: now ≈ small positive days)', () => {
    const c = new SimClock();
    expect(c.t).toBeGreaterThan(0);
    expect(c.t).toBeLessThan(40000); // less than ~110 years
  });

  it('tracks days since J2000', () => {
    const c = new SimClock(J2000_UTC + 10 * 86_400_000);
    expect(c.t).toBeCloseTo(10, 10);
  });

  it('advances by speed × dt when ticking', () => {
    const c = new SimClock(J2000_UTC);
    c.setLogSpeed(0); // 1 day/s
    c.tick(2.5);
    expect(c.t).toBeCloseTo(2.5, 10);
  });

  it('does not advance while paused', () => {
    const c = new SimClock(J2000_UTC);
    c.setPaused(true);
    c.tick(10);
    expect(c.t).toBeCloseTo(0, 12);
  });

  it('setDate jumps to an absolute date', () => {
    const c = new SimClock(J2000_UTC);
    c.setDate(new Date('2005-06-15T12:00:00Z'));
    const days = (Date.UTC(2005, 5, 15, 12) - J2000_UTC) / 86_400_000;
    expect(c.t).toBeCloseTo(days, 6);
    expect(c.toDate().toISOString()).toBe('2005-06-15T12:00:00.000Z');
  });

  it('log speed maps 10^v days/s', () => {
    const c = new SimClock(J2000_UTC);
    c.setLogSpeed(2);
    expect(c.getSpeed()).toBeCloseTo(100, 10);
    c.setLogSpeed(-1);
    expect(c.getSpeed()).toBeCloseTo(0.1, 10);
  });
});
