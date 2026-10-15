# Design jury: Wave 2 Themes

Jury note, 2026-10-14. Scope: the four Wave 2 dossiers in this folder, [`dark-knight-returns.md`](dark-knight-returns.md) (ANCIENT GRACE), [`absolute-batman.md`](absolute-batman.md) (BLUE COLLAR), [`year-one.md`](year-one.md) (BECOME A BAT) and [`arkham-asylum.md`](arkham-asylum.md) (SERIOUS HOUSE). They are judged against the brief ([`wave-2-brief.md`](wave-2-brief.md)), against each other, and against the four shipped Themes as built at v1.2.0 (`app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `words.ts`, `atmospheres.ts`, `emblems.ts`), with `PRODUCT.md`, `DESIGN.md`, `CONTEXT.md` and ADR 0001. Where the code and a Wave 1 dossier differ, the code wins. The scoring rules and the Wave rules are those of [`jury-wave-1.md`](jury-wave-1.md) §1 and §4, and its §10 decisions are not reopened.

**How it was judged:** with the `impeccable` skill's critique lens (distinctiveness, hierarchy, contrast and anti-patterns), applied by hand to the dossiers' hex values and grid coordinates. The skill's detector and its browser passes need a running page, and no Wave 2 Theme is built yet, so they were not run. Everything is judged at the real size: a 64px Signal disc, a 320x440 panel, and Bat-Clawd at 54–78px. His viewBox is 28 units wide, so one unit is about 2.1px at the header's 60px and 1.9px at 54px; nothing under 1 unit counts. So this is a paper critique: every visual call that can only be made on the real window is marked **decide on screen**. Colour distances are CIEDE2000 (ΔE00) and contrast is WCAG 2, computed by us with our own script (it reproduces the Wave 1 jury's figures: 14.6 for `#ff405f`–`#e3121b`, 5.2 for amber–brass, 9.6 for Nolan's red–Clawd). Under ~3 ΔE00 a difference is hard to see; above ~10 it is plain.

Short names below: **DKR** (ANCIENT GRACE; TRIUMPHANT in the draft this note judged, renamed in §9.11), **Absolute** (BLUE COLLAR), **Year One** (BECOME A BAT), **Arkham** (SERIOUS HOUSE); the shipped Themes by their display names.

## TL;DR

- **All four stay.** As drafted, every pair clears the line; the lowest score is 4 of 5. No draft is in Snyder's Wave 1 position.
- **Parallel writing converged again, in two pairs.** Each pair shares a palette, and only the alarm tells them apart:
  - **DKR and Year One:** grounds 0.5 / 2.0 / 4.5 ΔE00 apart (abyss / surface / raised), both run in Bone (3.1), and their waiting yellows are **0.9** apart (`#e3dc86` vs `#e6e08a`). Both are Miller books. Year One read the other drafts but never saw DKR's.
  - **Absolute and Arkham:** grounds 2.0 / 5.0 / 5.7, working inks 5.7 (lavender `#b8b0e0` vs periwinkle `#a7a9e8`), Bone 1.4.
  - **Fix:** split the green-grey family between DKR and Year One, each moving toward its own samples. Year One keeps the canary. Absolute keeps the violet, and Arkham moves to a plum-black with Bone as its working ink (§3.1, §3.2).
- **One Wave rule is broken.** Bangers is DKR's display and stamp face and Absolute's stamp face. We give it to DKR (§3.3). Year One's Neucha and Arkham's Patrick Hand SC are both upright printed hands: the same register, so Type scores "~" (§3.4).
- **More shared parts:**
  - Three grey suits with a big black chest mark and no oval (DKR, Absolute, Year One). DKR's and Absolute's suits are 7.3 apart.
  - Two cowls with ears reaching y = −1 (Absolute, Arkham).
  - Two flying Poses with the cape over the head (DKR, Arkham).
  - Two noise Atmospheres re-cut in place every tick (DKR's static, Arkham's scratches).
  - Bats twice: Absolute's Atmosphere and Year One's Signature.
  - BROKEN and FROZEN in two Lexicons each.
  - Two report closes that copy KNIGHTMARE's word for word ("Get some sleep.", "Some of it still needs you.").
  - Three credit strings that would print "after after" if used as the `film` field.
- **A correction to the brief.** WATCHFUL PROTECTOR's *Sonar* shipped standing, not crouched (`suits.ts`: `SONAR` holds a front-on stand, and the ring plays only in the reveal). So two front-on stands are taken, and Year One's swarm (a front-on stand plus a few bat specks) is the riskiest Signature in the Wave.
- **At the real size:**
  - Absolute's chest block sits half a unit under the cowl at 1.04:1, so it reads as the cowl dripping (Wave 1's Snyder fault). Its olive belt is 1.04:1 on the suit and disappears.
  - DKR's 9-unit chest bat doesn't fit between the jaw and the belt, and it merges with the belt (1.51:1) and with the cape at its sides.
  - Year One's orange jaw is 1.16:1 on its light grey suit.
  - Arkham's Bat-Clawd is a silhouette (suit 1.36:1, cape 1.04:1 on the ground): its bleeding hem and its chest bat don't exist at rest.
- **Engine:** the four new Atmosphere kinds become two painters and one option on the ash painter. One `--font-headline` token serves three Themes. No Theme needs the viewBox changed.
- **Twelve questions** in §7. The biggest are the two palette splits (1, 2), the two font owners (3, 4), Arkham's emblem against ADR 0001 (7) and Absolute's lemon alarm beside PALE MOONLIGHT's gold (8).

## 1. Distinctiveness matrix

**How an axis is scored** (unchanged from Wave 1). C = clearly different, ~ = close, = = same.
- **Palette:** ground family (the surface and raised tones), Alarm hue, working ink. Two of three differ → C; one → ~; none → =.
- **Type:** display family and stamp family. Both differ → C; one shared, or the same register (say, two condensed grotesques) → ~; both shared → =.
- **Silhouette:** cowl ears, cape hem, chest symbol. A difference counts only if it is at least 1 grid unit (about 2px). Two of three → C.
- **Atmosphere:** what moves, how it moves, and the light's colour and direction. Two of three → C.
- **Voice:** the frame (who speaks, which world the Lexicon draws from) and the register. Both differ → C; one → ~; neither → =.

A Theme stays only if it scores C against every other Theme on at least 3 axes. Grounds are given as surface / raised ΔE00; every abyss in the app sits within 0.5–6 of every other, as near-blacks do.

