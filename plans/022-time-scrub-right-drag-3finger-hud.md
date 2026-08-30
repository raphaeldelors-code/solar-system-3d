# Plan 022 — time scrubbing: right-drag (desktop) + 3-finger (touch); horizontal = travel time, vertical = speed; live HUD readout; always-visible mini date/speed strip

User request (2026-08-30): "Time scrubbing is awesome… The pause on
press, then left or right is changing the speed and we should also see the
speed and calendar date emphasized on the screen even without the menu
opened and on release it should resume the default speed" — then
refined: "Maybe up / downward movement change the slider speed and left
right travel through time?"

Plan 021 left **right-drag inert** on desktop (`enablePan=false` gates
OrbitControls' `MOUSE.PAN` path — verified in vendored `three@0.168.0`
OrbitControls: `onMouseDown` case `MOUSE.PAN` returns when `enablePan ===
false`, and no modifier turns right into rotate) and **2-finger fully used**
(pinch = zoom; pan gated). **3-finger is completely unclaimed** by
OrbitControls: `onPointerUp` only branches on `_pointers.length` 0 and 1, and
the touch handlers only special-case 1 and 2 pointers — a 3rd pointer is
tracked but never acts. So both new gesture slots are genuinely free.

## The feature

One two-dimensional gesture, two controls:

| Input                     | Horizontal (X)                               | Vertical (Y)                                                               |
| ------------------------- | -------------------------------------------- | -------------------------------------------------------------------------- |
| **Right-drag (mouse)**    | travel time: **right = future, left = past** | change speed: **up = faster, down = slower** (slider magnitude, log scale) |
| **3-finger drag (touch)** | same (mean finger position)                  | same                                                                       |

1-finger = rotate, 2-finger = pinch-zoom (unchanged from plan 021).

While the gesture is held:

- the sim clock is **frozen** at the scrubbed value (no background tick),
- a large **on-screen readout** (bottom-centre, visible even with the panel
  collapsed) shows the live date/time, the time travel from the press epoch
  (`+5.3 yrs`), and the live speed (`25 d/s`),
- the panel's Speed slider **moves live** to the scrubbed value (and its
  `d/s` readout updates), so the gesture is legible in the panel too,
- the date in the panel and the moon orbit line follow the scrub (the
  250 ms moon-resample throttle is bypassed while scrubbing),
- the shareable URL keeps syncing `t` and `sp` through the existing
  debounced `syncUrl()` path (no new URL params).

On release:

- time **resumes at the current slider speed/direction** — i.e. the value
  the vertical movement left the slider at (if you never dragged
  vertically, that's exactly the pre-scrub speed, per the user's
  "keep my slider setting" answer),
- if the sim was **Paused** before the press, release returns it to Paused
  (we never silently un-pause; the speed may still have changed — the
  slider state is user data, the pause state is a separate toggle),
- the readout flashes the final date briefly (reusing the existing
  `time-flash` keyframes), then fades away,
- the moon orbit line is re-sampled once at the new epoch so it doesn't
  lag by up to 250 ms.

