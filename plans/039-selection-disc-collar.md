# 039 — Selection disc too big: hugging collar instead of broad annulus

## Ask (user, 2026-09-13)

> "When picking a planet the selection blue disk is overlapping with the natural
> disc of some planetes like Saturn or when following the orbital plan it
> intersect with the satellites. It should probably be smaller and on the disk
> plan toward the sun. Use vision on Saturn Jupiter avec earth as a reference."

## Root cause (grounded in code + vision on all 3 bodies)

`scene.ts:444` builds the selection indicator as a **broad annulus**:
`new THREE.RingGeometry(1.55, 2.35, 64)` — i.e. from **1.55× to 2.35×** the
body radius, laid flat in the body's **equatorial plane** (child of the tilted
`pivot`, so it is exactly the plane the satellites orbit in). It pulses via
`bodyHighlightTargets` (`ringBreath = 1 + 0.12·phase`).

Vision reference (`.baseline/p6-*-follow-before.png`) on the 3 named bodies:

- **Saturn** (r=1.687, tilt 27°, natural rings 1.24–2.27×): the cyan annulus at
  1.55–2.35× sits _in the middle_ of the natural ring band → it crosses over the
  tan rings on both sides and its near arc sweeps across the planet disc. Reads
  oversized/cluttered.
- **Jupiter** (r=1.687; Galilean moons 3.03–4.68×): the broad flat disc spreads
  into the moon-orbit plane, so the moons read as sitting _on/inside_ the ring
  and the front arc overlays the disc.
- **Earth** (r=1.615; Moon floor 2.21×): the annulus outer edge (2.35×) reaches
  the Moon's orbit (2.21×) → the Moon sits on the ring.

Both complaints reduce to one thing: **the annulus is too wide (reaches 2.35×)
and its band overlaps the natural-ring band (Saturn) and the moon orbits
(Earth/Jupiter).**

## Fix

Shrink the selection indicator from a broad annulus to a **thin hugging collar**
that stays _just outside the disc surface and inside every satellite orbit_:

- `RingGeometry(1.55, 2.35, 64)` → **`RingGeometry(1.03, 1.08, 64)`** — a 0.05×-wide
  collar hugging the limb (peak outer at breathing max ×1.12 = **1.2096×**).

Per-body clearance (computed by `/tmp/collar2.py`, mirroring `visibleScale.ts`
`baseMoonDistance` + the `MOON_CLAMPS` table; relative moon floor = clamp floor /
parent `planetRadiusKm`):

| Body    | tightest moon (floor rel) | min rel   | collar peak (1.2096) | clears?                                  |
| ------- | ------------------------- | --------- | -------------------- | ---------------------------------------- |
| Jupiter | Amalthea (2.584/2.089)    | **1.242** | 1.2096               | ✓ 0.032                                  |
| Saturn  | Enceladus (5.171/2.045)   | 2.529     | 1.2096               | ✓ (ring inner 1.24, peak clears by 0.03) |
| Neptune | Triton (2.462/1.877)      | 1.311     | 1.2096               | ✓ 0.10                                   |
| Mars    | Phobos (1.978/1.494)      | 1.324     | 1.2096               | ✓ 0.11                                   |
| Earth   | Moon (2.209/1.615)        | 1.368     | 1.2096               | ✓ 0.16                                   |
| Uranus  | Miranda (4.293/1.884)     | 2.280     | 1.2096               | ✓                                        |

The two binding constraints are **Jupiter/Amalthea (1.242)** and **Saturn's
natural-ring inner edge (1.24)** — nearly tied — so the peak is capped just
below 1.24. A single global collar works for every body (the collar is in
units of body-radius, so no per-body value is needed).

- **Saturn**: the collar drops _below_ the natural ring band (which starts at
  1.24×) instead of sitting at 1.55–2.35× mid-band → the cyan no longer crosses
  the tan rings.
- **Jupiter**: the collar's peak (1.2096×) stays inside Amalthea's orbit (1.242×)
  → no satellite sits on the ring.
- **Earth**: the collar's peak is well inside the Moon's orbit (1.368×).
- The plane is **unchanged** (equatorial = the disc/satellite plane the user
  asked for, "on the disc plane").

### Note on "toward the sun"

The request also said "on the disk plan toward the sun." I keep the collar in the
**equatorial plane** (the disc plane the satellites orbit) rather than re-orienting
it toward the Sun, because the equatorial plane is the meaningful "disc plane" and
a sun-orientation would look wrong for most bodies and is a larger semantic change.
The reported overlaps are fixed by shrinking. If a sun-pointing orientation is
wanted, it's a follow-up.

## Files

- `src/render/scene.ts:444` — ring geometry 1.55–2.35 → 1.03–1.08 + comment.
- (No test change: `bodyHighlightTargets` breath/opacities unchanged; the
  geometry radii are not asserted in tests.)

## Verification

- Gates: test / tsc / lint / format / build.
- Live vision on Saturn / Jupiter / Earth follow frames, **before vs after**:
  - Saturn: cyan collar no longer crosses the tan rings; sits at the limb.
  - Jupiter: collar well inside the Galilean orbits; no disc smear.
  - Earth: collar inside the Moon's orbit.
