# Theme dossier: Absolute Batman (2024)

Research note, 2026-10-14. Scope: one Bat-Signal Theme after *Absolute Batman* (DC All In, from October 2024), written by Scott Snyder, drawn by Nick Dragotta, coloured by Frank Martin and lettered by Clayton Cowles (#1–18). It covers palette, type, Voice, Lexicon, Bat-Clawd, the emblem, the Signal and the Atmosphere, measured against the four Themes as shipped in v1.2.0 ([`wave-2-brief.md`](wave-2-brief.md) §3), not against a projection. Terms are those of [`CONTEXT.md`](../../../CONTEXT.md). Wave 2 is issue #118, Linear LUC-79.

Revised 2026-10-14 after the wave 2 jury (`jury-wave-2.md` §9).

## 1. TL;DR

- **The Theme in one sentence:** heavy black ink on a violet night, a huge working man's Batman in a cold teal suit with a block of a bat across his chest, and one loud flat colour, the comic's sound-effect lemon, kept for "something needs you".
- **Display name: BLUE COLLAR** (approved, jury-wave-2 §9.11). The picker's credit field reads "Scott Snyder and Nick Dragotta's Absolute Batman (2024)"; `words.ts` adds the "after", so the field never starts with it (jury-wave-2 §3.15). It alludes to the book's premise in Snyder's own words: this Bruce "comes up blue-collar, grows up in Crime Alley" ([Newsarama, 2024](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)).
- **Martin's colour, measured:** across 23 cover and interior images of issues #1–#6, a page is 0–53% near-black ink, and most of the rest is one or two flat colour families per scene: aquarium cyan, a red field, a violet-slate night, an olive basement, a sepia flashback (§3). There is no interview in which Martin describes this; it is our measurement, and a reviewer's line: "each setting has a prominent color" ([AIPT, #2 review](https://aiptcomics.com/2024/11/13/absolute-batman-2-review/)). The Theme takes the ink and the violet night as its ground and **one** flat colour as its alarm.
- **Alarm color: SFX lemon `#ecf05a`** (kept, jury-wave-2 §9.8), after the lemon field of the #2 cover (`#fcea49`) and the sound effects inside #2 (`#f5e477`), pushed 10° toward green. It crosses a Wave line on purpose: a yellow alarm near PALE MOONLIGHT's gold, 15.8 ΔE00 from its `#f0c24b`, never an oval, flat. It is **judged on screen** in the picker, on a stamp and as a lit disc beside PALE MOONLIGHT's gold. The #1 cover's logo yellow (`#fdc946`, 2.5 from PALE MOONLIGHT) and the red, orange and cyan fields stay ruled out (§3).
- **Ground and inks** (kept, jury-wave-2 §9.2): ink black with a violet cast (`#0a0812`) and indigo surfaces (`#17132a`, `#221c3c`), from the #2 night city and the second-printing trade dress. **Working ink:** lavender (`#b8b0e0`). **Waiting ink:** flashback mauve (`#d79bbd`). Arkham moves to a plum-black, so the violet is this Theme's alone.
- **Type:** **Bungee** for the display *and* the stamps (jury-wave-2 §9.3: Bangers is DKR's). PERMISSION fits every room only at **9.5px** with a 1.5px border, measured: the smallest stamp in the app, and a deviation from the jury, which expected Bungee to fit at about 10px (§3.3) and named Luckiest Guy only if PERMISSION didn't fit (§9.3). If 9.5px reads too small on screen, the fallback is **Luckiest Guy at 11px** (§4). The empty-state and sheet titles go to Barlow through the shared `--font-headline` token, because Bungee has no lowercase. **Shantell Sans** for the Night Report, decided on screen, with Barlow as the fallback. All OFL-1.1.
- **Voice and Lexicon:** the night shift of a city engineer (power plants, sewers, permits): plain, physical, hopeful, punching up. Not Alfred (KNIGHTMARE's), not an ops log (WATCHFUL PROTECTOR's). Case and **Needs you** stay standard; stamps **PERMIT?**, **BLOWN** (a blown fuse), **ASKING**, NEW REPLY (kept), **JAMMED** (jury-wave-2 §9.9). No Voice line repeats another Theme's sentence.
- **Bat-Clawd:** a cold teal suit (`#3f6b6e`, at least 13.9 ΔE00 from every other suit), **standard ears** (the tall ones are Arkham's, jury-wave-2 §9.6), shoulders a unit wider than the others, an 8×2 block across the chest at y 6–8 with a full unit of suit under the cowl, a one-unit olive belt the block can rest on (1.63:1 on the suit, 5.62:1 against the block), and a black cape whose hem ends in three long blades a side. **Signature pose (recommended): "On its wings"**, after the #3 cover: the cape's tethers plant like stilts and lift him off the floor. **Alarmed:** the axe drawn from his chest, raised top left, and the shoulder spikes out.
- **Atmosphere:** the **colony**, a few faint lavender bats flapping across a flat violet dusk band under the masthead, now a **bat option on the existing ash painter** (jury-wave-2 §6, §9.10, §9.12), drawn with the same two-frame bat that Year One's swarm Signature uses. No new kind.
- **Engine needs:** the bat sprite option on the ash painter (shared with Year One) and the shared `--font-headline` token. Nothing in the suit, the disc or the viewBox.

**Still decided on screen** (each from a labelled comparison image, in the Theme's build):
1. The lemon alarm beside PALE MOONLIGHT's gold, on a stamp and as a lit disc; and the lit disc's field, `--signal-hot` (L* 92, the brightest lit disc in the app) or `--signal` (L* 82, near PALE MOONLIGHT's core) beside the mascot (§8).
2. The Signature: A "On its wings" (recommended), B "The axe" or C "About to burst" (§7).
3. Bungee as a stamp face at 9.5px, below the jury's "about 10px", against KNIGHTMARE's Archivo stamps (both heavy capitals in a box); Luckiest Guy at 11px if 9.5px reads too small (§4).
4. Shantell Sans as the Night Report body at 12.5px, or Barlow (§4).

## 2. Visual identity and sources

What makes this version recognisable, in order of strength:

1. **The size.** Dragotta estimates him at 6'6" and 275 pounds ([Sktchd, David Harper](https://sktchd.com/longform/absolute-batman-nick-dragotta-feature/)). Snyder: "he really just emerged in my mind as a Dark Knight Returns-sized Bruce, but young and fast", "just this unstoppable wall coming at you"; Dragotta: "He's a hulking Bat that has the agility of an acrobat" ([Newsarama / GamesRadar+, Sam Stone, 12 Sep 2024](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)). Snyder's note to Dragotta was "bigger" (Sktchd).
2. **No fortune.** Bruce is a civil engineer "working in the power plants and sewers" ([Newsarama](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)), "a do-it-yourself-er, engineer, city worker" (Dragotta, [Sktchd](https://sktchd.com/longform/absolute-batman-nick-dragotta-feature/)). Snyder: "it's hard not to punch down when you're a generational billionaire" ([DC.com, 6 Sep 2024](https://www.dc.com/blog/2024/09/06/inspiring-the-next-generation-snyder-and-dragotta-talk-absolute-batman)); "He's just a guy on the train" ([ScreenRant, Kate O'Donoghue, 12 Sep 2024](https://screenrant.com/absolute-batman-interview-scott-snyder-nick-dragotta-new-origin-symbol/)). His father Thomas is a school teacher killed at the Gotham City Zoo; his mother Martha a social worker; he grew up in Crime Alley ([Wikipedia](https://en.wikipedia.org/wiki/Absolute_Batman), fan-maintained, for the plot).
3. **The chest emblem, which is an axe.** "It's also, it acts as an axe", "Our character wouldn't wear the baroque bat symbol", "it's going to protect his vitals" (Dragotta, [ComicBook.com, Matthew Aguilar, 14 Sep 2024](https://comicbook.com/comics/news/dc-nick-dragotta-scott-snyder-reveal-what-absolute-batman-costume-can-do-batmobile-bat-symbol/)). "It bows on the edges and looks like it's about to burst" (Dragotta); "All credit to Nick in terms of the logo itself" (Snyder) ([Newsarama](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)). "It's barely a bat" (Snyder, [ScreenRant](https://screenrant.com/absolute-batman-interview-scott-snyder-nick-dragotta-new-origin-symbol/)). Left to Dragotta, it "would have made it cover his whole upper torso" ([Sktchd](https://sktchd.com/longform/absolute-batman-nick-dragotta-feature/)). In #1 the plate comes off the chest as the axe's head ([Inside the Magic](https://insidethemagic.net/2024/10/dc-absolute-batman-logo-dr1/), secondhand).
4. **The working suit.** "A utility cowl or a utility suit cape", "Everything's usable" (Dragotta, [AIPT Q&A, 11 Sep 2024](https://aiptcomics.com/2024/09/11/absolute-batman-scott-snyder-nick-dragotta-qa/)). The ears are detachable ([ScreenRant](https://screenrant.com/absolute-batman-interview-scott-snyder-nick-dragotta-new-origin-symbol/)); Wikipedia calls them throwing knives. Shoulder spikes "show up situationally" to "ramp up the scare factor" ([Sktchd](https://sktchd.com/longform/absolute-batman-nick-dragotta-feature/)). Dragotta kept the silhouette: "you don't mess with the silhouette" ([ComicBook.com](https://comicbook.com/comics/news/dc-nick-dragotta-scott-snyder-reveal-what-absolute-batman-costume-can-do-batmobile-bat-symbol/)).
5. **The cape's tethers.** Dragotta liked the spiky cape points many artists draw: "what if those tethers can separate?", "programmable capes and things that, almost like tent poles in the seams"; Snyder says a nano-tech idea was dropped and everything is mechanical, with stilts, hooks and retracting spikes ([ComicBook.com](https://comicbook.com/comics/news/dc-nick-dragotta-scott-snyder-reveal-what-absolute-batman-costume-can-do-batmobile-bat-symbol/)). The source is the animal: bats "can walk with their wings, they can fly, and they can pick things up" (Dragotta, [Sktchd](https://sktchd.com/longform/absolute-batman-nick-dragotta-feature/)). The #3 main cover shows it: Batman held high on his cape's tethers, their hooked tips planted on the street.
6. **The 2024 Gotham.** Dragotta: "I'm going blocky like our Bruce. Our Gotham probably more resembles Chicago, but I'm going geometric, graphic, and bold. It's blocky, built on solid perspective, and it's lit. You just speckle it with light. … maybe going towards more Kirby-esque with a lot more black." Snyder: "a colder and prettier city. The gargoyles are overshadowed", glass towers "half of which are empty in the top ten floors" ([Newsarama](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)). **"Brutalist" is not in any source found**; the creators' words are blocky, geometric, cold and glass. **"Arkham as a city" is not supported either**: Ark M is an offshore black-site prison (#7–14), which Snyder built because "in the main universe, Arkham isn't scary anymore" ([AIPT, May 2025](https://aiptcomics.com/2025/05/13/scott-snyder-absolute-batman-qa/)). The first arc's enemy is the Party Animals, a gang under Roman Sionis, Black Mask ([Wikipedia](https://en.wikipedia.org/wiki/Absolute_Batman)).
7. **Dragotta's line and Martin's colour.** Dragotta: "speed with speed lines, silhouettes, blood splatter, and just good design"; "I almost think of Frank as the finisher on this art, he brings so much to it, so much atmosphere" ([Newsarama](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)). Snyder wanted "that David Mazzuchelli grounded, inky art with that fresh, almost manga-influenced kinetic feel" (same). Reviewers: Martin's rendering is "minimal, relying mostly on flat colors and simple shadows and highlights" ([Urbane Turtle, #1](https://urbaneturtle.com/2024/10/13/review-absolute-batman-1/)); "Each setting has a prominent color, whether the light blue of an aquarium or the pale green of a basement light bulb" (Marvel Maximus, [AIPT, 13 Nov 2024](https://aiptcomics.com/2024/11/13/absolute-batman-2-review/)).
8. **Alfred** is an MI6 agent, not a butler, and narrates the book ("He narrates the book", Dragotta, [DC.com](https://www.dc.com/blog/2024/09/06/inspiring-the-next-generation-snyder-and-dragotta-talk-absolute-batman)). Snyder: "Alfred is the emotional center of the book" ([AIPT, May 2025](https://aiptcomics.com/2025/05/13/scott-snyder-absolute-batman-qa/)). The Theme does **not** use him (§5).

**What the Theme takes:** the ink, the flat colour, the size, the block bat, the tethers and the working man. **What it leaves:** the orange #1 cover sky (Clawd's colour), the glass-and-lit-windows Gotham (WATCHFUL PROTECTOR's skyline), Alfred (KNIGHTMARE's), the violence and the zoo shooting.

## 3. Palette

**Provenance key.** *S* = sampled by us (median RGB of a hand-picked region, or the top cluster of a 5- or 10-colour median-cut quantisation). Every *S* hex names its image. *P* = proposed by us, with its sampled parent. All images are **digital RGB files** released by DC for press and solicitation, not scans of the printed comic. The printed book is CMYK on paper and will differ. These digital files are the closest thing to the colourist's own output we can reach, so they are the edition we prefer; but **no hex here is a measurement of the printed comic.**

| Image | What it is | Source |
|---|---|---|
| `Absolute_Batman_1.png` (1200×1845) | #1, Cover A, first printing, Dragotta and Martin | [DCU Guide](https://dcuguide.com/Absolute_Batman_1) (fan wiki, DC's cover file) |
| `Absolute_Batman_2…5.png` | #2–#5, main covers (#4's cover by Dragotta; the issue's interiors by Gabriel Hernández Walta) | DCU Guide, issue pages |
| `ABM012ndPrinting_Cvr_Main_Dragotta.jpg`, `ABM01_2ndPrinting_Cvr_Var-Foil_Dragotta.jpg` | #1 second printing, main and foil variant | [AIPT, sell-out notice](https://aiptcomics.com/2024/10/03/absolute-batman-1-sells-out/) (DC press images) |
| `absolute-batman-11.jpg`, `absolute-batman-12.jpg` | #1 interior pages (the zoo flashback; the street) | [AIPT, #1 preview](https://aiptcomics.com/2024/10/03/dc-preview-absolute-batman-1/) |
| `AB02_NYCC1…6.jpg` | #2 interior pages shown at NYCC 2024 | [AIPT, #2 first look](https://aiptcomics.com/2024/10/18/dc-first-look-absolute-batman-2-brings-the-violence/) |
| `Absolute-Batman-3-1…5.jpg`, `Absolute-Batman-6-1…4.jpg` | #3 and #6 covers and preview pages | [AIPT, #3 preview](https://aiptcomics.com/2024/12/13/dc-preview-absolute-batman-3/), [#6 preview](https://aiptcomics.com/2025/03/14/dc-preview-absolute-batman-6/) |

### How Martin's pages read

Measured on each whole image (scaled to 400px; "near-black" = every channel under 40; "chromatic" = HLS saturation over 0.35 and lightness 0.15–0.85; hue families of the chromatic pixels):

| Image | Near-black | Chromatic | Dominant hue families | Top colours |
|---|---|---|---|---|
| #1 Cover A (textless art) | 8% | 23% | red-orange 100% | sky `#c8613c`, suit `#667569`, `#4b5551` |
| #1 interior, zoo flashback | 0% | 67% | orange 78% | sepia `#bc9b5d`, `#a27942` |
| #2 Cover A | 47% | 22% | yellow-orange 95% | lemon field `#fdf07f`, plate `#516054` |
| #2 interior, aquarium | 23% | 38% | cyan 86% | `#1b92c8`, `#5abbdd` |
| #2 interior, the bat on red | 53% | 38% | red 94% | `#dd363e` |
| #2 interior, night city | 30% | 12% | blue-violet, cyan, red | `#463c60`, `#475777`, gutters `#fdfdfd` |
| #2 interior, basement | 47% | 8% | yellow 100% | olive `#5f6d61`, SFX lemon `#f5e477` |
| #2 interior, burning tower | 37% | 17% | red-orange 93% | `#a34a34` |
| #3 Cover A | 50% | 20% | red, rose 95% | `#842d34`, `#b7342d` |
| #3 interior, flashback | 0% | 17% | rose, azure | violet `#5b5b7e`, mauve `#975b77` |
| #5 Cover A | 34% | 14% | cyan 56% | slate `#2c4558` |
| #6 Cover A | 21% | 44% | red-orange 91% | `#d45e36`, `#da3f2b` |
| #1 second printing, foil variant | 14% | 22% | — | trade-dress indigo `#3e4176` (40%) |

**Read plainly:** the book is a black-ink book. Up to half of a page is ink. Each scene then takes one loud flat colour, rarely two, and the colour changes from scene to scene (orange, yellow, red, cyan, violet, olive, sepia). So the book does read in a limited palette, but **per scene, not per book**. A Theme cannot change colour per scene, so it takes the constant (the ink and the night) as its ground and one scene colour as its alarm, which is how the pages already use colour: one thing is loud.

### Sampled colours

| Element | Hex | Image, region (fractions of width, height), method |
|---|---|---|
| The ink (cape, shadow) | `#070405` | #1 Cover A, (0.38, 0.65)–(0.48, 0.75), top cluster 75% |
| Suit, lit | `#3c5458` (48%), `#48676a` (21%) | #1 Cover A, belly (0.45, 0.37)–(0.56, 0.43), top clusters |
| Suit, highlight | `#5e897b` | #1 Cover A, shoulder (0.30, 0.30)–(0.40, 0.36), top cluster |
| Belt | `#4f6340` | #1 Cover A, (0.42, 0.465)–(0.58, 0.49), median |
| Orange sky | `#d35b2b` | #1 Cover A, (0.20, 0.25)–(0.27, 0.38), median |
| Logo "BATMAN" yellow | `#fdc946` | #1 Cover A, (0.17, 0.09)–(0.73, 0.19), top cluster 70% |
| Logo plate | `#2d4645` | #1 Cover A, (0.17, 0.045)–(0.73, 0.075), top cluster |
| Lemon field | `#fcea49` | #2 Cover A, (0.00, 0.28)–(0.12, 0.48), median of the yellow |
| SFX lemon ("BRRRR", "CLICK") | `#f5e477` | #2 interior, basement page, top cluster |
| Red field | `#dd363e` | #2 interior, the bat on red, top cluster |
| Logo plate, red | `#be2a28` | #3 Cover A, (0.2, 0.035)–(0.7, 0.06), top cluster |
| Fire | `#da3f2b`, `#d45e36` | #6 Cover A, whole image, top clusters |
| Aquarium | `#1b92c8`, `#5abbdd` | #2 interior, aquarium page, top clusters |
| Night city, violet | `#463c60` | #2 interior, night city page, top cluster |
| Night city, slate | `#475777` | same |
| Flashback violet, mauve | `#5b5b7e`, `#975b77`, `#9d7b91` | #3 interior, flashback page, top clusters |
| Trade-dress indigo | `#3e4176` | #1 second printing, foil variant, top cluster 40% |
| Page and balloon white | `#fdfdfd` | #2 interiors, gutters, top cluster |

### The Alarm color

**Candidates, measured** (ΔE00 against each shipped alarm; contrast on the proposed `--raised` `#221c3c`, the lightest ground):

| Candidate | Hex | Anchor | vs Clawd `#d77757` | vs VENGEANCE `#e3121b` | vs PALE MOONLIGHT `#f0c24b` | vs WATCHFUL PROTECTOR `#3d8bff` | vs KNIGHTMARE `#ff405f` | On raised | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Cover orange | `#d35b2b` | #1 Cover A sky, S | **8.2** | 11.2 | 34.7 | 48.3 | 18.8 | 4.08 | Dead: closer to Clawd than the Nolan red the jury flagged at 9.6, and it fails as text |
| Logo yellow | `#fdc946` | #1 Cover A logo, S | 32.1 | 47.6 | **2.5** | 62.0 | 49.6 | 10.48 | Dead: it *is* PALE MOONLIGHT's gold |
| Red field | `#dd363e` | #2 interior, S | 15.0 | **6.4** (5.1 to its ink) | 46.9 | 46.2 | 9.4 | 3.60 | Red on a dark ground is VENGEANCE's main idea; fails as text |
| Fire | `#da3f2b` | #6 Cover A, S | 12.4 | **4.0** | 42.5 | 48.0 | 13.8 | 3.64 | VENGEANCE's red |
| Aquarium cyan | `#1b92c8` | #2 interior, S | 46.8 | 55.7 | 56.4 | **11.2** | 55.7 | 4.61 | Not hot, and a blue alarm is WATCHFUL PROTECTOR's |
| Lemon field | `#fcea49` | #2 Cover A, S | 42.9 | 59.6 | 11.9 | 69.0 | 61.4 | 13.09 | Close to gold |
| **SFX lemon** | **`#ecf05a`** | #2 cover and SFX lemon, pushed 10° to green, P | **46.2** | **63.6** | **15.8** | **73.2** | **65.0** | **13.22** | **Proposed** |

**Why lemon.** In this book the loudest thing on a page is the sound effect. Martin colours the lettered noise of #2 (the gunfire, the Batmobile) in lemon over black and olive, and the #2 cover puts the whole fight on a lemon field. An alarm that looks like a sound effect says "noise, now". It is the hottest colour that fits the palette, as the Alarm color rule asks, and it is the only candidate that clears every shipped Theme and Clawd.

**Crossing the line (brief §4).** This is a yellow alarm, and yellow is PALE MOONLIGHT's. The case for it: (1) the brief bars a **gold or yellow oval**; this alarm is never an oval: it fills a block bat, stamps and a flat disc; (2) it is 15.8 ΔE00 from PALE MOONLIGHT's alarm ink and 25.7 from its fill, a plain difference: lemon-green at hue 106° against brass-gold at 85°, flat against lit metal; (3) the two grounds are far apart (indigo against smog brown, §10). **Decided:** lemon stays (jury-wave-2 §9.8), judged on screen in the picker, on a stamp and as a lit disc beside PALE MOONLIGHT's gold. The red field (`#dd363e`, 6.4 from VENGEANCE) is no longer the fallback the Theme plans for: it would put BLUE COLLAR back among the reds.

**Its ladder:**
- `--signal-hot` and `--ink-hot` `#ecf05a`: stamps, lit pixels, the lens, the count box.
- `--signal` `#cbd43c`: large fills (the lit disc, the alarmed aura's core). Pushed so it stays 14.7 from PALE MOONLIGHT's gold (`#d6d132`, the first try, was 11.7).
- `--on-signal` = `--abyss`: ink on lemon (12.3:1 on `--signal`). Bone on lemon fails (1.41:1), so nothing light is ever written on the alarm.
- No unlit "off" shade: lemon appears only when something needs the user. The chest bat stays ink.

### Token map

Every variable a shipped Theme sets (the 101 shared by all four CSS files), plus this Theme's own (`--dusk`, `--colony`, for the Atmosphere) and the shared `--font-headline` the engine PR adds (jury-wave-2 §6).

| Token | Value | Provenance | Role |
|---|---|---|---|
| `--abyss` | `#0a0812` | P: the ink `#070405` (S, #1 Cover A), with the night's violet cast | Page |
| `--smoke` | `#0f0c1b` | P | Top gradients |
| `--surface` | `#17132a` | P: night city `#463c60` (S, #2 interior) darkened to L* 7 | Cards, row hover |
| `--raised` | `#221c3c` | P: the same, L* 13 | Card hover |
| `--line` | `#3a3262` | P: trade-dress indigo `#3e4176` (S, #1 second printing) darkened | Rules, borders |
| `--surface-deep` | `#0d0a17` | P | Deep wells |
| `--frame` | `#1c1733` | P | Window frame |
| `--header-fade` | `#0d0a17` | P | Header fade |
| `--sheet-top` | `#1d1834` | P, no lighter than raised | Sheet top |
| `--shadow` | `#000000` | as every Theme | Shadows |
| `--blood` | `#6b3a58` | P: flashback mauve `#975b77` (S, #3 interior) darkened | The waiting rule; never text |
| `--signal` | `#cbd43c` | P: SFX lemon, darker for fills | Alarm fills |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | P | Halo, alarm only |
| `--signal-hot` | `#ecf05a` | P: `#fcea49`, `#f5e477` (S, #2), 10° to green | Alarm: small lit marks, lens, count box |
| `--on-signal` | `var(--abyss)` | P | Ink on lemon |
| `--ink-hot` | `#ecf05a` | P: as `--signal-hot`, 13.2:1 on raised | PERMIT? and BLOWN stamps, hot pen |
| `--ink-soft` | `#d79bbd` | P: flashback mauve `#975b77`, `#9d7b91` (S, #3 interior), lifted | ASKING and NEW REPLY stamps, soft pen |
| `--ink-live` | `#b8b0e0` | P: flashback violet `#5b5b7e` (S, #3 interior), lifted | Working |
| `--ink` | `#cdc8dc` | P | Body text |
| `--accent` | `var(--bone)` | P (jury-wave-1 §7) | Focus, toggles, tab underline |
| `--accent-hot` | `var(--bone)` | P | |
| `--accent-deep` | `var(--line)` | P | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 12%, transparent)` | P | |
| `--selection` | `var(--line)` | P | |
| `--progress-deep` | `var(--line)` | P | |
| `--progress-hot` | `var(--ink-live)` | P | Progress is working, not an alarm |
| `--thumb` | `var(--abyss)` | P | |
| `--brick` | `var(--ink-soft)` | P | |
| `--stamp-hot` | `var(--ink-hot)` | P | |
| `--stamp-soft` | `var(--ink-soft)` | P | |
| `--stamp-quiet` | `var(--ash)` | P | JAMMED |
| `--in-progress` | `var(--ink-live)` | P | |
| `--in-progress-glow` | `color-mix(in srgb, var(--ink-live) 40%, transparent)` | P | |
| `--danger` | `var(--raised)` | P | Quit's hover stays a shadow |
| `--waiting-rule` | `var(--blood)` | P | |
| `--report-rule` | `var(--line)` | P | |
| `--clawd` | `#d77757` | Claude Code's `clawd_body`, unchanged | Bat-Clawd's body |
| `--bone` | `#f1eef6` | P: page and balloon white `#fdfdfd` (S, #2 interiors), cooled | Primary text, wordmark |
| `--ash` | `#9d96b2` | P | Secondary text |
| `--bone-dim` | `var(--ink)` | P | |
| `--ash-dim` | `var(--ash)` | P | |
| `--chevron` | `var(--ash)` | P | |
| `--clawd-eye` | `var(--bone)` | rule: white eyes | |
| `--clawd-eye-dim` | `color-mix(in srgb, var(--clawd-eye) 18%, transparent)` | P | |
| `--cowl` | `#0b0a10` | P: the ink | Cowl, gloves, cape |
| `--cowl-edge` | `color-mix(in srgb, var(--ink-live) 28%, transparent)` | P: a lavender rim, away from the alarm (Costume Rule) | |
| `--cowl-shine` | `var(--raised)` | P | |
| `--suit` | `#3f6b6e` | P: suit `#3c5458`, `#48676a` (S, #1 Cover A), with more chroma (jury-wave-2 §2): 3.35:1 on abyss; 10.7 ΔE00 from DKR's drafted `#5d6661` (13.9 from its final neutral `#666864`), 37.8 from Year One's chalk `#d0d3cc` (S1), 30.4 from Arkham's `#55425e` | Suit |
| `--gloves` | `#0b0a10` | P | |
| `--belt` | `#7f8c55` | P: the lit cluster of the #1 Cover A belt (`#627b58`, S), lifted: 1.63:1 on the suit, 5.62:1 against the chest block | Olive belt, one unit tall |
| `--buckle` | `#4f6340` | S: #1 Cover A belt, its median | Pouches, darker than the band |
| `--cape` | `var(--cowl)` | P | |
| `--cape-rim` | `var(--cowl-edge)` | P | |
| `--thread` | `var(--cowl-edge)` | P | |
| `--chest` | `#070405` | S: the ink | The block bat on his chest (3.44:1 on the suit, 5.62:1 on the belt it rests on) |
| `--aura-core` | `color-mix(in srgb, var(--signal-hot) 90%, transparent)` | P | Alarmed only |
| `--aura-glow` | `color-mix(in srgb, var(--signal-hot) 55%, transparent)` | P | Alarmed only |
| `--emblem` | `var(--ink)` | P | Masthead bat |
| `--disc-bat` | `var(--line)` | P | Unlit bat |
| `--glass-shine` | `#2a2348` | P | |
| `--glass` | `var(--abyss)` | P | |
| `--disc-rim-inner` | `#070405` | P: Dragotta's ink line, the disc's 4px inset rim | |
| `--disc-rim-outer` | `var(--line)` | P | |
| `--lens-core` | `var(--signal-hot)` | P | |
| `--lens-rim` | `#070405` | P | |
| `--lens-bat` | `#070405` | P | |
| `--lens-bat-edge` | `transparent` | P | |
| `--notice-top` | `var(--surface)` | P | |
| `--notice-foot` | `var(--smoke)` | P | |
| `--notice-hover-top` | `#211b3a` | P, no lighter than raised | |
| `--notice-hover-foot` | `#130f22` | P | |
| `--haze` | `color-mix(in srgb, var(--dusk) 22%, transparent)` | P | The dusk band, from above (the haze owns the band; the painter draws only bats) |
| `--haze-edge` | `color-mix(in srgb, var(--dusk) 6%, transparent)` | P | |
| `--haze-inset` | `-15% -10% auto -10%` | P: a tighter band than KNIGHTMARE's `-35% -20% auto -20%` (jury-wave-2 §3.9) | From above |
| `--grain-opacity` | `0.03` | P: flat colour, little grain | |
| `--searchlight` | `var(--bone)` | P | |
| `--font-display` | `'Bungee', 'Arial Black', sans-serif` | §4 | |
| `--display-weight` | `400` | Bungee has one weight | |
| `--font-body` | `'Barlow Semi Condensed', 'Segoe UI', sans-serif` | shared | |
| `--font-type` | `var(--font-display)` | P | Case numbers, log speakers |
| `--font-mono` | `'JetBrains Mono', 'Cascadia Mono', monospace` | shared | |
| `--font-report` | `'Shantell Sans', 'Segoe UI', sans-serif` | §4 | |
| `--font-stamp` | `var(--font-display)` | jury-wave-2 §9.3: one family for display and stamps, as KNIGHTMARE does with Archivo | |
| `--font-headline` (shared, new) | `var(--font-body)` | jury-wave-2 §6; default `var(--font-display)` in every other Theme | Empty-state and sheet titles: Bungee has no lowercase |
| `--font-label` | `var(--font-body)` | P: Bungee is too wide under 19px | |
| `--heading-case` | `none` | P | |
| `--font-case-title` | `var(--font-body)` | P: session titles are long; Bungee is caps-only signage | |
| `--case-title-weight` | `600` | P | |
| `--folder-name-size` | `14px` | P | |
| `--folder-name-tracking` | `0.3px` | P | |
| `--wordmark-size` | `16px` | P: BAT-SIGNAL in Bungee is 107px wide at 16px, before tracking (measured) | |
| `--wordmark-tracking` | `1px` | P | |
| `--wordmark-glow` | `transparent` | P: ink does not glow | |
| `--pen-hot` | SVG stroke in `#ecf05a`, width 2 | P: a heavier, straighter pen (Dragotta's line) | |
| `--pen-soft` | SVG stroke in `#d79bbd`, width 1.5 | P | |
| `--stamp-tilt` | `0deg` | P: straight, like a site sign; KNIGHTMARE's Archivo leans a degree under grit | |
| `--stamp-tilt-slight` | `0deg` | P | |
| `--stamp-border` | `1.5px` | P: 2px leaves PERMISSION 1px over the narrowest margin | |
| `--stamp-size` | `9.5px` | P: the largest size at which PERMISSION fits every room in Bungee (§4) | |
| `--stamp-weight` | `400` | Bungee has one weight | |
| `--stamp-mask` | `none` | P: flat colour, no wear | |
| `--lens-breaks` | not set | KNIGHTMARE's own | |
| `--disc-lens` | `linear-gradient(var(--signal-hot), var(--signal-hot))` | P: one flat field, no gradient (Martin's flat colour) | |
| `--dusk` (new) | `#3e4176` | S: trade-dress indigo, #1 second printing | The Atmosphere's band |
| `--colony` (new) | `var(--ink-live)` | P: lavender, drawn at 20–30% alpha (§9) | The bats |

### Re-scoping what `--signal` paints

As in PALE MOONLIGHT and KNIGHTMARE: the wordmark is Bone; focus, toggles, sliders and the tab underline are `--accent` (Bone); progress is `--ink-live`; selection, card hover and sheet spill are neutral; the cowl edge is lavender at 28%, not the alarm. Lemon paints only stamps, the lit disc, the count box, the alarmed aura and urgent cards.

### WCAG contrast (computed, WCAG 2.x)

`themeContrast.test.ts` checks text on 11 grounds. Every extra ground here (`--smoke`, `--surface-deep`, `--header-fade`, `--sheet-top`, `--notice-*`) is set no lighter than `--raised`, and the lowest ratio of the 11 was computed for each ink.

| Ink | on `--abyss` | on `--surface` | on `--raised` | Lowest of the 11 | 4.5:1? |
|---|---|---|---|---|---|
| `--bone` `#f1eef6` | 17.32 | 15.74 | 14.08 | 14.08 (raised) | Pass |
| `--ink` `#cdc8dc` | 12.20 | 11.08 | 9.92 | 9.92 | Pass |
| `--ash` `#9d96b2` | 7.04 | 6.40 | 5.73 | 5.73 | Pass |
| `--ink-hot` / `--signal-hot` `#ecf05a` | 16.26 | 14.77 | 13.22 | 13.22 | Pass |
| `--signal` `#cbd43c` | 12.33 | 11.20 | 10.02 | 10.02 | Pass |
| `--ink-soft` `#d79bbd` | 8.82 | 8.01 | 7.17 | 7.17 | Pass |
| `--ink-live` `#b8b0e0` | 9.77 | 8.88 | 7.95 | 7.95 | Pass |
| `--on-signal` (abyss) on `--signal` | | | | 12.33 | Pass |
| `--clawd` `#d77757` | 6.31 | 5.73 | 5.13 | | n/a (mascot) |
| `--suit` `#3f6b6e` | 3.35 | 3.04 | 2.72 | | n/a (mascot; reads at 3:1 on the page) |
| `--blood` `#6b3a58` | 2.24 | 2.04 | 1.82 | | Never text |

No exceptions. Tiers inside the Theme: alarm lemon to waiting mauve 56.5 ΔE00, waiting mauve to working lavender 14.9, alarm to working 54.8. Lemon next to Clawd orange: 46.2 ΔE00 (2.58:1 in luminance), so the orange mascot is the only warm pixel at rest and the alarm cannot be mistaken for him.

### ΔE00 against the shipped Themes (computed, CIEDE2000)

| Token | vs VENGEANCE | vs PALE MOONLIGHT | vs WATCHFUL PROTECTOR | vs KNIGHTMARE | vs Clawd `#d77757` |
|---|---|---|---|---|---|
| Alarm `#ecf05a` (vs each alarm ink) | 63.6 | 15.8 | 73.2 | 65.0 | 46.2 |
| Surface `#17132a` | 14.4 | 16.0 | 11.6 | 16.6 | 52.0 |
| Raised `#221c3c` | 19.0 | 22.7 | 13.8 | 22.9 | 50.7 |
| Abyss `#0a0812` | 5.1 | 5.7 | 4.0 | 6.1 | 52.1 |
| Working `#b8b0e0` | 43.5 (amber) | 13.8 (steel) | 28.0 (mercury) | 34.1 (bone) | 34.5 |
| Waiting `#d79bbd` | 26.5 | 37.1 | 37.6 | 37.0 | 26.1 |

The abysses of all five Themes are near-black and sit 4–6 apart, as the four shipped ones already do; the surfaces carry the difference, and the closest is WATCHFUL PROTECTOR at 11.6–13.8 (violet at hue 301° against blue steel at about 230°). The closest working ink is PALE MOONLIGHT's steel at 13.8, so the jury's "three cool working inks" problem does not return: the suit's teal-grey, lifted (`#a9c2bf`), was 10.2 from WATCHFUL PROTECTOR's mercury and was dropped for that reason. The waiting mauve is 19.9 from KNIGHTMARE's pink-crimson alarm ink, the nearest thing it could be mistaken for. A dark teal ground after the logo plate (`#121b1d`) was also tried: 5.2 from WATCHFUL PROTECTOR's surface, so rejected.

## 4. Type

The book's masthead is two pieces: "ABSOLUTE" in a wide, rounded, squared sans, and "BATMAN" in very heavy, tall, tightly packed block capitals on a bat-winged plate (#1–#5 Cover A). Who designed the masthead is **unverified**; Snyder credits Dragotta with "the logo", but in context he means the chest emblem ("that shirt") ([Newsarama](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)). Clayton Cowles' lettering and sound effects are his own commercial faces and hand work, so they are out (brief §2). Licences checked through the Fontsource API (`"license":"OFL-1.1"`, `npmVersion 5.3.0` for all three).

| Role | Proposal | Licence / package | Why, and limits |
|---|---|---|---|
| Display (wordmark, intro) and stamps | **Bungee** 400 | OFL-1.1, `@fontsource/bungee` | Blocky signage capitals, built on squares: Dragotta's "blocky like our Bruce", "geometric, graphic, and bold". Not the masthead's letters (no tight vertical block), but the same weight and stance. Caps only, one weight. One family for the display and the stamps (jury-wave-2 §9.3), as KNIGHTMARE does with Archivo: PERMIT?, BLOWN and JAMMED read as signs on a work site. Different register from Anton (condensed poster), Limelight (deco), Syncopate (wide modern) and Archivo 800 (a grotesque). **Bangers, the first draft's stamp face, is DKR's** |
| Headlines (empty-state and sheet titles) | Barlow Semi Condensed, through the shared `--font-headline` | OFL, bundled | Bungee has no lowercase (below) |
| Night Report body | **Shantell Sans** 400–500 | OFL-1.1, `@fontsource/shantell-sans` (variable) | A designed handwriting face: the shift notes written on a clipboard. Close in spirit to comic lettering, but mixed case, because a report in all caps is hard to read |
| Body, labels | Barlow Semi Condensed (kept) | OFL, bundled | |
| Mono | JetBrains Mono (kept) | OFL, bundled | The Machine Voice Rule holds |

**Bungee is caps-only** (measured: its lowercase glyphs are the capitals). For the stamps that is what we want. For headlines it is not: `--font-display` also sets the empty-state title and the sheet titles (`Cards.css` `.empty__title`, `Sheets.css` `.sheet__title`, 20px), and an all-clear in shouting capitals is the wrong register. **Decided** (jury-wave-2 §6, §9.12): the engine adds the shared `--font-headline` token, default `var(--font-display)` so no shipped Theme changes; DKR, BLUE COLLAR and Year One point it at a face with lowercase. Here it is Barlow Semi Condensed.

**Stamp widths in Bungee, measured** (computed by us with PIL on the Google Fonts TTF). The rooms are those `stampWidth.test.ts` reads from the CSS: the Night Report margin, 101px for the boxed stamp at 0.12em; the narrowest panel's margin, 87px at 0.04em; the watch strip, 72px unboxed at the stamp size less 1.5px; the notice card, 272px. A boxed stamp adds 12px of padding and two borders. PERMISSION has to fit too, because with the Lexicon off the stamps say the standard words in this face.

| Bungee | PERMISSION (margin / narrow / strip, px) | Verdict |
|---|---|---|
| 11px, 2px border | 105 / 97 / 77 | Fails all three |
| 10.5px, 2px border | 101 / 93 / 73 | Fails the narrow margin and the strip |
| 10px, 1.5px border | 96 / 88 / 69 | Fails the narrow margin by 1px |
| **9.5px, 1.5px border** | **92 / 85 / 65** | **Fits every room** |

At 9.5px with a 1.5px border every word fits: NEEDS YOU 81 / 74 / 56, NEW REPLY 82 / 75 / 56, WORKING 72 / 66 / 48, PERMIT? 69 / 64 / 45, ASKING 62 / 57 / 39, JAMMED 65 / 60 / 42, BLOWN 56 / 52 / 35. So **Bungee at 9.5px** is the proposal, the smallest stamp in the app (KNIGHTMARE's is 10.5px). **This departs from the jury.** It estimated that PERMISSION fits "only near 10px" (jury-wave-2 §3.3), and §9.3 reads "Bungee, or Luckiest Guy if PERMISSION doesn't fit". PERMISSION does fit, but only half a pixel under the jury's figure. Its capitals are wide and heavy, so 9.5px Bungee is about as tall as 11px of a lighter face, but that is **decided on screen** at 1x. If it is too small there, the fallback is **Luckiest Guy** (Apache-2.0, `@fontsource/luckiest-guy`, with a NOTICE line as for Syncopate): PERMISSION fits at 11px with a 2px border (89 / 81 / 63). The jury prefers Bungee because it leaves Luckiest Guy free for a later Adam West Theme (jury-wave-2 §8). `stampWidth.test.ts` is the judge.

**Alternatives considered.** Display: **Russo One** (OFL), a rounded squared sans close to the masthead's "ABSOLUTE" line; but it is a heavy sans of normal width like KNIGHTMARE's Archivo, so the jury would likely score Type "~". **Bowlby One SC** (OFL), heavy and wide; its PERMISSION overflows the margin at 11px. Stamps: **Bangers** (OFL), the first draft's choice, is DKR's display and stamp face (jury-wave-2 §3.3). **Luckiest Guy** (Apache-2.0) is the fallback above. Report: **Comic Neue** (OFL) reads as Comic Sans on a grim book. Shantell Sans is a hand, and Year One owns the upright hand (Neucha, jury-wave-2 §9.4); a report body may be shared, but the picker shows it. Shantell Sans at 12.5px is **decided on screen**, and **Barlow** is the fallback.

## 5. Voice

**Frame: the night shift.** This Bruce is a city engineer who keeps Gotham's power plants and sewers running by day and fixes what the powerful break by night. The Voice is his, on the job: plain, physical, a little dry, and hopeful. Snyder built him "to make my kids feel brave"; "the young, idealistic beast that's like 'We can do something about this'" ([Newsarama](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/)).

**How it stays off the other Voices:**
- Not VENGEANCE's journal: that Bruce writes alone and bleak. This one talks like a worker on a shift: tools, pipes, the grid, clocking in and out. Bleak words are out.
- Not KNIGHTMARE: Alfred is KNIGHTMARE's (jury-wave-1 §2, §10.1). Absolute's Alfred narrates the comic, but the Theme leaves him out entirely.
- Not WATCHFUL PROTECTOR: no ops, no field reports, no MI6. A shift and a work site, not a mission. No "log" in the report's name (WATCHFUL PROTECTOR's Sitrep is a military log).

Sample lines (all P, ours; none quotes the comic):

- Empty state title: **"The grid's holding."** The standard hint under it already says "Nothing needs you right now.", so the title doesn't repeat it (jury-wave-2 §3.13).
- Empty Cases: "No cases running. Clock out."
- Intro tagline: **"Built, not bought."**
- Night Report name: **"Shift notes"**; dateline **"NIGHT SHIFT · 02:14"**.
- Report heading for what waits: "Needs your hands"; for running work: "On the clock".
- Report close: **"Tools down. Go home."** when nothing waits; **"Tools stay out. There's work on your bench."** when something does. The first draft's "Shift's not over. Some of it needs you." echoed KNIGHTMARE's shipped close and is gone (jury-wave-2 §3.13). Neither line repeats another Theme's sentence.
- Quiet Signal tooltip: "The grid's holding." (*Quiet* and *holding* mean all clear only; jury-wave-1 §4.3.)
- Settings kicker: "Toolbox" (KNIGHTMARE's is "The workshop", so not that).
- Atmosphere switch: "Bats", hint "Bats over Gotham behind the cases".
- Signature caption, once per session: **"Made it myself."** (P: the book's do-it-yourself suit in four words; not a line from the comic).
- Picker credit: the `film` field is **"Scott Snyder and Nick Dragotta's Absolute Batman (2024)"**, which the picker shows as "after Scott Snyder and Nick Dragotta's Absolute Batman (2024)". The field never starts with "after" (jury-wave-2 §3.15). Frank Martin is credited with the others in the README and NOTICE.

## 6. Lexicon

Frame: a work site. Case keeps its name: `CONTEXT.md` lists "job" among the words to avoid for a Case, and a developer reads "job" as a CI job. The test is jury-wave-1 §5: would a tired developer get the standard meaning at a glance, at the right severity?

| Standard | Themed | Verdict |
|---|---|---|
| Case | **Case** (kept) | "Job", "Shift" and "Ticket" all misread (a CI job, a time block, an issue tracker) |
| Needs you | **Needs you** (standard) | The first draft's "Your turn" sat in KNIGHTMARE's "Your call" slot with the same sense; dropped (jury-wave-2 §4, §9.9) |
| Permission | **PERMIT?** | The question mark matters. Bare PERMIT reads as a permit already granted, the trap that killed SIGN-OFF (jury-wave-1 §5). With it, it asks: may this run? Same device as KNIGHTMARE's ORDERS? |
| Error | **BLOWN** | A blown fuse, in a power-plant engineer's world: failed, at least as severe as "error". BROKEN went to Arkham, which has no in-frame alternative (jury-wave-2 §3.12). BUSTED was rejected: it reads as "caught" |
| Waiting | **ASKING** | Claude is asking you something. Clearer than "waiting", which can read as "waiting on itself" |
| New reply | NEW REPLY (kept) | WORD BACK reads as MS Word or a backup; CALLED BACK as a callback |
| Stalled | **JAMMED** | A machine that will not move: stuck, not finished, not quiet. Unique in the Wave (STUCK, NO WORD, NO CONTACT taken) |

Live states (Working, Idle, Shell) stay standard. Toasts and the tray stay standard, as always.

## 7. Bat-Clawd

Bat-Clawd's body, eyes, jaw and Moods keep their pixels (`BatClawd.tsx`, `BODY_BOX` `[3, 5, 10, 7]`). The size has to come from layers outside the body, each at least 1 grid unit (about 2px at 54px).

**The suit, piece by piece:**

| Piece | Drawing (grid units) | Survives at 54px? | Source |
|---|---|---|---|
| Cowl | Ink `--cowl` down to the eyes, as every suit, with the **standard ears** (`HEAD` in `suits.ts`). The first draft's 2-unit ears reached the viewBox's top edge and matched Arkham's; the tall ears are Arkham's (jury-wave-2 §3.6, §9.6). Absolute's size reads through the shoulders, the block and the blades instead | Yes | #1 Cover A |
| Shoulders | A 1-unit pad outside the body each side, x = 2 and 13, y = 5–6.5, in `--suit` | Yes: he reads two units wider than any other Bat-Clawd | "Hulking" (Dragotta); #1 Cover A |
| Chest | **The block bat**, 8 wide and 2 tall, x = 4–12, **y = 6–8**, in `--chest` ink (3.44:1 on the suit). A **full unit of suit** (y 5–6) between it and the cowl and jaw, which end at y = 5: at the first draft's half unit, ink on ink at 1.04:1, it read as the cowl dripping (jury-wave-2 §5). One unit of suit at each side (x 3–4, 12–13) | Yes: the largest chest symbol in the Wave, 17×4px at 54px | Dragotta: it "would have made it cover his whole upper torso" |
| Belt | Olive band, **one full unit** (two half-rows, y = 8–9), in `--belt` `#7f8c55`, with two 1×1 pouches in `--buckle` `#4f6340`. **1.63:1 on the suit** (the first draft's `#4f6340` band was 1.04:1 and vanished). The block rests directly on it at **5.62:1**, above the Wave's 3:1 floor for a chest symbol touching the belt (jury-wave-2 §3, Wave rules) | Yes | #1 Cover A (the belt's lit cluster `#627b58`) |
| Suit | Cold teal `--suit` `#3f6b6e` (h 204°, C* 16), gloves and boots in ink. **10.7 ΔE00 from DKR's drafted suit** `#5d6661` and 13.9 from the neutral `#666864` it moved to; 37.8 from Year One's chalk `#d0d3cc` (S1); 30.4 from Arkham's plum-grey `#55425e` (jury-wave-2 §9.5: at least 10 apart). 3.35:1 on the page. The jaw sits on it at 1.88:1 in luminance, carried by hue (orange against teal) | Yes | #1 Cover A, more chroma |
| Cape | Ink, rimmed in lavender at 28%. The hem ends in **three long blades a side**, each 1 unit wide at its base, the outer one with a 1-unit hook | Yes, if each blade keeps a 1-unit base; draw two or three, never many thin ones | ComicBook.com (tethers, hooks); #3, #4 Cover A |
| Forearm bands | The black stripes on his forearms | **No**: the arm is one unit; dropped | #1, #4 Cover A |
| Shoulder spikes | Two per side, 1-unit base, 1.5 long, only when alarmed | Yes | "Show up situationally" to "ramp up the scare factor" (Sktchd) |

**Poses:**

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | **Wrapped**, the cape closed round him, two hooks resting on the floor either side | The cape as a tool at rest; no sleeping image in the sources | `seated` with the hem in blade points; 1-unit hooks at x = 1 and 15, y = 10.5 |
| flying | **On a line**: one tether from his raised right hand up past the top of the frame, the cape swinging out behind in its blades | The cape's tethers as grappling hooks (Sktchd; ComicBook.com) | The line is a 1-unit path on the overlay layer from (14, 4) to (16, −3); two frames, rotated +5° and −5° round the line's top, on the flying cadence |
| alarmed | **The axe**: the block bat gone from his chest (the suit shows where it was), the axe held up over his **left** shoulder, shoulder spikes out | #1 interior (the plate comes off as the axe's head); #1 second printing main cover; Sktchd (spikes) | Axe head 3×2 in ink with a 1-unit lemon edge on its blade, at x = 0–3, y = −1.5–0.5; handle 1 unit wide down to his hand at (3, 4). Spikes from (2.5, 5) and (13.5, 5). Lemon aura. **Top left on purpose:** VENGEANCE's alarmed flare (12.75, −1) and PALE MOONLIGHT's Signal oval (19, −1.5) both sit top right; no Pose in the Wave raises anything top left |
| perch | **Signature pose**, below | | |

**Signature pose: three options.** The taken outlines, as built (`suits.ts`): VENGEANCE a symmetric front-on stand; PALE MOONLIGHT three-quarter, looking up, the Signal up and to the right; WATCHFUL PROTECTOR a plain front-on stand with the cape hanging square (its ring plays only in the reveal and once a watch cycle, `suits.ts`); KNIGHTMARE standing, the coat blown out to the right. All four are standing figures; two are front-on stands (jury-wave-2 §3.8). **The #1 cover pose** (feet planted, head down, cape held tight in front) is a symmetric front-on stand: VENGEANCE's outline, so it is out.

| Option | What it is | Source | Outline at 54px | Verdict |
|---|---|---|---|---|
| **A. "On its wings"** | The cape splits into four tethers, two a side, 1 unit wide, angled down and out from the shoulders to hooked tips on the floor at about x = −4, −1, 17 and 20, y = 13. Through the step's `transform`, he is lifted two units off the floor, legs hanging | #3 Cover A (held high on the tethers, hooks on the street); Dragotta: bats "can walk with their wings"; the cape "serves as stilts" (Sktchd) | An arch: a dark mass up top on four thin legs, 24 units wide at the floor against the body's 10. DKR's leap also leaves the ground, but as a figure tilted −15° on a long diagonal; this one is upright and wider at the floor than at the top (jury-wave-2 §3.8) | **Recommended; decided on screen** |
| B. "The axe" | Standing, the axe held low at his right side, its head on the floor beside his foot, chest bare | #1 second printing main cover | A front-on stand with a 3×2 block at the lower right | Close to VENGEANCE's stand; the block is 6px. Better as the alarmed Pose, where it is now |
| C. "About to burst" | Hunched forward, fists down, spikes bursting out of the shoulders and the cape all round him | #4 Cover A (Dragotta's cover); Dragotta: the emblem "looks like it's about to burst" | A spiked star | Unique, but spikes are the alarmed Pose's scare factor; using them at rest dulls the alarm |

**Reveal of A, on the 8 fps clock** (four steps, then held; under reduced motion, the final step):
1. Standing, the cape hanging, hem in its blades.
2. The hem splits: four tethers reach out to the floor, his feet still down.
3. The hooks plant; he rises one unit (`translateY` −1 unit), the tethers drawn one unit longer so the hooks stay on the floor.
4. He rises the second unit and holds, eyes level on the street.

**On the perch:** `watchOn` with two glances along the street; the beat, once a cycle, lifts one tether and plants it a unit further (a step taken on its wings). Aura `'alarmed'`: lemon never shows at rest, nor while the Signature plays.

**The engine:** layers already draw outside the sprite box and steps already take a `transform`; tethers, hooks, blades and the axe are paths. The overlay already draws unclipped (the Sonar ring reaches radius 16), so the tethers to y = 13 need no engine change; check the header's bottom clip (jury-wave-2 §5, §6). The belt's full unit is two map rows. No new suit part type is needed, and the viewBox stays `[-6, -1, 28, 13]`.

## 8. Emblem

**Shape, as read from the #1 Cover A chest and the #1 second-printing main cover** (both Dragotta and Martin): a **block**, "barely a bat".
- About **2.3:1** (from a 300×130px region of the #1 cover chest; **unverified** against a flat drawing).
- The top edge is nearly straight, with two short pointed ears at the centre and a flat crown between them; a shallow dip on either side; the wing tips rise as two short horns at the outer corners.
- The sides bow outward a little ("it bows on the edges", Dragotta).
- The bottom edge is straight with small spikes along it and one V notch at the centre.
- Corners clipped, not rounded. Symmetric: draw the left half and mirror it at x = 60, as `emblems.ts` does.

**In the 120×48 box:** about 110×48, centred. Flat ink, `finish: 'none'`. On the second printing the plate is gridded like armour; that grid is under 1 unit at every size we draw and is dropped. The masthead bat is `--emblem` (lavender-grey ink on the dark header).

**The 64px Signal disc:**
- **Unlit:** indigo-black glass (`--glass`), the block bat in `--line`, inside a 4px ink rim (`--disc-rim-inner` `#070405`): Dragotta's heavy line round the panel.
- **Lit:** one flat lemon field (`--disc-lens` as a flat fill, no gradient, no glints), the block bat in ink across it, the ink rim kept. The count is a Bungee numeral in ink on a `--signal-hot` box (`--on-signal` is the abyss). The flat lit disc is this Theme's (jury-wave-2 §8): VENGEANCE, PALE MOONLIGHT and WATCHFUL PROTECTOR glow from a core, KNIGHTMARE is cracked.
- **The field's lightness, decided on screen beside the mascot** (jury-wave-2 §2): **A**, `--signal-hot` `#ecf05a`, L* 92, the brightest lit disc in the app (PALE MOONLIGHT's gold core is L* 81); **B**, `--signal` `#cbd43c`, L* 82, as bright as PALE MOONLIGHT's core, with `--signal-hot` kept for the count box. B is the safer default for a disc in the corner of the eye.
- **Tray and toast icons** stay single, from the default emblem (jury-wave-1 §2).

## 9. Atmosphere

**A colony of bats over a dusk band.** Bats are the book's own motif: the #1 flashback opens at the zoo's bat house ("Welcome to the Chiroptera habitat", a sign in the art, not quoted further), the #2 interior has a bat spread across a red page, and Dragotta built the cape from bat anatomy (§2).

- **The band:** the `--haze` token, a flat band from above in `--dusk` (trade-dress indigo `#3e4176`) at 22%, fading to 6%. It is mood only: composited on the abyss it comes to about `#151528`, the surface's own tone (1.11:1), so it cannot carry anything drawn on it. Static.
- **What moves:** 5 to 7 bats in the default panel, as a **bat option on the existing ash painter** (jury-wave-2 §6, §9.10, §9.12): the painter draws a two-frame bat sprite in place of a flake. **Black silhouettes do not work here:** black bats on the band would sit at about 1.1:1 and vanish. Martin's black-on-a-flat-field needs a bright field, and a bright band in a dark corner panel breaks "every Theme is dark" (ADR 0001). So the bats are drawn **lighter than the ground**, the way snow and ash are: `--colony` (lavender `--ink-live`) at 20%, 25% and 30% alpha for three depths, which measures 1.5, 1.7 and 1.9:1 on the band and the surface (computed; PALE MOONLIGHT's near snow is 2.2:1, KNIGHTMARE's middle ash 1.3:1). Each bat is the shared two-frame sprite (wings up, wings down), 8 to 14px across, crossing left to right or right to left 3 to 6px a tick, flapping every tick. They fly **arcs that rise and dip**, not the ash's straight shallow slant, so they move differently from KNIGHTMARE's ash on the same painter (jury-wave-2 §3.9). At most three at once; a new one enters every few seconds.
- **Where:** the bats fly in the band's lower part, under the masthead, not behind it: they never cross behind Bat-Clawd or the wordmark, and they stay above the first card.
- **Light:** from above, flat violet; no glow from below. The haze sits tighter than KNIGHTMARE's (`--haze-inset` `-15% -10% auto -10%` against its `-35% -20% auto -20%`). KNIGHTMARE's ash is also lit from above and crosses sideways, so this axis scores "~" against it and still passes (jury-wave-2 §1).
- **Gating:** like every Theme, it moves only while the pointer is over the window and for a few seconds after news, on the shared 8 fps clock; under reduced motion or with animations off, nothing shows (`still` unset). Nothing on the Signal window.

**What the engine needs (the engine PR): no new kind.** The ash painter (`AshAtmosphere` in `atmospheres.ts`) gains a sprite option: a bat in place of a flake, an arc (a rise and a dip over its crossing) in place of the straight fall, and a `top` and `height` that keep the flight under the masthead. Paths stay precomputed from the frame index, as now. The two-frame bat path lives in shared code and is the **same drawing Year One's swarm Signature uses** on the overlay layer (jury-wave-2 §3.9, §9.10), so the two Themes share one bat; whichever engine PR comes first builds it. The band is the existing haze. The shared `--font-headline` token comes in the same round (§4). Bats appear in no later Theme, in either slot (jury-wave-2 §9.10).

**Rejected:** a blocky skyline "speckled with light" is Dragotta's own Gotham, and it is WATCHFUL PROTECTOR's lit-windows scene (Dragotta even names Chicago, the Nolan shoot). Horizontal speed lines (Dragotta's "speed with speed lines") were considered: they read as streaks next to VENGEANCE's rain and as motion that means urgency.

## 10. Distinctiveness

Scored by the jury's rules (jury-wave-1 §1): C = clearly different, ~ = close, = = same; three C's or more against every Theme. Rescored after the jury-wave-2 changes; the jury's own matrix is in `jury-wave-2.md` §1.

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| BLUE COLLAR – VENGEANCE | C: indigo vs warm black; lemon vs red (63.6); lavender vs amber | C: Bungee / Bungee vs Anton / Special Elite | C: the same ears now, but an 8×2 block vs a dash, and blades vs a jagged hem | C: flapping bats vs falling streaks; a flat violet band from above vs a red glow from below | C (narrow): both are Bruce; a hopeful worker on shift vs a bleak detective's journal; Lexicon from a work site vs none | **5** |
| BLUE COLLAR – PALE MOONLIGHT | C: indigo vs smog brown; lavender vs steel (13.8); **alarm ~: both yellow family, 15.8 apart** | C: no family shared | C: a block vs an oval; blades vs scallops; an olive belt vs brass | C: bats vs snow; violet band above vs brown smog below | C: shift vs newsroom | **5** |
| BLUE COLLAR – WATCHFUL PROTECTOR | C: violet vs blue-steel surfaces (11.6–13.8); lemon vs blue; lavender vs mercury (28.0) | C: blocky signage vs wide modern; signage caps vs stencil | C: a block vs a bar; blades vs a straight hem | C: bats vs a static skyline | C: a work shift vs an ops briefing (no log, no ops) | **5** |
| BLUE COLLAR – KNIGHTMARE | C: indigo vs scorched brown; lemon vs crimson (65.0); lavender vs bone (34.1) | C: Bungee vs Archivo. Both now use one heavy family for display and stamps in a box; Bungee is square signage, Archivo a grotesque, and the stamps are straight and clean against a degree's lean under grit. **Decided on screen** | C: a cape with blades vs a duster, goggles and scarf; a block vs the BvS bat | ~: bats vs ash, but both cross sideways and both are lit from above (jury-wave-2 §1); the arcs and the tighter band help | C: young and hopeful, no Alfred vs a weary veteran with Alfred; the closes no longer echo | **4** |

**Against KNIGHTMARE, in particular:** no amber, no desert, no duster, goggles, scarf or falling ash. Both are huge, physical Batmen by a Snyder, but Bat-Clawd's body is the same size in every Theme, so the size shows only in the shoulders, the chest block and the blades.

**Against the other Wave 2 Themes** (after the jury-wave-2 §9 decisions):

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| BLUE COLLAR – ANCIENT GRACE (DKR) | C: violet vs tank grey; lemon vs cyan (47.9); lavender vs Bone | C: Bungee vs Bangers | C (narrow): a block vs a big bat, blades vs two tails; the suits are teal vs neutral grey, 13.9 apart | C: bats vs static | C: a work shift vs a broadcast | **5** |
| BLUE COLLAR – BECOME A BAT (Year One) | C: violet vs olive; lemon vs magenta (80.0); lavender vs Bone | C: Bungee vs Permanent Marker / Neucha | ~: the same ears now; blades vs four feathered points, a block vs a bat, both black on a lighter suit | C: bats as weather vs smoke (Year One's bats are its Signature, another axis) | C: Year One leaves the work-shift words to this Theme | **4** |
| BLUE COLLAR – SERIOUS HOUSE (Arkham) | C: violet vs plum-black; lemon vs claret (69.0); lavender vs Bone (19.6) | C | C: standard vs tall ears; blades vs a bleed; a visible block vs a hidden bat | C: bats vs scratches | C: a work shift vs a house | **5** |

- **DKR** takes back the grey suit, the big black bat and the armour (jury-wave-2 §9.5). BLUE COLLAR keeps its block, which is an axe and not a bat, on its sampled teal. Snyder's "Dark Knight Returns-sized Bruce" stays a shared source fact, not a shared drawing. DKR's alarmed armour (pauldrons a unit past the body) is close to these resting shoulder pads; different Moods and colours, no change (jury-wave-2 §3.5).
- **Year One** shares the bat drawing (its swarm Signature, this Theme's weather), never on screen together. Lemon is 8.3 from Year One's canary *waiting* ink: the stamp word carries the tier, and the picker previews each alarm (jury-wave-2 §3.11).
- **Arkham** moved to plum with Bone as its working ink, so the violet and the lavender are this Theme's alone.

## 11. Legal note

- **Trademark (DC):** the Absolute bat symbol, "Batman", "Gotham" and the *Absolute Batman* masthead. Credit the emblem as "the bat symbol is a trademark of DC, used here as fan art", as for the other Themes, and add it to the README and NOTICE.
- **Do not use:** the "ABSOLUTE BATMAN" masthead lettering and its bat-winged plate; any cover or interior art, traced or not (the poses are our own drawings after descriptions); Clayton Cowles' lettering and sound effects; the zoo sign's text; dialogue; Dragotta's character designs beyond the suit's general traits listed in §7; the names Party Animals, Black Mask, Ark M or Roman Sionis in the UI.
- **Free to use:** a big Batman in a grey suit, black ink and flat colour, a lemon sound-effect colour, bats, a working man's Voice, our own words ("Built, not bought.", "Made it myself.", "JAMMED").
- **Display name:** BLUE COLLAR (approved, jury-wave-2 §9.11) is an ordinary English phrase alluding to the premise, not a title or a quote. The `film` field is "Scott Snyder and Nick Dragotta's Absolute Batman (2024)", without "after".
- **Fonts:** Bungee and Shantell Sans are OFL-1.1; bundle their licence texts with the Fontsource ones. Luckiest Guy (Apache-2.0) only if Bungee fails on screen, with a NOTICE line.

## 12. Unverified items

- **Every hex.** They come from DC's digital press and cover files (DCU Guide, AIPT), not from the printed comic or a collected edition. The colourist approved the comics, not these JPEG and PNG exports, and the printed book will differ.
- **Frank Martin's own intent.** No interview in which he describes his palette or method was found (two searches). The "one colour per scene" reading is our measurement of 23 images and a reviewer's sentence, not his words. The Eisner win credited to him for 2026 on one bio page ([MEFCC](https://www.mefcc.com/home/frank-martin/)) was not confirmed; Wikipedia lists five 2026 nominations for the series.
- **The emblem's outline and its 2.3:1 ratio:** read from two cover drawings, foreshortened on a chest. Needs a flat reference (DC's T-shirt art or the #1 reveal panel).
- **The masthead's designer.** Not found.
- **"Brutalist" Gotham and "Arkham as a city"** (from the task brief): not supported by any source found. The sources say blocky, geometric, glass, cold; Ark M is an offshore prison.
- **The zoo's bat-house sign and the bat spread**: seen in the #1 and #2 preview pages; their place in the story is from the plot summary, not read in the issue.
- **The axe's look in the hand** (head size against the handle): from the second-printing cover only.
- **The flying Pose on a tether:** the cape's tethers as grappling hooks are sourced; a picture of Batman swinging on one was not found in the preview pages read.
- **Bungee at 16px in the header**: 107px before tracking, measured in PIL. Check it beside the counts at 1x and under 360px.
- **Bungee stamps at 9.5px**: measured to fit in PIL on the TTF; `stampWidth.test.ts` measures the Fontsource WOFF, which may differ by a pixel. The narrowest margin has 2px to spare.
- **The shared bat sprite**: drawn once for this Theme's colony and Year One's swarm; not drawn yet.
- **The plot facts** (Thomas at the zoo, Martha a social worker, Crime Alley, Ark M, the Party Animals) are from Wikipedia and reviews, a fan-maintained and secondary layer.

## 13. Sources

- Sam Stone, ["'He's the biggest Batman that we've ever seen.' Scott Snyder and Nick Dragotta on making the Dark Knight an underdog in Absolute Batman"](https://www.gamesradar.com/comics/dc-comics/absolute-batman-scott-snyder-interview-2024/), Newsarama / GamesRadar+, 12 Sep 2024: size, class, the emblem, Gotham, Martin as "the finisher", Mazzucchelli.
- David Harper, ["The Design of Absolute DC: Nick Dragotta on Building a Bigger (and Maybe Better) Batman"](https://sktchd.com/longform/absolute-batman-nick-dragotta-feature/), *SKTCHD*: 6'6" and 275 lb, the cape from bats, the emblem as armour, the spikes.
- Matthew Aguilar, ["Nick Dragotta and Scott Snyder reveal what Absolute Batman's costume can do"](https://comicbook.com/comics/news/dc-nick-dragotta-scott-snyder-reveal-what-absolute-batman-costume-can-do-batmobile-bat-symbol/), ComicBook.com, 14 Sep 2024: the axe, the tethers.
- Kate O'Donoghue, ["Absolute Batman creators explain their all-new origin"](https://screenrant.com/absolute-batman-interview-scott-snyder-nick-dragotta-new-origin-symbol/), ScreenRant, 12 Sep 2024.
- DC, ["Inspiring the next generation: Snyder and Dragotta talk Absolute Batman"](https://www.dc.com/blog/2024/09/06/inspiring-the-next-generation-snyder-and-dragotta-talk-absolute-batman), 6 Sep 2024.
- AIPT, ["Absolute Batman: Scott Snyder and Nick Dragotta Q&A"](https://aiptcomics.com/2024/09/11/absolute-batman-scott-snyder-nick-dragotta-qa/), 11 Sep 2024; ["Scott Snyder on Absolute Batman" (Ark M, Alfred)](https://aiptcomics.com/2025/05/13/scott-snyder-absolute-batman-qa/), 13 May 2025.
- Marvel Maximus, ["Absolute Batman #2 review"](https://aiptcomics.com/2024/11/13/absolute-batman-2-review/), AIPT, 13 Nov 2024; ["Review: Absolute Batman #1"](https://urbaneturtle.com/2024/10/13/review-absolute-batman-1/), Urbane Turtle, 13 Oct 2024.
- ["DC reveals the Absolute Batman logo"](https://insidethemagic.net/2024/10/dc-absolute-batman-logo-dr1/), Inside the Magic, Oct 2024 (secondhand, the axe reveal).
- Wikipedia, ["Absolute Batman"](https://en.wikipedia.org/wiki/Absolute_Batman) (fan-maintained): credits, plot, arcs, awards.
- Images sampled (not reproduced): [DCU Guide, #1](https://dcuguide.com/Absolute_Batman_1), [#2](https://dcuguide.com/Absolute_Batman_2), [#3](https://dcuguide.com/Absolute_Batman_3), [#4](https://dcuguide.com/Absolute_Batman_4), [#5](https://dcuguide.com/Absolute_Batman_5) (fan wiki hosting DC's cover files); AIPT's DC previews for [#1](https://aiptcomics.com/2024/10/03/dc-preview-absolute-batman-1/), [#1 second printing](https://aiptcomics.com/2024/10/03/absolute-batman-1-sells-out/), [#2](https://aiptcomics.com/2024/10/18/dc-first-look-absolute-batman-2-brings-the-violence/), [#3](https://aiptcomics.com/2024/12/13/dc-preview-absolute-batman-3/), [#6](https://aiptcomics.com/2025/03/14/dc-preview-absolute-batman-6/).
- Fontsource API: [Bungee](https://api.fontsource.org/v1/fonts/bungee), [Bangers](https://api.fontsource.org/v1/fonts/bangers), [Shantell Sans](https://api.fontsource.org/v1/fonts/shantell-sans), [Russo One](https://api.fontsource.org/v1/fonts/russo-one), [Bowlby One SC](https://api.fontsource.org/v1/fonts/bowlby-one-sc), [Comic Neue](https://api.fontsource.org/v1/fonts/comic-neue) (OFL-1.1), [Luckiest Guy](https://api.fontsource.org/v1/fonts/luckiest-guy) (Apache-2.0). Font files for width measurement from [google/fonts](https://github.com/google/fonts).
- In this repo: [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-1.md`](jury-wave-1.md), [`knightmare-palette.md`](knightmare-palette.md), [`burton-1989.md`](burton-1989.md), `CONTEXT.md`, `DESIGN.md`, `docs/adr/0001-many-themes-and-the-homage-line.md`, `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`, the four `app/src/renderer/src/styles/themes/*.css`, `app/test/themeContrast.test.ts`, `stampWidth.test.ts`.
