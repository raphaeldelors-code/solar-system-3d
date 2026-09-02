# Plan 028 — 3-finger scrub: show the event markers + rolling lens (touch)

## User report (2026-09-02, phone)

> "Using my phone I can't see the event panel and the zoom lens around the
> cursor — when scrolling with 3 fingers."

## Root cause (confirmed in code + live headless repro)

The rolling magnifier lens (`#hud-tl-lens`) and the nearest-event tooltip
(`#hud-tl-tip`) are driven **only** by the window `pointermove` handler in
`src/main.ts`, which begins:

```ts
if (e.pointerType !== 'mouse') return;
```

So on a touch device:

1. The 3-finger scrub **does** move the clock and **does** paint the year's
   event markers + green fill + caret (verified live: `.visible` on, 18
   `.tl-event` markers, fill 86%).
2. But `tlTooltipAndLens(x)` is **never called** with touch — the lens and
   tooltip can never appear. There is no "hover" on a phone, and the
   centroid-driven scrub path (`canvas pointermove`, the 3-finger handler)
   never drives the lens.

The events layer itself shows fine; what the user is missing is the **lens**
(the whole point of the "packed events" ask) and the event tooltip.

## Layout note (verified at 390×844 phone metrics)

- `#hud-timeline` z-index **15**; `#panel` z-index **10** → the lens renders
  **above** the control panel, no overlap problem.
- On phones the panel defaults to `.collapsed` (inline script in index.html),
  so the lens has a clear field anyway.
- Lens width 220 px on a 390 px track: it clamps near center — acceptable
  (the window still follows the centroid for the middle ~44% of the track,
  and the date chip + events are correct wherever it sits).

## Design

**One feature, one commit:** during a live 3-finger scrub, drive the rolling
lens + tooltip from the **centroid** x (the "cursor" of the gesture). The
lens shows the 8× magnified local events around that point — exactly the
"rolling magnifying glass around the cursor" the user asked for, now for the
touch gesture. The lens + tooltip appear on the first committed move (same
moment `tlShow()` fires) and die with the scrub layer on release
(`clearScrubHud` already calls `tlHideTip/tlHideLens`).

- New small helper `tlScrubLens(clientX: number)` in `src/main.ts`:
  - no-op unless `tlActiveYear !== null` (i.e. a scrub/year is active)
  - paints the year if needed (`tlRefresh()`, idempotent + cache-aware)
  - ensures the scrub layer is shown (`tlShow()`)
  - delegates to the existing `tlTooltipAndLens(clientX)` (tooltip + lens)
- 3-finger `pointermove` handler: call `tlScrubLens(avgX)` inside the
  `if (s.movedX || s.movedY)` block (only on committed moves, same cadence
  as `tlShow`/`tlRefresh`).
- **Mouse is unchanged**: the window mouse handler keeps owning hover; the
  right-drag mouse scrub still shows fill + caret only (desktop design from
  plans 025/027). No desktop behaviour changes.
- No CSS changes (the `.show`/`.hover`/`.visible` machinery already exists
  and is correct).

## Test plan

- **Unit (new, `tests/lensScrub.test.ts`):** none of the new logic is pure
  (it's DOM glue), so instead assert the invariant that matters for phone
  clamp math via the existing pure `lensMap`/`LENS_W` coverage — i.e. no new
  unit test if nothing is extractable; prefer live verification. (Decision:
  the helper is thin DOM glue; live check is the real proof.)
- **Live (headless Chrome, 390×844 phone emulation):**
  1. 3-finger touch pointerdown×3 + centroid move > 6 px → assert:
     `.visible` on, `.tl-event` markers > 0 (after the rAF sweep),
     `#hud-tl-lens.show` on, lens `display:block`, lens date chip non-empty,
     lens center ≈ centroid (sub-px), tooltip may be shown if an event is
     within 24 px.
  2. Move centroid to a different x → lens `left` follows (monotonic with
     the move, clamped to `[LENS_W/2, width−LENS_W/2]`).
  3. Release all 3 fingers → lens off, tooltip off, `.visible` off, markers
     cleared, clock resumes.
  4. Regression: mouse hover on a 1280×800 desktop viewport still shows the
     lens; right-drag mouse scrub still shows fill + caret without the lens.
- **Gates:** `npm test`, `npm run build` (tsc), `npm run lint`,
  `npm run format:check`, all green.

## Commits

- [x] F1 `feat(hud): 3-finger scrub drives the rolling lens + event tooltip (phone)` — `419edfc`
- [x] `docs:` record hash in todo.md + this plan
