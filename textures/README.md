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
