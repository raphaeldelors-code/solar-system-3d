#!/usr/bin/env python3
"""Final figure extraction: trim border, drop small comps, render + save PNG.
Usage: extract.py path trim min_size out.png [label_idx]"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

path, trim, min_size, out = sys.argv[1:5]
trim = float(trim)
min_size = int(min_size)

im = Image.open(path)
W, H = im.size
x0, y0, x1, y1 = int(W * trim), int(H * trim), int(W * (1 - trim)), int(H * (1 - trim))
sub = im.crop((x0, y0, x1, y1))
sw, sh = sub.size
# analysis copy
scale = sw / 2400
sub_s = sub if scale <= 1 else sub.resize((2400, int(sh / scale)), Image.LANCZOS)
a = np.asarray(sub_s.convert("L"), dtype=np.uint8)
ink = a < 150
lab, n = ndimage.label(ink)
sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
keep_ids = [i + 1 for i, s in enumerate(sizes) if s >= min_size]
big = np.isin(lab, keep_ids)
ys, xs = np.where(big)
print(f"{path.split('/')[-1]} trimmed {sw}x{sh} kept {len(keep_ids)}/{n} comps ink={int(big.sum())}")
print(f"union bbox: x[{100*xs.min()/sw:.0f}%-{100*xs.max()/sw:.0f}%] y[{100*ys.min()/sh:.0f}%-{100*ys.max()/sh:.0f}%]")
# list kept comps with bbox (to spot strays)
comps = []
for i in keep_ids:
    s = int(sizes[i - 1])
    cys, cxs = np.where(lab == i)
    comps.append((s, cxs.min(), cys.min(), cxs.max(), cys.max()))
comps.sort(reverse=True)
for j, (s, cx0, cy0, cx1, cy1) in enumerate(comps[:20]):
    print(f"  comp {j}: {s:>8d}px x[{100*cx0/sw:.0f}%-{100*cx1/sw:.0f}%] y[{100*cy0/sh:.0f}%-{100*cy1/sh:.0f}%]")
# render union
m = big
im2 = Image.fromarray((m * 255).astype(np.uint8)).resize((96, 44))
px = np.asarray(im2)
chars = " .:-=+*#%@"
for y in range(44):
    print("  " + "".join(chars[min(9, int(int(px[y, x]) * 10 / 256))] for x in range(96)))
# save full-res PNG of union bbox (tight, small margin)
if len(xs):
    mrg = 40
    sx0, sy0 = max(0, int(xs.min() / scale) - mrg), max(0, int(ys.min() / scale) - mrg)
    sx1, sy1 = min(sw, int(xs.max() / scale) + mrg), min(sh, int(ys.max() / scale) + mrg)
    fa = np.asarray(sub.convert("L"), dtype=np.float32)[sy0:sy1, sx0:sx1]
    # mask: re-label at full res is heavy; instead use scaled-down membership mapped back
    ms = big[sy0 // max(1, int(scale)) : sy1 // max(1, int(scale)), sx0 // max(1, int(scale)) : sx1 // max(1, int(scale))]
    ms_full = Image.fromarray((ms * 255).astype(np.uint8)).resize((sx1 - sx0, sy1 - sy0), Image.BILINEAR)
    mask = np.asarray(ms_full) > 100
    alpha = np.where(mask, np.clip((255 - fa) / 255.0 * 1.5, 0, 1), 0.0)
    rgba = np.zeros((alpha.shape[0], alpha.shape[1], 4), np.uint8)
    rgba[..., 0] = 40
    rgba[..., 1] = 34
    rgba[..., 2] = 28
    rgba[..., 3] = (alpha * 255).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(out)
    print(f"saved {out} {sx1-sx0}x{sy1-sy0}")
