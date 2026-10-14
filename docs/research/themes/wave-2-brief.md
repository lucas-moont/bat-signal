# Wave 2 brief: the comics

Research brief, 2026-10-14. Scope: what every Wave 2 dossier starts from. Wave 2 is four comics: *The Dark Knight Returns* (Frank Miller, Klaus Janson, Lynn Varley, 1986), *Absolute Batman* (Scott Snyder, Nick Dragotta, Frank Martin, 2024), *Batman: Year One* (Frank Miller, David Mazzucchelli, Richmond Lewis, 1987) and *Arkham Asylum: A Serious House on Serious Earth* (Grant Morrison, Dave McKean, 1989). Issue #118, Linear LUC-79. It ships as v1.3.0.

The Wave 1 jury's last note is the reason this file exists: *every later dossier should be written against the shipped Themes' token tables, not a projection* ([`jury-wave-1.md`](jury-wave-1.md) §9). Snyder's dossier guessed at Nolan, and the two converged. So the tables below are read from the code on `main` at v1.2.0, not from the Wave 1 dossiers. Where they differ, the code wins: KNIGHTMARE shipped from [`knightmare-palette.md`](knightmare-palette.md), not from [`snyder.md`](snyder.md).

## 1. What Wave 1 taught us

From the Wave 1 jury, the Wave 1 builds and the LUC-78 retro:

- **Sample the source, not memory.** KNIGHTMARE's greys came from the dossier and were rejected on screen. A `/research` pass sampling the Knightmare itself fixed it (amber, and the S-shield crimson as the alarm). For a comic this means: **name the edition you sample.** Comics are recoloured. *DKR* has Varley's 1986 colour and later recolours; *Year One* has the 1987 newsprint issues, Richmond Lewis's own 2005 recolour for the deluxe edition, and later printings; *Arkham Asylum* has the 1989 hardcover and the 15th and 25th anniversary editions. Say which one each hex comes from, and prefer the one the artist approved.
- **Decide visual things on screen.** Every visual choice in Wave 1 (capes, chest bats, stamp sizes, the lens) was picked from a labelled comparison image. A dossier proposes; it doesn't need to be final, but it must give two or three real options where it is unsure.
- **Small details vanish.** Bat-Clawd is 54–78px; one grid unit is about 2px. Anything under 1 unit doesn't exist.
- **Two PRs per Theme**, engine then Theme. A dossier should name what the engine has to learn for it (a new Atmosphere kind, a new suit part, a new lens recipe), because that becomes the engine PR.
- **What the engine already has:** Atmosphere kinds `rain`, `snow`, `lit-windows` (a static scene), `ash` (with `still: 'calm'`); suit layers including `cape` (clipped rim), coat/duster, goggles, scarf, belt, gloves, an emblem plate (oval) and a chest emblem; per-pose eyes and look direction; an overlay layer outside the sprite box; Signature reveals as scripts on the 8 fps clock; a perch watch (`watchOn`); per-Theme lens recipe (`--disc-lens`, `--lens-breaks`, `--lens-bat-edge`); stamp shape per Theme (tilt, border, size, weight, wear mask). Read `app/src/shared/suits.ts`, `atmospheres.ts`, `emblems.ts` and `words.ts` before proposing anything new.

## 2. The rules every dossier must meet

From the jury's Wave rules (§4), ADR 0001, `DESIGN.md`, `CONTEXT.md` and the theme tests:

- Every identifying mascot detail is **at least 1 grid unit**. Bat-Clawd keeps his shape, white eyes, orange jaw (`--clawd` `#d77757`) and three Moods; the suit goes over the body (`DESIGN.md`, Bat-Clawd Costume Rule).
- **Display and stamp families are unique to each Theme.** Body, mono and report body may be shared. Taken: Anton (display, VENGEANCE), Special Elite (stamps VENGEANCE; report in VENGEANCE and PALE MOONLIGHT), Limelight and Josefin Sans (PALE MOONLIGHT), Syncopate and Big Shoulders Stencil (WATCHFUL PROTECTOR), Archivo (KNIGHTMARE). Barlow Semi Condensed is everyone's body; JetBrains Mono everyone's mono.
- Fonts must be **OFL or Apache-2.0**, shipped with their licence. Commercial comic-lettering fonts (Comicraft, Blambot's paid faces, the letterers' own hands) are off the table; name an open alternative and say how close it is.
- **Contrast:** every text token at 4.5:1 or better on `--abyss`, `--surface` and `--raised`, and a new Theme ships **with no exceptions** (`themeContrast.test.ts`). `--on-signal` ink is tested on `--signal`.
- **Every shared CSS variable is set by every Theme**, with no `var()` fallbacks (`themes.test.ts`). Copy the full variable list from a shipped Theme's CSS.
- **Stamp words fit** the rendered width of PERMISSION in the Theme's own stamp face (`stampWidth.test.ts`).
- **The Alarm color appears nowhere else** (`CONTEXT.md`). Nothing warm at rest next to the orange mascot unless it is clearly not the alarm.
- ***Dark* and *quiet* mean all clear.** Stalled needs another word.
- **No two Signature poses share an outline at 54px.** Taken: a symmetric front-on stand (VENGEANCE, "Out of the dark"), three-quarter looking up under the Signal (PALE MOONLIGHT), a crouch with a sonar ring (WATCHFUL PROTECTOR), the duster-and-goggles Knightmare (KNIGHTMARE).
- **Display names are unique** and allude to the work, with the year and the work in the credit (jury §10.4): VENGEANCE, PALE MOONLIGHT, WATCHFUL PROTECTOR, KNIGHTMARE.
- **Lexicon words** must give the standard meaning to a tired developer at a glance (jury §5). The Lexicon can be switched off; toasts and the tray always use standard words.
- **Homage, not copy** (ADR 0001): palette, mood, our own drawings. No logos, no traced panels, no character art, no quoted dialogue longer than a short phrase.
- **Corner companion, not a big screen** (`PRODUCT.md`): the Theme dresses a 64px disc, a 320x440 panel and a 54–78px mascot.

