# Review 046 — Features & Data (grill-me, product + astronomy)

_Reviewer: product manager + astronomy-domain expert. Scope: features, data
sources, market positioning only. Companion to 044 (prod-readiness/wow)._

## GRADE: 76/100

**One-line justification:** The orrery core (JPL-validated ephemeris + event
engine + time-scrub + live ISS/Kp/APOD) is genuinely elite and no free web
app matches it — but it is still a _toy orrery_, not an _astronomy app_: no
real-time sky-from-your-location, no named stars, no deep-sky objects, a
13-system exoplanet toy, no spacecraft, and zero monetization.

> Note on the tagline: "travel through 10,000 years" is **marketing
> overreach** — the planet ephemeris is JPL Table 2a, valid **1800–2050**
> (250 years). Ground-truth tests pin ±1500 y, but the shipped data table is
> not. Either fix the tagline or extend the ephemeris. This is a credibility
> landmine in front of any astronomer.

## 1. Data sources — what exists, what's missing

### What exists (verified in src/data + src/sim)

| Source                                                              | Status                                        | Assessment                                                                                                                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JPL Table 2a/2b planetary elements (1800–2050)                      | Real, validated vs DE441 ground truth         | **The moat.** Better than most web apps; matches Stellarium-class accuracy for planets within its window.                                                                                          |
| Meeus ch.47 geocentric Moon (60-term tables)                        | Real, ~100 km residual vs DE441               | Excellent for a web app.                                                                                                                                                                           |
| Baked JPL Horizons DE441 Moon snapshot (6 h steps, 2026-09→2027-08) | Real, but **baked, 1-year window, Moon only** | The "live Horizons" claim is a lie in practice: it's a one-year baked table for one body. Outside the window it silently degrades.                                                                 |
| Yale Bright Star Catalogue (8,999 stars, V≤8)                       | Real catalog, baked                           | Decent but shallow: no star names in the data (BSC5 has them — they were dropped), no Gaia proper motion, no spectral types, no DSOs. 9k stars means the Milky Way is a thin sprinkle, not a band. |
| ISS TLE (CelesTrak, live fetch + fallback)                          | Real, live                                    | Good. But ISS only — no Starlink, no Hubble, no other sats.                                                                                                                                        |
| NOAA Kp (live)                                                      | Real, live                                    | Good, but Kp is a scalar; no solar wind, flares, CMEs, UV.                                                                                                                                         |
| APOD (live, DEMO_KEY)                                               | Real, live                                    | Good daily hook; DEMO_KEY is a 30 req/h bottleneck for a growing audience.                                                                                                                         |
| NASA Exoplanet Archive (baked)                                      | Real, but **13 systems / 45 planets**         | This is a toy. The archive has 5,700+ confirmed planets. "Exoplanet mode" that shows 13 hand-picked systems is a demo, not a feature.                                                              |
| SBDB facts (baked, 5 dwarf planets + 47 small bodies)               | Real, baked                                   | 47 named asteroids/comets vs ~1.4M numbered asteroids and 3,500+ comets. Halley and Bennu are probably in there — but the belt is still 2k _decorative_ instanced rocks with no names.             |
| Constellations + figures (Stellarium, GPL-2.0)                      | Real art, **GPL**                             | 88 constellations is good; the GPL art is the legal blocker 044 already flagged.                                                                                                                   |
| Asteroid/Kuiper belts (seeded procedural)                           | **Fake**                                      | Deterministic mulberry32 blobs. Fine visually, but "data" in name only.                                                                                                                            |

### What's missing (ranked by market impact)

1. **No real-time sky from the user's location.** This is the single biggest
   gap vs Stellarium/SkySafari/Google Sky Map. There is no geolocation, no
   horizon, no "what's up right now over me" mode. The app is a god's-eye
   orrery; premium astronomy apps are _local-sky-first_. Without this, the
   "point it at the sky" use case — the #1 reason people install astronomy
   apps — doesn't exist.
2. **No named stars.** 8,999 unnamed points. No Sirius, no Vega, no Orion's
   Belt. Every premium app lets you click a bright star and get its name,
   magnitude, distance, spectral type. BSC5 already has all of this — it was
   thrown away at bake time.
3. **No deep-sky objects.** Zero Messier/NGC. No Andromeda, no Orion Nebula,
   no Ring Nebula. For a "coolest astronomy app," a sky with no galaxies,
   nebulae, or clusters is a sky with no _destinations_.
