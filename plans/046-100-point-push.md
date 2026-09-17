# Plan 046 — The 100-Point Push (post-044)

_Compiled 2026-09-17 from three specialized LLM-judge "grill me" reviews.
Full findings in `reviews/`: `046-code-practice.md`, `046-features.md`,
`046-look.md`. One feature per commit, gates green before each (per
AGENTS.md + per-feature-commit-discipline). Plan 044 (D1–D10) is COMPLETE —
this is the next push._

## Grades (honest, from the three judges)

| Dimension                | Grade      | One-line                                                                                                                                                                                                        |
| ------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code practice            | **62/100** | Solid pure sim/data core; the 3315-line `main.ts` shell + untested render path + 1.2 MB eager bundle are the liability.                                                                                         |
| Features / data / market | **76/100** | Elite orrery core (JPL-validated ephemeris + event engine + time-scrub) is the moat — but still a _toy orrery_, not an _astronomy app_ (no local sky, no named stars, no DSOs, no spacecraft, no monetization). |
| Look / 3D rendering      | **62/100** | Competent engineering, mid-tier look. Reads as "three.js demo", not Space Engine. One hero shot (Earth at night) closes ~60% of the perceived gap.                                                              |

**Composite ≈ 67/100.** The app is a credible, well-engineered orrery with a
genuine data moat. It is NOT yet "the coolest solar-system app on the market"
or a sellable product — the gaps are real and specific. The path to ~90+ is
below.

> **Credibility landmine (fix first):** the hero tagline "travel through
> 10,000 years" overpromises — the planet ephemeris is JPL Table 2a, valid
> **1800–2050** (250 yr). Ground-truth tests pin ±1500 yr, but the shipped
> table is not. An astronomer will fact-check this in the hero. Either extend
> the ephemeris or fix the tagline.

---

## Consolidated top-10 (cross-dimension, by grade-impact ÷ effort)

1. **Local-sky mode** (GPS + horizon + "what's up now" from the user's
   position) — closes the #1 gap vs every premium astronomy app; converts
   orrery → astronomy app. `L`
2. **Earth-at-night hero** (city lights + cloud layer + Rayleigh limb,
   reachable by clicking Earth) — the single biggest _visual_ wow; closes
   60% of the look gap. `M`
3. **Spacecraft** (Voyager 1/2, Parker, JWST, New Horizons — baked SPK
   snapshots, same pattern as `horizonsMoon.json`) — instant press +
   shareability, almost free given existing bake-and-interpolate infra. `S`
4. **Named stars + info cards** (re-bake BSC5 with names/spectral/distance;
   click-to-info) — the sky gets _destinations_; data already in hand. `S`
5. **Real NASA/USGS texture pack** (all planets + Moon via the existing
   `realTextures.ts` hook) — the #1 "toy" visual tell; plumbing built. `S`
6. **Fix tagline/ephemeris mismatch** — credibility with the exact audience
   that fact-checks; de-risks everything. `S` (tagline) / `M` (data)
7. **Split `main.ts` into feature modules** behind a small app-state object —
   the #1 maintainability + testability risk. `L`
8. **Messier 110 DSO markers** (RA/Dec, type, mag, Hubble sprites,
   searchable) — deep-sky objects are table stakes. `M`
9. **Granular quality tiers + watchdog recovery** (keep bloom on `low`, drop
   SMAA/DPR first; let the fps watchdog recover, not just downgrade) — no
   jarring cliffs. `S`
10. **Monetization: one-time Orrery+ unlock** ($4.99–9.99, gating local-sky
    eclipse sim + DSOs + exo-v2 + 10k-yr ephemeris) + event push — without it
    the app is a demo, not a product. `M`

---

## Numbered work items

### A. Credibility + quick wins (do first — cheap, de-risk)

- [x] **A1. Fix the tagline/ephemeris mismatch.** DONE 2c78647 — chose option (a):
      all 6 tagline occurrences ("10,000 years" → "250 years") + a "Data &
      accuracy" note in the About dialog naming the NASA/JPL source (Standish &
      Williams 1992), the 1800–2050 validity window, and that out-of-window
      scrubbing is Kepler extrapolation (illustrative, not precise). User
      directed "take the best decision"; (b) extend-ephemeris was rejected
      (network-blocked in this env + questionable ±10,000yr accuracy). E2E
      13/13. Deployed d24b31a.
