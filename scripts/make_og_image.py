# Generates public/og-image.png (1200x630) for social/link previews.
# Pure stdlib (struct + zlib): deep-space background with a deterministic
# starfield, a central glowing Sun with orbiting planets, and a "SOLAR
# SYSTEM 3D" wordmark in a tiny 5x7 bitmap font. No PIL/ImageMagick needed —
# mirrors the constraint the PWA icon generator already follows.
import struct, zlib, math, os

W, H = 1200, 630


def mulberry32(seed):
    """Deterministic 32-bit PRNG (same family as the belt sampler)."""
    a = seed & 0xffffffff

    def next():
        nonlocal a
        a = (a + 0x6D2B79F5) & 0xffffffff
        t = a
        t = (t ^ (t >> 15)) & 0xffffffff
        t = (t * 0x2545F491) & 0xffffffff
        t = (t ^ (t >> 13)) & 0xffffffff
        t = (t * 0x2E4C56A5) & 0xffffffff
        t = (t ^ (t >> 16)) & 0xffffffff
        return t / 0x100000000

    return next


# --- 5x7 bitmap font (only the glyphs the wordmark needs) ------------------
GLYPHS = {
    'S': ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
    'O': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    'L': ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
    'A': ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    'R': ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
    'Y': ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
    'E': ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
    'T': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
    'M': ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
    '3': ['.####', '....#', '....#', '.###.', '....#', '....#', '.####'],
    'D': ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
    ' ': ['. . .', '...', '...', '...', '...', '...', '...'],  # placeholder
}
# fix the space glyph to a clean 5-wide blank
GLYPHS[' '] = ['.....', '.....', '.....', '.....', '.....', '.....', '.....']


def text_width(s, scale):
    # each glyph is 5 units wide + 1 unit of tracking, minus the last gap
    return (len(s) * 6 - 1) * scale


def draw_text(buf, s, cx, top, scale, color):
    """Draw `s` centered horizontally at cx, top at `top` (px). Returns bottom."""
    s = s.upper()
    w = text_width(s, scale)
    x = int(round(cx - w / 2))
    for ch in s:
        glyph = GLYPHS.get(ch, GLYPHS[' '])
        for ry, row in enumerate(glyph):
            for rx, cbit in enumerate(row):
                if cbit != '#':
                    continue
                px, py = x + (rx * scale), top + (ry * scale)
                for sy in range(scale):
                    for sx in range(scale):
                        xx, yy = px + sx, py + sy
                        if 0 <= xx < W and 0 <= yy < H:
                            buf[yy * W + xx] = color
    return top + 7 * scale


