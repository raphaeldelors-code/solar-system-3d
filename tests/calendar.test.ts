import { describe, it, expect } from 'vitest';
import {
  MONTH_NAMES,
  daysInMonthUtc,
  firstWeekdayUtc,
  monthGrid,
  fmtMonthYear,
  isSameDayUtc,
} from '../src/render/calendar';

describe('calendar: daysInMonthUtc', () => {
  it('common month lengths', () => {
    expect(daysInMonthUtc(2026, 0)).toBe(31); // Jan
    expect(daysInMonthUtc(2026, 3)).toBe(30); // Apr
    expect(daysInMonthUtc(2026, 1)).toBe(28); // Feb non-leap
    expect(daysInMonthUtc(2024, 1)).toBe(29); // Feb leap
    expect(daysInMonthUtc(2026, 11)).toBe(31); // Dec
  });
});

describe('calendar: firstWeekdayUtc (0 = Sunday)', () => {
  it('known first-of-month weekdays', () => {
    expect(firstWeekdayUtc(2026, 8)).toBe(2); // Sep 1 2026 = Tuesday
    expect(firstWeekdayUtc(2026, 1)).toBe(0); // Feb 1 2026 = Sunday
    expect(firstWeekdayUtc(2026, 0)).toBe(4); // Jan 1 2026 = Thursday
    expect(firstWeekdayUtc(2024, 1)).toBe(4); // Feb 1 2024 = Thursday
  });
});

describe('calendar: monthGrid', () => {
  it('always returns 42 cells', () => {
    for (let m = 0; m < 12; m++) {
      expect(monthGrid(2026, m).grid).toHaveLength(42);
    }
  });

  it('day 1 lands in the firstWeekday column', () => {
    const g = monthGrid(2026, 8); // September 2026
    expect(g.grid[2]).toBe(1); // Tuesday column (index 2)
    expect(g.firstWeekday).toBe(2);
    expect(g.daysInMonth).toBe(30);
  });

  it('fills days 1..N contiguously with no gaps', () => {
    const g = monthGrid(2026, 0); // January 2026 (31 days)
    const days = g.grid.filter((d) => d > 0);
    expect(days).toHaveLength(31);
    for (let i = 0; i < days.length; i++) expect(days[i]).toBe(i + 1);
  });

  it('a month that spans 6 weeks has blanks at both ends', () => {
    // Feb 2026: starts Sunday (col 0), 28 days → 4 weeks exactly, no
    // trailing blanks. Jan 2026: starts Thursday (col 4), 31 days →
    // 4 + 31 = 35 cells → 7 trailing blanks.
    const jan = monthGrid(2026, 0);
    expect(jan.grid[0]).toBe(0); // Sun–Wed before Jan 1
    expect(jan.grid[3]).toBe(0);
    expect(jan.grid[4]).toBe(1);
    expect(jan.grid[34]).toBe(31);
    expect(jan.grid[35]).toBe(0); // trailing blanks
    const feb = monthGrid(2026, 1);
    expect(feb.grid[0]).toBe(1); // starts on Sunday
    expect(feb.grid[27]).toBe(28);
    expect(feb.grid[28]).toBe(0); // no trailing blanks
  });

  it('leap-year February has 29 days', () => {
    const g = monthGrid(2024, 1);
    expect(g.daysInMonth).toBe(29);
    expect(g.firstWeekday).toBe(4); // Feb 1 2024 = Thursday
    expect(g.grid[32]).toBe(29); // 4 + 28 = index 32
  });
});

describe('calendar: fmtMonthYear', () => {
  it('full month name + year', () => {
    expect(fmtMonthYear(2026, 8)).toBe('September 2026');
    expect(fmtMonthYear(2026, 0)).toBe('January 2026');
    expect(fmtMonthYear(2026, 11)).toBe('December 2026');
  });
});

describe('calendar: isSameDayUtc', () => {
  it('same calendar day regardless of time', () => {
    const a = new Date(Date.UTC(2026, 8, 15, 0, 0));
    const b = new Date(Date.UTC(2026, 8, 15, 23, 59));
    expect(isSameDayUtc(a, b)).toBe(true);
  });
  it('different day / month / year', () => {
    const a = new Date(Date.UTC(2026, 8, 15));
    expect(isSameDayUtc(a, new Date(Date.UTC(2026, 8, 16)))).toBe(false);
    expect(isSameDayUtc(a, new Date(Date.UTC(2026, 7, 15)))).toBe(false);
    expect(isSameDayUtc(a, new Date(Date.UTC(2025, 8, 15)))).toBe(false);
  });
});

describe('calendar: MONTH_NAMES', () => {
  it('has 12 entries, Jan first', () => {
    expect(MONTH_NAMES).toHaveLength(12);
    expect(MONTH_NAMES[0]).toBe('January');
    expect(MONTH_NAMES[11]).toBe('December');
  });
});
