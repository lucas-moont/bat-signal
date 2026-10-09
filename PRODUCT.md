# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

The UI is web technology (React 19 in Electron's renderer), shipped as a Windows desktop app. Windows is the only target today; macOS and Linux are v3 ideas in `docs/ROADMAP.md`.

## Users

The primary user is the author, and developers like them: one person running several Claude Code sessions at once, in different terminals, all day. Their job is to keep every session moving without babysitting terminals: know when a session finished, asked for permission or is waiting for input, and see what each one is doing. The public repository doubles as a showcase.

## Product Purpose

Bat-Signal watches the user's Claude Code sessions and tells them, from a corner of the screen, when something needs them. Success, all four confirmed:

- **Never miss a request.** No permission prompt or question from Claude sits unanswered without the user knowing.
- **Know at a glance.** One look at the corner says whether anything needs them, without switching windows.
- **Understand progress.** Opening the panel shows in seconds what each session is doing and how far along it is.
- **Pleasant to keep around.** It has personality (the theme, the mascot) and is something worth leaving open all day.

## Positioning

It reads the files Claude Code already writes (`~/.claude/sessions/`, the transcripts) and, with its observe-only plugin, gets Claude Code's hooks the moment they fire, including permission prompts. It never acts on a session (v1 only observes). It lives as a small always-on-top signal rather than a window to visit.

## Operating Context

- A Windows desktop, a terminal or editor in front, Bat-Signal parked in a screen corner, always on top.
- At rest it is a 64px Bat-Signal disc. News lights it and a notice card rises from it for a few seconds. A click opens the panel (320x440 by default, resizable, minimum 300x360), anchored at the same corner.
- The panel has two lists, **Needs you** (permission, error, waiting, new reply, stalled) and **Cases** (one per session), a case detail (tasks, subagents, background commands, last words), a task drawer and settings.
- Sessions are called **cases**. Alerts read like red ink **stamps**.

## Capabilities and Constraints

- **Observe-only.** It never approves, denies or sends anything to a session.
- **Light on resources.** About 1% of one CPU core at rest, measured on the real windows. Looping effects run off one shared 8 fps clock; infinite CSS animations are not allowed. The signal window is transparent, which is costly to redraw on Windows.
- **Respects reduced motion** and an in-app animations switch.
- **Privacy.** It never reads `~/.claude/sessions/*.key`. Screenshots and fixtures use made-up data only.
- **Demo data** for design work: the renderer opens with `#demo`, `#demo-quiet`, `#demo-busy` or `#demo-news`, and `?view=signal` for the disc.
- **Undecided.** Windows toasts (opt-in, phase 4), tray, global shortcut, start with Windows, "go to terminal", sound. Email, calendar and automations are brainstorm ideas only.

## Brand Commitments

Binding for any design direction:

- **Name:** Bat-Signal (formerly Batcave).
- **Theme:** The Batman (2022): its reds and blacks, the noir case-file mood.
- **Mascot:** Bat-Clawd, Claude Code's orange pixel Clawd in a black cowl outlined in red and a black cape with red accents, with white eyes.
- **Resting form:** the Bat-Signal disc in the screen corner that lights up.
- This is a fan project with no affiliation to Warner Bros., DC or Anthropic. The bat emblem follows the shape of the symbol from The Batman (2022), a trademark of DC; it is used here as fan art.

## Evidence on Hand

- The approved design, git tag `design-approved-v1`, with screenshots in `docs/screenshots/`.
- Real CPU measurements on the real windows (README, "Light on resources").
- No users, testimonials or adoption numbers exist. None may be invented.

## Product Principles

1. **The corner speaks first.** The resting signal must answer "does anything need me?" without a click.
2. **Never cry wolf.** Announce only real news, once. Old state is not news.
3. **Watch, never touch.** Observe sessions; acting on them is a later, explicit decision.
4. **Cheap to keep open.** Every effect earns its CPU.
5. **Character in the details.** The theme and the mascot make it worth keeping, without slowing the glance.
