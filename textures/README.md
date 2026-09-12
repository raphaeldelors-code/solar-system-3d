# Real surface textures (optional)

This app ships with **procedural** textures (generated on a canvas, seeded per
body) so it works with zero downloads. You can upgrade any body to a real
photo by dropping a public-domain image here.

## How it works

On load (and after every scale rebuild) the app does a `HEAD` request for

    /textures/<bodyId>.jpg

for every body. If the file exists, it is loaded and swapped over the body's
procedural map; if not, the procedural look is kept. **No code changes are
needed** — just add files. `bodyId` is the `id` field in `src/data/bodies.ts`
(`sun`, `earth`, `moon`, `mars`, `jupiter`, `saturn`, …).

## Where to get images

NASA imagery is public domain. Good sources (equirectangular, 2:1 aspect):

- Earth — Blue Marble / MODIS (visible + night lights)
- Moon — Lunar Orbiter / LRO Mosaic
- Mars — MRO / HiRISE full-surface mosaic
- Jupiter/Saturn — Cassini/Juno global color mosaics

Any 2:1 JPG (e.g. 2048×1024) works; the texture is wrapped horizontally and
mapped sRGB. Smaller files load faster; larger look sharper when you zoom in.

## Naming

Match the id exactly, lowercase, `.jpg`:

    earth.jpg    moon.jpg    mars.jpg    jupiter.jpg    saturn.jpg
    mercury.jpg  venus.jpg   uranus.jpg  neptune.jpg    pluto.jpg
    sun.jpg      ceres.jpg   eris.jpg    haumea.jpg     makemake.jpg

Files not in this list are ignored. To remove a real texture, delete the file
and reload.

## Deep-sky background (`milkyway_equirect.png`, plan 035 F2)

This file is NOT a real-surface texture (it is not `<bodyId>.jpg`);
it is the whole-sky equirect map rendered by `src/render/skybox.ts` on a
large inward sphere behind the constellations (the `milkyway-skybox` mesh).

It is a **procedurally generated** all-sky Milky Way, NOT a photograph:
a deterministic bake (Python, seeded) forward-splats a Gaussian galactic
band (mottle + dark dust lanes + a warm galactic-centre bulge) plus two
star populations onto a 4096×2048 (2:1) equirect canvas, using the SAME
galactic→equatorial→scene→equirectUV chain the app uses at runtime
(scene frame of `raDecToUnit` in `src/data/constellations.ts`; galactic
centre lands at u≈0.87, v≈0.5; poles at the image top/bottom).
Chosen over a photo re-projection so the sky is small (~2 MB), fully
deterministic, and carries no photo attribution.

Do NOT delete it — the skybox silently falls back to a flat dark sky
if the load fails, which looks like a regression.

## Regenerating the all-sky bake

The generator is committed at **`scripts/bake_milkyway.py`** (deterministic,
seeded; reproduces the exact galactic→equatorial→scene→equirectUV chain of
the runtime). Re-bake with:

    uv run --with numpy --with pillow python scripts/bake_milkyway.py \
        --star-scale 0.10 --band-scale 0.55

- `--star-scale` (default **0.10**) — multiplier on both baked star
  populations. `1.0` = the original 2026-09-12 bake (~234k stars). `0.10`
  ≈ 23k stars (the current "much fewer stars" look the user wants).
- `--band-scale` (default **0.55**) — multiplier on the smooth band-glow
  luminance. `1.0` = original. `0.55` ≈ 3.4× brighter glow, which relays the
  luminance that used to live in the now-thinner star field so the band
  **keeps the same overall brightness** with far fewer specks.

The two knobs trade off exactly: lower `--star-scale` + raise `--band-scale`
keeps the band as bright but smoother. Verify after a re-bake that the
band-strip mean is unchanged (~0.10 at the Milky Way pose) while the
bright-pixel count in the band drops.

## Planets (plan 035 F3)

`public/textures/planets/` holds real surface maps (public-domain NASA/JPL):

| file                                                   | source                               | notes                          |
| ------------------------------------------------------ | ------------------------------------ | ------------------------------ |
| `earth_day.jpg`                                        | NASA Blue Marble (three.js examples) | 2048×1024, sRGB                |
| `earth_normal.jpg`                                     | NASA                                 | 2048×1024, linear              |
| `earth_roughness.jpg`                                  | inverted from `earth_spec.jpg`       | ocean=smooth, land=rough       |
| `earth_clouds.png`                                     | NASA (three.js examples)             | 1024×512 alpha, animated shell |
| `moon_day.jpg`                                         | NASA (three.js examples)             | 1024×512                       |
| `{mercury,mars,jupiter,saturn,uranus,neptune}_day.jpg` | Solar System Scope (NASA/JPL)        | 2048×1024, sRGB                |

`realTextures.ts` probes `planets/<id>_day.jpg` (and optional `normal`,
`roughness`, `clouds` channels) and swaps the real maps over the procedural
ones. Bodies without a day map (Venus, dwarf planets, moons other than the
Moon) keep their procedural look.
