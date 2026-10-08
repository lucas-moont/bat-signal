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

- The installer is not code-signed yet, so Windows SmartScreen warns about it, and Smart App Control blocks it. See [`docs/research/code-signing.md`](docs/research/code-signing.md).

[Unreleased]: https://github.com/lucas-moont/bat-signal/compare/v1.0.0-rc.1...HEAD
[1.0.0-rc.1]: https://github.com/lucas-moont/bat-signal/compare/v0.7.0...v1.0.0-rc.1
