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
if the load fails, which looks like a regression. To regenerate, re-run
the bake and overwrite this file (see plan 035 F2 notes).
