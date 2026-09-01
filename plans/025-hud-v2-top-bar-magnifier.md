# 025 — hud v2: minimal date+speed pane with live magnify, top event bar

User feedback on the shipped plan-024 HUD (2026-08-31, three rounds):

1. **"buttons for ±1/±5 years are not working"** — the buttons were DEAD:
   `#hud-mini` is `pointer-events:none` (click-through by design) and
   `#hud-yearjump` never re-enabled them, so the browser hit-tested straight
   through to the canvas. Fixed: `pointer-events:auto` on `#hud-yearjump`.
   Live-verified with REAL CDP input-pipeline clicks (elementFromPoint +
   `Input.dispatchMouseEvent`, not `el.click()` which bypasses hit-testing):
   6/6 PASS → committed `1696ba9`.

2. **"the top right date panel should now only show date and current
   selected speed that's it ... the 2 numbers on top (speed + delta) are
   meaningless ... only keep current date and current speed"** — FINAL shape
   of `#hud-mini` after two rounds: **date + speed ONLY**. This deletes, in
   addition to the already-deleted sub-line and gauge, the year-jump button
   row (round 3: "only keep current date and current speed" — the row goes).
   Note: whole-year hopping then has no dedicated control — the user did not
   ask for it to move elsewhere, so it is dropped, not relocated.
   (`addYearsUtc` stays in `scrubMath.ts` + tests as a pure helper.)

3. **"when date or speed is moving emphasize with a magnifying effect on the
   NUMBER being changed (date and/or speed), not only on the pane"** —
   per-value magnify: the FIRST axis to cross the dead zone owns the
   emphasis for the rest of the gesture (horizontal drag → date, vertical →
   speed). `#hud-date.hot-date` / `#hud-speed.hot-speed` scale ~1.6x with a
   soft accent glow + gentle pulse, via `transform: scale` (layout box
   untouched → no reflow jitter; `transform-origin` left/right keeps each
   value anchored to its side). Release clears both classes.

4. **"the bottom bar should be finally placed top, still full width above
   the date small panel which will be top right underneath"** — `#hud-timeline`
   moves from `bottom:0` to `top:0`; `#hud-mini` drops BELOW it (bar first,
   panel underneath at top-right). Still full width.

5. **"there should be month separation on the x axis with month names
   written at 45°"** — 11 month separators (Jan 1 … Dec 1) + labels
   `Jan…Dec` rotated -45°.

6. **"a short text for the event as we scroll on it (maybe under the bar)"**
   — hover tooltip: nearest event within a small px radius → one-line
   `MMM D · emoji Title` chip below the bar, tracking the cursor, in the
   space LEFT of the date panel.

7. **"a rolling magnifying glass effect moving around the cursor ... showing
   the date number too"** — a magnifier bubble (DOM lens overlay) follows
   the pointer along the bar and renders a LOCAL re-render of the events at
   ~8× horizontal zoom with per-event labels + a date readout at the lens
   center — packed events become distinguishable.

## Commits (one per feature, gates green before each)

- **F1** ✅ `1696ba9` — `fix(hud): year-jump buttons dead — pointer-events`
  (live check `/opt/data/audit/p025_f1_live_check.py`, 6/6)
- **F2** ✅ `a388f35` — `feat(hud): minimal date+speed pane (no sub-line, no
  gauge, no buttons) + per-value magnify emphasis while scrubbing`
  (follow-up fix `7e05c7d`: magnify grows OUTWARD so date + speed never
  overlap)
- **F3** ✅ `b0c03f4` — `feat(hud): calm top timeline strip with centered
  year + scrub tooltip`. FINAL shape (user revision 2026-09-01 — an earlier
  v1 with the bar appearing only while scrubbing was rejected): the strip is
  PERMANENT and calm — a 20 px-tall top bar (5 px line, 12 month ticks with
  45° labels, current year centered on the line, updated per-frame from the
  sim clock). The green fill, caret, event markers and hover tooltip are
  SCRUB-ONLY: they appear while scrubbing and die on release. `#panel` /
  `#hud-mini` sit at `top: 44px`, clear of the 45° labels.
- **F4** ✅ `f2db440` — `feat(hud): rolling magnifier lens over the top strip
  while scrubbing`. A 220×96 rounded window (`LENS_W`×`LENS_H`) follows the
  mouse along the strip during a scrub and re-renders the LOCAL events at
  8× zoom (`LENS_ZOOM`) with per-event emoji + labels plus a lens-center date
  chip. Pure `lensMap()` + `LENS_*` constants in `scrubMath.ts` (unit-tested);
  the window is a CHILD OF `#hud-timeline-track` so its `left` is
  track-relative and the center sits exactly on the pointer (inside the bar
  it would be off by the bar's 12 px side inset). Clamps and the event cull
  use `LENS_W` (the window width — a width/height mix-up here blanked the
  right half). Scrub-only, like the tooltip.
- **docs** — this commit: record plan 025 hashes, refresh AGENTS.md + todo.md.

## Constants (final, shipped)

- `HUD_MAG_SCALE = 1.6`, pulse 1.55↔1.7 @ 1.1 s, `transform-origin: left`
  (date) / `right` (speed).
- Bar (F3, final v2): a PERMANENT calm 20 px top strip — 5 px line, 12 ticks
  (Jan 1…Dec 1, the redundant 13th tick dropped), 45° month labels, year
  centered on the line. Fill/caret/events/tooltip/lens: scrub-only.
  `#panel` / `#hud-mini` at `top: 44px`.
- Month labels: `transform: rotate(-45deg)`, `transform-origin: top left`.
- Tooltip radius: 24 px. Lens (F4): `LENS_W = 220`, `LENS_H = 96`,
  `LENS_ZOOM = 8` (scrubMath.ts); window hangs below the strip
  (`top: 22px`), child of `#hud-timeline-track` (track-relative `left`);
  date readout = lens-center day (UTC, `MMM D`).

## Notes / env lessons (this session)

- SwiftShader GPU process DIES minutes into a session
  (`kFatalFailure: AllocateRingBuffer` in chrome9222.log), wedging tabs at
  `readyState:loading` or crashing them mid-check (`Inspector.targetCrashed`).
  Recovery: `bash /opt/data/audit/relaunch_chrome_fresh.sh` (kills
  headless-shell, wipes `chrome9222_fresh` profile, relaunches :9222).
  Harness rule: ONE fresh tab per attempt (re-navigating an existing tab
  wedges it), open the tab directly at the app URL, treat CDP crash events
  as noise, retry the whole check up to 3×.
- CDP `Runtime.evaluate` returns an `exceptionDetails` frame for thrown
  JS — a naive `result.result.value` read silently yields nothing; the
  F2 harness surfaces the exception text.
- A page-level SW-registration stub injected via `addScriptToEvaluateOnNewDocument`
  made the app module never execute in this build — do NOT block the SW;
  a fresh profile is the reliable reset instead.
