# Plan 024 — Scrub v3: full-year linear scrub, bottom event bar, year-jump buttons

**User asks (2026-08-30, verbatim intent):**

1. Forget coupling the drag to the playback speed. Left/right drag speed must be
   CONSISTENT regardless of the speed set; its full range must scroll over the
   CURRENT YEAR. (User correction: "left or right", not "upward/backward".)
2. The "zero" must not reset to the landing date — the bounds must always be the
   CURRENT YEAR (Jan 1 → Dec 31).
3. The event bar is too small inside the mini strip (events clogged together).
   Move it to a FULL-WIDTH bar at the BOTTOM (YouTube progress-bar inspiration),
   appearing/disappearing while scrubbing, events positioned like video chapters.
   Greek letters are meaningless — use EMOJIS representing the solar body.
4. Since left/right scrubbing now stays within the year, add quick ±1 / ±5 year
   jump buttons next to the speed/date mini pane (on top of the scrubbing
   functionality) to hop through years fast.

**Supersedes (in part):** plan 023 F1's speed-proportional span
(`spanDays = min(10000, speed×3600)` + `x²/(1+x²)` easing) — the user explicitly
dropped the speed coupling and the center easing ("speed of the drag ... should
be consistent" = linear). Plan 023 F2's mini-strip timeline is relocated (F2
below); the `.scrubbing` emphasis + sub-line stay. The old
`/opt/data/audit/p023_f1_live_check.py` asserts the OLD model — superseded by
`p024_f1_live_check.py`; do not "fix" it back.

## Commit list (one feature per commit, in order)

### F1 — `feat(scrub): linear full-year scrub clamped to the current year`

**Pure layer (`src/render/scrubMath.ts`):**

- New constant `SCRUB_DAYS_PER_PX = 1` — 1 px of horizontal drag = 1 sim day,
  at every playback speed. A 365-px drag sweeps a full (non-leap) year:
  "full range = full scroll over the current year".
- New `yearSpanDays(year): { span0Days, spanLenDays }` — pure date math
  (Jan 1 00:00 UTC of `year` in days since J2000 + 365/366). `yearEvents.ts`
  `yearSpan` delegates to it (single source of truth; no logic duplicated).
- New `scrubClampToYear(startDays, span0Days, spanLenDays, deltaPx): number` —
  `clamp(startDays + deltaPx * SCRUB_DAYS_PER_PX, span0Days,
span0Days + spanLenDays - 1e-6)`. Right = future.
- REMOVE (old plan-023-F1 model): `SCRUB_SPAN_PX`, `SCRUB_SPAN_SIM_SECONDS`,
  `SCRUB_CLAMP_DAYS`, `scrubSpanDays()`, `scrubXToT()`.
- KEEP: `SCRUB_SPEED_LOG_PER_PY`, `SPEED_LOG_MIN/MAX`, `scrubSpeedLog()`
  (vertical axis unchanged), `formatScrubDelta()`, `timelineLayout()`.

**`main.ts`:**

- `ScrubState` gains `span0Days`, `spanLenDays` — captured at pointerdown from
  the PRESS epoch's calendar year (`tlCurrentYear()`-style math). The gesture
  can never cross out of that year (user point 2: bounds = the year, zero =
  Jan 1, not the press epoch).
- `applyScrubMove` X path: `clock.setDate(new Date(J2000_UTC +
scrubClampToYear(s.startDays, s.span0Days, s.spanLenDays, dx) * 86_400_000))`.
- **Gauge becomes a YEAR-POSITION gauge** (consequence of point 2): the center
  notch (press epoch) is deleted; the track is Jan 1 → Dec 31 of the press
  year, knob at `(t - span0)/spanLen · 100%`, fill from 0 → knob. Markup: drop
  `#hud-gauge-notch`. `writeScrubHud` uses the press year's span (stored in
  `ScrubState`), not `startLog`.
- Sub-line unchanged (`+2.6 yrs · 1.0 d/s` style, via `formatScrubDelta`).
- 3-finger path: same `applyScrubMove` — inherits the model for free.

**Tests (`tests/scrubMath.test.ts`):** rewrite the F1 block — linearity
(100 px → exactly +100 d), speed-independence (the pure fn takes no speed),
year clamping at both edges (press Dec 30 2029, +3000 px → pinned at Dec 31
23:59:59.999; press Jan 2, −3000 px → Jan 1 00:00), leap year 366 d, and
`yearSpanDays` against known dates (2000 leap = 366, span0 for 2000 = −0.5 d
relative to J2000 noon).

**Live check `/opt/data/audit/p024_f1_live_check.py`** (clone the p023 F2
harness): 10-12 assertions — (a) 300 px right @ 0.01 d/s and @ 100 d/s give the
SAME +300 d (speed independence, exact via `__solar.clock`); (b) clamp right at
year end, clamp left at Jan 1 (knob = 100%/0%, `clock.t` pinned); (c) gauge
knob fraction = day-of-year of `clock.t` (not Δ-from-press); (d) vertical drag
still moves the slider (log), release resumes at current speed; (e) sub-6 px
no-op; (f) paused/reversed restore.

### F2 — `feat(hud): full-width bottom event bar with body emojis (video-chapter style)`

**Markup/CSS (`index.html`):**

