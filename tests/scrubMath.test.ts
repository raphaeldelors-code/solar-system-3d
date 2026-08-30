import { describe, it, expect } from 'vitest';
import {
  scrubDeltaDays,
  scrubSpeedLog,
  formatScrubDelta,
  SCRUB_DAYS_PER_PX,
  SCRUB_CLAMP_DAYS,
  SCRUB_SPEED_LOG_PER_PY,
  SPEED_LOG_MIN,
  SPEED_LOG_MAX,
} from '../src/render/scrubMath';

describe('scrubDeltaDays (horizontal = time travel)', () => {
  it('advances at the fixed rate (right drag = future)', () => {
    expect(scrubDeltaDays(150)).toBeCloseTo(0.3, 10); // 150 px × 0.002 d/px
    expect(scrubDeltaDays(-150)).toBeCloseTo(-0.3, 10);
    expect(scrubDeltaDays(0)).toBe(0);
  });

  it('rate is 0.002 d/px (300 px ≈ 0.6 yrs)', () => {
    expect(SCRUB_DAYS_PER_PX).toBe(0.002);
    expect(scrubDeltaDays(300)).toBeCloseTo(0.6, 10);
  });

  it('clamps to ±10 000 days (≈ 27.4 yrs) no matter how far you drag', () => {
    expect(SCRUB_CLAMP_DAYS).toBe(10_000);
    expect(scrubDeltaDays(5_000_000)).toBe(10_000);
    expect(scrubDeltaDays(-5_000_000)).toBe(-10_000);
    // Just inside the clamp boundary (10 000 / 0.002 = 5 000 000 px).
    expect(scrubDeltaDays(4_999_999)).toBeCloseTo(9_999.998, 6);
  });
});

describe('scrubSpeedLog (vertical = speed slider)', () => {
  it('up drag (negative screen Δy) = faster; 100 px = one decade', () => {
    expect(SCRUB_SPEED_LOG_PER_PY).toBe(0.01);
    expect(scrubSpeedLog(0, -100)).toBeCloseTo(1, 10);
    expect(scrubSpeedLog(0, 100)).toBeCloseTo(-1, 10);
  });

  it('is linear in the middle of the range', () => {
    expect(scrubSpeedLog(0.5, -50)).toBeCloseTo(1.0, 10);
    expect(scrubSpeedLog(-1, 20)).toBeCloseTo(-1.2, 10);
  });

  it('never leaves the slider domain [−3, 2.5]', () => {
    expect(SPEED_LOG_MIN).toBe(-3);
    expect(SPEED_LOG_MAX).toBe(2.5);
    expect(scrubSpeedLog(0, 1000)).toBe(SPEED_LOG_MIN);
    expect(scrubSpeedLog(0, -1000)).toBe(SPEED_LOG_MAX);
    // Starting at an extreme still clamps.
    expect(scrubSpeedLog(SPEED_LOG_MAX, -500)).toBe(SPEED_LOG_MAX);
    expect(scrubSpeedLog(SPEED_LOG_MIN, 500)).toBe(SPEED_LOG_MIN);
  });
});

describe('formatScrubDelta', () => {
  it('formats days for |Δ| < 365 d', () => {
    expect(formatScrubDelta(0)).toBe('0 d');
    expect(formatScrubDelta(128)).toBe('+128 d');
    expect(formatScrubDelta(-128)).toBe('−128 d');
    expect(formatScrubDelta(364)).toBe('+364 d');
  });

  it('formats years for |Δ| ≥ 365 d (1 decimal)', () => {
    expect(formatScrubDelta(1461)).toBe('+4.0 yrs');
    expect(formatScrubDelta(-730.5)).toBe('−2.0 yrs');
    expect(formatScrubDelta(3650)).toBe('+10.0 yrs');
  });
});
