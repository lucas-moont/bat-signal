# Theme: The Batman (2022)

Research note, 2026-10-09. Scope: the default Theme, written in the same format as new Themes. It records what is already built and approved (palette, type, emblem; see `DESIGN.md` and `app/src/renderer/src/styles/theme.css`) and fills in what the new Theme model adds: Voice, Lexicon, Pose homages, a Signature pose and Atmosphere. Nothing here redesigns the approved look.

## TL;DR

**Display name: "2022". Subtitle credit: "after Matt Reeves's The Batman" (shown together: "2022 — after Matt Reeves's The Batman").** This Theme is the baseline the others are judged against. It is a noir case file under a red light: pure black, one family of reds that act as light and ink, typewriter stamps and rain. That matches what the filmmakers said they were making: an "urban noir" with "pockets of light in every frame" ([TheWrap, Fraser](https://www.thewrap.com/the-batman-cinematography-greig-fraser-interview/)) and "a '70s noir detective story" ([The Ringer, quoting GQ](https://www.theringer.com/2022/02/23/movies/the-batman-movie-preview-comparisons-nirvana-noir-zodiac)). Decisions:

- **Lexicon: none.** The standard words in the code today (Case, Needs you, Permission, Error, Waiting, New reply, Stalled) were written for this Theme, so they are its words. Turning the Lexicon off changes nothing here.
- **Voice:** Bruce's journal, the register the film uses for its narration ([Reeves via The Ringer](https://www.theringer.com/2022/02/23/movies/the-batman-movie-preview-comparisons-nirvana-noir-zodiac)). It is terse, nocturnal and observational, and most of the existing flavor lines already speak it.
- **Poses:** keep sleeping as it is. Swap flying for the **wingsuit glide** and alarmed for the **raised red flare** from the flooded arena. The flare goes on alarmed and not the Signature because red light has to mean "needs you".
- **Signature pose: "Vengeance".** He stands with the cape draped and steps out of the dark, as in the subway fight. It is still enough for the perch, uses no new red, and plays its reveal once in the intro and on click.
- **Atmosphere:** rain stays. "Much of the movie" plays in torrential rain, partly added in post over wet-downs ([American Cinematographer](https://theasc.com/article/greig-fraser-batman/)). Two cheap refinements: a flare-lift of the existing red glow while alarmed, and an optional static flood waterline. One correction: the rain does **not** run on the shared 8 fps clock today (§6).

## 1. Visual identity and sources

- **Credits.** Directed by Matt Reeves, cinematography by Greig Fraser, production design by James Chinlund, music by Michael Giacchino; US release 4 March 2022 ([Wikipedia](https://en.wikipedia.org/wiki/The_Batman_(film))). Jacqueline Durran was the film's costume designer. The Batsuit was a separate credit for David Crossman and Glyn Dillon: Crossman's filmography reads "Batsuit only", with Dillon ([Wikipedia, David Crossman](https://en.wikipedia.org/wiki/David_Crossman_(costume_designer)); [Wikipedia, Jacqueline Durran](https://en.wikipedia.org/wiki/Jacqueline_Durran)). The suit should be credited to Crossman and Dillon, not Durran.
- **Darkness as the ground.** "Fraser and Reeves set out to create a film that was nearly always dark." Colorist Dave Cole: "We elected to keep the blacks open and 'dirtier' to better reflect the dirty and grungy nature of Gotham City." A skip-bleach process gave "halation … around highlights" ([AC, Jay Holben, 25 May 2022](https://theasc.com/article/greig-fraser-batman/)). Fraser: "you can't just go black with little detail" ([TheWrap, Adam Chitwood, 7 Mar 2022](https://www.thewrap.com/the-batman-cinematography-greig-fraser-interview/)).
- **Light as punctuation.** "I wanted this to be more of an urban noir, and I wanted to make sure that there were pockets of light in every frame" ([TheWrap](https://www.thewrap.com/the-batman-cinematography-greig-fraser-interview/)). The lenses were "significantly tuned Series 2 Arri Alfa anamorphic" with heavy astigmatism, while "the center was great and sharp", shot on Alexa LF ([AC](https://theasc.com/article/greig-fraser-batman/)).
- **The suit is lit from the eyes.** Fraser: "He loses his frightening appeal if he's too exposed"; "I pushed light into his eyes, while keeping it mostly off the cowl" ([AC](https://theasc.com/article/greig-fraser-batman/)). This is why Bat-Clawd's white eyes on a black cowl are already right for this Theme.
- **Red from the first reveal.** Reeves's February 2020 camera test showed Pattinson under "low, red lighting", with a black chest emblem that looks "metal-plated" ([CBS News / ET, 13 Feb 2020](https://www.cbsnews.com/news/robert-pattinson-wears-cape-and-cowl-in-first-look-from-upcoming-film-the-batman)). Fraser reportedly said his red complements the suit's matte texture, but that claim is secondhand: [Sportskeeda citing Collider](https://www.sportskeeda.com/comics/why-the-batman-visually-stunning-comic-book-film), **unverified** against the Collider piece.
- **A homemade, worn suit.** The article says Reeves wanted a suit that "looked rather homemade, assembled by a driven young man" (the article's words, not a Reeves quote), and that the designers built battle damage into it ([Yahoo via AOL](https://www.aol.com/news/robert-pattinson-breaks-down-batman-171048255.html); page now 404, wording from search excerpts). The emblem is "bladed" and made of metal ([Wikipedia, Batsuit](https://en.wikipedia.org/wiki/Batsuit)). The idea that it is forged from the gun that killed the Waynes is fan speculation, not a production statement ([Wikipedia, Marketing section](https://en.wikipedia.org/wiki/The_Batman_(film))).
- **Gotham.** Chinlund on the UK's North: "All this beautiful ornament and incredible pieces of architecture with this heavy dark patina … and then obviously, the weather of the North" ([Time Out quoting Radio Times, 7 Mar 2022](https://www.timeout.com/news/the-batman-8-things-you-might-have-missed-030422)). Everything Batman owns was built "himself", in a "do-it-yourself aesthetic" ([TechRadar](https://www.techradar.com/news/the-batman-how-the-production-created-a-diy-slimmed-down-bruce-wayne); full text not retrieved, wording from search excerpts).
- **Mood and music.** Giacchino finished the main theme by October 2019, before shooting. The score is "dark, lurking, and often eerily sparse" (AllMusic, cited in [Wikipedia, soundtrack](https://en.wikipedia.org/wiki/The_Batman_(soundtrack))). The track titles are dry puns ("It's Raining Vengeance", "A Flood of Terrors", "The Bat's True Calling"). That deadpan works as a license for the Voice. Nirvana's "Something in the Way" plays at the start and the end ([same](https://en.wikipedia.org/wiki/The_Batman_(soundtrack))). No direct Giacchino quote on the theme's character was retrieved.
- **The journal.** Reeves described Bruce's narration as "almost like a kind of Travis Bickle sort of journal" ([The Ringer quoting Esquire, 23 Feb 2022](https://www.theringer.com/2022/02/23/movies/the-batman-movie-preview-comparisons-nirvana-noir-zodiac)). A review hears "voiceover narration that echoes neo-noir of the 1970s" ([CLTure, Johnny Sobczak, 6 Mar 2022](https://clture.org/the-batman-review/)). That the narration is read from a written journal comes from the film; no fetched source states it (**unverified** in writing).

## 2. Palette and type (as built)

Nothing changes here. The tokens live in `app/src/renderer/src/styles/theme.css`; the rules and roles are in `DESIGN.md` → Colors and Typography.

| Token | Value | Role | Why it fits the film |
|---|---|---|---|
| abyss | #000000 | the page | "nearly always dark" ([AC](https://theasc.com/article/greig-fraser-batman/)) |
| surface / raised | #13100e / #27150e | warm near-black highlights | frame samples (theme.css comment). Works as the "open and dirtier" blacks of the grade ([AC](https://theasc.com/article/greig-fraser-batman/)), confined to highlights |
| signal | #af0006 | the Theme's base red: masthead, focus, cowl and cape edge | average of the red pixels in the title logo (theme.css comment); the red camera test ([CBS/ET](https://www.cbsnews.com/news/robert-pattinson-wears-cape-and-cowl-in-first-look-from-upcoming-film-the-batman)) |
| signal-hot / ink-hot | #e3121b / #ec2a2a | **the Alarm color** | the hottest color in the palette |
| blood / brick / ink-soft | #8b0000 / #c9463d / #d4574c | waiting-tier ink, rules, cape thread | the "Batman 2022" palette on color-hex.com (theme.css comment) |
| ink-live | #e8a33d | "working" | the amber of sodium streetlights (theme.css comment). A critic calls the film's palette "crimson and marigold" ([retrospective](https://joesvideoclub.substack.com/p/retrospective-the-batman-2022)) |
| clawd | #d77757 | Bat-Clawd's body only | Claude Code's `clawd_body` |
| bone / ash | #e8e1d9 / #8a817a | text | — |

- **Type.** Anton (condensed poster capitals) for the masthead. Barlow Semi Condensed for working text. Special Elite, a typewriter, for stamps and the Night Report. JetBrains Mono for machine output. The typewriter is the house's case-file metaphor and suits the "'70s noir detective story" pitch ([The Ringer quoting GQ](https://www.theringer.com/2022/02/23/movies/the-batman-movie-preview-comparisons-nirvana-noir-zodiac)). The film's journal is handwritten, though (**unverified** detail, from the film), so the typewriter is a homage to the genre, not a copy of a prop. No title wordmark is used: the masthead says BAT-SIGNAL, not the film's logo.
- **Emblem.** Drawn once in `BatEmblem.tsx`, after the 2022 symbol (see `NOTICE`).
- **Film grain.** The static 4.5% SVG grain stands in for the film-out and skip-bleach texture Cole describes ([AC](https://theasc.com/article/greig-fraser-batman/)).

### The Alarm color as it stands

The Alarm color is **Hot Signal #e3121b**, with **Pen Hot #ec2a2a** as its lifted ink at stamp size. It carries the permission and error stamps, urgent card rules and their breathing outline, the disc's count border, the alert status dot, the hot alert boxes, and the notice card's urgent rule (`DESIGN.md` → Stamps; `Cards.css`, `Signal.css`, `WatchStrip.css`, `NightReport.css`). Signal Red (#af0006) is the Theme's base red, not its alarm. Because this whole Theme is red, red alone cannot say "alarm" here; the hot shade has to.

Under the glossary rule ("it appears nowhere else", `CONTEXT.md`), Hot Signal still leaks into non-alarm places. `ink-live` amber already took "working" out of red on cards, the watch strip and the report. These leaks remain (verified by grep, 2026-10-09):

- active tab underline (`App.css:231`)
- in-progress task glyph and running job state (`CaseDetail.css:132`, `:143`)
- in-progress timeline step (`Sheets.css:125-126`)
- shortcut recording border and settings warning hint (`Sheets.css:243`, `:254`)
- end of the progress-bar gradient (`Cards.css:189`)

When the Theme model lands, these should move to Signal Red, Bone or `ink-live`. That is a token swap, not a redesign. The decision belongs to the implementation phase.

## 3. Voice

**Tone.** Bruce's journal, written at night: short declaratives, present tense, a little bleak, never jokey. The deadpan of Giacchino's track titles is the furthest it goes ([soundtrack](https://en.wikipedia.org/wiki/The_Batman_(soundtrack))). It observes; it does not cheer. Gotham, the night, the rain and the case file are its nouns. It never renames a term (`CONTEXT.md` → Voice), and it never says "session" in the UI.

**Existing lines that already fit** (keep as they are):

- "All quiet in Gotham." / "Nothing needs you right now." (`Cards.tsx:55`)
- "No open cases." (`Cards.tsx:105`)
- "Nothing awaits your signature. Every case can carry on without you." (`NightReport.tsx:103`)
- "Awaiting your signature", "Case notes", "End of report.", "n of m filed." (`NightReport.tsx`)
- "Bat-Clawd is on patrol", "Bat-Clawd keeps watch" (`BatClawd.tsx`)
- "Gotham weather behind the cases" (rain toggle), "Bat-Computer" (settings kicker) (`Sheets.tsx`)
- "Last words", "Case opened", "Case closed" (`CaseDetail.tsx`, `notices.ts`)

**Sample lines** (new, for empty states, headings and the Night Report; none quote the film):

1. "Rain again. Every case accounted for."
2. "The signal is dark. Get some sleep."
3. "Still working. Still raining."
4. "Night report, filed 02:14." (dateline variant)
5. "Case closed. Another one by morning." (Night Report footnote when a case ends)
6. "Nothing on the wire tonight." (plugin hears nothing, as a heading above the existing hint)
7. "Two cases open. None of them need you yet."
8. "Gotham sleeps. Bat-Clawd doesn't."

**Iconic line, at most one.** "I'm vengeance." (two words, from the first trailer, [Rolling Stone AU, 24 Aug 2020](https://au.rollingstone.com/movies/movie-news/the-batman-trailer-robert-pattinson-16045); the exact on-screen wording is **unverified** in writing). It may be used once, as the hover title of Bat-Clawd in the Signature pose. The screen-reader label stays descriptive ("Bat-Clawd steps out of the dark"). No other film dialogue appears. "When that light hits the sky…" ([Rolling Stone, Oct 2021](https://www.rollingstone.com/tv-movies/tv-movie-news/the-batman-new-trailer-catwoman-the-penguin-1243158)) is too long and is left out (its wording comes from a search excerpt, not a fetched page).

## 4. Lexicon

**Decision: the 2022 Theme has no Lexicon of its own. The standard words are its words.** They were chosen with this Theme: a session is a **Case**, alerts are ink **Stamps**, the report "files" tasks. That vocabulary is the detective noir Reeves pitched ([The Ringer](https://www.theringer.com/2022/02/23/movies/the-batman-movie-preview-comparisons-nirvana-noir-zodiac)). It follows that the Lexicon toggle is a no-op on the default Theme, and the standard set in the code is canonical: every other Theme's Lexicon maps from it.

| Term | Standard word (code today) | 2022 word | Considered and rejected |
|---|---|---|---|
| Case | Case (`view.ts` "Untitled case") | Case | "File": reads as a disk file |
| Needs you | Needs you (`needsYouCount`) | Needs you | "Awaiting your signature": too long for the tab and disc. It stays as the Night Report heading |
| Permission | Permission | Permission | "Clearance": slower to read |
| Error | Error | Error | "Dead end": could mean a finished case |
| Waiting | Waiting | Waiting | — |
| New reply | New reply | New reply | "New lead": charming, but hides that Claude answered |
| Stalled | Stalled | Stalled | "Gone cold": the best candidate, but "cold case" suggests closed. Not instant enough |
| (notices) | Case opened, Case closed, Task done | same | — |

## 5. Bat-Clawd: Poses and the Signature pose

Today: sleeping (cape wrapped, seated, eyes shut, breath), flying (cape trailing in two frames, bob), alarmed (cape flung open, blink, shiver), and the perch watch (flying pose, a gust and a glance, four redraws per 12 s). Grid units below match `BatClawd.tsx` (body x 3–13, y 3–9; viewBox −6…22 × −1…12). Orange body, white eyes and the cowl stay in every Pose. The chest emblem, which Bat-Clawd doesn't have today, is new.

### Pose swaps

| Mood | Pose | Source moment | Verdict |
|---|---|---|---|
| sleeping | **Keep** the wrapped, seated cape | The film shows Batman at rest only in shadow; the wrapped cape already reads as "a shape in the dark" | No swap |
| flying | **Wingsuit glide** | The escape from the GCPD tower, cape turned into a ribbed wingsuit (official featurette "The Batman: Wingsuit", [IMDb video gallery](https://m.imdb.com/title/tt1877830/videogallery); staging **unverified**, from the film) | Adopt |
| alarmed | **The raised red flare** | The flooded arena: Batman leads the survivors to safety ([Wikipedia plot](https://en.wikipedia.org/wiki/The_Batman_(film)); track "The Bat's True Calling"). The flare itself is **unverified** in writing, from the film | Adopt |

**Wingsuit glide (flying).**
- Arms straight out: `[-1, 5.5, 4, 1]` and `[13, 5.5, 4, 1]`, legs together.
- The cape spans wrist to ankle. Left half: `M3 5 L-3 5.5 L-2.4 7.2 L-1.2 7 L-0.8 8.6 L0.6 8.2 L1.2 9.8 L3 9.6 Z`, mirrored with the existing `MIRROR`.
- Two ribs per side in the `clawd__thread` style (Dried Blood, 0.3 wide), running from the shoulder to each scallop point. That keeps the rule: small red details, never a red cape.
- Two frames on the existing flying cadence: level, then banked (±4° on the mover from the clock). The existing bob stays.

**Raised flare (alarmed).**
- Cape `open` as today. The left arm stays; the right arm goes up: `[13, 2, 1, 4]`.
- Flare stick in Ash at `[13, 0, 1, 2]`; flame at `[12.75, -1, 1.5, 1]` in Hot Signal.
- The flicker alternates the flame between Hot Signal (1.5 wide) and Pen Hot (1 wide) on `f % 2`, using the alarmed clock that already runs.
- A static `signal-glow` circle (r 2.5) sits behind the flame.
- The flare is the Alarm color, which is why it belongs here: red light held up means "something needs you". The shiver and blink stay.

### Signature pose: "Vengeance"

- **The scene it honours.** The subway fight on Halloween night: Batman walks out of the dark toward the gang, footsteps first, then the line. It was the first footage shown, at DC FanDome in August 2020 ([Rolling Stone AU](https://au.rollingstone.com/movies/movie-news/the-batman-trailer-robert-pattinson-16045)). "Vengeance" was also the production's working title ([Wikipedia](https://en.wikipedia.org/wiki/The_Batman_(film))). Exact staging: **unverified**, from the film.
- **Why not the alternatives.** The perch shows the Signature at rest, when nothing needs you (`watching = perched && mood !== 'alarmed'`), which is exactly when a held flare in the Alarm color would be wrong. The wingsuit is used for flying. The rooftop watch is already the perch's behavior.
- **The drawing.** Bat-Clawd stands front-on with the cape draped from the shoulders, not wrapped:
  - Two panels: left `M3 5 L1.6 5.4 L1.2 10.8 L3.2 10.6 Z`, mirrored. Arms hidden behind them; `LEGS` as today; `EYES_OPEN`.
  - The 2022 chest emblem, in `--cowl` on the orange: wings `[6, 6, 1.5, 0.6]` and `[8.5, 6, 1.5, 0.6]`, body `[7.4, 5.7, 1.2, 1.3]`. It needs judging at 60 px.
  - Still half in the dark: a black rect over y 8–11 at 55%.
  - No red beyond the approved cowl and cape edges.
- **On the perch** it stands still: no gusts (a draped cape has nothing to lift), only the existing `WATCH` glances. That gives fewer redraws than today on the transparent window.
- **In the intro and on click** it plays a one-off reveal, about 1 s on the 8 fps clock:
  - The shadow rect steps down from y 3 to y 8 over 4 ticks.
  - Two 1 px `translateY` "footsteps" land on ticks 2 and 4.
  - It holds, then the click case returns to the Mood's Pose.
  - It replaces the 0.7 s hop for this Theme. Reduced motion shows the final frame only.

## 6. Atmosphere

- **Is rain right? Yes.** Rain defines this Gotham. Chinlund picked the North for its weather ([Time Out quoting Radio Times](https://www.timeout.com/news/the-batman-8-things-you-might-have-missed-030422)). "Like much of the movie, a pivotal car chase scene takes place in torrential rain." For that chase the production chose to "wet down the road and cars, and add the falling rain as a CG element in post", rather than line a runway with rain towers ([AC](https://theasc.com/article/greig-fraser-batman/)). The score's third cue is "It's Raining Vengeance" ([soundtrack](https://en.wikipedia.org/wiki/The_Batman_(soundtrack))).
- **The rain is not on the shared clock (finding).** `Atmosphere.tsx` runs its own canvas loop at `FPS = 15` (a `setTimeout` plus `requestAnimationFrame`). It is gated to hover plus an 8 s linger, and its comment estimates "~5% of a core". `DESIGN.md` → One Clock Rule says rain is sampled from the 8 fps ticker; the code does not do that. Before rain becomes the reference Atmosphere for other Themes, either move it onto `ticker.ts` (8 fps, with streak length raised to cover the longer step) or record it in `DESIGN.md` as a deliberate exception. The other Themes' snow and ash will copy whichever it is.
- **Refinement 1: the flare light (recommended).** While the Mood is alarmed, the existing bottom glow (`.atmosphere__glow`, red at 16%) lifts once to about 26% over 0.45 s on the ease-out curve and stays until the alarm clears. That ties the Atmosphere to the flare pose. It is a one-off transition, not a loop: zero cost at rest.
- **Refinement 2: the flood (optional).** For the finale, when the seawall breaks and the city floods ([Wikipedia plot](https://en.wikipedia.org/wiki/The_Batman_(film))):
  - A static waterline 18–24 px from the bottom: a 1 px Bone line at 6%, a darker band under it, and the red glow mirrored and squashed into it.
  - Drops end at the line instead of the window edge, which costs nothing extra in the same canvas pass.
  - No ripple loop. At 300×360 the band costs height, so it should stay opt-in, or only appear in the Night Report's empty state.
- **Keep:** the static grain and the sodium-red haze.
- **Rejected:** lightning (a flash on a transparent always-on-top window draws the eye for no news), fog layers (blend modes are banned), and an animated Bat-Signal beam in the sky (the disc already is the signal).

## 7. The baseline for distinctiveness

A new Theme should differ from these on at least the first three axes:

| Axis | The Batman (2022) |
|---|---|
| Palette | Pure black page; warm near-blacks only as highlights; one family of reds as light and ink (Signal Red #af0006 as the base, Hot Signal #e3121b as the alarm); sodium amber for working; Clawd orange only on the mascot |
| Type | Condensed poster capitals (Anton) + narrow working sans (Barlow Semi Condensed) + typewriter stamps (Special Elite) + mono for machine output |
| Bat-Clawd silhouette | Short, upright cowl ears; black cowl and cape edged in Signal Red; a jagged bat-scalloped hem; black inside the cape with one Dried Blood thread; metal-plate chest emblem (new); Signature "Vengeance": draped cape, half in shadow |
| Atmosphere | Slanted rain from the left in three depths, a low red street-light glow, static film grain; flare-lift on alarm |
| Voice | Bruce's night journal and a detective's case file: short, present tense, bleak; "Case", "filed", "Awaiting your signature", "All quiet in Gotham"; no Lexicon, since it defines the standard words |

## Unverified items

- The flare-in-hand staging of the finale, the subway "walk out of the dark" staging, the wingsuit's ribbed look, and the narration being read from a handwritten journal: all from the film, not confirmed in a written source.
- Fraser's remark that the red complements the matte suit (secondhand, via Sportskeeda citing Collider).
- The exact trailer wording "I'm vengeance" in a primary written source. Rolling Stone AU says only "on the search for 'vengeance'".
- Chinlund's DIY quotes (TechRadar, Yahoo/AOL): the full articles could not be fetched; the wording comes from search excerpts.
- Any direct statement by Giacchino on the main theme's character; only timing, track titles and critics' descriptions were retrieved.
- The chest emblem's legibility at 60 px, and all pixel coordinates in §5: drafts to be judged when drawn.

## Sources

- American Cinematographer: [Truth in the Image: Greig Fraser, ASC, ACS (Jay Holben, 25 May 2022)](https://theasc.com/article/greig-fraser-batman/)
- TheWrap: [Greig Fraser on The Batman's "urban noir" (Adam Chitwood, 7 Mar 2022)](https://www.thewrap.com/the-batman-cinematography-greig-fraser-interview/)
- The Ringer: [From Noir to Nirvana (Miles Surrey, 23 Feb 2022)](https://www.theringer.com/2022/02/23/movies/the-batman-movie-preview-comparisons-nirvana-noir-zodiac), quoting Reeves in Esquire and Pattinson in GQ
- Time Out: [The Batman: 8 things you might have missed (Olly Richards, 7 Mar 2022)](https://www.timeout.com/news/the-batman-8-things-you-might-have-missed-030422), quoting Chinlund in Radio Times
- CBS News / ET: [First look at the Batsuit (Meredith B. Kile, 13 Feb 2020)](https://www.cbsnews.com/news/robert-pattinson-wears-cape-and-cowl-in-first-look-from-upcoming-film-the-batman)
- TechRadar: [How the production created a DIY Bruce Wayne](https://www.techradar.com/news/the-batman-how-the-production-created-a-diy-slimmed-down-bruce-wayne)
- Yahoo via AOL: [Pattinson breaks down the suit](https://www.aol.com/news/robert-pattinson-breaks-down-batman-171048255.html) (404 on 2026-10-09)
- Rolling Stone: [First trailer, AU (Daniel Kreps, 24 Aug 2020)](https://au.rollingstone.com/movies/movie-news/the-batman-trailer-robert-pattinson-16045) · [Second trailer (Oct 2021)](https://www.rollingstone.com/tv-movies/tv-movie-news/the-batman-new-trailer-catwoman-the-penguin-1243158)
- Wikipedia: [The Batman (film)](https://en.wikipedia.org/wiki/The_Batman_(film)) · [The Batman (soundtrack)](https://en.wikipedia.org/wiki/The_Batman_(soundtrack)) · [Batsuit](https://en.wikipedia.org/wiki/Batsuit) · [David Crossman](https://en.wikipedia.org/wiki/David_Crossman_(costume_designer)) · [Jacqueline Durran](https://en.wikipedia.org/wiki/Jacqueline_Durran)
- IMDb: [The Batman video gallery (Wingsuit featurette)](https://m.imdb.com/title/tt1877830/videogallery)
- Reviews and criticism: [CLTure review](https://clture.org/the-batman-review/) · [Sportskeeda on the film's look](https://www.sportskeeda.com/comics/why-the-batman-visually-stunning-comic-book-film) · [Joe's Video Club retrospective](https://joesvideoclub.substack.com/p/retrospective-the-batman-2022)
- In the repo: `CONTEXT.md`, `PRODUCT.md`, `DESIGN.md`, `NOTICE`, `app/src/renderer/src/styles/theme.css`, `app/src/renderer/src/components/BatClawd.tsx`, `Atmosphere.tsx`, `Atmosphere.css`, `Cards.tsx`, `NightReport.tsx`, `Sheets.tsx`, `app/src/renderer/src/ticker.ts`, `app/src/shared/view.ts`, `app/src/shared/notices.ts`
