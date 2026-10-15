# Theme dossier: The Dark Knight Returns (1986)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Batman: The Dark Knight Returns* (Frank Miller, with Klaus Janson and Lynn Varley, DC, 1986), for Wave 2 (#118, LUC-79). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere. It is written against the shipped token tables in [`wave-2-brief.md`](wave-2-brief.md) §3 and the CSS on `main` at v1.2.0, not against the Wave 1 dossiers. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

Revised 2026-10-14 after the wave 2 jury (`jury-wave-2.md` §9).

**Built in #120 (2026-10-15)** as `the-dark-knight-returns-1986`, demo flag `grace`. Where this note and the build differ, the build follows the maintainer's decisions on screen:
- **Reworked after the maintainer rejected the first build** (#127): the chest bat, the bulk, the leap and the colour were redone against the comic and the 2012–13 animated films ([`dkr-rework.md`](dkr-rework.md)), each picked on screen from boards that put the references beside the options. What follows is the rework.
- **The book's icy night, not the night blue first shipped.** The grounds take the interiors' icy blue (the storm and TV pages, the bolt edge's family) darkened: abyss `#000f12`, surface `#001f27`, raised `#002f39`, line `#224f59`. What waits on you takes the Book One storm sky, `#7aadbf`. The first build's night blue (`#101830` / `#1a2646`, with a `#7ea7d8` waiting ink) had drifted violet off every sampled sky, and its waiting ink sat 3.9 from PALE MOONLIGHT's steel and 5.8 from WATCHFUL PROTECTOR's ink-hot. The icy blue sits 8.6 / 9.9 ΔE00 from WATCHFUL PROTECTOR's grounds and 19+ from *Absolute*'s violet, so BLUE COLLAR no longer has to move for it. Bone (`#e4f0f3`), `--ink`, Ash (`#93a5a9`, lifted to hold 4.5:1) and the blacks lean to the same hue. Lightning Cyan and the scanlined lit disc stay.
- **The chest bat is the second suit's, as the films draw it** (`BAT_1986_CHEST`, [`dkr-rework.md`](dkr-rework.md) §3): wide, 2.3:1, horns highest, wingtips at mid-height, one point and one scallop a side, a long tail; 6.9 × 3 units on the chest (y 6–9), and the Theme's emblem on the disc and in the masthead too. The first build stretched the Book Three cover's round bat after the Book Two cover, which shows the first suit. The maintainer chose it everywhere knowing it is a cousin of KNIGHTMARE's bat. The belt stays suit grey.
- **The old man's bulk:** his shoulders reach two units past his body (x 1–15) and rise beside the cowl to his jaw, so the head sits sunk between them, over a barrel chest and a narrower waist; his gloves hang beside the barrel. The cape hangs from the new shoulders, and the armour's pauldrons reach a unit past them (x 0–16).
- **The leap faces forward, as on the cover:** `rotate(12deg)`, leaning toward where he faces (the first build leaned him back at −15°), the near arm raised over his brow with the fist ahead, the far arm reaching down, the legs tucked, the cape one wedge trailing up and out of his frame, and the bolt behind him at the cover's angle, drawn turned back by his tilt.
- **Asleep without the TV set:** he sleeps wrapped in the cape, as in every Theme.
- **Stronger static:** about 85 specks at alphas 0.08–0.18 (density 0.6) and the roll bar at 4.5%, over §9's 0.04–0.10. It stands as one frozen frame under reduced motion (`still: 'calm'`, as KNIGHTMARE's ash).
- **The leap** stays the Signature pose, LATEST stays, Bangers at 12px stays.
- **The credit** is "Frank Miller's The Dark Knight Returns", without the year: with it, the picker folder ran to a third line. No-break spaces keep the title whole on the second line.
- **Typed lines in Barlow:** `--font-type` (a case's number, who spoke, the empty strip's sentence) is Barlow, not Bangers, which has no lowercase.
- **The armour** reads by a lit edge across the breastplate's top as well as the shoulders; the ears are not cut to a stub (half a unit would be below the floor).
- **Still open:** the Signature caption "The time has come." waits for #109, which gives every Theme its caption; the name's wording ("Gliding with ancient grace") is still unconfirmed on a printed page (§12; one more search on 2026-10-15 found nothing).

The Wave 1 jury found DKR boxed in ([`jury-wave-1.md`](jury-wave-1.md) §3, §9): PALE MOONLIGHT holds the gold oval and the newsroom, WATCHFUL PROTECTOR the night blue, and lightning flashes cry wolf. This dossier's job is to find it a space of its own.

## 1. TL;DR

- **The Theme in one sentence:** the panel is a television left on in a dark room in 1986. Talking heads argue, the channels click past, static hums between them, and when something needs you the screen lights the colour of the lightning bolt the old man leaps across.
- **Display name:** **ANCIENT GRACE** (the maintainer's choice, jury §9.11, replacing TRIUMPHANT). **Credit (`film` field):** "Frank Miller's The Dark Knight Returns (1986)"; `words.ts` adds "after", so the picker reads "after Frank Miller's The Dark Knight Returns (1986)", never "after after". The phrase is Bruce's narration in Book One, remembering the bat he met as a boy when he fell into the cave: "Gliding with ancient grace" (quoted on [Street Tech](https://www.streettech.com/bcp/BCPgraf/Media/batmanDNR.htm); [TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Quotes/BatmanTheDarkKnightReturns) lists it too, but its page returned 403 and was read only through search results; the printed page was not seen, §12). It fits the Theme twice: the bat is the creature Bruce becomes, and *ancient* is the old man who returns. Like PALE MOONLIGHT, the name is one allusion and the panel keeps one short line ("The time has come.", §5).
- **The space of its own:** broadcast, not print. PALE MOONLIGHT is a newspaper: editions, the desk, the wire, "— 30 —". This Theme is a TV: channels, live feeds, the anchor's cue, the station going off air, static, the 16-screen grid. Every Lexicon word and Voice line below is a TV word, never a press word.
- **Alarm color: Lightning cyan `#3fdcff`.** It is the hue of the bolt's edge on the #1 cover (LCh hue 217–237°), pushed to full chroma, as KNIGHTMARE pushed Superman's shield. It sits 28.7 ΔE00 from WATCHFUL PROTECTOR's Blue Flame, 59.2 from Clawd orange, and 47–76 from every other alarm, Wave 2 included (§3). Its distance from WATCHFUL PROTECTOR's working mercury (12.9) is decided on screen in the picker. The old Palette B (arcade magenta) is withdrawn: it was 8.0 from *Year One*'s alarm and 5.4 from *Arkham Asylum*'s (jury §3.10).
- **Ground: Varley's tank grey,** from her own hand-painted colour art for Book Two, page 20 (tank grey `#3b403d`, h 152–158°). After the jury it moves to that end of the green-grey family, h ~166° (`#131a17` / `#1d2622`), and leaves the olive end to *Year One* (jury §3.1, §9.1): 6.4 / 11.1 ΔE00 from *Year One*'s moved ground and 8.3 / 10.0 from WATCHFUL PROTECTOR's.
- **Working ink: Bone** (`#e9f2ee`, tinted to the ground). **Waiting ink: pale phosphor green `#bde3a1`**, a CRT's glow; Carrie Kelley's yellow goes to *Year One*'s canary.
- **Type:** **Bangers** (OFL), comic cover lettering, for the display and the stamps (jury §9.3). Empty-state and sheet titles go to Barlow 600 through the new `--font-headline` token, because Bangers has no lowercase. Barlow Semi Condensed and JetBrains Mono stay.
- **Lexicon (broadcast):** Channel · Your cue · OK TO AIR? · DEAD AIR · YOU'RE ON · LATEST · FROZEN, with ON AIR / OFF AIR for a case opening and closing, and LIVE / STANDBY for working and idle (§6; jury §4 and §9.9). Every stamp is narrower than PERMISSION in Bangers.
- **Bat-Clawd takes back DKR's own pieces** (jury §9.5): a neutral grey suit (`#666864`) with **a big black chest bat, at most 8 units wide, between y 6 and the belt**, a suit-grey belt so the bat never merges with it, a cape with two long tails ending at y 11.5, and **the armour as the alarmed Pose**. **Signature pose: the lightning leap**, held like the #1 cover, with a still bolt in Bone behind him, never a flash. Option B: the horse.
- **Atmosphere: TV static** on the shared **`noise` painter** (with *Arkham Asylum*'s scratches, jury §6 and §9.12): specks that live one tick, and a slow roll bar. Lit from the screen, low and centred.

**Open question for the maintainer** (after the jury; the rest is decided in §9 of [`jury-wave-2.md`](jury-wave-2.md)):

- **Signature: the lightning leap** (held mid-air like a freeze-frame) **or the horse** (needs a prototype for size)? *Recommended: the leap.* Decide on screen at 54px, with the bolt.

**Decided:** Permission is **OK TO AIR?** The jury kept it (§4) and the maintainer adopted every §4 Lexicon word (§9.9). GO AHEAD? is dropped: it is radio procedure, near WATCHFUL PROTECTOR's ops register.

**Decide on screen** (from labelled comparison images, as the jury lists them): the cyan alarm and the lit lens beside WATCHFUL PROTECTOR's; the phosphor-green waiting ink; the leap and its bolt at 54px; the static as "a set left on", not a broken one; Bangers at 12px (its small `Z` in FROZEN); LATEST against NEW REPLY.

## 2. Visual identity and sources

**Credits.** Written and pencilled by Frank Miller, inked by Klaus Janson, coloured by Lynn Varley, lettered by John Costanza; four issues, DC, 1986 ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns); [DC, 20 Feb 2026](https://www.dc.com/blog/2026-02-20/how-the-dark-knight-returns-redefined-comics)). The issues are "The Dark Knight Returns", "The Dark Knight Triumphant", "Hunt the Dark Knight" and "The Dark Knight Falls" ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)).

What makes this version recognisable, in order of strength:

1. **The lightning cover.** Book One's cover is Batman in silhouette leaping across a sky split by a bolt. Miller on it: "In the case of the lightning bolt, that really was a bolt out of the blue", and "Just the idea of him striking like lightning as a force for justice was absolutely irresistible." On the silhouette: "I like to say that the silhouette is the most important language you have." Miller drew one pencil line for the bolt and wrote "Lightning" beside it; Varley finished the painting ([Robert Wilonsky, *Intelligent Collector*, Heritage Auctions, 2022](https://intelligentcollector.com/batmans-lightning-bolt-moment/)). Rehs Galleries describes the original as ink over graphite on Bristol board, "airbrushed with color by Varley" ([Rehs](https://rehs.com/eng/?p=45227)). It sold for $2.4 million in June 2022 ([Antiques and the Arts](https://antiquesandthearts.com/lightning-strikes-with-batman-original-cover-art-at-heritage/)).
2. **The TV.** The story is told through television as much as through Batman. Lola Chong is "a Gotham City news anchor who serves as the story's main talking head"; Lana Lang argues for Batman in TV debates; the Joker and his psychiatrist go on Dave Endochrine's late-night show ([Wikipedia, Characters](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)). H. W. Thurston in *The Comics Journal*: every narrative moment "is processed and re-presented by newscasters and TV personalities"; "a comic panel, like a TV screen, is a frame"; "squabbling is the thing that talking heads do throughout the book" ([TCJ, 1 May 2019](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/)). On the page, TV panels are drawn as rounded screens with grey bezels, and the TV voices sit in plain white boxes above them, with no balloon tails (seen in TCJ's reproductions of Books Two and Three). A grid of small TV faces, each panel marked "KLIK" as the channel changes, appears in Book One (our reading of TCJ's reproduction).
3. **The 16-panel grid.** "The series employed a 16-panel grid for its pages" ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)). Analysts describe a 4×4 grid that Miller merges into larger panels ([Strip Panel Naked, via Vice](https://www.vice.com/en/article/why-the-16-panel-grid-is-the-holy-grail-of-action-comics/)). Book Two, page 20 shows it plainly: eight small panels over one wide one (§3).
4. **Varley's painted colour.** The prestige format (square spine, card cover, glossy paper, $2.95) existed partly for her colour. DC's production manager Bob Rozakis: "Frank was much more concerned that Lynn's coloring would be reproduced accurately. He and Lynn accompanied me to Ronalds Printing in Montreal for all four issues' press runs" ([13th Dimension, 27 Jan 2026](https://13thdimension.com/from-dark-knight-to-daredevil-13-reasons-1986-was-frank-millers-year/)). Her colour art was hand-painted "over a blueline printout on bristol board of Miller and Janson's artwork, with an acetate overlay of the lineart"; "this is the art that was used to create the final printed book" ([ComicConnect, lot 1021408](https://www.comicconnect.com/item/1021408)). Critics call the medium gouache ([A. D. Jameson, *Big Other*, 2010](https://bigother.com/2010/02/08/reading-frank-miller%E2%80%99s-batman-the-dark-knight-returns-part-2/)) or watercolour (DC's *Year by Year*, via [Wikipedia, Lynn Varley](https://en.wikipedia.org/wiki/Lynn_Varley)); the listing says only "mixed media". Thurston reads her colour as a code: each character's speech boxes have a colour (Kent blue, Gordon black, Carrie Kelley yellow, Wayne grey, the Joker green); yellow follows fire, the arcade and "the bat's internal fire"; grey is ambiguity ("everything is so gray that it becomes difficult to tell the characters apart"); red on black links the Mutants, the army, the bomb and Wayne's heartbeat ([TCJ](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/)).
5. **The old, huge Batman.** "A 55-year-old Bruce Wayne" ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)). Miller: "I wanted to see what would happen to Batman if the hero became as old as his legend", "I was 29 at the time" ([Comic Book Club, ComicsPRO panel, 20 Feb 2026](https://comicbookclublive.com/2026/02/20/frank-miller-and-klaus-janson-reveal-dark-knight-returns-secrets-and-easter-eggs-at-comicspro/)); on DC's own page, "the impossibly old age of fifty" ([DC](https://www.dc.com/blog/2026-02-20/how-the-dark-knight-returns-redefined-comics)).
6. **The machines and the horse.** The tank-tracked Batmobile against the Mutant leader (Book Two, page 20 shows its tracks: "the classic stand off between the leader of the mutants and the Batmobile", [ComicConnect](https://www.comicconnect.com/item/1021408)); the "exoframe" Batman wears against Superman, after Oliver Queen's kryptonite arrow ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)); and Batman on horseback at the head of the Sons of the Batman during the blackout (a splash page reproduced in TCJ; Thurston links Batman to "equestrian statuary").
7. **Two suits.** A first grey suit with a blue cape and the yellow oval, torn in the first fight with the Mutant leader; then a black and grey suit with "a larger black bat emblem minus the yellow oval" (fan wiki: [DC Movies Wiki](https://dcmovies.fandom.com/wiki/Batsuit_(The_Dark_Knight_Returns)), which describes the animated film's suits; the comic shows the same two, but no primary source was found).

**Primary sources not found:** no Miller or Varley interview on the TV device or on the colour choices (the readings above are critics'), and no Janson interview on this book's look; the [SKTCHD](https://sktchd.com/interview/the-moment-with-klaus-janson/) and [Comics Beat](https://www.comicsbeat.com/graphic-novel-club-klaus-janson-dark-knight-returns) interviews exist but were not read.

## 3. Palette

### Editions, and what was sampled

The edition Varley approved is the **1986 prestige-format printing**: she and Miller attended all four press runs (Rozakis, above). No scan of a 1986 printed interior page was available to us. What we sampled, in order of trust:

| Key | Source | What it is | Trust |
|---|---|---|---|
| **S-A** | [ComicConnect lot 1021408](https://www.comicconnect.com/item/1021408), 900×1353 JPEG | A photo of **Varley's own hand-painted colour art** for Book Two, page 20 (the tank against the Mutant leader) | Highest: her paint, upstream of every printing. But it is a photo of a board: the board reads warm (`#f4efde`), so the greens below are if anything understated, and paint over a blueline is not the printed colour |
| **S-C** | [Wikipedia, File:Batman The Dark Knight Returns 1 (February 1986).jpg](https://en.wikipedia.org/wiki/File:Batman_The_Dark_Knight_Returns_1_(February_1986).jpg), 256×398 JPEG, uploaded "from official source" | The Book One cover as DC shows it | Medium: the cover, but which printing or remaster is not stated, and it is tiny |
| **S-T** | Screenshots in Thurston's [TCJ essay](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/), 2019 | Interior panels from Books One to Four | Low: edition not stated, probably a later collected edition. Used only for hues and for what the TV panels look like, and listed under Unverified |

We found **no evidence that any later edition was recoloured**, and none that it wasn't. A collector compares the slipcase edition with the 1996 10th-anniversary hardcover and finds them identical ([My Absolute Collection, 2017](http://myabsolutecollection.blogspot.com/2017/03/batman-dark-knight-returns-collectors.html)); the 2026 40th-anniversary Deluxe Edition is announced as "newly remastered", colour unspecified ([Smash Pages, 17 Feb 2026](https://smashpages.net/2026/02/17/dc-comics-will-mark-40th-anniversary-of-the-dark-knight-returns-with-yearlong-celebration/)). The 2015 *Batman Noir* edition removes the colour entirely ([mycomicscollection](https://mycomicscollection.com/en/blog/dark-knight-returns-collecting-guide/)).

**Method.** Region medians and the median of the 15% most saturated pixels, by our own script (Pillow + NumPy), on the files above. Ink and paper excluded where marked.

| Element | Hex | Source, region | Note |
|---|---|---|---|
| Ink black | `#191b16` | S-A, whole lower panel, pixels darker than 60 | Green-black: LCh hue 125° |
| Tank, shadow | `#2b2f2c` | S-A, tank body, darkest 10% | Hue 152° |
| Tank grey | `#3b403d` | S-A, tank body, median | Hue 158° |
| Dump ground | `#494d43` | S-A, foreground, median | Hue 125° |
| Dusk sky | `#553f30` | S-A, upper right, median | Rust brown; not used (PALE MOONLIGHT, KNIGHTMARE) |
| TV-room panels | `#7f8387` | S-A, the couple's panels, median | Cool neutral grey |
| Mutant visor | `#c05224` | S-A, visor, saturated | Next to Clawd orange; not used |
| SFX "BUDDABUDDA" | `#d7ae3e` | S-A, saturated | Varley's painted yellow is ochre-gold, PALE MOONLIGHT's family; not used at full strength |
| Batman's caption boxes | `#a2b9b7` (light `#b6d1cf`) | S-A, the four captions, ink excluded | Pale teal-grey on the art |
| Cover sky | `#35455c`, `#345f82` | S-C | The night blue the jury barred (`#35455c` is the very hex of [`snyder.md`](snyder.md)'s DKR sketch). **Not taken** |
| Lightning, core | `#f8feff` | S-C, brightest pixels across the bolt | White |
| Lightning, edge | `#ceeaf8`, `#d1f7ff`, `#bbdef2` | S-C, the pixels either side of the core | LCh hue 217–237°, chroma 11–13 |
| Caption cyan, as printed | `#00c3f6`, `#00baee` | S-T, Book Four and Three caption boxes | Process cyan; these are Superman's boxes ("Kent blue") |
| Mutant visors on TV | `#f33970` | S-T, Book Two TV panel | Hot pink-red |
| Arcade neon | `#e2027b` | S-T, Book Two arcade sign, saturated | Magenta |
| Heartbeat trace | `#ea2b17` | S-T, Book Four | VENGEANCE's red; not used |
| Carrie Kelley yellow | `#fce147` (lemon), `#fef600` | S-T, Book Three and Four | Later printing: lemon, unlike the ochre on S-A |

**One disagreement to note.** On S-A, Batman's own caption boxes are a pale teal-grey; in S-T, Superman's are a flat process cyan. Caption tints may have been laid flat at separation rather than painted, or may differ by character and page. So this dossier does **not** call the alarm "Varley's caption cyan". It takes the alarm's hue from the lightning on the cover (S-C), and cites the printed caption cyan only as the same family.

### The Alarm color

Off the table: red (VENGEANCE, and KNIGHTMARE's crimson; the heartbeat `#ea2b17` is VENGEANCE's red), gold or yellow (PALE MOONLIGHT; Varley's own yellow samples as ochre), blue (WATCHFUL PROTECTOR), anything near Clawd orange (the Mutant visor), and, after the Wave 2 jury, the pinks (*Year One*'s magenta, *Arkham Asylum*'s claret) and the lemon (*Absolute Batman*).

**Lightning cyan.** Miller's own idea for the book is the bolt: "striking like lightning as a force for justice". The bolt's edge on the cover is a pale cyan at hue 217–237°; the alarm is that hue at full chroma, `#3fdcff` (hue 225°). It is not a flash: it is a colour that lights only when something needs you, like every Theme's alarm. The Wave 1 jury's ban was on lightning *flashes* (a flash with no news cries wolf), not on the colour.

**Why it meets the Alarm color rule.** `CONTEXT.md` and ADR 0001 ask for the hottest colour in the palette, or a red when nothing reads as an alarm. In this cool palette the cyan is the most intense colour: C* 41 at L* 82, where the grounds, Bone, Ash and the suit are greys at C* 1–5. The one other coloured ink, the phosphor-green waiting ink, is paler and less chromatic (L* 86, C* 37) and sits 36.0 ΔE00 away at hue 130° against the cyan's 225°; outside the alarm's own fill, the nearest token is `--ink`, 21.5 away. (Clawd's orange is the mascot's, in every Theme, not the palette's.)

**Withdrawn: Palette B, arcade magenta `#ff3fa4`.** It was the first draft's fallback, from the Mutants' arcade neon. The jury measured it 8.0 from *Year One*'s alarm and 5.4 from *Arkham Asylum*'s, so it is no longer available (jury §3.10).

**Measured** (ΔE00, computed by us from the hex values with CIEDE2000; the Wave 2 values are the jury's revised ones, §2 and §9):

| | VENGEANCE `#e3121b` | PALE MOONLIGHT `#f0c24b` | WATCHFUL PROTECTOR `#3d8bff` | KNIGHTMARE `#ff405f` | *Year One* `#ff4dd2` | *Absolute* `#ecf05a` | *Arkham* `#ec5c94` | Clawd `#d77757` |
|---|---|---|---|---|---|---|---|---|
| **Alarm `#3fdcff`** | 75.6 | 47.3 | **28.7** | 75.4 | 61.8 | 47.9 | 70.0 | 59.2 |
| Fill `#12a9d6` (vs each `--signal`) | 65.4 | 48.5 | **18.5** | 66.3 | 54.6 | 53.6 | 65.6 | 51.1 |

Against other Themes' inks: `#3fdcff` is 20.4 from WATCHFUL PROTECTOR's `--ink-hot` `#5aa9ff`, **12.9 from its working mercury `#7cc6c4`**, 17.2 from PALE MOONLIGHT's working steel `#8fb0d3`, 31.4 from *Absolute*'s working lavender, and 42.0 from *Year One*'s canary.

**The one risk** is WATCHFUL PROTECTOR. Its alarm is 28.7 away, far more than the 5–8 the Wave 1 jury accepted between the three red alarms, and the grounds differ in hue (166° against 263°). But WATCHFUL PROTECTOR's *working* mercury is 12.9 from this alarm: the "one colour, two meanings across Themes" case Wave 1 §10.5 settled by having the picker preview each Theme's alarm on a stamp. The Wave 2 jury keeps it that way (§3.10): **decide on screen**, with WATCHFUL PROTECTOR's folder next to this one, on a stamp and as a lit disc.

### What `--signal` paints in this Theme

As in every shipped Theme since #72: only "needs you". The wordmark, focus, toggles, selection, the tab underline and progress go to `--accent` (Bone). Card hover borders take `--line`. The emblem in the header is Ash. The lightning-cyan fill lights the disc lens, the count chip (dark ink on it), the alarm stamps, the aura and the armour's power glow in the alarmed Pose. Nothing cyan at rest: the Signature's bolt is Bone, not cyan (§7).

### Token map

The 101 variables every shipped Theme sets, plus the new `--font-headline` (the intersection of the four stylesheets on `main`; `themes.test.ts` asserts them). **S-A / S-C / S-T** as above; **P** = proposed by us.

| Token | Value | Origin | Role |
|---|---|---|---|
| `--abyss` | `#090c0b` | P: near-black at the tank grey's hue (h 166°) | Page |
| `--smoke` | `#0d110f` | P | Top gradients, notice foot |
| `--surface` | `#131a17` | Jury §2: toward the S-A tank grey, h 166° | Cards, notice top |
| `--raised` | `#1d2622` | Jury §2: the S-A tank shadow `#2b2f2c`, darkened, h 165° | Card hover |
| `--line` | `#3b403d` | **S-A: tank grey**, as sampled | Rules, borders, card hover border |
| `--surface-deep` | `#0b0f0d` | P | |
| `--frame` | `#161d1a` | P | |
| `--header-fade` | `#0b0f0d` | P | |
| `--sheet-top` | `#18201c` | P | |
| `--shadow` | `#000000` | P | |
| `--blood` | `#3e4c36` | P: the phosphor green in shadow | Disc hover border, waiting rule. Not the alarm |
| `--signal` | `#12a9d6` | P: the alarm at lower lightness | Lit fill, count chip. Alarm only |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Alarm halo |
| `--signal-hot` | `#3fdcff` | P: **S-C bolt edge hue (217–237°) at full chroma** | Small lit pixels, lens ring |
| `--on-signal` | `var(--abyss)` | P | Dark ink on the cyan chip (7.18:1) |
| `--ink-hot` | `#3fdcff` | P: same as `--signal-hot`, no lift needed | OK TO AIR? and DEAD AIR stamps, hot pen |
| `--ink-soft` | `#bde3a1` | P (jury §2): pale phosphor green, a CRT's glow; no sample | YOU'RE ON and LATEST stamps, soft pen |
| `--ink-live` | `var(--bone)` | P | Working |
| `--ink` | `#c2cbc6` | P | Secondary body text |
| `--accent` | `var(--bone)` | P | Wordmark, focus, toggles |
| `--accent-hot` | `var(--bone)` | P | |
| `--accent-deep` | `var(--line)` | P | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 12%, transparent)` | P | |
| `--selection` | `var(--raised)` | P | |
| `--progress-deep` | `var(--line)` | P | |
| `--progress-hot` | `var(--bone)` | P | |
| `--thumb` | `var(--abyss)` | P | |
| `--brick` | `var(--ink-soft)` | P | |
| `--stamp-hot` | `var(--ink-hot)` | P | |
| `--stamp-soft` | `var(--ink-soft)` | P | |
| `--stamp-quiet` | `var(--ash)` | P | FROZEN, OFF AIR, STANDBY |
| `--in-progress` | `var(--bone)` | P | |
| `--in-progress-glow` | `color-mix(in srgb, var(--bone) 40%, transparent)` | P | |
| `--danger` | `var(--raised)` | P | Quit's hover stays a shadow |
| `--waiting-rule` | `var(--blood)` | P | |
| `--report-rule` | `var(--line)` | P | |
| `--clawd` | `#d77757` | Claude Code's `clawd_body`, unchanged | |
| `--bone` | `#e9f2ee` | P: the white of the TV boxes, tinted to the ground's hue (9.7 from *Year One*'s Bone) | Text, working |
| `--ash` | `#939c97` | P: S-A greys lifted | Secondary text |
| `--bone-dim` | `var(--ink)` | P | |
| `--ash-dim` | `var(--ash)` | P | |
| `--chevron` | `var(--ash)` | P | |
| `--clawd-eye` | `var(--bone)` | P | |
| `--clawd-eye-dim` | `color-mix(in srgb, var(--clawd-eye) 18%, transparent)` | P | |
| `--cowl` | `#0d100e` | P: S-A ink | Cowl, gloves |
| `--cowl-edge` | `color-mix(in srgb, #e8e1d9 22%, transparent)` | P: the neutral rim the Costume Rule asks for | |
| `--cowl-shine` | `var(--raised)` | P | |
| `--suit` | `#666864` | Jury §2: a neutral grey, 13.9 from *Absolute*'s revised teal `#3f6b6e` and 33.7 from *Year One*'s chalk `#d0d3cc`; the black bat reads on it at 3.56:1 | Suit, and the belt |
| `--gloves` | `#0d100e` | P | |
| `--belt` | `var(--suit)` | Jury §5: a suit-grey belt, so the chest bat never merges with it | Only the buckle shows |
| `--buckle` | `var(--ash)` | P | |
| `--cape` | `#050605` | P | |
| `--cape-rim` | `var(--cowl-edge)` | P | |
| `--thread` | `var(--cowl-edge)` | P | |
| `--chest` | `#070807` | P | The big black bat |
| `--aura-core` | `color-mix(in srgb, var(--signal-hot) 90%, transparent)` | P | Alarmed only |
| `--aura-glow` | `color-mix(in srgb, var(--signal-hot) 55%, transparent)` | P | |
| `--emblem` | `var(--ash)` | P | Header bat, flat |
| `--disc-bat` | `var(--raised)` | P | Unlit bat in the glass |
| `--glass-shine` | `#1c2420` | P | |
| `--glass` | `var(--abyss)` | P | |
| `--disc-rim-inner` | `#050807` | P | |
| `--disc-rim-outer` | `var(--line)` | P | |
| `--lens-core` | `#f8feff` | **S-C: bolt core** | Lit lens centre |
| `--lens-rim` | `var(--signal)` | P | |
| `--lens-bat` | `var(--abyss)` | P | |
| `--lens-bat-edge` | `transparent` | P | |
| `--disc-lens` | scanlines over `radial-gradient(circle at 50% 45%, var(--lens-core), var(--signal-hot) 55%, var(--signal))` | P (§8) | |
| `--notice-top` | `var(--surface)` | P | |
| `--notice-foot` | `var(--smoke)` | P | |
| `--notice-hover-top` | `#202924` | P | The lightest ground; every text token is checked on it |
| `--notice-hover-foot` | `#111714` | P | |
| `--haze` | `color-mix(in srgb, var(--bone) 5%, transparent)` | P: the TV's glow, neutral, never cyan | |
| `--haze-edge` | `color-mix(in srgb, var(--bone) 2%, transparent)` | P | |
| `--haze-inset` | `auto -10% -40% -10%` | P: low and centred, a set in front of the viewer (§9) | |
| `--grain-opacity` | `0.04` | P | |
| `--searchlight` | `var(--bone)` | P | |
| `--font-display` | `'Bangers', 'Impact', sans-serif` | §4 | |
| `--display-weight` | `400` | Bangers has one weight | |
| `--font-body` | `'Barlow Semi Condensed', 'Segoe UI', sans-serif` | shared | |
| `--font-type` | `var(--font-display)` | P | |
| `--font-mono` | `'JetBrains Mono', 'Cascadia Mono', monospace` | shared | |
| `--font-report` | `var(--font-body)` | P | |
| `--font-stamp` | `var(--font-display)` | §4 | |
| `--font-label` | `var(--font-body)` | P: short words under 19px stay in Barlow (KNIGHTMARE's lesson) | |
| `--heading-case` | `uppercase` | P | |
| `--font-case-title` | `var(--font-body)` | P | |
| `--case-title-weight` | `600` | P | |
| `--font-headline` (new, jury §6) | `var(--font-body)`, at 600 | Jury §2: Bangers has no lowercase, and an all-clear title in slanted comic caps shouts | Empty-state and sheet titles |
| `--folder-name-size` | `14px` | P | |
| `--folder-name-tracking` | `0.5px` | P | |
| `--wordmark-size` | `20px` | P: Bangers is condensed; check at header size | |
| `--wordmark-tracking` | `1.5px` | P | |
| `--wordmark-glow` | `color-mix(in srgb, var(--bone) 18%, transparent)` | P | |
| `--pen-hot`, `--pen-soft` | the shared wavy stroke in `#3fdcff` and `#bde3a1` | P | |
| `--stamp-tilt`, `--stamp-tilt-slight` | `0deg`, `0deg` | P: Bangers is already slanted; the box sits straight like a caption on a screen | |
| `--stamp-border` | `1px` | P | |
| `--stamp-size` | `12px` | P: Bangers is condensed (widths §6) | |
| `--stamp-weight` | `400` | P | |
| `--stamp-mask` | `none` | P: clean, like a TV caption box | |

Theme-only variables (read by its own painter and outfit, not shared): `--armor` `#5b635e` and `--armor-edge` `#9aa49e` (§7), `--tv` `#26302b` (the TV set's screen when off), `--static` `var(--bone)` (§9).

### WCAG contrast (computed; WCAG 2 relative luminance)

`themeContrast.test.ts` checks every text colour on **eleven** grounds, not three; the lightest is `--notice-hover-top` (`#202924`). The table gives abyss, surface, raised and the worst of the eleven, for the palette as revised after the jury.

| Ink | on `--abyss` | on `--surface` | on `--raised` | Worst of 11 (`--notice-hover-top`) | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` `#e9f2ee` (also accent, ink-live, in-progress) | 17.21 | 15.49 | 13.60 | 13.10 | Pass |
| `--ink` `#c2cbc6` (also bone-dim) | 11.83 | 10.65 | 9.35 | 9.01 | Pass |
| `--ash` `#939c97` (also ash-dim, chevron, stamp-quiet) | 6.96 | 6.27 | 5.50 | 5.30 | Pass |
| `--ink-hot` / `--signal-hot` / `--stamp-hot` `#3fdcff` | 12.06 | 10.85 | 9.53 | 9.18 | Pass |
| `--ink-soft` / `--stamp-soft` / `--brick` `#bde3a1` | 13.72 | 12.35 | 10.84 | 10.45 | Pass |
| `--on-signal` `#090c0b` on `--signal` `#12a9d6` | | | | **7.18** | Pass |
| `--clawd` `#d77757` (mascot, not text) | 6.24 | | 4.93 | | n/a |

No exceptions are needed. In Bat-Clawd: the black chest bat on the grey suit is 3.56:1 (above WCAG's 3:1 for graphics); the cowl against the orange jaw is 6.07:1; the suit on the page 3.49:1.

**Tier separation.** Hot cyan and soft phosphor green are 36.0 ΔE00 apart; the green is 24.6 from Ash and 19.6 from Bone, so the three tiers (needs you now, waiting, quiet) read apart. The first draft's pale Robin yellow (`#e3dc86`) is withdrawn: it was 0.9 from *Year One*'s canary, which the jury gave to *Year One* (§3.1, §9.1). A pale-cyan soft ink (`#a9dff0`) was also tried and rejected: 9.6 from the hot cyan, with a luminance ratio of 1.12. **Why phosphor green:** it is the glow of a green-phosphor screen and of the static's afterglow, it belongs to the TV frame and to no Theme's alarm, and it sits at hue 130° on a ground at 166°, close enough to belong and far enough to read. It has no sample in the book: it is proposed (§12). **Decide on screen**, including beside Clawd orange (46.3 ΔE00 apart).

**Waiting inks across the app** (ΔE00 from `#bde3a1`; the new Wave rule asks for ~5 or more): VENGEANCE `#d4574c` 55.9, PALE MOONLIGHT `#c98a3e` 34.5, WATCHFUL PROTECTOR `#e9a04b` 32.9, KNIGHTMARE `#e1ae66` 26.6, *Year One* `#e6e08a` 12.0, *Absolute* `#d79bbd` 50.2, *Arkham* `#d6c49a` 16.7. Against working inks: WATCHFUL PROTECTOR's mercury 22.4, *Year One*'s Bone 13.0.

### The ground, against the other Themes

Moved after the jury (§3.1, §9.1) from h 140° to h ~166°, the hue of Varley's tank grey (`#3b403d`, h 158°, and its shadow `#2b2f2c`, h 152°). Surface and raised are the jury's values; the rest is re-derived at the same hue.

| | surface `#131a17` (h 166°) | raised `#1d2622` (h 165°) | working Bone `#e9f2ee` vs their working ink |
|---|---|---|---|
| VENGEANCE | 7.0 | 18.3 | 31.6 (amber) |
| PALE MOONLIGHT | 8.0 | 12.4 | 22.6 (steel) |
| WATCHFUL PROTECTOR (h 263–265°) | 8.3 | 10.0 | 20.3 (mercury) |
| KNIGHTMARE | 16.1 | 21.0 | 13.1 (Bone `#f7e8c8`) |
| *Year One*, revised (`#191b0b` / `#292c11`, h ~110°) | **6.4** | **11.1** | **9.7** (Bone `#e2e3c8`) |
| *Absolute*, revised (`#17132a` / `#221c3c`) | 18.1 | 21.5 | 25.0 (lavender) |
| *Arkham*, revised (`#1a0f15` / `#2b1822`) | 13.7 | 21.7 | 12.7 (Bone `#f3e5e8`) |

Every surface is at least ~6 and every raised tone at least ~10 from every other Theme's, as the new Wave rule asks (jury §3). Bone was tinted from `#eef1e8` to `#e9f2ee` (h 166°) to sit with the ground. Both Themes run in Bone, and the rule wants working inks ~5 apart: *Year One*'s final Bone (`#e2e3c8`) is 9.7 from this one tinted and 7.5 untinted, so either passes. What the tint changes is the closest Bone in the app: untinted, it is PALE MOONLIGHT's, 4.5 away; tinted, WATCHFUL PROTECTOR's, also 4.5. Neither is a working ink here, and near-whites sit close as near-blacks do (jury §1, after the revisions, flag 1). Every abyss in the app is within 1–6 of every other, as near-blacks are. **Not asylum green:** chroma 1–5, a grey; the jury leaves the Arkham games a saturated green with chroma 15 or more (§8).

## 4. Type

John Costanza's hand lettering and the cover's title lettering are not reproduced; no commercial comic face is used. All faces below are OFL-1.1, on Google Fonts and Fontsource (`"license":"OFL-1.1"` from the [Fontsource API](https://api.fontsource.org/v1/fonts/bangers)). The jury gave Bangers to this Theme alone, for its display and its stamps; *Absolute Batman*'s stamps move to Bungee (jury §3.3, §9.3).

| Role | Proposal | Licence / package | How close, and limits |
|---|---|---|---|
| Display (wordmark, intro) | **Bangers** 400 (new) | OFL-1.1, `@fontsource/bangers`, Vernon Adams | "designed in the style of mid-20th century superhero comics cover lettering" ([description](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/DESCRIPTION.en_us.html)). Slanted, condensed brush capitals: the register of the cover's yellow title and of the book's sound effects (KLIK, BUDDABUDDA), not a copy of either. Caps only |
| Headlines (empty-state and sheet titles) | **Barlow Semi Condensed 600**, through the new `--font-headline` token | already bundled | Jury §2 and §6: Bangers has no lowercase, and "OUR PANEL AGREES…" in slanted comic caps shouts an all-clear. The token defaults to `--font-display`, so no shipped Theme changes |
| Stamps | **Bangers** 400 at 12px, straight box, no wear | same | One family for display and stamps, as KNIGHTMARE does with Archivo. A stamp reads like a word set over a TV picture. **Decide on screen** at 1x: its `Z` is drawn small, so FROZEN must be judged |
| Labels under 19px | Barlow Semi Condensed (shared) | already bundled | KNIGHTMARE found a display face too wide for short labels; Bangers is narrow, but Barlow is the safe default |
| Body, report body | Barlow Semi Condensed (shared) | already bundled | The bulletin is plain working text, as in KNIGHTMARE |
| Mono | JetBrains Mono (shared) | already bundled | The Machine Voice Rule holds |

**No fallback stamp face.** The first draft named Saira Condensed; the jury notes that every condensed grotesque (Saira Condensed, Oswald, Teko) scores "~" against Anton and Big Shoulders, so Bangers is this Theme's whole Type axis (§3.3). If Bangers fails at 12px on screen, the stamp size moves (11px still fits every word, §6) before the face does. Shantell Sans (a marker hand) was rejected for this Theme and is *Absolute*'s report face.

## 5. Voice

**Frame: a TV broadcast, late at night.** The panel is the set. The user is the anchor, the cases are channels, and the Voice is the studio's: the anchor, the pundits who disagree, the station signing off. Short, dry, a little satirical, as the book is about its talking heads. It never speaks like a newspaper (no editions, no desk, no wire, no "Story"), never like an ops room (no clearance, no sitrep), and never like a TV *serial* narrator ("Meanwhile…", "same Bat-time"), which the jury keeps for an Adam West Theme (§8). Gordon belongs to *Year One* and stays out. No real or fictional station, anchor or host is named. No line repeats another Theme's sentence (the new Wave rule, jury §3.13).

**How broadcast differs from PALE MOONLIGHT's newsroom, concretely:**

| | PALE MOONLIGHT (print) | ANCIENT GRACE (broadcast) |
|---|---|---|
| Time | the edition: "Late edition", "— 30 —" | live: "LIVE · 02:14", "Stay tuned" |
| Unit | a Story on your desk | a Channel, on air or off |
| Handing over | Approval, Question | OK TO AIR?, YOU'RE ON |
| People | an editor, a reporter | an anchor, a panel of pundits |
| Texture | paper, a typewriter in the report | a screen: static, the roll bar, rounded TV frames |

**Sample lines** (all ours; `words.ts` field in brackets):

1. Intro tagline: **"Live, from Gotham."** [`tagline`]
2. Empty state: **"Our panel agrees: a quiet night."** The hint stays "Nothing needs you right now." [`empty.quiet.title`] The pundits finally agree, which is the joke. (The first draft ended in "nothing needs you", which the hint then said again; jury §3.13.) Set in Barlow 600 through `--font-headline`.
3. No cases: "No channels on the air." With the Lexicon off: "No cases on the air." [`empty.noCases.title`, through the Terms]
4. Night Report name: **"Bulletin"** [`report.name`]
5. Dateline: **"LIVE · 02:14"**: time only, no place (WATCHFUL PROTECTOR's is "GOTHAM · 02:14") [`report.dateline`]
6. Section heads: "Your segment" for what waits on the user, "Around the dial" for the rest [`report.signature`, `report.caseNotes`]
7. Close: **"Stay tuned. You're still on."** while something waits, or **"That's the bulletin. Good night, Gotham."** with nothing waiting [`report.end`]. The first draft's "Some of it still needs you." was KNIGHTMARE's sentence and is gone (jury §2, §3.13). "You're still on" picks up the YOU'RE ON stamp; neither close appears in any shipped `words.ts` line or Wave 2 dossier (checked by search).
8. Quiet disc tooltip: "Nothing on tonight." Lit: "We interrupt this program." Each followed by the standard tooltip [`signal.openTip`]
9. Settings kicker: "Control room" [`settings.kicker`]; Atmosphere toggle: "Static", hint "TV static behind the channels" (the term from the Terms, so "behind the cases" with the Lexicon off) [`settings.atmosphere`]. The jury notes that "Control room", LIVE and STANDBY lean toward radio procedure; keep it to these three.
10. The Signature caption, once per session: **"The time has come."** Four words from Book One, the voice in Bruce's head the night he returns (reproduced in [TCJ](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/)). It is the Theme's one short line; the name is its one allusion, as with PALE MOONLIGHT ("pale moonlight" in the name, "I'm Batman." in the panel).

*Dark* and *quiet* mean only "nothing needs you" (Wave 1 jury §4.3); no line above uses them for a stalled channel.

**Display name: ANCIENT GRACE** (the maintainer's choice, jury §9.11).

- **Where it comes from:** Bruce's narration in Book One, when he remembers falling into the cave as a boy and meeting the great bat: "Gliding with ancient grace" (quoted on [Street Tech](https://www.streettech.com/bcp/BCPgraf/Media/batmanDNR.htm); [TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Quotes/BatmanTheDarkKnightReturns) lists it too, but its page returned 403 and was read only through search results). We quote only that phrase: ADR 0001 allows no longer dialogue. Both are fan pages; we have not seen the printed page, so the wording and page are under §12.
- **Why it fits:** it names the bat Bruce becomes, and *ancient* is the old man who returns. It is a two-word fragment, used as an allusion, never set in the book's lettering, as PALE MOONLIGHT uses two words of the Joker's line.
- **Unique:** no other Theme name shares a word with it.
- **Credit string** for `themes.test.ts`: `{ name: 'ANCIENT GRACE', film: "Frank Miller's The Dark Knight Returns (1986)" }`. The `film` field holds the work without "after"; `words.ts` adds "after" itself, so the picker reads "after Frank Miller's The Dark Knight Returns (1986)" (jury §3.15, which found this credit already right). Proposed Theme id `the-dark-knight-returns-1986`, demo flag `grace`.
- TRIUMPHANT, A GOOD DEATH and BOLT FROM THE BLUE, the first draft's options, are withdrawn.

## 6. Lexicon

Frame: a TV station's control room. The test is the jury's (Wave 1 §5): a tired developer glancing at a stamp must get the standard meaning, at the right severity. The Wave 2 jury's fixes are adopted (§4, §9.9).

| Standard | Themed | Misread at a glance? | Note |
|---|---|---|---|
| Case | **Channel** (plural **Channels**) | A Slack channel, a Go channel, a release channel: all "a stream you follow", which is right. "Channel #b47c0d" reads like a channel number | Kept by the maintainer (§9.9). The jury notes it bars Channel from a later Adam West Lexicon |
| Needs you | **Your cue** ("1 cue for you", "3 cues for you") | Heard as "your queue", which still means "things waiting for you" | Kept by the jury |
| Permission | **OK TO AIR?** | "Air" is TV slang, but "OK …?" carries it: something asks for an OK before it runs. A question, so it reads as blocking | Kept by the jury (§4) and adopted (§9.9). GO AHEAD? is dropped: radio procedure, near WATCHFUL PROTECTOR's ops register |
| Error | **DEAD AIR** | A broadcast failure: the picture or sound has died. "Dead" reads as failed, at the right severity | Jury §4: replaces BREAKING, which read as "breaking news" (new, not failed) or a "breaking change" |
| Waiting | **YOU'RE ON** | The cue to speak: the camera is on you, it is your turn. Not "on hold" | Jury §4: replaces OVER TO YOU, 4px wider than PERMISSION. It completes **Your cue** |
| New reply | **LATEST** | "Latest version", the npm tag; on a card under a reply line it reads as "the latest reply" | Kept; fall back to NEW REPLY if it misreads on screen |
| Stalled | **FROZEN** | A frozen picture, a hung process: exactly "stalled". It does not use *dark* or *quiet* | Jury §3.12: FROZEN is this Theme's; *Arkham Asylum* takes the standard Stalled |
| Case opened / closed | **ON AIR** / **OFF AIR** | Clear. OFF AIR means ended, which is what closed means | Kept |
| Working / Idle / Shell (live state) | **LIVE** / **STANDBY** / Shell | LIVE is "running now", in Bone, never cyan. STANDBY is "ready, nothing running": the right reading for Idle | Kept |

**DEAD AIR against OFF AIR and FROZEN.** All three say that nothing is coming through, at three severities: DEAD AIR (an error, hot cyan), FROZEN (stalled, Ash), OFF AIR (closed, Ash). The tier colour and the box tell them apart, and only DEAD AIR is an alarm. Check the three side by side on screen.

**Widths** (re-measured with Pillow on Bangers at the proposed 12px; the test's own measurement in `stampWidth.test.ts` is what counts). Room in the Night Report margin is 101px at 0.12em and 87px at 0.04em in the narrowest panel. **Every word is narrower than PERMISSION** (77.3 / 67.7), as the Wave rule asks.

| Word | 0.12em | 0.04em |
|---|---|---|
| OK TO AIR? | 74.0 | 64.4 |
| DEAD AIR | 61.7 | 54.0 |
| YOU'RE ON (straight or curly apostrophe; Bangers has both) | 69.1 | 60.5 |
| LATEST | 50.3 | 44.6 |
| FROZEN | 53.7 | 47.9 |
| YOUR CUE | 63.9 | 56.2 |
| LIVE / STANDBY / SHELL | 35.4 / 60.3 / 43.9 | 31.6 / 53.6 / 39.1 |
| ON AIR / OFF AIR | 50.3 / 54.5 | 44.6 / 47.8 |

Windows notifications and the tray keep the standard words, as `CONTEXT.md` requires.

## 7. Bat-Clawd

The body, eyes, arms and legs keep their pixels. Clawd's orange jaw and white eyes stay in every Pose, including the Signature (so the Signature is not a full silhouette, whatever the cover does). The viewBox is 28 units wide (`[-6, -1, 28, 13]`), so one unit is about 2.1px at the header's 60px and 1.9px at 54px; nothing under 1 unit counts. On the outfit map the jaw row ends at y = 5, the chest runs y 5–8, the belt row is y 8–8.5, and the legs start at y 9.

### The suit: the second suit, and the old man's bulk

The maintainer gave the grey suit, the big black chest bat and the armour back to this Theme (jury §9.5). They are Miller's; Snyder borrowed them, and KNIGHTMARE shipped without them (`suits.ts` has no armour, and KNIGHTMARE's chest bat is 4.4 units on a charcoal suit inside a duster). KNIGHTMARE keeps the desert, the duster, the goggles and the Knightmare. *Year One* keeps its own smaller black bat on the only light suit; *Absolute* keeps its block on its teal.

- **Cowl:** black (`--cowl`), with short ears **set wide**, at the head's outer corners (x = 3 and x = 12, one unit each) instead of x = 4 and 11: a broad, boxy old head, not a pointed one (a 1-unit shift, 2px: it counts, jury §5). The brow row heavy (`...cccchhcccc...`, shine in the middle). A faint neutral rim (`--cowl-edge`) per the Costume Rule.
- **Suit:** a neutral grey, `--suit` `#666864` (jury §2): 13.9 ΔE00 from *Absolute*'s revised teal `#3f6b6e` and 33.7 from *Year One*'s chalk `#d0d3cc`, so the three grey suits sit at least 10 apart (§9.5). 3.49:1 on the page; 1.79:1 against the orange jaw, which hue carries, as on every shipped suit.
- **The big black bat, fitted at real size** (the jury's §5 finding: a 9-unit bat at 2.6:1 is 3.5 units tall, does not fit between the jaw and the belt, merges with the dark belt at 1.51:1, and joins the cape at its wingtips):
  - **Width at most 8 units and height at most 3:** `width = min(8, 3 × the traced aspect)`. At the estimated 2.6:1 that is **7.8 × 3 units**, centred at `cx 8, cy 7.5`, so **y 6–9** and **x 4.1–11.9**. At 60px that is about 16×6px; at 54px about 15×6px. Still the biggest chest mark in the app (KNIGHTMARE's 4.4, *Year One*'s 5).
  - **One unit of grey above it:** the jaw ends at y 5 and the bat starts at y 6, so it never reads as the cowl dripping.
  - **One unit of grey beside it:** the body is x 3–13 and the wingtips stop at 4.1 and 11.9, so the bat never joins the black cape at the sides.
  - **No dark belt under it:** the belt row is suit grey (`--belt: var(--suit)`), the jury's own option, so the bat runs over it onto grey and never merges into a dark apron. The bat is 3.56:1 on the suit. The tail ends at y 9, between the two middle legs' gap (x 7–8), where the half row above the legs is suit grey.
  - **Option, decide on screen:** a visible Ash belt (`#939c97`, 2.0:1 on the suit), moved down to y 8.5–9 as PALE MOONLIGHT's is. The bat on it is 7.11:1, above the Wave rule's 3:1, so they may touch; but the bat then shrinks to 2.5 units tall (6.5 wide), the jury's own figure. Recommended: the suit-grey belt and the bigger bat.
  - Draw it only once traced (§8); if the traced bat is wider than 2.7:1, the 8-unit cap governs and it is less than 3 units tall.
- **Cape:** black (`--cape` `#050605`), heavy, to the ankles, with **two long tails**: one deep point at each outer corner, the hem straight between them. **The tails end at y = 11.5**, half a unit below the feet, not at y = 12, the viewBox's bottom edge, where their rim was cut (jury §5). Standing: `M3 5 L13 5 L14.6 11.5 L12.6 10.8 L3.4 10.8 L1.4 11.5 Z`. Not VENGEANCE's zigzag, not PALE MOONLIGHT's scallops, not WATCHFUL PROTECTOR's plain straight hem, not KNIGHTMARE's duster, not *Year One*'s four ragged points or *Absolute*'s blades. Suit against cape is 3.6:1, so the body reads in front of it.

### Poses

| Mood | Pose | Source | On the grid |
|---|---|---|---|
| sleeping | **Retired, in front of the TV** | Book One opens with Bruce retired, flipping channels (the KLIK grid) | The shared seated pose, cape wrapped (its two tails ending at y 11.5), eyes shut. Beside him on the overlay layer, a small 1986 TV set: a 4×3.5-unit box at x = 13–17, y = 6.5–10, bezel 1 unit wide in `--line` (`#3b403d`, 1.86:1 on the page), screen in `--tv` (`#26302b`), a 1-unit V antenna on top. The screen shows two or three Bone specks at 20%: the static of a set left on. Every part is at least 1 unit; the bezel's edge, not its fill, is what reads, so check it at 54px |
| flying | **The drop** | Book One: he comes down from above with the cape spread over him (TCJ reproduction; page not identified, §12) | Arms raised, gloves at the cape's edges; the cape spread **above** his head like a canopy, from x = −3 to 19, peaking at y = −1 (the viewBox's top, so the overlay draws past it as WATCHFUL PROTECTOR's ring does), its two tails hanging at the sides to y 8. Legs straight below. Two frames: the canopy's edge a unit higher, then lower. **The collision with *Arkham Asylum*** (its descent also put the cape over the head) **is settled on Arkham's side:** the jury moved Arkham to a trailing cape, since its descent had no page behind it and this one does (§3.7, §9). *Year One*'s flying leap, which was this Theme's Signature figure without the tilt, also moved to a trailing cape. This is now the only flying Pose with the cape overhead; every other one spreads sideways or trails behind |
| alarmed | **The armour** (homage pose; jury §9.5) | Book Four's "exoframe" against Superman ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)) | Outfit map in two new legend letters: `A` armour plate (`--armor` `#5b635e`) and `e` its edge (`--armor-edge` `#9aa49e`). **At real size:** the plates are 3.17:1 on the page and the edge 7.65:1, so the armour reads by its outline, as the jury found for the first draft's edge; the black chest bat is 3.24:1 on the plate (the first draft's darker plate, `#3d4540`, left it at 2.03:1). Pauldrons 2×1.5 units at x = 2–4 and 12–14, y 4.5–6, each a full unit past the body; a 1-unit edge row along the plates' tops. The cowl's ears cut to a 1-unit stub; eyes still white 2×1. The cape behind, thrown back, tails at y 11.5. **Aura in lightning cyan**, as the armour powers up: the only cyan on the mascot, and only while something needs the user. The wider shoulders make an outline the shipped alarmed Poses don't: PALE MOONLIGHT raises wings, WATCHFUL PROTECTOR flings the cape open, KNIGHTMARE swings the coat. *Absolute*'s resting shoulders are also a unit wider; the jury checked this and needs no change (different Mood, different colour, §3.5) |
| perch | **Signature pose**, below | | |

### Signature pose: the lightning leap (recommended)

The Book One cover, as a pose. The cover is already a frozen leap; the perch holds it like a freeze-frame on a screen.

Reveal, on the 8 fps clock (a step = two ticks, a quarter second):

1. **On the ledge:** standing profile-right, the cape bunched, the body a unit lower (`transform: translateY(2px)` at the header's scale).
2. **Launch:** the whole figure rotated −15° and raised 2 units (one step `transform`, which steps already take); legs drawn tucked (the four leg pixels at y = 9 only, knees up); the right glove forward as a fist at (14, 5); the cape streaming back and up in one heavy sheet to (−4, 1), its two tails apart.
3. **The bolt:** a jagged path behind him on the overlay layer, from (12, −6) down through (9.5, −1), (11.5, −0.5), (7.5, 5), (9.5, 5.5) to (5, 14), stroked 1 unit wide in **Bone at 60%**. It is drawn once, whole, and stays: no flicker, no flash, no change of the panel's light.
4. **Held:** the same, the bolt at 40%. This is the final step `watchOn` holds on the perch. His glances: ahead (`look: GAZE`) and down to the street (`lookY: 0.4`).

Under reduced motion: step 4 only. The intro and a click play the same reveal; a click adds the caption "The time has come." once per session.

**Why its outline differs from the four taken** (as shipped, corrected by the jury, §3.8): VENGEANCE stands front-on with a shadow at its feet; WATCHFUL PROTECTOR's *Sonar* **stands** front-on with the cape hanging square (it shipped standing; the ring plays only in the reveal, so the first draft's "crouch with a ring" was wrong); PALE MOONLIGHT stands three-quarter under an oval; KNIGHTMARE stands with the coat blown to the right. This figure is tilted −15°, tucked, with a long diagonal line through it. *Absolute*'s lift also leaves the ground, but upright and wider at the floor than the top, so the first draft's claim to be "the only Signature off the ground" is dropped; the outlines still differ (§3.8).

**The bolt at real size:** 20 units tall (y −6 to 14), about 40px, taller than the 54px header's box. The overlay already draws unclipped (WATCHFUL PROTECTOR's ring reaches radius 16), so no engine change; **decide on screen** that the header's clip holds it and that it doesn't read as a crack in the window.

**Option B: the horse.** Batman rearing on horseback at the head of the Sons of the Batman, Book Four. Bat-Clawd sits astride (his legs hidden); the horse on the overlay layer: body 10×4 units under him (y = 8–12), neck and head rising to the left to (−3, 2), forelegs raised (−1 to 2, y 6–9), hind legs down to y = 15. Two gallop frames, then he rears and holds. Its outline is unique in the app and the most "fan" image, but it is about 20×16 units, half again Bat-Clawd's box; at 54px the horse's legs are 1-unit lines and the header may not have the room. **Recommendation: the leap.** Prototype the horse only if the maintainer wants it.

**Option C, rejected: the old man in the rain.** It is the book's mood, but rain is VENGEANCE's Atmosphere, and a standing figure joins the two front-on stands already taken.

## 8. Emblem

**Shape (the second suit's bat, drawn by us):** a wide black bat with no oval, about 2.6:1, read from the reproductions in §2 (proportions **unverified**, §12). Short ears on a flat, broad head; the wings reaching out nearly level, their upper edge rising slightly to the tips; the lower edge in three scallops per side, separated by points; a short pointed tail. It must differ from KNIGHTMARE's `BAT_2016` at 54px, which descends from it: this one is flatter and wider, with level wings, where the BvS bat sweeps its wing horns up and drops to a deep V. Drawn as a left half on the 120×48 grid and mirrored at x = 60, finish `none`, like the others. The tray and toast icons stay single (Wave 1 jury §2).

*Traced on 2026-10-15 in [`year-one-bat.md`](year-one-bat.md) §4–6, from the Book Three cover: about 1.05:1, round, two V notches a side, so it does not read like Year One's 2.7:1 bat. The path, BAT_1986, waits there for this Theme's build; the chest version on the Book Two cover may be wider (up to about 2.2:1), which would mean comparing again.*

**Trace before drawing, and compare with *Year One*'s** (jury §3.14). *Year One*'s 1987 bat has the same written description ("wide and level-winged, small head, two short ears, scalloped underneath, no oval"). Trace this one from a clean image of the second suit and *Year One*'s from its source, and compare the two at 64px on the disc before either is drawn into `emblems.ts`. If they read alike, this Theme's tells are its flat, broad head and its three scallops a side; the trace decides.

**The 64px Signal disc: a TV screen.**

- **Unlit:** dark glass (`--glass` → `--glass-shine`), the bat a shade in it (`--disc-bat`). Plain (jury §6): scanlines on the unlit face would need a `--glass-overlay` variable in `Signal.css`, which the approved engine (jury §9.12) does not include, so it is dropped. If the lit scanlines are not enough on screen, the flatter lit screen below is the fallback.
- **Lit:** the screen comes on: `--lens-core` (the bolt's white) at the centre → lightning cyan → `--signal` at the rim, the black bat across it, `--signal-glow` around, and **horizontal scanlines over it** (a 1px line every 3px at about 10% abyss), carried in `--lens-breaks` and layered into the `--disc-lens` list, as KNIGHTMARE layers its broken glass. No engine change. The count sits in a cyan chip in dark ink.
- **Against WATCHFUL PROTECTOR's lens** (jury §2): a white core into cyan is the same kind of lens as its white-hot core into blue, so **the scanlines must carry the difference. Decide on screen**, side by side. If they don't, the alternative is a flatter lit screen: a lighter cyan field with the white only as a small glare off-centre, like light on a CRT's glass, instead of a centred hot core.
- No flash on lighting: the existing 0.4s background transition only.

## 9. Atmosphere

**Static, between channels**, on the shared **`noise` painter** (jury §6, §9.12). The first draft asked for a `static` kind of its own; the jury merged it with *Arkham Asylum*'s scratches into one painter, and the maintainer approved that engine. This Theme uses it like this:

- **The mark: a speck,** 1px, in `--static` (Bone) at alphas 0.04–0.10, about 0.5 per 1000 px² (about 70 in a 320×440 panel).
- **Its life: one tick.** Every speck is re-placed every tick on the shared 8 fps clock from a frame-indexed table (as snow and ash are), so they flicker in place and never fall. That is what makes them static, not snow or ash. *Arkham*'s scratches use the same painter with hairlines that live 16–24 ticks and fade, so the two no longer score "~" on Atmosphere (jury §3.9).
- **The drifting band: the roll bar,** one soft horizontal band 24px tall, Bone at 3%, moving down 3px a tick (one pass of a 440px panel in about 18 seconds), as an old set's picture rolls. The painter's optional band exists for this.
- **No still layer.** (The painter's optional still layer is *Arkham*'s panes.)
- **The light:** the TV's own glow, low and centred (`--haze-inset` `auto -10% -40% -10%`), neutral Bone at 5%, never cyan. VENGEANCE's light comes from below in red, PALE MOONLIGHT's from below in smog, WATCHFUL PROTECTOR's from below in mercury, KNIGHTMARE's from above in sand, *Arkham*'s cold from the right; this one is a white glow in front of the viewer.
- **Gating:** as every Theme since #81: it moves only while the pointer is over the window and for a few seconds after news, `still: 'calm'`, and nothing under reduced motion.

**What this Theme asks of the engine PR:** only the shared `noise` kind, its painter, and its options (speck, a one-tick life, the band), built by whichever of this Theme and *Arkham* comes first. `--glass-overlay` on the unlit disc is dropped (§8). Everything else (the armour, the TV set, the bolt, the lit lens's scanlines, the stamp shape, `--font-headline` from the shared type-token PR) uses layers, legend letters and variables the engine already has or the jury's shared PRs add.

**One risk, decide on screen:** static is the picture of "no signal". It shows only while the user looks and after news, and it is dim; the Voice calls it "between channels", and the disc tooltip at rest says "Nothing on tonight". Check that it reads as a set left on, not a broken one.

**Rejected alternatives:**
- **A wall of 16 small screens** (the grid as a still scene, one screen changing channel every few seconds): the strongest image of the book's grid, but mechanically it is WATCHFUL PROTECTOR's lit windows (a still grid where one cell switches each second), so it would score "=" on Atmosphere against it. The grid can live elsewhere: a Night Report divider, or the picker preview.
- **Rain:** the book's first night is a storm, but rain is VENGEANCE's kind and would score "~" against it.
- **Snow of the blackout:** PALE MOONLIGHT's kind.

## 10. Distinctiveness

Scored by the jury's rules (Wave 1 §1): C = clearly different, ~ = close, = = same; a Theme stays only with C on at least three axes against every other. The scores are the Wave 2 jury's (§1), updated for its fixes; ΔE00 values are ours, for the revised palette.

**Against the shipped Themes**

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| ANCIENT GRACE – VENGEANCE | C: tank grey vs warm black (7.0 / 18.3); cyan vs red (75.6); Bone vs amber (31.6) | C: Bangers / Bangers vs Anton / Special Elite | C: wide-set ears, two-tail hem, a big black bat on grey vs standard ears, a zigzag, a dark dash; a tilted leap vs a front-on stand | C: specks flickering in place and a roll bar, a white glow low vs diagonal rain, red glow from below | C: a broadcast with a Lexicon vs Bruce's journal with none. The one line, "The time has come.", is Bruce's inner voice: it stays on the Signature click | **5** |
| ANCIENT GRACE – PALE MOONLIGHT | C: tank grey vs smog brown (8.0 / 12.4); cyan vs gold (47.3); Bone vs steel (22.6). The yellow waiting ink, 12.2 from its gold, is gone | C: no family shared | C: no oval, no brass belt; two tails vs scallops; a leap vs three-quarter under an oval | C: flicker in place vs falling flakes; white vs brown smog | **~**: both are news media at night. The medium differs (TV vs print) and the Lexicons share no word, but the frame is a cousin. The jury keeps it: inherent to the source, no fix (§1) | **4** |
| ANCIENT GRACE – WATCHFUL PROTECTOR | C: hue 166° vs 263° (8.3 / 10.0); cyan vs blue (28.7, plain, same family); Bone vs mercury (20.3). The alarm is 12.9 from its *working* mercury: decide on screen | C: Bangers vs Syncopate / Big Shoulders Stencil | C: wide-set vs standard ears; two tails vs a straight hem; a black bat on grey vs a lit relief on black; a tilted leap vs a front-on stand | C: flicker vs a still skyline; both lit low, white vs mercury | C: a TV studio vs an ops briefing. "Control room", LIVE and STANDBY lean toward radio procedure; kept to those three, and OK TO AIR? rather than GO AHEAD? | **5** |
| ANCIENT GRACE – KNIGHTMARE | C: tank grey vs scorched brown (16.1 / 21.0); cyan vs crimson (75.4); both Bone (13.1) | C: Bangers vs Archivo | C: a cape vs a duster; an 8-unit bat on an open chest vs a 4.4-unit bat inside lapels; the armour vs the swung coat | C: static vs ash on the wind | C: broadcast vs a veteran with Alfred. The report close no longer echoes KNIGHTMARE's (§5) | **5** |

**Against the other Wave 2 Themes, as revised by the jury**

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| ANCIENT GRACE – *Year One* | C (was ~): tank grey vs olive-khaki (6.4 / 11.1); cyan vs magenta (61.8); Bone vs Bone, 9.7 after the tint. The shared yellow is gone (phosphor green vs canary, 12.0) | C: Bangers vs Permanent Marker / Neucha | C (narrow): wide-set vs standard ears; two tails vs four ragged points. Both chests are a black bat on grey, told apart by value (a mid-grey suit vs the only light one) and size (8 vs 5 units). The two emblems must be traced and compared (§8) | C: specks flickering vs smoke rising; a white glow vs olive smog | C: TV vs a cop's notebook (both Miller). *Year One* keeps the captions; this Theme keeps the screen | **5** |
| ANCIENT GRACE – *Absolute Batman* | C: tank grey vs violet (18.1 / 21.5); cyan vs lemon (47.9); Bone vs lavender (25.0) | C (was ~): Bangers is this Theme's alone; *Absolute* stamps in Bungee (§9.3) | C (narrow): wide-set ears vs *Absolute*'s, now standard; two tails vs six blades; a bat vs an axe block. Suits 13.9 apart (neutral grey vs teal) | C: static vs a bat colony | C: a broadcast vs a work shift | **5** |
| ANCIENT GRACE – *Arkham Asylum* | C: tank grey vs plum-black (13.7 / 21.7); cyan vs claret (70.0); Bone vs Bone (12.7) | C: Bangers vs IM Fell English SC | C: wide-set vs tall ears; tails vs a bleeding hem; a visible bat vs a hidden one. Its flying descent moved to a trailing cape, so the canopy over the head is this Theme's alone (§3.7) | C (was ~): one `noise` painter, but specks that live one tick and flicker vs hairlines that stay and fade over 2–3 seconds, with still panes; white and low vs cold from the right (§3.9) | C: a broadcast vs a house | **5** |

Every pair now scores 4 or 5; the only 4 is PALE MOONLIGHT, on Voice, which the jury accepted as inherent.

## 11. Legal note

- **Trademark (DC):** Batman, the bat symbols, "Gotham", and the title *The Dark Knight Returns*. The credit names the work nominatively. The display name, ANCIENT GRACE, is a two-word fragment of Bruce's narration used as an allusion, never set in the book's lettering, as PALE MOONLIGHT uses two words of the Joker's line; with "The time has come." it is the whole of the book's words in this Theme. The emblem is redrawn by us as a vector after the second suit's bat, credited as a DC trademark in the README and NOTICE, as for the other Themes.
- **Copyright to avoid:**
  - The cover art: no tracing of the silhouette, the bolt or the composition. The Signature pose is Bat-Clawd's own figure on his own grid, and the bolt is our own path.
  - Varley's paintings and every panel: sampled for colour in a scratch folder, never shipped, never reproduced.
  - The title lettering and Costanza's lettering: Bangers is a different, open face.
  - Character art and likenesses (Carrie Kelley, the Mutants, the Joker, Superman): not drawn.
  - Dialogue: one four-word line, "The time has come.", is the ceiling, plus the two words of the name. The book's other famous lines ("This would be a good death…") are not used.
- **Not named:** Lola Chong, the TV station, the talk show, the Mutants or the Sons of the Batman in any UI text. The Voice says "our panel", not a show's name.
- **No weapons:** the horse option carries no rifle; the armour has no weapon.
- **Style, free to use:** TV broadcast language ("live", "on air", "stay tuned"), static, scanlines, a 4×4 grid, a lightning-coloured light, comic cover lettering as a genre.
- **Fonts:** Bangers is OFL-1.1 ([METADATA](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/METADATA.pb)). Bundle its licence text with the existing Fontsource ones.
- **Images used in this research:** the ComicConnect photo of the colour art, the Wikipedia cover scan, the TCJ screenshots and two Vice/Strip Panel Naked stills, in a scratch folder outside the repo. None ships.

## 12. Unverified items

- **The display name's source.** ANCIENT GRACE is the maintainer's choice (jury §9.11). Its origin, Bruce's Book One narration about the bat in the cave ("Gliding with ancient grace…"), was found only on two fan pages ([Street Tech](https://www.streettech.com/bcp/BCPgraf/Media/batmanDNR.htm), and [TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/Quotes/BatmanTheDarkKnightReturns), whose page returned 403 and was read only through search results). The exact wording and the page number need checking against a copy of the book before it ships, as the jury asks of *Year One*'s name.
- **Every printed hex.** No 1986 printed interior page was sampled. S-A is a photo of paint before printing (board tone and camera cast); S-C is a 256px cover scan of an unstated printing; S-T is a later edition, unidentified. The alarm `#3fdcff` is **proposed** from the cover's bolt hue, not a sampled value.
- **The phosphor-green waiting ink `#bde3a1`** has no sample in the book: it is the jury's proposal (§2), a CRT's glow, chosen for the TV frame and for distance. The surface and raised tones are the jury's values, re-derived toward the sampled tank grey's hue, not sampled themselves.
- **Which edition the TCJ screenshots show**, and whether any edition after 1986 was recoloured (no evidence either way; the 2026 Deluxe is "remastered", colour unspecified).
- **Caption-box colours:** pale teal-grey on Batman's boxes in S-A against flat process cyan on Superman's in S-T. Whether the 1986 print used flat tints for captions is not confirmed.
- **Gouache or watercolour:** the sources split; the one listing of the original art says "mixed media".
- **No primary source on the TV device:** the readings of the talking heads and the colour code are Thurston's and Jameson's criticism. No Miller, Janson or Varley interview on them was found.
- **The two suits** (first with the oval, second with the big black bat): described by a fan wiki about the animated film; matched to the comic by our reading of reproductions only. **The emblem's proportions** (about 2.6:1, three scallops a side): from memory and small reproductions, to be traced from a clean image of the second suit, and compared with *Year One*'s bat at 64px, before drawing (jury §3.14). The chest bat's size in §7 follows from the traced aspect.
- **The armour's look** (pauldrons, a cape or not, ear stubs) and **the drop** as a Book One image: from reproductions and memory; check against the pages.
- **The horse splash** (Book Four, Batman leading the Sons of the Batman): seen in a TCJ reproduction; page not identified.
- **"The time has come."**: read in TCJ's reproduction of a Book One page; page number not identified.
- **The KLIK channel-flipping grid** and **the rounded TV frames with tail-less white boxes**: our reading of TCJ's reproductions, not a cited description. The KLIK page's book is inferred.
- **Miller's "bolt out of the blue" quotes:** read in Heritage's own magazine, interview date not stated.
- **Stamp widths:** measured with Pillow at 12px, not by the app's `fontMetrics` fixture. Every word is narrower than PERMISSION there; `stampWidth.test.ts` decides.
- **Decide on screen** (the jury's list, §7; options stay open until a labelled comparison image): the cyan alarm and the lit lens beside WATCHFUL PROTECTOR's; the phosphor-green waiting ink, also beside Clawd orange; the leap (or the horse) and the bolt at 54px, inside the header's clip; the static as "a set left on"; Bangers at 12px (its small `Z` in FROZEN); LATEST against NEW REPLY; DEAD AIR, FROZEN and OFF AIR side by side; the suit-grey belt against the Ash-belt option; the TV set's bezel beside the sleeping pose.

## 13. Sources

- Wikipedia, ["The Dark Knight Returns"](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns): credits, issue titles, the 16-panel grid, characters (Lola Chong, Lana Lang, Dave Endochrine), plot (the exoframe, the kryptonite arrow, the blackout), format and price.
- Wikipedia, ["Lynn Varley"](https://en.wikipedia.org/wiki/Lynn_Varley): watercolours (citing Manning, *DC Comics Year by Year*, 2010), awards.
- DC, ["How The Dark Knight Returns redefined comics"](https://www.dc.com/blog/2026-02-20/how-the-dark-knight-returns-redefined-comics), 20 Feb 2026: Miller on Batman's age.
- Robert Wilonsky, ["Batman's lightning bolt moment"](https://intelligentcollector.com/batmans-lightning-bolt-moment/), *Intelligent Collector* (Heritage Auctions), 2022: Miller on the cover, the silhouette and Varley's painting.
- [Intelligent Collector, the $2.4M sale](https://intelligentcollector.com/dark-knight-returns-cover-record-2400000/); [Antiques and the Arts, 21 Jun 2022](https://antiquesandthearts.com/lightning-strikes-with-batman-original-cover-art-at-heritage/); [Rehs Galleries](https://rehs.com/eng/?p=45227): the cover's medium.
- Jason Czernich, ["13 reasons 1986 was Frank Miller's year"](https://13thdimension.com/from-dark-knight-to-daredevil-13-reasons-1986-was-frank-millers-year/), *13th Dimension*, 27 Jan 2026: Bob Rozakis on the prestige format and the press runs.
- [ComicConnect, lot 1021408](https://www.comicconnect.com/item/1021408): Varley's colour art for Book Two, page 20, and its description. Sampled (S-A).
- [Wikipedia, cover of Book One](https://en.wikipedia.org/wiki/File:Batman_The_Dark_Knight_Returns_1_(February_1986).jpg) (non-free, fair use). Sampled (S-C).
- H. W. Thurston, ["The Dark Knight Returns: Art Makes Sense If You Force It To"](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/), *The Comics Journal*, 1 May 2019: the colour code, the TV, the reproductions. Sampled (S-T).
- A. D. Jameson, ["Reading Frank Miller's Batman: The Dark Knight Returns, part 2"](https://bigother.com/2010/02/08/reading-frank-miller%E2%80%99s-batman-the-dark-knight-returns-part-2/), *Big Other*, 2010: gouache, scene palettes.
- [Vice / Strip Panel Naked, the 16-panel grid](https://www.vice.com/en/article/why-the-16-panel-grid-is-the-holy-grail-of-action-comics/).
- Alex Zalben, ["Frank Miller and Klaus Janson reveal Dark Knight Returns secrets"](https://comicbookclublive.com/2026/02/20/frank-miller-and-klaus-janson-reveal-dark-knight-returns-secrets-and-easter-eggs-at-comicspro/), Comic Book Club, 20 Feb 2026: Miller on age.
- Charles Brownstein, ["Returning to the Dark Knight: Frank Miller interview, part 1"](https://www.cbr.com/returning-to-the-dark-knight-frank-miller-interview-part-1/), CBR, 21 Apr 2000: Bruce as "a very self destructive, tortured man".
- Editions: [mycomicscollection collecting guide](https://mycomicscollection.com/en/blog/dark-knight-returns-collecting-guide/); [Smash Pages, 17 Feb 2026](https://smashpages.net/2026/02/17/dc-comics-will-mark-40th-anniversary-of-the-dark-knight-returns-with-yearlong-celebration/); [My Absolute Collection, 2017](http://myabsolutecollection.blogspot.com/2017/03/batman-dark-knight-returns-collectors.html).
- Fan wiki (gap filler only): [DC Movies Wiki, Batsuit (The Dark Knight Returns)](https://dcmovies.fandom.com/wiki/Batsuit_(The_Dark_Knight_Returns)).
- Not read, for a later pass: Klaus Janson at [SKTCHD](https://sktchd.com/interview/the-moment-with-klaus-janson/) and [Comics Beat](https://www.comicsbeat.com/graphic-novel-club-klaus-janson-dark-knight-returns).
- Fonts: [Bangers description](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/DESCRIPTION.en_us.html), [METADATA](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/METADATA.pb), [Fontsource API](https://api.fontsource.org/v1/fonts/bangers); Oswald, Teko and Saira Condensed from the same repository (all OFL), considered and set aside (§4).
- The display name's origin (fan pages, §12): [Street Tech, *The Dark Knight Returns* text](https://www.streettech.com/bcp/BCPgraf/Media/batmanDNR.htm); [TV Tropes, quotes](https://tvtropes.org/pmwiki/pmwiki.php/Quotes/BatmanTheDarkKnightReturns).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-1.md`](jury-wave-1.md), [`jury-wave-2.md`](jury-wave-2.md) (and §9, the maintainer's decisions), [`year-one.md`](year-one.md), [`absolute-batman.md`](absolute-batman.md), [`arkham-asylum.md`](arkham-asylum.md), [`burton-1989.md`](burton-1989.md), [`knightmare-palette.md`](knightmare-palette.md), [`snyder.md`](snyder.md); `app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`; `app/test/themes.test.ts`, `themeContrast.test.ts`, `stampWidth.test.ts`; `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`.
