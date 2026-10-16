# Changelog

All notable changes to Bat-Signal are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Linux**, from source for now: `npm run dist:linux` builds an AppImage. Sessions, the tray, notifications and Start at sign-in (an XDG autostart entry) work on any desktop. On Hyprland 0.55 and later, the disc, the panel and the strip open in their corner, float above the tiles on every workspace, follow a drag, and the terminal button brings the session's terminal forward; no sound plays while something is full screen. Elsewhere on Wayland the compositor places the windows, and the terminal button copies `claude --resume`. See [Linux](https://github.com/lucas-moont/bat-signal#linux) in the README.
- `--toggle`: launching Bat-Signal again with it does what the global shortcut does, for desktops where an app cannot hold one (Wayland): bind a key to `bat-signal --toggle`.

- **BECOME A BAT**, a fifth Theme and the first after a comic: Frank Miller and David Mazzucchelli's *Batman: Year One* (1987). Gordon's notebook from his first year in a crooked city: an olive-khaki grime, his canary for what waits on you, and the flat red of the collected edition's cover only when something needs you. It speaks in Gordon's voice, with SIGN HERE, GONE WRONG, SEE ME and MEMO, and the night report becomes his Notebook, dated as the book dates a scene, its headings in canary caption boxes. Smoke rises off the street behind the panel. Bat-Clawd wears the first suit, grey with a black collar, a canary belt and Year One's own bat; the intro and a click play **The swarm**: bats rise up his side and gather over his head.
- **ANCIENT GRACE**, a sixth Theme, after Frank Miller's *The Dark Knight Returns* (1986). A television left on in a dark room in 1986, in the book's icy night: Lightning Cyan, the edge of the bolt the old man leaps across, only when something needs you, and the storm sky's blue for what waits on you. It speaks like a late-night broadcast: cases are channels, what needs you is your cue, the stamps say OK TO AIR?, DEAD AIR, YOU'RE ON and LATEST in comic cover lettering, and the night report becomes the Bulletin, dated LIVE. Static flickers behind the panel, a roll bar drifting down it, and the lit disc is a screen with scanlines. Bat-Clawd is the old man, his huge shoulders rising to his jaw, in the second suit, grey with its wide black bat, his cape thrown over his shoulders when something needs you; the intro and a click play **The lightning leap**, held like a freeze-frame with a white bolt lit blue behind him (a closer take on the Book One cover's pose is coming in #128).
- **BLUE COLLAR**, a seventh Theme, after Scott Snyder and Nick Dragotta's *Absolute Batman* (2024), coloured by Frank Martin. Black ink on a violet night, and the comic's sound-effect lemon only when something needs you. It speaks like a city engineer on the night shift, with PERMIT?, BLOWN, ASKING and JAMMED stamped in blocky sign lettering, and the night report becomes his Shift notes, written in a designed hand. A colony of bats crosses under the masthead, and the lit disc is one flat field of lemon. Bat-Clawd wears the working suit: teal over huge shoulders under black spiked pads, striped forearms, the chest block that comes off as an axe when something needs you, an olive belt and black trunks; the intro and a click play **The stand** from the #1 cover, the cape pulled across him in an X.

### Changed

- The plugin (0.5.0) runs `curl` itself, with no shell, so its hooks work on Linux and macOS too. The reply still never reaches Claude Code: it goes to a file in the plugin's data folder that nothing reads. Update with `claude plugin update bat-signal@bat-signal`.

## [1.2.0] - 2026-10-14

Three film Themes join The Batman (2022), each a version of Batman with its own palette, type, words, Atmosphere and Bat-Clawd.

### Added

- **PALE MOONLIGHT**, a second Theme, after Tim Burton's *Batman* (1989). Gold over a smoggy brown-black, gold only when something needs you, and the 1989 bat in its oval. It speaks of Stories on Your desk, with APPROVAL, TROUBLE, QUESTION, JUST IN and NO WORD stamps and a Late edition for the night report. Snow falls behind the panel. Bat-Clawd wears Keaton's suit, with the oval on his chest that lights up, and a cape cut like the film's. Pick it in Settings → Look.
- **WATCHFUL PROTECTOR**, a third Theme, after Christopher Nolan's *Dark Knight* trilogy. A cold blue-black of steel glass and fluorescent white, nothing warm at rest, and the trilogy's bat. Something that needs you burns Blue Flame. It speaks of Ops On you, with CLEARANCE, FAULT, YOUR MOVE, CHECKED IN and NO CONTACT as straight stencilled labels, and the night report becomes a printed Sitrep. A skyline stands behind the panel, its windows switching on and off. Bat-Clawd wears the plated *Dark Knight* suit with a bronze belt; his cape stiffens into a glider, and the intro and a click play **Sonar**: a ring spreads from his lenses.
- **KNIGHTMARE**, a fourth Theme, after Zack Snyder's *Batman v Superman* and *Justice League*. The Knightmare's desert in amber: brown-black shadows lit by a cream sky, sand for what waits, and Superman's crimson only when something needs you. It speaks of Your call, with AUTHORIZE, DAMAGED, ORDERS?, NEW INTEL and STUCK, and Alfred's dry care. Ash and sand blow sideways behind the panel. Bat-Clawd wears the Knightmare's desert gear: a brown duster, goggles up on the cowl, a rust scarf; the intro and a click play **Knightmare**, the coat snapping in the wind.
- `settings.json` keeps the Theme (`"theme"`, The Batman (2022) by default; an unknown one falls back to it).
- Editing `settings.json` by hand while Bat-Signal runs applies at once. A file that doesn't parse is ignored, and keys left out keep their values.
- A **Theme picker** at the top of Settings → Look: each Theme a case-file folder with its Bat-Clawd, its stamp in its Alarm color, its name and the film it follows. A click or the arrow keys switch, live.
- A **Theme words** switch in Settings, under Look (`"lexicon"`, on by default). Off, the panel and the disc use the standard names for cases, Needs you and the stamps whatever the Theme. Windows notifications and the tray always do. The Batman (2022) has no names of its own, so the switch changes only other Themes' words.

### Changed

- The rain is a Theme's **Atmosphere**: `settings.json` keeps it as `"atmosphere"`, and an old `"rain"` carries over, so rain turned off stays off.
- The rain falls on the clock every other effect shares, at 8 steps a second instead of its own 15, with longer streaks so it still reads as rain.
- Bat-Clawd wears a suit in The Batman (2022): charcoal over his body, dark gloves, belt and boots, the cowl down to his eyes and his orange as his jaw. A faint pale rim replaces the red edges on his cowl and cape; red now glows around him only while something needs you.
- In flight he glides in the wingsuit. When something needs you he raises a red flare. The intro and a click on him play **Out of the dark** (in place of the hop): he steps out of his shadow, cape draped. On the watch strip he stands that way.

## [1.1.2] - 2026-10-09

### Changed

- The scratches on the bat emblem are softer: they dim it instead of cutting through.

## [1.1.1] - 2026-10-09

### Changed

- The bat beside BAT-SIGNAL is bigger, and so are the ones on the disc and the watch strip.
- Bat-Clawd wears the bat on his chest whenever his cape leaves it bare.

## [1.1.0] - 2026-10-09

### Added

- **All notifications** in Settings turns every kind of Windows toast on or off at once, and says how many are on.

### Changed

- The bat emblem follows the shape of the symbol from *The Batman* (2022), in the header, the disc, the tray, the toasts and the installer.

## [1.0.1] - 2026-10-09

### Changed

- One sound: the spotlight, when Claude needs you or replies. A task done is quiet, and the thump is gone.

### Fixed

- Turning on a switch near the bottom of Settings (Sound) no longer blacks out the panel.

## [1.0.0] - 2026-10-07

The first version anyone can install. Since 0.7.0:

### Added

- A Windows installer, `Bat-Signal-Setup-1.0.0.exe`: for the current user, with no admin prompt, in the Start menu, and an uninstall that removes the login entry and keeps your settings.
- Releases on GitHub, built and checked from a tag, with a `SHA256SUMS.txt` to check the download against.
- Docs on how Bat-Signal works, what it reads and writes, the plugin and the design, in [`docs/`](https://github.com/lucas-moont/bat-signal/tree/main/docs).

### Changed

- The installed app's toasts say "Bat-Signal" from the first one.
- A development build runs beside an installed Bat-Signal, with its own settings.

### Security

- The plugin's hooks give Claude Code nothing back, so no program answering on port 47777 can approve a permission, block a turn or add to Claude's context. Update an installed plugin with `claude plugin update bat-signal@bat-signal` (0.4.0).
- The windows stay on Bat-Signal's own page, and only that page can talk to the app.

### Notes

- The installer is not code-signed yet. Windows SmartScreen warns about it ("More info", then "Run anyway"), and Smart App Control blocks it. See ["Windows protected your PC"](https://github.com/lucas-moont/bat-signal#windows-protected-your-pc).

## [1.0.0-rc.2] - 2026-10-07

The second release candidate for v1.0: what a security review found before it, fixed.

### Security

- The plugin's hooks post each event from a background command and discard the reply, so no program that answers on port 47777 can approve a permission, block a turn or add to Claude's context. Before plugin 0.4.0 they were HTTP hooks, whose replies Claude Code acts on. Update the plugin with `claude plugin update bat-signal@bat-signal`.
- Bat-Signal's windows refuse to navigate away from its own page or open new windows, and only its own page can talk to the app.

## [1.0.0-rc.1] - 2026-10-07

The first build anyone can install: a release candidate for v1.0.

### Added

- A Windows installer, `Bat-Signal-Setup-<version>.exe`. It installs for the current user, with no admin prompt, adds Bat-Signal to the Start menu, and uninstalls cleanly: the login entry goes, the settings stay.
- Releases on GitHub, built and checked from a tag, with a `SHA256SUMS.txt` to check the download against.

### Changed

- The installed app's toasts say "Bat-Signal" from the first one, since the installer gives Windows its Start menu shortcut ahead of time.
- A development build runs beside an installed Bat-Signal, with its own settings, instead of waking it.

### Notes

- The installer is not code-signed yet, so Windows SmartScreen warns about it, and Smart App Control blocks it. See [`docs/research/code-signing.md`](https://github.com/lucas-moont/bat-signal/blob/main/docs/research/code-signing.md).

## [0.7.0] - 2026-10-07

Comfort for every day.

### Added

- A tray icon, lit red while something needs you, with a menu to show or hide Bat-Signal, switch between the disc, the panel and the watch strip, open Settings and quit.
- A global shortcut, Ctrl+Alt+B by default and changeable in Settings, that opens and folds Bat-Signal from any app.
- Start with Windows, waking quietly as the disc; the switch shows when Task Manager has turned it off.
- Optional Windows toasts, per kind of news: one toast per burst, never the same news twice, a click opens the case.
- Optional sound: a spotlight coming on when Claude needs you or replies, a thump when a task is done, quiet in full screen.
- Bat-Clawd keeps watch from a perch on the watch strip.
- Live status without the plugin: a finished reply is noticed when a session goes from busy to idle, and Needs you says when the plugin is silent.

### Changed

- Working sessions are inked amber, apart from the red of what needs you.
- Settings come in ruled groups, starting with Look, and the panel's layout follows its own width.
- Bat-Clawd's cape is black inside, with a thin red thread along its hem.
- Much lighter at rest: the disc uses 0.1–0.2% of one core, the watch strip 0.4–0.8%.

### Fixed

- The panel and the watch strip stay on top after a screenshot.

## [0.6.0] - 2026-10-04

A corner companion.

### Added

- Go to the terminal from every case and every Needs you item: the session's Windows Terminal window and tab come to the front, or the resume command is copied.
- The watch strip: one row per session, to follow the work from the corner.
- The night report theme: what awaits your signature, typed, with stamps in the margin.

### Changed

- A smaller, denser panel by default.

## [0.5.0] - 2026-10-04

### Changed

- Batcave is now Bat-Signal, and so is its plugin (`bat-signal@bat-signal`). Settings and the window's place carry over from Batcave on first run.

## [0.4.0] - 2026-10-04

### Added

- The Bat-Signal: Bat-Signal rests as a small disc that lights up on news and sends a notice card up its beam; a click opens the panel on that case.

### Changed

- The panel folds into the Bat-Signal instead of a pill.
- Bat-Clawd wears a cape instead of wings: wrapped in it asleep, streaming behind him in flight, flung open when something needs you.

## [0.3.0] - 2026-10-04

### Added

- The case-file panel: Needs you, the cases, a case's detail and a task's drawer, in the reds and blacks of *The Batman* (2022), with rain behind it.
- Bat-Clawd, Claude Code's Clawd in a cowl: asleep, on patrol or alarmed.
- Settings for animations, rain, always on top and opacity, and a calm mode with gentler motion.
- A pill the panel folds into, opened by resting the pointer on it.
- The window remembers its size and place.

## [0.2.0] - 2026-10-04

### Added

- The Claude Code plugin: hooks report permission prompts, waits, errors and finished replies the moment they happen. It only observes.
- A local hook server on `127.0.0.1:47777`, and one store for every session.
- The first window: a list of live sessions under a draggable header with the bat emblem, resizable down to 300x360.

## [0.1.0] - 2026-10-04

### Added

- Live sessions rebuilt from the files Claude Code already writes: titles, messages, tasks, subagents and background commands, and what needs you.

[Unreleased]: https://github.com/lucas-moont/bat-signal/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/lucas-moont/bat-signal/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/lucas-moont/bat-signal/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/lucas-moont/bat-signal/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/lucas-moont/bat-signal/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/lucas-moont/bat-signal/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/lucas-moont/bat-signal/compare/v0.7.0...v1.0.0
[1.0.0-rc.2]: https://github.com/lucas-moont/bat-signal/compare/v1.0.0-rc.1...v1.0.0-rc.2
[1.0.0-rc.1]: https://github.com/lucas-moont/bat-signal/compare/v0.7.0...v1.0.0-rc.1
[0.7.0]: https://github.com/lucas-moont/bat-signal/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/lucas-moont/bat-signal/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/lucas-moont/bat-signal/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/lucas-moont/bat-signal/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/lucas-moont/bat-signal/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/lucas-moont/bat-signal/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/lucas-moont/bat-signal/releases/tag/v0.1.0
