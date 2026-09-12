#!/usr/bin/env python3
"""Deterministic Milky-Way equirect texture baker.

Replaces the one-off /tmp/f2-bake-final.py (2026-09-12, plan 035 F2) with a
committed, reproducible generator.

Layers (all forward-splatted on a 4096x2048 canvas, 2:1 equirect):
  (a) diffuse galactic band — gaussian in |b| with multi-scale mottle, dark
      dust lanes, warm galactic-centre bulge, pole fade.
  (b) two star populations — dense faint field + sparse bright field, each
      with a band-concentration bias (more stars near the galactic plane).

The (l,b) -> (u,v) mapping uses the SAME chain the app uses at runtime
(scene frame of raDecToUnit in src/data/constellations.ts), so the band
lands on the real galactic plane (GC at u~0.87, v~0.5; poles at image edges).

Star density is controlled by --star-scale (1.0 = the original 2026-09-12
bake). 2026-09-12 pass 5: the user wants the band at its ORIGINAL glow
brightness but with MUCH fewer stars — the star populations are the speckle
the user is unhappy with, the band is the part they like. star-scale=0.10
keeps a believable star field at full-system zoom while making the band read
as a smooth glow rather than a field of 230k dots.

Usage:
    uv run --with numpy --with pillow python scripts/bake_milkyway.py \
        --star-scale 0.10 --out public/textures/milkyway_equirect.png
"""
import argparse
import numpy as np
from PIL import Image

OW, OH = 4096, 2048
D2R = np.pi / 180.0

# ---- galactic -> equatorial rotation (IAU 1992), 3-anchor construction ----
def _unit(ra, dec):
    ra *= D2R; dec *= D2R
    return np.array([np.cos(dec) * np.cos(ra),
                     np.cos(dec) * np.sin(ra),
                     np.sin(dec)], float)

def _gal(l, b):
    l *= D2R; b *= D2R
    return np.array([np.cos(b) * np.cos(l),
                     np.cos(b) * np.sin(l),
                     np.sin(b)], float)

xg = _gal(0, 0)           # galactic centre
zg = _gal(90, 90)         # NGP
yg = np.cross(zg, xg); yg /= np.linalg.norm(yg)
R = np.stack([xg, yg, zg], axis=-1).T   # rows = [xg,yg,zg]; vgal@R -> equatorial

# ---- forward chains (match scene.ts exactly) ----
def lb_to_radeclb(l, b):
    cb = np.cos(b * D2R)
    xg = cb * np.cos(l * D2R)
    yg = cb * np.sin(l * D2R)
    zg = np.sin(b * D2R)
    vg = np.stack([xg, yg, zg], axis=-1)
    ve = vg @ R
    dec = np.degrees(np.arcsin(np.clip(ve[..., 2], -1, 1)))
    ra = np.degrees(np.arctan2(ve[..., 1], ve[..., 0])) % 360.0
    return ra, dec

def radeclb_to_scene(ra, dec):
    ra *= D2R; dec *= D2R
    xe = np.cos(dec) * np.cos(ra); ye = np.cos(dec) * np.sin(ra); ze = np.sin(dec)
    return np.stack([-xe, ze, -ye], axis=-1)     # scene = [-x_eq, z_eq, -y_eq]

def scene_to_uv(s):
    """Exact inverse of three.js r168 equirectUv:
       u = atan2(dir.z, dir.x) / (2π) + 0.5
       v = asin(dir.y) / π + 0.5
    """
    u = (np.arctan2(s[..., 2], s[..., 0]) / (2.0 * np.pi) + 0.5) % 1.0
    v = np.arcsin(np.clip(s[..., 1], -1, 1)) / np.pi + 0.5
    return u, v

# ---- soft dot splat (accumulated, wrapped in u) ----
def splat_dots(canvas, u, v, val, radius_px):
    n = len(u)
    if n == 0:
        return
    u0 = np.floor(u * OW).astype(int)
    v0 = np.floor(v * OH).astype(int)
    for di in (-2, -1, 0, 1, 2):
        for dj in (-2, -1, 0, 1, 2):
            w = np.exp(-0.5 * (di * di + dj * dj) / (radius_px * 0.7 ** 2))
            ii = (v0 + di) % OH
            jj = (u0 + dj) % OW
            np.add.at(canvas, (ii, jj), val * w)