**The four drafts against the four shipped Themes**

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| DKR – VENGEANCE | C: green-grey vs warm black (7.0 / 18.1); cyan vs red (75.6); Bone vs amber (29.6) | C: Bangers / Bangers vs Anton / Special Elite | C: wide-set ears, two-tail hem, big black bat on grey vs standard ears, zigzag, a dark dash | C: specks flickering in place and a roll bar, a white glow low vs diagonal rain, red glow from below | C: a broadcast with a Lexicon vs Bruce's journal with none | **5** |
| DKR – PALE MOONLIGHT | C: green-grey vs smog brown (7.4 / 11.5); cyan vs gold (47.3); Bone vs steel (25.0). Its waiting yellow is 12.2 from the gold alarm | C: no family shared | C: no oval, no brass; two tails vs scallops | C: flicker in place vs falling flakes; white vs brown smog | ~: both are news media at night. The medium differs (TV vs print) and the Lexicons share no word, but the frame is a cousin, as Wave 1 feared | **4** |
| DKR – WATCHFUL PROTECTOR | C: hue 140° vs 263° (10.0 / 12.5); cyan vs blue (28.7, plain, same family); Bone vs mercury (22.0). DKR's alarm is 12.9 from WATCHFUL PROTECTOR's *working* mercury | C | C: wide-set ears vs standard; two tails vs a straight hem; a black bat on grey vs a lit relief on black | C: flicker vs a still skyline; both lit from below, white vs mercury | C: a TV studio vs an ops briefing. "Control room", LIVE and STANDBY lean toward radio procedure; keep them few | **5** |
| DKR – KNIGHTMARE | C: green-grey vs scorched brown (15.6 / 20.4); cyan vs crimson (75.4); both Bone (10.2) | C | C: a cape vs a duster; a big bat on an open chest vs a 4.4-unit bat inside lapels | C: static vs ash on the wind | C: broadcast vs a veteran with Alfred | **5** |
| Absolute – VENGEANCE | C: violet vs warm black (14.4 / 19.0); lemon vs red (63.6); lavender vs amber (43.5) | C: Bungee / Bangers vs Anton / Special Elite | C: ears to y = −1, an 8×2 block, three blades a side vs standard ears, a dash, a zigzag | C: bats crossing vs rain falling; a violet band from above vs red from below | C (narrow): both are Bruce, a hopeful worker vs a bleak detective; a work-site Lexicon vs none | **5** |
| Absolute – PALE MOONLIGHT | C: violet vs brown (16.0 / 22.7); **lemon vs gold, 15.8: plain, but both yellow** (question 8); lavender vs steel (13.8) | C | C: no oval, no brass belt, no scallops | C: bats vs snow; band above vs smog below | C: a shift vs a newsroom | **5** |
| Absolute – WATCHFUL PROTECTOR | C: violet vs blue steel (11.6 / 13.8); lemon vs blue (73.2); lavender vs mercury (28.0) | C | C | C: bats vs a still skyline | C: a work shift vs an ops briefing | **5** |
| Absolute – KNIGHTMARE | C: violet vs scorched brown (16.6 / 22.9); lemon vs crimson (65.0); lavender vs Bone (34.1) | C | C: a bladed cape vs a duster, goggles and scarf; a block vs the BvS bat | ~: bats vs ash, but both cross sideways a few pixels a tick and both are lit from above, with the very same `--haze-inset` (`-35% -20% auto -20%`) | C: young and hopeful vs weary with Alfred. But the closes echo (§3.13) | **4** |
| Year One – VENGEANCE | C: olive vs warm black (7.9 / 19.6); magenta vs red (35.9); Bone vs amber (27.1) | C: Permanent Marker / Neucha vs Anton / Special Elite | ~: the same cowl map and ears; a feathered hem of 1-unit teeth is close to an even zigzag at 54px; the chest bat is the same width and place. What differs is the light suit (the bat at 7.22:1 against VENGEANCE's dash at 1.52:1) and the trunks | C: smoke rising vs rain falling; olive vs red | C (narrow): Gordon wry vs Bruce bleak, both in the first person at night | **4** |
| Year One – PALE MOONLIGHT | C: olive vs brown (7.9 / 12.0); magenta vs gold (65.2); Bone vs steel (27.0) | C | C: feathered hem vs scallops; a bat vs an oval (same ears) | C: smoke rising vs snow falling, though both have a smog from below | C: a cop's notebook vs a newsroom | **5** |
| Year One – WATCHFUL PROTECTOR | C: olive vs blue steel (12.1 / 17.5); magenta vs blue (37.7); Bone vs mercury (22.7) | C | C: feathered vs straight; a black bat on light grey vs a lit relief on black (same ears). **The Signatures are both front-on stands** (§3.8) | C: moving smoke vs a still skyline | C (narrow): Gordon belongs to both worlds, but the shipped WATCHFUL PROTECTOR words never name him; a private notebook vs a briefing, wry vs dry | **5** |
| Year One – KNIGHTMARE | C: olive vs scorched brown (15.8 / 20.9); magenta vs crimson (23.2); both Bone (7.3) | C | C: cape vs duster; a 7-unit bat vs 4.4 | C: smoke rising vs ash blown sideways | ~: two weary men at night; a veteran with Alfred's care vs an anxious new cop | **4** |
| Arkham – VENGEANCE | C: violet vs warm black (9.7 / 14.2); claret vs red (25.8); periwinkle vs amber (46.7) | C: IM Fell English SC / Patrick Hand SC vs Anton / Special Elite | C: tall ears, a bleeding hem. Both chests are dark on dark (1.34 vs 1.52) | C: hairlines flickering in place vs streaks falling (both are thin lines); cold light from the right vs red from below | C (narrow): the house's rounds vs Bruce's journal; both quiet and nocturnal | **5** |
| Arkham – PALE MOONLIGHT | C: violet vs brown (11.3 / 17.3); claret vs gold (54.6); periwinkle vs steel **9.4** (~) | C | C: tall ears, a bleed vs scallops, no oval or belt. Both suits are dark plum-grey (8.6 apart); the oval tells them apart | C: scratches vs snow; side light vs below | C: a house vs a newsroom | **5** |
| Arkham – WATCHFUL PROTECTOR | C: violet vs blue (7.9 / 11.7, the closest ground); claret vs blue (39.1); periwinkle vs mercury (26.9) | C | C: tall ears; a hidden bat vs a lit relief. A dithered straight hem vs a straight hem is ~ | C (narrow): both have a still layer; scratches every tick vs one window a second; right vs below | C: a house vs ops. "ROUNDS · 02:14" borrows WATCHFUL PROTECTOR's "GOTHAM · 02:14" shape | **5** |
| Arkham – KNIGHTMARE | C: violet vs scorched brown (12.9 / 18.2); claret vs crimson 12.9 (plain, one red-pink family; the two `--ink-hot`s are 10.2); periwinkle vs Bone (37.6) | C | C: cape vs duster; tall ears; a real bat vs the BvS bat | C: scratches vs ash; cold side light vs warm from above | C: a house vs a veteran. But Arkham's close copies KNIGHTMARE's "Get some sleep." (§3.13) | **5** |

**The four drafts against each other**

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| DKR – Absolute | C: green-grey vs violet (19.2 / 23.1); cyan vs lemon (47.9); Bone vs lavender (26.5) | ~: **both stamp in Bangers** (a broken Wave rule, §3.3) | C (narrow): wide-set ears vs ears to y = −1; two tails vs six blades. The chests are both a big black mark on a mid-grey suit, and the suits are 7.3 apart | C: static vs bats | C: a broadcast vs a work shift | **4** |
| DKR – Year One | **~: ground 0.5 / 2.0 / 4.5, both Bone (3.1), waiting yellows 0.9.** Only the alarm differs (61.8) | C: Bangers vs Permanent Marker / Neucha | C (narrow): wide-set vs standard ears; two tails vs feathered. Both chests are a black bat on a grey suit | C: specks flickering vs smoke rising; a white glow vs olive smog | C: TV vs a notebook (both Miller) | **4** |
| DKR – Arkham | C: green-grey vs violet (14.8 / 18.7); cyan vs claret (70.0); Bone vs periwinkle (29.7) | C | C: wide-set vs tall ears; tails vs bleed; a visible bat vs a hidden one | **~: both are 1px marks re-cut in place each tick, and nothing falls.** Only the light differs (white and low vs cold from the right), plus the extras (a roll bar vs still panes) | C: a broadcast vs a house | **4** |
| Absolute – Year One | C: violet vs olive (20.9 / 27.1); lemon vs magenta (80.0); lavender vs Bone (29.9). Absolute's lemon is 8.3 from Year One's canary | C: Bungee / Bangers vs Permanent Marker / Neucha | C, only through Absolute's tall ears. Without them, ~: blades vs feathered points, a block vs a bat, both black on grey | C: bats vs smoke (Year One's bats are its Signature, another axis) | ~: two working men's night notes ("Shift notes" and "Notebook"; "On the clock" and "First year on the job") | **4** |
| Absolute – Arkham | **~: ground 2.0 / 5.0 / 5.7, working 5.7, line 5.7, Bone 1.4.** Only the alarm differs (69.0) | C | C: both ears reach y = −1 (=), but blades vs bleed, and a visible block vs a hidden bat | C: bats vs scratches | C: a work shift vs a house | **4** |
| Year One – Arkham | C: olive vs violet (16.3 / 25.8); magenta vs claret **11.9** (one family); Bone vs periwinkle (33.0) | **~: both stamp in an upright printed hand** (Neucha, Patrick Hand SC) | C: standard vs tall ears; a visible vs a hidden chest. Both hems are soft and ragged at 54px (~) | C: smoke vs scratches | C: a notebook vs a house | **4** |

**Result:** every pair passes, and the lowest score is 4. Unlike Wave 1, no Theme is below the line. But the two "~" palettes are near-identical, one font is used twice against a written rule, and §3 lists eleven more shared parts. Wave 1 fixed collisions in pairs that passed too (2022 – Burton scored 5 and still lost its ribbed glider). These should be fixed before the engine PRs.

**After the §3 changes:**
- DKR – Year One: Palette becomes C (grounds 6.4 / 11.1, no shared yellow). That makes **5**.
- Absolute – Arkham: Palette becomes C (plum vs violet, 9.5 / 11.0; Bone vs lavender, 19.6). Silhouette stays C, now through the ears. That makes **5**.
- DKR – Absolute and Year One – Arkham: Type becomes C. That makes **5** each.
- DKR – Arkham: Atmosphere becomes C once Arkham's scratches stay and fade instead of re-cutting every tick. That makes **5**.
- Year One – VENGEANCE: Silhouette becomes C once the hem has four deep points. That makes **5**.
- Absolute – Year One: Silhouette drops to ~ (Absolute's ears return to standard), and Voice becomes C (Year One's work-shift lines go). It stays **4**.
- Absolute – KNIGHTMARE (Atmosphere ~), DKR – PALE MOONLIGHT (Voice ~) and Year One – KNIGHTMARE (Voice ~) stay at **4**. All three are inherent to the sources, and none needs a fix.

### After the revisions

The four dossiers were revised in parallel after §9, and each measured the others against this note's proposed values. So we measured the eight final palettes against each other: the four revised token maps and the four shipped stylesheets, with `var()` resolved. Same script and checks as above. **Result: no rule breaks, and no score changes.** Some quoted distances are out of date (flag 7).

**Final key colours**

| Theme | Surface / raised | Alarm | Working | Waiting | Bone | Suit |
|---|---|---|---|---|---|---|
| DKR | `#131a17` / `#1d2622` | `#3fdcff` | Bone | `#bde3a1` | `#e9f2ee` | `#666864` |
| Absolute | `#17132a` / `#221c3c` | `#ecf05a` | `#b8b0e0` | `#d79bbd` | `#f1eef6` | `#3f6b6e` |
| Year One | `#191b0b` / `#292c11` | `#ff4dd2` (A3: `#f2605e`) | Bone | `#e6e08a` | `#e2e3c8` | `#d0d3cc` (S1; S2 `#9a9e9a`) |
| Arkham | `#1a0f15` / `#2b1822` | `#ec5c94` | Bone | `#d6c49a` | `#f3e5e8` | `#55425e` |

