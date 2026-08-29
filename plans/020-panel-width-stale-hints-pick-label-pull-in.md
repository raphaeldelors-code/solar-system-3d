# Plan 020 — Stale control hints, panel-width occlusion, pick-view label pull-in

**Origin.** 2026-08-29 visual/numerical audit (vision + CDP + numerical audit,
`/opt/data/audit/findings.md` §F4–F6, `s6w`/`s6v`/`s6z` measurement scripts).
Three user-visible issues, shipped in dependency order:

- **F4 (root cause, CRITICAL)**: the control panel auto-sizes to its widest text
  (`min-width:220px`, no `max-width` → 677px at 13px/1.5 system-ui). It covers
  **38% of the viewport at 1280×800** and its right edge (689px) sits just past
  the geometric center (640px). Everything the app centers on — the Sun in the
  default boot view, every pick's figure and label (a pick frames its center at
  viewport center) — lands behind it. Measured at dpr=1, window 1280×800: green
  label inside the panel rect for Andromeda / Vela / Lyra / Puppis (3+ of 8
  tested picks); vision confirms the whole Ursa Major figure and the Sun sit
  under the panel.
- **F5 (stale hints)**: index.html still says "Right-drag: pan" (desktop) and
  "Two-finger drag: pan" (mobile). Plan 017 F3 **removed all panning**
  (`noPan = true`): right-drag and 2-finger twist are now ROLL. The hint teaches
  a gesture that does nothing — the "phantom controls" class of bug the user
  keeps hitting.
- **F2/F3 (label distance)**: pick-view audit (fov 50, camera on the
  constellation anchor): name ink ~185px (median) from its figure centroid.
  Most of that is F4 (the figure is under the panel, so the label looks
  detached from the visible sliver); a genuine residual exists for long figures
  (Hydra) where the angular label margin (capped at
  `CONSTELLATION_LABEL_FAR_CAP_RAD` = 0.35 rad past the centroid) projects to a
  large screen offset when the figure is small on screen.

**Ordering rationale.** F1 (hints) is trivial and zero-risk — it also validates
the gate→commit→push→deploy pipeline before the bigger work. F2 (panel) is the
root cause of most of the "labels far away / nothing visible" complaints. F3
(label pull-in) is measured AFTER F2 lands: the panel cap may shrink the
remaining label distance below the threshold for a change. If the residual is
small, F3 is documented as "no change needed" and the plan ships as F1+F2.

**Closed as false alarms during the audit** (see `findings.md`): "Sky tour
doesn't stop on canvas input" (the previous session's diagnostic dispatched to
`#viewport`, but the canvas is `#app` — real CDP input proves all five input
types stop the tour) and "black boot screen" (captured mid-boot; fresh boots
paint at t≈0.4s and are fully rendered by t≈5s).

---

## Commits (one per feature, in ship order)

### 1. `fix(ui): control hints describe the actual gestures — roll, not pan (plan 020 F1)`

- **Root cause**: plan 017 F3 removed panning (`noPan=true`; right-drag and
  2-finger twist = roll around view Z) but the hint strings in index.html were
  never updated.
- **Design**: desktop hint → `Drag: rotate · Wheel: zoom · Right-drag: roll · Click a body to fly to it`;
  mobile (pointer:coarse) hint → `Drag: rotate · Pinch: zoom · Twist: roll`
  (drop "Two-finger drag: pan" — pinch still zooms, twist rolls; exclusive
  gesture per plan 018).
- **Tests**: none (static strings). CDP: read `#hint` textContent on a
  fine-pointer page (default) and a coarse-pointer page (emulation), assert old
  substrings ("Right-drag: pan", "Two-finger drag: pan") gone, new ones present.
- **Gate**: `tsc --noEmit && vite build`, `vitest run` (unchanged),
  `prettier --check .` after formatting index.html.

### 2. `fix(ui): cap the control panel width so it stops covering the view center (plan 020 F2)`

- **Root cause**: `#panel` has `min-width:220px` and no max constraint;
  shrink-to-fit makes it 677px wide at 13px/1.5, spanning x=12..689 at 1280
  wide — past the 640px center.
