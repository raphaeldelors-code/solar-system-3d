# 041 — Controls menu design rework

## Current state (what I see)

From the three state screenshots (default, events-expanded, Mars-picked) and the CSS:

1. **Flat wall of rows.** Every control is a `.row` with identical 6px vertical margins, identical 13px font, no group headers or dividers. The eye has no hierarchy — Speed slider, Pause, Sky, Events, Find, Scale, checkboxes, and Copy Link all read as one undifferentiated list.
2. **Inconsistent button styling.** `#pause`, `#reverse`, `#now` are bare `<button>` (default browser button look — grey, square-ish). The anchor buttons (🌌 Sky / 🪐 System) have no explicit class. The Events toggle is a `<button>` next to a `<select>`. The `#share` and `#screenshot` buttons are full-width `<button>` with no visual weight. There is no primary/secondary distinction — everything looks the same.
3. **No spacing scale.** `padding: 12px 14px` on `#panel`, `margin: 6px 0` on `.row`, `gap: 8px` — ad-hoc, no 4px base grid.
4. **Underused accent.** The blue accent (`#6ea8ff` / `var(--accent)`) appears only in the speed value, a few focus rings, and the scale-switch active state. It's barely present.
5. **No elevation.** The panel has `backdrop-filter: blur(6px)` and a 1px border but no `box-shadow`. It floats at the same depth as the canvas background — no "card" feel.
6. **Typography is flat.** 13px `system-ui` throughout. Labels, values, buttons, and the header all share the same size and weight. No type scale.
7. **Info card (body-picked state)** blends in: the `.info` block uses the same row styling as everything else, so the picked-body data (name, period, distance) doesn't stand out as a distinct "detail card."

## Design decisions

### 1. Hierarchy — logical groups with subtle dividers

The panel body gets split into **4 visual groups** separated by a 1px divider line (`rgba(120,150,200,0.18)`) and 12px spacing. No new DOM elements are added — we use CSS `border-top` on specific `.row` selectors to create the dividers:

- **Group A — Time**: rows 1–4 (Date display, Speed slider, Date-pick, Pause/Reverse/Now)
- **Group B — Navigate**: rows 5–7 (Sky/System anchors, Events toggle + range, Find search)
- **Group C — Display**: rows 8–9 (Scale switch, checkbox row)
- **Group D — Actions**: rows 10–11 (Copy share link, Save screenshot)
- **Group E — Info**: the `#info` card (only visible when a body is picked)

Dividers are added via `.row:nth-child()` targeting on the first row of each group (except Group A, which is first). This avoids any DOM change.

### 2. Button system — three tiers

| Tier                                                         | Selectors                                                    | Style                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Primary** (time actions)                                   | `#pause`, `#reverse`, `#now`                                 | Height 30px, padding `0 14px`, `border-radius: 6px`, bg `rgba(110,168,255,0.12)`, border `1px solid rgba(110,168,255,0.35)`, color `#a8d4ff`, font 12.5px/600. Hover: bg `rgba(110,168,255,0.22)`, border `rgba(110,168,255,0.55)`. Active: bg `rgba(110,168,255,0.30)`. |
| **Secondary** (anchors + events toggle + share + screenshot) | `#anchors button`, `#events-toggle`, `#share`, `#screenshot` | Height 28px, padding `0 10px`, `border-radius: 6px`, bg `rgba(120,150,200,0.08)`, border `1px solid rgba(120,150,200,0.25)`, color `#cfd8e3`, font 12px. Hover: bg `rgba(120,150,200,0.16)`, border `rgba(120,150,200,0.40)`.                                            |
| **Segmented** (scale switch)                                 | `#scale-visible`, `#scale-real`                              | Unchanged (already styled with `.seg` class).                                                                                                                                                                                                                            |

All buttons get `transition: background 120ms ease, border-color 120ms ease, color 120ms ease`. Focus-visible: `outline: 2px solid #6ea8ff; outline-offset: 1px`.

### 3. Typography scale

| Element                        | Font                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| Panel header (`#panel h1`)     | 12px, 700, `letter-spacing: 0.08em`, uppercase, color `#8fb4e8` (existing, kept) |
| Row labels (`#panel label`)    | 11px, 500, `letter-spacing: 0.04em`, uppercase, color `#8a9ab5`                  |
| Row values (`#panel .value`)   | 12px, 600, `font-variant-numeric: tabular-nums`, color `#e8f0ff`                 |
| Buttons                        | 12px, 500 (primary: 12.5px/600)                                                  |
| Info card title (`#info-name`) | 14px, 700, color `#eaf2ff`                                                       |
| Info card rows                 | 11.5px, 400, labels `#8a9ab5`, values `#cfd8e3` 600                              |

### 4. Color — deepen the accent presence

