# Theme dossier: Batman: Year One (1987)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Batman: Year One* by Frank Miller (script), David Mazzucchelli (art), Richmond Lewis (colour) and Todd Klein (letters), first printed in *Batman* #404–407 (cover dates February–May 1987). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere, written against the four shipped Themes' real tokens ([`wave-2-brief.md`](wave-2-brief.md) §3) and the Wave 1 jury's binding decisions ([`jury-wave-1.md`](jury-wave-1.md) §10). It was also checked against the drafts of the *Absolute Batman* and *Arkham Asylum* dossiers that appeared in this folder while it was written (§10). The terms are those of [`CONTEXT.md`](../../../CONTEXT.md). Issue #118, Linear LUC-79.

## 1. TL;DR

- **The Theme in one sentence:** Gordon's notebook from his first year in a crooked city: an olive-grey Gotham of grime and smoke, his canary caption paper, the light grey first suit with no oval, and the magenta of the 1987 newsprint kept for the one thing that needs you.
- **Display name: BECOME A BAT.** **Credit:** "after Frank Miller and David Mazzucchelli's *Batman: Year One* (1987)". The name is a fragment of the book's best-known line, Bruce's answer when the bat breaks the study window (§12 on its wording). Alternatives: **FIRST YEAR** (plain, safe) and **BROKEN WINDOW** (the bat through the glass, and the 1982 "broken windows" policing theory, which suits a cop story; but "broken" may read as a fault in the picker). The title *Year One* stays in the credit.
- **The way out of VENGEANCE: Gordon's half.** VENGEANCE owns Bruce's journal, red on pure black and the typewriter. Year One has two narrators, told apart by their captions: Gordon's are yellow boxes in printed letters, Bruce's are white boxes in cursive ([Comic Watch, Gebel, 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat)). This Theme takes Gordon's: an upright printed hand for the stamps and the Night Report, his canary paper for the soft tier and the report's headings, and his voice (wry, weary, a little afraid, a family man). It also takes the book's dated scene breaks ("May 19", "June 7"): the Night Report's dateline becomes the month and the day, nothing else.
- **Alarm color: Newsprint Magenta**, `#ff4dd2` for lit pixels, `#ff6ad9` for stamps, `#e04ac0` for fills. The 1987 pinks are tints of the magenta printing plate on newsprint; this is that magenta at full strength, turned 16° toward violet. It is *proposed*, not sampled (§3). It sits 23.2 ΔE00 from KNIGHTMARE's crimson, 35.9 from VENGEANCE's red and 34.6 from Clawd orange. The truer process-pink (`#ff4fa3`) lands 4.1 from the draft *Arkham Asylum* claret, so it is offered as the alternative if that Theme moves (§3). Magenta appears nowhere at rest.
- **Palette:** an olive-grey ground (`#0b0c08` / `#161a10` / `#222817`), after the 1987 #404 cover and the recolour's khaki greys; newsprint Bone `#ecebdc` for text and for running work; Gordon's canary `#e6e08a` for what waits on you.
- **Type:** **Permanent Marker** (Apache-2.0) for the masthead, a blunt marker after Mazzucchelli's "dumb lines"; **Neucha** (OFL) for stamps, headings and the Night Report, an upright printed hand after Gordon's captions. Barlow Semi Condensed and JetBrains Mono stay; the dateline sets in Barlow bold, after the book's typeset dates.
- **Lexicon:** Case, Needs you and Stalled stay. **SIGN HERE** (Permission), **GONE WRONG** (Error), **SEE ME** (Waiting), **MEMO** (New reply).
- **Bat-Clawd:** the first suit. A light grey body (the only light suit), blue-black cowl, cape, gloves and **trunks**, a capsule belt, and a big plain black bat on the chest with no oval. The cape hem is *feathered*: many thin, uneven points, after the brushed cape on the #405 cover.
- **Signature pose: "The swarm".** He stands while a cloud of bats rises around him from his left and peels away, leaving three over his left shoulder. It honours the tenement siege, where he calls the bats from the cave to escape (§7). The bats carry the outline, scattered and lopsided.
- **Atmosphere:** smoke rising from the street (a new `smoke` kind), olive-grey, under a smog haze from below. Bats were the first idea and are dropped: the *Absolute Batman* draft takes bats as its Atmosphere (§9).
- **Engine PR:** the `smoke` Atmosphere kind; a boxed Night Report heading (`--caption-paper`, `--caption-ink`); a `--font-dateline` token (the dateline inherits the report face today); a headline font token so the caps-only marker sets only the wordmark (the *Absolute* draft asks for the same token); optionally a halftone grain per Theme. **Theme PR:** the CSS, fonts, words, suit and a 1987 emblem path.
- **What it leaves *The Long Halloween* (Wave 3):** holidays as the calendar (Year One takes the plain month and day), Tim Sale's heavy solid blacks, the Roman and the mob as a frame, and a palette of its own (§10).

## 2. Visual identity and sources

What makes this version recognisable, in order of strength:

