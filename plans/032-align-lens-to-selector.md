# Plan 032 — Align the lens to the selector (the "you-are-here" caret)

## The bug

During a scrub the magnifier disc and the **selector** (the green "you-are-here"
caret) disagree about where the selected date is:

- **Disc center** = the **pointer/finger** (`focal = lensClampX(x, width)`).
- **Selector (green caret)** = the **clock** (`caretFrac` from `clock.t`).

The user calls the caret _the selector_ — it marks the selected date and equals
the top-right `#hud-date` box. But the disc follows the finger, while the caret
moves at a different offset and jumps across the bar when the year changes — so
the glass lands **~290px away from the actual selected date** (measured live:
finger at 608, caret at 898, gap 290px). That's the "lens not aligned with the
actual target" the user sees.

## The fix

**While a scrub is live, center the disc on the caret (the selector), not the
pointer.** Then:

- the disc's magnified center = the caret = the top-right box = the focal-date
  chip (all four the same date);
- the green caret sits at the disc center (the thing you're selecting);
- the disc still tracks the finger closely (clock ≈ finger · 1:1 + press offset,
  so it stays near the finger and moves with it);
- when the year changes the disc follows the caret's jump (staying on the
  selector), instead of lagging behind at the finger.

Plain hover (no scrub) keeps the disc on the pointer (inspection — unchanged).

## Changes

- [x] New helper `tlCaretX()` — the caret's center x in track space:
      `12 (bar inset) + caretFrac · (width − 24)`, where `caretFrac` is from
      `clock.t` via `timelineLayout`.
- [x] `tlTooltipAndLens(clientX)`: the focal point is `tlCaretX()` while a scrub
      is live (`scrub?.movedX || threeFinger?.live`), else the pointer (hover). The
      disc, the in-lens caret, the focal-date chip, and the nearest-event tooltip
      all derive from this focal — so they line up on the selector.
- [x] `tlScrubLens(centroidX)` → `tlScrubLens()` — takes no x; computes the focal
      from the caret internally.
- [x] 3-finger move handler: call `tlScrubLens()` (no centroid arg).

## Verification (headless Chrome, DOM + vision) — PASS

- **3-finger scrub (frozen clock, settled):** disc center 1072.5 == caret center
  1072.5 → **gap 0px** (was ~290px pre-fix). Chip "Nov 5" == pane "2026-11-05".
- **Hover (no scrub):** disc center 512 == pointer 512 → gap 0px; chip inspects
  the day under the cursor (May 27) — unchanged.
- **Vision:** top-right box `2026-11-05 09:20`; focal chip `2026-11-05`; lens
  disc centered on the green caret (caret through disc center). All three dates
  align.
- tsc + 313 tests + lint + prettier + build green; commit + push + deploy.
