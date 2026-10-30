# Research note: VERY DARK GREY, before the build (the chest emblem, plastic and pieces, the flying pose, the suit's parts, the law, the names)

Research note, 2026-10-30. Scope: what the Theme dossier [`lego-batman.md`](lego-batman.md) read by eye or left unverified (§3.2, §8, §9, §11, §14), checked again before the build of VERY DARK GREY (GitHub #149, Linear LUC-96), after *The LEGO® Batman Movie* (2017), with the Lego Batman games as a second source. Covered: a clean, frontal source for the chest symbol and a trace of it; references and measurements for plastic shine, relief and pieces that fit together (the maintainer's decision 9); candidates for a third flying pose; Bat-Clawd's parts at close range; the court texts the dossier could not open; and whether the Theme's words are registered marks. Read with the dossier, its reference index [`references/lego-batman.md`](references/lego-batman.md) and [`jury-wave-3.md`](jury-wave-3.md) §9, whose decisions stand (torso black, S-B; magenta alarm; a bright oval that never lights; wordmark in Bone; "more than P1"; the flying pose is neither the grapnel nor the run).

Provenance key, as in [`dkr-rework.md`](dkr-rework.md): **Read** = seen by us on a reference image, named by its number (`[62]`). **Measured** = taken off that image by a script (masks, moments, contour tracing, autocorrelation, colour percentiles). **Inferred** = our reading of what those facts imply. Images [01]–[60] are the dossier's; [61] on are new (§2). All stay in scratch folders and are never committed or shipped. The emblem is traced from the LEGO Group's own product photograph of the minifigure [62]; the bat it shows is DC's mark, credited as every Theme's emblem is (ADR 0001).

## 1. TL;DR

- **A clean, frontal source exists: the LEGO Group's own product photograph of the film's Batman minifigure** [62] (set 853650, 2017), the torso square to the camera, the oval 242 px wide and sharp, with no motion blur or bloom. It was traced pixel by pixel, its halves averaged (§3). Two controls agree: the key chain photo [63] and a 60-frame median stack of the film's 1080p chest shot [61].
- **The print is the 1989 logo's construction, flattened** (Measured): a yellow ring whose inside is all bat, the wings running to the ring. **Oval 1.96:1** (1.92 on [63], 1.98 on the film [61]); **bat 2.39:1**, **90% of the oval's width, 74% of its height**. The dossier's "about 2.2:1, 75% of the width, three scallops a wing" was read by eye and is wrong on all three. The film's frames read the bat flatter (2.62:1) only because the render softens it: the product trace blurred to the film's size measures 2.68.
- **No black rim.** Outside the yellow, the film's torso is no darker than the rest of the torso (Measured, §3.3): on a black torso the "rim" is the torso itself. Plate: `rim: 0`, or a thin rim only where the oval sits on a lighter ground (the masthead, the disc).
- **Traced polygon** on the `emblems.ts` 120×48 grid, plate `{ box: { x: 13.02, y: 0, width: 93.95, height: 48 }, rim: 0, lights: false }`, 90 points (§3.5). At 16 px and under it reads close to DARK DECO's `BAT_1992` (same family of logo): the two part on the oval's ratio (1.96 against 1.76) and the bat's (2.39 against 2.0).
- **Plastic, measured on the film's own title plate** [16] (§4): stud top about **0.6 of the pitch** (the real brick's 4.8/8); plate `#303030`, stud tops about 1.1×, **rim highlights `#555555` (1.8× the plate)**, **a near-black shadow under each stud** (0.15–0.2×) that is what makes the relief. On the front-lit yellow wall [79] the shading is gentler: a dark crescent at 0.73×, a lit rim at 1.08×. The title letters are bevelled: face `#ebb30d`, lit top bevel to `#f8ec24`, dark lower bevel to `#5d4e00`. The lit pieces are translucent with a hot core and a dark rim (the big red button [33]: `#f13c3d`, core `#f3b6a5`, rim `#701513`).
- **"Pieces that fit together" without drawing a brick** (Read, §4.3): the film and LEGO's photos show joins as **seams** (two baseplates meeting [79], plates edge to edge [83], tiles in a staggered bond [79]) and **steps** (a plate laid on a plate, its dark side face showing [84]). Both are flat-UI moves.
- **Flying pose (§5): the glide [65]**, the cape spread flat as two bat wings with pointed hems, the body level, is the film's clearest flying silhouette and is neither the grapnel nor the run. Others: the flip [30] [66], the leap facing us [69], the leap off a ledge [70], the dive [68], the end-card somersault [71], riding the Batmobile [72].
- **Suit (§6):** the cowl's ears are tall (about a third of the cowl's width); the cape hangs in a stiff bell whose hem is cut in points, about three a side hanging [76] [77], four a side spread [65]; the belt is **pouch, pouch, buckle, pouch, pouch**, the buckle marked with a dark X [75]. No fists-on-hips frame was found in these uploads. Dinner for one [46], now at 1080p: his head and lit jaw over a dark table as wide as the frame.
- **Law (§7), read in the original:** the Court of Justice **dismissed Best-Lock's appeal** (C-452/15 P, order of 14 April 2016, "in part manifestly inadmissible and in part manifestly unfounded"): the minifigure mark stands. The General Court **upheld Lego's registered design for the 2x4 brick** (T-515/19, 2021; T-537/22, 2024) under the modular-systems exception. Studs as a flat texture, tiles, lit and dark edges, seams and steps remain free to draw (Inferred, not legal advice); a recognisable brick as an object is the one thing to keep out.
- **Names (§8, searched 2026-10-30):** **VERY DARK GREY: no mark found.** EPIC FAIL and FAN MAIL: no live mark. **NEED A HERO** is no one's mark as a phrase but sits inside two live game-software marks (I NEED A HERO, High 5 Games, US Reg. 5375537, class 9; NEED A HERO ARCADE RUSH, Lithuania, classes 9 and 41). **AUTOGRAPH and HELLO** are live class-9 marks of many others (none DC's, Warner's or LEGO's). Proposed (§8.1, width-checked and searched): NEED A HERO → **CAPE UP**, AUTOGRAPH? → **YAY OR NAY?**, and HELLO? (the maintainer's call) → **ANY DAY NOW** or DRUMROLL.

## 2. References

New images and records, in the scratch folders `refs-vdg-build/` (downloads), `work-vdg-build/` (stacks, frames, crops); scripts in `tools-vdg-build/`; boards in `boards-vdg-build/`. They are added to [`references/lego-batman.md`](references/lego-batman.md) as [61]–[88].

| # | What | Source type |
|---|---|---|
| 61 | The film's chest, 84–114 s of the HBO Max clip, 60 of 293 whole frames median-stacked | The upload of [31]–[40], 1080p |
| 62 | The Batman minifigure, front-on (set 853650) | The LEGO Group's product photograph |
| 63 | The Batman Key Chain 853632 | The LEGO Group's product photograph |
| 64 | The Batman minifigure alarm clock 5005222 (a licensed product, another print) | Product photograph |
| 65–72 | Flying-pose candidates: the glide, the flip, the dive, the leaps, the end-card somersault, riding the Batmobile | Trailer #4, the Wayne Manor and Batcave teasers, 1080p |
| 73–78 | Suit parts: cowl front and three-quarter, the belt, the hanging cape, a seated figure | The same uploads and the HBO Max clip |
| 79–84 | Studs, tiles, seams, translucent pieces, bricks from below, plates on plates | Film frames; the LEGO Group's product photographs |
| 85–88 | C-452/15 P, T-515/19, T-537/22 and the Court's press release on T-537/22 | EU Publications Office (Cellar); curia.europa.eu |

The Batcave teaser now offers 1080p (formats 137, 248, 399), where the dossier found 640x360 only; its dinner frames [46] [60] are used here at full size. Frame seconds are in the index.

**Boards (scratch, `boards-vdg-build/`):**
- `emblem-trace.png`: [62] levelled with the trace over it; the film stack [61] with the product trace laid over it; the key chain [63]; a table of measurements; all four traces on one oval; the trace at 44, 24, 16 and 10 px beside `BAT_1992` and `BAT_1966`, on the black torso and on G1 grey.
- `pieces-refs.png`: the title plate and its studs, the mean stud, the bevelled letters, the yellow baseplate wall and its mean stud, the tiled floor, the lit floor, the red button, the console buttons, stacked translucent pieces, bricks from below, the legs from below, two LEGO product photos of plates.
- `flying-poses.png`: twelve 1:1 crops of seven candidates.
- `suit-crops.png`: cowl, belt (product and film), cape hanging and from the side, the stand, two seated frames, dinner for one, the lobster, and two figures shrunk to 54 px.

**Scripts (scratch, `tools-vdg-build/`):** `emblem_frames.py`, `emblem_stack.py`, `emblem_trace.py` (copied from SAME BAT-TIME's, unchanged but for the import path), `emblem_board_vdg.py`, `overlay.py`, `rimprofile.py` (the luminance outside the oval), `stud_fold.py` (stud pitch by autocorrelation; every cell folded onto one), `crops_board.py`, `sheet.py`, `tiles.py`, `html2txt.py`, `stampfit.py` (stamp widths in Changa One, as `stampWidth.test.ts` measures them); `tm/` (USPTO and TMview queries).

## 3. The chest emblem

### 3.1 Sources searched

| Source | What it gives | Status |
|---|---|---|
| **[62] LEGO product photo, set 853650 (2017)**, 1312x1640 | The minifigure square to the camera; the oval 242 × 123 px, crisp, the print's pad texture visible | **Recommended.** The LEGO Group's photograph of the licensed product the film's character is |
| [63] LEGO product photo, Key Chain 853632 (2017), 753x1761 | The same print, the oval 122 px wide | A control; agrees with [62] within 2% |
| [61] The film, HBO Max clip 84–114 s, 1080p | The oval 204 px wide, front-on, in 293 whole frames of one shot; stacked from 60 | A control; soft (the render's depth of field and glow) |
| [33] the dossier's frame (the same shot) | One frame of [61] | Superseded by the stack |
| [64] The licensed alarm clock 5005222 (ClicTime), 3330x4322 | An oval 659 px wide, sharp | **Not the minifigure's print**: oval 1.71:1, bat 2.18:1, the bat smaller in it. Set aside |
| LEGO.com product pages | The same product images | HTTP 403 to this machine |
| The film's logo [19] [22] | Warner's bat built of studs | Not a chest source and not imitated (dossier §3.2) |

### 3.2 Method

`emblem_frames.py` finds the yellow oval in each image (yellow pixels, opened, filled by rows and columns, an ellipse from its moments) and scores it whole when the mask matches its own ellipse (IoU > 0.97) with under 3% of the inside neither yellow nor bat. On the film it cut the chest from 720 frames (84–114 s): 293 whole, oval 193–205 px wide; `emblem_stack.py` levelled, scaled and centred the 60 sharpest at 4x and kept the median. The product photos were levelled the same way, one image each (tilt 0.02° on [62]). `emblem_trace.py` thresholds the bat halfway between the yellow and the black, finds the mirror axis (on [62] 0.1 source px from the oval's centre: front-on), **averages the two halves**, follows the outline pixel by pixel (Moore neighbour tracing) and simplifies it (Ramer–Douglas–Peucker, 0.25 units) into the left half, mirrored at x = 60. As a control, the [62] trace was shrunk to the film's size and blurred (Gaussian radius 1, 2, 4 px) and measured again.

### 3.3 Measurements

Grid as `emblems.ts`: the yellow oval 48 units tall, centred at x = 60, y down from its top.

| | [62] product (traced) | [63] key chain | [61] film stack | [62] blurred r = 2 / r = 4 (control) | [64] clock | Dossier |
|---|---|---|---|---|---|---|
| Oval px (source) | 242 | 122 | 204 | | 659 | |
| Oval w:h | **1.96** | 1.92 | 1.98 | 1.95 / 1.95 | 1.71 | (not given) |
| Bat w:h | **2.39** | 2.40 | 2.62 | 2.49 / 2.68 | 2.18 | ~2.2 |
| Bat / oval width | **0.90** | 0.90 | 0.87 | 0.90 / 0.88 | 0.85 | ~0.75 |
| Bat / oval height | **0.74** | 0.72 | 0.66 | 0.70 / 0.64 | 0.67 | |
| Mirror IoU (raw) | 0.98 | | 0.98 | | 0.98 | |

(Measured.) The two product photos agree; the film reads the bat flatter, and blurring the product trace to the film's resolution reproduces that (2.68 / 0.64 at radius 4), so the difference is the render's softness, not a different print (Inferred). The clock is another print.

**No rim.** `rimprofile.py` reads the luminance along the ellipse's normals outward from the yellow edge on the film stack: at the oval's sides it falls from the yellow (about 150) to 56–60 at once and then drifts to 49 at the torso; above and below it stays at 50–55 until the printed abs line. There is no darker band (Measured). On the product photo the torso is black (about 14) right to the yellow. The dossier's "black rim" is the black torso around a yellow ring (Inferred).

**The parts, on the traced polygon (Measured, 120×48 grid):**

| Feature | Value |
|---|---|
| Bat box | x 17.8–102.2, y 5.7–41.0: **84.4 × 35.3** |
| The yellow ring at the sides | 4.8 units (5.1% of the oval's width) |
| Ear tips | (56.5, 6.3) and (63.5, 6.3): **7.0 apart**, small points |
| Head top between the ears | flat at y 8.0: the ears stand **1.7** above it |
| Head sides | straight down to (54.7, 12.7), then curving out under the upper window |
| Upper windows (the yellow either side of the head) | x 40.1–54.9, their round bottoms at y 18.6 |
| Wingtips (top) | (39.9, 5.7): **the bat's highest points**, 0.6 above the ears, close to the ring |
| Outer edge | follows the ring, widest at x 17.8, y 24 |
| Outer claws (lower corners) | (31.9, 39.1): pointing down and out, 1.9 above the tail |
| Outer lobe | top at x 33.7–36.5, y 30.7 |
| Point between the lobes | (44.2, 34.6) |
| Inner lobe | top at x 49.2–51.1, y 31.2 |
| Tail | (60, 41.0): pointed, the lowest point, 6.4 below the inner lobes' tops |
| Bat centre against the oval's | 0.6 high; centred across |

### 3.4 What the dossier's §9 got right and wrong

- "A wide classic bat with short ears, wing tops curving up": **right**; the ears are short points 7 units apart over a flat head, and the wingtips rise above them.
- "About 2.2:1": **flatter, 2.39:1** on both product photos.
- "Filling about 75% of [the oval's] width": **90%**; the wings run to the yellow ring, as in the 1989 logo.
- "Three scallops under each wing": **two lobes a side and an outer claw**, then the tail.
- "Close to `BAT_1989` in kind": **right**; it is the 1989 logo's construction (and `BAT_1992`'s), on a flatter oval: 1.96 against `OVAL_1989`'s 1.75 and `OVAL_1992`'s 1.76.
- "The oval rimmed in `--chest` half a unit wide": **no rim in the print** (§3.3).

### 3.5 The trace

The left half followed pixel by pixel on [62], halves averaged, mirrored at x = 60; 90 points. On the 120×48 grid, as `BAT_1966` is written:

```ts
export const BAT_2017 =
  'M60 8 L58.1 8 L56.7 6.9 L56.5 6.3 L55.4 7.1 L54.9 8.4 L54.7 12.7 L54 15 L51.5 17.9 L48.8 18.6 ' +
  'L45.6 18 L42.5 16.7 L40.5 14.3 L40.1 13 L40.1 10.9 L40.6 8.3 L41.4 7.1 L40.9 5.9 L39.9 5.7 ' +
  'L34.8 7.4 L33.2 8.5 L28.3 10.5 L21.6 15.6 L18.5 19.8 L17.8 24 L18.2 26.4 L19.3 29 L22.5 32.9 ' +
  'L27.2 36.5 L31.9 39.1 L33 38.8 L31.8 35.5 L32 32.7 L32.5 31.6 L33.7 30.7 L36.5 30.7 L39.4 31.8 ' +
  'L42.9 34.1 L44.2 34.6 L45.3 34.2 L47.5 31.9 L49.2 31.2 L51.1 31.2 L53.8 32.2 L56.1 34.6 L60 41 ' +
  'L63.9 34.6 L66.2 32.2 L68.9 31.2 L70.8 31.2 L72.5 31.9 L74.7 34.2 L75.8 34.6 L77.1 34.1 ' +
  'L80.6 31.8 L83.5 30.7 L86.3 30.7 L87.5 31.6 L88 32.7 L88.2 35.5 L87 38.8 L88.1 39.1 L92.8 36.5 ' +
  'L97.5 32.9 L100.7 29 L101.8 26.4 L102.2 24 L101.5 19.8 L98.4 15.6 L91.7 10.5 L86.8 8.5 L85.2 7.4 ' +
  'L80.1 5.7 L79.1 5.9 L78.6 7.1 L79.4 8.3 L79.9 10.9 L79.9 13 L79.5 14.3 L77.5 16.7 L74.4 18 ' +
  'L71.2 18.6 L68.5 17.9 L66 15 L65.3 12.7 L65.1 8.4 L64.6 7.1 L63.5 6.3 L63.3 6.9 L61.9 8 Z'

/** The minifigure's oval as LEGO's photograph measures it: 1.96:1, no rim, a yellow that never lights. */
export const OVAL_2017 = { box: { x: 13.02, y: 0, width: 93.95, height: 48 }, rim: 0, lights: false }
```

If the masthead or the disc wants a rim on G1's grey: `BatEmblem.tsx` draws the rim inside the box (a stroke centred on an ellipse inset by half its width), so a rim *r* needs the box grown by *r* each side and the bat left where it is (P).

The same outline in a 16-unit box, the oval exactly 16 × 8.17 at (0, 0):

```
M8 1.36 L7.68 1.36 L7.44 1.18 L7.4 1.07 L7.22 1.21 L7.13 1.43 L7.1 2.16 L6.98 2.55 L6.55 3.05 L6.09 3.17 L5.55 3.07 L5.02 2.84 L4.68 2.44 L4.61 2.21 L4.61 1.86 L4.7 1.41 L4.83 1.21 L4.75 1 L4.58 0.97 L3.71 1.26 L3.44 1.45 L2.6 1.79 L1.46 2.66 L0.93 3.37 L0.81 4.09 L0.88 4.5 L1.07 4.94 L1.61 5.6 L2.41 6.22 L3.22 6.66 L3.4 6.61 L3.2 6.05 L3.23 5.57 L3.32 5.38 L3.52 5.23 L4 5.23 L4.49 5.42 L5.09 5.81 L5.31 5.89 L5.5 5.82 L5.87 5.43 L6.16 5.31 L6.49 5.31 L6.94 5.48 L7.34 5.89 L8 6.98 L8.67 5.89 L9.06 5.48 L9.52 5.31 L9.84 5.31 L10.13 5.43 L10.5 5.82 L10.69 5.89 L10.91 5.81 L11.51 5.42 L12 5.23 L12.48 5.23 L12.68 5.38 L12.77 5.57 L12.8 6.05 L12.6 6.61 L12.79 6.66 L13.59 6.22 L14.39 5.6 L14.93 4.94 L15.12 4.5 L15.19 4.09 L15.07 3.37 L14.54 2.66 L13.4 1.79 L12.56 1.45 L12.29 1.26 L11.42 0.97 L11.25 1 L11.17 1.21 L11.3 1.41 L11.39 1.86 L11.39 2.21 L11.32 2.44 L10.98 2.84 L10.45 3.07 L9.91 3.17 L9.45 3.05 L9.02 2.55 L8.9 2.16 L8.87 1.43 L8.78 1.21 L8.6 1.07 L8.56 1.18 L8.32 1.36 Z
```

**At size** (board `emblem-trace.png`): at 44 px the windows, ears, lobes and tail all read; at 24 px the windows and the tail read; at 16 px it is a yellow ring with two notches above and a scalloped band below; at 10 px (about the oval on a 54 px Bat-Clawd) a yellow ring round a dark band. At 16 px and under it is hard to tell from DARK DECO's `BAT_1992` on its oval; the flatter oval (1.96 against 1.76) is what tells them apart. The jury's decision 2 already lets the suits tell the ovals apart.

**Round one:** show the trace on screen beside [62] before calling it done (Theme fidelity rule).

## 4. Plastic, relief and pieces that fit (decision 9)

Board `pieces-refs.png`.

### 4.1 Studs, measured

`stud_fold.py` finds the pitch by autocorrelating the luminance along rows and columns, then folds every cell of a crop onto one ("the mean stud") and reads its colours (Measured):

| Plate | Entry | Pitch (px) | Plate (median) | Stud top | Brightest 2% | Shadow under the stud | Notes |
|---|---|---|---|---|---|---|---|
| The title cards' black plate | [16] trailer #4 104.5 s | 40.9 × 30.6 (tilted away) | `#303030` (lum 48) | lum ~54 (1.1×) | `#555555` (lum 86, **1.8×**), on the top's rim and the embossed word | lum 7–10 (**0.15–0.2×**), a crescent below each stud, about 0.3 of the vertical pitch tall | Lit from above; the stud top is about **0.6 of the pitch** across |
| The same plate | [09] trailer #4 57.5 s | 41.3 × 31.2 | `#303030` | | `#464646` (1.4×) | near black | Softer light |
| The yellow baseplate wall, front-on | [79] manor teaser 4.0 s | 32.5 × 33.3 (square) | `#be8c37` | | `#c89742` (**1.08×**) | `#a46418` (**0.73×**), a crescent lower right | Lit from the upper left and front; relief from the crescent alone |
| The same wall | [73] manor 22.5 s | 34.3 × 34.1 | `#c38e31` | | `#d4a554` (1.15×) | `#b37214` (0.81×) | |

**Read from the crops:** the studs are plain cylinders with a flat top; seen from above (the cards) each shows a lighter top disc, a dark side band and a black shadow beneath; seen front-on (the wall) each is a disc with a dark crescent on the side away from the light. Real studs carry the LEGO word on top ([16] at x3 shows it): ours never do (dossier §3.2).

**For G1** (Inferred, P): on `--abyss` `#24252a`, the cards' ratios give a shadow near `#070708`, a stud top near `#282930` and a rim highlight near `#41434b`; the wall's gentler ratios give `#1a1b1f` and `#27282e`. The dossier's P1 (highlight at most 7% white) sits nearer the wall than the cards. The cards' look, the one the maintainer asked for ("strong shine, relief"), is the near-black shadow under every stud.

### 4.2 Edges, bevels and lit pieces, measured

| What | Entry | Measured colours | Read |
|---|---|---|---|
| Bevelled title letters | [43] "HE'S BACK" | face `#ebb30d`; top bevel up to `#f8ec24`; lower bevel down to `#5d4e00` (lum 224 / 179 / 76) | Every letter has a narrow lit bevel on top and a dark one below: a hard extrude, as the dossier's `--wordmark-extrude` proposes |
| | [45] "...AND YELLOW" | face `#daa504`; lit `#f7d618`; dark `#4a390f` | |
| A lit translucent piece | [33] the big red button | body `#f13c3d`; core `#f3b6a5`; rim `#701513` | Lit from inside: the centre near white, the edge dark. The model for the lit disc (dossier §9) |
| Lit floor tiles | [40] clip 253 s | face `#9dc2e8`; bright rim `#a6e3fc`; seams dark | Smooth translucent tiles lit from below, a brighter rim, dark seams between |
| Stacked translucent pieces | [80] clip 248 s | `#c7777c` body to `#fbe3bd` lit edges | Each piece's edge catches the light; the gaps between are dark |
| Smooth tiles | [79] the floor | | Flat, a soft sheen, seams in a staggered bond, no studs |

### 4.3 Pieces that fit together, in a flat UI

Read from the film and LEGO's photos, and what each could become without drawing a toy brick as an object (Inferred, P):

| What the sources show | Entry | A flat-UI equivalent (P) |
|---|---|---|
| Two baseplates meeting: a thin seam is the only sign of the join | [79] | The window's baseplate in sections with a 1px seam; cards that meet edge to edge share a seam, not a gap |
| Plates meeting edge to edge to make a larger floor | [83] | The notice list as tiles butted together, one seam between |
| Tiles in a staggered bond | [79] floor | Rows of small tiles (the watch strip, the report's margin) offset by half a tile |
| A plate laid on a plate: the upper one's dark side face shows, studs around it | [84] | A card raised one plate above the baseplate: a dark side face below it about 0.4 of the stud pitch deep (a plate's height against its pitch), the studs visible around it; the selected or urgent card one plate higher |
| Studs on top, hollows below | [82] [71] | Not drawn: the hollows are the brick's underside, the most "toy" view |
| Lit tiles with dark seams | [40] | A lit tile for the active row: a bright rim and dark seams round it |
| The title cards: letters standing on a studded plate | [09] [16] [43] | The wordmark and headings with a hard extrude over the studded ground |

The strongest 2D cue in the sources is the **step**: a smooth piece sitting one plate above a studded one, with a dark side face and the studs around it (Inferred).

## 5. The flying pose

Not the grapnel (the Arkham games Theme's) and not the run (SAME BAT-TIME's), per decision 14. Board `flying-poses.png`, crops at 1:1 from 1080p frames.

| | Pose | Entry and time | Silhouette (Read) | At 54 px (Inferred) |
|---|---|---|---|---|
| **F1** | **The glide** | [65] Batcave teaser 81.9–82.1 s; [67] trailer #4 107.8 s | Seen from below, the cape spread flat to both sides as two bat wings, the hem cut in about four points a side; the body level between them, legs trailing | **Recommended.** A wide bat shape with a small body in the middle: every limb in view, nothing like a rope or a stride. Cost: a flying bat shape is close to an emblem; the points of the hem and the cowl's ears tell it apart |
| F2 | The flip | [30] manor teaser 98.4 s; [66] 98.55 s | Take-off: knees up, the cape flaring; the top: upside down, the cape a black crescent, the legs up | The crescent reads, the figure inside it does not: at 54 px an upside-down Bat-Clawd is hard to read |
| F3 | The dive | [68] trailer #4 108.45 s | Head first at a slant, the cape streaming behind (Robin on his back in the film: dropped) | A slanted wedge; close to KNIGHTMARE's one-sided wedge |
| F4 | The leap facing us | [69] trailer #4 111.0 s | Square to the camera, arms out low, the cape spread both sides behind him | A standing figure with the cape opened: close to the alarmed poses most Themes use |
| F5 | Off the ledge | [70] Batcave teaser 112.5–113.0 s | A fist forward, one knee up, the cape trailing; then the body flat and reaching | A superhero leap: one arm forward, the cape behind. A clear second choice |
| F6 | The end-card somersault | [71] manor teaser 112.75 s | Curled mid-somersault, the cape wrapping | A ball: reads poorly |
| F7 | Riding the Batmobile | [72] trailer #4 12.2 s | Standing on the car's back, the cape blown back | Needs the car: a vehicle at 54 px is a new outline to draw and to clear |

**Recommended: F1, the glide.** It is the film's own image of Batman flying, it shows the cape as the Lego cape is (stiff cloth cut in points), and it keeps every limb visible. F5 is the alternative if F1 reads as an emblem.

## 6. Bat-Clawd's parts

Board `suit-crops.png`. All Read unless marked.

| Part | Entries | Finding | At 54 px |
|---|---|---|---|
| Cowl, ears | [73] [74] [33] | Tall ears: on [73] they stand about a third of the cowl's width above where they join the dome (about a quarter of the head with ears; Measured on the silhouette against the wall, the head a little tilted), each about a fifth of the cowl's width at the base, outer edges almost straight down into the cowl's sides, tips narrow and slightly rounded | The tall ears read. They are the film's, but tall ears are SERIOUS HOUSE's (jury §9.6): the dossier kept standard ears; the build decides on screen |
| Cowl, shine | [73] [74] | A hard white streak down the side of one ear and across the dome, following the curve; matte black elsewhere | One light band on the cowl's upper side reads, as the dossier's `h` cells |
| Lenses, jaw | [73] [74] | White lenses with a cyan glow; the jaw skin-toned, often open | The eyes read; Bat-Clawd's own white eyes and jaw stand in |
| Belt | [62] [75] [33] | Five blocks: **pouch, pouch, buckle, pouch, pouch**; the buckle marked with a dark X on the film [75]; the gaps between are dark grooves; the belt is its own yellow piece over the hips | A solid yellow band; the grooves show from 78 px |
| Cape, hanging | [76] [77] [11] | A stiff bell from the shoulders to the shins; **the hem cut in points**, about three a side in view, the concave arcs between them shallow | The points read in the outline at 54 px, as small teeth |
| Cape, spread | [65] | Flat as a bat wing, about four points a side | |
| Torso | [62] [33] [76] | Black with printed grey abs ([76] reads grey in one shot: the light or another suit) | Decision 11 keeps it black |
| The stand | [11] trailer #4 73.5 s | Arms down at the sides, the cape a bell to the floor | **No fists-on-hips frame found** in the four uploads; the dossier's alarmed "hero pose" is our pose, not a frame |
| Seated | [39] clip 231 s; [78] trailer #4 34.5 s | In the Batcomputer's chair only the head, chest and belt show over the desk; in the home cinema a small dark figure in a big seat | |
| Dinner for one | [46] Batcave teaser 104.5 s (1080p); [60] 97.5 s | His head and lit jaw just above a dark table that fills the frame's width, a warm glow under his chin from what sits in front of him; the lobster is a red shape on a plate in the microwave, 20:00 on its timer | A head over a bar wider than he is: the dossier's L1 outline holds |

The figures shrunk to 54 px tall (board, last two tiles): the bell of the cape, the yellow belt and the ears read; the abs, the lenses' glow and the chest's bat do not (the oval is a 4–5 px yellow blot).

## 7. The law: three texts read in the original

Fetched 2026-10-30 from the EU Publications Office's Cellar by CELEX number (`https://publications.europa.eu/resource/celex/<CELEX>`, English and French). EUR-Lex itself answered every URL with HTTP 202 and an empty body, and InfoCuria's case pages are a script app that returned no text; the Cellar copies are the same official texts. Quotes are short; paragraph numbers are the texts' own. **Not legal advice.**

### 7.1 C-452/15 P, *Best-Lock (Europe) v EUIPO*, order of 14 April 2016 [85]

Court of Justice (Sixth Chamber), reasoned order under Article 181 of its Rules of Procedure; language of the case English. The appeal was against the General Court's judgment in **T-396/14** (the "toy figure with protrusion", EU trade mark No 50 450, class 28 "games and playthings"); the order does not concern T-395/14.

- Operative part: "1. The appeal is dismissed. 2. Best-Lock (Europe) Ltd shall pay its own costs."
- Para 24: the appeal "must be dismissed in its entirety as being in part manifestly inadmissible and in part manifestly unfounded".
- Paras 18–20 restate the General Court's holding: the "head, body, arms and legs" are the mark's essential characteristics, none shown to "serve any technical function"; the holes under the feet, in the legs and the hands, even if technical, are not "the most important elements of that mark".
- Para 22: whether the shape is technical is a factual assessment, outside an appeal.

**So** (Inferred): the minifigure shape mark stands as the dossier said; the Court did not re-decide it on the merits, it refused the appeal. Bat-Clawd keeps his own body.

### 7.2 T-515/19, *Lego v EUIPO – Delta Sport Handelskontor*, 24 March 2021 [86]

General Court (Second Chamber). The registered Community design **No 1664368-0006**, "building blocks from a toy building set" (Locarno 21.01), filed 2 February 2010: the 2x4 brick.

- Operative part: "1. Annuls the decision of the Third Board of Appeal ... of 10 April 2019 (Case R 31/2018-3); 2. Dismisses the action as to the remainder".
- Para 12: the Board of Appeal listed the features as "(i) the row of studs on the upper face ...; (ii) the row of smaller circles on the lower face ...; (iii) the two rows of bigger circles on the lower face ...; (iv) the rectangular shape ...; (v) the thickness of the walls ...; and (vi) the cylindrical shape of the studs".
- Paras 60–61: those features are both solely technical (Article 8(1)) and interconnection features (Article 8(2)).
- Paras 77–80: Article 8(3), the modular-systems exception, can be relied on "for the benefit of all the features referred to in Article 8(2)", and EUIPO must examine it.
- Para 107: "the smooth surface of the upper face of the toy brick is a feature of the specific appearance of the product", which the Board had to take into account.
- Para 96: a design is invalid under Article 8(1) only if all its features are solely technical.

### 7.3 T-537/22, *Delta Sport Handelskontor v EUIPO – Lego*, 24 January 2024 [87]

General Court (Third Chamber), after the Board of Appeal's new decision kept the design.

- Operative part: "1. Dismisses the action; 2. Orders Delta Sport Handelskontor GmbH to pay the costs."
- Para 37: "a design is declared invalid ... only in the case where all of its characteristics are excluded from protection. If at least one ... is protected, in particular due to the application of the exception provided for in Article 8(3) ..., the design remains valid."
- Para 47: Article 8(3) needs novelty and individual character, and the purpose of "allowing the multiple assembly or connection of mutually interchangeable products within a modular system".
- Paras 57–61, 72: novelty and individual character are presumed; the party seeking invalidity must show an earlier disclosed design, which Delta Sport did not.

**So** (Inferred): Lego's registered design for the 2x4 brick (as a product, in Locarno class 21.01) remains valid. Whether T-537/22 was appealed to the Court of Justice was not confirmed (§9).

### 7.4 What it means for our use (Inferred, not legal advice)

A design right protects the appearance of a product and reaches designs that give the informed user the same overall impression. Our UI is a different product (a software panel), and a flat pattern of dots is not a brick; but a drawing that *is* a recognisable brick moves toward the protected appearance, and the minifigure's shape is a trade mark for games and playthings.

| Use | Reading |
|---|---|
| Studs as a flat 2D dot texture (round dots, a lit rim, a shadow, a regular pitch, blank tops) | Free to draw. The studs were held technical in C-48/09 P (trade mark); in the design cases they are one of six features of a three-dimensional brick, protected only as part of the brick's whole appearance. A field of dots behind a panel is not that appearance |
| Smooth rectangular tiles with 1px corners | Free: generic UI rectangles. (The 2021 ruling counts the brick's *smooth upper surface* as a feature of its appearance, but of the brick, together with its studs, tubes and walls) |
| A lit top edge and a dark lower edge on rectangles | Free: a generic material look |
| Pieces that fit: seams, steps, a card raised one plate with a dark side face, studs round it | Free, as layout and shading. Keep the hollows (the underside's tubes) out: they are two of the six listed features and the most "brick" view |
| A 2x4 or 2x2 brick drawn as a recognisable object (an icon) | **Avoid.** It reproduces the registered design's features (studs in rows, rectangular box, cylinders) as an object; the dossier's only brick was in Signature L3, ranked third and dropped with it |
| The minifigure's body | Not drawn (C-452/15 P left T-396/14 standing) |

## 8. The names: trade mark searches

Searched 2026-10-30 by script (`tools-vdg-build/tm/`, copies of SAME BAT-TIME's): USPTO through the backend of `tmsearch.uspto.gov` (word searches, and owner-filtered searches for DC Comics, DC Entertainment, Warner, WB Games, Turner and LEGO); TMview (EUIPO's TMDN), all offices and EM, WO and GB. The house rule: a word that is a live mark of DC, Warner or LEGO, or anyone's live mark in class 9 for software, is replaced.

| Term | Records found | Verdict |
|---|---|---|
| **VERY DARK GREY** (also VERY DARK GRAY, VERY VERY DARK GREY) | USPTO: 22 records for "very dark grey/gray" and "dark grey/gray": none for VERY DARK GREY; the live ones are DARK GREY FRIDAY (class 35) and Omega's PLANET OCEAN DARK GREY (class 14). TMview: "very dark grey" 1 record and "very very dark grey" 1 (the same Australian clothing filing whose long text contains "dark grey"), "very dark gray" 0. DC, Warner and LEGO own no mark with GREY or GRAY (their "dark" marks are THE DARK KNIGHT, DC DARK LEGION, DARK ARTS) | **No mark found** |
| **NEED A HERO** (also I NEED A HERO, NEED-A-HERO) | USPTO: NEED A HERO (Alis Games, classes 9 and 41) **abandoned**; **I NEED A HERO, High 5 Games, Reg. 5375537 (serial 86198024), class 9 "game software", live** (Sections 8 and 15 accepted); I NEED A HERO (class 32, juice) live; NEARHERO's I NEED A HERO (class 9) cancelled. TMview: **NEED A HERO ARCADE RUSH, UAB "Game Insight", Lithuania 2016 2314, registered, classes 9, 16, 28, 35, 38, 41, 42, to 2036-10-19**. No DC, Warner or LEGO mark with this phrase (DC's are SUPER HERO(ES), DC SUPER HERO GIRLS, JUSTICE LEAGUE HEROES) | No mark for the phrase alone; **two live game-software marks contain it** |
| **AUTOGRAPH?** (AUTOGRAPH) | USPTO: 250 records; live in class 9 among them: LFG NFTs' AUTOGRAPH (Reg. 7811965 and 6993346, classes 9, 35, 38, 41, 42: NFTs and digital media), SportsMEDIA Technology's (Reg. 6568757, video graphics hardware), Vianode's, Shamir's (lenses), Steven L. Lynch's (recordings). TMview: 837 records in all offices, 42 live exact AUTOGRAPH in class 9, among them EUTM 018578215 and 018557880 (LFG NFTs, class 9), EUTM 011680361 (Autograph, Inc., classes 9 and 42, to 2033) and Marks and Spencer's. None by DC, Warner or LEGO | **Live class-9 marks of others, some for software** |
| **EPIC FAIL** | USPTO: 5 records, all dead (EPIC FAIL in classes 16 and 41 abandoned or cancelled; THE EPIC FAIL GAME abandoned). TMview: 19 records "epic fail", 3 "epicfail"; two live in class 41 only (Benelux 1514575, France 5099034), none in class 9; none by DC, Warner or LEGO | **No live class-9 mark found** |
| **HELLO?** (HELLO) | TMview, EM, WO and GB: 1,694 records, 22 live exact HELLO or HELLO! in class 9 (e.g. UK00004237553, classes 9 and 41; EUTM 018687588, BNP Paribas, class 9; HELLO! by Hola, S.L., classes 9, 16, 38, 41). Warner and HBO own **HELLO NEWMAN** (EUTM 017710955 and its UK right, classes 9, 28, 41) and **HELLO LADIES** (EUTM 011379492, classes 9 and 41): other words. USPTO owner search: Warner's HELLO AGAIN and HELLO NEWMAN, both abandoned | **Live class-9 marks of others**; no DC, Warner or LEGO mark for HELLO itself |
| **FAN MAIL** (FANMAIL) | USPTO: 15 records, 4 live, none in class 9 or 41; FANMAIL (Ardoru, serial 99343048, class 42, non-downloadable software for gifts and notes) pending. TMview: 104 "fan mail", 15 "fanmail"; FanMail (Fan Mail Agency, UK00003891184, class 42) live; none live in class 9; none by DC, Warner or LEGO | **No live class-9 mark found** (two in class 42, online software services) |

**Not reached:** EUIPO's record pages (connection reset) and TMview's detail pages (HTTP 403), so the EU goods texts were not read and software coverage of EU marks is read from their class numbers; the UK IPO's pages (TMview lists UK rights); TSDR's record pages (US statuses are the search index's). National registers outside TMview were not searched one by one.

**Inferred (not legal advice):**
- **VERY DARK GREY, EPIC FAIL, FAN MAIL: keep.**
- **NEED A HERO: replace.** It sits inside two live game-software marks (I NEED A HERO in the US, NEED A HERO ARCADE RUSH in Lithuania).
- **AUTOGRAPH?: replace.** Many exact live class-9 marks, some for software (LFG NFTs; Autograph, Inc.).
- **HELLO?: the maintainer's call.** Many exact live class-9 marks of others, and Warner's HELLO NEWMAN and HBO's HELLO LADIES nearby. The precedent read the rule narrowly for ordinary words: SAME BAT-TIME kept HOTLINE and POW! after checking DC and Warner owners only ([`same-bat-time-build.md`](same-bat-time-build.md) §7). Candidates are below in case it goes.

### 8.1 Replacement candidates

Each word was measured in Changa One 11px by `tools-vdg-build/stampfit.py`, which reproduces the dossier's table exactly (PERMISSION 89.6 / 80.8 / 64.5; HERO NEEDED 87.0 in the 87 px narrow margin). Each was then searched the same way, on 2026-10-30: USPTO by word, with DC, Warner and LEGO owners flagged, and TMview in all offices. Each was checked against every Theme's words (`words.ts`, `claims-wave-3.md`, jury §4). Widths are px against the room: margin 101, narrow margin 87, watch strip 72 (unboxed, at 9.5px).

| Replaces | Candidate | margin / narrow / strip | Marks found | In the Voice | Risk |
|---|---|---|---|---|---|
| NEED A HERO | **CAPE UP** | 63.6 / 57.4 / 42.0 | USPTO: none. TMview: 579 records containing the words, none CAPE UP | Batman tells you to put your cape on: you're the hero now. Count: "2 to cape up for" | An order, not a noun; on a tab alone it reads "get ready", which is the meaning |
| NEED A HERO | **HERO HOUR** | 82.7 / 74.8 / 58.5 | USPTO: none. TMview: 9 records, none HERO HOUR | His favourite time of day, now yours. Count: "2 for the hero hour" | Can read as a time slot, not an alert |
| NEED A HERO | YOU'RE UP | 76.8 / 68.9 / 53.4 | USPTO: 6 records, the one live one not in class 9 or 41. TMview: 4,463 records containing the words, only 500 read; in those, only YOU'RE UP! (class 28, filed) and a dead class-42 one | Plain: your turn | Next to ANCIENT GRACE's waiting word "You're on" (same register, another role). Third |
| AUTOGRAPH? | **YAY OR NAY?** | 91.4 / 81.7 / 66.0 | USPTO: 1 record, dead. TMview: 17; the four exact (GB, US, PH, TR) all ended or expired | A 2017 decision request: approve or not | The longest; fits every room |
| AUTOGRAPH? | THUMBS UP? | 89.9 / 81.1 / 64.7 | Live in class 9: US Reg. 5204504 (a camera grip, not software); UK00004000520 (You Tec Ltd, classes 9, 21, 25, 28; goods not read). TMview read 500 of 551 | Asks for a thumbs-up: approval | Class 9 of others (not software as far as read). Second |
| AUTOGRAPH? | SAY YES? | 70.6 / 63.5 / 48.0 | Live: CN 51117233 SAY YES (class 9, a smart-tech company); US SAY YES! (class 41). TMview read 500 of 1,086 | Coaxing a yes out of you | Class 9 in China. Third |
| HELLO? | **ANY DAY NOW** | 96.0 / 86.3 / 70.0 | USPTO: 3, none live. TMview: 23, none in class 9 or 41 (Dymocks in classes 16, 18, 20, 24; Spelling's class-41 ended) | Vain impatience: he's waiting on you, loudly | **Tight**: 0.7 px under the narrow margin, 2.0 px under the strip. `stampWidth.test.ts` on the WOFF decides |
| HELLO? | **DRUMROLL...** (or DRUMROLL) | 91.5 / 81.8 / 66.1 (78.7 / 71.7 / 55.0) | USPTO: none live in class 9 or 41 (the class-9 ones are dead). TMview: 27; DRUMROLL Health live in class 42 (as FAN MAIL) | The big moment waits on your answer | May read as "something is coming", not "waiting on you". Decide on screen |

**Rejected on the way** (a live class-9 mark, a studio's mark, or a fit failure): SPOTLIGHT (Apple's SPOTLIGHT, Reg. 3624650, class-9 software), SIDEKICK (Borland's, Reg. 1334110, computer programs), HERO TIME (HEROTIME, Germany 3020162125148, classes 9, 14, 42), SUIT UP (Fox Digital Entertainment, Reg. 4368609, class 41), AHEM (WO 1437254 and UK, classes 9 and 42), ANYONE? (UK00003658790, class 9), HEY YOU (Argentina 3795842, class 9), PSST (Reg. 8384921, class-9 software), DEAL? (class-9 software marks), STILL THERE? (Canada 2459725, class 9, filed), GREEN LIGHT? (fails the narrow margin, 87.5, and class-9 software marks), APPROVE ME? (fails the narrow margin, 87.9), TICK TOCK (ByteDance holds TICK TOCK in Egypt, class 35: TikTok's family), WELL? (18,426 records; could not be cleared).

**Recommended (P):** NEED A HERO → **CAPE UP**; AUTOGRAPH? → **YAY OR NAY?**; HELLO?, if replaced → **ANY DAY NOW** if the WOFF test passes it, otherwise DRUMROLL. None repeats another Theme's word. The two-question pattern of the permission stamps holds (YAY OR NAY? keeps the "?").

## 9. Unverified items

- **The emblem's source.** [62] is a photograph of the physical print (pad-printed on a near-flat torso face): a few percent of the oval's ratio may be the lens or the print's own spread. Two LEGO photos and the film agree within 2% on the oval. A flat drawing of the print (a LEGO style guide or the decal artwork) would settle it; none was found in public.
- **LEGO.com** product pages refused this machine (HTTP 403); the product photos were read from Brickset's image server, which serves LEGO's own images.
- **The alarm clock's maker** (ClicTime, under licence) is from a retailer database's summary, not the box.
- **The ear measurements** (§6) are taken off one tilted frame's silhouette; read, not traced.
- **"Fists on hips"** was not found in these four uploads; the full film was not searched.
- **Stud ratios** are from compressed 1080p video; the shadow's depth depends on each shot's light.
- **The appeal of T-537/22** to the Court of Justice: not confirmed either way (InfoCuria's case list is a script app; a search found no C- number).
- **The press release on T-537/22** [88] was found by search, not opened.
- **Replacement words** (§8.1): TMview's "contains" searches were read to 500 or 1,000 records where they returned more (THUMBS UP, SAY YES, YOU'RE UP, ANYONE, HEY YOU); exact-word hits beyond those pages may exist. Widths are Pillow advances on the TTF; ANY DAY NOW's 0.7 px margin needs the WOFF test.
- **The law** (§7.4) is our reading for a non-profit fan project, as ADR 0001's line asks; not legal advice.
- **Everything visual** (the trace beside [62], the glide at 54 px, the studs' shadow on G1, tall or standard ears): decide on screen from the boards.

## 10. Sources

- Images [61]–[84] and records [85]–[88], with URLs and seconds: [`references/lego-batman.md`](references/lego-batman.md); the dossier's [09] [11] [16] [30] [33] [39] [40] [43] [45] [46] [60] as listed there.
- EU Publications Office (Cellar), by CELEX: 62015CO0452 (C-452/15 P), 62019TJ0515 (T-515/19), 62022TJ0537 (T-537/22), read 2026-10-30. Court of Justice of the EU, [press release on T-537/22](https://curia.europa.eu/jcms/upload/docs/application/pdf/2024-01/cp240015en.pdf).
- Brickset's image server for the LEGO Group's product photographs of sets 853650, 853632 and 5005222 (URLs in the index).
- YouTube uploads as in the dossier: `rGQUKzSDhrg` (Trailer #4), `LHgQSwgKygk` (Wayne Manor teaser), `aBJyp2LFHgk` (Batcave teaser, now 1080p), `y1YllPMPbJ0` (HBO Max clip).
- USPTO trademark search (`tmsearch.uspto.gov`) and TMview (EUIPO's TMDN), 2026-10-30.
- In this repo: [`lego-batman.md`](lego-batman.md), [`jury-wave-3.md`](jury-wave-3.md), [`same-bat-time-build.md`](same-bat-time-build.md), [`silent-predator-build.md`](silent-predator-build.md), `app/src/shared/emblems.ts`, `app/src/renderer/src/components/BatEmblem.tsx`, `DESIGN.md`, ADR 0001.

No images are included in this note. The frames and photographs reproduce copyrighted work, so they stay in the scratch folder outside the repository.

## For the build

- **Emblem source:** trace from **[62]**, the LEGO Group's photograph of the minifigure (front-on, oval 242 px, sharp); [63] and the film stack [61] confirm it. Not [64] (another print).
- **Ratios (Measured):** oval **1.96:1** (1.92–1.98 across sources); bat **2.39:1**, **90%** of the oval's width, **74%** of its height, centred, 0.6 units high; the yellow ring 4.8 units at the sides; **no rim**.
- **Traced polygon:** `BAT_2017` and `OVAL_2017` in §3.5 (plate `{ box: { x: 13.02, y: 0, width: 93.95, height: 48 }, rim: 0, lights: false }`), and the 16-unit version (oval 16 × 8.17). Parts: ears 7 apart, 1.7 above a flat head; round upper windows; wingtips the highest points; wings to the ring; two lobes a side, an outer claw, a pointed tail. Round one: show it beside [62] on screen.
- **Plastic (Measured on [16]):** stud top ≈ 0.6 of the pitch; highlight ≈ 1.8× the plate, top ≈ 1.1×, a near-black shadow (0.15–0.2×) under each stud about 0.3 of the vertical pitch; the yellow wall's softer version 1.08× / 0.73×. Letters: lit top bevel and dark lower bevel. Lit pieces: hot core, dark rim (`#f3b6a5` / `#f13c3d` / `#701513` on the red button).
- **Pieces that fit (P):** seams between sections and tiles; a card raised one plate (a dark side face ≈ 0.4 of the pitch) with studs round it; a lit tile with a bright rim and dark seams for the active row. Never a brick as an object, never the hollows.
- **Flying:** F1, the glide [65] (the cape spread flat as two bat wings, about four points a side, the body level); F5, the leap off a ledge [70], as the alternative.
- **Suit:** ears tall in the film (about a third of the cowl's width; standard ears are the dossier's choice); one shine band on the cowl; belt pouch-pouch-buckle-pouch-pouch, buckle with an X; cape a stiff bell to the shins, hem in points (about three a side hanging); torso black. Alarmed: the hero pose is ours (no frame).
- **Law:** C-452/15 P dismissed (the minifigure mark stands); T-515/19 and T-537/22 keep Lego's 2x4 brick design valid under Article 8(3). Studs as texture, tiles, edges, seams and steps: free (Inferred); a brick icon: avoid.
- **Names:** VERY DARK GREY, EPIC FAIL and FAN MAIL clear. Replace NEED A HERO (inside I NEED A HERO, US Reg. 5375537, and NEED A HERO ARCADE RUSH) with **CAPE UP**. Replace AUTOGRAPH? with **YAY OR NAY?**. HELLO? is the maintainer's call; if it goes, use **ANY DAY NOW** (tight: the WOFF test decides) or DRUMROLL (§8.1).
