# BRIEF — Valais Traductions

**Self-authored under explicit creative delegation.** Philippe gave a reference and two hard constraints, and left the rest to me. Everything not quoted below is an authored decision, not something he said.

## Evidence (his words)

- "Je veux que le design soit absolument magnifique, impressionnant, attractif, tout aussi beau que ce que tu m'as fait pour noth.ch."
- On the first version (white ground, thin line art, very sparse): "malheureusement je n'aime pas du tout le design".
- "Inspire-toi de noth.ch" (dark charcoal, large Cormorant Garamond, bone and dust text, film grain, photographic cards, one small warm accent).
- "garde le logo".
- Assets he has: the logo (black and white versions), one mountain portrait, two book covers, bêtisier screenshots. No footage. A kie.ai key, 80 credits at the start.

## The eight topics

1. **Vibe.** Dark, alpine, quiet, literary, precise. References: noth.ch itself; a mountain hut at blue hour; the two-column page of a bilingual edition.
2. **Scroll journey.** A crossing. The visitor starts on the cold side of a pass at dusk, crosses the crest, and arrives on the French side at first light. Then the practical matter: what he does, for which subjects, Swiss or French usage, who he is, how to reach him.
3. **Energy.** Calm at the top (almost still). One intense act at the crossing. Then steady and plain to the end.
4. **Feeling and the one moment.** See the curve and the peak below.
5. **The thing no other site does.** A real paragraph translates itself into French, segment by segment, under the visitor's hand, while the page crosses the ridge.
6. **Range.** Premium-minimal, because he asked for noth.ch. Not the cream-and-brass trap: the accent is the red of the logo's three stars, on charcoal.
7. **One world or scenes.** Two sides of one pass with exactly one transition. Not a continuous flythrough, not chapters.
8. **Assets.** Two generated photographs (the cold side, the warm side), cut into planes locally. Existing portrait and book covers. Cards reuse the photographs already on noth.ch.

## What must be believed, and the one action

- Belief: nothing of your text is lost on the way into French.
- Action: "Demander une offre" (FR), same label everywhere, leading to the contact form.

## Grammar: the crossing (new, defined here)

The page is one traverse with two grounds and a single transition.

- **Navigation:** a slim bar (white logo, three anchors, language switch, the one CTA). It exists because agencies need to jump to contact; it never shows sequence.
- **Sequence:** source side (hero) → the crest (the only transition) → target side (all substance) → arrival (contact).
- **Ending:** arrival. The last screen is the valley in daylight with the contact details; it holds.
- **Bans:** no return to the cold ground after the crest; no second transition; no German or English display type after the crest (source language survives only as content in the Swiss table); no video anywhere (planes and one wipe carry the depth, and a phone decodes them without trouble); no pinned act other than the hero, the crest and the lateral rail.

Why not one of the eight: filmic one-shot forbids jumping, and this visitor must be able to jump to contact. Chaptered editorial forbids media under type, which rules out the layered hero. Split stage fits the subject (source beside target) but halves the measure for every paragraph and breaks on a phone. Continuous world needs chained video legs, the most fragile and costly route, for a page that is mostly services and contact. Live surface, poster, gallery and cutlist do not match a single quiet argument.

## Feeling curve

1. **Stillness.** Blue hour, four ridges, almost nothing moving. The headline sits in the sky.
2. **Wonder (the peak).** The crest sweeps across the frame, first light arrives, and the German paragraph becomes French one segment at a time.
3. **Clarity.** Four services in plain type on a calm ground.
4. **Confidence.** Subjects pass sideways, each with one fact that proves it.
5. **Recognition.** One switch, Switzerland or France, and five everyday phrases change. "Septante." A small smile.
6. **Closeness.** A face, a short story, two books.
7. **Resolve.** The valley in daylight, an address, a form, one button.

## The peak

> "Le paragraphe en allemand s'est traduit en français sous mes doigts, pendant qu'on passait la crête et que le jour se levait."

Act 2. It gets the largest span on the page, the quiet hero before it, and both generated photographs meet in it.

## Tell-someone sentence

> C'est le site où le texte se traduit en français pendant que tu passes le col.

## Signature move

Scroll-driven translation: the paragraph is real markup in two languages; page-local script reads the act's `--sc-p` and swaps one segment at a time, in step with a ridge-shaped wipe that replaces the cold photograph with the warm one. Reduced motion shows the French paragraph and the warm side, complete.

## Score

| Beat | Device | Span | Why |
|---|---|---|---|
| Stillness | `pin` with independent planes (parallax) | 2.0 | Depth from ridges sliding apart as the camera approaches |
| Wonder | `pin` + `reveal` (ridge wipe) + signature | 3.6 | A wipe is a change of state; this is the change of language |
| Clarity | `flow` + `in` | ~1.2 | Information, kept short |
| Confidence | `pan` | 2.6 | Lateral travel reads as range |
| Recognition | `flow` with a real control | ~1.1 | The page responds instead of moving |
| Closeness | `reveal` on the portrait | ~1.4 | The person arrives |
| Resolve | `flow` form, then a held closing plate | ~2.3 | The page arrives and stops |

Total about 14 viewport-heights, seven acts, the peak the longest by a clear margin.

## Authored silence

The end of the hero: the nearest ridge rises until the frame is almost dark. That darkness is intended. It is the quiet before the crest.

## World (style preamble, reused verbatim)

> Fine-art alpine landscape photography in the Swiss Valais, shot on a medium-format camera with a 70mm lens from a high vantage point. Natural available light only, long exposure stillness. Colour grade of deep charcoal and slate blue shadows, bone-white highlights, desaturated mid-tones, restrained warmth. Matte film grain, slight atmospheric haze, true-to-life rock, forest and snow texture. Photographic realism. NOT 3D render, NOT illustration, NOT CGI, NOT painting, no digital glow, no lens flare, no people, no text.

## Feel check (after the build)

Intended against felt, scrolled cold on the contact sheets:

| Act | Intended | Felt | Change made |
|---|---|---|---|
| Stillness | stillness | stillness | none |
| Wonder | wonder | first pass: impatience (four dark frames between two separate stages) | hero and crest merged into one pinned stage; the dark beat is now about a fifth of a viewport |
| Clarity | clarity | clarity | none |
| Confidence | confidence | confidence | none |
| Recognition | recognition | recognition | none |
| Closeness | closeness | closeness | none |
| Resolve | resolve | resolve | arrival photograph made taller and lighter so the last screen holds |

The score changed with it: the first two rows of the score table are now one act (pin, span 5.4). The page measures 12.9 viewport-heights at 1440 px.

Verified with the harness at 1440 x 900, 390 x 844 and reduced motion, in French, English and German: no dead scroll, all text over media at 4.5:1 or better at its worst frame. Not verified: a real phone.

Philippe approved the prototype on 2026-11-14 ("Oui, décline-le").
