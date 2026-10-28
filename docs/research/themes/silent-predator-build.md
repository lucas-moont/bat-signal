# Research note: SILENT PREDATOR, before the build (Asylum's chest bat, the crouch, the suit's parts, Asylum's UI, the name)

> **Decided 2026-10-27 (the maintainer).** These picks override this note and the dossier where they differ:
> - **Name: SILENT PREDATOR**, not FREEFLOW, after the trade mark finding (§5: "Free Flow" is Rocksteady's registered EU and UK mark).
> - **Primary reference: *Arkham Asylum* (2009)** for the whole Theme; City and Knight are secondary.
> - **Emblem: the trilogy's logo bat, not the chest bat.** The silhouette is traced from City's logo [63] (its alpha channel); the head is redrawn from City's "Press START" bat [26], because the logo's lettering covers it. About **2.3:1** (§3.2 measures the logos at 2.30–2.45). This replaces §3.4's recommendation and lifts, for this emblem, the note's "logos are context only".
> - **Ears: Asylum's tall ears** (§4.6).
> - **Belt: brass-khaki `#7d6c4f`.**
> - **Three gauntlet fins** (§4.3) and **two hem points a side** (§4.5).
> - **Signature: crouched on a stone gargoyle**, our own drawing, with **the cape falling over the far side** (§4.1).
> - **INCOMING is kept** in the Lexicon.
> - **Face: Staatliches** for the wordmark, headings and stamps (§8), over Oxanium and Squada One.
> - **Bolder: Asylum's menu language across the whole panel** (§8): every card a black panel with a torn white edge, each stamp its title tab over the corner, an arrow on a hatch for what needs the user, the open tab on the hatch, title tabs in the mission log, spatter by the masthead. Engine hooks in PR #161.
> - **Alarmed: the counter**, one forearm thrust out with its fins, the other fist raised.
> - **Heavier decay** (§9.4, the heavy level): rust and water streaks, mould, a faint cracked tile grid and grime in every panel; ACCESS? cards chained and padlocked, after the game's own LOCKED tile [85].
> - **An iron fence along the panel's foot** (§9.5). The maintainer tried three drawings of the asylum's gate, with its statues and lettering, and chose to keep the plain spiked fence.
> - **A failing green light**: it only dims, never marks news, and only while the Atmosphere moves.
> - **The warden's medallion as the Theme's mark** (§9.1), traced from the 4K Deciphered Messages capture [73]:
>   - its dark shapes followed edge by edge and the left half mirrored;
>   - the dots at 12 and 6 o'clock redrawn;
>   - the hatched laurel sprigs and the middle pair of legs drawn by hand after it.
>
>   It was picked on screen over hand drawings and over a version with all the legs redrawn, and it lifts, for this mark, the note's "never traced" as the logo bat does. It is grey at rest and Bone when found (the game's found medallions are white; amber stays the alarm's).
> - **At the night report's end, one medallion per Case**, lit one after another once found.
> - Engine hooks: PRs #161 and #163.

Research note, 2026-10-27. Scope: what the Theme dossier [`arkham-games.md`](arkham-games.md) left unverified (§13) or read only from angled captures, checked again before the build of the Theme first named FREEFLOW, now SILENT PREDATOR (GitHub #147). **The maintainer has made *Batman: Arkham Asylum* (2009) the primary reference for the whole Theme** (2026-10-27), so every finding below is taken from Asylum first; City and Knight are secondary context and are labelled so. Covered: the chest bat, the gargoyle crouch, the mantle, the gauntlet fins, the pouch belt, the cape hem, the ears, Asylum's UI language, and whether "FREEFLOW" and its two fallbacks (SILENT PREDATOR, KNIGHTFALL) are registered marks. Read with the dossier, its reference index [`references/arkham-games.md`](references/arkham-games.md) and [`jury-wave-3.md`](jury-wave-3.md) §9, whose decisions stand.

Provenance key, as in [`dkr-rework.md`](dkr-rework.md): **Read** = seen by us on a reference image, named by its number (`[05]`). **Measured** = taken off that image with a script (column scans, segmentation, colour medians) or read as pixel coordinates off a gridded, upscaled crop of it. **Inferred** = our reading of what those facts imply. **Proposed** = our choice. Images [01]–[60] are the dossier's; [61]–[72] are new (§2), and [73]–[99] (§9). All stay in scratch folders and are never committed, traced into shipped art from a frame, or shipped (ADR 0001). The game logos ([62]–[64], [01], [21]'s wordmark, [44]) were measured as context; the maintainer has since chosen the logo bat as the emblem, traced from [63] without its lettering (see the Decided block).

## 1. TL;DR

- **No clean, flat drawing of the chest bat at size was found.** No art book page, model sheet or press vector of the suit's chest symbol is reachable online, and the art book (*The Art of Rocksteady's Batman*, Abrams 2015) has no page previews. Asylum gives four views of it, none both flat and large (ranked in §3.4).
- **Recommended trace:** take the **silhouette and proportions from Asylum's loading-screen bat [21]**, the only flat, frontal, lettering-free bat the game draws (234×77 px, soft; `TRACE-21-loading-glyph-x8.png`). Take the **parts' detail** (ear size, scallop depth, the tail) from Asylum's in-game model viewer [05], its clean right half mirrored (`TRACE-05-chest-right-mirrored-x6.png`), and from the save screen's huge close-up of the undamaged chest [70] (`TRACE-70-save-chest-x1.png`). Show the maintainer the three side by side before a trace is called done.
- **Proportions (Measured):** the flat glyph [21] is **3.0:1**, which confirms the dossier's ~3:1. The model [05] reads 3.96:1 because the upper chest slopes away from the camera; [70] shows the cause (Inferred, §3.2). On a 120-unit width: **small ears**, 3.6 units on [05]; **a real bowl** between head and wing (13.8 deep on [21]); a **wing peak**, the highest point, 30.8–34 units from the axis; a long convex outer edge falling to **low outer tips** (y 0.47 of the height on [21], 0.84 on [05]); **two deep scallops a side**, then a short curve into a **central tail**, the lowest point.
- **The chest bat is not the logo bat.** The logos' bat [62]–[64] is 2.3–2.45:1, with tall ears and deep elliptical bowls (Measured). The dossier was right to keep the logos out; they are also the wrong shape.
- **Corrections to the dossier's §8 and §9** (§3.3, §4):
  - the ears are **tall**, about 0.4 of the head from crown to chin on [04] and [05], not short;
  - the gauntlet has **three** fins, not two;
  - the hem shows **two** points a side on [04], not three;
  - in Asylum's perch [13] **no forearm rests on a knee** (one arm is cocked high, the other reaches down);
  - in every source the cape falls on the side **away from his gaze**.