- [ ] **A2. Resolve the constellation-art GPL-2.0 license.** The Stellarium
      "western" figures are GPL-2.0; shipping them in a proprietary app is a legal
      blocker. Options: (a) replace with CC0/own figures, (b) re-illustrate, or
      (c) accept GPL for the whole app (kills monetization). Decide + act.
      _Effort: M (decision is S)._
- [ ] **A3. Real NASA/USGS texture pack.** Wire real day/normal/roughness maps
      for all 8 planets + Moon through the existing `realTextures.ts` hook (Earth
      already has clouds + night-lights). The #1 "toy" visual tell. _Effort: S._

### B. Feature depth (the market-value push)

- [ ] **B1. Spacecraft.** Baked SPK/Horizons snapshots for Voyager 1/2, Parker
      Solar Probe, JWST, New Horizons (same bake-and-interpolate pattern as
      `horizonsMoon.json`). Click-to-info + "X billion km away" share hook.
      _Effort: S._
- [ ] **B2. Named stars + info cards.** Re-bake the Bright Star Catalogue with
      names, spectral type, distance, magnitude (BSC5 has them — they were dropped
      at bake time). Click a bright star → name/mag/distance/spectral card.
      _Effort: S._
- [ ] **B3. Local-sky mode.** Geolocation + horizon + a "what's up right now
      over me" 3D view from the user's position. The #1 gap vs Stellarium/
      SkySafari/Google Sky Map; converts orrery → astronomy app. Prerequisite for
      the eclipse-from-location premium feature. _Effort: L._
- [x] **B4. Messier 110 DSO markers.** DONE 940074e — 109 objects (space-cats
      catalog, J2000 RA/Dec, type, vMag, common name) as soft additive glow
      sprites tinted by type + sized by brightness; "DSO" toggle (i18n en+fr),
      `?dso=1` URL round-trip, disposal wired, E2E 12/12. Deployed 0d14562.
      (Hubble sprite + search deferred — markers + toggle ship the core wow.)
- [x] **B5. Live NEO close-approach feed.** DONE 72a67d8 — NASA CNEOS (DEMO_KEY,
      CORS-open) 7-day window → soonest close approach in a "Next asteroid"
      panel row (name · LD · when), amber dot when flagged hazardous, hourly
      refresh, never blocks on failure. Pure parser in `src/sim/neo.ts` (10
      unit tests) — CNEOS times are UTC, marked `Z` so `Date.parse` doesn't
      misread them as local (sandbox is CEST, which shifted the day by one).
      E2E 13/13. Deployed 1050631.
- [ ] **B6. Exoplanet mode v2.** Searchable ~1,000-system baked catalog +
      transit light curves (turns the 13-system demo into a real differentiator).
      _Effort: M._
- [ ] **B7. Eclipse-from-your-location simulator.** Local-sky (B3) + event
      engine + geolocation. The single biggest market-value feature; the
      monetization anchor. _Effort: M (after B3)._

### C. Look / 3D rendering (the "way better than it looks" push)

- [ ] **C1. Earth-at-night hero.** City lights + animated cloud layer +
      correct Rayleigh-scattered limb (day/night terminator asymmetry), reachable
      by clicking Earth. The single biggest wow; closes ~60% of the look gap.
      _Effort: M._
- [ ] **C2. Static constellation art + real star catalog.** Replace the
      pulsing game-UI lines with static Stellarium-style art + a
      magnitude-sorted real catalog (Hipparcos). Kills the "game" tell. _Effort: M._
- [ ] **C3. Cinematic scale morph.** Cubic easing + camera dolly + FOV
      compensation (the current linear lerp reads as a rubber-stretch). _Effort: S._
- [ ] **C4. Sun upgrade.** Limb darkening + anamorphic flare streak + corona
      parallax. The brightest object currently looks the cheapest. _Effort: M._
