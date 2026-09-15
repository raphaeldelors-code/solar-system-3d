# Plan 043 — Control panel polish pass (post-041)

## Context

Plan 041 reworked the left panel from a flat wall of rows into a grouped,
elevated card (3-tier buttons, micro-labels, info card). A fresh UX review
(2026-09-15, live app + vision, all states) found it reads **functional, not
premium**, plus one real bug. This is a focused, low-risk **CSS-only** pass
(no behavior changes, no new logic) that closes the gap. Each feature is one
commit, gated (tests + tsc + lint + format + build), pushed (CI auto-deploys to
gh-pages), and A/B-screenshotted on default / Mars / events / phone.

## Findings (from the review)

1. **BUG — panel overflows the viewport when a body is picked.** Measured:
   Mars selected at 1280×800 → `#panel` is 828px tall in an 800px viewport; the
   bottom ~72px (hint + Stellarium credit) is clipped. `#panel` / `.panel-body`
   have no `max-height`/`overflow-y`.
2. **Two "Date" labels** — the readout row and the date-picker input both say
   "Date"; a scanner can't tell the clock from the jump control.
3. **Native form controls break the theme** (the main "cheap" tell): the
   `#events-range` `<select>` has **no** custom styling (pure OS default), and
   the checkboxes have no `accent-color` (only the range slider does). On many
   platforms the select/checkbox render light and pop out of the dark palette.
4. **Flat type scale** — header "SOLAR SYSTEM" is 13px, barely bigger than the
   12.5px values; the whole panel lives in an 11–15px band.
5. **No section headers** — only dividers; the eye infers the groups.
6. **Button-tier ambiguity** — the active Scale segment uses the _same_ fill as
   the Sky/System primary buttons, so "active" and "primary" look identical.
7. **Events list feels tacked on** — ~half-width (negative margins), the
   "Click an event…" note floats disconnected to its right, rows are low-contrast.

## Commits (one feature each, in order)

### F1 — `fix(ui): cap panel height so a picked body's info card never clips`

- Root cause: `#panel` is `position:fixed; top:44px` with no height cap; the
  info card grows the panel past the viewport.
- Change: `#panel { max-height: calc(100vh - 44px - 12px); }` and
  `#panel .panel-body { overflow-y: auto; }` (thin scrollbar). Keep the panel
  top-anchored (no bottom-anchoring — would move the whole card).
- Verify: Mars selected at 1280×800 → `#panel` bottom ≤ viewport bottom; the
  hint + credit are reachable by scrolling the body; default (no pick) state
  unchanged (panel < cap, no scrollbar).

### F2 — `style(ui): disambiguate the two Date labels (Now vs Jump to)`

- Rename the readout row label `Date` → `Now`; the picker row label `Date` →
  `Jump to`. (Text-only; the `#date` readout and `#date-pick` input keep their
  ids.)
- Verify: DOM text of the two `.row-label` spans; vision default state.

### F3 — `style(ui): theme the native form controls (select + checkboxes)`

- `#events-range` (the ±5 yr `<select>`): dark fill `#1a2334`, `#33415e`
  border, 6px radius, `color-scheme: dark`, accent focus ring — matching
  `#date-pick`.
- Checkboxes (`#orbits/#labels/#belts/#figures`): `accent-color: #6ea8ff`
  (same as the range slider) so the checked fill matches the panel accent.
- Verify: vision default + events states; no light-glyph regression.

### F4 — `style(ui): section headers + a real title type scale`

- Add three explicit section-header elements in the HTML (robust, no `:has()`
  fragility): `Time` (before the Date readout row), `View` (before the
  Sky/System anchors row), `Display` (before the Scale row). Style: 10px,
  600, uppercase, letter-spacing 0.12em, `--text-dim`, top margin.
- Title scale: `#panel-title` 13px → 15px, weight 700, letter-spacing 0.14em
  (was 0.1em) so it reads as a title.
- Verify: vision default state; the three headers sit above their groups; no
  layout shift that breaks the `:has()` dividers.

### F5 — `style(ui): disambiguate button tiers + full-width events list`

- **Scale active ≠ primary:** `#scale-switch button.active` gets a lighter
  treatment (accent border + `rgba(110,168,255,0.16)` fill + accent text)
  instead of the full primary fill, so it no longer reads as a primary button.
  Sky/System keep the loud primary fill.
- **Events on-state:** `#events-toggle.active` already toggles in JS; give it a
  clear on-state (accent border + tinted fill) so "open" is obvious.
- **Events list full-width:** `#events-list` margins `4px -8px 0` → `6px 0 0`,
  padding `0 4px` → `0 6px`; move the "Click an event…" note from a floating
  sibling into the list as a footer (`.ev-note` already styled); bump row
  contrast (`.ev-date`/`.ev-what` brighter, row padding 3px→4px).
- Verify: vision events state (list full-width, note inside, active Events
  button); default state (Scale active no longer looks primary).

## Gates (per feature)

`npm test` (388) + `npm run typecheck` + `npm run lint` + `npm run format:check`

- `npm run build`. Format check LAST (Prettier may reformat the plan/todo md).

## Deploy

CI (`.github/workflows/ci.yml`, peaceiris) auto-deploys `dist/` to gh-pages on
`main` push — **`git push origin main` IS the deploy.** Verify live: poll
`curl -sL https://raphaeldelors-code.github.io/solar-system-3d/` until the
served bytes match the local `dist/index.html`, and grep for a NEW marker per
feature (e.g. `max-height: calc(100vh`, `Jump to`, `accent-color` on the
checkbox rule, the section-header text, the new scale-active fill).

## A/B screenshots (per feature, headless Chrome)

default / Mars-picked / events-expanded / phone (390×844). Before = current
live; after = the feature commit's build.

## Approval gate

The user asked to "implement the fix." After F1–F3 (the bug + the two biggest
visual wins) present the A/B and pause for a design verdict before F4–F5, per
the per-feature-commit-discipline approval gate.