4. **No spacecraft.** No Voyager 1/2, no Parker Solar Probe, no JWST, no
   Cassini legacy. Spacecraft positions are trivially available (SPK files /
   Horizons) and are a huge shareability hook ("Voyager 1 is 24 billion km
   away — here it is").
5. **No historical/future event depth.** Events are computed (good) but the
   ephemeris window is 1800–2050. No Halley returns beyond 2061, no "what did
   the sky look like on the day of the Moon landing," no 10,000-year view
   (which the tagline promises).
6. **No live asteroid tracking.** No NEO alerts, no "asteroid passing Earth
   today" feed (NASA CNEOS is free and CORS-friendly). Real-time asteroid
   proximity events are the most news-worthy astronomy content.
7. **No star proper motion / precession.** The sky is frozen at J2000.
   Stellarium shows the sky as it was/is/will be; here the stars don't move
   even when you scrub 1,000 years.
8. **Moon coverage is good but incomplete.** ~20 moons exist (Galilean,
   Titan, Triton, Saturn's six, Uranus's five, Phobos/Deimos, Amalthea,
   Himalia, Nereid) — better than I first assumed. Missing: **Charon**
   (Pluto's co-equal partner — a glaring omission), Mimas, Hyperion, Tethys's
   siblings are covered, but Neptune's Naiad/Proteus and Pluto's small moons
   are absent. Also no moon _surface_ detail (the Moon is a texture ball, not
   a flyable body with craters).
9. **No weather/atmosphere on other planets** — no Jupiter cloud bands
   animation, no Saturn hexagon, no Martian dust storms. (Texture-level, but
   high perceived value.)
10. **No user data:** no saved views, no watchlist, no "my observations"
    log. Nothing that makes a user _return_ beyond APOD.

## 2. Feature gaps vs premium astronomy apps

Benchmark: Stellarium (free, desktop/mobile), SkySafari (paid, the gold
standard), Space Engine (paid, the "coolest" reference), Google Sky Map.

| Capability                            | Stellarium          | SkySafari          | Space Engine       | **Orrery (this app)**                 |
| ------------------------------------- | ------------------- | ------------------ | ------------------ | ------------------------------------- |
| Local sky / "what's up now" from GPS  | ✅ core             | ✅ core            | ✅                 | ❌ **absent**                         |
| AR / phone-pointing mode              | ✅                  | ✅ (best-in-class) | ❌                 | ❌                                    |
| Named stars + info                    | ✅ 400k+            | ✅                 | ✅                 | ❌ unnamed 9k                         |
| Deep-sky objects (Messier/NGC)        | ✅ 300k+            | ✅                 | ✅                 | ❌ **zero**                           |
| Planets + moons + spacecraft          | ✅                  | ✅                 | ✅ (any body ever) | ⚠️ planets+20 moons, no spacecraft    |
| Time travel (past/future)             | ✅ ±millions of yrs | ✅                 | ✅                 | ⚠️ 1800–2050 only                     |
| Eclipses / events                     | ✅                  | ✅                 | ✅                 | ✅ **computed, validated — its moat** |
| Time-scrub as a _primary interaction_ | ⚠️ clunky           | ⚠️                 | ⚠️                 | ✅ **best-in-class**                  |
| Exoplanets                            | ❌                  | ⚠️ (catalog)       | ✅ (all)           | ⚠️ 13 systems toy                     |
| Asteroids/comets named                | ✅                  | ✅                 | ✅                 | ⚠️ 47 bodies                          |
| Photo mode / share                    | ⚠️                  | ✅                 | ✅                 | ✅ (branded PNG + URL state)          |
| Runs in a browser, zero install       | ❌                  | ❌                 | ❌                 | ✅ **unique**                         |
| Offline / installable                 | ✅                  | ✅                 | ✅                 | ✅ PWA (SW fixed)                     |
| Mobile                                | ✅                  | ✅ (best)          | ⚠️                 | ⚠️ PWA, no native store presence      |
| Monetization                          | n/a (free)          | $7–30              | $20+               | ❌ **none**                           |

### The honest read

1. **This app does not compete with Stellarium on sky features — and it
   shouldn't try.** Its defensible position is the _time dimension_: "watch
   the solar system move" is something Stellarium does badly and Space Engine
   does expensively. The marketing must own "time travel through the solar
   system," not "another planetarium."
2. **But "coolest on the market" requires the local-sky mode.** The moment a
   user asks "can I see what's above _me_ right now?" the answer is no, and
   the comparison with SkySafari/Google Sky Map is over. This is the gap that
   separates "cool orrery" from "coolest astronomy app."
3. **Space Engine's bar is "infinite universe."** You cannot out-SE Space
   Engine on breadth. You can out-SE it on _focus_: a solar system you can
   scrub through 250 years of, with real validated ephemerides, in a browser
   tab, shareable by URL. That's a real, sellable niche — but it's a niche,
   not "the market."
4. **What would make it genuinely the coolest:** (a) local-sky mode,
   (b) named stars + DSOs so the sky has destinations, (c) spacecraft
   (Voyager/Parker/JWST — instant press), (d) one killer shareable moment
   (e.g. "watch the 2028 total solar eclipse from your city" — needs
   location + eclipse path rendering), (e) a real name/brand (Orrery is
   decent; the horse is gone, good).

## 3. Wow-factor features: cheap vs expensive

### Cheap (S) — high perceived value, low effort

| Feature                                                                      | Why it's cheap                                                                                                                                      | Wow                                                                              |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Named bright stars** (top ~300 from BSC5, already in the source data)      | The names are in the catalog you already downloaded; you dropped them at bake time. Re-bake with names + click-to-info.                             | High — "click Sirius and it tells you 8.6 ly, α CMa"                             |
| **Charon + a few missing moons**                                             | One row in bodies.ts each; the whole pipeline (orbit line, follow, search) derives automatically.                                                   | Medium — fixes a visible omission                                                |
| **Spacecraft: Voyager 1/2, Parker, JWST, New Horizons**                      | SPK ephemerides are public; bake a 10-year snapshot per craft (same pattern as horizonsMoon.json). Or live via JPL's SPK API via a tiny CORS proxy. | **Very high** — "Voyager 1 is 24.5 billion km away" is a screenshot people share |
| **Eclipse path on a 2D Earth map** (for the event list)                      | The event engine already computes eclipses; draw the path of totality on a small equirect map in the event card.                                    | High — turns an event _list_ into an event _experience_                          |
| **"What's up now" quick list** (no 3D)                                       | Compute rise/set for the 8 planets + Moon + ISS from the existing ephemeris + user lat/lon (one geolocation prompt). A text list, not a sky view.   | High — 80% of the local-sky value at 20% of the cost                             |
| **APOD auto-open on first visit of the day**                                 | The card exists; surface it in the intro.                                                                                                           | Medium — daily return hook                                                       |
| **Event countdown in the title bar / HUD** ("Next: Mars opposition in 42 d") | Data already computed.                                                                                                                              | Medium — always-on awareness                                                     |
| **Real NASA texture pack** (drop-in, the realTextures.ts hook exists)        | The plumbing is built; just source public-domain equirect maps (USGS, NASA) for all 8 planets + Moon.                                               | High — procedural textures are the #1 "toy" tell                                 |

### Medium (M)

| Feature                                                | Notes                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Local-sky 3D mode** (horizon + GPS + "point at sky") | The real big one. Reuse the existing starfield + planet ephemeris; add a horizon disc, cardinal directions, and a camera mode that renders the sky _from_ the user's position instead of from outside the system. This is the feature that makes it an astronomy _app_ instead of an orrery. |
| **Messier 110 as DSO markers**                         | Bake RA/Dec + type + magnitude + a small sprite texture (Hubble public-domain). Clickable, searchable, constellation-linked.                                                                                                                                                                 |
| **Exoplanet mode v2**                                  | Replace 13 hand-picked systems with a searchable catalog of the ~1,000 best-characterized systems (baked TAP export, ~1–2 MB compressed), with a "transit light curve" mini-chart per planet.                                                                                                |
| **Live NEO feed** (CNEOS close approaches)             | CORS-friendly NASA API; a "today's close approaches" card + plot the asteroid's orbit when selected.                                                                                                                                                                                         |
| **Eclipse from-your-location simulator**               | Combine local-sky + event engine: "stand in Madrid on 2028-08-12 17:46 UTC and watch the total eclipse." This is the single most shareable feature this app could have.                                                                                                                      |
| **Sound design** (subtle)                              | Ambient audio + event "chimes" (eclipse, opposition). Cheap to source, big premium feel.                                                                                                                                                                                                     |

### Expensive (L) — only after the above

| Feature                                               | Why it's expensive                                                                                                                  |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Full Gaia starfield (100k+ stars) + proper motion** | Data pipeline + memory budget on mobile; the 9k BSC5 is fine until local-sky mode lands.                                            |
| **AR mode (camera passthrough)**                      | Native-only in practice (WebXR AR is flaky on iOS); this is where a PWA permanently loses to SkySafari.                             |
| **Native app stores (iOS/Android)**                   | PWA covers 80%; store presence is the remaining 20% of "sellable app" credibility + enables AR + push notifications.                |
| **10,000-year ephemeris** (to make the tagline true)  | Needs DE441/DE440 numerical ephemerides baked for all planets (or a secular-theory extension); multi-MB data, real validation work. |
| **Full universe mode** (Space Engine parity)          | Not a realistic goal; don't.                                                                                                        |

## 4. Monetization & app-readiness

### What's in place (verified)

- **PWA**: manifest + icons + installable standalone; SW fixed (versioned
  cache, LRU, offline fallback page, E2E-tested). Good.
- **Offline**: shell precached; live data (ISS/Kp/APOD) degrades gracefully.
  Acceptable split per plan 044's own assumption.
- **Mobile**: touch scrub, safe-area insets, collapsible panel, quality tier
  with fps watchdog. Decent, but no native store presence.
- **Onboarding**: intro + 3-step coach + timeline nudge. Good.
- **Accessibility**: contrast fixes, reduced-motion, keyboard scrub. Good
  start; no full keyboard navigation of the 3D scene (can't fly to a body
  by keyboard alone — search combobox is keyboard-navigable, which covers
  most of it).
- **i18n**: en + fr. Fine for launch; es/de/ja are the obvious next three for
  the astronomy audience.
- **Telemetry**: opt-in, local-only by default, no sink configured. Fine.

### What's missing for "sellable"

1. **Zero monetization.** No paywall, no premium tier, no donations, no
   merch, no ads (ads would be tone-deaf here). Plan 044 assumes "freemium
   web, live data/exoplanets = paid tier later" — but nothing is built toward
   it. The cheapest credible path: **one-time "Orrery+" unlock** (native
   store or Stripe/PayPal) gating: local-sky mode, exoplanet catalog v2,
   10,000-year ephemeris, and the eclipse-from-your-location simulator.
   Price point: $4.99–9.99 one-time beats subscription for a hobbyist
   audience (SkySafari's $7–30 one-time model proves it).
2. **No accounts / no saved state.** No watchlist, no saved views, no
   "resume where I left off" beyond the URL. For a freemium product,
   saved views + a shareable "my sky tour" is the retention engine.
3. **No push / notifications.** "Mars opposition tonight" push is the
   highest-ROI notification an astronomy app can send. PWA push works on
   Android + desktop Chrome; iOS PWA push is now possible (16.4+). This is
   the difference between a website and an _app_ in users' minds.
4. **No store presence.** "Sellable as an app" literally requires App Store /
   Play Store. PWA install is a compromise; the moment you want AR, push
   reliability, or payment, you need native wrappers (Capacitor) at minimum.
5. **No onboarding _for the data_.** A first-time user has no idea the app
   has ISS tracking, space weather, or exoplanets — they're buried buttons.
   The intro should show them (044's A6 fixed the time-scrub reveal; the
   data features still have no reveal moment).
6. **Trust signals are thin.** No "data sources" page in the UI (the About
   dialog has credits — good), no accuracy readout surfaced (the Meeus-vs-
   DE441 residual is _in_ the Moon card — that's a great trust feature,
   promote it), no changelog.
7. **SEO/ASO**: the OG card + title exist; but "solar system 3d" is a
   competitive keyword and the app's unique angle (time travel) isn't in the
   title/meta. Fix the meta to lead with the differentiator.

## 5. The single biggest feature that would most raise market value

**"Eclipse from your location" — a personal eclipse/sky-event simulator that
combines local-sky mode + the existing event engine + geolocation.**

Why this one and not the others:

- It fuses the app's _existing moat_ (validated event engine, time-scrub)
  with the _missing half_ (local sky). No other free web app can do it.
- It is the most **shareable** feature imaginable: "I watched the 2028 total
  solar eclipse from my street, in my browser, 18 months before it happens."
  That's a press clip, a TikTok, a Reddit post — the viral loop the app
  currently lacks (screenshots are shareable; _experiences_ are not).
- It converts the app from "cool model of the solar system" to "it knows
  _where I am_ and _what I will see_" — the psychological shift from toy to
  personal tool. That shift is what justifies a $5–10 price tag.
- It's the natural premium gate: free users get the event list + orrery view;
  Orrery+ gets "stand there and watch it."

Runner-up (if local-sky is deemed too big): **spacecraft tracking**
(Voyager/Parker/JWST) — cheapest wow, biggest shareability per line of code,
but it doesn't create the personal-tool shift.

## 6. Top 10 prioritized feature/data improvements

Ordered by (grade impact ÷ effort). Effort: S < 1 week, M ≈ 1–3 weeks,
L > 1 month.

| #   | What                                                                                                                        | Why it raises the grade                                                                                                                                 | Effort                 |
| --- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1   | **Local-sky mode** (GPS + horizon + "what's up now" 3D view from the user's position)                                       | Closes the #1 gap vs every premium astronomy app; converts orrery → astronomy app; prerequisite for the killer feature. +8–10 pts                       | L                      |
| 2   | **Spacecraft** (Voyager 1/2, Parker, JWST, New Horizons — baked SPK snapshots, same pattern as horizonsMoon.json)           | Instant press + shareability; "real data" credibility; almost free given existing bake-and-interpolate infra. +4–5 pts                                  | S                      |
| 3   | **Named stars + star info cards** (re-bake BSC5 with names/spectral type/distance; click-to-info)                           | The sky gets _destinations_; kills the "decorative starfield" critique; data already in hand. +3–4 pts                                                  | S                      |
| 4   | **Eclipse-from-your-location simulator** (local-sky + event engine + geolocation; the premium gate)                         | The single biggest market-value feature (see §5); the monetization anchor. +5–7 pts (after #1)                                                          | M                      |
| 5   | **Messier 110 DSO markers** (RA/Dec, type, mag, Hubble sprites, searchable)                                                 | Deep-sky objects are table stakes for "coolest astronomy app"; M110 is small enough to be a clean S/M. +3–4 pts                                         | M                      |
| 6   | **Real NASA/USGS texture pack** (all planets + Moon, via the existing realTextures.ts hook)                                 | The #1 "toy" visual tell; every screenshot improves; plumbing already built. +3 pts                                                                     | S                      |
| 7   | **Exoplanet mode v2** (searchable ~1,000-system baked catalog + transit light curves)                                       | Turns a 13-system demo into a real differentiator no free web app has; strong press hook. +2–3 pts                                                      | M                      |
| 8   | **Live NEO close-approach feed** (CNEOS, CORS-friendly) + "next asteroid to pass Earth" HUD                                 | Real-time, news-worthy, zero license risk; makes the app feel _alive_ daily. +2 pts                                                                     | S                      |
| 9   | **Monetization: one-time Orrery+ unlock** ($4.99–9.99, gating #4/#5/#7 + 10k-yr ephemeris) + push notifications for events  | Without it the app is a demo, not a product; one-time pricing matches the hobbyist buyer; push = retention. +5 pts (commercial)                         | M                      |
| 10  | **Fix the tagline/ephemeris mismatch** (either extend to real 10,000-yr DE441 data or change "10,000 years" to "250 years") | Credibility with the exact audience that will fact-check you; a false claim in the hero tagline is a review-bombing risk. +1–2 pts, de-risks everything | M (data) / S (tagline) |

### What I would explicitly NOT do

- AR mode (native-only battle you'll lose to SkySafari; do it only via a
  native wrapper after the PWA proves demand).
- Full Gaia 100k-star field before local-sky mode (spend the bytes where the
  user is looking).
- Space Engine-style universe breadth (wrong game; own the time-travel niche).
- Subscriptions (hobbyist audience punishes them; one-time wins).

## 7. Final grade recap

**76/100** — Elite orrery core (the time-scrub + validated ephemeris + event
engine is genuinely best-in-class and the moat), but still a toy vs the
premium bar: no local sky, no named stars, no DSOs, no spacecraft, a 13-system
exoplanet demo, a 1-year baked "live" Horizons table, a tagline that
overpromises the ephemeris window, and zero monetization. Fix the top 5 rows
of §6 and this is a credible $5 app; fix all 10 and it's the coolest
solar-system app on the market — in its niche.
