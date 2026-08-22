# Plan 008 — Label occlusion (S2) + natural planet fly-to (S3)

User queue 2026-08-22, items S2 + S3. Two independent render/camera fixes;
each lands as its own commit.

## S2 — kill constellation-label see-through (label Sprites visible through
planets / satellites in solar-system view)

**Root cause.** Constellation name labels are `THREE.Sprite`s whose material
is built with `depthTest: false` (scene.ts ~1058, comment: "depthTest off so
the sky reads cleanly in front of / behind planets alike"). `depthTest:false`
means the label is drawn regardless of what is in front of it — so when a
planet or satellite sits between the camera and a label on the dome, the
label paints *through* the body. That is the "weird and distracting" see-through
the user reported.

**Why depthTest was off originally.** The labels sit at radius
`CONSTELLATION_RADIUS − 90 = 4710`, just inside the 4800 dome; the background
starfield points sit at r = 5000–8000 (BEHIND them) and the body meshes
(SphereGeometry, `MeshStandardMaterial`, depth-write on) sit well inside. The
original concern was that labels might fight the sky, but the only surfaces
that should occlude a label are the solid bodies — and those are exactly what
the user wants to occlude it now.

**Fix (minimal, targeted).** Enable the depth test on the constellation
label materials: `depthTest: true` (keep `transparent: true`).

- A planet/satellite between camera and label → body writes depth first
  (opaque pass), the label fragment fails the depth test → hidden. Correct.
- No body in the line of sight → label passes (nothing closer in the depth
  buffer) → still visible. No regression.
- Background starfield (r ≥ 5000, behind the 4710 label) never occludes the
  label: the label is closer to the camera, so it wins the depth compare.
- Orbit lines / figure lines / star dots use `depthWrite:false`, so they
  never block labels either.

Scope: ONLY the constellation name labels (`buildConstellations`, the
`labelMat` at ~1056). The body name labels (scene.ts ~421, `depthTest:false`)
are intentionally left alone — they sit on the body and the user did not
report them; changing them risks a different regression.

**Test.** No scene-level three.js test infra exists (pure-math tests only),
so S2 is verified via CDP headless (see Verification): place the camera so a
planet is between the camera and a known constellation label, assert the
label's sprite material has `depthTest === true` (and spot-check the on-screen
result via screenshot size / no console errors). A small unit assertion that
the material is constructed with depthTest on can be added if a cheap scene
hook exists; otherwise the CDP check is the gate.

## S3 — natural planet fly-to: 30–45° tilt + fit planet + satellites + margin

**User (verbatim):** "I don't like this top view… I want something more
natural where we travel to the planet and stop at right distance to see the
full planet + satellites + a safe margin. Feels weird otherwise if it takes
the full screen, even cutoff sometimes."

**Root causes (both in `frameBody`, render/cameraFlight.ts).**
1. **Top-down view.** `frameBody` places the camera at
   `[center.x, center.y + dist, center.z]` — a pure 90° straight-down along
   ecliptic north. Every planet pick lands overhead.
2. **Wrong zoom.** `BODY_FILL = 0.9` → the framed extent fills 90% of the
   view height. For a wide satellite system (or a ringed planet framed to
   its outer ring) 90% is essentially full-screen; with a wide (landscape)
   canvas the *horizontal* extent can exceed the frame → "cutoff". Only the
   vertical fill is considered; the horizontal FOV (which is wider) is
   ignored.

**Fix.**
1. **Tilt to ~38°** (mid 30–45°). Camera offset = distance along a bearing
   with a fixed elevation above the ecliptic:
   ```
   const elev = tan(38°) ≈ 0.78   // elevation/azimuth-plane split
   offset = dist * [0, elev, sqrt(1 - elev²)]   // +Z horizontal bearing, +Y up
   ```
   So `pos = center + dist·[0, 0.78, 0.62]`. Elevation ≈ 38° above the
   ecliptic plane — a natural 3/4 view showing the disc + orbital plane, not
   a top-down. Bearing stays fixed (+Z) for a consistent landing standard
   (same guarantee D2 gave: every pick lands the same way). The flight path
   itself (eased accelerate/cruise/decelerate in `makeFlight`/`stepFlight`)
   is unchanged — that already delivers the "travel to the planet" feel.
2. **Fit with a safe margin, both axes.** Lower `BODY_FILL` to `0.62`
   (~38% headroom) and compute distance from the *wider* of the vertical and
   horizontal constraints:
   ```
   vHalf = fov/2, hHalf = atan(tan(vHalf) * aspect)
   distV = extent / (2 · fill · tan(vHalf))
   distH = extent / (2 · fill · tan(hHalf))
   dist  = max(distV, distH, 0.35)
   ```
   `frameBody` gains an `aspect` param (width/height of the canvas); the
   caller (`camAnchorForBody` in main.ts) passes
   `built.camera.aspect` (or renderer size ratio). This guarantees the full
   planet + all satellite orbits (extent already includes `2·satExtent +
   planet.sceneRadius` / outer ring) land inside the frame with margin on
   ANY canvas aspect, never full-screen, never cut off.

**Callers updated.** `frameBody` is called from `camAnchorForBody` (main.ts
~445) — pass the live aspect. Update the existing `frameBody` unit tests in
tests/cameraFlight.test.ts (the "directly overhead" / "offset is exactly
vertical" assertions now assert the 38° tilt: `pos.y > center.y`,
`pos.z > center.z`, offset NOT purely vertical; distance grows with extent;
wider aspect → distance ≥ narrower-aspect distance for the same extent).

## Verification (both, CDP headless)
- Preview on 4173 + chrome-headless-shell CDP on 9223 (see `classic-sky-plates`
  skill §5). Drive the camera via the `?cam=` param and/or `window.__solar`.
- **S2:** assert the constellation label sprites have `depthTest === true`;
  screenshot a solar-system close-up with a label behind a planet → confirm
  the label is occluded (no console errors).
- **S3:** for each major planet, fly to it and read the landed camera offset
  via `__solar`: elevation ≈ 38° (offset.y/dist ≈ 0.62), and the framed
  extent fills ≤ ~65% of the smaller view axis (margin present). Screenshot
  Jupiter (4 Galilean moons) + Saturn (rings) as the wide-extreme cases.

## Gates & commits
Each feature: Prettier → `lint` → `vitest` → `build` green → **separate
commit** → push → CI green → live verify. S2 first, then S3 (two commits).
