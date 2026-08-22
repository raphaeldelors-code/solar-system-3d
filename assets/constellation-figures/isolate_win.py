#!/usr/bin/env python3
"""Isolate a figure inside a user-given window (fractions of full image)."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None


def main():
    path, fx0, fy0, fx1, fy1 = sys.argv[1:6]
    fx0, fy0, fx1, fy1 = (float(v) for v in (fx0, fy0, fx1, fy1))
    thresh = int(sys.argv[6]) if len(sys.argv) > 6 else 150
    min_comp = int(sys.argv[7]) if len(sys.argv) > 7 else 60
    erode = int(sys.argv[8]) if len(sys.argv) > 8 else 1
    out = sys.argv[9] if len(sys.argv) > 9 else None

    im = Image.open(path)
    W, H = im.size
    x0, y0, x1, y1 = int(W * fx0), int(H * fy0), int(W * fx1), int(H * fy1)
    sub = im.crop((x0, y0, x1, y1))
    # cap resolution
    scale = sub.size[0] / 2600
    if scale > 1:
        sub = sub.resize((int(sub.size[0] / scale), int(sub.size[1] / scale)), Image.LANCZOS)
    gray = np.asarray(sub.convert("L"), dtype=np.float32)
    ink = gray < thresh
    if erode:
        ink = ndimage.binary_opening(ink, iterations=erode)
    lab, n = ndimage.label(ink)
    sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
    keep = np.zeros_like(ink, bool)
    nk = 0
    for i, s in enumerate(sizes, 1):
        if s >= min_comp:
            keep |= lab == i
            nk += 1
    ys, xs = np.where(keep)
    if len(xs) == 0:
        print("empty")
        return
    cx0, cx1 = xs.min(), xs.max()
    cy0, cy1 = ys.min(), ys.max()
    print(f"{path.split('/')[-1]} win=({fx0},{fy0})-({fx1},{fy1}) full={W}x{H}")
    print(f"  kept {nk}/{n} comps, ink={int(keep.sum())}, bbox in-window x[{cx0}-{cx1}] y[{cy0}-{cy1}]")
    # ASCII render of kept ink
    h = keep.shape[0]
    w = keep.shape[1]
    im2 = Image.fromarray((keep * 255).astype(np.uint8)).resize((92, 48))
    px = np.asarray(im2)
    chars = " .:-=+*#%@"
    for y in range(48):
        print("    " + "".join(chars[min(9, int(v * 10 / 256))] for v in px[y]))
    if out:
        # emit transparent PNG at good resolution (crop to ink bbox with margin)
        m = max(20, int(0.03 * h))
        bx0, by0, bx1, by1 = max(0, cx0 - m), max(0, cy0 - m), min(w, cx1 + m), min(h, cy1 + m)
        a = gray[by0:by1, bx0:bx1]
        k = keep[by0:by1, bx0:bx1]
        alpha = np.where(k, np.clip((255 - a) / 255.0 * 1.5, 0, 1), 0.0)
        rgba = np.zeros((alpha.shape[0], alpha.shape[1], 4), np.uint8)
        rgba[..., 0] = 35
        rgba[..., 1] = 30
        rgba[..., 2] = 25
        rgba[..., 3] = (alpha * 255).astype(np.uint8)
        Image.fromarray(rgba, "RGBA").save(out)
        print(f"  -> {out} {bx1-bx0}x{by1-by0}")


if __name__ == "__main__":
    main()
