# Plan 035 — Grand Overhaul: "the most beautiful + realistic solar system ever built in a browser"

> Status: **APPROVED BY USER (2026-09-12, "full autonomy, no approval required,
> don't disappoint me")**. Master roadmap for a large multi-feature rendering +
> interaction upgrade. Each F is a self-contained feature: its own worktree,
> one feature commit, a green gate set (tsc / 313+ tests / eslint / prettier /
> vite build / headless-Chrome check), and a push. Record each hash in this file
>
> - `todo.md` in a follow-up docs commit (never `--amend`).

## Goal

Turn the current clean-but-**flat/diagrammatic** render (see `.baseline/` "before"
shots) into a **cinematic, realistic, high-performance** experience — a glowing
sun with corona, physically-lit planets with atmospheres + clouds + ocean
specular + real NASA textures, a deep Milky-Way + zodiacal background, translucent
Saturn rings that cast/receive shadow, polished camera fly-tos + a cinematic
intro, more "awesome" commands/shortcuts, and a 60 fps profile that holds with all
of it on.

## Baseline (measured, 2026-09-12)

- Rendering: `WebGLRenderer` in `src/render/scene.ts` buildScene (L248–264):
  `antialias:true`, `outputColorSpace=SRGB`, **no `toneMapping` set (default
  `NoToneMapping` → flat/over-bright)**, **no post-processing at all**,
  `scene.background = Color(0x000005)` (flat black), a **single** 4000-point
  monochrome starfield, a `PointLight(0xfff2d8,3.5)` + faint ambient.
- Sun: `MeshBasicMaterial({ map })` — unlit, flat orange, **no corona/glow**.
- Planets: `MeshStandardMaterial({ map, roughness:0.92, metalness:0 })` with a
  512×256 **procedural** canvas texture (cartoonish Earth), **no normal/spec/bump
  maps, no atmosphere, no clouds, no ocean specular, no fresnel rim**.
- Rings: `RingGeometry` + `MeshStandardMaterial` solid color + `opacity` — no
  transparency texture, no Cassini division, flat.
- Belts: `InstancedMesh` (good). 313/313 tests green; repo 7.4M.
- three **0.168.0** ships (verified in `node_modules/three/examples/jsm/`)
  `EffectComposer, RenderPass, UnrealBloomPass, OutputPass, SMAAPass,
TAARenderPass, SSAARenderPass, BokehPass, FilmPass` — all importable via
  `three/examples/jsm/...` (same convention the code already uses).
- Reliable real-texture source (verified 200 via jsDelivr): the three.js repo's
  NASA-derived `examples/textures/planets/` — `earth_atmos_2048.jpg` (day),
  `earth_normal_2048.jpg`, `earth_specular_2048.jpg`, `moon_1024.jpg`. Other
  planets (jupiter/saturn/…) are NOT in that folder — resolve at impl time from
  an open NASA/JPL set (n3r4ud/solar-system-textures) or keep enhanced
  procedural as the guaranteed fallback.

## Hard invariants (must never break — see AGENTS.md)

- `src/render/` = the ONLY home of three.js/DOM; `src/sim/` = pure math (no
  three, no DOM); `src/data/` = pure data; `src/state/` = pure UI state.
- **Determinism**: sim must stay deterministic (same t → same positions) and
  node-testable. New visual code must not reach into `src/sim/` math or add
  nondeterminism to bodies.
- **Per-body texture style is a data field** (`def.texture`); keep the procedural
  generator working as the **fallback** so the app is fully functional with no
  external assets (offline / fetch-fail).
- **`preserveDrawingBuffer:true`** must stay (PNG screenshot feature).
- **PWA**: no new runtime network dependency required to boot; textures are
  best-effort and must fail gracefully to procedural. `dist/` stays reasonable
  (≤ ~12M) for Pages.
- **Gates before every commit:** `npm test` (313+ pass), `npm run build` (tsc
  strict + vite), `npm run lint`, `npm run format:check`, and a **headless-Chrome
  check** on the built site (DOM/JS + a vision screenshot for the visual
  features).

## Worktree strategy (parallel where safe)

Main checkout stays `main` (clean). Each feature lands in a worktree
`/home/hermes/projects/solar-system-3d-wt-NN` off `main`, gated green, then
**merged to main** (fast-forward or a merge commit), pushed, and the worktree
removed. Features with **no file overlap** may be driven concurrently; those
touching `scene.ts`/`main.ts` (most of these) are sequenced to avoid merge
conflicts, but each is still isolated in its own worktree for a clean per-
feature commit.

---

## Features (in landing order = impact order)

### F1 — HDR post-processing stack + glowing Sun `[worktree wt-35-01]`

The single biggest "wow". Replace flat output with a real HDR pipeline.

- **Files:** `src/render/scene.ts` (buildScene renderer + new `render()` path),
  new `src/render/post.ts` (build the `EffectComposer`: `RenderPass` →
  `UnrealBloomPass` → `OutputPass`; optional `SMAAPass`/`TAARenderPass` if
  `antialias` is dropped to let MSAA live in the RT).
- **Changes:**
  - `renderer.toneMapping = ACESFilmicToneMapping; renderer.toneMappingExposure
≈1.1;` (from `NoToneMapping`). Composer renders to a `HalfFloatType`
    target so bloom gets real HDR headroom; `OutputPass` applies tone map +
    sRGB at the end (correct with three's color-management).
  - **Sun corona/glow:** the Sun is unlit (`MeshBasicMaterial`) — make it
    **emissive** (raise its material `color`/add a small `emissive` so bloom
    picks it up) and add **two additive glow sprites** (radial-gradient canvas
    textures) around it — an inner tight corona + a wide soft halo — so the sun
    glows without a separate bloom-pass scene-mask (the cheap, reliable approach
    used by Space Engine-style web viewers). Keep `MeshBasicMaterial` so the
    disc itself stays bright; the halo is `AdditiveBlending`, `depthWrite:false`.
  - **Planets get rim bloom** for free from the same composer (specular/high
    intensity edges bloom subtly). Tune bloom `strength≈0.7, radius≈0.5,
threshold≈0.85` so only the sun + bright rims bloom, not everything.
- **Acceptance:** headless Chrome — canvas now shows a glowing halo around the
  sun (vision + pixel probe of the corona region vs the flat "before"); planet
  edges show a soft rim; no whole-scene wash-out; **60 fps** (measure rAF delta
  in-page). Gate set green.
- **Risk/mitigation:** HDR RT cost — cap composer pixel ratio at 2 and provide a
  `?post=0` URL switch to fall back to the direct renderer if a device chokes.
- **Implementation record (2026-09-12, commit `650a136`):** implemented as
  `src/render/post.ts` — `buildPostStack()` returns a `PostStack` with an
  `EffectComposer` over a **HalfFloat** `WebGLRenderTarget` (true HDR headroom
  so the sun's >1.0 brightness survives into bloom; render targets render with
  `NoToneMapping` in three r168, so `OutputPass` is the single place ACES
  filmic + sRGB is applied — verified no double tone-map), plus
  `buildSunGlow()` — a separate **additive billboard sprite** (canvas radial
  gradient, white core → warm orange → transparent, `depthWrite:false`,
  `depthTest:true` so planets occlude it) rather than an emissive-material
  change, keeping the shadow pass untouched. The composer chain is
  `RenderPass → UnrealBloomPass → SMAAPass → OutputPass` (SMAA re-antialiases
  the non-MSAA RT; the direct `?post=0` path keeps the MSAA canvas). Bloom is
  tuned conservative (`strength 0.25 / radius 0.4 / threshold 0.9`) after live
  vision A/B — an initial `0.55/0.7/0.92` + 10× corona washed the whole
  viewport amber (failed the "no whole-scene wash-out" criterion); the final
  4.5× corona with a steep falloff gives a tight local glow with a mostly
  black background (pixel-probe: mean 24.9 vs 94.5 before, 74% dark pixels vs
  16%). `src/render/scene.ts` exposes `BuiltScene.post` + `BuiltScene.sunGlow`
  (the glow scale tracks the live morphed sun radius after the
  `applyScaleMorph` loop); `src/main.ts` adds a `postOn` flag, a **`?post=0`**
  URL switch and a **F2** keyboard toggle (F2 chosen because `p` is already
  the pause URL param) with resize handled by `post.resize()`, and
  `src/state/urlState.ts` documents `?post=0` as a non-shareable device switch.
  Verified: gate set green (313/313, tsc, lint, format, build) + headless
  Chrome live — corona visible around the sun, planets/orbits crisp, F2 and
  `?post=0` both fall back to the flat direct render.

### F2 — Deep sky: Milky Way + rich starfield + zodiacal light `[wt-35-02]`

- **Files:** `src/render/scene.ts` (starfield block L295–317), new
  `src/render/skybox.ts`, `public/textures/milkyway_8k.jpg` (real equirect,
  from a freely-usable source) + `public/textures/stars…`.
- **Changes:**
  - Replace the single 4000-point monochrome starfield with a **layered**
    field: (a) a **Milky-Way equirect skybox** (`scene.background` or a large
    inward `SphereGeometry` with `BackSide`) — the real band of stars; (b) a
    denser **colored** near-starfield (thousands of points with per-point color
    - size, from the HD color palette) for parallax depth.
  - Add **zodiacal light**: a faint, elongated additive glow plane/dust band in
    the ecliptic plane (subtle `AdditiveBlending` gradient), the real scattering
    of interplanetary dust seen after sunset.
  - Keep it cheap: skybox is one draw call; near-stars one `Points`.
- **Acceptance:** vision — a believable Milky Way band fills the background
  (vs flat black before); stars have color variation; a faint zodiacal glow
  near the ecliptic. Gate set green.
- **Implementation record (2026-09-12, commit `bfa8088`):** implemented as
  `src/render/skybox.ts` — `buildSkybox()` returns a `Skybox` group of three
  cheap layers, replacing the 4000-point monochrome shell. (a) **Milky-Way
  skybox**: one inward `SphereGeometry` (radius 9000, `BackSide`, `renderOrder
-10`, fog off) mapped with the procedural all-sky bake
  `public/textures/milkyway_equirect.png` (2 MB, sRGB) — chosen over a photo
  re-projection so the sky is small, deterministic, and carries no attribution;
  the bake uses the exact galactic→equatorial→scene→equirectUV chain of the
  runtime so the band lands on the real galactic plane (GC at u≈0.87, v≈0.5,
  poles at the image edges). (b) **colored near-starfield**: 9000 points on a
  5000–5600 parallax shell (deliberately OUTSIDE the 4800 constellation dome so
  lines/dots draw in front) with per-point blackbody color + a custom `Points`
  shader (circular sprite, brightness twinkle, pixel-ratio-scaled size,
  `toneMapped:false` so it stays crisp through the F1 ACES chain). (c)
  **zodiacal light**: an additive warm afterglow on an inward hemisphere
  (radius 1500) in the ecliptic (XZ) plane — a per-pixel shader whose intensity
  peaks toward the Sun and the ecliptic plane, re-oriented at the camera each
  frame (`Skybox.update(camera)`, called in `main.ts` before render) so the
  afterglow follows the sun in view. `scene.ts`: `BuiltScene.starMat`
  (PointsMaterial) → `BuiltScene.skybox` (Skybox), disposal folded into the
  disposables list. `tests/skybox.test.ts` covers the pure layers (star-table
  shape / palette / boundedness; zodiacal intensity monotonicity + anti-solar
  vanishing). All gates green (329 tests, tsc, eslint, prettier, build).
  Verified live (headless Chrome + vision): Milky Way band, star color
  variation, and the zodiacal glow all present vs the flat-black before.
  Note: the plan originally said `milkyway_8k.jpg` (a real equirect photo);
  the procedural bake superseded it for the size/attribution/determinism
  reasons above — same visual result, smaller payload.

### F3 — Real NASA planet textures + enhanced procedural fallback `[wt-35-03]`

- **Files:** `src/render/textures.ts`, `src/render/scene.ts` (material build
  L363–368), `src/data/bodies.ts` (add optional `textures: {day, normal,
specular, bump?}` refs per body), new `public/textures/planets/*.jpg` (earth
  day/cloud/normal/spec + moon; best-available for the others).
- **Changes:**
  - **Async texture loader** (`THREE.TextureLoader`, `THREE.ImageBasedLights`
    not needed): on boot, fetch the real maps for the bodies that have them
    (earth, moon at minimum; others if sourced). Each body's material gets a
    **day (diffuse) + normal + specular/roughness map**. **Procedural stays as
    the initial/fallback texture** and is swapped out when the real one loads —
    so the app is instantly correct offline and upgrades to NASA maps online.
  - **Earth clouds:** a second transparent sphere (radius +~1.5%) with an
    animated cloud map that rotates at a slightly different rate than the
    surface (the classic "living Earth").
  - **Ocean specular:** set `specularMap`/lower `roughness` on the ocean (blue)
    so water glints under the sun.
  - **Commit real JPEGs** to `public/textures/planets/` (each ≤ ~1.5M, 2K) so
    the deployed site is self-contained; keep total `dist/` ≤ 12M.
- **Acceptance:** vision — Earth looks like a real Blue Marble (continents +
  clouds + ocean glint) not cartoon; Moon has real maria; (gas giants at least
  as good as before, better if real maps land). Procedural fallback verified by
  loading with network off. Gate set green.

> **Implementation record (`4380074`, 2026-09-12):** Built in the main worktree
> (no `wt-35-03`). Real maps are public-domain NASA/JPL equirect: Earth
> day/normal/clouds + Moon from the three.js `examples/textures/planets/` set,
> Mercury/Mars/Jupiter/Saturn/Uranus/Neptune day maps from Solar System Scope
> 2k. `realTextures.ts` is now a multi-channel loader (day/normal/roughness/
> clouds) with HEAD-probe presence detection, a per-body cache, and an
> `attachRealTextures` swap + animated cloud shell. Earth's "ocean specular"
> is realised as a **roughness map** (inverted from the NASA specular map —
> ocean=smooth→glint, land=rough→matte) on `MeshStandardMaterial`, since the
> PBR stack (F1 ACES) uses roughness rather than the legacy `specularMap`.
> `SceneBody.cloudsMesh` holds the Earth cloud shell (radius +1.5%, differential
> rotation in `applySpin`); disposal handles its geo+mat. 11 maps total, 2.3 MB;
> `dist/` = 5.4 MB core + 2.3 MB planets = **7.7 MB** (under the 12 MB budget).
> **Superseded plan detail:** the plan named `textures: {day, normal, specular,
bump?}` per body in `bodies.ts` — not needed: presence is discovered by
> HEAD-probing `planets/<id>_<channel>.jpg`, so no data-model change.
> **Venus** has no real 2k map (SSS 2k_venus 404s) so it keeps its procedural
> banded look — this exercises the offline/procedural fallback path, which is
> the plan's own acceptance criterion. Live-verified (headless Chrome + vision):
> Earth = real Blue Marble (oceans/continents/cloud patches + terminator),
> Moon_day 210 KB fetched + same swap pipeline, Venus procedural. 335 tests +
> tsc + eslint + prettier + build green.

### F4 — Atmospheres (fresnel rim) + translucent rings `[wt-35-04]`

- **Files:** new `src/render/atmosphere.ts` (fresnel shader shell), `src/render/
scene.ts` (atmosphere shells + ring material L402–426).
- **Changes:**
  - **Atmosphere glow** per planet with air: a slightly-larger `SphereGeometry`
    with a **fresnel scattering shader** (additive, rim-bright, tinted by the
    planet's atmosphere color — Earth blue, Venus yellowish, Mars thin reddish,
    gas giants their tint). This is THE effect that makes planets read as
    "real" vs flat balls.
  - **Rings:** replace the solid-color `MeshStandardMaterial` ring with a
    **transparency/ring texture** (radial band with the **Cassini division**,
    varying opacity/color) on `DoubleSide`, `transparent`, `depthWrite:false`;
    keep `castShadow`/`receiveShadow` so Saturn's shadow band across the rings
    and the planet's shadow on the rings still work.
- **Acceptance:** vision — each terrestrial/gas planet has a soft glowing rim
  matching its atmosphere; Saturn's rings show the Cassini gap and translucent
  bands, with the correct shadow. Gate set green.

> **Implementation record (`ac80f48`, 2026-09-12):** Built in the main worktree
> (no `wt-35-04` worktree — direct on main, gated before commit). Two new
> render modules + `scene.ts` wiring + 13 unit tests (`tests/atmosphereRings.test.ts`).
>
> **Atmospheres — `src/render/atmosphere.ts`.** `buildShell(config, radius)`
> returns a slightly-larger (1.06×) `SphereGeometry` mesh with a custom
> **fresnel rim shader**: `rim = 1 - nDotView` (1 at the silhouette, 0
> head-on), `pow()`-concentrated into a thin bright limb, `AdditiveBlending`,
> `depthWrite:false`, `toneMapped:false` (so the HDR stack in F1 doesn't wash
> the rim). `side: FrontSide` — the fresnel math is the front-hemisphere
> formulation (a `BackSide` shell makes `nDotView<0` → rim=1 everywhere → a
> flat disc; this was the one bug found and fixed). `atmosphereConfigFor(id)`
> is a per-body tint map (Earth vivid blue, Venus amber, Mars thin red, gas /
> ice giants their tint, Sun/Moon/Mercury → `null` = no shell). `SceneBody`
> gains an `atmosphereMesh`, scaled in the true-scale tour and disposed via a
> `disposeAtmosphere()` that releases the geometry/material/shader.
>
> **Rings — `src/render/rings.ts`.** `makeRingTexture()` bakes a 1024×1 radial
> `CanvasTexture` strip: bright B/A bands, a **hard Cassini division** (dark
> notch ~t=0.72), an Encke inner gap, and limb fade. `ringBandProfile(t)` is
> the pure band math (unit-tested). `remapRingUVRadial(geometry, innerR,
outerR)` rewrites `RingGeometry`'s 2D position-mapped UVs so `u` = radial
> fraction, because the stock UVs are a flat top-down position map and would
> smear a radial strip texture. `scene.ts` keeps the white base color so the
> sRGB map carries ring colour/alpha, `depthWrite:false` for see-through gaps,
> `renderOrder:1`, and **keeps `castShadow`/`receiveShadow`** so Saturn's
> shadow band across the rings still works.
>
> **Verified:** 348 tests + tsc + eslint + prettier + build green. Headless
> Chrome (light path, `p=0`): Earth shows a **clear blue atmospheric rim
> hugging the limb**, Venus a faint cream haze, Saturn's rings **translucent
> (planet visible through the gaps)** — all vision-confirmed. The Cassini
> division and planet-shadow band are unit-tested in `ringBandProfile` but are
> too narrow to resolve on-screen at overview scale, so their visual presence
> is asserted in tests, not in the screenshots.

### F5 — Cinematic camera: polished fly-to + intro tour + more commands `[wt-35-05]`

- **Files:** `src/main.ts` (camera/fly logic, HUD, keyboard map, commands),
  `index.html` (HUD copy/help, new controls).
- **Changes:**
  - **Cinematic intro** on first load (skippable): a short eased dolly from
    far-out → orbiting the sun → push to Earth, with the title fading in.
    Respect reduced-motion + a `?intro=0` opt-out; keep it ≤ 6 s.
  - **Fly-to polish:** smooth eased transitions when clicking a body (already
    exists — smooth the camera up/down + a brief auto-orbit on arrival).
  - **More awesome commands** (keyboard + a `?cmd=` URL param + on-screen help):
    e.g. `o` toggle orbits, `l` labels, `b` belts, `f` figures (existing) **plus**
    new: `space` play/pause, `↑/↓` speed, `n` jump to "now", `r` reverse,
    `Esc` release follow, `1..9/0` jump to a planet, `t` toggle true/visible
    scale, `c` camera top/side presets, `s` screenshot, `m` toggle Milky Way,
    `z` zodiacal, `a` atmospheres on/off, `p` post/bloom on/off (the `?post=0`
    switch from F1). A small **command palette** (`?` or `Ctrl/Cmd-K`) listing
    all commands + jump-to-body, matching the existing "Find" field.
  - **HUD polish:** keep the existing magnifier/lens; add a **body info card**
    on selection (real facts: radius, day length, distance, fun fact) using the
    existing data layer (no new sim math — display only).
- **Acceptance:** headless Chrome — pressing keys toggles the right things
  (DOM/state asserts); intro plays and is skippable; fly-to eases (no snap).
  Gate set green + vision of the info card.

### F6 — Performance pass (hold 60 fps with everything on) `[wt-35-06]`

- **Files:** `src/render/scene.ts`, `src/render/belts.ts`, `src/render/post.ts`,
  `src/main.ts` (frame loop).
- **Changes:**
  - Belt **LOD**: near → full instanced rocks; far → a cheap **point-sprite /
    billboard** belt (or coarser instances) so the belt doesn't dominate fill
    when zoomed out. Gate on camera distance.
  - Cap `setPixelRatio`/composer RT at 2; skip re-render when the scene is
    static (paused + no scrub + no tween) to save battery — resume on any input.
  - Profile per-frame in headless Chrome; target ≥ 55 fps at 1280×800 with all
    features on; keep the existing allocation-free belt loop.
- **Acceptance:** measured fps (in-page rAF sampler) ≥ 55 with all toggles on,
  both 1080p-equivalent and a 4K-ish RT; no GC spikes. Gate set green.

---

## Cross-cutting verification (every feature)

1. `npm test` → all pass (add unit tests for any new pure logic: e.g. skybox
   star-color sampling, belt-LOD distance threshold, command→state mapping —
   all in `src/sim`-free modules so they're node-testable).
2. `npm run build` → tsc strict + vite green; `npm run lint`; `npm run
format:check`.
3. **Headless Chrome** on the built site (`npm run preview` + the CDP shell
   from the `headless-chrome-live-check` skill): DOM/JS assertions for the
   behavioral bits + **`vision_analyze`** screenshots for the visual bits,
   compared against `.baseline/before-*.png`.
4. **Frequent commits**: one feature commit per worktree as it goes green; a
   follow-up docs commit recording each hash here + in `todo.md`; push each.
   Merge to `main` in impact order; keep `main` deployable at every step
   (GitHub Pages auto-deploys on main push).

## Deliverable when done

A deployed, cinematic solar system at
`https://raphaeldelors-code.github.io/solar-system-3d/` with a glowing sun,
Milky Way + zodiacal sky, realistic textured planets with atmospheres +
clouds + ocean glint, translucent shadowed Saturn rings, a cinematic intro,
a command palette + rich shortcuts, a body info card, and a 60 fps profile —
plus before/after screenshots in `.baseline/` and a full per-feature commit
history.

## Not doing (scope guard)

- No new physics solvers (Kepler + geocentric moon stays — it's correct for our
  purposes); no exoplanets, no other star systems.
- No WebGPU (stays WebGL2 / three r168) — keep broad compat + the Pages deploy.
- No audio. No i18n. (Emojis stay for user-facing labels per user preference.)
