# KNIGHTMARE: the palette of the Knightmare

Research note, 2026-10-13. Scope: the colours that actually define the Knightmare, the vision of a ruined future in *Batman v Superman: Dawn of Justice* (2016) and the epilogue of *Zack Snyder's Justice League* (2021), and a dark-panel token palette for the KNIGHTMARE Theme (`app/src/renderer/src/styles/themes/batman-v-superman-2016.css`) built from them. It answers the maintainer's review of the first build: the near-monochrome greys of [`snyder.md`](snyder.md) §3 do not look like the Knightmare Batman. Section 7 adds a fallback asked for during the work: a palette after the armoured Batman's rain fight with Superman in *BvS*, so the two can be compared. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md). Both films are treated as one reference: the maintainer considers the two Knightmares the same world.

## TL;DR

- **The Knightmare is amber, not grey.** In every official trailer frame of it, the sky is a pale cream (`#faecc2`, `#fdebc4`), the air a sand haze (`#f3daa9`, `#e1ae66`), the ground ochre and burnt umber (`#6c4d22` to `#865d25`), the shadows warm brown-black (`#291908`, `#100805`), and the only saturated thing is the fire of the pits (`#ed871a`). Measured over whole frames, its grade sits at hue 74–80° with chroma 22–34, against 5–9 for the rest of each trailer (§2).
- **The rest of each film is near-neutral to cool.** *BvS* Gotham and Metropolis and the *ZSJL* trailer outside the epilogue have a median chroma of 4.5–8.9. The armour fight is cooler still: hue 158–237°, chroma 3–12, steel teal with cyan-white eye lights (§2, §7).
- **What the sources say about why.** Larry Fong shot the *BvS* desert sequence as one IMAX take, and went "dark" with hard light for Gotham at night. Fabian Wagner says the *ZSJL* epilogue was shot by Snyder himself on a Red Monstro, and "stylised VFX and colour grading techniques" turned it into the Knightmare. Stefan Sonnenfeld at Company 3 graded both films. No one on record describes the Knightmare's colour in words; the amber is measured, not quoted (§1).
- **Proposed palette:** a scorched brown-black ground (`#100804` → `#341b0d`), sky-cream Bone (`#f7e8c8`) as text and the working ink, the sand haze (`#e1ae66`) as the waiting ink, a warm ash grey (`#a39886`), and the fire kept out of the panel at rest (§5).
- **Alarm color: S-shield crimson `#ff405f`, not Heat Vision `#e60f00`.** Heat Vision is 3.7 ΔE00 from VENGEANCE's `#e3121b`, closer than the 5–8 the jury accepted between red alarms, and at hue 41° it lands between Clawd orange (45°) and the amber inks. The crimson follows the hue of Superman's shield and cape as sampled (h 24°), pushed to full chroma: 14.6 from VENGEANCE, 16.4 from Clawd orange, 37.8 from the waiting ink, 48.5 from PALE MOONLIGHT and 44.6 from WATCHFUL PROTECTOR (§4, §6).
- **The amber Knightmare fits the corner panel better than the armour fight.** The armour palette maps to a dark panel with no effort, but it lands 0.6–2.7 ΔE from WATCHFUL PROTECTOR's grounds, its eye light is Nolan's mercury, and red-in-the-rain under the Bat-Signal is VENGEANCE's own scene (§7).

## 1. What the sequences look like, and how their grade differs

**The written record.** These are the primary sources found, and what each one owns.

