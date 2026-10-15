# Research note: ANCIENT GRACE, reworked (chest bat, bulk, the leap, colour)

Research note, 2026-10-15. Scope: the four points on which the maintainer rejected ANCIENT GRACE as shipped in #127: the chest bat, the old man's bulk, the lightning leap, and the overall colour. Each is checked against *The Dark Knight Returns* (Frank Miller, Klaus Janson, Lynn Varley, DC, 1986) and against the animated adaptation, *Batman: The Dark Knight Returns, Part 1* (2012) and *Part 2* (2013). Each section ends in a concrete proposal for `suits.ts`, `emblems.ts` and `the-dark-knight-returns-1986.css`. Read with [`dark-knight-returns.md`](dark-knight-returns.md) (the dossier and its "Built in #120" note), [`year-one-bat.md`](year-one-bat.md) §4–6 and [`jury-wave-2.md`](jury-wave-2.md) §9.

Provenance key used below: **Read** = seen by us on a reproduction of a page, cover or frame, named with its URL. **Measured** = taken off that image with a script (pixels, or colour medians), or read off a gridded crop of it. **Inferred** = our reading of what those facts imply.

## 1. TL;DR

- **Chest bat: wide, not round.** No source shows the round Book Three emblem on the chest. The film's second suit, front-on, wears a wide bat of about **2.3:1**: a horn at each wing's upper outer corner (the highest points), a top edge that climbs from two short ears to the horns, convex outer edges ending in a sharp wingtip at **mid-height**, then underneath, each side, one concave sweep to a middle point, one shallow scallop, and a long run to a pointed tail, the lowest point. The comic's second-suit chest (Book Three p. 10 splash, ink) agrees in what shows: wide, armpit to armpit, the wings reaching up to the shoulders, a scalloped underside, the top hidden under the cape's collar. A traced path is in §3. **Cost:** it is a cousin of KNIGHTMARE's `BAT_2016` (Snyder took that bat from this book); they differ in where the wingtips sit and in the underside (§3.4). Decide on screen.
- **The Book Two cover is not the second suit.** It shows the first suit's colours (grey, light-blue cowl, gloves and boots, a yellow belt), torn, with a black bat and no oval. A toy reviewer calls it "comic accurate, just not comic-interior accurate" (§2). The shipped chest bat (BAT_1986 stretched to 2.2:1 "as the Book Two chest") rests on that cover.
- **Bulk: shoulders four to five heads wide, and the head sunk between them.** Measured on two frontal film frames and two comic images: shoulder width is 3.8–5.3 times the cowl's width; the ears are 0.13–0.21 of the head's height and sit flush with the cowl's outer corners; in a fighting stance the shoulders rise to the jaw or above it. For Bat-Clawd that means shoulders two units past the body each side (x 1–15), rising beside the cowl to the jaw row, in suit grey so the head reads small; an outfit map is in §4.4.
- **The leap faces right, leans forward, and the shipped tilt leans the wrong way.** On the Book One cover he moves left to right, in profile facing right. His torso leans about **24° forward**, top toward where he faces (the film's matching frame: about 29°). The near arm is raised with the forearm over the head and the fist forward, and the far arm reaches down and forward. The legs are tucked, one knee forward and that foot trailing. The cape is one huge wedge trailing up and to the left, its upper edge about **41°** above horizontal, its lower edge level at knee height, running out of the frame. The bolt runs top-right to bottom-left about **14° from vertical**, *behind* him, from his fist down to the gap between his legs. The shipped `rotate(-15deg)` turns him counter-clockwise, so he leans back. The rework should use **`rotate(12deg)`**, clockwise (§5).
- **Colour: the shipped grounds have drifted violet.** Every sky sample (painted original, a printed first printing, Wikipedia's scan) sits at hue 260–272°. The shipped surface and raised sit at 286–287°, chroma 18–23, an indigo the cover doesn't have. The film's night is desaturated slate (hue 256–290°, chroma 8–17), the interiors' storm and TV pages a pale icy blue-cyan (hue 195–230°). The catch is WATCHFUL PROTECTOR: any ground at the cover's own hue lands 1.9–7.8 ΔE00 from its grounds. Two ways out are measured in §6: the interiors' icy blue at hue ~225° (8.6 / 9.9 from WATCHFUL PROTECTOR), or keeping the shipped violet. **New collision found:** the shipped waiting ink `#7ea7d8` is also **5.8** from WATCHFUL PROTECTOR's `--ink-hot` `#5aa9ff`, as well as 3.9 from PALE MOONLIGHT's steel. The storm-sky blue `#7aadbf` clears both (14.2, 9.5).

## 2. Sources, and the two suits

| Key | Source | What it is | Used for |
|---|---|---|---|
| **C1-art** | Heritage, *Intelligent Collector*: [the Book One cover original](https://intelligentcollector.com/wp-content/uploads/2022/05/Frank-Miller-and-Lynn-Varley-Batman-The-Dark-Knight-Returns-No.1-Cover-Original-Art-DC-1986.jpg), 614×900 ([article](https://intelligentcollector.com/batmans-lightning-bolt-moment/)) | Photo of Miller and Varley's painted board, no logo | Pose, bolt, colour (paint) |
| **C1-print** | Same article: [a CGC 9.6 copy](https://intelligentcollector.com/wp-content/uploads/2022/05/Batman-The-Dark-Knight-Returns-No.-1-DC-1986-CGC-NM-9.6-White-pages.jpg), 567×900, label "D.C. Comics, 3/86" | A 1986 printed cover, photographed in its slab | Colour as printed |
| **C1-wiki** | [Wikipedia cover file](https://en.wikipedia.org/wiki/File:Batman_The_Dark_Knight_Returns_1_(February_1986).jpg), 256×398 | The dossier's S-C | Cross-check |
| **C2** | [mycomicshop scan of Book Two](https://media.mycomicshop.com/n_ii/originalimage/8299406.jpg), 3328×5200; [The Fwoosh's copy](https://i0.wp.com/thefwoosh.com/wp-content/uploads/2015/09/1868102-batman_the_dark_knight_returns__1986_1st_printing__2_.jpeg?ssl=1) | The Book Two cover, first printing | Bulk; which suit |
| **C3** | [mycomicshop scan of Book Three](https://media.mycomicshop.com/n_ii/originalimage/8433898.jpg) | The round emblem (BAT_1986's source) | Comparison |
| **P10** | [Book Three, p. 10, original art](https://www.coolandcollected.com/wp-content/uploads/2011/03/frankmiller_darkknight.png), 500×767 ([Cool and Collected](https://www.coolandcollected.com/frank-miller%e2%80%99s-1986-dark-knight-batman-robin-splash-page-at-heritage-auctions/); sold at Heritage in 2011, [Paul Fraser](https://www.paulfrasercollectibles.com/blogs/art-photography/the-dark-knight-rises-again-batman-drawing-achieves-world-record-price)) | Ink, the second suit leaping beside Robin | Chest bat in the comic |
| **TCJ** | Reproductions in H. W. Thurston's [TCJ essay](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/) (edition not stated): [storm pages](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.11.22-AM.png), [KLIK page](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/26.png), [TV grids](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.11.13-AM.png), [horse splash](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.18.27-AM.png), [three Batman panels](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-9.57.56-AM.png) | Printed interiors, a later edition | Night and TV colour; suits |
| **F1, F2** | The World's Finest (dcanimated.com): Part 1 [official stills](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/gallery/) ("courtesy of Warner Home Video and Warner Bros. Animation") and [screengrabs](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/), 1920×1080; Part 2 [stills](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/gallery/) and [grabs](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/grabs/). Files resolve at `…/media/gallery/NN.jpg` and `…/media/grabs/NN.jpg` | The animated films | Chest bat, bulk, the leap, night colour |
| **F-BD** | TheaterByte's [Part 1 Blu-ray review](https://www.theaterbyte.com/batman-the-dark-knight-returns-part-1-blu-ray-review/), 13 captures at 1920×1080 (watermarked Blu-ray Definition) | Blu-ray frames | Bulk (frame 08) |

**Film credits** (Read, [World's Finest, Part 1 cast and crew](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/backstage/castcrew.php); [Part 2](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/backstage/castcrew.php)): directed by Jay Oliva; written by Bob Goodman; **lead character design Jon Suzuki**, with Lynell Forestall, Stephen Jones, Danny Kimanyen, Coran Stone, Junpei Takayama, Brian Uchida, Melchior Zwyer (and Matthew Humphries on Part 2); animation by Moi Animation Studios. Phil Bourassa is not in either credit list as the site gives it.

**The two suits.**
- **Film** (Read, F1/F2): the first suit has a grey body, a blue cape, cowl, gloves, boots and trunks, a **yellow oval** with a black bat, and a yellow pouch belt (F1 gallery 35; F1 grab 22, the first fight with the Mutant leader at the dump). The second suit, from the second Mutant fight on, has **no oval**: a big black bat on the grey, a black cape, cowl, gloves and boots, dark trunks, and a lighter yellow-khaki pouch belt (F2 grab 03; F2 gallery 01). This matches the fan wiki the dossier cited ([DC Movies Wiki](https://dcmovies.fandom.com/wiki/Batsuit_(The_Dark_Knight_Returns))).
- **Comic** (Read): Book One shows the grey suit with a process-blue cape and the yellow oval (TCJ, first of the three Batman panels). A night panel shows the oval with a **black** cowl, cape and gloves (TCJ, third panel), so in the comic the cowl's colour follows the light. The oval, not the cowl, tells the suits apart. The second suit in ink (P10) has a wide black bat with no oval outline. The Fwoosh, reviewing Mezco's figures: the oval suit is the one he wears "when first coming out of retirement" and in the first Mutant fight; "it's actually after this fight that he switches to the black bat suit"; the torn suit "looks a lot like this, from the cover of the first printing of Book 2", so it is "comic accurate, just not comic-interior accurate" ([The Fwoosh, 2015](https://thefwoosh.com/2015/09/mezco-sdcc-2015-dark-knight-returns-box-set/)).
- **So the Book Two cover is the first suit's colours, not the second suit's** (Read, C2): light-blue cowl, cape and gloves, a yellow belt, a torn grey suit, and on it a black bat with no oval. As a chest-bat source it shows a torn, foreshortened first suit whose top is hidden by the cowl's drape (`year-one-bat.md` §4).

## 3. The chest bat

### 3.1 What the sources show

- **Comic, second suit, P10 (Book Three p. 10, ink).** Read: Batman in three-quarter view, arm thrust ahead. The bat is solid black and spans the chest from armpit to armpit (about 85 of the page's 500px, the width of the chest). The far wing climbs to an upper outer point at the shoulder, and the near wing runs into the armpit. The underside is cut in small scallops with points between them, and the top is covered by the cape's collar, so no head or ears show. The visible part is about 1.9:1 (Measured, approximate: the turn and the collar hide its true height).
- **Film, second suit, F2 grab 03** ([image](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/grabs/03.jpg)): Batman on horseback, front-on, from slightly below, firelit. The right half of the bat is clean. The left half is partly behind the glove and the reins, and the lower half lies in a cast shadow, separable by its darker, bluer black. **Measured** from column profiles of a colour mask (bat `#1a1610` in the light, `#02060a` in the shadow, against suit `#5f4b37` and shadow `#1a1f29`): wingtip to tail-axis 223px, so about 444px wide; horn to tail 193px; **2.31:1**. The ears are 45px apart, centred 7px right of the tail (the cowl is slightly turned). The traced outline was laid back over the frame in red and fits the right half and the visible left scallop points (comparison image kept outside the repo).
- **Film, F2 gallery 01** ([still](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/gallery/01.jpg)): Read: the same wide bat, its top merged with the black cape collar. Two short ears show above the bat's top edge, and the underside has scallops and a tail.
- **Book Three cover (C3):** the round 1.05:1 bat, alone in a glow, as traced in `year-one-bat.md` §5. **No chest in either medium wears it.** Inferred: it is a cover design, as Year One's covers were.

### 3.2 The shape, in words (from the film, consistent with P10)

- **Wide:** 2.3:1, horn to tail.
- **Horns are the highest points**, at each wing's upper outer corner. From the ears the top edge climbs steadily to them, about 10° above level.
- **A small head between two short, pointed ears.** The ears are 3.2 units wide at the base and rise 2.7–3.5 units, with their tips 5.6 units either side of centre. The head between them is flat, 3.5 units below the ear tips.
- **Outer edges convex**, falling from the horn to a sharp wingtip at **mid-height** (y 25 of 48).
- **Underneath, each side:** from the wingtip a level run, then a concave sweep down and in to a **middle point** (y 39). Then **one shallow scallop**, rising to y 34, and then a **long straight run** to the tail.
- **Tail:** one long point on the centre line, the lowest point (y 48).
- No oval.

### 3.3 Redraw spec (120×48, left half mirrored at x = 60)

Right half, as measured (x, y), then mirrored. The left half below is its mirror image.

| Point | Right half | Left half |
|---|---|---|
| head top (centre) | 60, 5.5 | |
| ear, inner base | 64.1, 5.5 | 55.9, 5.5 |
| ear tip | 65.6, 2.0 | 54.4, 2.0 |
| ear, outer base | 67.3, 4.7 | 52.7, 4.7 |
| top edge | 74.4, 4.7 → 81.9, 3.7 → 89.3, 2.0 | 45.6 → 38.1 → 30.7 |
| **horn tip** | **96.8, 0** | **23.2, 0** |
| outer edge | 100.5, 3 → 105.5, 8 → 110.5, 14.7 → 113.5, 20.1 | 19.5 → 14.5 → 9.5 → 6.5 |
| **wingtip** | **115.5, 25.4** | **4.5, 25.4** |
| lower edge | 110.5, 25.4 → 105.5, 26.4 → 100.5, 29.1 → 95.6, 33.1 | 9.5 → 14.5 → 19.5 → 24.4 |
| **middle point** | **91.6, 38.8** | **28.4, 38.8** |
| scallop | 88.1, 35.8 → 83.1, 34.1 → **79.4, 33.8** (top) | 31.9 → 36.9 → 40.6 |
| run to the tail | 74.4, 34.6 → 69.5, 37.1 → 64.5, 41.3 | 45.6 → 50.5 → 55.5 |
| **tail tip** | **60, 48** | |

```
M60 5.5 L55.9 5.5 L54.4 2 L52.7 4.7 L45.6 4.7 L38.1 3.7 L30.7 2 L23.2 0 L19.5 3 L14.5 8 L9.5 14.7 L6.5 20.1 L4.5 25.4 L9.5 25.4 L14.5 26.4 L19.5 29.1 L24.4 33.1 L28.4 38.8 L31.9 35.8 L36.9 34.1 L40.6 33.8 L45.6 34.6 L50.5 37.1 L55.5 41.3 L60 48 L64.5 41.3 L69.5 37.1 L74.4 34.6 L79.4 33.8 L83.1 34.1 L88.1 35.8 L91.6 38.8 L95.6 33.1 L100.5 29.1 L105.5 26.4 L110.5 25.4 L115.5 25.4 L113.5 20.1 L110.5 14.7 L105.5 8 L100.5 3 L96.8 0 L89.3 2 L81.9 3.7 L74.4 4.7 L67.3 4.7 L65.6 2 L64.1 5.5 Z
```

50 coordinate pairs, straight segments, exactly symmetric, box x 4.5–115.5 × y 0–48. The convex outer edge and the scallop could become one quadratic each when drawn. Any control points must stay inside that box, because `emblem()` reads every number pair. The tail reaches y 48, the grid's bottom edge; the other bats stop at 47.6, so pull it up 0.4 if a test or the renderer clips there.

**Chest size.** At 2.31:1 a 3-unit height gives **6.9 × 3 units**, centred at `cx 8, cy 7.5` (y 6–9), the shipped footprint (6.6 × 3) with no stretching. This is the shape's own aspect, so `height` can be dropped from the layer. The disc and the masthead can keep the round BAT_1986 (the cover's emblem) or take this bat. On the disc, the round one fills the lens and this one is a wide band; decide on screen.

### 3.4 How it differs from the shipped bat, and what it collides with

- **Against BAT_1986 as shipped on the chest** (the round cover bat stretched to 2.2:1): that bat has a deep round notch between each wing's upper tip and the head, a narrow tall head, two V notches a side and a hooked lower wingtip. Stretched, the notch becomes a wide scoop out of the top edge and the ears stand up out of it. The film's chest bat has **no notch at all**: its top edge is continuous, climbing from the ears to the horns. Its **wingtip is at mid-height, not at the bottom**, and underneath it has **one middle point and one shallow scallop** a side, not two Vs.
- **Against KNIGHTMARE's BAT_2016** (Measured on renders of both paths). The overall gestalt is the same family: 2.31 vs 2.22:1, horns highest, small ears, a long tail. Box-normalised overlap (intersection over union) is **0.74**. For scale, BAT_2016 against BAT_1987, two shipped emblems the jury accepted, is already 0.76. The two traces nearly coincide along the top edge. They differ below it: BAT_2016's outer edge sweeps all the way down to a **low outer point at y 40**, and its underside has a scallop, a small hook tooth and a straight run to a deep V. The DKR film bat's **wingtip is at y 25**, with a level run, a middle point, one scallop and a long tail. At chest size (6.6–8 units, about 14–17px) the film bat reads as a lozenge with a short drip below, and BAT_2016 as a wide bar standing on two feet with a V. **Cost, stated plainly:** the dossier (§8) asked DKR's bat to differ from BAT_2016 at 54px, and the round cover bat was the way it did. A faithful chest bat brings DKR back toward KNIGHTMARE, the bat Snyder borrowed from this book. **Decide on screen**, both bats on the disc and on the chest, labelled.
- **Against BAT_1987 (Year One)**: 0.74 overlap. Year One's bat has nearly upright outer edges with the wingtips at the bottom, horns set in from the corners, and a rounded tail as low as the wingtips. DKR's has convex outer edges, mid-height wingtips and a long tail below everything. The suits also differ in value: a mid-grey suit against Year One's light one (`year-one-bat.md` §6).

## 4. The bulk

### 4.1 Measured proportions

Read off gridded crops (landmarks to about ±10px at 1920 wide).

| Source | Stance | Shoulders ÷ cowl width | Ear height ÷ head height | Shoulders vs jaw | Chin-to-belt ÷ head height |
|---|---|---|---|---|---|
| F1 gallery 35 ([still](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/gallery/35.jpg)), first suit, low angle | standing | 1000 / 190 = **5.3** | 45 / 215 = 0.21 | shoulders ~85px below the chin; the cape's collar falls ~16° from the cowl's base to the shoulder | 525 / 215 = 2.4 |
| F-BD frame 08 ([capture](https://v8i2j3k6.delivery.rocketcdn.me/wordpress/wp-content/uploads/2012/09/Batman-Dark-Knight-Returns-Part-1-BD_08.jpg)), first suit, eye level | fighting | 1460 / 300 = **4.9** | 55 / 430 = **0.13** | shoulder tops at **brow level**, far above the chin | n/a (cut off) |
| C2, Book Two cover | crouched, fists forward | 570 / 150 = **3.8** | ears cut by the frame | shoulders **above the jaw** | n/a |
| TCJ, third Batman panel (night, oval) | crouched | 240 / 60 = **4.0** | ~0.16 | shoulders **above the jaw** | n/a |

Read, in all of them:
- **Tiny head.** The cowl is a straight-sided box, as wide at the cheeks as at the brow. There is no neck: the cowl's base runs straight into the trapezius and the cape's collar.
- **Very short ears** at the cowl's **outer corners**, their outer edges flush with its sides. In the film they are a narrow triangle with a flat top between them.
- **Eye slits** are narrow and white, slanted down toward the nose in a scowl. The brow ridge is heavy.
- **A barrel chest** wider than the hips. The torso tapers from the shoulders to a belt that is narrower than the shoulders by about a third.
- **Trunks:** blue on the first suit, dark on the second, in both media.
- **Gloves** with three fins on the forearm, visible as the spikes over his head in the leap. **Boots** to mid-calf.
- **The cape** is heavy and long, to the calves, with its collar draped over the shoulders. Spread, its edge breaks into ragged points (F1 grab 15; the cover).

### 4.2 The colours of the suits

Measured, median of region (LCh in brackets):

| Part | Comic | Film |
|---|---|---|
| First suit, body | Book Two cover `#aaa59e` (L68 C4, warm grey) | lit by its scene (dump: orange) |
| First suit, cowl, cape, gloves | Book Two cover `#68a3b8` / `#5c93b1` (L58–64 C22 h231–245); Book One interior, process blue `#0070b3` | blue (Read; not sampled) |
| First suit, belt | Book Two cover `#dbb359` | yellow pouches |
| Second suit, body | night panel `#717966` / `#4c5855` (L36–50); horse splash, moonlit highlights `#b2d3e4` | under firelight `#5f4b37`, under fairground light `#2c2f24`: a mid grey tinted by each scene |
| Second suit, cowl, cape | `#040907` (black) | `#141211` / `#000000` (black) |
| Second suit, belt | night panel: grey `#4f5e5e` | lighter yellow-khaki pouches (`#69532b` firelit) |
| Chest bat | Book Two cover `#191316` | `#1a1610` (firelit) |

Inferred: the second suit is a **mid grey under black**, and both media colour that grey with the scene's light. The shipped `--suit` `#666864` (L43, neutral) sits at the middle of the comic's night readings and can stay. A cool tint toward the night (for example `#5f6870`) is an option if the grounds change (§6).

### 4.3 What to change in Bat-Clawd, within the Costume Rule

The Costume Rule fixes Clawd's body (x 3–13), his orange jaw row (y 4) and white eyes, and the cowl down to his eyes. So his head can't shrink. It can be made to *look* smaller by putting mass beside it, the way the sources do:
1. **Shoulders two units past the body each side** (x 1–15) at chest height. That gives a shoulder-to-cowl ratio of 1.4. The sources' 4–5 can't be reached without breaking Clawd's shape, but the *direction* reads.
2. **The shoulders rise beside the cowl to the jaw**, a trapezius slope from the cowl's lower corners: one unit out at y 3.5, two units out at y 4. This is the "head sunk between the shoulders" of the Book Two cover and frame 08. It is suit grey, not cape black, so the cowl doesn't widen into a bigger black head.
3. **Ears:** keep them short and at the outer corners (x 3 and 12, 1 unit, as shipped). They can't go below 1 unit (dossier §7). If anything, give them a flat top a unit wide, as the film draws them.
4. **A waist narrower than the chest:** the belt row stays at x 3–13, under a chest that is wider at x 1–15. That is the barrel.
5. **Arms hanging beside the barrel:** gloves at x 1 and x 14, y 6.5–8.5, outside the body block.
6. **The chest bat as in §3.3** (6.9 × 3, y 6–9). The bat runs nearly armpit to armpit in both media, and at 6.9 of the body's 10 units it does here too.
7. **Belt:** the sources disagree (comic grey, film yellow-khaki). The shipped suit-grey belt stays, because the jury needed it to keep the bat from merging into a dark belt.

### 4.4 Standing pose, outfit map (each line a half-row)

Legend as in `suits.ts`: `c` cowl, `h` cowl shine, `#` Clawd orange, `S` suit, `g` gloves, `b` belt, `k` buckle. The eyes are drawn by `EYES` (white, at y 3). The cape and the chest bat are layers.

```
y0.0  ...c........c...   ears, 1 unit, at the cowl's outer corners (as shipped)
y0.5  ...c........c...
y1.0  ...cccchhcccc...   heavy brow
y1.5  ...cccchhcccc...
y2.0  ...cccccccccc...
y2.5  ...cccccccccc...
y3.0  ...cccccccccc...   eyes (white 2x1 at x 5 and 9)
y3.5  ..SccccccccccS..   trapezius starts beside the cowl
y4.0  .SScc######ccSS.   jaw row, shoulders risen to it
y4.5  .SScc######ccSS.
y5.0  .SSSSSSSSSSSSSS.   chest, x 1-15 (bat layer from y 6)
y5.5  .SSSSSSSSSSSSSS.
y6.0  .SSSSSSSSSSSSSS.
y6.5  .gSSSSSSSSSSSSg.   gloves hang beside the barrel
y7.0  .gSSSSSSSSSSSSg.
y7.5  .g.SSSSSSSSSS.g.   waist back to x 3-13
y8.0  .g.bbbbkkbbbb.g.   belt (suit grey, buckle in Ash)
y8.5  ...SSSSSSSSSS...
y9.0  ....S.S..S.S....   legs as shipped
y9.5  ....g.g..g.g....
y10.0 ....g.g..g.g....
y10.5 ....g.g..g.g....
```

**Costs to check in code (Inferred from `suits.ts`):**
- `BODY_BOX` (`[3, 5, 10, 7]`) cuts the cape's rim where his body hides it. With shoulders at x 1–15 the cut must widen, or the rim draws across the shoulders.
- The armour pose's tell is pauldrons "a full unit past the body". If the resting suit is already two units wider, the armour must go wider again (x 0–16) or lose its tell.
- *Absolute*'s resting shoulders are a unit wider than the body (jury §3.5). Here they are two, and they rise to the jaw. Check side by side.
- The two-tailed cape (`TAILS.hanging`) starts at x 3 and 13. It should start at the new shoulders, x 1 and 15, so it hangs behind them.

## 5. The iconic pose

### 5.1 The Book One cover, measured (C1-art, 614×900)

Landmarks read off a gridded crop, in the board's pixels:
- **Direction:** he moves **left to right**, seen in **profile facing right**. The cape trails left, out of the frame.
- **Torso:** the line from the neck (~245, 205) to the pelvis (~205, 295) leans **24° from vertical, top forward**, toward where he faces. Taken whole, the silhouette is nearly upright: a principal-axis fit gives −7°, because the reaching arm and the trailing foot pull the axis apart. It is a compact, tucked pounce, not a horizontal dive and not an arch.
- **Rising or falling:** the cover doesn't say. In the film's sequence (F1 grabs 13, 14, 15) he enters from the left with his arm forward, holds this pose at the flash, and leaves to the right, dropping, with the cape above him. So the cover's moment is at or just past the top of the arc (Read).
- **Arms:** the near arm is **raised, the forearm across the top of the head** with the glove's fins pointing up, and **the fist forward**, ahead of the face at head height (~290, 207). The far arm **reaches down and forward**, hand open and pointing down-right (~325, 365).
- **Legs: tucked.** The front knee is thrust forward (~275, 330) and that foot trails back and down (~205, 390). The rear thigh hangs down (~175–190, 300–345).
- **Cape:** one huge wedge from the shoulders. Its **upper edge rises up-left at about 41°** (from ~210, 200 to the board's top-left corner), and its **lower edge is level at knee height** (y ~335), about 35px below the hips. Both lobes break into stepped, ragged points along the lower edges. It fills the whole upper-left of the cover and leaves the frame.
- **The bolt:** its core was found per row down to y 208 (x 324 → 269) and again from y 408 (x 213 → 114 at y 848). The silhouette spans y 170–398, so the bolt runs **behind him**, from just behind the raised fist down to the gap between his legs, where it shows white again. It runs **top-right to bottom-left**: 76° from horizontal over the whole cover (14° from vertical), about 15° from vertical across the figure. Branches fork off it to the right above him and to the left and right below.
- **The silhouette as a whole:** a black wedge (the cape) taking the upper left, with the compact figure at its right tip, fist first. The white bolt runs behind it along his length.

### 5.2 The film's matching shot

F1 grab 14 ([frame](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/14.jpg); the official still is F1 gallery 01) reproduces the pose almost exactly (Read; Measured on a gridded crop). He faces right, the forearm with its three fins is raised over the head with the fist forward (~920, 190), and the far hand reaches down and forward (~1100, 640). The front knee is forward (~940, 540) and its foot trails (~690, 740). The torso leans **29° forward**. The cape is a wide wedge trailing left, its upper edge rising about 34° and its lower edge falling about 16° to the left from above the hips. **The difference: the bolt is to his right, in front of him (x 1250–1450), not behind him.** The flash also lights the sky only in that frame. The frames before and after are slate blue (`#182634`, `#1a2935`) (§6).

### 5.3 Proposal for the Signature pose

Bat-Clawd **faces right**, as shipped (his gaze is positive x).

- **Rotation:** **`rotate(12deg)`**, positive, which CSS turns clockwise: the top leans forward, toward his facing direction. The cover's torso leans 24° and the film's 29°, but his body is all torso and head, so half that reads as forward without tipping him over. The shipped `LAUNCH = 'translateY(-4px) rotate(-15deg)'` turns him counter-clockwise, which leans him *back*, as if rising or falling backward. Proposed: `'translateY(-4px) rotate(12deg)'`.
- **Cape: one wedge, up and back, out of the frame.** As seen, its upper edge should rise up-left at about 40° and its lower edge run level at knee height (y ~9.5), with ragged points. Clockwise rotation lifts its left end, so if the path sits inside the rotated pose, draw it pre-rotated: upper edge at about 28°, lower edge falling about 12° to the left. A path in his own (unrotated) grid that does this, running off the viewBox's left edge as the cover's runs off the board:
  `M4 4.5 L-6 -1 L-6 11 L-4.6 10.2 L-3.4 11.2 L-1.8 10.1 L-0.6 10.9 L1 9.7 L3.5 9 Z`
  The shipped `TAILS.streaming` reaches only to x −4, and with the counter-clockwise tilt its far end drops, so it reads as a cape drooping behind a figure falling back.
- **Arms:** the **near arm raised**, forearm across above the brow from (10, 1.5) to (14, 1), glove fist ahead at (14–15.5, 0.5–2.5). Two 1-unit fins stand on the forearm at x 11 and 12.5, y 0–1. The forearm must stay **above the eye row** (eyes at y 3), so the Costume Rule holds where the cover hides his face. The **far arm reaches down and forward**: suit from the shoulder (13, 6) to (15, 8), glove from (15, 8) to (16.5, 10).
- **Legs, tucked:** the rear leg hangs: suit `[4, 8.5, 1, 1.5]`, boot `[3.6, 10, 1, 1.5]`. The front leg has its knee forward: thigh `[9, 8.5, 4, 1]` (knee at x 13), shin `[11, 9.5, 1.5, 1]`, and the boot trailing back `[9, 10.5, 2.5, 1]`. That leaves a gap between x 4.6 and 9 for the bolt to show through.
- **Bolt: behind him, top-right to bottom-left, 14° from vertical.** As seen (after rotation), from (12, −6) behind the fist and head at about (10, 2), through the gap between the legs at about (8, 10.5), to (7, 14). A jagged path a unit wide, in Bone, never a flash:
  `M11.6 -6 L12.6 -6 L11.4 -1.6 L12.6 -1.2 L9.6 5 L10.6 5.4 L7.6 14 L6.6 14 L9.2 6.2 L8.2 5.8 L11.2 -0.4 L10 -0.8 Z`
  Shipped, the bolt sits in the pose's `behind` layers and the step's `transform` turns it with him, so a 12° turn makes it 26° from vertical. Either counter-rotate the path by −12° about the transform's origin, or draw it in a layer the step doesn't rotate (to be checked in `BatClawd.tsx`).
- **Steps:** keep the shipped four (on the ledge, launch, bolt at 0.6, held at 0.4), and on the ledge face right with the cape bunched.

## 6. Overall colour

### 6.1 Samples

Measured: region medians, plus the median of pixels near the 10th and 90th lightness percentiles, by our script (Pillow + NumPy). The silhouette and bolt are excluded from the sky regions by lightness. LCh in brackets.

| Source | Region | Median | Range (p10 → p90) |
|---|---|---|---|
| C1-art (paint) | whole sky | `#306094` (L40 C33 h272) | `#2f4966` → `#4191c4` |
| C1-art | right of the bolt, mid | `#2e4b6a` (L31 C21 h268) | `#263d5a` → `#35557a` |
| C1-art | bolt edge / core | `#99c4dc` (L77 C19 **h243**) / `#f4f5ea` | |
| C1-print (1986, in slab) | right sky, top | `#273241` (L20 C11 h269) | |
| C1-print | right sky, mid | `#243647` (L22 C13 h262) | `#282f3b` → `#164865` |
| C1-print | lower right | `#32343b` (L22 C5 h281) | |
| C1-print | left, near the bolt | `#104a6d` (L30 C26 h260) | |
| C1-print | bolt edge | `#88acc0` (L68 C16 **h242**) | |
| C1-wiki | right sky | `#35455c` (L29 C16 h271) | |
| C1-wiki | bolt edge | `#a4c5db` (L78 C16 **h247**) | |
| TCJ, Book One storm pages | storm sky | `#7aadbf` (L68 C19 h230) | `#6296ac` → `#a0c7d5` |
| TCJ, storm pages | pale panels / ink | `#c3d3d2` (h194) / `#010c10` | |
| TCJ, KLIK page (TV) | midtones / lights | `#749ea3` (h209) / `#d9e4e2` (h184) | |
| TCJ, TV grids | midtones | `#75969a` (L60 C12 h209) | |
| TCJ, horse splash (Book Four, night) | sky / dark city | `#4f7ea1` (h256) / `#253b52` (h266) | |
| Film, storm frames (F1 grabs 13, 15) | frame, L ≤ 60 | `#182634` (L15 C11 h264), `#1a2935` (h256) | darks `#0a1921` |
| Film, rooftops (F1 grab 43) | | `#232840` (L17 C17 h288) | |
| Film, Part 2 nights (F2 grabs 40, 51) | | `#252733` (h287 C8), `#2c2b32` (h297 C5) | |
| Film, the leap's flash (F1 grab 14) | | `#5f87a6` (L55 C22 h255) | |
| Film, dump (F1 grabs 20, 26) | sky | `#460a00`, `#5d1501` (h36–42, C34–43) | |

Read and Inferred:
- **The comic** has two blues. The cover's deep night is mid-blue on the painted board and a much darker slate on the 1986 print (L20–22, chroma 5–13). The interiors are pale icy blue-cyan at night and on the TV pages (hue 195–230°, light).
- **The film** is desaturated: slate blue-grey to grey-violet at night (hue 256–297°, chroma 5–17). Its warm scenes (the dump) are a saturated **rust red-orange, not ochre**. The "blue-grey and ochre" description holds only loosely: the night is blue-grey, and the warm scenes are red-orange.
- **The bolt's edge is hue 242–247° in all three cover copies**, not the dossier's 217–237° (those were Wikipedia pixels nearer the core). The alarm `#3fdcff` (h225) is therefore a deliberate shift toward cyan, and it helps: an alarm at the measured h243 (`#5ad3ff`) would sit 23.9 from WATCHFUL PROTECTOR's Blue Flame, against 28.7 for `#3fdcff`. **Keep `#3fdcff`.**

### 6.2 What is wrong with the shipped grounds

The shipped `--surface` `#101830` is L8.8 C18.0 h287, and `--raised` `#1a2646` is L15.7 C22.6 h286. Every sampled sky, across paint, print and scan, is **h260–272**. Darkening the cover's sky drifted the hue about 15–20° toward violet and kept the chroma high, so the shipped grounds read indigo where the book reads slate or night blue. The line (`#35455c`, h271) is on-hue, which is why only the grounds look off. (Inferred: this is the likeliest reading of "the overall colour". The maintainer's exact words weren't available to us.)

### 6.3 The options, with distances

ΔE00 computed with `de.py`. WATCHFUL PROTECTOR's grounds are `#04070b` / `#0f161e` / `#18232e`, line `#2b3743`; the Wave rule's floor is ~6 (surface) and ~10 (raised).

| Option | abyss / surface / raised / line | Hue | vs WATCHFUL PROTECTOR | vs *Absolute* (surface / raised) | Fidelity |
|---|---|---|---|---|---|
| **Shipped** | `#080b14` / `#101830` / `#1a2646` / `#35455c` | 286–287° | 3.1 / **9.2 / 10.1** / 6.7 | 4.8 / 6.5 (jury record) | Off-hue, too violet (§6.2) |
| A. The cover's slate, on-hue | `#070b12` / `#101924` / `#192736` / `#35455c` | 268° | 1.9 / **1.9 / 2.3** / 6.7 | 10.8 / 12.9 | Faithful to the print; **merges with WATCHFUL PROTECTOR** |
| D. The cover's blue, on-hue, at the shipped chroma | `#030c15` / `#001b31` / `#002a47` / `#35455c` | 265° | 3.4 / **7.2 / 7.8** / 6.7 | 11.6 / 13.8 | Faithful to the painted sky; fails the raised floor |
| **B3. The interiors' icy blue** | `#000f12` / `#001f27` / `#002f39` / `#224f59` | 221–227° | 4.5 / **8.6 / 9.9** / 12.2 | 19.5 / 22.3 | The storm and TV pages and the bolt's edge family; a petrol blue at full saturation (red channel at 0) |

The deciding constraint is WATCHFUL PROTECTOR's floor against the cover's hue. Every ground at the cover's own hue (A, D) fails it. Only a move in hue clears it: toward violet (the shipped) or toward cyan (B3). **Recommendation: B3, decided on screen.** It has a source (the book's interiors and the bolt's measured edge), it leaves the violet that isn't in the book, it clears *Absolute*'s violet by 19+, and it puts the Lightning Cyan alarm on its own family's ground. **Risks to check on screen:** at full saturation it can read petrol or teal; the jury reserves a saturated green (chroma ≥ 15 at green hues) for the Arkham games, and h225 is cyan-blue, not green, but check it. Its raised tone is 9.9 from WATCHFUL PROTECTOR's, a hair under ~10. If B3 fails on screen, a lighter route is a ground lifted toward the storm-page blue (`#6296ac` family) for surfaces only, never the page.

### 6.4 Bone, the waiting ink, the alarm

- **Bone.** The interiors' whites are pale cyan (`#d9e4e2`, `#c3d3d2`, and the horse splash's highlights `#b2d3e4`), and the bolt core prints `#e5e1dc` to `#f6feff`. With B3, tint Bone to the ground: `#e4f0f3` (L94 C4 h220). It is 4.1 from the shipped Bone and **3.1 from WATCHFUL PROTECTOR's** `#e6ebee`. Near-whites converge, as the jury records, and Bone is the working ink in both Themes. Contrast on B3: 16.8 (abyss), 12.3 (raised). `--ink` `#b9c9cd` and `--ash` `#8a9ca0` follow (Ash 5.0:1 on the B3 raised tone).
- **Waiting ink.** The shipped `#7ea7d8` sits **3.9** from PALE MOONLIGHT's working steel `#8fb0d3` (recorded), and also **5.8 from WATCHFUL PROTECTOR's `--ink-hot` `#5aa9ff`**, a collision not in the dossier or the jury record. **Proposed: the Book One storm sky, `#7aadbf`** (L68 C19 h230, Measured on the TCJ storm pages). Its distances are 9.5 from PALE MOONLIGHT's steel, 11.7 from WATCHFUL PROTECTOR's mercury, 14.2 from its ink-hot, 18.0 from its Blue Flame, 13.8 from the alarm, 9.3 from Ash and 20.9 from Bone. Contrast on B3 is 7.9 (abyss), 5.8 (raised) and 5.4 on a lifted hover ground (L19). Run it through `themeContrast.test.ts`'s eleven grounds.
- **Alarm.** Keep Lightning Cyan `#3fdcff` / `#12a9d6` (§6.1): 8.8:1 on the B3 raised tone, and the on-signal ink on the fill is 7.1:1.
- **The suit on B3:** `#666864` is 3.46:1 on the page and 2.54:1 on raised. The black chest bat on it is 3.58:1.

## 7. What this changes (suggestions, not made)

- `dark-knight-returns.md` "Built in #120": the chest bat line ("the shape the chest takes on the Book Two cover") rests on a first-suit cover (§2). Replace it with the film's traced chest bat (§3.3) at 6.9 × 3, or record why the round bat stays.
- `year-one-bat.md` §4: its open question about the chest version is answered. The Book Two cover is the first suit, and the second suit's chest bat is wide (2.3:1, film; about 1.9:1 visible, comic).
- `emblems.ts`: a new chest emblem (path in §3.3), with the KNIGHTMARE comparison decided on screen. BAT_1986 can stay for the disc and the masthead.
- `suits.ts`: wider, risen shoulders (§4.4) with `BODY_BOX`, the cape's start and the armour's pauldrons adjusted. The leap gets `rotate(12deg)`, the new cape wedge, both arms, tucked legs and a bolt that isn't turned with him (§5.3).
- `the-dark-knight-returns-1986.css`: grounds B3, Bone and its family tinted to h220, waiting ink `#7aadbf`. Then `jury-wave-2.md` §9's follow-up gets a line: the night blue moves to the interiors' icy blue, and the 5.8 collision with WATCHFUL PROTECTOR's ink-hot is closed.

## 8. Unverified

- **The maintainer's four points** are as the brief states them. Their exact wording was not seen, so §6.2's "violet drift" is our reading of "overall colour".
- **The film's chest bat is one frame.** It is traced on the right half of F2 grab 03 and mirrored. The left half is behind a glove and reins, the camera is slightly low (which shortens the top edge relative to the underside a little), and the lower half lies in a shadow separated by colour. No model sheet was found. The comic's chest bat (P10) is three-quarter, partly under the cape's collar, and 85px wide in a 500px image, so the comic's exact proportions are not measured.
- **Which suit the comic's night panel shows** (black cowl with the oval, TCJ): the book and page are not identified, and nor is the edition.
- **The Fwoosh's account of the switch** (after the first Mutant fight) is a toy review, not a primary source. It agrees with the film and with the ink of P10.
- **All printed colours** come from photos and screenshots: the CGC copy through its slab's plastic, its printing not shown on the label as photographed; TCJ's edition not stated; the World's Finest grabs of unknown compression. The film's colours are scene-lit and graded, so the suit greys in §4.2 vary by scene.
- **Landmark coordinates** for the pose and the bulk were read off gridded crops by eye (about ±10px at 1920 wide, ±3px on the 614px board), not fitted.
- **Whether the step's `transform` rotates the `behind` layers** (the bolt) was inferred from `suits.ts`, not checked in `BatClawd.tsx`.
- **B3's look on screen**, the trapezius at 54px, and the new chest bat beside KNIGHTMARE's: all decide-on-screen.
- **Phil Bourassa:** not in the World's Finest credit lists for either part. Other credit sources were not checked.

## 9. Sources

- *Intelligent Collector* (Heritage): [Batman's lightning bolt moment](https://intelligentcollector.com/batmans-lightning-bolt-moment/), with [the cover original](https://intelligentcollector.com/wp-content/uploads/2022/05/Frank-Miller-and-Lynn-Varley-Batman-The-Dark-Knight-Returns-No.1-Cover-Original-Art-DC-1986.jpg) and [a CGC 9.6 copy](https://intelligentcollector.com/wp-content/uploads/2022/05/Batman-The-Dark-Knight-Returns-No.-1-DC-1986-CGC-NM-9.6-White-pages.jpg).
- Wikipedia: [Book One cover](https://en.wikipedia.org/wiki/File:Batman_The_Dark_Knight_Returns_1_(February_1986).jpg).
- mycomicshop: [Book Two cover](https://media.mycomicshop.com/n_ii/originalimage/8299406.jpg), [Book Three cover](https://media.mycomicshop.com/n_ii/originalimage/8433898.jpg).
- The Fwoosh: [Mezco SDCC 2015 Dark Knight Returns box set](https://thefwoosh.com/2015/09/mezco-sdcc-2015-dark-knight-returns-box-set/), with [the Book Two first printing](https://i0.wp.com/thefwoosh.com/wp-content/uploads/2015/09/1868102-batman_the_dark_knight_returns__1986_1st_printing__2_.jpeg?ssl=1).
- Book Three p. 10 original art: [Cool and Collected](https://www.coolandcollected.com/frank-miller%e2%80%99s-1986-dark-knight-batman-robin-splash-page-at-heritage-auctions/) ([image](https://www.coolandcollected.com/wp-content/uploads/2011/03/frankmiller_darkknight.png)); [Paul Fraser Collectibles](https://www.paulfrasercollectibles.com/blogs/art-photography/the-dark-knight-rises-again-batman-drawing-achieves-world-record-price).
- H. W. Thurston, [*The Comics Journal*, 1 May 2019](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/), and its reproductions: [storm pages](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.11.22-AM.png), [more storm pages](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.15.04-AM.png), [KLIK page](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/26.png), [TV grids](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.11.13-AM.png), [horse splash](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-10.18.27-AM.png), [three Batman panels](https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-15-at-9.57.56-AM.png).
- The World's Finest (dcanimated.com): Part 1 [gallery](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/gallery/), [screengrabs](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/), [cast and crew](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/backstage/castcrew.php); Part 2 [gallery](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/gallery/), [screengrabs](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/grabs/), [cast and crew](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/backstage/castcrew.php). Frames cited: Part 1 grabs [13](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/13.jpg), [14](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/14.jpg), [15](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/15.jpg), [22](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/grabs/22.jpg); gallery [01](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/gallery/01.jpg), [35](https://dcanimated.com/WF/dcuam/darkknight/tdkrp1/media/gallery/35.jpg); Part 2 grabs [03](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/grabs/03.jpg), [40](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/grabs/40.jpg); gallery [01](https://dcanimated.com/WF/dcuam/darkknight/tdkrp2/media/gallery/01.jpg).
- TheaterByte: [Part 1 Blu-ray review](https://www.theaterbyte.com/batman-the-dark-knight-returns-part-1-blu-ray-review/), [capture 08](https://v8i2j3k6.delivery.rocketcdn.me/wordpress/wp-content/uploads/2012/09/Batman-Dark-Knight-Returns-Part-1-BD_08.jpg).
- Fan wiki (gap filler only): [DC Movies Wiki, Batsuit (The Dark Knight Returns)](https://dcmovies.fandom.com/wiki/Batsuit_(The_Dark_Knight_Returns)).
- In this repo: `docs/research/themes/dark-knight-returns.md`, `year-one-bat.md`, `jury-wave-2.md`; `DESIGN.md` (Bat-Clawd Costume Rule); `app/src/shared/suits.ts`, `emblems.ts`; `app/src/renderer/src/styles/themes/*.css`.

No images are included in this note. The downloaded covers, pages and frames, the trace overlay and the emblem comparison board reproduce copyrighted art, so they stay in a scratch folder outside the repo.
