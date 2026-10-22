# Wave 3 brief: the classics

Research brief, 2026-10-22. Scope: what every Wave 3 dossier starts from. Wave 3 is five works: *Batman: The Animated Series* (Bruce Timm and Eric Radomski, 1992, the original series only), *Batman: The Long Halloween* (Jeph Loeb and Tim Sale, colours by Gregory Wright, 1996–97), the Arkham games (Rocksteady, *Arkham Asylum* 2009, *Arkham City* 2011, *Arkham Knight* 2015, taken as one trilogy), *Batman* (the 1966 television series with Adam West) and *The Lego Batman Movie* (Chris McKay, 2017, with the Lego Batman games as a second source). Issue #143, Linear LUC-85. It ships as v1.4.0.

This brief follows [`wave-2-brief.md`](wave-2-brief.md). Its §2 (the rules every dossier must meet) and §6 (what a dossier contains) still hold; read them there. This file gives what changed: seven shipped Themes instead of four, the paused one, the maintainer's answers at the opening, and a new way of working.

## 1. What Wave 2 taught us

- **A dossier's prose is not the work.** ANCIENT GRACE shipped from its dossier and the maintainer sent it back: the chest emblem, Bat-Clawd's anatomy, the Signature pose and the colour did not look like the comic ([`dkr-rework.md`](dkr-rework.md)). SERIOUS HOUSE's first boards were stopped for the same reason, and the Theme is now paused ([`arkham-horror-references.md`](#4-the-paused-theme-serious-house) on its branch). BLUE COLLAR's stand went back four times over the cape's drape until it matched the #1 cover at 1:1.
- **So Wave 3 works references first** (maintainer, 2026-10-22). Before a dossier proposes a colour, a suit or a pose, it gathers images of the work itself and lists them (§6). Every palette hex names the frame, page or game capture it was sampled from. The emblem, suit and Signature sections each cite the references they follow.
- **Parallel dossiers converge.** Year One was the only Wave 2 dossier that read the others as they appeared, and it avoided all of them but one. Wave 3 keeps one claims table, [`claims-wave-3.md`](claims-wave-3.md), and writes in three rounds (§7).
- **The jury's numbers are not the maintainer's eye.** Every visual choice is still decided on screen, from labelled boards with the source references beside the options. A dossier proposes two or three real options where it is unsure; it does not need to be final.
- **Some Themes change the whole app.** SERIOUS HOUSE needed horror, not a recolour. Lego Batman is the same scale (§3). Name every engine ask, since each becomes an engine PR before the Theme PR.

## 2. The maintainer's answers at the opening (LUC-85, 2026-10-22)

1. **The Arkham games are the whole trilogy.** The dossier picks what defines the series across Asylum, City and Knight, not one game.
2. **The Animated Series is the 1992 series only.** *The New Batman Adventures* (1997) redesign is out. The yellow oval goes to the jury (§5).
3. **Lego Batman turns the whole app into pieces**: plastic, studs, brick corners on the panel and the disc, Bat-Clawd as a minifigure. It is the wave's biggest engine change.
4. **References first**, one claims table, and the three rounds of §7.

From LUC-85 and the theme issues, already decided: **Adam West stays dark** (a night navy like the animated opening of the series; the comedy lives in the Voice and in "POW!" and "BAM!" balloons; the Batusi as the Signature; no exception to the dark rule). Lego Batman's working name is **VERY DARK GREY** (LUC-96). The Animated Series has the red sky and the Art Deco painted on black paper (LUC-86). The Long Halloween has Tim Sale's hard contrast, the holidays and the long ears (LUC-87).

## 3. The seven shipped Themes, as built

Read the full tables in `app/src/renderer/src/styles/themes/<id>.css`; [`wave-2-brief.md`](wave-2-brief.md) §3 gives the first four in detail. The key values, read from `main` at v1.3.0:

