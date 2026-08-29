# Plan 017 — no-jump emphasis, phone-legible labels, roll-not-pan controls, selection = anchor

Four user-facing changes requested 2026-08-28 after plan 016 shipped. The
governing rule from the user: **"No more free view as before with
possibility to move the center of zooming"** — the view center is ALWAYS the
current selection (Sun by default; the picked planet/satellite/constellation
otherwise). Panning is deleted entirely, not just remapped.

Each feature is ONE commit, in the order below. All findings below were read
from the live tree at `9127003`, not tuned from memory.

## Ordered commits

### F1 — `fix(sky): only picked constellations get emphasis (no nearest-chasing jumps)` — shipped `e1295db`

- **Complaint:** "I don't like the view jumps between constellations when
  moving slightly the camera to always get one constellation centered. I
  didn't ask for that, especially [it] ruins the planets/solar system
  experience."
- **Root cause:** `computeConstellationEmphases()` (main.ts) recomputes a
  per-frame argmin over all 88 figure dirs (`LABEL_NEAREST_IDX`) and
  `proximityGoldMix()` (scene.ts, plan 015 P5) gives that nearest figure a
  ramped green tint + its label draws the green variant — so a small camera
  nudge hops the green highlight + label between figures, even in planet
  close-ups where the sky should sit back.
- **Fix:** delete the nearest-chasing. `LABEL_NEAREST_IDX` stays `-1` (drop
  the argmin loop); `emphasized` in the label updates = picked only;
  `proximityGoldMix(figureEmph, isNearest, picked)` simplifies to a
  picked-only function (the `isNearest` branch dies). KEEP the D4 per-figure
  view-center emphasis curve (`constellationEmphasis`) — that's what drives
  the smooth line/label opacity fade by view-center angle and is not a
  "jump". The picked figure keeps its always-on green + pulse.
- **Tests:** update the constellation tests that assert nearest-figure
  behavior (constellationEmphasis / proximity mix / label emphasized).
- **Subject:** `fix(sky): remove nearest-constellation auto-emphasis (only picks highlight)`

### F2 — `feat(sky): phone-legible labels — view cone + screen de-collision, max 8` — shipped `ce251f4`

- **Complaint:** "Labels visibility is still very poor, they are all packed
  together. Change strategy and find something simple and better (testing on
  my phone screen)."
- **Root cause:** `updateConstellationScreenLabels()` projects and draws ALL
  88 labels whose D4 opacity exceeds 0.02. In a 50° FOV phone view ~40+
  figures project into the frame and their 30 px boxes stack into an
  unreadable smear in the center.
- **Fix (simple, two rules, no solver):**
  1. **View cone:** only figures with D4 emphasis > 0 (i.e. within the 48°
     out-band of the view axis) are candidates at all.
  2. **De-collision + cap:** sort candidates by emphasis descending (picked
     figure forced first/always drawn), project each, and HIDE any label
     whose pixel box (name width × cap height, +4 px padding) intersects a
     box already accepted; hard cap `MAX_VISIBLE_LABELS = 8`.
     New pure function `selectVisibleLabels(updates, camera, wCss, hCss)` in
     `constellationScreenLabels.ts` returns the ordered draw list — unit-testable
     in Node (mock camera). The renderer just draws the returned list.
- **Test:** unit — cone filter excludes a 60° figure; two overlapping boxes
  keep only the stronger; cap at 8; picked label survives overlap; 0 candidates
  → empty list.
- **Subject:** `feat(sky): show max 8 de-collided labels in a view cone (phone legible)`

### F3 — `feat(camera): right-drag/2-finger rolls the view (Z); pan deleted` — shipped `5868677`

- **Complaint:** "Since we fully unlocked the rotation of the sphere I feel
  right click or 2 fingers should not be anymore moving the anchor of the
  center view but should allow for rotation against the z axis: x and y for
  left click / single finger, z for right click or 2 fingers."
  Plus the governing rule: panning is gone entirely.
- **Root cause:** stock `TrackballControls` maps RIGHT → `_STATE.PAN`
  (moves the anchor) and 2-finger → `TOUCH_ZOOM_PAN` (pinch zoom + midpoint
  pan). It has no roll gesture.
