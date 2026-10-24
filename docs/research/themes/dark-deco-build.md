# Research note: DARK DECO, before the build (the red sky, the chest bat, the poses, HD colour)

Research note, 2026-10-24. Scope: what the Theme dossier [`animated-series.md`](animated-series.md) left unverified (§13) or what the maintainer reopened at the build of DARK DECO (GitHub #145, Linear LUC-86), checked against *Batman: The Animated Series* (Warner Bros. Animation, from 1992, the original series only). Read with the dossier, its reference index [`references/animated-series.md`](references/animated-series.md) and [`jury-wave-3.md`](jury-wave-3.md) §9, whose decisions stand unless this note says the maintainer reopened them.

Provenance key, as in [`dkr-rework.md`](dkr-rework.md): **Read** = seen by us on a reference image, named by its number in the reference folder (`[12]`). **Measured** = taken off that image with a script (colour medians, pixel boxes). **Inferred** = our reading of what those facts imply. The images stay in a scratch folder and are never committed, traced into shipped art from a frame, or shipped (ADR 0001); new entries from [59] on are added to the reference index.

## 1. What the maintainer reopened

At the start of the build (2026-10-24) the maintainer reopened the ground and the Atmosphere, which the jury had settled as neutral black paper (§9, decision 10) under a red sky lit at rest as plain light:

> Fundo pode ser vermelho, mesmo que em algum nível acabe replicando um pouco o tema VENGEANCE. Podemos usar o vermelho do céu do animated series, com nuvens/névoa e dirigíveis flutuando, semelhante a como é na série animada, deixando bem fiel. A mistura do azul/preto com vermelho, talvez numa espécie de degradê.

In short: the ground may be the series' red sky even if it comes near VENGEANCE's red; blue and black blend into the red, perhaps as a gradient; clouds or fog and police blimps (more than one) float across it, as in the show. Fidelity to the series comes first. The Alarm color stays the searchlight yellow (decision 1), so red is free to be resting light. The costs (distance to VENGEANCE's, KNIGHTMARE's and HOLIDAY's grounds; contrast of every text token on the new grounds; Bat-Clawd's orange jaw on a sky of his own hue) are measured in §2 before anything is recorded.

Still decided, not reopened: the yellow alarm `#fee055` / `#fee06b`; the waiting ink `#b7dbfe` and Bone for working; Marcellus SC for display and stamps; the suit `#5a6589`, cobalt cape `#1a3570`, blue rim `#3f63c9`, gold belt `#be9336`; an oval that never lights; Signature S1, the landing; `aura: 'alarmed'`.

## 2. The red sky, clouds and blimps

Sources: the opening's stills and pans [03]–[18] [59]–[64] (SD), Timm's storyboard of the opening [55] (official), episode boards [36]–[40] [65]–[69], HD episode captures [70] [71], and the official upload's thumbnail [72]. The official upload of the remastered opening is Warner Bros. Entertainment's [*Remastered Opening Titles*](https://www.youtube.com/watch?v=rrmUk2YUm14) (from the Deluxe Limited Edition Blu-ray). Sky bands were measured with a script that keeps sky pixels only (dark, or red at h 345–60), so blue tower faces and mist don't shift the medians. Values are CIE LCh, D65.

### 2.1 The gradient: black, crimson, red-orange, black towers, blue mist

The opening's tall pans show the whole sky (Measured, [17] [18], y as a share of the frame from the top):

| Band | [17] (three blimps) | [18] (tower) | [03] (stand) |
|---|---|---|---|
| Top | `#050100` (L\* 0.5), 0–0.10 | `#0a0000`–`#130001`, 0–0.16 | `#480b01`, 0–0.11 |
| Below it | `#280801` (L\* 5.7, h 29), 0.10–0.20 | `#2d0201` (L\* 5.5, h 21), 0.16–0.24 | `#570f01`, 0.11–0.22 |
| Middle | `#3e0c01` (L\* 11, h 36), 0.20–0.50, with dark cloud streaks | `#891e01`–`#9f2901` (L\* 30–36), 0.24–0.48 | `#912301`–`#ac2f01`, 0.22–0.44 |
| Brightest, just above the skyline | `#5b1501` (L\* 19, h 42), 0.50–0.60 | `#b13b01` (L\* 42, h 49), 0.48–0.56 | `#c43e02` (L\* 46, h 48), 0.44–0.55 |

- **The top is black with a crimson cast**, not blue, and the sky brightens downward to a red-orange band just above the skyline. **Hue climbs with lightness**: about h 16–36 while dark, h 44–49 when lit (Measured).
- It is not a rule: some shots are **one flat orange** with no gradient ([05] `#b53405`–`#bf390c`, [59]), others a thin red band over a black skyline [61] [62] (Measured). The episode boards are rosier and paler (h 14–29) [36]–[38] [65] [66]; the HD title cards use the red as a pool of glow on black, not a horizon [44] [45] [47] [50].
- **Blue never blends with the red; black always sits between them** (Read, Measured). Blue appears three ways: as light on the towers' faces and edges ([18] `#273d50`, brightest `#546c80`; [17] `#121c32`); as **a blue-lit mist and rain at street level, under the skyline**, in soft columns rising from a bright base ([59] `#3d4f75`, [60] `#6973a0` to `#8299d0`, [66]); and as the all-blue night skies of other scenes [14] [34] [35]. A blue-to-red blend would make a purple the show never paints. So a faithful gradient runs, top to bottom: **black, crimson, red-orange, black towers, blue mist**.

### 2.2 Clouds and fog

- **In the opening's red skies, clouds are only darker than the sky, never lit at their edges** (Read): soft airbrushed billows in the upper third [03] (darkest `#210401` on `#942501`), long horizontal streaks in layers about every 6% of the pan's height [17] (`#3e0c01`–`#390b01` between lit gaps `#5a1401`–`#6b1a01`), and dark rolling banks framing the top [18] (Measured).
- The opening's last shot has grey-lavender storm clouds lit by the lightning ([72] HD, `#969cb7`). In the episodes, clouds are thin flat violet-black streaks passing in front of the towers ([70], brightest `#372a34`) or a cloud bank seen from above ([71], `#323756`) (Measured).
- **Low fog is the blue mist** of §2.1, in the bottom 20–45% of the frame, behind the figures and in front of the towers [05] [59] [60] [66].

### 2.3 Police blimps

| | The opening [13] [17] and [55] panel 2 | The episodes, HD [70] [71] (*On Leather Wings*) |
|---|---|---|
| How many | **three** in [17] (one near, two far), the same three in [55]; one in [13] | one |
| Hull | **black silhouette**, no outline or rim light: a teardrop seen from below (near), cigar hulls with a tail fin (far), each about one tower wide | pale grey `#83888c`, a black cel outline, tail fins, a gondola, a stern propeller; about 2.2–2.4:1 |
| Markings | "POLICE" in dark red (`#5b1305`) | "POLICE" in black, with a star |
| Lights and beams | **two lamps at the nose, two beams each**, yellow, soft and see-through, laid over the clouds without lighting them; the near pair spread about ±30–35° from vertical, the far ones narrow (1.3–3.5% of the width), near vertical, **crossing each other** | red beacons on top; **one** pale greenish-white beam (`#85877a`) |

**How they move, from the storyboard** (Timm's opening boards as Art of the Title scans them [73]–[75]): the opening starts on the WB shield among clouds, which goes black, lights two lamps and becomes the near blimp [73]; the three blimps and their six beams sit on one board marked "START PAN" with no mark of drift or sweep [74], and Art of the Title describes "the hovering police blimps" as the camera descends; the only beam the boards move travels once across the ground to its target and "fills" the shot [75]. So the camera moves and **the blimps hover**; a beam that moves travels to a target rather than sweeping back and forth (Inferred). Speeds stay ours (P).

The opening's beams are the alarm's own yellow (`#fee06b` was sampled from them, [13]), so under the Alarm color rule the beams stay Bone, as decided; the episodes' pale beam supports that. A faithful hull is black against the red with no rim (Inferred).

### 2.4 The towers

Stepped setbacks and crowns, a ziggurat spire with three antennas, fluted slabs with bevelled tops, streamline bands, a ribbed dome, water towers on low roofs [04] [05] [17] [18] [55] [61]–[64] [69] (Read). **In the distance pure black cut-outs** (76–88% black in [61]'s band), close up black with blue-lit faces (Measured). Windows are sparse dots; in the opening they are near-neutral white (`#c2c6c3`, 8.9 ΔE00 from Bone) [05], so the decided Bone windows are faithful. A dense yellow window grid [63] sits 3.5 ΔE00 from the alarm ink and is ruled out.

### 2.5 The ground: three options and their costs

The contrast test needs opaque hex grounds, so any gradient is a backdrop (as `--haze` is), and the 11 ground tokens stay hex. Every number below was computed by script against the eight shipped Themes' CSS and the 11 grounds of `themeContrast.test.ts`.

- **(a) Red-black**, from the sky's own dark top: `--abyss` `#1d0701` (Measured, [17] y 0.06–0.12), `--surface` `#2d0501` (Measured, [13] top band), `--raised` `#480e12` (P, the sky's hue, chroma tuned to clear KNIGHTMARE), lightest `#4f0d13` (P). The sky's stack is the backdrop: `#050100` 0%, `#2a0901` 20%, `#5a1401` 45%, `#9e2801` 75%, `#c43e02` 90%, then the black skyline (Measured [17] [18] [03]).
- **(b) A gradient ground** with black-paper cards: `#070d18` 0% (a tower blue, [18]), `#050100` 30%, `#2d0501` 70%, `#5a1601` 100%; the cards are the dossier's black paper `#0a0a0b` / `#161617` / `#2a2a2c`.
- **(c) Control**: black paper with the red sky lit behind as `--haze` `#b42f04` at 22% (the jury's decision 10 and the dossier's §4.8).

| | (a) red-black | (b) gradient, black-paper cards | (c) black paper |
|---|---|---|---|
| Nearest shipped surface / raised (ΔE00) | KNIGHTMARE **9.4 / 11.3**, HOLIDAY 10.7 / 12.9 | VENGEANCE **2.6**, WATCHFUL PROTECTOR 7.1 (the cards) | the same as (b) |
| The Wave 2 floors (about 6 surface, 10 raised) | clears both | under, four times (the recorded exception of decision 10) | the same |
| `--ash`, the tightest ink, on the lightest ground | **5.11:1** | 4.61:1 (also on the gradient's bottom stop) | 4.61:1 |
| Bone / `--ink-soft` / `--ink-hot` on the lightest ground | 12.37 / 10.42 / 11.50 | 11.16 / 9.40 / 10.37 | the same as (b) |

- **The ceiling:** wherever text sits, no sky red may show through lighter than about **L\* 19.5** (`--ash` would fall under 4.5:1). `#b42f04` may show at no more than 36–46% over these grounds; the opening's lit band (L\* 36–46) only where nothing is written, behind and between the skyline's towers or under opaque cards (Measured).
- **Bat-Clawd on the red:** on (a)'s surface his orange jaw reads at 5.88:1 (45.4 ΔE00 away), the suit at 3.23, the blue rim at 3.39; the cobalt cape at 1.58, as on black paper (1.54), where the rim already carried it. **On the lit orange band he is lost** (1.65:1, 15.9 ΔE00: the sky is his own hue), and the blue mist would blur him too (8.4 from the suit). So he sits above the lit band, on the dark part of the sky (Measured, Inferred).
- **The VENGEANCE likeness the maintainer foresaw:** opaque, the sky's lit reds sit **5.5–6.2 ΔE00** from VENGEANCE's alarm fill `#af0006` (`#9e2801`, `#b42f04`), and the brightest orange 7.5 from HOLIDAY's `#d05600`. As a ground, (a) and (b)'s dark reds sit 10–28 away, and as a haze at low strength the colour seen is dark and the likeness mostly goes. The yellow alarm stays the hottest thing on screen in every option (its fill 14.1:1 on (a)'s surface) (Measured).

**Decided (2026-10-24): (a)**, picked on screen by the maintainer beside the opening's frames and VENGEANCE, KNIGHTMARE and HOLIDAY ([`jury-wave-3.md`](jury-wave-3.md) §9, decision 18). It was recommended as (P), with the opening's stack as the backdrop: dark crimson at the top, a red band at about 45% behind the cards, the bright orange only behind the black skyline, and a blue mist band at the skyline's foot, below Bat-Clawd. It is the only option that clears every ground floor, the most literal "the ground may be red", and it passes every ink with room. (b) is the closer reading of a gradient ground but brings back black-paper cards at 2.6 from VENGEANCE. Decide on screen, beside VENGEANCE and KNIGHTMARE.

**Black in the red (decided the same day).** The maintainer then asked for tones of black in the red: not another gradient, but the shadow of clouds as in the references. On a board of four strengths they chose the **medium** one (S2). As mocked, in a 320x440 panel: about ten soft black ellipses blurred by 12px, up to about 75% strong where they frame the top corners [18] and about 45–60% where they cross the lit band above the skyline [03], with three flat streaks 3–4px tall at about 40% [17]; only darker than the sky, never lit. The engine draws them its own way and the GIF decides.

Motion was not observed (§6).

## 3. The chest bat and the oval

The dossier measured the oval on two small cel photographs and asked for a sharper source before tracing (its §13). Sources now, sharpest first: Timm's master model sheet *Batman Main Models no. 1* (Feb–Apr 1991, "MASTER") at 1080px [90], the sheet of [19]; an HD capture of the 2018 Blu-ray [92]; DC's licensed standee [56], turned three-quarter, so used for ratios only; the dossier's cel [53].

### 3.1 The dossier's chest came from the one outlier

| | Oval w:h | Bat width / oval width | Bat w:h | Yellow band, bat tip to rim | Touches the rim? |
|---|---|---|---|---|---|
| [90] model sheet, header logo | **1.51** | 0.80 | 1.57 | 3.5% of the width | no |
| [90] model sheet, the figure's chest | 1.55 | 0.77 | 1.60 | 5–10% | no |
| [92] HD Blu-ray | **about 1.66** | 0.82 | about 1.7 | 3–5% | no |
| [56] DC standee | 1.73 | 0.87 | 1.89 | 4.7% | no |
| [53] the cel (the dossier's source) | 1.38 | 0.79 | 2.0 | | no |
| *`OVAL_1989` / `BAT_1989` (PALE MOONLIGHT)* | *1.75* | *0.94* | *1.99* | *none* | *yes, by design* |

(Measured.) The oval is **1.5–1.73:1, about 1.66 as aired**, not 1.4; the bat **nearly fills it** (0.80–0.87 of the width, not 75%), with a thin yellow band all round and never touching the rim.

### 3.2 The bat is the 1989 logo's construction

The master sheet says so in writing: "PLEASE USE LOGO ON ALL MODELS REGARDING BATMAN" [90] (Read). Its chest bat has the 1989 logo's parts: two ears on a flat crown, a slot either side of the head, a wing point beside each slot, two lobes a side underneath, a tail as the lowest point. So the dossier's §9 ("this is not BAT_1989") does not hold. What is true is that the *drawn* bat does not reach the rim.

It is still measurably not PALE MOONLIGHT's (Measured, left halves on the 120x48 grid):
- **short ears** (2.8 units tall on a 10.1-unit head; `BAT_1989`'s are 6.4) on a flat crown;
- **deep narrow slots** with straight walls down to y 18.4, where `BAT_1989` has round bowls;
- **wings that follow the oval without reaching it**;
- two lobes a side (the outer 12.4 units deep) and the tail 2.2 units below the wing tips.

Fitted to the three sharp sources, a traced candidate overlaps them by **IoU 0.66–0.81**; `BAT_1989`, widened into the same plate, by 0.51–0.60. At 3x and on the 64px disc the two read differently: short ears and slots against tall ears and bowls, a yellow band against a bat that meets the rim, a rounder oval. **At 54px on the chest both are a dark bat in a yellow oval**, told apart only by the oval's colour and ratio (Measured on a proof board). The yellow-oval rule (decision 2) covers the colour; whether a shape this close may recur is the maintainer's call.

### 3.3 A first trace

Traced from [90]'s header logo, the left half mirrored at x 60, then widened ×1.10 so the sheet's 1.51 oval becomes the aired 1.66. About 1.79:1, in a plate `{ box: { x: 20, y: 0, width: 80, height: 48 }, rim: 2 }`:

```ts
export const BAT_1992 =
  'M60 7.4 L58.35 7.4 L56.7 4.6 L54.94 5.4 L54.72 14.2 Q54.06 18.4 50.32 18.4 Q46.13 18.4 45.91 14.6 ' +
  'L45.91 10.6 Q46.02 8.2 46.57 6.4 Q34.14 7.4 28.74 15.2 Q26.32 19 26.65 23.2 Q27.09 28.8 31.83 33.2 ' +
  'L40.63 39.8 Q36.45 36.6 37.33 31.4 Q38.21 27.4 41.95 27.4 Q45.91 27.6 47.45 34.4 Q48.99 29.8 52.74 29.8 ' +
  'Q56.92 29.8 57.58 33.6 L60 42 L62.42 33.6 Q63.08 29.8 67.26 29.8 Q71.01 29.8 72.55 34.4 Q74.09 27.6 ' +
  '78.05 27.4 Q81.79 27.4 82.67 31.4 Q83.55 36.6 79.37 39.8 L88.17 33.2 Q92.91 28.8 93.35 23.2 Q93.68 19 ' +
  '91.26 15.2 Q85.86 7.4 73.43 6.4 Q73.98 8.2 74.09 10.6 L74.09 14.6 Q73.87 18.4 69.68 18.4 Q65.94 18.4 ' +
  '65.28 14.2 L65.06 5.4 L63.3 4.6 L61.65 7.4 L60 7.4 Z'
```

This is round one, not a finished trace: HOLIDAY's `BAT_1996` took twelve rounds on screen. Two Q control points lie 0.3 units outside the curve, so `emblem()`'s box comes out about 0.6 units wider than drawn. The aired drawing [92] has wider, shallower slots (6–20 units out, bottoms at y 14–16) and shallower lobes; that is the variant to show beside the model sheet's.

### 3.4 The colours, in HD

In HD the oval is painted with the belt's paint (0.8–1.0 ΔE00 apart in the same frame). The recommended `#b8963a` is 3.0–3.7 from the HD oval in flat light, the fallbacks `#c4a03a` 6.4 and `#c9a53c` 7.8; `#b8963a` is 19.7 from the alarm's fill and 19.2 from its hot ink, 2.04:1 on the suit, and the black bat reads 7.24:1 on it (Measured, §5). **HD supports `#b8963a`.**

## 4. Poses

Without the official video (§6), the opening is read from The World's Finest's stills in their aired order, Timm's storyboards [97] [98] as Art of the Title hosts them (coloured by Eric Radomski), the writers' bible models [90] [91] and HD Blu-ray captures [92] [93].

### 4.1 The landing is three frames, and it ends in a tent

| Step | Frame | What it shows (Read; proportions Measured) |
|---|---|---|
| 1. The drop | [06] | The cape held **over the head** as a wide shallow bow, about 5.5 shoulder widths across, its two ends rising to points; the knees drawn up, apart |
| 2. Landed | [94] | Crouched, **the cape fallen round him like a tent** to the roof on both sides, about 2.2:1; only the cowl and the top of the shoulders above it; the blue rim on the shoulders only; **eyes straight ahead** |
| 3. Risen | [95] | Standing, the cape closed, its hem points at his ankles |

- **[05] is not the landing.** It is a later shot: the crouch before he leaps into the giant bat [04], as the storyboard [98] draws it (Read). The dossier's S1 (a dome with the chest and two bent legs showing) mixes [94] with [05].
- **The held step: the tent (S1b)**, after [94]. At 54px it is a low triangle about 25.6 units wide (x −4.8 to 20.8), the cowl on its top and no legs, from the ears at y 2.4 to the roof at 11.25. Every shipped held step is upright; HOLIDAY's long cape reaches the roof on one side only, a wedge, where the tent is symmetric (Measured on an outline board rendered from `suits.ts`). The tent puts the cape in front of his body, so it needs the Costume Rule's exception for a Signature drawn after its source, as BLUE COLLAR's stand has.
- **The reveal, on the aired frames** (Inferred): the bow above; the bow closing down round him; the tent spread to the roof; the tent settled. The bow cannot be drawn as aired inside the frame (it sits above the ears, and the viewBox ends at y −1), so it shows lowered and cropped, or for a frame only.

### 4.2 Flying

The aired drop [06] holds the cape over the head, which is ANCIENT GRACE's flying outline. The dossier's drop (arms at shoulder height, the cape spread as two wings, legs together) is the storyboard's panel 12 [97] and an HD frame [93] (both hands spreading the cape, ribs, about seven hem points), not the aired frame. At 54px that is close to VENGEANCE's glide; the scallops and the closed legs are the difference. Decide on screen.

### 4.3 Alarmed: black on the red sky

Figures in the opening go black on the red, with white eyes: the thugs with a blue rim [07] [09], Batman's punch with no visible rim [10], and the lunge after the giant bat [96], the cape spread above, its inside lit blue (Read). [96] and [04] are the giant bat, PALE MOONLIGHT's alarmed pose, so that shape is not free. **What is free is the treatment**: the whole figure black but for the white eyes and the blue rim. The dossier's "cape flung open behind a stand" is close to the giant bat in outline; the black legend is what separates it. The punch [10] would be a new shape, but a fist forward meets the Arkham games' alarmed counter (jury §3.7).

### 4.4 Anatomy at small size

| Piece | Read and Measured | On Bat-Clawd |
|---|---|---|
| Ears | Front-on, 0.29 of the cowl's width tall, flush with its sides [91]; HD, 3.1 units on a 10.3-unit head [92] | Taller than the standard ears, as tall as the frame allows (about 1.8 units above the crown), as HOLIDAY's |
| Cape hem | Hooked points, a sawtooth: depth about 0.11–0.15 of the hem's width [90] [56]; symmetric front-on [93] | About 2–2.6 units deep, three a side on an 18-unit hem: deeper than the dossier's 1.5 |
| Collar | The cape's blue wraps the neck, a V at the front [56] [93] | The dossier's half-row of cape blue |
| Gloves, trunks | Black in HD episode frames (`#020202`, with cape-blue highlight lines `#2b3972`) and on [56] (`#03030d`); three fins on each glove, under a unit [56] [90] | The dossier paints them cape blue; black is the HD reading. Decide on screen |
| Belt | A plain band with three or four capsules, no buckle [56] [90] | One row; the capsules vanish |

## 5. HD colour, type and names

### 5.1 HD colour changes no decided value

HD here is fan-hosted Blu-ray material on The World's Finest: its lossless DVD-against-Blu-ray pairs of the opening [120]–[127] [129] and HD grabs of *Nothing to Fear* [128] [132]–[139]; the only official HD is two 1280x720 thumbnails, [72] (also filed as [130]) and [131]. Against the nearest HD sample in flat light (Measured, ΔE00):

| Element | Decided | HD, flat light | ΔE00 |
|---|---|---|---|
| Belt | `#be9336` | `#b98f34` [139] | 1.4 |
| Cape | `#1a3570` | `#273c76` [135], `#283b79` [133] | 2.4–2.5 |
| Cowl's blue band | `#1a3570` | `#263b77` [135] | 2.2 |
| Oval | `#b8963a` | `#b78d37` / `#bf9334` [139] | 3.0–3.7 |
| Suit | `#5a6589` | `#595e7a` [139] | 3.6–4.0 |
| End-credit disc | `#aa1601` | `#9f0000` [126] | 3.2 |

Within HD the same element spreads 3–8 ΔE00 with the scene's lighting, so all of these sit inside it. Most HD episode frames paint the suit greyer and a little violet; moving to them would weaken the black chest bat on the bare suit (3.55 to 2.93:1) and is not recommended. In the episodes the cowl, gloves and trunks are black (`#020202`) with cape-blue highlight lines (§4.4).

**The 2018 remaster regraded the opening's reds** (Measured, the same frame DVD against Blu-ray): the sky from h 38–41 to h 21–28, crimson, 10.0–19.7 ΔE00 away; the searchlight beams from ochre to salmon (11.2); blues barely move (1.8–3.7). So the remaster is a later grade, not a correction: the DVD opening agrees with the dossier's sky (2.7). For the ground (§2.5), it matters only as a direction: option (a)'s surface `#2d0501` already sits 3.8 from an HD episode's red ground `#320007`, and an opaque crimson sky like the remaster's (`#870920`) would sit 6.7 from KNIGHTMARE's alarm fill.

**The searchlight pair stays.** `#fee06b` / `#fee055` come out exactly of [13] again; no HD capture of that shot exists. The episodes' HD searchlights are a deeper gold (`#f1ca33` [132]), 4.2 from PALE MOONLIGHT's gold where the decided pair sits at 7.7, so following them would close on PALE MOONLIGHT. The blimp's beams in the episodes are pale grey [128], which backs the Bone beams.

### 5.2 Marcellus SC, beside the title cards

Marcellus SC (OFL-1.1, one weight) is closest to the plain serif card "I Am the Night" [48] and unlike the Deco monoline, gothic and brush cards (Read); no single face matches the cards, which change lettering every episode. **It is much wider than the Mohave the dossier measured**: PAGING YOU needs 87.8px at 12px against the report margin's 87px, and runs over in the narrow margin and the watch strip; ANSWER ME runs over in the narrow margin. **At 11px every margin and strip word fits**, the tightest PAGING YOU in the narrow margin with 1.3px to spare (Measured with PIL; `stampWidth.test.ts` decides). VENGEANCE already ships 11px stamps. Cinzel is noted for the record only.

### 5.3 Names

- **DARK DECO**: no mark found in USPTO (live or dead), EUIPO or the WIPO Global Brand Database (exact expression), searched 2026-10-24; it is the producers' descriptive phrase.
- **I AM THE NIGHT**, the dossier's second choice, is a **live mark** of Turner Network Television (a Warner Bros. Discovery company), international registration 1475646 in classes 9 and 41, designating the EU, the UK and 35 more territories (EU expiry 24 May 2029); its US filings are dead. That rules it out as a display name and strengthens DARK DECO. The caption "I am the night." is a quoted, credited line, a different use.
- **The line** is Batman's in *Nothing to Fear* (1992): "I am vengeance, I am the night, I am Batman!" in Wikiquote's and The World's Finest's transcriptions, which differ only in punctuation. DC's own clip ("I Am Batman", YouTube `osCNQs0IEpg`) has a thumbnail [131] that is the episode's climax frame (Read); it was not played.

## 6. Open questions

**Motion was not observed.** The official upload could not be downloaded from this machine: YouTube asked to sign in, and reading the maintainer's Chrome cookies, which they allowed, failed (Chrome's app-bound encryption, yt-dlp issue 10927). The maintainer then chose to go on without the video. In consecutive opening stills the red sky and its clouds hold still while the figures move, and Timm's storyboard [55] marks camera pans over one painting; only the blue street mist changes between frames (Measured). So the clouds' drift, the blimps' drift and bob and the beams' sweep are ours (P), decided on screen from a GIF.

Decided on screen at the build (#145; [`jury-wave-3.md`](jury-wave-3.md) §9, decision 19): the chest bat as it aired [92] on its measured 1.60:1 oval; gloves, boots and trunks black; Bat-Clawd black with navy only where the light touches, the cape longer; alarmed in his suit; the Signature with his arms crossed [76] [77], after the landing's tent and the red-sky stand were seen and set aside; stamps at 11px.

## 7. Built in #145

The engine came first: the never-lit plate (#154) and the `skyline` backdrop with the `blimps` Atmosphere (#156); the Theme is #145's PR. As built, its reds hold the L\* 19.5 ceiling under text by the ground and, in the night report, by a veil only where the sky lights.
