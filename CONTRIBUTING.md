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
