# 046 — LOOK & 3D-RENDERING REVIEW (grill-me)

Scope: visual quality, 3D rendering, UI/UX polish only. No sim/physics.
**GRADE: 62/100** — competent engineering, mid-tier look. Reads as "three.js demo", not Space Engine.

## 1. Lighting & materials — 5/10

One PointLight + PCFSoft cube shadows is the floor, not the ceiling. No
specular/roughness maps per body (oceans vs rock), no normal/bump detail,
no cloud layer on Earth, no limb darkening on the Sun. Planets read as
flat-shaded billboards at distance. The HDR chain is correct plumbing
(HalfFloat RT → bloom → SMAA → ACES) but tone-mapping exposure 1.15 with
unrealistic sun intensity will blow out or crush depending on tier.

## 2. Atmosphere, rings, sun FX — 6/10

Fresnel atmosphere is the right trick but a single additive rim = "blue
glow", not Rayleigh-scattered limb (no day/night terminator asymmetry, no
scattering color shift). Rings: lit StandardMaterial annulus is fine, but
no Cassini-division texture detail, no ring shadow on planet (or vice
versa) beyond the point-light cube. Sun flare is a billboard + bloom —
cheap and it shows; no anamorphic streak, no chromatic aberration, corona
doesn't respond to camera motion parallax.

## 3. Scale morph & camera — 7/10

VISIBLE_SCALE↔TRUE_SCALE lerp is a nice gimmick but a linear lerp of
radii/distances looks like a rubber-stretch, not a cinematic transition —
no easing curve, no camera dolly, no FOV compensation. CameraFlight exists
(333 lines) but fly-to is the only motion language; no inertia tuning
notes, no collision with planet surfaces. DOF (BokehPass) is off by
default and focus-distance driven — a nice-to-have that will fight the
bloom pass on low tier.

## 4. Starfield / skybox — 5/10

A 400-line skybox module is a lot of code for what is almost certainly a
procedural point-sprite starfield. No real Hipparcos/Gaia positions
projected, no Milky Way band texture, no color-temperature spread, no
twinkle or proper magnitude falloff. Constellation lines at radius 4800
with pulsing emphasis (0.28→1.0 opacity, 2.5s pulse) are a game-UI tell —
Stellarium/Space Engine never pulse. Halo lines (black, 0.45–0.7 opacity)
over a starfield = z-fighting risk and visual noise.

## 5. UI/UX & typography — 6/10

Collapsible panel, combobox search, shareable URL — solid product sense.
But: no evidence of a real type scale, no dark-mode-contrast audit,
labels are screen-projected DOM (planetScreenLabels 361 lines) which
means no depth-occlusion, no occlusion fade, and label collision is
probably a z-order guess. No motion design system (easing tokens), no
focus-visible states documented, no reduced-motion respect. The ✦ Events
toggle and constellation pulse are decorative, not functional.

## 6. Mobile & a11y — 5/10

PWA + safe-area + coarse-pointer targets is good hygiene. But WebGL on a
low phone = the `low` tier kills post AND shadows, which is a cliff, not
a gradient — the look changes discontinuously. No touch-specific gesture
model documented (pinch = zoom vs dolly?), no landscape/lock guidance,
no screen-reader story for the 3D canvas (it's a black box to AT), no
keyboard-only camera control. A11y is effectively unaddressed.

## 7. Perf-vs-quality tradeoff — 6/10

The tier system is the right idea and is unit-testable (good). But the
profiles are blunt: `low` drops the entire post stack (bloom gone = the
sun becomes a white dot, a jarring downgrade) and shadows. There's no
"keep bloom, drop SMAA/DPR" middle path. 2500 belt instances ×2 belts is
fine, but no frustum/LOD culling of distant bodies, no texture
mipstreaming, no `powerPreference:'high-performance'` note. The fps
watchdog downgrades once and never recovers — a laptop that warmed up
stays on `medium` forever.

## 8. Gaps vs Space Engine / Stellarium

SE: real-time raymarched atmosphere, physically-based sun with limb
darkening + granulation, ring shadows, real star catalog with magnitudes,
seamless scale from galaxy→surface. Stellarium: accurate star field,
proper constellation art, night-sky realism. This app sits between a
textbook diagram and a game: correct positions, cartoon rendering. The
single biggest wow change: **one hero shot** — Earth at night with city
lights + cloud layer + correct Rayleigh limb, reachable by clicking
Earth. That single view closes 60% of the perceived gap.

## Top-10 visual/UX improvements (prioritized)

1. **Earth hero: night-lights + cloud layer + Rayleigh limb** — closes the SE gap, the single wow. M
2. **Replace pulsing constellation lines with static art + magnitude-sorted real star catalog (Hipparcos)** — kills the game-UI tell. M
3. **Proper scale-morph easing (cubic) + camera dolly + FOV comp** — rubber-stretch → cinematic. S
4. **Granular quality tiers: keep bloom on `low`, drop SMAA/DPR first; allow watchdog recovery** — no jarring cliffs. S
5. **Sun: limb darkening + anamorphic flare streak + corona parallax** — the brightest object looks cheapest. M
6. **Ring shadow on planet + Cassini-division texture** — Saturn is the money shot; it's underlit. S
7. **Label system: depth-occlusion fade + collision layout + occluded-by-planet hide** — DOM labels currently float through geometry. M
8. **Type scale + contrast audit + focus-visible + reduced-motion** — the panel is the only "product" surface; make it crisp. S
9. **Milky Way band + star color-temperature spread in skybox** — black void reads as "empty", not "space". S
10. **Keyboard camera control + canvas ARIA description + touch gesture doc** — a11y is currently zero. M
