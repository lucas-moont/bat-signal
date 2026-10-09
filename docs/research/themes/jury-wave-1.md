# Design jury: Wave 1 Themes

Jury note, 2026-10-09. Scope: the four Wave 1 dossiers in this folder ([`the-batman-2022.md`](the-batman-2022.md), the yardstick; [`burton-1989.md`](burton-1989.md); [`nolan.md`](nolan.md); [`snyder.md`](snyder.md)), judged against `PRODUCT.md`, `DESIGN.md`, ADR 0001 (branch `docs/adr-themes`) and the glossary (`CONTEXT.md`, branch `docs/theme-vocabulary`). The lens is distinctiveness, hierarchy, contrast and anti-patterns at the real size: a 64px Signal disc, a 320x440 panel, and Bat-Clawd at 54–78px (1.9–2.8 screen px per grid unit). The binding decisions in the brief are not reopened. Colour distances are CIEDE2000 (ΔE00), computed by us from the dossiers' hex values. Under ~3 a difference is hard to see; above ~10 it is plain.

## TL;DR

- **Burton and Nolan pass against every other Theme.** 2022 is the yardstick and stays as built.
- **Snyder fails against Nolan (2 of 5 axes).** The two dossiers were written in parallel and reached for the same things: an ops Lexicon (**Op**, **Clearance**, **Gone dark**, **Calls** / **Your call**), Big Shoulders Stencil stamps, a mono "log" Night Report, a cool steel ground with a red alarm, Alfred in the Voice, and the names *Steel and Fire* / *Steel and Ash*. Snyder also clears 2022 by only one axis (3 of 5). The maintainer has to decide who owns the ops frame. We recommend Nolan, and moving Snyder to a monochrome palette with a weary veteran's Voice, Alfred in his ear, and the Knightmare.
- **Snyder or *The Dark Knight Returns*:** we recommend Snyder in Wave 1 and DKR kept as a later candidate behind a jury gate. DKR is boxed in on every side: Burton holds the gold oval and the newsroom, Nolan the night blue, Snyder the armour.
- **Collisions to fix now:** the Burton and 2022 flying Poses are both ribbed glides; three Signature poses (2022, Burton, Nolan) are the same upright, front-on figure; "dark" means both "all clear" and "stalled"; amber means *working* in 2022 but *waiting* or *alarm* elsewhere; Big Shoulders is used twice; Nolan's alarm sits 9.6 ΔE00 from Clawd orange.
- **Chest symbols:** no dossier puts the Alarm color on the chest at rest. Burton's lit oval is **1.2:1** against Clawd orange and disappears exactly when it should light. Snyder's bat merges into the cowl. The 2022 and Nolan bats are dashes about 1.3px tall.
- **The engine needs** a non-alarm `--accent` token, stamp ink and stamp shape per Theme, a disc lens recipe per Theme, a Night Report font token, Atmosphere kinds that are not particles, rain moved onto the 8 fps clock, pose overlays that can draw outside the sprite box, and Voice lines that take their terms from the Lexicon.

## 1. Distinctiveness matrix

**How an axis is scored.** C = clearly different, ~ = close, = = same.
- **Palette:** ground family (the surface and raised tones), Alarm hue, working ink. Two of three differ → C; one → ~; none → =.
- **Type:** display family and stamp family. Both differ → C; one shared, or the same register (say, two condensed grotesques) → ~; both shared → =.
- **Silhouette:** cowl ears, cape hem, chest symbol. A difference counts only if it is at least 1 grid unit (about 2px). Two of three → C.
- **Atmosphere:** what moves (streaks, flakes or a static scene), how it moves, and the light's colour and direction. Two of three → C.
- **Voice:** the frame (who speaks, which world the Lexicon draws from) and the register. Both differ → C; one → ~; neither → =.

A Theme stays only if it scores C against every other Theme on at least 3 axes.

