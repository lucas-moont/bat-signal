# Bat-Clawd's suit for WATCHFUL PROTECTOR (Nolan)

Research note, 2026-10-09. Scope: the costume Bat-Clawd wears in the WATCHFUL PROTECTOR Theme, after Christopher Nolan's *Dark Knight* trilogy, anchored on *The Dark Knight* (2008). It replaces outfit J of the throwaway prototype (`prototype/clawd-outfits`, `app/src/renderer/src/prototype/ClawdOutfits.prototype.tsx`). The maintainer found J too far from the films in colours and costume. It keeps the approved model of outfits V and I: a suit over body, arms and legs; the cowl down to under the eyes; Clawd's orange only as the jaw row; white eyes; a neutral rim on cowl and cape at rest; the cape behind the legs; an aura in the Alarm color only when alarmed. Grid, viewBox and helpers are the prototype's. The Theme's palette and voice are in [`nolan.md`](nolan.md).

## TL;DR

- **Nolan's suit is black, not blue.** Both cinematographer sources describe a black, non-reflective suit. *The Dark Knight*: "Batman's costume is made of a non-reflective, black material", and "There is some sheen on the cowl and the rest of the costume, but the cape was absolutely matte black" ([ICG, July 2008](https://www.icgmagazine.com/web/july-cover-story-the-dark-knight/)). *Begins*: the AC article speaks of "Batman's matte-black costume", and Pfister says "the suit was going to be very non-reflective" ([AC, June 2005](https://theasc.com/article/batman-begins-the-bat-takes-wing/)). J's blue-steel body, steel collar and cheek guards come from neither the films nor the costume.
- **What the eye actually gets** is a lightness order, the same in all five photos we sampled. The raised plates on shoulders and pecs catch the light, then the cowl crown. The abdomen, thighs and boots sit near black. The cape is the darkest thing in frame. The one warm, metallic piece is a **bronze utility belt** with box pouches and a light oval buckle. J's slate belt dropped it.
- **The new suit (map below):** a near-black charcoal suit (`#22262a`). Gunmetal sheen (`#485058`) only where the plates catch light: the shoulder caps, a **raised chest bat drawn as a lit relief on black**, the cowl crown and the knees. Black waist flanks for the mesh. A smoked-bronze belt (`#8a7866`) with a pale buckle (`#c4ab8a`). Black gauntlets and boots. A matte black cape with a flat hem at the ankles. Flying, the cape stiffens into the memory-cloth glide wing. **Its lower edge now has three points**, closer to the films than J's plain edge.
- **Aura / Alarm color: Blue Flame `#3d8bff`, rgb(61 139 255).** It comes from the opening of *The Dark Knight*, where blue flames form the bat (secondary sources only, **unverified**). It sits 44.3 ΔE00 from Clawd orange, against 9.6 for J's `#ff5340`. It is 47.8 or more from every other Wave 1 aura and 6.09:1 on the ground. Red, gold and Signal white each collide with Clawd, with 2022, or with Burton (§5).
- **The ground stays `#04070b`.** A neutral black suit on a blue-black night is the films' split: the city is graded steel blue-green, the suit is not.
- At 54px the pieces that survive are: the dark body with lit shoulders, the bronze belt, the long cape and its pointed glide wing, the orange jaw under the helmet-cowl's outline, and the blue aura. The chest bat reads from 72px. At 54px it is a grey chest bar. Abdominal segments, gauntlet fins and a separate neck band can't be drawn at this size (§3).

## 1. What the suit looks like

