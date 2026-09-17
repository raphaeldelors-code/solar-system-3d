#!/usr/bin/env python3
"""Plan 044 C5 — generate the Orrery app icon + OG image.

Design: a top-down ORRERY (the historical mechanical model of the solar
system) — a glowing sun at the center with concentric orbit rings and a few
planet dots. Centered + high-contrast so it survives 48px, and all content
stays inside the maskable safe zone (center 80%).

Pure PIL (no rsvg/inkscape/sharp available). Supersampled 4x then downscaled
for anti-aliased rings and a smooth glow.
"""
import math
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "public")

# --- palette (matches the app's :root tokens) -------------------------------
BG_CENTER = (16, 24, 40)   # #101828 deep-space navy
BG_EDGE = (4, 6, 12)       # #04060c near-black
RING = (120, 150, 200)     # muted blue orbit lines
SUN_CORE = (255, 214, 120)  # warm yellow
SUN_GLOW = (255, 150, 60)   # orange halo
# planet dots: (color)
P_MERCURY = (170, 170, 180)
P_EARTH = (90, 150, 255)
P_MARS = (230, 110, 70)
P_JUPITER = (220, 170, 110)


def radial_bg(size, center, edge):
    """Full-bleed radial background: `center` color fading to `edge`."""
    img = Image.new("RGB", (size, size), edge)
    # A big soft glow of the center color, blurred, gives a smooth radial fade.
    glow = Image.new("RGB", (size, size), edge)
    d = ImageDraw.Draw(glow)
    c = size // 2
    r = int(size * 0.62)
    d.ellipse([c - r, c - r, c + r, c + r], fill=center)
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.28))
    return glow


def soft_glow(size, radius, color, alpha):
    """A soft radial glow sprite (circular falloff via gaussian blur)."""
    g = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    c = size // 2
    d.ellipse([c - radius, c - radius, c + radius, c + radius], fill=color + (alpha,))
    return g.filter(ImageFilter.GaussianBlur(radius * 0.55))


def draw_orrery(size):
    """Render the orrery mark at `size` (square, full-bleed)."""
    SS = 4  # supersample factor
    S = size * SS
    c = S // 2

    img = radial_bg(S, BG_CENTER, BG_EDGE).convert("RGBA")

    # Orbit rings (concentric, top-down orrery). Radii as a fraction of size.
    # Thick enough to survive 48px (the plan's explicit requirement).
    ring_fracs = [0.15, 0.24, 0.33]
    ring_w = max(3, int(S * 0.011))
    d = ImageDraw.Draw(img)
    for fr in ring_fracs:
        r = int(S * fr)
        d.ellipse([c - r, c - r, c + r, c + r], outline=RING + (170,), width=ring_w)

    # Sun: glow + bright core, dead center.
    sun_glow_r = int(S * 0.17)
    img.alpha_composite(soft_glow(S, sun_glow_r, SUN_GLOW, 210))
    img.alpha_composite(soft_glow(S, int(S * 0.095), SUN_CORE, 235))
    core_r = int(S * 0.06)
    d = ImageDraw.Draw(img)
    d.ellipse([c - core_r, c - core_r, c + core_r, c + core_r], fill=SUN_CORE + (255,))

    # Planets on the rings — 4 dots, varied angles, sized to stay legible at
    # 48px (fewer + bigger beats many + tiny).
    # (ring_frac, angle_deg, color, dot_frac)
    planets = [
        (0.15, 40, P_MERCURY, 0.024),
        (0.24, 205, P_EARTH, 0.034),
        (0.33, 320, P_MARS, 0.030),
        (0.33, 120, P_JUPITER, 0.042),
    ]
    for fr, ang, color, dot in planets:
        r = S * fr
        a = math.radians(ang)
        px = c + r * math.cos(a)
        py = c - r * math.sin(a)
        dr = S * dot
        # a faint glow under each planet so it pops on the dark bg
        img.alpha_composite(_dot_glow(S, px, py, dr * 2.2, color, 120))
        d = ImageDraw.Draw(img)
        d.ellipse([px - dr, py - dr, px + dr, py + dr], fill=color + (255,))

    return img.resize((size, size), Image.Resampling.LANCZOS)


def _dot_glow(size, px, py, radius, color, alpha):
    """A small glow centered at (px,py) within a `size` canvas."""
    g = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    d.ellipse([px - radius, py - radius, px + radius, py + radius], fill=color + (alpha,))
    return g.filter(ImageFilter.GaussianBlur(radius * 0.5))


def make_og():
    """1200x630 social card: orrery mark on the left, wordmark + tagline right."""
    W, H = 1200, 630
    img = radial_bg(H, BG_CENTER, BG_EDGE).convert("RGBA")
    # stretch the square bg to fill 1200x630
    img = img.resize((W, H), Image.Resampling.LANCZOS)
    # orrery mark on the left
    mark = draw_orrery(520)
    img.alpha_composite(mark, (60, 55))
    d = ImageDraw.Draw(img)
    # wordmark + tagline, auto-fit to the right column (x=600 .. W-40) so the
    # tagline never clips at the card edge.
    col_x = 600
    col_w = W - col_x - 40
    try:
        f_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 132)
        f_tag = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 46)
    except OSError:
        f_title = ImageFont.load_default()
        f_tag = ImageFont.load_default()
    d.text((col_x, 200), "Orrery", font=f_title, fill=(234, 242, 255, 255))
    # fit the tagline: shrink the font until both lines fit the column width.
    tag_lines = ["Travel through 10,000 years of the", "solar system — in your browser."]
    tag_size = 46
    while tag_size > 24:
        f_tag = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", tag_size)
        widest = max(d.textlength(t, font=f_tag) for t in tag_lines)
        if widest <= col_w:
            break
        tag_size -= 2
    y = 372
    for t in tag_lines:
        d.text((col_x, y), t, font=f_tag, fill=(143, 163, 191, 255))
        y += 62
    return img.convert("RGB")


def main():
    os.makedirs(OUT, exist_ok=True)
    i512 = draw_orrery(512)
    i192 = draw_orrery(192)
    # maskable: same full-bleed design (content already inside the safe zone)
    i512m = draw_orrery(512)
    i512.save(os.path.join(OUT, "icon-512.png"))
    i192.save(os.path.join(OUT, "icon-192.png"))
    i512m.save(os.path.join(OUT, "icon-512-maskable.png"))
    og = make_og()
    og.save(os.path.join(OUT, "og-image.png"))
    print("wrote icon-512.png icon-192.png icon-512-maskable.png og-image.png")


if __name__ == "__main__":
    main()
