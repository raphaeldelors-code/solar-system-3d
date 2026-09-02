# 027 — hover the events axis: rolling lens + events + tooltip on mouse-over

User report (2026-09-02, after plan 026): **"there is no rolling magnifier
lens and we can't see events as we scroll as asked."**

## Root cause

Plan 025 F3/F4 shipped the lens, tooltip, and event markers as **scrub-only**:
they appear only while a **right-drag** scrub is live (gated on
`#hud-timeline.visible`) and die on release. The user's original ask was
_"as we **scroll** on the events axis … a rolling magnifying glass moving
around the cursor"_ — i.e. a plain **mouse-over** of the top strip. A hover
shows nothing, so the feature is invisible in normal use. (The scrub path
itself works — verified live — but it requires a right-drag the user isn't
doing / doesn't know about.)

## Fix (one feature)

Make the **lens + tooltip + event markers** follow the cursor on **hover**
(pointer over the strip's vertical band, no button pressed), independent of a
scrub. The **green fill + caret** (the "you are here" progress) stay
**scrub-only** — they're the progress indicator, not part of the "see events"
ask, and keeping them out of the hover state preserves the calm strip.

### Behaviour

- **Hover** (mouse in the strip band, no button): the current year's event
  markers appear on the line, the rolling lens follows the cursor (8× zoom +
  date readout), and the tooltip shows when the cursor is near an event.
- **Scrub** (right-drag): everything above **plus** the green fill + caret.
- Leaving the band hides the lens + tooltip (events stay painted but the
  layer hides; re-hover re-shows it).

### Implementation

- **CSS** (`index.html`): `#hud-timeline-scrub` (holds events + fill + caret)
  shows on `.hover` **or** `.visible`. Fill + caret get `visibility:hidden`
  by default and `visibility:visible` only under `.visible` — so hover shows
  the events but not the progress fill.
- **JS** (`main.ts`): the existing `pointermove` tooltip/lens handler (which
  gated on `.visible`) is reworked to (a) call `tlRefresh()` so the current
  year's events are painted on hover, (b) add/remove the `.hover` class as the
  pointer enters/leaves the band, and (c) drive the lens + tooltip by pointer
  position. `tlRefresh()` is already idempotent + cache-aware, so a hover is
  cheap after the first paint of a year. The scrub `pointermove` handler is
  untouched.

## Gates

tests + tsc + lint + prettier + build, then a **live headless check**: hover
the strip (no button) → lens appears + follows the cursor + shows the date,
event markers appear, tooltip appears near an event; leave the band → lens +
tooltip hide; right-drag scrub → fill + caret also appear.

## Commits (one per feature, gates green before each)

- **F1** ✅ `98cffc2` — `feat(hud): rolling lens + events + tooltip on hover
(not just scrub)`. Live-verified in headless Chrome: hover shows the lens
  (date readout follows the cursor) + 21 event markers + tooltip near an
  event; leaving the band hides lens/tooltip; right-drag scrub shows fill +
  caret; release hides them. 307/307 tests + tsc + lint + prettier + build
  green.
- **docs** — this commit: record F1 hash in todo.md + this plan.