**Closest other Theme, per role** (ΔE00, against all seven others)

| Theme | Surface | Raised | Alarm | Working | Waiting | Bone | Suit | Alarm vs Clawd |
|---|---|---|---|---|---|---|---|---|
| DKR | Year One 6.4 | WATCHFUL PROTECTOR 10.0 | WATCHFUL PROTECTOR 28.7 | Year One 9.7 | Year One 12.0 | WATCHFUL PROTECTOR **4.5** | Absolute 13.9 | 59.2 |
| Absolute | Arkham 9.5 | Arkham 11.0 | PALE MOONLIGHT 15.8 | PALE MOONLIGHT 13.8 | VENGEANCE 26.5 | Arkham 5.1 | DKR 13.9 | 46.2 |
| Year One | DKR 6.4 | DKR 11.1 | Arkham 11.9 | KNIGHTMARE 6.9 | Arkham 11.4 | PALE MOONLIGHT 6.8 | DKR 33.7 | 34.6 |
| Arkham | VENGEANCE 7.1 | VENGEANCE **9.2** | Year One 11.9 | DKR 12.7 | KNIGHTMARE 11.1 | Absolute 5.1 | PALE MOONLIGHT 14.6 | 24.2 |

Inside each Theme, the alarm sits far from its own inks. Alarm to waiting / to working: DKR 36.0 / 22.8, Absolute 56.5 / 54.8, Year One 67.9 / 51.2 (A3: 48.4 / 40.8), Arkham 42.9 / 32.6. The abysses and cowls are near-blacks, 1.8–4.5 apart, as the shipped ones are.

**Flags and verdicts:**
1. **Bone, DKR – WATCHFUL PROTECTOR 4.5** (also Absolute – Arkham 5.1, WATCHFUL PROTECTOR – Absolute 5.3). No fix. Bone is the text white, and near-whites sit close, as near-blacks do: VENGEANCE and PALE MOONLIGHT ship 2.5 apart. The ~5 rule is for working and waiting inks, and Bone is not WATCHFUL PROTECTOR's or Absolute's working ink. DKR's untinted Bone (`#eef1e8`) would be 6.0 from WATCHFUL PROTECTOR but 4.5 from PALE MOONLIGHT, so the tint only moves the near pair. Keep it.
2. **Raised tones under ~10:** VENGEANCE – Arkham 9.2, and WATCHFUL PROTECTOR – DKR at 10.0. Both are the values §2 proposed. DKR's is on the line. Arkham's misses it by 0.8: it is the one recorded exception, judged on screen at Arkham's build, with `#2e1724` as the fallback (§3.2). No fix now.
3. **Alarms:** Year One – Arkham 11.9 and KNIGHTMARE – Arkham 12.9 are above 10, as §3.10 accepted. Every recommended alarm is at least 24.2 from Clawd. No fix.
4. **Year One's A3** (`#f2605e`) is 6.1 from KNIGHTMARE's alarm and `--ink-hot`, 5.0 fill to fill, and 10.4 from Clawd. It breaks the ~10 alarm rule against KNIGHTMARE. Year One's dossier says so itself. A3 stays a comparison picture, not an available alarm. A2 stays.
5. **Cross-role pairs:** Absolute's lemon against Year One's canary (8.3, §3.11) and DKR's cyan against WATCHFUL PROTECTOR's mercury (12.9, §3.10) are unchanged and already settled. One new near pair: Arkham's waiting paper `#d6c49a` is 8.9 from KNIGHTMARE's working Bone. It is above 5, and the stamp word carries the tier, as in §3.11. No fix.
6. **DKR's fallback alarm:** none to measure. Palette B is withdrawn in the dossier.
7. **Stale quotes in the dossiers.** DKR, Year One and Arkham run in Bone, and each tinted its own after this note. Each then measured the others against the Bones this note proposed (`#eef1e8`, `#ecebdc`, `#ece9f3`). The final pairs: DKR – Year One **9.7** (quoted 6.0 and 7.5), DKR – Arkham **12.7** (quoted 9.9 and 11.7), Year One – Arkham **17.4** (quoted 18.1 and 12.4), Absolute's lavender – Arkham's Bone **19.6** (quoted 18.1 in Absolute's dossier, and in §1 and §2 above). The suits have the same problem. DKR and Absolute quote Year One's S2 grey (20.1, 25.3); the recommended chalk S1 is 33.7 and 37.8. Absolute quotes Arkham's draft suit (31.6); the final `#55425e` is 30.4. No verdict changes: the closest working inks are still 6.9 apart. The dossiers, and §1 and §2 here, now quote the corrected numbers; the palettes don't change.

**Contrast:** every text token of the four Themes passes 4.5:1 on its abyss, surface and raised tone, and on its lightest hover ground. The tightest are Year One's A3 (4.52 on raised), Arkham's `--signal-hot` (4.92 on its hover tone, 5.19 on raised) and Year One's A2 (4.95 on raised). Ink on the alarm fill: DKR 7.18, Absolute 12.33, Year One 5.46 (A3, Bone on the red: 4.83), Arkham 6.02.

## 2. Verdict per Theme

- **DKR (TRIUMPHANT): keep, with changes.** The dossier does what the brief asked: it finds DKR a place of its own. It moves from print to broadcast, takes a cyan alarm from the lightning and a green-grey from Varley's own paint, and makes the lightning leap a Signature without a flash.
  - **Ground:** move toward the tank grey's hue, about h 166 (`#131a17` / `#1d2622`, the rest re-derived). That is 6.4 / 11.1 from Year One's moved ground and 8.3 / 10.0 from WATCHFUL PROTECTOR's (§3.1).
  - **Waiting ink:** off Carrie Kelley's yellow, which is 0.9 from Year One's canary. Proposed: pale phosphor green `#bde3a1`. It is 36.0 from DKR's own cyan, 22.7 from its Ash and 12.0 from Year One's canary, and reads at 10.2:1 on the lightest ground. Decide on screen.
  - **Fonts:** Bangers stays, for the display and the stamps (§3.3). Point `--font-headline` at Barlow 600 for the empty-state and sheet titles: Bangers is caps-only, and "OUR PANEL AGREES: NOTHING NEEDS YOU." in slanted comic caps shouts an all-clear.
  - **Lexicon:** Error BREAKING → **DEAD AIR**. Waiting OVER TO YOU → **YOU'RE ON**: OVER TO YOU is 4px wider than PERMISSION in Bangers, which the Wave rule forbids. FROZEN stays (§4).
  - **Chest bat** at most 8 units wide, starting at y ≥ 6, with at least 1 unit of grey above the belt, or a belt lighter than the bat (§5).
  - **Suit:** a neutral grey, for instance `#666864`, at least 10 from Absolute's. The two are 7.3 apart today.
  - **Hem:** the two cape tails end at y = 12, the bottom edge of the viewBox, so their rim is cut. End them at 11.5.
  - **Report close:** "Some of it still needs you." is KNIGHTMARE's sentence; change it.
  - **Lit disc:** a white core into cyan is the same kind of lens as WATCHFUL PROTECTOR's white-hot core into blue; the scanlines must carry the difference. Decide on screen.
  - **Atmosphere:** check on screen that the static reads as a set left on, not a broken one (the dossier's own risk).
  - **Palette B** (arcade magenta) is no longer available. It is 8.0 from Year One's alarm and 5.4 from Arkham's.
- **Absolute (BLUE COLLAR): keep, with changes.** It has the clearest scores against the shipped Themes (5, 5, 5, 4) and the boldest single idea, an alarm that looks like a sound effect.
  - **Stamps** leave Bangers (§3.3): Bungee, so one family does the display and the stamps (work-site signage, as KNIGHTMARE does with Archivo), if PERMISSION fits; otherwise Luckiest Guy.
  - **Ears** go back to the standard height. The tall ears go to Arkham (§3.6), and Absolute's size reads through its shoulders, block and blades.
  - **Chest block** at y 6–8, not 5.5 (§5).
  - **Belt** at least 1.5:1 against the suit; the pouches alone carry it today.
  - **Suit** toward its sampled teal with more chroma, `#3f6b6e`: 10.7 from DKR's suit as drafted, more once DKR goes neutral.
  - **Lexicon:** Needs you stays standard, because "Your turn" is KNIGHTMARE's "Your call" in the same slot. Error BROKEN → **BLOWN**, a blown fuse (§3.12).
  - **Report close:** "Shift's not over. Some of it needs you." echoes KNIGHTMARE; change it.
  - **Credit string** without "after" (§3.15).
  - **Lemon alarm** beside PALE MOONLIGHT's gold: question 8. A flat lemon disc at L* 92 will be the brightest lit disc in the app (PALE MOONLIGHT's gold core is L* 81). Check it beside the mascot.
  - **Atmosphere** as an option of the ash painter (§6).
- **Year One (BECOME A BAT): keep, with changes.** It is the most careful dossier: it read the other drafts and stepped around them. It still landed on DKR, which it couldn't see.
  - **Ground:** toward its khaki-olive samples, about h 110 and C* 17 (`#191b0b` / `#292c11`). That is 6.4 / 11.1 from DKR's moved ground and 8.6 / 12.3 from PALE MOONLIGHT's.
  - **Keeps** the canary waiting ink and the upright printed hand (Neucha) for stamps, headings and report (§3.1, §3.4).
  - **Cowl** a neutral near-black, not blue-black. The 1987 covers show it near black, the dossier admits the blue was not sampled, and grey and blue is *The Animated Series*' suit in Wave 3 (§8).
  - **Jaw:** the orange jaw is 1.16:1 on the light suit. Add a 1-unit cowl-black collar under it, or lighten the suit (`#b4b8b3` reaches only 1.57:1). Decide on screen.
  - **Chest bat:** 6 units wide, centred at y 7.2, so it clears the jaw row by a unit. At 7 units and y 6.6 it touches it.
  - **Feathered hem:** four deep points per half (at least 1.5 units deep and 1.5 apart, uneven), not five 1-unit teeth. Fine teeth read as VENGEANCE's zigzag or Arkham's dither at 54px.
  - **Flying:** not the tucked leap, which is DKR's Signature figure. A trailing cape with the feathered hem.
  - **Signature:** the swarm needs one lopsided cloud, at least 4×3 units, up and to the left, not four 5px specks (§3.8). Decide on screen beside WATCHFUL PROTECTOR's stand.
  - **Lexicon:** SEE ME is decided on screen (§4).
  - **Tagline:** "First year on the job." moves off the work frame, which is Absolute's. For instance "New in town.", which is true of both men.
  - **Credit string** without "after".
  - **Alarm:** keep A2 `#ff4dd2`. A1 (`#ff4fa3`) is no longer available: it is 4.1 from Arkham's alarm.
- **Arkham (SERIOUS HOUSE): keep, with changes.** The strongest Voice in the Wave (rounds, doors, keys) and the most respectful handling of its subject. It has the thinnest palette, though: every family in the book is already someone's, and its violet is a 40° shift made to dodge WATCHFUL PROTECTOR.
  - **Ground:** off violet, to a plum-black (`#1a0f15` / `#2b1822`, h 344–346): 9.5 / 11.0 from Absolute's, and at least 7.1 / 9.2 from every other Theme's. Decide on screen whether claret on plum reads as the Joker's palette (question 2).
  - **Working ink:** Bone, the dossier's own fallback. That is 19.6 from Absolute's lavender, and it ends the 9.4 against PALE MOONLIGHT's steel.
  - **Stamps** off the upright hand (§3.4): IM Fell English SC at about 10.5px, if PERMISSION fits the narrow margin, or a scrawl hand.
  - **Keeps the tall ears** (§3.6). Draw the tips as a front layer inside the viewBox, the dossier's option (b), not by raising every Theme's viewBox.
  - **Flying:** the descent goes; it has no source, and DKR's drop already puts a cape over the head. A trailing cape with the bleeding hem.
  - **Scratches** that stay and fade over 2–3 seconds, not re-cut every tick (§3.9).
  - **Lexicon:** UNLOCK → **LET IN?**; FROZEN → standard **Stalled**; BROKEN stays (§4).
  - **Report close:** "Every door is shut. Get some sleep." copies KNIGHTMARE; change it. "Every…" also opens the tagline, the empty state and the close.
  - **Case titles** in Barlow (`--font-case-title: var(--font-body)`), as in every other Theme. Long session titles in a rough old-style small-caps face at 13–14px are hard to read.
  - **Bleeding hem:** the cape is 1.04:1 on the ground, so the bleed exists only if the rim follows the dither. Check at 60px.
  - **Mirror:** the glass is 1.15:1, so it reads through its Ash frame and two white eyes. Check it beside KNIGHTMARE's coat, which is also a dark mass to the right.
  - **Emblem:** question 7.
  - **Credit string** without "after".
  - **Alarm:** the claret stays (§3.10).

## 3. Cross-theme collisions to fix

**Tie-breaks, in order:** a collision inside a Theme outranks one between Themes (Wave 1); the Theme whose source owns the contested thing most strongly keeps it; between a draft and a shipped Theme, the draft moves; when one side has an in-frame alternative and the other doesn't, the side with the alternative moves.

1. **DKR and Year One share a palette.** Grounds 0.5 / 2.0 / 4.5 (DKR h 140, C* 5–7; Year One h 122–127, C* 7–12); both run in Bone (3.1); waiting yellows 0.9.
   - **Fix:** split the family. DKR moves toward the tank grey (h ~166, `#131a17` / `#1d2622`) and Year One toward the olive-khaki (h ~110, C* ~17, `#191b0b` / `#292c11`). They end 6.4 / 11.1 apart, and each stays at least 7 / 10 from every shipped ground. A plain khaki (h ~102) was tried for Year One and lands 4.9 / 7.3 from PALE MOONLIGHT, so it is out. The working inks stay Bone in both; with the grounds apart, Palette scores C.
   - **Tie-break:** neither owns the green-grey outright. DKR's comes from Varley's own paint (the tank, h 152–158, the highest-trust sample in the Wave), and Year One's from both of Lewis's colourings (khaki h 100–125) and the #404 cover (h 125). So each moves toward its own samples' end. **The canary goes to Year One:** Gordon's yellow caption boxes are its Voice and its report headings, sampled from the recolour. DKR's yellow is Carrie Kelley's, read from a later-printing screenshot, and its own dossier says Varley's painted yellow is ochre (PALE MOONLIGHT's family). DKR's waiting ink moves (§2).
2. **Absolute and Arkham share a palette.** Grounds 2.0 / 5.0 / 5.7 (h 301–307), working inks 5.7, line 5.7.
   - **Fix:** Arkham moves to a plum-black (`#1a0f15` / `#2b1822`) with Bone as its working ink. Other grounds were measured and fail:
     - Arkham's sampled blue-black is 2.5 / 3.8 from WATCHFUL PROTECTOR.
     - A neutral charcoal (`#151515` / `#222222`) is 2.1 from VENGEANCE's surface.
     - The dossier's own plum (`#191018` / `#281a26`) is 8.2 / 9.2 from Absolute.
     - The warmer plum above clears every Theme's surface by 7.1 or more, and every raised tone by 10 or more but one: it is 9.2 from VENGEANCE's `#27150e`, 0.8 short of the ~10 rule below. That is recorded as the one exception, judged on screen at Arkham's build. The fallback is the raised tone lifted a little and given more chroma, `#2e1724`: 10.6 from VENGEANCE's and 10.8 from Absolute's, and every Arkham text token still passes on it (the tightest, `--signal-hot`, at 5.16:1). Claret on the proposed `#2b1822` reads at 5.19:1.
   - **Tie-break:** Absolute's violet is sampled (the #2 night city `#463c60`; the trade-dress indigo `#3e4176`). Arkham's own dossier calls its violet "a design choice", a shift away from its sampled blue to clear WATCHFUL PROTECTOR. Absolute keeps it.
3. **Bangers in two Themes.** DKR sets its display and stamps in Bangers; Absolute its stamps. Wave rule: display and stamp families are unique to each Theme.
   - **Fix:** Absolute's stamps move to Bungee, its own display, so one family does both (KNIGHTMARE's model). Blocky signage suits a work site: PERMIT?, BLOWN, JAMMED read as site signs. Our estimate from the dossier's own measurement (BAT-SIGNAL is 107px at 16px, about 0.67em a capital) puts PERMISSION near 74px at 11px before tracking, so it fits the narrow margin only near 10px. Measure it. If it fails, take Luckiest Guy (Apache-2.0, with a NOTICE line), the dossier's own stamp alternative.
   - **Tie-break:** Bangers is DKR's whole Type axis. Without it DKR is left with condensed grotesques (Saira Condensed, Oswald, Teko), which score "~" against Anton and Big Shoulders. Absolute keeps Bungee, its main face, either way.
