# Contributing to Bat-Signal

Thanks for your interest. The project is small, and so are the rules.

## Running locally

Requirements: Windows 10/11, Node.js 24.2+ (the privacy check runs TypeScript directly and uses `import.meta.main`) and Claude Code installed.

```bash
cd app
npm install
npm run dev
```

## Before opening a PR

```bash
cd app
npm run format:check
npm run lint
npm run typecheck
npm test
```

CI runs exactly these commands, then builds the installer and checks it (below).

## Development beside the installed app

A development run is a different app to Windows: its id is `com.lucasmoont.bat-signal.dev` and its settings live in `%APPDATA%\Bat-Signal Dev`, so it runs beside an installed Bat-Signal and never touches its settings or its login entry. Only one of them can listen for the plugin on `127.0.0.1:47777`, the first one started; the other works from Claude Code's files alone.

In development, Start with Windows registers this checkout's `electron.exe` with the app folder, which loads `out/`: run `npm run build` before signing out to try it, and switch it off before moving the checkout.

Windows shows toasts only from an app it knows by a Start menu shortcut. In development, Electron adds one (`Electron`, for this checkout's `electron.exe`) with the first toast, and Windows drops that first one: the next ones show, under Electron's icon in their header. The installer adds Bat-Signal's own shortcut ahead of time, so the installed app's toasts say Bat-Signal from the first one.

The tray and toast icons in `app/resources/icons/` are drawn from the bat in `BatEmblem.tsx`: after changing it, run `npm run icons` and commit the result.

## Building the installer

```bash
cd app
npm run pack   # the app folder only: release/win-unpacked/Bat-Signal.exe
npm run dist   # the installer: release/Bat-Signal-Setup-<version>.exe
```

The installer is unsigned for now (see [`docs/research/code-signing.md`](docs/research/code-signing.md)). On a PC with Smart App Control on, Windows blocks it, and `npm run dist` with it, since electron-builder runs the new installer to write its uninstaller; `npm run pack` still works there. CI builds the installer on every PR and runs [`app/scripts/installer-check.ps1`](app/scripts/installer-check.ps1): a silent install, the app started, an update, and an uninstall that removes the login entry but keeps the settings.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(scope): ...` new feature
- `fix(scope): ...` bug fix
- `test(scope): ...` tests
- `refactor(scope): ...` internal change, same behavior
- `docs: ...`, `style: ...`, `chore: ...`, `ci: ...`, `perf: ...`

Small commits, one topic each.

## Privacy

Bat-Signal reads files from the user's `~/.claude/` folder. **Never** put real transcript excerpts, personal paths, prompts or tokens in issues, PRs or test fixtures. The fixtures in `app/test/fixtures/` are synthetic on purpose.

`npm test` also scans every tracked file for real user folders, personal emails, tokens, your username and the ids of your Claude sessions (those last two are read on your machine at run time and never stored). `npm run privacy` runs that scan alone and lists what it found. Use the fictional people the fixtures already use (`bruce`, `alfred`); a test that needs a made-up leak builds it at run time (see `app/test/privacy.test.ts`).

The `~/.claude/sessions/*.key` files hold secrets and must **never** be read by the app.
