# Research note: SAME BAT-TIME, before the build (the chest bat, the suit's parts, the Batusi, the clouds, the names)

Research note, 2026-10-28. Scope: what the Theme dossier [`adam-west.md`](adam-west.md) read by eye or left unverified (§8, §8.3, §9, §10, §12, §13), checked again before the build of SAME BAT-TIME (GitHub #148, Linear LUC-89), after the ABC series *Batman* (1966–68) with Adam West. Covered: a clean source for the chest emblem and a trace of it, the suit's parts at close range, the Batusi's steps and rhythm, the clouds behind the Signal, and whether SAME BAT-TIME, BATUSI and BATPHONE are registered marks. Read with the dossier, its reference index [`references/adam-west.md`](references/adam-west.md) and [`jury-wave-3.md`](jury-wave-3.md) §9, whose decisions stand.

Provenance key, as in [`dkr-rework.md`](dkr-rework.md): **Read** = seen by us on a reference image, named by its number (`[21]`). **Measured** = taken off that image by a script (masks, moments, contour tracing, frame differences, colour medians). **Inferred** = our reading of what those facts imply. Images [01]–[53] are the dossier's; [54] on are new (§2). All stay in scratch folders and are never committed or shipped. The emblem is traced from [54], a U.S. Treasury film that Wikimedia Commons holds as public domain; the bat it shows is still DC's mark, credited as every Theme's emblem is (ADR 0001).

## 1. TL;DR

- **A clean, frontal source exists, and it is public domain.** *Batman for U.S. Savings Bonds* (ca. 1966, U.S. Treasury) [54], the short the dossier's [42] came from, shows Adam West front-on in the series costume for about 30 seconds, the chest oval **whole and unobstructed in 139 of its frames**, 183 px wide at 1488×1072. Sixty of the sharpest were levelled, scaled and **median-stacked** at 4× into one clean image of the emblem, and the bat was traced from it by following its outline pixel by pixel (§3).
- **The dossier's 2.6:1 bat is wrong.** Measured on the stack: **bat 1.88:1** (the raw outline 1.84), **oval 1.39:1** as filmed, **bat 79% of the oval's width and 58% of its height**, centred across, sitting about 1.6 units (of 48) below the oval's centre. Other series frames agree on the parts and the share of the width (0.79–0.85) but read the bat flatter (2.09 on the WB trailer [35], 2.18 on S1E1 [21]); a control shows low resolution explains only about 0.06 of that, so the stickers varied (Inferred, §3.3). The emblem was a sticker applied fresh each day ([56] [57]).
- **The 1966 chest bat, part by part (Measured):** two short pointed ears 8.6 units apart (on 120), 2.9 units above a round notch between them; a round scoop each side between ear and wing, 5 units deep; **wingtips that point straight up**, as high as the ears within 0.7 units; a convex outer edge to a low outer corner; **two round lobes a side underneath** (not three) and **a pointed tail**, the lowest point. Not the bat of the opening's bat wipe [55] and not the Signal's [17], which are a different, tall-eared bat with a long tail (§3.4).
- **Traced polygon** on the `emblems.ts` 120×48 grid, plate `{ box: { x: 26.62, y: 0, width: 66.76, height: 48 }, rim: 0, lights: false }`, and the same in a 16-unit box (§3.5). At 10 px wide it reads as a dark band with a notched top in a yellow oval, apart from DARK DECO's rimmed BAT_1992 (board `emblem-trace.png`).
- **The suit's parts (Read, §4):** the painted brows are thin pale blue-white strokes rising outward from the nose at about 40° and curling up at the outer end; a pale-edged band across the nose; short pointed ears set on the cowl's top corners, their tips at about crown height; gloves are long gauntlets with flared cuffs to mid-forearm; the belt has tall rectangular pouches and a **nearly square buckle (1.1–1.3:1), a little taller than the belt**, duller than the belt; violet trunks; short violet boots; the spread cape's hem shows **five or six scallops a side** [46].
- **The Batusi (Measured on S1E1's 4.3 s shot):** the music runs at about **140 BPM** (a beat every 0.43 s). West changes pose about **every two beats (0.85 s)**, never stops still, and ends on the V: the fingers meet across the nose at 129.9 s, are drawn out to the temples by 130.5 s, and the V stays on screen 0.72 s until the cut, stillest at 130.10–130.50 s. Order: hand at chest → right arm sweeps up → left hand across the face → **arm up** → hand to the face → **both arms overhead** → hands down the cowl → **V at the nose → V drawn out (held)**; a later shot swings the cape across and flaps the arms low (§5). The dossier's held step W1 (the V) is right; its reveal, four steps of one tick each, is four to seven times faster than the dance.
- **The clouds behind the Signal [17] (Measured, 2.5 s insert):** a locked camera, the Signal still (its edges move under a pixel), **no coherent drift** (under about 1% of the frame's width a second): the clouds churn in place. They are large, soft-edged banks and puffs (edges about 11% of the frame's width from 10% to 90%), dark navy lit from below. The closing-credits sky [18] [19] has **no clouds**: a flat cel blue `#0d437c`. A sideways drift is ours, not the show's (§6).
- **Names (§7, searched 2026-10-28):** **SAME BAT-TIME: no mark found** (USPTO; TMview across its offices: "same bat-time", "bat-time", "battime", "bat time"). **BATUSI: no DC mark**; one live Spanish national mark BATUSI (M4264522, an individual, class 28, filed 2024-04-25); the US "CLUSI BATUSI" is cancelled. **BATPHONE: a live DC Comics mark** in the EU (EUTM 004057691, to 2034, classes including 9, computer software, and 41) and the UK, and in Canada (class 9); its US registration (3019540, 2005, class 38) was cancelled under Section 8, and DC opposed a "BAT PHONE" filing in 2024, which was abandoned [60]. Under the rule that dropped FREEFLOW, **Needs you should be HOTLINE**, not BATPHONE.
- **For the maintainer:** a flat photo of a 1966 chest sticker (the unused one at Willow [56], or any screen-used or licensed flat print) would settle the oval's flat ratio and which cut of the bat to keep; the boards are ready to compare it against.

## 2. References

New images and records, in the scratch folders `refs-west-build/` (downloads) and `work-west-build/` (stacks, crops); scripts in `tools-west-build/`; boards in `boards-west-build/`. They are added to [`references/adam-west.md`](references/adam-west.md).

| # | What | Source type | URL |
|---|---|---|---|
| 54 | *Batman for U.S. Savings Bonds*, ca. 1966, full film, 1488×1072; its chest stacked from 60 frames | U.S. Treasury film on Wikimedia Commons, public domain | https://commons.wikimedia.org/wiki/File:Batman_for_U.S._Savings_Bonds,_ca._1966.webm |
| 55 | The bat-wipe transition, front-on, 95.24 s of the HD titles upload | Series, the upload of [01]–[19] | https://www.youtube.com/watch?v=kK4H-LkrQjQ&t=95s |
| 56 | An unused 1966 chest emblem sticker, Willow Auction House lot 406 | Auction record (not reached: HTTP 403) | https://willowauctionhouse.com/auction/306-pop-culture-time/lot-406-batman-1966/ |
| 57 | Adam West and Burt Ward costume ensembles, Heritage Auctions | Auction record (not reached: HTTP 403) | https://entertainment.ha.com/itm/movie-tv-memorabilia/costumes/batman-tcf-tv-1966-1968-adam-west-batman-and-burt-ward-robin-signature-dynamic-duo-costume-ensembles/p/7429-11005.s |
| 58 | The shot of [16], 96.4–99.4 s, 40 frames stacked | Series, the same HD upload | https://www.youtube.com/watch?v=kK4H-LkrQjQ&t=96s |
| 59 | EUTM 004057691 BATPHONE, DC Comics | EUIPO register record (JSON) | https://euipo.europa.eu/copla/trademark/data/004057691 |
| 60 | Opposition 91289874, DC Comics v. Bat Phone HR LLC | USPTO TTAB record | https://ttabvue.uspto.gov/ttabvue/v?pno=91289874 |

Dossier images used again: [16] [21] [35] [39] (the chest, §3); [23] [35] [36] [38] [40] [42] [46]–[49] (the suit's parts, §4); [17]–[22] [25] [26] (the Batusi and the clouds, §5–6); the frames of §5–6 are cut again from the same uploads at the seconds given there.

**Boards (scratch, `boards-west-build/`):**
- `emblem-trace.png`: the [54] stack with the trace over it; the trace at five sizes; BAT_1992 beside it.
- `emblem-sources.png`: [54], [35], [21], [39] levelled, each with its own trace; all traces on one oval; the HD stack [58] and the bat wipe [55].
- `crops-suit.png`: the suit's parts (§4).
- `batusi-frames.png`: the Batusi's key frames, S1E1 and King Tut, with seconds and labels (§5).
- `clouds-frames.png`: the Signal insert's first, middle and last frames, a brightened frame, the first-to-last difference, and the closing credits (§6).

**Scripts (scratch, `tools-west-build/`):** `emblem_frames.py` (find and score the oval per frame), `emblem_stack.py` (level, scale, centre, median), `emblem_trace.py` (threshold, mirror axis, averaged halves, pixel-by-pixel outline, simplification, measurements), `emblem_board.py`, `emblem_sources.py`, `crops_sheet.py`, `motion_hold.py` (frame-to-frame motion); `video/` (frame extraction, tempo from the soundtrack's onsets, cloud motion by block matching, Signal edge tracking); `tm/` (USPTO and TMview queries).

## 3. The chest bat

### 3.1 Sources searched

| Source | What it gives | Status |
|---|---|---|
| **[54] *Batman for U.S. Savings Bonds*, ca. 1966**, Wikimedia Commons, 1488×1072 VP8, 50 s | West front-on, the oval whole from about 3 s to 33 s (139 frames clean by script, §3.2) | **Public domain** (U.S. Treasury). **Recommended** |
| [16] [58] the HD upload's cave shot (2014 remaster), 96.4–99.4 s | The oval 200 px wide, whole; the torso turned three-quarter, glare on the oval's upper left | Stacked (40 frames), read only: too turned to trace |
| [35] Warner Bros.' 2014 Blu-ray trailer, 640×360 | Front-on, the oval about 56 px wide | One frame measured |
| [21] S1E1 "Hi Diddle Riddle", 480×360 SD | Front-on, about 52 px wide | One frame measured |
| [39] the film's trailer | A glove covers the bat's right half | Measured and set aside (mirror IoU 0.62) |
| [46]–[50] ABC publicity stills, Commons | Black and white; the oval blown out to white on [49], about 30 px on [48] | Already at full resolution on Commons (708–1379 px wide); not usable for the bat |
| Unused screen chest sticker, Willow Auction House lot 406 [56] | A flat, never-worn emblem: the ideal source | Page refused this machine (HTTP 403, also in a headless browser); seen only in a search summary |
| Heritage Auctions, the West/Ward costume ensembles [57] | Photos of the worn leotard; its text: a "hand-painted Bat-logo affixed with adhesive on oval canary-yellow field" | HTTP 403; text from a search summary |
| DC/Warner "Batman '66" style guide, licensed flat art | Would give the licensor's own drawing | No public copy found |

### 3.2 Method

`tools-west-build/emblem_frames.py` cuts the chest from every frame of [54] (2.5–34 s, 757 frames) and fits the oval: yellow pixels, opened, filled row by row and column by column, then an ellipse from its moments. A frame counts as **whole** when the filled mask matches its own ellipse (IoU > 0.97) and less than 3% of the ellipse is neither yellow nor bat (no glove, paper or shadow over it): 139 frames. `emblem_stack.py` takes the 60 sharpest (Laplacian variance), rotates each so the oval's long axis is level (tilts of −1.3° to +2.6°), scales each to the median width (182.6 px; Batman steps closer and back, 166–188 px) and centres it at 4×, then keeps the median of the stack: compression noise and the film grain cancel out and the edges stay where the frames agree. `emblem_trace.py` thresholds the bat halfway between the yellow and the bat (luminance 95.7 and 34.7), finds the mirror axis that best overlaps the bat with its reflection, **averages the two halves** (the luminance meaned with its mirror image), follows the outline pixel by pixel (Moore neighbour tracing) and simplifies it (Ramer–Douglas–Peucker, 0.15 units) into the left half, mirrored at x = 60.

**Perspective.** Front-on: the mirror axis sits 0.5 source px from the oval's centre and the bat is centred across within 0.2% (Measured), so no rectification was applied beyond levelling. Not corrected: the chest's curve, which narrows the oval's ends a little; a flat sticker may be a few percent wider than the 1.39:1 filmed (Inferred; [56] would settle it).

### 3.3 Measurements

Grid as `emblems.ts`: the oval 48 units tall, centred at x = 60, y down from the oval's top.

| | [54] Bonds stack (traced) | [54] raw outline | [35] WB trailer | [21] S1E1 | [54] shrunk to [35]'s size (control) | Dossier |
|---|---|---|---|---|---|---|
| Frames | 60 | 60 | 1 | 1 | 60 | read by eye |
| Oval w:h | **1.39** | 1.39 | 1.42 | 1.40 | 1.39 | ~1.5 |
| Bat w:h | **1.88** | 1.84 | 2.09 | 2.18 | 1.89–1.90 | ~2.6 |
| Bat width / oval width | **0.79** | 0.79 | 0.80 | 0.85 | 0.79 | ~0.80 |
| Bat height / oval height | **0.58** | 0.60 | 0.54 | 0.55 | 0.58 | |
| Mirror IoU of the raw bat | 0.90 | 0.90 | 0.91 | 0.94 | 0.90 | |

(Measured.) The oval is **1.39–1.42:1**, not 1.5. The bat fills **0.79–0.85** of the oval's width, as the dossier read, with a yellow band of 7.1 units (10.6% of the width) each side on [54]. Its ratio is **1.84–2.18:1**, nowhere near 2.6. The control (the stack shrunk to the trailer's resolution and measured again) moves [54] only from 1.84 to 1.90, so the flatter bats of [35] and [21] are real: the sticker was made by hand and applied fresh each day [56] [57], and its cut varied (Inferred). Every series source shows the same parts in the same places (board `emblem-sources.png`, all traces on one oval).

**The parts, on the traced polygon (Measured, 120×48 grid):**

| Feature | Value |
|---|---|
| Bat box | x 33.7–86.3, y 11.6–39.6: **52.6 × 28.0** |
| Ear tips | (55.7, 11.6) and (64.3, 11.6): **8.6 apart**, pointed, slightly rounded |
| Notch between the ears | round, its floor at y 14.5: ears **2.9** units tall |
| Scoop between ear and wing | floor at y 17.3, x 46.9–50.1: **5.0 deep** under the wingtip |
| Wingtips (top) | (40.9, 12.3): pointing up, **0.7 lower than the ears** |
| Outer edge | convex, widest at x 33.7 for y 24.9–27.9 |
| Lower outer corner | (35.1–35.7, 31.9), blunt |
| Outer lobe | top at (40.7, 27.9): 4.0 above the outer corner |
| Point between the lobes | (47.1, 33.7) |
| Inner lobe | top at (50.9, 31.5): 2.2 above that point |
| Tail | (60, 39.6): pointed, the lowest point, 5.9 below the points between the lobes |
| Bat centre against the oval's | 1.6 units low; centred across |

### 3.4 What the dossier's §9 got right and wrong

- "A wide, flat 1966 bat, about 2.6:1": **wrong**, 1.84–2.18 (1.88 traced). On the 54 px Bat-Clawd it is about 10 px wide and 5 px tall.
- "Short ears close together": **short, yes; close, no.** Their tips are 8.6 of 52.6 units apart (16% of the bat's width), with a round notch between them.
- "The wing tops almost level": **right in a sense**: the wingtips and ears end within 0.7 units of each other, but between them is a 5-unit round scoop, so the top line is three peaks (wing, ears, wing) over two dips.
- "Three rounded scallops under each wing": **wrong for the chest; two lobes a side**, then the tail. Three scallops a side belong to the bat wipe [55], a different, tall-eared bat with a long tail that the series uses as its scene transition, and the Signal on the clouds [17] and in the closing credits [18] [19] draws that tall-eared bat too (Read). If the disc's Signal follows [17], it is not the chest bat.
- "A short point below": **right**, a pointed tail 5.9 units below the lobes' points.
- "The oval about 1.5:1, the bat about 80% of its width, no black rim": **1.39–1.42; 79–85%; no rim, confirmed** on every colour source (Measured, Read).

### 3.5 The trace

The left half followed pixel by pixel on the averaged halves and mirrored at x = 60; 86 points. On the 120×48 grid, as `BAT_1992` is written:

```ts
export const BAT_1966 =
  'M60 14.5 L59.4 14.5 L58.1 13.9 L55.7 11.6 L55.3 11.9 L54.2 14.4 L52.1 16.5 L50.1 17.2 ' +
  'L46.9 17.3 L45.6 16.9 L43.4 15.6 L42.4 14.5 L41.3 12.7 L40.9 12.3 L40.3 12.4 L38.2 14.4 ' +
  'L36.1 17.6 L34.1 22.3 L33.7 24.9 L33.7 27.9 L34.1 30 L34.4 31 L35.1 31.9 L35.7 31.9 L36.1 31.6 ' +
  'L36.7 30.2 L38.2 28.8 L39.3 28.2 L40.7 27.9 L42.4 28.2 L44.1 29.1 L45.2 30.1 L46.2 31.7 ' +
  'L46.6 33.4 L47.1 33.7 L47.8 33.4 L49.2 32.2 L50.9 31.5 L52.8 31.6 L55 32.5 L57.8 35 L58.9 37 ' +
  'L59.6 39.3 L60 39.6 L60.4 39.3 L61.1 37 L62.2 35 L65 32.5 L67.2 31.6 L69.1 31.5 L70.8 32.2 ' +
  'L72.2 33.4 L72.9 33.7 L73.4 33.4 L73.8 31.7 L74.8 30.1 L75.9 29.1 L77.6 28.2 L79.3 27.9 ' +
  'L80.7 28.2 L81.8 28.8 L83.3 30.2 L83.9 31.6 L84.3 31.9 L84.9 31.9 L85.6 31 L85.9 30 L86.3 27.9 ' +
  'L86.3 24.9 L85.9 22.3 L83.9 17.6 L81.8 14.4 L79.7 12.4 L79.1 12.3 L78.7 12.7 L77.6 14.5 ' +
  'L76.6 15.6 L74.4 16.9 L73.1 17.3 L69.9 17.2 L67.9 16.5 L65.8 14.4 L64.7 11.9 L64.3 11.6 ' +
  'L61.9 13.9 L60.6 14.5 Z'

/** The 1966 oval as [54] measures it: 1.39:1, no rim, a yellow that never lights. */
export const OVAL_1966 = { box: { x: 26.62, y: 0, width: 66.76, height: 48 }, rim: 0, lights: false }
```

The same outline in a 16-unit box, the oval exactly 16 × 11.5 at (0, 0):

```
M8 3.48 L7.86 3.48 L7.54 3.33 L6.97 2.78 L6.87 2.85 L6.61 3.45 L6.11 3.95 L5.63 4.12 L4.86 4.15 L4.55 4.05 L4.02 3.74 L3.78 3.48 L3.52 3.04 L3.42 2.95 L3.28 2.97 L2.78 3.45 L2.27 4.22 L1.79 5.34 L1.7 5.97 L1.7 6.69 L1.79 7.19 L1.86 7.43 L2.03 7.65 L2.18 7.65 L2.27 7.57 L2.42 7.24 L2.78 6.9 L3.04 6.76 L3.37 6.69 L3.78 6.76 L4.19 6.97 L4.45 7.21 L4.69 7.6 L4.79 8 L4.91 8.08 L5.08 8 L5.41 7.72 L5.82 7.55 L6.27 7.57 L6.8 7.79 L7.47 8.39 L7.74 8.87 L7.9 9.42 L8 9.49 L8.1 9.42 L8.26 8.87 L8.53 8.39 L9.2 7.79 L9.73 7.57 L10.18 7.55 L10.59 7.72 L10.92 8 L11.09 8.08 L11.21 8 L11.31 7.6 L11.55 7.21 L11.81 6.97 L12.22 6.76 L12.63 6.69 L12.96 6.76 L13.22 6.9 L13.58 7.24 L13.73 7.57 L13.82 7.65 L13.97 7.65 L14.14 7.43 L14.21 7.19 L14.3 6.69 L14.3 5.97 L14.21 5.34 L13.73 4.22 L13.22 3.45 L12.72 2.97 L12.58 2.95 L12.48 3.04 L12.22 3.48 L11.98 3.74 L11.45 4.05 L11.14 4.15 L10.37 4.12 L9.89 3.95 L9.39 3.45 L9.13 2.85 L9.03 2.78 L8.46 3.33 L8.14 3.48 Z
```

Board `emblem-trace.png`: the stack with the polygon (red) and the raw pixel outline (cyan) over it; the polygon on its oval at 520, 120, 40, 20 and 10 px wide, the last two enlarged; DARK DECO's BAT_1992 beside it at 10 px. Round one: show it beside [54]'s stack and [35] before calling it done (HOLIDAY's took twelve rounds; DARK DECO's was right once traced from a clean drawing).

## 4. The suit's parts

Crops in `work-west-build/crops/` and on the board `crops-suit.png` (all Read unless marked).

| Part | Crops | Finding |
|---|---|---|
| Painted brows | `cowl-bonds.png`, `cowl-bonds-grid.png` [54], `cowl-hd16.png` [16], `cowl-38.png` [38], `cowl-47.png` [47] | Two thin pale strokes, blue-white in colour (bright blue on the HD grade [16]), each about 0.2 of the cowl's width long. Each starts low beside the nose, rises outward at about 40° and ends in a small upward curl; the inner ends are about 0.18 of the cowl's width apart. Same on the series [54] [16] and the film [38] |
| Nose line | the same | A pale edge round the nose piece: a band across the bridge, its lower corners squared, about 0.22 of the cowl's width; a faint vertical crease down the middle of the forehead on [38] |
| Ears | `cowl-bonds-grid.png`, `cowl-47.png` | Short and pointed, on the cowl's top corners (tips about 0.94 of the cowl's width apart), their outer edge continuing the cowl's sides; the tips reach about the crown's height, standing about 0.13 of the cowl's width above where they leave the dome. Taller-looking on the still [47] (shot from below) |
| Cape hem | `hem-46.png`, `hem-46-close.png` [46]; `hem-36.png` [36] | Spread, the hem is a row of scallops (concave arcs between points), **five or six a side** visible on [46], each about half as deep as it is wide. Hanging, the folds hide most of them; [36] shows the hanging cape reaching mid-calf |
| Belt | `belt-35.png` [35], `belt-49.png` [49], `belt-48.png` [48], `legs-40-x3.png` [40] | Yellow, with tall rectangular pouches, two to three a side visible from the front. The buckle is a **plate 1.1–1.3 times as wide as tall** (1.1 front-on [35], 1.3 on [49] from below), a little taller than the belt, in a duller, greyer gold than the belt on the colour frames [35] [40]. On the stills [48] [49] the buckle is dark with a raised bat in its centre |
| Gloves | `gloves-bonds.png` [54], `gloves-47.png` [47] | Long gauntlets in the dark violet satin, **the cuffs flared** and reaching about mid-forearm; no fins seen |
| Trunks | `legs-23.png` [23], `legs-40-x3.png` [40] | Violet satin, cut high at the hip, under the belt |
| Boots | `legs-23.png` [23], `hem-46.png` [46] | Short, violet (black on the still), reaching the lower calf, with a plain top |

## 5. The Batusi

Sources: S1E1's clip [20]–[22] (https://www.youtube.com/watch?v=K7mb4Jh6mJ0, 480×360, 29.97 fps, telecined) and the King Tut clip [25] [26] (https://www.youtube.com/watch?v=SaPqWjkyzzk, 23.976 fps), downloaded with yt-dlp and cut with ffmpeg; tempo from the soundtrack's onsets (an autocorrelation comb, `video/tempo2.py`); motion from frame differences (`motion_hold.py`). Board `batusi-frames.png`.

### 5.1 S1E1, "Hi Diddle Riddle"

The dance is cut into the scene: Batman is on screen from 126.40 s to 130.67 s (4.27 s), then again from 149.60 s to 152.27 s (Measured: the cuts are the two spikes in frame difference). The music runs at **140.5 BPM, a beat every 0.427 s** (Measured), so the first shot is ten beats.

| Time (s) | Pose (Read) | Beats from the last |
|---|---|---|
| 126.50 | Left hand at the chest | |
| 126.77 | Right arm sweeps up | 0.6 |
| 126.90 | Left hand across the face | 0.3 |
| 127.50 | **One arm straight up**, the other hand at the chest ([20], the dossier's W2) | 1.4 |
| 128.37 | A hand to the face again | 2.0 |
| 128.97 | **Both arms overhead** | 1.4 |
| 129.30 | The hands slide down the cowl | 0.8 |
| 129.87 | **The V meets across the nose** | 1.3 |
| 130.50 | **The V drawn out to the temples, elbows out** ([21], the dossier's W1), held | 1.5 |
| 130.67 | Cut | |
| 149.97 | The cape swung across the body | |
| 150.83 | Arms back out | 2.0 |
| 151.24 | Arms low, elbows bent, flapping ([22], the dossier's W3) | 1.0 |

- **He never holds still** (Measured): frame-to-frame motion stays at 2–4 grey levels a frame through the shot. The only near-pause is the V at the end: struck at 129.95 s and still on screen at the cut 0.72 s later, stillest at 130.10–130.50 s (motion about 1.2–2.0). The arm-up pose is the longest, 127.10–128.20 s (1.1 s, about 2.5 beats). The V is struck once on camera, about nine beats after the arm goes up; the cycle is never shown repeating, so a full cycle is Inferred.
- **About two beats a pose** (0.85 s), the V struck once per shot, as its ending (Measured, Read).
- **The held step:** the V drawn out, elbows out at eye height, is both the dance's resting point and the dossier's W1 (Read). Confirmed.

### 5.2 King Tut ("The Pharaoh's in a Rut", per the dossier)

Faster music, about **180 BPM** (beat 0.334 s; the comb also scores 90, its half) (Measured). The cape is held over the head (51.42 s), the V arrives at the eyes (51.83 s), is drawn to the temples (52.33 s), the hands open at the ears like wings (52.75 s), the cape swirls up (53.42 s) and ends in a cape-spread jump (56.90 s) (Read). The V again takes about 1.5 beats from the eyes to the temples, and is held about 0.75 s; the stillest moment of that shot is the V's arrival at the eyes (Measured). The wide shots (43.6–51.1 s, 56.2–61.2 s) show him from the back or hopping.

### 5.3 For the Signature

- Keep W1, the V drawn out, as the held step.
- **The reveal's timing** (Inferred): the show spends about two beats (0.85 s, about seven ticks of the 8 fps clock) on each pose. Four poses of one tick each read as a flick, not a dance. If the engine can hold a step, hold each reveal step 6–7 ticks; if not, repeat each step's frame. A faithful order, from the shot: arm up (W2) → both arms overhead → V at the nose → **V drawn out (held)**. The low flap (W3) belongs to the second shot; it fits as a watch beat. As a loop at 140 BPM (3.4 s, eight beats): arm up 2 beats → hand across the face 1 → both arms overhead 1 → hands down the cowl 1 → **the V, 2** → arms swing low 1.
- **The watch beat:** the V's own motion, the fingers drawn from the nose to the temples, takes 0.6 s (five ticks) in S1E1 and 0.5 s in King Tut (Measured).

## 6. The clouds

Sources: the Signal insert in the HD titles upload (https://www.youtube.com/watch?v=kK4H-LkrQjQ, 100.52–103.00 s, 62 frames at 25 fps, 1440×1080) and the closing credits (104–111 s). Cloud motion by block matching and frame differences, the Signal's edges tracked per frame, colours as medians (`video/clouds.py`, `blockflow.py`, `sigring.py`, `credsky.py`). Board `clouds-frames.png`.

| | Finding | Provenance |
|---|---|---|
| Shot | 2.48 s, then a cut to black | Measured |
| Camera | Locked (global shift 0.5 px over the shot) | Measured |
| The Signal | Still: its edges move 0.5–0.9 px (standard deviation), no wobble. An ellipse 475 × 296 px (0.33 of the frame's width, 0.27 of its height; 1.60:1), pale, with the **tall-eared bat of the bat wipe** [55], not the chest bat | Measured; the bat Read |
| Drift | **None coherent**: the clouds churn in place, under about 15 px/s (about 1% of the width a second); the first and last frames differ in texture, not position | Measured |
| Shapes | Three or four masses on screen: **a bright, flat bank along the bottom** (about the lowest 28% of the frame; its texture four times wider than tall, so it reads as a band), a bank down the right side, rounder billows at the upper left and dim puffs above the Signal (1.2–1.7 times wider than tall); a dark wedge of clear sky points at the Signal from the left; the top of the frame is the darkest sky | Measured (texture ratios, brightness by band); Read (the masses) |
| Edges | Soft: 10% to 90% across about 160 px (11% of the width, 15% of the height) | Measured |
| Light | The whole frame dims steadily from about 101 s: mean brightness −24%, the Signal's ring −14%, no flicker | Measured |
| Colours | All at hue 210–215°: dark sky `#080c10`, mid cloud `#172a40`, bright cloud `#2c5f9b`, the bottom bank `#2e64a4`, the Signal's ring `#223954`, the bat on the Signal `#101822`. The clouds are lighter, more saturated versions of the sky's blue, never white | Measured (medians) |
| Closing credits [18] [19] | **No clouds**: a flat cel sky `#0d437c` (about 2 levels of variation, no gradient), a black skyline over about 30% of the frame, a green beam `#44722b`, the Signal as a near-round pale disc `#d4bbc3` with a black bat; the card is still but for the title dissolves | Measured, Read |

For the Atmosphere (Inferred): A1's "flat cloud banks drift right to left" is not what the insert does; it shows **slow churning masses, lit from below, behind a still Signal**. A drift is still the cheapest way to make clouds move on the `smoke` painter and stays our choice (P); faithful would be very slow (under 1% of the panel a second) and soft-edged (about a ninth of the panel's width). The bottom-lit bank (`#2e64a4`) is the lightest cloud; the dossier's `--clouds` `#2b4f80` sits between mid and bright. If the Signal on the sky uses [17]'s bat, it is the tall-eared one (§3.4); the chest bat is only on the chest.

## 7. The names: trade mark searches

Searched 2026-10-28 by script: USPTO through the backend of `tmsearch.uspto.gov` (`tools-west-build/tm/uspto.py`), TSDR and TTABVUE for the records; TMview (`tm/tmview.py`, its API, all offices and EM, WO, GB); the EUIPO record [59].

| Term | Records found | Verdict |
|---|---|---|
| **SAME BAT-TIME** (also SAME BAT TIME, BAT-TIME, BAT TIME, BATTIME) | USPTO: none (the nearest, Mattel's dead BATHTIME, BEDTIME, OUR TIME). TMview, all offices: none; "bat time" returns only unrelated COMBAT TIME marks | **No mark found** |
| **BATUSI** | ES M4264522 BATUSI, an individual, **registered**, class 28, filed 2024-04-25. Registered 2025-02-07. US 85429992 CLUSI BATUSI (class 43) cancelled under Section 8 on 2020-01-31; EU 007237613 BATUSSI (wine, class 33) expired 2018. French BATUSINE (expired), Dominican ALBATUSIN (class 5). **None held by DC or Warner** | No DC mark; one live Spanish national mark in toys and games |
| **BATPHONE** (also BAT-PHONE, BAT PHONE) | **EUTM 004057691 BATPHONE, DC Comics: registered** 2006-12-12, filed 2004-10-01, **expiry 2034-10-01**, classes 3, 5, **9** (including "computer software", "interactive computer software", "video and computer game programs"), 14, 16, 18, 20, 21, 24–30, 32, 35, 38, **41** (entertainment, "electronic games services provided via a global computer network"), 42 [59]; its UK comparable UK00904057691, registered; Canada 1413459 BATPHONE, DC Comics, class 9, registered 2010-02-11, expiry 2035-02-11 (an older Canadian filing ended). The EU record also covers classes 25 and 28 and shows no cancellations or oppositions; renewed 2014 and 2024. US: 3019540 (serial 78085718, class 38, registered 2005), first filed by Digital Ingenuity, Inc., opposed by DC (TTAB 91158504, withdrawn 2005) and now recorded in DC's name, **cancelled under Section 8 on 2012-07-06**; DC opposed the 2022 "BAT PHONE" (serial 97709215; opposition 91289874 [60], filed 2024-02-20 on its BATMAN, BATMOBILE, BATWING, BATGIRL and BATWOMAN registrations, won by default 2024-05-24, application abandoned); the other US filings are dead | **Live DC mark in the EU, the UK and Canada, in classes 9 and 41; actively enforced** |
| POW / POW! (DC, Warner, Fox, Greenway only) | USPTO: 64 exact POW / POW! / POW!! marks, 20 live, none by those owners (DC's own "pow" hits are its SUPER POWERS family; Warner's nearest is RIGHT NOW KAPOW, class 41). TMview "pow": 218 records, "pow!": 20; none by those owners | No DC mark |
| HOTLINE (DC, Warner only) | USPTO: none by DC or Warner. TMview: 75 records, none by them | No DC mark (generic word) |
| THE DANCE (DC, Warner only) | USPTO: Warner's DANCE BODY BEAUTIFUL (class 9) and AMERICA'S BEST DANCE CREW (cancelled); TMview: none by them | No DC mark for THE DANCE |

**Not reached:** TSDR's record pages (refused with "too many requests"; US statuses come from the search index and TTABVUE); WIPO's Global Brand Database pages (TMview's WO designations covered it); EUIPO's eSearch page (its JSON record was read); the UK IPO's own page (TMview lists the UK right). TMview's loose "contains" sweep for "bat time" across all offices returned 2,770 records and only the first 300 were read; its exact-word searches for every BAT-TIME spelling were complete and found nothing.

**Inferred:** SAME BAT-TIME is clear as a display name. BATUSI as the Signature's name meets a national Spanish toy mark that is not DC's; as a dance's name in the app it is the show's word, used once. **BATPHONE is DC's registered mark for software and entertainment in the EU and UK, and DC enforces it**: by the rule that dropped FREEFLOW, the Needs-you word becomes **HOTLINE** (the dossier's fallback). This note does not make the legal judgement.

## 8. Unverified items

- **The oval's flat ratio.** 1.39–1.42 as filmed on a curved chest; a flat sticker may be a few percent wider. A photo of [56], or of any flat 1966 sticker, would settle it.
- **Which cut of the bat.** The stickers varied: 1.84–2.18:1 across [54], [35], [21]. The trace follows the sharpest source, [54]; whether the maintainer prefers a flatter cut is for the board.
- **[56] and [57]** were read only through search summaries (HTTP 403, in curl and in a headless browser).
- **The suit's parts** (§4) are Read, with fractions read off gridded crops, not measured by script.
- **The Batusi's poses** are labelled by eye; the tempo and the cuts are Measured. The King Tut episode is the dossier's attribution.
- **The cloud insert's episode** is not named (the upload is a compilation of snippets).
- **The trade mark searches** cover the registers named; national registers outside TMview were not searched one by one.

## 9. Sources

- Images [54]–[58] and records [59] [60], with URLs: §2 and [`references/adam-west.md`](references/adam-west.md); the dossier's [16]–[26], [35]–[50] as listed there.
- Wikimedia Commons, [*Batman for U.S. Savings Bonds, ca. 1966*](https://commons.wikimedia.org/wiki/File:Batman_for_U.S._Savings_Bonds,_ca._1966.webm): public domain, U.S. Department of the Treasury; and the Commons categories "Batman (TV series)", "Adam West" and "Batman (1966 film)", read 2026-10-28 (the publicity stills there are already at full resolution, 459–1379 px wide, black and white).
- USPTO trademark search, https://tmsearch.uspto.gov/search/search-results (backend `https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch`), TSDR and TTABVUE, 2026-10-28.
- TMview (EUIPO's TMDN), https://www.tmdn.org/tmview/ (API `https://www.tmdn.org/tmview/api/search/results`), 2026-10-28.
- YouTube uploads as in the dossier: `K7mb4Jh6mJ0` (S1E1), `SaPqWjkyzzk` (King Tut), `kK4H-LkrQjQ` (titles and snippets, HD).
- In this repo: [`adam-west.md`](adam-west.md), [`jury-wave-3.md`](jury-wave-3.md), [`dark-deco-build.md`](dark-deco-build.md), [`silent-predator-build.md`](silent-predator-build.md), `app/src/shared/emblems.ts`, ADR 0001.

## For the build

- **Source:** trace the chest bat from **[54]**, the 1966 Savings Bonds short (public domain, front-on, the oval whole in 139 frames), as the 60-frame median stack `work-west-build/bonds-stack.png`. [16]/[58] (HD, three-quarter) and [35] [21] (small) confirm the parts; the film's [39] is covered by a glove.
- **Ratios (Measured):** oval **1.39:1** as filmed (1.39–1.42 across sources); bat **1.88:1** traced (1.84 raw; 1.84–2.18 across the series' stickers); bat **79%** of the oval's width (79–85%), **58%** of its height; centred across, 1.6 units of 48 below the oval's centre; no rim. The dossier's 2.6:1 and 1.5:1 are wrong; its 80% holds.
- **Traced polygon:** `BAT_1966` and `OVAL_1966` in §3.5 (120×48 grid, plate `{ box: { x: 26.62, y: 0, width: 66.76, height: 48 }, rim: 0, lights: false }`), and the 16-unit version (oval 16 × 11.5). Parts: ears 8.6 apart, 2.9 tall over a round notch; a 5-unit scoop each side; wingtips pointing up, 0.7 below the ears; **two lobes a side** and a pointed tail. Round one: show it beside [54] on screen.
- **Not the chest bat:** the bat wipe [55] and the Signal on the clouds [17] use a different, tall-eared, long-tailed bat with three scallops a side. If the disc or the Atmosphere's Signal should look like [17], that is a second outline.
- **Brows:** thin pale blue-white strokes, each about 0.2 of the cowl's width, rising outward at about 40° from beside the nose and curling up at the outer end; inner ends about 0.18 apart. **Nose:** a pale edge round the nose piece, about 0.22 of the cowl wide.
- **Ears:** short and pointed on the cowl's top corners, tips at about crown height, about 0.13 of the cowl's width tall: the standard ears, as the dossier chose.
- **Hem:** scallops, five or six a side when spread [46], each about half as deep as wide; hanging, the cape reaches mid-calf. The dossier's three points a side is a fair reduction at 54px.
- **Belt and buckle:** yellow, tall rectangular pouches; the buckle nearly square (1.1–1.3:1), a little taller than the belt, a duller gold than the belt (the dossier's `--buckle` `#8a6a1c` fits).
- **Gloves:** long gauntlets, flared cuffs to mid-forearm. **Trunks:** violet satin, high-cut. **Boots:** short, violet, to the lower calf.
- **Batusi:** held step W1, the V drawn out to the temples, confirmed. The show: about 140 BPM, a pose every two beats (0.85 s, about seven ticks); the V drawn from nose to temples in 0.6 s and on screen 0.72 s until the cut; an eight-beat loop (3.4 s) is in §5.3. Reveal order from the shot: arm up → both arms overhead → V at the nose → V drawn out (held); hold each step several ticks if the engine allows. The low flap [22] fits as the watch beat.
- **Clouds:** the insert's clouds churn in place behind a still Signal (no drift; under 1% of the width a second), as a flat bright bank along the bottom and rounder billows above (edges about 11% of the width), dark navy lit from below (`#172a40` mid, `#2c5f9b`–`#2e64a4` bright). The closing credits have no clouds. A slow sideways drift remains our choice (P).
- **Names:** SAME BAT-TIME **clear** (no mark found). BATUSI **no DC mark** (one live Spanish toy mark, class 28). BATPHONE **live DC mark** (EU, UK, Canada; classes 9 and 41; opposed in the US in 2024): use **HOTLINE** for Needs you.
- **Needs the maintainer:** a flat photo of a 1966 chest sticker (e.g. [56]) if the oval's flat ratio or the cut of the bat matters; and the decision on HOTLINE.