- **Fix (refined after reading the Trackball source):** do NOT vendor the
  whole control. Instead:
  - Set `controls.noPan = true` in scene.ts — this kills ALL pan paths at
    once: right-drag mouse pan, 2-finger midpoint pan, AND the A/S/D
    keyboard pan (all three are already gated by `!this.noPan` in
    Trackball's handlers). Pinch zoom on 2 fingers keeps working
    (`_zoomCamera` is independent of `noPan`). Trackball's `onContextMenu`
    already suppresses the browser menu on right-drag.
  - New small module `src/render/rollControls.ts`: an extra pointer listener
    on the SAME domElement (Trackball's listeners keep firing in parallel;
    with `noPan` its right-drag / 2-finger branches are inert, so no
    gesture fight). Roll gesture: right-button mouse drag (horizontal delta)
    and 2-finger twist (Δ of the inter-finger vector's angle). Math per
    event: `q = setFromAxisAngle(viewAxis, θ·rollSpeed)`; then
    `position = target + q·(position − target)` and `camera.up.applyQuaternion(q)`
    — a pure rotation around the view Z axis, leaving the view direction
    (and the target) untouched. Trackball's next `update()` re-derives
    `_eye` from the new position and `lookAt(target)` honors the rolled up,
    so the roll composes correctly with trackball rotation and the
    follow-pivot camera shift. Gate with `controls.enabled` (flights disable
    the controls; the existing global pointerdown handler cancels the
    flight/tour before this runs).
- **Tests:** unit — the roll math is a pure function `rollPose(position,
target, up, viewAxis, theta)` returning the new (position, up); assert the
  view direction is unchanged and `up` rotates within the view plane;
  `up` ⊥ viewAxis is preserved. Live CDP: right-drag → up rotates, view axis
  - target unchanged; 2-finger twist → same; right-drag never moves
    `controls.target`; 1-finger drag still does full trackball rotation.
- **Subject:** `feat(camera): right-drag / 2-finger rolls around view axis; panning removed`

### F4 — `feat(camera): anchor is the selection — Sky/System center the Sun, Free camera removed` — shipped `f0f3ba7`

- **Complaint (verbatim):** "The anchor can be fixed and based on the current
  selection. Solar system and sky views are heliocentric, then when picking
  something else we just make this planet, satellite, constellation the
  center and that's it; if someone wants to move back to heliocentric he can
  pick sun for close view or sky and solar system anchors that should also
  pick the sun but with different camera zooming."
- **Fix:**
  - `flyTo(..., sky)` for **Sky** and **System** anchors sets
    `followId = 'sun'` / `selectedBodyId = 'sun'` (they already frame the
    origin = Sun; now they also SELECT it, at their two different zooms —
    Sky = far dome framing, System = `frameSystem` close-ish framing).
    Picking the Sun from the find list keeps its own `frameBody` close view.
  - **Remove the "Free camera" row** from the find list (`fr-free`) and
    `findPick('')` no longer exists as a state — empty find query just
    searches. The `f=` URL param restore path: an unknown/empty follow falls
    back to the Sun anchor instead of "free".
  - Constellation picks keep centering the origin (sky-dome view aimed at
    the figure) — no change beyond F1/F2.
- **Tests:** unit where pure (anchor selection is main.ts wiring — verify by
  the existing live-CDP pattern + find-list DOM test update if any asserts
  the free row).
- **Subject:** `feat(camera): Sky/System anchors select the Sun; remove Free camera`

## Execution notes

- One feature in the tree at a time: implement → `npx vitest` + `npx tsc
--noEmit` + `node node_modules/vite/bin/vite.js build` + `npx prettier
--check .` → commit → push → next. Record hashes in a follow-up docs commit
  (no amend). CI prettier runs over the whole repo — format touched files
  before commit.
- **P5 (docs) — this commit:** plan 017 file + todo index with shipped hashes.
  All four features live-verified on the headless Chrome build
  (http://localhost:4173 via CDP) before commit.

## Implementation record (what actually shipped)

- **F1 `e1295db`** — as planned: green emphasis + emphasized label only for
  the picked constellation; proximity is still the sole trigger for the gold
  lines (per figure) but never moves the emphasis/label.
- **F2 `ce251f4`** — `selectVisibleLabels()` in `src/render/labelOverlay.ts`
  (view-cone gate at 48° half-angle, centrality sort, max 8,
  screen-space de-collision, picked label always wins) + CSS font size /
  label box in `index.html`. 253/253 tests at the time.
- **F3 `5868677`** — `src/render/rollControls.ts` (NEW): `rollPose` rotates
  ONLY `camera.up` around the view axis (position AND target exactly fixed —
  the roll axis passes through both; the first draft rotated position, which
  was a no-op math), `twistDelta` (pure inter-finger angle change),
  `createRollControls` (right button + 2-finger twist; pure pinch = 0°).
  `scene.ts`: `controls.noPan = true` kills every pan path (right-drag,
  2-finger midpoint, A/S/D keys) in one place. 259/259 tests. Live-verified:
  right-drag 250px → exact 105.4° roll with pos/target untouched; twist rolls
  with no zoom leak; pinch dollies exactly (200→400 px distance = ×0.5
  radial, target/up fixed).
- **F4 `f0f3ba7`** — Sky (`constellations`) and System anchors pass
  `bodyId='sun'` to `flyTo` → they select the Sun at their two different
  zooms (find box reads "Sun"); the Free camera row, its CSS and the
  `findPick('')` drop-to-free state are gone — empty/unknown picks (incl.
  Esc x2) fly to the Sun anchor; URL restore with no/unknown `f` re-anchors
  on the Sun (restored constellations keep their own pick). Picking the Sun
  from the find list keeps its own close `frameBody` view. Live-verified:
  fresh load → "Sun", no Free row, System/Sky targets = [0,0,0], tour stop
  re-anchors target to origin, Esc x2 → Sun anchor, empty query → "No
  matches".
- Live app for verification: headless Chrome (chrome-headless-shell) on
  :9222, CDP via `/opt/data/cdpenv/bin/python3` (websocket-client); vite
  preview on :4173. Phone-sized viewport for F2: `--window-size=390,844`.
- F3's `rollControls.ts` is a new small module (no vendored copy — the
  stock Trackball is untouched; `noPan` + the parallel listener is the whole
  control change).