- Keep `--accent: #6ea8ff`.
- Add `--accent-soft: rgba(110,168,255,0.12)` for primary button bg and the info-card left border.
- The info card gets a 2px left border in `var(--accent)` (matching `#scale-caption` pattern).
- The active scale-segment already uses the accent — keep.
- Checkbox accent-color: `#6ea8ff` (explicit, so it's consistent across browsers).

### 5. Spacing — 4px base grid

- `#panel` padding: `14px 16px` (was 12px 14px)
- `.row` margin: `8px 0` (was 6px 0)
- `.row` gap: `8px` (unchanged)
- Group divider: `border-top: 1px solid rgba(120,150,200,0.18); padding-top: 10px; margin-top: 12px;`
- Button row (Pause/Reverse/Now): `gap: 6px` (was 8px — tighter for 3 buttons)
- Info card: `margin-top: 8px; padding: 10px 12px; border-radius: 8px; background: rgba(110,168,255,0.06);`

### 6. Micro-details

- `#panel` gets `box-shadow: 0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2);` — subtle elevation without heaviness.
- `#panel` border-radius: `12px` (was 10px) — slightly softer.
- `#panel` border: `1px solid rgba(120,150,200,0.22)` (slightly more visible than 0.25 → actually reduce to 0.18 so the shadow does the lifting).
- All `button` elements inside `#panel`: `cursor: pointer; -webkit-tap-highlight-color: transparent;`
- `#panel .row label`: `flex: 0 0 52px;` (fixed label width so values align)
- Focus-visible on all interactive elements: `outline: 2px solid #6ea8ff; outline-offset: 1px;`

## Implementation (CSS changes)

All changes go in the `<style>` block of `index.html`. Selectors are specific enough to avoid breaking other UI.

### Panel container

```css
/* MODIFY: #panel — elevation + spacing */
#panel {
  /* existing: position, top, left, z-index, background, color,
     border, border-radius, font, backdrop-filter, min-width, user-select
     — keep all of those, change: */
  border: 1px solid rgba(120, 150, 200, 0.18);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.35),
    0 1px 4px rgba(0, 0, 0, 0.2);
}
```

### Group dividers (via nth-child on .row)

The `.panel-body` contains 11 `.row` elements + `#scale-caption` + `#info`. The rows in order:

1. Date display
2. Speed slider
3. Date-pick
4. Pause/Reverse/Now
5. Sky/System anchors
6. Events toggle + range
7. Events list (hidden by default)
8. Find search
9. Scale switch
10. Checkbox row
11. Copy share link
12. Save screenshot

We add dividers before rows 5 (Navigate), 9 (Display), and 11 (Actions):

```css
/* ADD: group dividers — border-top on first row of each group */
#panel .row:nth-child(5),
#panel .row:nth-child(9),
#panel .row:nth-child(11) {
  border-top: 1px solid rgba(120, 150, 200, 0.18);
  padding-top: 10px;
  margin-top: 12px;
}
```

Note: `#events-row` (row 7, hidden) and `#scale-caption` (between 9 and 10) shift the nth-child indices when visible. Since `#events-row` is `hidden` by default, it doesn't affect layout. `#scale-caption` is also `hidden` by default. So the nth-child targets are stable in the default state. When Events is expanded or a real-scale caption is shown, the dividers shift by one row — acceptable (the divider still separates logical groups).

### Row spacing

```css
/* MODIFY: #panel .row */
#panel .row {
  /* existing: display, align-items, gap, margin
     — change margin: */
  margin: 8px 0;
}
```

### Labels — uppercase, fixed width

```css
/* ADD: label styling */
#panel .row label {
  flex: 0 0 52px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #8a9ab5;
}
```

### Values — tabular nums, brighter

```css
/* MODIFY: #panel .value (if it exists) or ADD */
#panel .value {
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #e8f0ff;
}
```

### Primary buttons (Pause / Reverse / Now)

```css
/* ADD: primary button tier */
#pause,
#reverse,
#now {
  height: 30px;
  padding: 0 14px;
  border-radius: 6px;
  background: rgba(110, 168, 255, 0.12);
  border: 1px solid rgba(110, 168, 255, 0.35);
  color: #a8d4ff;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 120ms ease,
    border-color 120ms ease,
    color 120ms ease;
}
#pause:hover,
#reverse:hover,
#now:hover {
  background: rgba(110, 168, 255, 0.22);
  border-color: rgba(110, 168, 255, 0.55);
}
#pause:active,
#reverse:active,
#now:active {
  background: rgba(110, 168, 255, 0.3);
}
#pause:focus-visible,
#reverse:focus-visible,
#now:focus-visible {
  outline: 2px solid #6ea8ff;
  outline-offset: 1px;
}
```

### Secondary buttons (anchors, events toggle, share, screenshot)

```css
/* ADD: secondary button tier */
#anchors button,
#events-toggle,
#share,
#screenshot {
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  background: rgba(120, 150, 200, 0.08);
  border: 1px solid rgba(120, 150, 200, 0.25);
  color: #cfd8e3;
  font-size: 12px;
  cursor: pointer;
  transition:
    background 120ms ease,
    border-color 120ms ease;
}
#anchors button:hover,
#events-toggle:hover,
#share:hover,
#screenshot:hover {
  background: rgba(120, 150, 200, 0.16);
  border-color: rgba(120, 150, 200, 0.4);
}
#anchors button:focus-visible,
#events-toggle:focus-visible,
#share:focus-visible,
#screenshot:focus-visible {
  outline: 2px solid #6ea8ff;
  outline-offset: 1px;
}
```

### Button row gap (tighter for 3 buttons)

```css
/* MODIFY: the row containing pause/reverse/now */
#panel .row:has(#pause) {
  gap: 6px;
}
```

### Info card — distinct detail panel

```css
/* MODIFY: #panel .info */
#panel .info {
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(110, 168, 255, 0.06);
  border-left: 2px solid var(--accent);
}
#panel .info .info-title {
  font-size: 14px;
  font-weight: 700;
  color: #eaf2ff;
  margin-bottom: 4px;
}
#panel .info .info-row {
  font-size: 11.5px;
  margin: 2px 0;
}
#panel .info .info-row span:first-child {
  color: #8a9ab5;
  font-weight: 400;
}
#panel .info .info-row .value {
  color: #cfd8e3;
  font-weight: 600;
}
```

### Checkbox accent

```css
/* ADD: consistent checkbox accent */
#panel input[type='checkbox'] {
  accent-color: #6ea8ff;
}
```

### Universal focus-visible (catch-all)

```css
/* ADD: focus-visible on all interactive panel elements */
#panel button:focus-visible,
#panel input:focus-visible,
#panel select:focus-visible {
  outline: 2px solid #6ea8ff;
  outline-offset: 1px;
}
```

## Text label changes

None. All current labels are clear. The emoji buttons (🌌 Sky, 🪐 System, ✨ Events) are fine — the user explicitly prefers emojis over obscure glyphs.

## What I'm NOT changing

- **DOM structure**: no new elements, no reordering, no class additions to existing elements.
- **Element IDs**: all IDs unchanged.
- **Panel position**: still `top: calc(44px + safe-area-inset-top); left: calc(12px + safe-area-inset-left)`.
- **Panel width**: still `max-width: 360px` on desktop, full-width on phones <560px.
- **Input behavior**: speed slider, date inputs, Find search, checkboxes — no functional changes.
- **Top-right HUD (#hud-mini)** and **top timeline (#hud-timeline)**: untouched.
- **Collapsed state** (`#panel.collapsed`): the h1 toggle still works, body still hides.

## Verification

1. **Default state** (`?intro=0`): screenshot the panel. Check: 4 visible groups separated by dividers, primary buttons (Pause/Reverse/Now) have the blue-tinted look, secondary buttons (Sky/System/Events/Share/Screenshot) have the grey-tinted look, labels are uppercase small-caps, values are brighter/bolder, panel has subtle shadow.
2. **Events expanded** (`?intro=0&ev=1`): the events list appears within Group B, the dividers shift correctly.
3. **Body picked** (`?intro=0&f=mars`): the info card appears with a left accent border, distinct background, bold title.
4. **Phone** (375px viewport): panel is full-width, dividers and buttons still look right.
5. **Keyboard**: Tab through all buttons/inputs — focus ring is visible on every interactive element.
6. **Hover**: hover each button tier — background and border lighten smoothly.

---

## As-built note (2026-09-13, deviations from the plan above)

Executed against the live CSS; two choices diverged from the draft and the
final look was vision-verified on all three states (default / events-expanded
/ Mars-picked info card):

- **Dividers — `:has()` landmarks, not `nth-child`.** The draft's
  `.row:nth-child(5/9/11)` breaks when `#events-row` (hidden) or
  `#scale-caption` (hidden, a non-`.row` child) change visibility, shifting the
  child indices. Instead the dividers key off stable landmarks:
  `.row:has(#share)` (Actions), `:has(#scale-switch)` (Display), and
  `.row:has(> label):has(#find)` (Navigate). Robust across all states.
- **Button hierarchy — navigation is primary, time controls are neutral.** The
  draft made Pause/Reverse/Now the blue "primary" tier. In practice the most
  important actions are the view jumps (🌌 Sky / 🪐 System), so those became
  the accent primary tier (`background: rgba(110,168,255,0.15)`,
  `border-radius: 7px`, brighter text). The time controls
  (⏸ Reverse Now) stay as the neutral secondary tier, and
  **Copy share link / Save screenshot** became **ghost** buttons
  (`background: transparent`, dashed border) to sit at the end of the panel.
  This reads as a clearer "navigate / time / actions" hierarchy than the draft.
- **Info card — inset card, no left accent bar.** `#info` is an inset panel
  (tinted `rgba(110,168,255,0.05)` fill, `border-radius: 8px`, top divider)
  rather than a left-accent-bar block; verified it reads as a distinct card.
- **Touch targets** bumped to `min-height: 44px` in the `@media (pointer: coarse)`
  block (anchors `48px`) to meet the touch minimum.

Result (vision A/B): default state 5/10 → 7.5/10, no regressions; events
list integrates cleanly; info card reads as a distinct elevated inset.