def bake(star_scale: float, out: str, band_scale: float = 0.16):
    # ============================ BAND (forward splat) =========================
    N = 420000
    rng = np.random.default_rng(5)
    l = rng.random(N) * 360.0
    b = rng.standard_normal(N) * 6.0
    b = np.clip(b, -45, 45)

    ra, dec = lb_to_radeclb(l, b)
    sc = radeclb_to_scene(ra, dec)
    u, v = scene_to_uv(sc)

    def gauss(bd, s):
        return np.exp(-0.5 * (bd / s) ** 2)

    def angdist(la, lb):
        d = np.abs(la - lb) % 360.0
        return np.minimum(d, 360 - d)

    def hash2(cl, cb, seed):
        cl = (cl.astype(np.int64) % 1024)
        cb = (cb.astype(np.int64) % 1024)
        h = (cl * 374761393 + cb * 668265263 + seed * 974634551) & 0x7FFFFFFF
        h = ((h ^ (h >> 13)) * 1274126177) & 0x7FFFFFFF
        return (h / 2.0 ** 31) - 0.5

    def vnoise(l, b, cells, lcells, seed):
        fl = l / cells; fb = b / cells
        cl = np.floor(fl); cb = np.floor(fb)
        fx = fl - cl; fy = fb - cb
        fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy)
        clw = cl % lcells
        c00 = hash2(clw, cb, seed); c10 = hash2((cl + 1) % lcells, cb, seed)
        c01 = hash2(clw, cb + 1, seed); c11 = hash2((cl + 1) % lcells, cb + 1, seed)
        top = c00 + (c10 - c00) * fx
        bot = c01 + (c11 - c01) * fx
        return top + (bot - top) * fy

    m = (vnoise(l, b, 18, 20, 11) * 0.5 +
         vnoise(l, b, 36, 10, 29) * 0.3 +
         vnoise(l, b, 72, 5, 47) * 0.2)

    core = gauss(b, 3.2); halo = gauss(b, 11.0)
    band = 0.55 * core + 0.45 * halo
    band /= band.max()
    band = band * (1.0 + 1.6 * np.clip(m, -0.8, 0.9))
    dust = -np.clip(vnoise(l, b, 14, 25, 88) + 0.6 * vnoise(l, b, 30, 12, 99), -1, 0)
    band = band * (1.0 + 0.85 * dust * gauss(b, 5.0))
    band = band * (1.0 - np.clip((np.abs(b) - 40) / 50, 0, 1))

    bulge = 0.9 * np.exp(-0.5 * ((angdist(l, 0.0) / 10.0) ** 2 + (b / 5.0) ** 2))

    base_r = band * (0.62 + 0.55 * bulge) + bulge * 0.5
    base_g = band * (0.66 + 0.42 * bulge) + bulge * 0.36
    base_b = band * (0.78 - 0.14 * bulge) + bulge * 0.08

    canvas_r = np.zeros((OH, OW), np.float32)
    canvas_g = np.zeros((OH, OW), np.float32)
    canvas_b = np.zeros((OH, OW), np.float32)
    splat_dots(canvas_r, u, v, base_r, 4.0)
    splat_dots(canvas_g, u, v, base_g, 4.0)
    splat_dots(canvas_b, u, v, base_b, 4.0)

    cov = np.zeros((OH, OW), np.float32)
    splat_dots(cov, u, v, np.ones(N), 4.0)
    cov = np.maximum(cov, 1e-6)
    scale = band_scale
    band_r = canvas_r / cov * scale
    band_g = canvas_g / cov * scale
    band_b = canvas_b / cov * scale
    band_mask = cov > 2.0
    band_r = np.where(band_mask, band_r, 0.0)
    band_g = np.where(band_mask, band_g, 0.0)
    band_b = np.where(band_mask, band_b, 0.0)

    # ============================ STARS (forward splat) =========================
    def make_stars(N, bv_mu, bv_sd, mag_lo, mag_hi, band_conc, seed):
        r = np.random.default_rng(seed)
        bv = r.standard_normal(N) * bv_sd + bv_mu
        bv = np.clip(bv, -0.3, 1.8)
        mag = mag_lo + (mag_hi - mag_lo) * r.random(N) ** 2.2
        b = r.standard_normal(N) * (4.0 if band_conc > 0 else 89)
        l = r.random(N) * 360
        if band_conc > 0:
            inband = r.random(N) < band_conc
            b[inband] = r.standard_normal(int(inband.sum())) * 3.0
        b = np.clip(b, -89, 89)
        return l, b, bv, mag

    def bv_to_rgb(bv):
        bv = np.clip(bv, -0.3, 1.8)
        r = np.ones_like(bv)
        g = 1.0 - 0.30 * np.clip(bv, 0, 1.0)
        bl = 1.0 - 0.60 * np.clip(bv, 0, 1.6)
        hot = np.clip(-bv, 0, 1.0)
        r = r * (1.0 - 0.25 * hot); bl = bl * (1.0 + 0.5 * hot)
        return r, g, bl

    star_r = np.zeros((OH, OW), np.float32)
    star_g = np.zeros((OH, OW), np.float32)
    star_b = np.zeros((OH, OW), np.float32)

    # dense faint — 220k at star_scale 1.0
    n_dense = int(round(220000 * star_scale))
    if n_dense:
        l, b, bv, mag = make_stars(n_dense, 0.7, 0.5, 3.4, 6.8, 0.55, 101)
        r, g, bl = bv_to_rgb(bv)
        brt = np.clip(2.4 - (mag - 3.4) * 0.35, 0.12, 0.6)
        ra, dec = lb_to_radeclb(l, b); sc = radeclb_to_scene(ra, dec); u, v = scene_to_uv(sc)
        splat_dots(star_r, u, v, r * brt, 1.2)
        splat_dots(star_g, u, v, g * brt, 1.2)
        splat_dots(star_b, u, v, bl * brt, 1.2)

    # sparse bright — 14k at star_scale 1.0
    n_sparse = int(round(14000 * star_scale))
    if n_sparse:
        l, b, bv, mag = make_stars(n_sparse, 0.6, 0.5, 2.0, 3.6, 0.5, 202)
        r, g, bl = bv_to_rgb(bv)
        brt = np.clip(3.0 - (mag - 2.0) * 0.5, 0.6, 1.3)
        ra, dec = lb_to_radeclb(l, b); sc = radeclb_to_scene(ra, dec); u, v = scene_to_uv(sc)
        splat_dots(star_r, u, v, r * brt, 1.6)
        splat_dots(star_g, u, v, g * brt, 1.6)
        splat_dots(star_b, u, v, bl * brt, 1.6)

    # ============================ COMBINE =====================================
    sky = np.zeros((OH, OW, 3), np.float32)
    sky[..., 0] = 0.006
    sky[..., 1] = 0.010
    sky[..., 2] = 0.018            # near-black faint blue
    sky[..., 0] += band_r
    sky[..., 1] += band_g
    sky[..., 2] += band_b
    sky[..., 0] += star_r
    sky[..., 1] += star_g
    sky[..., 2] += star_b
    sky = np.clip(sky, 0, 1)

    img = Image.fromarray((sky * 255).astype(np.uint8), "RGB")
    img.save(out)
    print("saved", out, img.size, f"star_scale={star_scale}")
    print("mean RGB:", np.round(sky.mean(axis=(0, 1)), 4))
    gray = sky.max(axis=2)
    bright = int((gray > 0.55).sum())
    print(f"pixels>0.55 (star-ish): {bright} ({100 * bright / (OH * OW):.2f}%)")

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--star-scale", type=float, default=0.10,
                    help="star population size multiplier (1.0 = original bake)")
    ap.add_argument("--band-scale", type=float, default=0.16,
                    help="smooth band-glow luminance multiplier (1.0 = original bake)")
    ap.add_argument("--out", default="/home/hermes/projects/solar-system-3d/public/textures/milkyway_equirect.png")
    a = ap.parse_args()
    bake(a.star_scale, a.out, a.band_scale)