## 3. The four shipped Themes, as built

Read the full tables in `app/src/renderer/src/styles/themes/<id>.css`. The key values:

| | VENGEANCE (`the-batman-2022`) | PALE MOONLIGHT (`batman-1989`) | WATCHFUL PROTECTOR (`the-dark-knight-2008`) | KNIGHTMARE (`batman-v-superman-2016`) |
|---|---|---|---|---|
| abyss / surface / raised | #000000 / #13100e / #27150e | #0d0906 / #1a1510 / #2b2116 | #04070b / #0f161e / #18232e | #100804 / #24130a / #341b0d |
| line | #31302f | #3a3127 | #2b3743 | #5a3419 |
| signal / signal-hot (Alarm) | #af0006 / #e3121b | #d29336 / #f0c24b (gold) | #2f7fe0 / #3d8bff (Blue Flame) | #a8102f / #ff405f (S-shield crimson) |
| ink-hot / ink-soft | #ec2a2a / #d4574c | #f0c24b / #c98a3e | #5aa9ff / #e9a04b | #ff5c72 / #e1ae66 |
| ink-live (working) | #e8a33d amber | #8fb0d3 steel | #7cc6c4 mercury | bone |
| ink / bone / ash | #bdb4aa / #e8e1d9 / #8a817a | #c4bdb0 / #e9e4d8 / #948b7f | #bfc8d0 / #e6ebee / #8a99a8 | #e0cfb0 / #f7e8c8 / #a39886 |
| accent | signal red | bone | bone | bone |
| display / stamp / report | Anton / Special Elite / Special Elite | Limelight / Josefin Sans / Special Elite | Syncopate / Big Shoulders Stencil / JetBrains Mono | Archivo 800 / Archivo / Barlow |
| Atmosphere | rain, red glow from below | snow, brown smog | lit windows (static skyline) | ash, haze from above |
| Suit | black, red edge, jagged cape hem | grey suit, gold oval plate, belt, scalloped cape | black plated suit, straight hem, Blue Flame aura | desert duster, goggles, scarf, no cape |
| Signature | "Out of the dark", front-on | "Under the Signal", three-quarter, looking up | "Sonar", crouch + ring | the Knightmare |
| Voice | Bruce's journal, terse, bleak | night-edition newsroom, wry | ops briefing (Fox, Gordon) | weary veteran, Alfred in his ear |
| Lexicon (Case · Needs you · Permission · Error · Waiting · New reply · Stalled) | standard | Story · Your desk · Approval · Trouble · Question · Just in · No word | Op · On you · Clearance · Fault · Your move · Checked in · No contact | Case · Your call · Authorize · Damaged · Orders? · New intel · Stuck |

Claimed by these four, so off-limits as a Theme's main idea: pure black ground with a red alarm and a typewriter (VENGEANCE); a gold or yellow oval as the alarm, "Story", any press or newsroom frame, Art Deco (PALE MOONLIGHT); a night-blue or steel-blue ground, ops words, stencil type, a sonar ring, a teal detective-mode look (WATCHFUL PROTECTOR); falling ash, amber desert, a duster, goggles and scarf (KNIGHTMARE). Lightning flashes are out for everyone: a flash with no news cries wolf.

## 4. Who claims what in Wave 2

Four dossiers are written at the same time. To keep them from reaching for the same thing (Nolan and Snyder did), each starts from its own territory. A dossier may argue for crossing a line, but it must say so and name the Theme it would run into.

