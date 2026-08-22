#!/usr/bin/env python3
"""Map Bode plate layouts as ASCII ink-density maps to locate figures."""
import sys
from PIL import Image

def ascii_map(path, w=96, h=64, thresh=128):
    im = Image.open(path).convert("L")
    W, H = im.size
    # sample a pixel grid
    im_s = im.resize((w, h), Image.LANCZOS)
    px = im_s.load()
    chars = " .:-=+*#%@"
    lines = []
    for y in range(h):
        row = []
        for x in range(w):
            v = px[x, y]
            # ink = dark; map darkness to char density (0=white->space, 255=ink->@)
            d = 255 - v
            if d < thresh * 0.35:
                row.append(" ")
            else:
                row.append(chars[min(len(chars) - 1, d * len(chars) // 256)])
        lines.append(f"{y * H // h:5d} |{''.join(row)}|")
    head = f"## {path.split('/')[-1]}  ({W}x{H})  x-axis: 0..{W}, ticks every 10 cols = {W//w}px"
    return "\n".join([head] + lines)

if __name__ == "__main__":
    for p in sys.argv[1:]:
        print(ascii_map(p))
        print()