- [ ] **C5. Saturn ring shadow + Cassini-division texture.** Saturn is the
      money shot; it's underlit. _Effort: S._
- [ ] **C6. Label system.** Depth-occlusion fade + collision layout +
      hide-when-behind-a-planet (DOM labels currently float through geometry).
      _Effort: M._
- [ ] **C7. Milky Way band + star color-temperature spread.** The black void
      reads as "empty", not "space". _Effort: S._
- [x] **C8. UI polish pass.** DONE fc016a2 — contrast audit: all 8 text/bg
      pairs pass WCAG AA (min 6.88:1, no gap); focus-visible + reduced-motion
      already present. Normalized the fragmented type scale (13 sizes incl. 7
      half-pixel values + a 9px outlier) to a clean integer modular scale
      (10/11/12/13/14/15/16/17/26px); no sub-10px text remains. _Effort: S._
- [ ] **C9. Accessibility.** Keyboard camera control + canvas ARIA
      description + documented touch gesture model. A11y is currently zero.
      _Effort: M._

### D. Code practice (the maintainability push)

- [ ] **D1. Split `main.ts` into feature modules** (ui-controls, camera-tour,
      labels, share, i18n-wiring, lifecycle) behind a small app-state object. The
      3315-line god file is the #1 maintainability + testability risk. _Effort: L._
- [ ] **D2. Central teardown/dispose contract.** Every `addEventListener` via a
      recording helper; `rebuildScene` disposes meshes/textures/listeners. Leak +
      duplicate-handler risk on rebuild. _Effort: M._
- [ ] **D3. Split `scene.ts`** (2314 lines) into bodies/constellations/orbits/
      moons modules. _Effort: L._
- [ ] **D4. Dynamic-import heavy optional paths** (exo scene, post-processing,
      real textures) to shrink the 1.2 MB eager bundle (PWA precache cost). Note:
      a CI bundle-size budget already exists (D5) — keep it green. _Effort: M._
- [ ] **D5. Replace `as HTMLElement` casts** with a typed `querySelector`
      helper that throws a typed error; guard `built` init with an explicit
      ready-state. Strict mode is currently defeated at the DOM boundary.
      _Effort: S._
- [ ] **D6. AbortController + rebuild-token on all fetches** (TLE, textures,
      i18n) to kill stale-response races on fast URL restore. _Effort: S._
- [ ] **D7. Extract the frame loop** into a testable scheduler; move the
      per-frame `toFixed` string-key cache to a numeric hash (hot-path alloc).
      _Effort: M._
- [ ] **D8. Minimal app-state store** (single source for followId/scale/
      toggles/selected) instead of module globals — enables unit-testing the
      shell. _Effort: M._
- [ ] **D9. Render-path / visual-regression tests** (Playwright screenshot
      diff) + a coverage threshold in CI. The high-churn shell is effectively
      untested. _Effort: M._
- [ ] **D10. Enforce the "pure sim/data" invariant with a lint rule** (no
      `three`/DOM imports in `src/sim`, `src/data`). Currently convention-only.
      _Effort: S._

### E. Product / monetization

- [ ] **E1. One-time Orrery+ unlock** ($4.99–9.99) gating B3/B4/B6/B7 + a
      10k-yr ephemeris, + event push notifications. One-time pricing matches the
      hobbyist buyer (no subscriptions). _Effort: M._

---

## Explicitly NOT doing (from the judges)

- AR mode (native-only battle lost to SkySafari; only via a native wrapper
  after the PWA proves demand).
- Full Gaia 100k-star field before local-sky mode (spend bytes where the user
  is looking).
- Space Engine-style universe breadth (wrong game — own the time-travel niche).
- Subscriptions (the hobbyist audience punishes them; one-time wins).

## Suggested execution order

A1 → A3 → B1 → B2 → C1 → C3 → C5 → C7 → C8 (quick wins + first wow) →
B3 → B4 → B5 → B6 → B7 (feature depth) → C2 → C4 → C6 → C9 (look depth) →
D1–D10 (maintainability, interleaved) → A2 (license, decide early) → E1
(monetization, last).
