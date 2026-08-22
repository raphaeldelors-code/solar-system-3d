#!/usr/bin/env python3
"""Figure fitter v2.
Size = deterministic from the star distribution's angular diameter
(× margin, capped), so the plate matches the constellation's sky extent.
Offset (RA/Dec) is then fit (min mean star->ink distance + outside penalty)
at that fixed size to align the animal's body with the stars.
Prints ready-to-paste FIGURE_FITS values.
"""
import math
import re

import numpy as np
from PIL import Image

SRC = "/opt/data/solar-system-3d/src/data/constellations.ts"
OUT = "/opt/data/solar-system-3d/public/constellation-figures"
R = 4800.0
PAD = 0.06
DEG = math.pi / 180
MARGIN = 1.25
SIZE_CAP = 70.0

src = open(SRC).read()


def stars_for(name):
    m = re.search(r"name:\s*'" + re.escape(name) + r"'", src)
    start = m.end()
    end = src.find("lines:", start)
    return [(float(a), float(b))
            for a, b in re.findall(r"raHours:\s*([-\d.]+),\s*decDeg:\s*([-\d.]+)", src[start:end])]


def u(ra, dec):
    ra_r = ra * 15 * DEG
    d = dec * DEG
    c = math.cos(d)
    return np.array([-c * math.cos(ra_r), math.sin(d), -c * math.sin(ra_r)])


def cross(a, b):
    return np.array([a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]])


def plate_frame(n, sizeDeg):
    n = n / (np.linalg.norm(n) or 1)
    v0 = np.array([-n[1] * n[0], 1 - n[1] ** 2, -n[1] * n[2]])
    if np.linalg.norm(v0) < 1e-6:
        v0 = np.array([1.0, 0, 0])
    up = v0 / np.linalg.norm(v0)
    Z = -n
    X = cross(up, Z)
    X = X / np.linalg.norm(X)
    Y = cross(Z, X)
    center = n * R
    usable = sizeDeg * DEG * (1 - 2 * PAD)
    return center, X, Y, usable * R / 2, usable * R / 2


fits = {
    "Orion": ("orion.png", 1.412),
    "Ursa Major": ("ursa_major.png", 0.832),
    "Cygnus": ("cygnus.png", 0.844),
    "Scorpius": ("scorpius.png", 1.418),
    "Leo": ("leo.png", 1.370),
}

results = {}
for name, (png, aspect) in fits.items():
    st = stars_for(name)
    vs = np.array([u(ra, dec) for ra, dec in st])  # Nx3
    n0 = vs.mean(axis=0)
    n0 = n0 / np.linalg.norm(n0)
    dec0 = math.degrees(math.asin(n0[1]))
    ra0 = math.degrees(math.atan2(-n0[2], -n0[0])) / 15 % 24

    # deterministic size from star span
    cos = np.clip(vs @ vs.T, -1, 1)
    span = math.degrees(np.arccos(cos).max())
    size = min(span * MARGIN, SIZE_CAP)

    im = Image.open(f"{OUT}/{png}").convert("L")
    im = im.resize((80, max(8, int(80 * im.height / im.width))), Image.LANCZOS)
    arr = np.asarray(im, dtype=np.float32) / 255.0
    ys, xs = np.nonzero(arr > 0.15)
    fu = xs / (im.width - 1) - 0.5
    fw = 0.5 - ys / (im.height - 1)
    ink = np.stack([fu, fw], axis=1)
    if len(fu) > 1500:
        sel = np.linspace(0, len(fu) - 1, 1500).astype(int)
        ink = ink[sel]

    best = (1e9, 0.0, 0.0, 0)
    for ora in np.arange(-1.5, 1.51, 0.25):
        for odec in np.arange(-10, 10.01, 1.0):
            n = u(ra0 + ora, dec0 + odec)
            center, X, Y, hw, hh = plate_frame(n, size)
            p = vs * R
            q = p - center
            sp = np.stack([q @ X, q @ Y], axis=1)
            d = sp[:, None, :] - ink[None, :, :]
            dm = np.sqrt((d ** 2).sum(axis=2)).min(axis=1)
            outside = (np.abs(sp[:, 0]) > hw) | (np.abs(sp[:, 1]) > hh)
            s = float(dm.mean() / R / DEG) + 1.5 * float(outside.sum())
            if s < best[0]:
                best = (s, float(ora), float(odec), int(float(outside.sum())))

    s, ora, odec, outn = best
    results[name] = (ora, odec, size)
    print(f"{name:12s} span={span:5.1f}° -> size={size:5.1f}°  offsetRA={ora:+.2f}h  "
          f"offsetDec={odec:+.1f}°  mean-ink={s:5.2f}  stars-out={outn}/{len(vs)}")

print("\n// paste into src/data/figures.ts (aspects from tight-crop PNGs):")
for name, (ora, odec, size) in results.items():
    extra = ""
    if abs(ora) > 1e-9:
        extra += f" offsetRAHours: {ora:+.2f},"
    if abs(odec) > 1e-9:
        extra += f" offsetDecDeg: {odec:+.1f},"
    a = fits[name][1]
    print(f"  {{ constellation: '{name}', aspect: {a}, sizeDeg: {size:.1f},{extra} }},")
