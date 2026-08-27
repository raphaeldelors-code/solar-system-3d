# Plan 015 — camera 360°, giraffe re-fit, labels, nearest/pick highlights

Six user-facing changes requested after plan 014 shipped (2026-08-27). Each is
ONE commit, in the order below. All findings below were measured in the live
app (headless Chrome on `vite preview` :4173 + CDP) or computed from data,
not tuned from memory.

## Ordered commits

### P1 — fix: clear the constellation pick when a non-constellation pick happens

- **Symptom (reproduced live):** pick Orion from the find box → lines go gold
  `#ffc46b`. Click the **Sky** or **System** anchor button → Orion stays gold
  forever. `c=Orion` stays in the URL.
- **Root cause:** `flyTo()` (main.ts) clears `selectedConstellation` only
  `if (bodyId)`; the global anchors (Sky/System) call `flyTo(...)` with
  `bodyId = null`, so the gold emphasis + pulse are never disarmed.
  Constellation→body and constellation→constellation picks already work.
- **Fix:** in `flyTo`, clear `selectedConstellation` unconditionally (before
  `setFindValue`) and force a highlight-pass refresh
  (`lastHighlightPoseKey = ''`) so the gold drops immediately even when the
  camera is parked mid-flight. `findPick('')` (Free camera) already sets both
  state vars and just needs the same forced-refresh for the parked case.
- **Test:** live CDP — pick constellation, click Sky / System / Free camera / a
  body; assert line material color returns to base `#8fb0ff` in every case.
  No unit test (main.ts wiring, same pattern as plan 010).
- **Subject:** `fix(sky): clear constellation pick on global anchors and free camera`

### P2 — feat: full 360° free rotation past the poles

- **Root cause:** `OrbitControls` clamps polar angle to `[0, π]` and runs
  `makeSafe()`, so the camera can never pass the pole — the user's "blocked at
  180°". OrbitControls mathematically cannot do this.
- **Fix:** switch `buildScene` (scene.ts) to the vendored
  `three/examples/jsm/controls/TrackballControls` — free-axis trackball
  rotation, no polar singularity, full 360° in every direction. Compatibility
  surface used by main.ts is small and all of it exists on TrackballControls:
  `enabled`, `target`, `.update()`, `.addEventListener('change', …)`.
  - Tuning: `staticMoving = true` (predictable, no inertial drift fighting the
    flight/tour code), `rotateSpeed ≈ 1.2`, keep default `minDistance 0` /
    `maxDistance Infinity`.
  - `rebuildScene` already re-wires the `change` listener on each build;
    `dispose()` gains `controls.dispose()`.
  - Window resize: call `controls.handleResize()` in the existing resize
    handler (Trackball caches the screen rect).
  - Flights/tour write `camera.position` + `lookAt` directly and land on
    `controls.update()` — unchanged behavior; Trackball's `update()` only
    applies accumulated (zero) deltas when idle, verified in source.
- **Risk:** drag gestures differ from OrbitControls (two-finger pan is
  right-drag / ctrl+drag; pinch = zoom). Acceptable: this is a desktop-first
  sky viewer and the user explicitly wants pole-passing rotation.
- **Test:** unit — construct both controls in Node (three builds without WebGL):
  assert the scene's controls expose `target`/`enabled`/`update` and that
  `minPolarAngle`/`maxPolarAngle` no longer exist (guard against regression to
  OrbitControls). Live CDP: drag the camera through the pole (simulate
  pointerdown/move) and assert camera crosses the y-axis sign boundary.
- **Subject:** `feat(camera): trackball controls for full 360° rotation past the poles`

### P3 — Camelopardalis (giraffe) transform — CLOSED: keep the algorithm's position

- **User policy (2026-08-27):** "having one algorithm reusable across all
  images placement is probably more valuable than a perfectly position that
  break the algorithm policy. If the algorithm tells it the best position
  let's keep it and move on."
- **Verified:** the shipped `figures.ts` entry (RA 4.8352, Dec 66.1305, size
  27.70, rot 31.64, mirrored PNG baked in plan 014) is **exactly** the
  standard plan-014 pipeline output — 3-anchor closed-form LS similarity
  (anchor step: RA 4.8352, Dec 67.2305, size 32.60, rot 31.64) + the same
  de-collision pass used for all 88 (drift shipped vs `decollided.json`:
  0.0000°). The algorithm's best in-policy position is already what ships.
- **Ad-hoc candidates (reference only, rejected as policy breaks):**
  coarse search 0.387 (size ≤40), fine 0.090 (size-40 boundary), fine2 0.0786
  (size 42, rot −22°, 8/8 in-box, max_pen 0.017°). The 0.0786 fit was
  vision-A/B'd at in-app 38% opacity and **rejected**: it wraps the star
  cloud (belly under the stars) instead of tracing the spine — a
  containment-score win, a path-match loss, reachable only by a wider
  size/rotation search no other figure received.
- **Mirror:** the plan-014 chirality test already selected the baked mirror
  (uniform policy); vision independently said a further mirror makes it worse.
- **Result: no code change, no PNG change, no `figures.ts` change.** P3 is
  closed as verified, not implemented.

