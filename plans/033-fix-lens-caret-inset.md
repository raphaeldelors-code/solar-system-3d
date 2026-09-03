# Plan 033 — Fix the in-lens caret (and all disc content) 12px inset offset

## Symptom

During a scrub the magnifier disc is correctly centered on the selector/caret
(Plan 032 fixed the disc _position_), but the **green caret line drawn INSIDE
the disc canvas** appears ~34px left of the disc center. The user says:
"the green cursor isn't on the right middle of the lens — it should be at the
center of our zooming lens."

## Root cause

`tlDrawLens(x)` receives `x` = focal in **track-space** (0..trackWidth, where
trackWidth = barWidth + 24). Inside, the content offsets are computed as:

```js
const dx = caretFrac * barW - x; // line 1951 (caret)
const dx = m.frac * barW - x; // line 1910 (month ticks)
const dx = b.x - x; // line 1936 (events)
```

But `caretFrac * barW`, `m.frac * barW`, and `b.x` are all in **bar-space**
(0..barWidth). Mixing bar-space positions with a track-space `x` produces an
offset of exactly **BAR_L = 12px** in strip-space. At the disc center the zoom
is ~4×, so the visible shift is 12 × lensZoomAt(12) ≈ 12 × 2.85 ≈ **34px**.

## Fix

In `tlDrawLens`, after computing `barW`, convert the focal to bar-space:

```ts
const xBar = x - BAR_L;
```

Then use `xBar` in all three `dx` calculations. This way bar-space content
positions are compared against a bar-space focal → the caret lands at dx=0
(exactly center) when the disc is on the caret.

## Verification (headless Chrome, DOM + pixel + vision) — PASS

- 3-finger scrub (frozen clock, settled):
  - DOM disc center 343.4 == DOM caret center 343.4 (gap 0).
  - Runtime math: `dx = 0` → intended canvas caret x = 56.00 = disc center.
  - Pixel scan: the opaque green caret bar spans canvas x=50..61, center 55.5
    ≈ 56 → **dead-center** (was ~34px left pre-fix at 4× zoom).
  - Chip "Oct 25" == pane "2026-10-25".
- Vision: green caret at the horizontal center of the disc; all three dates align.
- tsc + 313 tests + lint + prettier + build green; commit + push + deploy.

## Changes

- `src/main.ts` `tlDrawLens`: add `const xBar = x - BAR_L;` and replace `x`
  with `xBar` in the three `dx` computations (month ticks, events, caret).
- `src/main.ts` `tlTooltipAndLens`: probe `nearestEventX` with `focalBar =
focal - 12` (bar space) instead of the track-space `focal`, so the event
  tooltip picks the event at the same position as the magnified content.
