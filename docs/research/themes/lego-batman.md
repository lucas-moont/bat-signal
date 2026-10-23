# Theme dossier: The LEGO Batman Movie (2017), with the Lego Batman games

Research note, 2026-10-22. Scope: one Bat-Signal Theme after *The LEGO Batman Movie* (Chris McKay, 2017; Warner Animation Group and DC Entertainment with the LEGO Group, animated by Animal Logic), with the Lego Batman games as a second source (*LEGO Batman: The Videogame*, 2008; *LEGO Batman 2: DC Super Heroes*, 2012; *LEGO Batman 3: Beyond Gotham*, 2014; *LEGO Batman: Legacy of the Dark Knight*, 2026). Wave 3, round 3, the last dossier of the wave ([`wave-3-brief.md`](wave-3-brief.md) §2, §5–7), issue #143, Linear LUC-85 (Theme issue LUC-96). It reads the four earlier Wave 3 dossiers ([`animated-series.md`](animated-series.md), [`long-halloween.md`](long-halloween.md), [`arkham-games.md`](arkham-games.md), [`adam-west.md`](adam-west.md)) and [`claims-wave-3.md`](claims-wave-3.md), and is measured against the seven shipped stylesheets (`main`, v1.3.0) and SERIOUS HOUSE as kept on `feat/123-serious-house`. Terms are those of [`CONTEXT.md`](../../../CONTEXT.md).

The maintainer's decision frames everything here: **the whole app turns into pieces.** Plastic, studs, brick corners on the panel and the disc, and Bat-Clawd as a minifigure (cowl, cape and belt as pieces over his own body). So this note has one section the others don't: §11, the whole app as pieces, with each engine ask split out. The legal table (§3.2) comes before it, as asked.

Provenance key, as in [`dkr-rework.md`](dkr-rework.md): **Read** = seen by us on a reference image, named by its number in the folder (`[33]`). **Measured** = taken off that image by a script (median, most chromatic 5%, darkest 5%, brightest 5%; LCh D65). **Inferred** = our reading. **P** = proposed by us. ΔE00 is CIEDE2000 and contrast is WCAG 2, both computed by our script (`pal.py`, the same code the TAS and West dossiers used).

## 1. TL;DR

