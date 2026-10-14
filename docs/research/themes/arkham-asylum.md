# Theme dossier: Arkham Asylum: A Serious House on Serious Earth (1989)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Arkham Asylum: A Serious House on Serious Earth* (Grant Morrison, Dave McKean, lettered by Gaspar Saladino; DC, 1989). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere, measured against the four shipped Themes as built in v1.2.0 ([`wave-2-brief.md`](wave-2-brief.md) §3). Issue #118, Linear LUC-79. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

## 1. TL;DR

- **The Theme in one sentence:** Batman's half of the book. The panel is the blue-black ink McKean paints him in, the house shows as paper grain and scratches in the paint, and the only hot colour is the Joker's red ink, which appears only when something needs you.
- **Display name:** **SERIOUS HOUSE**. **Credit:** "after Grant Morrison and Dave McKean's *Arkham Asylum* (1989)". It is the book's subtitle cut to two words, which the subtitle took from Philip Larkin's "Church Going" (written 1954, published in *The Less Deceived*, 1955). It names the setting (the house), not the illness of the people in it, and it has nothing in common with VENGEANCE, PALE MOONLIGHT, WATCHFUL PROTECTOR or KNIGHTMARE.
- **No green.** Nothing in this palette is green. The book does use green (the Joker's hair on the 2014 and 2021 covers, a teal face on the 2020 cover, §3), but the Theme does not need it, so **asylum green stays free for the Arkham games in Wave 3.** The word "asylum" stays out of the Lexicon and the Voice too.
- **Edition:** the artist-approved colour is the remastered artwork that began with the 2019 *Absolute* edition. McKean's own shop calls the 15th-anniversary paperback "original garish printing" and the 2014 25th-anniversary hardback the "last edition with old unremastered artwork" ([davemckean.com](https://www.davemckean.com/products/arkham-asylum-25th-hb/)). Every hex below names its edition. The remastered samples are McKean's front matter and covers, not story pages; the two story pages sampled are from unknown printings (§3, §12).
- **Palette (recommended, option A "Batman's ink"):** an indigo-black ground (`#0a080e` → `#251e30`), paper-white text (`#ece9f3`), Batman's blue lifted to periwinkle as the working ink (`#a7a9e8`), old journal paper as the waiting ink (`#d6c49a`), and a rose-claret Alarm (`#ec5c94`, fill `#a11f58`).
- **Alarm color, and the catch:** the book's red is the Joker's wine-red ink. Lifted for text at its own hue (h 19–30°), it lands **4.1 ΔE00 from KNIGHTMARE's crimson**. So the proposal turns it about 25° toward claret: 12.9 from KNIGHTMARE, 25.8 from VENGEANCE, 24.2 from Clawd orange. That shift is ours, not sampled (§3).
- **Type:** two new OFL families. **IM Fell English SC** for display (the old-style serif McKean set the Larkin epigraph in, and the age of the house), **Patrick Hand SC** for stamps (a comic hand in small caps, after Saladino's per-character lettering, not a copy of it). Every stamp word is measured to fit (§4).
- **Voice and Lexicon:** the house speaks, at night, like a watchman doing rounds: rooms, doors, keys, lamps. Not a journal (VENGEANCE), not a doctor, never the Joker. Lexicon: Case stays; **At the door**, **UNLOCK**, **BROKEN**, **KNOCKING**, **NEW NOTE**, **FROZEN** (§6).
- **Bat-Clawd:** tall, curved ears one unit higher than any other cowl (they reach the viewBox's top edge, so their rim needs the viewBox raised by one unit, §7); a long cape whose hem fades out in a one-unit dither instead of ending in points; no belt plate and no oval; a real bat on the chest (§7).
- **Emblem, an open question:** a real bat, drawn by us from anatomy, after the painted bat on the 1989 cover. **This crosses ADR 0001**, which rejected "inspired by" emblems: the book has no bat symbol of its own (McKean hides it, and the era's oval is PALE MOONLIGHT's). The fallback is no chest emblem and a standard bat in the header and disc. The maintainer decides (§8).
- **Signature pose: "The mirror"** (recommended): a tall mirror on the overlay layer at his side, his shadow rising in it, and its white eyes opening one beat after his. Two figures at 54px; no taken Signature has that outline. Alternatives: the coin, the doorway (§7).
- **Atmosphere:** a new kind, `scratches`: a still collage of torn-paper panes drawn once, two to four hairline scratches re-cut every tick, cold light from the right. No particles fall (§9).
- **Engine work this Theme needs:** the `scratches` Atmosphere kind; a hem that fades (`bleed`); ears that reach row −1, with the viewBox top raised to −2 so their rim isn't clipped; and nothing new for the disc (the lens recipe is variables, as KNIGHTMARE's breaks are).

## 2. Visual identity and sources

What makes this book recognisable, in order of strength:

1. **McKean's mixed media.** He "blend[s] paintings, drawings, photography, and mixed-media collage" (Singer, *Grant Morrison*, 2011, p. 64, as cited in [Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth)). In a 2024 interview McKean says the book "started as a straight man-in-a-batsuit comic story" and became "a much more symbolic story, a dark dream", and that he prefers "to paint, draw or photograph my images" ([Retrofuturista, 25 June 2024](https://retrofuturista.com/interview-with-dave-mckean-on-his-surreal-and-arcane-art/)). The remastered front matter shows it plainly: a collage of wooden drawers and a keyhole, paint scratched back to ochre, a wine-red oval like a door (§3).
2. **Batman as a shadow.** McKean draws Batman "almost exclusively in either silhouette or extreme close-up" ([Classic Comics Forum thread](https://classiccomics.org/thread/5780/grant-morrison-mckean-arkham-asylum); a fan forum, used to fill a gap). The two story scans read here agree: a black figure with tall, curved ears on a blue ground ([Wikipedia lettering sample](https://en.wikipedia.org/wiki/File:Saladino%27s_lettering_sample.jpg)), and a page of blue-black panels where he is a head in shadow ([Comic Book Yeti](https://www.comicbookyeti.com/post/arkham-asylum-a-serious-house-on-a-serious-earth)). Morrison's annotated script calls this Batman "repressed, armored, uncertain and sexually frozen", a deliberate critique of the 1980s violent Batman (15th-anniversary edition, script p. 5, as cited in [Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth)).
3. **Saladino's voices.** Each character has a lettering of its own. Batman's balloons are black with white lettering; Maxie Zeus gets blue with a Greek-style face; the Joker has no balloon at all, only red, ink-spattered script ([Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth), citing [Kimball, *Dial B for Blog* #500](http://www.dialbforblog.com/archives/500/)). Saladino himself: Karen Berger "left it up to me to decide how to do it", and "All Karen asked was that I make everything as menacing as possible!" (Saladino to Kimball, same source, read through the [Wayback Machine copy](https://web.archive.org/web/20190814162009/http://www.dialbforblog.com/archives/500/)). He lettered all of it by hand.
4. **The house.** Amadeus Arkham turns his family home into the asylum; his story runs beside Batman's ([plot, Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth)). The annotated script names the book's symbols: "The moon, the shadow, the mirror, the tower, and the mother's son" (script p. 2, as cited in [Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth) and [Sandifer, *Eruditorum Press*, 2021](https://www.eruditorumpress.com/?p=13269)). Wikipedia reports that the house's plan drew on Glastonbury Abbey and Chartres Cathedral (no page cited; §12).
5. **The coin and the tarot.** Two-Face's coin was replaced by a die, then by tarot cards; at the end Batman gives the coin back ([plot, Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth)).
6. **The title.** The subtitle is from the last stanza of Larkin's "Church Going", which every remastered edition prints as its epigraph (2020 New Edition and 2021 Deluxe front matter, §3; poem: [Wikipedia](https://en.wikipedia.org/wiki/Church_Going)).

**Editions.** 1989 hardcover and softcover; 2004 15th anniversary (annotated script, Morrison's thumbnails, Karen Berger's afterword); 2014 25th anniversary; 2019 *Absolute* (30th anniversary); 2020 New Edition; 2021 Deluxe Edition; 2024 *Absolute* reprint ([Wikipedia](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth); [Penguin Random House](https://www.penguinrandomhouse.com/books/691318/batman-arkham-asylum-the-deluxe-edition-by-grant-morrison/9781779513175/)). The *Absolute* is sold as "painstakingly revived to its true color and quality by the artist", matching "his original painted artwork" ([Penguin Shop](https://penguinshop.ca/products/9781779526106)), and a 2019 review notes "McKean went back and restored the art himself" ([Monkeys Fighting Robots, 27 Oct 2019](https://monkeysfightingrobots.co/arkham-asylum-a-serious-house/)). The 2020 New Edition's indicia says it was "originally published as … *Absolute Batman: Arkham Asylum 30th Anniversary Edition*" and credits McKean with "Publication Design" (read from its own credits page, §3). **So the artist-approved colour is 2019 onward; this dossier prefers it.**

## 3. Palette

### Where the samples come from

I sampled pixels myself from the images below, with a Python script (median of a region; "sat15" is the median of the region's 15% most chromatic pixels; "red" and "blue" are colour masks; "top 3%" the brightest). All scans are JPEG or PNG at web size, so a hex is the image's look, not the paint.

| Key | Edition | Image | What it is |
|---|---|---|---|
| **NE20** | 2020 New Edition, remastered (indicia: from the 2019 *Absolute*) | [DC Universe Infinite preview](https://www.dcuniverseinfinite.com/comics/book/batman-arkham-asylum-new-edition/bf717cf5-3388-46fb-b9c2-a74b461a29b6/), images 0–3, 1073×1650 | Cover, epigraph over the drawers collage, credits, title page |
| **DLX21** | 2021 Deluxe Edition, remastered | [DC Universe Infinite preview](https://www.dcuniverseinfinite.com/comics/book/batman-arkham-asylum-the-deluxe-edition/81bfda34-2bd0-4dde-9957-289985d58d20), images 0–3 | Cover, drawers spread, epigraph over a blue painted shape, credits |
| **A25** | 2014 25th anniversary, **not** remastered (McKean) | [DC Universe Infinite preview](https://www.dcuniverseinfinite.com/comics/book/batman-arkham-asylum-25th-anniversary/742b6a55-9140-4718-ae68-fd2b4e214a29), images 0–3 | The same epigraph and title pages before the remaster |
| **C89** | 1989 first edition cover (DC bullet logo) | [Comic Book Yeti review](https://www.comicbookyeti.com/post/arkham-asylum-a-serious-house-on-a-serious-earth), 642×781 | Wraparound cover: the bat, the moon, red wires |
| **C04** | Cover file named after the 2004 15th-anniversary ISBN | [Wikipedia, File:Arkham.jpg](https://en.wikipedia.org/wiki/File:Arkham.jpg), 255×391 | The same cover art, reprinted |
| **SAL** | Story panel, **edition unknown** | [Wikipedia, File:Saladino's lettering sample.jpg](https://en.wikipedia.org/wiki/File:Saladino%27s_lettering_sample.jpg), 350×234 | Batman as a shadow, a black balloon |
| **PG** | Story page, **edition unknown** | Comic Book Yeti review, 612×1011 | Eight blue-black panels (Scarecrow sequence) |

**What was not sampled:** no remastered *story* page (the previews stop at the title page), no Joker lettering, no Amadeus Arkham journal page. Those hexes are marked **P** (proposed) and listed in §12.

**What the remaster changed, measured on the same pages:** little hue, much texture. The title page's red is `#4b0104` in A25 and `#460505` in NE20 (1.4 ΔE00 apart), but in A25 it is a flat red shape on black, and in NE20 the paint is back: rust, ochre scratches and mottled darks. The blue shape on the epigraph page moves 2.5–3.9 ΔE00. So the remaster's lesson for the Theme is **texture**, not a new hue.

| Element | Hex | Source, region, method | L* C h |
|---|---|---|---|
| Title-page oval, the door | `#460505` | NE20 img 3, (0.50, 0.20)–(0.72, 0.70), median | 12 34 30° |
| Same oval, most chromatic | `#7e3417` | same, sat15 | 32 45 47° |
| Scratches in the paint | `#815c37` | NE20 img 3, (0.40, 0.05)–(0.98, 0.95), top 3% | 42 29 68° |
| Title-page darks | `#0a0202` | NE20 img 3, whole page, pixels under L* 25 | 1 2 19° |
| Same title page, before remaster | `#4b0104` | A25 img 3, whole page, red mask | 13 38 29° |
| Drawers collage, wood | `#432309` (bright `#6b431f`) | NE20 img 1, (0.12, 0.33)–(0.85, 0.47), median (top 15%) | 18 26 60° |
| Epigraph's red type | `#68272a` | NE20 img 1, (0.55, 0.665)–(0.72, 0.69), red mask | 25 32 24° |
| Blue painted shape behind the epigraph | `#2d3e51` (top 3% `#46586c`) | DLX21 img 2, (0.30, 0.30)–(1, 0.85), blue mask | 26 14 265° |
| Same, before remaster | `#2f4252` (top 3% `#4d5f6d`) | A25 img 1, same region | 27 12 257° |
| Epigraph page ground | `#1a1712` | DLX21 img 2, (0, 0)–(0.6, 0.25), median | 8 4 84° |
| Batman's ground in a story panel | `#111939` | SAL, left quarter, median | 10 24 291° |
| Blue highlight, same panel | `#5e9ee4` | SAL, left quarter, top 5% | 64 42 270° |
| Batman's black balloon | `#0a0807` | SAL, (0.33, 0.05)–(0.50, 0.15), pixels under L* 25 | 2 1 56° |
| Story page, blue | `#344459` (darks `#12141b`) | PG, whole page, blue mask (darks) | 28 15 269° (6 5 281°) |
| Batman's head in shadow | `#263348` | PG, (0.22, 0.06)–(0.45, 0.50), median | 21 15 274° |
| The Joker's red wires | `#5d1c25` | C89, (0.50, 0.72)–(1, 0.97), red mask | 21 32 19° |
| The moon | `#ab6648` | C89, (0.30, 0.10)–(0.45, 0.24), sat15 | 50 38 49° |
| Same wires, 2004 file | `#903e31` | C04, (0.60, 0.72)–(1, 0.97), red mask | 37 42 36° |
| Green hair on the cover | `#738f64` | DLX21 img 0, (0, 0.05)–(0.20, 0.35), sat15 | 56 27 133° |
| Teal face on the cover | `#122018` | NE20 img 0, (0.02, 0.20)–(0.30, 0.60), median | 11 9 157° |
| The bare bulb on the cover | `#fdfad2` | NE20 img 0, (0.38, 0.50)–(0.55, 0.72), top 15% | 98 20 105° |

Read plainly: Batman's pages are blue-black (h 265–291°), the house is brown wood and scratched paint (h 47–68°), the Joker is wine red (h 19–30°), and green shows on covers, around the Joker. The three remastered front-matter pages are mostly near-pure black.

### The tension, and three grounds

Every one of the book's families is already someone's ground: the blue-black is WATCHFUL PROTECTOR's night blue, the brown wood is KNIGHTMARE's and PALE MOONLIGHT's, the near-pure black is VENGEANCE's, and the green belongs to the games. ΔE00 of each candidate's `--surface` / `--raised` against the shipped Themes:

| Ground | Surface / raised | Source | VENGEANCE | PALE MOONLIGHT | WATCHFUL PROTECTOR | KNIGHTMARE |
|---|---|---|---|---|---|---|
| **A. Batman's ink, indigo-black (recommended)** | `#171320` / `#251e30` (h 303–307°) | P: the story darks (`#111939` h 291°, `#12141b` h 281°) taken a step toward violet | 9.7 / 14.2 | 11.3 / 17.3 | 7.9 / 11.7 | 12.9 / 18.2 |
| D. Batman's ink at its sampled hue | `#12141b` / `#1e2230` (h 265–281°) | S: PG darks | 6.0 / 15.6 | 8.1 / 15.8 | **2.5 / 4.9** | 12.9 / 19.3 |
| B. Oxblood, the asylum door | `#1a0c0e` / `#2a1417` | P: from NE20 title-page darks `#0a0202` | **6.5 / 5.5** | 6.6 / 12.1 | 11.4 / 18.7 | **5.8 / 9.0** |
| C. Plum, the two inks mixed | `#191018` / `#281a26` | P: no sample | 7.5 / 10.6 | 8.6 / 14.9 | 9.2 / 14.5 | 9.4 / 14.6 |

- **D** is the faithful hue and it is WATCHFUL PROTECTOR's ground (2.5 ΔE00). Rejected.
- **A** keeps Batman's ink and opens the gap to WATCHFUL PROTECTOR to 7.9 / 11.7 by moving about 40° toward violet. It is Batman's colour, so the Theme stays his.
- **B** and **C** are the Joker's side (his wine red; red and blue mixed). B sits 5.5–6.5 from VENGEANCE and KNIGHTMARE. C clears everyone but is close to the Joker's classic purple, which would make the Theme read as the villain's. Both are kept here only as the alternatives the brief asks for.

### The Alarm color: the Joker's ink, turned to claret

The hottest colour in the book is the Joker's red: the wires on the 1989 cover, the oval on the title page, his lettering. In the story it is the colour that calls Batman in, which is what the Alarm does. **It is the Theme's only red, and it never shows at rest.**

The problem is the hue. Lifted to text strength at the source's own hue, it is KNIGHTMARE's crimson:

| Option | `--signal-hot` | KNIGHTMARE `#ff405f` | VENGEANCE `#e3121b` | Clawd `#d77757` | Worst text contrast |
|---|---|---|---|---|---|
| **A1. Claret (recommended)** | `#ec5c94` (h 359°) | 12.9 | 25.8 | 24.2 | 4.67 (passes) |
| A2. Source wine, lifted | `#e64a5e` (h 21°) | **4.1** | 13.4 | 15.6 | 3.94 on `--notice-hover-top` (fails) |

A1 moves about 25° from the sampled wine (h 19–30°) toward claret. That is a design choice to keep clear of KNIGHTMARE, **not a sample**. A2 is the faithful hue and fails both distinctiveness and contrast. If the maintainer wants a source hue, the honest answer is that this book's red is already spoken for.

Its ladder:

- `--signal-hot` `#ec5c94`: small lit pixels, the lens, the count box, the aura.
- `--ink-hot` `#f26a9a`: UNLOCK and BROKEN stamps, the hot pen.
- `--signal` `#a11f58`: large lit fills (the lit lens rim, the header count chip). Bone on it reads at 6.14:1.
- `--blood` `#5a1c3a`: dried wine, the unlit shade. It marks waiting rules and the unlit lens rim, like PALE MOONLIGHT's unlit brass. It is not the Alarm color (jury §10.6 sets the precedent), and it is never text (1.2–1.6:1).

### Token map

Every variable the four shipped Themes all set (101, checked by script against the four stylesheets; `--emblem-plate` and `--emblem-plate-rim` are only for a Theme whose bat sits on a plate, and this one has none), plus this Theme's own. *S* = sampled (edition named above), *P* = proposed, *A* = alias of a measured token. No text token is a `color-mix()`: `themeContrast.test.ts` cannot measure one.

| Token | Value | Origin | Role |
|---|---|---|---|
| `--abyss` | `#0a080e` | P, from SAL / PG darks | The page: Batman's ink, nearly black |
| `--smoke` | `#0f0c14` | P | Top gradients, notice foot |
| `--surface` | `#171320` | P | Cards, row hover, toggle track |
| `--raised` | `#251e30` | P | Card hover tint, cowl shine |
| `--line` | `#3d3452` | P | Rules, borders, scrollbar |
| `--surface-deep` | `#100d16` | P | Deep wells |
| `--frame` | `#1b1724` | P | Window frame |
| `--header-fade` | `#100d16` | P | Header fade |
| `--sheet-top` | `#201a2a` | P | Sheet top |
| `--shadow` | `#000000` | as every Theme | Drop shadows |
| `--blood` | `#5a1c3a` | P, the wine darkened | Unlit lens rim, waiting rule |
| `--signal` | `#a11f58` | P, after C89 `#5d1c25` and NE20 `#460505`, turned to claret | Lit fills. Alarm only |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Halo around alarm elements only (not text) |
| `--signal-hot` | `#ec5c94` | P (§3, option A1) | Small lit pixels, lens, count box |
| `--on-signal` | `var(--bone)` | A | Ink on the Alarm fill: 6.14:1 |
| `--ink-hot` | `#f26a9a` | P | UNLOCK, BROKEN; hot pen |
| `--ink-soft` | `#d6c49a` | P, old paper; the scratches `#815c37` (NE20) lightened and calmed | KNOCKING, NEW NOTE; soft pen |
| `--ink-live` | `#a7a9e8` | P, Batman's blue (SAL `#5e9ee4`, DLX21 `#46586c`) lifted to periwinkle | Working |
| `--ink` | `#c9c6d8` | P | Secondary text |
| `--accent` | `var(--bone)` | A | Focus, toggles, wordmark, tab underline |
| `--accent-hot` | `var(--bone)` | A | |
| `--accent-deep` | `var(--line)` | A | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 12%, transparent)` | P | Glow only (not text) |
| `--selection` | `var(--line)` | A | Text selection |
| `--progress-deep` | `var(--line)` | A | Progress track |
| `--progress-hot` | `var(--ink-live)` | A | Progress fill: running work, not an alarm |
| `--thumb` | `var(--abyss)` | A | Slider thumb |
| `--brick` | `var(--ink-soft)` | A | Failed state, soft stamps |
| `--stamp-hot` | `var(--ink-hot)` | A | |
| `--stamp-soft` | `var(--ink-soft)` | A | |
| `--stamp-quiet` | `var(--ash)` | A | FROZEN, case states |
| `--in-progress` | `var(--ink-live)` | A | Running task |
| `--in-progress-glow` | `color-mix(in srgb, var(--ink-live) 40%, transparent)` | P | Glow only |
| `--danger` | `var(--raised)` | A | Quit hover stays a shadow, as in KNIGHTMARE |
| `--waiting-rule` | `var(--blood)` | A | |
| `--report-rule` | `var(--line)` | A | |
| `--clawd` | `#d77757` | Claude Code's `clawd_body` | Bat-Clawd's body |
| `--bone` | `#ece9f3` | P, the white of Batman's balloons (SAL) | Primary text |
| `--ash` | `#9b96ae` | P | Secondary text, quiet stamps |
| `--bone-dim` | `var(--ink)` | A | |
| `--ash-dim` | `var(--ash)` | A | Struck-through done tasks |
| `--chevron` | `var(--ash)` | A | |
| `--clawd-eye` | `var(--bone)` | A | His eyes stay white |
| `--clawd-eye-dim` | `color-mix(in srgb, var(--clawd-eye) 18%, transparent)` | P | Shut eyes |
| `--cowl` | `#0d0b14` | P, Batman's ink | Cowl, cape, chest bat |
| `--cowl-edge` | `color-mix(in srgb, var(--ink-live) 30%, transparent)` | P | The faint cold rim the Costume Rule asks for |
| `--cowl-shine` | `var(--raised)` | A | |
| `--suit` | `#2a2540` | P | The body under the cape, so the chest bat reads |
| `--gloves` | `#0a0910` | P | |
| `--belt` | `#1c1829` | P | A dark waist row only; no plate, no buckle |
| `--buckle` | `var(--belt)` | A | No buckle: McKean shows none |
| `--cape` | `#110e19` | P | The shadow |
| `--cape-rim` | `var(--cowl-edge)` | A | |
| `--thread` | `var(--cowl-edge)` | A | |
| `--chest` | `var(--cowl)` | A | The real bat, ink on the suit |
| `--aura-core` | `color-mix(in srgb, var(--signal-hot) 90%, transparent)` | P | Alarmed only |
| `--aura-glow` | `color-mix(in srgb, var(--signal-hot) 55%, transparent)` | P | Alarmed only |
| `--emblem` | `var(--ash)` | A | The header bat at rest |
| `--disc-bat` | `var(--raised)` | A | The bat in the unlit disc |
| `--glass-shine` | `#2a2238` | P | Unlit glass highlight |
| `--glass` | `var(--abyss)` | A | |
| `--disc-rim-inner` | `#07060a` | P | |
| `--disc-rim-outer` | `var(--line)` | A | |
| `--lens-core` | `#f8c3d8` | P, claret at its palest | Lit lens centre |
| `--lens-rim` | `var(--signal)` | A | |
| `--lens-bat` | `var(--abyss)` | A | Black bat across the lit lens |
| `--lens-bat-edge` | `transparent` | P | |
| `--notice-top` | `var(--surface)` | A | |
| `--notice-foot` | `var(--smoke)` | A | |
| `--notice-hover-top` | `#2b2337` | P | The lightest ground; every text token is tested on it |
| `--notice-hover-foot` | `#1a1622` | P | |
| `--haze` | `color-mix(in srgb, var(--ink-live) 5%, transparent)` | P | Cold light from the right (§9) |
| `--haze-edge` | `color-mix(in srgb, var(--ink-live) 2%, transparent)` | P | |
| `--haze-inset` | `-20% -35% -20% auto` | P | From the right edge, not below or above |
| `--grain-opacity` | `0.08` | P | The paper grain, stronger than any shipped Theme (0.03–0.05) |
| `--searchlight` | `var(--bone)` | A | |
| `--font-display` | `'IM Fell English SC', Georgia, serif` | §4 | |
| `--display-weight` | `400` | | The only weight |
| `--font-body` | `'Barlow Semi Condensed', 'Segoe UI', sans-serif` | shared | |
| `--font-type` | `var(--font-stamp)` | A | Case numbers, log speakers: the hand |
| `--font-mono` | `'JetBrains Mono', 'Cascadia Mono', monospace` | shared | Machine Voice Rule |
| `--font-report` | `var(--font-body)` | §4 | Night rounds in plain text (option: IM Fell DW Pica) |
| `--font-stamp` | `'Patrick Hand SC', 'Segoe Print', cursive` | §4 | |
| `--font-label` | `var(--font-body)` | | Short labels in Barlow, as KNIGHTMARE |
| `--heading-case` | `none` | | IM Fell English SC is already small caps |
| `--font-case-title` | `var(--font-display)` | | |
| `--case-title-weight` | `var(--display-weight)` | | |
| `--folder-name-size` | `14px` | | |
| `--folder-name-tracking` | `0.3px` | | |
| `--wordmark-size` | `18px` | P, to check on screen | |
| `--wordmark-tracking` | `1.5px` | | |
| `--wordmark-glow` | `color-mix(in srgb, var(--bone) 14%, transparent)` | P | |
| `--pen-hot` | SVG data URI: a doubled, uneven underline in `#f26a9a`, stroke 1.4 | P, after Saladino's "bizarre underlinings" (Kimball) | Hot pen |
| `--pen-soft` | the same in `#d6c49a`, stroke 1.1 | P | Soft pen |
| `--stamp-tilt` | `-2deg` | P | The hand leans more than a stamp would |
| `--stamp-tilt-slight` | `-1deg` | P | |
| `--stamp-border` | `1.5px` (option `0`, §4) | P | |
| `--stamp-size` | `12px` | measured (§4) | |
| `--stamp-weight` | `var(--display-weight)` | | Patrick Hand SC has one weight, 400 |
| `--stamp-mask` | SVG `feTurbulence` spatter, generated, our own | P | Ink spatter, like the Joker's script; procedural, never a crop |
| `--disc-lens` | `var(--lens-grain) center / 100% 100%, radial-gradient(circle at 50% 45% in srgb, var(--lens-core), var(--signal-hot) 45%, var(--signal) 78%, var(--blood))` | P | §8 |

This Theme's own variables: `--scratch` (`var(--bone)`, the Atmosphere's scratches), `--pane` (`var(--ink)`, its paper panes), `--lens-grain` (an `feTurbulence` SVG for the lit lens), `--mirror` (`#1d1828`) and `--mirror-frame` (`var(--ash)`) for the Signature overlay.

### What `--signal` paints in this Theme

Nothing at rest. The wordmark, focus, toggles, the tab underline and card hover go to `--accent` (Bone); progress and running tasks to `--ink-live`; Quit's hover to `--raised`. Claret appears only on UNLOCK and BROKEN stamps, the count chip, the lit disc and the alarmed aura. The Signature pose has no aura (`aura: 'alarmed'`), as in PALE MOONLIGHT and KNIGHTMARE.

### WCAG contrast (computed, WCAG 2.x)

Measured on all 11 grounds the test uses; the worst is always `--notice-hover-top`.

| Ink | on `--abyss` | on `--surface` | on `--raised` | worst (hover top) | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` `#ece9f3` | 16.62 | 15.23 | 13.40 | 12.53 | Pass |
| `--ink` `#c9c6d8` | 11.91 | 10.91 | 9.60 | 8.98 | Pass |
| `--ash` `#9b96ae` | 6.99 | 6.40 | 5.64 | 5.27 | Pass |
| `--ink-live` `#a7a9e8` | 9.00 | 8.24 | 7.26 | 6.78 | Pass |
| `--ink-hot` `#f26a9a` | 6.93 | 6.35 | 5.59 | 5.22 | Pass |
| `--ink-soft` `#d6c49a` | 11.60 | 10.62 | 9.35 | 8.74 | Pass |
| `--signal-hot` `#ec5c94` | 6.19 | 5.67 | 4.99 | 4.67 | Pass, the tightest |
| `--on-signal` (Bone) on `--signal` | | | | 6.14 | Pass |
| `--clawd` `#d77757` (not text) | 6.32 | 5.79 | 5.10 | 4.77 | n/a |
| `--blood` `#5a1c3a` (never text) | 1.58 | 1.44 | 1.27 | 1.19 | n/a |

Every aliased text token (`--accent`, `--brick`, `--chevron`, `--bone-dim`, `--ash-dim`, `--in-progress`, the three `--stamp-*`) points at a row above, so the Theme ships with **no exceptions**. Tier separation: hot claret against paper is 1.67:1 in luminance and 40.7 ΔE00 in colour, so the two tiers never look alike.

### ΔE00 (CIEDE2000, computed from hex)

| Against | Alarm (`--signal-hot`) | `--ink-hot` | Ground (abyss / surface / raised) | Working (`--ink-live`) | Waiting (`--ink-soft`) |
|---|---|---|---|---|---|
| VENGEANCE | 25.8 | 23.8 | 3.2 / 9.7 / 14.2 | 46.7 (amber) | 35.6 |
| PALE MOONLIGHT | 54.6 | 52.3 | 3.8 / 11.3 / 17.3 | **9.4** (steel `#8fb0d3`) | 19.1 |
| WATCHFUL PROTECTOR | 39.1 | 43.5 | 2.5 / 7.9 / 11.7 | 26.9 (mercury) | 16.4 |
| KNIGHTMARE | 12.9 | 10.2 | 4.4 / 12.9 / 18.2 | 37.6 (bone) | 11.1 |
| Clawd `#d77757` | 24.2 | 23.2 | | 37.2 | 26.9 |

Abyss values are all under 5: near-black grounds always are. The surfaces and raised tones carry the difference.

Three things to note:

- **The working ink is 9.4 from PALE MOONLIGHT's steel.** The Wave 1 jury flagged 8.7 between two cool working inks. Here the two differ in hue (292° against 262°) and chroma (34 against 22): periwinkle against a grey steel. Both mean "working", so there is no clash of meaning, and against PALE MOONLIGHT the ground and the alarm already differ (Palette scores C either way). If it reads too close on screen, the fallback is **Bone as the working ink** (18.0 from KNIGHTMARE's Bone, 20.8 from PALE MOONLIGHT's steel), as KNIGHTMARE does.
- **Periwinkle is 17.8 from WATCHFUL PROTECTOR's blue alarm.** Blue means "needs you" there and "working" here. Each Theme is consistent with itself, and the picker previews each Alarm color (jury §10.5).
- **The waiting ink is not KNIGHTMARE's sand.** A first draft of ochre (`#d9ae6e`) sat 2.3 ΔE00 from KNIGHTMARE's `#e1ae66`. The paper tone sits at 11.1.

## 4. Type

Saladino lettered *Arkham Asylum* by hand, a different hand for each character; his hands are not fonts and are not licensed. The proposal takes the idea (a hand for the stamps, black and white for Batman) and an old-style book face from McKean's own front matter, which sets the Larkin epigraph in a classical serif (NE20, DLX21, A25). All families are on Fontsource; licences checked through the [Fontsource API](https://api.fontsource.org/v1/fonts/im-fell-english-sc) (`npmVersion 5.3.0`).

| Role | Proposal | Licence / package | Why, and how close |
|---|---|---|---|
| Display (wordmark, headlines, case titles) | **IM Fell English SC** 400 (new) | OFL-1.1, `@fontsource/im-fell-english-sc` | Igino Marini's revival of the Fell types, cut for John Fell's Oxford press in the 1670s ([Google Fonts description](https://raw.githubusercontent.com/google/fonts/main/ofl/imfellenglishsc/DESCRIPTION.en_us.html)). Old, a little rough, printed: the age of the house and the texture of the page. It is not McKean's cover lettering, which is a light sans with odd lowercase letters (C89); we do not copy that |
| Stamps, case numbers | **Patrick Hand SC** 400 (new) | OFL-1.1, `@fontsource/patrick-hand-sc` | "based on the designer's own handwriting", small caps ([description](https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhandsc/DESCRIPTION.en_us.html)). Close to the steady comic hand of an ordinary balloon, which is Saladino's register for Batman. It is calm, not the Joker's scrawl: the stamps must read |
| Body, labels | Barlow Semi Condensed (kept) | OFL, bundled | |
| Night Report body | Barlow Semi Condensed (kept) | OFL, bundled | Option: **IM Fell DW Pica** (OFL-1.1, `@fontsource/im-fell-dw-pica`) for the rounds. Fell's rough texture may blur at 12–12.5px; decide on screen |
| Mono | JetBrains Mono (kept) | OFL, bundled | Machine Voice Rule |

Neither family is on the taken list (Anton, Special Elite, Limelight, Josefin Sans, Syncopate, Big Shoulders Stencil, Archivo).

**Stamp widths, measured.** I rendered each word with the TTFs from the Fontsource CDN through PIL, the way `stampWidth.test.ts` adds letter spacing and the stamp box (padding 12px plus two borders of 1.5px). Rooms: the Night Report margin 101px (0.12em tracking), the narrowest margin 87px (0.04em), the watch strip about 72px at 1.5px smaller.

| Face, size | PERMISSION (reference) | AT THE DOOR (longest) | KNOCKING | NEW NOTE | UNLOCK / BROKEN / FROZEN |
|---|---|---|---|---|---|
| Special Elite 11px (VENGEANCE, shipped) | 94 / 85 / 68 | 97 / 87 / 71 | 78 / 71 / 54 | 77 / 70 / 54 | 63–64 / 58–59 / 41–42 |
| **Patrick Hand SC 12px** | 83 / 73 / 59 | **89 / 78 / 65** | 74 / 66 / 51 | 72 / 65 / 50 | 58–61 / 52–55 / 38–40 |
| IM Fell English SC 11px | 100 / 91 / 74 | **110 / 100 / 82: fails** | 91 / 84 / 66 | 90 / 83 / 65 | 72–74 / 67–69 / 49–51 |
| Rock Salt 10px (Apache-2.0) | **109 / 101 / 80: fails** | 113 / 105 / 84 | | | |

Patrick Hand SC fits everywhere at 12px. IM Fell can't be the stamp face, which is one reason the Theme uses two families. Rock Salt, the closest open face to a scrawl, is too wide even at 10px, and Apache-2.0 would need a NOTICE line; it is out.

**Stamp treatment (two options, pick on screen):**

- **S1, recommended:** a 1.5px box, tilted −2°, with an ink-spatter mask (an `feTurbulence` SVG we generate, like the other Themes' wear masks). The box keeps it a stamp.
- **S2:** no box at all (`--stamp-border: 0`), only the hand-lettered word in its tier ink and the spatter: the Joker's lettering has no balloon. Stronger homage, but a borderless word may stop reading as a stamp at a glance.

## 5. Voice

**Frame: the house, at night.** The house speaks the way a night watchman does his rounds: room by room, door by door, with a lamp and a ring of keys. The register is formal, quiet and a little old-fashioned, never grim and never a joke. It is not a journal (Bruce's journal is VENGEANCE's, and Year One is warned off it too), not a doctor's notes, and never the Joker's voice.

**Respect.** The book is about a psychiatric hospital and some of its portrayals have dated badly. The Theme stays on the building and on Batman. These words never appear in the Voice or the Lexicon: mad, madness, insane, lunatic, crazy, psycho, nuts, inmate, patient, cell, padded, straitjacket, committed, asylum, therapy, diagnosis. No villain is named or quoted; April Fools' Day is not used. The display name names the house.

Sample lines (P = ours; none quotes the book):

- Empty state title: **"Every door is shut."** The hint stays "Nothing needs you right now."
- Intro tagline: "Every room has a door." (P)
- Empty Cases: "No cases in the house tonight." (P; "cases" comes from the Lexicon, as the rule for terms in Voice lines requires)
- Nothing heard (the plugin misses some sessions): "No sound from the rooms. Some can't be heard from here." (P)
- Night Report name: **"Night rounds"**; dateline "ROUNDS · 02:14" (P)
- Report heading for what waits on you: "At your door"; for running work: "Lights still on" (P)
- Report close: waiting ? "Some doors are still open." : "Every door is shut. Get some sleep." (P; *shut* carries "all clear", as *dark* and *quiet* do elsewhere)
- Settings kicker: "The study"; Atmosphere toggle: "Scratches", hint "Scratches in the paint behind the cases" (P)
- Quit tooltip: "Lock up and leave." (P)
- Signature caption on click (once a session): none. The display name already carries the book's one phrase, so the Signature speaks only through the mirror.

*Dark*, *quiet* and *still* mean only "nothing needs you" (jury §4.3). *Shut* joins them here.

## 6. Lexicon

Frame: the rooms and doors of an old house. Every word is plain English, and the test is the jury's (§5): a tired developer glancing at a stamp gets the standard meaning at the right severity.

| Standard | Themed | Verdict |
|---|---|---|
| Case | **Case** (kept) | *Room* was considered: "3 rooms running" is odd, and a room reads as a chat room. KNIGHTMARE also keeps Case |
| Needs you | **At the door** (count: "1 at the door", "3 at the door") | Someone is waiting for you to let them in. Fits every stamp room (§4). *At your door* reads better but runs 98px in the margin at 12px: too tight |
| Permission | **UNLOCK** | A request to open something: "it wants you to unlock this". Risk: read as a state ("unlocked"). Fallback: **LET IN?**. *ADMIT* is rejected: in this setting it means admitting a patient |
| Error | **BROKEN** | Clear, at least as severe as "error". Distinct word from KNIGHTMARE's DAMAGED. *CRACKED* is rejected: it is slang for mental illness. *SHATTERED* runs long |
| Waiting | **KNOCKING** | Someone is at the door and wants an answer: Claude is asking. *CALLING* is rejected (a function call) |
| New reply | **NEW NOTE** | A note left for you. Mild risk: "note" as annotation. Fallback: **A NOTE** |
| Stalled | **FROZEN** | A developer's word for a hung process; it reads as "stuck" at once. Not *dark* or *quiet*. Rejected: *SILENT* and *STILL* (both mean all clear), *LOCKED* (reads as waiting for UNLOCK), *HUNG* (a dark echo in this setting), *STOPPED* (clashes with the run state Stopped), *NO ANSWER* (whose answer? It reads as "you haven't answered", which is Waiting) |

The Signal disc shows the count and, on its notice card, the stamp word. Windows notifications and the tray keep the standard words.

## 7. Bat-Clawd

The body, eyes, arms and legs keep their pixels (`suits.ts`: the 16×11 grid, eyes at y = 3, the viewBox −6…22 × −1…12). His eyes stay white and his jaw orange: the "faceless shadow" comes from the cowl, the cape and the overlay, never from the face (Costume Rule, `DESIGN.md`).

**The suit (outfit, in grid units):**

- **Cowl:** `--cowl` `#0d0b14`, Batman's ink, with the cold `--cowl-edge` rim (periwinkle at 30%) so it reads on the indigo ground. **Ears: tall and curved.** They rise one full unit higher than every shipped cowl, to y = −1, and their tips lean 0.5 unit outward: x = 3.5–4.5 and 11.5–12.5 at y = −1, x = 4–5 and 11–12 at y = 0–2. Source: SAL, where the shadow's ears are long and curved like horns. This is the one detail that identifies the Theme at 54px, and it is a full unit. **The catch:** y = −1 is the top edge of the viewBox (`VIEW = [-6, -1, 28, 13]`), and the cowl's stroked rim sits half a stroke outside the ear, so above the tips it is clipped. Three ways out: **(a, recommended)** an engine PR moves the viewBox top to −2 for every Theme (the frame's aspect changes, so every Theme's framing needs a look); **(b)** the ear tips go in as a front layer with no rim above them (the tips lose their cold edge on the dark ground); (c) ears only to −0.5, which breaks the one-unit rule. The outfit map's `top` also has to go to −1, or the tips go in as a path layer.
- **Body:** `--suit` `#2a2540`, a step lighter than the cowl, so the chest reads. No belt plate, no buckle, no oval: the waist row is `--belt` `#1c1829`, nearly the suit. **No oval, on purpose.** The comics Batman of 1989 wore a yellow oval; McKean hides it, and the oval belongs to PALE MOONLIGHT.
- **Chest:** the Theme's real bat (§8), `width: 6`, at (8, 7), in `--cowl` on the suit: 1.34:1 against the suit, so it reads as a dark shape, like KNIGHTMARE's.
- **Cape:** `--cape` `#110e19`, long, behind the legs. **Its hem bleeds out.** The last 1.5 units dissolve in a one-unit checker dither instead of ending in points. VENGEANCE's hem is a regular zigzag, PALE MOONLIGHT's scalloped, WATCHFUL PROTECTOR's straight, KNIGHTMARE's a duster with a few points. A soft edge is none of them, and it is McKean's figure dissolving into the dark. *Engine:* a new hem style, `bleed`. At 54px a unit is about 1.9px, so the checker reads as texture; check it at 60px.

**Poses:**

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | The wrapped cape, as every Theme | none needed | Only the hem changes: it bleeds out at his feet |
| flying | **The descent** (proposed) | Our reading of Batman going down through the house; not checked against a page (§12) | Falling, not gliding: the cape streams *up* above his shoulders in two frames of a flutter, its bleeding hem above his ears. No other flying Pose puts the cape above the head. Fallback: the cape trailing behind him, hem bleeding |
| alarmed | **Turned to the call** | none; a pose of ours | The cape flung open unevenly: the left half pooled long to the ground, the right lifted to the shoulder, both hems bleeding; eyes wide; the claret aura. It must not be PALE MOONLIGHT's "giant bat" (arms up, two wings above the ears). Pick on screen |
| perch | the Signature pose, below | | |

**Signature pose: "The mirror"** (recommended). The mirror is one of the five symbols in Morrison's script, and the book is about Batman facing his own shadow (§2). On the grid:

- **The mirror:** a tall frame on the overlay layer, to his right: x = 14.5–21.5, y = −0.5–11, a 1-unit frame in `--mirror-frame` (`--ash`) around `--mirror` glass, with one 0.5-unit diagonal glint in `--bone` at 30%. It stands as tall as he does, from the top of the ears to the floor.
- **Him:** body unchanged; his eyes look into the mirror: `[6, 3, 2, 1]` and `[10, 3, 2, 1]` (one unit right, still white).
- **The reflection:** his cowl and ears in shadow, mirrored, 6 units wide, inside the glass at x = 15.5–20.5, in `--cowl` with the cold rim. Two white eyes.
- **The reveal** (four steps, four a second, on the shared clock): 1. the empty frame and the glint, as he turns his eyes; 2. a shadow rises in the glass to y = 6; 3. the reflection's head and ears, eyes shut; 4. the reflection's eyes open, one beat after his. Under reduced motion, step 4.
- **On the perch:** once a cycle he blinks, and the reflection blinks one step later. Nothing else moves.
- **Why the outline is free:** at 54px it is two figures, one inside a tall rectangle beside him. VENGEANCE is one symmetric standing figure; PALE MOONLIGHT is one figure turned three-quarter with a small, flat oval up in the sky (6×3); WATCHFUL PROTECTOR is one figure with a ring (in the code it stands front-on, with the ring, `suits.ts`); KNIGHTMARE is one figure with a coat blown out sideways. None has a second figure or a full-height frame.

**Alternatives:**

- **"The coin":** his right arm out, a 2×2-unit coin above the hand in `--ash`, one face scratched. Reveal: the coin spins (widths 2, 1, 0.5, 1, 2 units). Source: Batman gives Two-Face his coin back. Weaker at 54px: the coin is 4px, and an arm out is a common shape.
- **"The doorway":** a tall arch on the overlay layer around him (x = 1–15, y = −1–11), the cape filling the dark inside, only his eyes and jaw lit. Source: the title page's door-like oval (NE20). Risk: a frame around the whole sprite reads as a UI border.

## 8. Emblem

**This crosses a line, and says so.** ADR 0001 rejected "original, 'inspired by' emblems" because "the bat symbols are what tell these versions apart", and `CONTEXT.md` puts "the version's bat symbol" on Bat-Clawd's chest. The argument for crossing it here: **no DC bat symbol stands for this book.** McKean keeps Batman in shadow, and the logo of the time, the yellow oval, is PALE MOONLIGHT's. The bat the book shows is an animal: the painted bat on the 1989 cover (C89), and "the bat" that haunts Amadeus Arkham's mother ([plot](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth)). So the emblem is **a real bat, drawn by us** from bat anatomy, not traced from the cover.

**Shape, on the shared 120×48 grid** (P, to draw and judge on screen):

- Wings spread, seen from below, about 2.5:1 (x = 2–118, y = 4–44).
- The leading edge rises from the shoulder to a **wrist peak** at about (30, 4) and (90, 4), with a short thumb claw pointing up, then runs down and out to the wingtip at about (2, 20) and (118, 20).
- The trailing edge has **four membrane scallops a side**, between the finger bones, deepest at y ≈ 34, their points where each finger ends.
- A small head with two short ears at x ≈ 56 and 64, y ≈ 10; a narrow body; the tail membrane a shallow V between the feet to y ≈ 44.
- Flat fill, no finish (`finish: 'none'`). Symmetric: draw the left half, mirror at x = 60.

**Fallback, if the maintainer holds the ADR line:** no chest emblem at all (the shadow has none), and the header and disc carry a bat drawn the standard way, after DC's late-1980s comics symbol without its oval. That keeps a "version's symbol" but adds a fourth near-classic bat to the picker.

It shares no outline with the four shipped bats: 2022's stepped lower edge, 1989's oval, 2008's straight lower edge, 2016's horns. Because it is not DC's mark, it is also the safest emblem in the set (§11).

**The 64px Signal disc** (variables only, as KNIGHTMARE's breaks are):

- **Unlit:** indigo glass (`--glass`, `--glass-shine` `#2a2238`), the bat a shade lighter in `--raised`. The disc grain (`--lens-grain`, an `feTurbulence` SVG) gives it McKean's texture at 64px.
- **Lit, L1 (recommended):** a radial lens, pale claret core `#f8c3d8` → `--signal-hot` → `--signal` → `--blood` at the rim, the black bat across it, the grain on top, a `--signal-glow` halo. The count sits in a claret box in Patrick Hand SC.
- **Lit, L2:** a paper-white core with a hand-drawn claret loop round the rim, like a red scrawl around a page (a `--lens-scrawl` SVG layer). More McKean, less of an alarm; try it on screen.

The tray and toast icons stay on the default emblem, as for every Theme (jury §2).

## 9. Atmosphere

**Scratches in the paint, a new kind (`scratches`).** The remaster's lesson is texture (§3). What survives in a corner panel is grain, a faint collage and a few scratches, not a painting.

- **The panes (still):** three to five torn-paper rectangles behind the cards, 40–140px across, with rough edges, in `--pane` (`--ink`) at 2–4% alpha, drawn once from a fixed seed: the drawers of the house (NE20, DLX21), reduced to almost nothing. Procedural, never a crop of McKean's art.
- **The scratches (moving):** two to four hairlines at a time, 1px wide and 20–120px long, near vertical (±8°), in `--scratch` (`--bone`) at 6–12% alpha. Each lasts one to three ticks, then another is cut somewhere else, from a precomputed, frame-indexed table (deterministic, like the snow), on the shared 8 fps clock. They jump in place; nothing falls. Source: the ochre scratches in the remastered title page (`#815c37`, NE20).
- **Light:** a cold haze from the **right** edge, `--ink-live` at 5% (`--haze-inset: -20% -35% -20% auto`). Every shipped haze comes from below or above.
- **Grain:** `--grain-opacity` 0.08, the strongest of any Theme.
- **Gating:** like the others, it shows while the pointer is over the window and for a few seconds after news, with `still: 'calm'`. Under reduced motion or with animations off, nothing, as PR #108 settled for every Theme. Nothing on the transparent Signal window.
- **Cost:** the panes are drawn once; a tick repaints a few 1px lines. Cheaper than rain.

**Engine:** a `ScratchesAtmosphere` in `atmospheres.ts` (`kind: 'scratches'`, `pane`, `panes: { count, alpha }`, `color`, `scratches: { perTick, alpha, length, angle }`) and its painter. Fallback if the engine PR is too much: the panes alone, as a still scene, plus the grain, with no new motion.

## 10. Distinctiveness

Scored with the jury's rules (§1): C = clearly different, ~ = close, = = same; a Theme stays with at least 3 C against every other.

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| vs VENGEANCE | C: indigo vs warm black (9.7 / 14.2); claret vs scarlet (25.8); periwinkle vs amber | C: IM Fell / Patrick Hand vs Anton / Special Elite | C: tall ears vs one-cell tips; bleeding vs jagged hem; real bat vs the 2022 bat | C: scratches flicker in place vs rain falling (both are lines: ~ on what moves); cold light from the side vs red from below | ~ to C: the house's rounds vs Bruce's journal; both are quiet and nocturnal | **4–5** |
| vs PALE MOONLIGHT | C: indigo vs smog brown (11.3 / 17.3); claret vs gold; working periwinkle vs steel is ~ (9.4) | C: old-style serif + hand vs Art Deco + geometric | C: ears; bleed vs scallops; no oval or belt vs oval + belt | C: scratches vs snow; side vs below | C: house vs newsroom | **5** |
| vs WATCHFUL PROTECTOR | C: indigo-violet vs blue steel (7.9 / 11.7, the closest ground); claret vs blue; periwinkle vs mercury | C | C: tall curved ears vs thin; bleed vs straight; bat vs bar | C: both have a still layer (~), but scratches move every tick vs a window a second, and cold side light vs lights from below | C: house vs ops | **5** |
| vs KNIGHTMARE | C: indigo vs scorched brown (12.9 / 18.2); claret vs crimson (12.9); periwinkle vs Bone | C | C: cape vs duster, ears, real bat vs BvS bat | C: scratches vs ash; cold side vs warm above | C: house vs veteran and Alfred | **5** |

**First guess against the other Wave 2 Themes** (written at the same time, so a projection):

- ***The Dark Knight Returns*: the main risk.** Both are painted comics, and DKR's brief offers "TV static as a static layer". Static and scratches are both noise. Keep them apart: DKR's static is a broadcast (horizontal, grey, a screen); these are scratches in paint (near-vertical hairlines over torn paper). DKR's palette (Varley's watercolours) will be warmer; check the grounds once both exist.
- ***Year One*: low.** Flat colour, noir, Gordon. Its "dirty city" may use grain; ours is paper and paint, not film.
- ***Absolute Batman*: low.** Heavy line, brutalist city, the axe. Nothing shared.
- **The Arkham games (Wave 3): low, by design.** No green, no "asylum" in the words, no detective-mode or teal (that is WATCHFUL PROTECTOR's anyway). The games keep asylum green as their way in, as the Wave 1 jury intended (jury §9).

**Inside this Theme:** claret alarm against periwinkle working and paper waiting: three hues 40+ ΔE00 apart, so the tiers never blur.

## 11. Legal note

- **Trademark (DC):** "Batman", "Arkham Asylum" and the title treatments. The book's own title appears only in the credit line, as the other Themes credit their films. The emblem is our drawing of an animal, not DC's mark; the README and NOTICE still credit the Theme as fan art.
- **Copyright to avoid:**
  - Any panel, page, cover or crop of McKean's art, including as a texture. The grain, the panes, the scratches and the stamp spatter are all procedural (`feTurbulence`, seeded shapes), made by us.
  - Saladino's lettering, as images or traced into a font. The fonts are open families; the treatment (a hand, a spatter, no box) is a homage, not a copy.
  - The Joker, and every other character's likeness: none appears.
  - Long text from the book or the annotated script. The Theme quotes nothing from it.
  - Larkin's "Church Going" is still in copyright (Faber). The Theme uses only "serious house", two words of the title phrase the book itself carries, as a name. No line of the poem is quoted in the app.
- **Free to use:** mixed-media texture as a style, a cold indigo palette, an old-style serif, a hand-lettered face, a house at night, a mirror, our own words ("Every door is shut", "Night rounds", the Lexicon).
- **Fonts:** IM Fell English SC and Patrick Hand SC are OFL-1.1; bundle their licence texts with the other Fontsource ones. (Rock Salt and Permanent Marker, both Apache-2.0, were considered and are not used.)

## 12. Unverified items

- **No remastered story page was sampled.** The DC Universe Infinite previews stop at the title page. The two story scans (SAL, PG) are from unknown printings, possibly the "garish" 1989–2014 ones. Batman's blue and the indigo darks come from them; check them against the *Absolute* (2019) or the Deluxe (2021) before the build.
- **The Joker's lettering colour.** Wikipedia says the *Absolute* changed the Joker's dialogue "from red and white back to wine red", McKean's original intent. That sentence has no footnote, and two searches found no source. The red samples here are the cover wires and the title page, not his lettering.
- **The Alarm hue is ours.** `#ec5c94` is about 25° from every sampled red (§3).
- **Who painted the 2020 New Edition cover**, and whether its figure is the Joker or someone else, is not confirmed. Only its bulb and its teal are cited, and neither is used.
- **The 1989 cover (C89)** is identified only by its DC bullet logo; the scan is a reviewer's.
- **McKean's interviews were read secondhand** except Retrofuturista (2024). His afterword to the *Absolute* was not read. The Batman-in-silhouette description comes from a fan forum.
- **Morrison's annotated script was read only through quotations** (Wikipedia, Sandifer). The house plan's sources (Glastonbury, Chartres) are uncited in Wikipedia.
- **Whether Batman wears a chest emblem anywhere in the book** was not checked. The real-bat emblem does not depend on it.
- **"The descent"** as the flying Pose has no page behind it yet.
- **Stamp widths** were measured with PIL from TTFs, not the WOFF files the test reads; the numbers should match within a pixel.
- **The bleeding hem, the tall ears and the mirror** at 54–60px: drafts to judge on the real window. The ears at y = −1 touch the viewBox's top edge; their rim is clipped unless the viewBox grows (§7).
- **The real-bat emblem against ADR 0001:** a proposal that crosses a written rule, not a settled choice (§8).
- **The ground's violet step** (h 303–307° instead of the sampled 265–291°): chosen to clear WATCHFUL PROTECTOR. Check that it does not read as the Joker's purple on screen.

## 13. Sources

- Wikipedia, ["Arkham Asylum: A Serious House on Serious Earth"](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth): credits, editions, plot, symbols, lettering. It cites Morrison's annotated script (15th-anniversary edition, pp. 2 and 5) and Singer, *Grant Morrison* (2011), p. 64.
- Dave McKean's shop: ["Arkham Asylum 25th HB"](https://www.davemckean.com/products/arkham-asylum-25th-hb/), ["Arkham Asylum 25thanno PB"](https://www.davemckean.com/products/arkham-asylum-25thanno-pb/), ["ARKHAM ASYLUM 15th Anno PB"](https://www.davemckean.com/products/arkham-asylum-15th-anno-hb/): the remastered and "garish" printings, in his words.
- ["Interview with Dave McKean on his Surreal and Arcane Art"](https://retrofuturista.com/interview-with-dave-mckean-on-his-surreal-and-arcane-art/), Retrofuturista, 25 June 2024.
- Kirk Kimball ("Robby Reed"), ["The Treasure Keeper, Part Twelve: Into the Asylum!"](http://www.dialbforblog.com/archives/500/), *Dial B for Blog* #500 ([archived copy](https://web.archive.org/web/20190814162009/http://www.dialbforblog.com/archives/500/)): Saladino on lettering the book.
- Elizabeth Sandifer, ["All Towers Men Build a Lesson Teach"](https://www.eruditorumpress.com/?p=13269), *Eruditorum Press*, 24 May 2021: quotes from the annotated script.
- Jason Jeffords Jr, ["30 Years of Arkham Asylum"](https://monkeysfightingrobots.co/arkham-asylum-a-serious-house/), *Monkeys Fighting Robots*, 27 Oct 2019: the *Absolute* restoration.
- [Classic Comics Forum thread](https://classiccomics.org/thread/5780/grant-morrison-mckean-arkham-asylum) (fan forum; used for Batman's depiction only).
- Penguin Random House, [*Batman: Arkham Asylum The Deluxe Edition*](https://www.penguinrandomhouse.com/books/691318/batman-arkham-asylum-the-deluxe-edition-by-grant-morrison/9781779513175/); Penguin Shop, [*Absolute Batman: Arkham Asylum (New Edition)*](https://penguinshop.ca/products/9781779526106).
- Wikipedia, ["Church Going"](https://en.wikipedia.org/wiki/Church_Going): Larkin's poem.
- Images sampled (not reproduced): DC Universe Infinite previews of the [New Edition](https://www.dcuniverseinfinite.com/comics/book/batman-arkham-asylum-new-edition/bf717cf5-3388-46fb-b9c2-a74b461a29b6/), the [Deluxe Edition](https://www.dcuniverseinfinite.com/comics/book/batman-arkham-asylum-the-deluxe-edition/81bfda34-2bd0-4dde-9957-289985d58d20) and the [25th Anniversary](https://www.dcuniverseinfinite.com/comics/book/batman-arkham-asylum-25th-anniversary/742b6a55-9140-4718-ae68-fd2b4e214a29); [File:Arkham.jpg](https://en.wikipedia.org/wiki/File:Arkham.jpg) and [File:Saladino's lettering sample.jpg](https://en.wikipedia.org/wiki/File:Saladino%27s_lettering_sample.jpg) (Wikipedia, fair use); the cover and page in the [Comic Book Yeti review](https://www.comicbookyeti.com/post/arkham-asylum-a-serious-house-on-a-serious-earth).
- Fontsource API: [IM Fell English SC](https://api.fontsource.org/v1/fonts/im-fell-english-sc), [IM Fell DW Pica](https://api.fontsource.org/v1/fonts/im-fell-dw-pica), [Patrick Hand SC](https://api.fontsource.org/v1/fonts/patrick-hand-sc), [Rock Salt](https://api.fontsource.org/v1/fonts/rock-salt) (OFL-1.1, Rock Salt Apache-2.0). Google Fonts descriptions: [IM Fell English SC](https://raw.githubusercontent.com/google/fonts/main/ofl/imfellenglishsc/DESCRIPTION.en_us.html), [Patrick Hand SC](https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhandsc/DESCRIPTION.en_us.html), [Rock Salt](https://raw.githubusercontent.com/google/fonts/main/apache/rocksalt/DESCRIPTION.en_us.html).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-1.md`](jury-wave-1.md), [`burton-1989.md`](burton-1989.md), [`knightmare-palette.md`](knightmare-palette.md), `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`, `app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`, `app/test/themeContrast.test.ts`, `app/test/stampWidth.test.ts`.
- Colour maths: WCAG 2.x relative luminance and CIEDE2000 (Sharma, Wu and Dalal, 2005), computed with our own script and checked against Sharma's test pair 1 (2.0425) and the textbook `#777777` on white (4.48:1).
