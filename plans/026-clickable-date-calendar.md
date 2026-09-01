# 026 — clickable date → calendar popover (quick month/year nav + day picker)

User request (2026-09-02, after the plan-025 HUD audit): the mini pane's date
should be **clickable** and open a **calendar** that allows quick navigation
month and year forward/backward from the current date, on top of a precise
day picker. This restores year navigation that plan 025 F2 removed (the
±1/±5 year buttons were dropped when the pane was reduced to "date + speed
only"), but as a calendar instead of the old button row.

## Design

A popover (`#date-cal`) anchored just below the mini pane (top-right), shown
on click of `#hud-date`, hidden on: click of a day, click of "Today",
outside-click, or `Esc`. It is a normal interactive DOM layer
(`pointer-events:auto`), so it never collides with the canvas scrub (which is
right-button on the canvas only) or the pick gesture (left-drag on canvas).

Header: `[‹]  September 2026  [›]` — month nav (prev/next month).
Year row (F2): `[−5y] [−1y]  2026  [+1y] [+5y]` — quick year nav, reusing the
existing pure `addYearsUtc()` helper (leap-safe: 2024-02-29 → 2025-02-28).
Day grid: 7 columns (Su…Sa), 6 rows (stable height), leading/trailing blanks.
The current sim-clock day is highlighted; clicking a day jumps the clock to
that calendar day **keeping the current time of day** (same contract as the
existing `#date-pick`), re-flashes the date readout, refreshes events if open,
and syncs the URL. A "Today" button jumps to the real-world now.

The popover tracks the sim clock while open: if the clock is running and the
day changes, the highlighted day + header update live (no re-open needed).

## Commits (one per feature, gates green before each)

- **F1** ✅ `7e4b1a4` — `feat(ui): clickable date opens a calendar popover
(month nav + day grid + today)`. Pure calendar math in `src/render/calendar.ts`
  (`monthGrid`, `daysInMonthUtc`, `firstWeekdayUtc`, `fmtMonthYear`,
  `isSameDayUtc`) + 11 unit tests in `tests/calendar.test.ts`. DOM: `#date-cal`
  popover in `index.html` (header ‹/›, day grid, Today). `#hud-date` gets
  `pointer-events:auto` + cursor + click handler; open/close/nav/day-select
  wiring in `main.ts`. Gated: tests + tsc + lint + prettier + build, then a
  live headless check (open, prev/next month, click a day → clock jumps
  keeping time-of-day, Today, outside-click + Esc close, live tracking while
  running). Also fixed pre-existing Prettier drift in plans/025 that was
  failing the whole-repo format gate.
- **F2** ✅ `9eab67b` — `feat(ui): quick year nav (±1/±5 y) in the calendar
popover`. Adds a 4-button year row (−5y/−1y/+1y/+5y) between the month
  header and the weekday row; jumps the VIEW by years (month preserved),
  commits only on a day pick. Restores the year navigation plan 025 F2
  removed. Gated the same way + live check (+5y→2031, +1y→2032, −1y→2031,
  −5y→2026, month preserved).
- **docs** — this commit: record F1–F2 hashes in todo.md + this plan.

## Constants / conventions

- Popover: fixed, `top: calc(44px + 22px + env(safe-area-inset-top))`
  (just under the mini pane), `right: calc(12px + env(safe-area-inset-right))`,
  `z-index: 30` (above the pane's 20), width ~264px, dark theme matching
  `#hud-mini` (rgba(10,16,28,.92) bg, rgba(120,150,200,.25) border,
  #9fd6a8 accent, tabular-nums).
- Day grid: 6×7, cell ~32px, selected day = green ring + fill, today = dot.
- `monthGrid(y, m)` returns `{ grid: number[42], daysInMonth, firstWeekday }`
  where `grid` is 42 cells (6 weeks), 0 = blank, 1..daysInMonth = day.
  Week starts Sunday (matches `getUTCDay`).
- Time-of-day preserved on day select: `new Date(Date.UTC(y, m, d,
cur.getUTCHours(), cur.getUTCMinutes()))` — identical to `applyDatePick()`.

## Notes

- `#hud-date` is `pointer-events:none` via `#hud-mini`; the clickable date
  re-enables `pointer-events:auto` on `#hud-date` ONLY (the pane stays
  click-through everywhere else). The `.hot` magnify transform is unaffected.
- The existing `#date-pick` native input in the panel is left as-is (a second,
  power-user path); the new popover is the primary, always-visible path.
