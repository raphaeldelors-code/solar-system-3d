import { describe, it, expect } from 'vitest';
import {
  scrubDeltaDays,
  scrubSpeedLog,
  scrubXToT,
  scrubSpanDays,
  formatScrubDelta,
  SCRUB_CLAMP_DAYS,
  SCRUB_SPAN_PX,
  SCRUB_SPAN_SIM_SECONDS,
  SCRUB_SPEED_LOG_PER_PY,
  SPEED_LOG_MIN,
  SPEED_LOG_MAX,
} from '../src/render/scrubMath';

describe('scrubSpanDays (speed-proportional full span)', () => {
  it('constants: ±10 000 d clamp, 500 px shape, 1 h span reference', () => {
    expect(SCRUB_CLAMP_DAYS).toBe(10_000);
    expect(SCRUB_SPAN_PX).toBe(500);
    expect(SCRUB_SPAN_SIM_SECONDS).toBe(3600);
  });

  it('span = min(±10 000 d, speed × 3600 s)', () => {
    expect(scrubSpanDays(1)).toBe(3600); // 1 d/s → ±3 600 d (≈ 9.9 yrs)
    expect(scrubSpanDays(0.001)).toBeCloseTo(3.6, 10); // 0.001 d/s → ±3.6 d
    expect(scrubSpanDays(2)).toBe(7200); // below the clamp: pure ×3600
    expect(scrubSpanDays(3.1623)).toBe(SCRUB_CLAMP_DAYS); // 11 384 d → capped
    expect(scrubSpanDays(100)).toBe(SCRUB_CLAMP_DAYS); // capped at 10 000 d
    expect(scrubSpanDays(1e9)).toBe(SCRUB_CLAMP_DAYS); // extreme speed caps too
  });
});

describe('scrubXToT (quadratic saturation, −1..1)', () => {
  it('is 0 at the press point, odd, and bounded', () => {
    expect(scrubXToT(0)).toBe(0);
    expect(scrubXToT(123.4)).toBeCloseTo(-scrubXToT(-123.4), 15);
    expect(Math.abs(scrubXToT(1e7))).toBeLessThan(1);
  });

  it('has ZERO slope at the center: "slower the more we are close to the center"', () => {
    // f(x) ≈ x² near x = 0 — a 10 px twitch moves only 0.0004 of the span
    // (tanh would move 0.02 at its FULL slope — rejected as too twitchy).
    expect(scrubXToT(10)).toBeCloseTo(0.0004, 5);
    expect(scrubXToT(100)).toBeCloseTo(0.0385, 3);
    // Monotone away from the center.
    expect(scrubXToT(30)).toBeGreaterThan(scrubXToT(10));
    expect(scrubXToT(-30)).toBeLessThan(scrubXToT(-10));
  });

  it('reaches 0.5 of the span at 500 px and 0.95 at ~2180 px', () => {
    expect(scrubXToT(500)).toBeCloseTo(0.5, 12);
    expect(scrubXToT(916)).toBeCloseTo(0.77, 2);
    expect(scrubXToT(2180)).toBeGreaterThan(0.95);
    expect(scrubXToT(5000)).toBeCloseTo(0.99, 2);
    expect(scrubXToT(50_000)).toBeCloseTo(1, 3);
    expect(scrubXToT(-50_000)).toBeCloseTo(-1, 3);
  });
});

describe('scrubDeltaDays (speed-proportional lateral travel)', () => {
  it('is 0 at the press point', () => {
    expect(scrubDeltaDays(1, 0)).toBe(0);
  });

  it('right drag (positive px) = future, left = past', () => {
    expect(scrubDeltaDays(1, 100)).toBeGreaterThan(0);
    expect(scrubDeltaDays(1, -100)).toBeLessThan(0);
  });

  it('scales linearly with speed while below the clamp (200 px, 1 vs 2 d/s)', () => {
    // Both spans (3 600 d / 7 200 d) are below the ±10 000 d cap, so the
    // faster setting yields exactly 2× the travel for the same drag.
    expect(scrubDeltaDays(2, 200)).toBeCloseTo(scrubDeltaDays(1, 200) * 2, 9);
  });

  it('is NOT 100× at 100 d/s — the ±10 000 d clamp flattens it', () => {
    // spanDays(100) = min(10 000, 360 000) = 10 000, so the ratio to the
    // 1 d/s span (3 600) is 10 000/3 600 ≈ 2.78×, not 100×.
    const ratio = scrubDeltaDays(100, 200) / scrubDeltaDays(1, 200);
    expect(ratio).toBeCloseTo(10_000 / 3600, 6);
    expect(ratio).toBeLessThan(100);
  });

  it('equals spanDays × f(px / 500)', () => {
    for (const speed of [0.001, 0.1, 1, 10, 100]) {
      for (const px of [-2000, -300, -10, 0, 7, 120, 500, 1200, 4000]) {
        expect(scrubDeltaDays(speed, px)).toBeCloseTo(scrubSpanDays(speed) * scrubXToT(px), 9);
      }
    }
  });

  it('at 1 d/s a 300 px drag travels ≈ 953 d (old model: 0.6 d)', () => {
    // 3600 · f(300/500) = 3600 · 0.2647 ≈ 953 d — ~1 590× the old
    // fixed-rate 0.6 d for the same gesture (and 30 px → only 12.9 d:
    // the center is deliberately slow).
    expect(scrubDeltaDays(1, 300)).toBeCloseTo(3600 * scrubXToT(300), 9);
    expect(scrubDeltaDays(1, 300)).toBeCloseTo(952.94, 1);
    expect(scrubDeltaDays(1, 30)).toBeCloseTo(12.91, 1);
  });

  it('at high speed the clamp still wins: 100 d/s, 2000 px → ±10 000 d bound', () => {
    expect(Math.abs(scrubDeltaDays(100, 2000))).toBeLessThanOrEqual(SCRUB_CLAMP_DAYS);
    // The quadratic saturation never exactly reaches ±1, so a very long drag
    // lands infinitesimally short of the clamp — still within 0.1 d of it.
    expect(Math.abs(scrubDeltaDays(100, 5_000_000))).toBeCloseTo(SCRUB_CLAMP_DAYS, 1);
    expect(scrubDeltaDays(100, -5_000_000)).toBeCloseTo(-SCRUB_CLAMP_DAYS, 1);
  });
});

describe('scrubSpeedLog (vertical = speed slider, unchanged from 022)', () => {
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
