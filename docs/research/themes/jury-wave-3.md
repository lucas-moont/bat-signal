# Design jury: Wave 3 Themes

> **Decided 2026-10-23: see §9.** The maintainer's decisions override this note's recommendations where they differ. Most followed them; the exceptions are decision 1 (TAS's alarm becomes the searchlight yellow, not the rim blue), decision 9 (Lego goes further than P1) and a new rule: colours every version of Batman shares may recur across Themes. LUC-85's "Arkham games × Nolan" is judged here as FREEFLOW against WATCHFUL PROTECTOR, and "Long Halloween × Year One" as HOLIDAY against BECOME A BAT.

Jury note, 2026-10-22. Scope: the five Wave 3 dossiers in this folder, [`animated-series.md`](animated-series.md) (DARK DECO), [`long-halloween.md`](long-halloween.md) (HOLIDAY), [`arkham-games.md`](arkham-games.md) (FREEFLOW), [`adam-west.md`](adam-west.md) (SAME BAT-TIME) and [`lego-batman.md`](lego-batman.md) (VERY DARK GREY). They are judged against the brief ([`wave-3-brief.md`](wave-3-brief.md)) and its rules ([`wave-2-brief.md`](wave-2-brief.md) §2), the claims table ([`claims-wave-3.md`](claims-wave-3.md)), each other, the seven shipped Themes as built at v1.3.0 (`app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `words.ts`), and the paused SERIOUS HOUSE as kept on `feat/123-serious-house` (its stylesheet and `arkham-horror-references.md`). `PRODUCT.md`, `DESIGN.md` (the Costume Rule), `CONTEXT.md` (the Alarm color) and ADR 0001 hold throughout. The scoring rules are [`jury-wave-2.md`](jury-wave-2.md) §1, and its Wave rules (§3, end) still apply. Its §9 decisions are not reopened.

**How it was judged.** The jury did not trust the dossiers' self-scores. It recomputed every distance and contrast that a verdict rests on with its own script (`tools-jury/colors.py` in the scratch folder, written fresh: it reproduces Sharma, Wu and Dalal's test pairs, 2.0425 and 27.1492, and the earlier juries' 14.6 for `#ff405f`–`#e3121b` and 6.1 for `#f2605e`–`#ff405f`). The shipped values are read from `main`'s stylesheets, SERIOUS HOUSE's from its branch, and the drafts' from each dossier's token map. Every number below is in a `.txt` beside the scripts (`checks.txt`, `matrix.txt`, `orange.txt`, `extra.txt`, `sweep_*.txt`, `stampfit.txt`). Colour distances are CIEDE2000 (ΔE00). Under ~3 a difference is hard to see; above ~10 it is plain. Contrast is WCAG 2, against the test's own line (`themeContrast.test.ts` asks `>= 4.5` on the raw ratio, with no rounding).

Everything is judged at the real size: the 64px disc, the 320x440 panel, and Bat-Clawd at 54–78px. One grid unit is about 1.9px at 54px. Visual calls go to the maintainer as **eleven boards** in `…/scratchpad/boards-jury/` (scratch, never committed), each with the options labelled A/B/C in the image and the source frames beside them (§7). The Bat-Clawds on the boards are drawn from the dossiers' words and hexes on the shared grid; they are not the engine's drawings.

Short names below: **TAS** (DARK DECO), **TLH** (HOLIDAY), **Games** (FREEFLOW), **West** (SAME BAT-TIME), **Lego** (VERY DARK GREY); the shipped Themes and SERIOUS HOUSE by their display names.

## TL;DR

- **All five stay.** Every pair clears 3 C axes; the lowest is 3 (six pairs, §1). No Theme is in Snyder's Wave 1 position.
- **The dark corner and the warm corner are full.** This is the wave's main finding, and it changes how the rules can be read.
  - *Grounds.* No dark ground at TAS's lightness clears ~6 (surface) and ~10 (raised) from all twelve other Themes. We swept 72 hues, 9 chromas and 3 lightnesses. The only pair that passes is a green-grey squeezed between the Games and BECOME A BAT, which nothing in the show supports (§3.1, board 10).
  - *Warm alarms.* Once one Theme keeps the jack-o'-lantern, the best warm alarm left for the Games sits 10.4 from its nearest colour, and it is a muddy olive. So the Games' amber stays at 9.2 from PALE MOONLIGHT's gold, with fills 4.4 apart (§3.3, board 11).
- **The alarms are one coupled question, not five.** We tried every combination of the drafts' options (`checks.txt` §3).
  - **Recommended:** HOLIDAY keeps the orange, TAS takes its rim blue, the Games keep the amber, West keeps the violet and Lego keeps the magenta. The closest pair of alarms is then 9.2 apart (the Games and PALE MOONLIGHT), the next is 10.9 (TAS B and West), and none is within 13.2 of Clawd.
  - If TAS keeps the red sky instead, it sits 9.7 from Clawd and 7.0 from HOLIDAY.
  - If HOLIDAY gives up the orange, its only fallback lands 5.0 from Lego's magenta.
- **One rule needs a reading from the maintainer** (§3.6). "The Alarm color appears nowhere else" was met in PALE MOONLIGHT by an *unlit relative* of the alarm at rest: two small brass parts, 27.2 from the fill. West's violet satin covers nearly all of Bat-Clawd at rest and sits 17.5 from its fill. Under the recommended orange plan, TAS's cobalt cape sits 16.3 from its blue fill: the same case.
- **Type:** two Wave 2 rules are broken.
  - Three stamp faces share one register, the condensed grotesque (WATCHFUL PROTECTOR's Big Shoulders Stencil, TAS's Mohave, HOLIDAY's Sofia Sans Extra Condensed). Fix: TAS sets display and stamps in Marcellus SC, and HOLIDAY stamps in Federo. Both fit the stamp rooms (`stampfit.txt`).
  - TAS's Federo sits in PALE MOONLIGHT's Deco register; the same swap fixes it.
- **Engine:** six engine PRs (§6). The first one is shared: an emblem plate that never lights (TAS, West and Lego all ask for it). Lego's pieces are the biggest change. They are mandatory for that Theme, all static paint, and need a CPU measurement before merge.
- **Fourteen questions** in §7, eleven of them with a board. The biggest are the orange (1), the rule reading (6) and the full near-black corner (10).

## 1. Distinctiveness matrix

The scoring rules are unchanged ([`jury-wave-2.md`](jury-wave-2.md) §1). C = clearly different, ~ = close, = = same.

- **Palette:** ground, Alarm hue and working ink; two of three differ → C.
- **Type:** display and stamp family; the same register counts as ~.
- **Silhouette:** ears, hem and chest, each at 1 grid unit or more; two of three → C.
- **Atmosphere:** what moves, how it moves, and the light; two of three → C.
- **Voice:** the frame and the register.

A Theme stays only with C on at least 3 axes against every other. Each draft is scored **as drafted** (its recommended options). Grounds are given as surface / raised ΔE00, from `matrix.txt`. "Bone" means two Themes both run in their text white, which counts as the same working ink.

**The five drafts against the shipped Themes and SERIOUS HOUSE**

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| TAS – VENGEANCE | C: 2.6 / 12.3 (surface under the floor); red sky vs red 16.5; blue-white vs amber 42.0 | C | C: oval vs dash; deep scallops vs zigzag; same ears | C (narrow): a blimp drifting vs rain; both red and low | C: cards vs journal | **5** |
| TAS – PALE MOONLIGHT | C: 4.4 / 9.6 (both under the floor); 32.1; working 10.9 | ~: Federo and Limelight are both Art Deco display | ~: two ovals, two scalloped hems, same ears | C: blimp vs snow | C | **3** |
| TAS – WATCHFUL PROTECTOR | C: 5.2 / 7.1 (both under); 50.7; 18.8 | ~: Mohave and Big Shoulders Stencil, both condensed stamps | C | C (narrow): two skylines along the bottom; a blimp vs a window switching; red band vs mercury | C | **4** |
| TAS – KNIGHTMARE | C | C | C | C | C | **5** |
| TAS – BECOME A BAT | C: 9.8 / 15.1; 15.1; 26.9 | C | ~: same ears; scallops vs four points; oval vs a black bat (C) | C | C | **4** |
| TAS – ANCIENT GRACE | C | C | C | C | ~: both television; a card vs a broadcast | **4** |
| TAS – BLUE COLLAR | C | C | C | C | C | **5** |
| TAS – SERIOUS HOUSE | C: 3.0 / 9.1 (both under); 11.2; 42.8 | C | C | C | C | **5** |
| TLH – VENGEANCE | C: 9.6 / 11.9; 22.7; Bone vs amber 28.5 | ~: Sofia Sans XC stamps in Anton's condensed register | C | C | C | **4** |
| TLH – PALE MOONLIGHT | C | C | C | ~: both pale things falling; pages tumble, flakes don't | C | **4** |
| TLH – WATCHFUL PROTECTOR | C | ~: two condensed stamp faces | C | C | C | **4** |
| TLH – KNIGHTMARE | C: 8.3 / 15.2; 27.3; Bone 11.7 | C | C | ~: pages and ash both cross; the light differs | C | **4** |
| TLH – BECOME A BAT | C: 20.2 / 31.9 | C | C: long ears, a bell vs four points; the chest is ~ | C | C: the mob vs Gordon | **5** |
| TLH – ANCIENT GRACE | C | C | C | C | C | **5** |
| TLH – BLUE COLLAR | C: 9.3 / 11.3 | C | C | C | C | **5** |
| TLH – SERIOUS HOUSE | C | C | C (narrow): ears the same height (2.2 vs 1 unit at the base); a smooth bell vs a hooked cape; a bat vs none | C | C | **5** |
| Games – VENGEANCE | C: 11.4 / 29.3; 40.6; 30.8 | C | ~: same ears; points vs zigzag; a tone-on-tone bat (1.96:1) against a dash (1.52:1): neither chest shows at rest | C (narrow): **rain both**; straight vs slanting; green above vs red below | C | **4** |
| Games – PALE MOONLIGHT | C: amber vs gold **9.2** (~), but ground and working ink differ | C | ~ | C | C | **4** |
| Games – WATCHFUL PROTECTOR | C | ~: squared techno vs wide geometric, both "tech" | C | C | ~: Mission and Objective vs Op and On you, both tactical | **3** |
| Games – KNIGHTMARE | C | C | C | C | C | **5** |
| Games – BECOME A BAT | C: **6.1** / 10.9 | C | ~ | C | C | **4** |
| Games – ANCIENT GRACE | C: 11.0 / 16.3; both Bone 4.5 | C | C | C | C | **5** |
| Games – BLUE COLLAR | C | C | C | C | C | **5** |
| Games – SERIOUS HOUSE | C | C | C | C | C | **5** |
| West – VENGEANCE | C | C | ~: same ears; points vs zigzag; oval vs dash (C) | C | C | **4** |
| West – PALE MOONLIGHT | C | C | ~: two ovals | C | C | **4** |
| West – WATCHFUL PROTECTOR | C: 10.1 / 11.1 | C | C | C | C | **5** |
| West – KNIGHTMARE | C | C | C | C | C | **5** |
| West – BECOME A BAT | C | C | ~ | ~: both soft puffs on the `smoke` painter; high and crossing vs low and rising | C | **3** |
| West – ANCIENT GRACE | C | ~: two comic display faces (Luckiest Guy and Bangers) | C | C | ~: both television; a drama narrator vs a news anchor | **3** |
| West – BLUE COLLAR | C: 9.3 / 11.3 | C | C | C (narrow) | C | **5** |
| West – SERIOUS HOUSE | C: 13.3 / **9.3** | C | C | C | C | **5** |
| Lego – VENGEANCE | C: 10.9 / 17.4 | C | C | C | ~: both Batman in the first person; a performance vs a journal | **4** |
| Lego – PALE MOONLIGHT | C | C | ~: two ovals | C | C | **4** |
| Lego – WATCHFUL PROTECTOR | C: 8.7 / **9.7**; 36.9; 23.1 | C | C | C | C | **5** |
| Lego – KNIGHTMARE | C | C | C | C | C | **5** |
| Lego – BECOME A BAT | C | C | C | C | C | **5** |
| Lego – ANCIENT GRACE | C | C | C | ~: both a band crossing the panel | C | **4** |
| Lego – BLUE COLLAR | C | ~: heavy capitals, Bungee's register | C | C | C | **4** |
| Lego – SERIOUS HOUSE | C | C | C | C | C | **5** |

**The five drafts against each other**

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| TAS – TLH | C: 10.0 / 16.1; **red sky vs orange 7.0** (~); 18.3 | ~: **two condensed stamp faces** (Mohave, Sofia Sans XC) | C: long ears, a bell, a small bat vs standard ears, scallops, an oval | C | C | **4** |
| TAS – Games | C: 10.8 / 18.0; 25.4; 17.4 | C | ~: same ears; scallops vs points; oval vs wide bat (C) | C: a blimp vs rain | C | **4** |
| TAS – West | C: 14.6 / 17.0; 46.7; 19.1 | C | ~: same ears; scallops vs points; **an oval each** (2.9 apart) | ~: one slow thing crossing a night sky (a blimp vs clouds) | C: cards vs narration | **3** |
| TAS – Lego | C: **8.8 / 7.0**; 38.6; 13.9 | C | ~: same ears; scallops vs a straight bell; **an oval each** | C | C | **4** |
| TLH – Games | C: 23.6 / 39.6; 18.7; Bone 7.8 | C | C | C | C | **5** |
| TLH – West | C: 16.8 / 21.5; 51.4; Bone 3.5 | C | C | C | C | **5** |
| TLH – Lego | C: 13.1 / 18.6; 44.0; Bone 4.8 | C | C: long ears, no oval. **Two bell capes** | C | C | **5** |
| Games – West | C | C | ~: same ears; points each; wide bat vs oval (C) | C | C | **4** |
| Games – Lego | C: 15.7 / 21.1; 56.8; Bone 6.1 | ~: Russo One and Oxanium, two squared display faces | C: cloth bell vs pointed hem; oval vs wide bat. **But the suits are 3.6 apart** | C | C | **4** |
| West – Lego | C: 12.9 / 15.2; 16.9; Bone 5.7 | ~: heavy rounded stamp capitals (Changa One, Luckiest Guy) | ~: same ears; points vs bell; **two ovals 3.9 apart** | C | C: sincere camp vs self-parody (the line both dossiers drew) | **3** |

**Result:** every pair passes, and the lowest score is 3, six times: TAS – PALE MOONLIGHT, TAS – West, West – BECOME A BAT, West – ANCIENT GRACE, West – Lego and Games – WATCHFUL PROTECTOR. The dossiers' own scores hold, with two corrections:
- TAS – TLH is 4, not 5. Neither dossier saw that their stamp faces share a register.
- The Games' chest is "~" against VENGEANCE: a tone-on-tone bat at 1.96:1 does not show at rest, as VENGEANCE's at 1.52:1 does not.

**After the §3 changes:**
- TAS – PALE MOONLIGHT: Type becomes C with Marcellus SC. That makes **4**.
- TAS – TLH: Type becomes C (Marcellus SC against Federo stamps), and the alarms move 46 apart. That makes **5**.
- TLH – VENGEANCE and TLH – WATCHFUL PROTECTOR: Type becomes C with Federo stamps. That makes **5** each.
- TAS – WATCHFUL PROTECTOR: Type becomes C (no condensed stamp face left in TAS). That makes **5**.
- The other "3"s stay. All are inherent to the sources (West's classic suit and its comic television), and none breaks a rule.

## 2. Verdict per Theme

- **TAS (DARK DECO): keep, with changes.** It has the most careful sourcing in the wave and the most honest costs. Its central finding, that the red sky is Clawd's own hue, is right and measured.
  - **Alarm:** take B, the rim blue (§3.2; question 1). Its own dossier says B wins if either other orange stays. The red sky stays as light at rest, and so does the skyline.
  - **Rim at rest goes neutral under B.** The blue rim `#3f63c9` sits 7.5 from B's fill, so the Costume Rule takes it off. The cobalt cape stays; it is the rule reading of question 6.
  - **Inks under B:** keep the drafted ones, not the dossier's B set (`tas_b_inks.txt`). The B set's orange waiting ink `#ff9a5c` sits 9.4 from HOLIDAY's alarm and 9.5 from WATCHFUL PROTECTOR's waiting ink. The searchlight yellow `#fee06b` stays (65.4 from B). The blue-white working ink `#b7dbfe` sits 20.4 from B's hot, about what ANCIENT GRACE ships between its own alarm and working ink (20.5): check it on screen, with Bone (37.3 from B) as the fallback.
  - **Tokens under B:** `--blood` becomes a dark blue-violet, the off-shade of B, for the unlit lens rim and the waiting rule. The red sky moves to its own `--sky` token, as light. `--disc-bat-edge` in `#3f63c9` drops: on the unlit disc it would be the alarm's family at rest.
  - **Ground:** black paper (G1) as a recorded exception (§3.1; question 10). The surface is 2.6 from VENGEANCE's, and no free ground exists.
  - **Type:** Marcellus SC for display and stamps, its own alternative (§3.4). PERMISSION measures 80.0 / 87 in the narrowest room at 11px, PAGING YOU 85.7 / 87. Federo goes to TLH's stamps.
  - **Chest:** keep C1, the bright oval, never lit (§3.5; question 2).
  - **Signature:** S1, the landing (§3.7; question 5).
  - **Atmosphere:** the `skyline` kind keeps the blimp and its beams, which go to TAS alone. Under B, the "haze follows the needs-you state" ask drops: the sky no longer lights for the alarm.
  - **Alarmed pose:** "black on the red sky" needs a second look under B, because the aura is then blue. Decide on screen.
  - **Credit:** the `film` field must not begin with "after" (`words.ts` adds it).
  - **Voice:** "No cases tonight." is also the start of West's empty-Cases line; one of them changes (§3.9).
- **TLH (HOLIDAY): keep, with changes.** Its way out of BECOME A BAT works: holidays as named days, the Roman's table, the wine ground, the long ears.
  - **Alarm:** keep the jack-o'-lantern `#fe7500` (§3.2).
  - **Aura:** keep `aura: 'alarmed'`. Its dossier says an orange alarm works "only with `aura: false`", because the aura is 1.16:1 on Clawd's jaw. But BECOME A BAT ships an aura at 1.01:1 and 10.4 ΔE00 from Clawd; TLH's 13.2 is wider. `aura: false` needs no engine work (`Suit.aura` is optional) and stays the fallback if the board says so.
  - **Stamps:** move to Federo at 11px (§3.4). PERMISSION fits at 83.2 / 87, the narrowest room, as its own dossier measured. Grenze Gotisch keeps the wordmark and headlines. The holiday dateline ("HALLOWEEN IN 9 DAYS") follows the stamps into Federo, so Sofia Sans Extra Condensed leaves the Theme.
  - **Suit:** the lit blue-grey body `#6a88a2` is the brightest 5% of the #9 chest. Sale draws that body mostly in blue and black shadow [tlh 24]. Option S2 (the body in the cape's blue) is more faithful and moves it 17.1 from TAS's suit, at the cost of a chest bat at 2.10:1. Decide on screen (question 4).
  - **Belt:** gold. TAS's and West's are gold too (2.3 and 4.1 apart); see §3.5.
  - **Lexicon:** A WORD and ON ICE need the glance test (§4).
  - **Atmosphere:** the pages. Keep the tumble, so they don't read as PALE MOONLIGHT's snow.
- **The Games (FREEFLOW): keep, with recorded costs.** It finds what is the games' and not the book's, and states every cost it can see.
  - **Alarm:** keep the amber, as a recorded exception (§3.3). The hot is 9.2 from PALE MOONLIGHT's gold and the fill **4.4** from its fill, which the dossier did not report. No warm alarm is left: the sweep's best is 10.4 from its nearest colour, and it is an olive. Use the dossier's L1 disc (dark glass, amber rim, amber-edged bat), so the lit disc differs from PALE MOONLIGHT's by form as well as hue.
  - **Ground:** green, as drafted (question 3). The surface is 6.1 from BECOME A BAT's, at the floor.
  - **Suit:** keep the grey armour. Lego's torso moves instead (§3.8).
  - **Signature:** the gargoyle (§3.7). **Flying:** the grapnel stays the Games'; Lego's flying pose moves (§3.7).
  - **Alarmed pose:** the counter (both fists up, the cape flung back) is West's fight pose without the burst. Give it something of its own, for instance the fins and one fist forward. Decide on screen.
  - **Lexicon:** INCOMING may read one tier too severe (§4).
  - **Atmosphere:** plain rain (A1). The searchlights go to TAS.
- **West (SAME BAT-TIME): keep, with one rule reading.** The strongest single idea in the wave is that POW! is a balloon beside a clear word, not a Lexicon word. Its navy finding is right (§3.10).
  - **Alarm:** V, the satin's violet, if the maintainer accepts the rule reading of question 6.
    - The fallback R `#fc5936` passes contrast on all 11 grounds, but only just: 4.534:1 on `--raised`, and 4.52 on G2's raised tone.
    - It costs 8.4 from Clawd and 4.9 from SERIOUS HOUSE's scarlet.
  - **Ground:** G1, the credits navy. Its raised tone is 9.3 from SERIOUS HOUSE's, which is noted for when that Theme returns (§8).
  - **Chest:** the bright oval with no rim (question 2).
  - **Brows:** under the floor at 54px; decide on screen at 78px.
  - **Lexicon:** FOILED can read as "the villain was stopped", which is good news; change it or fall back to ERROR (§4).
  - **Voice:** "No cases tonight." changes (§3.9).
  - **Atmosphere:** the clouds. Draw them as flat bands rather than round puffs, to step off BECOME A BAT's smoke.
- **Lego (VERY DARK GREY): keep, with the pieces mandatory.** Its legal note is the most concrete in the project, and its line against West is clear.
  - **Alarm:** M, the neon magenta. It crosses no live rule (§3.6): the "no pinks" line is stale, because Wave 2's follow-up released newsprint magenta when BECOME A BAT took red. Only BLUE COLLAR's waiting mauve stands, 11.5 away and in another role. Note that the neon reads pink in [lego 33] and redder in [lego 39].
  - **Pieces:** studs, tiles and corners are mandatory (§3.8; question 9). Without them the ground is 8.8 / 7.0 from TAS's.
  - **Torso:** black (S-B), as "IN BLACK" [lego 44] and the 1080p frame [lego 33] show it. That is 15.4 from the Games' armour; the drafted grey is 3.6 away.
  - **Wordmark:** Bone, its own fallback. The cards' yellow `#f2c21c` is 3.7 from PALE MOONLIGHT's gold alarm, at display size.
  - **Flying:** not the grapnel swing, which is the Games' flying pose (§3.7).
  - **Lexicon:** HELLO? and AUTOGRAPH? need the glance test (§4).
  - **Credit:** settle one form. The TL;DR gives "The LEGO® Batman Movie (2017)" and §13 "after The LEGO® …".
  - **Report variant:** the building-instructions report is optional (question 9).

## 3. Cross-theme collisions

Tie-breaks, unchanged from Wave 2, in order:
1. A collision inside a Theme outranks one between Themes.
2. The Theme whose source owns the contested thing most strongly keeps it.
3. Between a draft and a shipped Theme, the draft moves.
4. When one side has an in-frame alternative and the other doesn't, the side with the alternative moves.

### 3.1 The near-black corner is full (question 10, board 10)

TAS's black paper (`#161617` / `#2a2a2c`) breaks the Wave 2 floors four times:
- surface 2.6 from VENGEANCE, 3.0 from SERIOUS HOUSE and 4.4 from PALE MOONLIGHT;
- raised 7.1 from WATCHFUL PROTECTOR, 9.1 from SERIOUS HOUSE and 9.6 from PALE MOONLIGHT.

The dossier calls this "the near-black problem every Theme shares". It is not: the rule is about the surface and raised tones, not the abyss.

We swept for a ground that does pass (`sweep_ground.txt`, `sweep_ground2.txt`). With twelve Themes nothing at L* 7.5 / 17 passes at all. The best pair at any of three lightnesses is `#161b18` / `#26312c`, a green-grey 6.0 / 10.2 from the Games, and nothing in the show is green-grey. Against the shipped Themes alone, free room exists only in two places, a saturated green and a wine, and both are now drafts (the Games, TLH).

Other near misses in the wave:
- the Games' surface is 6.1 from BECOME A BAT's, at the floor;
- West's raised tone is 9.3 from SERIOUS HOUSE's;
- Lego's is 7.0 from TAS's and 9.7 from WATCHFUL PROTECTOR's.

**Recommendation:** TAS keeps black paper as a recorded exception. It is the show's literal method ([tas 29]–[tas 35]), and the alarm, the skyline, the blue cape and the type carry the Palette axis. Lego's texture carries its own near pairs (§3.8). And for Wave 4 the floor rule should be restated: with thirteen Themes, the ground alone can no longer be expected to separate two dark Themes. The rule that still holds is that **no two Themes share a ground *and* an alarm family *and* a working ink**, and that is what §1's Palette axis already scores.

### 3.2 Orange: who keeps it (question 1, board 1)

| Orange | vs Clawd (ΔE00, luminance) | Nearest other colour |
|---|---|---|
| TLH A1 `#fe7500` | 13.2, 1.16:1 | TAS A 7.0; FREEFLOW's fill 13.2 |
| TAS A `#ff6420` | **9.7**, 1.06:1 | TLH 7.0; VENGEANCE's fill 7.6; SERIOUS HOUSE's fill 8.1 |
| The Games' first pick `#fe7400` | 13.0 | TLH **0.3** |
| TLH A3 `#ff8c1a` | 16.5, 1.35:1 | WATCHFUL PROTECTOR's waiting 8.2; the Games' fill 8.6 |
| TLH's fallback, wine-lit `#ff5cc0` | 31.3 | **Lego's M 5.0** |
| TAS B `#8b88ff` | 41.3 | West's V 10.9; Blue Flame 12.2 |

- **Is an orange alarm acceptable at all next to Clawd's jaw?** Yes. By the measure the app already ships, TLH's orange is safer than one shipped Theme: BECOME A BAT's red sits 10.4 from Clawd at 1.01:1, with its aura on. The aura is a drop shadow round the outer silhouette (`BatClawd.css`), and the jaw is framed by the cowl and the mantle (2.47:1). So TLH keeps `aura: 'alarmed'`, and `aura: false` stays a fallback for the board.
- **Who keeps it.** TLH. By tie-break 2 its source owns orange most strongly: the jack-o'-lantern opens and closes the book [tlh 02] [tlh 14], and the Theme's name and calendar hang on it. By tie-break 4, TAS has an in-frame alternative and TLH has none: its fallback lands on Lego.
- **The costs to TAS, stated:**
  - The lit disc is blue, not the red disc of [tas 02].
  - The blue rim leaves Bat-Clawd at rest.
  - B sits 10.9 from West's violet.
  - The cape becomes an unlit relative of the alarm, which is question 6.
  - TAS keeps its drafted inks, not the B set its dossier lists: that set's orange waiting ink lands 9.4 from HOLIDAY's alarm (§2).
- **Options on the board:**
  - A: TLH keeps orange, TAS takes B (recommended).
  - B: TAS keeps the red sky, TLH moves to A3. The two sit 12.8 apart, but TAS is 9.7 from Clawd and A3 is 8.2–8.6 from two ambers.
  - C: both as drafted, 7.0 apart. That would be a second recorded exception after BECOME A BAT and KNIGHTMARE's 6.1.

### 3.3 The warm corner: the Games' amber (board 11)

The amber `#ffad00` is 9.2 from PALE MOONLIGHT's lit gold, as the dossier says. Two things it doesn't say:
- Its fill `#e08f00` is **4.4** from PALE MOONLIGHT's fill `#d29336`, closer than the fills of the one recorded exception (BECOME A BAT and KNIGHTMARE, 5.0).
- At rest it sits 5.0 from Lego's belt, 6.4 from Lego's oval and 9.7 from West's oval: three Themes' yellow suit parts sit near another Theme's alarm.

The sweep (`sweep_freeflow.txt`) finds nothing better once TLH keeps orange: the best warm alarm is an olive `#9c9400`, 10.4 from its nearest colour. Knight's HUD orange `#f95311` is 3.6 from TAS A, and City's `#fca458` is 5.0 from WATCHFUL PROTECTOR's waiting ink.

**Recommendation:** accept the amber as a recorded exception, with the dossier's L1 lit disc (dark glass and an amber rim). PALE MOONLIGHT's is a full gold lens, so the two discs differ by form. Judge both in the picker. The yellow suit parts of TAS, West and Lego are not alarms and stay; this is the amber case of Wave 1 §10.5.

### 3.4 Type: one register three times, and Deco twice

- **Condensed grotesque stamps:** WATCHFUL PROTECTOR (Big Shoulders Stencil, shipped), TAS (Mohave 600) and TLH (Sofia Sans Extra Condensed 600). Wave 2 wrote "stamp register, not only family, is unique per Theme". The draft moves.
- **Deco display:** TAS's Federo against PALE MOONLIGHT's Limelight. TAS's own dossier scores it "~".
- **Fix:**
  - TAS sets its display and stamps in **Marcellus SC**, its own named alternative. It is the serif of "I Am the Night" [tas 48], and one family for both, as KNIGHTMARE does with Archivo. Measured at 11px: PERMISSION 88.8 / 101 and 80.0 / 87, PAGING YOU 85.7 / 87.
  - TLH stamps in **Federo**, the alternative its dossier measured (PERMISSION 83.2 / 87). It is a 1909 grotesque, nearer the covers' "CRIME" label.
  - TAS – PALE MOONLIGHT, TAS – TLH, TLH – VENGEANCE and TLH – WATCHFUL PROTECTOR move to C on Type.
- **Left as "~", decided on screen:**
  - Lego's Changa One stamps against West's Luckiest Guy. Tilt Warp, Lego's alternative, fails AUTOGRAPH? in the narrow room (89.4 / 87).
  - Lego's Russo One against the Games' Oxanium (display).
  - West's Luckiest Guy against ANCIENT GRACE's Bangers. Wave 2 left Luckiest Guy free for West on purpose: round and upright against condensed and slanted.

### 3.5 The yellow oval and the classic suit (questions 2 and 4, boards 2 and 4)

| | Oval | vs TAS C1 | vs West | vs Lego | vs PALE MOONLIGHT's lit gold | Rim |
|---|---|---|---|---|---|---|
| TAS C1 | `#c9a53c` | | 2.9 | 6.0 | 8.5 | black |
| West | `#d4a845` | 2.9 | | 3.9 | 7.2 | none |
| Lego | `#e5af37` | 6.0 | 3.9 | | **5.0** | black |
| PALE MOONLIGHT (shipped) | `#7a5420` at rest, `#f0c24b` lit | | | | | brass plate |

Every lit frame of all three works shows a bright yellow oval: [tas 23] [tas 53] [tas 56], [west 16] [west 21], [lego 33] [lego 42]. Wave 1 barred the oval only as an alarm, and none of these lights. At 54px each oval is about 8×6px, and the suits separate them by hue: blue-grey under cobalt (TAS), lavender under violet satin (West), black under black (Lego, with S-B). The Silhouette axis between them is "~", and each pair still scores 3 or more.

**Recommendation: plan A on board 2.** All three keep a bright oval that never lights, and Lego's wordmark goes Bone (its yellow is 3.7 from PALE MOONLIGHT's gold, at display size). Plan B (West's J1: TAS dims to `#907e38`) is the fallback if the maintainer sees two ovals as one at 54px. The dimmed oval is only 1.43:1 on TAS's suit. Plan C (one oval) takes the oval off two works whose every lit frame has it.

**The classic suit** (board 4).
- **What separates the three at 54px** is a hue ladder, plus TLH's shape: TLH steel h257 with long ears and a bell cape, TAS blue-grey h283 with a near-black cowl, West lavender h301 with a cowl in the cape's violet. Suits 12.3–15.9 apart, capes 10.1–15.3.
- **The parts that are only West's** (painted brows, satin sheen, the missing rim, the square buckle) are at or under the 1-unit floor, as his dossier says.
- **The belts are one gold** (2.3–4.1 apart). No rule covers belts. BECOME A BAT's canary belt is the claimed one, 13.1–14.4 from these. **Recommendation:** all three keep gold belts. TLH's S2 (the body in the cape's blue, Sale's shadow) is offered on the board because it is closer to [tlh 24] and further from TAS. It costs the chest bat, which drops to 2.10:1.

### 3.6 Alarms with an unlit relative at rest: violet and blue (question 6, board 6)

Checked as a **rule**, not only as a ΔE00. CONTEXT.md: the Alarm color "appears nowhere else". The shipped reading of it is PALE MOONLIGHT's: its alarm is the lit gold, and the brass that is "the gold that is off" sits at rest on the belt and the emblem plate. Measured:

| Theme | At rest | Hue at rest / alarm | vs the fill | vs the lit alarm | How much of Bat-Clawd |
|---|---|---|---|---|---|
| PALE MOONLIGHT (shipped) | brass `#7a5420` | h74 / h75–86 | 27.2 | 38.4 | the belt row and the oval plate |
| West V | satin `#4a3480` (cowl, cape, gloves, trunks, boots); suit `#837b9c` h301 | h306 / h312 | **17.5** (suit 22.1) | 33.5 (suit 19.8) | all of him but the jaw, the eyes, the oval and the belt |
| TAS B (if question 1 goes to A) | cobalt cape `#1a3570` | h289 / h298–300 | **16.3** | 35.8 | the cape, gloves, boots and trunks |

So West and TAS-under-B are the same case as PALE MOONLIGHT, but closer and bigger: the alarm is never lit at rest, while its dark relative dresses the mascot. **West's dossier understates this** when it calls the satin "PALE MOONLIGHT's unlit-brass pattern".

**The options for West** (board 6):
- **V, the satin's violet.** It needs the reading below. The lit violet is 33.5 from the satin, so a lit disc or stamp is plainly brighter than anything at rest.
- **R, the Batphone red** `#fc5936`. Recomputed on all 11 grounds, its tightest is **4.534:1** on `--raised` and 4.657 on `--notice-hover-top`, so it passes the test's `>= 4.5`. Its fill `#c52e10` carries Bone at 4.65:1. It costs 8.4 from Clawd (under BECOME A BAT's 10.4 exception) and 4.9 from SERIOUS HOUSE's scarlet.
- **G, the SFX green.** It sits 2.4 from West's own waiting green, which would have to move, and green reads as "fine".

**Recommendation:** read the rule as PALE MOONLIGHT already does. The Alarm color itself, the lit hue, appears only for the alarm. A dark, unlit relative may dress the suit when the work's suit *is* that colour, as long as it sits at least ~15 from the fill and the aura shows only when alarmed. West keeps V, and TAS's cape stays cobalt under B. If the maintainer reads the rule strictly, West takes R and TAS's cape goes black-blue, off its alarm.

### 3.7 Signatures, flying and alarmed poses (question 5, board 5)

- **Two crouches.** TAS's landing is a symmetric dome 23 units wide. The Games' gargoyle is a lopsided crouch about 9 units tall, with one fall of cape. All seven shipped held steps are upright, so both crouches are new, and they differ at 54px (board 5, from `boards-lego/outlines.png`). Each fallback costs more:
  - The Games' grapnel (P2) would be a third line, after Lego's flying grapnel and West's Bat-climb.
  - TAS's S2 (a closed bell under a disc) meets SERIOUS HOUSE's closed rest and TLH's options A and C.
  - **Recommendation: both crouches stay.**
- **Two searchlight skies.** **Recommendation:** TAS keeps the blimp and its two beams. The Games keep plain rain (their own A1, no engine work). One searchlight painter is then built, for TAS's `skyline` only.
- **Flying.** The Games fly on the grapnel (recommended in their dossier), and so does Lego (its "grapnel swing" [lego 14]). West's alternative, the Bat-climb, is a rope too. By tie-break 2 the grapnel is the Games' (Asylum's "use his grapnel gun to reach the gargoyles"). Lego's other candidate, the run [lego 22], meets West's opening run. **Lego needs a third flying pose**, chosen at its build.
- **Alarmed poses.** The Games' counter (both fists up, the cape flung back) and West's fight (both fists up, the cape flung back, a burst behind the head) share an outline but for the burst. **Fix:** the Games give their counter something of their own (the fins on one forearm thrust forward, the other fist back), decided on screen. The others are clear of each other:
  - TLH: the lantern at his feet;
  - TAS: black on the sky (to re-check under B);
  - Lego: fists on hips.
- **Two bell capes.** TLH's huge pooling bell (20 units at the hem) and Lego's stiff bell. TLH's long ears and Lego's black-and-yellow body separate them; check both beside SERIOUS HOUSE's closed rest.
- **The other held steps** are new and clear of each other: TLH's right triangle, West's arm loops beside the head, Lego's table bar. Lego's L1 ("dinner for one") is sad on purpose; whether a man eating alone on the perch for hours reads as a joke is the maintainer's call at the build.

### 3.8 Lego against TAS and the Games (questions 9 and 11, boards 9 and 11)

- **Grounds:** 8.8 / 7.0 from TAS's black paper, lightness only. Texture is the separation, as the dossier says. So P1 (the studs, smooth tiles, 1px corners and the extrude) is mandatory. P0 is the plain recolour the maintainer stopped SERIOUS HOUSE for.
- **Suits:** the drafted torso `#454852` is 3.6 from the Games' armour `#4a4c50`. The film's torso is black plastic with grey printed lines [lego 33], and the teaser says "IN BLACK" [lego 44]. **Fix:** S-B `#1b1c21`, 15.4 from the Games' armour. The oval reads 8.52:1 on it; the torso is 1.28:1 on Lego's surface, carried by the neutral rim and the yellow belt.

### 3.9 Voice and credit lines

- **Shared sentence.** TAS's "No cases tonight." and West's "No cases tonight. The Batpoles are idle." Wave 2: no Voice line repeats another Theme's sentence. West keeps the Batpoles and drops the first sentence ("The Batpoles are idle. No cases."), or TAS changes its line.
- **A shared phrase.** TLH's "A quiet night. Enjoy the holiday." echoes ANCIENT GRACE's shipped "Our panel agrees: a quiet night." It is a phrase, not a sentence, so it is allowed, but a different opening would be cleaner.
- **Credits.**
  - TAS's credit is written "after *Batman: The Animated Series* (1992)", and Lego's §13 "after *The LEGO® …*". `words.ts` adds "after", so the `film` field drops it.
  - The shipped `film` strings now name the makers ("Frank Miller's Year One", "Snyder & Dragotta's Absolute Batman"). The five drafts should follow that form. The Games' "Rocksteady's Arkham trilogy" already does, and it tells a game from SERIOUS HOUSE's book in the picker.

### 3.10 Navy: the LUC-89 premise (question 7, board 7)

West's dossier measured that the animated opening is not navy: its fields are flat green, magenta, orange and maroon [west 01]–[west 08]. We checked the frames by eye on a contact sheet, and it is right. The navy is in the dusk cast cards [west 09] [west 10], the Signal on night clouds [west 17] and the closing credits [west 18] [west 19]. So the ground can stay navy, and ADR 0001 forbids a light one anyway. Only the premise's source changes, and the maintainer should know the opening the premise names is pop colour. G1 (h279, from the credits) is recommended. G2, the ultramarine of [west 34], would move a violet-alarm Theme into BLUE COLLAR's corner (8.2 from its surface).

### 3.11 Green (question 3, board 3)

Three Themes reach for green, all in different roles:
- the Games' **ground** (`#0b1a10` / `#11301c`, raised C* 19.6, above the C* 15 floor Wave 2 set) and pale **waiting** ink `#b3e8b8`;
- West's **waiting** ink `#38c886`, from one SFX card [west 41] (VRONK! [west 27] is red on green);
- SERIOUS HOUSE's **working** ink `#86d66a`.

| Pair | ΔE00 | Roles |
|---|---|---|
| West waiting – the Games' waiting | 14.3 | same role |
| West waiting – SERIOUS HOUSE working | 11.7 | cross role |
| The Games' waiting – SERIOUS HOUSE working | 12.5 | cross role |

All pass the ~5 rule with room. So this is a picker judgement, not a rule breach.

The real risk is the one SERIOUS HOUSE's record raised: a green **waiting** ink may read as "fine" to a tired developer, and two Themes would do it. The stamp's word, box and side rule carry the tier, as in Wave 1 §10.5.

**Recommendation:** A on the board, as drafted. The alternatives are worse:
- The Games' G2 `#c5d291` sits 7.8 from BECOME A BAT's canary.
- No non-green waiting ink exists for West. ZAP blue is 1.6 from ANCIENT GRACE's fill, the caption yellow is 3.0 from Lego's yellow and 5.5 from PALE MOONLIGHT's gold, and the Signal's pale rose sits only 11.5 from West's own Bone (`checks.txt` §5b).

### 3.12 Magenta (question 8, board 8)

The brief and the claims table call Lego's alarm a crossing of "the no pinks line". That line is out of date. Wave 2's follow-up of 2026-10-15 released newsprint magenta when BECOME A BAT shipped red, and SERIOUS HOUSE's alarm is now scarlet, not claret. The only pink at work is BLUE COLLAR's waiting mauve: 11.5 from Lego's `#fe79d0`, in another role. Lego M also sits:
- 16.9 from West's violet;
- 7.1 from the unclaimed newsprint magenta `#ff4dd2`, which no Theme wears;
- 31.8 from Clawd.

The fallback R, the Batcomputer red, would be a fifth red: 8.2 from BECOME A BAT's.

**Recommendation: M.** It is coupled to question 1: if TLH lost its orange, its only fallback, the wine-lit `#ff5cc0`, would land 5.0 from M.

## 4. Lexicon clarity check

The test, as in Waves 1 and 2: a tired developer glancing at a stamp or a tab must get the standard meaning instantly, at the right severity. Stamp widths are the dossiers' Pillow measurements, plus ours for the face changes (`stampfit.txt`); `stampWidth.test.ts` is the judge.

| Theme | Standard → themed | Misread at a glance | Fix |
|---|---|---|---|
| TAS | Permission → GO AHEAD? | Without the "?", it reads as permission already given. The hot ink and box say it's a request | Keep; decide on screen |
| TAS | Waiting → ANSWER ME | A demand, one tier sharper than "waiting", but not an error | Keep |
| TLH | Waiting → A WORD | Two short words with no verb; a glance may read a label, not a request | **A WORD?** with a question mark (the Theme's other request, BLESSING?, has one), or the standard Waiting |
| TLH | Stalled → ON ICE | "Put on ice" also means deliberately postponed, or kept safe. It reads as calm, not stuck | Decide on screen; fallback Stalled |
| Games | Needs you → Objective | A noun for a goal, not an alert. "2 objectives" is clear in a count, weaker on a tab alone | Keep; check the tab |
| Games | New reply → INCOMING | "Incoming!" is a warning to take cover: one tier too severe for a new reply | Decide on screen; fallback NEW REPLY |
| West | Error → FOILED | In Batman's mouth "foiled" means the villain's plan was stopped: good news. The severity can flip | **Change it.** For instance FIASCO (a 1960s word, plainly a failure, measure it), or the standard ERROR |
| West | Waiting → WHAT NOW? | Exasperation, a tier too severe (its own dossier says so) | Decide on screen; fallback WAITING |
| West | Needs you → BATPHONE | A noun; clear in "1 call on the Batphone", weaker alone on a tab | Keep; check the tab |
| Lego | Waiting → HELLO? | A greeting: it can read as a new session saying hello, not Claude waiting | Decide on screen; fallback WAITING |
| Lego | Permission → AUTOGRAPH? | "Sign in" or "sign this" | Keep; the "?" carries the request |

Kept as they are:
- TAS: PAGING YOU, BUSTED, NEW LEAD, HELD UP;
- TLH: BLESSING?, BOTCHED, MESSAGE;
- the Games: Mission, ACCESS?, FAILED, RESPOND, STALLED;
- West: MAY I?, NEW CLUE, HANGING;
- Lego: NEED A HERO, EPIC FAIL, FAN MAIL, Stalled.

No word repeats a shipped one. NEW LEAD, NEW CLUE and KNIGHTMARE's "New intel" are one register (the detective), with different words; that is allowed. *Quiet*, *dark* and *still* keep meaning all clear in every new Voice. Five permission stamps are now questions (GO AHEAD?, BLESSING?, ACCESS?, MAY I?, AUTOGRAPH?), which is the shipped pattern.

## 5. Chest symbol and silhouette check

Luminance ratios from `checks.txt` §9. At 54px one unit is about 1.9px; the jaw row ends at y 5.

| Theme | Chest | Reads at rest? | Jaw | Notes |
|---|---|---|---|---|
| TAS | C1: a 4.2×3 oval at (8, 7), the bat inset at 75% | The oval 2.44:1 on the suit, the bat 8.67:1 on the oval: yes | 1.82:1 on the suit; the half-row cape-blue collar gives 5.89:1 on the cowl | The cowl is 1.03:1 on the surface; the rim carries it. Under B the rim goes neutral (a grey at about 30%), so check the cowl still reads |
| TLH | The book's round Signal bat, 2×1.5 units | 5.45:1 on the suit, but only 2 units wide: at the floor | **1.18:1 on the suit**; the blue mantle under it gives 2.47:1 | The belt is 1.24:1 on the suit (42.5 ΔE00 in hue): it reads as gold on blue, not as a line. The ears are 2.2 units at the base, tips at y −0.8 |
| Games | A wide flat bat, 6.5×2, tone on tone | **No: 1.96:1**, as VENGEANCE's 1.52 | 2.73:1 on the suit | **The belt is 1.13:1 on the suit**: only its pouches show. The cowl 1.01:1 and the cape 1.06:1 on the surface: a silhouette carried by the rim. Gauntlet fins 1 unit: they count |
| West | The 1966 bat across a ~1.5:1 oval, no rim | The oval 1.80:1 on the lavender, the bat 8.93:1 on it: by hue and by the bat | **1.26:1 on the suit**; the satin collar gives 3.18:1 | The belt is 1.54:1 (43.1 ΔE00 in hue). Brows 0.5 unit: under the floor at 54px |
| Lego | The yellow oval with a black rim (C1) | 4.57:1 on S-A, **8.52:1 on S-B**: the clearest chest in the wave | 2.90:1 on S-A; 5.40:1 on S-B | The belt is 4.71:1 on S-A. Printed abs at 0.5 unit: dropped at 54px, as the dossier says |

**Fixes:**
- **TLH:** keep the mantle; the chest bat no smaller than 2 units wide. Under S2 the bat drops to 2.10:1, so S2 needs a bat at least 2.5 units wide or accepts a near-invisible chest.
- **The Games:** the chest bat is an emblem on the disc and in the header; on the suit it is texture, as in [ag 04]. A belt at 1.13:1 does not exist at 54px: lift it to at least 1.5:1 against the suit, or accept pouches only.
- **West:** the collar is required (the jaw is 1.26:1 on the suit without it).
- **Lego:** S-B (§3.8).

**Silhouette at real size:**

| Detail | Units | At 54–60px | Verdict |
|---|---|---|---|
| TAS hem, three deep scallops a side | 1.5 deep | 3px | Counts; tells it from PALE MOONLIGHT's shallow arcs |
| TAS landing (Signature) | 23 wide, 9.6 tall | about 44 × 18px | Inside the viewBox, as drafted |
| TLH ears | 2.2 at the base, tips at y −0.8 | 4px wide | Counts. Against SERIOUS HOUSE's needles (1 unit), the width differs and the height is the same |
| TLH bell cape | to x −1.5 and 17.5 | 20 units | Counts; the widest cape in the app |
| Games mantle | 1.5 units on each shoulder | 3px | Counts, and no shipped suit has it |
| Games gargoyle | about 9 tall | 2 units lower than any stand | Counts |
| West arm loops (Batusi) | elbows 3.6 units past the body | 7px | Counts. The V's fingers are under a unit and are drawn only at 78px |
| West brows | 0.5 | 1px | Under the floor; decide at 78px whether they read as a second pair of eyes |
| Lego table (L1) | 22.8 wide | 43px | Counts; the only horizontal bar among the taken outlines |
| Lego cowl shine | 1 unit | 2px | At the floor |

## 6. Engine implications

Two PRs per Theme, engine then Theme, as in Wave 2. A shared piece is built by the first engine PR that needs it and reused by the next. Ordered so that each step is small and the shared pieces come first.

1. **Shared: an emblem plate that never lights** (TAS C1, West, Lego). PALE MOONLIGHT's `chestOval` lights when alarmed; add an option that keeps it at rest, with a rim on or off (TAS and Lego rimmed, West not). TAS's `--disc-bat-edge` (an unlit blue rim on the disc's bat) is needed only if question 1 goes to B or C; under A it drops. Small, one test.
2. **Shared: Atmosphere options on existing painters**, gated as today: the shared 8 fps clock, under the pointer and for a few seconds after news, `still: 'calm'`, nothing under reduced motion.
   - On `smoke`: `wind` (sideways drift) and `aspect` (wide flat puffs), for West's clouds.
   - A **still layer drawn once**, which `noise` lost when SERIOUS HOUSE's panes were reverted in #141. It carries West's pale Signal, TAS's skyline silhouettes, and SERIOUS HOUSE's panes when it returns.
   - ~~On `ash`: a two-frame page sprite beside BLUE COLLAR's bat, for TLH.~~ Dropped by decision 15: HOLIDAY now uses this item's still layer (for its pumpkin moon) and `smoke`'s `wind` and `aspect` (for its fog), so those serve TLH as well as West and TAS.
   - On `noise`: a band at an angle, with no marks and a pause between passes, for Lego's sheen (A2).
3. **TAS: the `skyline` kind.** A sky band, the silhouettes on the still layer, and one blimp with two beams on the clock. The haze that follows the needs-you state drops if question 1 goes to A. The intro's searchlight cone stays distinct: the beams are thin, two, and never carry a bat.
4. **West: the POW! balloon.** A starburst beside a fresh stamp on the notice card, three steps on the 8 fps clock, never in the report margin, the watch strip, a toast or the tray, and off under reduced motion. It is the only new component in the wave.
5. **Lego: the pieces.**
   - `--radius` moves from `:root` in `theme.css` into every Theme (4px for the others), and `themes.test.ts` then requires it.
   - `--studs` and `--studs-size` on the fixed back layer and inside the disc, never under text.
   - `--tile-edge` on cards, notices, the watch strip and sheets.
   - `--wordmark-extrude`, a full `text-shadow` (today `--wordmark-glow` takes a colour only).
   - `--disc-texture` only if D2 wins.
   - All static paint, but measured on the real windows before merge (PRODUCT.md: about 1% of one core at rest; no Theme above VENGEANCE). The stud texture on the transparent signal window is the one to watch.
   - The building-instructions report (`--step-display`, a CSS counter) is optional (question 9) and would be its own small PR.
6. **The Games: the bracketed stamp**, only if `--stamp-mask` cannot cut the box to corners. Also a lit-only disc rim, if the rim is shared by both states today.

**Not engine work:**
- TLH's holiday dateline is a table in `words.ts` (`datelineOf`).
- West's `MEANWHILE · 21:40` and Lego's `STEP 1 · 21:40` use the existing dateline.
- `aura: false` is already allowed by `Suit.aura`.
- Every new pose (the crouches, the Batusi, the triangle, the table) is suit data and overlay paths.
- No viewBox change anywhere.

**Fonts:** Marcellus SC (TAS); Grenze Gotisch and Federo (TLH); Oxanium (the Games); Luckiest Guy, which is Apache-2.0 and needs a NOTICE line, and Bowlby One SC (West); Russo One, Changa One and Rubik (Lego). All the others are OFL-1.1. Mohave and Sofia Sans Extra Condensed drop out if question 12 goes to the swap.

**Tests:**
- `themes.test.ts`: every new variable set by every Theme.
- `themeContrast.test.ts`: every draft passes as written. The tightest are West R at 4.534 (if chosen), TAS A at 4.57, Lego M at 4.57 and TAS B at 4.55, all on the raised or hover tone.
- `stampWidth.test.ts`: re-measure TAS (Marcellus SC) and TLH (Federo).
- Wave 2's Voice-equality test would not catch "No cases tonight.", because West's line is longer. A check that no Voice line begins with another Theme's sentence would.

## 7. Questions for the maintainer

Each board was shown to the maintainer from the session's scratch folder (`boards-jury/`), with the options labelled in the image and the source frames beside them; the boards are not committed, since they hold frames from the works (ADR 0001). The references they crop are indexed in [`references/`](references/).

1. **Orange: who keeps it?** (`jury-1-orange.jpg`) A: HOLIDAY keeps the jack-o'-lantern `#fe7500`; TAS takes its rim blue `#8b88ff`, and its rim at rest goes neutral. B: TAS keeps the red sky; HOLIDAY moves to the lantern's yellow-orange `#ff8c1a` (12.8 apart; TAS 9.7 from Clawd). C: both as drafted, 7.0 apart, a second recorded exception. *Recommended: A. HOLIDAY's source owns orange most strongly and has no fallback; TAS's own dossier names B as its answer if another orange stays. HOLIDAY keeps its aura: BECOME A BAT already ships one at 1.01:1.*
2. **The yellow oval.** (`jury-2-oval.jpg`) A: TAS, West and Lego all keep a bright oval that never lights, told apart by their suits. B: J1, TAS dims its oval to `#907e38`. C: West alone keeps an oval. *Recommended: A, with Lego's wordmark in Bone (its yellow is 3.7 from PALE MOONLIGHT's gold alarm). Every lit frame of the three works has the oval, and none of them lights.*
3. **Green.** (`jury-3-green.jpg`) A: as drafted (the Games' ground and pale green waiting ink, West's SFX green waiting ink, SERIOUS HOUSE's green working ink). B: the Games' waiting ink becomes City's HUD yellow-green. C: West's waiting ink becomes the Signal's pale rose. *Recommended: A. All pass the ~5 rule (11.7–14.3); check on screen that a green waiting stamp doesn't read as "fine".*
4. **The classic suit three times.** (`jury-4-suits.jpg`) A: as drafted, separated by a hue ladder (h257, h283, h301), TLH's long ears and bell cape, and West's violet cowl. B: TLH in Sale's shadow (S2), with a gold or blue belt. *Recommended: A, gold belts in all three. Take B for TLH if the screen prefers Sale's darker figure, knowing its chest bat drops to 2.10:1.*
5. **Two crouches and two searchlight skies.** (`jury-5-crouch.jpg`) A: both crouches stay. B: the Games take the grapnel. C: TAS takes "out of the black". Searchlights: to TAS (its blimp), or to the Games. *Recommended: A, and the searchlights to TAS. Each fallback runs into a third Theme.*
6. **The Alarm color's unlit relative at rest.** (`jury-6-violet.jpg`) Does "appears nowhere else" allow a dark relative of the alarm to dress the suit, as PALE MOONLIGHT's brass does, when the work's suit is that colour? A (V): yes, if it sits at least ~15 from the fill and the aura shows only when alarmed. West keeps the violet satin (17.5), and TAS's cobalt cape under B (16.3). B (R): no; West takes the Batphone red (4.534:1 on `--raised`; 8.4 from Clawd; 4.9 from SERIOUS HOUSE). C (G): the SFX green, and West's waiting ink moves. *Recommended: A, the reading PALE MOONLIGHT already ships, written down as a rule.*
7. **The navy premise (LUC-89).** (`jury-7-navy.jpg`) The animated opening is pop colour, not navy. The navy is in the dusk cards, the Signal on clouds and the closing credits. A: keep West's ground as the credits navy (G1). B: the cliffhanger ultramarine (G2). *Recommended: A. The decision "Adam West stays dark navy" stands; only its source changes.*
8. **Lego's magenta.** (`jury-8-magenta.jpg`) A: the Batcave neon `#fe79d0`. B: the Batcomputer red. *Recommended: A. The "no pinks" line is stale since Wave 2's follow-up; M is 11.5 from BLUE COLLAR's mauve, in another role.*
9. **Lego's scope.** (`jury-9-lego.jpg`) A: P1, the app as pieces (studs, smooth tiles, 1px corners, the wordmark extrude), mandatory for this Theme. B: P1 plus the building-instructions report. C: P0, the palette alone. *Recommended: A. B can follow as its own PR once mocked. C is the recolour the maintainer already stopped once. Also approve the legal table (`lego-batman.md` §3.2): studs as a flat texture with no word on them, Bat-Clawd's own body, the word LEGO® only in the credit, never the logo. And the CPU measurement before merge.*
10. **The near-black corner is full.** (`jury-10-ground.jpg`) TAS's black paper breaks the ~6 / ~10 floors four times, and no free ground exists at its lightness. A: keep black paper as a recorded exception, and restate the floor rule for Wave 4. B: plum-black (withdrawn: 1.5 from HOLIDAY). C: the one passing green-grey, which the show doesn't have. *Recommended: A.*
11. **The Games against Lego and PALE MOONLIGHT.** (`jury-11-grey-amber.jpg`) Lego's torso: black (S-B, 15.4 from the Games' armour) or grey as drafted (3.6). The Games' amber: 9.2 from PALE MOONLIGHT's gold, fills 4.4 apart, and no warm alarm left. *Recommended: Lego in black; the amber as a recorded exception, with the dark-glass L1 disc so the two lit discs differ by form.*
12. **Type swaps.** (No new board. `boards-tas/fonts.png` and `tools-tlh/board-type.png` in the scratch folder already set these faces beside the sources.) TAS: Marcellus SC for display and stamps. HOLIDAY: Federo for stamps. Both are measured to fit. *Recommended: yes. It ends three condensed stamp faces in one register and a second Deco display.*
13. **Lexicon fixes** (§4). FOILED changes; A WORD gets its question mark; INCOMING, WHAT NOW?, HELLO? and ON ICE are decided on screen, each with its standard fallback. *Recommended: yes.*
14. **Poses** (§3.7). Lego's flying pose leaves the grapnel, which goes to the Games. The Games' alarmed counter gets a shape of its own, away from West's fight. *Recommended: yes; both are picked at their builds.*

**Decide on screen** (not questions; each in its Theme's build, from a labelled image):
- TAS's alarmed pose under B, and its cowl with a neutral rim.
- TLH's orange aura beside the jaw and its ears beside SERIOUS HOUSE's; after decision 15, its moon beside its own lit disc (two orange rounds), and its fog beside BECOME A BAT's smoke, KNIGHTMARE's ash and SAME BAT-TIME's clouds. (The pages' tumble beside PALE MOONLIGHT's snow was seen, and the pages dropped.)
- The Games' belt (1.13:1), and its rain beside VENGEANCE's.
- West's brows at 78px, the balloon's size, and the clouds as bands.
- Lego's dinner for one as a long perch, the studs at real size, and A2's sheen beside ANCIENT GRACE's roll band.
- Every display name: DARK DECO, HOLIDAY, FREEFLOW (its trademark status is unchecked), SAME BAT-TIME, VERY DARK GREY (the maintainer's working name; the phrase is attributed to *The Lego Movie*, 2014, unverified).

## 8. Notes for when SERIOUS HOUSE returns

What Wave 3 now sits next to, so its return starts from it:

- **Green.** Its working green `#86d66a` now has two neighbours in the green family: the Games' waiting green (12.5) and West's (11.7). Both are other roles and both pass. The Games took green as a *ground*, which SERIOUS HOUSE's own record said the book never uses. Its credit must still read as a book beside "Rocksteady's Arkham trilogy".
- **Red.**
  - If question 1 goes to A, TAS's red sky no longer sits 11.2 from its scarlet.
  - If question 6 goes to B, West's Batphone red sits **4.9** from it, and SERIOUS HOUSE would then be the side that moves (tie-break 3 does not apply between two unbuilt Themes; tie-break 2 does).
- **Ground.** Its raised tone `#151f2f` is 9.3 from West's and 9.1 from TAS's, and its surface is 3.0 from TAS's black paper. The near-black corner is full (§3.1); expect another recorded exception rather than a free ground.
- **Silhouette.**
  - Its needle ears are as tall as TLH's long ears (y −1 against −0.8); the width separates them (1 unit against 2.2).
  - Its closed cape at rest is near TAS's S2 and TLH's options A and C, none of which is recommended.
  - Two bell capes (TLH, Lego) now sit near its closed bell.
- **Atmosphere.** Its scratches would join the `noise` painter beside Lego's band. Its still panes should use the shared still layer of §6, item 2.
- **Faces.** Covered By Your Grace and Kalam are unclaimed by Wave 3.
- **Its emblem** (the pencil Bat-Signal drawn from life, ADR 0001's exception) meets no Wave 3 bat. TLH's round Signal bat (1.3:1) is the nearest kind; compare them at 64px.

## 9. The maintainer's decisions

Taken on 2026-10-23, from the boards in §7, seen on screen.

**A new rule first.** The maintainer, on question 1: colours that recur across versions of Batman may recur across Themes. The distance floors still apply to the alarm and to the grounds, but a colour every version shares (the yellow oval, the gold belt, the classic blue-grey suit, a black-paper night) is not a collision in itself. Several answers below follow from it.

1. **Orange: The Long Halloween keeps it** (HOLIDAY `#fe7500`, aura kept as BECOME A BAT ships one). **The Animated Series' alarm becomes yellow**, the series' searchlight yellow, which the new rule allows beside PALE MOONLIGHT's gold. Costed in [`animated-series.md`](animated-series.md) §4.8 and confirmed by the maintainer with its costs: signal `#fee055` / signal-hot `#fee06b`; the waiting ink moves to the lit rim `#b7dbfe` and working becomes Bone; the skyline's windows and the intro searchlight go Bone; the oval sits at the ~15 line, so the dossier now recommends `#b8963a` (19.7 / 19.2 from the alarm); 9.2 from BLUE COLLAR's lemon and 7.7 from PALE MOONLIGHT's gold, both recorded. The red sky stays lit at rest as light, so §6's needs-you haze and `--disc-bat-edge` items for TAS are re-specified at its build.
2. **The yellow oval: A.** TAS, West and Lego all keep a bright oval that never lights, told apart by their suits. Lego's wordmark in Bone.
3. **Green: A**, as drafted. Check on screen that a green waiting stamp does not read as "fine".
4. **The classic suit three times: A**, as drafted, gold belts in all three.
5. **Crouches and searchlights: A.** Both crouches stay; the searchlights go to TAS (the police blimp), the Games keep plain rain.
6. **The Alarm color's unlit relative at rest: A.** A dark relative of the alarm may dress the suit when the work's suit is that colour, at about 15 or more from the fill, with the aura only when alarmed. West keeps the violet satin and the violet alarm. To be written into `CONTEXT.md` with PALE MOONLIGHT's brass as the first case.
7. **West's navy: A.** The credits navy (G1). "Adam West stays dark navy" stands; its source is the closing credits, the dusk cards and the Signal on clouds, not the animated opening.
8. **Lego's magenta: A**, the Batcave neon `#fe79d0`.
9. **Lego's scope: more than P1.** The maintainer finds P1 still too subtle: the app should look more like plastic and pieces (strong shine, relief, pieces that fit together). New boards at Lego's build, beyond P1, before the engine PR. The legal table (`lego-batman.md` §3.2) and the CPU measurement before merge stand. The building-instructions report stays open for those boards.
10. **TAS's ground: A**, black paper, the series' own method, as a recorded exception (and under the new rule). Restate the floor rule for Wave 4.
11. **Lego's torso in black** (S-B, the film's "IN BLACK"); **the Games keep the amber** as a recorded exception, with the dark-glass L1 disc so the two lit discs differ by form.
12. **Type swaps: yes.** TAS takes Marcellus SC for display and stamps; HOLIDAY stamps in Federo.
13. **Lexicon fixes: yes**, as §4 lists them, with the on-screen checks.
14. **Poses: yes.** Lego's flying pose leaves the grapnel to the Games; the Games' alarmed counter gets a shape away from West's fight.
15. **HOLIDAY's Atmosphere** (2026-10-23, at its build, after seeing the pages beside PALE MOONLIGHT's snow, which read too alike): the calendar pages are dropped for a Halloween night, **a still pumpkin moon** with a carved face after Sale's 2021 Deluxe cover (by the book's own artist, though a later edition: the dossier's index marks it secondary), and **low fog drifting sideways**. The moon's colour was put to a board with three options: A, Bone and never orange; B, Bone at rest and lit orange only when something needs you (a new engine hook); C, a dim orange at all times. **The maintainer chose C.** So the Alarm-color rule (`CONTEXT.md`, `DESIGN.md`) now lets an unlit relative of the alarm sit in the Atmosphere, not only on the suit, at about 15 ΔE00 from the alarm's fill or more. The board's dim orange, `#7a3a12` at 35% over the surface (`#3d1b13` as seen), is 35.4 from the fill `#d05600` and 48.8 from `#fe7500`; even opaque, `#7a3a12` is 19.9 from the fill. The build picks the moon's colour on screen within that floor, and checks it beside the lit disc. The fog is not BECOME A BAT's smoke: wide flat banks (`aspect`) carried sideways (`wind`) along the bottom, not round puffs rising off the street; and it is not SAME BAT-TIME's clouds: those are bands across a navy sky past the Signal's bat, this hugs the floor under a carved moon in wine light. Engine: the shared still layer and the smoke's `wind` and `aspect` (LUC-118). The dossier's `--pages` variable, its "Calendar" Atmosphere label and hint, and its §11 Atmosphere scores are redone at the build; the scores against BECOME A BAT, KNIGHTMARE and SAME BAT-TIME are checked on screen.
16. **HOLIDAY's Atmosphere, revised the same day** (after seeing the moon and fog): the calendar pages come back **with** the moon, and **the fog goes**. The maintainer: leaves torn off and falling, swinging from side to side. So the pages no longer tumble edge-on (decision 15's reason to drop them was that tumbling pages read as PALE MOONLIGHT's snow): each swings a few px either way of its line every few seconds, leans into its swing, and has its bottom edge torn ragged under its month. Picked on screen from three sizes: the middle one, 8 to 12px at 22 to 40%, a 6px swing every 3 seconds. The moon stays as decision 15 has it (dim orange, upper right behind the tabs, picked on screen). Engine: the pages on the ash painter (`pages: { swing, period, tilt }`), under the still layer's moon. Against PALE MOONLIGHT's snow: a torn paper shape, a slow pendulum, a lean; against KNIGHTMARE's ash: falling, not blown across.
17. **HOLIDAY's moon, carved after the Deluxe cover** (at the whole-Theme board, the same day). The maintainer: the original lantern has more furious eyes, its inside is orange from a candle lit within ("another shade, naturally"), and its mouth is the bat's shape. So the eyes slant down to the middle, the grin is cut as the bat (its head and ears notched into the grin's top), and the eyes and grin are filled with a candle, `--candle #ffc870`, at the moon's strength (0.6), which is `#a47c4b` as seen on the surface. That is a lit carving inside an unlit body, so the Alarm-color rule (`CONTEXT.md`, `DESIGN.md`) now names it: a relative in the Atmosphere may show a light of its own the work shows (HOLIDAY's candle), as long as it too stays about 15 ΔE00 or more from the alarm's fill. As seen, the candle is 17.2 from the fill `#d05600`, 19.7 from `#fe7500` and 24.3 from the lit lens's core `#ffd08a`, so at rest it reads as neither the alarm nor a lit Signal. The moon rises to 68px so the grin shows above the cards. Approved on screen beside the cover, with the whole Theme.

18. **DARK DECO's ground: red, reopening decision 10** (2026-10-24, at its build). The maintainer: the ground may be the series' red sky, even if it echoes VENGEANCE's red a little, with clouds or fog and police blimps floating as in the show, blue and black blended with the red. A /research pass ([`dark-deco-build.md`](dark-deco-build.md) §2) measured the opening's sky (black at the top, crimson, a red-orange band just above the skyline, black towers, blue street mist below them, never a blend of blue into red) and costed three grounds. On a board of the panel beside the opening's frames and VENGEANCE, KNIGHTMARE and HOLIDAY, **the maintainer chose A, red-black**: `--abyss` `#1d0701`, `--surface` `#2d0501`, `--raised` `#480e12`, lightest `#4f0d13`, built from the sky's own dark top, with the opening's stack as the backdrop behind the cards (the bright orange only behind the black skyline, the blue mist at its foot). It clears every ground floor (nearest KNIGHTMARE at 9.4 surface and 11.3 raised, then HOLIDAY at 10.7 / 12.9), so black paper's recorded exception is withdrawn; every ink passes (`--ash` 5.11:1 on the lightest ground). Costs recorded: the sky's lit reds, where they show opaque behind the skyline, sit 5.5–6.2 from VENGEANCE's alarm fill and its brightest orange 7.5 from HOLIDAY's, as the maintainer foresaw; nothing written may sit on sky lighter than about L\* 19.5; Bat-Clawd sits above the lit band, where the sky is not his own hue. **Then, the same day, black in the red:** the maintainer liked A "bastante" but asked for some tones of black in the red, not another gradient but the shadow of clouds as in the references. On a second board (none, soft, medium, strong) **the maintainer chose the medium**: soft black masses, only darker than the sky and never lit, banks framing the top corners [18], billows across the lit band above the skyline [03] and a few flat streaks [17]. The clouds' drift, the blimps' and their beams' motion were not observed (no video) and are decided on screen at the engine PR.

19. **DARK DECO at its build** (2026-10-24, #145), each picked on screen beside the references ([`dark-deco-build.md`](dark-deco-build.md)):
    - **the series' chest symbol**, traced from a clean drawing the maintainer supplied [140] after traces from the aired frames [92] [134] read strange, on its 1.76:1 oval under a thin rim (1.2 units), black in the masthead as on the chest and the disc;
    - **Bat-Clawd black, navy only where the light touches**: the maintainer, on screen, "the primary colour is black, and only with the touch of light does the cape and mask turn navy"; the cape longer; gloves, boots and trunks black, as the HD frames and DC's standee show; the cowl's rim the show's blue muted to a neutral (`#4a66b0`), as the Costume Rule asks;
    - **alarmed, he stays in his suit**, his arms out as in most Themes, the cape flung open, the aura lit (all black when something needs you "made no sense" to the maintainer);
    - **the Signature: arms crossed**, the official key art of the 2004 Volume One DVD, still HBO Max's [76] [77], after the opening's landing (a tent of cape [94], three shapes) and the red-sky stand [03] (too near KNIGHTMARE's coat at 54px) were seen and set aside;
    - **words with no card read through a veil** (the night report, an empty list), the softest that keeps `--ash` at 4.5:1 over the sky under a beam;
    - **the beams more visible** (strength 0.14), and the blimps hovering, as the storyboard draws them;
    - **display name DARK DECO**, free of marks; I AM THE NIGHT is a live Warner mark.

20. **SAME BAT-TIME at its build** (2026-10-28/29, #148), each picked on screen beside the references ([`same-bat-time-build.md`](same-bat-time-build.md), [`same-bat-time-pop.md`](same-bat-time-pop.md)):
    - **the chest bat traced from the Savings Bonds short** (ca. 1966, public domain) [54], sixty frames stacked: 1.88:1 on a 1.39:1 oval with no rim (the dossier's 2.6:1 was read from soft frames);
    - **Needs you is HOTLINE**: BATPHONE is DC's live mark in the EU and the UK, software and entertainment among its classes; FOILED became FIASCO (decision 13), WHAT NOW? kept;
    - **less gloom, reopening decision 7's premise**: at round 4 the maintainer found the night-navy draft, soft clouds and a pale Signal "muito gloom pra um tema do Adam West" and asked to embellish and go further, after the series' iconic scenes. Of three directions (the cliffhanger cards' ultramarine, the animated opening, fight night) **the animated opening** won: the cards keep the credits' navy over the opening's flat cool fields (cel blue, the fight cards' green, teal, a shard of the cliffhanger ultramarine), a black skyline at the foot with henchmen in fedoras rising behind it, as a still decor; no clouds (dropped on screen), but the series' own Bat-Signal [17], its bat traced from the shot, glowing low and large over the city in a still sky. The warm half of the series' pop (red, orange, magenta) stays out: it is other Themes' alarms;
    - **the report's headings on yellow label plates**, as the Batcave labels its gadgets; **the urgent notice tilted -2.5°**, as the lairs' camera (a new shared `--notice-tilt`, none elsewhere); the POW! balloon a size above the stamp;
    - **Bat-Clawd**: the Batusi on the perch, revealed in steps; the painted brows in every pose; the fight with a two-tone burst; asleep under a satin nightcap with a Zzz; flying on **the Bat-climb**, nearly flat out from the wall, one arm up the rope and one holding it at his chest, the rope across his front;
    - **display name SAME BAT-TIME**, free of marks.

21. **VERY DARK GREY at its build** (2026-10-30/31, #149), each picked on screen beside the film's frames ([`very-dark-grey-build.md`](very-dark-grey-build.md); engine PR #171):
    - **the whole app as pieces, in Lego's own colours, reopening decisions 8 and the G1 ground.** Of three directions for decision 9 (a baseplate, plates that fit, a Batcave console), the console won. On screen the dossier's grey and magenta read "BEM ruim, muito distante do Batman Lego": the maintainer asked for the film's and Lego's colours (blue, red, dark blue, yellow, black, grey). Of three palettes, **black and yellow** (the teaser's cards [44] [45]) won: the masthead a yellow title-card plate with black letters, the tabs on black, the cards dark plastic tiles with a lit edge and a side under them;
    - **the alarm is the Batcomputer's red, not the neon magenta**, which "se comunica muito pouco com o tema": white letters on red plates as its headers [31] [36], the lit disc its big red button [33]. Costs recorded as an exception: the fill (LEGO Bright Red `#c91a09`) is 5.8 ΔE00 from VENGEANCE's `#e3121b` and 9.6 from BECOME A BAT's fill; the lit red `#ff7f71` is 7.2 from BECOME A BAT's `#f2605e` and 9.6 from Clawd. Every saturated red that reads on the tiles sits within 10 of another Theme's alarm; the two are told apart by form (filled plates and a translucent button against VENGEANCE's ink stamps). Red is worn nowhere else at rest. What waits is the screens' blue (`#7fd3ff`), each card's rule a round lit piece in its tier's colour;
    - **the ground: the Batcave's walkway as the film shows it** [40] [39], in one-point perspective, built of pieces: lit floor tiles either side of a dark lane with gold bat plates down it, ribbed yellow rails, studded platforms lit blue, stepped walls and consoles, the Batcomputer's wall of screens in a bat's shape at its far end. A still drawing in `--decor`. On the way the maintainer turned down a studded baseplate with a neon bat, a top-down Batcave and a top-down Gotham ("bem feia"), and a scattered build of plates ("blocos aleatórios"); a brick drawn side-on as an object stays out (lego-batman.md, section 3.2);
    - **the Lexicon:** CAPE UP for what needs you (I NEED A HERO is a live game-software mark), AUTOGRAPH? kept by the maintainer though AUTOGRAPH is others' live class-9 mark, ANY DAY NOW for waiting (HELLO is many others' mark), EPIC FAIL, FAN MAIL, Stalled;
    - **Bat-Clawd**: a black cowl with a hard shine and tall ears set on its corners, a black torso under the 2017 oval (traced from the LEGO Group's photograph of the figure, rimmed black on the yellow masthead), a pouch belt, a stiff bell cape with pointed hems carried on behind his legs, his arms and legs edged so they read on it (the maintainer, on screen); flying, the glide [65]; alarmed, the leap facing us [69]; asleep wrapped in the cape; on the perch, dinner for one [46] [60];
    - **display name VERY DARK GREY**, free of marks.

Display names are still decided on screen, at each Theme's build.
