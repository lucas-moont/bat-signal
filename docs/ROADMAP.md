# Roadmap

Where Bat-Signal can go. The order inside each version is a suggestion. After v1 ships there will be a feedback round to decide what actually goes into v2.

## v1: "the Bat-Computer watches"

Observe only. Never acts on sessions.

Where it stands (v0.7.0): everything but the installer, which comes with v1.0.

- [x] List of active Claude Code sessions with status (working / idle / needs you)
- [x] Session detail: tasks, subagents, background commands, latest messages
- [x] Task detail (click): description, status history
- [x] "Needs you" panel: permission prompts, Claude waiting for input, errors
- [x] Bat-Signal notices: needs you, finished replying, task completed, session opened/closed (Windows toasts optional)
- [x] Claude Code plugin with HTTP hooks (alerts at the exact moment)
- [x] "Go to terminal": brings the session's window to the front
- [x] Bat-Clawd, the caped mascot, with states (sleeping, flying, alarmed)
- [x] Animations: Bat-Signal intro, rain, transitions
- [x] System tray, global shortcut, start with Windows
- [ ] Windows installer

## v2: "the cave answers back"

Move from watching to acting, carefully and always with explicit confirmation.

- **Approve/deny permissions from the window.** The `PermissionRequest` hook waits for the app's answer with a safe timeout: if the app doesn't answer, Claude falls back to the normal terminal flow.
- **Quick reply.** Send "continue" or a short message to an idle session.
- **The right Windows Terminal tab.** Today only the window comes to the front. Research Windows Terminal automation to select the exact tab.
- **History and search.** What each session did today, a per-session timeline, full-text search.
- **Cost and tokens.** Per-session and per-day panel, from the transcript's `cost-state` lines.
- **Agent teams and jobs.** Show `~/.claude/teams/` (agent teams, inboxes) and `~/.claude/jobs/` (background jobs).
- **Focus mode.** Mute alerts for X minutes and set per-project alert rules.
- **Themes.** Arkham (green), Gotham (night blue), more mascot states.

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
