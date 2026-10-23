# Theme dossier: Batman: The Long Halloween (1996–97)

> **Decided 2026-10-23.** The maintainer's decisions in [`jury-wave-3.md`](jury-wave-3.md) §9 override this dossier where they differ. For HOLIDAY: it keeps the jack-o'-lantern orange, **with its aura** (BECOME A BAT already ships one closer to Clawd); its stamps move to Federo; and its Atmosphere is no longer the pages of §10 but a still pumpkin moon in a dim orange with low fog drifting sideways (§9, decisions 1, 12 and 15). So `--pages`, the "Calendar" Atmosphere label and hint in §6, and the Atmosphere scores in §11 are redone at the build.

Research note, 2026-10-22. Scope: one Bat-Signal Theme after *Batman: The Long Halloween*, thirteen issues by Jeph Loeb (story) and Tim Sale (art), coloured by Gregory Wright, lettered by Comicraft (Richard Starkings), edited by Archie Goodwin; DC, cover dates December 1996 to December 1997. Wave 3, round 1, issue #143, Linear LUC-85 and LUC-87. It follows [`wave-3-brief.md`](wave-3-brief.md), the rules of [`wave-2-brief.md`](wave-2-brief.md) §2 and the headings of its §6, and it is checked against [`claims-wave-3.md`](claims-wave-3.md), the seven shipped stylesheets (`app/src/renderer/src/styles/themes/*.css`, `main` at v1.3.0) and SERIOUS HOUSE as kept on `feat/123-serious-house`. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

**Provenance key.** **Read** = seen by us on a reference image, named by its number in the reference folder (`[12]`). **Measured** = taken off that image by a script: a region's median, its most chromatic 5%, its darkest 5% and its brightest 5% (`sample.py`), or a cover's flat field, the fullest colour bin of a box (`field.py`). **Inferred** = our reading. **P** = proposed by us. ΔE00 is CIEDE2000 and contrast is WCAG 2, both computed by our own script; it reproduces Sharma, Wu and Dalal's test pairs (2.0425 and 1.0000) and the juries' figures (14.6 for `#ff405f`–`#e3121b`, 6.1 for `#f2605e`–`#ff405f`).

## 1. TL;DR