| | ground: abyss / surface / raised | Alarm: signal / signal-hot | waiting ink (ink-soft) | working ink (ink-live) | display / stamp / report |
|---|---|---|---|---|---|
| VENGEANCE | #000000 / #13100e / #27150e | #af0006 / #e3121b | #d4574c | #e8a33d amber | Anton / Special Elite / Special Elite |
| PALE MOONLIGHT | #0d0906 / #1a1510 / #2b2116 | #d29336 / #f0c24b gold | #c98a3e | #8fb0d3 steel | Limelight / Josefin Sans / Special Elite |
| WATCHFUL PROTECTOR | #04070b / #0f161e / #18232e | #2f7fe0 / #3d8bff Blue Flame | #e9a04b | #7cc6c4 mercury | Syncopate / Big Shoulders Stencil / JetBrains Mono |
| KNIGHTMARE | #100804 / #24130a / #341b0d | #a8102f / #ff405f S-shield crimson | #e1ae66 | bone | Archivo / Archivo / Barlow |
| BECOME A BAT | #0d0e06 / #191b0b / #292c11 olive | #b32c33 / #f2605e trade-paperback red | #e6e08a canary | bone | Permanent Marker / Neucha / Neucha |
| ANCIENT GRACE | #000f12 / #001f27 / #002f39 icy blue | #12a9d6 / #3fdcff Lightning Cyan | #7aadbf storm blue | bone | Bangers / Bangers / Barlow |
| BLUE COLLAR | #0a0812 / #17132a / #221c3c violet | #cbd43c / #ecf05a sound-effect lemon | #d79bbd mauve | #b8b0e0 | Bungee / Bungee / Shantell Sans |

