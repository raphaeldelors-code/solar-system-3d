#!/usr/bin/env python3
"""Render the union of components >= min_size as ASCII (trimmed crop, no borders)."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

path = sys.argv[1]
trim = float(sys.argv[2]) if len(sys.argv) > 2 else 0.04
min_size = int(sys.argv[3]) if len(sys.argv) > 3 else 1500
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
sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
keep = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= min_size])
ys, xs = np.where(keep)
print(f"{path.split('/')[-1]} min_size={min_size}  kept ink={int(keep.sum())}  x[{xs.min()}-{xs.max()}] y[{ys.min()}-{ys.max()}] of {sub.size}")
m = keep[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
im2 = Image.fromarray((m * 255).astype(np.uint8)).resize((100, 52))
px = np.asarray(im2)
chars = " .:-=+*#%@"
for y in range(52):
    print("  " + "".join(chars[min(9, int(int(px[y, x]) * 10 / 256))] for x in range(100)))