| Pair | Palette | Type | Silhouette | Atmosphere | Voice | C |
|---|---|---|---|---|---|---|
| 2022 – Burton | C: warm black + red vs smog brown + gold; amber vs steel-blue working | C: Anton / Special Elite vs Limelight / Josefin Sans | C: red-edged cowl, jagged hem vs steel sheen, rounded scallops, oval + belt | C: diagonal rain, red glow from below vs vertical snow, brown smog | C: night journal, bleak vs night-edition newsroom, wry | **5** |
| 2022 – Nolan | C: warm vs blue-steel ground; amber vs mercury working (both alarms red, ΔE00 8.0) | C: condensed Anton vs wide Syncopate; typewriter vs stencil | ~: only the straight hem reads. Cheek guards, neck seam and thin ears are 0.2–0.6 units (under 1.3px); the chest bat is the same dark dash as 2022's | C: falling rain vs a static lit-window skyline; red vs mercury haze | C: Bruce's journal vs an ops briefing; no Lexicon vs Ops | **4** |
| 2022 – Snyder | C (narrow): warm vs neutral gunmetal; amber vs cyan working; **alarm red ΔE00 5.1–6.8 apart** | ~: the stencil stamps differ, but Big Shoulders display is a condensed heavy grotesque like Anton | C: stubby row-1 ears, an 8x4 chest bat, a heavy straight hem | C: streaks vs flakes; red light from below vs hard white light from above | ~: both are Bruce, terse and bleak at night ("Quiet night. Nothing needs you." vs "All quiet in Gotham.") and the frame differs only through a Lexicon the user can turn off | **3** |
| Burton – Nolan | C: smog vs blue steel; gold vs fire alarm; steel vs mercury (ΔE00 18) | C: Art Deco vs wide modern; Josefin Sans vs stencil | C: scallops, oval, belt vs straight hem, helmet cowl | C: snow vs a static skyline | C: wry tabloid vs dry ops | **5** |
| Burton – Snyder | C: brass smog vs gunmetal; gold vs carmine | C: no family shared | C: scallops, oval, belt vs stubby ears, big bat, straight hem | ~: slow pale flakes in both (35 bone vs 12 grey); only the light differs | C: newsroom vs weary soldier | **4** |
| Nolan – Snyder | ~: the grounds differ slightly (blue vs neutral steel), but the alarms are 5.9 ΔE00 apart, the working inks 8.7, and both keep red off everything at rest | ~: same stamp family (Big Shoulders Stencil), both drop the typewriter for a mono report | C: thin upright ears + a 4.4-unit bar vs stubby ears + an 8x4 horned bat (both hems straight) | C: static windows vs falling ash | =: both military logs ("SITREP", "FIELD LOG"), both Lexicons say Op, Clearance, Gone dark, Calls / Your call, both lean on Alfred | **2** |

**Result:** Snyder is below the line against Nolan and only just above it against 2022. Every other pair passes.

**After the §2 changes:**
- Nolan – Snyder: Palette becomes C (blue steel and mercury vs neutral monochrome and Bone), so do Type (no shared family) and Voice (ops briefing vs a veteran and Alfred). That makes **5**.
- 2022 – Snyder: Type becomes C, which makes **4**. Voice stays ~ unless Alfred's dry register, not Bruce's bleakness, leads Snyder's lines.

## 2. Verdict per Theme

- **The Batman (2022): keep, with changes.**
  - Move the Hot Signal leaks the dossier lists in §2 (tab underline, in-progress glyph, timeline step, shortcut border, progress gradient end) to `--accent`, Bone or `ink-live`.
  - Put the rain on the shared clock (§7).
  - Drop sample line 8, "Gotham sleeps. Bat-Clawd doesn't.": Burton's empty state is "Gotham sleeps. For now."
  - Draw the chest bat's wings 1 unit tall (§6).
- **Burton (*Gotham Gothic*): keep, with changes.**
  - The Lexicon fixes in §5.
  - A cowl-black rim on the chest oval, and the oval kept apart from the belt (§6).
  - Flying goes back to the trailing cape with rounded scallops; the ribbed glider overlaps 2022's wingsuit (§4).
  - The Signature turns three-quarter, looking up at a larger sky oval (§4).
  - The tray and toast icon notes in §8 no longer apply: icons stay single, drawn from the default emblem.
