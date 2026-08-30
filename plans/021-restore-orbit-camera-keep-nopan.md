# Plan 021 — restore the OrbitControls camera (180° polar clamp, no Z-roll); keep panning disabled

User decision (2026-08-30, after living with plans 015–018): the **360° free
rotation** (plan 015 P2, `1b054a4`) and the **Z-axis roll** (plan 017 F3 /
018, `5868677` / `338c274`) hurt the experience — rotating over a pole and
having the view roll up fight the flight/tour/framing code and feel chaotic.
The **one good part** was killing the free-view **pan** (plan 017 F3:
`noPan = true`). So:

> **Restore the old `OrbitControls` camera behaviour** (polar angle clamped
> to `[0, π]` — i.e. "blocked at 180°" around the poles, no roll — the feel
> the user had before plan 015), **but keep panning disabled** (`enablePan =
false`), which is the one improvement the user wants to keep.

Everything else from plans 015–020 that is NOT about the free-view
camera/rotation (screen-space labels 016, no-jump emphasis 017 F1, phone
labels 017 F2, selection-anchor + Sun-anchor 017 F4, DPR fix 019, panel
width 020 F2) **stays**.

This is **one user-visible change** (the free-view camera feel) → **one
commit** per the per-feature-commit-discipline skill.

## What "old behaviour" means (measured from `ca46cba`, the pre-015 tree)

Before plan 015 the free camera was `OrbitControls` with:

- `enableDamping = true`, `dampingFactor = 0.08` (scene.ts `ca46cba`:275-277)
- default `rotateSpeed` / `zoomSpeed` (not explicitly set)
- default `enablePan = true`
- **no** `rotateSpeed=4.0 / zoomSpeed=1.2 / dynamicDampingFactor=0.2` (those
  were added to match the trackball in `1b054a4`)
- **no** `noPan`, **no** `rollControls` / `deRollCameraUp`, **no** `handleResize`
- follow mode = `controls.target.lerp(...)` + `controls.update()` (Orbit
  re-derives the eye from the pivot via its spherical state) — NOT the
  rigid camera-shift delta that plan 015 added for the trackball.
- flights: `camera.lookAt` + `controls.update()` on landing, **no**
  `deRollCameraUp` (Orbit keeps `camera.up = +Y` invariant).
- resize: `camera.updateProjectionMatrix()` + `renderer.setSize` only
  (Orbit reads `clientHeight`/`getBoundingClientRect` live per event — no
  cached rect, so no `handleResize` needed).

## The ONE change we keep from the 015–018 era

**Panning is disabled.** Old pre-015 OrbitControls had `enablePan = true`
(right-drag + 2-finger pan + A/S/D keyboard pan). We want the old _rotation_
feel but NOT the free pan — the view centre is the selection, always.

So the new free-view camera is **`OrbitControls` with `enablePan = false`**:

- `enableDamping = true`, `dampingFactor = 0.08` (the original feel)
- **`enablePan = false`** (the one improvement kept)
- default `rotateSpeed` / `zoomSpeed` (original)
- `minPolarAngle = 0`, `maxPolarAngle = π` (defaults) — **the 180° polar
  clamp returns**; the camera cannot pass over either pole, and `camera.up`
  stays `+Y` (no roll).

### Behaviour matrix after this change (all verified against the vendored

`three@0.168.0` OrbitControls source)

| Input                | Before 021 (trackball+roll)                   | After 021 (Orbit, pan off)                                                |
| -------------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| Left-drag / 1-finger | free-axis rotate (rolls up, can cross pole)   | **polar-clamped rotate** (`[0,π]`), no roll, cannot cross pole            |
| Wheel                | dolly zoom                                    | dolly zoom (unchanged)                                                    |
| Right-drag           | **Z-axis roll** (`rollControls`)              | **nothing** (`enablePan=false` → `MOUSE.PAN` gated at OrbitControls:1271) |
| 2-finger             | twist→roll / pinch→zoom race (`rollControls`) | **pinch→dolly zoom** only; pan path gated (OrbitControls:1451)            |
| A/S/D keyboard       | (pan, but `noPan` killed it)                  | **nothing** (`enablePan=false` → key handler `return` at :1343)           |
| Ctrl/Shift+left      | rotate (trackball)                            | **nothing** (`MOUSE.ROTATE`+modifier → `enablePan` gated at :1241)        |

Pinch still zooms because `_handleTouchMoveDollyPan` runs the **zoom** part
independently of `enablePan` (OrbitControls:1004 `if (this.enableZoom)`),
while the pan part is gated (line 1006). So the mobile hint "Pinch: zoom"
stays truthful.

## Ordered commits (1)

### F1 — `revert(camera): restore the OrbitControls free view (polar-clamped at 180°, no roll); keep panning off`

**`src/render/scene.ts`** (4 hunks, exactly the inverse of `1b054a4`):

