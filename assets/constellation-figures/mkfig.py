#!/usr/bin/env python3
"""Production figure extraction: full-res window crop -> speckle removal ->
transparent PNG + ASCII preview for text-based verification.

Usage: mkfig.py <src.jpg> <out.png> <fx0> <fy0> <fx1> <fy1> [min_size=1500] [trim_frac=0.02]

Coordinates are fractions of the FULL plate. trim_frac trims the window edges
(as fraction of window size) to avoid the plate border ring.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None


def main():
    src, out = sys.argv[1], sys.argv[2]
    fx0, fy0, fx1, fy1 = (float(v) for v in sys.argv[3:7])
    min_size = int(sys.argv[7]) if len(sys.argv) > 7 else 1500
    trim = float(sys.argv[8]) if len(sys.argv) > 8 else 0.02

    im = Image.open(src)
    W, H = im.size
    x0, y0, x1, y1 = int(W * fx0), int(H * fy0), int(W * fx1), int(H * fy1)
    win = im.crop((x0, y0, x1, y1))
    ww, wh = win.size
    # trim edges to kill border ring
    tx, ty = int(ww * trim), int(wh * trim)
    win = win.crop((tx, ty, ww - tx, wh - ty))
    a = np.asarray(win.convert("L"), dtype=np.uint8)
    ink = a < 150
    lab, n = ndimage.label(ink)
    sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
    keep = np.zeros_like(ink, bool)
    nk = 0
    for i, s in enumerate(sizes, 1):
        if s >= min_size:
            keep |= lab == i
            nk += 1
    ys, xs = np.where(keep)
    print(f"{src.split('/')[-1]} -> {out}")
    print(f"  window {ww}x{wh} (trimmed {tx},{ty})  kept {nk}/{n} comps  ink {int(keep.sum())} px")
    if not len(xs):
        print("  EMPTY")
        return
    bx0, bx1, by0, by1 = xs.min(), xs.max(), ys.min(), ys.max()
    print(f"  figure bbox: x[{100*bx0/win.size[0]:.0f}%-{100*bx1/win.size[0]:.0f}%] y[{100*by0/win.size[1]:.0f}%-{100*by1/win.size[1]:.0f}%]  {bx1-bx0}x{by1-by0}px")
    # ASCII preview of the kept ink (full window)
    pw, ph = 90, 42
    pm = np.asarray(Image.fromarray((keep * 255).astype(np.uint8)).resize((pw, ph)))
    chars = " .:-=+*#%@"
    for y in range(ph):
        print("  " + "".join(chars[min(9, int(int(pm[y, x]) * 10 / 256))] for x in range(pw)))
    # output: tight crop around figure bbox + margin
    m = max(25, int(0.02 * (bx1 - bx0)))
    cx0, cy0 = max(0, bx0 - m), max(0, by0 - m)
    cx1, cy1 = min(win.size[0], bx1 + m), min(win.size[1], by1 + m)
    # alpha from darkness within kept mask
    sub_ink = keep[cy0:cy1, cx0:cx1]
    sub_a = a[cy0:cy1, cx0:cx1]
    alpha = np.where(sub_ink, np.clip((255 - sub_a.astype(np.float32)) / 255.0 * 1.6, 0, 1), 0.0)
    # soften alpha edge
    alpha = ndimage.gaussian_filter(alpha, 0.6)
    rgba = np.zeros((alpha.shape[0], alpha.shape[1], 4), np.uint8)
    rgba[..., 0] = 233
    rgba[..., 1] = 226
    rgba[..., 2] = 208
    rgba[..., 3] = (alpha * 255).astype(np.uint8)
    out_im = Image.fromarray(rgba, "RGBA")
    # cap output width at 1400 for sprite size
    if out_im.size[0] > 1400:
        s = 1400 / out_im.size[0]
        out_im = out_im.resize((1400, int(out_im.size[1] * s)), Image.LANCZOS)
    out_im.save(out)
    print(f"  saved {out} {out_im.size[0]}x{out_im.size[1]}")


if __name__ == "__main__":
    main()
