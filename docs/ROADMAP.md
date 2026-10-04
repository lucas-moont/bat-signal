# Roadmap

Where Batcave can go. The order inside each version is a suggestion. After v1 ships there will be a feedback round to decide what actually goes into v2.

## v1: "the Bat-Computer watches"

Observe only. Never acts on sessions.

- [ ] List of active Claude Code sessions with status (working / idle / needs you)
- [ ] Session detail: tasks, subagents, background commands, latest messages
- [ ] Task detail (click): description, status history
- [ ] "Needs you" panel: permission prompts, Claude waiting for input, errors
- [ ] Bat-Signal notices: needs you, finished replying, task completed, session opened/closed (Windows toasts optional)
- [ ] Claude Code plugin with HTTP hooks (alerts at the exact moment)
- [ ] "Go to terminal": brings the session's window to the front
- [ ] Bat-Clawd, the caped mascot, with states (sleeping, flying, alarmed)
- [ ] Animations: Bat-Signal intro, rain, transitions
- [ ] System tray, global shortcut, start with Windows
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
