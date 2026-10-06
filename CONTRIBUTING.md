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

CI runs exactly these commands.

In development, Start with Windows registers this checkout's `electron.exe` with the app folder, which loads `out/`: run `npm run build` before signing out to try it, and switch it off before moving the checkout.

Windows shows toasts only from an app it knows by a Start menu shortcut. In development, Electron adds one (`Electron`, for this checkout's `electron.exe`) with the first toast, and Windows drops that first one: the next ones show. The installer will add the shortcut ahead of time.

The tray and toast icons in `app/resources/tray/` are drawn from the bat in `BatEmblem.tsx`: after changing it, run `npm run icons` and commit the result.

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
