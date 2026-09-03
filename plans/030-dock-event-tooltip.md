# Plan 030 — Dock the event tooltip under the date/speed pane

## Problem

The nearest-event tooltip (`#hud-tl-tip`) is a child of
`#hud-timeline-track` and tracks the hovered event by `left` near the
cursor — right where the plan-029 circular magnifier glass (Ø 112,
centered on the pointer) also lives. So the tooltip text is sometimes
hidden **under the lens** and unreadable.

## Goal (user's words)

> "the event text indicator is sometimes under the lens — can we move
> the event indicator to **top right under the existing date/speed
> pane**?"

Dock the tooltip to the **top-right**, immediately **below `#hud-mini`**
(the always-visible date/speed pane), so it can never be occluded by the
lens. It still shows the nearest event's date + emoji + title, updating
as the cursor / 3-finger centroid moves.

## Design decisions

- **Move the element** out of `#hud-timeline-track` to a viewport-level
  sibling right after `#hud-mini`. Rationale: an ancestor `transform`
  (e.g. `#hud-mini`'s `.scrubbing` pulse `scale(1.03)`) would make that
  ancestor the containing block for `position: fixed` — keeping the tip
  out of any transformed subtree avoids that coupling.
- **`position: fixed`**, right-anchored: drop the old
  `transform: translateX(-50%)` + per-event `left` (those centered it on
  the event, which is exactly what put it under the lens). The tip is
  now a stable right-edge-anchored chip.
- **Vertical position** is measured per-frame from
  `#hud-mini`.getBoundingClientRect().bottom → `top = bottom + 6px`.
  This auto-handles `env(safe-area-inset-top)`, the desktop top (44px)
  vs phone top (112px), and the pane's height — no hard-coded tops.
- **Horizontal** anchored to the pane's right edge: `left =
paneRect.right − tipWidth`, with a 12px right margin and a
  `min(72vw, 300px)` width cap + `text-overflow: ellipsis` so a long
  event title never overflows off-screen.
- **Hiding** is unchanged: it's pure class-toggle (`tlHideTip` removes
  `.show`), with no dependence on the element's former parent being the
  track. `clearScrubHud` / the pointerleave handler already call
  `tlHideTip`.
- The lens, focal-date chip, and 3-finger scrub are all untouched.

## Features

- [x] F1 `fix(hud): dock the nearest-event tooltip under the date/speed pane` — move `#hud-tl-tip` to a top-right fixed chip below `#hud-mini`; right-anchored, width-capped, per-frame vertical position from the pane's measured bottom. Live-verified: tip at top-right (top 77, below pane bottom 71), clears the Ø112 lens (77 > 66), right-anchored to the pane; hover + 3-finger scrub both show it; mouse-leave + 3-finger lift hide it.
- [x] `docs:` record hash in todo.md + this plan

## Verification

- 313/313 tests + tsc + lint + prettier + build green.
- Live headless: hover the timeline over a cluster → tooltip appears at
  top-right **below** `#hud-mini`, never overlapping the Ø112 lens
  (assert tip top > lens bottom and tip is at the right edge). 3-finger
  scrub shows the same docked tip; mouse-leave / lift hide it.
- Confirm the tip is NOT a descendant of any transformed ancestor
  (assert `offsetParent` is the body / no ancestor transform).
