# The Batcave plugin

Batcave works in two ways at once:

- **Files** (always on). It reads what Claude Code already writes to `~/.claude/`: the live session list in `sessions/` and each conversation in `projects/`. That covers sessions, titles, messages, tasks, subagents and background commands, refreshed every 2 seconds.
- **Hooks** (with the plugin). Claude Code tells Batcave the moment something happens. This is the only way to know that **Claude is showing a permission prompt** or is waiting for you, and it makes everything else instant.

## Install

From a terminal, once:

```bash
claude plugin marketplace add lucas-moont/batcave
claude plugin install batcave@batcave
```

Or from a local clone:

```bash
claude plugin marketplace add "/path/to/batcave"
claude plugin install batcave@batcave
```

Restart your Claude Code sessions afterwards so they load the hooks.

To try it in a single session without installing:

```bash
claude --plugin-dir /path/to/batcave/plugin/batcave
```

## What it sends

Each hook is a `POST http://127.0.0.1:47777/hook` with the JSON payload Claude Code gives every hook (session id, cwd, event name and the event's own fields). Events used:

| Event | Used for |
|---|---|
| `SessionStart` | Start from a clean slate (new or cleared conversation) |
| `SessionEnd` | Refresh right away (the session list itself comes from `~/.claude/sessions/`) |
| `UserPromptSubmit` | Clear "waiting for you" and errors |
| `Stop`, `StopFailure` | "Finished replying" and "turn failed" |
| `Notification` | `idle_prompt`, `agent_needs_input` and elicitation dialogs: Claude is waiting for you. `permission_prompt` is ignored, since `PermissionRequest` already reported it with details |
| `PermissionRequest` | What Claude wants to run, tied to its tool call |
| `PostToolUse`, `PostToolUseFailure`, `PermissionDenied` | That tool call finished, failed or was denied, so its prompt is gone; refresh the session. No matcher on purpose: any tool call means Claude is working again |
| `SubagentStart`, `SubagentStop` | Refresh subagents |
| `TaskCreated`, `TaskCompleted` | Refresh tasks |

## Safety

- **Observe-only.** The app always answers with an empty `204`, which Claude Code treats as "no decision". Batcave can't approve, deny or change anything.
- **Fails open.** Every hook has a 1-second timeout. If Batcave isn't running, the connection is refused at once and Claude Code carries on as if the plugin weren't there.
- **Local only.** The server listens on `127.0.0.1` and rejects requests from web pages (any `Origin` header, or a `Host` other than `127.0.0.1`/`localhost`, which defeats DNS rebinding), non-JSON bodies and bodies over 1 MB. Other programs on your machine could still post fake events; since Batcave only displays them, the worst case is a wrong alert.
- **Never reads secrets.** Batcave only opens `~/.claude/sessions/<pid>.json`, never the `*.key` files next to them.