### P4 — fix: constellation name labels sit closer to their figures

- **User:** labels are "badly placed, a bit too far away from the star paths",
  but repositioning must not regress the anti-overlap visibility won in
  plan 006.
- **Root cause:** the margin is `halfExtent + EDGE_GAP(2°) + ink/2`, and
  `resolveConstellationLabels` may also push a label ×1.5 further on the far
  side. For long figures (Hydra span 95°, Eridanus 66°, Serpens 50° —
  measured) the far tip is very far from the star path, so the name reads as
  detached.
- **Fix (measured, not guessed):**
  1. Shrink the constant `CONSTELLATION_LABEL_EDGE_GAP_RAD` 0.035 → ~0.02 (~1.2°).
  2. Cap the far-side margin for LARGE figures: when `halfExtent` exceeds a
     threshold (~0.35 rad ≈ 20°), place the label at `margin = min(halfExtent,
cap)` so the name floats near the figure's centroid/long axis instead of
     beyond the 95° tail. Small figures keep the exact tip+gap rule.
  3. Keep the solver's overlap penalty + side/margin-scale machinery intact —
     the no-overlap invariant is the guardrail.
- **Test:** `constellationLabels.test.ts` keeps passing (no overlapping labels
  in the full 88; determinism). Add an assertion that the worst-case
  centroid→label offset drops (measured before/after, cited in the commit).
  Live: screenshot a crowded winter band + Hydra, vision check: labels closer,
  none overlapping, visibility intact.
- **Subject:** `fix(sky): bring constellation labels closer to long figures`

### P5 — feat: highlight the nearest constellation's star pattern (gold, motion-faded)

- **User:** "for the constellation closest to the view, the star pattern should
  be highlighted the same way as when picked from the search bar, with a fade
  in/out following motion".
- **Design:** reuse the existing D4 proximity machinery (already computes per-
  constellation emphasis at ~5 Hz and fades smoothly with camera motion —
  that IS the in/out fade). The nearest figure gets the pick treatment (warm
  gold `CONSTELLATION_EMPHASIS_COLOR`) at an opacity derived from its
  emphasis (so it fades exactly with the view), and returns to blue as the
  view moves away. An explicitly **picked** constellation keeps its current
  always-on gold + pulse and wins over the proximity highlight.
  - Implementation: in `updateConstellationHighlight`, when a figure is not
    picked, if its emphasis is the scene max and above a threshold
    (e.g. emph ≥ 0.55), tint gold at `opacity = base + (gold−base)·emph`;
    others unchanged. Constants + the tint math are pure functions in
    scene.ts → unit-tested.
  - Must not fight P4's label opacity (labels keep the blue label curve; only
    the LINES tint).
- **Test:** unit — pure tint function (emph→color/opacity) incl. the
  picked-wins rule. Live CDP: aim the view at a figure, assert its line color
  becomes gold; rotate away, assert it returns to blue.
- **Subject:** `feat(sky): gold-proximity highlight for the nearest constellation`

### P6 — feat: blue pick ring for planets + orbit-path highlight for picked bodies

- **User:** planets picked from the find bar should get "the little blue circle
  highlight that you did for satellites"; when a satellite or planet is picked
  "the orbit path should be highlighted too".
- **Root cause:** `updateSatelliteHighlight()` (scene.ts) already implements
  exactly both effects (pulsing blue `0x7fd8ff` ring + orbit line brightened to
  0.95/cyan), but `selectedSatelliteId` is only set for moons
  (`bodyId && moonParent.has(bodyId)`), so planets get neither.
- **Fix:** drive the highlight off the picked **body** (planet or moon), not
  only satellites: in `flyTo`, set `selectedBodyId = bodyId ?? ''`
  (renamed concept: the picked body) and pass it to
  `updateBodyHighlight()` — the existing function generalized: the ring
  appears on the picked body; the ORBIT line brightened is the picked body's
  own line (moon → its orbit; planet → its heliocentric orbit; Sun → none).
  The satellite case stays pixel-identical (ring on the moon, its orbit
  lit). Constellation picks clear `selectedBodyId` (already cleared by P1's
  `flyTo` path — same line).
- **Test:** unit — highlight state selection (which body's ring/orbit is
  armed) is a pure decision function; live CDP: pick Mars → assert
  `orbitEmphasis.visible === true` on Mars and its orbit material color is
  cyan; pick the Moon → same as today.
- **Subject:** `feat(bodies): blue pick ring + orbit highlight for planets and satellites`

## Execution notes

- One feature in the tree at a time: implement → `npx vitest` +
  `npx prettier --check .` + `node node_modules/vite/bin/vite.js build` →
  commit → push → next. Record hashes in a follow-up docs commit (no amend).
- CI runs `prettier --check .` over the whole repo — format touched files
  before each commit.
- Giraffe numbers: coarse best 0.387 (rot −10°, size 35°, RA 5.84, Dec
  67.33); fine grid (0.1°/0.5°) runs in background, final values in P3's
  commit message.
- Live app: headless Chrome on :9222 (chrome-headless-shell), CDP helper
  `/opt/data/cdp.js`; vite preview :4173.
