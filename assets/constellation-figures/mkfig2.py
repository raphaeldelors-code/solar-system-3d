#!/usr/bin/env python3
"""Figure-only extraction: density-cluster the ink so the localised, dense
figure strokes survive while the thin spread-out graticule arcs drop out.

Pipeline: threshold ink -> drop tiny specks -> local density map (disk
kernel) -> high-density mask -> components -> keep dense clusters -> union
with original ink at full resolution.

Usage: mkfig2.py src.jpg out.png fx0 fy0 fx1 fy1 [min_comp=300] [disk=18] [dens=0.10]
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None


def main():
    src, out = sys.argv[1], sys.argv[2]
    fx0, fy0, fx1, fy1 = [float(v) for v in sys.argv[3:7]]
    min_comp = int(sys.argv[7]) if len(sys.argv) > 7 else 300
    disk = int(sys.argv[8]) if len(sys.argv) > 8 else 18
    dens = float(sys.argv[9]) if len(sys.argv) > 9 else 0.10

    im = Image.open(src).convert("L")
    W, H = im.size
    a = np.asarray(im)
    crop = a[int(fy0 * H): int(fy1 * H), int(fx0 * W): int(fx1 * W)]
    ink = crop < 140
    # specks (stars, speckle) out
    lab, k = ndimage.label(ink)
    if k:
        sizes = ndimage.sum(ink, lab, range(1, k + 1))
        keep = np.zeros(k + 1, bool)
        keep[1:] = sizes >= min_comp
        ink = keep[lab]

    # local ink density on a disk of radius `disk` px
    yy, xx = np.ogrid[-disk : disk + 1, -disk : disk + 1]
    ker = (xx * xx + yy * yy) <= disk * disk
    ker = ker.astype(float)
    ker /= ker.sum()
    densmap = ndimage.convolve(ink.astype(float), ker, mode="constant")
    dense = densmap >= dens

    # dense regions -> components; keep the big ones (figure clusters)
    lab2, k2 = ndimage.label(ndimage.binary_dilation(dense, iterations=4))
    if k2:
        sizes2 = ndimage.sum(dense, lab2, range(1, k2 + 1))
        keep2 = np.zeros(k2 + 1, bool)
        keep2[1:] = sizes2 >= 400
        dense = keep2[lab2]

    # figure mask = original ink that touches a dense region
    dense_d = ndimage.binary_dilation(dense, iterations=3)
    mask = ink & dense_d
    # drop any residual tiny fragments
    lab3, k3 = ndimage.label(mask)
    if k3:
        sizes3 = ndimage.sum(mask, lab3, range(1, k3 + 1))
        keep3 = np.zeros(k3 + 1, bool)
        keep3[1:] = sizes3 >= 150
        mask = keep3[lab3]

    ys, xs = np.nonzero(mask)
    if len(xs) == 0:
        print("EMPTY")
        return
    x0, x1 = xs.min(), xs.max()
    y0, y1 = ys.min(), ys.max()
    m = mask[y0 : y1 + 1, x0 : x1 + 1]
    Hh, Ww = m.shape
    maxw = 1000
    if Ww > maxw:
        scale = maxw / Ww
        m_img = Image.fromarray((m * 255).astype(np.uint8)).resize(
            (maxw, int(Hh * scale)), Image.LANCZOS
        )
        m = np.asarray(m_img) > 127
    Hh, Ww = m.shape
    print(f"crop {W}x{H} -> window {int(fy1*H)-int(fy0*H)}x{int(fx1*W)-int(fx0*W)} "
          f"-> figure {Ww}x{Hh}  ink {m.sum()} px  aspect {Ww/Hh:.3f}")

    # ASCII preview
    chars = " .:-=+*#%@"
    pc = 100
    pr = max(8, int(pc * Hh / Ww * 0.55))
    m_im = Image.fromarray((m * 255).astype(np.uint8)).resize((pc, pr), Image.LANCZOS)
    px = np.asarray(m_im, dtype=float)
    for y in range(pr):
        print("  " + "".join(chars[min(9, int(int(v) * 10 / 256))] for v in px[y]))

    rgba = np.zeros((Hh, Ww, 4), np.uint8)
    rgba[..., 0] = 233
    rgba[..., 1] = 226
    rgba[..., 2] = 208
    rgba[..., 3] = (m * 255).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(out)
    print(f"saved {out}")


if __name__ == "__main__":
    main()
