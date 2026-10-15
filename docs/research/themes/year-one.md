# Theme dossier: Batman: Year One (1987)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Batman: Year One* by Frank Miller (script), David Mazzucchelli (art), Richmond Lewis (colour) and Todd Klein (letters), first printed in *Batman* #404–407 (cover dates February–May 1987). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere, written against the four shipped Themes' real tokens ([`wave-2-brief.md`](wave-2-brief.md) §3), the Wave 1 jury's binding decisions ([`jury-wave-1.md`](jury-wave-1.md) §10) and the other three Wave 2 Themes as the Wave 2 jury moved them ([`jury-wave-2.md`](jury-wave-2.md)). The terms are those of [`CONTEXT.md`](../../../CONTEXT.md). Issue #118, Linear LUC-79.

Revised 2026-10-14 after the wave 2 jury (`jury-wave-2.md` §9).

## 1. TL;DR

- **The Theme in one sentence:** Gordon's notebook from his first year in a crooked city: an olive-khaki Gotham of grime and smoke, his canary caption paper, the chalk-grey first suit with no oval, and the magenta of the 1987 newsprint kept for the one thing that needs you.
- **Display name: BECOME A BAT** (approved, jury §9.11). **Credit:** the `film` field reads "Frank Miller and David Mazzucchelli's Batman: Year One (1987)"; `words.ts` adds "after", so the picker prints "after Frank Miller and David Mazzucchelli's Batman: Year One (1987)". The name is a fragment of Bruce's line when the bat breaks his study window. The scene is confirmed in a page reproduction; the line's exact wording is not yet (§12), and it must be checked on a page before the Theme ships.
- **The way out of VENGEANCE: Gordon's half.** VENGEANCE owns Bruce's journal, red on pure black and the typewriter. Year One's two narrators are told apart by their captions: Gordon's are yellow boxes in printed letters, Bruce's are white boxes in cursive ([Comic Watch, Gebel, 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat)). This Theme takes Gordon's: the upright printed hand (Neucha, Year One's by jury §9.4) for the stamps, headings and Night Report, his canary paper for the soft tier and the report's headings, his voice, and the book's dated scene breaks as the dateline ("October 14", no time).
- **Palette (moved, jury §9.1):** an olive-khaki ground, hue 111–116° (`#0d0e06` / `#191b0b` / `#292c11`), toward Lewis's khaki samples and away from *The Dark Knight Returns*' tank grey. Gordon's canary `#e6e08a` stays for what waits on you. Running work is a khaki newsprint white `#e2e3c8`, kept at least 6.9 ΔE00 from every other Theme's working white.
- **Alarm: two options, picked on screen from a labelled image.**
  - **A2. Newsprint Magenta (recommended):** `#ff4dd2` for lit pixels, `#ff6ad9` for stamps, `#e04ac0` for fills. The magenta plate of the 1987 newsprint, turned 16° toward violet. A proposal, not a sample. It sits 23.2 from KNIGHTMARE, 35.9 from VENGEANCE, 34.6 from Clawd orange and 11.9 from *Arkham Asylum*'s claret.
  - **A3. Trade Paperback Red:** the flat red of the most-reprinted collected cover, sampled `#b32c33` from the publisher's own cover file. It fails as text (2.27:1 on raised). Lifted until it passes, to `#f2605e`, it lands **6.1 from KNIGHTMARE's alarm** and 10.4 from Clawd orange and from VENGEANCE's ink. As sampled it is **8.5 from VENGEANCE's base red** and 5.0 from KNIGHTMARE's fill. Kept complete for the comparison image, but not recommended (§3).
  - A1 (`#ff4fa3`) is withdrawn: it is 4.1 from Arkham's claret (jury §3.10).
- **Type:** **Permanent Marker** (Apache-2.0) for the wordmark only; **Neucha** (OFL) for stamps, headings (through the shared `--font-headline`), the caption boxes and the report; Barlow 700 for the dateline (through Year One's `--font-dateline`).
- **Lexicon:** Case, Needs you and Stalled stay. **SIGN HERE** (Permission), **GONE WRONG** (Error), **MEMO** (New reply), and **SEE ME** (Waiting), which is decided on screen and falls back to **Waiting** (jury §4, §9.9).
- **Bat-Clawd:** Year One's own black bat on the only light suit (jury §9.5). The suit lightens to chalk (`#d0d3cc`) so the orange jaw reads at 2.08:1 instead of 1.16:1, or, the on-screen alternative, a 1-unit cowl-black collar under the jaw, which leaves room for only a 2.5-unit bat. The cowl, cape, gloves, boots and trunks are a neutral near-black (no blue). The bat is 5 units wide at y 6.0–8.0, resting on a full unit of solid canary belt so that nothing black comes within a unit of it; it is traced from the 2016 Absolute Book One and compared with DKR's at 64px before either is drawn. The hem has four deep, uneven points. He flies with a trailing feathered cape, not the leap, which is DKR's Signature figure.
- **Signature pose: "The swarm"** (kept, jury §9.10). The bats gather into **one lopsided cloud, about 7×4 units, up and to the left, swallowing his left ear and shoulder**, and his cape flares out to the left beneath it. It is drawn with the bat shape it shares with *Absolute Batman*'s colony. Two front-on stands are taken (VENGEANCE and WATCHFUL PROTECTOR's Sonar, which shipped standing), so the outline must lean: a figure dissolving into bats at the top left.
- **Atmosphere:** the `smoke` painter (approved, jury §9.12): soft olive puffs that rise, swell and fade over a smog lit from the street.
- **Engine PR:** the `smoke` painter; `--font-dateline` (Year One's); boxed report headings (`--caption-paper`, `--caption-ink`, generic, defaulting to no box); `--font-headline` (shared with DKR and *Absolute*); the shared two-frame bat path (with *Absolute*'s colony); optionally a `--grain-texture` for a halftone. **Theme PR:** the CSS, fonts, words, suit and the traced `BAT_1987` path.

## 2. Visual identity and sources

What makes this version recognisable, in order of strength:

1. **Richmond Lewis's colour, twice.** Lewis coloured the four issues for newsprint, then recoloured the whole story for the first collected edition in 1988, "something that's incredibly rare for the original colorist to do" ([DC.com, Rosie Knight, 29 Mar 2024](https://www.dc.com/blog/2024/03/29/the-woman-whose-colors-brought-batman-year-one-to-life-twice)). Her only interview on it, in DC's *Direct Currents* #1 (early 1988), is quoted there:
   - "I wanted to bring a sense of drama to the story, from simple color to the more complex. But overall, it's pretty restrained. I tried to use a limited palette, so you won't see every color on every page, except in those places where the full range is called for."
   - "I tried to use the color to follow the storytelling. There are quiet places in the story that have quiet color, while a loud, fast-paced big bang sequence is going to be colored to bring out the art's impact."
   - "The trick is in trying to control it, to keep to the simplicity of newsprint color while using the fuller range available in process...but only where it's needed."
   - DC's article describes the 1987 version's "neon-hued cityscapes and pink-dappled puddles", "a nighttime landscape [of] gorgeous grime", and the recolour as "far more noir-ish and grounded": "Gone were the bright neons and in came a spectrum of shadowy hues" (Knight's words, not Lewis's). Nerdist adds that the originals have pink skies with teal reflections and Gordon "in dark blue shadow with yellow highlights", and that the recolour leans "more into reds and oranges than pinks" ([Nerdist, Knight, 28 Mar 2022](https://nerdist.com/article/richmond-lewis-batman-year-one-legacy-colorist/)).
   - How the recolour was made: "Richmond hand-painted the color art separately from the black line art" (caption printed beside her colour plate for *Batman* #406 page 2, reproduced on the fan site [Ultimate Batman Comics](http://ultimatebatmancomicswebsite.weebly.com/batman-year-one-coloring.html); the book it comes from is not named there).
2. **Mazzucchelli's line.** He drew "with a simplified line" to leave room for colour, and studied the character's early stories to find a traditional Batman (*Direct Currents*, summarised by [Comic Book Daily, VanderPloeg, 2016](https://comicbookdaily.com/collecting-community/bound-together/time-capsule-dc-direct-currents-1-january-1988); the full text was not readable). In his introduction to the 2024 Artist's Edition: "without my art-partner these lines are just a skeleton" ([The Slings & Arrows, Woodrow Phoenix](https://theslingsandarrows.com/?p=125965)). A review of that edition reports "a nib that didn't come to a point to achieve his 'dumb lines'" ([Comic Watch, Gebel, 14 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-year-one-artists-edition-spotlights-the-genius-of-david-mazzucchelli); secondhand).
3. **Two narrators.** Gordon arrives by train and Bruce returns on the same day, January 4 ([Canavese, Groucho Reviews, 2008](https://www.grouchoreviews.com/features/58)). "Gordon gets a yellow caption box in printed letters, as though they're notes sprawled on cheap canary legal pads"; Bruce's are "sharp white boxes and tight, beautiful cursive" ([Gebel, 15 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat)). A reproduction of the window panels in #404 shows Bruce's white cursive boxes ("Without warning, it comes...", "...crashing through the window of your study ...and mine...") ([PopOptiq, "Top 10 Batman Year One Moments"](https://www.popoptiq.com/top-10-batman-year-one-moments/)). Scene breaks carry dates set in bold type straight onto the art, mixed case, with no box: "May 19" and "June 7" in the scans on [Ultimate Batman Comics](http://ultimatebatmancomicswebsite.weebly.com/batman-year-one-coloring.html). They look like Helvetica Bold (our reading).
4. **The first suit and the bats.** A bat "crashes through a window and settles on the bust", and Bruce takes it as his sign; later, trapped in a condemned building during a police bombing and SWAT raid, he "uses a signal device to attract a swarm of bats from the Batcave" ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_Year_One)). His costume is "too big" (same). The 1987 covers show the suit: a light grey body, black cowl and cape, capsule belt, dark trunks, no oval (#405 and #407 covers, [DCU Guide](https://dcuguide.com/Batman_404) scans; fan wiki).
5. **Gotham's corruption.** Gordon "resists the corruption of Gotham City cops with every fiber of his being" ([Canavese](https://www.grouchoreviews.com/features/58)).

**Credits.** Story Frank Miller, art David Mazzucchelli, colour Richmond Lewis, letters Todd Klein, editor Dennis O'Neil; *Batman* #404–407, cover dates February–May 1987 ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_Year_One); [DCU Guide](https://dcuguide.com/Batman_404) gives #404 as February 1987, the Wikipedia cover file January). Covers by Mazzucchelli; the Grand Comics Database credits Lewis with the cover colours too (via [Capt. Can Comics](https://www.captcancomics.ca/products/apr09-24-1260), reproducing GCD issue 42449; comics.org returned 403).

### Editions, and which one the colours come from

| Edition | Colour | Cover | Artist's view |
|---|---|---|---|
| *Batman* #404–407, 1987 | Lewis's newsprint colour | Mazzucchelli's four covers | Hers. Replaced by her own recolour in every collection until 2016 |
| Hardcover and trade, 1988 (DC, Warner, Titan) | Lewis's hand-painted recolour | not sampled | Her choice. Mazzucchelli: shiny paper "was never part of the original design, dating back to the 1988 hardcover" (via [TCJ](https://www.tcj.com/david-mazzucchelli-disavows-forthcoming-batman-reprint/)) |
| Hardcover, 2005 | the 1988 recolour, cleaned | ivory with a brick-red diagonal and the caped Batman (`#8b241c`, UBC scan) | Mazzucchelli and Dale Crain "worked for months to try to make a definitive version" (same) |
| Trade paperback, 2005–2007 onward (ISBN 978-1-4012-0752-6) | the same recolour | **flat red with the caped Batman in black and grey, "YEAR ONE" in darker red**: the cover the maintainer means (§3, A3) | Same edition family as the 2005 hardcover |
| Deluxe Edition, 2012 (ISBN 978-1-4012-3342-6) | printed "from corrupted, out-of-focus digital files" | a yellow moon with a bat, redesigned | **Disavowed** by Mazzucchelli ([TCJ, Dan Nadel, 5 Mar 2012](https://www.tcj.com/david-mazzucchelli-disavows-forthcoming-batman-reprint/)) |
| Absolute Edition, 2016 | Book One: the recolour "remastered with new, high-resolution scans of the original coloring by David Mazzucchelli and Richmond Lewis"; Book Two: the 1987 version "reproduced from scans made by Mazzucchelli and Lewis from the printed comic book pages" ([DC](https://www.dc.com/graphic-novels/batman-year-one-1987/absolute-batman-year-one)) | slipcase with the cowled face | Both made by the artists |
| Deluxe Edition, new edition, 2017 | the recolour, with "Richmond Lewis's color samples" in the extras ([DC](https://www.dc.com/graphic-novels/batman-year-one-1987/batman-year-one-the-deluxe-edition-new-edition)) | lavender cowl on brick red (`#883c2c`) | Not stated |

The edition labels for the 2005 covers follow Ultimate Batman Comics (fan site), which captions the ivory-and-brick one "Hardcover, 2005" and the red one "Softcover, 2005"; Wikipedia dates the trade paperback February 2007. Penguin Random House's cover file for the trade paperback ISBN shows the red design with DC's current logo, so it is a later printing of the same cover.

**A correction to the brief.** The brief speaks of "Richmond Lewis's own 2005 recolour". The recolour is from **1988**; 2005 is a cleaned reprint of it. Both colourings are Lewis's, and the 2016 Absolute reproduces both from the artists' own scans. This dossier takes its ground from colours found in both, its suit from the 1987 covers, its canary from the recolour, and its recommended alarm from the 1987 newsprint (§3 argues each).

## 3. Palette

**Provenance key.** Every hex was sampled by us (Python and Pillow: median RGB of a region with ink-black line art and white paper dropped; "sat15" is the median of the region's 15% most saturated pixels; "red mask" keeps pixels with R > 1.9 G and R > 1.9 B) from compressed JPEG or PNG files. None is a measurement of a printed page. The scripts live in the session scratchpad, not the repo.

- **R-DC**: the 1988 recolour, three interior pages DC published with its 2024 article (700×1080 JPEG; painted texture, no halftone). DC does not say which restoration.
- **R-UBC**: the 1988 recolour, "the published page from the collected edition" (edition unnamed), fan-site scans of 300–580px, and Lewis's colour plate for #406 page 2.
- **N-UBC**: the 1987 newsprint, scans of the printed issues on the same fan site (halftone visible).
- **C87**: the 1987 covers: #404 from Wikipedia (sourced there to DC Universe Infinite) and DC's 2024 banner crop of it; #405–407 from DCU Guide (fan wiki).
- **TPB**: the trade paperback's cover file from Penguin Random House's cover service (ISBN 9781401207526, 292×450, a flat digital file: the red field is one value). Cross-checked against DC's own product image of the same design (a 3D mock-up, shaded) and a fan-site scan.
- **P**: proposed by us.

### What the colourings look like (sampled)

| Colour | Hex | Source, method |
|---|---|---|
| Teal dusk sky | `#498f93`, `#4a959d` | R-DC, the chase at dusk |
| Steel-blue sky; violet shadow on Gordon | `#77a0af`; `#7282a2` | R-DC, the tenement bombing |
| Salmon panel; pink-salmon smoke; explosion orange | `#d67575`; `#de8b76`; `#de834a` | R-DC, same page |
| Police light | `#bc4847` | R-DC, the riot in the rain |
| Gordon's caption, canary / cream | `#ebecc2`, `#f1f2c7` / `#f4efde` | R-DC, the box paper |
| Olive-greys | `#a6a698` (darker half `#575545`), h 103–109°, 18% of the page | R-UBC, the "Flass and Gordon" page |
| The same page in 1987 | `#8b8773`, h 100° | N-UBC |
| Indigo night | `#343c70` | R-UBC, #406 page 2 ("June 7") |
| Canary caption | `#cec57e` | R-UBC, the "May 19" page |
| Pink | `#b46079` (sat15 `#97284f`), h 2–4° | N-UBC, #406 page 2 |
| Rose panels | `#b6475f` (sat15 `#c6384f`), h 12–19° | N-UBC, the "May 19" page |
| Olive ground | `#44493d`, `#575d4b`, h 122–125° | C87, #404 cover |
| Grey suit; grey-teal cape | `#919b9b`; `#738585` | C87, #407 cover |
| Lavender ground; grey cape | `#a695a7`; `#5f595e` | C87, #405 cover |
| **Trade paperback red** | **`#b32c33`** (the field is flat: median, p25 and p75 identical), h 29° | TPB, red mask over the whole cover and over the flat field right of the cape |
| The same design, other reproductions | `#ab282e`–`#af2930` (DC's shaded mock-up); `#ce1131` (fan-site scan of an earlier printing, 4.7 ΔE00 from `#b32c33`) | DC product image; UBC |
| 2005 hardcover brick; 2017 Deluxe brick | `#8b241c`; `#a04130` | UBC; DC product image |

Read plainly: the recolour is blue at night with khaki greys, lavender, salmon and canary; the 1987 newsprint is pink and magenta with cream, yellow and the same khaki greys; the collected covers are red and brick. After the Wave 2 jury the blues and teal are WATCHFUL PROTECTOR's, the violet and lavender *Absolute Batman*'s, the plum *Arkham Asylum*'s, the green-grey toward the tank DKR's, and the salmon and orange sit on Clawd. What is left, and is in both of Lewis's colourings, is the **khaki** and Gordon's **canary**.

### The ground: Gotham grime, olive-khaki

`#0d0e06` / `#191b0b` / `#292c11`, hue 111–116°, chroma 3–18. The jury moved it from the first draft's h 122–127° toward Lewis's khaki samples (h 100–125°) so that it clears DKR, which moves toward its tank grey at h ~166 (jury §3.1, §9.1). The jury's two anchor values (`#191b0b`, `#292c11`) are used as given; the rest are derived at the same hue.

- **Hue family: olive-khaki.** Surface / raised against every other Theme: VENGEANCE 9.3 / 20.2, PALE MOONLIGHT 8.6 / 12.3, WATCHFUL PROTECTOR 14.6 / 21.7, KNIGHTMARE 15.8 / 20.2, ANCIENT GRACE (DKR, moved, `#131a17` / `#1d2622`) **6.4 / 11.1**, BLUE COLLAR (*Absolute*) 25.8 / 34.5, SERIOUS HOUSE (*Arkham*, moved, `#1a0f15` / `#2b1822`) 17.3 / 27.7. Every pair clears the Wave 2 rule (surface ≥ ~6, raised ≥ ~10).
- **The Arkham games (Wave 3):** the jury measured room for a saturated asylum green (C* 15 or more on the raised tone) beside this ground and DKR's (jury §8). This ground stays at C* 18 on the raised tone and yellow of 111°; the games' green must be clearly bluer and stronger.

### The Alarm color: two options

The brief says to prefer the edition the artist approved. The recolour itself has no free alarm colour: its reds are VENGEANCE's and KNIGHTMARE's family, its salmon and orange are Clawd's, its canary is the Theme's own waiting ink. So both options come from somewhere else in the book's history: the 1987 newsprint (Lewis's own, and scanned by the artists for the 2016 Absolute) or the collected edition's cover.

**A2. Newsprint Magenta (recommended).** The 1987 pinks are tints of the magenta printing plate on newsprint. Process magenta (`#ec008c`) sits at h 354°; this is that magenta at full screen strength, turned 16° toward violet so it clears Arkham's claret. *Proposed, not sampled:* 13.2 ΔE00 from `#ec008c`, 19.5 from the sampled 1987 pink. The jury kept it: "Year One owns pink most strongly" (jury §3.10).

**A3. Trade Paperback Red (on the maintainer's suggestion).** The flat red of the collected edition's best-known cover, sampled `#b32c33` from the publisher's own file. It is a strong, honest sample, and the cover is the image most readers know. But:

- As sampled it is a dark brick-red: **2.27:1 on raised**, so it cannot be a text ink. It can be the fill (with Bone ink on it at 4.83:1).
- As sampled it is **8.5 ΔE00 from VENGEANCE's base red `#af0006`**, **5.0 from KNIGHTMARE's fill `#a8102f`**, and 9.3 from the red field the jury rejected for *Absolute* (`#dd363e`).
- Lifted at its own hue until it passes 4.5:1 on every ground, it becomes `#f2605e` (4.52:1 at its lowest). That lands **6.1 from KNIGHTMARE's `#ff405f` and its ink `#ff5c72`**, **10.4 from VENGEANCE's ink `#ec2a2a`**, and **10.4 from Clawd orange**: inside the ~10 the Wave treats as "close" on three counts at once.
- **As a ground accent instead** (a red wordmark, rule or glass tint at rest): no. Red at rest beside the orange jaw breaks the Wave's "nothing warm at rest", red is what VENGEANCE already paints its wordmark and report rule with, and with A2 as the alarm the Theme would carry two hot colours. The cover's red belongs in the picker preview and the README screenshots, not in the panel.

**Recommendation: A2.** A3 is kept complete below so the two can be judged side by side on screen, at header size next to Bat-Clawd, on a stamp and as a lit disc.

| | A2 Newsprint Magenta | A3 Trade Paperback Red |
|---|---|---|
| `--signal-hot` (lit pixels, a text colour) | `#ff4dd2` (P), 4.95:1 at its lowest | `#f2605e` (P, the sample lifted at h 29°), 4.52:1 at its lowest |
| `--ink-hot` (stamps, hot pen) | `#ff6ad9`, 5.69:1 at its lowest | `#f2605e` (no further lift) |
| `--signal` (fills: lit disc, count chip, aura) | `#e04ac0` | `#b32c33` (TPB, as sampled) |
| `--on-signal` | `var(--abyss)`, 5.46:1 | `var(--bone)`, 4.83:1 (abyss would be 3.07) |
| `--blood` (off-shade, lens rim) | `#5a1a4c` | `#5a1618` |
| `--lens-core` | `#ffc2ee` | `#ffd0c8` |
| vs VENGEANCE `#e3121b` / `#ec2a2a` / `#af0006` | 35.9 / 33.6 / 42.8 | 13.8 / 10.4 / 24.6 (lifted); 10.8 / 12.6 / **8.5** (sample) |
| vs KNIGHTMARE `#ff405f` / `#ff5c72` / `#a8102f` | 23.2 / 21.4 / 35.9 | **6.1 / 6.1** / 24.0 (lifted); 18.2 / 21.9 / **5.0** (sample) |
| vs Clawd `#d77757` | 34.6 | **10.4** (lifted); 22.0 (sample) |
| vs *Absolute*'s rejected red field `#dd363e` | (not computed against a rejected value) | 9.8 (lifted); 9.3 (sample) |
| vs *Arkham* claret `#ec5c94` / fill `#a11f58` | 11.9 / 29.1 | 16.1 / 27.8 (lifted); 24.7 / 15.5 (sample) |
| vs DKR's cyan `#3fdcff` | 61.8 | 69.4 (lifted) |
| In-Theme: hot vs canary / vs running white | 65.0 / 48.3 | 48.4 / 40.8 |

### Token map

Every variable a shipped Theme sets, in the order of `the-dark-knight-2008.css`, plus this Theme's own. The alarm rows show A2; swap in the A3 column above for the other image.

| Token | Value | Origin (edition) | Role in this Theme |
|---|---|---|---|
| `--abyss` | `#0d0e06` | P: the khaki greys (`#575545`, R-UBC; `#44493d`, C87), darkened at h 116° | Page |
| `--smoke` | `#12140a` | P | Top gradients |
| `--surface` | `#191b0b` | P, jury §2 | Cards, row hover |
| `--raised` | `#292c11` | P, jury §2 | Card hover |
| `--line` | `#48491f` | P | Rules, borders |
| `--surface-deep` | `#111309` | P | Gradient ends |
| `--frame` | `#1f220d` | P | Edges |
| `--header-fade` | `#111309` | P | Header fade |
| `--sheet-top` | `#1f220d` | P | Sheet top |
| `--shadow` | `#000000` | as every Theme | Shadows |
| `--blood` | `#5a1a4c` | P | Alarm off-shade: lens rim only |
| `--signal` | `#e04ac0` | P | Alarm fill |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Halo, alarm only |
| `--signal-hot` | `#ff4dd2` | P: the 1987 newsprint magenta, pushed | **The Alarm color** |
| `--on-signal` | `var(--abyss)` | P | Count on the chip (5.46:1) |
| `--ink-hot` | `#ff6ad9` | P | Hot stamps and pen |
| `--ink-soft` | `#e6e08a` | Gordon's canary: `#ebecc2` / `#f1f2c7` (R-DC), `#cec57e` (R-UBC), chroma raised | SEE ME and MEMO stamps, soft pen, waiting rule, caption boxes |
| `--ink-live` | `var(--bone)` | P | Running work in khaki newsprint white |
| `--ink` | `#cdcdb3` | P | Night Report body |
| `--accent` / `--accent-hot` | `var(--bone)` | P | Wordmark, focus, toggles, tab underline |
| `--accent-deep` | `var(--line)` | P | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 14%, transparent)` | P | |
| `--selection` | `var(--line)` | P | Selected text (Bone on it 7.14:1) |
| `--progress-deep` / `--progress-hot` | `var(--line)` / `var(--bone)` | P | |
| `--thumb` | `var(--abyss)` | P | |
| `--brick` | `var(--ink-soft)` | P | |
| `--stamp-hot` / `--stamp-soft` / `--stamp-quiet` | `var(--ink-hot)` / `var(--ink-soft)` / `var(--ash)` | P | |
| `--in-progress` | `var(--bone)` | P | |
| `--in-progress-glow` | `color-mix(in srgb, var(--bone) 40%, transparent)` | P | |
| `--danger` | `var(--raised)` | P, as KNIGHTMARE | Quit hover stays a shadow |
| `--waiting-rule` | `color-mix(in srgb, var(--ink-soft) 55%, var(--surface))` | P | |
| `--report-rule` | `var(--line)` | P | Not red: VENGEANCE's report rule is |
| `--clawd` | `#d77757` | Claude Code's `clawd_body` | Mascot body |
| `--bone` | `#e2e3c8` | P: newsprint white at the ground's hue (h 111°, C* 14); 6.9 from KNIGHTMARE's Bone, 9.7 from DKR's, 17.4 from Arkham's (all three run in Bone) | Text, running work |
| `--ash` | `#a29f86` | P: the khaki grey lifted | Secondary text |
| `--bone-dim` | `#c9c9ae` | P | Log lines |
| `--ash-dim` / `--chevron` | `var(--ash)` | P, aliased as KNIGHTMARE does | |
| `--clawd-eye` / `--clawd-eye-dim` | `var(--bone)` / 18% of it | as every Theme | White eyes |
| `--cowl` | `#141412` | P: neutral near-black; the 1987 covers show the cowl near black (jury §2) | Cowl, gloves, boots, trunks, collar (option) |
| `--cowl-edge` | `color-mix(in srgb, var(--bone) 24%, transparent)` | P | Neutral rim (Costume Rule) |
| `--cowl-shine` | `#34352f` | P | |
| `--suit` | `#d0d3cc` (option S1) or `#9a9e9a` with a collar (option S2) | after the 1987 #407 grey (`#919b9b`, C87), lightened in S1 | The first suit (§7) |
| `--gloves` | `var(--cowl)` | P | |
| `--belt` / `--buckle` | `#c2b86a` / `var(--belt)` | P: canary dimmed; a full unit of solid canary, with no dark gaps or buckle near the chest bat (§7) | The capsule belt |
| `--cape` | `#10110e` | P | Cape cloth |
| `--cape-rim` / `--thread` | `var(--cowl-edge)` | P | |
| `--chest` | `var(--abyss)` | P | The black chest bat (12.81:1 on S1) |
| `--aura-core` / `--aura-glow` | 90% / 55% of `--signal-hot` | P | Aura, alarmed only |
| `--emblem` | `var(--suit)` | P | The masthead bat in the suit's grey (12.81:1 on abyss in S1) |
| `--disc-bat` / `--glass-shine` / `--glass` | `var(--raised)` / `var(--surface)` / `var(--abyss)` | P | Unlit disc |
| `--disc-rim-inner` / `--disc-rim-outer` | `#080904` / `var(--line)` | P | |
| `--lens-core` / `--lens-rim` / `--lens-bat` / `--lens-bat-edge` | `#ffc2ee` / `var(--blood)` / `var(--abyss)` / `transparent` | P | Lit lens (§8) |
| `--notice-top` / `--notice-foot` | `#17190a` / `var(--smoke)` | P | |
| `--notice-hover-top` / `--notice-hover-foot` | `#252810` / `#14160a` | P | |
| `--haze` / `--haze-edge` | 12% / 4% of `--smog` | P | Smog lit from the street |
| `--haze-inset` | `auto -20% -35% -20%` | P | From below |
| `--grain-opacity` | `0.045` | P | Film grain, or halftone if `--grain-texture` lands |
| `--searchlight` | `var(--bone)` | P | Intro |
| `--smog` (own) | `#575d4b` | C87, #404 cover olive, sampled | Haze colour |
| `--smoke-puff` (own) | `#62664a` | P | Atmosphere smoke (3.25:1 on abyss: shapes, not text) |
| `--caption-paper` / `--caption-ink` (engine, generic) | `var(--ink-soft)` / `var(--abyss)` | Gordon's caption boxes | Report headings, 14.22:1 |
| Fonts | `--font-display: 'Permanent Marker'`, `--display-weight: 400`, `--font-headline: 'Neucha'` (shared token), `--font-dateline: var(--font-body)` at 700 (Year One's token), `--font-body` Barlow Semi Condensed, `--font-type: 'Neucha'`, `--font-mono` JetBrains Mono, `--font-report` and `--font-stamp: var(--font-type)`, `--font-label: var(--font-body)` | §4 | |
| Type settings | `--heading-case: none`, `--font-case-title: var(--font-body)`, `--case-title-weight: 600`, `--folder-name-size: 15px`, `--folder-name-tracking: 0.5px`, `--wordmark-size: 19px`, `--wordmark-tracking: 1px`, `--wordmark-glow: 18% bone` | P, to judge on screen | |
| Pens | `--pen-hot` stroke `#ff6ad9` 1.5, `--pen-soft` stroke `#e6e08a` 1.1 | P | |
| Stamp shape | `--stamp-tilt: 0deg`, `--stamp-tilt-slight: 0deg`, `--stamp-border: 1px`, `--stamp-size: 12px`, `--stamp-weight: 400`, `--stamp-mask: none` | P: a caption is lettered straight, in a thin box | |
| `--disc-lens` | hard-stop radial: `--lens-core` 0–34%, `--signal-hot` 34–68%, `--signal` 68–100% | P (§8) | |

Not set (other Themes' own): `--rain`, `--snow`, `--tower`, `--mercury`, `--horizon`, `--ash-fall`, `--dust`, `--plate`, `--mesh`, the coat and goggle variables, `--flame`, `--clawd-shadow`, `--emblem-plate(-rim)`, `--lens-edge`, `--lens-breaks`.

### What `--signal` paints in this Theme

Only the alarm: the lit disc, the count chip, live alert dots, the aura while alarmed, hot stamps and the hot pen. The wordmark, focus rings, toggles, sliders, the card-hover border, the tab underline and the sheet's spill take `--accent` (Bone) or neutrals. Progress and running work are Bone. Nothing on Bat-Clawd shows the alarm at rest.

### WCAG contrast (computed, WCAG 2.x)

Every text token on all 11 grounds `themeContrast.test.ts` checks (abyss, smoke, surface, surface-deep, raised, header-fade, sheet-top, notice-top, notice-foot, notice-hover-top, notice-hover-foot):

| Ink | on `--abyss` | on `--surface` | on `--raised` | lowest of 11 | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` (= `--ink-live`, `--in-progress`, `--accent`) `#e2e3c8` | 14.83 | 13.35 | 10.98 | 10.98 (raised) | Pass |
| `--bone-dim` `#c9c9ae` | 11.50 | 10.35 | 8.51 | 8.51 | Pass |
| `--ink` `#cdcdb3` | 11.99 | 10.79 | 8.87 | 8.87 | Pass |
| `--ash` (and `--ash-dim`, `--chevron`, `--stamp-quiet`) `#a29f86` | 7.24 | 6.52 | 5.36 | 5.36 | Pass |
| `--signal-hot` A2 `#ff4dd2` | 6.69 | 6.02 | 4.95 | 4.95 | Pass |
| `--ink-hot` A2 `#ff6ad9` | 7.68 | 6.91 | 5.69 | 5.69 | Pass |
| `--signal-hot` / `--ink-hot` A3 `#f2605e` | 6.11 | 5.50 | 4.52 | 4.52 | Pass, the tightest |
| `--ink-soft` (`--brick`, `--stamp-soft`) `#e6e08a` | 14.22 | 12.80 | 10.52 | 10.52 | Pass |
| `--on-signal`: A2 abyss on `#e04ac0`; A3 Bone on `#b32c33` | | | | 5.46; 4.83 | Pass |
| `--caption-ink` abyss on `--caption-paper` | | | | 14.22 | Pass |

No exceptions, in either alarm option.

**Tier separation inside the Theme** (ΔE00, A2): hot to canary 65.0, hot to running white 48.3, canary to running white 13.3. The two pale inks differ in hue and chroma (lemon against khaki white), and the stamp word carries the tier, as in KNIGHTMARE.

### ΔE00 against every other Theme

Computed by us with CIEDE2000 (our implementation passes Sharma, Wu and Dalal's test pairs and reproduces the juries' figures, for example `#ff405f`–`#e3121b` = 14.6). The Wave 2 Themes are taken as the Wave 2 jury moved them: DKR's tank-grey ground (`#131a17` / `#1d2622`) and phosphor waiting ink (`#bde3a1`); *Absolute* unchanged; *Arkham*'s plum ground (`#1a0f15` / `#2b1822`) with Bone as working ink (`#f3e5e8`); DKR's Bone is its final `#e9f2ee`.

| Year One (A2) | VENGEANCE | PALE MOONLIGHT | WATCHFUL PROTECTOR | KNIGHTMARE | ANCIENT GRACE (DKR) | BLUE COLLAR (*Absolute*) | SERIOUS HOUSE (*Arkham*) |
|---|---|---|---|---|---|---|---|
| Surface / raised | 9.3 / 20.2 | 8.6 / 12.3 | 14.6 / 21.7 | 15.8 / 20.2 | **6.4 / 11.1** | 25.8 / 34.5 | 17.3 / 27.7 |
| Alarm `#ff4dd2` | 35.9 | 65.2 | 37.7 | 23.2 | 61.8 | 80.0 | **11.9** |
| Running white `#e2e3c8` vs their working ink | 25.4 (amber) | 30.2 (steel) | 21.9 (mercury) | **6.9** (Bone) | 9.7 (Bone) | 34.5 (lavender) | 17.4 (Bone) |
| Canary `#e6e08a` vs their waiting ink | 48.3 | 26.4 | 23.1 | 17.3 | 12.0 (phosphor) | 47.2 | 11.4 |

Against Clawd orange: alarm 34.6, canary 38.3, running white 34.8. Absolute's lemon *alarm* is 8.3 from the canary *waiting* ink; the jury settled that the way Wave 1 settled the ambers: the stamp word carries the tier and the picker previews each alarm (jury §3.11). Every working and waiting ink is at least 6.9 from every other Theme's, which clears the Wave 2 rule (~5).

## 4. Type

No lettering from the book is used: Todd Klein's captions are his own hand, and the logo is DC's. Licences checked through the [Fontsource API](https://api.fontsource.org/v1/fonts/neucha) on 2026-10-14.

| Role | Proposal | Licence / package | Why, and how close |
|---|---|---|---|
| Wordmark and intro | **Permanent Marker** 400 (new) | **Apache-2.0**, `@fontsource/permanent-marker` (Latin) | "the look and feel of a favorite writing instrument" ([description](https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/DESCRIPTION.en_us.html)). Blunt, even strokes with round ends: the nearest open face to a nib "that didn't come to a point". Caps only, so it sets only the wordmark and the intro. Needs a NOTICE line, as Syncopate does |
| Headlines (empty-state and sheet titles) | **Neucha**, through `--font-headline` | shared engine token (jury §6) | So "Quiet so far. I don't trust it." reads in Gordon's hand, not in shouting marker capitals |
| Stamps, caption-box headings, Night Report | **Neucha** 400 (new) | OFL-1.1, `@fontsource/neucha` (Latin, Cyrillic) | An upright printed hand, mixed case, clean at small sizes ([description](https://raw.githubusercontent.com/google/fonts/main/ofl/neucha/DESCRIPTION.en_us.html)): the register of Gordon's captions without copying Klein's hand. **The upright hand is Year One's** (jury §9.4); *Arkham*'s stamps move to IM Fell English SC. If 12.5px of Neucha tires the eye as the report body, `--font-report` falls back to Barlow and Neucha keeps the stamps and headings (decide on screen) |
| Dateline | Barlow Semi Condensed 700, through `--font-dateline` | Year One's engine token (default `var(--font-report)`) | The book's dates are typeset (Helvetica Bold, our reading). Today `.report__dateline` inherits `--font-report`, hence the token |
| Body / mono | Barlow Semi Condensed / JetBrains Mono (kept) | OFL | |

**Stamp widths, roughly measured** (Pillow at 1000 units, letter spacing ignored): in Neucha, PERMISSION is 0.81 of Special Elite's PERMISSION, and the widest word a Year One stamp may say (CASE OPENED, a standard notice) is 0.89. Special Elite's own widest is 1.07 and fits, so Neucha at 12px (0.97 of Special Elite at 11px) should fit. `stampWidth.test.ts` decides.

**Alternatives considered** (widest stamp word against Special Elite's PERMISSION): Kalam, OFL, 1.06–1.07 (slanted: Gordon's captions stand upright); Gochi Hand, OFL, 1.04 (too loose); Architects Daughter, OFL, 1.17; Handlee, OFL, 1.23 (too wide); Just Another Hand, Apache-2.0, 0.65 (too light at 12px); Patrick Hand, OFL (the first draft's choice, the same design as Patrick Hand SC); Caveat Brush (cursive, which is Bruce's half).

## 5. Voice

**Who speaks.** Gordon, writing his notes: first person, present tense, plain, wry, tired, a little scared and honest about it, a family man in a department he cannot trust. What separates him from VENGEANCE's Bruce is the man, not the tense. He does not send the user to bed (VENGEANCE, WATCHFUL PROTECTOR and KNIGHTMARE do), and **he leaves work-shift words to *Absolute*** (no "on the job", no "shift", no "clock"; jury §3.13). No line repeats another Theme's sentence. *Quiet* and *dark* mean only "nothing needs you".

**The dated caption.** The Night Report's dateline is the month and the day, as the book's scene breaks print them: "October 14", in Barlow bold (`--font-dateline`), mixed case, no box, no time. The report's headings go into Gordon's canary caption boxes (`--caption-paper`, dark ink, Neucha).

**Sample lines** (ours; none quotes the book):

1. Empty state title: "Quiet so far. I don't trust it." (Kept by the jury, after PALE MOONLIGHT's "For now." The hint stays "Nothing needs you right now.")
2. No cases: "No cases open. Enjoy it while it lasts."
3. Nothing heard, but the plugin may miss sessions: "Nothing on the radio. That proves nothing."
4. Night Report name: **"Notebook"**.
5. Dateline: **"October 14"**.
6. Heading for what awaits the user: "Needs your signature" (it matches SIGN HERE). Heading for running work: "On the street".
7. Nothing awaits: "Nothing needs your signature. They can manage without you tonight."
8. **Close (rewritten, jury §3.13):** when something waits, "That's all I've got. Your name's still on some of it." When nothing does, "That's all I've got. Nothing here has your name on it." The first draft's "Somebody still needs you." echoed KNIGHTMARE's "Some of it still needs you." and is dropped.
9. Intro tagline: **"New in town."** (the jury's suggestion; it is true of both men on January 4). "First year on the job." is dropped: it is the work frame, which is *Absolute*'s.
10. Unlit Signal tooltip: "Quiet on the radio."
11. Settings kicker: "The squad room". Atmosphere toggle: "Smoke", hint "Smoke off the street behind the cases".
12. Footnote when a case closes: "Case closed. One honest thing today."

**The book's own words.** Only the display name, BECOME A BAT. No other line appears: not as the Signature's hover (its screen-reader label is "Bat-Clawd in a swarm of bats"), and not Gordon's last-page beat.

## 6. Lexicon

Frame: Gordon's notes and a precinct's plain words, a note left on a desk. Checked against the four shipped Lexicons and the three Wave 2 ones as the jury fixed them (DKR: Channel, Your cue, OK TO AIR?, DEAD AIR, YOU'RE ON, LATEST, FROZEN; *Absolute*: Needs you, PERMIT?, BLOWN, ASKING, JAMMED; *Arkham*: At the door, LET IN?, BROKEN, KNOCKING, NEW NOTE, Stalled).

| Standard | Year One | Verdict |
|---|---|---|
| Case | **Case** (kept) | A cop's word already |
| Needs you | **Needs you** (kept) | The short alternatives are taken or misread |
| Permission | **SIGN HERE** | Clear: your signature is needed. Kept by the jury |
| Error | **GONE WRONG** | Clear, at least as severe. Kept by the jury. BROKEN is *Arkham*'s, BLOWN *Absolute*'s, DEAD AIR DKR's |
| Waiting | **SEE ME**, decided on screen | The note on the desk. **Risk** (jury §4): a boss's or teacher's "you're in trouble", one tier too severe, close to Error. **Fallback: Waiting** (standard), as Case, Needs you and Stalled are |
| New reply | **MEMO** | Something new to read. Kept by the jury; React developers may read "memo" as memoization, low risk on a stamp |
| Stalled | **STALLED** (kept) | A car stalls, and Gordon drives. *Arkham* also keeps it standard |
| Case opened / closed | standard | |

Windows notifications and the tray keep the standard words (`CONTEXT.md`).

## 7. Bat-Clawd

The body, eyes, arms and legs keep their pixels and the three Moods (Costume Rule, `DESIGN.md`). Grid units are those of `suits.ts` (16×11 map, drawn in half-unit rows; viewBox −6…22 × −1…12). At 54px one unit is about 1.9px.

### The first suit

The grey suit, the big black chest bat and the armour belong to DKR now (jury §9.5). Year One keeps **its own black bat on the only light suit**: told apart by value (a chalk suit, where DKR's is mid-grey `#666864` and *Absolute*'s teal `#3f6b6e`), by the trunks, by a smaller bat, and by the bat's traced shape.

**The jaw (jury §5: 1.16:1 on the draft's `#9a9e9a`).** Two options, decided on screen:

- **S1. Chalk suit (recommended):** `--suit` `#d0d3cc`. The orange jaw on it is **2.08:1** in luminance and 32.1 ΔE00 apart in hue; the black chest bat on it is 12.81:1. It is 33.7 from DKR's suit, 37.8 from *Absolute*'s, 68.7 from PALE MOONLIGHT's. The jury found `#b4b8b3` reaches only 1.57:1; going this far is what it takes to approach 2:1 without a collar.
- **S2. Collar:** keep the draft's `#9a9e9a` and add a 1-unit cowl-black collar under the jaw (the chest map's first unit row as `'...cccccccccc...'`). The jaw on the collar is **5.85:1**. Cost: the Wave 2 rule keeps 1 unit of suit between the chest bat and anything cowl-black, so under the collar (y 5–6) the bat starts at y 7.0, and it must end on the canary belt at y 8.0 (below). That leaves it 1 unit tall: at 2.5:1, about **2.5 units wide** (5px at 54px), too small to read as a bat. In practice S2 gives up the chest bat.

**The rest of the suit:**

- **Cowl, cape, gloves, boots: neutral near-black** (`#141412`), with the neutral rim. No blue cast: the 1987 covers show the cowl near black, the blue was never sampled, and grey-and-blue is *The Animated Series*' suit in Wave 3 (jury §2, §8). The cowl is VENGEANCE's map (short ear tips at x = 4 and 11).
- **Trunks.** The map's rows are half a unit, so a single trunks row would be under the 1-unit floor. Year One's rows below the chest are: the belt, a full unit of solid canary (y 8–9, `'...bbbbbbbbbb...'` twice), then the thigh row in cowl (`'....c.c..c.c....'`, y 9–9.5) and the boots. The draft's black hips row (y 8.5–9) becomes the belt's lower half, so the chest bat rests on canary with a full unit between it and anything black. Below the belt he is still dark: a light torso, a canary belt, dark trunks and boots, the first suit's read at 54px.
- **The capsule belt:** dim canary (`#c2b86a`), a full unit tall and solid. The draft's cowl-black gaps between pouches (`'...bcbcbbcbcb...'`, at x 4, 6, 9 and 11) and a dark buckle are dropped: they sat under the chest bat and would have joined it. Against the chalk suit the canary is only 1.34:1 in luminance, but 20.4 ΔE00 in hue, and its lower edge sits on the dark trunks at 9.10:1, so the belt reads by its hue and that edge. Decide on screen that it still reads as a capsule belt.
- **The chest bat (S1):** `kind: 'emblem'`, 5 units wide, centred at (8, 7.0): y 6.0–8.0 and x 5.5–10.5 at about 2.5:1. It keeps a full unit of chalk below the jaw row (y 5) and 2.5 units to each side of the body (x 3–13), and it rests on the solid canary belt (9.57:1, which the Wave rule allows), with that full unit of canary between it and the black trunks at y 9. The draft's 6-unit bat at y 6.0–8.4 sat on the belt's black gaps (x 6 and 9) and 0.1 unit above the black hips row, so bat, gaps and trunks would have merged into one dark apron. With S2, about 2.5 units at y 7.0–8.0 (above).
- **The cape: four deep points.** The jury found five 1-unit teeth too fine at 54px. Each half of the hem now has four points, at least 1.5 units deep and 1.5 units apart, uneven. Draft, hanging behind him (the Signature and the perch): `M1.6 5 L14.4 5 L14.6 9.6 L13.9 11.3 L13.2 9.7 L12.0 11.2 L11.1 9.6 L10.2 11.4 L9.3 9.7 L8.6 11.2 L7.8 9.6 L7.0 11.3 L6.1 9.6 L5.3 11.1 L4.5 9.6 L3.6 11.4 L2.8 9.7 L2.0 11.2 L1.4 9.6 Z` (tips at y 11.1–11.4, inside the viewBox; notch-to-tip 1.5–1.8). It must not read as VENGEANCE's even zigzag, PALE MOONLIGHT's arcs, WATCHFUL PROTECTOR's straight edge, KNIGHTMARE's duster, DKR's two tails, *Absolute*'s blades or *Arkham*'s bleed. Judge at 54px.

### Poses

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | **Seated, wrapped**, with the four-point hem. Option: in the high-backed chair, a 1-unit-wider dark rect behind him up to y −0.5 | The study scene (Wikipedia: the bat "settles on the bust"; the chair is from memory, §12) | Optional, on screen |
| flying | **Trailing cape with the feathered hem** (jury §3.7), two frames on the flying cadence with the bob | No single source; Year One's Batman runs and leaps across rooftops. The tucked leap (#407 cover) is dropped: it is DKR's Signature figure without the tilt | Draft trailing half: `M3 5 L13 5 L13.4 9.2 L12.4 10.9 L11.4 9.4 L9.6 11.1 L8.4 9.5 L6.2 11.3 L5.0 9.6 L2.6 11.0 L1.2 9.4 L-1.0 10.8 L-2.2 9.0 L-4.4 10.4 L-3.6 8.6 L-5.4 7.2 L-1.4 6.4 Z`. Four trailing capes now exist (PALE MOONLIGHT, KNIGHTMARE, *Arkham*, Year One); the hems tell them apart. Decide on screen |
| alarmed | **Cape flung open**, legs apart, the aura | The book's entrances; no single sourced frame | The light suit, trunks and four-point hem carry it. No raised arm (VENGEANCE's flare), no arms-up cape (PALE MOONLIGHT), no armour (DKR) |

### Signature pose: "The swarm"

**The scene it honours.** Trapped in a condemned building while the police bomb it and send in a SWAT team, Batman calls the bats from the cave with a signal device and escapes in the swarm ([Wikipedia](https://en.wikipedia.org/wiki/Batman:_Year_One); the 1987 #406 cover shows the raid). The name points the same way: the man becoming a bat in a cloud of them.

**The record** (jury §3.8). WATCHFUL PROTECTOR's Sonar shipped standing, so two front-on stands are taken: VENGEANCE's, with a shadow at the feet, and WATCHFUL PROTECTOR's, with the cape hanging square. PALE MOONLIGHT is three-quarter under an oval up and to the right; KNIGHTMARE's coat blows out to the right. The first draft's swarm (a front-on stand with four 5px specks) would have been a third stand in the picker.

**The drawing, revised.**

- **One cloud, not specks.** Seven copies of the shared two-frame bat path, 2.4–3.4 units wide, overlapped into one lopsided mass about 7×4 units at x −5…2.5, y −1…3, in `--cowl` with the neutral rim on the mass's outer edge only. It **swallows his left ear and the left of his cowl** (x 3–4.5, y 0–2.5), so the top-left of his outline dissolves into bats. It stops above y 2.5 wherever x ≥ 4, so both white eyes stay clear. Two stragglers break off it, at about (−6, −0.8) and (−3, 4.5).
- **The cape flares left.** The left half of the hanging cape lifts outward under the cloud, its outer edge from the shoulder (1.6, 5) to about (−2, 10), as if the bats' wingbeat pulled it; the right half hangs. With the cloud above, the whole outline leans up and to the left.
- **No raised arm, no device:** a raised arm with something in the hand is VENGEANCE's flare.
- **His eyes** look up and to the left (−0.6 along, −0.4 up), still white.
- **The shared bat.** The bat shape is the two-frame path that *Absolute*'s colony draws on the ash painter (jury §6, §9.10): one drawing in shared code, used here as overlay paths. No later Theme uses bats in either slot.

**Why the outline now differs.** No other Signature has a mass that joins the figure at the head and spills past the sprite box on the left. VENGEANCE and WATCHFUL PROTECTOR are symmetric; PALE MOONLIGHT's oval floats free up and to the right; KNIGHTMARE's coat flies out to the right at waist height. DKR's leap is tilted with a long diagonal; *Absolute*'s lift stands on four legs; *Arkham*'s mirror is a second figure to the right. **Decide on screen** beside VENGEANCE and WATCHFUL PROTECTOR at 54px.

**The reveal** (six steps, four a second, about 1.5 s, on the shared clock):

1. Three bats at his feet on the left (x −3…2, y 9–11).
2. Six bats rising up his left side, the cape's left edge starting to lift.
3. Nine bats around his left shoulder, the cape flared.
4. The bats close into the cloud over his left ear.
5. The cloud at full size; one straggler peels off.
6. The held frame. Under reduced motion, only this.

**On the perch** he holds the final frame. Once a cycle, the `watchOn` beat lets one straggler cross from the cloud to the right in two steps. The two glances look up-left and back.

**Alternatives** (on screen if the cloud fails): **B. The window** (seated in the chair, a bat on its top, glass shards): it collides with his own sleeping pose, which outranks. **C. The leap**: DKR's figure.

**Aura:** `'alarmed'`. The alarm colour never shows as the swarm plays.

## 8. Emblem

**The shape.** Year One's own chest bat, traced, not described from memory. The jury found the first draft's description ("wide and level-winged, small head, two short ears, scalloped underneath, no oval") word for word the same as DKR's second-suit bat (jury §3.14). So:

1. **Trace it** from a high-resolution page of the 2016 Absolute Book One (the artist-remastered recolour), a page where the suit is front-on and lit. The 400px cover scans found here are too small.
2. **Compare it with DKR's traced bat at 64px on the disc** before either is drawn. What may separate them: Mazzucchelli says he studied the early stories for a traditional Batman (*Direct Currents*, via Comic Book Daily), and the pre-1964 chest bat was a plain black bat whose ears and wings varied from issue to issue (fan and secondary sources, §12). That is a lead to check in the trace, not a description to draw from.
3. If the two traces read the same at 64px, the maintainer decides: DKR's source owns the big bat (jury §9.5), so Year One would keep the difference in size and value (a 5-unit bat on chalk against DKR's up to 8 units on mid-grey) and in its finish on the disc (below).

Add it to `emblems.ts` as `BAT_1987` on the shared 120×48 grid, symmetric about x = 60, finish `'none'`, no plate.

**In the masthead and intro:** the bat in `--emblem` (the suit's chalk, 12.81:1 on abyss), flat. The wordmark is Bone in Permanent Marker.

**The 64px Signal disc.**

- **Unlit:** olive glass (`--abyss` to `--surface`), the bat a shade (`--raised`) in it.
- **Lit:** flat colour, not a glow. Three hard-edged rings with no blending: `radial-gradient(circle at 50% 50% in srgb, var(--lens-core) 0 34%, var(--signal-hot) 34% 68%, var(--signal) 68% 100%)`, the bat in abyss across it, the rim in `--blood`. With A3, the same recipe in the A3 values. No other lens has hard stops (jury §8: "Year One's hard-stop lens took 'flat' on the disc").
- **Optional:** the bat offset half a pixel down and right from the rings, like plates out of register on newsprint. Drop it if it reads as a bug.
- The count: a Barlow numeral on the chip (A2: abyss ink, 5.46:1; A3: Bone, 4.83:1).
- **Tray and toast icons** stay single, from the default emblem.

## 9. Atmosphere

**Smoke off the street** (approved, jury §9.12). A new painter, `smoke`, the only kind with no partner in the Wave. Four to six soft round puffs rise from the bottom edge, each growing from about 12 to 40px across and fading from 10% to nothing over four seconds, 2px up a tick with a slight sway, on the shared 8 fps clock. Positions come from the frame index, not random per frame. Colour `--smoke-puff`, the #404 cover's olive lifted. Behind it, a static smog haze from below in `--smog` (12% at the bottom edge). Source: the tenement bombing, where the recolour fills the page with smoke (R-DC; pink-salmon there, which here would sit on Clawd and the alarm, hence olive), and DC's "gorgeous grime".

- It differs from everything taken: rain falls in streaks, snow falls, ash blows sideways, the windows are still, DKR's static and *Arkham*'s scratches are marks in place, *Absolute*'s bats cross. Smoke rises, swells and fades. It shares only a smog from below with PALE MOONLIGHT, in olive instead of brown.
- Gated like the others: it moves while the pointer is over the window and for a few seconds after news, and is absent under reduced motion.
- The engine needs a `SmokeAtmosphere` type in `atmospheres.ts` (colour, count, `rise`, `grow`, `life`, `sway`) and its painter in `painters.ts` (radial-gradient circles on the canvas).

**Fallback:** the haze alone, with no moving parts. **Halftone grain (optional):** a faint dot screen in place of the film grain, after the 2016 Absolute's 1987 book printed "on stock that simulates the look and feel of the original comics" ([DC](https://www.dc.com/graphic-novels/batman-year-one-1987/absolute-batman-year-one)). It needs the optional `--grain-texture` variable (jury §6).

## 10. Distinctiveness

Scored by the jury's rules (jury-wave-1 §1). A Theme stays only with C on at least 3 of 5 axes against every other. Updated for this revision; the Wave 2 Themes as the jury moved them.

| Against | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| VENGEANCE | C: olive-khaki vs warm black (9.3 / 20.2); magenta vs red (35.9) | C | C: chalk suit, trunks, four deep points, the swarm leaning left vs charcoal, an even zigzag, a symmetric stand (the jury's ~ becomes C with the four-point hem) | C: rising smoke vs rain | C (narrow): Gordon wry vs Bruce bleak | **5** |
| PALE MOONLIGHT | C: khaki vs brown (8.6 / 12.3); magenta vs gold | C | C: no oval; four points vs scallops | C: smoke rising vs snow | C: notebook vs newsroom | **5** |
| WATCHFUL PROTECTOR | C: khaki vs steel blue; magenta vs blue | C | C: a leaning swarm vs a square front-on stand; four points vs straight | C: smoke vs still windows | C (narrow): private notes vs a briefing | **5** |
| KNIGHTMARE | C: khaki vs scorched brown; magenta vs crimson (23.2); running white vs Bone 6.9 | C | C: cape vs duster | C: smoke rising vs ash sideways | ~: two weary men at night (inherent, jury §1) | **4** |
| ANCIENT GRACE (DKR) | C: khaki vs tank grey (6.4 / 11.1); magenta vs cyan; no shared yellow (canary vs phosphor 12.0) | C: Permanent Marker / Neucha vs Bangers | C: chalk suit vs mid-grey, a 5-unit bat vs up to 8 (shapes to compare, §8), four points vs two tails; the leap is DKR's alone now | C: smoke vs static | C: a notebook vs TV | **5** |
| BLUE COLLAR (*Absolute*) | C: khaki vs violet; magenta vs lemon; khaki white vs lavender | C: Permanent Marker / Neucha vs Bungee | ~: standard ears in both now; four points vs blades and a bat vs a block, both black on a grey-ish suit (chalk vs teal, 37.8) | C: smoke vs bats | C: the work-shift lines are gone; a cop's notebook vs a shift | **4** |
| SERIOUS HOUSE (*Arkham*) | C: khaki vs plum (17.3 / 27.7); magenta vs claret (11.9); khaki white vs Bone (17.4) | C: Neucha vs IM Fell English SC (the hand is Year One's) | C: standard vs tall ears; visible vs hidden chest | C: smoke vs scratches that fade | C: a notebook vs a house | **5** |

With A3 as the alarm instead, the palette axis still scores C everywhere (ground and working ink differ), but against KNIGHTMARE the alarms would sit 6.1 apart, and against VENGEANCE 8.5–10.4: the alarm itself would stop telling them apart.

***The Long Halloween* (Wave 3).** Year One takes the dated dateline (month and day), Gordon, the canary, the olive grime, the newsprint magenta and the upright hand. Long Halloween keeps the holidays as named days, Tim Sale's solid blacks, the Roman and the mob (Falcone appears in Year One too, so this Voice keeps the mob out), Two-Face's coin, and a palette of its own. A pumpkin orange must be checked against Clawd; the green-greys and the pinks are taken (jury §8). If A3 were chosen, the collected-cover red would also be taken, and Long Halloween's own famous reds would have less room.

## 11. Legal note

- **Trademark (DC):** the bat symbol, "Batman", "Gotham" and the *Year One* name. The emblem is traced and redrawn by us as a vector from the first suit, credited as "the bat symbol is a trademark of DC, used here as fan art" in the README and NOTICE.
- **Copyright to avoid:** any page, panel or cover (sampled for colour only, never shown or traced into the app, except the chest bat's outline as the emblem rule allows); Todd Klein's lettering; the collected editions' title lettering and cover design (the red of the trade paperback is a colour, its layout is not ours); Mazzucchelli's drawings; the book's dialogue beyond the display name's three words.
- **Free to use:** flat colour, khaki and olive, magenta or red as colours, a printed-hand face, a canary caption box, dated scene breaks, a swarm of bats, a grey suit with trunks, smoke.
- **Fonts:** Permanent Marker, Apache-2.0 (licence and a NOTICE line); Neucha, OFL-1.1. Both on Fontsource.
- **Display name:** BECOME A BAT is a three-word fragment of one line, used as an allusion, within ADR 0001's "very short". It is the whole of the book's words in this Theme.

## 12. Unverified items

- **The window line's exact wording.** Checked again on 2026-10-14. A page reproduction of the scene in #404 was found ([PopOptiq](https://www.popoptiq.com/top-10-batman-year-one-moments/); also reproduced by [Goomba Stomp](https://tilt.goombastomp.com/culture/batman-year-one-the-best-moments/)): the bat crashing through the glass, and Bruce's captions "Without warning, it comes..." and "...crashing through the window of your study ...and mine...". The panel with the line itself is not in it. Transcriptions differ: "Yes, father. I shall become a bat." (India Art Review, and a fan account on X), "I shall become a bat" (Goodreads, PopOptiq's heading), "I will become the bat" (one review). Scans Daily, TV Tropes, the DC fandom wiki and Wikiquote returned 403, 402 or 404. **The name's three words, "become a bat", must be read on a page of #404 (or the Absolute Book One) before the Theme ships.**
- **The alarm A2 is ours.** `#ff4dd2` is process magenta turned 16° toward violet, 13.2 ΔE00 from `#ec008c` and 19.5 from the sampled 1987 pink. That the 1987 pinks are tints of the magenta plate is how four-colour newsprint works, not a statement from Lewis.
- **A3's red** is sampled from Penguin Random House's cover file for ISBN 9781401207526 (a later printing, DC's current logo). DC's shaded mock-up of the same design reads `#ab282e`–`#af2930`, a fan-site scan of an earlier printing `#ce1131`. Who coloured the cover (Lewis, Mazzucchelli or a DC designer) was not found. That it is "the most famous" Year One cover is the maintainer's reading; it is the standard trade paperback.
- **The 2005 edition labels** (ivory-and-brick hardcover, red softcover) follow the fan site; Wikipedia dates the trade paperback February 2007.
- **All hex values** come from compressed web images, not printed pages.
- **The olive ground's source** is shared: the #404 cover (1987) and the recolour's khaki greys (one page). The jury's anchors (`#191b0b`, `#292c11`) are proposals.
- **The *Direct Currents* interview** was read through DC.com's quotes and Comic Book Daily's summary only.
- **The dated captions' face** (Helvetica Bold, our reading); seen on two scanned pages.
- **The study chair** for the optional sleeping pose: from memory.
- **The first suit's colours.** The covers show a light grey body (`#919b9b` on #407) and a near-black cowl and cape. S1's chalk is lighter than any sample, chosen for the jaw.
- **The chest bat's shape:** not yet traced. The early-stories lead is from the *Direct Currents* summary and from fan and secondary sources on the pre-1964 bat ([Sideshow](https://www.sideshow.com/blog/the-evolution-of-the-batman-symbol); [Brainbound](https://www.brainbound.blog/batman-symbol-evolution-history); a [Wikipedia mirror](https://wikipedia2007.classicistranieri.com/b/a/t/Batman_emblem.html) on the 1964 oval).
- **Gregory Wright as *The Long Halloween*'s colourist:** from memory.
- **Smoke elsewhere in the story:** not checked beyond the tenement page.
- **Stamp widths:** measured roughly; `stampWidth.test.ts` is the judge.
- **Everything on the grid** (the jaw options, the four-point hem, the belt, the trunks, the bat's size, the cloud and the flared cape): drafts for a labelled comparison image at 54–78px.

## 13. Sources

- DC.com: [Rosie Knight, "The Woman Whose Colors Brought *Batman: Year One* to Life...Twice", 29 Mar 2024](https://www.dc.com/blog/2024/03/29/the-woman-whose-colors-brought-batman-year-one-to-life-twice), quoting Lewis in *Direct Currents* #1 (1988); its interior images and banner were sampled.
- DC.com: [*Absolute Batman: Year One*](https://www.dc.com/graphic-novels/batman-year-one-1987/absolute-batman-year-one), [*Batman: Year One — The Deluxe Edition* (new edition)](https://www.dc.com/graphic-novels/batman-year-one-1987/batman-year-one-the-deluxe-edition-new-edition) and the book-and-DVD set's product image (sampled).
- Penguin Random House cover service: [trade paperback, ISBN 9781401207526](https://images.penguinrandomhouse.com/cover/9781401207526) (sampled, A3), [2012 Deluxe, ISBN 9781401233426](https://images.penguinrandomhouse.com/cover/9781401233426).
- The Comics Journal: [Dan Nadel, "David Mazzucchelli Disavows Forthcoming Batman Reprint", 5 Mar 2012](https://www.tcj.com/david-mazzucchelli-disavows-forthcoming-batman-reprint/).
- Nerdist: [Rosie Knight, "How Richmond Lewis and *Batman: Year One* Impacted *The Batman*", 28 Mar 2022](https://nerdist.com/article/richmond-lewis-batman-year-one-legacy-colorist/).
- Comic Book Daily: [Scott VanderPloeg, "Time Capsule: DC Direct Currents 1, January 1988", 20 Jan 2016](https://comicbookdaily.com/collecting-community/bound-together/time-capsule-dc-direct-currents-1-january-1988); eBabble: [VanderPloeg, review of the Absolute Edition, 30 Jun 2017](https://ebabble.net/absolute-batman-year-one/).
- Comic Watch: [Dustin Gebel, "Batman #404–407: The Myth of Man and Bat", 15 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-404-407-the-myth-of-man-and-bat) and [on the Artist's Edition, 14 Oct 2024](https://comic-watch.com/comic-book-reviews/year-one-week-batman-year-one-artists-edition-spotlights-the-genius-of-david-mazzucchelli).
- The Slings & Arrows: [Woodrow Phoenix on the Artist's Edition](https://theslingsandarrows.com/?p=125965), quoting Mazzucchelli's introduction.
- Groucho Reviews: [Peter Canavese, *Batman: Year One*, 2 Jun 2008](https://www.grouchoreviews.com/features/58).
- PopOptiq: ["Top 10 Batman Year One Moments"](https://www.popoptiq.com/top-10-batman-year-one-moments/) (a reproduction of the window panels in #404); Goomba Stomp: ["Batman Year One: The Best Moments"](https://tilt.goombastomp.com/culture/batman-year-one-the-best-moments/) (the same).
- Wikipedia: [*Batman: Year One*](https://en.wikipedia.org/wiki/Batman:_Year_One) and its [#404 cover file](https://en.wikipedia.org/wiki/File:Batman_vol._1-404_(January_1987).jpg) (sampled).
- Fan sources, used only to fill gaps: [Ultimate Batman Comics, "Batman: Year One [Coloring]"](http://ultimatebatmancomicswebsite.weebly.com/batman-year-one-coloring.html) (page scans, Lewis's colour plate, the 2005 and 2012 covers; sampled); [DCU Guide, *Batman* #404](https://dcuguide.com/Batman_404) and #405–407 (cover scans, sampled); [CBR forum, 2015](https://community.cbr.com/threads/year-one-art-doesnt-look-right.53383/); [a Tumblr post on the recolouring](https://cv-zedricdimalanta.tumblr.com/post/131207932434/a-brief-behind-the-scenes-look-at-the-recoloring); [Capt. Can Comics' copy of the GCD record for #404](https://www.captcancomics.ca/products/apr09-24-1260); [Sideshow](https://www.sideshow.com/blog/the-evolution-of-the-batman-symbol) and [Brainbound](https://www.brainbound.blog/batman-symbol-evolution-history) on the early chest bat.
- The window line: [Goodreads quotes](https://www.goodreads.com/work/quotes/2501570); [India Art Review](https://indiaartreview.com/stories/batman-year-one-bruce-wayne-gotham/).
- Fonts: Fontsource API ([Neucha](https://api.fontsource.org/v1/fonts/neucha), [Permanent Marker](https://api.fontsource.org/v1/fonts/permanent-marker), [Kalam](https://api.fontsource.org/v1/fonts/kalam), [Gochi Hand](https://api.fontsource.org/v1/fonts/gochi-hand), [Architects Daughter](https://api.fontsource.org/v1/fonts/architects-daughter), [Handlee](https://api.fontsource.org/v1/fonts/handlee), [Just Another Hand](https://api.fontsource.org/v1/fonts/just-another-hand)); Google Fonts descriptions ([Neucha](https://raw.githubusercontent.com/google/fonts/main/ofl/neucha/DESCRIPTION.en_us.html), [Permanent Marker](https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/DESCRIPTION.en_us.html)).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-1.md`](jury-wave-1.md), [`jury-wave-2.md`](jury-wave-2.md), [`burton-1989.md`](burton-1989.md), [`the-batman-2022.md`](the-batman-2022.md), [`knightmare-palette.md`](knightmare-palette.md), [`dark-knight-returns.md`](dark-knight-returns.md), [`absolute-batman.md`](absolute-batman.md), [`arkham-asylum.md`](arkham-asylum.md), `app/src/renderer/src/styles/themes/*.css`, `app/src/renderer/src/components/NightReport.css`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`, `app/test/themeContrast.test.ts`, `themes.test.ts`, `stampWidth.test.ts`, `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`.
