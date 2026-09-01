/**
 * Plan 026 F1 — pure calendar math for the clickable-date popover.
 *
 * All functions are UTC-based and side-effect free so they can be unit-tested
 * without a clock or DOM. The day grid is a fixed 6×7 (42 cells) so the
 * popover height never jumps between months; leading/trailing cells are 0.
 * Weeks start on Sunday (matches `Date.getUTCDay()`).
 */

/** Full month names, index 0 = January. */
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Number of days in a UTC month (month 0 = January). */
export function daysInMonthUtc(year: number, month: number): number {
  // Day 0 of the NEXT month is the last day of this month.
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

/**
 * Weekday of the 1st of a UTC month, 0 = Sunday … 6 = Saturday
 * (i.e. `Date.getUTCDay()` for the 1st).
 */
export function firstWeekdayUtc(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 1)).getUTCDay();
}

/** A 6×7 (42-cell) day grid for a UTC month. */
export interface MonthGrid {
  /** 42 cells: 0 = blank (outside the month), 1..daysInMonth = day of month. */
  grid: number[];
  /** Number of days in the month. */
  daysInMonth: number;
  /** Weekday of the 1st, 0 = Sunday. */
  firstWeekday: number;
}

/**
 * Build the 42-cell day grid for a UTC month. `grid[i]` is the day-of-month
 * for the i-th cell (row-major, 6 rows × 7 cols), or 0 for a leading/trailing
 * blank. Weeks start on Sunday.
 */
export function monthGrid(year: number, month: number): MonthGrid {
  const daysInMonth = daysInMonthUtc(year, month);
  const firstWeekday = firstWeekdayUtc(year, month);
  const grid: number[] = new Array(42).fill(0);
  for (let d = 1; d <= daysInMonth; d++) {
    grid[firstWeekday + (d - 1)] = d;
  }
  return { grid, daysInMonth, firstWeekday };
}

/** "September 2026" for a UTC month (month 0 = January). */
export function fmtMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

/** True when two Dates fall on the same UTC calendar day. */
export function isSameDayUtc(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}
