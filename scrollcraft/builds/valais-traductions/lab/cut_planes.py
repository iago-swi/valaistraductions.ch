# Cuts the dusk photograph into planes for the layered hero.
# Each cutout is everything from a ridge's skyline down (solid below its silhouette),
# on the same canvas as the plate, so the planes register exactly.
#
#   python lab/cut_planes.py            (run from the build folder)
import sys
from PIL import Image, ImageFilter, ImageDraw

SRC = 'out/01-dusk.png'
OUT_W = 2400

src = Image.open(SRC).convert('RGB')
W, H = src.size

# Decide on a half-size, slightly blurred luminance: film grain must not move an edge.
SW, SH = W // 2, H // 2
lum = src.convert('L').resize((SW, SH), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
px = lum.load()


def median(vals, k=5):
    out = []
    n = len(vals)
    for i in range(n):
        w = sorted(vals[max(0, i - k):min(n, i + k + 1)])
        out.append(w[len(w) // 2])
    return out


# r1, the near ridge: near-black, contiguous from the bottom edge.
T1 = 33
r1 = []
for x in range(SW):
    y = SH - 1
    light = 0
    top = SH - 1
    while y > 0:
        if px[x, y] < T1:
            top = y
            light = 0
        else:
            light += 1
            if light >= 5:
                break
        y -= 1
    r1.append(top)


def score(x, y):
    """How strongly the picture goes from bright (above) to dark (below) at y."""
    if y - 7 < 0 or y + 7 >= SH:
        return -999
    above = sum(px[x, yy] for yy in range(y - 7, y - 2)) / 5
    below = sum(px[x, yy] for yy in range(y + 2, y + 7)) / 5
    return above - below


def track(seed_x, seed_y, band=6, weak=7):
    """Follow one skyline left and right from a seed. A skyline is continuous, so each
    column only looks near its neighbour's edge; where mist hides the edge, it holds."""
    e = [0] * SW
    y0 = max(range(seed_y - 12, seed_y + 13), key=lambda y: score(seed_x, y))
    e[seed_x] = y0
    for rng in (range(seed_x + 1, SW), range(seed_x - 1, -1, -1)):
        prev = y0
        for x in rng:
            best = max(range(prev - band, prev + band + 1), key=lambda y: score(x, y) - abs(y - prev) * 0.6)
            if score(x, best) >= weak:
                prev = best
            e[x] = prev
    return e


r1 = median(r1, 3)
for x in range(8):
    r1[x] = r1[8]
r2 = track(680, 408)
r3 = track(460, 330)
r2 = [min(a, b - 3) for a, b in zip(r2, r1)]      # a farther ridge never sits below a nearer one
r3 = [min(a, b - 3) for a, b in zip(r3, r2)]

edges = {'r1': r1, 'r2': median(r2, 3), 'r3': median(r3, 3)}

scale = OUT_W / W
OUT_H = round(H * scale)
plate = src.resize((OUT_W, OUT_H), Image.LANCZOS)
plate.save('assets/dusk-plate.webp', quality=82, method=6)

for name, e in edges.items():
    mask = Image.new('L', (SW, SH), 0)
    d = ImageDraw.Draw(mask)
    pts = [(x, e[x]) for x in range(SW)] + [(SW - 1, SH), (0, SH)]
    d.polygon(pts, fill=255)
    mask = mask.resize((OUT_W, OUT_H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.1))
    cut = plate.convert('RGBA')
    cut.putalpha(mask)
    cut.save('assets/dusk-%s.webp' % name, quality=84, method=6)
    print(name, 'skyline y (of %d): min %d, max %d' % (SH, min(e), max(e)))

# The colour that continues the near ridge below the frame.
b = plate.crop((0, OUT_H - 12, OUT_W, OUT_H)).resize((1, 1), Image.BOX).getpixel((0, 0))
print('floor colour #%02X%02X%02X' % b, '| plate', plate.size)

# Review sheet: each cutout over magenta, so holes and halos show.
sheet = Image.new('RGB', (OUT_W // 3 * 3 + 20, OUT_H // 3), '#FF00FF')
for i, name in enumerate(['r3', 'r2', 'r1']):
    c = Image.open('assets/dusk-%s.webp' % name).convert('RGBA').resize((OUT_W // 3, OUT_H // 3), Image.LANCZOS)
    sheet.paste(c, (i * (OUT_W // 3 + 10), 0), c)
sheet.save('lab/planes-sheet.png')
