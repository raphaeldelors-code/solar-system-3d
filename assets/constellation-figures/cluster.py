#!/usr/bin/env python3
"""Cluster figure strokes: keep comps >= min_size, dilate-union, label clusters,
report each cluster (bbox, ink) and ASCII-render the largest. Optional: save PNG
of cluster #N (or largest) as transparent ink."""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None

path = sys.argv[1]
trim = float(sys.argv[2]) if len(sys.argv) > 2 else 0.045
min_size = int(sys.argv[3]) if len(sys.argv) > 3 else 800
dilate = int(sys.argv[4]) if len(sys.argv) > 4 else 12
save = sys.argv[5] if len(sys.argv) > 5 else None

im = Image.open(path)
W, H = im.size
x0, y0, x1, y1 = int(W * trim), int(H * trim), int(W * (1 - trim)), int(H * (1 - trim))
sub = im.crop((x0, y0, x1, y1))
full_sub = sub
sub_s = sub
scale = sub_s.size[0] / 2400
if scale > 1:
    sub_s = sub_s.resize((int(sub_s.size[0] / scale), int(sub_s.size[1] / scale)), Image.LANCZOS)
a = np.asarray(sub_s.convert("L"), dtype=np.uint8)
ink = a < 150
lab, n = ndimage.label(ink)
sizes = ndimage.sum(np.ones_like(ink), lab, index=range(1, n + 1))
keep_ids = [i + 1 for i, s in enumerate(sizes) if s >= min_size]
big = np.isin(lab, keep_ids)
# dilate union to cluster nearby components
clab, cn = ndimage.label(ndimage.binary_dilation(big, iterations=dilate))
clusters = []
for i in range(1, cn + 1):
    m = (clab == i) & big
    s = int(m.sum())
    if s < 2000:
        continue
    ys, xs = np.where(m)
    clusters.append((s, int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())))
clusters.sort(reverse=True)
sw, sh = sub_s.size
print(f"{path.split('/')[-1]} trim={trim} min_size={min_size} dilate={dilate}  {cn} clusters (>=2000px)")
for j, (s, cx0, cy0, cx1, cy1) in enumerate(clusters[:10]):
    print(f"  #{j}: {s:>9d}px  x[{100*cx0/sw:.0f}%-{100*cx1/sw:.0f}%] y[{100*cy0/sh:.0f}%-{100*cy1/sh:.0f}%]  {cx1-cx0}x{cy1-cy0}")

def render_cluster(idx):
    s, cx0, cy0, cx1, cy1 = clusters[idx]
    m = ((clab == idx + 1) & big)[cy0:cy1 + 1, cx0:cx1 + 1]
    im2 = Image.fromarray((m * 255).astype(np.uint8)).resize((96, 44))
    px = np.asarray(im2)
    chars = " .:-=+*#%@"
    lines = []
    for y in range(44):
        lines.append("  " + "".join(chars[min(9, int(int(px[y, x]) * 10 / 256))] for x in range(96)))
    return "\n".join(lines)

print("\nLARGEST CLUSTER (#0):")
print(render_cluster(0))

if save:
    idx = 0
    s, cx0, cy0, cx1, cy1 = clusters[idx]
    # full-res ink mask in this cluster's bbox (with margin), from FULL-resolution grayscale
    # map sub_s bbox -> full_sub coords
    fx0, fy0 = int(cx0 / scale) if scale > 1 else cx0, int(cy0 / scale) if scale > 1 else cy0
    fx1, fy1 = int(cx1 / scale) if scale > 1 else cx1, int(cy1 / scale) if scale > 1 else cy1
    m = 30
    fx0, fy0 = max(0, fx0 - m), max(0, fy0 - m)
    fx1, fy1 = min(full_sub.size[0], fx1 + m), min(full_sub.size[1], fy1 + m)
    fa = np.asarray(full_sub.convert("L"), dtype=np.float32)[fy0:fy1, fx0:fx1]
    # cluster membership at full res: use sub_s cluster bbox + threshold only
    alpha = np.clip((255 - fa) / 255.0 * 1.4, 0, 1)
    rgba = np.zeros((alpha.shape[0], alpha.shape[1], 4), np.uint8)
    rgba[..., 0] = 38
    rgba[..., 1] = 32
    rgba[..., 2] = 26
    rgba[..., 3] = (alpha * 255).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(save)
    print(f"\nsaved {save} {fx1-fx0}x{fy1-fy0} (threshold-only within cluster bbox, full-res)")
