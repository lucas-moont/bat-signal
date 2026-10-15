# Theme dossier: Arkham Asylum: A Serious House on Serious Earth (1989)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Arkham Asylum: A Serious House on Serious Earth* (Grant Morrison, Dave McKean, lettered by Gaspar Saladino; DC, 1989). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere, measured against the four shipped Themes as built in v1.2.0 ([`wave-2-brief.md`](wave-2-brief.md) §3) and the other three Wave 2 Themes as the jury revised them. Issue #118, Linear LUC-79. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

Revised 2026-10-14 after the wave 2 jury (`jury-wave-2.md` §9).

## 1. TL;DR

- **The Theme in one sentence:** a plum-black house at night, Batman a shadow in blue-black ink inside it, the house showing as paper grain and scratches in the paint, and one hot colour, the Joker's red ink turned to claret, only when something needs you.
- **Display name:** **SERIOUS HOUSE** (approved, jury §9.11). Credit string: `{ name: 'SERIOUS HOUSE', film: "Grant Morrison and Dave McKean's Arkham Asylum (1989)" }`; `words.ts` adds "after", so the field never starts with it (jury §3.15). Proposed Theme id `arkham-asylum-1989`. The name is the book's subtitle cut to two words, which the subtitle took from Philip Larkin's "Church Going" (written 1954, published in *The Less Deceived*, 1955). It names the setting, not the illness of the people in it.
- **No green.** Nothing in this palette is green. The book uses green (the Joker's hair on the 2014 and 2021 covers, a teal face on the 2020 cover, §3), but the Theme does not need it, so **asylum green stays free for the Arkham games in Wave 3.** The word "asylum" stays out of the Lexicon and the Voice. The plum ground does take the Joker's purple off the table for Wave 3 (jury §8).
- **Edition:** the artist-approved colour is the remastered artwork that began with the 2019 *Absolute* edition. McKean's own shop calls the 15th-anniversary paperback "original garish printing" and the 2014 25th-anniversary hardback the "last edition with old unremastered artwork" ([davemckean.com](https://www.davemckean.com/products/arkham-asylum-25th-hb/)). Every hex below names its edition. The remastered samples are McKean's front matter and covers, not story pages; the two story pages sampled are from unknown printings (§3, §12).
- **Palette (jury §9.2):** a **plum-black ground** (`#0e080b` → `#1a0f15` → `#2b1822`, h 344–346°), **Bone as the working ink** (`#f3e5e8`, a paper white with a trace of rose), old journal paper as the waiting ink (`#d6c49a`), and the **claret Alarm** kept (`#ec5c94`, fill `#a11f58`). Batman's blue survives only as the cold rim on his cowl and cape. Every text token passes 4.5:1 on all 11 grounds; the tightest is `--signal-hot` at 4.92:1. **Whether claret on plum reads as the Joker's palette is decided on screen.**
- **Alarm color, and the catch:** the book's red, lifted for text at its own hue (h 19–30°), lands 4.1 ΔE00 from KNIGHTMARE's crimson. The claret is turned about 25° toward rose: 12.9 from KNIGHTMARE, 11.9 from BECOME A BAT's magenta, 25.8 from VENGEANCE, 24.2 from Clawd orange. That shift is ours, not sampled. The jury kept it (§3.10): it is the least bad red this book has.
- **Type:** **IM Fell English SC** for the display *and* the stamps (jury §9.4: the upright hand is Year One's), at **10px with a 1px box**, measured with the font file. Case titles go to Barlow. One consequence: "At the door" is too wide in IM Fell, so the Needs you label becomes **Doorstep** (or "Your door"; §6). The alternative, a scrawl hand that keeps "At the door", is Caveat Brush at 12px (§4).
- **Voice and Lexicon:** the house speaks, at night, like a watchman on his rounds: rooms, doors, keys, lamps. Not a journal (VENGEANCE), not a doctor, never the Joker. Lexicon (jury §4, §9.9): Case stays; **Doorstep**, **LET IN?**, **BROKEN**, **KNOCKING**, **NEW NOTE**, and the standard **Stalled**. FROZEN is DKR's; BROKEN is now this Theme's alone (Absolute took BLOWN).
- **Bat-Clawd:** the tall ears are this Theme's (jury §9.6), their tips drawn as a front layer inside the viewBox, no engine change. He is a silhouette, as McKean's Batman is, so three fixes make the details exist at rest: a plum-grey suit at 2.16:1 against the cowl (the chest bat reads), the bleeding hem drawn in the rim's blue (2.62:1 on the ground), and the rim following every dither cell. Flying is a trailing cape with the bleeding hem; the descent is gone (DKR's drop owns the cape over the head).
- **Signature pose: "The mirror"**: a tall mirror on the overlay layer at his side, his shadow rising in it, its white eyes opening one beat after his. Beside KNIGHTMARE's coat (also a dark mass to the right) it is decided on screen. Alternatives: the coin, the doorway (§7).
- **Emblem:** a real bat, drawn by us from life, after the painted bat the book shows. ADR 0001 is amended for exactly this case (jury §9.7): a work with no bat symbol of its own may draw the bat the work shows, credited as our drawing. The late-1980s DC bat fallback is dropped; it is Year One's (§8).
- **Atmosphere:** the shared **`noise`** painter (jury §6, §9.12), set for scratches: hairlines cut one at a time that **stay and fade over 2–3 seconds**, over a still layer of torn-paper panes, with cold light from the right. DKR's static uses the same painter with one-tick specks (§9).
- **Engine work:** none of its own. The `noise` painter is shared with DKR; the ear tips are a front path, the bleeding hem rects; the disc is variables.

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
| **PG** | Story page, **edition unknown** | Comic Book Yeti review, 612×1011 | Eight blue-black panels (it appears to be the Scarecrow sequence) |

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

### The ground: plum-black (decided)

Every one of the book's families is already someone's ground: the blue-black is WATCHFUL PROTECTOR's night blue, the brown wood KNIGHTMARE's and PALE MOONLIGHT's, the near-pure black VENGEANCE's, the green the games', and the violet the first draft took is BLUE COLLAR's, which sampled it (jury §3.2). The maintainer moved this Theme to a **plum-black** (jury §9.2): the house's dark, between the wine of the asylum door and the black of Batman's ink. It is a choice, not a sample, and it is the hue family this Theme names: **plum, h 344–346°.**

ΔE00 of the plum `--surface` / `--raised` against every other Theme (Wave 2 as revised by the jury):

| Ground | VENGEANCE | PALE MOONLIGHT | WATCHFUL PROTECTOR | KNIGHTMARE | ANCIENT GRACE (DKR) | BLUE COLLAR (Absolute) | BECOME A BAT (Year One) |
|---|---|---|---|---|---|---|---|
| **Plum** `#1a0f15` / `#2b1822` | 7.1 / **9.2** | 7.8 / 14.5 | 10.2 / 16.8 | 7.9 / 13.0 | 13.7 / 21.7 | 9.5 / 11.0 | 17.3 / 27.7 |
| *Draft violet* `#171320` / `#251e30` (dropped) | 9.7 / 14.2 | 11.3 / 17.3 | 7.9 / 11.7 | 12.9 / 18.2 | 14.8 / 18.7 | **5.0 / 5.7** | 16.3 / 25.8 |

Values for the other Wave 2 Themes: DKR's moved ground `#131a17` / `#1d2622`, Absolute's `#17132a` / `#221c3c`, Year One's moved `#191b0b` / `#292c11` (jury §2). The one figure under the new Wave rule's ~10 for raised tones is VENGEANCE's, 9.2; the jury measured it and accepted it (§3.2). The plum clears every surface by 7.1 or more.

**The Joker risk.** Purple and red-pink together are the Joker's colours. Here the plum is nearly black (C* 6–13), the only claret is the Alarm, and nothing else is purple. Whether it still reads as the villain's palette is **decided on screen**, from a labelled comparison of the panel at rest and alarmed (jury §9.2).

### The Alarm color: the Joker's ink, turned to claret

The hottest colour in the book is the Joker's red: the wires on the 1989 cover, the oval on the title page, his lettering. In the story it is the colour that calls Batman in, which is what the Alarm does. **It is the Theme's only red, and it never shows at rest.**

At the source's own hue it is KNIGHTMARE's crimson:

| Option | `--signal-hot` | KNIGHTMARE `#ff405f` | BECOME A BAT `#ff4dd2` | VENGEANCE `#e3121b` | Clawd `#d77757` | Worst text contrast (plum) |
|---|---|---|---|---|---|---|
| **A1. Claret (kept, jury §3.10)** | `#ec5c94` (h 359°) | 12.9 | 11.9 | 25.8 | 24.2 | 4.92 |
| A2. Source wine, lifted (out) | `#e64a5e` (h 21°) | **4.1** | | 13.4 | 15.6 | under 4.5 on the hover tone |

A1 moves about 25° from the sampled wine (h 19–30°) toward claret. That is a design choice to keep clear of KNIGHTMARE, **not a sample**. The pink-red family now holds KNIGHTMARE, this Theme and Year One, each 11.9–23.2 apart with grounds 12–28 apart; the jury judged that enough, to be checked side by side in the picker.

Its ladder:

- `--signal-hot` `#ec5c94`: small lit pixels, the lens, the count box, the aura.
- `--ink-hot` `#f26a9a`: LET IN? and BROKEN stamps, the hot pen.
- `--signal` `#a11f58`: large lit fills (the lit lens rim, the header count chip). Bone on it reads at 6.02:1.
- `--blood` `#5a1c3a`: dried wine, the unlit shade. It marks waiting rules and the unlit lens rim, like PALE MOONLIGHT's unlit brass (jury Wave 1 §10.6). It is never text (1.25–1.57:1).

### Token map

Every variable the four shipped Themes all set (101, checked by script against the four stylesheets; `--emblem-plate` and `--emblem-plate-rim` are only for a Theme whose bat sits on a plate, and this one has none), plus this Theme's own. *S* = sampled (edition named above), *P* = proposed, *J* = set by the jury, *A* = alias of a measured token. No text token is a `color-mix()`: `themeContrast.test.ts` cannot measure one.

| Token | Value | Origin | Role |
|---|---|---|---|
| `--abyss` | `#0e080b` | P, the plum family darkened | The page |
| `--smoke` | `#130b0f` | P | Top gradients, notice foot |
| `--surface` | `#1a0f15` | J (§9.2) | Cards, row hover, toggle track |
| `--raised` | `#2b1822` | J (§9.2) | Card hover tint, cowl shine |
| `--line` | `#4a2c3b` | P | Rules, borders, scrollbar |
| `--surface-deep` | `#140c10` | P | Deep wells |
| `--frame` | `#20131a` | P | Window frame |
| `--header-fade` | `#140c10` | P | Header fade |
| `--sheet-top` | `#24151d` | P | Sheet top |
| `--shadow` | `#000000` | as every Theme | Drop shadows |
| `--blood` | `#5a1c3a` | P, the wine darkened | Unlit lens rim, waiting rule |
| `--signal` | `#a11f58` | P, after C89 `#5d1c25` and NE20 `#460505`, turned to claret | Lit fills. Alarm only |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Halo around alarm elements only (not text) |
| `--signal-hot` | `#ec5c94` | P (option A1) | Small lit pixels, lens, count box |
| `--on-signal` | `var(--bone)` | A | Ink on the Alarm fill: 6.02:1 |
| `--ink-hot` | `#f26a9a` | P | LET IN?, BROKEN; hot pen |
| `--ink-soft` | `#d6c49a` | P, old paper; the scratches `#815c37` (NE20) lightened and calmed | KNOCKING, NEW NOTE; soft pen |
| `--ink-live` | `var(--bone)` | J (§9.2) | Working: running work in paper white; the stamp word carries the tier |
| `--ink` | `#d2c4ca` | P | Secondary text |
| `--accent` | `var(--bone)` | A | Focus, toggles, wordmark, tab underline |
| `--accent-hot` | `var(--bone)` | A | |
| `--accent-deep` | `var(--line)` | A | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 12%, transparent)` | P | Glow only (not text) |
| `--selection` | `var(--line)` | A | Text selection |
| `--progress-deep` | `var(--line)` | A | Progress track |
| `--progress-hot` | `var(--bone)` | A | Progress fill: running work, not an alarm |
| `--thumb` | `var(--abyss)` | A | Slider thumb |
| `--brick` | `var(--ink-soft)` | A | Failed state, soft stamps |
| `--stamp-hot` | `var(--ink-hot)` | A | |
| `--stamp-soft` | `var(--ink-soft)` | A | |
| `--stamp-quiet` | `var(--ash)` | A | Stalled, case states |
| `--in-progress` | `var(--bone)` | A | Running task |
| `--in-progress-glow` | `color-mix(in srgb, var(--bone) 40%, transparent)` | P | Glow only |
| `--danger` | `var(--raised)` | A | Quit hover stays a shadow, as in KNIGHTMARE |
| `--waiting-rule` | `var(--blood)` | A | |
| `--report-rule` | `var(--line)` | A | |
| `--clawd` | `#d77757` | Claude Code's `clawd_body` | Bat-Clawd's body |
| `--bone` | `#f3e5e8` | P, the white of Batman's balloons (SAL), a trace of rose to sit on plum | Primary text, working |
| `--ash` | `#a5939c` | P | Secondary text, quiet stamps |
| `--bone-dim` | `var(--ink)` | A | |
| `--ash-dim` | `var(--ash)` | A | Struck-through done tasks |
| `--chevron` | `var(--ash)` | A | |
| `--clawd-eye` | `var(--bone)` | A | His eyes stay white |
| `--clawd-eye-dim` | `color-mix(in srgb, var(--clawd-eye) 18%, transparent)` | P | Shut eyes |
| `--cowl` | `#0d0b14` | P, Batman's blue-black ink | Cowl, cape, gloves' family |
| `--cowl-edge` | `color-mix(in srgb, var(--batman-blue) 35%, transparent)` | P | The cold rim the Costume Rule asks for: 2.06:1 on the surface |
| `--cowl-shine` | `var(--raised)` | A | |
| `--suit` | `#55425e` | P, a plum-grey; §7 | The body, lifted so the chest bat reads (2.16:1 against the cowl) |
| `--gloves` | `#0a0910` | P | |
| `--belt` | `var(--suit)` | A | No belt: McKean shows none, and a dark waist row would touch the chest bat (§7) |
| `--buckle` | `var(--belt)` | A | No buckle: McKean shows none |
| `--cape` | `#110e19` | P | The shadow |
| `--cape-rim` | `color-mix(in srgb, var(--batman-blue) 45%, transparent)` | P | Rim and the bleeding hem's dither: 2.62:1 on the surface |
| `--thread` | `var(--cape-rim)` | A | |
| `--chest` | `var(--cowl)` | A | The real bat, ink on the suit |
| `--aura-core` | `color-mix(in srgb, var(--signal-hot) 90%, transparent)` | P | Alarmed only |
| `--aura-glow` | `color-mix(in srgb, var(--signal-hot) 55%, transparent)` | P | Alarmed only |
| `--emblem` | `var(--ash)` | A | The header bat at rest |
| `--disc-bat` | `var(--raised)` | A | The bat in the unlit disc |
| `--glass-shine` | `#3a2230` | P | Unlit glass highlight |
| `--glass` | `var(--abyss)` | A | |
| `--disc-rim-inner` | `#08040a` | P | |
| `--disc-rim-outer` | `var(--line)` | A | |
| `--lens-core` | `#f8c3d8` | P, claret at its palest | Lit lens centre |
| `--lens-rim` | `var(--signal)` | A | |
| `--lens-bat` | `var(--abyss)` | A | Black bat across the lit lens |
| `--lens-bat-edge` | `transparent` | P | |
| `--notice-top` | `var(--surface)` | A | |
| `--notice-foot` | `var(--smoke)` | A | |
| `--notice-hover-top` | `#311c27` | P | The lightest ground; every text token is tested on it |
| `--notice-hover-foot` | `#1f1219` | P | |
| `--haze` | `color-mix(in srgb, var(--batman-blue) 5%, transparent)` | P | Cold light from the right (§9) |
| `--haze-edge` | `color-mix(in srgb, var(--batman-blue) 2%, transparent)` | P | |
| `--haze-inset` | `-20% -35% -20% auto` | P | From the right edge; every shipped and Wave 2 haze comes from below or above |
| `--grain-opacity` | `0.08` | P | The paper grain, stronger than any shipped Theme (0.03–0.05). Check it doesn't eat small text's contrast (jury §6) |
| `--searchlight` | `var(--bone)` | A | |
| `--font-display` | `'IM Fell English SC', Georgia, serif` | §4 | |
| `--display-weight` | `400` | | The only weight |
| `--font-body` | `'Barlow Semi Condensed', 'Segoe UI', sans-serif` | shared | |
| `--font-type` | `var(--font-stamp)` | A | Case numbers, log speakers |
| `--font-mono` | `'JetBrains Mono', 'Cascadia Mono', monospace` | shared | Machine Voice Rule |
| `--font-report` | `var(--font-body)` | §4 | Night rounds in plain text (option: IM Fell DW Pica) |
| `--font-stamp` | `var(--font-display)` | J (§9.4) | One family for display and stamps, as KNIGHTMARE |
| `--font-label` | `var(--font-body)` | | Short labels in Barlow, as KNIGHTMARE |
| `--heading-case` | `none` | | IM Fell English SC is already small caps |
| `--font-case-title` | `var(--font-body)` | J (§2) | Long session titles in Barlow, as every other Theme |
| `--case-title-weight` | `600` | | Barlow's title weight |
| `--folder-name-size` | `14px` | | |
| `--folder-name-tracking` | `0.3px` | | |
| `--wordmark-size` | `18px` | P, to check on screen | |
| `--wordmark-tracking` | `1.5px` | | |
| `--wordmark-glow` | `color-mix(in srgb, var(--bone) 14%, transparent)` | P | |
| `--pen-hot` | SVG data URI: a doubled, uneven underline in `#f26a9a`, stroke 1.4 | P, after Saladino's "bizarre underlinings" (Kimball) | Hot pen |
| `--pen-soft` | the same in `#d6c49a`, stroke 1.1 | P | Soft pen |
| `--stamp-tilt` | `-1deg` | P | A press stamp set a little crooked |
| `--stamp-tilt-slight` | `-0.5deg` | P | |
| `--stamp-border` | `1px` | measured (§4) | 1.5px pushes PERMISSION past the narrow margin |
| `--stamp-size` | `10px` | measured (§4) | |
| `--stamp-weight` | `var(--display-weight)` | | |
| `--stamp-mask` | SVG `feTurbulence` spatter, generated, our own | P | Ink spatter, after the Joker's script; procedural, never a crop |
| `--disc-lens` | `var(--lens-grain) center / 100% 100%, radial-gradient(circle at 50% 45% in srgb, var(--lens-core), var(--signal-hot) 45%, var(--signal) 78%, var(--blood))` | P | §8 |