- **Larry Fong on *BvS*.** He shot it on KODAK VISION3 500T 5219 "throughout in 35mm, IMAX and even 16mm". On the look: "We go pretty dark for Batman v Superman — not for everything but when it helps the story", "Dark themes dictate dark visuals", and "I embraced hard light a bit more than usual to help convey the harshness and rawness of Gotham at night". The palette was set in preproduction with Patrick Tatopoulos and Michael Wilkinson. "The 4K digital intermediate was done at Company 3 by senior colorist Stefan Sonnenfeld" ([Kodak / *InCamera*, 11 Apr 2016](https://www.kodak.com/en/motion/blog-post/batman-v-superman/)).
- **Fong on the desert sequence.** "There is a desert sequence where the camera follows people fighting, then jumping out the back of a trailer, then encompasses a complex fight in a large 360-degree move, all in one take — shot with an IMAX camera." He adds: "We shot primarily in Detroit … We also travelled to Chicago and New Mexico for some sequences" ([British Cinematographer, 5 Apr 2016](https://britishcinematographer.co.uk/larry-fong-ascbatman-v-superman-dawn-of-justice/)). Fong does not describe the sequence's colour in either interview.
- **Fabian Wagner on *ZSJL*.** "Back in 2016, we shot every single thing that you see in the new release apart from the final epilogue sequence featuring Batman confronting the Joker. That epilogue was shot by Zack himself during a three-day shoot in Los Angeles using digital cameras (the Red Monstro camera with Canon lenses)." And: "Our original colourist at Company 3, Stefan Sonnenfeld, was still the colourist … we already knew what the film would look like". The article itself, not Wagner, adds that "Stylised VFX and colour grading techniques were then used to transform it into the so-called 'Knightmare' sequence", and captions the film as "shot with a naturalistic look, on Kodak 35mm". Everything else in *ZSJL* is 4-perf 35mm on Kodak Vision3, plus a few Alexa 65 helicopter shots ([Cinematography World, Kirsty Hazlewood, 6 Apr 2021](https://www.cinematography.world/the-course-of-justice/)).
- **Weta on the epilogue.** VFX supervisor Kevin Andrew Smith: "the whole scene is this fantastical world the entire sequence was shot on green with some practical cars and we're adding the background" ([Weta FX, reprinting Collider](https://www.wetafx.co.nz/articles/zack-snyders-justice-league-heres-how-the-vfx-artists-put-together-the-new-knightmare)). So the *ZSJL* Knightmare's sky and ground are digital, and its amber is a grading and compositing choice.
- **Superman in the epilogue.** ComicBook.com describes the new scene as an insurgency led by Batman "caught by a red-eyed Superman … enslaved by the Anti-Life Equation", shot in October 2020 ([ComicBook.com, Cameron Bonomolo, 27 Mar 2021](https://comicbook.com/movies/news/justice-league-snyder-cut-zack-snyder-difficulty-filming-new-knightmare-epilogue/)). This is coverage, not a crew source.

**What the official trailers show** (360p, read frame by frame; the IDs are in Sources):

- *BvS*: the Knightmare is a backlit desert under a sky bleached almost white, with dust thick enough to swallow the soldiers into silhouettes. The long shot at 1:55.0 of the Final Trailer has Batman as a dark column on a ridge, a ruined city on the horizon, and two pits burning orange. The fight at 2:01 of Trailer 2 and 2:39 of the Comic-Con Trailer is fought inside the haze. The bunker at 0:40 of the Teaser and 2:08 of the Comic-Con Trailer is a dark corridor with an amber doorway.
- *ZSJL*: the same world, warmer and darker. At 0:35–0:38 Batman's profile and an alien ship stand against a burning amber sky over a dead city. At 2:01–2:08 the epilogue's close-ups (Batman with goggles up, the Joker) are backlit by a low sun, so faces fall into brown shadow and the background is a glowing haze. The film is framed 4:3 (pillarboxed in the trailer).

**The grade, measured.** To compare the Knightmare with each film's other scenes, I measured the mean CIELAB colour of every frame of each trailer (2 frames a second, scaled to 96×54, pixels darker than L* 8 ignored, black cards and titles dropped) and took the median over the Knightmare windows and over the rest. This is my own measurement on YouTube's 360p encodes, not a published figure.

| Trailer | Knightmare window | Knightmare: L*, a*, b*, chroma, hue | Rest of trailer: L*, chroma, hue |
|---|---|---|---|
| *BvS* Final Trailer | 1:55.0 | 48.7, +9.4, +33.1, 34.5, 74° | 29.1, 8.2, 95° |
| *BvS* Comic-Con Trailer | 2:05–2:08.5, 2:38.5–2:41 (11 frames) | 43.3, +5.2, +21.6, 22.2, 77° | 30.6, 6.0, 99° (21 of 295 frames warmer than b* 15) |
| *BvS* Teaser | 0:40–0:41 (bunker) | 31.5, +5.3, +21.9, 22.6, 76° | 27.2, 4.5, 138° |
| *BvS* Trailer 2 | 2:01–2:02 | 47.1, +5.7, +32.9, 33.4, 80° | 41.5, 8.9, 104° |
| *ZSJL* Trailer | 0:35–0:38.5, 2:00–2:08.5 (26 frames) | 49.1, +8.9, +30.4, 31.7, 74° | 31.9, 6.8, 90° |
| *BvS* armour fight (Final 1:56–2:03) | — | 31.3, −3.2, +1.3, 3.5, 158° | — |
| *BvS* armour fight (Teaser 1:36–1:38) | — | 19.7, −6.2, −9.6, 11.5, 237° | — |

Read plainly: the Knightmare is **brighter** (L* 43–49 against 27–42) and **three to five times more saturated** than the rest of each trailer, always toward the same yellow-orange (hue 74–80°). The rest of *BvS* is near-neutral, a little warm in the highlights and teal in the shadows; the armour fight in the rain is cool. The *ZSJL* epilogue matches the *BvS* Knightmare's hue and pushes its chroma and shadow warmth further. Other warm scenes exist in both trailers (the Mexico crowd, explosions, Darkseid's fire), so warmth alone does not mark the Knightmare; the bleached sky over dark brown ground does.

**For a dark panel this means:** the Knightmare is a bright world, and the panel has to live "under the coat": in the brown-black of its shadows, lit by the cream of its sky. The armour fight is already dark on film and maps across directly (§7).

## 2. Sampled colours

All samples are from the official trailers listed in Sources, YouTube 360p (format 18, 640×360), frames cut with ffmpeg at the given time. "Median" is the median RGB of a hand-picked region (fractions of the frame). "Sat15%" is the median of the region's 15% most saturated pixels. "Red mask" is the median of pixels with R > 1.9 G and R > 1.9 B (heat vision, patch: R > 2 G). "Core / glow" splits a light into pixels above and below luma 215. Video compression and the trailers' own grade both shift these; treat them as the film's look, not the costumes' pigment.

### The Knightmare

| Element | Hex | Trailer, time | Region, method |
|---|---|---|---|
| Sky, centre | `#faecc2` | *BvS* Final, 1:55.0 | (0.23, 0.17)–(0.40, 0.24), median |
| Sky, beside the fire | `#f5dcb1` | *BvS* Final, 1:55.0 | (0.52, 0.17)–(0.62, 0.24), median |
| Sky over the fight | `#f9e1b4` | *BvS* Final, 1:55.6 | (0.40, 0.15)–(0.70, 0.30), median |
| Sky | `#f8ddac` | *BvS* Trailer 2, 2:01.5 | (0.05, 0.15)–(0.40, 0.28), median |
| Sky, pale | `#e6e1b8` | *BvS* Comic-Con, 2:40.5 | (0.00, 0.18)–(0.45, 0.24), median |
| Sky | `#fdebc4` | *ZSJL*, 0:35.5 | (0.60, 0.03)–(0.80, 0.30), median |
| Sky | `#fde7b3` | *ZSJL*, 0:37.5 | (0.74, 0.04)–(0.86, 0.25), median |
| Sun glare, epilogue | `#feedc4` | *ZSJL*, 2:01.5 | (0.30, 0.08)–(0.50, 0.30), median |
| Haze on the horizon | `#f3daa9` | *BvS* Final, 1:55.0 | (0.36, 0.30)–(0.62, 0.36), median |
| Dust haze in the fight | `#c49b67` | *BvS* Comic-Con, 2:39.5 | (0.00, 0.18)–(0.30, 0.30), median |
| Haze over the dead city | `#e1ae66` | *ZSJL*, 0:37.5 | (0.30, 0.30)–(0.70, 0.40), median |
| Haze behind Batman's face | `#be8d5c` | *ZSJL*, 2:04.5 | (0.14, 0.10)–(0.30, 0.35), median |
| Ground, mid | `#6c4d22` | *BvS* Final, 1:55.0 | (0.10, 0.40)–(0.38, 0.46), median |
| Ground, near | `#865d25` | *BvS* Final, 1:55.0 | (0.05, 0.62)–(0.25, 0.78), median |
| Ground | `#946820` | *BvS* Trailer 2, 2:01.5 | (0.05, 0.65)–(0.95, 0.80), median |
| Ground in the haze | `#8a6134` | *BvS* Comic-Con, 2:39.5 | (0.00, 0.72)–(0.30, 0.84), median |
| Ground | `#804f21` | *ZSJL*, 0:37.5 | (0.30, 0.55)–(0.75, 0.72), median |
| Ground, foreground shadow | `#3e230f` | *ZSJL*, 0:37.5 | (0.25, 0.75)–(0.75, 0.95), median |
| Concrete block | `#ae814e` | *BvS* Final, 1:55.0 | (0.64, 0.55)–(0.82, 0.80), median |
| Smoke, top left | `#6f4d2a` | *BvS* Final, 1:55.0 | (0.00, 0.17)–(0.04, 0.21), median |
| Deepest shadow, epilogue | `#100805` | *ZSJL*, 2:01.5 | (0.20, 0.75)–(0.55, 0.92), median |
| Omega pit fire, left | `#ed871a` (median `#d3741e`, white-hot `#fdef9f`) | *BvS* Final, 1:55.0 | (0.05, 0.17)–(0.11, 0.26), sat15% |
| Omega pit fire, right | `#ee8409` (median `#cf6510`, core `#fdcd4d`) | *BvS* Final, 1:55.0 | (0.72, 0.18)–(0.80, 0.27), sat15% |
| Batman's coat, long shot | `#291908` | *BvS* Final, 1:55.0 | (0.42, 0.47)–(0.46, 0.62), median |
| Batman's coat, backlit | `#492302` | *ZSJL*, 0:35.5 | (0.36, 0.52)–(0.48, 0.70), median |
| Cowl in the epilogue close-up | `#1f150d` | *ZSJL*, 2:04.5 | (0.60, 0.40)–(0.75, 0.60), median |
| Regime soldier's helmet | `#37291f` | *BvS* Comic-Con, 2:40.5 | (0.62, 0.20)–(0.72, 0.30), median |
| Regime "S" shoulder patch | `#602a1b` (brightest `#653021`) | *BvS* Comic-Con, 2:40.5 | (0.70, 0.40)–(1.00, 0.75), red mask (727 px at x 0.75–0.83, y 0.49–0.61) |
| Bunker wall | `#5c472e` | *BvS* Teaser, 0:40.5 | (0.12, 0.20)–(0.22, 0.45), median |
| Superman in the bunker doorway | `#201810` | *BvS* Teaser, 0:40.5 | (0.48, 0.30)–(0.53, 0.45), median |

The coat, scarf, goggles and the rest of Batman's desert gear are sampled in [`bat-clawd-knightmare-suit.md`](bat-clawd-knightmare-suit.md) §2 (film and merchandise); this note does not repeat them. In the film frames the gear is a dark warm brown (`#291908`, `#492302`), not the merchandise's light brown, because the scene is backlit.

### Superman's reds (outside the Knightmare)

| Element | Hex | Trailer, time | Method |
|---|---|---|---|
| Shield and cape, daylight | `#6c2e30` (most saturated `#783436`, h 24°) | *BvS* Comic-Con, 0:15.5 | red mask, whole frame (2,498 px) |
| Shield and cape, hearing room | `#52211d` (most saturated `#66261f`) | *BvS* Comic-Con, 0:23.5 | red mask, whole frame |
| Heat vision eyes, rain fight | `#933d2b` (brightest `#a84d39`, h 39–40°) | *BvS* Final, 1:55.8 | red mask, whole frame (270 px) |
| Heat vision core and bloom | `#ffb8ab`, `#a3432f` | *BvS* Final, ~1:56 | from [`bat-clawd-knightmare-suit.md`](bat-clawd-knightmare-suit.md) §2 |

The heat-vision frame is from the Gotham rain fight. The *ZSJL* epilogue's "red-eyed Superman" is described in coverage (§1) but does not appear in the trailer sampled here.

## 3. What the palette has to do

- **Stay dark.** The panel is a 300–320px corner window. Its ground comes from the Knightmare's shadows (`#100805`, `#1f150d`, `#291908`, `#3e230f`), which are warm brown, not neutral grey. That warmth is what the grey draft lost.
- **Light it with the sky.** The brightest thing in every frame is the cream sky. It becomes Bone, the text.
- **Keep the haze for what waits.** The second colour of the world, the sand haze, is calm and everywhere. It suits the waiting tier, which is non-urgent.
- **Keep the fire off the panel at rest.** The pit fire is the hottest colour in the Knightmare, but at L* 66 and chroma 75 it would out-shine any alarm and read as one. It stays in the Atmosphere's reveal and the art, never on a resting card.
- **Find an alarm that is not the world.** Anything amber disappears into the Knightmare; it has to be the one colour that is not sand, sky or fire.
- **Separate from PALE MOONLIGHT.** Burton's Theme is also a warm brown ground with gold. The Knightmare's browns lean redder and more saturated (hue 45–60°, chroma 11–28 against Burton's 70–75° and 4–10), which is what the film's shadows sample as.

## 4. The Alarm color

**Candidates, measured** (ΔE00; the waiting ink is the proposed `#e1ae66`; contrast is on the proposed `--raised` `#341b0d`, the hardest ground):

| Candidate | Hex | Anchor | Hue | vs Clawd `#d77757` | vs waiting `#e1ae66` | vs VENGEANCE `#e3121b` | vs PALE MOONLIGHT `#f0c24b` | vs WATCHFUL PROTECTOR `#3d8bff` | On `--raised` |
|---|---|---|---|---|---|---|---|---|---|
| Heat Vision (current build) | `#e60f00` | heat vision `#a84d39`, saturated | 41° | 16.1 | 35.4 | **3.7** | 44.6 | 50.9 | 3.39 (fails as text) |
| Poster carmine | `#e51232` | *BvS* poster logo | 30° | 17.1 | 38.8 | **5.1** | 48.9 | 47.8 | 3.41 (fails) |
| Omega fire | `#ed871a` | pit fire, sampled | 64° | 15.6 | **13.1** | 27.7 | 19.7 | 53.9 | 6.18 |
| Kryptonite green | `#3fd36b` | none sampled; proposed | 146° | 59.1 | 37.0 | 78.7 | 33.9 | 56.0 | 8.21 |
| **S-shield crimson** | **`#ff405f`** | shield and cape `#783436` (h 24°), full chroma | 21° | **16.4** | **37.8** | **14.6** | **48.5** | **44.6** | **4.70** |

- **Heat Vision fails between Themes.** At 3.7 ΔE it is VENGEANCE's red. The earlier note ([`bat-clawd-knightmare-suit.md`](bat-clawd-knightmare-suit.md) §7) compared it with 2022's darker `#af0006`, not with VENGEANCE's Alarm color `#e3121b`; against the right token it is closer than the 5–8 range the jury accepted between red alarms ([`snyder.md`](snyder.md) §3). On an amber panel it also drifts toward orange: hue 41° sits between Clawd's jaw (45°) and the inks (77°).
- **Poster carmine** is barely better (5.1) and still fails as text.
- **Omega fire** is the Knightmare's own hottest colour, and DESIGN.md's Alarm Color Rule allows "the hottest color in its palette". But it is 13.1 from the waiting haze and 19.7 from PALE MOONLIGHT's gold; on a brown ground with an amber alarm, KNIGHTMARE would look like PALE MOONLIGHT. It would also put an alarm-coloured glow into every sky and fire the Atmosphere draws.
- **Kryptonite green** is far from everything, and the *BvS* Knightmare is a kryptonite deal gone wrong ([ScreenCrush, 25 Mar 2016](https://screencrush.com/batman-vs-superman-spoilers-discussion/)). But no kryptonite appears in the Knightmare frames, and green reads as "passed" or "OK" in a developer's tool, the opposite of "something needs you". [`snyder.md`](snyder.md) §3 rejected it for the same reason.
- **Recommended: S-shield crimson `#ff405f`.** The Knightmare is Superman's world, and his mark in it is red: the "S" on the soldiers' shoulders and, in *ZSJL*, his red eyes. The hue is taken from his shield and cape as sampled (h 24°) and pushed to full chroma (h 21°). It is cooler than every warm colour in the Theme, so it reads as foreign to the desert. It clears VENGEANCE by 14.6, Clawd orange by 16.4 (as far as carmine), and the waiting ink by 37.8. At L* 58 and chroma 77 it is the most saturated colour on the panel, so it stays the hottest even though Bone and the haze are lighter. It also passes 4.5:1 as text on the three grounds measured (§6), so `--signal-hot` can carry the picker's stamp and status text without a lifted copy, as long as no ground it sits on is lighter than `--raised`. It is **proposed**: the hue is sampled, the chroma is not.

## 5. Proposed token palette (dark panel)

Every token is **proposed** from the samples in §2, with the anchor named.

| Token | Value | Role | Anchor |
|---|---|---|---|
| `--abyss` | `#100804` | page | the epilogue's deepest shadow `#100805` |
| `--smoke` | `#190d06` | detail-bar gradient | between abyss and surface |
| `--surface` | `#24130a` | cards, rows | the coat `#291908`, darkened |
| `--raised` | `#341b0d` | card hover, cowl shine | the foreground shadow `#3e230f`, darkened |
| `--line` | `#5a3419` | rules, borders, cowl and coat edges | the ground `#6c4d22`/`#804f21`, darkened |
| `--bone` | `#f7e8c8` | primary text, wordmark, emblem | the sky `#faecc2`/`#fdebc4`, lowered a step |
| `--bone-dim` / `--ink` | `#e0cfb0` | log lines, idle titles, report body | Bone, dimmed |
| `--ash` | `#a39886` | secondary text, STUCK stamps, ash flakes | warm ash grey; kept low in chroma (11) so it never reads as the waiting haze |
| `--ink-live` | `= --bone` | working | the jury's decision (Bone as this Theme's working ink, [`snyder.md`](snyder.md) §3); the stamp word carries the tier |
| `--ink-soft` | `#e1ae66` | waiting: ORDERS? and NEW INTEL stamps, the soft pen | **sampled**: the haze over the dead city, *ZSJL* 0:37.5 |
| `--blood` → `--waiting-rule` | `#7a4a1c` | waiting side rules. Never text | the haze, darkened to ember |
| `--signal-hot` | `#ff405f` | **the Alarm color**: lit pixels, live alarm dots, the aura, the lit disc's bat, and the picker's stamp | S-shield crimson (§4) |
| `--signal` | `#a8102f` | large alarm fills: the disc ring, the urgent glow's base | the alarm's dark body (L* 36); 10.3 ΔE from VENGEANCE's `#af0006` |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | every alarm halo | — |
| `--ink-hot` | `#ff5c72` | alarm text: AUTHORIZE and DAMAGED stamps, the hot pen | the alarm lifted for small text (5.37:1 on raised) |
| `--on-signal` | `var(--abyss)` | the count's ink on a `--signal-hot` fill | 5.81:1 |
| `--accent` | `= --bone` | focus, switches, sliders, tab underline | unchanged: nothing at rest is crimson |
| `--clawd` | `#d77757` | Bat-Clawd's body | fixed |
| `--dust` | `#c49b67` | dust flakes (Atmosphere) | **sampled**: dust haze, *BvS* Comic-Con 2:39.5 |
| `--fire` (local, art only) | `#ed871a`, core `#fdcd4d` | the Knightmare reveal's horizon glow; never at rest | **sampled**: the Omega pits |

**The waiting rule.** `--ink-soft` is the sand haze, a calm amber: 17.5 ΔE from Bone, 17.6 from Ash, 21.4 from Clawd orange and 37.8 from the alarm. It is less saturated than the alarm (chroma 45 against 77), so a waiting card never out-shouts an urgent one. Waiting side rules use the darker `--blood` `#7a4a1c`, never the haze itself, and the Omega fire never marks a tier.

**What stays as built.** The non-alarm emphasis (Bone accents, `--line` selection, Bone progress, grey Quit hover) and the Bat-Clawd suit tones of [`bat-clawd-knightmare-suit.md`](bat-clawd-knightmare-suit.md) §4 carry over. The aura becomes `--signal-hot`. The coat `#6e5338` is 22.8 ΔE from `--surface` but only 2.26:1 against `--raised`, and the cowl edge was tuned for grey; both must be rechecked on the warmer ground (Unverified).

### The Atmosphere

- **Air, not ash.** In the frames the air is full of sand, not grey ash. Keep the blown flakes of [`snyder.md`](snyder.md) §9 (density, shallow slant, 8 fps clock, gating), but make one flake in two `--dust` `#c49b67` and the rest `--ash` `#a39886`, both at 10–22% opacity.
- **Haze from above, in the sky's colour.** The sky is the light source in every frame, so the wash comes from the top: `#f3daa9` (the sampled horizon haze) at 6%, fading by 35% of the height. This replaces the grey `rgb(228 226 222 / 5%)`.
- **Grain** stays at 0.05: both films are film-originated, apart from the *ZSJL* epilogue (§1).
- **Never at rest:** fire, embers, or anything crimson. During the Knightmare reveal (intro and click only), the haze may rise to 10% and a low `--fire` glow may sit on the bottom edge, like the pits on the horizon at *BvS* 1:55.

### The Signal disc

- **Unlit:** a `--surface` disc with a 1px `--line` ring, and a top-down hard-light gradient from `#3a2210` to `--abyss` (Fong's hard light, now warm). The bat sits in `--raised`.
- **Lit: a sky lens with a crimson bat.** The lens is the Knightmare's sky as one radial gradient, `radial-gradient(circle at 50% 45% in srgb, #fdebc4, #f3daa9 60%, #e1ae66)`: sky to horizon haze to city haze, all sampled. The bat burns in `--signal-hot`, with a 1.5px `--abyss` outline, a `--signal` ring and the `--signal-glow` halo. It is the same "inverted" recipe as the current build (a lit pale lens with the alarm on the bat), warmed from colourless grey to the Knightmare's sky. Crimson on the lens core alone is 2.9:1 (1.7:1 at the haze rim), so the dark outline (16.9:1 against the lens core) keeps the shape at 64px. It reads as Superman's red against a burning sky, and the alarm is on the disc, as DESIGN.md asks.

## 6. Contrast and distances

**WCAG 2.x contrast** (relative luminance; small text needs 4.5:1):

| Ink | On `--abyss` `#100804` | On `--surface` `#24130a` | On `--raised` `#341b0d` | Verdict |
|---|---|---|---|---|
| `--bone` `#f7e8c8` (also working, accent) | 16.37 | 14.78 | 13.24 | pass |
| `--bone-dim` `#e0cfb0` | 12.96 | 11.70 | 10.49 | pass |
| `--ash` `#a39886` | 6.98 | 6.30 | 5.65 | pass |
| `--ink-soft` `#e1ae66` | 9.87 | 8.91 | 7.98 | pass |
| `--ink-hot` `#ff5c72` | 6.64 | 5.99 | 5.37 | pass |
| `--signal-hot` `#ff405f` | 5.81 | 5.25 | **4.70** | pass (unrounded 4.700 on raised). Little headroom: the sheet and notice grounds (not proposed here) must stay no lighter than `--raised` (L* 12.9), or `--ink-hot` carries that text |
| `--signal` `#a8102f` | 2.63 | 2.37 | 2.12 | never text: fills only |
| `--blood` `#7a4a1c` | 2.67 | 2.41 | 2.16 | never text: rules only |
| `--line` `#5a3419` | 1.83 | 1.65 | 1.48 | never text |
| `--clawd` `#d77757` | 6.30 | 5.68 | 5.09 | n/a (mascot) |

**ΔE00 of the Alarm color `#ff405f`:**

| Against | ΔE00 |
|---|---|
| Clawd orange `#d77757` | 16.4 |
| Waiting ink `--ink-soft` `#e1ae66` | 37.8 |
| Bone `#f7e8c8` (working) | 42.7 |
| VENGEANCE `#e3121b` | 14.6 |
| PALE MOONLIGHT `#f0c24b` | 48.5 |
| WATCHFUL PROTECTOR `#3d8bff` | 44.6 |
| The Omega fire `#ed871a` (art only) | 32.1 |

`--ink-hot` `#ff5c72` sits 15.8 from Clawd orange, 18.1 from VENGEANCE's `#e3121b` and 35.9 from the waiting ink.

**Within the Theme:** waiting vs Bone 17.5, waiting vs Ash 17.6, waiting vs Clawd 21.4, dust flakes vs waiting 7.1 (the flakes are at 10–22% opacity, never text).

**Against PALE MOONLIGHT's grounds:** surface 7.5, raised 8.3, line 13.1, abyss 1.7. The abyss is a near-black in both, as VENGEANCE's and WATCHFUL PROTECTOR's are; the surfaces separate by their redder, more saturated brown. The waiting haze is 9.2 from PALE MOONLIGHT's gold alarm and 10.2 from its waiting `#c98a3e`. That is a non-alarm against another Theme's alarm, which the rules allow, but check the two picker folders side by side.

## 7. The fallback: the armour fight in the rain

At the climax of *BvS*, Batman in the armoured suit fights Superman in the rain under the lit Bat-Signal ([`snyder.md`](snyder.md) §2.7).

**What it looks like** (measured as in §1): dark (L* 20–41) and near-colourless to cool (chroma 3–12, hue 158–237°). Steel-teal rain, the armour a darker blue-grey, the eye lights mint-white with a teal bloom, and the Bat-Signal a neutral cream lens with a dark bat.

| Element | Hex | Trailer, time | Region, method |
|---|---|---|---|
| Eye light, core | `#dafae1`, `#d2f2d9`, `#e1e6d1` | Teaser 1:36.5; Final 2:01.0; Comic-Con 2:24.0 | eye boxes, core (luma > 215) |
| Eye light, bloom | `#579ea3`, `#247786`, `#38727f` | same | eye boxes, glow (luma 70–215) |
| Helmet plate | `#20454f` (highlight `#7a9a98`) | Teaser 1:36.5 | (0.30, 0.18)–(0.45, 0.35), median |
| Armour body | `#0b2230` | Teaser 1:36.5 | (0.20, 0.55)–(0.35, 0.75), median |
| Rain background | `#0e1d28`, `#1f3040`, `#314f57` | Teaser 1:36.5; Comic-Con 2:24.0; Final 1:59.5 | median |
| Bat-Signal lens | `#dedec9`, `#e6e6cb` | Comic-Con 2:15.5, 2:13.5 | median |
| Bat-Signal bat (metal) | `#858981`, `#414951` | Comic-Con 2:15.5, 2:13.5 | median |
| Night sky around the beam | `#242424` | Comic-Con 2:15.5 | median |
| Heat vision eyes | `#933d2b` (brightest `#a84d39`) | Final 1:55.8 | red mask |

**Alternative token palette** (all **proposed**):

| Token | Value | Anchor |
|---|---|---|
| `--abyss` | `#060a0e` | rain background, darkened |
| `--smoke` | `#0a1116` | — |
| `--surface` | `#111b23` | armour body `#0b2230`, neutralised |
| `--raised` | `#1b2a35` | rain `#1f3040` |
| `--line` | `#34495a` | helmet plate `#20454f`, lifted |
| `--bone` (= working) | `#e8e6d2` | the Bat-Signal's lens `#e6e6cb` |
| `--ash` | `#8e9ba3` | steel |
| `--ink-soft` (waiting) | `#e0c27e` | the Signal's lamp, warmed so it separates from Bone |
| `--waiting-rule` | `#6b6448` | the lamp, darkened |
| `--signal-hot` (Alarm color) | `#ff5068` | heat vision in the same fight, cooled to clear VENGEANCE (16.2 ΔE) |
| `--ink-hot` | `#ff5c72` | as in §5 |
| Eye light (Bat-Clawd's eyes and Pose only) | core `#c8f5e4`, bloom `#2a8a99` | sampled eye light |
| Lit disc | the film's own Bat-Signal: lens `#e6e6cb`, the bat dark metal `#414951`, with the ring and halo in `--signal-hot` | sampled |

| Ink | On `--abyss` | On `--surface` | On `--raised` |
|---|---|---|---|
| `--bone` `#e8e6d2` | 15.77 | 13.84 | 11.67 |
| `--ash` `#8e9ba3` | 6.97 | 6.11 | 5.16 |
| `--ink-soft` `#e0c27e` | 11.52 | 10.12 | 8.53 |
| `--ink-hot` `#ff5c72` | 6.64 | 5.83 | 4.92 |
| `--signal-hot` `#ff5068` | 6.24 | 5.48 | 4.62 |

ΔE00 of its alarm `#ff5068`: Clawd orange 15.7, its waiting ink 42.0, Bone 41.2, VENGEANCE 16.2, PALE MOONLIGHT 47.2, WATCHFUL PROTECTOR 43.9. The lit Signal's dark bat is 7.2:1 against its lens. The eye light as an alarm instead (core `#c8f5e4`) would be 41.9 from WATCHFUL PROTECTOR's alarm but only 14.1 from Nolan's mercury working ink `#7cc6c4`, and its bloom `#2a8a99` 19.7.

**Why it loses for this panel.**

- **It is WATCHFUL PROTECTOR's ground.** Its abyss, surface and raised sit 0.6, 2.2 and 2.7 ΔE from WATCHFUL PROTECTOR's `#04070b`, `#0f161e`, `#18232e`. Two blue-black Themes would not separate in the picker.
- **Its signature light is Nolan's mercury.** The teal-white eye light is 14.1 from WATCHFUL PROTECTOR's working ink.
- **Its scene is VENGEANCE's.** A red light in the rain under a lit Bat-Signal is what VENGEANCE already draws: rain Atmosphere, a lit lens, a red alarm.
- **Its waiting tier is weak.** Nothing in the sequence is warm except heat vision, so the waiting ink has to be invented (`#e0c27e`, from the lamp).
- What it does well: it maps to a dark panel with no translation, since the film itself is dark, and its alarm has the best story (the heat vision is sampled in that fight).

## 8. Recommendation

Build KNIGHTMARE on the amber Knightmare palette of §5, with **S-shield crimson `#ff405f`** as its Alarm color. The amber is what the maintainer remembers and what both films grade the sequence as. The dark panel lives in its shadows and is lit by its sky, so it stays a dark corner window. The crimson is Superman's mark in his ruined world; it is the one colour on the panel that is not desert, and it clears VENGEANCE, Clawd orange and the waiting ink by wide margins. Keep the armour fight for Bat-Clawd's iconic moments, not the palette.

**First on-screen checks:** the crimson next to Clawd's jaw in the header and on the aura; a waiting card next to an urgent one; the KNIGHTMARE and PALE MOONLIGHT folders side by side in the picker; the coat `#6e5338` and the cowl edge on the warmer ground; the lit disc at 64px.

## Unverified items

- **The grade's intent.** No crew source describes the Knightmare's colour. Fong describes the desert sequence's camera, not its grade; Wagner's interview credits "stylised VFX and colour grading techniques" in the article's own words, not his. No interview with Stefan Sonnenfeld about either film was found.
- ***American Cinematographer*, April 2016.** AC ran a feature on *BvS* ([video promo](https://vimeo.com/160694387); [digital edition](https://www.nxtbook.com/nxtbooks/ac/ac0416_v2/index.php?startid=72)), but the digital edition did not render its text here. It may describe the Knightmare.
- **Which location.** Fong names New Mexico among the locations; that the desert sequence was shot there is likely but not stated.
- **Trailer grade vs film grade.** All samples come from trailers, at 360p on YouTube. A trailer can carry an earlier or different grade, and compression shifts small colours. The Blu-ray and the IMAX release were not sampled.
- **The regime patch's true red.** `#602a1b` is the graded, hazed, compressed patch; its pigment is unknown.
- **Superman's red eyes in the *ZSJL* epilogue.** Described by ComicBook.com, not sampled; the trailer does not show them.
- **The 1:55.0 frame of the Final Trailer** is the only Knightmare frame in that trailer's window, so its row in §1 is one frame.
- The Weta article is a reprint of a Collider piece; its author is not named on the page.
- **On screen, not yet seen:** everything in §8's checks; the lens gradient at 64px; the dust-and-ash mix at 10–22%.

## Sources

- Cinematography: [Kodak / *InCamera*, Larry Fong, 11 Apr 2016](https://www.kodak.com/en/motion/blog-post/batman-v-superman/) · [British Cinematographer, "Larry Fong ASC / Batman v Superman: Dawn of Justice", 5 Apr 2016 (byline Trevor Hogg per a search summary; the page credits the magazine)](https://britishcinematographer.co.uk/larry-fong-ascbatman-v-superman-dawn-of-justice/) · [Cinematography World, Kirsty Hazlewood, "The Course of Justice" (Fabian Wagner), 6 Apr 2021](https://www.cinematography.world/the-course-of-justice/) · [*American Cinematographer*, April 2016](https://www.nxtbook.com/nxtbooks/ac/ac0416_v2/index.php?startid=72) (not readable)
- Visual effects: [Weta FX, "Here's How the VFX Artists Put Together the New Knightmare"](https://www.wetafx.co.nz/articles/zack-snyders-justice-league-heres-how-the-vfx-artists-put-together-the-new-knightmare) (Kevin Andrew Smith)
- Coverage: [ComicBook.com, Cameron Bonomolo, 27 Mar 2021](https://comicbook.com/movies/news/justice-league-snyder-cut-zack-snyder-difficulty-filming-new-knightmare-epilogue/) · [ScreenCrush, 25 Mar 2016](https://screencrush.com/batman-vs-superman-spoilers-discussion/)
- Official trailers (sampled at 360p, YouTube format 18): [*BvS* Official Teaser Trailer, Warner Bros., 17 Apr 2015, `IwfUnkBfdZ4`](https://www.youtube.com/watch?v=IwfUnkBfdZ4) · [*BvS* Comic-Con Trailer, Warner Bros., 11 Jul 2015, `0WWzgGyAH6Y`](https://www.youtube.com/watch?v=0WWzgGyAH6Y) · [*BvS* Official Trailer 2, Warner Bros., 3 Dec 2015, `fis-9Zqu2Ro`](https://www.youtube.com/watch?v=fis-9Zqu2Ro) · [*BvS* Official Final Trailer, Warner Bros., 15 Feb 2016, `NhWg7AQLI_8`](https://www.youtube.com/watch?v=NhWg7AQLI_8) · [*Zack Snyder's Justice League* Official Trailer, Warner Bros. UK & Ireland, `ui37YKQ9AC4`](https://www.youtube.com/watch?v=ui37YKQ9AC4)
- Method: colour math is WCAG 2.x relative luminance and CIEDE2000 (D65, sRGB), computed in Python; ΔE00 Heat Vision vs Clawd (16.1) and Bone `#e4e2de` on `#0c0c0b` (15.13) reproduce the figures in the sibling notes.
- In this repo: [`snyder.md`](snyder.md) · [`bat-clawd-knightmare-suit.md`](bat-clawd-knightmare-suit.md) · [`DESIGN.md`](../../../DESIGN.md) (Alarm Color Rule, Bat-Clawd Costume Rule, the 4.5:1 rule) · [`CONTEXT.md`](../../../CONTEXT.md) · the sibling Themes' stylesheets for their Alarm colors (`the-batman-2022.css`, `batman-1989.css`, `the-dark-knight-2008.css`)

## Legal

No film image, trailer frame or still goes into the repo. The frames were cut to a scratch folder outside it for measurement only. The hexes are measurements, and this note links to the official sources.
