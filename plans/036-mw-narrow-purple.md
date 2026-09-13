# 036 — Milky Way: narrower + purplish (user photo reference)

## Ask

User sent a night-sky photo (purple/magenta Milky Way over a telescope) and asked:

> "can we have the milky way less wide and maybe purplish like this picture let's say?"

Two changes, ONE feature, ONE commit.

## Reference analysis (vision_analyze of the photo)

- **Width:** moderately wide diagonal ribbon — NOT an all-sky glow, NOT a thin line.
  Bright core ribbon inside a wider, fainter halo. Target: tighten the halo so the
  band reads as a defined ribbon with soft feathered edges (current bake halo σ=11° is
  too diffuse/wide).
- **Color:** bright core = white + magenta/pink accents; outer halo = purple/violet/
  lavender fading to indigo. Current bake is blue-white (B 0.78 > G 0.66 > R 0.62) —
  too blue, not enough red/magenta.

## Root cause (in the texture, not the shader)

`scripts/bake_milkyway.py` bakes the band. Two knobs drive the two asks:

1. **Width** — `core = gauss(b, 3.2); halo = gauss(b, 11.0)` and the sample width
   `b = rng.standard_normal(N) * 6.0`. The halo σ=11° spreads the glow wide.
2. **Color** — the `base_r/base_g/base_b` coefficients (blue-white).

The runtime `MILKYWAY_TINT = 0.3` is a neutral grey multiply — it cannot add hue, so
the purple MUST come from the texture. (Confirmed: skybox.ts line 192 tints with
`new THREE.Color(MILKYWAY_TINT, MILKYWAY_TINT, MILKYWAY_TINT)` — neutral.)

## Change

Parameterize the bake script (reproducible, tunable) + add a `--purple` color set:

New CLI args (defaults preserve the OLD bake):

- `--core-sigma` (default 3.2)
- `--halo-sigma` (default 11.0)
- `--sample-sigma` (default 6.0) — the sample gaussian width in `b = rng... * sigma`
- `--purple` (flag) — swaps the band color coefficients to the purple set

**Ship command (record in commit + README note):**

```
uv run --with numpy --with pillow python scripts/bake_milkyway.py \
    --star-scale 0.10 --band-scale 0.55 \
    --core-sigma 2.8 --halo-sigma 5.5 --sample-sigma 3.8 \
    --purple \
    --out public/textures/milkyway_equirect.png
```

Purple color set (R↑, G↓, B↑ → magenta core / violet halo):

```
base_r = band * (0.74 + 0.50 * bulge) + bulge * 0.55
base_g = band * (0.50 + 0.22 * bulge) + bulge * 0.30
base_b = band * (0.88 - 0.10 * bulge) + bulge * 0.12
```

(Original: 0.62/0.66/0.78 → blue-white.)

Narrowing rationale: halo σ 11→5.5 pulls the wide glow in; sample width 6→3.8 stops the
splat from covering a huge b-range; core 3.2→2.8 keeps a slightly tighter bright core.
Band-scale stays 0.55 (same overall brightness the user locked in pass 5 — narrower
concentrates the peak, so keep the multiplier to avoid a brightness jump).

**Measured result (post-bake, 1% peak halo FWHM vs pass-5 texture):** gal-long offset
90° 12.6→10.2° (19% narrower), 135° 12.9→9.3° (28% narrower); near the galactic
centre (15°) the band stays wide (6.4→6.2°) — the bulge region is naturally broader,
matching the reference photo (wide bright core, tighter arms). Hue: mean RGB R/G
0.94→1.05, band reads purple/violet/magenta vs the old blue-white.

## Test plan

1. Bake the texture; `ls -la` it (must stay well under the 12 MB dist budget).
2. `vision_analyze` the baked equirect PNG directly — confirm purple hue + tighter band
   vs the old 1,387,906-byte texture.
3. Live: preview server + headless Chrome, screenshot the galactic-plane pose, compare
   to the reference (narrower ribbon, purple). DOM/state numbers are secondary here —
   this is a texture, verify by pixels/eye.
4. Gates: `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run format:check`,
   `npm run build`. (The script + texture are the only changed files; TS untouched.)
5. Commit (feature) → push → docs commit (record hash + pass-6 note) → deploy to
   gh-pages (rolling-dist pattern) → verify live bundle + texture bytes.

## Supersession note

This SUPERSEDES the pass-5 texture (commit 0032651, `--star-scale 0.10
--band-scale 0.55`). Same star density / band brightness; only the band WIDTH and HUE
change. `MILKYWAY_TINT` in skybox.ts is unchanged (still 0.3).
