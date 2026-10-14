# Theme dossier: The Dark Knight Returns (1986)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Batman: The Dark Knight Returns* (Frank Miller, with Klaus Janson and Lynn Varley, DC, 1986), for Wave 2 (#118, LUC-79). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere. It is written against the shipped token tables in [`wave-2-brief.md`](wave-2-brief.md) §3 and the CSS on `main` at v1.2.0, not against the Wave 1 dossiers. The terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

The Wave 1 jury found DKR boxed in ([`jury-wave-1.md`](jury-wave-1.md) §3, §9): PALE MOONLIGHT holds the gold oval and the newsroom, WATCHFUL PROTECTOR the night blue, and lightning flashes cry wolf. This dossier's job is to find it a space of its own.

## 1. TL;DR

- **The Theme in one sentence:** the panel is a television left on in a dark room in 1986. Talking heads argue, the channels click past, static hums between them, and when something needs you the screen lights the colour of the lightning bolt the old man leaps across.
- **Display name:** **TRIUMPHANT** (recommended). **Credit:** "Frank Miller's The Dark Knight Returns (1986)". *The Dark Knight Triumphant* is the title of the second book, the one where the old man beats the Mutant leader in the mud ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)). It is a book title, not dialogue, so it does not spend the Theme's one short line. Alternatives in §5.
- **The space of its own:** broadcast, not print. PALE MOONLIGHT is a newspaper: editions, the desk, the wire, "— 30 —". This Theme is a TV: channels, live feeds, the anchor handing over, the station going off air, static, the 16-screen grid. Every Lexicon word and Voice line below is a TV word, never a press word.
- **Alarm color: Lightning cyan `#3fdcff`** (Palette A, recommended). It is the hue of the bolt's edge on the #1 cover (LCh hue 217–237°), pushed to full chroma, as KNIGHTMARE pushed Superman's shield. It sits 28.7 ΔE00 from WATCHFUL PROTECTOR's Blue Flame, 59.2 from Clawd orange and 47–76 from the other alarms (§3). **Palette B, Arcade magenta `#ff3fa4`,** is the fallback if the cyan reads too close to WATCHFUL PROTECTOR on screen; its source is weaker.
- **Ground:** Varley's green-grey, from her own hand-painted colour art for Book Two, page 20 (ink `#191b16`, tank grey `#3b403d`). LCh hue 135–140°, against WATCHFUL PROTECTOR's 262–265°. No night blue.
- **Working ink: Bone.** Waiting ink: Robin yellow, pale (`#e3dc86`), after Carrie Kelley.
- **Type:** **Bangers** (OFL), comic cover lettering, for the display and the stamps. Barlow Semi Condensed and JetBrains Mono stay.
- **Lexicon (broadcast):** Channel · Your cue · OK TO AIR? · BREAKING · OVER TO YOU · LATEST · FROZEN, with ON AIR / OFF AIR for a case opening and closing, and LIVE / STANDBY for working and idle (§6).
- **Bat-Clawd takes back DKR's own pieces:** the grey suit and the big black chest bat at rest, and **the armour as the alarmed Pose** (KNIGHTMARE shipped without it; Snyder borrowed it from Miller). **Signature pose: the lightning leap** (recommended): a mid-air leap held like the #1 cover, with a still bolt in Bone behind him, never a flash. Option B: the horse.
- **Atmosphere:** a new kind, **static**: sparse TV snow re-drawn each tick and a slow roll bar, lit from the screen. It needs an engine PR (§9).

**Open questions for the maintainer:**

