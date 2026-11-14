#!/bin/bash
# Generates the card photographs. Run from the project root (where .env lives).
K="/c/Users/Philippe Noth/.claude/plugins/cache/nateherk/nateherk-design/0.3.1/skills/scroll-craft"
O="scrollcraft/builds/valais-traductions/out"
PRE='Fine-art alpine landscape photography in the Swiss Valais, shot on a medium-format camera with a 70mm lens from a high vantage point. Natural available light only, long exposure stillness. Colour grade of deep charcoal and slate blue shadows, bone-white highlights, desaturated mid-tones, restrained warmth. Matte film grain, slight atmospheric haze, true-to-life rock, forest and snow texture. Photographic realism. NOT 3D render, NOT illustration, NOT CGI, NOT painting, no digital glow, no lens flare, no people, no text.'
gen() { node "$K/scripts/kie.mjs" still "$PRE

$2" "$O/$1" --ar 3:4 2>&1 | tail -1; }

gen 12-tourisme.png 'Early morning high above a glacier valley. A single small red cable car gondola hangs on its cable in the upper right of the frame, travelling toward a snowy summit, tiny against the scale of the mountains. Below it a glacier and dark rock walls. Warm first light on the highest snow, the lower left of the frame in large empty cool blue shadow.' &
gen 13-commerce.png 'Blue hour in a Valais village street. The lit window of a small old grocery shop set in a stone and dark timber facade, warm light inside, wooden shelves with glass jars, loaves of bread, bottles and baskets of apples seen through the glass. No signs, no lettering, no readable labels. The window sits in the lower two thirds of the frame, dark timber wall and deep shadow above.' &
gen 14-montagne.png 'A narrow mountain footpath winding along a high grassy ridge toward distant peaks, low warm evening sun from the right. In the lower left foreground, a grey boulder with a painted white-red-white trail waymark stripe on it. Long shadows, the far slopes in cool blue haze. Large calm sky in the upper half.' &
wait
node "$K/scripts/kie.mjs" probe 2>&1 | tail -1
