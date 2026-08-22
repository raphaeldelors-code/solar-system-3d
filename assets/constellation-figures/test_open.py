#!/usr/bin/env python3
"""Test morphological opening at several strengths; render each result."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

path = sys.argv[1]
trim = float(sys.argv[2]) if len(sys.argv) > 2 else 0.055
for it in (0, 1, 2, 3, 4, 5, 6, 8, 10):
    im = Image.open(path)
    W, H = im.size
    x0, y0, x1, y1 = int(W * trim), int(H * trim), int(W * (1 - trim)), int(H * (1 - trim))
    sub = im.crop((x0, y0, x1, y1))
    scale = sub.size[0] / 2400
    if scale > 1:
        sub = sub.resize((int(sub.size[0] / scale), int(sub.size[1] / scale)), Image.LANCZOS)
    a = np.asarray(sub.convert("L"), dtype=np.uint8)
    ink = a < 150
    if it:
        ink = ndimage.binary_opening(ink, iterations=it)
    # component count + total ink
    lab, n = ndimage.label(ink)
    big = [i for i in range(1, n + 1) if (lab == i).sum() >= 1000]
    print(f"opening={it}: ink={100*ink.mean():.2f}%  comps={n}  comps>=1000px={len(big)}")
    if it in (2, 4, 6):
        m = ink
        ys, xs = np.where(m)
        if len(xs):
            m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        im2 = Image.fromarray((m * 255).astype(np.uint8)).resize((96, 44))
        px = np.asarray(im2)
        chars = " .:-=+*#%@"
        for y in range(44):
            print("   " + "".join(chars[min(9, int(int(px[y, x]) * 10 / 256))] for x in range(96)))