1. **Richmond Lewis's colour, twice.** Lewis coloured the four issues for newsprint, then recoloured the whole story for the first collected edition in 1988, "something that's incredibly rare for the original colorist to do" ([DC.com, Rosie Knight, 29 Mar 2024](https://www.dc.com/blog/2024/03/29/the-woman-whose-colors-brought-batman-year-one-to-life-twice)). Her only interview on it, in DC's *Direct Currents* #1 (early 1988), is quoted there:
   - "I wanted to bring a sense of drama to the story, from simple color to the more complex. But overall, it's pretty restrained. I tried to use a limited palette, so you won't see every color on every page, except in those places where the full range is called for."
   - "I tried to use the color to follow the storytelling. There are quiet places in the story that have quiet color, while a loud, fast-paced big bang sequence is going to be colored to bring out the art's impact."
   - "The trick is in trying to control it, to keep to the simplicity of newsprint color while using the fuller range available in process...but only where it's needed."
   - DC's article describes the 1987 version's "neon-hued cityscapes and pink-dappled puddles", "a nighttime landscape [of] gorgeous grime", and the recolour as "far more noir-ish and grounded": "Gone were the bright neons and in came a spectrum of shadowy hues" (Knight's words, not Lewis's). Nerdist adds that the originals have pink skies with teal reflections and Gordon "in dark blue shadow with yellow highlights", and that the recolour leans "more into reds and oranges than pinks" ([Nerdist, Knight, 28 Mar 2022](https://nerdist.com/article/richmond-lewis-batman-year-one-legacy-colorist/)).
   - How the recolour was made: "Richmond hand-painted the color art separately from the black line art" (caption printed beside her colour plate for *Batman* #406 page 2, reproduced on the fan site [Ultimate Batman Comics](http://ultimatebatmancomicswebsite.weebly.com/batman-year-one-coloring.html); the book it comes from is not named there).
2. **Mazzucchelli's line.** He drew "with a simplified line" to leave room for colour (*Direct Currents*, summarised by [Comic Book Daily, VanderPloeg, 2016](https://comicbookdaily.com/collecting-community/bound-together/time-capsule-dc-direct-currents-1-january-1988); the full text was not readable). In his introduction to the 2024 Artist's Edition he writes that "without my art-partner these lines are just a skeleton" ([The Slings & Arrows, Woodrow Phoenix](https://theslingsandarrows.com/?p=125965)). A review of that edition reports that he used "a nib that didn't come to a point to achieve his 'dumb lines'" ([Comic Watch, Gebel, 14 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-year-one-artists-edition-spotlights-the-genius-of-david-mazzucchelli); secondhand).
3. **Two narrators.** Gordon arrives by train and Bruce returns on the same day, January 4 ([Canavese, Groucho Reviews, 2008](https://www.grouchoreviews.com/features/58)). "Gordon gets a yellow caption box in printed letters, as though they're notes sprawled on cheap canary legal pads"; Bruce's are "sharp white boxes and tight, beautiful cursive" ([Comic Watch, Gebel, 15 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat)). Scene breaks carry dates set in bold type straight onto the art, mixed case, with no box: "May 19" and "June 7" are visible in the comparison scans on [Ultimate Batman Comics](http://ultimatebatmancomicswebsite.weebly.com/batman-year-one-coloring.html). They look like Helvetica Bold (our reading; the face is not credited anywhere found).
4. **The first suit and the bats.** A bat "crashes through a window and settles on the bust", and Bruce takes it as his sign; later, trapped in a condemned building during a police bombing and SWAT raid, he "uses a signal device to attract a swarm of bats from the Batcave" ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_Year_One)). He is an average, inexperienced man whose costume is "too big" (same). The 1987 covers show the suit: light grey body, black cowl and cape, capsule belt, trunks, no oval (#405 and #407 covers, read from [DCU Guide](https://dcuguide.com/Batman_404) scans; fan wiki).
5. **Gotham's corruption.** Gordon "resists the corruption of Gotham City cops with every fiber of his being" ([Canavese](https://www.grouchoreviews.com/features/58)); the two men "face the depths of corruption and crime in Gotham" ([Gebel](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat)).

**Credits.** Story Frank Miller, art David Mazzucchelli, colour Richmond Lewis, letters Todd Klein, editor Dennis O'Neil; *Batman* #404–407, cover dates February–May 1987 ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_Year_One); [DCU Guide](https://dcuguide.com/Batman_404) gives #404 as February 1987, while the Wikipedia cover file says January). Covers by Mazzucchelli; the Grand Comics Database credits Lewis with the cover colours too (via [Capt. Can Comics](https://www.captcancomics.ca/products/apr09-24-1260), reproducing GCD issue 42449; comics.org itself returned 403).

### Editions, and which one the colours come from

| Edition | Colour | Artist's view |
|---|---|---|
| *Batman* #404–407, 1987 | Lewis's newsprint colour, four-colour process on newsprint | Hers. Replaced by her own recolour in every collection until 2016 |
| Hardcover and trade, 1988 (DC, Warner, Titan) | Lewis's hand-painted recolour, full process | Her choice. Mazzucchelli: shiny paper "was never part of the original design, dating back to the 1988 hardcover" (via [TCJ](https://www.tcj.com/david-mazzucchelli-disavows-forthcoming-batman-reprint/)) |
| Deluxe Edition, 2005 (HC; TPB 2007) | the 1988 recolour, cleaned | Mazzucchelli and Dale Crain "worked for months to try to make a definitive version" (same) |
| Deluxe Edition, 2012 | printed "from corrupted, out-of-focus digital files", recoloured cover | **Disavowed** by Mazzucchelli ([TCJ, Dan Nadel, 5 Mar 2012](https://www.tcj.com/david-mazzucchelli-disavows-forthcoming-batman-reprint/)) |
| Absolute Edition, 2016 | Book One: the recolour "remastered with new, high-resolution scans of the original coloring by David Mazzucchelli and Richmond Lewis"; Book Two: the 1987 version "reproduced from scans made by Mazzucchelli and Lewis from the printed comic book pages" ([DC](https://www.dc.com/graphic-novels/batman-year-one-1987/absolute-batman-year-one)) | Both made by the artists |
| Deluxe Edition, new edition, 2017 | the recolour, with "Richmond Lewis's color samples" in the extras ([DC](https://www.dc.com/graphic-novels/batman-year-one-1987/batman-year-one-the-deluxe-edition-new-edition)) | Not stated |

**A correction to the brief.** The brief speaks of "Richmond Lewis's own 2005 recolour". The recolour is from **1988**; 2005 is a cleaned reprint of it. Both colourings are Lewis's, and the 2016 Absolute reproduces both from the artists' own scans. The one she chose for the collections, and the one Mazzucchelli and Crain worked to make definitive, is the 1988 recolour. This dossier takes its ground from colours found in both, its suit from the 1987 covers, its canary from the recolour, and its alarm from the 1987 newsprint (§3 argues each).

## 3. Palette

**Provenance key.** Every hex was sampled by us (Python and Pillow: median RGB of a region with ink-black line art and white paper dropped; "sat15" is the median of the region's 15% most saturated pixels) from compressed JPEG or PNG scans. None is a measurement of a printed page. The scripts live in the session scratchpad, not the repo. Sources:

- **R-DC**: the 1988 recolour, from three interior pages DC published with its 2024 article (700×1080 JPEG; no halftone and a painted texture, so digital files of the painted colour). DC does not say which restoration (2005, 2016 or 2017).
- **R-UBC**: the 1988 recolour, "the published page from the collected edition" (edition unnamed), fan-site scans of 300–580px, and Lewis's hand-painted colour plate for #406 page 2.
- **N-UBC**: the 1987 newsprint, scans of the printed issues on the same fan site (halftone visible).
- **C87**: the 1987 covers: #404 from Wikipedia (sourced there to DC Universe Infinite) and DC's 2024 banner crop of it (3000px, halftone rosette visible); #405–407 from DCU Guide (fan wiki).
- **P**: proposed by us.

### What the two colourings look like (sampled)

| Colour | Hex | Edition, page, method |
|---|---|---|
| Teal dusk sky | `#498f93`, `#4a959d` | R-DC, the chase at dusk (the old woman and the truck), median |
| Steel-blue sky | `#77a0af` | R-DC, the tenement bombing, helicopter panels, median |
| Violet shadow on Gordon | `#7282a2` | R-DC, same page |
| Salmon panel; pink-salmon smoke | `#d67575`; `#de8b76` | R-DC, same page |
| Explosion orange | `#de834a` | R-DC, same page |
| Police light | `#bc4847` | R-DC, the riot in the rain |
| Gordon's caption, canary | `#ebecc2`, `#f1f2c7` | R-DC, the chase page, the box paper |
| Gordon's caption, cream | `#f4efde`, `#e6e5d8` | R-DC, the riot page |
| Olive-greys | `#a6a698` (darker half `#575545`), h 103–109°, 18% of the page | R-UBC, the "Flass and Gordon" page, low-saturation pixels with green above blue |
| The same page in 1987 | `#8b8773`, h 100° | N-UBC, same filter |
| Indigo night | `#343c70` (sat15 `#1d3182`) | R-UBC, #406 page 2 ("June 7") |
| Teal | `#5e9393` | R-UBC, Lewis's colour plate for #406 page 2 |
| Canary caption | `#cec57e` (sat15 `#c5b64d`) | R-UBC, the "May 19" page |
| Pink | `#b46079` (sat15 `#97284f`), h 2–4° | N-UBC, #406 page 2, pink pixels |
| Rose panels | `#b6475f` (sat15 `#c6384f`), h 12–19° | N-UBC, the "May 19" page |
| Coral | `#f78b7d` | N-UBC, the Catwoman fight page |
| Olive ground | `#44493d`, `#575d4b`, h 122–125° | C87, #404 cover background |
| Violet coat | `#78628b` | C87, #404 cover |
| Lavender ground; grey cape | `#a695a7`; `#5f595e` | C87, #405 cover |
| Grey suit; grey-teal cape | `#919b9b`; `#738585` | C87, #407 cover |
| Lavender cowl, brick red, brown-black | `#b29792`, `#883c2c`, `#301d0f` | 2017 Deluxe cover (DC product image), 8-colour quantisation |

Read plainly: **the recolour is blue at night** (indigo, steel, teal) with khaki greys, lavender, salmon and canary; **the 1987 newsprint is pink and magenta** with cream, yellow and the same khaki greys. Four of these are already someone else's: the blues and teal are WATCHFUL PROTECTOR's ground and mercury; the salmon, orange and brick sit on Clawd orange, which the Wave keeps as the only warm colour at rest; and the indigo-violet and lavender are what the *Arkham Asylum* and *Absolute Batman* drafts both chose as their ground and working ink (§10). What is left, and is in both of Lewis's colourings, is the **khaki grime** (h 100–125°) and Gordon's **canary**. The alarm comes from the newsprint.

### The ground: Gotham grime

`#0b0c08` / `#161a10` / `#222817`, hue 120–127°. It sits between the recolour's khaki greys (h 103–109°) and the #404 cover's olive (h 125°), darkened to a panel ground. It is the "gorgeous grime" of DC's own description, and it is the one ground family no shipped Theme and no Wave 2 draft uses: VENGEANCE and PALE MOONLIGHT are warm black and brown, WATCHFUL PROTECTOR steel blue, KNIGHTMARE scorched brown, the two drafts violet.

**Risk: the Arkham games (Wave 3).** The jury gave "asylum green" to the games as their way in (jury §9). This ground is a yellow-olive khaki at low chroma (C 7–12), not a green; asylum green is presumably a stronger, bluer green. The maintainer should decide now whether a khaki ground leaves the games enough room (§10).

### The Alarm color: Newsprint Magenta

The brief says to prefer the edition the artist approved. For the alarm we argue for the newsprint, for four reasons:

1. **The recolour has no free alarm colour.** Its reds (police light `#bc4847`, the fight's `#bc2a40`) are VENGEANCE's and KNIGHTMARE's family; its salmon and orange are Clawd's; its canary is PALE MOONLIGHT's neighbour.
2. **The 1987 colouring is Lewis's too,** and the artists themselves scanned it for the 2016 Absolute. It is not a lesser edition, only an earlier one, and DC remembers the book by its "pink-dappled puddles".
3. **The newsprint pinks are tints of the magenta printing plate.** Process magenta (`#ec008c`) sits at h 354°. Pushed to full screen strength at that hue it is `#ff4fa3`.
4. **The plain rose fails on distance.** The sampled rose (h 12–19°) lifted to pass contrast (`#e85a73`) lands 5.7 from KNIGHTMARE's `--signal-hot` and 4.7 from its ink; `#ff6378` is 1.3 from KNIGHTMARE's ink.

**Two options, both proposed (not sampled):**

| Option | `--signal-hot` | vs KNIGHTMARE | vs VENGEANCE | vs Clawd | vs draft *Arkham* `#ec5c94` | Notes |
|---|---|---|---|---|---|---|
| **A2. Newsprint Magenta (recommended)** | `#ff4dd2`, h 338° | 23.2 | 35.9 | 34.6 | **11.9** | Process magenta turned 16° toward violet; 13.2 from `#ec008c`, 19.5 from the sampled 1987 pink. "Neon", as DC describes the 1987 pages |
| A1. Newsprint Pink | `#ff4fa3`, h 354° | 15.2 | 28.7 | 27.7 | **4.1** | The truer hue (process magenta's). Choose it only if *Arkham Asylum* moves off claret |

The *Arkham* draft turned McKean's wine red 25° toward claret to clear KNIGHTMARE, and landed on process-magenta's hue. Year One has the sourced claim to pink (it is printed on its pages); Arkham's claret is a shift. The jury should settle who moves. Until then this dossier recommends A2, which keeps every alarm in the app at least 11.9 apart.

**Its ladder (A2):**

- `--signal-hot` `#ff4dd2`: lit pixels, the lens's middle ring, live dots. A text colour in the contrast test; 5.23:1 at its lowest.
- `--ink-hot` `#ff6ad9`: permission and error stamps, the hot pen; 6.01 at its lowest.
- `--signal` `#e04ac0`: the lit disc, the header's count chip (with `--on-signal` abyss ink at **5.52:1**), the aura.
- `--blood` `#5a1a4c`: the magenta "off", deep plum, for the lens rim only.

### Token map

Every variable a shipped Theme sets, in the order of `the-dark-knight-2008.css`, plus this Theme's own.

| Token | Value | Origin (edition) | Role in this Theme |
|---|---|---|---|
| `--abyss` | `#0b0c08` | P: between the recolour's khaki greys (`#575545`, R-UBC) and the #404 cover's olive (`#44493d`, C87), darkened | Page |
| `--smoke` | `#0f110b` | P | Top gradients |
| `--surface` | `#161a10` | P, same family | Cards, row hover |
| `--raised` | `#222817` | P | Card hover |
| `--line` | `#3a4128` | P | Rules, borders |
| `--surface-deep` | `#0e100a` | P | Gradient ends |
| `--frame` | `#1a1e13` | P | Edges |
| `--header-fade` | `#0e100a` | P | Header fade |
| `--sheet-top` | `#1a1e13` | P | Sheet top |
| `--shadow` | `#000000` | as every Theme | Shadows |
| `--blood` | `#5a1a4c` | P | Alarm off-shade: lens rim only |
| `--signal` | `#e04ac0` | P | Alarm fill |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Halo, alarm only |
| `--signal-hot` | `#ff4dd2` | P: the 1987 newsprint magenta (N-UBC pinks, process magenta), pushed (above) | **The Alarm color** |
| `--on-signal` | `var(--abyss)` | P | Count on the magenta chip (5.52:1) |
| `--ink-hot` | `#ff6ad9` | P, lifted | Hot stamps and pen |
| `--ink-soft` | `#e6e08a` | Gordon's canary: `#ebecc2`/`#f1f2c7` (R-DC), `#cec57e` (R-UBC), chroma raised to read as ink | SEE ME and MEMO stamps, soft pen, the waiting rule, the caption boxes |
| `--ink-live` | `var(--bone)` | P, as KNIGHTMARE | Running work in plain newsprint white; the stamp word carries the tier |
| `--ink` | `#d4d3c2` | P | Night Report body |
| `--accent` / `--accent-hot` | `var(--bone)` | P, as the Wave 1 Themes | Wordmark, focus, toggles, tab underline |
| `--accent-deep` | `var(--line)` | P | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 14%, transparent)` | P | |
| `--selection` | `var(--line)` | P | Selected text (Bone on Bone would vanish) |
| `--progress-deep` / `--progress-hot` | `var(--line)` / `var(--bone)` | P | Progress is not an alarm |
| `--thumb` | `var(--abyss)` | P | Switch thumb |
| `--brick` | `var(--ink-soft)` | P | |
| `--stamp-hot` / `--stamp-soft` / `--stamp-quiet` | `var(--ink-hot)` / `var(--ink-soft)` / `var(--ash)` | P | Stamp inks by tier |
| `--in-progress` | `var(--bone)` | P | Running task glyph |
| `--in-progress-glow` | `color-mix(in srgb, var(--bone) 40%, transparent)` | P | |
| `--danger` | `var(--raised)` | P, as KNIGHTMARE | Quit hover stays a shadow |
| `--waiting-rule` | `color-mix(in srgb, var(--ink-soft) 55%, var(--surface))` | P | The canary rule beside what waits |
| `--report-rule` | `var(--line)` | P | Report margin rule |
| `--clawd` | `#d77757` | Claude Code's `clawd_body` | Mascot body |
| `--bone` | `#ecebdc` | P: newsprint white; the recolour's pale paper (`#edeedf`, R-UBC) | Text, working |
| `--ash` | `#9d9b86` | P: the khaki grey lifted | Secondary text |
| `--bone-dim` | `#d0cfbd` | P | Log lines |
| `--ash-dim` / `--chevron` | `var(--ash)` | P, aliased as KNIGHTMARE does, so no exception is needed | |
| `--clawd-eye` / `--clawd-eye-dim` | `var(--bone)` / 18% of it | as every Theme | White eyes |
| `--cowl` | `#1c1f2e` | P: blue-black; the 1987 covers show it near black (§12) | Cowl, gloves, boots, trunks |
| `--cowl-edge` | `color-mix(in srgb, var(--bone) 24%, transparent)` | P | Neutral rim (Costume Rule) |
| `--cowl-shine` | `#363a4c` | P | |
| `--suit` | `#9a9e9a` | the 1987 #407 cover grey (`#919b9b`, C87), lifted a step | The first suit's light grey |
| `--gloves` | `var(--cowl)` | P | |
| `--belt` / `--buckle` | `#c2b86a` / `var(--cowl)` | P: canary dimmed; pouches with dark gaps | The capsule belt (§7) |
| `--cape` | `#15172a` | P | Cape cloth |
| `--cape-rim` / `--thread` | `var(--cowl-edge)` | P | |
| `--chest` | `var(--abyss)` | P | The big black chest bat (7.22:1 on the suit) |
| `--aura-core` / `--aura-glow` | 90% / 55% of `--signal-hot` | P | Magenta aura, alarmed only |
| `--emblem` | `var(--suit)` | P | The masthead bat in the first suit's grey (7.22:1 on abyss) |
| `--disc-bat` / `--glass-shine` / `--glass` | `var(--raised)` / `var(--surface)` / `var(--abyss)` | P | Unlit disc |
| `--disc-rim-inner` / `--disc-rim-outer` | `#070805` / `var(--line)` | P | |
| `--lens-core` / `--lens-rim` / `--lens-bat` / `--lens-bat-edge` | `#ffc2ee` / `var(--blood)` / `var(--abyss)` / `transparent` | P | Lit lens (§8) |
| `--notice-top` / `--notice-foot` | `#141810` / `var(--smoke)` | P | Notice card |
| `--notice-hover-top` / `--notice-hover-foot` | `#1f2415` / `#11140c` | P | |
| `--haze` / `--haze-edge` | 12% / 4% of `--smog` | P | Smog lit from the street |
| `--haze-inset` | `auto -20% -35% -20%` | P | From below |
| `--grain-opacity` | `0.045` | P | Grain (halftone, if the engine learns it, §9) |
| `--searchlight` | `var(--bone)` | P | Intro |
| `--smog` (own) | `#575d4b` | C87, #404 cover olive, sampled | The haze's colour |
| `--smoke-puff` (own) | `#5b6150` | P, the same lifted | Atmosphere smoke (3.06:1 on abyss: shapes, not text) |
| `--caption-paper` / `--caption-ink` (own, engine) | `var(--ink-soft)` / `var(--abyss)` | Gordon's caption boxes | Night Report headings (§5), 14.38:1 |
| Fonts | `--font-display: 'Permanent Marker'`, `--display-weight: 400`, `--font-body` Barlow Semi Condensed, `--font-type: 'Neucha'`, `--font-mono` JetBrains Mono, `--font-report` and `--font-stamp: var(--font-type)`, `--font-label: var(--font-body)` | §4 | |
| Type settings | `--heading-case: none`, `--font-case-title: var(--font-body)`, `--case-title-weight: 600`, `--folder-name-size: 15px`, `--folder-name-tracking: 0.5px`, `--wordmark-size: 19px`, `--wordmark-tracking: 1px`, `--wordmark-glow: 18% bone` | P, to judge on screen | |
| Pens | `--pen-hot` stroke `#ff6ad9` 1.5, `--pen-soft` stroke `#e6e08a` 1.1 | P | |
| Stamp shape | `--stamp-tilt: 0deg`, `--stamp-tilt-slight: 0deg`, `--stamp-border: 1px`, `--stamp-size: 12px`, `--stamp-weight: 400`, `--stamp-mask: none` | P: a caption is lettered straight, in a thin box, clean | |
| `--disc-lens` | hard-stop radial: `--lens-core` 0–34%, `--signal-hot` 34–68%, `--signal` 68–100% | P (§8) | |

Not set (other Themes' own): `--rain`, `--snow`, `--tower`, `--mercury`, `--horizon`, `--ash-fall`, `--dust`, `--plate`, `--mesh`, the coat and goggle variables, `--flame`, `--clawd-shadow`, `--emblem-plate(-rim)`, `--lens-edge`, `--lens-breaks`.

### What `--signal` paints in this Theme

Only the alarm: the lit disc, the count chip, live alert dots, the aura while alarmed, hot stamps and the hot pen. The wordmark, focus rings, toggles, sliders, the card-hover border, the tab underline and the sheet's spill take `--accent` (Bone) or neutrals, as in the other Wave 1 Themes. Progress and running work are Bone. Nothing on Bat-Clawd is magenta at rest; his pouch belt is a dim canary.

### WCAG contrast (computed, WCAG 2.x)

Every text token on every ground `themeContrast.test.ts` checks (abyss, smoke, surface, surface-deep, raised, header-fade, sheet-top, notice-top, notice-foot, notice-hover-top, notice-hover-foot). The three main grounds and the minimum:

| Ink | on `--abyss` | on `--surface` | on `--raised` | lowest of 11 | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` (= `--ink-live`, `--in-progress`, `--accent`) `#ecebdc` | 16.33 | 14.70 | 12.63 | 12.63 (raised) | Pass |
| `--bone-dim` `#d0cfbd` | 12.47 | 11.22 | 9.64 | 9.64 | Pass |
| `--ink` `#d4d3c2` | 12.98 | 11.68 | 10.04 | 10.04 | Pass |
| `--ash` (and `--ash-dim`, `--chevron`, `--stamp-quiet`) `#9d9b86` | 6.98 | 6.28 | 5.40 | 5.40 | Pass |
| `--signal-hot` `#ff4dd2` | 6.77 | 6.09 | 5.23 | 5.23 | Pass |
| `--ink-hot` (`--stamp-hot`) `#ff6ad9` | 7.77 | 6.99 | 6.01 | 6.01 | Pass |
| `--ink-soft` (`--brick`, `--stamp-soft`) `#e6e08a` | 14.38 | 12.94 | 11.12 | 11.12 | Pass |
| `--on-signal` abyss on `--signal` `#e04ac0` | | | | 5.52 | Pass |
| `--caption-ink` abyss on `--caption-paper` `#e6e08a` | | | | 14.38 | Pass |

No exceptions. The Theme ships clean. (Option A1's `#ff4fa3` also passes: 4.99 on this raised.)

**Tier separation inside the Theme** (ΔE00): hot magenta to canary 65.0, hot magenta to Bone 42.5, canary to Bone 17.1. Running work and the soft tier are both pale; their hues differ (lemon against near-white) and the stamp word carries the tier, as in KNIGHTMARE.

**On Bat-Clawd** (contrast): the black chest bat on the grey suit 7.22; the cowl on the suit 6.02; the cowl on Clawd's jaw 5.19; the belt's pouches against their dark gaps 8.06. The suit and the jaw are 27.2 ΔE00 apart in hue (grey against orange), so the jaw reads.

### ΔE00 against the shipped Themes and Clawd

Computed by us with CIEDE2000 (our implementation passes Sharma, Wu and Dalal's test pairs and reproduces the jury's own figures, for example `#ff405f`–`#e3121b` = 14.6).

| Year One token | VENGEANCE | PALE MOONLIGHT | WATCHFUL PROTECTOR | KNIGHTMARE | Clawd `#d77757` |
|---|---|---|---|---|---|
| Alarm `--signal-hot` `#ff4dd2` | 35.9 | 65.2 | 37.7 | 23.2 | 34.6 |
| `--ink-hot` `#ff6ad9` | 34.5 | 62.7 | 42.1 | 21.4 | 34.0 |
| `--abyss` `#0b0c08` | 2.6 | 2.3 | 3.4 | 4.0 | |
| `--surface` `#161a10` | **7.9** | **7.9** | 12.1 | 15.8 | |
| `--raised` `#222817` | 19.6 | 12.0 | 17.5 | 20.9 | |
| Working (Bone) `#ecebdc` | 27.1 (amber) | 27.0 (steel) | 22.7 (mercury) | **7.3** (Bone) | 34.4 |
| Soft `--ink-soft` `#e6e08a` | 48.3 | 26.4 | 23.1 | 17.3 | 38.3 |

Every shipped alarm against Year One's: VENGEANCE `#e3121b` 35.9 / `#ec2a2a` 33.6 / `#af0006` 42.8; PALE MOONLIGHT `#f0c24b` 65.2 / `#d29336` 55.1; WATCHFUL PROTECTOR `#3d8bff` 37.7 / `#5aa9ff` 44.1 / `#2f7fe0` 39.8; KNIGHTMARE `#ff405f` 23.2 / `#ff5c72` 21.4 / `#a8102f` 35.9. The canary is 12.8 from PALE MOONLIGHT's gold alarm `#f0c24b`: a pale lemon against a warm gold, and it is a waiting ink here, never the alarm.

**Where it is close, and why it passes.** All abysses sit 2–5 apart, as the shipped ones already do (VENGEANCE and WATCHFUL PROTECTOR are 2.0 apart). The surface is 7.9 from both VENGEANCE and PALE MOONLIGHT, but the raised tone (19.6, 12.0) and the hue (olive at 120–127° against their warm 43–73°) part them, and against both the alarm and the working ink differ, so the palette axis is C (two of three). Against KNIGHTMARE the working ink is the same idea (Bone, 7.3 apart), but the ground (15.8 / 20.9) and the alarm (23.2) differ: C.

**Palette options for the maintainer** (judge on screen, labelled):

- **A. Gotham grime and Newsprint Magenta (recommended):** the tables above.
- **B. Violet and Newsprint Pink:** the first draft of this dossier: a violet-black ground (`#0c0a12` / `#181424` / `#251e35`) after the recolour's indigo night, lavender working ink. It sits **1.3 / 1.7 / 2.2 ΔE00 from the draft *Arkham Asylum* ground** and 0.8 / 3.3 / 3.6 from the draft *Absolute Batman* one, and its lavender is 6.2 from *Absolute*'s. Three Themes on one violet would repeat the Nolan–Snyder convergence. Rejected unless both drafts move.
- **C. Newsprint:** a warm rose-black ground (`#0f0b0d` / `#1e1619` / `#2e2126`) with cream text. Its surface sits 5.8 from VENGEANCE's and 6.1 from PALE MOONLIGHT's: back among the warm blacks Wave 1 owns.
- **D. Teal dusk:** the recolour's most recognisable night (`#498f93`). It is WATCHFUL PROTECTOR's mercury and the "teal detective-mode look" the brief reserves for it. Not proposed.

## 4. Type

No lettering from the book is used. Todd Klein's captions are hand-lettered and his own, and the book's logo is DC's. All faces below are on Fontsource and Google Fonts, licences checked through the [Fontsource API](https://api.fontsource.org/v1/fonts/neucha) on 2026-10-14.

| Role | Proposal | Licence / package | Why, and how close |
|---|---|---|---|
| Display (wordmark, intro) | **Permanent Marker** 400 (new) | **Apache-2.0**, `@fontsource/permanent-marker` (Latin) | "the look and feel of a favorite writing instrument" ([description](https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/DESCRIPTION.en_us.html)). Blunt, even strokes with round ends: the nearest open face to a nib "that didn't come to a point". Not Klein's lettering, not the logo. **Caps only** (its lowercase is small capitals, measured), so it should set only the wordmark and the intro; see the headline token below. Ships with an Apache NOTICE, as Syncopate does |
| Stamps, headings, Night Report | **Neucha** 400 (new) | OFL-1.1, `@fontsource/neucha` (Latin, Cyrillic) | An upright printed hand, mixed case, clean at small sizes. Its designer made it as a quick handwritten face ([description](https://raw.githubusercontent.com/google/fonts/main/ofl/neucha/DESCRIPTION.en_us.html)). It has the register of Gordon's captions (upright printed letters) without copying Klein's hand. As the whole Night Report body (12.5px) it may tire the eye: if it does on screen, `--font-report` falls back to Barlow and Neucha keeps the stamps and the caption-box headings |
| Dateline | Barlow Semi Condensed 700 (kept) | OFL, bundled | The book's dates are typeset, in what looks like Helvetica Bold. Barlow, a grotesque already in the app, stands in with no new family. Today `.report__dateline` inherits `--font-report` (`NightReport.css`), so this needs a `--font-dateline` token in the engine PR (default `var(--font-report)` in the shipped Themes) |
| Body | Barlow Semi Condensed (kept) | OFL | |
| Mono | JetBrains Mono (kept) | OFL | The Machine Voice Rule holds |

**Neither family is taken** by a shipped Theme (brief §2), and neither is used by the Wave 2 drafts in this folder: *Arkham Asylum* uses IM Fell English SC and Patrick Hand SC, *Absolute Batman* Bungee, Bangers and Shantell Sans. Patrick Hand was this dossier's first choice and was dropped because *Arkham*'s Patrick Hand SC is the same design in small caps.

**The headline token.** `--font-display` also sets the empty-state title and the sheet titles (20px). In a caps-only marker, "Quiet so far. I don't trust it." would shout. The *Absolute* draft asks the engine PR for a `--font-headline` token (defaulting to `--font-display` in the four shipped Themes); this Theme would point it at Neucha, so the titles read as Gordon's hand. If the token isn't added, Year One accepts marker capitals in its titles or sets the display to Neucha too and drops the marker.

**Stamp widths, roughly measured** (Pillow at 1000 units, letter spacing ignored). In Neucha, PERMISSION is 0.81 of Special Elite's PERMISSION at the same size, and the widest word any stamp here may say (CASE OPENED, a standard notice) is 0.89. Special Elite's own widest word is 1.07 and fits today, so Neucha at `--stamp-size: 12px` (0.97 of Special Elite at 11px) should fit everywhere. `stampWidth.test.ts` decides.

**Alternatives considered** (widest stamp word against Special Elite's PERMISSION): **Kalam** Regular or Bold, OFL, 1.06–1.07 (a felt-tip hand, but slanted: Gordon's captions stand upright); **Gochi Hand**, OFL, 1.04 (a loose marker, too casual for stamps); **Architects Daughter**, OFL, 1.17 (too wide); **Handlee**, OFL, 1.23 (too wide); **Just Another Hand**, Apache-2.0, 0.65 (tall, narrow, very light at 12px); **Caveat Brush** for display, OFL (brushier, but cursive, which is Bruce's half); a Helvetica-like grotesque for display after the typeset dates (truer to the one piece of type in the book, but a heavy grotesque is KNIGHTMARE's Archivo register, so type would drop to ~ against it).

**The risk:** three Wave 2 dossiers now use a hand face somewhere (*Arkham* its stamps, *Absolute* its report, Year One its stamps and report). The faces differ (small caps, a designed hand, an upright printed hand), but the jury should look at all three stamp sets side by side.

## 5. Voice

**Who speaks.** Gordon, writing his notes: first person, present tense, plain. What separates him from VENGEANCE's Bruce is the man, not the tense. Bruce is bleak and sure; Gordon is wry, tired, a little scared and honest about it, a family man in a department he cannot trust. He jokes at his own expense. He is not on a mission; he is trying to get through the year. He does not send the user to bed (VENGEANCE, WATCHFUL PROTECTOR and KNIGHTMARE all do), does not say "go home" (the *Absolute* draft's close), and never uses ops words (WATCHFUL PROTECTOR's Gordon gives briefings; this one keeps a notebook). *Quiet* and *dark* mean only "nothing needs you" (jury §4.3).

**The dated caption.** The Night Report's dateline becomes the book's device: the month and the day, nothing else, as its scene breaks print them ("May 19", "June 7"). It sets in Barlow bold, mixed case, straight on the page, with no box: "October 14". That differs from the standard "TUE 14 OCT · 02:14", PALE MOONLIGHT's LATE EDITION, WATCHFUL PROTECTOR's "GOTHAM · 02:14" and the drafts' "NIGHT SHIFT · 02:14" and "ROUNDS · 02:14". The report's headings go into Gordon's canary caption boxes (`--caption-paper`, dark ink, Neucha), the engine's one new style for this Theme.

**Sample lines** (ours; none quotes the book):

1. Empty state title: "Quiet so far. I don't trust it." (The hint stays "Nothing needs you right now.")
2. No cases: "No cases open. Enjoy it while it lasts."
3. Nothing heard, but the plugin may miss sessions: "Nothing on the radio. That proves nothing."
4. Night Report name: **"Notebook"**.
5. Dateline: **"October 14"**.
6. Heading for what awaits the user: "Needs your signature" (it matches SIGN HERE). Heading for running work: "On the street".
7. Nothing awaits: "Nothing needs your signature. They can manage without you tonight."
8. Close, when something waits: "That's all I've got. Somebody still needs you." When nothing does: "That's all I've got. Nobody's waiting on you."
9. Intro tagline: "First year on the job." It is true of both men.
10. Unlit Signal tooltip: "Quiet on the radio."
11. Settings kicker: "The squad room". Atmosphere toggle: "Smoke", hint "Smoke off the street behind the cases".
12. Footnote when a case closes: "Case closed. One honest thing today."

**The book's own words.** Only the display name, BECOME A BAT, a three-word fragment of Bruce's line. No other line appears: not as the Signature's hover (its screen-reader label is "Bat-Clawd in a swarm of bats"), and not Gordon's last-page beat, whose wording no source gives verbatim.

## 6. Lexicon

Frame: Gordon's notes and a precinct's plain words, a note left on a desk. Every term was checked against a tired developer's glance (jury §5), against the four shipped Lexicons, and against the two Wave 2 drafts here (*Arkham*: At the door, UNLOCK, BROKEN, KNOCKING, NEW NOTE, FROZEN; *Absolute*: Your turn, PERMIT?, BROKEN, ASKING, JAMMED).

| Standard | Year One | Verdict |
|---|---|---|
| Case | **Case** (kept) | A cop's word already. Rejected: *File* (a disk file, 2022's own reason) |
| Needs you | **Needs you** (kept) | Every short alternative is taken (*Your desk*, *On you*, *Your call*, *Your turn*) or misreads (*For you* reads as a recommendations feed; *Up to you* reads as optional) |
| Permission | **SIGN HERE** | Clear: your signature is needed before it goes on. It matches the report's "Needs your signature". Rejected: *WARRANT* (good metaphor, slower; also "guarantee") |
| Error | **GONE WRONG** | Clear, and at least as severe. Rejected: *BUSTED* (reads as "caught"), *CRASHED* (overstates a tool error), *BROKEN* (both drafts use it), *DOWN* and *DAMAGED* (jury) |
| Waiting | **SEE ME** | The note on the desk: come and see me. **Risk:** it is also what a boss writes when you are in trouble, which reads one tier too severe, close to Error. Judge it on screen; if it reads as a reprimand, Waiting stays **Waiting**, as Case, Needs you and Stalled do. Rejected: *ASKING* (the *Absolute* draft), *QUESTION*, *YOUR MOVE*, *ORDERS?* (taken), *STANDING BY* (reads as "fine, nothing needed"), *PAGED* (on-call developers read an incident: too severe), *CALL BACK* (a callback function) |
| New reply | **MEMO** | Something new to read, from the precinct's paper world. Rejected: *NEW NOTE* (the *Arkham* draft), *WROTE BACK* (a developer reads "write-back", the cache policy), *ANSWERED* (reads as resolved) |
| Stalled | **STALLED** (kept) | A car stalls, and Gordon drives. Rejected: *NO MOVEMENT* and *STANDSTILL* (stakeout words, but "nothing moving" reads close to "quiet", which means all clear), *STUCK*, *NO WORD*, *FROZEN*, *JAMMED* (taken) |
| Case opened / closed | standard | |

Four stamps change; three terms stay. Windows notifications and the tray keep the standard words (`CONTEXT.md`).

## 7. Bat-Clawd

The body, eyes, arms and legs keep their pixels and the three Moods (Costume Rule, `DESIGN.md`). Grid units are those of `suits.ts` (16×11 map, viewBox −6…22 × −1…12). At 54px one unit is about 1.9px.

### The first suit

- **Suit: light grey** (`#9a9e9a`), the only light suit in the app: 44.0 ΔE00 from PALE MOONLIGHT's plum-grey, 25.3 from the *Absolute* draft's teal-grey, 46.3 from the *Arkham* draft's. Source: the 1987 #405 and #407 covers.
- **Cowl, gloves, boots: blue-black** (`#1c1f2e`), with the neutral rim. The cowl is VENGEANCE's map (short ear tips at x = 4 and 11). The 1987 covers show the cowl near black; the blue cast is the brief's "grey-and-blue" lead, not a sample (§12).
- **Trunks, a 1-unit row in cowl black** under the belt: `'...cccccccccc...'` in place of VENGEANCE's suit row. No other Theme or draft has them, and the first suit has them (#404–407 covers).
- **The capsule belt:** pouches in dim canary with cowl-black gaps, `'...bcbcbbcbcb...'` (b = `--belt`, c = cowl), one unit tall. The alternation reads as a row of pouches (8.06:1 between them), after the #407 cover. PALE MOONLIGHT's is a plain brass band; the *Absolute* draft's is an olive belt with pouches, which is the nearest. Here the pouches are pale on a light suit.
- **The chest bat:** big, plain, black on the light chest (7.22:1). An emblem layer about 7 units wide at (8, 6.6), between the jaw (y 5) and the belt (y 8.5). **No oval** and no gold anywhere. The *Absolute* draft also puts a black bat on a grey chest (an 8×2 block); the difference is the light grey and the bat's shape.
- **The cape: feathered.** After the brushed cape on the #405 cover, its hem is many thin, uneven points: five per half, about 1 unit wide, 1 to 1.6 units deep, at irregular spacing (1.2–2.2 units). Draft for the hanging left half: `M3 5 L1.4 5.4 L0.8 10.6 L1.3 9.4 L1.9 10.9 L2.3 9.6 L2.9 11 L3.2 9.8 Z`; the right half differs (not mirrored), so the hem stays uneven. It must read as ragged, not as VENGEANCE's even zigzag, PALE MOONLIGHT's arcs, WATCHFUL PROTECTOR's straight edge, KNIGHTMARE's few heavy points, or the drafts' fading dither (*Arkham*) and three long blades (*Absolute*). Judge at 54px; if the points merge, drop to four deeper ones.

### Poses

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | **Seated, wrapped**, with the feathered hem. Option: **in the high-backed chair**, a 1-unit-wider dark rect behind him up to y −0.5 | The study scene, where Bruce sits bleeding and the bat comes through the window (Wikipedia: the bat "settles on the bust"; the chair is from memory, §12) | The chair back is the only sleeping outline in the Wave that isn't just a wrapped figure. Optional, judged on screen |
| flying | **The leap**: knees drawn up a row, the cape streaming back and up to the left with the feathered hem, two frames | The #407 cover: Batman in mid-leap toward Gordon (C87) | Distinct from the wingsuit (VENGEANCE), the trailing scalloped cape (PALE MOONLIGHT), the rigid glide (WATCHFUL PROTECTOR) and the duster (KNIGHTMARE). DKR's lightning leap may be that Theme's *Signature*; here it is only a flying frame |
| alarmed | **Cape flung open**, legs apart, the magenta aura | The book's entrances (the dinner party, the tenement); no single sourced frame | The flung-open cape is every Theme's alarmed shape; the light suit, trunks and feathered hem carry it. No raised arm (VENGEANCE's flare) and no arms-up cape (PALE MOONLIGHT's giant bat) |

### Signature pose: "The swarm"

**The scene it honours.** Trapped in a condemned building while the police bomb it and send in a SWAT team, Batman calls the bats from the cave with a signal device and escapes in the swarm ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_Year_One); the 1987 #406 cover shows the SWAT raid). The display name points the same way: the man becomes a bat in a cloud of them.

**The drawing.**

- He stands, arms hidden under the hanging cape (the feathered hem), legs as today. **No raised arm and no device in hand:** a raised arm holding something is VENGEANCE's flare (`RIGHT_ARM_UP`). The swarm answers him; it doesn't need to show the call.
- **Bats on the overlay layer.** Each bat is a small path, 2.4 × 1.2 units (over the 1-unit floor), in `--cowl` with the `--cape-rim` edge so it reads on the olive ground: `m0 0.6 l0.6 -0.6 l0.6 0.5 l0.6 -0.5 l0.6 0.6 l-0.6 -0.1 l-0.6 0.7 l-0.6 -0.7 z`.
- **His eyes** look up and to the left (−0.6 along, −0.4 up), after the bats; still white.
- **Held frame:** three bats over his left shoulder, at about (−4, −0.5), (−1.5, 1.5) and (−5, 3), and one low on his right at (15, 8). The outline is lopsided: dark specks up and left, a single one low right.

**The reveal** (six steps, four a second, about 1.5 s, on the shared clock):

1. Three bats at his feet, left (x −3…2, y 9–11).
2. Seven bats rising round his left side (y 4–9) and two crossing behind him.
3. Nine around his shoulders and head. None crosses his eyes.
4. The cloud peels up and to the left (x −6…2, y −1…4), six bats.
5. Four bats.
6. The held frame. Under reduced motion, only this.

**On the perch** he stands still. Once a cycle, the `watchOn` beat sends one bat across from left to right in two steps (the slot WATCHFUL PROTECTOR's ping uses). The two glances look up-left and back.

**Why its outline differs from the four taken.** VENGEANCE: symmetric, front-on, nothing around him. PALE MOONLIGHT: three-quarter, a dark cape mass on the left, one large oval up and to the right. WATCHFUL PROTECTOR (shipped standing, not crouched): front-on, one clean ring centred on his eyes. KNIGHTMARE: a coat blown out to the right like a flag. Here the figure is front-on too, as WATCHFUL PROTECTOR's is; the bats carry the outline, the way the ring carries Sonar. They are many, broken, lopsided and up-left; the ring is one closed, centred circle. **That is the risk**, and the comparison image should put the two side by side at 54px. Against the drafts: *Arkham*'s mirror is a second tall figure beside him; *Absolute*'s is lifted off the ground on four tethers.

**Alternatives:**

- **B. The window.** Seated in the high-backed chair, a bat landing on the chair's top beside his head, two or three 1-unit glass shards on the overlay. The most famous moment, Bruce's half. Held on the perch it is a seated figure, close to his own sleeping pose (an in-Theme collision, which outranks cross-Theme ones). If chosen, the sleeping pose must change.
- **C. The leap** (#407 cover), held. A frozen leap on a twelve-second perch reads oddly, and DKR's lightning leap is likely that Theme's lead. Kept as the flying pose instead.

**Bats twice in the Wave.** The *Absolute* draft's Atmosphere is a colony of bats crossing a dusk band. A Signature and an Atmosphere are different axes, but the image is the same. Year One's bats are a swarm around the man, in one scene, and only in the Signature (its Atmosphere is smoke, §9). If the jury wants bats in only one Theme, the swarm has the stronger source (it is a scene in the book); the *Absolute* draft's colony comes from the zoo's bat house in its #1.

**Aura:** `'alarmed'`. Magenta never shows at rest, so no aura as the swarm plays.

**Engine:** none for the suit. The bats are path layers on the existing overlay, the reveal is a `Script`, the beat uses `watchOn`'s slot. The trunks and the pouch belt are map rows.

## 8. Emblem

**The shape.** The first suit's chest bat, drawn by us. The book prints no logo of it. From the 1987 covers the bat is wide and level-winged, with a small head and two short ears, scalloped underneath, and **no oval**. The covers we could read are 400px scans, too small to trace (§12). Before drawing, trace it from a high-resolution page, ideally the 2016 Absolute Book One, and add it to `emblems.ts` as `BAT_1987` on the shared 120×48 grid, symmetric about x = 60. Finish `'none'`, flat. No plate.

**In the masthead and intro:** the bat in `--emblem` (the suit's grey, 7.22:1 on abyss), flat. The wordmark is Bone in Permanent Marker.

**The 64px Signal disc.**

- **Unlit:** olive glass (`--abyss` to `--surface`), the bat a shade (`--raised`) in it.
- **Lit:** flat colour, not a glow. Lewis's 1987 colour was flat tints on newsprint, so the lens is three hard-edged rings with no blending: `radial-gradient(circle at 50% 50% in srgb, var(--lens-core) 0 34%, var(--signal-hot) 34% 68%, var(--signal) 68% 100%)`, the bat in abyss across it, the rim in `--blood`. No shipped Theme's lens has hard stops (VENGEANCE, WATCHFUL PROTECTOR and KNIGHTMARE blend; PALE MOONLIGHT blends gold to brass).
- **Optional:** the bat offset by half a pixel down and right from the rings, like plates out of register on newsprint. Judge on screen; drop it if it reads as a rendering bug.
- The count: a Barlow numeral on the magenta chip, in abyss ink (5.52:1).
- **Tray and toast icons** stay single, from the default emblem (jury §2).

## 9. Atmosphere

Year One has rain (the riot page), but rain is VENGEANCE's. Its night is teal and indigo, which are WATCHFUL PROTECTOR's and the drafts'. Its bats are the *Absolute* draft's Atmosphere. What is left is the city's dirt: smoke and grime. Three options:

- **A. Smoke off the street (recommended).** A new kind, `smoke`. Four to six soft round puffs rise from the bottom edge, each growing from about 12 to 40px across and fading from 10% to nothing over four seconds, 2px up a tick with a slight sway, on the 8 fps clock. Positions come from the frame index (not random per frame), as snow and ash do. Colour `--smoke-puff`, the #404 cover's olive lifted. Behind it, a static smog haze from below in `--smog` (12% at the bottom edge). Source: the tenement bombing, where the recolour fills the page with smoke (R-DC; there it is pink-salmon, which here would sit on Clawd and the alarm, hence olive), and DC's "gorgeous grime". It differs from everything taken: rain falls in streaks, snow falls, ash blows sideways in flakes, the windows are still, the drafts' bats flap and their scratches flicker. Smoke rises, swells and fades. Gated like the others: it moves while the pointer is over the window and for a few seconds after news, and is absent under reduced motion. The engine needs a `SmokeAtmosphere` type in `atmospheres.ts` (colour, count, `rise`, `grow`, `life`, `sway`) and its painter in `painters.ts` (radial-gradient circles on the canvas).
- **B. The haze alone.** No moving parts: the static smog haze from below, plus a halftone grain in place of the film grain. Zero cost. The Atmosphere switch would then toggle only the haze.
- **C. Bats over the rooftops.** This dossier's first idea: one bat at a time crossing high and slow. Dropped: it is the *Absolute* draft's `colony`, and it would double this Theme's own Signature.

**Halftone grain (optional engine work).** The 2016 Absolute prints the 1987 version "on stock that simulates the look and feel of the original comics" ([DC](https://www.dc.com/graphic-novels/batman-year-one-1987/absolute-batman-year-one)). A faint dot screen (4–5%) in place of the film grain would say "newsprint" where the others say "film". It needs a per-Theme grain texture variable; today every Theme shares one SVG noise.

**Light:** from below, the street's smog. VENGEANCE, PALE MOONLIGHT and WATCHFUL PROTECTOR also light from below, but in red, brown and mercury; this is olive-grey, and it is the smoke, not the light, that moves.

## 10. Distinctiveness

Scored by the jury's rules (jury §1): a Theme stays only with C on at least 3 of 5 axes against every other.

| Against | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| VENGEANCE | C: olive vs pure black (raised 19.6); magenta vs red (35.9); Bone vs amber | C: marker and printed hand vs Anton and Special Elite | C: light suit, trunks, big black chest bat, feathered hem, the swarm vs charcoal, jagged hem, symmetric stand | C: rising smoke, olive smog vs falling rain, red glow | C, if the lines hold: Gordon's notes, wry and domestic, vs Bruce's journal, bleak. ~ if they drift bleak | **5** (4 at worst) |
| PALE MOONLIGHT | C: olive vs smog brown (surface 7.9, raised 12.0, and the hue); magenta vs gold (65.2); Bone vs steel | C: no family or register shared | C: light suit, no oval, trunks, feathered vs scalloped. Both have belts | C: smoke rising vs snow falling | C: a cop's notebook vs a newsroom | **5** |
| WATCHFUL PROTECTOR | C: olive vs steel blue (12.1 / 17.5); magenta vs blue (37.7); Bone vs mercury | C | ~: both Signatures are a front-on figure with something around him (a swarm vs a ring). Suits and hems differ | C: moving smoke vs a still skyline | ~: Gordon is in both. There he briefs ops; here he keeps private notes. The Lexicons share nothing | **3–4** |
| KNIGHTMARE | C: olive vs scorched brown (15.8 / 20.9); magenta vs crimson (23.2); both run in Bone (7.3) | C | C: grey suit and cape vs duster, goggles, no cape | C: smoke rising and swelling vs ash blown sideways | ~: both weary. KNIGHTMARE is a veteran with Alfred's dry care; Gordon is new, anxious, joking at himself | **4** |

Year One clears every shipped Theme, with the least room against WATCHFUL PROTECTOR. If the jury wants more there: the Signature alternative B (the window) makes the silhouette C.

**Against the other Wave 2 Themes** (from the drafts in this folder, 2026-10-14; they may change):

- ***Arkham Asylum*** (draft): palette C (olive vs indigo-violet, 16.3 / 25.8; magenta vs claret 11.9; Bone vs periwinkle). Type ~ (no family shared, but both stamp faces are upright printed hands, Neucha against Patrick Hand SC: the same register by the jury's rule). Silhouette C (light suit vs ink; feathered vs fading hem; swarm vs mirror). Atmosphere C (smoke vs scratches). Voice C (Gordon's notes vs the house on its rounds). **4.** The one open clash is the alarm, if Year One takes A1 (4.1).
- ***Absolute Batman*** (draft): palette C (olive vs violet, 20.9 / 27.1; magenta vs lemon 80.0; Bone vs lavender). Type C, though both use hands. Silhouette ~ to C: both grey suits with black chest bats and pouch belts; light grey, trunks and a feathered hem against teal-grey, wide shoulders and blades. Atmosphere C (smoke vs bats). Voice ~ to C: both are working men's notes at night; Gordon's is a cop's private notebook with dated entries, *Absolute*'s a hopeful engineer's shift notes. **3–5.** The jury should look at the two Voices together.
- ***The Dark Knight Returns*** (no draft seen): Lynn Varley's painted colour, the TV and the old, huge Batman. Year One takes none of those, and not the leap as a Signature.
- ***The Long Halloween* (Wave 3):** another early-years crime story by a different team. **Year One takes:** the calendar date as the dateline (month and day), Gordon's canary notes, the olive grime and the newsprint magenta, the light first suit with trunks, the swarm. **It leaves:** holidays as the calendar (Halloween, Thanksgiving, Christmas: named days, not dates), Tim Sale's heavy solid blacks and huge shapes, the Roman and the mob as a frame (Falcone appears in Year One too, so this Voice keeps the mob out), Two-Face's coin, and a palette of its own, such as Sale's black with one spot colour, or a pumpkin orange kept clear of Clawd. Its colourist (Gregory Wright, from memory, §12) is the place to start.
- **The Arkham games (Wave 3):** the khaki ground is the one thing here that leans their way. It is olive-grey at low chroma, not asylum green, but the maintainer should say now whether it leaves them room.

## 11. Legal note

- **Trademark (DC):** the bat symbol, "Batman", "Gotham" and the *Year One* name. The emblem is redrawn by us as a vector from the first suit, credited as "the bat symbol is a trademark of DC, used here as fan art" in the README and NOTICE, as for the other Themes.
- **Copyright to avoid:** any page, panel or cover (sampled for colour, never shown or traced); Todd Klein's lettering; the collected editions' title lettering; Mazzucchelli's drawings (Bat-Clawd's poses are ours, after scenes, not panels); the book's dialogue beyond the display name's three words.
- **Free to use:** flat colour, khaki and olive, magenta as a colour, a printed-hand face, a canary caption box as a general comics device, dated scene breaks as a general device, a swarm of bats, a grey suit with trunks, smoke.
- **Fonts:** Permanent Marker is Apache-2.0 (ship the licence and a NOTICE entry, as Syncopate does). Neucha is OFL-1.1. Both on Fontsource.
- **Display name:** BECOME A BAT is a three-word fragment of one line, used as an allusion, not set in the book's lettering. It is the whole of the book's words in this Theme.

## 12. Unverified items

- **The alarm is ours.** `#ff4dd2` (A2) is process magenta turned 16° toward violet, 13.2 ΔE00 from `#ec008c` and 19.5 from the sampled 1987 pink. `#ff4fa3` (A1) is process magenta's hue at full strength, 14.4 from the sampled pink. Neither is a measured ink. That the 1987 pinks are tints of the magenta plate is how four-colour newsprint works, not a statement from Lewis.
- **All hex values** come from compressed web scans (DC's 700px article images, a fan site's 300–580px scans, 400px fan-wiki covers), not printed pages. DC's article images are the painted recolour, but DC does not say which restoration. The fan site's "NEW" pages are from "the collected edition", unnamed.
- **The olive ground's source** is shared: the #404 cover (1987) and the recolour's khaki greys (one page, 18% of its pixels). Whether khaki recurs across the recolour was not measured beyond the pages listed.
- **Where Lewis's colour-plate caption comes from** ("Richmond hand-painted the color art separately from the black line art"): seen on the fan site beside a scan of the plate; the book is not named.
- **The *Direct Currents* interview** was read only through DC.com's quotes (2024) and Comic Book Daily's summary; the full text did not load.
- **The window line's exact wording.** Sources give "Yes, father. I shall become a bat." (India Art Review), "I shall become a bat" (Goodreads) and "I will become the bat" (one review). The display name uses only "become a bat"; check it against a page before shipping.
- **The dated captions' face** (Helvetica Bold, our reading) and whether every scene break carries a date: seen on two scanned pages ("May 19", "June 7"); January 4 as the first day is confirmed in a review.
- **The study chair** in the window scene, for the optional sleeping pose: from memory. Wikipedia confirms only the bat and the bust.
- **The first suit's colours.** The covers show a light grey body and a near-black cowl and cape (`#919b9b` and `#738585` on #407, `#5f595e` on #405). The blue cast of the cowl and cape is proposed, after the brief's "grey-and-blue" lead. The belt's colour is read from covers where it is pale.
- **The chest bat's shape:** not traceable from the scans found; to be drawn from a high-resolution page.
- **The #405–407 cover scans** are from a fan wiki (DCU Guide); GCD's cover-colour credit to Lewis was read through a shop's copy of the record (comics.org returned 403).
- **The 2005 cover and its relation to the 2017 Deluxe cover:** not checked. The 2012 cover (red, sold with the DVD) is the disavowed edition and was not used.
- **Gregory Wright as *The Long Halloween*'s colourist:** from memory.
- **Smoke in the book:** the tenement page is full of it; whether smoke or steam recurs elsewhere in the story was not checked.
- **The Wave 2 drafts** (*Arkham Asylum*, *Absolute Batman*) were read as they stood on 2026-10-14; their tokens, fonts and words may change before the jury.
- **Stamp widths:** measured roughly with Pillow, letter spacing ignored; the real check is `stampWidth.test.ts`.
- **Everything on the grid** (the feathered hem, the belt, the trunks, the chest bat's size, the bats' paths and positions): drafts, to be judged at 54–78px on a labelled comparison image.

## 13. Sources

- DC.com: [Rosie Knight, "The Woman Whose Colors Brought *Batman: Year One* to Life...Twice", 29 Mar 2024](https://www.dc.com/blog/2024/03/29/the-woman-whose-colors-brought-batman-year-one-to-life-twice), quoting Lewis in *Direct Currents* #1 (1988); its three interior images and banner were sampled.
- DC.com: [*Absolute Batman: Year One*](https://www.dc.com/graphic-novels/batman-year-one-1987/absolute-batman-year-one) and [*Batman: Year One — The Deluxe Edition* (new edition)](https://www.dc.com/graphic-novels/batman-year-one-1987/batman-year-one-the-deluxe-edition-new-edition), publisher pages; the 2017 cover image was sampled.
- The Comics Journal: [Dan Nadel, "David Mazzucchelli Disavows Forthcoming Batman Reprint", 5 Mar 2012](https://www.tcj.com/david-mazzucchelli-disavows-forthcoming-batman-reprint/).
- Nerdist: [Rosie Knight, "How Richmond Lewis and *Batman: Year One* Impacted *The Batman*", 28 Mar 2022](https://nerdist.com/article/richmond-lewis-batman-year-one-legacy-colorist/).
- Comic Book Daily: [Scott VanderPloeg, "Time Capsule: DC Direct Currents 1, January 1988", 20 Jan 2016](https://comicbookdaily.com/collecting-community/bound-together/time-capsule-dc-direct-currents-1-january-1988); eBabble: [VanderPloeg, review of the Absolute Edition, 30 Jun 2017](https://ebabble.net/absolute-batman-year-one/).
- Comic Watch: [Dustin Gebel, "Batman #404–407: The Myth of Man and Bat", 15 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat) and [on the Artist's Edition, 14 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-year-one-artists-edition-spotlights-the-genius-of-david-mazzucchelli).
- The Slings & Arrows: [Woodrow Phoenix on the Artist's Edition](https://theslingsandarrows.com/?p=125965), quoting Mazzucchelli's introduction.
- Groucho Reviews: [Peter Canavese, *Batman: Year One*, 2 Jun 2008](https://www.grouchoreviews.com/features/58).
- Wikipedia: [*Batman: Year One*](https://en.wikipedia.org/wiki/Batman:_Year_One) (credits, editions, plot) and its [#404 cover file](https://en.wikipedia.org/wiki/File:Batman_vol._1-404_(January_1987).jpg) (sampled).
- Fan sources, used only to fill gaps: [Ultimate Batman Comics, "Batman: Year One [Coloring]"](http://ultimatebatmancomicswebsite.weebly.com/batman-year-one-coloring.html) (1987 and recoloured page scans and Lewis's colour plate, sampled); [DCU Guide, *Batman* #404](https://dcuguide.com/Batman_404) and #405–407 (credits, cover scans, sampled); [CBR forum, "Year One art doesn't look right", 2015](https://community.cbr.com/threads/year-one-art-doesnt-look-right.53383/) (edition history); [a Tumblr post on the recolouring](https://cv-zedricdimalanta.tumblr.com/post/131207932434/a-brief-behind-the-scenes-look-at-the-recoloring); [Capt. Can Comics' copy of the GCD record for #404](https://www.captcancomics.ca/products/apr09-24-1260).
- The window line: [Goodreads quotes](https://www.goodreads.com/work/quotes/2501570); [India Art Review](https://indiaartreview.com/stories/batman-year-one-bruce-wayne-gotham/).
- Fonts: Fontsource API ([Neucha](https://api.fontsource.org/v1/fonts/neucha), [Permanent Marker](https://api.fontsource.org/v1/fonts/permanent-marker), [Patrick Hand](https://api.fontsource.org/v1/fonts/patrick-hand), [Kalam](https://api.fontsource.org/v1/fonts/kalam), [Gochi Hand](https://api.fontsource.org/v1/fonts/gochi-hand), [Architects Daughter](https://api.fontsource.org/v1/fonts/architects-daughter), [Handlee](https://api.fontsource.org/v1/fonts/handlee), [Just Another Hand](https://api.fontsource.org/v1/fonts/just-another-hand), [Caveat Brush](https://api.fontsource.org/v1/fonts/caveat-brush)); Google Fonts descriptions ([Neucha](https://raw.githubusercontent.com/google/fonts/main/ofl/neucha/DESCRIPTION.en_us.html), [Permanent Marker](https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/DESCRIPTION.en_us.html), [Patrick Hand](https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhand/DESCRIPTION.en_us.html), [Kalam](https://raw.githubusercontent.com/google/fonts/main/ofl/kalam/DESCRIPTION.en_us.html), [Caveat Brush](https://raw.githubusercontent.com/google/fonts/main/ofl/caveatbrush/DESCRIPTION.en_us.html)).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-1.md`](jury-wave-1.md), [`burton-1989.md`](burton-1989.md), [`the-batman-2022.md`](the-batman-2022.md), [`knightmare-palette.md`](knightmare-palette.md), the drafts [`arkham-asylum.md`](arkham-asylum.md) and [`absolute-batman.md`](absolute-batman.md), `app/src/renderer/src/styles/themes/*.css`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`, `app/test/themeContrast.test.ts`, `themes.test.ts`, `stampWidth.test.ts`, `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`.