- **The Theme in one sentence:** the panel is a very dark grey baseplate with smooth tiles laid on it, the title cards' yellow on the wordmark, Bat-Clawd in a black cowl and cape with a yellow belt, a magenta Batcave neon as the only alarm, and a Batman who narrates his own app and thinks it is about him.
- **Display name: VERY DARK GREY** (the maintainer's working name, LUC-96). Credit (`film`): "The LEGO® Batman Movie (2017)", the word mark used as the LEGO Group's Fair Play page asks (§3.2). Alternatives: **BLACK AND YELLOW** (the teaser's own cards [44] [45]), **NINE-PACK**.
- **Legal, the bottom line (§3.2):** studs as a flat texture are defensible, because the EU's highest court held the brick's studs to be a technical shape that trademark law can't monopolise (C-48/09 P, 2010). The minifigure is not: its shape (head, body, arms, legs) is a valid EU trade mark (T-395/14 and T-396/14, 2015), so Bat-Clawd keeps his own body and hands, no cylinder head, no C-clamp hands, and no word ever appears on a stud.
- **The chest is a yellow oval** with a black rim and a black bat, on a black torso with printed grey abs [33] [42] [14], and the games use it too [51]. **So this Theme joins the open yellow-oval question** (TAS C1, West J1–J3, PALE MOONLIGHT's plate). It does not pick around it: §8.2 gives the oval (C1, faithful) and the games' bare black bat (C2, [50] [53]) for the jury.
- **Ground: G1, the suit's own grey,** `#24252a` / `#2e2f36` / `#3b3d45`. The surface is the torso's median in the 1080p close-up [33]. It is lighter than any shipped ground (surface L* 19.6), and that is the point: very dark grey, not black. **Honestly, texture separates it, not hue.** It is a near-neutral like TAS's black paper (8.8 surface / 7.0 raised from it, under the ~10 floor) and VENGEANCE's black (10.9 from its surface, 9.6 from its `#000000` page). The studs, the tiles and the lighter tone do the work (§4.2).
- **Alarm: M, the Batcave's neon magenta,** `#fe79d0` lit, `#b8267d` fill, after the hot-pink neon bat behind the Batcomputer [33] [35] [39]. Measured first: on this lighter ground an alarm must reach L* 69 to read 4.5:1 on `--raised`, and at L* 69 **every red, orange, yellow, blue and cyan is taken** (§4.3 sweep). Magenta is the only free hue the film shows. It crosses round 3's "no pinks" line: nearest is BLUE COLLAR's mauve *waiting* ink at 11.5; every other alarm is 16.9 or more away; 31.8 from Clawd.
- **Inks:** working is **Bone** `#eceef2` (white plastic); waiting is **screen ice** `#88eef6`, the Batcomputer's brightest cyan [38] (9.1 from ANCIENT GRACE's Lightning Cyan, 10.0 from WATCHFUL PROTECTOR's mercury). The film's yellow (`#f9c908`–`#f2ce11` on the cards [17] [45]) can't be an ink: it sits 3.7–6.5 from PALE MOONLIGHT's gold alarm. It stays at rest on the belt, the oval and the wordmark (§4.4).
- **Type:** **Russo One** (OFL) for the wordmark, after the bevelled squared capitals of the title cards [16] [43]; **Changa One** (OFL) for the stamps (PERMISSION 89.6 / 80.8 / 64.5 against 101 / 87 / 72); **Rubik** (OFL) for headlines and the report, after the Batcomputer's screens [36] [37]. Bungee, the obvious blocky face, is BLUE COLLAR's; Lilita One is West's alternative; both left alone.
- **Voice: Batman narrating his own app,** first person, vain, loud, self-aware, lonely underneath. It starts exactly where West's stops (adam-west.md §6): West is sincere camp; this one knows he's the joke. **Lexicon: Case · NEED A HERO · AUTOGRAPH? · EPIC FAIL · HELLO? · FAN MAIL · Stalled**, all measured in Changa One at 11px.
- **Signature: L1, dinner for one** [46] [60]: Bat-Clawd seated alone at a long low table, a covered plate at his side. At 54px it is a head and shoulders over a bar wider than he is, with a dome on it. Nothing among the eleven taken outlines has a horizontal bar (`boards-lego/outlines.png`).
- **The whole app as pieces (§11):** (a) variables; (b) an engine PR for the panel and disc layers: a static stud texture on the ground, `--radius` moved into the Theme variables, a plastic edge on tiles, a hard extrude on the wordmark, a texture layer on the disc; (c) suit pieces, mostly Theme data; (d) an engine PR for a building-instructions report (step numbers in the margin); (e) Atmosphere as an option on an existing painter. All static but (e), so no Theme goes above VENGEANCE's CPU.
- **Atmosphere: A2, a sheen over the studs** (a soft light crossing the baseplate once in a while, nothing falls), or A1, pieces falling. Decide on screen.

## 2. References

The folder is `C:/Users/thewo/AppData/Local/Temp/claude/C--Users-thewo-Documents-BatCaver-Code-Extension/bb2270e0-bcee-4ba5-a059-2f645fa77ff4/scratchpad/refs-lego/`, with an `INDEX.md` listing 60 images: number, file, source URL (with the second for video frames), source and edition, what it shows, and the decision it informs. Scripts are in the sibling `tools-lego/`, boards in `boards-lego/`, raw downloads in `dl-lego/`. Nothing from it enters the repository.

| Kind | Entries | Source |
|---|---|---|
| The film, 1080p | [01]–[22] Trailer #4; [23]–[30] the Wayne Manor teaser; [31]–[40] the film's "Batcave" clip | Warner Bros.' own trailer uploads (2016); HBO Max Family's clip of the film (2021) |
| The film, 360p | [41]–[46] [60] the Batcave teaser (2016); [47] [48] "Batman's Lessons for Robin" | Warner Bros. and Warner Bros. Entertainment uploads; 640x360 is the only size offered, so these are used for hue and shape, not detail |
| The poster | [49] | Warner Bros. (2017), via Wikipedia |
| The games | [50] game 1; [51] [52] [59] game 2; [53] [54] game 3; [55]–[58] *Legacy of the Dark Knight* | Warner Bros. Games' Steam store screenshots; [58] Warner Bros. Games, CC BY 4.0 on Commons |

Three Warner trailer uploads and three game trailers refused to download (HTTP 403); the folder holds no third-party re-uploads instead. No fan builds or fan art.

**The five images that best say what the work looks like:**
1. **[33] Batman and Alfred at the Batcomputer (1080p):** the yellow oval with its black rim, the printed abs, the yellow pouch belt, the white lenses, and the magenta neon bat behind. The suit, the chest and the alarm in one frame.
2. **[16] "IT TAKES A TEAM":** bevelled yellow capitals on a near-black studded plate. The film's own UI is a baseplate; this is the stud overlay's reference.
3. **[46] Eating alone in the Batcave:** the ego's other side, and the Signature.
4. **[11] Full figure in the Batcave:** the cape as a stiff black bell to the floor, the belt, the world built of pieces.
5. **[37] "BIOMETRIC ANALYSIS":** Batman drawn as a schematic on the Batcomputer, the reference for a report that reads like building instructions.

## 3. Visual identity and sources

### 3.1 What makes it recognisable

Each from a source:

1. **Everything is pieces.** The world is rendered as real Lego elements, brick by brick: the gala [02], the Batcave [34] [35], the burning skyline [18], even the title cards, which are yellow letters on a studded plate [09] [12] [16] [17] [43]–[45]. Read.
2. **Black and very dark grey, then yellow.** The teaser's cards say it in three steps: "HE'S BACK" [43], "IN BLACK" [44], "...AND YELLOW" [45]. The suit is black and dark grey plastic with a yellow belt and a yellow oval [33] [42]; the poster and the logo card are yellow fields [19] [49]. Read. The phrase "very, very dark grey" is Batman's own joke about his colours; it is widely attributed to *The Lego Movie* (2014), not checked against a transcript (§14).
3. **The ego.** The film opens with Batman narrating the studio logos over a black screen ([Wikiquote](https://en.wikiquote.org/wiki/The_Lego_Batman_Movie)); a news anchor says it must be great to be Batman [01]; he admires his abs; the Batcomputer is a home cinema [05]. Read.
4. **The loneliness under it.** He eats a microwaved lobster alone [46] [60], and sits alone by the fire in the manor [28]. Read.
5. **The Batcomputer.** Flat panels in cyan on navy with white-on-red headers: "PHANTOM ZONE PROJECTOR", "BIOMETRIC ANALYSIS", "DEFENSE SYSTEMS", "PARENTAL LOCK", "SECURITY CAM 023" [31] [32] [36]–[38]. Read.
6. **A Batman who knows his own franchise.** A slideshow of the past Batmen [15]; Alfred's memory of the 1966 Batusi [29]. Read. This is where it meets Adam West (§6).
7. **The games.** The same minifigure Batman across four games: the grey suit and bare black bat (2008 [50], 2014 [53]), the black suit with the oval (2012 [51]), a blue-grey armoured suit (2026 [55] [58]). Read.

Credits: directed by Chris McKay; Batman voiced by Will Arnett; production companies Warner Animation Group, DC Entertainment, RatPac-Dune Entertainment, Lin Pictures, Lord Miller Productions, Vertigo Entertainment and the LEGO Group; animation by Animal Logic; released in the US on 10 February 2017 by Warner Bros. Pictures ([Wikipedia](https://en.wikipedia.org/wiki/The_Lego_Batman_Movie)). The games are by TT Games (Traveller's Tales), published by Warner Bros. Games.

### 3.2 What may become a piece (legal, before any engine work)

Primary sources, read:
- **Court of Justice of the EU, C-48/09 P, *Lego Juris v OHIM*, 14 September 2010** ([press release 91/10](https://curia.europa.eu/jcms/upload/docs/application/pdf/2010-09/cp100091en.pdf)). The red brick's three-dimensional mark is invalid: it consists exclusively of the shape of goods necessary to obtain a technical result. "The most important element of the sign ... is the two rows of studs on the upper surface", necessary to assemble the bricks. The appeal was dismissed. The Court added that copies of a technical shape may still be judged under unfair-competition rules.
- **General Court, T-395/14 and T-396/14, *Best-Lock v OHIM*, 16 June 2015** ([press release 71/15](https://curia.europa.eu/jcms/upload/docs/application/pdf/2015-06/cp150071en.pdf)). Lego's minifigure marks, registered in 2000 for games and playthings, stand. "No technical result is connected to or entailed by the shape of the essential characteristics of the figures (heads, bodies, arms and legs)"; the shape's "result" is "to confer human traits". Best-Lock's appeal to the Court of Justice (C-452/15 P) ended in an order of 14 April 2016 that BAILII titles a rejection; we could not open its text (§14).
- **The brick as a design.** Separately from trade marks, Lego holds a registered Community *design* for a building brick; the General Court upheld it under the modular-systems exception (T-515/19, 24 March 2021; T-537/22, 24 January 2024). Read through secondary sources only ([Fieldfisher](https://fieldfisher.com/en/services/intellectual-property/intellectual-property-blog/lego-a-s-v-euipo---wider-protection-for-modular-de), [SVW](https://svw.no/en/lego-retains-its-exclusive-design-right-to-lego-bricks-in-the-eu/)). A design right covers a product (a toy brick); a 2D dot pattern behind a software panel is not a building block. Inferred, not legal advice.
- **The LEGO Group's own guidance, [Fair Play](https://www.lego.com/en-us/legal/notices-and-policies/fair-play)**: the word mark only as an adjective, with ®, in the surrounding typeface, never highlighted; the LEGO logo never on an unofficial site; a disclaimer that the LEGO Group does not sponsor, authorise or endorse the site. It lists "the Minifigure" among its marks and says the basic brick is a registered mark in some countries.
- DC and Warner Bros. own Batman, his symbols and the film; the film's logo [19] [22] is theirs.

| Element | What the film shows | What we may draw |
|---|---|---|
| Studs | Every surface, the title cards' plate [09] [16] [43] | **Yes, as a flat texture**: plain round dots with a highlight and a shadow on a regular pitch. The studs are the brick's technical feature (C-48/09 P). Never a word on them: real studs carry the LEGO word embossed, ours are blank |
| The brick's shape as a product | Bricks everywhere | Not as an object or icon that is a toy brick. A 1px rounded corner and a dark lower edge on a rectangle (a "tile") is a UI shape, not the registered brick design. The 2x2 brick held in Signature L3 is the one place we'd draw a brick; it is dropped if L3 is not chosen |
| Plastic shine | Specular highlights on every piece | Yes. A generic material look |
| The minifigure's body: cylinder head, trapezoid torso, C-clamp hands, hinged legs | Every character [11] [33] [41] | **No.** It is a valid EU three-dimensional mark (T-395/14, T-396/14), and the court named head, body, arms and legs as its essential characteristics. Bat-Clawd keeps his own body, eyes, jaw and arms (DESIGN.md, Costume Rule). No stud on his head, no C hands, no hip-leg split |
| The cowl, the cape, the belt as pieces | Batman's moulded cowl, cloth cape, printed belt [33] | Yes, as Batman's costume drawn over Bat-Clawd, as every Theme does. The cowl is Batman's (DC), not a minifigure feature |
| The chest oval and bat | Yellow oval, black rim, black bat [33] | Yes, redrawn by us and credited to DC, as every Theme's emblem is (ADR 0001) |
| The LEGO word mark | In the title [19] | Only in the credit, as the work's title, "The LEGO® Batman Movie (2017)", as an adjective with ®, in the picker's own face. Never in the wordmark, a stamp, a stud, the disc or the Voice |
| The LEGO logo (red square, white letters) | In end cards [22] | **Never**, anywhere (Fair Play) |
| The film's logo: the bat built of studs with the title | [19] [22] | No (Warner's). Our disc bat is a plain bat, not the logo |
| Building-instructions pages | Not in the film; the LEGO Group's booklets | A numbered-steps layout is an idea, free to use. We don't copy the booklets' look (their colours, typefaces, part callouts' drawing style) |
| Characters, frames, music, the voice cast | Throughout | No (ADR 0001). Short phrases only |

**Bottom line.** Studs, tiles and plastic shine are free to draw as texture, because the EU's top court held the studs to be a technical shape outside trademark law; the minifigure's body is a valid trade mark, so Bat-Clawd wears Batman's cowl, cape and belt over his own body and never becomes a minifigure. The LEGO word appears once, in the credit, as Fair Play asks, and the logo never.

## 4. Palette

### 4.1 How it was sampled

`tools-lego/sample.py` and `crops.py` (copies of TAS's and West's) keep a box, a hue band or a lightness band and report the median, the most chromatic, the darkest and the brightest (`boards-lego/crops1.png` tiles the boxes). Every hex below names its entry. The film is lit in coloured light (blue Batcave, orange fire, a yellow baseplate), so samples are read with the light in mind: the suit's grey from the blue-lit [33] and the yellow-lit [42] agree in lightness (L* 16–20) and differ in cast.

| What | Entry | Filter | median | most chromatic | brightest |
|---|---|---|---|---|---|
| Torso, between the abs lines | [33] | box | `#2e2f36` L20 h286 | `#292b37` | `#797f7b` (the printed lines) |
| Torso | [42] | box | `#2d2726` L16 (yellow light) | | |
| Cape | [33] | box | `#111220` L6 | | |
| Cowl (rim-lit) | [33] | box | `#1a466e` (blue light) | darkest `#101b32` | |
| Oval | [33] | box | | `#e5af37` h82 | `#e6b03c` |
| Belt | [33] / [42] | box | `#e7a738` | `#ecb038` h80 / `#b08202` | `#eeb33a` |
| Jaw | [33] | box | `#a17d6e` | | `#c2a799` |
| Title card plate | [09] [16] | box | `#0f0f0f` | | `#1f1f1e` (stud highlights) |
| Title card yellow | [17] / [45] | box | | `#fac000` h85 / `#f3cd0e` h91 | `#f9c908` / `#f2ce11` |
| Poster yellow | [49] | h 60–100, C* ≥ 40 | `#ebbf0b` h89 | `#fee702` | |
| Batcave neon (magenta) | [33] | h 330–359, C* ≥ 30 | `#b7408b` h343 | `#b53789` | `#ce5ea0` |
| Batcomputer red headers | [31] / [36] / [38] | h 350–40, C* ≥ 40 | `#bd3435` / `#c72f31` / `#d2315a` | `#ea3639` h32 | |
| Big red button | [33] | box, h 350–40 | `#eb3c3f` | `#fe3e3e` h33 | |
| Batcomputer cyan | [36] / [38] | h 180–260, C* ≥ 25 | `#2a8dae` / `#3ea1c1` | `#2fbad8` / `#41c8df` | `#88eef6` h205 |
| Batcave floor light | [40] | h 200–280 | `#3687c6` | | `#a5d5f6` h250 |
| The dark Batcave | [46] | whole frame | `#090c09` L3 | | |

### 4.2 The ground, and "very, very dark grey" against pure black

The Theme's name is a joke about the difference between black and almost black. So the measured question first: does anything but texture separate this ground from VENGEANCE's pure black and TAS's black paper?

| Option | abyss / surface / raised | LCh of surface | Nearest surface | Nearest raised | Source |
|---|---|---|---|---|---|
| **G1, the suit's grey (recommended)** | `#24252a` / `#2e2f36` / `#3b3d45` | L* 19.6 C* 4.8 h 286 | WATCHFUL PROTECTOR 8.7, TAS 8.8, SERIOUS HOUSE 10.4, VENGEANCE 10.9 | **TAS 7.0**, WATCHFUL PROTECTOR 9.7, SERIOUS HOUSE 11.0 | S [33] torso median as the surface |
| G1b, raised lifted | as G1, raised `#44464f` | | | TAS 9.9, WATCHFUL PROTECTOR 12.5 | P. Costs contrast: the alarm drops to 3.96:1 on it, so it fails unless the alarm goes lighter still |
| G2, the card plate (rejected) | `#0f0f0f` / `#1a1a1a` / `#262626` | L* 9.3, neutral | **TAS 1.4**, VENGEANCE 3.2 | TAS 2.0 | S [09] [16] plate. It is TAS's black paper |
| G3, the suit in the dark (rejected) | `#121315` / `#1c1d21` / `#2e2f36` | L* 10.8 | **TAS 3.0**, WATCHFUL PROTECTOR 4.2 | TAS 3.5 | P |

**The honest answer.** Against VENGEANCE: its page `#000000` is 9.6 from G1's abyss and 13.0 from G1's surface; its surface `#13100e` is 10.9 from ours. That gap is lightness only. Hue doesn't help: both are near-neutral (ours C* 4.8 cool, VENGEANCE's warm C* ~3). Against TAS's black paper (`#161617` / `#2a2a2c`, also neutral) G1 is 8.8 / 7.0: under the ~10 floor on the raised tone. Every darker grey lands on TAS (G2, G3). So **texture separates this Theme, not hue**: the studs on the ground, the tiles' plastic edges, the yellow wordmark. Lightness helps a little, and G1 goes as light as a dark Theme should (surface L* 19.6, the lightest ground in the app, still a dark panel by ADR 0001). This crosses into TAS's "black paper" territory (claims table, round 3's list) and says so: the two part on lightness (G1's surface is 12 L* lighter), on texture (studs against painted paper), and on every other axis (§12).

The Pure Black Ground Rule binds VENGEANCE only; G1 is dark, never light.

### 4.3 The Alarm color

**Why not the film's red, yellow, blue or cyan, measured.** On G1's raised tone (L* 25.9) an alarm needs L* 69 to read 4.5:1. `tools-lego/sweep.py` takes, for every 10° of hue, the most chromatic colour that passes, and finds its nearest taken colour (every alarm, ink, suit and belt of the shipped, paused and drafted Themes, and Clawd):

| Hue | First passing colour | Nearest taken (ΔE00) |
|---|---|---|
| 20–40 (the Batcomputer's red [36], the button [33]) | `#fe848c`–`#fe876a` | BECOME A BAT's alarm 8.2–9.8, Clawd 8.1, KNIGHTMARE's ink 7.6 |
| 50–100 (orange to the cards' yellow [17]) | `#ff8851`–`#c8a501` | TAS 7.6, HOLIDAY 4.9, FREEFLOW 3.1, West's oval 4.1 |
| 110–140 (lime) | `#9eb307`–`#0dc335` | BLUE COLLAR's lemon 9.5, SERIOUS HOUSE's green 9.4 (and no source in the film) |
| 150–250 (green to the screens' cyan [36] [38]) | | West's green 2.8–7.0, WATCHFUL PROTECTOR 7.6–10.8, ANCIENT GRACE 3.8–7.6 |
| 260–320 (the cave's blue [40] to violet) | | WATCHFUL PROTECTOR 1.2–5.9, PALE MOONLIGHT's steel 6.2, TAS B 7.5, West 6.9 |
| **330–350 (the Batcave's neon magenta [33])** | `#fe71f2`–`#fd7ebc` | **West's alarm 12.4, BLUE COLLAR's mauve 9.8–11.4** |

On a darker ground (raised = the suit itself, `#2e2f36`) the same sweep leaves red no room at all: every red from h 10 to 40 is 1.4–5.6 from KNIGHTMARE, BECOME A BAT or SERIOUS HOUSE.

| Option | `--signal-hot` / `--signal` | Source | Clawd | Nearest taken colours | Min contrast on the 11 grounds |
|---|---|---|---|---|---|
| **M, the Batcave neon (recommended)** | `#fe79d0` / `#b8267d` | S [33] neon `#b7408b`–`#ce5ea0` (h 343), [35] [39]; lifted to L* 69 at h 341 | 31.8 | BLUE COLLAR's *waiting* mauve 11.5; West's alarm 16.9; HOLIDAY's waiting 17.4; every other alarm 19 or more | 4.57 (`--raised`) |
| R, the Batcomputer red | `#fe857c` / `#c72f31` | S [36] [31], lifted | 8.1 | BECOME A BAT's alarm 8.2, SERIOUS HOUSE 9.1 | 4.57 |
| Y, the title cards' yellow | `#f2c21c` | S [17] [45] | 33.6 | **PALE MOONLIGHT's gold alarm 3.7** | 6.45 |

**Why M.** It is in the film, in the very frame that shows the chest [33]: a hot-pink neon bat lights the Batcave behind Batman and Alfred, and again in [35] and [39]. It is the only hue the sweep leaves open. Its costs, stated: it crosses round 3's "avoid pinks" line, against BLUE COLLAR's mauve (`#d79bbd`, a waiting ink, 11.5 away, a different role) and newsprint magenta, which the Wave 2 jury left unclaimed after BECOME A BAT took red. And a magenta is cooler than a red: it must be the hottest thing in the palette while the yellow belt sits at rest. Decide on screen whether the yellow belt beside a lit magenta disc still reads magenta as the alarm.

R and Y are listed to show the cost, not proposed: R is the film's own alarm colour but sits 8.1 from Clawd and 8.2 from BECOME A BAT; Y is the film's identity colour and is PALE MOONLIGHT's gold (and round 3 bars the yellow oval as an alarm).

### 4.4 What `--signal` paints, and the inks

`--signal` paints only the alarm: lit stamps (AUTOGRAPH?, EPIC FAIL), the count box, the lit disc (a translucent piece, §9), the aura, and Bat-Clawd's alarmed pose. `--blood` `#5c2a4b` (the neon's shadow) is the unlit rim and the waiting rule, never text (18.6 from `--signal`, 1.20:1 on the surface).

- **Working, Bone `#eceef2`**, white plastic (the film's whites read neutral: [22] [37]). It is 1.8–4.6 from SERIOUS HOUSE's, WATCHFUL PROTECTOR's, BLUE COLLAR's and ANCIENT GRACE's bones, as Bones are.
- **Waiting, screen ice `#88eef6`**, S [38] brightest, the Batcomputer's lit cyan. 9.1 from ANCIENT GRACE's Lightning Cyan (an alarm, another role), 10.0 from WATCHFUL PROTECTOR's mercury (a working ink). The alternatives are worse: the floor light `#a5d5f6` [40] is 3.8 from TAS's working blue-white; any yellow is 3.7–6.5 from PALE MOONLIGHT's gold.
- **The yellow stays, at rest.** `--accent` (the wordmark) is the cards' yellow `#f2c21c` [17] [45]; the belt `#ecb038` and oval `#e5af37` are S [33]. None of them is the alarm. Cross-Theme cost: the wordmark's yellow is 3.7 from PALE MOONLIGHT's gold; told apart by the ground, the studs and the picker. If that is too close, the wordmark goes Bone and the yellow lives on the suit only.

### 4.5 Token map (G1, alarm M)

Every variable a shipped Theme sets (read from `absolute-batman-2024.css`), plus the new ones of §11.

| Token | Value | Provenance | Role |
|---|---|---|---|
| `--abyss` | `#24252a` | P, G1 | Page and window: the baseplate |
| `--smoke` | `#282a2f` | P | Top gradients, notice foot |
| `--surface` | `#2e2f36` | S [33] torso median | Cards: the tiles |
| `--raised` | `#3b3d45` | P | Hover, selection |
| `--line` | `#4a4d57` | P | Rules, tile edges |
| `--surface-deep` / `--header-fade` | `#27282d` | P | |
| `--frame` | `#33353c` | P | |
| `--sheet-top` | `#34363d` | P | |
| `--shadow` | `#000000` | | |
| `--blood` | `#5c2a4b` | P, the neon's shadow | Unlit rim, waiting rule. Never text |
| `--signal` | `#b8267d` | S [33] `#b7408b` (4.3 away) | Lit fills; Bone on it 5.01:1 |
| `--signal-glow` | `color-mix(in srgb, var(--signal-hot) 40%, transparent)` | | |
| `--signal-hot` / `--ink-hot` | `#fe79d0` | S [33] `#ce5ea0` lifted (11.7 away) | AUTOGRAPH?, EPIC FAIL |
| `--on-signal` | `var(--bone)` | | |
| `--ink-soft` | `#88eef6` | S [38] brightest | HELLO?, FAN MAIL, NEED A HERO |
| `--ink-live` | `var(--bone)` | | Working |
| `--ink` / `--bone-dim` | `#c5c8d0` | P | Secondary text |
| `--bone` | `#eceef2` | P, white plastic [22] [37] | Text |
| `--ash` / `--ash-dim` / `--chevron` | `#a9acb6` | P, light bluish grey | Quiet text, STALLED |
| `--accent` / `--accent-hot` | `#f2c21c` | S [17] `#f9c908`, [45] `#f2ce11` | The wordmark, the title cards' yellow. Not the alarm |
| `--accent-deep` / `--selection` | `var(--line)` | | |
| `--accent-glow` | `color-mix(in srgb, var(--bone) 12%, transparent)` | | |
| `--progress-deep` / `--progress-hot` | `var(--line)` / `var(--ink-live)` | | |
| `--thumb` | `var(--abyss)` | | |
| `--brick` / `--stamp-soft` | `var(--ink-soft)` | | |
| `--stamp-hot` | `var(--ink-hot)` | | |
| `--stamp-quiet` | `var(--ash)` | | |
| `--in-progress` / `--in-progress-glow` | `var(--ink-live)` / 40% | | |
| `--danger` | `var(--raised)` | | |
| `--waiting-rule` | `var(--blood)` | | |
| `--report-rule` | `var(--line)` | | |
| `--caption-paper` / `--caption-ink` / `--caption-rule` | `transparent` / `var(--ash)` / `underline` | | As every Theme but BECOME A BAT |
| `--clawd` | `#d77757` | | |
| `--clawd-eye` / `--clawd-eye-dim` | `var(--bone)` / 18% | | The film's white lenses [06] [24] |
| `--cowl` / `--cape` / `--gloves` | `#141519` | S [33] cape `#111220`, cowl darkest `#101b32` | Black plastic |
| `--cowl-shine` | `#5d606b` | P | The cowl's specular highlight, 2.91:1 on it |
| `--cowl-edge` / `--cape-rim` / `--thread` | `color-mix(in srgb, var(--ash) 30%, transparent)` | | Neutral rim (Costume Rule) |
| `--suit` | `#454852` | P, the torso lit (S-A, §8) | 1.46:1 on the surface |
| `--belt` | `#ecb038` | S [33] chromatic | The pouch belt, 4.71:1 on the suit |
| `--buckle` | `#a8761c` | P, the pouches' gaps | |
| `--chest` | `#0d0d10` | | The bat and the oval's rim |
| `--emblem-plate` | `#e5af37` | S [33] chromatic | The oval, at rest, never lit (C1) |
| `--aura-core` / `--aura-glow` | `--signal-hot` at 90% / 55% | | Only while something needs you |
| `--emblem` | `var(--accent)` | | Masthead bat in yellow, as the logo card [19] inverts it |
| `--disc-bat` / `--glass-shine` | `var(--line)` / `#3a3c44` | P | Unlit disc |
| `--glass` | `var(--abyss)` | | |
| `--disc-rim-inner` / `--disc-rim-outer` | `var(--cowl)` / `var(--line)` | | |
| `--lens-core` | `#ffd7f0` | P | The translucent piece's hot centre |
| `--lens-rim` / `--lens-bat` | `var(--cowl)` | | |
| `--lens-bat-edge` | `transparent` | | |
| `--lens-shade` | `inset 0 0 0 4px rgb(255 255 255 / 0.18)` | P | The lit piece's moulded rim |
| `--disc-lens` | radial `--lens-core` → `--signal-hot` 45% → `--signal` 85% | P | §9 |
| `--notice-top` / `--notice-foot` | `var(--surface)` / `var(--smoke)` | | |
| `--notice-hover-top` / `--notice-hover-foot` | `#393b43` / `#2b2d33` | P | |
| `--haze` / `--haze-edge` / `--haze-inset` | `#3687c6` at 10% / 3%, `-20% -10% auto -10%` | S [40] the Batcave's blue | A faint cave light from above |
| `--grain-opacity` | `0` | | The studs replace the grain |
| `--searchlight` | `var(--bone)` | | |
| `--font-display` / `--display-weight` | `'Russo One'` / `400` | §5 | Wordmark |
| `--font-headline` / `--headline-weight` | `'Rubik'` / `800` | §5 | Headlines, after the Batcomputer screens |
| `--font-dateline` / `--dateline-weight` | `'Rubik'` / `700` | | |
| `--font-stamp` / `--stamp-weight` | `'Changa One'` / `400` | §5 | |
| `--font-report` | `'Rubik'` (400) | §5 | The report: a manual, not a typewriter |
| `--font-body` / `--font-type` / `--font-label` | Barlow Semi Condensed | shared | |
| `--font-case-title` / `--case-title-weight` | `var(--font-body)` / `600` | | |
| `--font-mono` | JetBrains Mono | shared | |
| `--heading-case` | `none` | | |
| `--folder-name-size` / `--folder-name-tracking` | `14px` / `0.3px` | | |
| `--wordmark-size` / `--wordmark-tracking` / `--wordmark-glow` | `17px` / `1px` / `transparent` | | |
| `--pen-hot` / `--pen-soft` | the shared SVG stroke in `#fe79d0` / `#88eef6`, `stroke-linecap='square'` | | |
| `--stamp-tilt` / `--stamp-tilt-slight` | `0deg` / `0deg` | P | Pieces sit square on the grid |
| `--stamp-border` / `--stamp-size` / `--stamp-mask` | `1.5px` / `11px` / `none` | | |
| **new** `--radius` | `1px` | §11 (b) | Brick corners. Moved from `:root` in `theme.css` into every Theme (4px for the others) |
| **new** `--studs` / `--studs-size` | three radial gradients (a highlight up-left, a shadow down-right, the stud's face), `8px 8px` | §11 (b), [09] [16] | The baseplate. `none` in every other Theme |
| **new** `--tile-edge` | `inset 0 1px 0 rgb(255 255 255 / 0.10), inset 0 -2px 0 rgb(0 0 0 / 0.30)` | §11 (b) | Plastic: a lit top edge, the dark side below. `none` elsewhere |
| **new** `--wordmark-extrude` | `0 1px 0 #7a5d00, 0 2px 0 #3b2f05` | §11 (b), [16] [43] | The cards' bevel as a hard drop. `none` elsewhere |
| **new** `--disc-texture` | four studs on the rim (D2) or `none` (D1) | §9, §11 (b) | |
| **new** `--step-display` | `inline-block` | §11 (d) | The report's step numbers. `none` elsewhere |
| **new** `--sheen` | `var(--bone)` | §10 | Atmosphere A2 |

### 4.6 WCAG contrast (computed, `tools-lego/palette.py`)

Every text colour on all 11 grounds. Aliases share their source's row (`--ink-live` is Bone; `--bone-dim` is `--ink`; `--stamp-hot` is `--signal-hot`; `--brick` and `--stamp-soft` are `--ink-soft`; `--ash-dim`, `--chevron`, `--stamp-quiet`, `--caption-ink` are `--ash`; `--accent` is the yellow).

| Text | Hex | abyss | smoke | surface | surface-deep | raised | header-fade | sheet-top | notice-top | notice-foot | notice-hover-top | notice-hover-foot | min |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `--bone` | `#eceef2` | 13.17 | 12.36 | 11.47 | 12.66 | 9.32 | 12.66 | 10.38 | 11.47 | 12.36 | 9.61 | 11.85 | **9.32** |
| `--ink` | `#c5c8d0` | 9.14 | 8.58 | 7.96 | 8.79 | 6.47 | 8.79 | 7.21 | 7.96 | 8.58 | 6.67 | 8.22 | **6.47** |
| `--signal-hot` | `#fe79d0` | 6.45 | 6.06 | 5.62 | 6.21 | 4.57 | 6.21 | 5.09 | 5.62 | 6.06 | 4.71 | 5.81 | **4.57** |
| `--ink-soft` | `#88eef6` | 11.37 | 10.67 | 9.90 | 10.93 | 8.05 | 10.93 | 8.96 | 9.90 | 10.67 | 8.30 | 10.23 | **8.05** |
| `--ash` | `#a9acb6` | 6.75 | 6.33 | 5.88 | 6.49 | 4.78 | 6.49 | 5.32 | 5.88 | 6.33 | 4.93 | 6.07 | **4.78** |
| `--accent` | `#f2c21c` | 9.11 | 8.55 | 7.94 | 8.76 | 6.45 | 8.76 | 7.18 | 7.94 | 8.55 | 6.65 | 8.20 | **6.45** |

All pass with no exception; the alarm and Ash have the least room (4.57, 4.78 on `--raised`). `--on-signal` (Bone) on `--signal`: 5.01. **The studs are not in this test**: they are a texture over `--abyss`, and the test reads flat colours. So the rule for §11 is that no text sits on the studs: the cards and the header fade cover them (P1 on `boards-lego/pieces.png`), and the stud highlight is at most 7% white.

### 4.7 ΔE00 against every Theme

| Theme | abyss | surface | raised | alarm hot | alarm fill | working | waiting | suit | belt | oval |
|---|---|---|---|---|---|---|---|---|---|---|
| VENGEANCE | 9.6 | 10.9 | 17.4 | 35.9 | 28.8 | 31.8 | 56.9 | 11.1 | 65.3 | |
| PALE MOONLIGHT | 8.8 | 11.1 | 15.1 | 59.1 | 53.3 | 20.4 | 44.8 | 10.9 | 35.0 | 34.5 (its brass plate) |
| WATCHFUL PROTECTOR | 8.3 | **8.7** | **9.7** | 36.9 | 40.0 | 23.1 | 43.4 | 11.8 | 28.0 | |
| KNIGHTMARE | 9.3 | 14.4 | 19.2 | 22.6 | 19.2 | 14.8 | 39.2 | 15.1 | 62.4 | |
| BECOME A BAT | 9.8 | 15.3 | 20.1 | 24.9 | 20.9 | 13.8 | 33.1 | 34.5 | 14.2 | |
| ANCIENT GRACE | 9.2 | 13.0 | 14.6 | 60.4 | 62.4 | 4.6 (both Bone) | 17.3 | 13.9 | 38.5 | |
| BLUE COLLAR | 7.8 | 12.7 | 15.6 | 72.6 | 77.5 | 20.8 | 48.0 | 18.6 | 27.1 | |
| SERIOUS HOUSE (paused) | 8.3 | 10.4 | 11.0 | 30.2 | 25.6 | 30.4 | 30.0 | 18.9 | 69.9 | |
| DARK DECO (TAS) | 8.0 | **8.8** | **7.0** | 38.6 | 32.6 | 13.9 | 38.1 | 14.2 | 10.2 | **6.0** (C1) |
| HOLIDAY | 8.6 | 13.1 | 18.6 | 44.0 | 39.3 | 4.8 (both Bone) | 17.4 | 24.6 | 11.6 | |
| FREEFLOW | 9.6 | 15.7 | 21.1 | 56.8 | 55.5 | 6.1 | 20.8 | **3.6** | | |
| SAME BAT-TIME | 9.9 | 12.9 | 15.2 | 16.9 | 20.5 | 5.7 | 25.4 | 23.0 | **7.5** | **3.9** |
| Clawd `#d77757` | | 44.3 | | 31.8 | 33.5 | 35.2 | 49.9 | | 26.5 | 27.2 |

Like with like (our alarm with theirs, our waiting ink with theirs). Across roles: our alarm is 11.5 from BLUE COLLAR's waiting mauve; our waiting ink is 9.1 from ANCIENT GRACE's alarm and 10.0 from WATCHFUL PROTECTOR's working mercury; our wordmark yellow is 3.7 from PALE MOONLIGHT's alarm. Inside the Theme: alarm to waiting 49.9, alarm to working 30.5, waiting to working 21.6.

The bold cells are the costs: the ground's near-neutral against TAS and WATCHFUL PROTECTOR (§4.2), the oval and belt against TAS and West (§8.2, the open question), and **the suit's grey against FREEFLOW's armour (3.6)**: both are a mid-dark neutral. What separates them is not the grey: it is the yellow oval and belt, the plastic shine and the cloth cape against the games' armour plates, gauntlet fins and wide flat bat.

## 5. Type

The film's lettering, read: the title cards in heavy, squared, bevelled capitals, yellow on a studded plate [09] [12] [16] [17] [43]–[45]; the Batcomputer in a heavy rounded grotesque, white on red [36] [37] [38]; the security camera HUD in blocky mono capitals [32]. The film's logo [19] is Warner's and is not imitated. A board sets four crops beside eight open candidates on G1 (`boards-lego/type.png`).

| Role | Proposal | Licence | Why, and limits |
|---|---|---|---|
| Display (wordmark) | **Russo One** 400 | OFL-1.1 ([Google Fonts](https://github.com/google/fonts/tree/main/ofl/russoone)) | Squared heavy capitals with rounded corners: the nearest open face to the title cards [16] [43]. The bevel is the extrude token (§11), not the font. PERMISSION 92.1 in the narrow margin, so it never stamps |
| Stamps | **Changa One** 400 | OFL-1.1 ([Google Fonts](https://github.com/google/fonts/tree/main/ofl/changaone)) | Heavy, slightly rounded, narrow enough: PERMISSION fits every room at 11px (below). Reads like the cards' weight at stamp size |
| Headlines, dateline, report | **Rubik** 700–800 / 400 | OFL-1.1 ([Google Fonts](https://github.com/google/fonts/tree/main/ofl/rubik)) | A rounded grotesque, after the Batcomputer screens [36] [37]: the report reads as a manual, not a typed file. Report faces may be shared; this one is unused so far |
| Body | Barlow Semi Condensed | shared | |
| Mono | JetBrains Mono | shared | |

**Taken, and said:** Bungee is BLUE COLLAR's, so the obvious blocky "brick" face is gone. Lilita One is West's named alternative; Titan One (PERMISSION 90.1 narrow, fails) and Passion One were West's sources only. Rubik Mono One (107.2 at 9.5px) and Dela Gothic One fail the margin outright.

Stamp widths, Changa One at 11px, border 1.5px, against the rooms `stampWidth.test.ts` reads (margin 101 at 0.12em; narrowest margin 87 at 0.04em; notice card 272; watch strip 72 unboxed at 9.5px), by `tools-lego/stampfit.py` (Pillow advance widths on the TTF):

| Word | margin | narrow | notice | strip |
|---|---|---|---|---|
| PERMISSION (standard, the widest) | 89.6 | 80.8 | 89.6 | 64.5 |
| NEED A HERO | 92.2 | 82.5 | | 66.6 |
| AUTOGRAPH? | 93.5 | 84.7 | | 67.8 |
| EPIC FAIL | 69.8 | 61.9 | | 47.3 |
| HELLO? | 58.7 | 53.4 | | 37.7 |
| FAN MAIL | 70.2 | 63.2 | | 47.7 |
| STALLED | 65.7 | 59.6 | | 43.8 |
| WORKING / IDLE / SHELL | 70.6 / 41.5 / 50.9 | 64.4 / 38.0 / 46.5 | | 48.0 / 22.9 / 31.0 |
| CASE OPENED / CASE CLOSED / TASK DONE | | | 94.9 / 92.3 / 80.7 | |
| NEEDS YOU / NEW REPLY / WAITING / ERROR (Lexicon off) | 80.6 / 80.8 / 65.9 / 54.7 | 72.7 / 72.9 / 59.7 / 50.3 | | 56.7 / 56.9 / 43.9 / 34.2 |

Every word fits every room. HERO NEEDED (87.0 in the 87px narrow margin) and HERO WANTED (89.5) don't, which is why Needs you is NEED A HERO. Alternative stamp face: **Tilt Warp** (OFL; PERMISSION 82.5 narrow), rounder, with a built-in 3D lean; AUTOGRAPH? fails its narrow margin (89.4), so it needs a shorter Permission word.

**The Type axis risk.** Russo One and Changa One are heavy sport capitals. FREEFLOW's Oxanium is a squared techno face, BLUE COLLAR's Bungee a blocky sign face, West's Luckiest Guy a round cartoon face. The jury may call one of them the same register ("~"). T2, Changa One for the wordmark too, moves away from Oxanium.

## 6. Voice

**Frame: Batman narrates his own app.** First person, present tense, aloud, to an audience he assumes is enjoying the show. He knows he is the star, says so, and is sure every case is about him. The film opens on exactly this: Batman talking over the studio logos about how important movies begin ([Wikiquote](https://en.wikiquote.org/wiki/The_Lego_Batman_Movie), read; we don't quote it). Under the brag, he is alone, and the Voice lets that show once in a while (the empty states, the report's close).

**The line with Adam West** (adam-west.md §6 ends: "West is sincere; Lego is self-aware"). This Voice starts on the other side of that line and stays there:
- West's narrator speaks *about* Batman in the third person and takes the absurd seriously. This Batman speaks *as* himself and knows it's absurd.
- West never brags, never mocks, never winks. This one brags in every line, teases the user a little, and winks at the app ("best panel in the app").
- West is 1960s pop: no modern slang. This one is 2017: "epic fail", fan mail, a nine-pack.
- No "Meanwhile…", no narrator, no "Bat-time", no POW!. The film quotes the Batusi as a memory [29]; this Theme doesn't, it is West's.

**The line with VENGEANCE.** Both are Batman in the first person. VENGEANCE is a private journal, terse and bleak, written for nobody. This is a performance, loud, for an audience. If a line could be whispered to a notebook, it's VENGEANCE's; if it needs an audience, it's this one.

**The line with ANCIENT GRACE and SERIOUS HOUSE.** The film has a news anchor [01]; this Theme doesn't use him (ANCIENT GRACE is TV news). It has an asylum and the Joker; this Voice never mentions either (SERIOUS HOUSE and the games).

Sample lines (P = ours, none quoting the film):
- Intro tagline: **"Batman. Also in this app."** (P)
- Empty state, all clear: **"Nothing needs a hero. Gotham's fine. You're welcome."** (P) *Fine* means all clear.
- No cases: "No cases. Just me, the cave, and a microwave dinner." (P) The loneliness, once.
- Quiet Signal tooltip: "All quiet. Because of me." Lit: "Someone needs a hero." (P)
- Night Report name: **"Building instructions"**; dateline `STEP 1 · 21:40`; case notes heading: "Parts list" (P, §11 (d))
- Report signature line when something waits: "These pieces still need you." (P)
- Report close, something still waiting: **"Some assembly required."** Nothing waiting: "Built. By me. Mostly by me." (P)
- Waiting sentence: "Claude asked you something. I'd have answered by now." (P)
- Stalled sentence: "Nothing from Claude in a while. Not my fault." (P)
- Settings kicker: "The utility belt"; Atmosphere switch: "Shine" ("Light across the baseplate behind the cases"). (P)
- On the perch (`mascot.watching`): "Bat-Clawd, dining alone". (P)
- Click caption on the Signature (once a session): "Lobster. Again." (P)

The brag never lands on the user: the joke is always Batman's vanity, never the user's work. Errors and waits stay plain enough to act on.

## 7. Lexicon

| Standard | Themed | Check |
|---|---|---|
| Case | **Case** | Kept. "Gig" (the rock star) was dropped: it reads as a job offer |
| Needs you | **NEED A HERO** | Clear: something needs you, and the user is the hero (the ego, turned outward once). Count: "1 needs a hero", "3 need a hero". HERO NEEDED fails the narrow margin by 0.0px; NEED A HERO fits |
| Permission | **AUTOGRAPH?** | A request for your signature: an approval. The ego: everyone wants his autograph. Risk: read as "sign in". Fallback: PERMISSION. Taken questions avoided: OK TO AIR?, PERMIT?, GO AHEAD?, BLESSING?, ACCESS?, MAY I? |
| Error | **EPIC FAIL** | Clear and severe, and 2017. Fallback ERROR. BUSTED, BOTCHED, FAILED, BLOWN, FOILED, DEAD AIR, GONE WRONG are taken |
| Waiting | **HELLO?** | "Is anyone there?": Claude waits for you. Risk: read as a greeting (a case opening). Decide on screen; fallback WAITING. YOUR MOVE, ASKING, WHAT NOW?, ANSWER ME, A WORD, RESPOND, YOU'RE ON, SEE ME are taken |
| New reply | **FAN MAIL** | Clear: something came in for you. The ego. Close in sense to NEW CLUE, NEW LEAD, MESSAGE, MEMO; the word differs. Risk low |
| Stalled | **Stalled** | Standard. BRICKED was the obvious Lego word, but a bricked device is dead for good: it reads as Error, a tier too severe. STUCK, JAMMED, FROZEN, HANGING, HELD UP, ON ICE are taken. *Dark*, *quiet* and *still* keep meaning all clear |

Live, task and session words stay standard. The tray and toasts keep the standard words.

## 8. Bat-Clawd

The Costume Rule holds (DESIGN.md): Clawd's body, white eyes and orange jaw; the suit over him; a neutral rim; the aura only while something needs you. And §3.2 holds: **no minifigure body.** "A minifigure" here means Batman's pieces (a moulded cowl with a shine, a cloth cape, a chunky belt, a printed chest) over Bat-Clawd's own shape. One unit is about 1.9px at 54px.

The film helps more than any other source: the minifigure Batman's cowl has **white lenses** [06] [24] [27] and shows **the jaw** below it [33]. Bat-Clawd's white eyes and orange jaw are already the film's face.

### 8.1 The suit (refs [11] [33] [41] [42])

| Piece | Grid | Colour | Reads at 54px? |
|---|---|---|---|
| Cowl | as `HEAD`, **standard ears**. The film's ears are tall [24] [33], but tall ears (to y −1) are SERIOUS HOUSE's (jury §9.6) | `--cowl` `#141519`, 1.37:1 on the surface, with the neutral rim | Yes, by the rim and the eyes (15.71:1 on the cowl) |
| Plastic shine | the brow's `h` cells, a 1-unit band on the cowl's upper left | `--cowl-shine` `#5d606b`, 2.91:1 on the cowl | At the floor; it is what makes the cowl a moulded piece, not cloth |
| Jaw | Clawd's orange, the row the film shows [33] | `#d77757`, 5.79:1 on the cowl | Yes |
| Torso | y 5–8 | **S-A** `--suit` `#454852` (the torso, one step lighter than the raised tone), 1.46:1 on the surface, 2.00:1 against the cowl. **S-B** the torso in cowl black `#1b1c21` (1.28:1 on the surface), faithful to "in black" [44] | S-A reads as a grey body under a black cowl and cape, as [33] does. S-B leans on the rim and the yellow. Decide on screen |
| Printed abs | the grey lines on the torso [33] [14] | `#797f7b` (S [33]) | **Under the floor** (0.5-unit lines). Only at 78px, as two short rows; dropped at 54px |
| Chest | §8.2 | | |
| Belt | one full row, y 8–9, the film's chunky pouches [33] [42]; the gaps between pouches 0.5 unit | `--belt` `#ecb038`, 4.71:1 on S-A (8.77:1 on S-B); gaps `--buckle` `#a8761c` | Yes, the brightest thing on him. The gaps are under the floor at 54px (a solid yellow band) and show at 78px |
| Gloves, arms | Clawd's arms in `--gloves`. **No C-clamp hands** (§3.2) | `--cowl` | Yes |
| Legs, boots | suit to the knee, boots in `--cowl` | | Yes |
| Cape | from the shoulders, a **stiff bell to the floor** [11], hem cut straight, or three shallow scallops [30] | `--cape` with the neutral rim | Yes, by the rim. The bell is wider at the hem than any shipped hanging cape. Decide on screen between straight and scalloped (scallops are PALE MOONLIGHT's) |

### 8.2 The chest: the yellow oval, and the open question

**Read from the frames:** the film's suit has a **yellow oval with a black rim and a black bat**, on a black torso with printed grey abs [33] (1080p), [42] [14] [11] [41]. *LEGO Batman 2* uses the same oval on a black suit [51]. *LEGO Batman: The Videogame* [50] and *LEGO Batman 3* [53] use a bare black bat on a grey suit; *Legacy of the Dark Knight* an armoured blue-grey suit [55] [58].

**So this Theme joins the open yellow-oval question.** Four claimants now: PALE MOONLIGHT's brass plate (dark at rest, `#7a5420`, lit gold when alarmed), TAS's C1 (`#c9a53c`, black rim), West's oval (`#d4a845`, no rim) and this one (`#e5af37`, black rim). Measured: ours is **6.0 from TAS's C1** and **3.9 from West's**; 34.5 from PALE MOONLIGHT's unlit brass. The belt is 10.2 from TAS's and 7.5 from West's.

| Option | Chest | Source | Cost |
|---|---|---|---|
| **C1 (faithful)** | the yellow oval, black rim (half a unit, at the floor), black bat inside, at rest, never lit | [33] [42] [51] | One of up to three bright ovals in the picker. Same rim as TAS's C1 (6.0 apart): only the suit's hue (neutral against TAS's blue-grey, 14.2 apart) tells them apart at 54px |
| C2 (the games') | no oval; a black bat 6 units wide on S-A's grey | [50] [53] | A black bat on a grey suit is ANCIENT GRACE's and BECOME A BAT's. Loses the film's best-known detail |
| C3 (the jury's) | C1, and the jury decides who keeps a bright oval (West's J1 asks TAS to dim; this Theme would ask the same) | | Depends on the jury |

We recommend C1 and put it to the jury as asked: we do not pick around the oval. If the jury gives the bright oval to fewer Themes, VERY DARK GREY's case is the strongest frame of the four (a 1080p chest close-up, the same oval in a game), but TAS and West have equal claims to their own sources.

### 8.3 Poses

| Mood | Pose | Source | Grid notes |
|---|---|---|---|
| sleeping | Wrapped in the cape, seated (as every Theme) | | The hem is the bell's straight edge |
| flying | **The grapnel swing** [14]: one arm up holding a line to the frame's top, knees tucked, the cape trailing at a slant | [14] | The line is 1 unit wide. Cost: the games' fallback Signature is a grapnel (FREEFLOW); a flying pose is not a Signature, but say so. Alternative: **the run** from the end card [22] (West's flying is the opening run) |
| alarmed | **The hero pose**: fists on hips (elbows out at the waist), chest out, the cape flared stiff, the aura in magenta | [11] [41] | Elbows at the waist, not by the head (West's loops) or raised (VENGEANCE's flare) |
| perch | the Signature | | |

### 8.4 The Signature pose: L1, dinner for one (refs [46] [60], [28])

The outline board renders the seven shipped held steps from `suits.ts`, SERIOUS HOUSE's closed-cape rest (its branch), PALE MOONLIGHT's giant bat and VENGEANCE's raised flare, the shared sleeping pose, West's Batusi W1, TAS's landing, HOLIDAY's long cape and the games' gargoyle, beside three Lego drafts, at 54px and 3x: `boards-lego/outlines.png` (`tools-lego/outlines.ts`, bundled with esbuild).

**L1, dinner for one (recommended).** The held step:
- Bat-Clawd seated, so his cowl sits 1.5 units lower (y 1.5–6.5); his shoulders show above the table.
- A long low table across him, wider than he is: top x −3.4 to 19.4, y 7.5–8.7; two legs 0.8 wide to the floor at x −2.8 and 18.
- A cloche on the table at his left, x 12.6–18.2, y 4.4–7.5, with a 0.8-unit knob. (The film's microwaved lobster [60] sits on a plate; the cloche is our shape for "dinner" at 54px.)
- Inside the viewBox (x −6 to 22); no change to it.
- **Reveal**, four steps on the 8 fps clock: (1) he sits (the seated pose); (2) the table snaps in under his hands, one step (a piece clicking into place); (3) the cloche lands; (4) held, his eyes down toward the cloche (`lookY` 0.6).
- **Watch beat**, once a cycle: the cloche lifts a unit and settles, two steps.
- **Click caption** (once a session): "Lobster. Again." (P)

**Outline at 54px:** a head and shoulders over **a horizontal bar 22.8 units wide**, with a dome on one side. Against the eleven:
- **Out of the dark, Sonar**: plain blocks; nothing reaches past x −1 or 17 at mid-height. L1's bar does, both sides.
- **Under the Signal** (an oval over his shoulder) and **the swarm** (bats above): the extra shape is above; L1's is a bar at mid-height, and a dome on it.
- **The Knightmare**, **the lightning leap**, **HOLIDAY's long cape**: one-sided wedges or triangles; L1 is a bar, flat on top, open below (two thin legs).
- **The stand** (BLUE COLLAR): cape points at mid-body; L1's bar is straight and twice as wide.
- **SERIOUS HOUSE's rest**: a closed bell; L1 has no cape outline at all.
- **TAS's landing**, **the gargoyle**: low crouches whose cape or knees widen near the floor; L1 is wide at the table's height and open under it.
- **West's Batusi**: arm loops beside the head; L1 has nothing beside the head.

**L2, at the console** [08] [11] [33]: standing behind the Batcomputer desk, three round buttons and the big one at his right. At 54px it reads as a block (close to Out of the dark and Sonar): second choice. **L3, the build** [23] [41]: the stand with the cape in a stiff bell and a 2x2 brick held out at his waist. It reads as a bell with a knob (close to SERIOUS HOUSE's rest and TAS's landing), and it is the one place we'd draw a brick as an object (§3.2): third, and dropped if not chosen.

**Costs.** Seated, Bat-Clawd is 1.5 units shorter; the table hides his belt and his legs, so in the perch his identifying pieces are the cowl, the eyes, the jaw and the shoulders. The Signature is sad on purpose: the film's ego with its other side. Decide on screen at 54, 60 and 78px whether a man eating alone on the perch for hours reads as a joke or as a downer.

## 9. Emblem and the disc

**The bat** (chest and masthead), drawn by us after [33] [42] [14]: the film's chest bat inside its oval, a wide classic bat with short ears, wing tops curving up, three scallops under each wing, about 2.2:1 (read, not measured). Close to `BAT_1989` in kind; traced from [33] before the build (§14). Not the film's logo bat built of studs [19], which is Warner's. **On the chest** it sits in the yellow oval (C1), filling about 75% of its width, the oval rimmed in `--chest` half a unit wide. It never lights.

**Masthead:** the bat in the title cards' yellow on the dark ground (E1, the logo card's colours inverted), or inside the yellow oval (E2). Decide on screen.

**The 64px disc** (`boards-lego/pieces.png`):
- **Unlit, D1: a printed round tile.** Dark grey plastic, smooth, the bat printed in `--disc-bat`; a 1px lit edge on its top (the tile's shine). Variables only.
- **Unlit, D2: four studs on the rim**, at north, east, south and west, around the printed bat: a round plate seen from above. Needs the `--disc-texture` layer (§11 (b)). Blank studs, never a word.
- **Lit:** a translucent piece lit from behind: radial `--lens-core` `#ffd7f0` → `--signal-hot` → `--signal`, a moulded inner rim (`--lens-shade`), the bat in `--cowl`. Translucent pieces glow from inside, as the Batcave's neon does [33] [39]. Not flat (BLUE COLLAR), not hard stops (BECOME A BAT), not a burst (West), not a skyline (TAS).
- The disc stays round: it is the hit target and the shape every Theme shares.

Tray and toast icons stay the default emblem (jury Wave 1 §2).

## 10. Atmosphere

**A2, a sheen over the studs (recommended).** The panel's ground is the baseplate (§11 (b)), still. Every 30 seconds or so a soft diagonal band of light (`--sheen`, Bone at 6%) crosses it from the top left in about four seconds, as a light passes over plastic, and then nothing moves. The cards cover most of the ground, so the sheen shows in the gaps, the header and an empty panel. Source: the title cards' studs lit at a slant with a falloff [09] [16] [43] (read), and every Batcave frame's highlights rolling over pieces as the camera moves [34] [40].
- **Engine ask:** an option on the `noise` painter's band: no marks (`density: 0`), the band at an angle, and a pause between passes (`every`, in seconds). Or a small new kind; the band is the same code.
- **CPU:** idle 26 seconds in 30; four seconds of one band. Under VENGEANCE's rain, which moves every drop every tick.
- **Against the neighbours:** ANCIENT GRACE's roll band is the nearest: a band moving over the panel. Theirs rolls down forever, with static specks, on a TV; ours crosses diagonally once every half-minute over still studs, with no specks. Decide on screen whether it reads as a TV roll; if it does, A1.

**A1, pieces falling.** Small flat pieces (1x1 and 1x2 plates seen face-on, each with a stud's highlight) fall slowly in the greys, now and then one in yellow. The film's Gotham breaks into pieces in its last act [18]. An option on the `snow` painter: a `shape: 'piece'` that draws a square with a highlight dot instead of a round flake. Cost: it is PALE MOONLIGHT's motion (falling flakes), told apart by shape and colour only; the Atmosphere axis may score "~" against it.

**A3, the Batcave consoles.** A still row of round lit buttons along the bottom [07] [33], one changing every so often. Cost: WATCHFUL PROTECTOR's lit windows in costume, and West's rejected A2. Listed, not proposed.

**Rejected:** the brick-built skyline [18] [25] (TAS's skyline), searchlights (TAS, the games), rain or snow as such.

## 11. The whole app as pieces: engine asks

What changes, concretely, from the outside in (`boards-lego/pieces.png` shows P1, P2 and P0 side by side, with the disc):

- **The window is a baseplate.** `--abyss` with the stud texture: plain round studs on an 8px pitch, 4.8px across (the brick's own 8 mm pitch and 4.8 mm stud, scaled), lit from the top left [09] [16] [23] [43].
- **Cards, notices, the watch strip and sheets are smooth tiles laid on it.** No studs under text: a tile in the film is the smooth piece (the lit floor tiles [40]). Each has 1px corners (`--radius`), a lit top edge and a 2px dark side below (`--tile-edge`).
- **The wordmark is a title card:** Russo One in the cards' yellow with a 2px hard extrude [16] [43].
- **The disc is a round piece:** a printed round tile unlit, a translucent piece lit (§9).
- **Bat-Clawd wears pieces:** a moulded cowl with a shine, a stiff cloth cape, a chunky pouch belt, a printed chest (§8). His body stays his.
- **The Night Report is building instructions** (d below).
- **Stamps sit square** (no tilt), with 1px corners: pieces sit on the grid.

P2 (studs under the text too) is shown to rule it out. P0 is the same palette with none of this: the recolour SERIOUS HOUSE was stopped for.

| Ask | What | Engine PR or Theme PR | CPU |
|---|---|---|---|
| **(a) Variables only** | The token map (§4.5); Russo One, Changa One, Rubik with their licences; the Lexicon and Voice in `words.ts`; D1 disc; stamp tilt 0 | Theme PR | None: colours and faces |
| **(b1) Brick corners** | `--radius` moves from `:root` in `styles/theme.css` into every Theme's variable list (4px for the eight others, 1px here). `themes.test.ts` then requires every Theme to set it | Engine PR (one line out of `theme.css`, one line into each Theme) | None |
| **(b2) Stud overlay** | `--studs` and `--studs-size`: a background image on the panel's fixed back layer (where the Atmosphere sits) and on the disc's window, `none` for every other Theme. Not on the scrolling list, so scrolling never repaints it | Engine PR | One paint when the window is drawn or resized; nothing at rest. On the transparent signal window, the texture is inside the 64px disc only |
| **(b3) Plastic edge** | `--tile-edge`: a box-shadow on `.card`, `.notice`, the watch strip and the sheets; `none` elsewhere | Engine PR | Static. The urgent card's breathing glow is unchanged (its own layer) |
| **(b4) Wordmark extrude** | `--wordmark-extrude`: a full `text-shadow` on `.header__title` and the intro's wordmark; today `--wordmark-glow` takes a colour only | Engine PR | Static |
| **(b5) Disc texture** | `--disc-texture`: a background layer on `.disc__face` for D2's rim studs; `none` elsewhere | Engine PR (only if D2 wins) | Static |
| **(c) Suit pieces** | The cowl shine (the map's `h` cells, present), the oval with a rim (PALE MOONLIGHT's `chestOval`), the belt's pouch gaps (rects), the seated pose and the table and cloche of L1 (paths), the grapnel line (a path): all existing layer kinds. One ask: **an emblem plate that never lights** (PALE MOONLIGHT's lights when alarmed); TAS and West asked for the same | Theme PR for the suit; the never-lit plate in the shared engine PR | None at rest: Bat-Clawd is a flip-book of finished poses, the Signature on the 8 fps clock as everyone's |
| **(d) Building-instructions report** | A step number before each line in the margin (a CSS counter on `.report__lines li`, 20px Rubik in `--accent`, shown when `--step-display` isn't `none`); the stamp stays under it, so the margin rooms don't change. The dateline reads `STEP 1 · 21:40`; the case notes are "Parts list". The reference is the Batcomputer's schematics [36] [37] and the cards' "TO BUILD A HERO" [17], not the LEGO Group's booklets, whose look we don't copy (§3.2) | Engine PR (a report variant, as BECOME A BAT's caption boxes were) | Static |
| **(e) Atmosphere** | A2: `noise` with no marks, an angled band and a pause; or A1: `snow` with a piece shape | Engine PR | A2: 4 s of one band in 30 s. A1: as PALE MOONLIGHT's snow. Both under VENGEANCE's rain; measured on the real windows before merge |

**The CPU rule** (no Theme above VENGEANCE's CPU) is met by design: everything but the Atmosphere is static paint. Measure P1 on the real windows (README's method) before the Theme PR merges, with the Atmosphere on and off.

## 12. Distinctiveness

Scored by the jury's rules ([`jury-wave-2.md`](jury-wave-2.md) §1): C = clearly different, ~ = close, = = same; at least 3 C against every Theme. G1, alarm M, Russo One / Changa One, suit S-A with chest C1, L1, A2.

| Against | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| VENGEANCE | C: grey vs black (10.9 / 17.4); magenta vs red (35.9); Bone vs amber (31.8) | C | C: a stiff bell vs a zigzag; an oval vs a dash | C: a sheen over still studs vs rain | ~ to C: both Batman in the first person; a vain performance vs a bleak journal | **4–5** |
| PALE MOONLIGHT | C (11.1 / 15.1; 59.1; 20.4) | C | ~: same ears; straight bell vs scallops; **two ovals** (theirs dark brass at rest, ours bright yellow) | C: a sheen vs snow | C: an ego vs a newsroom | **4** |
| WATCHFUL PROTECTOR | C: ground 8.7 / 9.7 (narrow); magenta vs blue (36.9); Bone vs mercury (23.1) | C | C: a bell vs a straight hem; an oval vs a relief | C: a moving sheen vs a still skyline | C: an ego vs an ops briefing | **5** |
| KNIGHTMARE | C | C | C: cape vs duster | C | C | **5** |
| BECOME A BAT | C | C | C: oval vs black bat, black cowl vs light suit | C: sheen vs smoke | C | **5** |
| ANCIENT GRACE | C (13.0 / 14.6; 60.4); both Bone | C: sport capitals vs comic SFX | C: oval vs wide bat; standard vs wide-set ears | **~: both a band crossing the panel** | C: the film's news anchor is not used | **4** |
| BLUE COLLAR | C (12.7 / 15.6; 72.6; 20.8) | ~: heavy capitals, Bungee's blocky register | C | C | C | **4** |
| SERIOUS HOUSE (paused) | C (10.4 / 11.0; 30.2; 30.4) | C | C: standard vs tall ears; oval vs none | C | C | **5** |
| TAS (DARK DECO) | C: ground 8.8 / 7.0 (the weakest pair, §4.2); magenta vs red sky (38.6); Bone vs blue-white (13.9) | C | ~ under C1: same ears, a bell vs three scallops, **the same rimmed oval** (6.0); C under C2 or if the jury dims one | C: studs and a sheen vs a skyline and a blimp | C: a brag vs silent title cards | **4** |
| HOLIDAY | C | C | C: long ears, no oval | C | C | **5** |
| FREEFLOW | C (15.7 / 21.1; 56.8) | ~: two squared display faces (Russo One vs Oxanium) | C: cloth cape and oval vs armour and a wide bat (but the suit greys are 3.6 apart) | C: sheen vs rain | C: an ego vs an objective log | **4** |
| SAME BAT-TIME | C (12.9 / 15.2; 16.9; both Bone) | ~: heavy rounded stamp capitals (Changa One vs Luckiest Guy) | ~: same ears; a bell vs three points; ovals with and without a rim (3.9) | C: a sheen vs clouds | C: self-aware ego vs sincere narrator (the line in §6) | **3** |

**Result:** every pair passes. The tightest is SAME BAT-TIME at 3: both comic, both with a yellow oval and a yellow belt. What would lift it: the jury's oval decision (C2 or a dimmed oval lifts Silhouette), and T2 (Changa One everywhere) does not help against Luckiest Guy. The ground is the Theme's weakest palette part (against TAS and WATCHFUL PROTECTOR), and the texture carries it, which is why §11 (b) is not optional for this Theme: without the studs and tiles it is a grey recolour.

## 13. Legal note

§3.2 has the table and the sources. In short:
- **Owners.** The LEGO word, logo, the minifigure and the brick's design are the LEGO Group's; Batman, his symbols, the film and its logo are DC's and Warner Bros.'. The games are TT Games' and Warner Bros. Games'.
- **Credit**, in title-of-work form: "after *The LEGO® Batman Movie* (2017)", with the LEGO Group's own disclaimer in the About text: "LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this site" (Fair Play's wording), and DC/Warner credited as for every Theme.
- **Not used:** the LEGO logo, the film's logo, any frame or still (the folder stays out of the repository), the minifigure's shape (head, torso, C hands, legs), the voice cast, the music, dialogue beyond the short phrase "very, very dark grey", the LEGO Group's instruction booklets' look. No word on a stud.
- **Drawn by us, free:** plain studs as a texture, tiles with square corners, a plastic shine, a translucent lit disc, a table and a cloche, the bat on the chest (credited to DC).
- **Fonts:** Russo One, Changa One, Rubik (OFL-1.1), bundled with their licences. Tilt Warp (OFL) if chosen.

## 14. Unverified items

- **"Very, very dark grey."** Widely attributed to Batman in *The Lego Movie* (2014); not found on Wikiquote's pages for either film and not checked against a transcript. It is the Theme's name, not a quoted line, so nothing ships that depends on it.
- **The Best-Lock appeal** (C-452/15 P, order of 14 April 2016): BAILII titles it a rejection; its text wasn't readable to us (HTTP 403). The 2015 General Court ruling is read from the Court's own press release, not the judgment's full text (EUR-Lex refused automated access).
- **The brick design rulings** (T-515/19, T-537/22) are read through law-firm notes only.
- **Not legal advice.** The table is our reading of the sources for a non-profit fan project, as ADR 0001's line asks.
- **Colour.** No frame is a cinema measurement. The film is lit in coloured light, so the torso's grey (`#2e2f36` in blue light, `#2d2726` in yellow light) is used for lightness, the hue set near neutral. [41]–[48] [60] are 360p.
- **The chest bat's shape and the oval's ratio** are read by eye on [33]; trace before the build.
- **Stamp widths** are Pillow advance widths on the TTF files; `stampWidth.test.ts` reads the WOFF files and decides.
- **The round-1 and round-2 Signatures** on the board (West's W1, TAS's landing, HOLIDAY's long cape, the gargoyle) are drawn from their dossiers' words, not from code.
- **CPU.** The static layers are judged from how the browser paints them; nothing is measured until the engine PR.
- **Everything visual** (the grey ground beside TAS's, the magenta beside the yellow belt, the studs at real size, the wordmark yellow beside PALE MOONLIGHT's gold, the suit S-A or S-B, the oval, dinner for one at 54px, A2 against ANCIENT GRACE's band): decide on screen from labelled boards with the references beside them.

## 15. Sources

- Court of Justice of the EU, [press release 91/10](https://curia.europa.eu/jcms/upload/docs/application/pdf/2010-09/cp100091en.pdf), judgment in C-48/09 P *Lego Juris v OHIM*, 14 September 2010.
- General Court of the EU, [press release 71/15](https://curia.europa.eu/jcms/upload/docs/application/pdf/2015-06/cp150071en.pdf), judgments in T-395/14 and T-396/14 *Best-Lock (Europe) v OHIM – Lego Juris*, 16 June 2015.
- BAILII, [*Best-Lock (Europe) v EUIPO* (Order), C-452/15 P, 14 April 2016](https://mansfield.bailii.org/eu/cases/EUECJ/2016/C45215_CO.html) (title only).
- Fieldfisher, ["Lego A/S v EUIPO – wider protection for modular designs"](https://fieldfisher.com/en/services/intellectual-property/intellectual-property-blog/lego-a-s-v-euipo---wider-protection-for-modular-de); SVW, ["Lego retains its exclusive design right to Lego bricks in the EU"](https://svw.no/en/lego-retains-its-exclusive-design-right-to-lego-bricks-in-the-eu/) (T-515/19, T-537/22).
- The LEGO Group, [Fair Play](https://www.lego.com/en-us/legal/notices-and-policies/fair-play).
- Wikipedia, ["The Lego Batman Movie"](https://en.wikipedia.org/wiki/The_Lego_Batman_Movie): credits, release, studios. Wikiquote, ["The Lego Batman Movie"](https://en.wikiquote.org/wiki/The_Lego_Batman_Movie): the opening narration (read, not quoted).
- Warner Bros., YouTube: "The LEGO Batman Movie – Trailer #4" (2016), "Wayne Manor Teaser Trailer" (2016), "Batcave Teaser Trailer" (2016); Warner Bros. Entertainment, "Batman's Lessons for Robin" (2020); HBO Max Family, "Batman & Alfred Show Robin The Batcave" (2021). URLs and seconds in `INDEX.md`.
- Steam store pages of [*LEGO Batman: The Videogame*](https://store.steampowered.com/app/21000/), [*LEGO Batman 2*](https://store.steampowered.com/app/213330/), [*LEGO Batman 3*](https://store.steampowered.com/app/313690/), [*LEGO Batman: Legacy of the Dark Knight*](https://store.steampowered.com/app/2215200/) (released 22 May 2026); Wikimedia Commons, [*Legacy of the Dark Knight* gameplay](https://commons.wikimedia.org/wiki/File:Legacy_of_the_Dark_Knight_gameplay.png) (CC BY 4.0).
- Fonts: [Russo One](https://github.com/google/fonts/tree/main/ofl/russoone), [Changa One](https://github.com/google/fonts/tree/main/ofl/changaone), [Rubik](https://github.com/google/fonts/tree/main/ofl/rubik), [Tilt Warp](https://github.com/google/fonts/tree/main/ofl/tiltwarp), and the measured rejects (Paytone One, Fredoka, Bagel Fat One, Titan One, Passion One, Squada One, Rubik Mono One, Dela Gothic One, Sniglet), all OFL-1.1.
- In this repo: [`wave-3-brief.md`](wave-3-brief.md), [`claims-wave-3.md`](claims-wave-3.md), [`wave-2-brief.md`](wave-2-brief.md), [`jury-wave-2.md`](jury-wave-2.md), [`adam-west.md`](adam-west.md), [`animated-series.md`](animated-series.md), [`long-halloween.md`](long-halloween.md), [`arkham-games.md`](arkham-games.md), [`burton-1989.md`](burton-1989.md), [`dkr-rework.md`](dkr-rework.md); `app/src/renderer/src/styles/theme.css`, `styles/themes/*.css`, `App.css`, `components/Cards.css`, `Signal.css`, `NightReport.css`; `app/src/shared/suits.ts`, `outfits.ts`, `atmospheres.ts`, `emblems.ts`, `words.ts`; `app/test/stampWidth.test.ts`; `DESIGN.md`, `CONTEXT.md`, `PRODUCT.md`, ADR 0001; SERIOUS HOUSE's stylesheet and `suits.ts` on `origin/feat/123-serious-house`.
- Scratch tools (not in the repo), in `tools-lego/`: `sample.py`, `crops.py` (colour), `pal.py`, `others.py`, `grounds.py`, `sweep.py`, `palette.py` (ΔE00, contrast), `stampfit.py`, `typeboard.py`, `outlines.ts`, `tile.py`, `sheet.py`, `index.py`. Boards in `boards-lego/`: `outlines.png`, `pieces.png`, `type.png`, `crops1.png`, `refs-contact.jpg`.

No images are included in this note. The frames and stills reproduce copyrighted work, so they stay in the scratch folder outside the repository.

## Claims
- Display name: VERY DARK GREY (alternatives BLACK AND YELLOW, NINE-PACK); credit "The LEGO® Batman Movie (2017)"
- Ground (abyss / surface / raised), with L* C* h of surface: the suit's grey #24252a / #2e2f36 / #3b3d45; surface L* 19.6 C* 4.8 h 286, the lightest ground in the app (8.8 / 7.0 from TAS's black paper, 8.7 / 9.7 from WATCHFUL PROTECTOR, 10.9 from VENGEANCE's surface and 9.6 from its #000000: texture, not hue, separates them)
- Alarm (signal / signal-hot): M, the Batcave's neon magenta #b8267d / #fe79d0 (31.8 from Clawd; crosses round 3's "no pinks" line: 11.5 from BLUE COLLAR's waiting mauve, 16.9 from West's violet, 19+ from every other alarm); R (Batcomputer red #fe857c, 8.1 from Clawd) and Y (the cards' yellow #f2c21c, 3.7 from PALE MOONLIGHT's gold) costed, not proposed
- Waiting ink (ink-soft) / working ink (ink-live): screen ice #88eef6 (9.1 from ANCIENT GRACE's alarm, 10.0 from WATCHFUL PROTECTOR's mercury) / Bone #eceef2; the cards' yellow #f2c21c as the accent (wordmark) at rest, not the alarm
- Display / stamp / report faces: Russo One / Changa One 11px (alternative Tilt Warp) / Rubik; Rubik 800 for headlines and the dateline
- Suit in one line: black moulded cowl #141519 with a plastic shine, standard ears, white eyes and orange jaw (the film's lenses and jaw), grey torso #454852 (S-A; or black, S-B), printed abs at 78px only, a chunky yellow pouch belt #ecb038, a stiff black cloth cape in a bell to the floor; no minifigure body, head or C hands
- Chest emblem and disc in one line: the film's yellow oval #e5af37 with a black rim and black bat, never lit (C1, joins the open yellow-oval question: 6.0 from TAS's C1, 3.9 from West's; C2 the games' bare black bat as the alternative); disc unlit as a printed round tile (or four rim studs), lit as a translucent magenta piece
- Signature in one line, and its outline at 54px: L1 dinner for one, seated alone at a long low table with a cloche (reveal: sits, the table snaps in, the cloche lands, eyes down); a head and shoulders over a horizontal bar 22.8 units wide with a dome at one side, open below
- Atmosphere (kind, and what moves): A2, `noise` with no marks and an angled band: a sheen crosses the still studded baseplate once every ~30 s; A1 (`snow` with a piece shape: pieces falling) the alternative
- Voice in one line, and the Lexicon's seven words: Batman narrating his own app, vain and self-aware, lonely underneath (West's sincere camp is the line it starts from); Case · NEED A HERO · AUTOGRAPH? · EPIC FAIL · HELLO? · FAN MAIL · Stalled
- Engine asks: `--radius` per Theme (brick corners); a static stud texture (`--studs`, `--studs-size`) on the back layer and the disc; `--tile-edge` (plastic edge on tiles); `--wordmark-extrude` (a full text-shadow); `--disc-texture` (if D2); an emblem plate that never lights (shared with TAS and West); a building-instructions report variant (`--step-display`, step numbers in the margin); the `noise` band at an angle with a pause (or `snow` with a piece shape); fonts Russo One, Changa One, Rubik; no viewBox change
