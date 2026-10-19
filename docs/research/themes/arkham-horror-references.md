# Research note: SERIOUS HOUSE, back to the book (horror, palette, lettering, Batman)

Research note, 2026-10-19. Scope: what *Arkham Asylum: A Serious House on Serious Earth* (Grant Morrison, Dave McKean, lettered by Gaspar Saladino; DC, 1989) actually looks like on its pages, and how that turns into legal UI moves for the SERIOUS HOUSE Theme. It answers the maintainer's verdict on the first boards (plum-black ground, claret alarm, IM Fell stamps, a watchman's Voice, faint scratches): they do not look like the book, and the Theme should turn the whole app to horror, not recolour it. Read with [`arkham-asylum.md`](arkham-asylum.md) (the dossier), [`jury-wave-2.md`](jury-wave-2.md) §9 and [`dkr-rework.md`](dkr-rework.md), which did the same for ANCIENT GRACE. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

Provenance key, as in `dkr-rework.md`: **Read** = seen by us on a reproduction of a page, cover or original board. **Measured** = taken off that image with a script (pixel statistics, or a gridded crop). **Inferred** = our reading of what those facts imply. References are cited by their number in the scratch folder (`[09]` = `09-page-hostages-batman-silhouettes.jpg`); the folder's `INDEX.md` gives each file's URL and edition. The images are scratch only and are never committed.

## 1. TL;DR

**The dossier's four biggest errors**, each against the pages:

1. **The book is not plum.** Every Batman page we sampled is blue-black: hue 237–290°, the cowl itself `#142a3e`–`#385f82` ([08], [10], [11], [16], [20], [48], [49], [51], [54]; §3). Plum (h 344°) shows on no page. The dossier said so itself ("a choice, not a sample"); the boards built from it look like another book.
2. **The Joker's red is VENGEANCE's red.** His lettering samples at `#d9272d`, its most chromatic pixels `#f11821` (h 33–36°), which is **1.4–4.6 ΔE00** from VENGEANCE's `#e3121b` / `#ec2a2a` (§3.3). The claret `#ec5c94` is a 25° dodge with no page behind it. The book does have an alarm colour; it is taken.
3. **"No green" is false.** Green is the book's second colour after blue: the Joker's hair in every Joker panel, the ivy of Arkham's 1920 homecoming (29% of the page is green, [37]), Clayface ([18], [31]), the Mad Hatter's room ([32], [58]). The Wave 3 reservation of "asylum green" for the games should be reopened, or the Theme gives up the colour the book uses for its villain (§3.4).
4. **The book shows a bat symbol.** The opening's Bat-Signal is a pencil-hatched classic bat in a pool of light ([17], [61]). ADR 0001's exception ("a work shows no bat symbol of its own") was granted on a premise the page contradicts. Three honest ways out are in §5.

**What makes it horror** (§2) is not a hue. It is McKean's method: photographs of a clay mask "adding paint, ink and scratching out the emulsion" (McKean, quoted by [Overstreet](https://www.overstreetaccess.com/?p=90274)); tall vertical strips split by hairline white rules over black ([16], [20], [36], [41]); a page that is half black (50–73% of the pixels under L* 15) with small, paper-white faces and hands; red spatter and the Joker's scrawl as the only hot colour; and a different hand-lettered voice for each speaker. The Theme can take every one of those as texture, layout, type and Voice; most are variables, some need the engine (§6).

**The real palette, and the collision behind it.** Blue-black ink and grounds, paper white, the Joker's scarlet, the Joker's green, and the ochre of Arkham's journal paper (§3). Every dark ground the book offers is already a shipped Theme's: blue-black is WATCHFUL PROTECTOR's (3.4–3.8 ΔE00), cyan-black ANCIENT GRACE's (4.5), neutral black VENGEANCE's (2.0), sepia PALE MOONLIGHT's (1.9), indigo BLUE COLLAR's (3.0). There is no free dark hue that is also true to the book. §3.5 sets out the three real choices, with full ink sets that pass 4.5:1:

- **A. The book's own palette** (recommended for comparison first): blue-black ground (`#0a0d12` / `#151f2f`), paper-white text, scarlet alarm lifted for contrast (`#ff4a3f`, 6.8–10.3 from VENGEANCE), Joker green as the waiting ink, journal ochre as the working ink. It sits 3.8 / 3.8 from WATCHFUL PROTECTOR's grounds and wins distinctiveness on everything else.
- **B. Arkham's journal, a light ground** (`#e6ddc3`): the only light Theme of eight, with ink-black text and a dark scarlet alarm. Unique, true to the journal pages and the original boards, and a large engine and design question.
- **C. Keep the plum**, as an admitted house choice, with the book's scarlet and green moved in.

