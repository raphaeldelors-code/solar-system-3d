# Plan 034 — Fix the in-lens event dots 12px offset (events "badly positioned")

## Symptom

User report (2035-05-22, 21.1 d/s, phone): "Events are badly positioned — they
don't match the date picked via scrolling." The event emojis inside the
magnifier disc sit to the LEFT of the green caret / of the focal date, even
though the caret itself is correctly on the selector and the date box matches.

Committed as `bc5382d` (2026-09-12, feature commit) + this docs entry.

## Root cause (regression introduced by plan 033)

In `tlDrawLens` (src/main.ts) the per-element `dx` was rewritten in plan 033 to
convert the focal from track-space to bar-space (`xBar = x − 12`) for the
month ticks and the caret. Both of those use **bar-space** positions
(`frac·barW`), so subtracting `xBar` is correct for them.

But the **event emoji** position is stored as `b.x = frac·width` in
**TRACK-space** (width = barW + 24, plan 023). Plan 033 subtracted `xBar`
from it too, mixing the two coordinate systems → a constant **−12px** offset
in strip-space. At the 4× center zoom that is **−48px**: every event inside
the disc is drawn 48px left of where it should be, so events no longer line
up with the caret / the focal date.

## Fix

- `src/main.ts` `tlDrawLens` (events loop): revert the event dx to
  `const dx = b.x − x;` — subtract the **track-space** focal `x`, since
  `b.x` is track-space. Month ticks (`m.frac·barW`) and the caret
  (`caretFrac·barW`) keep using `xBar` (they are bar-space).
- `src/main.ts` `tlPaint`: corrected the comment on the `tlBarEvents` push —
  it stores a **track-space** x (`frac·width`), used by both the lens (with
  focal `x`) and the tooltip probe (with `focalBar`).

## Verification

Headless Chrome, new bundle `index-B2y1XYPr.js`:

- **DOM ground truth (2035, caret at 56.4%):** caret center == 56.4% of the
  bar; every `.tl-event` sits at exactly its `frac·barW`. Gap between the
  caret and the nearest (Venus–Jupiter) event = 16.3px = the 5-day delta ×
  1.1px/day — i.e. the DOM was always correct; the bug was only in the
  canvas drawing.
- **Canvas pixels, caret parked on the Venus–Jupiter event day
  (2035-05-17):** green caret bar spans disc x = 50..61 (center **55.5**,
  −0.5 from disc center 56); the event-emoji color centroid = **55.1**
  (−0.9 from center). Both at the disc center (within a pixel). Before the
  fix the emoji sat at ~48px (≈ 48px left of center at 4× zoom).
- Gates: tsc clean, 313/313 tests, eslint clean, prettier clean.
