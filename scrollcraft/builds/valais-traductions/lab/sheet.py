# usage: python lab/sheet.py <shots dir> <out.jpg> <first> <last> <cols> <tile width>
import sys, os
from PIL import Image
d, out, a, b, cols, tw = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6])
files = ['%02d.png' % i for i in range(a, b + 1) if os.path.exists(os.path.join(d, '%02d.png' % i))]
ims = [Image.open(os.path.join(d, f)).convert('RGB') for f in files]
w, h = ims[0].size; th = round(tw * h / w)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (tw + 6) - 6, rows * (th + 6) - 6), '#FF00FF')
for i, im in enumerate(ims):
    sheet.paste(im.resize((tw, th), Image.LANCZOS), ((i % cols) * (tw + 6), (i // cols) * (th + 6)))
sheet.save(out, quality=88); print(out, sheet.size, len(ims), 'frames')
