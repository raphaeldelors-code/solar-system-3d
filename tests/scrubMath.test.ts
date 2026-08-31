import { describe, it, expect } from 'vitest';
import {
  scrubClampToYear,
  scrubSpeedLog,
  yearSpanDays,
  formatScrubDelta,
  addYearsUtc,
  SCRUB_DAYS_PER_PX,
  SCRUB_SPEED_LOG_PER_PY,
  SPEED_LOG_MIN,
  SPEED_LOG_MAX,
} from '../src/render/scrubMath';

describe('yearSpanDays (pure calendar math, days since J2000)', () => {
  it('anchor: J2000 is 2000-01-01 12:00 UTC, so Jan 1 2000 is −0.5 d', () => {
    expect(yearSpanDays(2000).span0Days).toBe(-0.5);
    expect(yearSpanDays(2000).spanLenDays).toBe(366); // 2000 is a leap year
  });

  it('measured values (computed from real UTC date math)', () => {
    expect(yearSpanDays(1999)).toEqual({ span0Days: -365.5, spanLenDays: 365 });
    expect(yearSpanDays(2023)).toEqual({ span0Days: 8400.5, spanLenDays: 365 });
    expect(yearSpanDays(2024)).toEqual({ span0Days: 8765.5, spanLenDays: 366 });
    expect(yearSpanDays(2026)).toEqual({ span0Days: 9496.5, spanLenDays: 365 });
    expect(yearSpanDays(2033)).toEqual({ span0Days: 12053.5, spanLenDays: 365 });
  });

  it('years tile the timeline: Jan 1 of N+1 = Jan 1 of N + length', () => {
    for (let y = 1990; y <= 2040; y++) {
      const a = yearSpanDays(y);
      const b = yearSpanDays(y + 1);
      expect(b.span0Days).toBeCloseTo(a.span0Days + a.spanLenDays, 10);
      expect(a.spanLenDays).toBeGreaterThanOrEqual(365);
      expect(a.spanLenDays).toBeLessThanOrEqual(366);
    }
  });
});

describe('scrubClampToYear (plan 024 F1: linear, speed-independent, year-clamped)', () => {
  // Press at 2026-06-01 00:00 UTC: 31+28+31+30+31 = 151 days after Jan 1.
  const press = 9496.5 + 151; // = 9647.5 (2026-06-01 00:00 UTC)
  const span = yearSpanDays(2026);

  it('constant: 1 px = 1 sim day', () => {
    expect(SCRUB_DAYS_PER_PX).toBe(1);
  });

  it('is 0 px = the press epoch, and LINEAR: Δdays = Δpx exactly', () => {
    expect(scrubClampToYear(press, span.span0Days, span.spanLenDays, 0)).toBeCloseTo(press, 10);
    // Values that stay inside the year from the mid-June press (no clamping).
    for (const px of [1, 7, 50, 120, 200]) {
      const t = scrubClampToYear(press, span.span0Days, span.spanLenDays, px);
      expect(t - press).toBeCloseTo(px * SCRUB_DAYS_PER_PX, 9); // right = future
    }
    for (const px of [1, 7, 50, 120, 150]) {
      const t = scrubClampToYear(press, span.span0Days, span.spanLenDays, -px);
      expect(press - t).toBeCloseTo(px * SCRUB_DAYS_PER_PX, 9); // left = past
    }
  });

  it('is SPEED-INDEPENDENT: identical result for any playback speed', () => {
    // The function takes no speed argument at all — the user's literal ask.
    // (Asserted structurally by the signature; behaviourally: a full-year
    // drag travels ~365 d at every speed, unlike plan 023 F1 where the
    // span scaled with the speed slider.)
    const t = scrubClampToYear(press, span.span0Days, span.spanLenDays, 200);
    expect(t).toBeCloseTo(press + 200, 9);
  });

  it('clamps to the PRESS year — "zero" is Jan 1, the far bound is Dec 31', () => {
    // Left edge: drag left from mid-year far past Jan 1 → pinned at Jan 1.
    const toLeft = scrubClampToYear(press, span.span0Days, span.spanLenDays, -10_000);
    expect(toLeft).toBeCloseTo(span.span0Days, 6);
    // Right edge: drag right far past Dec 31 → pinned at Dec 31 (just shy).
    const toRight = scrubClampToYear(press, span.span0Days, span.spanLenDays, 10_000);
    expect(toRight).toBeLessThan(span.span0Days + span.spanLenDays);
    expect(span.span0Days + span.spanLenDays - toRight).toBeLessThan(1e-4);
    // A full-year drag (365 px) from mid-June overruns Dec 31 (only ~214 d
    // left in the year) and must clamp AT the year end — never crossing into
    // 2027. (A mid-June press reaches the FAR edge in ~214 px.)
    const fullYear = scrubClampToYear(press, span.span0Days, span.spanLenDays, 365);
    expect(fullYear).toBeCloseTo(span.span0Days + span.spanLenDays - 1e-6, 3);
    expect(fullYear).toBeLessThan(span.span0Days + span.spanLenDays);
    expect(fullYear).toBeLessThan(yearSpanDays(2027).span0Days);
  });

  it('a press near a year boundary clamps to THAT year, not the next', () => {
    // Press Dec 30 2026 (day 363.5): 100 px right → Dec 31 2026, NOT 2027.
    const dec30 = span.span0Days + 363.5;
    const t = scrubClampToYear(dec30, span.span0Days, span.spanLenDays, 100);
    expect(t).toBeLessThan(span.span0Days + span.spanLenDays);
    expect(t).toBeLessThan(yearSpanDays(2027).span0Days);
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

describe('addYearsUtc (plan 024 F3)', () => {
  it('preserves month, day, and time of day for ordinary dates', () => {
    const d = new Date(Date.UTC(2026, 5, 15, 14, 30, 0, 123));
    expect(addYearsUtc(d, 1).getTime()).toBe(Date.UTC(2027, 5, 15, 14, 30, 0, 123));
    expect(addYearsUtc(d, -1).getTime()).toBe(Date.UTC(2025, 5, 15, 14, 30, 0, 123));
    expect(addYearsUtc(d, 5).getUTCFullYear()).toBe(2031);
  });

  it('clamps Feb 29 to Feb 28 when the target year is not a leap year', () => {
    const leap = new Date(Date.UTC(2024, 1, 29, 8, 0));
    expect(addYearsUtc(leap, 1).getTime()).toBe(Date.UTC(2025, 1, 28, 8, 0));
    // …and keeps Feb 29 when the target IS a leap year.
    expect(addYearsUtc(leap, 4).getTime()).toBe(Date.UTC(2028, 1, 29, 8, 0));
    // Backwards: Feb 15 2025 −1 y lands on Feb 15 2024 (no clamp needed).
    expect(addYearsUtc(new Date(Date.UTC(2025, 1, 15)), -1).getTime()).toBe(Date.UTC(2024, 1, 15));
  });

  it('crosses the century cleanly', () => {
    expect(addYearsUtc(new Date(Date.UTC(2000, 0, 1)), -1).getTime()).toBe(Date.UTC(1999, 0, 1));
    expect(addYearsUtc(new Date(Date.UTC(1999, 11, 31)), 1).getTime()).toBe(Date.UTC(2000, 11, 31));
  });
});