This Theme's own variables: `--batman-blue` (`#a7a9e8`, McKean's blue lifted: the rims and the haze, never text), `--scratch` (`var(--bone)`, the Atmosphere's scratches), `--pane` (`var(--ink)`, its paper panes), `--lens-grain` (an `feTurbulence` SVG for the lit lens), `--mirror` (`#2a1a24`) and `--mirror-frame` (`var(--ash)`) for the Signature overlay.

### What `--signal` paints in this Theme

Nothing at rest. The wordmark, focus, toggles, the tab underline and card hover go to `--accent` (Bone); progress and running tasks to Bone; Quit's hover to `--raised`. Claret appears only on LET IN? and BROKEN stamps, the count chip, the lit disc and the alarmed aura. The Signature pose has no aura (`aura: 'alarmed'`), as in PALE MOONLIGHT and KNIGHTMARE.

### WCAG contrast (computed, WCAG 2.x)

Measured on all 11 grounds the test uses; the worst is always `--notice-hover-top`.

| Ink | on `--abyss` | on `--surface` | on `--raised` | worst (hover top) | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` `#f3e5e8` (also working) | 16.24 | 15.30 | 13.68 | 12.96 | Pass |
| `--ink` `#d2c4ca` | 11.80 | 11.12 | 9.94 | 9.42 | Pass |
| `--ash` `#a5939c` | 6.85 | 6.46 | 5.77 | 5.47 | Pass |
| `--ink-hot` `#f26a9a` | 6.90 | 6.50 | 5.81 | 5.51 | Pass |
| `--ink-soft` `#d6c49a` | 11.55 | 10.88 | 9.73 | 9.22 | Pass |
| `--signal-hot` `#ec5c94` | 6.17 | 5.81 | 5.19 | 4.92 | Pass, the tightest |
| `--on-signal` (Bone) on `--signal` | | | | 6.02 | Pass |
| `--clawd` `#d77757` (not text) | 6.30 | 5.94 | 5.31 | 5.03 | n/a |
| `--blood` `#5a1c3a` (never text) | 1.57 | 1.48 | 1.32 | 1.25 | n/a |

Every aliased text token (`--accent`, `--ink-live`, `--brick`, `--chevron`, `--bone-dim`, `--ash-dim`, `--in-progress`, the three `--stamp-*`) points at a row above, so the Theme ships with **no exceptions**. Tier separation: hot claret against paper is 40.7 ΔE00 apart; paper waiting against Bone working is 20.2.

### ΔE00 (CIEDE2000, computed from hex)

| Against | Alarm (`--signal-hot`) | `--ink-hot` | Ground (surface / raised) | Working (Bone) | Waiting (`--ink-soft`) |
|---|---|---|---|---|---|
| VENGEANCE | 25.8 | 23.8 | 7.1 / 9.2 | 30.8 (amber) | 35.6 |
| PALE MOONLIGHT | 54.6 | 52.3 | 7.8 / 14.5 | 24.5 (steel) | 19.1 |
| WATCHFUL PROTECTOR | 39.1 | 43.5 | 10.2 / 16.8 | 36.7 (mercury) | 16.4 |
| KNIGHTMARE | 12.9 | 10.2 | 7.9 / 13.0 | 15.6 (its Bone) | 11.1 |
| ANCIENT GRACE (DKR, revised) | 70.0 (cyan) | 68.7 | 13.7 / 21.7 | 12.7 (its Bone) | 16.7 (phosphor green) |
| BLUE COLLAR (Absolute) | 69.0 (lemon) | 66.4 | 9.5 / 11.0 | 19.6 (lavender) | 34.4 (mauve) |
| BECOME A BAT (Year One, revised) | 11.9 (magenta) | 12.2 | 17.3 / 27.7 | 17.4 (its Bone) | 11.4 (canary) |
| Clawd `#d77757` | 24.2 | 23.2 | | 31.5 | 26.9 |

Four Themes now run in Bone (KNIGHTMARE, DKR, Year One, this one). The new Wave rule asks working inks to sit more than ~5 apart; this Bone is 12.7–17.4 from the other three, because it leans rose where theirs lean cream, green and grey. The draft's periwinkle working ink is gone, so the 9.4 against PALE MOONLIGHT's steel and the 5.7 against BLUE COLLAR's lavender are gone with it.

## 4. Type

Saladino lettered *Arkham Asylum* by hand, a different hand for each character; his hands are not fonts and are not licensed. The upright printed hand is Year One's now (jury §9.4), so this Theme takes one face from McKean's own front matter, which sets the Larkin epigraph in a classical old-style serif (NE20, DLX21, A25), for the display and the stamps. Licences checked through the [Fontsource API](https://api.fontsource.org/v1/fonts/im-fell-english-sc) (`npmVersion 5.3.0`).

| Role | Proposal | Licence / package | Why, and how close |
|---|---|---|---|
| Display and stamps | **IM Fell English SC** 400 (new) | OFL-1.1, `@fontsource/im-fell-english-sc` | Igino Marini's revival of the Fell types, cut for John Fell's Oxford press in the 1670s ([Google Fonts description](https://raw.githubusercontent.com/google/fonts/main/ofl/imfellenglishsc/DESCRIPTION.en_us.html)). Old, a little rough, printed: the age of the house and the texture of the page. As stamps, it reads as a mark struck from an old press. It is not McKean's cover lettering, a light sans with odd lowercase letters (C89); we do not copy that |
| Case titles, body, labels | Barlow Semi Condensed (kept) | OFL, bundled | Long session titles in rough small caps at 13–14px are hard to read (jury §2) |
| Night Report body | Barlow Semi Condensed (kept) | OFL, bundled | Option: **IM Fell DW Pica** (OFL-1.1, `@fontsource/im-fell-dw-pica`). Fell's rough texture may blur at 12–12.5px; decide on screen |
| Mono | JetBrains Mono (kept) | OFL, bundled | Machine Voice Rule |

IM Fell is on no other Theme's list (Anton, Special Elite, Limelight, Josefin Sans, Syncopate, Big Shoulders Stencil, Archivo; Wave 2: Bangers, Bungee, Shantell Sans, Permanent Marker, Neucha). Patrick Hand SC is dropped.

**Stamp widths, measured.** I rendered each word with the TTF from the Fontsource CDN through PIL, the way `stampWidth.test.ts` adds letter spacing and the stamp box (padding 12px plus two borders). Rooms: the Night Report margin 101px (0.12em tracking), the narrowest margin 87px (0.04em), the watch strip about 72px at 1.5px smaller. Values are margin / narrow / strip; **bold** is over.

| IM Fell English SC | PERMISSION | AT THE DOOR | YOUR DOOR | DOORSTEP | LET IN? | KNOCKING | NEW NOTE | STALLED |
|---|---|---|---|---|---|---|---|---|
| 10.5px, 1.5px box | 96 / **88** / 70 | **106 / 97 / 78** | | | 66 / 60 / 44 | 87 / 81 / 62 | 86 / 80 / 61 | 75 / 69 / 51 |
| 10.5px, 1px box | 95 / 87 / 70 | **105 / 96 / 78** | 94 / 86 / 69 | 84 / 77 / 60 | 65 / 59 / 44 | 86 / 80 / 62 | 85 / 79 / 61 | 74 / 68 / 51 |
| **10px, 1px box (proposed)** | 91 / 83 / 66 | **100 / 92 / 73** | 90 / 83 / 65 | 81 / 74 / 57 | 63 / 58 / 41 | 84 / 78 / 59 | 83 / 77 / 58 | 72 / 66 / 48 |

At 10.5px PERMISSION fits only with a 1px box, and then by 0px in the narrowest margin; PIL and the test's WOFF metrics may differ by a pixel, so **10px with a 1px box** is the safe setting (KNIGHTMARE ships 10.5px). The Lexicon label "At the door" does not fit at any size, which is why Needs you changes (§6). Whether IM Fell caps at 10px read as stamps is **decided on screen** (jury §7).

**The alternative, a scrawl hand:** **Caveat Brush** (OFL-1.1, `@fontsource/caveat-brush`), "designed for short annotations" ([description](https://raw.githubusercontent.com/google/fonts/main/ofl/caveatbrush/DESCRIPTION.en_us.html)). A quick brush hand, closer to Saladino's Joker than to an upright printed hand. At 12px every word fits, "At the door" included (PERMISSION 86 / 76 / 62, AT THE DOOR 88 / 78 / 64). Its risk is clarity at 12px, and that it is a second family. Rock Salt, the closest open face to a true scrawl, is too wide even at 10px (PERMISSION 109 / 101 / 80).

**Stamp treatment:** a 1px box, tilted −1°, with an ink-spatter mask (an `feTurbulence` SVG we generate). Option: no box at all, only the word and the spatter, as the Joker's lettering has no balloon; it may stop reading as a stamp. Decide on screen.

## 5. Voice

**Frame: the house, at night.** The house speaks the way a night watchman does his rounds: room by room, door by door, with a lamp and a ring of keys. The register is formal, quiet and a little old-fashioned, never grim and never a joke. It is not a journal (Bruce's journal is VENGEANCE's), not a doctor's notes, and never the Joker's voice.

**Respect.** The book is about a psychiatric hospital and some of its portrayals have dated badly. The Theme stays on the building and on Batman. These words never appear in the Voice or the Lexicon: mad, madness, insane, lunatic, crazy, psycho, nuts, inmate, patient, cell, padded, straitjacket, committed, asylum, therapy, diagnosis. No villain is named or quoted; April Fools' Day is not used. The display name names the house.

**No line repeats another Theme's sentence** (jury §3.13): the draft's close copied KNIGHTMARE's "Get some sleep.", and "Every…" opened three lines. Both are fixed.

Sample lines (P = ours; none quotes the book):

- Empty state title: **"Every door is shut."** The hint stays "Nothing needs you right now."
- Intro tagline: "The house keeps its own hours." (P)
- Empty Cases: "No cases in the house tonight." (P; "cases" comes from the Lexicon, as the rule for terms in Voice lines requires)
- Nothing heard (the plugin misses some sessions): "No sound from the rooms. Some can't be heard from here." (P)
- Night Report name: **"Night rounds"**; dateline **"Rounds at 2:14 a.m."**, a sentence, not the `PLACE · 02:14` shape WATCHFUL PROTECTOR ships (jury §1) (P)
- Report heading for what waits on you: "On the doorstep"; for running work: "Lights still on" (P)
- Report close: waiting ? **"Some doors are still open."** : **"Rounds done. Lamps out."** (P)
- Settings kicker: "The study"; Atmosphere toggle: "Scratches", hint "Scratches in the paint behind the cases" (P)
- Quit tooltip: "Lock up and leave." (P)
- Signature caption on click (once a session): none. The display name already carries the book's one phrase, so the Signature speaks only through the mirror.

*Dark*, *quiet* and *still* mean only "nothing needs you" (jury Wave 1 §4.3). *Shut* joins them here.

## 6. Lexicon

Frame: the rooms and doors of an old house. Every word is plain English, and the test is the jury's: a tired developer glancing at a stamp gets the standard meaning at the right severity. The jury's §4 fixes are adopted (§9.9).

| Standard | Themed | Verdict |
|---|---|---|
| Case | **Case** (kept) | *Room* reads as a chat room. KNIGHTMARE also keeps Case |
| Needs you | **Doorstep** (count: "1 on the doorstep", "3 on the doorstep"); option **Your door** | **Changed, and not by the jury:** "At the door", which the jury kept, is 100–106px in IM Fell and fails every stamp room (§4). Doorstep is in the same frame: what is left on your doorstep is for you. Your door reads as plainly but makes a third "Your …" beside PALE MOONLIGHT's Your desk and KNIGHTMARE's Your call. If the stamps take Caveat Brush instead, "At the door" stays |
| Permission | **LET IN?** | A request, with the question mark that makes it one (jury §4), like OK TO AIR? and PERMIT? elsewhere. UNLOCK is dropped: it reads as a state or a game achievement. *ADMIT* stays rejected: in this setting it means admitting a patient |
| Error | **BROKEN** | Clear, at least as severe as "error". Now this Theme's alone: Absolute took BLOWN (jury §3.12). *CRACKED* is slang for mental illness; *SHATTERED* runs long |
| Waiting | **KNOCKING** | Someone is at the door and wants an answer: Claude is asking |
| New reply | **NEW NOTE** | A note left for you. Mild risk: "note" as annotation. Fallback: **A NOTE** |
| Stalled | **Stalled** (standard) | FROZEN is DKR's, a frozen picture (jury §3.12). The house has no clear word of its own: *SILENT* and *STILL* mean all clear, *LOCKED* reads as waiting for LET IN?, *HUNG* is a dark echo here |

The Signal disc shows the count and, on its notice card, the stamp word. Windows notifications and the tray keep the standard words.

## 7. Bat-Clawd

The body, eyes, arms and legs keep their pixels (`suits.ts`: the 16×11 grid, eyes at y = 3, the viewBox −6…22 × −1…12, which stays as it is). His eyes stay white and his jaw orange: the "faceless shadow" comes from the cowl, the cape and the overlay, never from the face (Costume Rule, `DESIGN.md`).

**The problem the jury found (§5):** as drafted he is a silhouette. The suit was 1.36:1 on the ground and the cape 1.04:1, so the bleeding hem and the chest bat did not exist at rest; only the cowl's rim, the jaw and the eyes carried him. That is true to McKean, but a detail nobody can see is not a detail. Three fixes:

1. **A plum-grey suit, `#55425e`.** 2.16:1 against the cowl, so the chest bat in cowl ink reads as a dark shape at 2.16:1 (VENGEANCE ships 1.52, KNIGHTMARE 1.49); 2.07:1 on the surface; the jaw stays 2.86:1 against it. It sits 14.6–53.3 ΔE00 from every other Theme's suit (PALE MOONLIGHT's dark plum-grey is the closest, 14.6). Option: `#4a3a56`, darker and more of a shadow, at 1.89:1. The cowl and cape stay Batman's blue-black ink: the figure is a shadow, the body under it is not.
2. **The bleeding hem drawn in the rim's blue.** The last 1.5 units of the cape are a one-unit checker whose cells are filled in `--cape-rim` (`--batman-blue` at 45%: 2.62:1 on the surface), not in the cape's own black. The hem reads as a pale speckle dissolving into the dark, which is what the bleed was meant to be.
3. **The rim follows every dither cell**, so the cape's edge never turns into a cut-off black block. Drawn as rects (jury §6), no new part type.

Decide the hem on screen at 54px and 60px (jury §7).

**The suit (outfit, in grid units):**

- **Cowl:** `--cowl` `#0d0b14`, Batman's blue-black ink, with the cold `--cowl-edge` rim (Batman's blue at 35%: 2.06:1 on the surface). **Ears: tall** (jury §9.6). They rise one full unit higher than every shipped and Wave 2 cowl (BLUE COLLAR went back to standard ears), filled to y = −1, at x = 4–5 and 11–12. **The tips are a front path layer**, and their rim is drawn inset, half a stroke inside the outline, so nothing crosses the viewBox's top edge and the ear keeps its full unit. The 0.5-unit outward lean of the draft is under the one-unit floor (jury §5), so it is drawn only as a curve inside the unit and claimed as nothing. This is the one silhouette mark that shows at rest. Decide the tips on screen; raise the viewBox only if they fail.
- **Body:** `--suit` `#55425e`. No belt, no buckle, no oval: `--belt` is the suit itself, so the waist row is just more suit. **No oval, on purpose:** the comics Batman of 1989 wore a yellow oval; McKean hides it, and the oval is PALE MOONLIGHT's.
- **Chest:** the Theme's bat from life (§8), `width: 6`, at (8, 7.2), in `--cowl` on the suit: at about 2.5:1 it spans y 6.0–8.4. It keeps one unit of suit below the jaw row (y = 5) and two at each side of the body (x 5–11 on a body x 3–13). With no belt there is no belt to touch; below it, 0.6 unit of suit runs to the legs at y = 9. The Wave rule's one unit there would need a 5-unit bat; decide on screen.
- **Cape:** `--cape` `#110e19`, long, behind the legs, its hem bleeding out as above. VENGEANCE's hem is a regular zigzag, PALE MOONLIGHT's scalloped, WATCHFUL PROTECTOR's straight, KNIGHTMARE's a duster with a few points, DKR's two tails, BLUE COLLAR's blades, BECOME A BAT's four ragged points. A pale speckled edge is none of them.

**Poses:**

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | The wrapped cape, as every Theme | none needed | Only the hem changes: it bleeds out at his feet |
| flying | **The trailing cape, its hem bleeding** | none needed | Two frames of a flutter, as PALE MOONLIGHT's. The draft's "descent" (cape streaming above the ears) is dropped: it had no page behind it, and DKR's drop already puts a cape over the head (jury §3.7). Four Themes now fly with a trailing cape, told apart by the hem; decide on screen |
| alarmed | **Turned to the call** | none; a pose of ours | The cape flung open unevenly: the left half pooled long to the ground, the right lifted to the shoulder, both hems bleeding; eyes wide; the claret aura. It must not be PALE MOONLIGHT's "giant bat" (arms up, two wings above the ears). Pick on screen |
| perch | the Signature pose, below | | |

**Signature pose: "The mirror"** (recommended). The mirror is one of the five symbols in Morrison's script, and the book is about Batman facing his own shadow (§2). On the grid:

- **The mirror:** a tall frame on the overlay layer, to his right: x = 14.5–21.5, y = −0.5–11, a 1-unit frame in `--mirror-frame` (`--ash`, 6.85:1 on the abyss) around `--mirror` glass (`#2a1a24`), with one 0.5-unit diagonal glint in `--bone` at 30%. It stands as tall as he does. The glass itself barely reads (about 1.15:1), so the frame and the eyes carry it (jury §5).
- **Him:** body unchanged; his eyes look into the mirror: `[6, 3, 2, 1]` and `[10, 3, 2, 1]` (one unit right, still white).
- **The reflection:** his cowl and ears in shadow, mirrored, 6 units wide, inside the glass at x = 15.5–20.5, in `--cowl` with the cold rim. Two white eyes.
- **The reveal** (four steps, four a second, on the shared clock): 1. the empty frame and the glint, as he turns his eyes; 2. a shadow rises in the glass to y = 6; 3. the reflection's head and ears, eyes shut; 4. the reflection's eyes open, one beat after his. Under reduced motion, step 4.
- **On the perch:** once a cycle he blinks, and the reflection blinks one step later. Nothing else moves.
- **Why the outline is free:** at 54px it is two figures, one inside a tall rectangle beside him. The taken outlines are a front-on stand with a shadow at the feet (VENGEANCE), a front-on stand with the cape hanging square (WATCHFUL PROTECTOR's *Sonar* as shipped), three-quarter under an oval (PALE MOONLIGHT), a coat blown to the right (KNIGHTMARE), and in Wave 2 a tilted leap (DKR), a lift (BLUE COLLAR) and a stand under a swarm (BECOME A BAT). None has a second figure or a full-height frame. **The one risk:** KNIGHTMARE's coat also puts a dark mass to the right (out to x 21.5, y 5–10.8). The Ash frame and the two white eyes must tell them apart; decide on screen beside it (jury §3.8).

**Alternatives:**

- **"The coin":** his right arm out, a 2×2-unit coin above the hand in `--ash`, one face scratched. Reveal: the coin spins (widths 2, 1, 0.5, 1, 2 units). Source: Batman gives Two-Face his coin back. Weaker at 54px: the coin is 4px, and an arm out is a common shape.
- **"The doorway":** a tall arch on the overlay layer around him (x = 1–15, y = −1–11), the cape filling the dark inside, only his eyes and jaw lit. Source: the title page's door-like oval (NE20). Risk: a frame around the whole sprite reads as a UI border.

## 8. Emblem

**The bat the book shows, drawn from life** (jury §9.7). The book has no bat symbol of its own: McKean keeps Batman in shadow, and the logo of the time, the yellow oval, is PALE MOONLIGHT's. ADR 0001 is amended narrowly for this case: when a work shows no bat symbol of its own, its Theme may draw the bat the work shows, from life, credited as our drawing. The bat this book shows is an animal: the painted bat on the 1989 cover (C89), and "the bat" that haunts Amadeus Arkham's mother ([plot](https://en.wikipedia.org/wiki/Arkham_Asylum:_A_Serious_House_on_Serious_Earth)). So the emblem is **a real bat, drawn by us from bat anatomy**, not traced from the cover. The draft's fallback, DC's late-1980s bat without its oval, is dropped: it is Year One's bat (jury §3.14).

**Shape, on the shared 120×48 grid** (P, to draw and judge on screen):

- Wings spread, seen from below, about 2.5:1 (x = 2–118, y = 4–44).
- The leading edge rises from the shoulder to a **wrist peak** at about (30, 4) and (90, 4), with a short thumb claw pointing up, then runs down and out to the wingtip at about (2, 20) and (118, 20).
- The trailing edge has **four membrane scallops a side**, between the finger bones, deepest at y ≈ 34, their points where each finger ends.
- A small head with two short ears at x ≈ 56 and 64, y ≈ 10; a narrow body; the tail membrane a shallow V between the feet to y ≈ 44.
- Flat fill, no finish (`finish: 'none'`). Symmetric: draw the left half, mirror at x = 60.

It shares no outline with the four shipped bats (2022's stepped lower edge, 1989's oval, 2008's straight lower edge, 2016's horns) or with the Wave 2 marks (DKR's and Year One's classic scalloped bats, BLUE COLLAR's axe block). Bats are also BLUE COLLAR's weather and BECOME A BAT's Signature (jury §9.10); this one is an emblem, a third slot, and its drawing (wrist peaks, four scallops a side) is not their shared two-frame flying bat. On the chest it is a dark shape at 2.16:1 (§7); it reads fully on the disc and in the header, where its scallops are 3–5px. Credit in the README and NOTICE: "the bat in SERIOUS HOUSE is our drawing of a bat; Batman is a trademark of DC".

**The 64px Signal disc** (variables only, as KNIGHTMARE's breaks are):

- **Unlit:** plum-black glass (`--glass`, `--glass-shine` `#3a2230`), the bat a shade lighter in `--raised`. The grain (`--lens-grain`, an `feTurbulence` SVG in the `--disc-lens` list) gives it McKean's texture at 64px.
- **Lit, L1 (recommended):** a radial lens, pale claret core `#f8c3d8` → `--signal-hot` → `--signal` → `--blood` at the rim, the black bat across it, the grain on top, a `--signal-glow` halo. The count sits in a claret box in IM Fell.
- **Lit, L2:** a paper-white core with a hand-drawn claret loop round the rim, like a red scrawl around a page (a `--lens-scrawl` SVG layer). More McKean, less of an alarm; try it on screen.

The tray and toast icons stay on the default emblem, as for every Theme.

## 9. Atmosphere

**Scratches in the paint, on the shared `noise` painter** (jury §6, §9.12). The remaster's lesson is texture (§3). What survives in a corner panel is grain, a faint collage and a few scratches, not a painting.

- **The panes (the painter's still layer, drawn once):** three to five torn-paper rectangles behind the cards, 40–140px across, with rough edges, in `--pane` (`--ink`) at 2–4% alpha, from a fixed seed: the drawers of the house (NE20, DLX21), reduced to almost nothing. Procedural, never a crop of McKean's art.
- **The scratches (the painter's marks, as hairlines):** cut **one at a time**, about one a second, so two to four are visible at once. Each is a 1px hairline 20–120px long, near vertical (±8°), in `--scratch` (`--bone`) at 6–12% alpha. It **stays, and fades out over 16–24 ticks** (2–3 seconds) on the shared 8 fps clock, from a precomputed, frame-indexed table. Nothing falls and nothing flickers: a scratch appears and slowly heals. Source: the ochre scratches in the remastered title page (`#815c37`, NE20).
- **How it differs from DKR's static on the same painter:** DKR's marks are specks living one tick, a picture re-cut every frame, with a roll bar and a white glow low. These are hairlines living 2–3 seconds, cut one by one, over still panes, with cold light from the side. The jury scores that pair C once the scratches stay and fade (§1).
- **Light:** a cold haze from the **right** edge, `--batman-blue` at 5% (`--haze-inset: -20% -35% -20% auto`). Every other Theme's haze comes from below or above.
- **Grain:** `--grain-opacity` 0.08, the strongest of any Theme.
- **Gating:** like the others, it shows while the pointer is over the window and for a few seconds after news, with `still: 'calm'`. Under reduced motion or with animations off, nothing, as PR #108 settled for every Theme. Nothing on the transparent Signal window.
- **Settings for the shared painter** (jury §6): mark `hairline`; life 16–24 ticks with a fade; one new mark every 8 ticks; no band; still layer `panes` (count 3–5, alpha 0.02–0.04, colour `--pane`); mark colour `--scratch`. No painter of its own.

## 10. Distinctiveness

Scored with the jury's rules: C = clearly different, ~ = close, = = same; a Theme stays with at least 3 C against every other. Revised for the plum ground, Bone working ink, IM Fell stamps, the trailing flight and the fading scratches.

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| vs VENGEANCE | C: plum vs warm black (7.1 / 9.2); claret vs red (25.8); Bone vs amber (30.8) | C: IM Fell / IM Fell vs Anton / Special Elite | C: tall ears vs one-cell tips; a pale bleeding hem vs a zigzag; a bat at 2.16:1 vs a dash at 1.52:1 | C: hairlines that stay and fade vs rain falling; cold light from the side vs red from below | C (narrow): the house's rounds vs Bruce's journal; both quiet and nocturnal | **5** |
| vs PALE MOONLIGHT | C: plum vs smog brown (7.8 / 14.5); claret vs gold (54.6); Bone vs steel (24.5) | C: old-style serif vs Art Deco + geometric | C: ears; bleed vs scallops; no oval or belt vs oval + belt | C: scratches vs snow; side vs below | C: house vs newsroom | **5** |
| vs WATCHFUL PROTECTOR | C: plum vs blue steel (10.2 / 16.8); claret vs blue; Bone vs mercury | C | C: tall ears vs thin; a speckled bleed vs a straight hem; a bat vs a lit relief | C: both have a still layer (~), but a scratch a second that heals vs a window a second, and side light vs below | C: house vs ops; the dateline is a sentence now | **5** |
| vs KNIGHTMARE | C: plum vs scorched brown (7.9 / 13.0); claret vs crimson (12.9, one red-pink family); both run in Bone (15.6 apart) | C | C: cape vs duster; tall ears; a bat from life vs the BvS bat | C: scratches vs ash; cold side vs warm above | C: house vs a veteran; the close no longer copies KNIGHTMARE's | **5** |
| vs ANCIENT GRACE (DKR) | C: plum vs tank grey (13.7 / 21.7); claret vs cyan (70.0); both Bone (12.7) | C: IM Fell vs Bangers | C: tall vs wide-set ears; bleed vs two tails; a bat at 2.16:1 vs a big black bat | C: the same `noise` painter, but hairlines that live 2–3 s vs specks that live a tick; side light vs a white glow low | C: a house vs a broadcast | **5** |
| vs BLUE COLLAR (Absolute) | C: plum vs violet (9.5 / 11.0); claret vs lemon (69.0); Bone vs lavender (19.6) | C: IM Fell vs Bungee | C: ears now this Theme's alone; bleed vs blades; a bat vs a block | C: scratches vs bats crossing | C: a house vs a work shift | **5** |
| vs BECOME A BAT (Year One) | C: plum vs olive (17.3 / 27.7); claret vs magenta (11.9, one family); both Bone (17.4) | C: an old-style serif vs Permanent Marker / Neucha (the upright hand is gone) | C: tall vs standard ears; a dark figure vs the only light suit. Both hems are soft at 54px (~) | C: scratches vs rising smoke | C: a house vs a notebook | **5** |

**Inside this Theme:** claret alarm, paper waiting and Bone working are 20–41 ΔE00 apart, so the tiers never blur.

**The Arkham games (Wave 3): low, by design.** No green, no "asylum" in the words, no detective-mode or teal (that is WATCHFUL PROTECTOR's anyway). The jury measured room for a saturated asylum green beside DKR's and Year One's low-chroma greens (§8). The credits must tell a game from a book: "Batman: Arkham Asylum (2009)" against this Theme's "Arkham Asylum (1989)".

## 11. Legal note

- **Trademark (DC):** "Batman", "Arkham Asylum" and the title treatments. The book's title appears only in the credit line, as the other Themes credit their works. The emblem is our drawing of an animal, under ADR 0001's amendment (jury §9.7), not DC's mark; the README and NOTICE credit it as our drawing and the Theme as fan art.
- **Copyright to avoid:**
  - Any panel, page, cover or crop of McKean's art, including as a texture. The grain, the panes, the scratches and the stamp spatter are all procedural (`feTurbulence`, seeded shapes), made by us.
  - Saladino's lettering, as images or traced into a font. The fonts are open families; the treatment (a press face, a spatter, an uneven underline) is a homage, not a copy.
  - The Joker, and every other character's likeness: none appears.
  - Long text from the book or the annotated script. The Theme quotes nothing from it.
  - Larkin's "Church Going" is still in copyright (Faber). The Theme uses only "serious house", two words of the title phrase the book itself carries, as a name. No line of the poem is quoted in the app.
- **Free to use:** mixed-media texture as a style, a plum-black palette, an old-style serif, a house at night, a mirror, our own words ("Every door is shut", "Night rounds", the Lexicon).
- **Fonts:** IM Fell English SC is OFL-1.1 (and Caveat Brush, if chosen); bundle the licence text with the other Fontsource ones.

## 12. Unverified items

- **No remastered story page was sampled.** The DC Universe Infinite previews stop at the title page. The two story scans (SAL, PG) are from unknown printings, possibly the "garish" 1989–2014 ones. Batman's blue, which survives here only as the rims and the haze, comes from them.
- **The plum ground is not sampled.** It is the jury's choice between the book's wine and its blacks (§3). Whether claret on plum reads as the Joker's palette is decided on screen.
- **The Joker's lettering colour.** Wikipedia says the *Absolute* changed the Joker's dialogue "from red and white back to wine red", McKean's original intent. That sentence has no footnote, and two searches found no source. The red samples here are the cover wires and the title page, not his lettering.
- **The Alarm hue is ours.** `#ec5c94` is about 25° from every sampled red (§3).
- **Who painted the 2020 New Edition cover**, and whether its figure is the Joker or someone else, is not confirmed. Only its bulb and its teal are cited, and neither is used.
- **The 1989 cover (C89)** is identified only by its DC bullet logo; the scan is a reviewer's.
- **McKean's interviews were read secondhand** except Retrofuturista (2024). His afterword to the *Absolute* was not read. The Batman-in-silhouette description comes from a fan forum.
- **Morrison's annotated script was read only through quotations** (Wikipedia, Sandifer). The house plan's sources (Glastonbury, Chartres) are uncited in Wikipedia.
- **Whether Batman wears a chest emblem anywhere in the book** was not checked. The bat from life does not depend on it.
- **Stamp widths** were measured with PIL from TTFs, not the WOFF files the test reads; they should match within a pixel, which is why 10px is proposed over 10.5px. IM Fell caps at 10px as stamps, and Doorstep as the Needs you label, are decided on screen.
- **The ear tips as a front layer, the speckled hem, the lifted suit and the mirror** at 54–60px: drafts to judge on the real window.

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
- Fontsource API: [IM Fell English SC](https://api.fontsource.org/v1/fonts/im-fell-english-sc), [IM Fell DW Pica](https://api.fontsource.org/v1/fonts/im-fell-dw-pica), [Caveat Brush](https://api.fontsource.org/v1/fonts/caveat-brush), [Rock Salt](https://api.fontsource.org/v1/fonts/rock-salt) (OFL-1.1; Rock Salt Apache-2.0). Google Fonts descriptions: [IM Fell English SC](https://raw.githubusercontent.com/google/fonts/main/ofl/imfellenglishsc/DESCRIPTION.en_us.html), [Caveat Brush](https://raw.githubusercontent.com/google/fonts/main/ofl/caveatbrush/DESCRIPTION.en_us.html).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-2.md`](jury-wave-2.md), [`jury-wave-1.md`](jury-wave-1.md), [`dark-knight-returns.md`](dark-knight-returns.md), [`absolute-batman.md`](absolute-batman.md), [`year-one.md`](year-one.md), [`burton-1989.md`](burton-1989.md), [`knightmare-palette.md`](knightmare-palette.md), `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`, `app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`, `app/test/themeContrast.test.ts`, `app/test/stampWidth.test.ts`.
- Colour maths: WCAG 2.x relative luminance and CIEDE2000 (Sharma, Wu and Dalal, 2005), computed with our own script and checked against Sharma's test pair 1 (2.0425) and the textbook `#777777` on white (4.48:1).