1. **Alarm: Palette A, lightning cyan, or B, arcade magenta?** Decide in the picker beside WATCHFUL PROTECTOR: A's alarm is 28.7 ΔE00 from Blue Flame, its fill 18.5 from WATCHFUL PROTECTOR's fill and 12.9 from its mercury working ink. *Recommended: A.*
2. **Case → Channel, or keep Case?** *Recommended: Channel.*
3. **Permission: OK TO AIR?, GO AHEAD? (radio procedure, near WATCHFUL PROTECTOR's ops register) or the standard word?** *Recommended: OK TO AIR?*
4. **Waiting: OVER TO YOU** fits the margin room but is 4px wider than PERMISSION; the fallback YOUR TURN sits next to WATCHFUL PROTECTOR's YOUR MOVE. *Recommended: OVER TO YOU, if the width test passes.*
5. **Signature: the lightning leap** (held mid-air like a freeze-frame) **or the horse** (needs a prototype for size)? *Recommended: the leap.*
6. **Soft tier: pale Robin yellow** (12.2 from PALE MOONLIGHT's gold alarm) **or pale lightning cyan** (tiers differ by chroma only)? *Recommended: yellow.*
7. **Display name: TRIUMPHANT, A GOOD DEATH or BOLT FROM THE BLUE?** *Recommended: TRIUMPHANT.*
8. **The armour as the alarmed Pose, the grey suit and the big chest bat come home to DKR** (KNIGHTMARE shipped without them). Confirm, and tell *Absolute Batman* to keep its bulk out of armour plates. *Recommended: yes.*

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

Off the table: red (VENGEANCE, and KNIGHTMARE's crimson; the heartbeat `#ea2b17` is VENGEANCE's red), gold or yellow (PALE MOONLIGHT; Varley's own yellow samples as ochre), blue (WATCHFUL PROTECTOR), and anything near Clawd orange (the Mutant visor).

**Palette A, Lightning cyan (recommended).** Miller's own idea for the book is the bolt: "striking like lightning as a force for justice". The bolt's edge on the cover is a pale cyan at hue 217–237°; the alarm is that hue at full chroma, `#3fdcff` (hue 225°). It is not a flash: it is a colour that lights only when something needs you, like every Theme's alarm. The jury's ban was on lightning *flashes* (a flash with no news cries wolf), not on the colour.

**Palette B, Arcade magenta (fallback).** The neon of the Mutants' arcade and their visors on TV, `#ff3fa4`. Far from every shipped alarm except KNIGHTMARE's crimson (16.1, the same distance KNIGHTMARE keeps from VENGEANCE). Its source is weak: two later-printing screenshots and no line from the creators.

**Measured** (ΔE00, computed by us; the script is in the session scratchpad, `scripts-dkr/palette.py`):

| | VENGEANCE `#e3121b` | PALE MOONLIGHT `#f0c24b` | WATCHFUL PROTECTOR `#3d8bff` | KNIGHTMARE `#ff405f` | Clawd `#d77757` |
|---|---|---|---|---|---|
| **A alarm `#3fdcff`** | 75.6 | 47.3 | **28.7** | 75.4 | 59.2 |
| A fill `#12a9d6` (vs each `--signal`) | 65.4 | 48.5 | **18.5** | 66.3 | 51.1 |
| **B alarm `#ff3fa4`** | 29.1 | 60.9 | 40.4 | **16.1** | 29.1 |
| B fill `#c0166e` (vs each `--signal`) | 25.6 | 51.4 | 41.9 | **15.9** | 31.4 |

Against other inks: A's `#3fdcff` is 20.4 from WATCHFUL PROTECTOR's `--ink-hot` `#5aa9ff`, **12.9 from its working mercury `#7cc6c4`** and 17.2 from PALE MOONLIGHT's working steel `#8fb0d3`. B's `#ff3fa4` is 14.8 from KNIGHTMARE's `--ink-hot` `#ff5c72`.

**The honest risk of A** is WATCHFUL PROTECTOR. Its alarm is 28.7 away, far more than the 5–8 the jury accepted between the three red alarms, and the grounds differ in hue by 120°. But WATCHFUL PROTECTOR's *working* ink, mercury, is 12.9 from A's alarm: the same "one colour, two meanings across Themes" the jury met with 2022's amber and PALE MOONLIGHT's gold (§4.5), and settled by having the picker preview each Theme's alarm on a stamp. Decide it in the picker, with WATCHFUL PROTECTOR's folder next to this one (open question 1, §1).

### What `--signal` paints in this Theme

As in every shipped Theme since #72: only "needs you". The wordmark, focus, toggles, selection, the tab underline and progress go to `--accent` (Bone). Card hover borders take `--line`. The emblem in the header is Ash. The lightning-cyan fill lights the disc lens, the count chip (dark ink on it), the alarm stamps, the aura and the armour's power glow in the alarmed Pose. Nothing cyan at rest: the Signature's bolt is Bone, not cyan (§7).

### Token map (Palette A)

The 101 variables every shipped Theme sets (the intersection of the four stylesheets on `main`; `themes.test.ts` asserts them). **S-A / S-C / S-T** as above; **P** = proposed by us.

| Token | Value | Origin | Role |
|---|---|---|---|
| `--abyss` | `#0a0c09` | P: S-A ink black `#191b16`, darkened at its hue | Page |
| `--smoke` | `#0e110d` | P | Top gradients, notice foot |
| `--surface` | `#151a14` | P: S-A, between ink and tank shadow | Cards, notice top |
| `--raised` | `#20271f` | P: S-A tank shadow `#2b2f2c`, darkened | Card hover |
| `--line` | `#3b403d` | **S-A: tank grey**, as sampled | Rules, borders, card hover border |
| `--surface-deep` | `#0c0f0b` | P | |
| `--frame` | `#1a2019` | P | |
| `--header-fade` | `#0c0f0b` | P | |
| `--sheet-top` | `#1c221b` | P | |
| `--shadow` | `#000000` | P | |
| `--blood` | `#4f4b22` | P: Robin yellow in shadow | Disc hover border, waiting rule. Not the alarm |
| `--signal` | `#12a9d6` | P: A at lower lightness | Lit fill, count chip. Alarm only |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Alarm halo |
| `--signal-hot` | `#3fdcff` | P: **S-C bolt edge hue (217–237°) at full chroma** | Small lit pixels, lens ring |
| `--on-signal` | `var(--abyss)` | P | Dark ink on the cyan chip (7.17:1) |
| `--ink-hot` | `#3fdcff` | P: same as `--signal-hot`, no lift needed | OK TO AIR? and BREAKING stamps, hot pen |
| `--ink-soft` | `#e3dc86` | P: Carrie Kelley's yellow (S-T `#fce147`), paled and kept off PALE MOONLIGHT's gold | OVER TO YOU and LATEST stamps, soft pen |
| `--ink-live` | `var(--bone)` | P | Working |
| `--ink` | `#c3cbc1` | P | Secondary body text |
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
| `--bone` | `#eef1e8` | P: the white of the TV boxes, a hair green to sit on the ground | Text, working |
| `--ash` | `#949d92` | P: S-A greys lifted | Secondary text |
| `--bone-dim` | `var(--ink)` | P | |
| `--ash-dim` | `var(--ash)` | P | |
| `--chevron` | `var(--ash)` | P | |
| `--clawd-eye` | `var(--bone)` | P | |
| `--clawd-eye-dim` | `color-mix(in srgb, var(--clawd-eye) 18%, transparent)` | P | |
| `--cowl` | `#0d100e` | P: S-A ink | Cowl, cape |
| `--cowl-edge` | `color-mix(in srgb, #e8e1d9 22%, transparent)` | P: the neutral rim the Costume Rule asks for | |
| `--cowl-shine` | `var(--raised)` | P | |
| `--suit` | `#5d6661` | P: the second suit's grey (S-T `#3c4b4f`), lifted so the black bat reads on it (3.38:1) | |
| `--gloves` | `#0d100e` | P | |
| `--belt` | `#2b312d` | P | |
| `--buckle` | `var(--ash)` | P | |
| `--cape` | `#050605` | P | |
| `--cape-rim` | `var(--cowl-edge)` | P | |
| `--thread` | `var(--cowl-edge)` | P | |
| `--chest` | `#070807` | P | The big black bat |
| `--aura-core` | `color-mix(in srgb, var(--signal-hot) 90%, transparent)` | P | Alarmed only |
| `--aura-glow` | `color-mix(in srgb, var(--signal-hot) 55%, transparent)` | P | |
| `--emblem` | `var(--ash)` | P | Header bat, flat |
| `--disc-bat` | `var(--raised)` | P | Unlit bat in the glass |
| `--glass-shine` | `#1f261e` | P | |
| `--glass` | `var(--abyss)` | P | |
| `--disc-rim-inner` | `#060805` | P | |
| `--disc-rim-outer` | `var(--line)` | P | |
| `--lens-core` | `#f8feff` | **S-C: bolt core** | Lit lens centre |
| `--lens-rim` | `var(--signal)` | P | |
| `--lens-bat` | `var(--abyss)` | P | |
| `--lens-bat-edge` | `transparent` | P | |
| `--disc-lens` | scanlines over `radial-gradient(circle at 50% 45%, var(--lens-core), var(--signal-hot) 55%, var(--signal))` | P (§8) | |
| `--notice-top` | `var(--surface)` | P | |
| `--notice-foot` | `var(--smoke)` | P | |
| `--notice-hover-top` | `#232b22` | P | The lightest ground; every text token is checked on it |
| `--notice-hover-foot` | `#141913` | P | |
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
| `--folder-name-size` | `14px` | P | |
| `--folder-name-tracking` | `0.5px` | P | |
| `--wordmark-size` | `20px` | P: Bangers is condensed; check at header size | |
| `--wordmark-tracking` | `1.5px` | P | |
| `--wordmark-glow` | `color-mix(in srgb, var(--bone) 18%, transparent)` | P | |
| `--pen-hot`, `--pen-soft` | the shared wavy stroke in `#3fdcff` and `#e3dc86` | P | |
| `--stamp-tilt`, `--stamp-tilt-slight` | `0deg`, `0deg` | P: Bangers is already slanted; the box sits straight like a caption on a screen | |
| `--stamp-border` | `1px` | P | |
| `--stamp-size` | `12px` | P: Bangers is condensed (widths §6) | |
| `--stamp-weight` | `400` | P | |
| `--stamp-mask` | `none` | P: clean, like a TV caption box | |

Theme-only variables (read by its own painter and outfit, not shared): `--armor` `#3d4540` and `--armor-edge` `#7d877f` (§7), `--tv` `#2a3229` (the TV set's screen when off), `--static` `var(--bone)` (§9).

**Palette B** changes only the alarm family: `--signal-hot` `#ff3fa4`, `--signal` `#c0166e`, `--ink-hot` `#ff5cb0`, `--on-signal` `var(--bone)` (5.13:1), `--lens-core` `#ffe9f4`. Everything else stays.

### WCAG contrast (computed; WCAG 2 relative luminance)

`themeContrast.test.ts` checks every text colour on **eleven** grounds, not three; the lightest is `--notice-hover-top`. The table gives abyss, surface, raised and the worst of the eleven.

| Ink | on `--abyss` | on `--surface` | on `--raised` | Worst of 11 (`--notice-hover-top`) | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` `#eef1e8` (also accent, ink-live, in-progress) | 17.19 | 15.45 | 13.40 | 12.76 | Pass |
| `--ink` `#c3cbc1` (also bone-dim) | 11.81 | 10.62 | 9.21 | 8.77 | Pass |
| `--ash` `#949d92` (also ash-dim, chevron, stamp-quiet) | 7.01 | 6.30 | 5.47 | 5.21 | Pass |
| A `--ink-hot` / `--signal-hot` / `--stamp-hot` `#3fdcff` | 12.06 | 10.84 | 9.40 | 8.95 | Pass |
| A `--ink-soft` / `--stamp-soft` / `--brick` `#e3dc86` | 13.88 | 12.48 | 10.83 | 10.31 | Pass |
| B `--ink-hot` `#ff5cb0` | 6.93 | 6.23 | 5.40 | 5.15 | Pass |
| B `--signal-hot` `#ff3fa4` | 6.08 | 5.46 | 4.74 | **4.51** | Pass, barely |
| `--on-signal` on `--signal` | A: `#0a0c09` on `#12a9d6` **7.17** | B: `#eef1e8` on `#c0166e` **5.13** | | | Pass |
| `--clawd` `#d77757` (mascot, not text) | 6.23 | | 4.86 | | n/a |

No exceptions are needed. In Bat-Clawd: the black chest bat on the grey suit is 3.38:1 (above WCAG's 3:1 for graphics); the cowl against the orange jaw is 6.07:1.

**Tier separation.** Hot cyan and soft yellow are 42.0 ΔE00 apart. A pale-cyan soft ink (`#a9dff0`, the bolt's glow) was tried first: it is only 9.6 from the hot cyan, with a luminance ratio of 1.12, so the tiers would differ by chroma alone. The yellow is Carrie Kelley's, the kid who does the legwork while the old man is called. It is 12.2 from PALE MOONLIGHT's gold *alarm*; that is a cross-Theme "two meanings" again, smaller than 2022's amber (5.2), which the jury kept.

### The ground, against the shipped Themes

| Ground | LCh hue | vs VENGEANCE | vs PALE MOONLIGHT | vs WATCHFUL PROTECTOR | vs KNIGHTMARE |
|---|---|---|---|---|---|
| abyss `#0a0c09` | 135° | 2.5 | 2.5 | 3.0 | 4.3 |
| surface `#151a14` | 140° | 7.0 | 7.4 | 10.0 | 15.6 |
| raised `#20271f` | 140° | 18.1 | 11.5 | 12.5 | 20.4 |
| working: Bone `#eef1e8` vs each working ink | 123° | 29.6 (amber) | 25.0 (steel) | 22.0 (mercury) | 10.2 (bone) |

Every near-black is close to every other in ΔE; that is why the jury judges the ground family as well as the number. WATCHFUL PROTECTOR's surface and raised sit at hue 262–265°; this Theme's at 140°. The difference is a green-grey against a blue-grey, as Varley's tank is against Nolan's night. **Not asylum green:** chroma 1.4–6.7, a grey, not the saturated green the jury gave the Arkham games (§10).

## 4. Type

John Costanza's hand lettering and the cover's title lettering are not reproduced; no commercial comic face is used. All faces below are OFL-1.1, on Google Fonts and Fontsource (`"license":"OFL-1.1"` from the [Fontsource API](https://api.fontsource.org/v1/fonts/bangers)).

| Role | Proposal | Licence / package | How close, and limits |
|---|---|---|---|
| Display (wordmark, headlines, intro) | **Bangers** 400 (new) | OFL-1.1, `@fontsource/bangers`, Vernon Adams | "designed in the style of mid-20th century superhero comics cover lettering" ([description](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/DESCRIPTION.en_us.html)). Slanted, condensed brush capitals: the register of the cover's yellow title and of the book's sound effects (KLIK, BUDDABUDDA), not a copy of either. Caps only |
| Stamps | **Bangers** 400 at 12px, straight box, no wear | same | One family for display and stamps, as KNIGHTMARE does with Archivo. A stamp reads like a word set over a TV picture. Check on screen at 1x: its `Z` is drawn small, so FROZEN must be judged |
| Labels under 19px | Barlow Semi Condensed (shared) | already bundled | KNIGHTMARE found a display face too wide for short labels; Bangers is narrow, but Barlow is the safe default |
| Body, report body | Barlow Semi Condensed (shared) | already bundled | The bulletin is plain working text, as in KNIGHTMARE |
| Mono | JetBrains Mono (shared) | already bundled | The Machine Voice Rule holds |

**Fallback for the stamps:** Saira Condensed 600 (OFL), not taken by any Theme. It is a condensed grotesque, the register of Anton and Big Shoulders, so it would score "~" on Type against VENGEANCE and WATCHFUL PROTECTOR; use it only if Bangers fails at 12px. Oswald and Teko have the same problem. Shantell Sans (OFL, a marker hand) was considered for a caption-box feel and rejected: it reads as handwriting, not lettering.

## 5. Voice

**Frame: a TV broadcast, late at night.** The panel is the set. The user is the anchor, the cases are channels, and the Voice is the studio's: the anchor, the pundits who disagree, the station signing off. Short, dry, a little satirical, as the book is about its talking heads. It never speaks like a newspaper (no editions, no desk, no wire, no "Story") and never like an ops room (no clearance, no sitrep). Gordon belongs to *Year One* and stays out. No real or fictional station, anchor or host is named.

**How broadcast differs from PALE MOONLIGHT's newsroom, concretely:**

| | PALE MOONLIGHT (print) | TRIUMPHANT (broadcast) |
|---|---|---|
| Time | the edition: "Late edition", "— 30 —" | live: "LIVE · 02:14", "Stay tuned" |
| Unit | a Story on your desk | a Channel, on air or off |
| Handing over | Approval, Question | OK TO AIR?, OVER TO YOU |
| People | an editor, a reporter | an anchor, a panel of pundits |
| Texture | paper, a typewriter in the report | a screen: static, the roll bar, rounded TV frames |

**Sample lines** (all ours; `words.ts` field in brackets):

1. Intro tagline: **"Live, from Gotham."** [`tagline`]
2. Empty state: **"Our panel agrees: nothing needs you."** The hint stays "Nothing needs you right now." [`empty.quiet.title`] The pundits finally agree, which is the joke.
3. No cases: "No channels on the air." With the Lexicon off: "No cases on the air." [`empty.noCases.title`, through the Terms]
4. Night Report name: **"Bulletin"** [`report.name`]
5. Dateline: **"LIVE · 02:14"**: time only, no place (WATCHFUL PROTECTOR's is "GOTHAM · 02:14") [`report.dateline`]
6. Section heads: "Your segment" for what waits on the user, "Around the dial" for the rest [`report.signature`, `report.caseNotes`]
7. Close: "Stay tuned. Some of it still needs you." or, with nothing waiting, "That's the bulletin. Good night, Gotham." [`report.end`]
8. Quiet disc tooltip: "Nothing on tonight." Lit: "We interrupt this program." Each followed by the standard tooltip [`signal.openTip`]
9. Settings kicker: "Control room" [`settings.kicker`]; Atmosphere toggle: "Static", hint "TV static behind the channels" (the term from the Terms, so "behind the cases" with the Lexicon off) [`settings.atmosphere`]
10. The Signature caption, once per session: **"The time has come."** Four words from Book One, the voice in Bruce's head the night he returns (reproduced in [TCJ](https://www.tcj.com/the-dark-knight-returns-art-makes-sense-if-you-force-it-too/)). It is the Theme's one short line.

*Dark* and *quiet* mean only "nothing needs you" (jury §4.3); no line above uses them for a stalled channel.

**Display name options:**

| Name | What it alludes to | Cost |
|---|---|---|
| **TRIUMPHANT** (recommended) | Book Two's title, *The Dark Knight Triumphant* | A title, not dialogue: the one line stays free for "The time has come." Unique in the picker; no "Dark Knight" (Nolan) and no "Returns" (Burton's sequel) |
| A GOOD DEATH | Book One's best-known caption, "This would be a good death…" | Spends the line budget; morbid next to a stalled or closed case |
| BOLT FROM THE BLUE | Miller on the cover's lightning | Not from the comic itself; "blue" points at WATCHFUL PROTECTOR |

Credit string for `themes.test.ts`: `{ name: 'TRIUMPHANT', film: "Frank Miller's The Dark Knight Returns (1986)" }`. Proposed Theme id `the-dark-knight-returns-1986`, demo flag `triumphant`.

## 6. Lexicon

Frame: a TV station's control room. The test is the jury's (§5): a tired developer glancing at a stamp must get the standard meaning, at the right severity.

| Standard | Themed | Misread at a glance? | Fallback |
|---|---|---|---|
| Case | **Channel** (plural **Channels**) | A Slack channel, a Go channel, a release channel: all "a stream you follow", which is right. "Channel #b47c0d" reads like a channel number | Keep **Case** (KNIGHTMARE's precedent: fewer renames) |
| Needs you | **Your cue** ("1 cue for you", "3 cues for you") | Heard as "your queue", which still means "things waiting for you" | On you is WATCHFUL PROTECTOR's; keep standard |
| Permission | **OK TO AIR?** | "Air" is TV slang, but "OK …?" carries it: something asks for an OK before it runs. A question, so it reads as blocking | **GO AHEAD?** (clearer, but radio procedure, near WATCHFUL PROTECTOR's ops register) |
| Error | **BREAKING** | Two readings: "something is breaking" (right) and "breaking news" (new, urgent). Both read as at least as severe as Error. The risk is confusing it with LATEST; colour helps (hot cyan against soft yellow) | **BROKEN** |
| Waiting | **OVER TO YOU** | The anchor's handover: your turn to speak. Not "on hold" | **YOUR TURN** (but it sits next to WATCHFUL PROTECTOR's YOUR MOVE) |
| New reply | **LATEST** | A developer may read "latest version"; on a card under a reply line it reads as "the latest reply" | **JUST IN** is PALE MOONLIGHT's; keep standard NEW REPLY |
| Stalled | **FROZEN** | A frozen feed, a hung process: exactly "stalled". It does not use *dark* or *quiet*. "Feature freeze" is a possible but unlikely reading | **DEAD AIR** (vivid, but "dead" may read as an error) |
| Case opened / closed | **ON AIR** / **OFF AIR** | Clear. OFF AIR means ended, which is what closed means | standard |
| Working / Idle / Shell (live state) | **LIVE** / **STANDBY** / Shell | LIVE is "running now", in Bone, never cyan. STANDBY is "ready, nothing running": the right reading for Idle. (The jury rejected ON HOLD for *Waiting*, where parked was the wrong meaning; for Idle it is the right one) | standard |

**Widths** (our measurement with Pillow on Bangers at the proposed 12px; the test's own measurement in `stampWidth.test.ts` is what counts). Room in the Night Report margin is 101px at 0.12em and 87px at 0.04em in the narrowest panel; PERMISSION in Bangers is 77.3 / 67.7.

| Word | 0.12em | 0.04em | |
|---|---|---|---|
| OK TO AIR? | 74.0 | 64.4 | fits |
| BREAKING | 65.7 | 58.0 | fits |
| OVER TO YOU | 81.3 | 70.7 | fits the room, but **4px wider than PERMISSION** |
| LATEST | 50.3 | 44.6 | fits |
| FROZEN | 53.7 | 47.9 | fits |
| YOUR CUE | 63.9 | 56.2 | fits |
| LIVE / STANDBY / SHELL | 35.4 / 60.3 / 43.9 | 31.6 / 53.6 / 39.1 | fit |
| ON AIR / OFF AIR | 50.3 / 54.5 | 44.6 / 47.8 | fit |

Windows notifications and the tray keep the standard words, as `CONTEXT.md` requires.

## 7. Bat-Clawd

The body, eyes, arms and legs keep their pixels. Clawd's orange jaw and white eyes stay in every Pose, including the Signature (so the Signature is not a full silhouette, whatever the cover does). The grid is 16×11 units; one unit is about 2px at 54px.

### The suit: the second suit, and the old man's bulk

The Theme takes back what Snyder borrowed and KNIGHTMARE shipped without (`suits.ts` has no armour, and KNIGHTMARE's chest bat is 4.4 units on a charcoal suit inside a duster). These are Miller's. KNIGHTMARE keeps the desert, the duster, the goggles and the Knightmare.

- **Cowl:** black (`--cowl`), with short ears **set wide**, at the head's outer corners (x = 3 and x = 12, one unit each) instead of x = 4 and 11: a broad, boxy old head, not a pointed one. The brow row heavy (`...cccchhcccc...`, shine in the middle). A faint neutral rim (`--cowl-edge`) per the Costume Rule.
- **Suit:** the second suit's grey (`--suit` `#5d6661`).
- **The big black bat:** the chest emblem layer at `cx 8, cy 6.6`, **9 units wide**, rows 6–8: nearly the whole chest, twice KNIGHTMARE's 4.4. One orange-free row of grey shows above it under the cowl, so it never reads as the cowl dripping (the jury's §6 fix for Snyder). No oval, ever.
- **Belt:** a 1-unit band at y = 8.5 in `--belt` with an Ash buckle (`...bbbbkkbbbb...`), grey on grey: no yellow, so nothing reads as PALE MOONLIGHT's brass.
- **Cape:** black, heavy, to the ankles, with **two long tails**: one deep point at each outer corner reaching a unit below the feet (y = 12), the hem straight between them. Not VENGEANCE's zigzag, not PALE MOONLIGHT's scallops, not WATCHFUL PROTECTOR's plain straight hem, not KNIGHTMARE's duster. Standing: `M3 5 L13 5 L14.6 12 L12.6 11 L3.4 11 L1.4 12 Z`.

### Poses

| Mood | Pose | Source | On the grid |
|---|---|---|---|
| sleeping | **Retired, in front of the TV** | Book One opens with Bruce retired, flipping channels (the KLIK grid) | The shared seated pose, cape wrapped (with the two tails), eyes shut. Beside him on the overlay layer, a small 1986 TV set: a 4×3.5-unit box at x = 13–17, y = 6.5–10, bezel in `--line`, screen in `--tv`, a 1-unit V antenna on top. The screen shows two or three Bone specks at 20%: the static of a set left on. Every part is at least 1 unit |
| flying | **The drop** | Book One: he comes down from above with the cape spread over him (TCJ reproduction) | Arms raised, gloves at the cape's edges; the cape spread **above** his head like a canopy, from x = −3 to 19, peaking at y = −3, its two tails hanging at the sides. Legs straight below. Two frames: the canopy's edge a unit higher, then lower. Every other Theme's flying cape spreads sideways or trails behind; this one is overhead |
| alarmed | **The armour** (homage pose) | Book Four's "exoframe" against Superman ([Wikipedia](https://en.wikipedia.org/wiki/The_Dark_Knight_Returns)) | Outfit map in two new legend letters: `A` armour plate (`--armor` `#3d4540`) and `e` its edge (`--armor-edge` `#7d877f`). Pauldrons 2×1.5 units at x = 1 and x = 13 (a unit past the body each side), the chest bat raised on the plate, the cowl's ears cut to a 1-unit stub, eyes still white 2×1. The cape behind, thrown back. **Aura in lightning cyan**, as the armour powers up. The wider shoulders make an outline nobody else has: PALE MOONLIGHT raises wings, WATCHFUL PROTECTOR flings the cape open, KNIGHTMARE swings the coat |
| perch | **Signature pose**, below | | |

### Signature pose: the lightning leap (recommended)

The Book One cover, as a pose. The cover is already a frozen leap; the perch holds it like a freeze-frame on a screen.

Reveal, on the 8 fps clock (a step = two ticks, a quarter second):

1. **On the ledge:** standing profile-right, the cape bunched, the body a unit lower (`translateY(2px)` at the header's scale).
2. **Launch:** the whole figure rotated −15° and raised 2 units; legs drawn tucked (the four leg pixels at y = 9 only, knees up); the right glove forward as a fist at (14, 5); the cape streaming back and up in one heavy sheet to (−4, 1), its two tails apart.
3. **The bolt:** a jagged path behind him on the overlay layer, from (12, −6) down through (9.5, −1), (11.5, −0.5), (7.5, 5), (9.5, 5.5) to (5, 14), stroked 1 unit wide in **Bone at 60%**. It is drawn once, whole, and stays: no flicker, no flash, no change of the panel's light.
4. **Held:** the same, the bolt at 40%. This is the final step `watchOn` holds on the perch. His glances: ahead (`look: GAZE`) and down to the street (`lookY: 0.4`).

Under reduced motion: step 4 only. The intro and a click play the same reveal; a click adds the caption "The time has come." once per session.

**Why its outline differs from the four taken:** VENGEANCE stands symmetric and front-on; PALE MOONLIGHT stands three-quarter looking up; WATCHFUL PROTECTOR crouches with a ring; KNIGHTMARE stands with the coat blown to one side. This is the only Signature off the ground, tilted, with a diagonal line through it. **The bolt must be checked on screen** at 54px: it is a static Bone line, not the Alarm color and not a flash, but it is long, and it must not read as a crack in the window.

**Option B: the horse.** Batman rearing on horseback at the head of the Sons of the Batman, Book Four. Bat-Clawd sits astride (his legs hidden); the horse on the overlay layer: body 10×4 units under him (y = 8–12), neck and head rising to the left to (−3, 2), forelegs raised (−1 to 2, y 6–9), hind legs down to y = 15. Two gallop frames, then he rears and holds. Its outline is unique in the Wave and the most "fan" image, but it is about 20×16 units, half again Bat-Clawd's box; at 54px the horse's legs are 1-unit lines and the header may not have the room. **Recommendation: the leap.** Prototype the horse only if the maintainer wants it, perhaps as the flying Pose instead of the drop.

**Option C, rejected: the old man in the rain.** It is the book's mood, but rain is VENGEANCE's Atmosphere, and a hunched standing figure is close to VENGEANCE's and KNIGHTMARE's outlines.

## 8. Emblem

**Shape (the second suit's bat, drawn by us):** a wide black bat with no oval, about 2.6:1, read from the reproductions in §2 (proportions **unverified**, §12). Short ears on a flat, broad head; the wings reaching out nearly level, their upper edge rising slightly to the tips; the lower edge in three scallops per side, separated by points; a short pointed tail. It must differ from KNIGHTMARE's `BAT_2016` at 54px, which descends from it: DKR's is flatter and wider, with level wings, where the BvS bat sweeps its wing horns up and drops to a deep V. Drawn as a left half on the 120×48 grid and mirrored at x = 60, finish `none`, like the others. The tray and toast icons stay single (jury §2).

**The 64px Signal disc: a TV screen.**

- **Unlit:** dark glass (`--glass` → `--glass-shine`), the bat a shade in it (`--disc-bat`). Faint horizontal scanlines here (a 1px line every 3px at 6% Bone) would need an engine change: `Signal.css` paints the unlit face with a fixed radial gradient and has no overlay slot. Either add a `--glass-overlay` variable there (an engine item, §9), or leave the unlit face plain. Recommended: plain, and see on screen whether the lit scanlines are enough.
- **Lit:** the screen comes on: `--lens-core` (the bolt's white) at the centre → lightning cyan → `--signal` at the rim, the black bat across it, `--signal-glow` around. The scanlines ride over the lit lens for free: `--disc-lens` is a list of backgrounds, and KNIGHTMARE already layers `--lens-breaks` (its broken glass) on top of its gradient there; this Theme puts a scanline SVG in `--lens-breaks` the same way. The count sits in a cyan chip in dark ink.
- No flash on lighting: the existing 0.4s background transition only.

## 9. Atmosphere

**Static, between channels** (recommended). A new kind, `static`.

- **What moves:** sparse TV snow. About 0.5 specks per 1000 px² (about 70 in a 320×440 panel), 1px, in `--static` (Bone) at alphas 0.04–0.10, **re-placed every tick** on the shared 8 fps clock from a precomputed table (frame-indexed, like the snow), not random per frame. They do not fall; they flicker in place, which is what makes them static and not snow or ash.
- **The roll bar:** one soft horizontal band 24px tall, Bone at 3%, drifting down 3px a tick (one pass of a 440px panel in about 18 seconds), as an old set's picture rolls.
- **The light:** the TV's own glow, low and centred (`--haze-inset` `auto -10% -40% -10%`), neutral Bone at 5%, never cyan. VENGEANCE's light comes from below in red, PALE MOONLIGHT's from below in smog, WATCHFUL PROTECTOR's from below in mercury, KNIGHTMARE's from above in sand; this one is a cold white glow in front of the viewer.
- **Gating:** as every Theme since #81: it moves only while the pointer is over the window and for a few seconds after news, `still: 'calm'` like KNIGHTMARE's ash, and shows nothing under reduced motion.

**The engine PR needs:** a `StaticAtmosphere` type in `atmospheres.ts` (`color`, `density`, `alphas`, `bar: { height, alpha, step }`) and its painter in `renderer/src/painters.ts`. Optional: a `--glass-overlay` variable on the unlit disc face in `Signal.css`, if the maintainer wants scanlines on the dark disc (§8). Everything else in this dossier (the armour, the TV set, the bolt, the lit lens's scanlines, the stamp shape) uses layers, legend letters and variables the engine already has.

**One risk:** static is the picture of "no signal". It shows only while the user looks and after news, and it is dim; the Voice calls it "between channels", and the disc tooltip at rest says "Nothing on tonight". Check on screen that it reads as a set left on, not a broken one.

**Rejected alternatives:**
- **A wall of 16 small screens** (the grid as a still scene, one screen changing channel every few seconds): the strongest image of the book's grid, but mechanically it is WATCHFUL PROTECTOR's lit windows (a still grid where one cell switches each second), so it would score "=" on Atmosphere against it. The grid can live elsewhere: a Night Report divider, or the picker preview.
- **Rain:** the book's first night is a storm, but rain is VENGEANCE's kind and would score "~" against it.
- **Snow of the blackout:** PALE MOONLIGHT's kind.

## 10. Distinctiveness

Scored by the jury's rules (§1): C = clearly different, ~ = close, = = same; a Theme stays only with C on at least three axes against every other.

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| TRIUMPHANT – VENGEANCE | C: green-grey vs pure black; cyan vs red (75.6); Bone vs amber | C: Bangers / Bangers vs Anton / Special Elite | C: wide-set ears, two-tail cape, 9-unit black bat on grey vs red-edged cowl, jagged hem, dash bat; a leap vs a front-on stand | C: flickering static and a roll bar, white glow in front vs diagonal rain, red glow below | C: a broadcast with a Lexicon vs Bruce's journal with none. One line, "The time has come.", is Bruce's inner voice: keep it to the Signature click | **5** |
| TRIUMPHANT – PALE MOONLIGHT | C: green-grey vs smog brown; cyan vs gold (47.3); Bone vs steel. The soft yellow is 12.2 from PALE MOONLIGHT's gold | C: no family shared | C: no oval, no brass belt, big black bat; two tails vs scallops; leap vs three-quarter look-up | C: specks that flicker in place vs flakes that fall; glow in front vs smog below | **~**: both are news media at night. The frame differs (broadcast vs print), the Lexicon shares no word, the register is satire of TV vs a wry editor. Honest score: close | **4** |
| TRIUMPHANT – WATCHFUL PROTECTOR | C (narrow): ground hue 140° vs 263°; Bone vs mercury; but **both alarms are blue-family** (28.7) | C: Bangers vs Syncopate / Big Shoulders Stencil | C: wide ears, two tails, big flat bat vs thin ears, straight hem, a relief bar; leap vs crouch and ring | C: flicker and roll vs a still skyline; white glow in front vs mercury below | C: TV studio vs ops briefing. Watch the overlap words: GO AHEAD? and STANDBY lean towards radio procedure; OK TO AIR? is preferred for that reason | **5** |
| TRIUMPHANT – KNIGHTMARE | C: green-grey vs scorched brown (15.6–20.4); cyan vs crimson (75.4); Bone working in both | C: Bangers vs Archivo | C: a cape vs no cape; 9-unit bat vs 4.4 inside a duster; armour vs swung coat; leap vs standing | C: static vs ash on the wind | C: broadcast vs a veteran with Alfred | **5** |

**First guesses against the other Wave 2 Themes** (their dossiers are being written now):

- ***Absolute Batman*:** the big risk is bulk. Both are huge, physical Batmen. Here the bulk shows only in the armour (alarmed) and the wide-set ears; Absolute should own the giant body every day, the axe and Frank Martin's colour. If Absolute also wants armour plates or a 9-unit chest emblem, the maintainer decides. Palette risk is low unless Absolute takes a cyan or a green-grey.
- ***Year One*:** same writer, so the Voice risk is Miller's hard-boiled captions. This Theme takes the TV and leaves captions to *Year One* (with Gordon's half, per the brief); its one caption line is only on the Signature click. Richmond Lewis's flat colour against Varley's painted colour; low palette risk.
- ***Arkham Asylum*:** both are "painted" books. This Theme uses the painted quality only in its sources and in the lit lens's gradient; texture, collage and photographs are Arkham Asylum's. Type risk: if Arkham Asylum picks a lettering face, it must not be a comic-cover face like Bangers; Gaspar Saladino's distorted hand is a different register. Ground: this Theme's green-grey has chroma under 7, so it does not claim asylum green.

## 11. Legal note

- **Trademark (DC):** Batman, the bat symbols, "Gotham", and the title *The Dark Knight Returns*. The credit names the work nominatively; the display name is a book's subtitle word, not its logo. The emblem is redrawn by us as a vector after the second suit's bat, credited as a DC trademark in the README and NOTICE, as for the other Themes.
- **Copyright to avoid:**
  - The cover art: no tracing of the silhouette, the bolt or the composition. The Signature pose is Bat-Clawd's own figure on his own grid, and the bolt is our own path.
  - Varley's paintings and every panel: sampled for colour in a scratch folder, never shipped, never reproduced.
  - The title lettering and Costanza's lettering: Bangers is a different, open face.
  - Character art and likenesses (Carrie Kelley, the Mutants, the Joker, Superman): not drawn. Carrie appears only as a colour.
  - Dialogue: one four-word line, "The time has come.", is the ceiling. The book's other famous lines ("This would be a good death…") are not used.
- **Not named:** Lola Chong, the TV station, the talk show, the Mutants or the Sons of the Batman in any UI text. The Voice says "our panel", not a show's name.
- **No weapons:** the horse option carries no rifle; the armour has no weapon.
- **Style, free to use:** TV broadcast language ("live", "on air", "stay tuned"), static, scanlines, a 4×4 grid, a lightning-coloured light, comic cover lettering as a genre.
- **Fonts:** Bangers is OFL-1.1 ([METADATA](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/METADATA.pb)). Bundle its licence text with the existing Fontsource ones.
- **Images used in this research:** the ComicConnect photo of the colour art, the Wikipedia cover scan, the TCJ screenshots and two Vice/Strip Panel Naked stills, in a scratch folder outside the repo. None ships.

## 12. Unverified items

- **Every printed hex.** No 1986 printed interior page was sampled. S-A is a photo of paint before printing (board tone and camera cast); S-C is a 256px cover scan of an unstated printing; S-T is a later edition, unidentified. The alarm `#3fdcff`, the soft `#e3dc86` and the B magenta are **proposed** from those hues, not sampled values.
- **Which edition the TCJ screenshots show**, and whether any edition after 1986 was recoloured (no evidence either way; the 2026 Deluxe is "remastered", colour unspecified).
- **Caption-box colours:** pale teal-grey on Batman's boxes in S-A against flat process cyan on Superman's in S-T. Whether the 1986 print used flat tints for captions is not confirmed.
- **Gouache or watercolour:** the sources split; the one listing of the original art says "mixed media".
- **No primary source on the TV device:** the readings of the talking heads and the colour code are Thurston's and Jameson's criticism. No Miller, Janson or Varley interview on them was found.
- **The two suits** (first with the oval, second with the big black bat): described by a fan wiki about the animated film; matched to the comic by our reading of reproductions only. **The emblem's proportions** (about 2.6:1, three scallops a side): from memory and small reproductions, to be traced from a clean image of the second suit before drawing.
- **The armour's look** (pauldrons, a cape or not, ear stubs) and **the drop** as a Book One image: from reproductions and memory; check against the pages.
- **The horse splash** (Book Four, Batman leading the Sons of the Batman): seen in a TCJ reproduction; page not identified.
- **"The time has come."**: read in TCJ's reproduction of a Book One page; page number not identified.
- **The KLIK channel-flipping grid** and **the rounded TV frames with tail-less white boxes**: our reading of TCJ's reproductions, not a cited description. The KLIK page's book is inferred.
- **Miller's "bolt out of the blue" quotes:** read in Heritage's own magazine, interview date not stated.
- **Stamp widths:** measured with Pillow at 12px, not by the app's `fontMetrics` fixture. OVER TO YOU is 4px wider than PERMISSION.
- **On screen, not yet seen:** Bangers at the header and at 12px stamps (its small `Z`); the cyan alarm in the picker beside WATCHFUL PROTECTOR; the soft yellow beside Clawd orange; the 9-unit chest bat; the bolt at 54px; the TV set beside the sleeping pose; the static at 8 fps.

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
- Fonts: [Bangers description](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/DESCRIPTION.en_us.html), [METADATA](https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/METADATA.pb), [Fontsource API](https://api.fontsource.org/v1/fonts/bangers); Oswald, Teko, Saira Condensed and Shantell Sans from the same repository (all OFL).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-1.md`](jury-wave-1.md), [`burton-1989.md`](burton-1989.md), [`knightmare-palette.md`](knightmare-palette.md), [`snyder.md`](snyder.md); `app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`; `app/test/themes.test.ts`, `themeContrast.test.ts`, `stampWidth.test.ts`; `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`.