The gesture does NOT flip the Reverse toggle — vertical only moves the
magnitude (the slider's existing domain), so a reversed sim stays reversed
and "faster" means faster-backwards.

## Design decisions (locked)

1. **X rate fixed, independent of the current speed slider:**
   `SCRUB_DAYS_PER_PX = 0.002` d/px (1 px ≈ 2.9 sim-minutes). Rationale:
   the slider is a _rate_ (0.001…316 d/s); tying travel to it would make a
   300 px drag span 1 s at the slowest setting and ~15 000 days at the
   fastest. Fixed rate is predictable: **300 px ≈ 0.6 yrs** of time travel
   on both desktop and phone.
2. **Y rate: `SCRUB_SPEED_LOG_PER_PY = 0.01` log10(d/s) per pixel** —
   100 px ≈ one order of magnitude; the full slider span (−3 → +2.5 =
   5.5 log units) is reachable in 550 px. Up (negative Δy in screen coords)
   = faster. The result is clamped to the slider's own `[−3, 2.5]` domain,
   so the slider can never leave its valid range.
3. **Per-axis dead zones:** X commits time travel only after |Δx| > 6 px
   (same as click-pick); Y commits speed changes only after |Δy| > 4 px.
   A pure click (no travel) is a complete no-op.
4. **Scrub total clamped to ±10 000 days (≈ 27.4 yrs):**
   `SCRUB_CLAMP_DAYS = 10_000`.
5. **Direction convention:** drag right = future (video-scrubber convention).
   Time travel and speed are independent — you can change speed without
   moving time and vice versa, in one continuous drag.
6. **F1 = desktop mouse, F2 = 3-finger twin, F3 = always-on HUD strip.**

## Files touched

- `src/render/scrubMath.ts` (NEW, pure)
- `src/sim/clock.ts` (scrub session: `beginScrub` / `endScrub`)
- `src/main.ts` (pointer wiring, overlay, slider mirroring, moon-resample
  bypass, click-pick suppression, hints, HUD strip update)
- `index.html` (`#time-scrub` overlay + CSS, `#hud-mini` strip + CSS, hint
  strings incl. coarse pointer)
- `tests/scrubMath.test.ts` (NEW), `tests/clock.test.ts` (extend/NEW)
- `AGENTS.md` (short "Time scrubbing" bullet)

## Ordered commits (3)

### F1 — `feat(time): right-drag scrubs time (X) and speed (Y); press freezes, release resumes at current speed`

**`src/render/scrubMath.ts`** (NEW, pure — no DOM/three):

```ts
/** Sim days advanced per pixel of horizontal drag (fixed, speed-independent). */
export const SCRUB_DAYS_PER_PX = 0.002;
/** Max |Δt| in sim days a single gesture may apply (≈ 27.4 yrs). */
export const SCRUB_CLAMP_DAYS = 10_000;
/** log10(days/s) per pixel of vertical drag (up = faster). 100 px ≈ 1 decade. */
export const SCRUB_SPEED_LOG_PER_PY = 0.01;
/** The speed slider's own domain (mirrors index.html #speed min/max). */
export const SPEED_LOG_MIN = -3;
export const SPEED_LOG_MAX = 2.5;

/** Sim days added to the press epoch for a horizontal drag in pixels. */
export function scrubDeltaDays(deltaPx: number): number {
  return Math.max(-SCRUB_CLAMP_DAYS, Math.min(SCRUB_CLAMP_DAYS, deltaPx * SCRUB_DAYS_PER_PX));
}

/** New speed slider value (log10 d/s) for a vertical drag. Up (negative
 *  screen Δy) = faster. Clamped to the slider domain. */
export function scrubSpeedLog(baseLog: number, deltaPy: number): number {
  const v = baseLog - deltaPy * SCRUB_SPEED_LOG_PER_PY;
  return Math.max(SPEED_LOG_MIN, Math.min(SPEED_LOG_MAX, v));
}

/** Human "how far did I travel" string: "+5.3 yrs" / "−128 d" / "0 d". */
export function formatScrubDelta(days: number): string {
  const a = Math.abs(days);
  if (a < 365) return `${days < 0 ? '−' : '+'}${a.toFixed(0)} d`;
  return `${days < 0 ? '−' : '+'}${(a / 365.25).toFixed(1)} yrs`;
}
```

**`src/sim/clock.ts`**: scrub session so the pause/restore state machine is
pure and testable:

```ts
private preScrubPaused = false;

/** Freeze the clock for a scrub gesture, remembering the pre-scrub pause state. */
beginScrub(): void { this.preScrubPaused = this.paused; this.paused = true; }

/** End the scrub: resume only if time was running before the scrub began. */
endScrub(): void { this.paused = this.preScrubPaused; }
```

(`tick()` already no-ops while paused — no change there. Note `endScrub`
restores ONLY the pause flag — the speed is whatever the slider now holds,
by design.)

**`src/main.ts`**:

- New state:
  ```ts
  let scrub: null | {
    startX: number;
    startY: number;
    startDays: number;
    startLog: number;
    movedX: boolean;
    movedY: boolean;
  } = null;
  let suppressPickAfterScrub = false;
  ```
- **`contextmenu` on canvas** → `ev.preventDefault()` (always; right-button
  has no other use on this canvas, and the native menu mid-drag is noise).
- **`pointerdown` on canvas** (`pointerType === 'mouse'`, `button === 2`):
  `scrub = { startX: ev.clientX, startY: ev.clientY, startDays: clock.t,
startLog: clock.logSpeed /* need getter — see below */, movedX: false,
movedY: false };` `clock.beginScrub();` show `#time-scrub`, update it.
  - `SimClock` needs a `getLogSpeed(): number { return this.logMag; }`
    getter (2 lines, in `src/sim/clock.ts`).
- **`pointermove` on window** while `scrub` (and button 2 still down):
  - `dx = ev.clientX - scrub.startX`; `dy = ev.clientY - scrub.startY`.
  - If `!scrub.movedX && Math.abs(dx) > 6` → `scrub.movedX = true`.
  - If `!scrub.movedY && Math.abs(dy) > 4` → `scrub.movedY = true`.
  - If `movedX`:
    `clock.setDate(new Date(J2000_UTC + (scrub.startDays + scrubDeltaDays(dx)) * 86400000));`
    (import `J2000_UTC` from `src/sim/types` — main.ts already imports
    from the sim layer.)
  - If `movedY`:
    `const v = scrubSpeedLog(scrub.startLog, dy);`
    `speedEl.value = String(v);` then run the EXACT path the slider's
    `input` handler runs (main.ts:810-813): `clock.setLogSpeed(v);
fmtSpeed(); syncUrl();` — factored as a small `applySliderSpeed()`
    helper used by both, so the panel slider and the gesture can never
    diverge.
  - Update the overlay (date via `fmtDate()` output, `formatScrubDelta`,
    current speed string) and force the moon line live:
    `lastMoonResampleMs = performance.now();` (only when movedX).
  - `syncUrl()` is debounced; calling it on moved changes is fine, but
    only after a `moved*` flips — not on dead-zone moves.
- **`pointerup` / `pointercancel` on window** while `scrub`:
  - If neither `movedX` nor `movedY`: plain no-op release (still call
    `clock.endScrub()` — the clock was frozen on press; a sub-threshold
    press froze at most a couple of frames, and resuming keeps the
    animation smooth). No flash, no URL spam, no pick suppression (a
    right-button click never hit the pick handler anyway, but keep the
    invariant: pick suppression only when `movedX || movedY`).
  - Else: `clock.endScrub();` `resampleMoonNow();` `suppressPickAfterScrub
= true;` (cleared on next pointerdown); flash `#time-scrub` date (add
    `.flash`, remove after the 1.2 s animation), hide overlay after the
    flash; `scrub = null`.
- **click-pick guard**: the existing `pointerup` pick handler (main.ts:1422)
  gains `if (suppressPickAfterScrub) { suppressPickAfterScrub = false;
return; }` at its top — a right-button release must never flyTo.
- **Sky tour**: the existing `stopSkyTour` listeners fire on any
  `pointerdown`, so grabbing right-button during a tour ends the tour
  (correct — the user grabbed it). No change.
- Hints (desktop, index.html L610):
  `Drag: rotate · Wheel: zoom · Right-drag: scrub time ↑ speed · Click a body to fly to it`
  (keep it short — the overlay itself is the tutorial; "Right-drag: time
  & speed" is an acceptable shorter form; final wording decided in F1).

**`index.html`** — `#time-scrub` overlay (bottom-centre, above `#hint`,
fixed-position, sibling of the panel):

```html
<div id="time-scrub" aria-hidden="true" hidden>
  <div id="time-scrub-date">—</div>
  <div id="time-scrub-sub"></div>
</div>
```

`#time-scrub-sub` holds one line: `+5.3 yrs · 25 d/s` (delta + live speed).

CSS: `position: fixed; left: 50%; transform: translateX(-50%); bottom:
64px; z-index: 30; pointer-events: none;` dark translucent pill
(`background: rgba(10, 16, 28, 0.82); border: 1px solid #2b4a7a;
border-radius: 10px; padding: 10px 18px; text-align: center;`), date in
`font-size: 22px; font-variant-numeric: tabular-nums; color: #9fd6a8;` (the
existing `#date` green), sub in `font-size: 12px; color: #8fa3bf;`.
Flash reuses the existing `@keyframes time-flash` (index.html ~L191-197,
already present for `#time.flash` — extend the selector to
`#time-scrub-date.flash`) applied to the date line.

**`tests/scrubMath.test.ts`** (NEW, pure):

- `scrubDeltaDays`: 150 px → 0.3 d; −150 px → −0.3 d; 5 000 000 px →
  clamped 10 000; negative mirror; 0 → 0.
- `scrubSpeedLog`: (0, −100) → 1 (up 100 px = 1 decade faster); (0, +100) →
  −1; (0, +1000) → clamped −3; (0, −1000) → clamped 2.5; linearity of
  intermediate values (toBeCloseTo).
- `formatScrubDelta`: 0 → `0 d`; 100 → `+100 d`; −128 → `−128 d`; 1461 →
  `+4.0 yrs`; −730.5 → `−2.0 yrs` (exact strings pinned from the
  implementation).

**`tests/clock.test.ts`** (extend if present, else NEW):

- `beginScrub` freezes: `tick(10)` → `t` unchanged.
- Pause memory: running→begin→end ⇒ `!isPaused`; paused→begin→end ⇒
  `isPaused`.
- Speed independence: `setLogSpeed(2)` before begin, end, speed still 2
  (endScrub never touches the slider value).
- New `getLogSpeed()` round-trips `setLogSpeed`.

**Test plan / gates**: `npx vitest run` green; `npm run build` (tsc strict +
vite); `npx eslint .`; `npx prettier --write` changed files then
`--check .` clean (CI runs prettier over the WHOLE repo incl. this plan
file). **Live verify** (headless Chrome + CDP on `vite preview :4173`,
fresh page per case, pattern of `/opt/data/audit/p021_live_check.py`):

1. Idle pose: `#time-scrub` hidden.
2. Right-drag (+120 px, 0 y): `clock.t` advanced ≈ 0.24 d (±5 %), panel
   date matches, overlay visible with `+68 d`-class sub text, speed
   UNCHANGED, camera position/target/up UNCHANGED (scrub never moves the
   camera; with a followed planet it stays centred while its position on
   the orbit changes).
3. Right-drag (0 x, −100 px): `#speed` slider value ≈ startLog + 1
   (toBeCloseTo 0.01), `#speed-value` updated, `clock.t` UNCHANGED (frozen
   at press epoch), overlay speed line shows the new value.
4. Combined diagonal drag (+100 x, −150 y): both axes commit; on release
   both `t` and `sp` URL params match; panel date + speed match.
5. Release: `clock.t` advances in the next 500 ms at the (possibly
   changed) speed; overlay hidden after the flash; subsequent left-click
   on a visible body still flies (pick suppression cleared after one
   pointerdown).
6. Sub-threshold right-click (< 6 px, < 4 px): clock never effectively
   frozen (delta over 500 ms ≈ speed×0.5 s ± 2 frames), overlay never
   visible, no URL change.
7. Paused pre-scrub: scrub + release ⇒ `#pause` still reads "Resume";
   speed change still applied to the slider.
8. Reversed pre-scrub: scrub + release ⇒ `#speed-value` keeps the `← `
   prefix; time continues backwards at the new speed.
9. Contextmenu: right-press 300 ms release → NO native contextmenu (CDP
   `Page.javascriptDialogOpening` count 0), pointerup handled.

### F2 — `feat(time): 3-finger drag scrubs time (X) and speed (Y) on touch`

**`src/main.ts`**:

- New state:
  ```ts
  const touchPointers = new Map<number, { x: number; y: number }>();
  let threeFingerScrub: null | {
    startAvgX: number;
    startAvgY: number;
    startDays: number;
    startLog: number;
    active: boolean;
  } = null;
  let suppressTouchPick = false;
  ```
- **`pointerdown` on canvas** (`pointerType === 'touch'`): insert into
  `touchPointers`. If size reaches 3 → start scrub: centroid
  (`startAvgX/Y = mean`), `startDays = clock.t`, `startLog =
clock.getLogSpeed()`, `active = false`; `clock.beginScrub()`; show
  overlay. If size reaches 4 → ignore (4th finger is dead weight; the
  gesture continues with the first 3 — simplest correct behaviour).
- **`pointermove` on canvas** (touch): update the stored position. While a
  scrub is live and ≥ 3 pointers remain: recompute centroid;
  `dx = avgX - startAvgX`, `dy = avgY - startAvgY`; if
  `|dx| > 6 || |dy| > 6` → `active = true`; once active apply X (time) and
  Y (speed) EXACTLY as the mouse path (same helpers — factor F1's move
  logic into `applyScrubMove(dx, dy)` used by both input types). Force
  moon resample + overlay + debounced `syncUrl()` only while active.
  Before `active`, the clock stays frozen at the press epoch and the
  slider untouched (3-finger centroid jitter is real — the 6 px gate on
  BOTH axes is deliberate, slightly looser than the mouse's split 6/4 px).
- **`pointerup` / `pointercancel` on window** (touch): remove from
  `touchPointers`. When the count drops from 3 to 2 (or fewer) while a
  scrub was live: run the SAME end path as the mouse release
  (`clock.endScrub()`, `resampleMoonNow()` if active, flash/hide if
  active, `suppressTouchPick = true` if active, `threeFingerScrub =
null`).
  - **CORRECTION (verified against vendored r168 source):**
    `onPointerUp` only re-seeds in `case 0` and `case 1` — a 3→2 lift
    falls through with NO re-seed, so the surviving pinch would stay DEAD
    (state stuck at NONE). F2 fixes it with a synthetic **re-arm bounce**:
    on the 3→2 transition, dispatch a `pointerup` then `pointerdown` for
    one surviving finger (public API, no monkey-patching). OrbitControls
    processes them as remove → `case 1` re-seed (`_onTouchStart` from the
    stored position) → re-add → `case 2` DOLLY_PAN from the live
    positions — pinch resumes with no jump. The bounce is bracketed by a
    `rearmBounce` flag so F2's own window/canvas handlers ignore exactly
    those two synthetic events. `setPointerCapture` is not touched by the
    bounce (it only runs when `_pointers.length === 0`), so the synthetic
    pointer ids are safe.
  - Plain 1-finger / 2-finger gestures never set scrub state — zero
    interference with plan 021 behaviour.
- **`pointercancel` safety**: if all pointers cancel while a scrub is
  live, run the end path (treat as release at the current centroid) so
  `paused` can never dangle. This is the one real failure mode of the
  whole feature; the cancel test below exists for it.
- **Click-pick guard** (main.ts:1422 handler): also early-return when
  `suppressTouchPick` is set.
- A scrub can START from a live pinch (add a 3rd finger) and END back into
  a live pinch (lift to 2) — both directions are supported and tested.
- Hints (coarse pointer, index.html L624):
  `Drag: rotate · Pinch: zoom · 3 fingers: time & speed`

**Tests**: the pointer bookkeeping is UI glue — the live CDP tests carry
the behaviour; pure math is already F1's scrubMath/clock suites.

**Live verify** (CDP `Input.dispatchTouchEvent`, fresh page per case):

1. 3-finger press + 150 px centroid-x travel → `clock.t` ≈ +0.30 d,
   overlay visible, camera untouched; speed unchanged (no vertical).
2. 3-finger press + 120 px centroid-y upward → `#speed` ≈ startLog + 1.2,
   `clock.t` frozen; overlay speed line live.
3. Lift one finger mid-scrub → resume verified (F1 step 5); remaining
   2-finger pinch still zooms (distance continuity within damping
   tolerance, sampled 100 ms before/after the lift).
4. Start from a live pinch: 2 fingers pinching, add a 3rd → scrub takes
   over (rotation/zoom freeze), lift to 2 → pinch resumes from the new
   distance.
5. Plain 1-finger rotate + 2-finger pinch: plan 021 live checks 1, 3, 4, 6
   re-run as regression.
6. 4-finger press: 4th ignored; release all → clock running (or
   restored-pause), overlay hidden, no state leak.
7. `pointercancel` mid-scrub: clock NOT left frozen; pause state matches
   pre-scrub.

### F3 — `feat(hud): always-visible mini date/speed strip (top-right)`

The scrub overlay covers the DURING-gesture case. This is the "even
without the menu opened" part: a small permanent strip so date + speed
are visible when the panel is collapsed — which is the DEFAULT on phones
< 560 px (today a phone user sees the date only by expanding the panel).

**`index.html`**:

```html
<div id="hud-mini">
  <span id="hud-date">—</span>
  <span id="hud-speed">1.0 d/s</span>
</div>
```

CSS: `position: fixed; top: max(8px, env(safe-area-inset-top)); right:
12px; z-index: 20; pointer-events: none; display: flex; gap: 8px;
background: rgba(10, 16, 28, 0.6); border-radius: 8px; padding: 4px 10px;
font-size: 12px; font-variant-numeric: tabular-nums; color: #9fd6a8;`
speed in `color: #8fa3bf;` (dimmer, secondary). `pointer-events: none` —
never blocks the canvas. Under 560 px the date renders day-only
(`YYYY-MM-DD`); the panel's Date row keeps the full form.

**`src/main.ts`**:

- `hudDateEl` / `hudSpeedEl` refs.
- `fmtDate()` (main.ts:717) also writes `hudDateEl` (full vs day-only
  chosen once at init, re-checked in the existing resize handler).
- `fmtSpeed()` (main.ts:691) also writes `hudSpeedEl` — same string as
  `#speed-value` incl. the `← ` arrow. Since F1 factors the slider path
  into `applySliderSpeed()`, the HUD speed follows the scrub for free.
- The init calls at main.ts:1303-1304 (`fmtSpeed(); fmtDate();`) cover
  first paint.
- Deliberately NOT `aria-live`: 60 fps updates would spam screen readers;
  the panel's Date/Speed rows remain the accessible source of truth.

**Live verify**:

1. Desktop: strip top-right; date identical to `#date`; speed identical to
   `#speed-value`; both update live (sample t and t+2 s).
2. 375 px viewport: panel auto-collapsed (existing), strip visible with
   day-only date; no overlap with `#hint`/credit or the panel toggle
   (bounding boxes disjoint).
3. Slider change / Reverse: strip speed updates within 1 frame, `← `
   included when reversed.
4. Scrub (F1/F2): strip tracks the overlay (date while X moves, speed
   while Y moves).
5. Save-screenshot is canvas-only → the strip (DOM) is NOT in screenshots
   (acceptable; noted in AGENTS.md).

## AGENTS.md

Add one bullet near the camera/OrbitControls mention:

> **Time scrubbing** (`src/render/scrubMath.ts` pure + `SimClock`
> `beginScrub`/`endScrub` + `main.ts` pointer wiring): right-drag (mouse)
> or 3-finger drag (touch) is a 2D gesture — horizontal travels time at a
> FIXED `SCRUB_DAYS_PER_PX = 0.002` (speed-slider-independent) clamped to
> `±SCRUB_CLAMP_DAYS = 10 000 d`; vertical moves the speed slider at
> `SCRUB_SPEED_LOG_PER_PY = 0.01` log10(d/s)/px (up = faster) within the
> slider's `[−3, 2.5]` domain. Press freezes (`beginScrub` remembers the
> pre-scrub pause state), release resumes (`endScrub`) at the CURRENT
> slider speed and re-samples the Moon orbit line. OrbitControls' right-drag
> is inert (`enablePan=false`) and its touch handlers only act on 1–2
> pointers, so both gesture slots are unused by the controls. `#time-scrub`
> (bottom-centre, during the gesture) and `#hud-mini` (top-right, always)
> are DOM overlays with `pointer-events: none` (not in screenshots).

## Risks / watch-outs

- **Dangling freeze**: the only way `paused` sticks is an unhandled
  pointer loss — `pointercancel` must be handled on WINDOW (not just
  canvas), for both mouse and touch; F2's cancel test covers it.
- **Click-pick after scrub**: a right-button/touch lift can look like a
  click; `suppressPickAfterScrub`/`suppressTouchPick` are set on every
  real (moved) release and cleared on the next pointerdown.
- **Slider/URL divergence**: the gesture must write through the SAME
  `applySliderSpeed()` helper the slider's `input` event uses — two code
  paths would drift (panel value vs clock speed).
- **Y-axis noise on touch**: 3-finger centroid y is jittery; the 6 px gate
  on both axes before anything commits (both time AND speed stay put until
  then).
- **URL sync spam**: only fire `syncUrl()` after a `moved*/active` flip,
  never on dead-zone moves (it's debounced, but keep the log clean).
- **Prettier over the whole repo in CI**: format this plan file itself.
- **Pre-existing tsc noise** ("Cannot find name Iterable/Map/Promise") is
  ignored per the standing rule.

## Rollback note

Each feature is one commit on `main`; revert individually. F1 is fully
self-contained; F2 depends on F1's helpers (`applyScrubMove`, overlay);
F3 is independent DOM + two formatter calls.
