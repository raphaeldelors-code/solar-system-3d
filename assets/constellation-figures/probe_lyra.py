#!/usr/bin/env python3
"""Probe: Lyra (Cygnus plate top-right, zoomed) + Plate VI lower zone (Leo?)."""
from PIL import Image
import numpy as np

Image.MAX_IMAGE_PIXELS = None
chars = " .:-=+*#%@"


def show(im, box, label, Wd=100):
    c = im.crop(box)
    c.thumbnail((Wd, 99999), Image.LANCZOS)
    a = np.asarray(c)
    Hh, Wh = a.shape
    print("--- %s (%dx%d) ---" % (label, Wh, Hh))
    for y in range(Hh):
        print("".join(chars[min(9, int((255 - int(a[y, x])) * 10 / 256))] for x in range(Wh)))


cyg = Image.open("src/Cygnus_Lacerta_and_Lyra.jpg").convert("L")
W, H = cyg.size
# Lyra = small harp. Plate title says order Cygnus, Lacerta, Lyra.
# Zoom the top-right corner at high res in two tiles.
show(cyg, (int(W * 0.70), int(H * 0.02), W, int(H * 0.30)), "Cygnus plate corner TR (x70-100%, y2-30%)", 110)

vi = Image.open("src/VI._Ursa_Major_Leo.jpg").convert("L")
W2, H2 = vi.size
show(vi, (int(W2 * 0.02), int(H2 * 0.30), int(W2 * 0.98), int(H2 * 0.55)), "Plate VI middle band (y30-55%)", 110)