4. **Two upright printed hands.** Year One stamps in Neucha; Arkham in Patrick Hand SC. Different families, the same register, so Type is "~". Year One's own dossier dropped Patrick Hand for this reason and landed on its neighbour. Absolute's Night Report in Shantell Sans makes three hand faces in one Wave. A report body may be shared, but the picker will show it.
   - **Fix:** Arkham's stamps move. Option one is IM Fell English SC, so one family does the display and the stamps: PERMISSION measures 100 / 91 / 74px at 11px against rooms of 101 / 87 / 72, so it fits all three, barely, at about 10.5px. Option two is a scrawl hand, closer to Saladino's Joker lettering, if it passes the clarity test at 12px. Decide on screen.
   - **Tie-break:** Year One's hand is its frame (Gordon's printed captions) and runs through its stamps, headings and report. Arkham's type identity is IM Fell; the hand is only its stamps. The side that loses less moves.
5. **The grey suit with a big black chest mark and no oval.** Three Themes claim it:

   | | Suit | Chest | Suit to the others |
   |---|---|---|---|
   | DKR | `#5d6661`, mid grey | 9-unit bat | 7.3 to Absolute |
   | Absolute | `#4a6468`, teal-grey | 8×2 block | 7.3 to DKR |
   | Year One | `#9a9e9a`, light grey | 7-unit bat | 21.9 to DKR, 25.3 to Absolute |

   The brief gives the grey suit and the big bat to DKR, now that KNIGHTMARE shipped without them.
   - **Fix:** DKR takes back the big black bat on a mid-grey suit and the armour as its alarmed Pose. Year One keeps a black bat on grey because its source's first suit is exactly that, and it is told apart by value: the only light suit in the app, with trunks and a smaller bat. Absolute keeps its block, which is an axe and not a bat. DKR's and Absolute's suits move apart: DKR to a neutral grey, Absolute to its sampled teal with more chroma (§2).
   - **Tie-break:** DKR's source owns the big bat most strongly (Snyder borrowed it from Miller). The other two own a version of it in their own books, so they keep theirs and differ by shape and value.
   - DKR's alarmed armour (pauldrons a unit past the body) is close to Absolute's resting shoulders (pads a unit past the body). They are different Moods, the plates are a different colour, and only the plates' edge reads (5.28:1; the plates themselves are 1.67:1 on the suit). No change needed.
