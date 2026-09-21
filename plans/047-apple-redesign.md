# Plan 047 — Apple Redesign: the most beautiful star app, kept simple

**Goal (user-mandated):** revert the low-value noise (multiple solar systems, ISS,
overlapping orbits, "+" star spikes, label soup) and rebuild toward ONE goal —
the most beautiful, Apple-grade star app, kept simple. "The scene is the UI.
One subject per frame. Whitespace is a feature."

**Gate (from the judge subagent):** score the app against the weighted rubric in
`plans/047-rubric.md`. Current baseline = **57.6/100 (FAIL)**. Target **≥95/100**
on all three judges' criteria before we call it Apple-production-ready. Re-score
with headless-Chrome screenshots + vision after every phase; if <95, implement the
judge's single highest-ROI gap and re-score. Loop until pass.

## Why the current app looks bad (consensus of 3 subagents)
1. **Orbit tangle** — every orbit is a flat full-opacity steel-blue line; in the
   tilted wide view they cross into a gray mesh. The #1 clutter signal.
2. **"+" star spikes** — ~200 brightest stars get 4-point diffraction crosses that
   read as literal plus signs. The most "not Apple" element.
3. **Two competing label systems** — planet names (22px, boxes, leader lines) AND
   constellation names (30px serif + flourish + diamond) fire at once → 12–16
   floating labels over the tangle.
4. **Blown Sun** — corona 4.5× + a 70%-wide anamorphic lens streak = a camera
   artifact, not a star.
5. **Dashboard, not a view** — a persistent 360px / 12-row panel (Space Weather,
   Next Asteroid, APOD, Sky/System/Systems, Events, Scale, 6 display toggles)
   covers ~28% of the frame. Plus a second app (exo "Systems"), ISS, DSO, DOF.
6. **Muddy palette** — neon green 0x7cfc5a, gold 0xffc46b, four competing blues.
7. **Noisy starfield** — 9,000 near-stars + BSC5 + Milky Way + zodiacal light.
8. **Inconsistent glass** — 4 different opacities/radii/blurs across surfaces.
9. **Emoji in UI chrome** (🌌🪐✨) — the "not Apple" tell.
10. **Competing micro-animations** — several simultaneous pulses, no easing language.

## Phase 0 — Revert the low-value noise (UX removal list)
Remove or hide the features that add noise with low ROI. Keep the code reachable
but OFF by default; delete the truly dead ones.
- **CUT** (delete UI + wiring): NEO "Next Asteroid" feed, Space-Weather Kp row,
  APOD row, exoplanet "Systems" second-app (Sky/System/**Systems** → Sky/System),
  ISS satellite + orbit, DSO/Messier markers, DOF toggle.
- **HIDE** (move into a single "More" disclosure / command palette): Events,
  Share, About, real-scale toggle, belt/figure toggles.
- **KEEP** (the core, always-visible): Time (date + speed + play/pause/now),
  Find, the 8 planets + Sun + Moon, orbits, labels, starfield, camera.
- Net: the default frame shows **≤6 UI elements** and one subject.

## Phase 1 — Scene de-clutter (biggest visual wins, in this order)
1. **Orbit lines: faint + depth-fade + selection emphasis** — `render/scene.ts`
   (`makeOrbitLine`, `updateOrbitLines`) + `main.ts` per-frame opacity by camera
   distance + picked/hovered id. Base 0.45→0.10, color→accent rgba(122,162,255,·);
   near 0.14 → far 0.03; picked/hovered → 0.55 + glow. ONE bright orbit at a time.
2. **Sun: remove anamorphic streak + shrink corona** — `render/post.ts`
   (`buildLensFlare` drop the streak sprite; `buildSunGlow` 4.5×→3.2×, 0.6→0.45).
   Let bloom do the glow. Clean hot round star.
3. **Kill "+" star spikes** — `render/skybox.ts`: cut spike alpha 0.5→0.12 and
   width 4.5×→2.2× (only the ~20 brightest get a subtle glint). No visible plus.
4. **Label de-clutter: one language, cap 5, mode-gated** —
   `render/planetScreenLabels.ts` (13px/500, no box, soft text-shadow, cap 4),
   `render/constellationScreenLabels.ts` (12px/400, 0.28em caps, no flourish,
   Sky-view only), `render/textures.ts` (`drawConstellationName` drop
   serif/flourish/diamond), `main.ts` mode gating. Picked label: 14px/600 + 2px
   accent underline (not green).
5. **Starfield: reduce density + subtle twinkle** — `render/skybox.ts`
   (STAR_COUNT 9000→3500, dim faint tail), `sim/starfield.ts` (twinkle phase on
   the ~300 brightest, ±15%, 3–6s). Milky Way desaturate toward blue.

## Phase 2 — UI / material / type (Apple system)
6. **Unify glass + palette tokens** — `index.html` `:root` new tokens
   (see `plans/047-tokens.md`); apply the SAME glass to `#panel`, `#hud-mini`,
   `#date-cal`, `#tooltip`, `#palette`, `#about-card`, `#onboard-card`:
   blur(20px) saturate(1.4), `--surface` rgba(18,22,32,0.55), 1px white-10%
   hairline + inner top highlight, 16px radius, one soft shadow.
7. **Panel: shrink to 300px, collapse-to-pill, ≤6 rows** — `index.html`
   (`#panel` width + `.collapsed` default), `main.ts` (move weather/neo/events/
   apod/share into "More"). Default frame = ~90% scene.
8. **Iconography: emoji → 16px line icons** (SF Symbols-style, 1.5px stroke).
9. **Motion: single easing** `cubic-bezier(0.22,1,0.36,1)`, 200–320ms; kill
   competing pulses (only the changing value animates).
10. **Typography pass** — title 16px/600 white; section heads 11px/600 --text-3;
    body 13.5px/1.55; tabular-nums on all numbers.
11. **Planet polish** — Earth blue rim 1.0→1.15; faint specular sun-glint on
    rocky lit limbs.

## Phase 3 — Gate & loop
- Screenshot the 3 canonical views (boot 1280×800, wide, mobile 390×844) with
  headless Chrome (SwiftShader flags) + vision.
- Score against `plans/047-rubric.md` (judge) + the UX & visual rubrics.
- If <95: implement the single highest-ROI gap the judges name, re-score.
- Repeat until all three judges ≥95. Record each score next to its commit.

## Files touched (primary)
`index.html` (CSS tokens, panel, icons, motion), `src/main.ts` (removals, mode
gating, per-frame orbit opacity, "More" disclosure), `src/render/scene.ts`,
`src/render/post.ts`, `src/render/skybox.ts`, `src/render/planetScreenLabels.ts`,
`src/render/constellationScreenLabels.ts`, `src/render/textures.ts`,
`src/render/atmosphere.ts`, `src/sim/starfield.ts`.

## Guardrails
- `npm test` green before every commit; `npm run build` (tsc strict) green.
- Bundle stays under the 1.3 MB CI budget.
- Do NOT reintroduce removed features as visible UI.
- Commit per feature; record hashes in a docs commit; never --amend.
