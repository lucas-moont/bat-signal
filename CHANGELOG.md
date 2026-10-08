# Changelog

All notable changes to Bat-Signal are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.0-rc.1] - 2026-10-08

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

- Bat-Clawd's cape is black inside, with a thin red thread along its hem.
- Much lighter at rest: the disc uses 0.1–0.2% of one core, the watch strip 0.4–0.8%.

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

- Bat-Clawd wears a cape instead of wings: wrapped in it asleep, streaming behind him in flight, flung open when something needs you.

## [0.3.0] - 2026-10-04

### Added

- The case-file panel: Needs you, the cases, a case's detail, a task's drawer and Settings, in the reds and blacks of *The Batman* (2022), with rain behind it.
- Bat-Clawd, Claude Code's Clawd in a cowl: asleep, on patrol or alarmed.

## [0.2.0] - 2026-10-04

### Added

- The Claude Code plugin: hooks report permission prompts, waits, errors and finished replies the moment they happen. It only observes.
- A local hook server on `127.0.0.1:47777`, and one store for every session.

## [0.1.0] - 2026-10-04

### Added

- Live sessions rebuilt from the files Claude Code already writes: titles, messages, tasks, subagents and background commands, and what needs you.

[Unreleased]: https://github.com/lucas-moont/bat-signal/compare/v1.0.0-rc.1...HEAD
[1.0.0-rc.1]: https://github.com/lucas-moont/bat-signal/compare/v0.7.0...v1.0.0-rc.1
[0.7.0]: https://github.com/lucas-moont/bat-signal/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/lucas-moont/bat-signal/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/lucas-moont/bat-signal/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/lucas-moont/bat-signal/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/lucas-moont/bat-signal/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/lucas-moont/bat-signal/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/lucas-moont/bat-signal/releases/tag/v0.1.0
