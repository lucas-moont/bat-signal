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
- **Themes:** each Theme dresses Bat-Signal as one version of Batman, from a film or a comic (see `CONTEXT.md` and `docs/adr/0001-many-themes-and-the-homage-line.md`). The default is **VENGEANCE**, after The Batman (2022): its reds and blacks, the noir case-file mood. Every Theme is dark, and keeps one Alarm color for "something needs you" alone.
- **Mascot:** Bat-Clawd, Claude Code's pixel Clawd in the suit of the active Theme's Batman: the suit over his body, the cowl down to his eyes, the version's bat symbol on his chest, and its cape or coat. Every Theme keeps Clawd's shape, his white eyes, his orange jaw and his three moods. Red, or the Theme's own Alarm color, reaches him only as an aura while something needs you.
- **Resting form:** the Bat-Signal disc in the screen corner that lights up.
- This is a fan project with no affiliation to Warner Bros., DC or Anthropic. Each Theme's bat emblem follows the symbol of its version of Batman, redrawn as a vector and credited to DC as a trademark; it is used here as fan art. VENGEANCE's follows the symbol from The Batman (2022). Title wordmarks, film or comic images, commercial fonts and long dialogue are never used.

## Evidence on Hand

- The approved design, git tag `design-approved-v1`, with screenshots in `docs/screenshots/`.
- Real CPU measurements on the real windows (README, "Light on resources").
- No users, testimonials or adoption numbers exist. None may be invented.

## Product Principles

1. **The corner speaks first.** The resting signal must answer "does anything need me?" without a click.
2. **Never cry wolf.** Announce only real news, once. Old state is not news.
3. **Watch, never touch.** Observe sessions; acting on them is a later, explicit decision.
4. **Cheap to keep open.** Every effect earns its CPU.
5. **Character in the details.** The themes and the mascot make it worth keeping, without slowing the glance.