- L14: `import { TrackballControls } ...` → `import { OrbitControls } ...`
- L28: delete `import { createRollControls } from './rollControls';`
- L169: `BuiltScene.controls: TrackballControls` → `OrbitControls`
- L275-292: replace the `new TrackballControls` + `rotateSpeed=4.0 /
zoomSpeed=1.2 / dynamicDampingFactor=0.2` + `noPan=true` +
  `const roll = createRollControls(...)` block with:
  ```ts
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  // Panning is off: the view centre is the selection, always (the one
  // improvement kept from the plan-015 era — no free right-drag / 2-finger
  // pan). Rotation is polar-clamped [0,π] (no pole crossing, no Z-roll).
  controls.enablePan = false;
  ```
- L563: delete `roll.dispose();` from `dispose()`.

**`src/main.ts`** (remove the 015-P2 trackball-specific camera machinery):

- L121: delete the `deRollCameraUp(1);` call in `advanceSkyTour`.
- L148-156: delete the `_followPrevPivot` scratch + the 5 `_deRoll*` scratch
  vectors/quaternions.
- L171-196: delete the `deRollCameraUp()` function.
- L1716: delete the `deRollCameraUp(easeInOutCubic(...))` call in the flight.
- L1168-1170: delete the `built.controls.handleResize();` in the resize
  handler (Orbit reads bounds live; no cached rect).
- L1758-1772 (follow mode): collapse the rigid Trackball camera-shift delta
  block back to the pre-015 single line
  `if (lockEntry) built.controls.target.lerp(lockEntry.worldPos, 0.2);`
  (Orbit's `update()` re-derives the eye from the pivot, so a target-only
  lerp is the correct free-follow again).
- Cosmetic comment fixes (not behaviour): L348 "hands control back to the
  free TrackballControls" → "…OrbitControls"; L662 "hands the camera back to
  TrackballControls" → "OrbitControls". (Leave all 016/017/019/020 logic and
  comments — labels, no-jump emphasis, Sun-anchor, DPR, panel width.)

**`index.html`** (hints must describe what actually happens — the
plan-020 F1 "roll" hints are now wrong again):

- desktop hint (L610): → `Drag: rotate · Wheel: zoom · Click a body to fly
to it`
- coarse-pointer hint (L626): → `Drag: rotate · Pinch: zoom`

**`src/render/rollControls.ts`** + **`tests/rollControls.test.ts`**: delete
both files (the only consumer was `scene.ts`; nothing else imports them).

**`tests/trackballControls.test.ts`** → **rewrite** as
**`tests/orbitControls.test.ts`** (rename + new assertions, real vendored
`three@0.168.0` OrbitControls driven by a mock-canvas harness). Implementation
drift vs. this draft, all from measurement, not prediction:

- r168 mouse rotate divides by `element.clientHeight` (OrbitControls:713-715)
  → the mock canvas must expose `clientWidth`/`clientHeight` or every rotate
  delta is NaN.
- r168 rotation direction is the OPPOSITE of the old Trackball test's: a
  **downward** mouse drag (y increasing) **decreases** phi (toward the north
  pole); an **upward** drag increases phi (toward the south pole). Damping
  (0.08) decays the pending delta 8% per move, so a short drag never reaches
  the pole — the drags below are sized to actually hit the clamp.
- r168 touch dolly is INCREMENTAL: each move multiplies `_scale` by
  (currentDist/prevDist)^zoomSpeed and re-copies `_dollyStart`, so a 200→400
  px spread over 4 moves lands at total factor 2 → distance ×0.5 (not the
  0.25 a global-ratio model would predict).
- POLE SINGULARITY: once phi is clamped exactly to a pole, one more
  `update()` NaNs `setFromVector3` (atan2(0,0)) — the pole tests assert on
  the state left by the drag's own final update and never call update()
  again; the idle test parks mid-sky instead.

Final tests (all values measured in a probe run):

- **North-pole clamp**: from `[0, 29, 4]` (phi0 ≈ 0.137), 3×80px downward
  left-drag → `getPolarAngle()` ≈ 1e-6 (clamped at 0, `toBeCloseTo(0, 3)`),
  `cam.position.y` stays > 0 (no pole crossing — the deleted trackball test's
  drag flipped it negative), `cam.up.y ≈ 1` (no roll), target untouched.
- **South-pole clamp**: mirror — from `[0, -29, 4]` (phi0 ≈ 3.005), 12×600px
  upward drag → `getPolarAngle()` = π exactly, `cam.position.y` < 0, up
  invariant.
- **Target fixed while rotating**: off-origin pivot `(5, 1, -2)`, 5×80px
  horizontal drag + 200 damping-settle updates → `getDistance()` unchanged
  (rotation orbits at constant radius), pivot fixed, view actually moved.
- **Right-drag does nothing** (plan 021 keeps `enablePan=false`): `button 2`
  drag with 150px of travel → position, target AND `camera.up` all
  unchanged (no pan, no roll — right-drag WAS the Z-roll input in 015–018).
