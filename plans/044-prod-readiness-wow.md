# Plan 044 — Prod-Readiness + Wow (the 100-point push)

_Compiled 2026-09-17 from three specialized LLM-judge reviews (engineering,
features/data/rendering, design/UX/market). Full findings in `.judge/`:
`engineering.md`, `features.md`, `design.md`. One feature per commit, gates
green before each (per AGENTS.md + per-feature-commit-discipline)._

## Grades (honest, sellable-context)

| Dimension                    | Judge                       | Grade      | One-line verdict                                                                                                                                                               |
| ---------------------------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Engineering / prod-readiness | staff engineer              | **72/100** | Great-but-not-commercial: real invariants + ground-truth tests, but a 3.5k-line god-file, zero DOM/E2E coverage, SW bugs, no telemetry/i18n, and unresolved GPL/ESA licensing. |
| Features / data / rendering  | product lead + celestronomy | **68/100** | Elite core (JPL-validated ephemeris + events + scrubbing ≈ 90), thin periphery (no named stars, DSOs, satellites, exoplanets, live data; sun is a billboard, stars are fake).  |
| Visual / UX / market         | product designer            | **64/100** | Functional-clean, not premium: generic type, ad-hoc color, absent branding, and the **scene** (the actual product) is the 50-point weak link.                                  |

**Composite ≈ 68/100.**

### The convergent insight (all three judges agree)

1. **The 3D scene is the weak link, not the chrome.** The panel is a 65–70;
   the scene is a 50. The scene is what gets screenshotted and shared. The
   single most-viewed object — the **Sun** — is a static radial-gradient
   billboard (`buildSunGlow`, `post.ts`), not a star.
2. **The ephemeris + event engine + time-scrub is the moat.** No free web app
   does this well. Marketing must lead with it — but the _first 10 seconds of
   pixels_ currently undersell it (the intro never shows the time-scrub).
3. **The sky is decorative, not a catalog.** 9k procedural fake stars, no named
   stars, no DSOs, no live data. A real starfield (Gaia) + live data (ISS,
   Horizons, NOAA) is the biggest data upgrade.
4. **Legal is the decisive commercial blocker.** Stellarium constellation art
   is GPL-3.0; the Milky Way equirect may carry ESA/Hubble rights. Selling
   without a per-asset license ledger is a litigation risk.

### Discovery questions (owner to answer; defaults assumed for the autonomous loop)

