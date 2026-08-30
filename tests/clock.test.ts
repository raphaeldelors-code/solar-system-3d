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

  it('log speed is a MAGNITUDE (log10 days/s); 0 = 1 d/s, can go below 1', () => {
    const c = new SimClock(J2000_UTC);
    c.setLogSpeed(2);
    expect(c.getSpeed()).toBeCloseTo(100, 10);
    c.setLogSpeed(0.5);
    expect(c.getSpeed()).toBeCloseTo(Math.sqrt(10), 10);
    // Middle: 1 day/s (NOT real-time, NOT paused).
    c.setLogSpeed(0);
    expect(c.getSpeed()).toBeCloseTo(1, 12);
    // Slow end: sub-day magnitudes for watching satellites.
    c.setLogSpeed(-1);
    expect(c.getSpeed()).toBeCloseTo(0.1, 10);
    c.setLogSpeed(-3);
    expect(c.getSpeed()).toBeCloseTo(0.001, 12);
  });

  it('reversed flips the sign independently of the magnitude', () => {
    const c = new SimClock(J2000_UTC);
    c.setLogSpeed(1); // 10 d/s forward
    expect(c.isReversed).toBe(false);
    expect(c.getSpeed()).toBeCloseTo(10, 10);
    c.setReversed(true);
    expect(c.isReversed).toBe(true);
    expect(c.getSpeed()).toBeCloseTo(-10, 10);
    c.setReversed(false);
    expect(c.getSpeed()).toBeCloseTo(10, 10);
  });

  it('reversed runs the calendar backwards on tick', () => {
    const c = new SimClock(J2000_UTC);
    c.setLogSpeed(1); // 10 day/s
    c.setReversed(true);
    c.tick(10); // 10 s => -100 days
    expect(c.t).toBeCloseTo(-100, 10);
  });

  describe('scrub session (plan 022)', () => {
    it('getLogSpeed round-trips setLogSpeed', () => {
      const c = new SimClock(J2000_UTC);
      expect(c.getLogSpeed()).toBe(0);
      c.setLogSpeed(1.5);
      expect(c.getLogSpeed()).toBe(1.5);
      c.setLogSpeed(-2.25);
      expect(c.getLogSpeed()).toBe(-2.25);
    });

    it('beginScrub freezes the clock even if it was running', () => {
      const c = new SimClock(J2000_UTC);
      c.setLogSpeed(1);
      c.beginScrub();
      expect(c.isPaused).toBe(true);
      c.tick(5);
      expect(c.t).toBeCloseTo(0, 12);
    });

    it('endScrub resumes only if time was running before the press', () => {
      const c = new SimClock(J2000_UTC);
      c.setLogSpeed(1);
      c.beginScrub();
      c.tick(5);
      c.endScrub();
      expect(c.isPaused).toBe(false);
      const t0 = c.t;
      c.tick(1);
      expect(c.t).toBeGreaterThan(t0);

      // Paused before the press → paused after the release.
      const c2 = new SimClock(J2000_UTC);
      c2.setPaused(true);
      c2.beginScrub();
      c2.endScrub();
      expect(c2.isPaused).toBe(true);
      const t1 = c2.t;
      c2.tick(5);
      expect(c2.t).toBeCloseTo(t1, 12);
    });

    it('endScrub never touches the speed (slider state survives the gesture)', () => {
      const c = new SimClock(J2000_UTC);
      c.setLogSpeed(0);
      c.beginScrub();
      c.setLogSpeed(2); // what the vertical drag leaves behind
      c.endScrub();
      expect(c.getLogSpeed()).toBe(2);
      expect(c.getSpeed()).toBeCloseTo(100, 10);
    });
  });
});