**Sources, by tier.**
- *Primary:* Lindy Hemming's own words in *Entertainment Weekly* (Jeff Jensen, "Batman's New Suit", 18 June 2007, read on the [Wayback Machine](https://web.archive.org/web/20100914092558/http://www.ew.com/ew/article/0,,20042739,00.html)) and in [SciFi Bulletin](https://scifibulletin.com/film-reviews/film-interviews/interview-lindy-hemming-costume-designer/). Wally Pfister in *American Cinematographer* ([2005](https://theasc.com/article/batman-begins-the-bat-takes-wing/)) and *ICG Magazine* ([2008](https://www.icgmagazine.com/web/july-cover-story-the-dark-knight/)). Two photographers' CC-licensed photos of the screen costume on display: [Warner Bros. Studio Tour Hollywood](https://commons.wikimedia.org/wiki/File:Batsuit_from_The_Dark_Knight_Rises.jpg), 2014, with a [closer view](https://commons.wikimedia.org/wiki/File:Batsuit_from_The_Dark_Knight_Rises_film_-_closer_view.jpg); the *Rises* Sydney premiere display, 2012 ([a](https://commons.wikimedia.org/wiki/File:The_Dark_Knight_Rises_(7590753720).jpg), [b](https://commons.wikimedia.org/wiki/File:Dark_Knight_Rises.jpg)). Two Warner Bros. publicity images: the *Begins* still on enwiki ([File:Bale as Batman.jpg](https://en.wikipedia.org/wiki/File:Bale_as_Batman.jpg)) and the 2007 *Dark Knight* first-look photo by Stephen Vaughn, seen only as a magazine scan reposted by [/Film](https://www.slashfilm.com/the-dark-knight-batmans-new-suit) (a print scan, so its colours are weak).
- *Secondary:* Wikipedia's [Special effects of *The Dark Knight*](https://en.wikipedia.org/wiki/Special_effects_of_The_Dark_Knight), which cites Jesser & Pourroy, *The Art and Making of The Dark Knight Trilogy* (2012), pp. 112–115, and EW. Wikipedia's [Batsuit](https://en.wikipedia.org/wiki/Batsuit) article, whose Nolan section is mostly "citation needed". The unattributed editorial intro to a [Clothes on Film](https://clothesonfilm.net/?p=2937) Q&A with Hemming. Those facts are the site's, not hers.
- *Not used:* Hot Toys or any other merchandise. The museum and premiere photos already show more detail than a 54px sprite can use.

**Which film is in the photos.** Both displays are labelled *The Dark Knight Rises*. Wikipedia says "This exact same costume is re-used in *The Dark Knight Rises*" (citation needed), and Clothes on Film says the suit "remains unchanged, after a significant redesign for *The Dark Knight*". So they stand in for the anchor film. The 2007 first-look photo of the actual *Dark Knight* suit shows the same plates, belt and cape.

**The *Dark Knight* suit (2008), the anchor:**
- **Construction.** "200 individual pieces of rubber, fiberglass, and nylon and metallic mesh" with "a stylish texture", and "stretchy rubber lines" that bind it to the body (Hemming, EW 2007). The redesign used "smaller plates of armor with open spaces" in urethane over a breathable sportswear base (Special effects, citing Jesser & Pourroy). Clothes on Film: "a base layer [of] polyester mesh with individually moulded flexible urethane attached to form armour plating", "outer panels comprised of carbon fibre". In the photos (observed by us): big rounded pauldrons, two broad pec plates, a ribbed abdomen of chevron-like segments either side of a centre channel, open mesh at the obliques and waist, banded upper arms, thigh plates, round knee plates.
- **Cowl and neck.** "The new headpiece — modeled after a motorcycle helmet — is separate from the neck … 'It was the hardest part of the suit to make'" (Hemming, EW 2007). The "neckpiece was part of the suit and came up to meet the cowl" (Special effects). In the photos the cowl is a smooth helmet. It has short ears near the outer corners of the crown, a sharp brow, a wide mouth opening down to the jaw, and a ribbed neck collar below it.
- **Gauntlets.** "The razors on Batman's forearms are actually part of the suit … They're retractable, and yep, they're weapons" (Hemming, EW 2007). The photos show three fins on the outer forearm and black gloves.
- **Chest emblem.** It is not a separate badge. The bat is sculpted into the pec plates in the suit's own black. It has a flat top, long outward points and a short V tail (observed in the closer photos). Wikipedia says it is smaller than the *Begins* one, citing a weak source.
- **Belt.** Bronze with rectangular box pouches and a large oval buckle with a black bat in a ring (observed; the TDKR display and the 2007 TDK photo agree).
- **Cape.** "Absolutely matte black" (ICG). "Ten versions of the cape were made with varying lengths; shorter ones for action scenes and a glider version that snaps out as batwings" (Clothes on Film, of *Rises*). The 2007 photo shows it reaching the ankles. On the *Rises* mannequin it falls to the floor.
- **Boots.** Tall, to the knee, plain black (observed).

**The *Begins* suit (2005)** differs: a one-piece, latex-coated suit with the cowl fixed to the neck and shoulders ("the cowls of past suits were firmly attached to the neck and shoulders", EW 2007). It has a bigger, smoother chest, a larger bat, and scalloped forearm fins. The belt is a duller brown-bronze, which Wikipedia (citation needed) calls "a modified climbing harness in bronze". Hemming's starting point was "a Nike running shoe" and military gear ([SciFi Bulletin](https://scifibulletin.com/film-reviews/film-interviews/interview-lindy-hemming-costume-designer/)). **The anchor should not change.** The plated *Dark Knight* suit is the one people picture, it is what both museum displays show, and the separate helmet-cowl suits the jaw-only orange: "You just see his mouth and eyes" (quoted in [ICG](https://www.icgmagazine.com/web/july-cover-story-the-dark-knight/), in the passage on lighting Batman; the speaker is not confirmed).

## 2. Colours: sampled and proposed

Every image was sampled with PIL (`python -I`, a script kept outside the images' folder). None was shot under film light: museum spots, tungsten premiere lighting, a print scan, a studio composite. **So no sampled hex is a suit colour.** What carries over between images is the order of lightness (TL;DR) and the hue family of each part. Provenance follows `nolan.md`: **S** sampled, **P** proposed.

| Region | WB Tour (2014, bright spots) | Sydney (2012, tungsten) | EW 2007 scan | *Begins* still | Reading |
|---|---|---|---|---|---|
| Pec / shoulder plates | mean `#aaa79b` (pec), `#595954` (shoulder) | `#b3a183` | dark `#202224`, hi `#eadbc1` | `#5c6266` | Lightest part of the suit. Neutral grey in neutral light, cool in the *Begins* still |
| Cowl crown | `#9ea196` | `#9b8870` | median `#2b2622` | median `#4b515d` | Sheen, one step below the pecs |
| Abdomen | `#737169` | `#1a120a` | dark `#1f2025` | `#12171e` | Near black once the light comes from above |
| Thigh | `#474438` | `#19130a` | dark `#21232f` | — | Near black |
| Boot | `#372e21` | `#3d2c1a` | — | — | Black leather, a touch warmer |
| Cape | — | `#120d06`, `#0b0803` | `#1c2126` (print-lifted) | `#040507` | Darkest thing in every frame |
| Belt | median `#a57c5c`, dark `#694c3b`, hi `#dcc6a4` | dark `#3e2411`, ring hi `#f6cf9b` | median `#564742`, hi `#ddc5b1` | `#4a4239`, hi `#a6978a` | Low-saturation bronze, rosier on TDKR, browner on *Begins* |

(Regions were boxed by hand; the boxes were checked on debug overlays. The Sydney hues are tungsten-warm, so only their lightness counts.)

**Proposed suit colours (P)**, set so that the order above survives on the `#04070b` ground:

| Key | Hex | Role | Basis |
|---|---|---|---|
| `c` | `#0b0d10` | Cowl, near black, faintly cool | *Begins* still dark quarter `#03060c`; the cowl is the helmet, darker than the plates |
| `h` | `#3a4047` | Cowl crown sheen | "Some sheen on the cowl" (ICG); *Begins* cowl median `#4b515d`, darkened |
| `S` | `#22262a` | Suit base | EW scan dark quarters `#1f2025`–`#21232f`; neutral with a faint cool cast. 1.33:1 on the ground (V's suit is 1.54, I's 1.38) |
| `p` | `#485058` | Plate sheen: shoulder caps, chest bat, knees | *Begins* chest `#5c6266`, darkened for film black. L\* 34, so it stays a sheen; Knightmare's grey suit is L\* 37 over the whole body |
| `m` | `#0e1013` | Open mesh at the waist flanks | Darkest suit areas in every sample |
| `g` | `#0b0d10` | Gloves, gauntlets, boots | As the cowl |
| `b` | `#8a7866` | Belt, smoked bronze | Between the WB median `#a57c5c` and the EW scan median `#564742`, desaturated |
| `k` | `#c4ab8a` | Belt buckle | WB highlight `#dcc6a4`, darkened |
| cape | `#000` | Matte black cape | "Absolutely matte black" (ICG); blacker than the sheened suit, as in every frame |
| rim | `rgb(178 186 194 / 30%)` | Neutral, faintly cool rim on cowl and cape | Pfister's "very soft backlight" ([AC 2005](https://theasc.com/article/batman-begins-the-bat-takes-wing/)); less blue than J's `rgb(160 178 196 / 32%)` |

**Checks (ΔE00, computed by us):**
- The belt is the only warm element on the suit, and it sits two rows below the orange jaw. Bronze `#8a7866` is **19.7** from Clawd `#d77757` and **16.6** from Burton's brass belt `#7a5420` (outfit I). The first candidate, `#7d6248`, was only 8.6 from Burton's belt and was dropped. The buckle `#c4ab8a` is 20.2 from Clawd.
- The sheen `#485058` is 39.0 from Clawd and 2.46:1 on the ground. The suit `#22262a` is 8.2 ΔE00 from the ground: enough for a mass, so the cowl and cape keep their rim.

**The ground.** Keep `#04070b`. The suit is a near-neutral black (hue about 257°, very low chroma) and the ground is a blue-black. That is the films' own split: Pfister graded the city "slightly blue-green" and "colder" ([AC 2008 repost](https://forums.superherohype.com/threads/american-cinematographer-dark-knight-article-part-i.307097/)), while the suit stayed black. A greyer ground would erase the 1.33:1 step that lets the body read.

## 3. The pieces that make it Nolan's, and what survives at 54px

At 54px one grid unit is 54/28 ≈ **1.93px** and a half-row is **0.96px**. The approved model's half-row belt is grandfathered. Anything new below one unit is what the jury struck from the first draft (jury §6), so it is either at least 1 unit or tagged "reads from 72px; drop first".

| # | Piece | In the costume | In the map | 54px | 72–78px |
|---|---|---|---|---|---|
| 1 | **Black suit with sheen on the plates** | "Non-reflective, black"; "some sheen on … the rest of the costume" | `S` near black, `p` only on raised plates | Yes: a dark body, lit at the shoulders | Yes |
| 2 | **Bronze utility belt with a pale oval buckle** | Bronze box pouches, oval buckle | Half-row `b`, `k` at centre (cols 7–8) | **Yes, the strongest read** after the jaw | Yes |
| 3 | **Helmet cowl, separate from the neck** | Motorcycle-helmet cowl on a separate neckpiece; short ears; wide mouth opening | The cowl's rim (`COWL_EDGE`) ends at the shoulder line; `c` cowl darker than `S` suit; the jaw is the mouth opening | Partly: the rimmed helmet over the orange jaw | Yes |
| 4 | **Pauldrons and pec plates** | Big rounded shoulder plates catching light | `p` at cols 3 and 12, y 5–6 (1 × 1 unit) | Yes, as two lit shoulder points | Yes |
| 5 | **Raised flat-topped chest bat** | Bat sculpted into the pecs, same black | A front path in `p`: a lit relief on the black chest | A grey bar across the chest | Yes, as a bat |
| 6 | **Long matte cape; memory-cloth glide** | Matte black, ankle-length; stiffens into batwings | Open: flat hem at y 11, behind the legs. Flying: a rigid wing with three points | Yes, as silhouette | Yes |
| 7 | **Mesh waist (V-taper)** | Open mesh at the obliques | `m` at cols 3 and 12, y 7–8 (1 × 1 unit) | Barely: the waist looks narrower | Yes |
| 8 | **Knee plates over tall boots** | Round knee plates, knee-high boots | `p` half-row at y 9 on each leg | No. **Reads from 72px; drop first** | Faint |

**Tried and dropped:**
- **The abdominal ribs.** As half-row stripes they are a 1px pattern of two near-blacks.
- **The gauntlet fins.** They are 0.3–0.5 units, black on the black cape when it is open.
- **A dark neck band under the jaw.** At 54px it merged with the chest bat into a black bib or tie shape (render v1, §4). The cowl/neck split is carried by the rim ending at the shoulders instead.
- **J's steel collar and cheek guards.** The jury asked for them at full-unit size (`jury-wave-1.md`, the Nolan fixes), but that ruling was about their size; whether they belonged was not in question. The costume has neither: the neckpiece is the suit's own black, and the cowl's sides end at the jaw.

**The ears.** They are short on the *Dark Knight* cowl, about a third of the head's height, and sit at the outer corners of the crown. The 1-unit minimum makes them the same size as the default's. J moved them inward (cols 5 and 10). The photos put them at the corners, so this map returns them to cols 4 and 11. The Theme's silhouette difference comes from the belt, the lit bat, the glide and the aura instead.

## 4. The proposed outfit

The same map serves both moods, as in V and I. Only the cape and the aura change.

```
            0123456789012345
  0.0       ....c......c....
  0.5       ....c......c....
  1.0       ....chhccccc....
  1.5       ....chhccccc....
  2.0       ...cccccccccc...
  2.5       ...cccccccccc...
  3.0       ...cceecceecc...
  3.5       ...cceecceecc...
  4.0       ...cc######cc...
  4.5       ...cc######cc...
  5.0       ...pSSSSSSSSp...
  5.5       ...pSSSSSSSSp...
  6.0       .gSSSSSSSSSSSSg.
  6.5       .gSSSSSSSSSSSSg.
  7.0       ...mSSSSSSSSm...
  7.5       ...mSSSSSSSSm...
  8.0       ...bbbbkkbbbb...
  8.5       ...SSSSSSSSSS...
  9.0       ....p.p..p.p....
  9.5       ....g.g..g.g....
 10.0       ....g.g..g.g....
 10.5       ....g.g..g.g....
```

22 half-rows of 16 characters each. `#` occurs only at y = 4.0 and 4.5, which we checked with an assert in the render script.

**Legend:**

```ts
legend: {
  '#': 'var(--clawd)', // #d77757, the jaw only
  e: 'var(--bone)',    // #e6ebee in this Theme: white eyes, the sonar lenses' white-eyed look
  c: '#0b0d10',        // cowl
  h: '#3a4047',        // cowl crown sheen
  S: '#22262a',        // suit
  p: '#485058',        // plate sheen: shoulder caps, knees (and the chest bat below)
  m: '#0e1013',        // open mesh, waist flanks
  g: '#0b0d10',        // gloves, gauntlets, boots
  b: '#8a7866',        // smoked-bronze belt
  k: '#c4ab8a',        // oval buckle
},
top: 0,
ground: '#04070b',
```

**Chest bat (front layer).** Flat top, outward points, short V tail, about 3.7:1 as in `nolan.md` §8. It is drawn in the sheen, so it reads as a raised bat catching light on a black chest. V draws a dark bat on charcoal and the Knightmare a black bat on grey.

```tsx
front: () => (
  <path d="M5 5.5 L11 5.5 L10.1 6 L10.1 6.5 L9.1 6.55 L8 7.15 L6.9 6.55 L5.9 6.5 L5.9 6 Z" fill="#485058" />
),
```

**Cape (behind layer), through the prototype's `suitCape`.** Its body-box mask hides the rim over the body, and the black back panel hangs behind the legs when the cape is open:

```tsx
behind: suitCape({
  // Flying: the memory-cloth glide, a rigid batwing with a straight leading edge from the shoulder
  // to a high tip and three points on the trailing edge. Left half, mirrored.
  trail: 'M3 5 L-5.2 4.3 L-4.5 6.9 L-3 6.2 L-1.9 8.1 L0.2 7.3 L1.5 9.2 L3 8.8 Z',
  trailMirrored: true,
  // Alarmed: the cape flung open, ankle-length, flat hem at y = 11 (the feet).
  open: 'M3.4 5 L0.2 5.2 L-2.8 11 L3.4 11 Z',
  rim: 'rgb(178 186 194 / 30%)',
  // edge: omitted -> COWL_EDGE (ears at cols 4 and 11).
}),
aura: alarmAura('61 139 255'),
```

The glide's points are sized for the 1-unit rule: each lobe is 1.3–2.6 units wide and 0.7–1.9 deep. They come from our memory of the *Begins* and *Dark Knight* glides, and no written source describes them (**unverified**). The written support is only "a glider version that snaps out as batwings" (Clothes on Film). **This overrides a jury ruling.** The jury kept J's glide for its "solid, hook-tipped membrane" with a plain lower edge (`nolan.md` §7, jury §4.1), and this version drops the hook and adds points. So it needs the maintainer's decision, judged next to Burton's scalloped cape (outfit I). **Fallback** if the glide reads too close to Burton's scallops: a trailing cape with a straight hem, `trail: 'M3 5 L13 5 L13.4 10.6 L-4.4 10.6 L-3.4 8.6 L-5.4 7.2 L-1.4 6.4 Z'` with `trailMirrored: false`.

**Render check.** We rendered the map, the cape and the bat with PIL on `#04070b`, scaled to 54, 60 and 78px, with the aura as two Gaussian glows (σ 0.75 and 2.5px). The renders are approximations of the SVG and stay in the scratchpad.
- Draft 1 put sheen over the whole chest with a black bat and a neck band. It read as a grey chest with a black bib: a Knightmare echo and the "tie" problem.
- Draft 2 moved to the lit bat on a black chest.
- Draft 3 (the one above) lifted `S` and `p` one step each, so the body separates from the ground.

At 54px the jaw, eyes, belt, rimmed cowl, shoulder points, glide points and aura read. The bat and knees need 72px.

**What changes from J:**

| J | This proposal | Why |
|---|---|---|
| Blue-steel suit `#27313d` | Near-black `#22262a` with sheen only on raised plates | "Non-reflective, black" (ICG, AC) |
| Steel collar band, cheek guards | Removed; the cowl rim ends at the shoulders | Not part of the costume; the neckpiece is black |
| Dark slate belt `#1a222b` | Bronze `#8a7866` with a pale buckle | The costume's one warm, metallic piece |
| Black flat-topped bat on blue | Lit relief bat on black | The bat is sculpted in the suit's own black |
| Ears inward at cols 5 and 10 | Ears at cols 4 and 11 | The *Dark Knight* cowl's ears sit at the corners |
| Glide with a plain lower edge | Glide with three points | Closer to the films' batwing |
| Burning Bat aura `255 83 64` | Blue Flame `61 139 255` | §5 |

## 5. The aura and the Alarm color

`nolan.md` §3 lists five candidates. The aura has to clear four things:
- Clawd orange, which the jaw puts inside the glow.
- The other Wave 1 auras: V red rgb(227 18 27), I gold rgb(240 194 75), K carmine rgb(229 18 50).
- The Theme's inks: mercury `#7cc6c4` (working) and bone `#e6ebee` (text).
- The ground.

| Candidate | Hex | ΔE00 to Clawd | Nearest other aura | ΔE00 to mercury / bone | On ground | Verdict |
|---|---|---|---|---|---|---|
| Burning Bat ink (J) | `#ff5340` | **9.6** | V red 11.4 | 52.8 / 39.3 | 6.31 | Out: the same family as the jaw |
| Burning Bat fill | `#d9301a` | 14.7 | **V red 3.0** | 55.8 / 46.6 | 4.22 | Out |
| Deeper red (B) | `#e8261c` | 14.3 | **V red 2.5** | 56.3 / 45.7 | 4.54 | Out: this is 2022's red |
| Sodium amber | `#e9a04b` | 18.4 | **I gold 12.8** | 38.7 / 31.2 | 9.22 | Out: Burton's gold, and already the waiting ink |
| Signal white-yellow | `#ffe7a3` | 34.0 | **I gold 11.9** | 31.2 / 22.4 | 16.54 | Out: gold again, and 1.02:1 against bone |
| Searchlight white (E) | `#fff6f0` | 33.6 | I gold 26.3 | 27.8 / **7.5** | 18.93 | Out: it is the text colour |
| **Blue Flame (D, tuned)** | **`#3d8bff`** | **44.3** | **K carmine 47.8** | **31.8 / 32.7** | **6.09** | **Recommended** |

**Why Blue Flame.**
- **Fire is this film's element.** Nolan, as quoted by MTV: "*The Dark Knight* was the fire. *Begins* was the bats. This was ice." IMDb's crazy credits say "large blue flames dissipate in the center to form the new Batman symbol" and that the studio logos are shaded dark blue. We have both only as search excerpts: the IMDb page returned a bot challenge and MTV redirected by region. So the blue flames stay **unverified**.
- **It fits the cold grade.** It is the cold, gas-burner side of the film's fire, inside Pfister's "colder, more modern world" ([AC 2008 repost](https://forums.superherohype.com/threads/american-cinematographer-dark-knight-article-part-i.307097/)).
- **It works with the jaw.** Around Bat-Clawd it is the complement of the orange jaw, so the alarmed pose reads at once.
- **It is the Wave's only cool aura.**

**Costs:**
- **Blue means "info" in most interfaces.** The stamp words must carry the tier.
- **It sits near mercury (31.8 ΔE00).** Working and Alarm are then both cool. `nolan.md` §3 already says that if D is chosen, the mercury working ink "would have to move to Bone"; that stands.
- **The cascade.** Choosing it changes `--signal`, `--signal-glow`, `--signal-hot` and `--ink-hot` and the lit Signal disc in `nolan.md` §3 and §8. For example: fill `#2f7fe0` (5.03:1 on the ground, 4.54 on surface), ink `#5aa9ff` (8.22 / 7.41 / 6.49). This note doesn't rewrite them. The rule "no red or orange at rest" becomes simply "no red anywhere", and Bat-Clawd's jaw is the only warm pixel left in the Theme, which is the point.

## 6. Legal note

No film image, still or frame goes into the repository. Everything above is description, measurement and our own drawing.

The reference images used are listed below. They stayed in the session scratchpad (`refs-nolan/`, with downscaled viewing copies and sampling overlays in `views/`), were used only for looking and sampling, and are not shipped:
- The four Wikimedia Commons photos: CC BY-SA 4.0 (Ramsey Isler) and CC BY-SA 2.0 (Eva Rinaldi).
- **Two non-free files**: the *Begins* publicity still from enwiki, and the 2007 EW first-look scan from /Film.

The suit design, the chest bat and the belt buckle are DC and Warner Bros. designs. The map is a 16-column caricature in our own colours, drawn after the costume's ideas: black with sheen, a bronze belt, a flat-topped bat. It does not trace any image. The glide wing is a generic batwing, not a traced frame. The rest of the Theme's legal points are in `nolan.md` §11.

## Unverified items

- The blue flames in the *Dark Knight* opening titles. IMDb crazy credits and MTV were read only as search excerpts: IMDb returned a bot challenge and MTV redirected by region.
- The three-pointed lower edge of the memory-cloth glide. It is from memory of the films; the only written support is "a glider version that snaps out as batwings" (Clothes on Film, of *Rises*).
- That the *Rises* costume is "exactly" the *Dark Knight* one. Wikipedia marks this "citation needed", and one search summary claimed the *Rises* cowl was reworked for head movement (from Empire's ["evolution of the Batsuit"](https://www.empireonline.com/movies/features/evolution-batsuit/), which returned 402). The 2007 photo shows the same belt, plates and cape.
- The *Begins* belt as "a modified climbing harness in bronze" (Wikipedia, citation needed). Its colour was observed only on a 272×367 publicity still.
- The sonar lenses' "white-eyed appearance" (Wikipedia, citation needed). It supports the white eyes but is not needed for them.
- All sampled values: under non-film light, from phone photos, a tungsten-lit display behind glass, a print scan and a low-resolution still. The proposed hexes are ours.
- How the map renders in the real `OutfitSvg`. Our check was a PIL approximation: cape rims drawn as polylines, the aura as Gaussian glows. The bat at 60px and the knee sheen should be judged in the prototype.

## Sources

- Costume designer: Jeff Jensen, ["Batman's New Suit"](https://web.archive.org/web/20100914092558/http://www.ew.com/ew/article/0,,20042739,00.html), *Entertainment Weekly* #940, 18 June 2007 (Wayback Machine) · ["Interview: Lindy Hemming, Costume Designer"](https://scifibulletin.com/film-reviews/film-interviews/interview-lindy-hemming-costume-designer/), SciFi Bulletin · ["The Dark Knight Rises: Costume Q&A with Lindy Hemming"](https://clothesonfilm.net/?p=2937), Clothes on Film (facts from the editorial intro)
- Cinematography: Bob Fisher, ["July Cover Story: The Dark Knight"](https://www.icgmagazine.com/web/july-cover-story-the-dark-knight/), *ICG Magazine*, July 2008 · Stephen Pizzello, ["Batman Begins: The Bat Takes Wing"](https://theasc.com/article/batman-begins-the-bat-takes-wing/), *American Cinematographer*, June 2005 · David Heuring, *American Cinematographer*, July 2008, [forum repost](https://forums.superherohype.com/threads/american-cinematographer-dark-knight-article-part-i.307097/)
- Photos of the screen costume (Wikimedia Commons): Ramsey Isler, [Batsuit from The Dark Knight Rises](https://commons.wikimedia.org/wiki/File:Batsuit_from_The_Dark_Knight_Rises.jpg) and [closer view](https://commons.wikimedia.org/wiki/File:Batsuit_from_The_Dark_Knight_Rises_film_-_closer_view.jpg), Warner Bros. Studio Tour Hollywood, 9 Aug 2014, CC BY-SA 4.0 · Eva Rinaldi, [The Dark Knight Rises (7590753720)](https://commons.wikimedia.org/wiki/File:The_Dark_Knight_Rises_(7590753720).jpg) and [Dark Knight Rises.jpg](https://commons.wikimedia.org/wiki/File:Dark_Knight_Rises.jpg), Sydney premiere, 17 July 2012, CC BY-SA 2.0
- Publicity images (non-free, sampled only): [File:Bale as Batman.jpg](https://en.wikipedia.org/wiki/File:Bale_as_Batman.jpg) (enwiki, *Batman Begins*) · Stephen Vaughn's 2007 first-look photo as an EW scan on [/Film](https://www.slashfilm.com/the-dark-knight-batmans-new-suit)
- Reference articles: Wikipedia, [Special effects of *The Dark Knight*](https://en.wikipedia.org/wiki/Special_effects_of_The_Dark_Knight) (citing Jesser & Pourroy 2012, pp. 112–115) · Wikipedia, [Batsuit](https://en.wikipedia.org/wiki/Batsuit)
- Opening titles (search excerpts only): [IMDb crazy credits, *The Dark Knight*](https://www.imdb.com/title/tt0468569/crazycredits) · [MTV, "'Dark Knight Rises' Opening Image: Christopher Nolan Explains"](https://www.mtv.com/news/9ojbx8/dark-knight-rises-opening-christopher-nolan)
- In this repo: [`nolan.md`](nolan.md) §3, §7, §8, §11 · `jury-wave-1.md` §6 · the prototype on branch `prototype/clawd-outfits`
