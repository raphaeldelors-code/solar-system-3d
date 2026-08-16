# Generates the PWA icons (192 & 512, plus a maskable 512) as PNGs.
# Pure stdlib (struct + zlib): dark space disc, glowing sun, an orbit ring
# and a small planet — matches the app's look. No PIL/ImageMagick needed.
import struct, zlib, math, os

def png(path, size, pad=0.0):
    """Write an RGBA PNG of `size`x`size` pixels.

    pad: fraction of the radius kept clear (maskable safe zone: 0.15).
    """
    R = size / 2
    cx = cy = R
    # sun slightly left of center so the planet reads on the right
    sx, sy = R * 0.42, R * 0.46
    sr = R * 0.30          # sun radius
    orb_r = R * (0.62 - pad * 0.5)   # orbit ellipse radius
    px_angle = -0.62                    # planet position on orbit
    ppx = sx + orb_r * math.cos(px_angle)
    ppy = sy + orb_r * 0.55 * math.sin(px_angle)
    pr = R * 0.11                      # planet radius

    bg = (8, 12, 22)          # deep space
    sun_core = (255, 214, 120)
    sun_edge = (255, 140, 40)
    planet = (96, 156, 255)

    rows = []
    for y in range(size):
        row = bytearray()
        for x in range(size):
            dx, dy = x - cx, y - cy
            d = math.hypot(dx, dy)
            # background disc (maskable: fill whole canvas for pad>0)
            if d <= R * (1 - 1e-4) or pad > 0:
                col = bg
            else:
                col = (0, 0, 0, 0)
                row += bytes(col); continue
            a = 255
            # orbit ring
            ex = (x - sx) / orb_r
            ey = (y - sy) / (orb_r * 0.55)
            ring = abs(math.hypot(ex, ey) - 1.0) * R * 2.2
            if ring < 1.6:
                t = 1 - ring / 1.6
                col = tuple(int(col[i] * (1 - t) + 140 * t) for i in range(3))
            # planet
            dp = math.hypot(x - ppx, y - ppy)
            if dp <= pr:
                g = 1 - (dp / pr) * 0.4
                col = (int(planet[0] * g), int(planet[1] * g), int(planet[2] * g))
            # sun with radial falloff + soft glow
            ds = math.hypot(x - sx, y - sy)
            if ds <= sr:
                g = ds / sr
                r = int(sun_core[0] + (sun_edge[0] - sun_core[0]) * g * g)
                gg = int(sun_core[1] + (sun_edge[1] - sun_core[1]) * g * g)
                b = int(sun_core[2] + (sun_edge[2] - sun_core[2]) * g * g)
                col = (r, gg, b)
            elif ds <= sr * 1.9:
                t = max(0.0, 1 - (ds - sr) / (sr * 0.9)) * 0.35
                col = tuple(int(col[i] * (1 - t) + sun_edge[i] * t) for i in range(3))
            row += bytes((col[0], col[1], col[2], a))
        rows.append(bytes(row))

    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    ihdr = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)
    raw = b''.join(b'\x00' + r for r in rows)
    png_bytes = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr)
                 + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))
    with open(path, 'wb') as f:
        f.write(png_bytes)
    print(f'{path} ({size}x{size}, {os.path.getsize(path)} bytes)')

here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, '..', 'public')
png(os.path.join(out, 'icon-192.png'), 192, pad=0.0)
png(os.path.join(out, 'icon-512.png'), 512, pad=0.0)
png(os.path.join(out, 'icon-512-maskable.png'), 512, pad=0.2)
