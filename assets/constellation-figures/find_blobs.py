#!/usr/bin/env python3
"""Find figure blobs on Bode plates: threshold ink, dilate, scipy connected components."""
import sys
import tempfile
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None


def analyze(path, full_w, thresh=150, dilate=6):
    im = Image.open(path).convert("L")
    a = np.asarray(im)
    H, W = a.shape
    ink = a < thresh
    # dilate to merge figure strokes (stars are isolated small dots -> filtered by size)
    d = ndimage.binary_dilation(ink, iterations=dilate)
    lab, n = ndimage.label(d)
    comps = []
    for i in range(1, n + 1):
        m = lab == i
        size = int(m.sum())
        if size < 4000:
            continue
        ys, xs = np.where(m)
        comps.append((size, int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())))
    comps.sort(reverse=True)
    print(f"## {path.split('/')[-1]} {W}x{H}  ink<{thresh}: {100*ink.mean():.1f}%")
    print("   bg p10/p50/p90:", np.percentile(a, [10, 50, 90]).astype(int))
    for size, x0, y0, x1, y1 in comps[:14]:
        ar = (x1 - x0) / max(1, (y1 - y0))
        print(f"   blob {size:>9d}px  x[{x0}-{x1}] y[{y0}-{y1}]  x[{100*x0/W:.0f}%-{100*x1/W:.0f}%] y[{100*y0/H:.0f}%-{100*y1/H:.0f}%]  AR {ar:.2f}")


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        # arg = path:thresh[:dilate]
        parts = arg.split(":")
        path = parts[0]
        thresh = int(parts[1]) if len(parts) > 1 else 150
        dilate = int(parts[2]) if len(parts) > 2 else 6
        full = Image.open(path)
        full_w = full.size[0]
        full.thumbnail((1700, 17000), Image.LANCZOS)
        tmp = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False)
        full.save(tmp.name, quality=92)
        print(f"(analyzing at {full.size[0]}px wide)")
        analyze(tmp.name, full.size[0], thresh, dilate)
