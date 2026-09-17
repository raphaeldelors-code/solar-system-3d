# Asset licensing ledger (plan 044 D1)

Every non-code asset and every vendored library in Orrery, with source,
license, and sale-readiness. **Verified 2026-09-17** against the upstream
repositories (not from memory): Stellarium's GitHub license field is
`GPL-2.0` and its `COPYING` file is "GNU GENERAL PUBLIC LICENSE Version 2,
June 1991".

## The one legal blocker

**85 constellation figure illustrations** (`public/constellation-figures/*.png`)
are the Stellarium "western" sky-culture art. Stellarium is GPL-2.0-or-later
and these figures carry **no separate permissive license** (confirmed: the
western set is the default core data, not a separately-licensed skyculture
package; the Stellarium project's own licensing guidance says sky-culture
art must carry its own license, and the western set has none).

**Resolution chosen: the whole app is GPL-3.0** (see `LICENSE`). GPL-3.0 is
compatible with GPL-2.0-or-later, so shipping the Stellarium figures under
GPL-3.0 is clean. Consequences:

- Free to use, study, modify, redistribute — **including selling copies** —
  under GPL-3.0 terms.
- A **proprietary/closed-source fork is not permitted** while the Stellarium
  figures ship. To sell a closed-source app, first replace the 85 figures
  with permissively-licensed or original art (options below), then the app
  can be relicensed.

### Replacement options (if a closed-source product is wanted)

1. **Redraw the 85 figures** as original line-art (the app already renders
   Puppis/Vela as original generated art — same pipeline). Cleanest path;
   no license entanglement at all.
2. **Use a permissively-licensed figure set** (e.g. public-domain plates
   from pre-1929 atlases — Ruelle/Dien, Uranographia — where the specific
   plates are verifiably public domain).
3. **Contact the Stellarium maintainers** for a permissive grant for the
   western figures (the constellationship _line data_ author has previously
   granted non-GPL use for the line data — the _figure art_ is the open
   question).

Until one of these lands, **the app is GPL-3.0 and must stay open source.**

## Full ledger

| Asset                                       | Location                                                              | Source                                                            | License                                          | Sale status                                  |
| ------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| Constellation figures (85)                  | `public/constellation-figures/`                                       | Stellarium western sky culture (github.com/Stellarium/stellarium) | **GPL-2.0-or-later** (no separate license)       | OK under app's GPL-3.0; blocks closed-source |
| Puppis / Vela figures (2)                   | `public/constellation-figures/`                                       | Original generated line-art (this repo, plans 012/016)            | GPL-3.0 (this repo)                              | OK                                           |
| Planet day maps (8)                         | `public/textures/planets/*_day.jpg`                                   | NASA/JPL via Solar System Scope + three.js examples               | Public domain (NASA)                             | OK                                           |
| Earth day/normal/roughness/clouds/night (5) | `public/textures/planets/earth_*`                                     | NASA Blue Marble / MODIS / three.js examples                      | Public domain (NASA)                             | OK                                           |
| Moon day map                                | `public/textures/planets/moon_day.jpg`                                | NASA (three.js examples)                                          | Public domain (NASA)                             | OK                                           |
| Milky Way skybox                            | `public/textures/milkyway_equirect.png`                               | Procedural bake, `scripts/bake_milkyway.py` (this repo)           | GPL-3.0 (this repo)                              | OK                                           |
| App icon + OG image                         | `public/icon-*.png`, `public/og-image.png`                            | Generated, `scripts/gen_icon.py` (this repo)                      | GPL-3.0 (this repo)                              | OK                                           |
| Star catalog (8,999)                        | `src/data/starfield.json`                                             | Yale Bright Star Catalogue 5th ed. (BSC5), J2000                  | Public domain (US Navy / Yale)                   | OK                                           |
| Small bodies (asteroids/comets)             | `src/data/smallBodies.json`                                           | JPL Horizons orbital elements (baked)                             | Public domain (NASA/JPL)                         | OK                                           |
| Exoplanet systems                           | `src/data/exoplanets.json`                                            | NASA Exoplanet Archive `pscomppars` (baked)                       | Public domain (NASA)                             | OK                                           |
| Moon ephemeris                              | `src/data/horizonsMoon.json`                                          | JPL Horizons (baked)                                              | Public domain (NASA/JPL)                         | OK                                           |
| Constellation boundaries/lines              | `src/data/constellations.ts`                                          | IAU 1930 boundaries + Stellarium constellationship line data      | Public domain (IAU) / GPL-2.0 (Stellarium lines) | OK under GPL-3.0                             |
| satellite.js (SGP4/SDP4)                    | `node_modules/satellite.js` (shim: `src/vendor/satellite.js-shim.ts`) | satellite.js package                                              | MIT                                              | OK                                           |
| three.js                                    | `node_modules/three`                                                  | three.js                                                          | MIT                                              | OK                                           |
| APOD feed (runtime)                         | NASA APOD API                                                         | NASA                                                              | Public domain (NASA)                             | OK                                           |

## Attribution (also shown in-app via the About dialog)

- Constellation figures: Stellarium project, GPL-2.0-or-later —
  https://github.com/Stellarium/stellarium
- Planet textures: NASA / JPL (public domain), via Solar System Scope and
  the three.js examples repository.
- Star positions: Yale Bright Star Catalogue 5th ed. (public domain).
- Orbital elements: NASA/JPL Horizons (public domain).
- Exoplanets: NASA Exoplanet Archive (public domain).
- Satellite propagation: satellite.js (MIT) — a port of Vallado's SGP4.
- Everything else: original work by the Orrery authors (GPL-3.0).