- DELETE the in-strip `#hud-timeline` (inside `#hud-mini`) and all its CSS.
- NEW `#event-bar`: `position: fixed; left: 0; right: 0; bottom:
calc(8px + env(safe-area-inset-bottom)); z-index: 20; pointer-events: none;`
  track line + month ticks (13) + emoji markers + "you are here" caret + year
  label at the left + `+N` overflow chip at the right. Hidden by default
  (opacity 0, `visibility: hidden`), shown while a scrub is active (`.active`
  class, 150 ms fade) — "appear / disappear when scrolling through it".
  Full width so the ~20 events of a busy year spread across ~viewport width
  (the clogging was the user's complaint about the 180 px strip).
- Phone: same full-width bar (it's full-width on desktop too); no width media
  query needed.

**`main.ts`:** repurpose the `tl*` painters onto `#event-bar`:

- Because F1 clamps the gesture to the press year, the bar shows ONE year per
  gesture — built once at the first committed X move (sweep deferred to rAF as
  before, cached per year in `yearEvents`), caret glued to `clock.t` each
  frame, hidden by `clearScrubHud()` on every release path. The
  `tlActiveYear`/rebuild-on-year-crossing machinery simplifies: at most one
  year per gesture.
  **Emojis (`src/render/scrubMath.ts`):**
- Replace `BODY_SYMBOL` (astrological Greek) with `BODY_EMOJI`:
  sun 🌞, mercury ⚫, venus ⚪, earth 🌍, mars 🔴, jupiter 🟠, saturn 🪐,
  uranus 🩵, neptune 🔵, moon 🌙, pluto 🪨. (Flag for user tuning — this is the
  "emojis representing the solar body concerned".)
- `EVENT_EMOJI`: keep 🌑 solar eclipse / 🌕 lunar eclipse (semantically
  accurate — new/full moon), `saturn-edge-on` → 🪐.
- `eventEmoji()`: same structure (fixed → body emoji → pair for conjunctions),
  now emitting the emoji map; fallback 🪐→'✦' for unknown types, '●' for
  unknown bodies.

**Tests:** `tests/timelineLayout.test.ts` emoji expectations updated to the new
map (conjunction = two emojis, e.g. "⚫⚪"); `tests/yearEvents.test.ts`
unaffected (it doesn't assert glyphs).

**Live check `/opt/data/audit/p024_f2_live_check.py`:** bar hidden idle; after
a scrub past the dead zone the bar's bbox width ≈ viewport width (full-width
claim, measured), year label + 13 month ticks present, real markers appear
after the deferred sweep and contain EMOJI code points (assert none of the old
Greek set ☿♀♂♃♄♅♆⊕ is rendered), caret fraction = day-of-year of `clock.t`,
bar hidden again on release (both mouse + 3-finger paths).

### F3 — `feat(hud): ±1/±5 year jump buttons next to the mini strip`

**Pure layer:** new `addCalendarYears(tDays: number, n: number): number` in
`scrubMath.ts` — adds n calendar years preserving month/day/hour/min/sec in
UTC (Feb 29 in a non-leap target year rolls to Mar 1, standard `Date.UTC`
normalization). Returns days since J2000.

**Markup:** four small buttons in a row under `#hud-mini-row1` (or beside it):
`−5 yr`, `−1 yr`, `+1 yr`, `+5 yr`. `#hud-mini` is `pointer-events: none`, so
the buttons get `pointer-events: auto`. Always visible (not scrub-gated) —
they complement scrubbing, per the user.

**`main.ts`:** `jumpYears(n)`: `clock.setDate(new Date(J2000_UTC +
addCalendarYears(clock.t, n) * 86_400_000))` + `syncUrl()` +
`resampleMoonNow()` + the existing `#hud-date` flash. Buttons wired with
`<button>` + `type="button"`.

**Tests:** `addCalendarYears` — +1 yr same month/day/hour; leap: 2028-02-29
+1 → 2029-03-01 (UTC normalization); −5 yr; symmetry round-trip.

**Live check `/opt/data/audit/p024_f3_live_check.py`:** buttons visible when
idle (not scrubbing); click +1 yr → date advanced exactly one calendar year
(month/day preserved, asserted via `__solar.clock` + DOM date text), URL `t`
updated; −1 yr lands back; ±5 yr; leap-date case via `setDate` to 2028-02-29
then +1 → 2029-03-01.

### docs — `docs(scrub): record plan 024 hashes, refresh AGENTS.md scrub model`

- AGENTS.md "Time scrubbing" bullet: new model (1 px = 1 day linear, clamped to
  the press year, gauge = year position, bottom `#event-bar`, `#year-jump`
  buttons), note plan 023 F1 model superseded.
- todo.md: flip lines + hashes (follow-up docs commit, never `--amend`).

## Constants & measured facts

- Old F1 model (being removed): `spanDays = min(10 000, speed×3600)`,
  `f(x) = sign(x)·x²/(1+x²)`, x = px/500. F1 live check `925a358` asserted
  +952.94 d @ 300 px @ 1 d/s — those numbers are obsolete by user request.
- `findEvents` per-year cost (measured 2026-08-30): ≈ 90–170 ms @ 0.5 d coarse
  — the deferred-rAF + per-year cache design carries over unchanged.
- J2000 noon UTC ⇒ `yearSpanDays(2000).span0Days = −0.5` (Jan 1 2000 00:00 is
  half a day before J2000).
- SwiftShader ~4 fps: live checks must assert clock state (exact) not frame
  counts; settle with waits before sampling (lesson from p023 F3 check 4).

## Gate per feature (unchanged)

`npx vitest run` → `npx tsc --noEmit` → `npx eslint .` → `npm run build` →
prettier `--check .` LAST (formats .md plans too) → live check → commit → push
→ next feature.