6. **Two cowls with ears to y = −1.** Absolute's ears are 2 units tall; Arkham's are tall and lean 0.5 unit out. A half-unit lean doesn't count, so the two are the same at 54px. Both reach the viewBox's top edge (`VIEW = [-6, -1, 28, 13]`), where the rim is cut. Arkham saw this; Absolute didn't.
   - **Fix:** Arkham keeps the tall ears, drawn as a front layer whose tips stay inside the box (its option b), with no engine change. Absolute returns to standard ears. Raise the viewBox to −2 only if option (b) fails on screen, because it reframes every shipped Theme.
   - **Tie-break:** for Arkham the ears are the only silhouette mark of a full unit that shows at rest: its hem and chest are dark on dark (§5). Absolute has three other marks (shoulders, block, blades).
7. **Flying Poses.**
   - DKR's *drop* (a canopy of cape above the head, peaking at y −3) and Arkham's *descent* (the cape streaming up above the ears) are the same idea. DKR's comes from a Book One page seen in a reproduction; Arkham's dossier says it has no page behind it. **Fix:** Arkham falls back to the trailing cape with the bleeding hem.
   - Year One's flying leap (knees up, the cape streaming back and up) is DKR's Signature figure without the tilt and the bolt. **Fix:** Year One flies with a trailing feathered cape. That makes four trailing capes in the app (PALE MOONLIGHT, KNIGHTMARE, Arkham, Year One), each told apart by its hem: scallops, a duster's few heavy points, a dither, four ragged points. Decide on screen.
8. **Signature poses.**
   - **The record first.** WATCHFUL PROTECTOR's *Sonar* stands (`suits.ts`): the held frame is a front-on stand with the cape hanging square behind him and his lenses lit, and the ring plays only in the reveal and once a watch cycle. Wave 1 §10.8 allowed this. So the taken outlines are a front-on stand with a shadow at the feet (VENGEANCE), a front-on stand with the cape hanging square (WATCHFUL PROTECTOR), three-quarter under an oval (PALE MOONLIGHT) and a coat blown to the right (KNIGHTMARE). The brief's "a crouch with a sonar ring" is wrong; DKR's dossier repeats it.
   - **Year One's swarm** is a front-on stand plus four bats of 2.4×1.2 units (5×2px each at 54px). In the picker, where the Signature is held still on the folder, that is a third front-on stand with specks. **Fix:** gather the bats into one lopsided mass, at least 4×3 units, up and to the left. Decide on screen beside VENGEANCE and WATCHFUL PROTECTOR at 54px. Its alternative B, the window, is a seated figure: it collides with Year One's own sleeping pose, which outranks.
   - **Arkham's mirror** (a dark frame x 14.5–21.5, full height) and KNIGHTMARE's coat (blown out to x 21.5, y 5–10.8) both put a dark mass to the right. The mirror's 1-unit Ash frame (6.99:1) and its two white eyes should tell them apart. Decide on screen.
   - **DKR's leap and Absolute's lift** both leave the ground, and both dossiers claim to be the only one. The outlines still differ: a figure tilted −15° with a long diagonal line, against an upright figure on four legs that is wider at the floor than the top. No change; drop the claims.
