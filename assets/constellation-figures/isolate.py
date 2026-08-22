#!/usr/bin/env python3
"""Isolate the constellation figure (line-art) from a Bode plate and emit a
transparent PNG + an ASCII render so results can be verified text-first."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None


def load_gray(path, max_w=3200):
    im = Image.open(path)
    scale = im.size[0] / max_w
    if scale > 1:
        im = im.resize((int(im.size[0] / scale), int(im.size[1] / scale)), Image.LANCZOS)
    return im.convert("L"), im.size


def isolate(gray, thresh=150, min_comp=120, erode=1):
    a = np.asarray(gray, dtype=np.float32)
    ink = a < thresh
    # open: erode then dilate to break thin star dots / grid lines, keep thick figure strokes
    if erode > 0:
        ink = ndimage.binary_opening(ink, iterations=erode)
    lab, n = ndimage.label(ink)
    if n == 0:
        return np.zeros_like(ink, bool), 0, 0
    sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
    keep = np.zeros_like(ink, bool)
    nkeep = 0
    for i, s in enumerate(sizes, start=1):
        if s >= min_comp:
            keep |= (lab == i)
            nkeep += 1
    return keep, nkeep, int(n)


def bbox_crop(mask, margin=20):
    ys, xs = np.where(mask)
    if len(xs) == 0:
        return None
    x0, x1 = max(0, xs.min() - margin), min(mask.shape[1], xs.max() + margin)
    y0, y1 = max(0, ys.min() - margin), min(mask.shape[0], ys.max() + margin)
    return x0, y0, x1, y1


def make_png(gray, mask, crop, out_path, ink_rgb=(30, 26, 22)):
    x0, y0, x1, y1 = crop
    a = np.asarray(gray, dtype=np.float32)
    # alpha = how dark the pixel is (ink), within the kept mask
    sub_ink = (255 - a[y0:y1, x0:x1]) / 255.0
    sub_mask = mask[y0:y1, x0:x1]
    alpha = np.where(sub_mask, sub_ink, 0.0)
    # boost alpha for visible ink
    alpha = np.clip(alpha * 1.35, 0, 1)
    h, w = alpha.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[..., 0] = ink_rgb[0]
    rgba[..., 1] = ink_rgb[1]
    rgba[..., 2] = ink_rgb[2]
    rgba[..., 3] = (alpha * 255).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(out_path)
    return w, h


def ascii_render(mask, w=88, h=46):
    H, W = mask.shape
    im = Image.fromarray((mask * 255).astype(np.uint8)).resize((w, h))
    px = np.asarray(im)
    chars = " .:-=+*#%@"
    out = []
    for y in range(h):
        row = "".join(chars[min(len(chars) - 1, int(v * len(chars) / 256))] for v in px[y])
        out.append(row)
    return "\n".join(out)


if __name__ == "__main__":
    # args: path thresh min_comp erode out.png
    path = sys.argv[1]
    thresh = int(sys.argv[2]) if len(sys.argv) > 2 else 150
    min_comp = int(sys.argv[3]) if len(sys.argv) > 3 else 120
    erode = int(sys.argv[4]) if len(sys.argv) > 4 else 1
    out_path = sys.argv[5] if len(sys.argv) > 5 else "out.png"
    gray, full = load_gray(path)
    mask, nkeep, ntot = isolate(gray, thresh, min_comp, erode)
    crop = bbox_crop(mask)
    print(f"{path.split('/')[-1]}  full={full}  components {nkeep}/{ntot} kept")
    if crop:
        w, h = make_png(gray, mask, crop, out_path)
        print(f"  crop {crop} -> {out_path}  {w}x{h}  ink_px={int(mask[crop[1]:crop[3], crop[0]:crop[2]].sum())}")
        print(ascii_render(mask[crop[1]:crop[3], crop[0]:crop[2]]))