- **The Theme in one sentence:** Sale's solid black and Wright's wine-dark night, the year counted in named holidays on torn calendar pages, the Roman's family speaking softly, and the jack-o'-lantern's orange kept for the one thing that needs you.
- **Display name: HOLIDAY.** The name the book gives its killer, who strikes once a month on a holiday. One word, like VENGEANCE and KNIGHTMARE, and not dialogue. **Credit** (`film`): "Loeb & Sale's The Long Halloween" (with no-break spaces in the title, as BECOME A BAT does). Alternatives: ROMAN HOLIDAY (the title of #11; it holds the Roman and the holidays, but it is also a 1953 film), TRICK OR TREAT (a balloon in [21]).
- **The way out of BECOME A BAT:** no Gordon, no notebook, no canary, no olive, no month-and-day. This Theme takes the **holidays as named days** (the dateline counts down to the next one: "HALLOWEEN IN 9 DAYS"), **Sale's blacks** (a near-black page and a wine-black ground from the venetian blinds of #1's first page [15]), **the Roman and the mob** (the Voice), and **the long ears and the huge cape** (Bat-Clawd).
- **Ground: wine-black,** `#0a0507` / `#1c0b14` / `#2e1222` (h ~347). It is the only family that clears every shipped Theme: the cold night the later printings show [31][33][21] lands on WATCHFUL PROTECTOR, ANCIENT GRACE and SERIOUS HOUSE (§4.2).
- **Alarm: jack-o'-lantern orange,** `#fe7500` lit and as ink, `#d05600` as fill. From the #1 and #13 covers' pumpkins and the orange title band that opens and closes the series [02][14][26]. **13.2 ΔE00 from Clawd's `#d77757`** (the fill 12.2), and at least 13.4 (the fill 14.4) from every colour of every other Theme. That is the most room orange has: Clawd sits on one side, the ambers of VENGEANCE, WATCHFUL PROTECTOR and PALE MOONLIGHT on the other. Two other oranges (redder, yellower) are given with their costs (§4.1). Decide on screen, with the mascot beside it. **Round 1 converged on it:** the Arkham games' draft claims `#fe7400` (0.3 from ours) and *The Animated Series*' option A `#ff6420` (7.0). Only one Theme can keep orange; §11.1 argues for this one and says what it loses without it.
- **Inks:** waiting is **the Signal's grey-green lens** lifted, `#a9bcbf` [33] (at least 10.1 from every other Theme's working and waiting ink); working is **Bone** `#efe8e6`. Lilac [14] and steel [24] are the alternatives, each with a recorded cost.
- **Type:** **Grenze Gotisch** (OFL) for the wordmark and headlines, after the covers' blackletter line "in Thirteen Parts" [02]; **Sofia Sans Extra Condensed** (OFL) for the stamps and the dateline, after the thin condensed LONG HALLOWEEN band [20]. Both unclaimed. Every stamp word fits every room with at least 16px to spare (§5).
- **Voice: the Roman's table.** A mob boss's courtesy, quiet and Old-World, counting the holidays. **Lexicon:** Case and Needs you stay; BLESSING? (Permission), BOTCHED (Error), A WORD (Waiting), MESSAGE (New reply), ON ICE (Stalled).
- **Bat-Clawd:** Wright's Batman blue on the cowl, the cape and the gloves; a blue-grey lit suit [24]; the cape's blue mantle over his shoulders under the orange jaw; the book's Signal bat small and black on his chest; the gold capsule belt (or a blue one, decided on screen beside BECOME A BAT's canary). **Long ears**: triangles two units wide at the base, flush with the cowl's sides, to y −0.8, just under the frame's top. **A huge cape** that pools on the ground in a bell, wider than any other.
- **Signature pose: three real options,** recommended first. **B. The long cape** (the collected edition's cover [22][01]): three-quarter, one glove at his shoulder gathering the cape, the cape swept down to the ground at his left, a right triangle at 54px. **A. "Gentlemen."** (#1 p. 27 [16][31]): front-on before the Signal's huge round lens, a disc at 54px. **C. Father's Day** (#9 cover [10]): profile at a grave, the cape pooled in a bell. Each outline is in §8.3.
- **Atmosphere: torn calendar pages** falling and tumbling [22][01], lit Bone, under a wine light from the upper left. Alternative: the venetian blinds of #1 p. 1 [15], still bars with a light that sweeps across them now and then.
- **Engine asks:** one. A page sprite on the ash painter (as BLUE COLLAR's bats are), or a `blinds` kind if the alternative wins. The holiday dateline is a table in `words.ts`, not an engine change.

## 2. References

The images sit in a scratch folder (`refs-tlh/`) that never enters the repository; scripts and boards sit beside it. Its index of all 36 images (number, file, source URL, edition, what it shows, which decision it informs) is committed as [`references/long-halloween.md`](references/long-halloween.md), so every `[nn]` here can be traced.

What it holds:
- **All thirteen covers** as printed [02–14], five of them also as textless art [23–27].
- **Interior pages** of #1 (pp. 1, 15, 27) as *Back Issue* #60 reprinted them in 2012 with Wright's colours [15–17], the same p. 27 panel from a later printing [31], the rogues' spread in Falcone's office [21][34], a Christmas page [32] and the Bat-Signal page [33].
- **The collected editions' covers:** the first trade paperback [01], the first hardcover (1998) [29], the Absolute Edition (2007) [28], the Deluxe Edition with Sale's 2021 cover [30], and DC's 2025 image of the trade's art [22].
- **An interview:** Randall Wiggins with Gregory Wright and Tim Sale in *Back Issue* #60, October 2012 (the TwoMorrows preview PDF).

**The five images that best say what the book looks like:**
1. **[15] #1 p. 1:** Batman's cowl and long ears in solid black against wine-red venetian blinds. Sale's black, Wright's colour, and the first line of the book.
2. **[22] The collected edition's art:** Batman from below, a hand gathering a cape that fills the picture, and the torn calendar pages (OCT 31, JAN 1, DEC 25, MAR 17, JUL 4, FEB 14, APR 1, AUG 2) blowing out of it.
3. **[02] The #1 cover:** a black cat on a jack-o'-lantern, a flat red field, the orange band. Every cover is one flat field and one image.
4. **[10] The #9 cover:** Batman as Sale draws and Wright colours him: blue cowl and cape to the ground, a black bat in a blue-grey chest, a gold belt.
5. **[33] The Signal page:** the round lens in grey-green with the black bat, vertical rain, Batman from behind with one tall ear.

**Two reproductions of one panel disagree** (Read and Measured). On #1 p. 27, *Back Issue* #60 [16] prints a plum-grey sky (`#3e3545`, L24 C11 h312) and an **olive** Signal bat (`#3e462e`, h121). The later printing [31] prints a blue sky (`#64799d`, h274), a steel-blue cape (`#44738b`) and a grey-green lamp bat (`#6e888f`). The blue reading agrees with the #9 cover [10][24], the Signal page [33] and the trade's art [22], so this palette follows it. The olive goes nowhere: it is BECOME A BAT's ground.

## 3. Visual identity and sources

What makes this version recognisable, in order of strength:

1. **Sale's solid black and hard white.** Sale on the book's look: "I spoke often with Greg about a limited color palette; I just am drawn to noir, and letting the black and white shine." He adds that he is colour blind ([*Back Issue* #60, p. 4](https://www.twomorrows.com/media/BackIssue60Preview.pdf)). Read: whole half-pages are flat black [15][17]; figures are lit edges on black [31][35][36].
2. **Gregory Wright's colour: few colours, muted, flat.** "I like simple, bold strokes of color, not bright color." "When you're telling stories that take place in the dark, the less color, the more it conveys darkness." "I made all the color choices." "I also felt (as did Tim) that in these series, I should rethink the color for all of the characters in the same way he rethought them in the drawing" (Wright to Wiggins, *Back Issue* #60, p. 15). Sale: "By this point he knew my preference for flat, somewhat muted colors, but the colors themselves are entirely Greg's" (p. 5).
3. **The holidays, one an issue.** "It is entirely to Jeph's credit, his concept, to have a holiday theme each month, although the images were up to me ... a thematic thread running through all the covers" (Sale, p. 5). The thirteen chapters (Read, DC Database issue pages and the covers): Crime (Halloween), Thanksgiving, Christmas, New Year's Eve, Valentine's Day, St. Patrick's Day, April Fool's Day, Mother's Day, Father's Day, Independence Day, Roman Holiday, Labor Day, Punishment (Halloween again). Each cover is one flat field with one image, a title band in a colour of the month, and the holiday's name in a box [02–14]. Wright: "Tim did the cover design; I colored them with Tim's input" (p. 5).
4. **The Roman and the mob.** The story opens at a Falcone family wedding, and the killer, Holiday, works through Carmine "the Roman" Falcone's family ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_The_Long_Halloween); *Back Issue* #60, p. 3). The Roman's own cover is #11's birthday cake with the family on its tiers [12].
5. **Batman: long ears and a huge cape.** Read: long ears, flush with the cowl's sides and tapering to a point [15][22][29][31]; a cape that wraps him [16][31], fills the cover [01][22] or pools on the ground [10]. The pact on the roof with Gordon and Dent is #1 p. 27 [16][31].
6. **The jack-o'-lantern.** It opens the series [02] and closes it [14]. Inside, among the blue-black, it is often the only warm thing in a panel [21].

**Influence.** Wikipedia names Nolan's trilogy and *The Batman* (2022) as influenced by the book. Sale says he had no input on *Batman Begins* (*Back Issue* #60, p. 4). This Theme borrows nothing that VENGEANCE or WATCHFUL PROTECTOR wear.

**Editions sampled.** Covers: scans of the printed single issues, 1996–97 [02–14]. Interiors: *Back Issue* #60's 2012 reprints, said to carry Wright's colours [15–17], and a later printing of unstated edition [31–34]. The textless covers [23–27] differ from the printed ones (the #1 pumpkin is `#f68f53` printed and `#faaa3c` textless), so each hex below names which it came from.

## 4. Palette

### 4.1 The Alarm color: jack-o'-lantern orange

The hottest colour in the book is the lit jack-o'-lantern [02][20][23], and the series' first and last title bands are orange [02][14]. Red is taken three times (VENGEANCE, KNIGHTMARE's crimson, BECOME A BAT's trade-paperback red) and SERIOUS HOUSE's scarlet makes four. So the alarm is the pumpkin.

**Samples** (Measured):

| Source | Region | Median | Most chromatic | Notes |
|---|---|---|---|---|
| [02] #1 cover, printed | pumpkin body | `#f68f53` (L69 C59 h55) | `#fc8d4b` | |
| [02] | title band | field `#fb6a34` (L63 C77 h47) | | 7.8 from Clawd: too close as it stands |
| [23] #1 textless | pumpkin body | `#faaa3c` (L76 C68 h73) | `#fba933` | 3.4 from VENGEANCE's amber working ink |
| [20] #1 cover, DC.com | lantern glow | `#f8bb69` (h75) | `#f9f230` | brightest `#fffaa6` |
| [26] #13 textless | pumpkin | `#be430d` (L46 C71 h48) | `#c74309` | 9.4 from VENGEANCE's red |
| [14] #13 cover, printed | title band | field `#c35423` (h49) | | |
| [21] rogues' spread | the small pumpkin | `#a17b59` (C26) | | inside, the pumpkin is muted |

**The squeeze.** Orange lies between Clawd (`#d77757`, h40) and three ambers: VENGEANCE's working `#e8a33d`, WATCHFUL PROTECTOR's waiting `#e9a04b` and PALE MOONLIGHT's bronze `#c98a3e` and gold fill `#d29336`. We searched sRGB for the orange (h 45–66) farthest from every colour of the eight Themes and from Clawd. The best is about 13.4 from its nearest. So the options are:

| Option | `--signal-hot` / `--ink-hot` | `--signal` (fill) | Source | vs Clawd | Nearest other colour | Abyss on fill |
|---|---|---|---|---|---|---|
| **A1. Jack-o'-lantern (recommended)** | `#fe7500` (L65 C87 h57) | `#d05600` (L52 C76 h54) | [02] pumpkin `#fc8d4b` and band `#fb6a34`, chroma raised, hue set at 57° to clear Clawd; fill after [26] `#c74309`, moved 6° toward yellow to clear VENGEANCE | 13.2 / 12.2 | WATCHFUL PROTECTOR waiting `#e9a04b` 13.4; VENGEANCE red `#e3121b` 14.4 (fill) | 4.83 |
| A2. Redder | `#ff6a00` (h53) | `#d65000` | the #1 band [02] | 11.9 / 12.0 | VENGEANCE red 12.4 (fill); SERIOUS HOUSE scarlet 15.4 | 4.82 |
| A3. Yellower, the lantern | `#ff8c1a` (h62) | `#cc6a00` | the textless pumpkin [23] | 16.5 / 13.7 | **WATCHFUL PROTECTOR waiting 8.2**, VENGEANCE amber 10.3, PALE MOONLIGHT gold fill 10.9 | 5.42 |

A1 against every other alarm (lit / fill, ΔE00 from A1's lit `#fe7500`): VENGEANCE 22.7 / 32.0, PALE MOONLIGHT 26.2 / 15.0, WATCHFUL PROTECTOR 53.1 / 52.7, KNIGHTMARE 27.3 / 37.5, BECOME A BAT 21.3 / 31.5, ANCIENT GRACE 53.8 / 55.2, BLUE COLLAR 43.4 / 41.8, SERIOUS HOUSE 18.2 / 29.1. Clawd 13.2.

**Costs, stated plainly.**
- **13.2 from Clawd (its fill 12.2) is the third-closest alarm to the mascot** (BECOME A BAT's red is 10.4, SERIOUS HOUSE's paused scarlet 10.7; every other is 16 or more). The jury's rule is "nothing warm at rest next to the orange mascot unless it is clearly not the alarm" (`CONTEXT.md`); here the alarm *is* warm and sits near him. It never shows at rest (§4.4).
- **The aura.** An orange aura around an orange jaw: `#fe7500` on Clawd is 1.16:1. So the suit is `aura: 'alarmed'` at least, and we ask whether this Theme should have no aura at all (`aura: false`), letting the lit disc, the stamps and the alarmed pose carry the alarm. **Decide on screen.**
- **Against Clawd `#d77757`, both numbers:** `--signal-hot` `#fe7500` is **13.2 ΔE00** (1.16:1 in luminance); `--signal` `#d05600` is **12.2 ΔE00** (1.33:1). Apart in hue, close in light: told apart by eye, but not by luminance.
- **Can an orange alarm work here at all?** Yes, but only with `aura: false`. The suit covers Clawd's body, so the one orange of his at rest is the jaw, framed by the blue mantle and cowl (2.47:1); the alarm never touches it. Where the alarm sits next to him (the lantern at his feet, on the blue cape: 3.57:1), dark blue separates them. An aura around the whole figure would lay the alarm against the jaw at 1.16:1 and blur the mascot into the alarm, so this Theme should ship without one. If the maintainer wants an aura, the orange fails and §11.1's question becomes moot.

`--blood` (the alarm's off-shade, the lit lens's rim only): `#5a2408`, after [26]'s darkest `#a2330a`, darkened. Lens core: `#ffd08a`, after the lantern glow [20] (`#f8bb69` to `#fffaa6`); it shows only inside the lit lens, never as text.

### 4.2 The ground: wine-black

Sale's page is black (Measured, [15]: 77% of the page is `#000000`). Pure black is VENGEANCE's, so the page is a near-black and the surfaces take the one hue the book offers that no Theme wears: **the wine of #1 p. 1's venetian blinds** [15] (stripes `#480a2b`, L14 C32 h352; most chromatic `#600a3b`). The same wine is the field of the Valentine's Day [06] (`#a2213b`) and Independence Day [11] (`#6b1a38`, h3) covers. Darkened at that hue: `#0a0507` / `#1c0b14` / `#2e1222`.

Measured: the other night colours in the book, and why they are not free.

| Candidate | From | abyss / surface / raised | Closest shipped grounds (surface / raised ΔE00) | Verdict |
|---|---|---|---|---|
| **Wine (recommended)** | [15] blinds `#480a2b`; [06], [11] fields | `#0a0507` / `#1c0b14` / `#2e1222` (surface L5 C9 h347) | KNIGHTMARE 8.3 / 15.2; BLUE COLLAR 9.3 / **11.3**; VENGEANCE 9.6 / **11.9**; PALE MOONLIGHT 10.2 / 18.2; SERIOUS HOUSE 10.5 / 17.8 | Clears the ~6 / ~10 floors everywhere. Its two near pairs are raised tones just over 10 |
| Plum-grey | [16] sky `#3e3545` (h312) | `#0b090d` / `#17121b` / `#261e2d` | BLUE COLLAR 7.4 / **7.1**; SERIOUS HOUSE 6.2 / 9.2 | Fails the raised floor |
| Plum, more chroma | [15] cowl light `#605465` (h317) | `#0c080e` / `#1b1220` / `#2c1c33` | **BLUE COLLAR 4.7 / 5.3** | Fails |
| Lavender-grey | [16] | `#0a090c` / `#161419` / `#242029` | **SERIOUS HOUSE 3.5 / 7.3**, VENGEANCE 4.7, WATCHFUL PROTECTOR 5.0 | Fails |
| Blue night | [33] sky `#535e7e` (h282), [31] `#64799d`, [21] teal-blue | — | the hues of WATCHFUL PROTECTOR (h~255), ANCIENT GRACE (h~225) and SERIOUS HOUSE (blue-black) | Taken |

The abysses sit 2.3–7.8 from every other abyss, as near-blacks do. **A risk to watch in the round-1 merge:** *The Animated Series* claims "the red sky" as light; if its ground goes dark red, it meets this one.

### 4.3 Token map

Every variable a shipped Theme sets, in the order of `batman-year-one-1987.css`, then this Theme's own. Sources by entry number; "P" where proposed.

| Token | Value | Origin (edition) | Role in this Theme |
|---|---|---|---|
| `--abyss` | `#0a0507` | P: [15] page black `#000000`, at the blinds' hue (h349) | Page |
| `--smoke` | `#10080b` | P | Top gradients |
| `--surface` | `#1c0b14` | P: [15] blinds `#480a2b` (Back Issue #60 reprint), darkened at h347 | Cards, row hover |
| `--raised` | `#2e1222` | P: the same, L10 C17 | Card hover |
| `--line` | `#4a2338` | P: the blinds' stripe, dimmed | Rules, borders (Bone on it 10.92:1) |
| `--surface-deep` | `#13080e` | P | Gradient ends |
| `--frame` | `#22101a` | P | Edges |
| `--header-fade` | `#13080e` | P | Header fade |
| `--sheet-top` | `#22101a` | P | Sheet top |
| `--shadow` | `#000000` | as every Theme | Shadows |
| `--blood` | `#5a2408` | P: [26] darkest `#a2330a`, darkened | The lit lens's rim only |
| `--signal` | `#d05600` | [26] #13 pumpkin `#c74309` (textless), moved to h54 | Alarm fill |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Halo, alarm only |
| `--signal-hot` | `#fe7500` | [02] pumpkin `#fc8d4b` and band `#fb6a34` (printed #1), chroma raised | **The Alarm color** |
| `--on-signal` | `var(--abyss)` | P | Count on the chip, 4.83:1 |
| `--ink-hot` | `var(--signal-hot)` | P | BLESSING? and BOTCHED stamps, the hot pen |
| `--ink-soft` | `#a9bcbf` | [33] the Signal's lens `#778c8e` (L56 C8 h210; later printing), lifted at its hue | A WORD and MESSAGE stamps, soft pen, waiting rule |
| `--ink-live` | `var(--bone)` | P | Running work |
| `--ink` | `#d3c8ca` | P | Night Report body |
| `--accent` / `--accent-hot` | `var(--bone)` | P | Wordmark, focus, toggles, tab underline |
| `--accent-deep` | `var(--line)` | P | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 14%, transparent)` | P | |
| `--selection` | `var(--line)` | P | Selected text |
| `--progress-deep` / `--progress-hot` | `var(--line)` / `var(--bone)` | P | |
| `--thumb` | `var(--abyss)` | P | |
| `--brick` | `var(--ink-soft)` | P | |
| `--stamp-hot` / `--stamp-soft` / `--stamp-quiet` | `var(--ink-hot)` / `var(--ink-soft)` / `var(--ash)` | P | |
| `--in-progress` | `var(--bone)` | P | |
| `--in-progress-glow` | `color-mix(in srgb, var(--bone) 40%, transparent)` | P | |
| `--danger` | `var(--raised)` | P, as KNIGHTMARE | Quit hover stays a shadow |
| `--waiting-rule` | `color-mix(in srgb, var(--ink-soft) 55%, var(--surface))` | P | |
| `--report-rule` | `var(--line)` | P | |
| `--caption-paper` / `--caption-ink` / `--caption-rule` | `transparent` / `var(--ash)` / `underline` | as every Theme but BECOME A BAT | Report headings (caption boxes are BECOME A BAT's) |
| `--clawd` | `#d77757` | Claude Code's `clawd_body` | Mascot body |
| `--bone` | `#efe8e6` | P: the white of the Christmas and Labor Day fields (`#f7f1ec` [04], `#f6f1e8` [13]), at the ground's hue | Text, running work |
| `--ash` | `#a8979e` | P | Secondary text |
| `--bone-dim` | `#d8cfcf` | P | Log lines |
| `--ash-dim` / `--chevron` | `var(--ash)` | P | |
| `--clawd-eye` / `--clawd-eye-dim` | `var(--bone)` / 18% of it | as every Theme | White eyes |
| `--cowl` | `#2b5770` | [24] cape `#356a8b` (textless #9) and [33] `#376379`, between them | Cowl, gloves, boots, trunks, the cape's mantle |
| `--cowl-edge` | `color-mix(in srgb, var(--bone) 24%, transparent)` | P | Neutral rim (Costume Rule) |
| `--cowl-shine` | `#3d6f8a` | [31] cape `#42728c` (later printing) | |
| `--suit` | `#6a88a2` | [24] the lit chest, brightest 5% `#6a88a2` (textless #9) | The lit suit (§8.1) |
| `--gloves` | `var(--cowl)` | P | |
| `--belt` / `--buckle` | `#b88f25` / `#7e6132` | [24] belt median `#b88f25`; [10] printed `#7e6132` | The gold capsule belt (option: `var(--cowl)`, §8.1) |
| `--cape` | `#22495c` | [33] cape median `#22495c` (later printing) | The cape |
| `--cape-rim` / `--thread` | `var(--cowl-edge)` | P | |
| `--chest` | `var(--abyss)` | P | The black chest bat (5.45:1 on the suit) |
| `--aura-core` / `--aura-glow` | 90% / 55% of `--signal-hot` | P | Alarmed only, or none (§4.1) |
| `--emblem` | `#778c8e` | [33] the Signal's lens | The masthead bat in the lens's grey (5.71:1 on abyss) |
| `--disc-bat` / `--glass-shine` / `--glass` | `var(--raised)` / `var(--surface)` / `var(--abyss)` | P | Unlit disc |
| `--disc-rim-inner` / `--disc-rim-outer` | `#060304` / `var(--line)` | P | |
| `--lens-core` / `--lens-rim` / `--lens-bat` / `--lens-bat-edge` | `#ffd08a` / `var(--blood)` / `var(--abyss)` / `transparent` | [20] the lantern's glow | Lit lens (§9) |
| `--lens-shade` | `0 0 transparent` | P: lit flat, as BECOME A BAT's; the lantern's soft stops do the shading | No inner shading over the lit lens |
| `--notice-top` / `--notice-foot` | `#1a0a12` / `var(--smoke)` | P | |
| `--notice-hover-top` / `--notice-hover-foot` | `#2a1120` / `#170910` | P | |
| `--haze` / `--haze-edge` | 12% / 4% of `--blinds` | P | Wine light from the upper left |
| `--haze-inset` | `-30% 25% auto -30%` | P: from the top-left corner, not the top edge KNIGHTMARE and BLUE COLLAR share | |
| `--grain-opacity` | `0.04` | P | Film grain |
| `--searchlight` | `var(--bone)` | P | Intro |
| `--blinds` (own) | `#480a2b` | [15] the blinds, Measured | Haze colour |
| `--pages` (own) | `var(--bone)` | P | The falling calendar pages (Atmosphere) |
| `--signal-lens` (own, Signature A only) | `#778c8e` | [33] | The Signal's unlit lens behind him |
| Fonts | `--font-display: 'Grenze Gotisch'` (500), `--font-headline: var(--font-display)`, `--font-stamp` and `--font-dateline: 'Sofia Sans Extra Condensed'` (600, caps), `--font-body` Barlow Semi Condensed, `--font-report` Barlow Semi Condensed, `--font-type: var(--font-stamp)`, `--font-mono` JetBrains Mono, `--font-label: var(--font-body)` | §5 | |
| Type settings | `--heading-case: none`, `--wordmark-size: 22px`, `--wordmark-tracking: 0.5px`, `--wordmark-glow: 18% bone`, the rest as BECOME A BAT | P, to judge on screen | |
| Pens | `--pen-hot` stroke `#fe7500` 1.5, `--pen-soft` stroke `#a9bcbf` 1.1 | P | |
| Stamp shape | `--stamp-tilt: 0deg`, `--stamp-tilt-slight: 0deg`, `--stamp-border: 1px`, `--stamp-size: 13px`, `--stamp-weight: 600`, `--stamp-mask: none` | P: the covers' labels sit straight in their boxes | |
| `--disc-lens` | radial: `--lens-core` 0–30%, `--signal-hot` 30–70%, `--signal` 70–100%, soft stops | P: a lit lantern, not a hard print | |

Not set (other Themes' own): `--rain`, `--snow`, `--tower`, `--mercury`, `--ash-fall`, `--dust`, `--smog`, `--smoke-puff`, `--swarm`, `--colony`, `--static`, the coat and goggle variables, `--flame`, `--clawd-shadow`, `--emblem-plate(-rim)`, `--lens-edge`, `--lens-breaks`.

### 4.4 What `--signal` paints in this Theme

Only the alarm: the lit disc, the count chip, live alert dots, the alarmed aura (if kept), hot stamps, the hot pen and the jack-o'-lantern in the alarmed pose (§7). The wordmark, focus, toggles, card hover, tab underline and the sheet's spill are Bone or neutrals; progress and running work are Bone. Nothing orange on Bat-Clawd at rest but his jaw. The gold belt is 22.1 from the lit alarm and 24.4 from its fill, so it does not read as the alarm.

### 4.5 WCAG contrast (computed, WCAG 2.x)

Every text colour on all 11 grounds `themeContrast.test.ts` checks (abyss `#0a0507`, smoke `#10080b`, surface `#1c0b14`, surface-deep `#13080e`, raised `#2e1222`, header-fade `#13080e`, sheet-top `#22101a`, notice-top `#1a0a12`, notice-foot `#10080b`, notice-hover-top `#2a1120`, notice-hover-foot `#170910`). The lowest is on `--raised` in every row.

| Ink | on abyss | on surface | on raised (lowest of 11) | 4.5:1? |
|---|---|---|---|---|
| `--bone` (= `--ink-live`, `--in-progress`, `--accent`) `#efe8e6` | 16.73 | 15.67 | 14.16 | Pass |
| `--bone-dim` `#d8cfcf` | 13.25 | 12.41 | 11.21 | Pass |
| `--ink` `#d3c8ca` | 12.42 | 11.64 | 10.51 | Pass |
| `--ash` (= `--ash-dim`, `--chevron`, `--stamp-quiet`) `#a8979e` | 7.31 | 6.85 | 6.19 | Pass |
| `--ink-soft` W3 (= `--brick`, `--stamp-soft`) `#a9bcbf` | 10.25 | 9.60 | 8.67 | Pass |
| `--ink-soft` W1 lilac `#c7aec4` | 9.91 | 9.28 | 8.39 | Pass |
| `--ink-soft` W2 steel `#a9b4c8` | 9.68 | 9.08 | 8.20 | Pass |
| `--signal-hot` / `--ink-hot` (= `--stamp-hot`) A1 `#fe7500` | 7.48 | 7.01 | 6.33 | Pass |
| A2 `#ff6a00` | 7.05 | 6.60 | 5.97 | Pass |
| A3 `#ff8c1a` | 8.69 | 8.14 | 7.36 | Pass |
| `--on-signal` (abyss) on `--signal`: A1 `#d05600` / A2 `#d65000` / A3 `#cc6a00` | | | 4.83 / 4.82 / 5.42 | Pass |

No exceptions, in any option. Bone on the fill would be 3.46 (A1), which is why the chip's count is dark.

**Tier separation inside the Theme** (ΔE00, A1, W3): alarm to waiting 36.6, alarm to working 34.1, waiting to working 16.4, waiting to Ash 20.4.

### 4.6 ΔE00 against every other Theme

Grounds are in §4.2; the alarm in §4.1. Working and waiting inks, against each Theme's working / waiting ink:

| HOLIDAY | VENGEANCE | PALE MOONLIGHT | WATCHFUL PROTECTOR | KNIGHTMARE | BECOME A BAT | ANCIENT GRACE | BLUE COLLAR | SERIOUS HOUSE |
|---|---|---|---|---|---|---|---|---|
| Working Bone `#efe8e6` | 28.5 / 37.7 | 23.0 / 31.1 | 26.4 / 27.7 | **11.7** / 24.4 | 12.5 / 22.9 | **8.7** / 26.7 | 21.8 / 24.6 | 30.1 / 17.6 |
| Waiting W3 `#a9bcbf` | 31.5 / 38.2 | 12.5 / 31.4 | 12.9 / 30.9 | 21.0 / 28.0 | 16.7 / 27.1 | 12.9 / **10.1** | 19.7 / 24.6 | 27.8 / 21.4 |
| Waiting W1 lilac `#c7aec4` | 36.3 / 29.9 | 22.6 / 34.1 | 37.2 / 34.0 | 28.3 / 32.5 | 29.8 / 39.7 | 23.3 / 31.4 | 10.0 / **8.9** | 48.1 / 31.5 |
| Waiting W2 steel `#a9b4c8` | 35.4 / 36.3 | **7.3** / 34.1 | 19.8 / 34.1 | 25.8 / 31.9 | 24.2 / 36.7 | 16.2 / 13.1 | 11.0 / 22.2 | 37.0 / 29.3 |

Against Clawd: Bone 31.9, W3 33.6, alarm 13.2. **Waiting ink: W3 recommended.** W1 is the pink family jury §8 called taken (8.9 from BLUE COLLAR's mauve); W2 is 7.3 from PALE MOONLIGHT's *working* steel, the Wave 1 §10.5 cross-tier case. Both pass the ~5 rule; W3 passes it by twice. Bone, the text white, sits 3.5 from VENGEANCE's Bone and 5.0 from BLUE COLLAR's, as near-whites do (jury Wave 2, flag 1); it is the working ink of KNIGHTMARE, BECOME A BAT and ANCIENT GRACE, and sits 11.7, 12.5 and 8.7 from theirs.

## 5. Type

No lettering from the book is used. Comicraft's balloon and caption faces are commercial, and the BATMAN logo is DC's. What the covers show (Read, [02][20]): the holiday name in a medium sans in a black box; LONG HALLOWEEN in **thin, tall, condensed capitals** in a coloured band; "A Dark Knight Halloween Special" and "in Thirteen Parts" in a **blackletter script**. Licences checked through the Fontsource API on 2026-10-22.

| Role | Proposal | Licence / package | Why, and how close |
|---|---|---|---|
| Wordmark, headlines | **Grenze Gotisch** 500 (new) | OFL-1.1, `@fontsource/grenze-gotisch` (variable 100–900) | A blackletter hybrid with plain lowercase, so headlines read ("Nothing on the calendar tonight."). The covers' "in Thirteen Parts" is blackletter. No Theme has a blackletter, so the register is new. Not used for stamps |
| Stamps, dateline | **Sofia Sans Extra Condensed** 600, caps (new) | OFL-1.1, `@fontsource/sofia-sans-extra-condensed` (variable 100–900) | At 300 it is close to the LONG HALLOWEEN band; at 600 it holds a stamp at 13px. **A cost:** it is a condensed grotesque, the register of VENGEANCE's Anton and WATCHFUL PROTECTOR's Big Shoulders Stencil (§11) |
| Body, report | Barlow Semi Condensed (kept) | OFL | Shared |
| Mono | JetBrains Mono (kept) | OFL | Shared |

**Alternatives.** Display: Sofia Sans Extra Condensed 300 for the wordmark too (closest to the band, but then both faces are condensed grotesques), or UnifrakturMaguntia (OFL, a stricter blackletter, wordmark only). Stamps: **Federo** (OFL) at 11px, a 1909 grotesque nearer the "CRIME" label, but in PALE MOONLIGHT's deco register (Burton's dossier considered it), and now *The Animated Series*' draft display face (§11.1), so it is out unless TAS moves. A board with the cover's lettering beside these faces is `scratchpad/tools-tlh/board-type.png` (full path in §14).

**Stamp widths, measured** (`stampfit.py`: Pillow's advance widths with the rooms `stampWidth.test.ts` reads from the stylesheets: the report margin 101px at 0.12em and the narrowest 87px at 0.04em, both less padding and borders; the notice card 272px; the watch strip 72px at the stamp size less 1.5px). The script reproduces the shipped faces' fit (Special Elite at 11px, Bungee at 9.5px). In Sofia Sans Extra Condensed 600 at 13px with a 1px border, needed / room:

| Word | Margin | Narrowest | Strip |
|---|---|---|---|
| PERMISSION (the widest standard) | 76.3 / 101 | 65.9 / 87 | 55.1 / 72 |
| BLESSING? | 69.1 | 59.7 | 48.8 |
| BOTCHED | 61.2 | 53.9 | 41.7 |
| A WORD | 53.5 | 47.3 | 34.9 |
| MESSAGE | 60.8 | 53.5 | 41.4 |
| ON ICE | 48.5 | 42.3 | 30.6 |
| NEEDS YOU | 70.6 | 61.3 | 50.1 |
| WORKING / IDLE / SHELL | 61.7 / 36.9 / 45.1 | 54.5 | 42.2 |
| CASE OPENED (notice card only, 272) | 83.1 | | |

All fit, with at least 16px to spare in every room (PERMISSION in the watch strip is the tightest). Federo at 11px fits too (PERMISSION 83.2 / 87 at the narrowest).

## 6. Voice

**Frame: the Roman's table.** The book opens at a family wedding where Falcone asks a favour, and its killer works through his family. The Voice is the Roman's household speaking to a guest it respects: courteous, quiet, Old-World, a little menacing, and always counting the days to the next holiday. It is neither Bruce's journal (VENGEANCE), Gordon's notebook (BECOME A BAT), a newsroom (PALE MOONLIGHT), an ops room (WATCHFUL PROTECTOR), Alfred (KNIGHTMARE), television (ANCIENT GRACE), a work site (BLUE COLLAR) nor the house (SERIOUS HOUSE). Batman, Gordon and Dent do not speak in it.

Sample lines (all ours):
- Tagline under the wordmark: "One holiday at a time."
- Empty, all quiet: "A quiet night. Enjoy the holiday."
- Nothing heard (the plugin can miss sessions): "Nobody's talking tonight."
- No cases: "No cases open. Nobody's asking favours."
- Night Report name: **Calendar**. Dateline: the next of the book's named days, counted, never a date: "HALLOWEEN IN 9 DAYS", "HALLOWEEN TOMORROW", and on the day "HALLOWEEN". No time: the longest, "INDEPENDENCE DAY IN 30 DAYS", is already far longer than any shipped dateline ("GOTHAM · 02:14", "October 14"). Its width in the report header is to check on screen.
- Report, what waits on you: "Waiting on your word". Nothing waiting: "Nobody's waiting on your word tonight."
- Report, running work: "Family business".
- Report close: waiting, "The family is still waiting on you."; nothing waiting, "That's the calendar. See you next holiday."
- Quiet Signal tooltip: "No holiday tonight." *Quiet* and *dark* mean only all clear.
- Settings kicker: "The Roman's table". Atmosphere: "Calendar", hint "Calendar pages falling behind the cases".
- Case closed: "Case closed. Cross off the day."
- On the perch: "Bat-Clawd, his cape swept to the ground" (Signature B).
- One line from the book, used at most once a session as the Signature's click caption, if Signature A is picked: "Gentlemen." One word ([16][31]), the ceiling.

**The holidays as named days.** `dateline` is a per-Theme `(now: Date) => string` in `words.ts` (`datelineOf`, `monthDay`), so this needs a table there, not an engine change: Halloween (31 October), Thanksgiving (the fourth Thursday of November), Christmas (25 December), New Year's Eve (31 December), Valentine's Day (14 February), St. Patrick's Day (17 March), April Fool's Day (1 April), Mother's Day (the second Sunday of May), Father's Day (the third Sunday of June), Independence Day (4 July), Labor Day (the first Monday of September). "Roman Holiday" (#11) is not a calendar day and stays out. These are the US days the book uses; the dateline is flavour, and a user anywhere reads it as a countdown.

## 7. Lexicon

Run through jury §5's test: would a tired developer, glancing at a stamp, get the standard meaning, at least as severe?

| Standard | HOLIDAY | Verdict |
|---|---|---|
| Case | **Case** (kept) | The DA's case against the Roman |
| Needs you | **Needs you** (kept) | Four Themes already say "Your …" (desk, call, cue, on you). Plain is clearer |
| Permission | **BLESSING?** | Someone wants your approval before going on. The question mark keeps it a request; without it, "blessing" reads as good news. Fallback: YOUR OK? |
| Error | **BOTCHED** | Something was done and failed. At least as severe as "error". Rejected: FOUL PLAY (it blames someone) |
| Waiting | **A WORD** | "A word with you": Claude wants to talk to you. Not a pause word (ON HOLD was rejected for that). Fallback: the standard Waiting |
| New reply | **MESSAGE** | Something new has arrived. Rejected: DELIVERED (it reads as "task done"), NEW LEAD (detective, VENGEANCE's world) |
| Stalled | **ON ICE** | Put on hold, not moving. It must not read as all clear, and it doesn't. Its mob sense (killed) is a darker misreading, not a milder one. Decide on screen; fallback: the standard Stalled |

Working, Idle and Shell stay standard; Task done, Case opened and Case closed stay standard. No word repeats another Theme's (checked against `words.ts`: Permit?, OK to air?, Sign here, APPROVAL; Blown, Dead air, Gone wrong, TROUBLE; Asking, You're on, See me, QUESTION; Latest, Memo, JUST IN; Jammed, Frozen, NO WORD). Windows notifications and the tray keep the standard words.

## 8. Bat-Clawd

The Costume Rule holds: Clawd's body, white eyes, orange jaw and three Moods; the suit goes over him (`DESIGN.md`). At 54px one unit is about 1.9px.

### 8.1 The suit

Read on [10][24][31][33][22][29]: a blue cowl and cape (not black), the body lit blue-grey where it isn't in black shadow, a black bat, a gold capsule belt, blue gloves and trunks; ears long and tapering, flush with the cowl's sides; a cape that wraps or pools.

| Part | Grid (units) | Colour | Reads at 54px? |
|---|---|---|---|
| Cowl | the shipped head, brow shine at `....chhccccc....` | `--cowl` `#2b5770` | 2.44:1 on the surface, with the rim. The eyes are 6.43:1 on it |
| **Ears** | triangles, base x 3–5.2 and 10.8–13 at y 1.5, tips at x 3–3.6 and 12.4–13 at y −0.8 (so the frame's top edge, y −1, doesn't cut their rim, the clip the Wave 2 jury sent back on Absolute's ears); outer edges straight up from the cowl's sides. Drawn as a path behind the cowl edge | cowl | **2.2 units at the base, tapering.** SERIOUS HOUSE's needles are 1 unit wide, notched, at x 4–5 and 11–12, drawn to y −1 (no viewBox change, jury §9.12), so **the height is the same at 54px; only the width and taper differ (about 4px against 2px)**. The silhouette axis must rest on the cape and the colour (§11) |
| The cape's mantle | y 5–6, x 2–14, over the shoulders | `--cowl` | It is Year One's collar fix in this book's terms: Sale's cape covers the shoulders [31][22]. **The orange jaw is 1.18:1 on the suit and 2.47:1 on the mantle** |
| Suit | y 6–8 | `--suit` `#6a88a2` | 5.11:1 on the surface, 4.61 on raised |
| Chest bat | the Signal bat (§9), 2 wide × 1.5 tall, y 6.5–8, centred at x 8 | `--chest` black | 5.45:1 on the suit. Half a unit of suit between it and the mantle (black on the mantle's blue would be only 2.6:1), as the jury asked of Year One's collar; it rests on the belt (6.74:1). Small, but over the Wave's one-unit floor |
| Belt | y 8–9, a full unit, pouches in `--buckle` | `--belt` `#b88f25` | 1.24:1 on the suit in luminance, 42.5 ΔE00 in hue: it reads as gold on blue, not as a line. **See below** |
| Trunks, legs | y 9–9.5 trunks; legs as shipped | `--cowl` trunks and boots, `--suit` legs | |
| **Cape** | from the shoulders (x 0.5 and 15.5 at y 4.5) to the ground (y 11.5), flaring to x −1.5 and 17.5: a **bell**, with two or three long soft folds drawn as rim lines (`clawd__rib`) and a curved hem, no teeth | `--cape` `#22495c` | 1.96:1 on the surface: it needs the rim, as every dark cape does. 20 units wide at the hem: wider than any shipped cape |

**Options to decide on screen** (each from a labelled image beside [10] and [24]):
- **The belt.** S1: the book's gold `#b88f25` (faithful; 14.4 ΔE00 from BECOME A BAT's canary belt `#c2b86a`, which jury §8 named Year One's). S1b: the belt in the cowl's blue, losing the book's one yellow.
- **The body.** S1: lit blue-grey `#6a88a2` with the blue mantle (recommended). S2: the body in the cape's blue `#22495c` too, "Sale's shadow" (the jaw is 3.06:1 on it and no mantle is needed, but the chest bat is 2.10:1 and the belt the only light thing). A black body (Sale's real black) is out: it is 1.03:1 on the surface, which the Costume Rule forbids, and it is SERIOUS HOUSE's idea.
- **The cowl and suit are 2.09:1 apart,** enough to split a blue head from a lighter body.

**A risk for the round-1 merge:** *The Animated Series* claims "Timm's angular grey-and-blue suit". This suit is blue and blue-grey too. S1's suit is about 10 from a mid grey like TAS's likely one. What tells them apart is this Theme's long ears, its huge cape and the blue (not blue-black) cowl. TAS's draft does take one, with a gold belt 2.3 from ours: §11.1.

### 8.2 Poses

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | Seated, wrapped in the cape, the hem pooling wider than his feet, the ears up | [10] the cape on the ground | `seated()` with a wrapped path x 0.6–15.4 at the hem |
| flying | The cape trailing behind him to the left, huge, in three soft folds (two frames) | [11][25][28] the drop | **A cost:** BECOME A BAT also flies with a trailing cape. Ours is longer (to x −6) and unpointed. Decide on screen |
| alarmed | **The lantern:** the cape thrown open behind him, and a jack-o'-lantern at his right foot, lit | [02][14][21] | Pumpkin 2.6 × 2.2 at x 13.6–16.2, y 9.3–11.5 in `--signal`; its carved eyes and mouth (each at least a unit) in `--lens-core`, the light inside. It appears only while something needs the user, as VENGEANCE's flare does, but at his feet, not held up |
| perch | The Signature pose | | |

### 8.3 Signature pose: three options

Two front-on stands, a three-quarter look up, the duster, the swarm (top-left cloud), the leap (tilted, a wedge rising up-left), and the X-cape stand are taken; SERIOUS HOUSE rests in a closed cape with needle ears. Each option below gives its outline at 54px.

**B. The long cape (recommended).** After the collected edition's art [22][01], the image DC still leads the book with. Three-quarter, facing left, from below. One glove at his right shoulder, below the jaw and clear of the eyes (x 12.5–14, y 5–6.5), gathers the cape; the cape sweeps from that shoulder down and left in one great wedge to the ground at x −5.5, its lower edge rippled in three long folds. His eyes look down and left (`look: −GAZE`, `lookY: 0.3`).
- *Reveal* (four steps on the 8 fps clock): standing with the cape pooled; the glove rises to the shoulder; the cape swings out half way; it lies swept to the ground.
- *Watch:* once a cycle a gust lifts the hem a unit.
- *Outline at 54px:* a **right triangle**, its upright edge on the right (from the ear tip at y −0.8 to his feet), its long side falling from his shoulder to the ground at the far left. About 18 units at the base, 12.3 tall. **The upper left stays open.** Against ANCIENT GRACE, whose leap wedge (`TAILS.wedge` in `suits.ts`) runs from his shoulder up to the frame's top-left corner (−6, −1) *and* down to (−6, 11), filling the whole left side, with his body tilted 12°; KNIGHTMARE, whose coat flies out to the *right* at mid-height; and BECOME A BAT, a cloud on his upper left and a short flare at his feet. Ours is the only one empty above the slope. **Decide on screen** beside those three.

**A. "Gentlemen."** After #1 p. 27 [16][31]: the pact on the roof. Front-on, the cape wrapped round him and held shut by one glove at his chest (x 9–10.5, y 6–7), the Signal's huge round lens behind him: a disc of radius 6 centred at (8, 5.5), x 2–14, y −0.5 to 11.5 (inside the frame, so its rim isn't cut), in `--signal-lens` `#778c8e` (5.35:1 on the surface) with the Signal bat in black across it.
- *Reveal:* the lens's rim; the lens fills; he steps forward into it; the caption "Gentlemen." on click.
- *Outline at 54px:* **a disc**, 12 units across, his ear tips just past its top edge. No Theme's outline is a filled circle (WATCHFUL PROTECTOR's sonar rings play only in its reveal and fade).
- *Costs:* the figure in front is a closed cape on a front-on stand with tall ears, which is SERIOUS HOUSE at rest; only the disc separates them. A Signal in the Signature is PALE MOONLIGHT's device (a small brass oval up and to the right); this one is the lamp itself, huge, behind. And a large pale disc stays behind him on the perch.

**C. Father's Day.** After the #9 cover [10][24]: three-quarter profile facing left at a grave, head bowed (`lookY: 0.4`), the cape falling straight from his shoulders and pooling in a bell on the ground. (The roses he holds are left out: red is the alarm's family.)
- *Outline at 54px:* a tall narrow column on a wide bell. The weakest: it is a stand, told apart only by the bell and the turn.

The Signal page [33] (Batman seen from behind) is out: the Costume Rule needs his white eyes and orange jaw.

## 9. Emblem

**The book's Signal bat** [33], also on the lamp in [16][31] and on the moon in [29]. Read and Measured, on a gridded crop of [33] (`grid.py`, landmarks to about ±10px on a 590px lens):
- **It fills a round lens.** Lens centre about (585, 880), radius about 295px; the bat spans the lens almost rim to rim. Overall about **1.3:1** (wings about 570px, ear tips to tail about 440px). Every shipped bat is 2.2:1 to 3.7:1, or sits in PALE MOONLIGHT's oval: this one is round.
- **Ears and horns at about the same height.** Two tall, pointed ears close together on a narrow head (tips about 105px above the head). The wing horns are thin hooks at the upper outer corners, curling inward.
- **A flat top edge** between each horn and the ear, so the lens shows two square grey windows above the wings.
- **Outer edges bulge** to the lens's rim.
- **Underneath, two deep scallops a side** with long points between them, and a pointed tail (partly hidden by Batman's head in [33]; the small Signal in the same page's first panel shows it whole).
- **Symmetric:** trace the clearer half and mirror it at x = 60, on the 120×48 grid, in the Theme PR, as Year One's was traced. No plate: the disc is already round.

**On the chest:** the same bat, 2 × 1.5 units (§8.1). **In the masthead:** the bat in the lens's grey (`--emblem` `#778c8e`). **Tray and toast icons** stay single, from the default emblem (jury Wave 1 §2).

**The 64px disc.**
- *Unlit:* wine glass (`--abyss` to `--smoke`), the bat a shade in it (`--disc-bat` = `--raised`), the rim in `--line`. No orange.
- *Lit:* a lit jack-o'-lantern in the sky: `--lens-core` `#ffd08a` at the middle, `--signal-hot` `#fe7500`, `--signal` `#d05600` at the rim, with the black bat across (7.48:1 on the hot ring). Soft stops, not BECOME A BAT's hard rings. The count chip in `--signal-hot` with an abyss numeral.

**Collisions.** The round lens is the disc everyone has; what differs is the bat's shape (1.3:1 against the shipped wide bats). Compare with BAT_1987 and BAT_1989 at 64px before it merges. The round Signal bat is also what a 1960s Theme might reach for: Adam West (round 2) should read this.

## 10. Atmosphere

**A. Calendar pages (recommended).** After [22] and [01]: the leaves of a tear-off calendar, falling.
- *What moves:* about six pages in the default panel, each a small leaf (5–7px by 6–8px) with a darker band across its top (the month), in `--pages` (Bone) at 0.16, 0.22 and 0.30 in three depths.
- *How:* they fall slowly (1–2px a tick), drift a little to the right (0.5–1.5px), and **tumble**: every other tick a page is drawn edge-on (a 1.5px sliver), so it flips as it falls. No numbers drawn: they would be under a pixel.
- *Light:* a wine haze (`--blinds` at 12%) from the upper-left corner, as the blinds' light falls in [15].
- *Gating:* the shared 8 fps clock, under the pointer and a few seconds after news, `still: 'calm'`, nothing under reduced motion.
- *Engine:* a page sprite on the ash painter, beside BLUE COLLAR's bats: a flake drawn as a two-frame leaf. **The cost:** pages fall, as PALE MOONLIGHT's snow does, and cross a little, as KNIGHTMARE's ash does. What differs is the shape (paper, not flakes), the tumble, and the light (wine from the upper left, not smog from below or a top light).

**B. The blinds.** After #1 p. 1 [15]: five to seven horizontal bars of wine light across the panel's upper half, still. Every eight to twelve seconds a soft light sweeps across them left to right, as a car's headlights pass a window. Nothing else in the app sweeps. It needs a new kind (`blinds`), a still layer like WATCHFUL PROTECTOR's skyline with one moving band. Its cost: a mostly still Atmosphere is WATCHFUL PROTECTOR's habit.

Rain is VENGEANCE's, though [33] has it. Snow is PALE MOONLIGHT's, though #3 [32] has it.

## 11. Distinctiveness

Scored with jury Wave 1 §1's rules (C = clearly different, ~ = close, = = same); a Theme stays with C on at least 3 axes against every other.

| HOLIDAY against | Palette | Type | Silhouette | Atmosphere (A) | Voice | C |
|---|---|---|---|---|---|---|
| VENGEANCE | C: wine vs warm black (9.6 / 11.9); orange vs red (22.7); Bone vs amber (28.5) | ~: Grenze Gotisch vs Anton is C, but our stamps are a condensed grotesque, Anton's register | C: long ears, a bell vs a zigzag, the Signal bat | C: pages tumbling vs rain falling; wine from the upper left vs red from below | C: the Roman vs Bruce's journal | **4** |
| PALE MOONLIGHT | C: 10.2 / 18.2; orange vs gold (26.2); Bone vs steel (23.0) | C | C: no oval, a bell vs scallops | ~: both pale and falling; pages and a tumble vs flakes; wine above vs smog below | C: a family vs a newsroom | **4** |
| WATCHFUL PROTECTOR | C: 12.8 / 20.3; 53.1; 26.4 | ~: two condensed stamp faces (Sofia Sans XC vs Big Shoulders Stencil) | C: long ears, the bell, a blue cape vs black | C | C | **4** |
| KNIGHTMARE | C: 8.3 / 15.2; 27.3; Bone vs Bone 11.7 | C | C: cape vs duster | ~: pages and ash both cross; tumble vs sideways blow; light differs | C: the Roman vs Alfred | **4** |
| BECOME A BAT | C: 20.2 / 31.9; 21.3; Bone vs Bone 12.5 | C | C: long ears, the bell vs four points. **~ on the chest:** a small black bat on a lighter suit over a dark collar, and a yellow belt if S1 (§8.1) | C | C: the mob vs Gordon. Both early-years crime stories | **5** |
| ANCIENT GRACE | C: 24.0 / 33.1; 53.8; Bone vs Bone 8.7 | C | C: tall vs short wide-set ears; a bell vs two tails | C | C | **5** |
| BLUE COLLAR | C: 9.3 / 11.3; 43.4; 21.8 | C | C | C: pages vs bats | C | **5** |
| SERIOUS HOUSE | C: 10.5 / 17.8; 18.2; Bone vs green 30.1 | C | ~ on the ears (same height, wider base); C on the hem (a smooth bell vs torn points) and the chest (a bat vs none). **C**, but narrowly, and **Signature A would make it ~** | C | C | **5** |

**Result:** every pair passes; the lowest is 4. The "~" scores come from two things this dossier can still change: the stamp face (a non-grotesque stamp would turn VENGEANCE and WATCHFUL PROTECTOR to C; Federo would do it but is TAS's display now), and the Atmosphere (B, the blinds, would turn PALE MOONLIGHT and KNIGHTMARE to C).

### 11.1 Round 1, as the other two drafts stand

`animated-series.md` and `arkham-games.md` appeared in this folder while this note was written. Their `## Claims` blocks, measured against this palette (ΔE00):

| Role | HOLIDAY | The Arkham games | *The Animated Series* | Verdict |
|---|---|---|---|---|
| Alarm, lit | `#fe7500` | `#fe7400` **0.3** (option C amber `#ffad00`: 18.7) | A `#ff6420` **7.0** (option B blue `#8b88ff`) | **Three drafts reached for orange.** Only one can keep it |
| Alarm, fill | `#d05600` | `#d65a00` **1.7** | A `#bc3203` 11.0 | |
| Ground, surface / raised | `#1c0b14` / `#2e1222` | 23.6 / 39.6 (asylum green) | G1 neutral black 10.0 / 16.1; **G2 plum-black 1.5 / 1.2** | Clear if TAS keeps G1, its first choice |
| Suit | `#6a88a2` | 24.1 | `#5a6589` 15.1 | Both a blue-grey suit, a blue cape, a cape-blue collar under the jaw |
| Cowl / cape | `#2b5770` / `#22495c` | | cowl `#0b1030` 25.6; cape `#1a3570` 12.2 | Our blue cowl against TAS's blue-black |
| Belt | `#b88f25` | | `#be9336` **2.3** | The same gold |
| Waiting / working | `#a9bcbf` / `#efe8e6` | 14.0 to their Bone; Bone 7.8 | 13.8 to their working blue-white | Clear |
| Faces | Grenze Gotisch / Sofia Sans XC | Oxanium | **Federo** display, Mohave stamps | Federo leaves this note's alternatives |
| Signature | B, a right triangle | a crouch | S1 a low dome; **S2 a closed bell under a red disc** | S2 meets our A (a disc) and C (a bell); B is clear |

**The orange.** Our case for keeping it: the jack-o'-lantern opens and closes the book [02][14], it is the one warm light in the book's dark [21], Halloween is in the title, and this Theme's name and calendar hang on it. The Arkham games call theirs "detective orange" and have a second option (C, Asylum's menu amber); *The Animated Series* has a second option (B, the rim blue). **What this Theme loses without it:** we found no good fallback. The nearest free hue is the blinds' wine lit up, `#ff5cc0` (6.15:1 on raised, 14.6 from BLUE COLLAR's mauve, 17.9 from KNIGHTMARE's ink), but it is **4.3 from the newsprint magenta** the brief leaves with BECOME A BAT. The lantern's yellow `#ffc93c` is 3.2 from PALE MOONLIGHT's gold. **The maintainer decides** at the merge.

**Against Clawd, for every orange on the table:** ours `#fe7500` / `#d05600` is 13.2 / 12.2 ΔE00 (1.16 / 1.33:1); the Arkham games' `#fe7400` is 13.0 (1.16:1); TAS's `#ff6420` is 9.7 (1.06:1). Whichever Theme keeps orange, it works only without an aura (§4.1): every lit orange here sits at 1.06–1.16:1 in luminance on his jaw.

**The suit.** TAS's draft and this one dress Bat-Clawd in the same classic suit (blue-grey body, blue cape, a collar under the jaw, a gold belt). What tells them apart at 54px: our long ears and bell-shaped cape against TAS's standard ears and three scallops, and our Batman-blue cowl against its blue-black. If both keep their suits, **this Theme's belt goes blue** (S1b, §8.1), and the gold belt stays with TAS (and the canary with BECOME A BAT).

**The Signature.** TAS's S2 (a bell under a red disc) shares parts with our A and C; our recommended B does not.

## 12. Legal note

- **Trademark (DC):** Batman, the bat symbol, Gotham, and the names of the characters. The Signal bat is redrawn by us from the book's panel as a vector path and credited to DC, as every Theme's emblem is (ADR 0001).
- **Copyright to avoid:** Sale's drawings and Wright's colouring of any page or cover (we take colours as hex values and shapes as descriptions, never a traced panel); the BATMAN and LONG HALLOWEEN cover logos; Comicraft's lettering (commercial; our faces are OFL); dialogue beyond "Gentlemen." (one word, only with Signature A).
- **Free to use:** a holiday calendar, a jack-o'-lantern, venetian blinds, torn calendar pages, blackletter and condensed type as genres, the mob as a frame.
- **Display name:** HOLIDAY is a common word and the character's name in the book, used as an allusion, not set in the book's lettering. The picker's credit names the work.
- **Fonts:** Grenze Gotisch and Sofia Sans Extra Condensed are OFL-1.1; bundle their licences with the others.

## 13. Unverified items

- **Cover dates.** DC Database gives December 1996 to December 1997; Wikipedia's infobox gives December 1996 to July 1997; *Back Issue* #60 dates #1 October 1996 (perhaps the on-sale date). Not resolved.
- **Which colours are Wright's 1996–97 originals.** *Back Issue* #60 says its reprints carry his colours, and they differ from the later printing [31]. Neither is a scan of a 1996 interior. The covers [02–14] are the only 1996–97 printings sampled, and their scans are 400px.
- **Issues of three interiors:** the rogues' spread [21][34], the Signal page [33] and the Christmas page [32] (taken to be #3).
- **The trade art's leaves** [22]: we read OCT 31, JAN 1, DEC 25, MAR 17, JUL 4, FEB 14, APR 1 and AUG 2. AUG 2's chapter is not confirmed (Roman Holiday?).
- **The Signal bat's proportions** (§9) were read by eye off a gridded crop of a later printing, with parts hidden by Catwoman's arm and Batman's head. Trace it in the Theme PR, from [33]'s two Signals.
- **Stamp widths** are from Pillow's advance widths, which reproduce the shipped faces' fit; `stampWidth.test.ts` decides.
- **The Lexicon's ON ICE and A WORD** need the on-screen glance test.
- **HOLIDAY** as a name: check that the book uses "Holiday" as its killer's name on a page (the plot summaries and *Back Issue* #60 do).
- **Everything visual** (the orange beside the mascot, the aura, the ears beside SERIOUS HOUSE's, the cape's bell, the Signature options, the belt, the pages): decide on screen, from labelled boards with the references beside them.

## 14. Sources

- Randall C. Wiggins, "Looking Back at *Batman: The Long Halloween*" and "It's a Matter of Color: An Interview with Gregory Wright" (conducted May 28, June 6 and June 8, 2012), *Back Issue* #60, TwoMorrows, October 2012; preview PDF: https://www.twomorrows.com/media/BackIssue60Preview.pdf (pp. 3–5, 15).
- Wikipedia, ["Batman: The Long Halloween"](https://en.wikipedia.org/wiki/Batman:_The_Long_Halloween): credits (letters Comicraft, Richard Starkings; editors Archie Goodwin, Chuck Kim), editions, plot, influence.
- DC Database (Fandom), issue pages *Batman: The Long Halloween* Vol 1 #1–13 (titles and cover dates) and their cover files: https://dc.fandom.com/wiki/Batman:_The_Long_Halloween_Vol_1_1 (and _2 to _13).
- DC.com, ["What you need to know about The Long Halloween saga"](https://www.dc.com/blog/2025-10-06/what-you-need-to-know-about-the-long-halloween-saga), 6 October 2025, and its images.
- Coffee for Two, ["My Misspent Youth — Batman: The Long Halloween"](https://coffee-for-two.com/2022/06/20/my-misspent-youth-batman-the-long-halloween-by-jeph-loeb-and-tim-sale/), 20 June 2022 (page images only).
- Fontsource API: [grenze-gotisch](https://api.fontsource.org/v1/fonts/grenze-gotisch), [sofia-sans-extra-condensed](https://api.fontsource.org/v1/fonts/sofia-sans-extra-condensed), [federo](https://api.fontsource.org/v1/fonts/federo), [unifrakturmaguntia](https://api.fontsource.org/v1/fonts/unifrakturmaguntia) (all OFL-1.1).
- Every image, with its URL and edition: [`references/long-halloween.md`](references/long-halloween.md). The scripts (`colour.py`, `sample.py`, `field.py`, `near.py`, `check.py`, `stampfit.py`, `grid.py`, `typeboard.py`) and the type board stayed in the session's scratch folder (`tools-tlh/`).
- In this repo: [`wave-3-brief.md`](wave-3-brief.md), [`wave-2-brief.md`](wave-2-brief.md), [`claims-wave-3.md`](claims-wave-3.md), [`jury-wave-2.md`](jury-wave-2.md), [`year-one.md`](year-one.md), [`dkr-rework.md`](dkr-rework.md), [`burton-1989.md`](burton-1989.md); `DESIGN.md`, `CONTEXT.md`, ADR 0001; `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`, `themes.ts`; `app/src/renderer/src/styles/themes/*.css`; `app/test/stampWidth.test.ts`; SERIOUS HOUSE's `suits.ts` and stylesheet on `origin/feat/123-serious-house`.

No images are included in this note. The covers, pages and crops reproduce copyrighted art, so they stay in the scratch folder outside the repository.

## Claims
- Display name: HOLIDAY
- Ground (abyss / surface / raised), with L* C* h of surface: wine-black #0a0507 / #1c0b14 / #2e1222; surface L5 C9 h347
- Alarm (signal / signal-hot): jack-o'-lantern orange #d05600 / #fe7500 (contested with the Arkham games and TAS, §11.1)
- Waiting ink (ink-soft) / working ink (ink-live): the Signal's lens grey-green #a9bcbf / Bone #efe8e6
- Display / stamp / report faces: Grenze Gotisch / Sofia Sans Extra Condensed / Barlow Semi Condensed
- Suit in one line: Batman-blue cowl and huge bell cape, blue-grey suit under a blue mantle, long triangular ears, gold belt (blue if TAS keeps gold)
- Chest emblem and disc in one line: the book's round Signal bat (about 1.3:1), small and black on the chest; the disc lit as a jack-o'-lantern
- Signature in one line, and its outline at 54px: "The long cape" (the trade's cover): a right triangle, upright edge right, the upper left open
- Atmosphere (kind, and what moves): ~~ash painter with a page sprite: torn calendar pages falling and tumbling~~ **decided: a still pumpkin moon in a dim orange, and low fog drifting sideways (jury §9, decision 15)**, under a wine light from the upper left
- Voice in one line, and the Lexicon's seven words: the Roman's table, counting the days to the next holiday; Case · Needs you · BLESSING? · BOTCHED · A WORD · MESSAGE · ON ICE
- Engine asks: ~~a page sprite on the ash painter~~ the shared still layer and `smoke`'s `wind` and `aspect` (LUC-118); the holiday dateline is a table in `words.ts`