9. **Atmospheres.**
   - **DKR's static and Arkham's scratches** are both 1px marks re-placed in place every tick: "~". **Fix:** Arkham's scratches are cut one at a time, stay, and fade over 2–3 seconds, with the still panes behind. DKR keeps the per-tick flicker; TV static is literally that. One painter serves both (§6).
   - **Bats twice:** Absolute's colony is its weather, and Year One's swarm is its Signature. Different axes, never on screen together, and both are sourced (the zoo's bat house; the tenement siege). **Recommendation:** allow both, with one shared bat drawing, and keep bats out of every later Theme in either slot (question 10).
   - **Absolute and KNIGHTMARE** both light from above, with the same `--haze-inset`, and both cross sideways. That scores "~" and still passes. Optional: Absolute's bats fly arcs that rise and dip rather than a straight crossing.
   - **Year One's smoke** is new in every respect. It shares only a smog from below with PALE MOONLIGHT, in olive instead of brown.
10. **Alarms.**
    - **The pink-red family:** KNIGHTMARE `#ff405f`, Arkham `#ec5c94` (12.9 from it; the inks 10.2), Year One `#ff4dd2` (11.9 from Arkham, 23.2 from KNIGHTMARE). All are above 10. That is more room than the 5–8 the Wave 1 jury accepted between three reds. The grounds help less than that suggests: with the moved grounds (§3.1, §3.2), KNIGHTMARE and Arkham are only 7.9 / 13.0 apart (surface / raised), the other two pairs 15.8–17.3 / 20.2–27.7. So the two alarms 12.9 apart are told apart by their hue (crimson at h 21°, claret at h 359°) and by the raised tone behind them (scorched brown against plum), not by a big ground gap. **No fix.** Year One owns pink most strongly (newsprint magenta, "pink-dappled puddles"); Arkham's book red is KNIGHTMARE's crimson, so it has no alarm of its own to retreat to, and claret is the least bad choice. Judge both in the picker side by side.
    - **No longer available while these alarms stand:** DKR's palette B (8.0 from Year One, 5.4 from Arkham) and Year One's A1 (4.1 from Arkham).
    - **DKR's cyan** is 28.7 from WATCHFUL PROTECTOR's blue alarm but 12.9 from its *working* mercury. That is the "one colour, two meanings" case Wave 1 §10.5 settled by having the picker preview each Theme's alarm on a stamp. No fix; decide on screen.
    - **Absolute's lemon** is 15.8 from PALE MOONLIGHT's gold. The brief bars a yellow *oval*, not yellow. Question 8.
11. **Pale yellows.** Absolute's lemon *alarm* is 8.3 from Year One's canary *waiting* ink, and 8.7 from DKR's. With §3.1, DKR's yellow goes. Lemon against canary is the amber case of Wave 1 (2022's working amber was 3.4–5.2 from other Themes' needs-you colours) and is settled the same way: the stamp word carries the tier, and the picker previews the alarm.
12. **Lexicon doubles.** BROKEN (Absolute, Arkham), FROZEN (DKR, Arkham), and Absolute's "Your turn" in KNIGHTMARE's "Your call" slot.
    - **Rule:** a word that carries a frame goes to the Theme that owns the frame, and the other takes an in-frame word, or the standard word when its frame has no clear one.
    - FROZEN goes to DKR (a frozen picture); Arkham takes standard **Stalled**, as Year One does.
    - BROKEN stays with Arkham, which has no clear in-frame alternative (CRACKED is slang for mental illness; SHATTERED runs long). Absolute takes **BLOWN**: a blown fuse, in a power-plant engineer's world.
    - Absolute's Needs you stays standard (§4).
13. **Voice lines.**
    - Two closes copy KNIGHTMARE's shipped close (`"That's the lot. Some of it still needs you." : "That's the lot. Get some sleep."`): DKR's "Stay tuned. Some of it still needs you." and Arkham's "Every door is shut. Get some sleep." Absolute's "Some of it needs you." and Year One's "That's all I've got. Somebody still needs you." echo it. **Fix:** no Voice line repeats another Theme's sentence, and the close is each Theme's own.
    - Absolute and Year One both speak as a working man at night: "On the clock", "Shift notes", "Clock out" against "First year on the job". **Fix:** Year One leaves work-shift words to Absolute.
    - DKR's and Absolute's empty-state titles end in "nothing needs you", and the hint under them says "Nothing needs you right now." It reads twice on one card. KNIGHTMARE already ships that repeat; new Themes should avoid it.
14. **Emblem shapes.** DKR's second-suit bat ("wide, wings nearly level, short ears on a flat head, three scallops a side underneath, no oval") and Year One's 1987 bat ("wide and level-winged, small head, two short ears, scalloped underneath, no oval") have the same description, and neither is traced yet. Arkham's fallback emblem, "DC's late-1980s comics symbol without its oval", is Year One's bat too. **Fix:** trace both from clean sources (DKR's second suit; Year One's 2016 Absolute Book One) and compare them at 64px on the disc before either is drawn. Arkham's fallback is not available (question 7).
15. **Credit strings.** `words.ts` renders the credit as `` `after ${film}` ``. Absolute's, Year One's and Arkham's credits are written beginning with "after". If that text is meant as the `film` field, the picker will print "after after …". DKR gives an explicit `{ name, film }` object and is right. Shipped form of the field: "Tim Burton's Batman (1989)". **Fix:** the `film` field holds "Scott Snyder and Nick Dragotta's Absolute Batman (2024)", "Frank Miller and David Mazzucchelli's Batman: Year One (1987)", "Grant Morrison and Dave McKean's Arkham Asylum (1989)".
16. **Caps-only display faces in three Themes.** Bangers (DKR), Bungee (Absolute) and Permanent Marker (Year One) have no lowercase. `--font-display` also sets the empty-state and sheet titles at 20px. Absolute and Year One ask for a `--font-headline` token; DKR needs it too (§2, §6).

**Wave rules that follow** (for the docs PR, alongside Wave 1's):
- A new Theme's surface sits at least ~6 ΔE00, and its raised tone at least ~10, from every other Theme's, and its dossier names its hue family. The one recorded exception is Arkham's raised tone, 9.2 from VENGEANCE's (§3.2).
- No two Themes share a working or waiting ink within ~5 ΔE00.
- A doubled Lexicon word goes to the Theme whose frame owns it; the other takes an in-frame word or the standard one.
- No Voice line repeats another Theme's sentence.
- The chest symbol keeps at least 1 unit of suit between it and the jaw and cowl, between it and the body's edge, and between it and the belt (unless it is 3:1 or more against the belt).
- Stamp *register*, not only family, is unique per Theme. Wave 1 already scored register; this writes it down.
- A Theme's `film` field names the work without "after" (`words.ts` adds it).

## 4. Lexicon clarity check

The test, as in Wave 1: a tired developer glancing at a stamp or a tab must get the standard meaning instantly, at the right severity. Stamp widths are the dossiers' own Pillow measurements; `stampWidth.test.ts` is the judge, and the faces changed in §3 (Absolute's Bungee, Arkham's IM Fell) must be measured again.

| Theme | Standard → themed | Misread at a glance | Fix |
|---|---|---|---|
| DKR | Error → BREAKING | "breaking news" (new, urgent, not failed) or a "breaking change". And BREAKING beside LATEST makes two news words with two severities | **DEAD AIR**: a broadcast failure, and "dead" reads as failed |
| DKR | Waiting → OVER TO YOU | Clear, but 4px wider than PERMISSION in Bangers, which the Wave rule forbids. The fallback YOUR TURN sits on WATCHFUL PROTECTOR's YOUR MOVE | **YOU'RE ON**: the cue to speak, three letters shorter |
| DKR | New reply → LATEST | "latest version", the npm tag. On a card under a reply line it reads as "the latest reply" | Keep; fall back to NEW REPLY if it misreads on screen |
| DKR | Stalled → FROZEN | Clear (a frozen feed, a hung process). Arkham uses it too | **Keep** (§3.12) |
| Absolute | Needs you → Your turn | Clear, but it is KNIGHTMARE's "Your call" in the same slot, with the same sense | **Needs you** (standard; Year One does the same) |
| Absolute | Error → BROKEN | Clear. Arkham uses it too, and has no in-frame alternative | **BLOWN**, a blown fuse |
| Year One | Waiting → SEE ME | A boss's or a teacher's note: "you're in trouble". One tier too severe, close to Error | Decide on screen; fall back to **Waiting** |
| Year One | New reply → MEMO | React developers read "memo" as memoization. Low risk on a stamp | Keep |
| Arkham | Permission → UNLOCK | A state ("unlocked") or a game achievement, not a request | **LET IN?** (the dossier's fallback) |
| Arkham | Stalled → FROZEN | DKR's (§3.12) | **Stalled** (standard) |

Kept as they are: DKR Channel, Your cue, OK TO AIR?, ON AIR / OFF AIR, LIVE / STANDBY; Absolute PERMIT?, ASKING, JAMMED; Year One SIGN HERE, GONE WRONG (with Case, Needs you and Stalled standard); Arkham At the door, BROKEN, KNOCKING, NEW NOTE. Two notes:
- Three permission stamps are now questions (OK TO AIR?, PERMIT?, LET IN?), plus KNIGHTMARE's ORDERS? for Waiting. Inside each Theme the question mark is what makes the word read as a request, so the pattern is fine.
- *Dark*, *quiet* and *still* keep meaning "nothing needs you" in every new Voice, and Arkham adds *shut*. None of the new stalled words uses them. Year One's "Quiet so far. I don't trust it." puts doubt in an all-clear title; PALE MOONLIGHT's "For now." set the precedent, so it stays.

## 5. Chest symbol and silhouette check

Bat-Clawd's viewBox is 28 units wide, so at the header's 60px one unit is about 2.1px, and at 54px about 1.9px. The jaw row ends at y = 5; the shipped chest bats sit between y 6 and 8.

| Theme | Drawing | At 60px | Reads? | Alarm color at rest? |
|---|---|---|---|---|
| DKR | A 9-unit black bat at (8, 6.6) on a mid-grey suit, rows 6–8; a dark belt at y 8.5 | 19px wide. At the dossier's 2.6:1 it is 3.5 units (7px) tall, which does not fit between the jaw (y 5) and the belt (y 8.5) | Black on the suit at 3.38:1: it reads. **But it touches the belt at 1.51:1, so bat and belt become one dark apron** (Burton's oval-and-belt fault in Wave 1). Its wingtips leave 0.5 unit of grey (1px) before the black cape, so the bat joins the cape at the sides | No. Cyan only in the aura and the armour's glow when alarmed |
| Absolute | An 8×2 block, x 4–12, y 5.5–7.5; an olive belt at y 8–9 | 17×4px | On the suit at 3.22:1: it reads, the largest in the Wave. **But against the cowl it is 1.04:1, and only half a unit of suit (1px) separates them: it reads as the cowl dripping**, the Snyder fault Wave 1 fixed. **The belt is 1.04:1 on the suit** (16.9 ΔE00 in hue): only the pouches show it | No. The axe's lemon edge shows only when alarmed |
| Year One | A 7-unit black bat at (8, 6.6) on a light grey suit; canary pouches on the belt | 15px wide | **7.22:1, the clearest chest in the app.** But its top reaches y ≈ 5.2 and touches the jaw row. And **the orange jaw is 1.16:1 on the light suit**: in luminance the face runs into the chest. Hue carries it for most eyes, not for every eye | No. Magenta only in the aura |
| Arkham | An anatomical bat, 6 units, at (8, 7), in cowl ink on a dark plum suit | 13px wide, about 5px tall. Its four scallops a side are about 0.75 unit each | **No: 1.34:1.** (VENGEANCE ships 1.52, KNIGHTMARE 1.49.) The suit on the ground is 1.36:1 and the cape 1.04:1. This Bat-Clawd is a silhouette, as McKean's Batman is; the cowl's cold rim, the orange jaw and the white eyes carry him | No. The wine `--blood` marks the unlit lens rim and the waiting rule, as PALE MOONLIGHT's unlit brass does (Wave 1 §10.6) |

**Fixes:**
- **DKR:** at most 8 units wide (17px), leaving 1 unit of grey at each side; top at y ≥ 6; either 1 unit of grey above the belt, or a belt lighter than the bat (a suit-coloured belt with an Ash buckle). Whether 8 units fit depends on the traced proportions; at 2.6:1 the bat can be only about 6.5 wide. Trace first.
- **Absolute:** the block at y 6–8. It then sits on the olive belt at 3.1:1, which is fine. Make the belt at least 1.5:1 against the suit.
- **Year One:** the bat 6 units wide at y 7.2 (y 6.0–8.4 at about 2.5:1; the bat is not traced yet). *Correction after §9:* that bat does not touch only the canary belt. The drafted belt row has cowl-black gaps under it, and the black hips row starts 0.1 unit below it, so it would merge into a dark apron. Year One's revised dossier (§7) draws it 5 units wide at y 6.0–8.0, resting on a full unit of solid canary belt. For the jaw, a 1-unit cowl-black collar under it, or a lighter suit. Decide on screen.
- **Arkham:** no fix to the chest; it can't be seen at rest, by design. That matters for question 7: the anatomical bat is seen only on the disc and in the header, where its scallops are 3–5px and read.

**Silhouette at real size:**

| Detail | Units | At 54–60px | Verdict |
|---|---|---|---|
| DKR ears, set wide (x 3 and 12) | 1-unit shift | 2px | Counts |
| DKR two-tail hem, tips at y = 12 | the viewBox's bottom edge | the rim is cut | End the tips at 11.5 |
| DKR bolt (Signature), y −6 to 14, 1 unit wide, Bone 60% → 40% | 20 units tall | about 40px, taller than the 54px header | The overlay already draws unclipped (WATCHFUL PROTECTOR's ring reaches radius 16). Check the header's clip and that it doesn't read as a crack in the window |
| Absolute ears, y −1 | 2 units tall | rim cut at the top edge | Back to standard (§3.6) |
| Absolute shoulders, +1 unit each side | 1 unit | 2px | Counts; it is what makes him "two units wider" |
| Absolute blades, 1-unit bases | 1 unit | 2px | Counts if there are two or three a side, as the dossier says |
| Absolute tethers (Signature) to y = 13, x −4 to 20 | 1 unit wide | 2px lines | Counts; check the header's bottom clip |
| Year One feathered hem, five teeth a half, ~1 unit apart | 1 unit | 2px | At the floor. Use four deeper points |
| Year One swarm bats | 2.4×1.2 | 5×2px | Specks. Gather them into one cloud (§3.8) |
| Year One trunks, one row | 1 unit | 2px | Counts |
| Arkham ears, y −1, leaning 0.5 | 1 unit taller; the lean is under the floor | 2px taller | The height counts; the curve doesn't |
| Arkham bleeding hem, 1-unit checker over 1.5 units | 1 unit | 2px cells | Counts in size, but the cape is 1.04:1 on the ground, so the dither shows only where the rim follows it. Check it |
| Arkham mirror frame | 1 unit, Ash | 6.99:1 | Reads; the glass (1.15:1) doesn't |

## 6. Engine implications

What the engine PRs need, with the asks shared between Themes. The Wave keeps two PRs per Theme, engine then Theme; a shared piece is built by the first engine PR that needs it and reused by the next.

- **Atmosphere** (`atmospheres.ts`, `painters.ts`): the four asked kinds become two painters and one option.
  - **One `noise` kind** for DKR's static and Arkham's scratches. Marks come from a frame-indexed table, as snow and ash do:
    - the mark is a speck or a hairline;
    - its life is a number of ticks: 1 for static, 16–24 with a fade for Arkham's scratches (§3.9);
    - an optional drifting band (DKR's roll bar);
    - an optional still layer drawn once (Arkham's panes).
  - **Bats as a sprite option on the ash painter,** for Absolute's colony: a two-frame bat path in place of a flake, crossing on the same clock, with a top and a height that keep it under the masthead. The dusk band is the existing haze. The same two-frame bat path serves Year One's swarm on the overlay layer, so one bat drawing lives in shared code.
  - **A `smoke` kind** for Year One: soft round puffs that rise, swell and fade. It is the only kind with no partner.
  - All of them are gated as today: on the shared 8 fps clock, moving only under the pointer and for a few seconds after news, `still: 'calm'` where asked, and nothing under reduced motion.
- **Type tokens**, in one PR:
  - `--font-headline` (default `var(--font-display)`, so no shipped Theme changes) for the empty-state and sheet titles. DKR, Absolute and Year One point it at a face with lowercase.
  - `--font-dateline` (default `var(--font-report)`) for Year One's typeset date.
- **Report:** Year One's boxed headings need engine CSS: `.report__heading` (`NightReport.css`) paints Ash with an underline and reads no variable for a box. The rule would read `--caption-paper` (its background) and `--caption-ink` (its colour). `themes.test.ts` makes every variable the shared CSS reads every Theme's to set, so the other Themes set them to today's look (`transparent`, `var(--ash)`); and `themeContrast.test.ts` must hold `--caption-ink` to `--caption-paper` where the paper is a colour, as it holds `--on-signal` to `--signal`, not to the dark grounds. It belongs to Year One's engine PR and is built for Year One, not as a general token for later Themes. The maintainer approved it after §9 (decision 12, follow-up).
- **Grain:** nothing new. A `--grain-texture` variable (a halftone for Year One, a paper grain for Arkham) is dropped: §9.12 does not include it. Arkham's 0.08 opacity needs nothing, but check that grain at 0.08 doesn't eat into the small text's contrast.
- **Disc:** nothing is required. DKR's scanlines go in `--lens-breaks`, Arkham's grain in the `--disc-lens` list, Year One's hard stops and Absolute's flat field are variables. DKR's `--glass-overlay` (scanlines on the *unlit* disc) is dropped: §9.12 does not include it. If the lit scanlines are not enough on screen, DKR's own fallback, a flatter lit screen, needs no engine change.
- **Bat-Clawd:** nothing new. The overlay already draws outside the box: WATCHFUL PROTECTOR's ring reaches radius 16 around (8, 3), which covers DKR's bolt (y −6 to 14), DKR's canopy (y −3), the TV set (x 17), Absolute's tethers (y 13) and Arkham's mirror (x 21.5). Signature steps already take a `transform` (DKR's −15° tilt, Absolute's lift). The rest needs no new part type:
  - DKR's armour: two legend letters in its own suit.
  - Year One's trunks and solid canary belt, and Absolute's pouches: map rows.
  - Arkham's ear tips: a front path.
  - Arkham's bleeding hem: rects.

  The viewBox stays `[-6, -1, 28, 13]` unless Arkham's ears fail on screen.
- **Emblems:** four new paths in `emblems.ts`, in the Theme PRs, each traced from a named source: DKR's second suit, Absolute's block, Year One's 1987 bat, and Arkham's bat pending question 7. Compare DKR's and Year One's at 64px before either merges (§3.14).
- **Words:**
  - Credit strings without "after".
  - A test that no Theme's Voice string equals another Theme's (§3.13).
- **Tests:** `themes.test.ts` (every shared variable set), `themeContrast.test.ts` (every text token on all 11 grounds; every draft passes as written, the tightest being Arkham's `--signal-hot` at 4.67:1), and `stampWidth.test.ts` (re-measure every Theme whose stamp face changes).
- **Fonts:** Bangers (DKR); Bungee and Shantell Sans (Absolute); Permanent Marker and Neucha (Year One); IM Fell English SC (Arkham). All are OFL except Permanent Marker, which is Apache-2.0 and needs a NOTICE line as Syncopate does. Add Luckiest Guy (Apache-2.0) only if Absolute needs it.

## 7. Questions for the maintainer

1. **DKR and Year One share a green-grey palette.** A: split it. DKR moves toward the tank grey (h ~166), Year One toward the olive-khaki (h ~110). Year One keeps the canary, and DKR's waiting ink becomes pale phosphor green. B: DKR keeps the green-grey as drafted, and Year One leaves the family; its only free ground is the plum that question 2 gives Arkham. C: Year One keeps it, and DKR goes neutral; that lands 2–4 ΔE00 from VENGEANCE, so it is not really available. *Recommended: A. Each moves toward its own samples, and the yellow stays with the Theme whose Voice is built on it.*
2. **Absolute and Arkham share a violet palette.** A: Absolute keeps the violet and the lavender; Arkham moves to a plum-black (`#1a0f15` / `#2b1822`) with Bone as its working ink. B: Arkham keeps the violet, and Absolute moves; it has no free ground of its own. C: Arkham goes neutral charcoal, 2.1 from VENGEANCE's surface. *Recommended: A. Absolute's violet is sampled; Arkham's is a shift. Decide on screen whether claret on plum reads as the Joker's palette.*
3. **Bangers: DKR or Absolute?** A: DKR keeps it for the display and the stamps; Absolute's stamps move to Bungee, or Luckiest Guy if Bungee doesn't fit. B: Absolute keeps its Bangers stamps; DKR moves to Luckiest Guy, or a condensed grotesque that scores "~" against VENGEANCE. *Recommended: A. Bangers is DKR's whole Type axis, and Bungee suits Absolute's work-site words.*
4. **Upright hand-lettered stamps: Year One or Arkham?** A: Year One keeps Neucha; Arkham's stamps move to IM Fell English SC at about 10.5px (if PERMISSION fits) or a scrawl hand. B: Arkham keeps Patrick Hand SC; Year One's stamps move to Permanent Marker, and Neucha keeps its headings and report. *Recommended: A. The hand is Year One's frame; Arkham's type identity is IM Fell.*
5. **The grey suit, the big black chest bat and the armour.** A: DKR takes them back (a big black bat on a mid-grey suit, the armour as its alarmed Pose). Year One keeps its own black bat as the only light suit, and Absolute keeps its block on its sampled teal, with the suits moved at least 10 apart. B: DKR alone has a grey suit and a black chest mark, and the other two change suits, against their sources. *Recommended: A.*
6. **The tall ears: Arkham or Absolute?** A: Arkham, with the ear tips drawn as a front layer and no viewBox change; Absolute returns to standard ears. B: Absolute keeps them; Arkham's silhouette then rests on a hem that is 1.04:1 on the ground. C: both, with Arkham's leaning a full unit outward, and the viewBox raised to −2 for every Theme. *Recommended: A.*
7. **Arkham's emblem against ADR 0001.** The book has no bat symbol of its own, and the dossier's fallback (DC's late-1980s bat without the oval) is Year One's bat. A: amend the ADR narrowly. When a work shows no bat symbol of its own, its Theme may draw the bat the work shows, from life, credited as our drawing. B: no chest emblem, and the header and disc carry the default VENGEANCE bat; that breaks "the version's symbol". C: the late-1980s DC bat; that collides with Year One. *Recommended: A. On the chest it is invisible anyway (1.34:1); it matters on the disc and in the header.*
8. **Absolute's lemon alarm beside PALE MOONLIGHT's gold** (15.8 ΔE00, never an oval, flat). A: accept it, judged in the picker on a stamp and as a lit disc. B: the red field (`#dd363e`, lifted), which sits 6.4 from VENGEANCE's red. *Recommended: A, decided on screen. It keeps the Theme's best idea; red would put it back among the reds.*
9. **Adopt the §4 Lexicon fixes?** They are: DKR's DEAD AIR and YOU'RE ON; Absolute's standard Needs you and BLOWN; Arkham's LET IN? and standard Stalled; Year One's SEE ME decided on screen. DKR's Case → Channel stays. *Recommended: yes, all of them.*
10. **Bats in two Themes** (Absolute's colony as weather, Year One's swarm as its Signature). A: both, sharing one bat drawing, and no later Theme uses bats in either slot. B: Year One only; Absolute has no other Atmosphere that isn't someone else's. C: Absolute only; Year One's Signature becomes the window, which collides with its own sleeping pose. *Recommended: A.*
11. **Display names:** TRIUMPHANT (DKR), BLUE COLLAR (Absolute), BECOME A BAT (Year One), SERIOUS HOUSE (Arkham). Two notes: BLUE COLLAR sits next to WATCHFUL PROTECTOR, the blue Theme, while its own alarm is lemon (alternative NO FORTUNE); BECOME A BAT is three words of the book's dialogue used as a name, within ADR 0001's "very short", and its wording must be checked on a page. *Recommended: approve all four.*
12. **Engine scope.** Two new Atmosphere painters (`noise` for DKR and Arkham, `smoke` for Year One) and a bat option on the ash painter, instead of four kinds; `--font-headline` and `--font-dateline`; no viewBox change. *Recommended: approve. It is the smallest engine that carries all four Themes, and each piece is on the shared 8 fps clock.*

**Decide on screen** (not questions; each from a labelled comparison image):
- DKR's cyan alarm and lit lens beside WATCHFUL PROTECTOR's.
- DKR's pale green waiting ink.
- Year One's magenta beside Arkham's claret in the picker.
- Arkham's plum.
- Absolute's lemon disc beside the mascot (also question 8).
- **Signatures:** DKR's leap (or the horse) and the bolt at 54px; Absolute's A / B / C; Year One's swarm as one cloud beside VENGEANCE and WATCHFUL PROTECTOR; Arkham's mirror beside KNIGHTMARE's coat.
- **Bat-Clawd details:** Year One's collar or lighter suit; Year One's four-point hem; Arkham's bleeding hem; Arkham's ear tips.
- DKR's static as "a set left on".
- **Stamps:** Bangers at 12px (its small Z in FROZEN); Bungee and IM Fell as stamp faces.
- **Long reading:** Neucha and Shantell Sans as Night Report bodies at 12.5px.
- Year One's SEE ME.

## 8. Notes for Wave 3

What Wave 2 takes from the Wave 3 candidates, so their dossiers start from it:

- **The Animated Series.**
  - Its grey-and-blue suit is what Year One's dossier gave Bat-Clawd (light grey with a blue-black cowl). With Year One's cowl made near-black (§2), TAS keeps the blue.
  - Its chest is its hardest problem: the gold oval is PALE MOONLIGHT's, and a black bat on a grey suit without one is now DKR's and Year One's. Wave 1 barred the oval only as an *alarm*, so an unlit oval at rest is the question for its jury.
  - It is a TV series, but the broadcast Voice is DKR's.
  - Red skies stay open, as light. VENGEANCE's is a glow from below, not a sky.
  - Flat cel colour: Year One's hard-stop lens took "flat" on the disc, and Absolute's flat lemon field took the flat lit disc.
- **The Long Halloween.**
  - Year One takes the dated dateline (month and day), Gordon, the canary, the olive grime and the newsprint magenta.
  - Long Halloween keeps the holidays as named days, Tim Sale's solid blacks, the Roman and the mob, and a palette of its own.
  - A pumpkin orange must be checked against Clawd. The green-greys and the pinks are taken.
- **The Arkham games.**
  - DKR (h ~166, C* ~5) and Year One (h ~110, C* ~17) now sit in the green family at low chroma. A saturated asylum green (for instance `#0b1c14` / `#123524`) is 5.5–7.2 from them on the surface and 11.4–12.2 on the raised tone. There is room, barely: the games' green must be clearly saturated (C* 15 or more on the raised tone).
  - Their credit, "Batman: Arkham Asylum (2009)", will sit beside SERIOUS HOUSE's "Arkham Asylum (1989)" in the picker, so the credits must tell a game from a book.
  - If Arkham takes plum, the Joker's purple is spoken for.
  - The teal detective mode stays WATCHFUL PROTECTOR's, and DKR's armour is an alarmed Pose only, so an armoured suit at rest is still open.
- **Adam West.**
  - His medium is the TV serial: the narrator, "Meanwhile…", and "same Bat-time, same Bat-channel". DKR keeps TV *news* (an anchor, a panel, "live") and must not drift into the serial narrator. Its "Channel" already leans that way, so West's Lexicon can't use Channel.
  - Bangers, the face of "POW!", is DKR's. That is one more reason Absolute should take Bungee rather than Luckiest Guy, which leaves Luckiest Guy free for West.
  - The yellow oval is PALE MOONLIGHT's; a yellow belt is also Year One's (its solid canary belt).
  - The pinks are Year One's and Arkham's alarms and Absolute's waiting mauve.
- **Lego Batman.**
  - Bungee, the natural blocky face for bricks, is Absolute's.
  - Pure black is VENGEANCE's; "very, very dark grey" sits among three grey suits.
  - Its comedy Voice will meet Adam West's: that is Wave 3's likely Nolan–Snyder pair, so write those two dossiers in sequence, not in parallel.
- **Taken across the board after Wave 2:**
  - Bats as weather (Absolute), as a Signature (Year One), and as a life drawing for an emblem (Arkham, if question 7 goes to A).
  - Halftone and newsprint (Year One), with print and the newsroom (PALE MOONLIGHT).
  - Comic SFX lettering (DKR), upright hand lettering (Year One or Arkham, per question 4), caption boxes (Year One).
  - TV broadcast and static (DKR).
  - Grey suits (three).
- **Process:** Year One was the only dossier that read the other drafts as they appeared, and it avoided all of them except the one it couldn't see. Wave 3 should keep one claims table in this folder that every dossier updates as it chooses a ground, an alarm, a working ink, a font and a Signature, and should check it before choosing.

## 9. The maintainer's decisions

Answered on 2026-10-14. They override the recommendations above where they differ.

1. **DKR and Year One split the green-grey.** DKR moves toward the tank grey (h ~166) and takes a pale phosphor green as its waiting ink. Year One moves toward the olive-khaki (h ~110) and keeps Gordon's canary.
2. **Absolute keeps the violet and the lavender.** Arkham moves to a plum-black (`#1a0f15` / `#2b1822`) with Bone as its working ink. Whether claret on plum reads as the Joker's palette is checked on screen.
3. **Bangers is DKR's,** for its display and its stamps. Absolute's stamps move to Bungee, or Luckiest Guy if PERMISSION doesn't fit.
4. **The upright hand is Year One's** (Neucha). Arkham's stamps move to IM Fell English SC at about 10.5px if PERMISSION fits, or to a scrawl hand.
5. **The grey suit, the big black chest bat and the armour go home to DKR,** with the armour as its alarmed Pose. Year One keeps its own black bat on the only light suit. Absolute keeps its block on its sampled teal. The three suits sit at least 10 ΔE00 apart.
6. **The tall ears are Arkham's,** with the tips drawn as a front layer and no viewBox change. Absolute goes back to standard ears.
7. **ADR 0001 is amended narrowly:** when a work shows no bat symbol of its own, its Theme may draw the bat the work shows, from life, credited as our drawing. That is Arkham's emblem.
8. **Absolute's lemon alarm stays,** judged on screen in the picker, on a stamp and as a lit disc, beside PALE MOONLIGHT's gold.
9. **Every §4 Lexicon fix is adopted.** DKR's Case → Channel stays; Year One's SEE ME is decided on screen.
   - Follow-up, decided by the maintainer on 2026-10-14 after this note: Arkham's Needs you word is picked on screen at its build. "At the door" measures 100–106px in IM Fell English SC and fails every stamp room; the options are Doorstep, Your door, or Caveat Brush stamps that keep "At the door".
10. **Bats appear in both:** Absolute's colony as its Atmosphere and Year One's swarm as its Signature, sharing one bat drawing. No later Theme uses bats in either slot.
11. **Display names:** **ANCIENT GRACE** for *The Dark Knight Returns* (the maintainer's choice, replacing TRIUMPHANT), **BLUE COLLAR** for *Absolute Batman*, **BECOME A BAT** for *Year One* (its wording checked on a page before it ships), **SERIOUS HOUSE** for *Arkham Asylum*.
12. **The engine stays small:** two new Atmosphere painters (`noise` for DKR and Arkham, `smoke` for Year One), a bat option on the ash painter, `--font-headline` and `--font-dateline`, and no viewBox change.
   - *Follow-up, 2026-10-14:* Year One's caption-box report headings are approved too, in Year One's engine PR: `.report__heading` reads `--caption-paper` and `--caption-ink`, every other Theme sets them to today's look, and `themeContrast.test.ts` holds the ink to the paper.

Everything flagged "decide on screen" in §7 stays that way: it is decided in each Theme's build, from a labelled comparison image.

*Follow-up, 2026-10-15, at BECOME A BAT's build (#122):* on screen the maintainer chose **A3, the trade paperback's red** (`#b32c33` fill, `#f2605e` lit and as ink), over A2's newsprint magenta, knowing it sits 6.1 ΔE00 from KNIGHTMARE's crimson. So §1's flag 4 ("A3 stays a comparison picture") no longer holds: the ~10 alarm rule has this one recorded exception, and the two Themes' alarms are told apart by their grounds and in the picker. **Newsprint magenta is unclaimed again**, so §8's "the pinks are Year One's and Arkham's alarms" now reads Arkham's only (DKR's palette B was withdrawn for sitting 8.0 from A2, which no Theme wears). Year One's red also takes the collected edition's cover red that §8 left open for *The Long Halloween*. The other on-screen picks are in `year-one.md`'s "Built in #122" note.