- **Design**: cap `#panel { max-width: min(360px, calc(100vw - 24px)) }` in the
  base CSS. Measured (s6z probe, live page): at max-width 360 the panel is
  390px wide (padding included), right edge at 402px — center clear with
  > 200px margin, **zero overflow** (no child wider than the box), coverage
  > 38%→18%. Content (13px rows) fits: the widest meaningful row is the date
  > readout (~260px); the hint/credit paragraphs wrap normally (vision-confirmed
  > clean at `panel_360.png`).
  - Keep `min-width:220px` (mobile floor). The existing
    `@media (max-width:560px) { max-width: calc(100vw - 24px) }` still applies,
    so phones get the full width as before — no mobile behavior change.
  - No overflow-wrap additions needed (measured zero clipping at 360).
- **Tests**: no new unit test (pure CSS). CDP verification (s6w pattern):
  panel rect right < 640 at 1280×800; green label of the previously in-panel
  picks (Lyra, Vela, Puppis) now OUTSIDE the panel rect; vision screenshots of
  the default boot (Sun fully visible, not a dim disc through glass) + a pick.
- **Gate**: `tsc --noEmit && vite build`, `vitest run` (unchanged),
  `prettier --check .` after formatting index.html.

### 3. `fix(sky): pull pick-view labels toward their figures in screen space (plan 020 F3)`

- **Gate on measurement**: after F2 lands, re-run the per-pick label-distance
  audit (audit/zz_audit.tmp.test.ts part-2 pattern). If median label↔centroid
  distance in pick view dropped to ≤ ~100px (≈ the figure's own screen extent
  for typical figures), F3 is NOT needed — record the numbers in this plan and
  stop. Otherwise proceed:
- **Root cause**: `constellationLabelMargin()` (scene.ts) is angular —
  `min(halfExtent, 0.35 rad) + 0.02 + inkHalf` — tuned for the panoramic sky
  view (fov 120, radius 2756). At pick view (fov 50, radius ~34, figure a few
  degrees wide) the same angular margin projects to a big pixel offset: the
  label floats ~185px (median) from the centroid.
- **Design**: screen-space clamping at draw time only — in
  `constellationScreenLabels.ts`, after `projectSkyDir` places a label, if the
  label's screen distance from the figure's on-screen centroid exceeds
  `k * figureScreenRadius + labelHeight/2 + PAD` (k≈1.2, PAD≈8px), move the
  label along the same screen direction to that bound. The 3D label placement
  (solver, self-clear, de-collision) is untouched; a post-move de-collision
  re-check keeps the no-overlap invariant (nudge back to the original spot if
  the moved box hits an accepted one). Pure helper
  `clampLabelToFigure(screenPos, centroidPx, figRadiusPx, labelH, k, pad)` —
  unit-testable without DOM.
- **Measured inputs to cite in the commit**: current per-pick distances
  (median 185 / mean 203 / max 1322 px at 1280×800 fov 50) vs post-fix (target
  median ≤ ~60px for figures whose on-screen radius > 30px; clamping only
  tightens, never loosens).
- **Tests**: `tests/constellationScreenLabels.test.ts` — new cases for
  `clampLabelToFigure` (far label pulled in, near label untouched, clamp keeps
  within canvas, post-move de-collision fallback). CDP: before/after
  screenshots of Orion/Hydra/Andromeda picks; label visibly adjacent to the
  green figure.
- **Gate**: full set (`tsc && vite build`, all vitest, prettier).

### 4. `docs(plan-020): record F1–F3 hashes + implementation record (this commit)`

- Flip the todo.md lines, record the hashes in this file, note the F3
  measurement-gate outcome either way, and append the measured numbers.
- Housekeeping: add `core.*` to .gitignore (three ~790MB Chrome core dumps from
  the dpr=2 repro session are untracked in the repo dir and would poison any
  bulk add); delete the dumps from disk.

---

## Invariants that must hold (verify before each commit)

- No panning is ever introduced (plan 017, user-mandated).
- Green emphasis/label only on explicit pick (plan 017 F1) — the audit found
  none; don't "helpfully" re-add nearest-highlight.
- Max 8 labels on screen, picked always shown (plan 017 F2) — F3's move must
  not change the count or the de-collision outcome for other labels.
- The 2D overlay stays DPR-matched (plan 019) — F3 operates in CSS px, after
  `setTransform(dpr,…)`, so it inherits the fix.

## Out of scope (deliberately)

- The 3D label solver (plan 006/015) stays as-is unless F3's measurement forces
  it; F3 touches only the 2D screen-space offset.
- No repositioning of the panel itself (left dock is the house style; the
  width cap is the fix).
