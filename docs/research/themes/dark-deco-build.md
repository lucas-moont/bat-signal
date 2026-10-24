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

**Recommended (P): (a)**, with the opening's stack as the backdrop: dark crimson at the top, a red band at about 45% behind the cards, the bright orange only behind the black skyline, and a blue mist band at the skyline's foot, below Bat-Clawd. It is the only option that clears every ground floor, the most literal "the ground may be red", and it passes every ink with room. (b) is the closer reading of a gradient ground but brings back black-paper cards at 2.6 from VENGEANCE. Decide on screen, beside VENGEANCE and KNIGHTMARE.

_Motion (cloud drift, the blimps' drift and bob, the beams' sweep) is checked on the official video in §2.6._

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

_Pending: the landing step by step, the drop, the black silhouette on the sky._

## 5. HD colour, type and names

_Pending: the dossier's hexes resampled from HD sources, Marcellus SC beside the title cards, the trademark check on DARK DECO, and "I am the night."_

## 6. Open questions