| Theme | Its territory | Leave to the others |
|---|---|---|
| *The Dark Knight Returns* | Lynn Varley's painted colour; the TV: talking heads, the 16-panel grid, broadcast, static; the old, huge Batman; the lightning leap and the horse as poses (not as flashes) | flat colour, noir, Gordon (Year One); collage and the asylum (Arkham Asylum); the axe and industrial Gotham (Absolute) |
| *Absolute Batman* | Nick Dragotta's heavy line and Frank Martin's colour; the working-class giant; the axe emblem; the 2024 brutalist Gotham | painted colour (DKR, Arkham Asylum); noir (Year One) |
| *Year One* | Mazzucchelli's line and Richmond Lewis's flat colour; the first year; Gordon's half of the story; the dirty city | TV and broadcast (DKR); journal Voice already used by VENGEANCE (see §5) |
| *Arkham Asylum* | McKean's painted collage, photographs and texture; the asylum as a house; the hand-lettered voices | asylum green as a ground, if the Arkham games (Wave 3) need it (see §5) |

## 5. Known risks for the jury

- **DKR must find a place of its own** (jury §9, LUC-80). It may not use a gold or yellow oval as its alarm, "Story", any print press frame, a night-blue ground, or lightning flashes. The Wave 1 jury also kept the armour, the grey suit and the big chest bat for Snyder, but KNIGHTMARE shipped as the desert resistance without them (`suits.ts` has no armour), so they are open again, and they are DKR's own: Snyder borrowed them from Miller. Say whether DKR takes them back. The maintainer wants DKR because fans love it, so the dossier has to be **creative**, not cut it. Leads: the TV talking heads (a broadcast Voice, not a newspaper one; make the difference concrete: a ticker, a studio, an anchor, a static layer), the 16-panel grid, Varley's watercolours, the lightning leap as the Signature, the old Batman in the rain, the horse.
- **Year One against VENGEANCE.** Both are noir and both could use a journal. VENGEANCE owns Bruce's journal. Gordon's half of Year One is the obvious exit; the dossier should argue it or find another one.
- **Year One against *The Long Halloween*** (Wave 3). Both are early-years crime stories. Say what Year One takes so that Long Halloween can still have its own palette and Voice later (Tim Sale's heavy blacks, holidays, the Roman).
- **Arkham Asylum against the Arkham games** (Wave 3). The Wave 1 jury gave "asylum green" to the games as their way in. Arkham Asylum should not need it; if the dossier finds it does, it must say so, so the maintainer can decide now.
- **Absolute against KNIGHTMARE.** Both are a huge, physical Batman by a Snyder (different Snyders). KNIGHTMARE owns the desert, the duster and the amber; Absolute must not drift there.
- **Any Theme against PALE MOONLIGHT's gold.** Comics love yellow ovals. None of these four should use one.

## 6. What a dossier contains

Follow [`burton-1989.md`](burton-1989.md)'s headings, in this order:

1. **TL;DR**, with a proposed **display name** (an allusion, unique, with the work and year in the credit) and the decisions.
2. **Visual identity and sources**: credits, and the primary sources (creators' interviews, the edition's own afterwords, publisher pages) before fan wikis.
3. **Palette**: the Alarm color and why; a **token map** for every variable a shipped Theme sets (copy the list from a shipped CSS), each with its origin and **the edition it was sampled from**; what `--signal` paints in this Theme; **WCAG contrast** computed for every text token on abyss, surface and raised; **ΔE00** (CIEDE2000) of the alarm, ground and working ink against all four shipped Themes and against Clawd orange `#d77757`.
4. **Type**: display, stamp and report faces, open licence and source (Google Fonts or Fontsource), and how close each is to the comic's lettering or logo.
5. **Voice**: who speaks and in what register, with 8–12 sample lines (none quoting the comic beyond a short phrase).
6. **Lexicon**: the seven terms, each checked for misreadings (jury §5).
7. **Bat-Clawd**: the suit (pieces that survive at 54px, in grid units), the Poses (sleeping, flying, alarmed), the **Signature pose** with its reveal in steps, and why its outline differs from the four taken.
8. **Emblem**: the chest symbol and the disc (lens recipe), drawn by us after the source.
9. **Atmosphere**: what moves, how, and the light; an existing kind or a new one (and what the engine needs).
10. **Distinctiveness**: the five-axis score (palette, type, silhouette, Atmosphere, Voice; C / ~ / =, jury §1 rules) against each of the four shipped Themes, and a first guess against the other three Wave 2 Themes.
11. **Legal note**: what is homage and what we must not use.
12. **Unverified items**.
13. **Sources**, with links.

Write in plain English: short sentences, no marketing words. Colour distances in ΔE00 computed by you from hex values, not estimated.