| | Atmosphere | Bat-Clawd's suit | Signature | Lexicon (Case · Needs you · Permission · Error · Waiting · New reply · Stalled) |
|---|---|---|---|---|
| BECOME A BAT | `smoke` rising off the street | grey with a black collar, canary belt, Year One's own bat | The swarm: bats rise up his side and gather over his head | Case · Needs you · Sign here · Gone wrong · See me · Memo · Stalled |
| ANCIENT GRACE | `noise`: static specks and a roll band | the old man, shoulders rising to the jaw, grey second suit with the wide black bat | The lightning leap, front-facing, a white bolt lit blue (a redone leap is #128) | Channel · Your cue · OK to air? · Dead air · You're on · Latest · Frozen |
| BLUE COLLAR | `ash` with a bat colony crossing under the masthead | teal working suit, black spiked shoulder pads, striped forearms, chest block that is an axe, olive belt, black trunks | The stand: the cape pulled across him in an X, nothing behind | Case · Needs you · Permit? · Blown · Asking · New reply · Jammed |

The first four are in [`wave-2-brief.md`](wave-2-brief.md) §3: rain (VENGEANCE), snow (PALE MOONLIGHT), lit windows (WATCHFUL PROTECTOR), ash (KNIGHTMARE); Out of the dark, Under the Signal, Sonar, the Knightmare.

**Taken display and stamp families** (unique to each Theme): Anton, Special Elite, Limelight, Josefin Sans, Syncopate, Big Shoulders Stencil, Archivo, Permanent Marker, Neucha, Bangers, Bungee, Shantell Sans. Barlow Semi Condensed is everyone's body and JetBrains Mono everyone's mono. Bangers ("POW!") is ANCIENT GRACE's and Bungee (blocky) is BLUE COLLAR's, so Adam West and Lego Batman need other faces. The jury left Luckiest Guy free for West ([`jury-wave-2.md`](jury-wave-2.md) §8).

**What the engine has now:** Atmosphere kinds `rain`, `snow`, `lit-windows`, `ash` (with `still: 'calm'` and a `bats` option), `smoke` and `noise` (specks counted in whole ticks, an optional roll band); suit layers including `cape` (clipped rim), coat, goggles, scarf, belt, gloves, an emblem plate, a chest emblem with `height`, shoulder pads and per-pose arms; per-pose eyes and look; Signature reveals on the 8 fps clock and a perch watch (`watchOn`); `flyingBat`, `flock()` and `batOutline()` in `shared/bats.ts`; per-Theme lens recipes (`--disc-lens`, `--lens-breaks`, `--lens-bat-edge`, `--lens-shade`); stamp shape per Theme (tilt, border, size, weight, wear mask); caption-box report headings (`--caption-paper/-ink/-rule`), `--font-headline`, `--font-dateline`, `--bolt-glow` (ANCIENT GRACE only). Read `app/src/shared/suits.ts`, `outfits.ts`, `atmospheres.ts`, `bats.ts`, `emblems.ts` and `words.ts` before proposing anything new. There is **no armour** in the engine any more: ANCIENT GRACE's alarmed armour was removed in #130, so an armoured suit is open.

## 4. The paused Theme: SERIOUS HOUSE

SERIOUS HOUSE (*Arkham Asylum*, Morrison and McKean, 1989, #123) is paused by the maintainer, not dropped. Its engine PRs were reverted from `main` in #141 and its work is kept on `feat/123-serious-house`. **Its picks stay claimed** and are listed in [`claims-wave-3.md`](claims-wave-3.md).

[`arkham-asylum.md`](arkham-asylum.md) on `main` (plum, claret, IM Fell, a watchman's Voice) is **void**: the maintainer rejected it on screen. The record is `arkham-horror-references.md`, on the branch only (`git show origin/feat/123-serious-house:docs/research/themes/arkham-horror-references.md`). Its findings that matter here:

- The book is **blue-black**, not plum. Its alarm, the Joker's scarlet, sits on VENGEANCE's red.
- **Green is the book's second colour** (the Joker's hair, the ivy, Clayface). The note asked to reopen the Wave 1 reservation of "asylum green" for the games. The branch uses a green working ink (`#86d66a`) and a journal-ochre waiting ink (`#dccd9c`).
- Batman is a silhouette with needle ears and a hooked cape, with no chest emblem. The Theme's emblem is the book's own pencil Bat-Signal.
- Horror comes from McKean's method: tall strips split by hairline rules, scratches, spatter, hand lettering per voice (Covered By Your Grace and Kalam on the branch).

**This makes the Arkham games dossier the riskiest one.** Both works are the asylum, the Joker and green. The games must find what is theirs and not the book's: Rocksteady's armoured suit, the open-world Gotham of City and Knight, the detective-mode look (but the teal of it is WATCHFUL PROTECTOR's), the game HUD, the gadgets, the Batmobile, rain on Knight's neon. Say where green goes. Both Themes may want it, and the maintainer decides.

## 5. Who claims what in Wave 3

Each dossier starts from its own territory. It may argue for crossing a line, but must say so and name the Theme it would run into.

| Theme | Its territory | Leave to the others |
|---|---|---|
| *The Animated Series* | Painted backgrounds on black paper; the red sky; Art Deco Gotham, zeppelins, film-noir lighting; Timm's angular grey-and-blue suit; Shirley Walker's orchestral title card; the show's title cards | TV broadcast and static (ANCIENT GRACE); the gold oval as an alarm (PALE MOONLIGHT); "flat" lit disc (BLUE COLLAR's lemon field) |
| *The Long Halloween* | Tim Sale's solid blacks and hard white; the holidays as named days; the Roman and the mob; the long ears and the huge cape; Gregory Wright's colour | Gordon, the canary, the olive grime, the dated dateline and newsprint magenta (BECOME A BAT); comic SFX lettering (ANCIENT GRACE) |
| *The Arkham games* | The armoured suit across three games; the game HUD and its menus; gadgets and the grapnel; City's prison walls and snow; Knight's rain and neon; the Batmobile; the Arkham *franchise* | the book's horror, strips, scratches and hand lettering (SERIOUS HOUSE); the teal detective-mode tint and the sonar ring (WATCHFUL PROTECTOR) |
| *Adam West* (round 2) | The 1966 serial: the narrator, "Meanwhile…", "same Bat-time, same Bat-channel"; the "POW!" balloons; the Batusi; the Batcave's labelled gadgets; the night navy of the opening titles | TV *news*, an anchor, "live", static and Channel (ANCIENT GRACE); the yellow oval (PALE MOONLIGHT); Bangers (ANCIENT GRACE) |
| *Lego Batman* (round 3) | The whole app as pieces: studs, plastic shine, brick corners; the minifigure; the ego; "very, very dark grey"; the Batcave of pieces | pure black (VENGEANCE); Bungee and blocky sign lettering (BLUE COLLAR); comedy that is West's (round 2 decides the line) |

## 6. Known risks and what each dossier must answer

- **The Animated Series' chest.** The gold oval is PALE MOONLIGHT's, and a black bat on a grey suit without one is ANCIENT GRACE's and BECOME A BAT's. Wave 1 barred the oval only as an *alarm*. Bring both: the oval unlit at rest, and no oval, each with frames from the series. It is a TV series, but the broadcast Voice is ANCIENT GRACE's. Red skies are open as light.
- **The Long Halloween against BECOME A BAT.** Both are early-years crime stories with Gordon in them. BECOME A BAT took Gordon's notebook, the canary, the olive and the dated dateline. Long Halloween keeps the holidays as named days (a calendar, not a date), Sale's blacks, the Roman. A pumpkin orange must be checked against Clawd's `#d77757`.
- **The Arkham games against SERIOUS HOUSE** (§4) and against WATCHFUL PROTECTOR's plated black suit and blue. A saturated asylum green needs C* 15 or more on the raised tone to stand off ANCIENT GRACE (h ~166) and BECOME A BAT (h ~110) ([`jury-wave-2.md`](jury-wave-2.md) §8). Its credit, "Batman: Arkham …", will sit beside SERIOUS HOUSE's in the picker, so the credits must tell a game from a book.
- **Adam West's "POW!".** LUC-89 wants POW! and BAM! stamps in balloons. Jury §5 says a stamp word must give the standard meaning at a glance, and `stampWidth.test.ts` measures it. Say whether POW! is a Lexicon word or a balloon *beside* a clear word. The Theme stays dark navy, no exception. The pinks are taken (BECOME A BAT's alarm, BLUE COLLAR's waiting mauve), the yellow belt is BECOME A BAT's.
- **Lego Batman, the pieces, the Costume Rule and the law.** Bat-Clawd keeps his body (DESIGN.md, Costume Rule): "a minifigure" means the cowl, cape, belt and hands as pieces over his body, not a new body. LEGO is the LEGO Group's and DC's; the minifigure shape is a registered three-dimensional trademark in several places, and the brick itself is not. Studs as a texture are one thing, a minifigure likeness another. The legal note must be concrete before any engine work: what "becomes a piece" can and can't be. List every engine ask (a stud overlay, brick corners on the panel and the disc, plastic shine, anything else). Pure black is VENGEANCE's; three suits are grey.
- **Adam West against Lego Batman.** Both are comic. West is 1960s pop camp, played straight; Lego is modern self-parody with a huge ego. Round 3 reads round 2 and draws the line.
- **Any Theme against PALE MOONLIGHT's gold** (no yellow oval as an alarm) and against the taken alarms: red (VENGEANCE), gold, Blue Flame, crimson, trade-paperback red, Lightning Cyan, lemon. ΔE00 from every one of them.

## 7. How the dossiers are written

**Three rounds.** Round 1: *The Animated Series*, *The Long Halloween* and *the Arkham games*, written at the same time from their territories (§5). Their claims are merged into [`claims-wave-3.md`](claims-wave-3.md). Round 2: *Adam West*, which reads round 1. Round 3: *Lego Batman*, which reads both. Then the jury.

**References first.** Each dossier gathers its references before it proposes anything:

- In a new, empty scratch folder of its own, never in the repository. The images are for us and the maintainer's boards; ADR 0001 forbids committing them, tracing them or shipping them.
- With an `INDEX.md` that lists every image: its number, the file name, the URL it came from, the edition or episode or game, what it shows, and which decision it informs (palette sample, emblem, suit, Signature, lettering, Atmosphere, Voice).
- Aim for 25 to 60 images, from the work itself first (frames, pages, covers, in-game captures, title cards), then official art and interviews. Fan art is not a source.
- Sample colour with a script and report how (median, most chromatic, darkest, brightest). Run any Python that reads the downloads with `python -I`, from a script kept outside that folder.
- In the dossier, the emblem, suit and Signature sections each cite two or three entries by number (`[12]`), and every palette hex names its source entry.

**The dossier** follows [`wave-2-brief.md`](wave-2-brief.md) §6, headings 1 to 13, with two changes: a **References** section right after the TL;DR (what the folder holds, and the five images that best say what the work looks like), and a closing **Claims** block in exactly this form, which the merge copies into the table:

```
## Claims
- Display name:
- Ground (abyss / surface / raised), with L* C* h of surface:
- Alarm (signal / signal-hot):
- Waiting ink (ink-soft) / working ink (ink-live):
- Display / stamp / report faces:
- Suit in one line:
- Chest emblem and disc in one line:
- Signature in one line, and its outline at 54px:
- Atmosphere (kind, and what moves):
- Voice in one line, and the Lexicon's seven words:
- Engine asks:
```

Write in plain English: short sentences, no marketing words. Colour distances in ΔE00, computed from hex values, not estimated.