- **Pinch still dollies with pan off**: two synthetic pointers 200 px apart
  spread to 400 px → distance = 0.5× original (incremental factor 2),
  target unchanged — the mobile "Pinch: zoom" hint stays truthful.
- **Baseline sanity**: 3×20px drag rotates (theta and phi both move), up
  invariant.
- **Idle idempotence**: 200 `update()` calls on a parked mid-sky pose →
  position/up drift < 1e-6.

**`AGENTS.md`**: it references the OrbitControls `change` event at L86
("…and the OrbitControls `change` event") which was already correct pre-015
and happens to remain true; no change needed. (No dedicated camera-behaviour
section exists in AGENTS.md — the trackball was never documented there.)

**Test plan / gates** (per AGENTS.md + discipline skill):

- `npx vitest run` — all suites green, incl. the rewritten
  `tests/orbitControls.test.ts`. Pre-existing TS "Cannot find name
  Iterable/Map/Promise" lint noise in the tsc step is ignored (see memory).
- `npm run build` (`tsc --noEmit && vite build`).
- `npx eslint .`
- `npx prettier --write` on every changed file, then `npx prettier --check .`
  (CI runs prettier over the WHOLE repo incl. this plan file — format it).
- **Live verify (headless Chrome + CDP on `vite preview :4173`)** before
  commit, per discipline skill:
  1. Boot pose: `#hint` desktop string is the new one (no "roll", no "pan");
     coarse-pointer string is `Drag: rotate · Pinch: zoom`.
  2. **180° clamp**: `__solar.camera` at a north-pole-ish pose; dispatch a
     long downward left-drag; assert `getPolarAngle()` never exceeds `π`
     and `camera.up.y ≈ 1` (no roll) — the view stops at the pole instead of
     crossing it.
  3. **No Z-roll**: from a known pose, right-drag 100+ px; assert
     `camera.up` unchanged and position/target unchanged (no roll, no pan).
  4. **No free pan**: 2-finger drag / right-drag → the pivot (target) and
     distance stay fixed (r168 two-finger is dolly+PAN, NOT rotate: the
     dolly part is a no-op when the gap is constant, the pan part is gated
     by `enablePan=false`).
  5. **Pinch still zooms**: 2-finger pinch → camera-to-target distance
     changes (zoom works), but target unchanged.
  6. **Follow + flight still correct**: pick a planet → camera tracks it
     (rigid, no whirl); Sky anchor lands level (`up.y ≈ 1`); System anchor
     reframes.
  7. **Resize**: resize the window → no drag-mapping regression (Orbit reads
     bounds live).

## Verification record (2026-08-30, commit `bdcaa8e`)

- Gates: `npx vitest run` 253 passed; `npm run build` ok; `npx eslint .`
  clean; `npx prettier --check .` clean. Pushed to `main`
  (`bd13a8e..bdcaa8e`), Pages auto-deployed.
- Live (headless Chrome + CDP on `vite preview :4173`, each gesture isolated
  in a fresh page load so residual damping never leaks in —
  `/opt/data/audit/p021_live_check.py`), ALL PASS:
  1. left-drag rotates — pos moved 22.6, target drift 0.0, up (0,1,0).
  2. right-drag INERT — pos/target/up all unchanged (default
     RIGHT=MOUSE.PAN, gated by `enablePan=false`).
  3. 2-finger pinch dollies — distance 23.31→47.56, target fixed.
  4. 2-finger pan INERT — pos/target/distance all unchanged.
  5. pole clamp — from `[0,29,4]` (φ0 0.137) a decisive downward drag lands
     at φ ≈ 1e-6, `pos.y` 29.27 > 0 (no pole crossing), up (0,1,0), target
     fixed.
  6. hints — desktop `Drag: rotate · Wheel: zoom · Click a body to fly to
it`, no roll/twist.
- Pre-015 baseline cross-check: `git show ca46cba:index.html` hints were
  `Drag: rotate · Wheel: zoom · Right-drag: pan · Click a body to fly to it`
  (desktop) / `Drag: rotate · Pinch: zoom · Two-finger drag: pan` (coarse),
  and its `scene.ts` controls block is `new OrbitControls` + damping with NO
  `enablePan` — i.e. the original orbit HAD a working free pan
  (right-drag / 2-finger). The "roll" wording never existed in the true
  pre-015 era; it appeared later with the trackball (e.g. `c1517ae`:
  "Twist: roll"). Plan 021 therefore restores the
  original orbit (polar-clamped, up = +Y, no roll) and deliberately KILLS
  the one part the original had — pan — per the user's decision that
  removing the free view was the single good change of the 015–018 era.

## Rollback note

The full prior state (trackball + roll) is intact at `4c367bb` (plan 020 F2).
If the user later wants the 360°/roll back, that is a forward re-do of plan
015 P2 + 017 F3 + 018 — do NOT `git revert` this commit, because it would
also resurrect the free pan (`enablePan=true`) that the user explicitly
wants gone.