- **Nolan (*Steel and Fire*): keep, with changes.**
  - The Lexicon fixes in §5.
  - Every mascot detail at least 1 grid unit: a full-unit collar band, full-unit cheek guards, and a top line on the chest bat 1 unit tall.
  - Check the alarm against Clawd orange (§4).
  - The Sonar ring can't grow to radius 16 inside the viewBox (§6, §7).
  - The Voice takes Fox and Gordon and leaves Alfred to Snyder.
  - If question 2 goes to Nolan, it keeps Big Shoulders Stencil, Op and Clearance. The Chicago shoot is the stronger tie.
- **Snyder (*Steel and Ash*): overlaps Nolan, maintainer's choice** (questions 1–3). If it stays, it needs all of this:
  - A new display name.
  - A monochrome palette: Bone as the working ink, no cyan; the warm-to-neutral greys of *Justice Is Gray*.
  - No Big Shoulders. One new display family that is neither condensed nor wide (§4).
  - The §5 Lexicon.
  - A Voice built on the weary veteran and Alfred in his ear, not on ops.
  - A Night Report body that is not mono.
  - The Knightmare as the Signature pose.
  - The chest bat starting at row 6.
  - Ash that moves differently from Burton's snow.
  - `--ink-hot` at `#ff4d57`, so stamps pass 4.5:1 on a hovered card.

## 3. Snyder or *The Dark Knight Returns*

