#!/usr/bin/env python3
"""Windowed figure extraction: full-plate % window -> drop small comps -> render + save.
Usage: extract_win.py path fx0 fy0 fx1 fy1 min_size out.png"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

path = sys.argv[1]
fx0, fy0, fx1, fy1 = (float(v) for v in sys.argv[2:6])
min_size = int(sys.argv[6])
out = sys.argv[7]

im = Image.open(path)
W, H = im.size
x0, y0, x1, y1 = int(W * fx0), int(H * fy0), int(W * fx1), int(H * fy1)
sub = im.crop((x0, y0, x1, y1))
sw, sh = sub.size
scale = sw / 2400
sub_s = sub if scale <= 1 else sub.resize((2400, int(sh / scale)), Image.LANCZOS)
a = np.asarray(sub_s.convert("L"), dtype=np.uint8)
ink = a < 150
lab, n = ndimage.label(ink)
sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
keep_ids = [i + 1 for i, s in enumerate(sizes) if s >= min_size]
big = np.isin(lab, keep_ids)
ys, xs = np.where(big)
print(f"{path.split('/')[-1]} win=({fx0:.2f},{fy0:.2f})-({fx1:.2f},{fy1:.2f}) {sw}x{sh} kept {len(keep_ids)}/{n} ink={int(big.sum())}")
for i in sorted(keep_ids, key=lambda i: -sizes[i - 1])[:12]:
    cys, cxs = np.where(lab == i)
    print(f"  comp {int(sizes[i-1]):>8d}px x[{100*cxs.min()/sw:.0f}%-{100*cxs.max()/sw:.0f}%] y[{100*cys.min()/sh:.0f}%-{100*cys.max()/sh:.0f}%]")
if len(xs) == 0:
    print("EMPTY")
    sys.exit(1)
# render union tight to ink bbox
bx0, bx1, by0, by1 = xs.min(), xs.max(), ys.min(), ys.max()
m = big[by0:by1 + 1, bx0:bx1 + 1]
im2 = Image.fromarray((m * 255).astype(np.uint8)).resize((88, 44))
px = np.asarray(im2)
chars = " .:-=+*#%@"
for y in range(44):
    print("  " + "".join(chars[min(9, int(int(px[y, x]) * 10 / 256))] for x in range(88)))
# save full-res transparent PNG
mrg = 30
sx0, sy0 = max(0, int(bx0 / scale) - mrg), max(0, int(by0 / scale) - mrg)
sx1, sy1 = min(sw, int(bx1 / scale) + mrg), min(sh, int(by1 / scale) + mrg)
fa = np.asarray(sub.convert("L"), dtype=np.float32)[sy0:sy1, sx0:sx1]
ms = big[int(by0 / scale):int(by1 / scale), int(bx0 / scale):int(bx1 / scale)]
ms_f = np.asarray(Image.fromarray((ms * 255).astype(np.uint8)).resize((sx1 - sx0, sy1 - sy0), Image.BILINEAR)) > 100
alpha = np.where(ms_f, np.clip((255 - fa) / 255.0 * 1.5, 0, 1), 0.0)
rgba = np.zeros((alpha.shape[0], alpha.shape[1], 4), np.uint8)
rgba[..., 0] = 40
rgba[..., 1] = 34
rgba[..., 2] = 28
rgba[..., 3] = (alpha * 255).astype(np.uint8)
Image.fromarray(rgba, "RGBA").save(out)
print(f"saved {out} {sx1-sx0}x{sy1-sy0}")
