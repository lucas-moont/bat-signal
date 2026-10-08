# Design

Bat-Signal's look and its rules are written down in two files at the repository root. Read them before changing anything a user sees.

- **[`PRODUCT.md`](../PRODUCT.md)** says who Bat-Signal is for and what it must do: one person running several Claude Code sessions, who should never miss a request and should know at a glance whether anything needs them. It holds the binding brand commitments (the name, The Batman (2022) theme, Bat-Clawd, the disc as the resting form) and five principles, such as "never cry wolf" and "watch, never touch".
- **[`DESIGN.md`](../DESIGN.md)** is the design system, "The Noir Case File": the color tokens, type scale and component specs in its front matter, then the reasoning in prose. Red always means something, everything sits on pure black, stamps are the signature mark, and every loop runs off one shared 8 fps clock. It ends with a list of do's and don'ts. `.impeccable/design.json` is the same system in machine-readable form.

The approved baseline is the git tag `design-approved-v1`: the signal disc, the case-file panel and the caped Bat-Clawd. Later work builds on it; compare against it before a large visual change.

## The promise

Every change keeps these three:

- **A corner companion, not a big screen.** Bat-Signal rests as a 64px disc and opens a small panel. Compact is the default; nothing should need a big window to make sense.
- **Needs you and Cases stay separate.** What waits for the user and the list of sessions are two lists, never merged into one.
- **Go to the terminal from everywhere.** Any place that shows a session offers the way to its terminal.

## Screenshots

`npm run shots` (from `app/`) builds the app and renders every picture in [`screenshots/`](screenshots/), except `tray.png` (see Icons), from the demo night in `app/src/shared/demo.ts`, a made-up Gotham with no real sessions in it (`app/scripts/shots.cjs`). Re-run it after a visual change and commit the pictures with the change. Never take a screenshot of real sessions for the repository.

The renderer serves the same demo data while you work on a design: open it with `#demo`, `#demo-quiet`, `#demo-busy` or `#demo-news`, and `?view=signal` for the disc.

## Icons

The tray and toast icons in `app/resources/icons/`, and `screenshots/tray.png`, are drawn by `npm run icons` (`app/scripts/icons.mts`) from the bat in `app/src/renderer/src/components/BatEmblem.tsx`, so the bat has one source. After changing the emblem, run it and commit the result; `app/test/icons.test.ts` fails when the icons fall behind.
