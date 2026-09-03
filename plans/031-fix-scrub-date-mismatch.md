# Plan 031 — Fix focal-date chip ↔ date-pane mismatch while scrubbing

## The bug

While scrubbing (mouse right-drag or 3-finger touch), two dates are shown and
they **disagree**:

- **`#hud-date` (the top-right box / "little box")** — driven by
  `applyScrubMove` → `clock.setDate(startDays + dx·SCRUB_DAYS_PER_PX)` =
  **press date + horizontal drag**, clamped to the press year.
- **`#hud-tl-lens-date` (the focal-date chip under the glass)** — driven by
  `tlTooltipAndLens` line 2005: `fmtMonthDayUtc(tlActiveYear,
(focal / width) · tlSpanLen)` = **pointer position on the bar**, as if the
  bar's left edge is Jan 1.

These are different coordinate systems. They coincide only when the press is at
the bar's left edge with zero drag; otherwise the chip is offset from the clock
by `(pressX/width)·span` days. The user: _"The date highlighted when scrolling
is not matching the date that appears in the little box top right — inconsistent
when scrolling and releasing."_

The green "you-are-here" caret **inside** the lens is already clock-correct
(`caretFrac` from `clock.t`); only the text chip is wrong.

## The fix

The focal-date chip must show the **clock's committed date** while a scrub is
live — the same value `#hud-date` and the in-lens caret show — so all three
agree. It should only fall back to the position-derived day (pointer inspection)
when merely hovering the bar without scrubbing.

`scrub` (mouse) and `threeFinger` (touch) are both in scope of
`tlTooltipAndLens`; a scrub is "live" when `scrub?.movedX || threeFinger?.live`.

- [x] F1 `fix(scrub): focal-date chip reads the clock date while scrubbing` —
      in `tlTooltipAndLens`, compute the chip day-of-year from `clock.t - tlSpan0`
      when a scrub is active, else `(focal / width) · tlSpanLen`.

## Verification (headless Chrome, DOM) — ALL PASS

- Mouse right-drag scrub (press left-third, +140px): focal chip "Dec 31" ==
  pane "2026-12-31" (parity); lens shown during, hidden after release.
- 3-finger touch scrub (same centroid advance): focal chip "Dec 31" ==
  pane "2026-12-31" (parity); lens shown during, hidden after lift.
- Hover (no scrub) unchanged: chip inspects the day at the pointer.
- Gates: tsc + 313/313 vitest + lint + prettier + build all green.
- The green in-lens "you-are-here" caret was already clock-correct; only the
  text chip needed the fix.