- **Asylum's UI language (§8, Measured):** black boxes `#000000` with rough white `#ffffff` borders 6–17 px wide at 4K, tilted **+1° to +3°** (the header tab more than the panel), white ink spatter; **one accent, amber `#ffad00`**, marks selected, objective and usable, with a solid amber arrow and a grey hatch band behind the selected row; "NEW" is a dim amber `#a57000`; inactive grey `#999999`; danger red `#de0a09` only on armed enemies in detective mode; failure and warnings have no colour of their own. Type: hand-cut condensed capitals (8.04 cap heights wide for "CONTINUE STORY", stems 0.19), a slab serif for body text, a rounded techno sans in detective mode. **Closest OFL faces for the caps: Squada One (character), Staatliches (proportion), Khand 700 (weight)**; all fit every stamp room at 11px and 12px (PERMISSION 72–81 in the 101 margin).
- **The name: "Free Flow" is a registered EU trade mark of Rocksteady Studios Limited** (EUTM 007530496, classes 9 and 42, "computer software for simulating melee combat in video games", registered 2009, renewed 2019, expiry 2029-01-16), with a UK comparable right (UK00907530496). No US registration of FREEFLOW by Warner Bros., DC or Rocksteady was found. SILENT PREDATOR: no live mark anywhere searched. KNIGHTFALL: live US marks by A&E Television Networks (class 41, a TV series) and an individual (class 9, music); none by DC (§5).

## 2. References

New images and records, in `refs-freeflow/` (its `INDEX.md` lists URL, game and source type). They are added to [`references/arkham-games.md`](references/arkham-games.md).

| # | What | Game | Source type | URL |
|---|---|---|---|---|
| 61 | Character-trophy screen: Batman's cowl in profile on an amber moon | Asylum | Interface In Game, UI capture, 4K | https://interfaceingame.com/wp-content/uploads/batman-arkham-asylum/batman-arkham-asylum-character-trophies.jpg |
| 62 | Asylum's logo (bat with lettering), transparent | Asylum | Steam library logo, official | https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/35140/logo_2x.png |
| 63 | City's logo | City | Steam library logo, official | https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/200260/logo_2x.png |
| 64 | Knight's logo | Knight | Steam library logo, official | https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/logo_2x.png |
| 65 | Kotobukiya ARTFX+ *Arkham City* Batman (2014), near-frontal crouch on a cornice | City | Licensed product photo, on a shop page | https://resize.cdn.otakumode.com/full/shop/product/ae26f0ac384344a8bedd7f3fb43bf5dd.jpg |
| 66 | Same statue, close: three fins, gold pouch belt | City | Licensed product photo | https://resize.cdn.otakumode.com/full/shop/product/8217b8ecb0a440e582d482e55aece6c3.jpg |
| 67 | Same statue, from the side | City | Licensed product photo | https://resize.cdn.otakumode.com/full/shop/product/5761db8185874a8185278eaf26ee62b9.jpg |
| 68 | Same statue, from behind: the cape over the cornice | City | Licensed product photo | https://resize.cdn.otakumode.com/full/shop/product/c6b49d79f0564878816500ca3814ebbc.jpg |
| 69 | EUIPO register record of EUTM 007530496 "Free Flow" | (trade mark) | Register record (JSON) | https://euipo.europa.eu/copla/trademark/data/007530496 |
| 70 | Saved-game select over a huge close-up of the undamaged chest | Asylum | Interface In Game, UI capture, 4K | https://interfaceingame.com/wp-content/uploads/batman-arkham-asylum/batman-arkham-asylum-saved-game-select.jpg |
| 71 | "MISSION FAILED" box | Asylum | Interface In Game, UI capture, 4K | https://interfaceingame.com/wp-content/uploads/batman-arkham-asylum/batman-arkham-asylum-mission-failed.jpg |
| 72 | Detective HUD: an armed enemy in red, a reticle, a heart-rate panel | Asylum | Interface In Game, UI capture, 4K | https://interfaceingame.com/wp-content/uploads/batman-arkham-asylum/batman-arkham-asylum-attack.jpg |

The statue photos' shop page is https://otakumode.com/shop/5440679ae8d6a6973de057f2/ArtFX-Batman-Arkham-City. A licensed statue is the sculptor's reading of City's model, so it is used for pose and parts only, and only as secondary context.

Dossier images used again, Asylum first: [04] (the Asylum character artwork), [05] (Asylum's in-game character viewer, 4K), [13] (Asylum, on a gargoyle, Steam), [14]–[22] (Asylum's UI, 4K), [03] (Asylum key art); secondary: [23] [24] [26] [33] (City), [46] [47] (Knight).

**Crops (scratch, `crops-freeflow/`).**
- Tracing aids: `TRACE-21-loading-glyph-x8.png`, `TRACE-05-chest-right-mirrored-x6.png`, `TRACE-05-chest-full-x6.png`, `TRACE-70-save-chest-x1.png`.
- Gridded crops, labelled in source pixels: `g05-right.png`, `g05-centre.png`, `g05-left.png`, `g05-head.png`, `g04-head.png`, `g04-chest.png`, `g70-chest-small.png`, `g70-head.png`, `g03-chest.png`, `g33-chest.png`.
- Suit parts: `04-ears.png`, `04-mantle.png`, `04-fins.png`, `05-fins.png`, `04-belt.png`, `05-belt.png`, `04-hem.png`, `46-chest.png`.
- Perch: `13-perch.png`, `15-gargoyle.png`, `26-crouch.png`.
- UI: `ui-*.png`, listed in §8.6.
- Glyphs and masks: `21-loading-bat.png`, `26-ps-bat.png`, `masks1.png`.

**Scripts (`tools-freeflow/`):**
- `measure.py`: segment a flat glyph and profile its edges.
- `colscan.py`: edge scan per column on [05].
- `uisample.py`: UI colour medians.
- `grid.py`, `cropx.py`, `tracecrop.py`: crops and tracing aids.
- `tm.py` (USPTO) and `tmview.py` (EU, WIPO, UK): trade mark searches.

## 3. The chest bat (Asylum)

### 3.1 What exists, and what does not

