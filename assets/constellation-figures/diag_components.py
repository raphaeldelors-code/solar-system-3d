#!/usr/bin/env python3
"""Diagnostic: component size histogram after border trim, to find figure/star gap."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

path, trim = sys.argv[1], (float(sys.argv[2]) if len(sys.argv) > 2 else 0.03)
im = Image.open(path)
W, H = im.size
x0, y0, x1, y1 = int(W * trim), int(H * trim), int(W * (1 - trim)), int(H * (1 - trim))
sub = im.crop((x0, y0, x1, y1))
scale = sub.size[0] / 2000
if scale > 1:
    sub = sub.resize((int(sub.size[0] / scale), int(sub.size[1] / scale)), Image.LANCZOS)
a = np.asarray(sub.convert("L"), dtype=np.uint8)
ink = a < 150
lab, n = ndimage.label(ink)
sizes = np.sort(ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1)))[::-1]
print(f"{path.split('/')[-1]} trimmed {sub.size}  {n} components")
print("top 40 sizes:", sizes[:40].astype(int))
# ink density within each top-30 component bbox (figure = moderate, gridline = tiny, blob = high)
for i in range(1, min(31, n + 1)):
    s = ndimage.sum(np.ones_like(ink), lab, index=[i])[0]
    if s < 200:
        break
    ys, xs = np.where(lab == i)
    bw, bh = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
    dens = s / (bw * bh)
    print(f"  comp{i:>4d} size={int(s):>9d} bbox={bw}x{bh} density={dens:.3f} at x{xs.min()}-{xs.max()} y{ys.min()}-{ys.max()}")
