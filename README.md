# Batcave

> A tiny window in the corner of your screen that watches your **Claude Code** sessions like the Bat-Computer.

**Status:** under construction (v0). See the [roadmap](docs/ROADMAP.md).

Batcave is a small desktop app that stays on top of your other windows and:

- tells you when a Claude Code session finishes replying;
- shows which sessions are active and what each one is doing (tasks, subagents, background commands);
- tells you when tasks finish;
- gathers everything that **needs you** in one place (permission prompts, Claude waiting for input, errors);
- has a mascot: Bat-Clawd.

The look is inspired by the reds and blacks of *The Batman* (2022).

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

---

Fan project. Not affiliated with Warner Bros., DC Comics or Anthropic.

License: [MIT](LICENSE).