- **No flat drawing of the suit's chest symbol at size was found.** Searched:
  - the publishers' Steam pages;
  - Interface In Game's 4K captures of all three games (60+ screens, including every character viewer it holds);
  - press coverage of the 2009 and 2010 announcements (the galleries' image links are dead);
  - the art book's listings and reviews (no page previews online);
  - licensed figures and statues (Kotobukiya ARTFX+, Play Arts Kai, Hot Toys VGM26, DC Collectibles).

  Bing image search returned nothing to scripts on 2026-10-27, so licensed-product photos were reached through shop pages only.
- **Asylum draws one flat bat in its UI** without lettering: the small white bat under the "ARKHAM" plate on the loading screen [21] (Read). City's title screen has a large translucent bat behind "Press START" [26], but that one is the logo bat (secondary, §3.2).
- **Asylum shows the chest bat in three more views** (Read): the "view character" model [05] (4K, front-on, slightly turned, a battle-damage slash across the left wing); the saved-game screen [70] (4K, a wide-angle, three-quarter close-up of the undamaged chest, the bat's right half larger than 1,000 px); the new-item card [20] (from below, red-lit). Asylum's own key art [03] and artwork [04] show it at about 200 px, soft and painted over (`g03-chest.png`, `g04-chest.png`).
- **Texture rips** (the suit's unwrapped diffuse map, through modding tools) would give the flattest view of all. They are game assets extracted from the files, so they are left out under ADR 0001.

### 3.2 Measurements

All on a grid 120 units wide (the bat's tip-to-tip width), y down from the bat's highest point, x from the vertical axis unless said otherwise.

**[21], the loading glyph (Measured by `measure.py`, three thresholds).** 234 × 77 px, white on black, frontal and flat; mirror IoU 0.977.

| Feature | Grid units |
|---|---|
| Width : height | **3.0** (3.00–3.05) |
| Wing peaks (highest point) | 34 from the axis, y 0 |
| Bowl, flat-floored | y 13.8, at 12.5 from the axis |
| Ear tips | y 8.7, barely above the crown (blurred) |
| Outer tips | y 18.5 (0.47 of the height) |
| Tail | y 39.5 |
| Scallops | not resolved (one point at 28 from the axis, y 28.7) |

**[05], the in-game model (Measured on gridded 5–6× crops and by `colscan.py`).** The right half (viewer's) is clean; the left half is 193 px from the axis against the right's 218, so the chest is turned slightly. The axis is set midway between the ear tips (x 1749 and 1772); 1 unit = 3.63 px.

| Feature | Source px (x, y) | Grid units (from axis, from top) |
|---|---|---|
| Ear tips | (1749, 562), (1772, 562) | ±3.2, 7.2; **6.3 apart** |
| Crown between the ears | y ≈ 575 | 10.8 (ears **3.6** tall) |
| Top edge, from the ears up | (1810, 565), (1840, 556), (1860, 544) | 13.6 → 8.0; 21.9 → 5.5; 27.4 → 2.2 |
| **Wing peak** | (1872, 536) | **30.8, 0** |
| Outer edge | (1900, 542), (1940, 562), (1960, 582), (1970, 606) | 38.5 → 1.7; 49.5 → 7.2; 55.0 → 12.7; 57.8 → 19.3 |
| **Outer tip** | (1978, ≈628) | **60, 25.4** (±1) |
| Scallop A, top | (1920, 584) | 44.0, 13.2 |
| Point between scallops | (1870, 616) | 30.2, 22.0 |
| Scallop B, top | (1825, 596) | 17.8, 16.5 |
| Inner point | (1776, 630) | 4.3, 25.9 |
| **Tail** | (≈1746, 646), Read left of the axis, under a highlight | ≈0, **30.3** |

- **As seen:** 120 × 30.3, W:H **3.96** with the right half mirrored; 3.7 tip to tip as photographed (411 × 110 px).
- **Scallops:** two a side, deep (A drops 9–12 units above the line of its points, B 6–9), then a short concave curve from the inner point down to the tail. That last curve can be read as a small third scallop; the highlight hides it (Read).
- **The bowl is there but shallow here:** the top edge climbs 10.8 units from the crown to the peak over 20 units of width (`TRACE-05-chest-right-mirrored-x6.png`).

**[70], the save screen (Read, not measured).** The largest view of the bat, on the undamaged suit. It shows a **deep, round bowl** between the head and the wing peak, about 240 px deep under a peak 420 px from the sternum (Measured roughly). It also shows **small ears**, about a third of the bowl's depth, and two deep scallops with points between them. The camera is close, low and three-quarter: the sternum crease runs diagonally across the frame, the left half is hidden behind the menu, and the outer tip leaves the frame. So no ratio is taken from it.

**Why the views disagree (Inferred).** The bat lies on a curved, armoured chest. On [05] the camera is level with the chest, and the upper chest slopes away from it, so the bowl and the height shrink: hence 3.96:1 and a shallow bowl. On [70] the bowl is deep. The flat glyph [21], drawn by Asylum's own UI, shows a bowl 0.41 of the peak's distance from the axis (13.8 / 34); [70] shows about 0.57 and [05] about 0.35. **3:1 with a clear bowl is the reading that fits all three.**

**[62]–[64], the logos' bat (context only; Measured on the alpha channel, lettering included).** W:H **2.45 / 2.30 / 2.37** (Asylum / City / Knight). Wing peaks about 30 units from the axis; **deep elliptical bowls** to y 17–18; **tall ears**, tips at y 5–7, about 11 units above the bowl floor; outer tips at y 27–29.5; tail at y 49–52. City's press-start glyph [26] reads as the same bat (Read).

| | W:H | Ears above crown or bowl | Bowl depth / peak's distance from axis | Wing peak from axis | Outer tip, share of height | Scallops a side |
|---|---|---|---|---|---|---|
| [21] Asylum loading glyph (flat) | **3.0** | ≈1 (blurred) | 0.41, flat floor | 34 | 0.47 | blurred |
| [05] Asylum model, level view | 3.96 | 3.6 | ≈0.35 | 30.8 | 0.84 | 2 (+ a curve to the tail) |
| [70] Asylum save screen, close, low | (not taken) | ≈⅓ of the bowl | ≈0.57 | (not taken) | (out of frame) | 2 |
| [62]–[64] logos | 2.3–2.45 | ≈11 | 0.58 | ≈30 | 0.55–0.57 | 2 |

### 3.3 Where the dossier's §9 is right and wrong

- "A wide, flat bat, about three times as wide as tall": **right** on the flat glyph (3.0); the model's 4:1 is foreshortening. At the dossier's 6.5 units wide it is about 2.2 units tall.
- "Short ears set close": **right** (3.6 of 120 units on [05], 6.3 apart; small against the bowl on [70]).
- "From the ears the top edge dips in one wide curve to each wing, whose tip rises to a point": **right for the dip** (the bowl, clear on [21] and [70]). The wing's high point sits about a quarter of the width in from each tip, not at the shoulder. From it a long convex edge falls to the outer tips, which point outward and sit low.
- "The lower edge has two shallow scallops a side, meeting a short central point": **two a side is right; they are deep, not shallow.** The tail is the lowest point, about 4.4 units below the inner points on [05].
- "A shade darker than the suit": **right**, and glossy: on [05] the part over the sternum catches a silver highlight (Read).

### 3.4 The trace sources, ranked

1. **[21], Asylum's loading glyph: silhouette and proportions (recommended).** The only flat, frontal, lettering-free bat of this shape in Asylum. Soft at 234 px, so trace its outline smoothly and do not trust its ears or scallops. File: `crops-freeflow/TRACE-21-loading-glyph-x8.png`.
2. **[05], Asylum's model viewer: the parts.** 4K, the clean right half mirrored about the ear axis, about 218 px from axis to tip: ear size, scallop depth and spacing, the tail (from the left side of `g05-centre.png`). File: `crops-freeflow/TRACE-05-chest-right-mirrored-x6.png`.
3. **[70], Asylum's save screen: the bowl and the edge quality.** The largest, cleanest edges, but a close three-quarter view with the tip out of frame. File: `crops-freeflow/TRACE-70-save-chest-x1.png`.

Then [04] (soft, turned) and [03] (painted over) for a further opinion only. If a better flat source is wanted, ask the maintainer for a page photo of the art book's Asylum suit turnaround (if it has one), or a clean frontal photo of an Asylum-era licensed figure's chest.

### 3.5 Knight's chest bat (secondary)

Read on [46] (an in-game capture on Screen Rant) and [47]: the bat is formed by the armour's seams. A dark recessed outline spans the chest from shoulder to shoulder; two rounded upper plates sit inside it like deep bowls; small ears rise at the collar; the lower edge follows the pectoral plates to a short central point. Its outline is closer to the Knight logo [64] than to Asylum's chest. Not measured. City's chest at size was not found either; on [33] (80 px) it reads as Asylum's (Read).

## 4. The suit's parts and the perch (Asylum first)

### 4.1 The gargoyle crouch

- **[13], Asylum on a gargoyle (Steam, official; Read):** he faces the viewer's right in three-quarter, head turned and looking down-right. The near leg is drawn up, knee high, foot planted on the gargoyle; the far leg kneels along it. The torso is upright and twisted toward us. The near arm is cocked high behind the head with a batarang; the far arm reaches forward and down, hand open. **No forearm rests on a knee.** The cape hangs behind him down the **viewer's left**, over the gargoyle's back, lit red at its edge.
- **[15], Asylum's gargoyle (detective mode; Read, Measured):** a crouching beast in profile projecting horizontally from the wall: head forward with horns and a snout, the forelegs' claws hanging under it, the body running back into the masonry. Detective mode fills it copper `#c57c43` with a pale peach rim, sets an amber double-ring reticle on its head and a white rounded key prompt beside it, and runs an amber callout line to the label "Vantage Point". A drawn perch for the overlay should be this beast in profile, not a gargoyle head seen front-on (Proposed).
- **Secondary, City:** [24] [23] (facing right, near forearm raised across the chest, far hand gripping the ledge, cape over the ledge on the viewer's left); [26] (facing left, both forearms on the near knee, cape trailing right); the statue [65] [67].
- **Inferred:** in every source the cape falls on the side away from where he looks. The dossier's "falling over the ledge on his left" holds if his glance is to his right; its watch loop (glances down-left, then down-right) should flip the fall or keep the glance on the side opposite the fold. "One forearm on a knee" is City's [26], not Asylum's [13]. For an Asylum-first Signature: one arm raised, one down.

### 4.2 The mantle

Read on [04] (`04-mantle.png`) and [05]: the cape sits over both shoulders like a shawl, covering the deltoids down to about mid upper arm, its front edge curving under the collarbone on each side and leaving the chest open between. On [05] the chest bat's wing peaks come within a few pixels of that edge. The dossier's mantle (a cape-black block over each shoulder, x 3–4.5 and 11.5–13) is **right**; the chest bat's peaks should sit just under it.

### 4.3 The gauntlet fins

- [04] (`04-fins.png`): **three** curved blades on the outer edge of the forearm, sweeping back toward the elbow, about **0.45 of the gauntlet's length** each and projecting about 0.6 of the forearm's width (Measured roughly on the crop). This is the artwork's exaggeration.
- [05] (`05-fins.png`), the in-game model: **three**, much shorter (about 0.12 of the gauntlet's length), in the same direction (Read). [13] shows them on the raised forearm, short.
- The dossier's "two 1×1 triangles … pointing back" is **one short in count**. At 54px, three would be three 1-unit teeth; two may still read better (Proposed: try three, keep two if they merge).

### 4.4 The pouch belt

Read on [04] (`04-belt.png`) and [05] (`05-belt.png`): brass-khaki, the brightest part of the suit. It has a **large rectangular buckle plate** with a vertical slot, wider than any pouch, and square pouches with a snap on a ribbed band. On the near side of [05] there are **two pouches and a tall narrow canister at the hip**, and one pouch on the far side (the body is turned). The dossier's "four 1-unit pouches" is **right in count** for the front; the buckle should be wider (about 1.5–2 units) than a pouch. The dossier's dimmed belt colour is not reopened here.

### 4.5 The cape hem

Read on [04] (`04-hem.png`): the cape reaches the floor and spreads to about **2.8 times the shoulders' width**; **two points a side** show (one rising, one trailing far out), the middle hidden behind the legs. [05] shows one long point on the trailing side. The dossier's "three long points a side ([04])" is **one too many** on [04]; three a side is a reading of a hem we cannot see.

### 4.6 The ears

Measured on gridded crops of the cowl: on [04] the ear tips sit 89 px above the crown, with 215 px from crown to chin, so the ears are **0.41 of the head's height**. On [05] they are at least 120 px against 320 (**≥0.375**; the frame cuts the tips). They are narrow, nearly vertical, and set about two-thirds of the cowl's width apart. [61] (the trophy profile), [13] and [03] agree: tall.

**The dossier's "Asylum's are short" is wrong.** Recorded cost: tall ears belong to SERIOUS HOUSE (needles) and HOLIDAY (long ears, 2.2 at the base, tips at y −0.8) under jury §9.6, so the Games' ears would be a third tall pair. The maintainer decides between fidelity and the standard ears the jury scored.

## 5. The name: trade mark searches

Searched 2026-10-27.

**USPTO.** Queried through the backend of `tmsearch.uspto.gov` by `tools-freeflow/tm.py`, the same index the public search page reads. "freeflow" returned 92 records; for "free flow", the first 200 of 24,087 were read (exact matches rank first).
- **No record owned by Warner Bros., DC or Rocksteady.**
- Live FREEFLOW marks in software and computer classes that could matter:
  - Xerox's FREEFLOW (Reg. 3046759, class 9, printing and workflow software), with FREEFLOW OUTPUT MANAGER, PROCESS MANAGER and MAKEREADY;
  - F FREEFLOW (Reg. 7996507, Freeflow, Inc., class 42, AI software tools);
  - ADP FREEFLOW (Serial 50103723, filed 2026-09-11, classes 9, 35 and 42, pending);
  - NCASE's FREEFLOW (Serial 98624360, class 9, computer hardware, pending);
  - Mitsubishi Electric's FREEFLOW (Serial 50179048, class 9, filed 2026-10-23);
  - Skidata's and Marston's FREEFLOW (parking and tolling, classes 9 and 42).
- **SILENT PREDATOR:** one record, dead (Stealth Propulsion Systems, class 9, abandoned).
- **KNIGHTFALL:** live Reg. 5419044, **A&E Television Networks**, class 41 (the TV series); live Reg. 7392642, an individual, classes 9 and 35 (music); a dead 1993 filing by Rob Liefeld, Inc. (class 16). **None by DC.**

**EU, WIPO and UK.** Queried through TMview by `tools-freeflow/tmview.py`, offices EM, WO and GB: "freeflow" 95 records, "free flow" 153.
- **EUTM 007530496 "Free Flow", Rocksteady Studios Limited**, a word mark:
  - class 9: "Computer software for simulating melee combat in video games; combat simulation software; melee combat simulation software";
  - class 42: design and development of such software;
  - filed 2009-01-16, registered 2009-07-29, **renewed 2019-01-22, expiry 2029-01-16**; status Registered;
  - partially surrendered on 2016-11-24 after a cancellation action by FREE (the claimant's name in the record);
  - the record's `renewalStatus` field reads "Not to be renewed"; what that field means before the renewal window opens is not stated (EUIPO record [69]).
- Its UK comparable right **UK00907530496** (classes 9 and 42) is listed by TMview as Registered; the UK IPO page itself sits behind a captcha.
- SILENT PREDATOR and KNIGHTFALL: no records in those offices.
- Other live EU, UK or WIPO FREEFLOW marks in class 9 or 42: Xerox (EM 003993664, WO 1039752, WO 809895, UK), Marston (WO 1536519, UK00003394691), Panacea Diagnostics, Nisco (UK, class 42), InterPuls, Rigdeluge.

**Not reached:**
- WIPO's Global Brand Database pages (a JavaScript app; TMview covered WO designations);
- EUIPO's eSearch page (its JSON record was read instead);
- the UK IPO register (captcha);
- the official game listings' "FreeFlow™", seen only in a search snippet of a retired Xbox Marketplace page.

**Inferred:** "Free Flow" is Rocksteady's registered mark in the EU and the UK for exactly this kind of software, and they mark it "FreeFlow™" in the US. A free desktop app naming a Theme "FREEFLOW" alludes to their mark in a neighbouring class (9). That is a legal judgement this note does not make. The dossier's §12 should now say "registered (EU, UK)" instead of "unverified". The maintainer chose SILENT PREDATOR (no mark found) on 2026-10-27; KNIGHTFALL (A&E's in class 41; DC's 1993 arc) was the other fallback.

## 6. Unverified items

- **A flat drawing of the chest bat at size.** Not found; the art book's suit pages, if any, were not seen.
- **The chest bat's flat proportions** rest on one small, soft glyph [21] (3.0:1) and on reading the 3D views' foreshortening (§3.2, Inferred).
- **The tail of the chest bat** on [05]: Read on one side only, under a highlight (±2 units).
- **[70]'s bowl depth:** measured roughly on a wide-angle three-quarter view.
- **City's and Knight's chest bats** at size (secondary).
- **The fins' size:** the artwork [04] and the model [05] disagree by a factor of about four.
- **The hem's middle points**, hidden behind the legs on [04].
- **Asylum's typefaces** (§8.4) and whether the menus' tilt is constant across screens (Measured +1.0° to +3.0° on four screens).
- **"Not to be renewed"** in the EUTM record, and the UK comparable right's details.
- **The licensed statue photos** [65]–[68] are reached through a shop's CDN, not Kotobukiya's own page.

## 7. Sources

- Images [61]–[68], [70]–[72] and record [69], with URLs: §2 and `refs-freeflow/INDEX.md`; the dossier's [03]–[05], [13]–[22], [23], [24], [26], [33], [46], [47] as listed in [`references/arkham-games.md`](references/arkham-games.md).
- USPTO trademark search, https://tmsearch.uspto.gov/search/search-results (queried through its backend `https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch`, 2026-10-27): FREEFLOW, FREE FLOW, SILENT PREDATOR, KNIGHTFALL.
- TMview (EUIPO's TMDN), https://www.tmdn.org/tmview/ (API `https://www.tmdn.org/tmview/api/search/results`, offices EM, WO, GB, 2026-10-27).
- EUIPO, EUTM 007530496 record, https://euipo.europa.eu/copla/trademark/data/007530496 (read 2026-10-27).
- Interface In Game, `interfaceingame.com/games/batman-arkham-asylum/` (and `…-city/`, `…-knight/`): UI captures.
- Fontsource API, `api.fontsource.org/v1/fonts/<id>`, and the TTFs from `cdn.jsdelivr.net/fontsource/fonts/<id>@latest/`, checked 2026-10-27: Squada One, Staatliches, Khand and the thirteen other faces of §8.5 (all OFL-1.1).
- Kotobukiya ARTFX+ *Batman: Arkham City* statue, Tokyo Otaku Mode shop page: https://otakumode.com/shop/5440679ae8d6a6973de057f2/ArtFX-Batman-Arkham-City.
- *The Art of Rocksteady's Batman: Arkham Asylum, Arkham City & Arkham Knight* (Daniel Wallace, Abrams, 2015): library records only, e.g. https://search.schlowlibrary.org/Record/374235; no page seen.
- Shacknews, ["First Batman: Arkham Asylum Screenshots Released"](https://shacknews.com/article/54713/first-batman-arkham-asylum-screenshots): the characters were redesigned with DC's WildStorm imprint.
- In this repo: [`arkham-games.md`](arkham-games.md), [`jury-wave-3.md`](jury-wave-3.md), [`dark-deco-build.md`](dark-deco-build.md), [`dkr-rework.md`](dkr-rework.md), ADR 0001.

## 8. Asylum's UI language

Added at the maintainer's request (2026-10-27): Asylum is the primary reference for the whole Theme, its UI included. Read on [14]–[22] and on three more Asylum captures, [70]–[72] (all 4K, from Interface In Game). Measured with these scripts in `tools-freeflow/`:
- `uisample.py`: colours, as the median of the most chromatic 5%, the brightest 15% or the darkest 30% of each region's pixels;
- `tilt.py`: box tilt, a line fitted to the top edge of each white border, positive when rising to the right;
- `capfit.py`: the menu caps' proportions;
- `stampw3.py`: stamp widths (the dossier's tool, which reproduces its Teko and Oxanium numbers).

Crops are `crops-freeflow/ui-*.png`, listed in §8.6. Asylum has **two registers**: a scrapbook register for the menus, and a clean HUD register for detective mode.

### 8.1 Boxes and labels: the scrapbook register

Menus, pause, map, WayneTech, trophies, saves and failure ([16]–[19], [22], [70], [71]).

- **Fill:** solid black **`#000000`** (Measured, [16]). Inside: faint grey grunge, a dashed grey route line, and diagonal hatching that shows only behind the selected row.
- **Border:** pure white **`#ffffff`** (Measured), rough and broken like a torn or photocopied paper edge. It is **6–17 px wide at 4K** (3–8 px at 1080p), irregular, with gaps (Measured on [16]'s edges).
- **Tilt:** the panel is not a rotated rectangle but a slightly skewed quadrilateral: on [16] its top edge rises **+1.0°** to the right, its bottom edge +2.1°, and its sides lean 1.8–2.2° (Measured on `ui-16-box-grid.png`). On [18] the objective panel's top edge rises **+1.1°** (`tilt.py`).
- **Header tab:** a separate black box with its own white border carries the title ("MAIN MENU", "PAUSED", "MISSION FAILED", "SAVED GAME SELECT"). It overlaps the panel's top-left corner, sits about one line above it, and is tilted a little more: **+2.0°** on [16], **+2.4°** on [17], **+3.0°** on [71] (`tilt.py`).
- **Ink spatter:** white drops and splashes beyond the box's corners, more at the right ([16], [17], [70], [71]).
- **The selected item:**
  - its text turns **amber `#ffad00`**;
  - a **solid amber arrow** (a block arrow, about the cap height) sits to its left;
  - a **band of grey diagonal hatching** (`#262626`, stripes leaning right, about 45°) lies behind the row from the arrow to past the text's end, ragged at its right end ([16], [17], [71]). The same amber arrow leads the current objective on the map ([18]) and the selected trophy's name ([22]).
- **Unselected items:** white **`#ffffff`** (Measured).
- **Tabs:** the active tab ("MAP", "WAYNETECH") is amber text in a larger white-edged box; inactive tabs are grey **`#999999`** text in smaller boxes; the shoulder-button hint ("LB") is a small white rounded box ([18], [19]).
- **Grids:**
  - the selected WayneTech icon is framed by **four amber corner brackets** ([19]);
  - the selected trophy tile gets an amber rough frame, the others white ones ([22]);
  - the selected save slot is outlined amber with amber text ([70]).

### 8.2 What each colour marks

| State | Asylum's mark | Hex (Measured) | Source |
|---|---|---|---|
| Selected (menu item, tab, tile, save slot, map route) | amber text, arrow, frame or brackets | **`#ffad00`** (the route `#fead00`) | [16], [17], [18], [19], [22], [70] |
| NEW (unseen content) | small amber caps at the row's right end, dimmer | **`#a57000`** | [16] |
| Objective | amber arrow and bullet before white slab-serif text; the map's objective marker in amber | `#ffad00` with white | [18] |
| Inactive | grey text | `#999999` | [18], [19] |
| Warning (in text) | the word "Warning:" in the same white slab serif, no colour | `#ffffff` | [20] |
| Danger (detective mode) | an armed enemy drawn red | **`#de0a09`** | [72] |
| Failure | none: the same black box and white caps, "RETRY" selected in amber | | [71] |
| Usable (detective mode) | the gargoyle filled copper with a pale rim; amber reticle, callout and label | `#c57c43`; `#ffad00` | [15] |

Read plainly: **one accent does almost everything.** Amber means "this one, now", whether selected, current or usable. Its unlit version means "new". Red appears once, for a threat, and never in the menus.

### 8.3 Detective mode: the HUD register

- **Labels:** a translucent near-black blue panel (`#090c11`; `#0c0811` on [72]) between thin 1px rules (`#262d33`) that run past its ends. A short **amber vertical tab with a chamfered corner** marks the left edge. The heading is amber `#ffad00` ("Detective Mode", "Vantage Point", "Vapor tracking"); the body text is pale blue **`#acdaff`** ("Condition: Calm", "93 bpm") ([15], [72]).
- **Pointing:** **amber 1px callout lines** with right-angle bends run from a label to an **amber double-ring reticle** on the target ([15], [72]).
- **People and the combat HUD:** people are blue skeletons (`#3868d2`). The combat HUD is a thick rough white arc with a thin lavender-grey progress ring (`#979bbf`) over a distressed bat silhouette, and white numbers ([14]).

### 8.4 Type

Three registers, none identified by any source (the faces stay unverified):

- **Headings and menu items: condensed capitals, hand-cut.** Heavy and narrow, with squared bowls (O, C, G, S are rounded rectangles), flat chamfered corners and slightly eroded edges; no lowercase. They are set on a baseline tilted with the box: "CONTINUE STORY" rises 14 px over 426 px, **+1.9°** (Measured, [16]).
  - Proportions: the line is **8.04 cap heights wide** (426 px at a 53 px cap height) and the stems are **0.19 of the cap height** (Measured by `capfit.py`).
  - The tracking is slightly open.
  - Colours: white, or amber when selected; "NEW" in dim amber.
- **Body text: a slab serif, sentence case**, white on black: objectives, item descriptions, trophy names, hints, the save slots' details ("Rescue Commissioner Gordon.", "Allows Batman to perform…", "Warning: Explosions may harm bystanders.", "Batman", "Intensive Treatment") ([15], [18]–[20], [22], [70]). It has a geometric, typewriter-like slab with even strokes and round bowls. The detective-mode hint over the scene ([15]) is the same slab, larger.
- **Detective mode: a rounded, squared techno sans** in amber and pale blue ([15], [72]).

### 8.5 Fonts for the heading caps

Candidates were fetched from Fontsource (OFL-1.1 checked through `api.fontsource.org/v1/fonts/<id>`, 2026-10-27). None is on the taken list (Anton, Special Elite, Limelight, Josefin Sans, Syncopate, Big Shoulders Stencil, Archivo, Permanent Marker, Neucha, Bangers, Bungee, Shantell Sans, Grenze Gotisch, Federo, Marcellus SC, Covered By Your Grace, Kalam), nor among the faces other Wave 3 dossiers claim (Luckiest Guy, Bowlby One SC, Lilita One, Russo One, Changa One, Tilt Warp, Rubik, Sofia Sans Extra Condensed, Mohave).

Sixteen condensed faces were set as "CONTINUE STORY" at Asylum's cap height and compared by width per cap height and stem per cap height against [16]'s 8.04 and 0.19 (`ui-font-board.png`, all sixteen; `ui-font-board-top.png`, the four closest beside the menu).

| Face | Width / cap | Stem / cap | Why |
|---|---|---|---|
| *Asylum's menu caps [16]* | *8.04* | *0.19* | |
| **Squada One 400** | 8.86 | 0.215 | **The closest in character**: squared bowls, flat chamfered cuts, a squarish S and G. A little wide; tracking at 0 brings it nearer (Proposed first) |
| **Staatliches 400** | **8.07** | 0.171 | **The closest in proportion**; cleaner and a touch lighter, rounder bowls. Already the dossier's T2 |
| **Khand 700** | 8.65 | **0.216** | The closest in weight, condensed and slightly squared, a clean grotesque |

Also measured, not proposed:
- Saira Extra Condensed 800 (7.33 / 0.196: right weight, rounder and narrower);
- Alumni Sans 800 (8.42 / 0.229);
- Oswald 700 (8.53 / 0.221, a classic grotesque);
- Smooch Sans 900 (8.15 / 0.250, too heavy);
- Teko 700 (9.91 / 0.271);
- Bebas Neue, Big Shoulders Display, Fjalla One, Antonio, League Gothic, Pathway Gothic One (all too narrow or too light);
- Kanit (not condensed).

None has the caps' eroded edge. **The roughness and the spatter stay out:** they are SERIOUS HOUSE's stamp (jury), and the dossier already rejected spatter.

**Stamp widths** (Measured with each TTF through PIL, the way `stampWidth.test.ts` adds tracking and the box: 12px padding and a 1px border each side; rooms 101 / 87 / 72 / 272 for the Night Report margin, the narrowest margin, the watch strip and the notice card; the widest word in each). The tool reproduces the dossier's Teko 600 at 12px (79.2) and Oxanium 600 at 11px (92.7) exactly.

| Face | Size | margin (101) | narrow (87) | strip (72) | notice (272) |
|---|---|---|---|---|---|
| Squada One 400 | 11px | PERMISSION 74.5 | PERMISSION 65.7 | PERMISSION 52.5 | MISSION START 90.2 |
| Squada One 400 | 12px | 80.2 | 70.5 | 58.0 | 97.2 |
| Staatliches 400 | 11px | 72.1 | 63.3 | 50.5 | 86.3 |
| Staatliches 400 | 12px | 77.8 | 68.2 | 55.7 | 93.2 |
| Khand 700 | 11px | 75.6 | 66.8 | 53.0 | 91.0 |
| Khand 700 | 12px | 81.0 | 71.4 | 58.7 | 98.1 |

All three fit every room at both sizes with room to spare (Oxanium 600 needs 92.7 of 101 at 11px). **For the body text**, Asylum's slab serif points to an OFL slab (for example Roboto Slab, Zilla Slab or Arvo) as a Report face; that is an option for the maintainer, not measured here.

**What this means for the dossier (Inferred):**
- **Display and stamps:** an Asylum-first Theme would set its display and stamps in one of the three above. Oxanium (T1) matches detective mode's labels, not Asylum's menus.
- **Selection:** the amber, the solid arrow before the selected row and the hatch band behind it are the cheapest Asylum marks to carry over: they are colour and shape, not texture.
- **The bracketed stamp:** the dossier's idea is Asylum's own WayneTech selection mark (four corner brackets, [19]).
- **"NEW" amber `#a57000`:** Asylum's unlit amber is a candidate for the waiting ink. It needs the jury's contrast and distance checks.
- **The tilted, white-edged black box with its header tab** is Asylum's strongest UI mark. It is near SERIOUS HOUSE's scrapbook look, so if used, use it without spatter or eroded edges and check it beside SERIOUS HOUSE on screen.

### 8.6 Crops

In `crops-freeflow/`:
- **The heading caps and the fonts:** `ui-heading-caps.png`, `ui-ref-caps.png`, `ui-font-board.png`, `ui-font-board-top.png`.
- **The menu box, gridded in source pixels:** `ui-16-box-grid.png`.
- **The scrapbook register:**
  - `ui-16-menu.png` (the menu box, arrow, hatch, NEW);
  - `ui-17-pause.png` (pause);
  - `ui-18-map.png` (tabs, objective panel);
  - `ui-19-wt.png` (WayneTech tab, slab body, corner brackets);
  - `ui-20-item.png` (the item card's slab text and "Warning:");
  - `ui-22-troph.png` (the selected tile);
  - `ui-71-failed.png` (failure).
- **The detective HUD:** `ui-14-hud.png` (the combat ring), `ui-15-labels.png` (labels and rules), `ui-72-hud.png` (the armed enemy in red, the reticle).

## 9. Asylum's decay and the warden's chronicles

Added 2026-10-27, after the maintainer's verdict on the first build: "the theme should be more 'Asylum'. In the original game there are symbols left by the asylum's director, everything is more aged, polluted, deteriorated. Batman, the symbol and the tasks are good, but the overall theme is too simple and weak." *Arkham Asylum* (2009) only.

References [73]–[99] are new and are added to [`references/arkham-games.md`](references/arkham-games.md). Most of [87]–[99] are stills from two YouTube videos, cited by video and time:
- **V1:** CompletionCore Gaming's guide to all 24 Chronicles, https://www.youtube.com/watch?v=5EkvagMURYM;
- **V2:** Batman Arkham Videos' introduction, https://www.youtube.com/watch?v=079tCc_JWJY.

Both were fetched at 640×360, the only resolution we could get.

The scripts are in `tools-decay/`. `regions.py` gives a region's median, dark5 (the darkest 5% of its pixels) and bright3 (the brightest 3%). The scratch sheets are `crops-decay/SHEET-chronicles.png`, `crops-decay/SHEET-gate.png` and `crops-decay/decay-board.png`.

### 9.1 The director's symbols are the Chronicles of Arkham

- **What they are.** The asylum's director in the game is Warden Quincy Sharp. The symbols he leaves are the **Chronicles of Arkham**, hidden "encrypted tablets" round the island that Batman finds and scans. Their text seems to be founder Amadeus Arkham's. Once all are found, the later entries turn out to be Sharp's own: he believes he is the "Spirit of Arkham" and spread the tablets himself.
  - Source: the Arkham Wiki's [Chronicles of Arkham](https://arkhamcity.fandom.com/wiki/Chronicles_of_Arkham), [Spirit of Arkham](https://arkhamcity.fandom.com/wiki/Spirit_of_Arkham) and [Amadeus Arkham](https://arkhamcity.fandom.com/wiki/Amadeus_Arkham) pages, used to identify only.
  - The Riddler's marks are a separate set of challenges and are not the director's.
- **The tablet in the world** ([91]–[96]; [93] front-on; Read). It is a free-standing **stone slab, wider at the base than the top**, a trapezoid about 1.2:1. It is thick, with a bevelled rim, and stands on the floor or leans against a wall, with no frame.
  - Its face is pale stone lit by the room: green-lit `#5f7f5f`, bright `#8ab68e` [93]; torch-lit `#3c382e` [92] (Measured).
  - It is chipped at a corner [93], and it waits in rubble behind a wall Batman blows open ([96]; V1 2:55, 6:34, 13:40).
- **The carving.** **Three to four concentric rings of tiny scratched script** fill the face nearly to its edge. At the centre is **a beetle in low relief**, about a sixth of the slab's width: four long prongs rising from the head (the middle two joined like a U), a short thorax, an oval abdomen and six legs. The bio art [74] and [75] draws the same slab.
- **How the game shows it** ([91], [94], [95]). The prompt reads "Use the Environment Analysis tool to decipher cryptic symbols" ([91]).
  - In detective mode the slab has **no outline**: it is blue like everything else ([95] `#2d3864`, Measured).
  - Once scanned, **the whole slab glows a flat yellow-green**, `#90b953`, bright `#ccfd94`, dark `#5d7222` (Measured, [94]), with "CHRONICLE OF ARKHAM SCANNED" beside it behind the amber arrow.
- **The final chronicle is not a slab:** its rings of script are drawn on a floor, with a word scrawled many times inside them ([97], [98]; the wiki's low-resolution capture [76]).
- **The medallion** ([73] 4K; [99]; Read and Measured). The bio screen "THE SPIRIT OF ARKHAM" lists "DECIPHERED MESSAGES" as a 6×4 grid of flat medallions.
  - **Each medallion:**
    - a ring of about 16 small dots inside the rim, with larger dots at 12 and 6 o'clock;
    - two hatched laurel sprigs, left and right;
    - the beetle in silhouette, about 0.55 of the disc's height: four upright prongs, an oval body, two front legs bent up and four legs bent down.
  - **Its three states:**

    | State | How it is drawn |
    |---|---|
    | Not found | dark grey |
    | Found | **white with the beetle black** (`#ffffff`, `#000000`, [99]) |
    | Selected | **amber `#ffad00`** in four amber corner brackets ([73]) |

    Amber is the selection, not "found".
- **Not found online:** concept art of the beetle or the slab, a tablet in the world sharper than V1's 360p frames, or any source for what the beetle means. "Scarab" is our word only.

### 9.2 The decay vocabulary

Rocksteady's art director David Hego describes the look:
- "a very realistic touch in the texture treatment and in the details";
- "We used a lot of saturated colors in the lighting while successfully keeping the mood dark and gothic";
- the medical wing is "more inspired from a Victorian architecture and metalwork structure";
- the intensive treatment unit is "a strong industrial gothic architecture".

([Episodic Content Magazine, 2016](https://episodiccontentmag.com/2016/03/04/batmanaa_chapter2/).)

Measured with `regions.py` on 31 regions; the table gives median / dark5 / bright3.

| Element | References | Measured | What a 2D panel could borrow |
|---|---|---|---|
| Grime and water stains | [10], [06], [83], [81] | `#171915` / `#0b0f0e` / `#617077`; `#2f4e50` / `#060605` / `#547b74`; `#0f131e` / `#050506` / `#3f535a` | Soft streaks running down from the top, darker than the ground; blotchy grime |
| Rust | [77], [10], [82], [79] | `#5e4734` / `#0a0f0c` / `#9e7657` (h 63–65) | A rust bleed on an edge or a rim; rust running from rivets |
| Peeling paint, torn posters | [12], [08] | `#2c3025` / `#080804` / `#a6aa92`; `#29362e` / … / `#a8d9cd` | Pale flakes. Close to SERIOUS HOUSE's torn panes (§9.3) |
| Cracked tiles | [78], [84] | `#58777a` / `#060a0d` / `#d0ffff`; `#15222a` / … / `#9cc2cf` | A faint square grid with one or two cracks; the clinical blue-white |
| Mould and overgrowth | [77], [20], [80] | `#0e140e` / `#060706` / `#55593a`; `#040d08` / `#000300` / `#264230` | Green-black creeping in at the lower corners, olive at its lit edge |
| Wet surfaces | [12], [08], [78] | `#38392e` / `#111009` / `#736557`; `#2b3d41` / `#060a0d` / `#b5fefe` | A sheen on the bottom band catching the green light |
| Green light | [12], [80], [06], [09] | `#688a70` / `#101b16` / `#bef8c5`; `#07181d` / … / `#baf8f3` | Already the Theme's haze; decay adds a failing light (from play, not seen in a still) |
| Victorian ironwork | [80], [15], [10], [72] | `#102e2e` / `#020c09` / `#bcf8f2`; `#141b1b` / … / `#577178` | A spiked fence at the panel's foot, rivets, barbed wire |
| Chains and padlocks | [79], [85] | `#0b1017` / `#000002` / `#aabfcb`; [85] flat `#000000` and `#ffffff` | **The game's own "LOCKED" tile**: a chain round a padlock, white, amber when selected |
| Warning signs, boarded crosses | [81], [82], [77] | `#7f6e5d` / `#1c1613` / `#e1d7ce`; `#3d2c23` / `#090604` / `#a47f67` | Stencilled plates; a boarded X over something closed |

Read plainly: Asylum's decay is **warm rust and brown (h 54–91) on cold green-teal and blue (h 146–280)**, and its whites are clinical blue-white rather than paper white.

### 9.3 Distance from SERIOUS HOUSE

SERIOUS HOUSE (`arkham-horror-references.md` on `origin/feat/123-serious-house`) claims:
- McKean's scratched emulsion;
- spatter (red on alarm);
- tall strips split by hairline rules;
- torn paper panes;
- construction geometry;
- hand lettering per voice;
- blue-black, scarlet and the Joker's green.

It rules out a flickering bulb.

**The game's own, and clear of it:** rust and rust-bleed, water-stain streaks and grime blotches, the cracked tile grid, mould, wet sheen, Victorian ironwork and barbed wire, chains and padlocks, stencilled signs and boarded crosses, the beetle medallion and the slab, and green-teal with warm rust.

**Collides, kept out:**
- the rings of script and the scrawled word: Arkham's binding spell is the 1989 book's own image, and hand lettering is SERIOUS HOUSE's;
- scratches of any kind;
- torn posters;
- red spatter (the Theme's white menu spatter stays white);
- a flicker that brightens.

### 9.4 Three levels (Proposed)

1. **Subtle, CSS only:**
   - a rust bleed in the torn card edge;
   - the medallion as the empty-state and closing glyph;
   - a riveted or barbed-wire header rule;
   - grain a little higher.
2. **Clear, small hooks:**
   - a grime image slot on cards;
   - a static stain layer on the ground: streaks from the top, mould at the lower corners, a faint cracked tile grid;
   - ACCESS? cards chained and padlocked after [85];
   - the night report's Cases as a row of medallions.
3. **Heavy, new painters:**
   - drips on the glass;
   - a failing green light that only dims;
   - an iron fence or gate backdrop at the panel's foot;
   - creeping vines.

The maintainer took the heavy level, without drips or vines (see the Decided block).

### 9.5 The gate

Read on [86] (front-on), [87]–[89] (the opening's drive-in, V2 1:21–1:31), [80] (three-quarter) and [90].
- **Approach:** the road runs straight through the gate between dead twisted trees, the green moon behind the centre. Before it stands a green direction sign over an orange warning plate ([90]).
- **Pillars and statues:** two squat stone pillars with overgrown bases (stone `#1d201d`). On each stands a tall robed, hooded statue, head bowed, holding a lantern out at chest height (`#fdfeef`). Whether the figures are angels or mourners is not settled: [80] hints at a wing, [86] shows only hood and drapery.
- **The arch:** two curved iron bands span the pillars, the upper one heavier, each carrying a word; the iron is `#24373e`, lit to `#c2f4ed`. Two more lanterns hang under the lower band.
- **The gate leaves:** above the bands, vertical bars rise higher toward the centre to a crown of spear tips ([88], [89]; `#2b414e`, bright `#8bcac4`).
- **The fence:** to each side, iron bars with a band of ring scrolls on the top rail and barbed-wire coils on top ([80]).
- **Defining shapes at the foot of a 320px panel**, most important first (Proposed):
  1. the two-band arch;
  2. the bars rising to a spear-tipped crown;
  3. the two robed figures;
  4. four warm lantern dots;
  5. the pillars;
  6. the fence with ring scrolls and barbed wire;
  7. the moon and dead branches.
- **Decided:** the maintainer tried three drawings of the gate with its statues and blank bands, and chose the plain spiked fence instead (see the Decided block). No lettering is ever drawn.

### 9.6 Unverified

- How a tablet looks in the world at more than 360p, and any official art of it.
- The final chronicle, written in blood on a monitor: from the wiki's text only.
- [76]'s scene.
- What the gate's statues are.
- The failing green light: from memory of play, not seen in a still.
- Sources outside the publisher: [78]–[82] come through a magazine (one carries a MobyGames watermark); [80] is a wallpaper of unverified origin; [86] carries a TeamXbox watermark.
