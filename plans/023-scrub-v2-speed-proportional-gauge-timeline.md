# 023 — Scrub v2: speed-proportional scrub, HUD emphasis gauge, event timeline

Supersedes/extends plan 022's gesture model (F1/F2 stay as the _transport_; the
horizontal _mapping_ changes). One feature per commit, in dependency order.
Gates per feature: vitest + tsc + eslint + `prettier --check .` + `npm run build`,
then the live CDP check, then commit + push; hashes recorded in the closing
`docs:` commit.

## User asks (2026-08-30, verbatim intent)

- A: no more bottom banner — the permanent top-right date/speed strip is the
  scrub feedback; **emphasize it with an animation while scrubbing, released on
  release** (right button / 3-finger lift).
- B: lateral drag must move time **at the actual selected speed**, not the old
  fixed 0.002 d/px; **slower near the center of the gesture, up to the max
  speed at the span edges** — "prevent crazy camera shift when picking a high
  speed and oscillation around the center of where right-clicked or 3-fingered".
- C: gauge under the date/speed showing progress toward max (left/right),
  "I let you judge of this" → design below.
- D (bonus): a **timeline of the current year with the year's events as small
  emoji/icons**, with a moving "you are here" caret while scrubbing.

## Design decisions (and pushback)

- **B model.** `Δdays = spanDays · f(px/SCRUB_SPAN_PX)` with
  `SCRUB_SPAN_PX = 500` and the saturating easing
  `f(x) = sign(x) · x²/(1+x²)`. This shape has **zero slope at the center**
  (the user's explicit correction: "move slower the more we are close to the
  center" — a tanh would be fastest at the center and is rejected): wiggling
  around the pressed epoch moves almost no time (kills the oscillation),
  travel ramps up with distance, and saturates to the full span at the drag
  edges. `spanDays = min(SCRUB_CLAMP_DAYS, maxSpeed × 3600)` — one hour of sim
  time at the gesture's starting speed, capped ±10 000 d (≈ 27.4 yrs): the
  "up to the max speed" saturation. At 1 d/s → ±3 600 d full span (500 px
  drag = 1 800 d); at 100 d/s → 10 000 d clamp (500 px = 5 000 d); at
  0.001 d/s → ±3.6 d.
- **Speed reference.** `ScrubState.startLog` (gesture start) is the reference,
  so a simultaneous vertical speed-drag never rescales the time axis mid-gesture
  (that would be the "crazy shift"). Vertical still sets the resume speed.
- **C gauge.** Under `#hud-mini`'s date/speed row: a 280×4 px track, center
  notch (the pressed epoch), fill from center → knob at
  `x = center + (Δdays/span)·(track/2)`. Green fill toward
  the travel direction. No % text (the travel readout already says "+128 d");
  the gauge is the _visual_ meter the user asked for.
- **A emphasis.** `.scrubbing` on `#hud-mini`: CSS keyframes (box-shadow pulse
  - scale 1.03) running while any scrub is active (mouse or 3-finger); removed
    on every release/cancel path. The `#time-scrub` bottom overlay element, its
    CSS, and the flash-on-release logic are **deleted** (F4). The existing
    `dateEl` (panel) flash is kept for when the panel is open.
- **D timeline.** Strip under the gauge, width = track width, visible while
  scrubbing: left/right year labels of the span, ticks every 5 y, event markers
  (emoji by `EventType`) at `x = (t − span0)/spanLen · W`, caret = current t.
  Data: `yearEvents(year)` — lazy per-year `findEvents` (±183 d window,
  coarse 0.2 d — the same call the panel's events tab uses) cached in a Map.
  First touch of a year costs one sweep (~ms–1 s); all later scrubs are free.
  Markers capped at 40 per frame; overflow collapses to a "+N" chip. Loading
  state: "…" until the first async sweep lands, then markers paint in the same
  frame's rAF (never blocks the gesture — the scrub is a pointermove handler,
  the sweep is a deferred rAF).
- **Emoji map** (pure fn in scrubMath): solar-eclipse 🌑, lunar-eclipse 🌕,
  transit ☿/♀ by bodyId, conjunction ♀+♂ style "☿♀" (first two body symbols),
  opposition = body symbol, saturn-edge-on ♄.

## Commits (one feature each)

1. **F1 `feat(scrub): speed-proportional lateral travel with center easing`**
   - `scrubMath.ts`: replace fixed `scrubDeltaDays` with
     `scrubDeltaDays(speedDaysPerSec, deltaPx)` implementing the quadratic
     saturation easing (zero slope at the press point, saturates to the
     span at the drag edges) + `SCRUB_SPAN_PX=500`, keep
     `SCRUB_CLAMP_DAYS=10_000`, keep `scrubSpeedLog`/`formatScrubDelta`.
     New exports `scrubXToT(deltaPx)` → −1..1 fraction (pure, for the gauge)
     and `scrubSpanDays(speed)`.
   - `ScrubState` gains nothing (startLog exists); `applyScrubMove` computes
     `spanDays = min(SCRUB_CLAMP_DAYS, 10**s.startLog * 3600)` once and uses it.
   - `tests/scrubMath.test.ts`: rewrite the fixed-rate cases (center≈0,
     monotonic, ±clamps, speed scaling 1 vs 100 d/s, gauge fraction).
   - Live check `p023_f1_live_check.py`: drag right at 1 d/s →
     Δ ≈ span · f(px/500) (300 px → 952.9 d ≈ +2.6 yrs); 100 px → 138.5 d
     near-center drag (±30 px) small Δ; 100 d/s drag 500 px → ≈ clamp; release
     resumes at current slider speed. Atomic snapshots.
   - Updates: `plans/022` F1 note (superseded), AGENTS.md scrub bullet.
2. **F2 `feat(hud): scrub emphasis on the mini strip + speed gauge; drop bottom banner`**
   - `index.html`: delete `#time-scrub` + CSS; add gauge markup
     (`#hud-gauge` track/notch/fill/knob) inside `#hud-mini` (column layout);
     `@keyframes hud-scrub-pulse`; `.scrubbing` class.
   - `main.ts`: remove `scrubEl/scrubDateEl/scrubSubEl` + overlay write fns +
     flash logic from **both** mouse and touch release/cancel paths; instead
     toggle `hudMiniEl.classList` `scrubbing` on begin/end; write gauge fill/knob
     from `scrubXToT(dx, spanDays)` in `applyScrubMove`; sub-line travel text
     moves into `#hud-mini` second row (`#hud-sub`).
   - Live check `p023_f2_live_check.py`: no `#time-scrub` node; mid-drag
     `#hud-mini.scrubbing` present + gauge knob ≠ center (atomic); after
     release class gone + knob back to center.
3. **F3 `feat(hud): per-year event timeline under the scrub gauge`**
   - `src/render/yearEvents.ts`: `yearEvents(year)` lazy Map cache over
     `findEvents`; typed result `{year, events: SimEvent[]}`.
   - `scrubMath.ts`: `EVENT_EMOJI` map + `timelineLayout(span0, spanLen, W,
events, caretT)` pure → marker/caret/tick x positions (unit-tested).
   - `index.html`: `#hud-timeline` strip (canvas-free DOM markers), CSS.
   - `main.ts`: render timeline on scrub move (span = press epoch ± spanDays,
     but clamped to integer-year ticks), caret every frame while scrubbing,
     hidden when no scrub.
   - `tests/yearEvents.test.ts` (small window), extend `scrubMath.test.ts`.
   - Live check `p023_f3_live_check.py`: mid-drag timeline visible, caret x
     matches clock.t (atomic), markers inside [0,W], on release hidden.
4. **docs:`** record all hashes in `todo.md`, refresh AGENTS.md scrub section
   (new model + gauge + timeline invariants), note in plan 022 that 023
   supersedes the fixed-rate model.

## Gate & verify recipe (same as 022)

`npx vitest run && npx tsc --noEmit && npx eslint . && npx prettier --check .
&& npm run build`; live: preview :4173 + `--headless=new` Chrome :9222,
atomic `Runtime.evaluate` snapshots, `__solar.clock` for exact time.