**Lettering** (§4): Batman speaks in black balloons with white caps, sometimes a black disc ([14], [21], [31]); the Joker in red, jagged, spattered script with no balloon ([09], [29], [33], [38], [44]); Amadeus Arkham in an italic upper-and-lower-case hand in white rough boxes ([28], [37], [45]); Maxie Zeus in electric-blue balloons ([51]); the case files under typewritten headings ("JOKER:", "CROC:") ([33]–[35], [46]). IM Fell English SC comes from the remastered front matter, not from any story page. Open faces that evoke each voice without copying the hand: Covered By Your Grace or Reenie Beanie (the Joker), Kalam (Arkham's journal), Courier Prime (the case files, with a VENGEANCE caution).

**Batman** (§5): a silhouette. Tall, needle-thin ears, about 1.7 times the head's width high; a cape like one huge torn wing, its top corners and tips **curled into hooks**; blue-black all over; **no chest emblem in any of the 25 panels we saw** where his chest could show; no eyes drawn, or a pale glint at most. McKean's own words: the book was to "ignore the usual way the characters are presented" ([Retrofuturista, 2024](https://retrofuturista.com/interview-with-dave-mckean-on-his-surreal-and-arcane-art/)).

**The Voice** (§6.4): the watchman has no source. The book is narrated by Arkham's journal and voiced by people who frighten Batman. The proposal is the house itself speaking to the user at night, in short, uneasy lines, with the respect rules kept.

## 2. What makes it horror, from the pages

### 2.1 The method (Read; McKean's and Saladino's own words)

- **Photographs, paint and scratched emulsion.** On the Joker: "I made a clay mask of the Joker and shot it from different angles and in different lighting states, then used these base photographs in the Joker panels, adding paint, ink and scratching out the emulsion. The end result gives him a manic otherworldly quality compared to the other simply drawn and painted characters, and his grin remains fixed while the energy of the marks and lighting around him creates different expressions" (McKean, quoted in [Overstreet, Aug 2025](https://www.overstreetaccess.com/?p=90274), about Heritage's sale of page 31's original). The Joker panels show it: a fixed white mask under spray and scratches ([19], [40], [59]).
- **A dark dream, not a costume story.** "The book started as a straight man-in-a-batsuit comic story… I felt we should fully commit to [the psychological, Alice in Wonderland feel], and turn it into a much more symbolic story, a dark dream, and ignore the usual way the characters are presented. I attacked each sequence in the way I thought best expressed what was happening" ([Retrofuturista, 25 June 2024](https://retrofuturista.com/interview-with-dave-mckean-on-his-surreal-and-arcane-art/)). He prefers "to paint, draw or photograph my images" and use the computer "minimally" (same).
- **Collage of found things.** The Croc case file is an old engraving of a dragon, a strip of real snakeskin and white paint thrown across it ([46]); the Tower card Batman is shown is a photograph of Frieda Harris's Thoth Tower, not a McKean drawing ([15], compared with the card reproduced by [Sandifer](https://www.eruditorumpress.com/?p=13269)); doll faces are glued to the edge of page 59's board ([41]); an inkblot card sits under the Joker's green nails ([55]).
- **Lettering told to be menacing.** Saladino: Karen Berger "left it up to me to decide how to do it… All Karen asked was that I make everything as menacing as possible! How do you make something as menacing as possible? You try different things and you hope it works out" ([Dial B for Blog #500, archived](http://web.archive.org/web/20200214214950/http://www.dialbforblog.com:80/archives/500/)). He did "ALL his balloons by hand" and the Joker's style is "ink-spattered" (same, the author's words).
- **Restored by the artist in 2019.** McKean's site: the 30th anniversary edition "was finally digitally remastered" ([biography](https://www.davemckean.com/personal/biography/)); the 25th anniversary hardback is the "last edition with old unremastered artwork" ([shop](https://www.davemckean.com/products/arkham-asylum-25th-hb/)); the 15th anniversary paperback is the "original garish printing" ([shop](https://www.davemckean.com/products/arkham-asylum-15th-anno-hb/)).

### 2.2 The page (Read and Measured)

| What | Where | What it does to the reader | UI move |
|---|---|---|---|
| **Tall vertical strips**, 4 to 5 across a page, split by 1–2px white rules on the original boards | [16], [20], [24], [36], [41], [43] | A film strip of glimpses; you never see the whole room | The panel ground split into tall strips by hairline paper rules (§6.1) |
| **Black void columns** on cream board; a whole strip left black | [25], [43], [36] | Something is in the dark you are not shown | One strip of the ground left darker than the rest |
| **Half the page black** | Measured: 50–73% of pixels under L* 15 on [08], [16], [20], [37], [45], [48], [51]; highlights at L* 90+ | Chiaroscuro: faces and hands surface out of nothing | Near-black ground, paper-white text, almost no mid-tones |
| **Silhouettes, never Batman's face** | [05], [08], [09], [10], [16], [31], [32] | The hero is a shape | Bat-Clawd as a shadow with tall ears and hooked cape (§5) |
| **Macro faces**, the Joker's mask filling a panel | [19], [40], [59], [09] bottom | Too close | The Signature or alarmed moment can push close (§6.7) |
| **Hands** reaching, pressed to glass, a shard through a palm | [16], [18], [21], [24] | Touch, threat, self-harm | Hands are out (respect, §7); reaching shadows at most |
| **Red spatter on blue** | [23], [09], [13], [57], [47] | Blood, sudden | Scarlet spatter only when something needs you (§6.6) |
| **Scratches into the paint** and carved graffiti | [20] (wall), [41], [52], [35] | The house is marked by the people in it | Hairline scratches, clustered and white (§6.6) |
| **Thin construction geometry**: compass circles, ruled lines, white or red | [04], [45], [57] | Arkham's occult plan of the house | A still layer of faint arcs and rules (§6.6, engine) |
| **The house**: brick front, tall sash windows, a carved door in fog | [04], [05], [08], [37], [42] | A real English house, not a cell block | Words of rooms and doors, not of hospitals (§6.4) |
| **Checkerboard floors and walls** | [16], [32] | A game board, the mind as a house | A faint checker in the Signature's floor, or not at all |
| **Rhythm**: long silent runs, then a full-page scream | [16] (eight wordless strips), [09] ("April fool" at the foot) | Dread, then shock | Motion that waits, then cuts (§6.7) |

## 3. The real palette, scene by scene

### 3.1 How it was sampled

`sample.py` (scratch `tools-arkham`) takes each image or region and reports the median, "sat15" (the median of the 15% most chromatic pixels), "dark5" (darkest 5%), "bright3" (brightest 3%), the share of near-black pixels (L* < 15), and the share of chromatic pixels (C* > 12) in six hue families. Colour masks (hue window, C* and L* floors) isolate the Joker's ink. All hexes are web scans or phone photos of printed pages or original boards, so they are the image's look, not the paint, and **the edition of every story page is unknown** unless the table says otherwise (`INDEX.md`). None is a confirmed 2019+ remastered story page; see §8.

### 3.2 Samples (Measured)

| Scene | Ref | Median | Most chromatic | Dark L*<15 | Dominant families |
|---|---|---|---|---|---|
| Batman at the door, exterior | [08] | `#222029` (13 7 300) | `#272737` | 54% | blue 7%, violet 2%; 91% neutral |
| Same, Batman's figure | [08] | `#4a4c5b` | `#414359` (29 14 290) | 21% | blue |
| Hostages, top panel | [09] | `#356974` (41 18 219) | `#1d93bc` (57 34 241) | 10% | blue 34%, cyan 18% |
| Same, Batman's silhouette | [09] | `#21414e` (26 14 237) | `#2095bb`; darkest `#00121a` | 18% | blue 59% |
| Batman silhouette (Wikipedia panel) | [10] | `#07050b`; ground `#20374e` (22 17 266) | `#3769a9` | 82% | blue |
| Coin returned, three panels | [11] | `#1c2843` (16 19 282) | `#153e6b` | 47% | blue 53% |
| Same, Batman front-on | [11] | `#385f82` (39 24 263) | `#336994` | 11% | blue 84% |
| Checker floor page | [16] | `#222227` (13 4 291) | `#495a69` (37 11 256) | 52% | 93% neutral |
| Scarecrow page | [20] | `#202631` (15 8 274) | `#4a668c` (43 24 272) | 50% | blue 30% |
| Arkham's dream | [48] | `#040713` (2 6 282) | `#264972` | 73% | blue 32% |
| Batman in profile | [49] | `#2a5677` (35 24 260); cowl `#142a3e` (16 15 265) | `#33648e` | 20% | blue 90% |
| Maxie Zeus | [51] | `#06102e` (5 22 289) | `#083bb0` (30 73 297); balloon `#054c8e` | 55% | blue 30% |
| The axe, the ending | [54] | `#193544` (21 14 247) | `#194d61` | 43% | blue 35% |
| "April fool" with red geometry | [57] | `#14323d` (19 13 235) | `#115561` | 40% | blue 34% |
| Two-Face spread | [26] | `#3e5e61` (38 12 207) | `#3e8ea6` (55 26 230) | 1% | blue 21%, cyan 8%, green 6% |
| "You're free" | [38] | `#234851` (28 14 222) | `#2b778b` | 31% | blue 30%, cyan 9%, green 8% |
| Arkham comes home, 1920 | [37] | `#111e0b` (10 14 137) | `#306214` (37 48 131) | 57% | **green 29%** |
| Mad Hatter's checker wall | [32] | `#3f5559` (35 9 215) | `#4a6f9a` | 35% | green 20%, blue 20% |
| Clayface | [18] | `#2b2f2a` (19 4 138) | `#877f5a` (53 21 98) | 41% | yellow-green |
| Joker panels | [44] | `#474a45` | `#647f4f` (50 30 130) | 19% | blue 12%, red 8%, green 7% |
| Arkham's mother, page 21 (white page) | [22] | `#f2dbd2` (89 10 48) | `#9d3d43` (39 44 23) | 2% | red 28%, **violet 9%** |
| Wheelchair, from above | [24] | `#34333e` (22 7 295) | `#40395d` (26 24 301) | 42% | blue 11%, violet 7% |
| Falling, red spatter | [23] | `#45746d` (45 18 184) | `#aa7241` (53 40 65) | 10% | blue 32%, orange 24% |
| Journal strip, pencil on paper | [36] | `#c9bb86` (76 29 96) | `#c3ae6e` | 2% | ochre |
| Case file, Joker | [33] | `#040202` | `#c2361e` | 79% | red 10% |
| Case file, Clayface | [35] | `#050202` | `#7e3931` (33 35 33) | 76% | rust |
| Original board, opening page | [25] | `#60563f` (37 15 89) | `#9b8c6a` | 34% | sepia |
| Original board, p. 59 (photo) | [41] | `#3f3c38` | `#6b6358` | 24% | 98% neutral |
| Original board, red panel | [43] | `#a05248` | `#ae4032` (43 55 36) | 1% | red |
| Original board, blood drops (Heritage photo) | [47] | `#96191f` (32 59 32) in the red mask | `#d43330` (48 74 34) | 42% | red 19% |
| 1989 cover | [01] | `#0c0607` | red wires `#631e18`, top `#7b201a` (28 47 35) | 84% | red 8% |
| 2019 Absolute cover (remastered) | [07] | `#030606` | `#4b594c` (36 10 146) | 80% | green 4%, ochre 4% |

### 3.3 The Joker's red (Measured)

| Sample | Median | Most chromatic | LCh of the top |
|---|---|---|---|
| Hostages, "April fool" [09] | `#d9272d` | `#f11821` | 51 92 36 |
| Maternity joke [29] | `#ef5344` | `#f55335` | 58 79 40 |
| Case file [33] | `#e1392e` | `#fe3323` | 56 93 38 |
| "You're free" [38] | `#c83f3e` | `#da2629` | 48 80 34 |
| Real face [44] | `#c95755` | `#d0524b` | 52 58 31 |
| Journal page strip [36] | `#b43e37` | `#de3331` | 50 77 34 |
| Red geometry [57] | `#dd5046` | `#ea1e23` | 50 89 35 |
| Two-Face spread, photographed [26] | `#b75142` | `#c44a38` | 48 60 37 |

**It is a scarlet: h 31–40°, C* 58–93, L* 47–58.** It is the only hot colour in the book, used for the Joker's words and for blood, never for decoration. The 1989 cover's wires (`#631e18`) and the remastered title page's oval (`#460505`, dossier) are the same hue, darker.

Distances (ΔE00, computed): the median `#d9272d` is 3.5 from VENGEANCE's `--signal-hot` `#e3121b` and 4.6 from its `--ink-hot` `#ec2a2a`; the top `#f11821` is 3.2 and **1.4**. KNIGHTMARE's crimson `#ff405f` is 12.6–12.9 away, BECOME A BAT's `#f2605e` 11.4–12.8, Clawd `#d77757` 14.7–16.3. **The book's alarm is VENGEANCE's alarm.** The Wikipedia line that the *Absolute* turned the Joker's dialogue "from red and white back to wine red" stays unsourced (dossier §12); if it is true, the remastered red is darker and still at this hue.

### 3.4 Green (Measured, Read)

Green carries the Joker (hair `#31844d` (49 44 149) in [09], `#647f4f` in [44], acid on [13], [19], [38], [40], [55], [59]), Arkham's 1920 garden ([37]: 29% of the page, `#306214` h 131), Clayface ([18]), the Mad Hatter's room ([32], [58]) and the acid blots of page 21 ([22]). It is the book's second chromatic colour after blue, and the one it gives to madness in the Joker's sense. Interior pages do not use it as a ground: grounds are blue-black, cyan or black. So the Theme can keep green off the ground (the Wave 3 games may still want an asylum-green ground) and still use it as an ink. **Decision for the maintainer:** is a Joker-green *ink* (waiting, or the Signature's light) in SERIOUS HOUSE compatible with the reservation? The jury reserved green "as a ground" (`wave-2-brief.md` §4); this note reads that as leaving inks free.

### 3.5 Grounds: the collision, and three choices

Candidate dark grounds taken from the pages, against every Theme's surface / raised (ΔE00, computed; under ~6 / ~10 fails the Wave rule):

| Candidate (surface / raised) | From | VENG | PALE | WATCH | KNIGHT | AG (DKR) | BLUE C | BECOME |
|---|---|---|---|---|---|---|---|---|
| Neutral ink `#101011` / `#1d1d1f` | gutters [24], [16] | **2.0** / 11.2 | 4.5 / 9.5 | 5.5 / 6.7 | 10.7 / 14.9 | 11.6 / 14.2 | 13.4 / 15.4 | 9.9 / 15.8 |
| Cold ink `#0c0f14` / `#171c24` | Batman pages | 4.4 / 14.8 | 6.8 / 13.7 | **3.4 / 3.3** | 12.6 / 18.7 | 10.5 / 12.4 | 12.2 / 13.3 | 12.2 / 20.3 |
| Indigo `#10132a` / `#1b1f3d` | Zeus, coin [51], [11] | 14.0 / 19.4 | 15.8 / 22.0 | 9.7 / 11.2 | 17.5 / 23.4 | 16.9 / 19.4 | **3.0 / 3.6** | 22.8 / 32.8 |
| Teal-black `#061a1b` / `#0b2a2c` | hostages, Two-Face [09], [26] | 10.7 / 24.9 | 12.2 / 19.0 | 8.4 / 10.7 | 20.4 / 27.3 | **4.5 / 4.5** | 19.3 / 23.2 | 10.7 / 16.7 |
| Ivy-black `#0a1409` / `#13230f` | 1920 garden [37] | 8.3 / 24.8 | 9.1 / 17.0 | 11.3 / 19.2 | 17.5 / 26.2 | 11.4 / 17.1 | 20.6 / 28.9 | **4.8 / 7.8** |
| Rust-black `#170b09` / `#271310` | case files [35] | **4.5 / 2.5** | 4.5 / 9.6 | 10.5 / 18.4 | 5.7 / 6.5 | 19.7 / 31.2 | 13.3 / 17.3 | 13.5 / 22.8 |
| Sepia `#16130d` / `#262116` | boards [25] | 2.3 / 10.4 | **1.9 / 3.6** | 9.4 / 15.2 | 9.3 / 11.9 | 13.9 / 18.9 | 17.1 / 24.2 | 7.1 / 9.3 |
| Bruise `#14101c` / `#221a2e` | page 21 [22] | 8.6 / 14.7 | 10.3 / 18.4 | 7.0 / 12.7 | 12.5 / 18.8 | 16.1 / 23.3 | **6.2 / 4.8** | 18.9 / 30.2 |
| *Dossier plum* `#1a0f15` / `#2b1822` | none | 7.1 / 9.2 | 7.8 / 14.5 | 10.2 / 16.8 | 7.9 / 13.0 | 13.7 / 21.7 | 9.5 / 11.0 | 17.3 / 27.7 |

Read plainly: the dark hue wheel is full, and the book's own darks all land on someone. Hue cannot be what makes this Theme distinct; texture, layout, type, lettering and Voice must. The three real choices, each with a complete text-ink set that passes 4.5:1 on all 11 grounds (computed with `colors.py`, WCAG 2.x):

**A. The book's own palette.** Blue-black ground, paper white, scarlet, Joker green, journal ochre.

| Token | Value | From | Worst contrast (on `--notice-hover-top`) |
|---|---|---|---|
| `--abyss` / `--smoke` | `#05070a` / `#080b0f` | Batman's darks ([09] dark5 `#00121a`, [11] `#04060c`) | |
| `--surface` / `--surface-deep` | `#0a0d12` / `#07090d` | same, L* 4 | |
| `--raised` / `--sheet-top` | `#151f2f` / `#0f1520` | the cowl's shadow side ([49] `#142a3e`) darkened | |
| `--notice-hover-top` / `-foot` | `#172235` / `#0e141d` | | |
| `--bone` | `#eef2f4` | bright3 of the blue pages ([11] `#dfe9f4`, [16] `#e7e8eb`) | 14.16 |
| `--ink` / `--ash` | `#c3ccd6` / `#8e9bab` | | 9.82 / 5.64 |
| `--signal-hot` (Alarm) | `#ff4a3f` (59 82 35) | the Joker's scarlet, lifted from `#fe3323` (4.4 apart) to pass | 4.79 |
| `--ink-hot` | `#ff5a4e` | same | 5.18 |
| `--signal` (fill) | `#c0141d`; Bone on it 5.55:1 | the median ink [09] | |
| `--ink-soft` (waiting) | `#86d66a` (79 63 134) | the Joker's hair | 8.99 |
| `--ink-live` (working) | `#dccd9c` (83 26 95) | the journal paper [36] `#c9bb86` | 10.07 |

Distances: grounds 3.8 / 3.8 from WATCHFUL PROTECTOR (**the cost**), 4.2 / 17.6 from VENGEANCE (its surface is also under the ~6 floor; its raised tone is warm brown), 6.7 / 17.4 from PALE MOONLIGHT, 10.6–24.9 from the rest. Alarm 10.3 from VENGEANCE's `--signal-hot`, **6.8 from its `--ink-hot`**, 6.0 from BECOME A BAT's, 9.5 from KNIGHTMARE's, 10.7 from Clawd. Green waiting ink 17.4 from BECOME A BAT's canary (the nearest waiting ink), 53.8 from Clawd. Ochre working ink 8.6 from BECOME A BAT's canary waiting ink and 12.4 from KNIGHTMARE's. **Green on the waiting tier is a risk**: in UI convention green reads as "fine", and a green KNOCKING stamp could be read as all clear by a tired developer (jury §5's test). The alternative swaps the two inks: green for running work (`--ink-live`, it is the colour of the house's life in the book: the 1920 garden, the Joker), ochre journal paper for what waits on you (`--ink-soft`: a note left for you suits KNOCKING and NEW NOTE). Both pass in either role; decide on screen. So A shares its ground family with WATCHFUL PROTECTOR and its alarm family with VENGEANCE, and nothing else with either: the same trade the maintainer accepted for BECOME A BAT's red (6.1, jury §9 follow-up) and ANCIENT GRACE's blue (8.6 / 9.9).

**B. Arkham's journal: a light ground.** The journal pages, pencil pages and original boards are cream and sepia ([14] `#c2bfb5`, [25] `#60563f` board, [36] `#c9bb86`, page 21 white [22]).

| Token | Value | Worst contrast (on `--smoke`) |
|---|---|---|
| `--abyss` / `--smoke` / `--surface` / `--raised` / `--notice-hover-top` | `#d6cbab` / `#cfc3a2` / `#e6ddc3` / `#efe7d2` / `#f3ecdb` | |
| `--bone` (primary text, now dark) | `#1a140f` | 10.41 |
| `--ink` / `--ash` | `#332a20` / `#504535` | 8.03 / 5.34 |
| `--signal-hot` / `--ink-hot` | `#9a0c15` / `#930b14` (scarlet, darkened) | 4.92 / 5.21 |
| `--ink-soft` (waiting, green) | `#1f4e12` | 5.56 |
| `--ink-live` (working, Batman's blue) | `#1d3d63` | 6.31 |

Its surface is 78.8–83.8 ΔE00 from every shipped surface, and the dark scarlet is 11.3–25 from every alarm. It is also the only light Theme: Bat-Clawd's rim, the Atmosphere's paper colour, the Signal disc and every "glow" assume a dark ground, and `--bone` would mean "dark ink". **Engine and design work**, not a variables swap; worth one comparison board because nothing else in the picker would look like it.

**C. Keep the plum** (`#1a0f15` / `#2b1822`), now as an admitted house choice, and move the book's scarlet and green in as alarm and waiting ink. It keeps the jury's distances (7.1 / 9.2 from VENGEANCE) but carries the claret-plum Joker-palette risk the jury flagged, and the boards already showed it reads as a different book.

## 4. Lettering per voice (Read; Saladino's hand is never copied)

| Voice | What the page shows | Refs | Open face that evokes it (licence, Fontsource) | How close |
|---|---|---|---|---|
| **Batman** | Black balloons, white comic caps, often a thin white rim; sometimes a round black disc ("uh!", "DON'T TOUCH ME!"); whispered words in small lower case ("my God.") | [10], [11], [12], [14], [16], [21], [31] | **Gochi Hand** (OFL-1.1) or Patrick Hand (OFL-1.1) in white on a black pill or disc | A generic comic hand; the balloon shape carries it |
| **The Joker** | No balloon. Red, jagged, unequal capitals, thin pen, tails as ruled strokes, ink spattered off the letters, words underlined or enlarged | [09], [19], [29], [30], [33], [36], [38], [44], [57] | **Covered By Your Grace** (OFL-1.1, thin angular caps) or **Reenie Beanie** (OFL-1.1, scratchier); **Sedgwick Ave Display** (OFL-1.1) is heavier, more marker | Near in rhythm, never in letterforms; the spatter is a procedural mask, not his |
| **Amadeus Arkham's journal** | White boxes with rough edges; italic upper and lower case; first letter and key words bold ("FUNERAL", "GHOST") | [23], [28], [37], [45], [48] | **Kalam** 700 / 400 (OFL-1.1), a slanted hand | Close in slant and case; boxes are ours |
| **Maxie Zeus** | Electric-blue balloons, `#054c8e`, top `#0a8cee`, dark caps | [51] | balloon colour only | Not needed in the Theme |
| **Clayface** | Pale cream balloons with wobbly tails | [18], [31] | none | Not needed |
| **Mad Hatter** | Thin wavering hand, mixed case, circled and underlined letters, white on black (case file) | [32], [34] | Nothing You Could Do (OFL-1.1) | Not needed |
| **Case files** | Typewritten headings, underlined: "JOKER:", "MAD HATTER:", "CLAYFACE:", "CROC:" | [33]–[35], [46] | **Courier Prime** 700 (OFL-1.1) or Cutive Mono (OFL-1.1) | Close. **Caution:** a typewriter is VENGEANCE's stamp face (Special Elite) |
| **Front matter** | The Larkin epigraph in an old-style serif (remastered editions) | dossier §4 | IM Fell English SC (OFL-1.1, the WIP) | True to the front matter, absent from the story |

Halloween "dripping" faces (Creepster, Nosifer, Rubik Wet Paint, all OFL-1.1) were rendered too (`tools-arkham/specimen.png`). They read as B-movie posters, not McKean, and Nosifer fails every stamp room. Rejected.

**Stamp widths**, measured with each TTF through PIL the way `stampWidth.test.ts` adds tracking and the box (12px padding + a 1px border each side), Night Report margin / narrowest margin (rooms 101 / 87). The IM Fell row reproduces the dossier's figures (91 / 83 at 10px), so the method matches.

| Face | Size | PERMISSION | AT THE DOOR | KNOCKING |
|---|---|---|---|---|
| Covered By Your Grace | 11px | 75 / 67 | 83 / 73 | 62 / 55 |
| Reenie Beanie | 11px | 78 / 69 | 80 / 70 | 67 / 60 |
| Sedgwick Ave Display | 11px | 81 / 72 | 90 / 81 | 69 / 62 |
| Kalam 700 | 11px | 87 / 78 | 97 / 87 (at the limit) | 75 / 68 |
| Gochi Hand | 11px | 83 / 74 | 88 / 78 | 73 / 66 |
| Courier Prime 700 | 10px | 86 / 78 | 93 / 84 | 72 / 65 |
| IM Fell English SC (WIP) | 10px | 91 / 83 | 101 / 92 (fails) | 83 / 77 |

So the scrawl faces bring back "At the door", which the jury liked and IM Fell could not hold. None of these families is on another Theme's list (Anton, Special Elite, Limelight, Josefin Sans, Syncopate, Big Shoulders Stencil, Archivo, Bangers, Bungee, Shantell Sans, Permanent Marker, Neucha). Legibility of a thin scrawl at 11px is the risk: decide on screen.

## 5. Batman, for a 54px mascot

**Panels read** where his body shows: [04] / [05] (15th cover), [08], [09] (×3), [10], [11] (front-on), [14] (×2, pencil), [15], [16] (×4), [17], [20], [24], [31], [32], [38], [49], [54] (×3), [56]. That is 25 panels or covers.

- **Silhouette** (Read, Measured): almost always a flat shape; his face shows only in profile or from below ([49], [54], [20] panel 2), and then only jaw and mouth.
- **Ears** (Measured on gridded crops of [05] and [10]): tall, straight, needle-thin, parallel, set close together. On [05] they rise about 35px above a cowl about 20px wide (**ear height ≈ 1.7 × head width**), each 3–4px wide; on [10] about 45px. In [14] and [49] they rise straight up, slightly flaring at the tips. They are the tallest ears of any Batman in the picker.
- **Cape**: one great torn wing, often flung to one side as if blown ([04], [05], [08]); its hem ragged, ending in points ([09], [16]). **Its top corners and its tips curl into hooks** like a bat's thumb claws or a devil's horns: two hooks at the shoulders beside the head ([05] at both shoulders, [10], [54]), one at the flung tip ([04], [05]). This hook is the most recognisable mark after the ears, and it survives at 54px as a one-unit curl.
- **Colour**: blue-black all over (§3.2: [09] silhouette darkest `#00121a`, [49] cowl `#142a3e`, [11] front `#385f82` in light). No grey suit, no yellow, no belt seen.
- **Chest emblem: none seen.** In the front-on panel [11] the chest is blue shadow; everywhere else the cape or the dark covers it. No oval and no bat on the chest in any of the 25. (Read; see §8 for what we could not see.)
- **Eyes**: not drawn on the silhouettes; in [38] (first panel) a pale glint where the eye would be. Bat-Clawd keeps his white eyes by the Costume Rule, which here reads as the glint.
- **Gloves**: the same dark as the suit; hands rarely shown on Batman (the hands in [16], [21], [24] are other people's or his in shadow).
- **Iconic poses** (candidates, §6.8): (1) **at the door**, the cape flung sideways, hooked tip up, fog at his feet ([04], [05], [08]); (2) **"Don't touch me!"**, the silhouette beside a round black balloon ([31]); (3) the coin held up ([11]); (4) falling head first through red spatter ([23]); (5) the axe raised ([54], violent; not recommended).

**The bat as an animal** (Read): the 1989 cover's painted bat, wings spread over an empty picture frame, belly fur lit, a thin wing membrane against the dark ([01], [02], [53]). It is the only bat painted from life in the book.

**The bat as a symbol** (Read): the opening page's Bat-Signal, a classic bat pencilled with loose hatching inside a white pool of light over a pencil city ([17], [61], crop `tools-arkham/crop-signalg12.png`). Ears, a scalloped lower edge, the late-1980s outline. So the book does show a bat symbol, though only as the Signal, never on the chest. The emblem options this leaves:

- **E1. The pencilled Signal, our own hatching.** True to the book and to the app (the disc *is* a Signal). The outline is the late-1980s DC bat, which BECOME A BAT already wears, so the shapes would match and only the finish (loose hatching) would differ. Needs ADR 0001 to treat it like any Theme's own symbol.
- **E2. The cover's bat, from life** (the dossier's choice): keeps the ADR exception, but on a new argument (the cover bat is the book's chosen image of the bat; the Signal is DC's standard mark), which the maintainer would have to accept knowing [17] exists.
- **E3. No chest emblem at all**, as on every page; the emblem only on the disc and header, as E1 or E2.

## 6. UI moves

For each surface: what the dossier (and the WIP) proposed, whether the pages support it, and two or three options for the comparison board. **V** = variables and Theme-scoped CSS only; **E** = engine work.

### 6.1 Panel ground and texture

Dossier: plum ground, grain 0.08, cold haze from the right. **Wrong on hue; right that texture leads.** The haze from the right has no source; light in the book comes from a single bulb or doorway, from above or behind ([07], [08], [16], [42]).

- **G1. Strips** (V if a Theme rule may paint the panel's background; E if it needs a layer): the ground split into four tall strips by 1px paper-white rules at 6–10% ([20], [41]), one strip a shade darker ([25], [43]). Cards sit over the rules.
- **G2. Spray** (V): the grain made coarser and blotchier, an `feTurbulence` SVG at a higher frequency, 8–10%, like airbrush speckle over paint ([11], [20], [49]). Our own noise, never a scan.
- **G3. A light from above** (V): the haze moved to the top centre (`--haze-inset` from above, paper white at 4–6%), the bulb of [07] and the lamp of [16]. KNIGHTMARE's haze also comes from above (`-35% -20% auto -20%`); the two would differ by colour only (cold paper white against warm amber).

### 6.2 Typography

Dossier: IM Fell English SC for display and stamps. **Not wrong, but not the story's voice**: it is the epigraph's face, and it cannot hold "At the door".

- **T1. Joker's scrawl** (V): display and stamps in Covered By Your Grace; case titles and body in Barlow; report in Kalam (Arkham's journal).
- **T2. Arkham's journal** (V): display and report in Kalam 700/400; stamps in Covered By Your Grace or Reenie Beanie.
- **T3. Keep IM Fell for the display** (the wordmark and headings) and move only the stamps to a scrawl.

### 6.3 Stamps

Dossier: IM Fell at 10px, 1px box, −1° tilt, spatter mask. **The spatter is right; the box and face are not the book's.**

- **S1. The Joker's ink** (V): no box, the word in the scrawl face, a procedural spatter mask (seeded `feTurbulence` dots off the right edge), −2° to +2° tilt per stamp (seeded), an uneven ruled underline under hot stamps (the existing `--pen-hot` slot).
- **S2. Batman's balloon** (V): every stamp a black pill with a 1px paper rim and white caps (Gochi Hand), hot stamps with a scarlet rim. Quiet, very legible, and it is the book's most constant shape. Note the Night Report's red-ink rule (DESIGN.md: red means a request) holds: only the rim is red.
- **S3. Case-file typewriter** (V): Courier Prime caps, underlined, "PERMISSION:". True to [33]–[35], but a typewriter stamp is VENGEANCE's; use only if S1 and S2 fail.

### 6.4 Voice and Lexicon

Dossier: "the house speaks like a watchman on his rounds". **No source.** The book's narrator is Amadeus Arkham's journal ([28], [37], [45], [48]); its other voices are threats. A journal is VENGEANCE's Voice (Bruce's), so the exit is not the diary but **the house itself, speaking to the user at night**: second person, present tense, short, uneasy, never cruel. The respect list stays as it is (no mad, insane, lunatic, crazy, psycho, inmate, patient, cell, asylum…), even though the book itself uses some of those words; the Theme never mocks illness and never voices the Joker.

Options:
- **W1. The house** (recommended): "The house is holding its breath." · empty Cases: "No one else is awake." · report title: "What the house heard" · close with waiting: "Someone is still at the door." / without: "Every door is shut behind you." (KNIGHTMARE closes on "Get some sleep." and VENGEANCE's empty state is "Gotham sleeps. For now.", so this Voice stays off sleep and "for now") · quit: "Leave the house." · Atmosphere toggle: "Scratches in the paint".
- **W2. The founder's notes** (closer to the book, closer to VENGEANCE): dated, formal, first person ("Tuesday, after midnight. The rooms are still."). Risk: a journal.
- **W3. Batman's balloon**: terse and afraid ("I'm here." "Something's wrong in there.") Risk: Bruce's voice again.

Lexicon: the jury's set mostly holds; the scrawl faces let "**At the door**" (Needs you) back in. KNOCKING (Waiting), LET IN? (Permission), BROKEN (Error) and NEW NOTE (New reply) are untouched. Stalled stays standard ("silent" and "quiet" mean all clear).

### 6.5 Colour

See §3.5: A (blue-black + scarlet + green), B (journal paper, E), C (plum kept). Whichever wins, the Red Means Something Rule is the book's own rule: red is the Joker's voice and blood, nothing else.

### 6.6 Atmosphere (on the 8 fps clock)

Dossier and WIP: the shared `noise` painter, hairlines 20–120px cut one a second, fading over 2–3 s, over four torn paper panes, cold light from the right. **The scratches are right in kind** ([20], [35], [41], [52]); single, faint, evenly spaced hairlines are not how McKean scratches. The panes are a reading of the drawers collage on the front matter, not of a story page.

- **A1. Scratched emulsion** (V, config of the existing painter; E if marks must cluster): hairlines in clusters of 3–6 nearly parallel strokes, 10–60px, brighter (paper white at 12–20%), cut in a burst then left to fade; panes dropped or turned into the four strips of G1.
- **A2. Construction geometry** (E: a new still layer on the noise painter): a few compass arcs and ruled lines in paper white at 3–5%, drawn once from a fixed seed ([04], [45], [57]), under the scratches. When something needs the user, one arc redraws in scarlet.
- **A3. Spatter on alarm** (E: an event layer): when a Needs-you item arrives, a burst of 5–12 scarlet drops lands on the ground in one tick and stays until it is answered ([23], [47]). It is a signal, so it obeys the Red rule. A fog band at the panel's foot ([05], [08]) was considered and left out: it would be the `smoke` painter, which is BECOME A BAT's.

Lightning-like flashes and a flickering bulb stay out (a flash with no news cries wolf, `wave-2-brief.md` §3).

### 6.7 Motion

The book's rhythm is long stillness, then a cut ([16] then [09]). On the shared clock:

- **M1. Cut, don't ease** (V if transition durations are variables): cards and stamps appear in one or two discrete steps, no easing.
- **M2. Boil** (E: stamps on the clock): a hot stamp redraws with a ±1px jitter every two ticks while unanswered, like hand lettering that will not settle. Off under reduced motion.
- **M3. The dark closes in** (V + small E): when something needs you, the haze from above narrows (a vignette that tightens over 4 ticks and holds).

### 6.8 Bat-Clawd: suit, moods, Signature

Dossier: plum-grey suit `#55425e`, tall ears drawn as a front layer, a pale speckled "bleeding" hem, trailing-cape flight, the mirror as Signature. **The ears are right and should be taller still; the hem has no source; the plum-grey suit and the mirror have no page we could find.**

- **Suit** (V + suit data): cowl, cape and gloves in blue-black ink `#070a10`; body lifted to `#26364c` (1.59:1 on the A surface, so it does not vanish, Clawd's jaw 3.89:1 on it), a cold blue rim (Batman's blue `#2095bb` lowered, as `--cowl-edge` / `--cape-rim`).
- **Ears** (suit data; E if the viewBox must grow): one unit wide, as tall as the viewBox allows (y −1), with the tips as the existing front layer; the book's 1.7 × head width would need about 2.5 units above the crown, which needs the overlay layer outside the sprite box or a viewBox change (jury §9.12 said no viewBox change).
- **Cape hooks** (suit data): a one-unit curl at each top corner of the cape beside the shoulders, and one at the tip when the cape is flung. Replaces the speckled hem.
- **Sleeping**: wrapped in the cape, ears up, hooks showing at the shoulders.
- **Flying**: the cape as one wing flung to the trailing side, hooked tip curled (the door pose in motion); not the falling pose, which ANCIENT GRACE's drop owns.
- **Alarmed**: cape flared, hooks up; a black round balloon with a paper rim beside him (overlay), the aura as scarlet spatter.
- **Signature pose options**: **P1 "At the door"** ([04], [05], [08]): standing, the cape flung to one side as a single torn wing with a hooked tip, a band of fog at his feet (overlay). Risk: KNIGHTMARE's coat also blows to one side; flip it left and let the hooks and ears separate them. **P2 "Don't touch me!"** ([31]): the stand with a round black balloon beside his head; reveal: the balloon draws in, its rim, then a white "!". **P3 "The coin"** ([11]; the dossier's alternative). The mirror (dossier) is one of Morrison's five symbols, but no mirror page was found to draw it from (§8).

### 6.9 The 64px Signal disc

Dossier: plum glass; lit as a claret radial lens, or a paper core with a red scrawled loop (L2). **L2 was the right instinct**, and the book adds the key: Batman's black balloon is already a disc.

- **D1. Batman's balloon** (V: `--disc-lens`, `--glass`, rims): unlit, a black disc with a thin, slightly uneven paper rim (an SVG path in the lens list) and the emblem faint inside; lit, the rim turns scarlet and a scarlet scrawled loop and a few spatter dots appear around it; the count in white caps.
- **D2. The Signal in pencil**: lit as a white pool with the hatched bat across it (E1's emblem), unlit as dark paper.
- **D3. The dossier's radial lens**, recoloured to scarlet.

## 7. Constraints kept

- **WCAG**: every text ink in §3.5's sets A and B passes 4.5:1 on all 11 grounds (A's tightest: `--signal-hot` 4.79; B's: `--signal-hot` 4.92). Each is an opaque hex. Glows, rims and the green ink's light stay `color-mix()` only where they are not text.
- **Homage line (ADR 0001)**: no scan, crop or trace of McKean's art is shipped, not even as a texture; spray, scratches, strips, geometry and spatter are procedural. Saladino's hand is never traced or turned into a font: the faces are open families that share a mood, not letterforms. The Thoth Tower card, the engraving in the Croc file and the Larkin poem are other people's work and stay out. The clay-mask Joker never appears. No dialogue is quoted beyond the Lexicon's short phrases ("At the door" is ours).
- **Respect**: no hands pierced, no wheelchairs, no straps or restraint imagery ([21], [24], [38] are what the Theme must not draw); the respect word list from the dossier §5 stands.
- **Distinct from the other seven** (with palette A): VENGEANCE shares the scarlet family (6.8 / 10.3) but not the ground, face, stamps, Atmosphere or Voice; WATCHFUL PROTECTOR shares the ground family (3.8) but not the alarm (47), faces, stamps or Atmosphere (its lit windows against scratches and geometry); PALE MOONLIGHT, KNIGHTMARE, ANCIENT GRACE, BECOME A BAT and BLUE COLLAR differ on palette and every other axis. No Theme uses a green ink (the nearest ink is BECOME A BAT's canary waiting ink, 17.4 away), a scrawl face, balloon stamps or a balloon disc.
- **One Clock Rule**: every moving thing above (scratches, spatter, boil, vignette) is sampled from the 8 fps ticker; nothing is an infinite CSS animation.

## 8. Unverified

- **No remastered story page was sampled.** Every interior sample is from an unknown printing, except [17] (a 2014 French edition, before the remaster) and [24] (Spanish, year unknown). [12] shows halftone dots, so an older printing. The remastered covers [07] and [60] are sampled, the story is not. The "wine red" Joker lettering of the *Absolute* stays unsourced.
- **Not seen**: the mirror scene, Black Mask, Doctor Destiny's pages (the violet face [50] is unidentified), the tower's top and Arkham's last scene in his cell, Batman's chest in full light. "No chest emblem" holds for the 25 panels listed in §5, not for the whole book.
- **The Heritage lot page** for page 31 (`comics.ha.com`, lot 7436-94013) was behind a captcha; McKean's words come from Overstreet's article about it. [47] is a Heritage image found on Comic Art Tracker.
- **Sources of some references were lost** when the earlier agent crashed (03, 05, 06, 09, 13, 18, 19, 22, 27; `INDEX.md`). They were viewed and are cited for what they show, not for their edition.
- **Morrison's annotated script** was again read only through quotation (Sandifer). Karen Berger's afterword and McKean's *Absolute* afterword were not read.
- **Measurements of ears and cape** are from two gridded crops at web size; ±3px.
- **Fonts at 11px**: legibility of the scrawl faces in the real panel, and their WOFF metrics against PIL's TTF figures (expected within a pixel), are untested.
- **Whether green as an ink conflicts** with the games' Wave 3 claim is a maintainer decision, not a finding.

## 9. What this changes (suggestions, not made)

- `app/src/renderer/src/styles/themes/arkham-asylum-1989.css`: grounds, alarm, waiting and working inks per the palette picked in §3.5; `--haze-inset` from above; coarser grain; fonts per §6.2; stamp box, tilt and mask per §6.3.
- `arkham-asylum-1989.fonts.ts`: add the chosen scrawl and journal faces (all OFL-1.1, Fontsource).
- `app/src/shared/atmospheres.ts`, the SERIOUS HOUSE entry: clustered, brighter hairlines; panes dropped or replaced; the engine items A2 and A3 if chosen.
- `app/src/shared/suits.ts`: blue-black suit, taller ears, cape hooks, the chosen Signature.
- `app/src/shared/emblems.ts`: E1, E2 or E3 (§5), after the ADR question is settled.
- `app/src/shared/words.ts`, `SERIOUS_HOUSE_WORDS`: the house's Voice, "At the door" back.
- `arkham-asylum.md` and `jury-wave-2.md` §9: a follow-up recording which of the dossier's decisions the pages overturned.

## 10. Sources

- Dave McKean, quoted in "Joker Art Headlines Heritage Comics & Art Auction", *Overstreet Access*, Aug 2025, https://www.overstreetaccess.com/?p=90274 (Heritage lot: page 31, https://comics.ha.com/itm/original-comic-art/story-page/dave-mckean-batman-arkham-asylum-a-serious-house-on-serious-earth-page-31-original-art-dc-1989-/a/7436-94013.s, not reachable).
- "Interview with Dave McKean on his Surreal and Arcane Art", *Retrofuturista*, 25 June 2024, https://retrofuturista.com/interview-with-dave-mckean-on-his-surreal-and-arcane-art/.
- Dave McKean's site: [biography](https://www.davemckean.com/personal/biography/), [FAQ](https://www.davemckean.com/personal/faq/) ("All Arkham… artwork is gone"), shop pages for the [25th HB](https://www.davemckean.com/products/arkham-asylum-25th-hb/), [25th PB](https://www.davemckean.com/products/arkham-asylum-25thanno-pb/) and [15th PB](https://www.davemckean.com/products/arkham-asylum-15th-anno-hb/).
- Kirk Kimball ("Robby Reed"), "The Treasure Keeper, Part Twelve: Into the Asylum!", *Dial B for Blog* #500, archived at http://web.archive.org/web/20200214214950/http://www.dialbforblog.com:80/archives/500/ (Saladino's words; the case-file and journal images [28]–[35]).
- Elizabeth Sandifer, "All Towers Men Build a Lesson Teach", *Eruditorum Press*, 24 May 2021, https://www.eruditorumpress.com/?p=13269 (the script's symbols; the Thoth Tower; images [14], [15]).
- *The Slings & Arrows Graphic Novel Guide*, "Batman: Arkham Asylum", https://theslingsandarrows.com/batman-arkham-asylum/ (image [44]; the Mad Hatter as "a changing sequence of wrinkled British comedians").
- CBR articles holding images [11], [23], [38], [52], [54]–[58], [61]: https://www.cbr.com/batman-arkham-asylum-dc-horror-comic/, https://www.cbr.com/the-wildest-descent-into-jokers-madness-came-out-30-years-ago/, https://www.cbr.com/arkham-asylum-a-serious-house-on-serious-earth-scariest-dc-graphic-novel/.
- Comic Book Yeti review, https://www.comicbookyeti.com/post/arkham-asylum-a-serious-house-on-a-serious-earth (images [02], [20]); Wikipedia, [File:Saladino's lettering sample.jpg](https://en.wikipedia.org/wiki/File:Saladino%27s_lettering_sample.jpg) ([10]); the rest as listed in `refs-arkham/INDEX.md`.
- Fontsource API, licences checked 2026-10-19: Covered By Your Grace, Reenie Beanie, Sedgwick Ave Display, Kalam, Gochi Hand, Patrick Hand, Nothing You Could Do, Courier Prime, Cutive Mono, Caveat, Caveat Brush, Creepster, Nosifer, Rubik Wet Paint (OFL-1.1); Rock Salt, Special Elite (Apache-2.0); `https://api.fontsource.org/v1/fonts/<id>`.
- In this repo: [`arkham-asylum.md`](arkham-asylum.md), [`jury-wave-2.md`](jury-wave-2.md), [`wave-2-brief.md`](wave-2-brief.md), [`dkr-rework.md`](dkr-rework.md), `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`, `app/src/renderer/src/styles/themes/*.css`, `app/src/shared/atmospheres.ts`.
- Colour maths: WCAG 2.x relative luminance and CIEDE2000 (Sharma, Wu and Dalal, 2005), our own script (`tools-arkham/colors.py`).
