# Batcave

> A tiny window in the corner of your screen that watches your **Claude Code** sessions like the Bat-Computer.

<p align="center">
  <img src="docs/screenshots/needs-you.png" width="300" alt="The needs-you list: a permission prompt, an error, a wait, a new reply and a stalled task, each stamped in red">
  &nbsp;&nbsp;
  <img src="docs/screenshots/case-detail.png" width="300" alt="A case: its tasks, subagents, background commands and last words">
</p>

**Status:** under construction (v0). See the [roadmap](docs/ROADMAP.md).

Batcave is a small desktop app that stays on top of your other windows and:

- tells you when a Claude Code session finishes replying;
- shows which sessions are active and what each one is doing (tasks, subagents, background commands);
- tells you when tasks finish;
- gathers everything that **needs you** in one place (permission prompts, Claude waiting for input, errors);
- has a mascot: **Bat-Clawd**, Claude Code's Clawd in a cowl. It sleeps upside down when all is quiet, takes off when a session is working and turns red-eyed when something needs you.

The look is inspired by the reds and blacks of *The Batman* (2022): every session is a case file, every alert a red ink stamp, with rain falling behind it all.

## A closer look

| Cases | Task drawer | All quiet |
|---|---|---|
| <img src="docs/screenshots/cases.png" width="240" alt="Case cards with case numbers, status, task progress and Claude's last words"> | <img src="docs/screenshots/task-drawer.png" width="240" alt="A drawer with a task's brief and timeline"> | <img src="docs/screenshots/all-quiet.png" width="240" alt="Nothing pending: Bat-Clawd hangs asleep from the top edge"> |

| Settings | Pill mode |
|---|---|
| <img src="docs/screenshots/settings.png" width="240" alt="Settings: animations, rain, always on top, opacity"> | <img src="docs/screenshots/pill.png" width="232" alt="The window shrunk to a pill with the emblem, the count and Bat-Clawd"> |

Screenshots use made-up data (`npm run shots`), never real sessions.

## Getting started

Requirements: Windows 10/11, Node.js 24+ and Claude Code.

```bash
cd app
npm install
npm run dev
```

Batcave already works from the files Claude Code writes. For instant alerts, including permission prompts, install the plugin:

```bash
claude plugin marketplace add lucas-moont/batcave
claude plugin install batcave@batcave
```

The plugin is observe-only and does nothing when the app is closed. Details in [docs/plugin.md](docs/plugin.md).

Drag the window by its header, resize it from any edge, or shrink it to a pill. It reopens where you left it.

## Light on resources

A window parked in a corner all day has to be cheap. Every looping effect runs off one clock ticking eight times a second instead of 60 fps CSS animations, Bat-Clawd is a flip-book of finished poses, and the rain only falls while you are looking. Measured idle cost: about **1% of one CPU core** when all is quiet, about **4%** while alerts pulse.

---

Fan project. Not affiliated with Warner Bros., DC Comics or Anthropic.

License: [MIT](LICENSE).
