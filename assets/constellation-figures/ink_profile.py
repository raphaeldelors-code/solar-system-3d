#!/usr/bin/env python3
"""Row/column ink-density profiles to locate the densest figure block per plate."""
import sys
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None


def profile(path, thresh=150, smooth=0):
    im = Image.open(path).convert("L")
    a = np.asarray(im, dtype=np.float32)
    H, W = a.shape
    ink = (a < thresh).astype(np.float32)
    if smooth:
        ink = ndimage_filter(ink, smooth)
    rows = ink.sum(axis=1)  # ink per row
    cols = ink.sum(axis=0)  # ink per column
    # normalize
    print(f"## {path.split('/')[-1]} {W}x{H}")
    # Print a compact profile: 40 bins each axis
    nb = 40
    rbin = np.array_split(rows, nb)
    cbin = np.array_split(cols, nb)
    rmax = max(x.sum() for x in rbin) or 1
    cmax = max(x.sum() for x in cbin) or 1
    print("  rows (top->bottom):")
    for i, x in enumerate(rbin):
        bar = "#" * int(60 * x.sum() / rmax)
        print(f"    {100*i/nb:3.0f}-{100*(i+1)/nb:3.0f}% |{bar}")
    print("  cols (left->right):")
    for i, x in enumerate(cbin):
        bar = "#" * int(60 * x.sum() / cmax)
        print(f"    {100*i/nb:3.0f}-{100*(i+1)/nb:3.0f}% |{bar}")


def ndimage_filter(a, r):
    # box blur via numpy cumsum
    c = np.cumsum(np.insert(a, 0, 0, axis=1), axis=1)
    # simple moving sum
    out = np.zeros_like(a)
    win = 2 * r + 1
    for y in range(a.shape[0]):
        cs = np.cumsum(np.insert(a[y], 0, 0))
        lo = np.arange(0, len(cs) - win)
        hi = lo + win
        out[y] = (cs[hi] - cs[lo]) / win
    return out


if __name__ == "__main__":
    for p in sys.argv[1:]:
        full = Image.open(p)
        full.thumbnail((1400, 14000), Image.LANCZOS)
        import tempfile
        tmp = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False)
        full.save(tmp.name, quality=92)
        profile(tmp.name)
