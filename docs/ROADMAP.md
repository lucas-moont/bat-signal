# Roadmap

Where Bat-Signal can go. The order inside each version is a suggestion. After v1 ships there will be a feedback round to decide what actually goes into v2.

## v1: "the Bat-Computer watches"

Observe only. Never acts on sessions.

Shipped in v1.0.0, with a Windows installer from [Releases](https://github.com/lucas-moont/bat-signal/releases).

- [x] List of active Claude Code sessions with status (working / idle / needs you)
- [x] Session detail: tasks, subagents, background commands, latest messages
- [x] Task detail (click): description, status history
- [x] "Needs you" panel: permission prompts, Claude waiting for input, errors
- [x] Bat-Signal notices: needs you, finished replying, task completed, session opened/closed (Windows toasts optional)
- [x] Claude Code plugin with hooks (alerts at the exact moment), which give Claude Code nothing back
- [x] "Go to terminal": brings the session's window to the front and selects its Windows Terminal tab
- [x] Bat-Clawd, the caped mascot, with states (sleeping, flying, alarmed)
- [x] Animations: Bat-Signal intro, rain, transitions
- [x] System tray, global shortcut, start with Windows
- [x] Windows installer (per user, unsigned for now) and releases built from a tag

After v1.0: sign the installer through SignPath Foundation, so Smart App Control lets it run; see [code-signing.md](research/code-signing.md).

## v1.x: themes, one version of Batman each

Each theme dresses Bat-Signal as one version of Batman: palette, type, Bat-Clawd's costume and poses, the emblem, the disc, the Atmosphere behind the panel and the words. VENGEANCE, after The Batman (2022), stays the default. Themes ship in waves, each opened by research and a design jury ([`docs/research/themes/`](research/themes/)) and closed by a release. Tracked in [#70](https://github.com/lucas-moont/bat-signal/issues/70).

- [ ] Wave 0, the foundation: every colour and word from the theme, live switching, per-theme poses, the Lexicon switch, the Atmosphere, the picker
- [ ] Wave 1, films (v1.2): PALE MOONLIGHT (Burton), WATCHFUL PROTECTOR (Nolan), KNIGHTMARE (Snyder), and a refreshed VENGEANCE Bat-Clawd
- [ ] Wave 2, comics (v1.3): The Dark Knight Returns, Absolute Batman, Year One, Arkham Asylum
- [ ] Wave 3, classics (v1.4): The Animated Series, The Long Halloween, the Arkham games, Adam West, Lego Batman

## v2: "the cave answers back"

Move from watching to acting, carefully and always with explicit confirmation.

- **Approve/deny permissions from the window.** Today's hooks discard every reply on purpose (any program could answer on the port), so this needs a channel that proves the answer comes from Bat-Signal, designed before anything is built. If the app doesn't answer, Claude falls back to the normal terminal flow.
- **Quick reply.** Send "continue" or a short message to an idle session.
- **History and search.** What each session did today, a per-session timeline, full-text search.
- **Cost and tokens.** Per-session and per-day panel, from the transcript's `cost-state` lines.
- **Agent teams and jobs.** Show `~/.claude/teams/` (agent teams, inboxes) and `~/.claude/jobs/` (background jobs).
- **Focus mode.** Mute alerts for X minutes and set per-project alert rules.

## v3: "the full Bat-Computer"

- **Cross-platform.** macOS and Linux; sessions inside WSL.
- **Remote and cloud sessions.** claude.ai/code, Remote Control, sessions on other machines.
- **Daily digest.** "Today your sessions did…", generated with the Claude API.
- **Phone.** Push via ntfy or Telegram when you're away from the PC.
- **Smart alerts.** Detect a session stuck in a loop, a task stalled for too long, unusual cost.
- **Distribution.** Plugin on a public marketplace and app auto-update.

## Suggesting ideas

Open an issue using the "Idea" template.

---

## Footnote: ideas for the next brainstorm

Not planned yet. To be explored with a brainstorm and a grilling round before anything is built.

- **Email and calendar.** Connect Bat-Signal to the user's email and calendar: show what is coming up next to the sessions, and notice when a meeting is about to start while a session waits for you.
- **Automations.** Which routine steps around Claude Code sessions could run on their own (for example, summaries sent somewhere when a long task finishes), and with what safeguards.