def main():
    rnd = mulberry32(0xC0DE)
    # pixel buffer: list of (r,g,b) tuples, opaque
    bg_top = (10, 16, 30)
    bg_bot = (2, 4, 9)
    buf = [(0, 0, 0) for _ in range(W * H)]

    # background vertical gradient
    for y in range(H):
        t = y / (H - 1)
        col = (int(bg_top[0] + (bg_bot[0] - bg_top[0]) * t),
               int(bg_top[1] + (bg_bot[1] - bg_top[1]) * t),
               int(bg_top[2] + (bg_bot[2] - bg_top[2]) * t))
        for x in range(W):
            buf[y * W + x] = col

    # deterministic starfield: faint + a few bright
    for _ in range(420):
        x = int(rnd() * W)
        y = int(rnd() * H)
        b = int(60 + rnd() * 150)
        if rnd() > 0.94:
            b = 210 + int(rnd() * 45)
        c = (b, b, min(255, b + 20))
        buf[y * W + x] = c

    # --- orbital motif (Sun at ellipse center + planets on the ring) --------
    ecx, ecy = 600, 415
    rx, ry = 330, 128
    sun_core = (255, 216, 128)
    sun_edge = (255, 138, 42)
    glow = (255, 150, 60)
    ring_col = (150, 185, 235)

    def put(px, py, col, blend=1.0):
        if 0 <= px < W and 0 <= py < H:
            i = py * W + px
            old = buf[i]
            if blend >= 1.0:
                buf[i] = col
            else:
                buf[i] = (int(old[0] * (1 - blend) + col[0] * blend),
                          int(old[1] * (1 - blend) + col[1] * blend),
                          int(old[2] * (1 - blend) + col[2] * blend))

    # orbit ring (ellipse stroke)
    for x in range(W):
        for y in range(H):
            ex = (x - ecx) / rx
            ey = (y - ecy) / ry
            dist = math.hypot(ex, ey)
            if abs(dist - 1.0) < 0.018:
                # brighten where the ring is nearer (bottom of ellipse) for depth
                depth = 0.45 + 0.55 * ((y - ecy) / ry * 0.5 + 0.5)
                col = (int(ring_col[0] * depth), int(ring_col[1] * depth), int(ring_col[2] * depth))
                put(x, y, col, 0.85)

    # planets on the ring (drawn before the sun so the sun glows over them)
    planets = [
        (210.0, 24, (120, 168, 255)),   # blue
        (330.0, 16, (240, 150, 90)),    # warm/terran
        (75.0, 11, (150, 205, 255)),    # pale ice
    ]
    for angle_deg, pr, pcol in planets:
        a = math.radians(angle_deg)
        px = ecx + rx * math.cos(a)
        py = ecy + ry * math.sin(a)
        for y in range(int(py - pr - 2), int(py + pr + 2) + 1):
            for x in range(int(px - pr - 2), int(px + pr + 2) + 1):
                d = math.hypot(x - px, y - py)
                if d <= pr:
                    g = 1 - (d / pr) * 0.5
                    put(x, y, (int(pcol[0] * g), int(pcol[1] * g), int(pcol[2] * g)))

    # sun: radial core + soft glow (center of the system)
    sr = 74
    glow_r = sr * 3.2
    for y in range(int(ecy - glow_r), int(ecy + glow_r) + 1):
        for x in range(int(ecx - glow_r), int(ecx + glow_r) + 1):
            d = math.hypot(x - ecx, y - ecy)
            if d <= sr:
                g = d / sr
                put(x, y, (int(sun_core[0] + (sun_edge[0] - sun_core[0]) * g * g),
                           int(sun_core[1] + (sun_edge[1] - sun_core[1]) * g * g),
                           int(sun_core[2] + (sun_edge[2] - sun_core[2]) * g * g)))
            elif d <= glow_r:
                t = max(0.0, 1 - (d - sr) / (glow_r - sr)) * 0.30
                put(x, y, glow, t)

    # --- wordmark -----------------------------------------------------------
    title = 'SOLAR SYSTEM 3D'
    scale = 7
    # soft shadow pass then the light-blue title
    draw_text(buf, title, 600, 150, scale, (4, 8, 16))
    draw_text(buf, title, 598, 148, scale, (180, 210, 255))
    # subtle underline accent
    yline = 148 + 7 * scale + 14
    xw = text_width(title, scale)
    for x in range(600 - xw // 2, 600 + xw // 2):
        if 0 <= x < W:
            put(x, yline, (90, 130, 200))
            put(x, yline + 1, (70, 105, 165))

    # --- write PNG ----------------------------------------------------------
    here = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(here, '..', 'public', 'og-image.png')

    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    ihdr = struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0)  # 8-bit RGB
    raw = bytearray()
    for y in range(H):
        raw.append(0)  # filter byte
        for x in range(W):
            c = buf[y * W + x]
            raw += bytes((c[0], c[1], c[2]))
    png_bytes = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr)
                 + chunk(b'IDAT', zlib.compress(bytes(raw), 9)) + chunk(b'IEND', b''))
    with open(out, 'wb') as f:
        f.write(png_bytes)
    print(f'{out} ({W}x{H}, {os.path.getsize(out)} bytes)')


if __name__ == '__main__':
    main()