1. **Buyer?** → assume _curious general public + hobby astronomer_ (web-first PWA).
2. **Is the time-scrub the hero?** → **yes** (it's the unique differentiator).
3. **Monetization?** → assume _freemium web_ (live data / exoplanets = paid tier later).
4. **Renaming / logo?** → assume **yes, open** (front-runner: _Orrery_); keep 🪐 stopgap.
5. **Hardware floor?** → assume _2019 mid-range phone ≥ 30 fps_ (drives quality tier + bundle budget).
6. **Live-data offline split?** → assume _live mode needs network; offline uses Table 2a_ (acceptable).

> These defaults are assumptions, not owner decisions. If the owner answers
> differently, the phase ordering below re-sorts.

---

## Phase A — Scene wow (the weak link; highest visual impact)

**A1. Sun shader — animated photosphere + limb darkening + HDR corona.**
The #1 item across all three judges. The Sun is the most-viewed object and
currently a glow blob. _What:_ replace the unlit disc + static sprite with a
procedural sun shader — FBM-noise photosphere (slowly evolving granulation),
a limb-darkening term (brighter center, darker edge), and a physically-toned
corona (keep the existing additive sprite as the outer halo, add an inner
animated rim). _Why:_ lifts every screenshot; the single biggest perceived-value
win. _Effort:_ M. _First step:_ a `ShaderMaterial` on the sun sphere with a
`uTime` uniform driving 3-octave FBM in the fragment shader + a
`dot(normal, viewDir)` limb-darkening term; feed the existing bloom (raise the
sun's HDR contribution so it "sings" without washing the sky — the 0.32/0.3/0.96
bloom was tuned down for wash-out, so gate the sun's emissive, not the bloom).
_Gate:_ no per-frame alloc (uniform-only update), `?post=0` fallback still works,
disposal in `rebuildScene`.

**A2. Earth night lights + animated clouds.** "Earth at night" is the most-shared
space image. _What:_ add a night-emissive map (NASA Black Marble, public domain)
to the Earth material, blended by sun angle (day/night terminator); scroll the
existing cloud texture UV for slow weather motion. _Effort:_ S–M. _First step:_
night-emissive map + a `dayNightMix` driven by the sun direction in the Earth
material.

**A3. Lens flare + subtle DOF post passes.** The cinematic layer that makes
screenshots go viral. _What:_ a lens-flare pass gated on sun visibility + a
subtle bokeh/DOF toggle (off by default). _Effort:_ S. _First step:_ add a
flare pass to `buildPostStack`, gated on the sun being in-frame and above the
horizon.

**A4. Real Saturn ring texture.** Replace the uniform-color annulus with the
Cassini ring map (public domain) + per-ring opacity variation so the planet's
shadow reads across the real ring structure. _Effort:_ S. _First step:_ a ring
radial-alpha texture sampled by ring radius.

**A5. Planet label redesign.** Overlapping translucent boxes (Mercury's label on
the Sun) read as a bug. _What:_ offset labels with a thin leader line, fade by
distance, de-collide (the max-8 rule already exists — extend it to leader lines).
_Effort:_ M. _First step:_ leader-line offset + distance fade in the label overlay.

**A6. Cinematic camera easing + intro ends on the time-scrub.** The unique wow
is buried. _What:_ spring/cinematic easing on fly-to; restructure the intro so it
_ends_ on the timeline — camera settles, the strip glows, time visibly
accelerates, an eclipse marker pops. _Effort:_ M. _First step:_ the intro tail
(auto-glow timeline + auto-accelerate + one event marker).

## Phase B — Real data (differentiators; no free web competitor has these)

**B1. Live ISS + satellite tracking (SGP4 + CelesTrak TLEs).** Instant "oh wow",
zero license risk (public domain). _Effort:_ S. _First step:_ pure-TS SGP4 in
`src/sim/sgp4.ts` + unit test against a known TLE epoch; render ISS as a body.

**B2. JPL Horizons live mode.** Makes the "most accurate" claim live and extends
tracking to any asteroid/comet/spacecraft. _Effort:_ M. _First step:_ one
Horizons query for the Moon at "now", diff against Meeus, display both.

**B3. Real starfield from Gaia (1M-star extract).** Replaces fake stars with the
actual sky — named bright stars, real magnitudes, real Milky Way alignment. The
biggest visual+data upgrade. _Effort:_ L (data pipeline) / S (render). _First
step:_ TAP query for the ~100k brightest (V<9), bake to a compressed binary,
render as points with magnitude→size + twinkle + diffraction spikes on the
brightest ~200.

**B4. SBDB body-facts panel.** Makes every body clickable with real data
(diameter, mass, discovery). _Effort:_ S. _First step:_ one SBDB REST call per
picked body, a facts card in the panel.

**B5. Space weather + aurora shader (NOAA Kp).** Live, dynamic, shareable.
_Effort:_ S. _First step:_ fetch Kp JSON, render a shader band at high latitudes
when Kp>5.

**B6. Exoplanet Archive scene.** 5,700+ confirmed exoplanets; no free web solar
system has this; strong press hook. _Effort:_ M. _First step:_ CSV export of
confirmed planets with orbital elements, a separate "exoplanets" mode.

**B7. Named asteroids + comets (SBDB/MPC).** Turns the decorative belt into real,
named, trackable bodies (Halley, Bennu). _Effort:_ M. _First step:_ top-100 named
asteroids + 20 periodic comets as `BodyDefinition` entries.

**B8. Photo mode + APOD daily panel.** Photo mode = shareability engine (branded
PNG export); APOD = daily return hook. _Effort:_ S. _First step:_
`renderer.domElement.toDataURL()` with `preserveDrawingBuffer` on the composer
target + a "Today" card.

## Phase C — Premium UX / branding

**C1. Real type system + documented color palette.** system-ui + ad-hoc hexes is
the #1 "cheap" tell. _What:_ a display face for title/intro/HUD + a clean text
face for the panel; define CSS custom-property tokens for the full palette; kill
the green date color (it clashes). _Effort:_ M. _First step:_ pick a display face

- define `:root` tokens, migrate the panel.

**C2. 3-step first-run onboarding.** A first-timer currently reads a key map.
_What:_ a dismissible 3-card coach overlay after the intro (1. drag to look, 2. click a planet to fly, 3. scrub the timeline). _Effort:_ M.

**C3. Timeline discoverability + speed-slider tick labels.** The differentiator is
a quiet 5px line. _What:_ a one-time "drag to travel through time" pulse + a
bolder strip; tick labels on the log speed slider (1 hr/s · 1 d/s · 1 mo/s).
_Effort:_ S.

**C4. Accessibility gaps.** Raise 10px header/label contrast to 4.5:1; gate
intro/flights/scrub-pulse behind `prefers-reduced-motion`; a keyboard path to
scrub time + fly to a body. _Effort:_ M.

**C5. Name + logo + icon (drop the horse).** "Solar System 3D" + 🐎 is unownable
and incoherent. _What:_ shortlist names (front-runner _Orrery_), a designed mark,
a bold centered high-contrast icon that survives 48px, store assets, a tagline
that leads with time ("Travel through 10,000 years of the solar system — in your
browser"). _Effort:_ M.

## Phase D — Engineering / prod-readiness (the commercial blockers)

**D1. Asset licensing ledger (LEGAL BLOCKER — do before any sale).** Inventory
every file in `public/textures/` + `figures.ts` with source URL + license. For
the 85 Stellarium "western" illustrations: replace with public-domain/CC0 art,
re-draw, or accept GPL + open-source the app. Add a LICENSE + attribution page.
_Effort:_ M (art swap) / L (legal review). _First step:_ the provenance ledger.

**D2. Split the `main.ts` god-file (3,491 lines).** Extract `frameLoop.ts`,
`scrub.ts`, `searchUi.ts`, `eventsPanel.ts`, `contextLoss.ts` behind
`createX(deps)` factories. _Effort:_ L. _First step:_ move `frame()` + its state
vars into `src/app/frameLoop.ts`.

**D3. Browser E2E (Playwright).** The entire DOM/render layer is untested.
_What:_ boot the built app, assert scene renders, URL round-trip, search pick,
context-loss overlay, offline reload via SW. _Effort:_ M. _First step:_ one smoke
spec against `vite preview` in CI.

**D4. Fix the service worker.** Hash the SW filename at build (or inject a build
version), cap/evict the runtime cache (LRU / per-deploy prefix), add an `error`
handler, add an offline fallback page. _Effort:_ M. _First step:_ move `sw.js`
into the Vite build so it's content-hashed.

**D5. Bundle diet + CI size budget.** 775 kB raw / ~250 kB gz is a first-load tax
on the target phones. _What:_ dynamic-import the intro/post/constellation-label
paths, set a CI budget (fail > 800 kB raw). _Effort:_ M. _First step:_
`vite build --report` + move `post.ts` behind `import()`.

**D6. WebGL-availability guard + low-end quality tier.** try/catch renderer
creation with a fallback message; a quality tier (shadows off, DPR 1, belt count
↓) auto-selected from `deviceMemory`/fps sampling. _Effort:_ M. _First step:_
the try/catch (S).

**D7. Telemetry (privacy-first).** Error reporting + a few counters (install
rate, context-loss events, fps histogram), opt-in, with a privacy policy.
_Effort:_ M. _First step:_ `window.onerror`/`unhandledrejection` → POST, behind
a consent flag.

**D8. CI hardening.** Run the gate on PRs (not just push-to-main), add a
post-deploy smoke check (fetch `/` + `sw.js`, assert 200), add the bundle budget
from D5. _Effort:_ S. _First step:_ add `pull_request` to the `on:` trigger.

**D9. i18n foundation.** Extract UI strings into a message catalog (en + one more
locale as proof), `lang` from `navigator`. _Effort:_ M. _First step:_
`src/i18n/strings.ts` with `t(key)` used in the control panel.

**D10. Pause-on-`visibilitychange` + listener audit.** Stop sim/GPU work when the
tab is hidden; tag every `addEventListener` in `main.ts` with its teardown (or an
`AbortController` per subsystem). _Effort:_ S. _First step:_ one `AbortController`
for all page-level listeners.

---

## Execution order (autonomous loop)

Start with **A1 (Sun shader)** — highest visual impact, self-contained, no data
or license dependency, clean per-feature commit. Then A2–A6 (scene), B1–B8
(data), C1–C5 (UX/brand), D1–D10 (engineering). Re-run the 3 judges after each
phase to re-grade and confirm the score is climbing toward 100.

- [x] A1 Sun shader (animated photosphere + limb darkening + HDR corona)
- [x] A2 Earth night lights + animated clouds
- [x] A3 Lens flare + subtle DOF
- [x] A4 Real Saturn ring texture
- [x] A5 Planet label redesign (leader lines, de-collide)
- [x] A6 Cinematic camera easing + intro ends on time-scrub
- [x] B1 Live ISS + satellite tracking (SGP4 + CelesTrak) — e9790c4, deployed 16318b2
- [x] B2 JPL Horizons live mode — 8b007be (baked DE441 snapshot + Meeus diff in Moon info card)
- [ ] B3 Real starfield from Gaia (1M-star extract)
- [ ] B4 SBDB body-facts panel
- [ ] B5 Space weather + aurora shader (NOAA Kp)
- [ ] B6 Exoplanet Archive scene
- [ ] B7 Named asteroids + comets (SBDB/MPC)
- [ ] B8 Photo mode + APOD daily panel
- [ ] C1 Real type system + color palette
- [ ] C2 3-step first-run onboarding
- [ ] C3 Timeline discoverability + speed-slider tick labels
- [ ] C4 Accessibility (contrast, reduced-motion, keyboard scrub)
- [ ] C5 Name + logo + icon (drop the horse)
- [ ] D1 Asset licensing ledger (legal blocker)
- [ ] D2 Split main.ts god-file
- [ ] D3 Browser E2E (Playwright)
- [ ] D4 Fix the service worker
- [ ] D5 Bundle diet + CI size budget
- [ ] D6 WebGL guard + low-end quality tier
- [ ] D7 Telemetry (privacy-first)
- [ ] D8 CI hardening (PR gate, deploy smoke)
- [ ] D9 i18n foundation
- [ ] D10 Pause-on-visibilitychange + listener audit