DKR has no dossier yet, only the sketch in [`snyder.md`](snyder.md) §11. Measured against the other Wave 1 Themes, that sketch is boxed in:
- Its alarm candidate (the first suit's yellow oval) and its Case → **Story** both belong to Burton, which already lights a gold oval and calls a Case a Story.
- Its TV-news Voice is a cousin of Burton's newsroom.
- Its night-blue ground (`#111a26`, `#35455c`) sits beside Nolan's blue steel.
- Its storm Atmosphere runs into 2022's own rejection of lightning: a flash with no news cries wolf.

| Option | What ships | Consequences |
|---|---|---|
| **A. Snyder now, DKR later behind a gate** | Snyder, with the §2 changes. DKR stays on the roadmap, and it has to clear this jury against the Burton and Snyder that actually ship | Snyder keeps the armour (its alarmed Pose), the grey suit and the big bat. A future DKR has to give up the gold or yellow oval, "Story", the press frame, night blue and lightning. What is left is Varley's painted colour, caption-box monologue, the lightning-leap Signature, the horse, and TV static as a static layer. That is enough for a Theme, but a thinner one, and it may never pass |
| **B. Snyder now, DKR dropped** | Snyder, with the §2 changes | Simple, and no look-alikes later. DKR is honoured only through Snyder's borrowings; the lightning cover and the TV-news Voice are lost |
| **C. DKR replaces Snyder in Wave 1, Snyder dropped** | DKR, after a full dossier | Wave 1 ships with three Themes, or waits for the research. The armour and grey suit go to their source, and DKR's 40th anniversary (2026) gives it a hook. But Burton would have to give up its gold-oval alarm or its newsroom, or DKR its best traits, and the Knightmare is lost |

**Recommendation: A.** Snyder's problem is Nolan, and it can be fixed inside Wave 1 by changing Snyder alone. DKR's problem is Burton, and fixing it means moving a Theme that already passes. The dossier for Snyder exists; the one for DKR doesn't. The decision is the maintainer's.

## 4. Cross-theme collisions to fix now

**Tie-break: a collision inside a Theme outranks one between Themes.** Two Themes are never on screen together, except in the picker.

1. **Flying Poses.** Three are glides, not four. Snyder keeps the trailing cape. But 2022's wingsuit and Burton's glider are both *ribbed* spread capes. **Fix:** 2022 keeps the ribbed wingsuit. Nolan keeps its solid, hook-tipped glide, which reads differently. Burton goes back to the trailing two-frame cape with its rounded scallops (the *Returns* glider is a secondary source anyway).
2. **Signature poses.** 2022's *Vengeance*, Burton's *Standing watch*, Nolan's *Sonar* and Snyder's option B are all upright, front-on, with the cape hanging. What tells them apart (a shadow rect, the eyes lifted 0.4, a ring, pauldrons) is 1–2px. Nolan's dossier saw this and chose the ring. **Fix:** only 2022 keeps the symmetric front-on stand. Burton turns three-quarter, head up, with the sky oval drawn larger so the pose is asymmetric. Nolan draws *Sonar* crouched: body 1–2 rows lower, cape pooled wide (the crouch needs a source check; failing one, the ring alone has to carry it). Snyder takes the Knightmare (option A), the only Signature in the Wave that isn't a standing figure.
3. **"Dark" and "quiet" mean all clear.** 2022 says "The signal is dark", Nolan "The roof is dark", Burton "All dark over Gotham", Snyder "Quiet night". Yet Nolan and Snyder stamp a stalled case GONE DARK, and Burton stamps it GONE COLD. **Fix:** reserve *dark* and *quiet* for "nothing needs you". Stalled becomes Burton **NO WORD**, Nolan **NO CONTACT**, Snyder **STUCK** (§5).
4. **Shared Lexicon words.** Op, Clearance and Gone dark (Nolan and Snyder); Calls / Your call. **Fix:** Op and Clearance go to Nolan. Snyder keeps "Case", takes **AUTHORIZE**, and keeps **Your call**. Nolan's Needs you becomes **On you**.
5. **One colour, three meanings.** 2022's working amber `#e8a33d` is 3.4 ΔE00 from Nolan's *waiting* sodium and 5.2 from Burton's *alarm* fill `#d29336`. Two of the three new Themes put amber or gold inside Needs you; only 2022 uses it for running work. Each Theme is consistent with itself, so the stamp word carries the tier. **Fix:** keep 2022 as approved, and have the picker preview each Theme's alarm on a stamp, so the change is seen as it happens (question 5).
6. **Three cool working inks.** Burton steel `#8fb0d3`, Nolan mercury `#7cc6c4`, Snyder cyan `#9cc2c9` (8.7 ΔE00 from Nolan's). **Fix:** Snyder's working ink becomes Bone, which also suits its monochrome direction.
7. **Three answers to "what replaces red for focus and toggles".** Burton and Nolan use `--ink-live`, Snyder uses Bone. A focus ring isn't "working". **Fix:** a separate `--accent` token (§7). In the three new Themes it defaults to Bone.
8. **Fonts used twice.** Big Shoulders Stencil (Nolan's stamps, Snyder's stamps, plus Big Shoulders as Snyder's display), JetBrains Mono as the report body (Nolan, Snyder), Special Elite (2022, and Burton's report). **Rule:** display and stamp families are unique to each Theme. Body, mono and report body may be shared. **Fix:** Big Shoulders goes to Nolan (the Chicago shoot; Snyder shot mainly in Detroit). Snyder takes one heavy grotesque of normal width, for display and for stamps set straight like plate lettering. Archivo is a candidate; its licence and Fontsource package are **unverified**. Snyder's report body becomes Barlow or that grotesque, not mono. Burton may keep Special Elite in its report.
9. **Alarms near Clawd orange.** Nolan's `--ink-hot` `#ff5340` is 9.6 ΔE00 from `#d77757`, the closest alarm to the mascot in the Wave. Under "nothing warm at rest", the orange mascot is the only warm pixel left on screen. Every red we tried that sits ≥12 from Clawd lands 2.6–5.6 from 2022's red. **Fix:** check it at header scale, with an alarm stamp next to the mascot. Then either move the fills to the `#e8261c` class (14.3 from Clawd) and accept being close to 2022, or keep the hues and give alarm pixels near the mascot a dark rim. For the record, the three red alarms (2022, Nolan, Snyder) are 5–8 ΔE00 apart. The binding red fallback allows that; their grounds carry the difference.
10. **Display names.** *Steel and Fire* and *Steel and Ash* sit next to each other in the picker. And 2022 is called "2022" while the others get descriptive names. **Fix:** one naming scheme, and Snyder renamed (question 4).
11. **Night Report frames.** Nolan's "SITREP · GOTHAM" and Snyder's "FIELD LOG" are both military logs in mono. **Fix:** Snyder's dateline goes non-military, for instance a dated cave entry ("THE CAVE · 02:14").

**Wave rules that follow** (for #79 to record):
- Every identifying mascot detail is at least 1 grid unit.
- Display and stamp families are unique to each Theme.
- *Dark* and *quiet* mean all clear.
- Stamp words fit the rendered width of PERMISSION in the Theme's own stamp face, measured, not counted (Josefin Sans caps at 0.14em run wider than Special Elite; Big Shoulders Stencil runs narrower).
- No two Signature poses share an outline at 54px.
- Display names are unique.
- In-Theme collisions outrank cross-Theme ones.

## 5. Lexicon clarity check

The test: a tired developer glancing at a stamp or a tab must get the standard meaning instantly, at the right severity. 2022 has no Lexicon; its words are the standard set.

| Theme | Standard → themed | Misread at a glance | Fix |
|---|---|---|---|
| Burton | Needs you → Front page | "the top stories", not "for you" | **Your desk** (the dossier's fallback) |
| Burton | Permission → SIGN-OFF | "signed off" = already approved; "signing off" = ending | **APPROVAL** (the dossier's fallback) |
| Burton | Waiting → ON HOLD | parked, nothing to do: the opposite of "waiting on you" | **QUESTION** (QUERY reads as a database query; the newsroom flavour belongs in the Voice) |
| Burton | New reply → EXTRA | "additional"; and the fallback NEW COPY reads as "a duplicate" to a developer | **JUST IN** |
| Burton | Stalled → GONE COLD | "cold case" = closed (2022's own reason for rejecting it) | **NO WORD** |
| Nolan | Case → Op / Ops | "op" = operator or opcode; close to the glossary's avoided "mission" | Keep the plural **Ops** on the tab; fall back to Operation if it's misread |
| Nolan | Needs you → Calls | phone calls, or function calls | **On you** (the dossier's fallback) |
| Nolan | New reply → REPORT IN | reads as an order to the user; doubles "report" inside the Night Report | **CHECKED IN** |
| Nolan | Stalled → GONE DARK | "dark" = all clear in this app; could read as "ended" | **NO CONTACT** (the dossier's fallback) |
| Snyder | Case → Op | taken by Nolan | Keep **Case** (Snyder renames fewer terms) |
| Snyder | Permission → Clearance | taken by Nolan | **AUTHORIZE** |
| Snyder | Error → DOWN | at a glance DOWN looks like DONE; also "shut down, finished" | **DAMAGED** |
| Snyder | Waiting → HOLDING | "holding steady", nothing to do | **ORDERS?** |
| Snyder | New reply → INTEL | to a developer, the chip maker | **NEW INTEL** |
| Snyder | Stalled → Gone dark | as Nolan | **STUCK** |

Kept as they are: Burton Story and TROUBLE; Nolan CLEARANCE, FAULT and YOUR MOVE; Snyder Your call.

## 6. Chest symbol check

Bat-Clawd's viewBox is 28 units wide, so at the header's 60px one unit is about 2.1px.

| Theme | Drawing | At 60px | Reads? | Alarm color at rest? |
|---|---|---|---|---|
| 2022 | wings 1.5x0.6 + body 1.2x1.3, cowl black on orange (6.3:1) | about 9x3px; wings 1.3px tall | a dark winged dash, not the bladed 2022 bat. Make the wings 1 unit tall and judge | No. The flare is in the Pose and shows only when alarmed |
| Burton | 4x2 oval in `--blood` brass + a 2x0.6 bat bar; belt at y=8 in `--blood` | 9x4px oval, 1.3px bar | **Unlit, 2.14:1 on orange: below WCAG's 3:1 for graphics. Lit `#d29336`, 1.2:1: it disappears.** The oval (y 6–7) and the belt (y 8) touch in the same brass and merge into one brown apron | No, but `--blood` is the alarm family's "off" shade, on the chest, the belt and the sky oval (question 6) |
| Nolan | top line 4.4x0.6 + V tail 1.6x0.5 and 0.6x0.4 | 9x1.3px bar, 1px tail | a bar, the same size as 2022's dash; the tail is under a pixel. Make the top line 1 unit and drop the tail if it muddies | No |
| Snyder | 8x4 horned bat, rows 5–8, in `--cowl` | 17x9px | **the only one that reads as a bat.** But the row-5 horns touch the cowl (which ends at y=5) in the same `#1c1e21`, so they read as the cowl dripping | No. The red eye rim shows only when alarmed |

**Fixes:**
- Burton: a cowl-black rim of at least 0.5 unit around the oval, so both the unlit brass and the lit gold read inside an outline. Move the oval up to y 5.5–7 and keep the belt to a 0.6-unit band with the Ash buckle.
- Snyder: start the bat at row 6 (horns at 6, span at 7, scallops and point at 8), leaving one orange row under the cowl.

## 7. Foundation implications

- **#72 Colours → variables**
  - An `--accent` token for non-alarm emphasis (wordmark, focus, checked toggles, sliders, selection, card-hover border and glow, tab underline, progress fill, sheet spill), separate from `--ink-live`. 2022 maps it to Signal Red.
  - Stamp inks by tier (`--stamp-hot`, `--stamp-soft`, `--stamp-quiet`), never `--signal-hot` directly: Snyder's `#e51232` fails 4.5:1 as text.
  - Brick stops being a literal.
  - A Quit danger-hover token (Snyder keeps red off it).
  - The report margin-rule colour.
  - Mascot tokens: cowl, cowl edge, cowl shine, cape, cape rim, thread (optional), chest, belt, and accessory colours.
  - Haze colour and grain opacity.
  - A contrast test per Theme: every text token at 4.5:1 or better on abyss, surface and raised.
- **#73 Text catalogue**
  - Terms with plurals (Op/Ops, Story/Stories).
  - Night Report dateline, section headings and closes per Theme, including Nolan's two closes depending on state.
  - Intro tagline, settings kicker, Atmosphere toggle label.
  - The Signature line, with its "once per session" limit.
  - **Voice lines that name a term must take it from the Lexicon** ("No ops running" has to say "No cases running" when the Lexicon is off, or avoid the term).
  - A test that every stamp word fits at its rendered width per Theme: in the Night Report margin (114px, 100px under 330px), on cards and on the notice card.
- **#74 Theme setting and engine**
  - Fonts per Theme, with wordmark size and tracking (Syncopate needs about 15–16px in the header; Limelight stays at 19px or larger).
  - A `--font-report` role, since the report face differs by Theme.
  - **Stamp shape as a Theme property:** rotation, wear mask, border weight, family (Nolan's are straight, with no wear).
  - **A disc lens recipe per Theme.** Variables alone won't do: Snyder inverts the disc to a pale lens with a red bat and needs a dark bat outline, and Nolan has a five-stop white-hot core.
  - The emblem as path + viewBox box + finish (2022's `bat-wear`, Snyder's brushed grain, none for the others).
  - The Signal window follows the Theme.
- **#75 Poses and Signature pose**
  - New parts: chest (all Themes), belt (Burton), gauntlets (Nolan), pauldrons and helmet (Snyder, alarmed), accessories (2022's flare, Snyder's goggles, scarf and duster).
  - Hem style as a part: jagged, scalloped, straight, few-point.
  - Eyes that can move (Burton's +0.4 glance) and still stay white.
  - **An overlay layer outside the sprite box:** Burton's sky oval at (18, −1), Nolan's ring out to radius 16 around (8, 3), which would clip in −6…22 × −1…12.
  - Signature reveals as tick scripts on the clock (2022: 4 ticks; Nolan: a 4-tick ring), with the final frame under reduced motion.
  - Perch behaviour per Theme (gust or no gust, a ping once per WATCH cycle).
- **#76 Lexicon switch**
  - The §5 words.
  - Plurals.
  - The rule above for Voice lines that name a term.
  - Tests that toasts and the tray stay standard, with the switch on or off.
- **#77 Atmosphere**
  - **Move the rain onto the 8 fps clock** (`Atmosphere.tsx` runs its own 15 fps loop today; the binding One Clock Rule has no exception), with longer streaks to cover the bigger step.
  - Kinds: rain, snow, ash (rising and sideways, §4), and a **static scene** (Nolan's lit windows: drawn once, then one 3x4 repaint a second). So it must not assume a particle system.
  - Haze direction: from below (2022, Burton, Nolan) or above (Snyder).
  - Event transitions: 2022's flare-lift when alarmed.
  - Optional layers: the flood.
  - Gating, frozen frame, migration from `rain`.
- **#78 Picker**
  - One naming scheme, with the credit line.
  - The preview shows the Theme's Alarm color on a stamp, plus its Signature pose.
  - Fonts lazy-loaded for previews.
- **#79 ADR and docs**
  - Restate the Pure Black Ground Rule and the Machine Voice Rule per Theme (the typewriter is 2022's and Burton's report).
  - The Alarm color rule replaces "red means something".
  - The Wave rules in §4.
  - A NOTICE and README credit for each emblem.
  - The Apache-2.0 NOTICE for Syncopate.

## 8. Questions for the maintainer

1. **Snyder or *The Dark Knight Returns*?** A: Snyder now, DKR later behind a jury gate. B: Snyder now, DKR dropped. C: DKR replaces Snyder in Wave 1, Snyder dropped. *Recommended: A.*
2. **Who owns the ops frame** (Op, Clearance, stencil stamps, a mono log, the briefing Voice): Nolan or Snyder? *Recommended: Nolan. Snyder moves to a monochrome palette, a weary veteran with Alfred in his ear, and the Knightmare.*
3. **Snyder's Signature pose:** the Knightmare (A) or the armour (B)? *Recommended: the Knightmare. It is unique in the Wave, it is the only Signature that isn't a standing figure, and the armour stays the alarmed Pose.*
4. **Display names:** one scheme for all four, and a new name for Snyder (*Steel and Ash* sits beside *Steel and Fire*)? *Recommended: descriptive names for all, with the year in the credit. 2022 becomes "Red Ink" (not "Case File", which is a Layout's name); Snyder becomes "Ash and Iron".*
5. **2022's amber "working" ink**, which is amber or gold for "needs you" in Burton and Nolan: keep it, or move 2022's running work to Bone? *Recommended: keep it (it is approved, sourced and consistent within its Theme), and have the picker preview show each Theme's alarm.*
6. **Does Burton's unlit brass (`--blood`) count as the Alarm color** on the chest oval, the belt and the sky oval at rest? *Recommended: no. It is the "off" shade, like 2022's Dried Blood thread, provided gold appears only when lit.*
7. **Adopt the §5 Lexicon fixes?** *Recommended: yes, all of them.*
8. **Burton's flying Pose:** back to the trailing scalloped cape instead of the *Returns* glider? *Recommended: yes.*
9. **Signature outlines:** Burton three-quarter and looking up, Nolan's *Sonar* crouched (pending a source check)? *Recommended: yes. If no source supports the crouch, Nolan keeps standing and the ring carries it.*
10. **Fonts:** Big Shoulders to Nolan only, and one new heavy grotesque of normal width for Snyder (Archivo is a candidate)? *Recommended: yes.*
11. **Nolan's alarm hue:** move it toward 2° to get away from Clawd orange (and accept that it sits close to 2022's red), or keep it and rim alarm pixels near the mascot? *Recommended: decide after a check at header scale; default to moving it.*

## 9. Notes for later waves

- **Burton vs *The Animated Series*.** High risk, as the Burton dossier says: Elfman's score, Art Deco, a yellow oval. TAS should take the red skies, the grey and blue suit and flat cel shapes, and **must not use a yellow or gold oval as its alarm**. Any 1960s or comics Theme is under the same constraint.
- **Nolan vs the Arkham games.** Arkham can't use a teal sonar or detective-mode ring, or a steel-blue ground; Nolan owns those now. The old v2 idea, "Arkham green", is the honest way in: an asylum-green ground.
- **A DKR brief, if option A holds, must avoid:** a gold or yellow oval alarm, "Story", any press frame (Burton); a night-blue ground (Nolan); the armour, grey suit and big chest bat (Snyder); lightning flashes (never cry wolf). It can build on Varley's painted colour, TV static as a static layer, a caption-box monologue, the lightning-leap Signature and the horse.
- **Adam West** stays dark, per the ADR, with the comedy in its Voice. Its yellow oval runs into Burton like everything above.
- **Every later dossier** should be written against the shipped Themes' token tables, not a projection: Snyder's Nolan column was a guess, and that guess is how the two converged.
