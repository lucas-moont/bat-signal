# The Bat-Signal plugin

Bat-Signal works in two ways at once:

- **Files** (always on). It reads what Claude Code already writes to `~/.claude/`: the live session list in `sessions/` and each conversation in `projects/`. That covers sessions, titles, messages, tasks, subagents and background commands. The session list updates as soon as it changes; transcripts are re-read every 2 seconds.
- **Hooks** (with the plugin). Claude Code tells Bat-Signal the moment something happens. This is the only way to know that **Claude is showing a permission prompt** or is waiting for you, and it makes everything else instant.

## Install

From a terminal, once:

```bash
claude plugin marketplace add lucas-moont/bat-signal
claude plugin install bat-signal@bat-signal
```

Or from a local clone:

```bash
claude plugin marketplace add "/path/to/bat-signal"
claude plugin install bat-signal@bat-signal
```

Restart your Claude Code sessions afterwards so they load the hooks.

To try it in a single session without installing:

```bash
claude --plugin-dir /path/to/bat-signal/plugin/bat-signal
```

### Upgrading from Batcave

The plugin used to be called `batcave`. Remove it and its marketplace before installing `bat-signal`, or every event will arrive twice:

```bash
claude plugin uninstall batcave@batcave
claude plugin marketplace remove batcave
claude plugin marketplace add lucas-moont/bat-signal
claude plugin install bat-signal@bat-signal
```

The installed app carries your Batcave settings and window place over on its first run.

## What it sends

Each hook runs `curl.exe` in the background to `POST http://127.0.0.1:47777/hook` the JSON payload Claude Code gives every hook (session id, cwd, event name and the event's own fields). The payload can hold more than Bat-Signal needs, such as your prompt on `UserPromptSubmit` or a tool's full input. Bat-Signal keeps only the event name, the tool name, one line of the tool's input (at most 120 characters), the tool call id, the notification type and the error type, in memory; the rest is dropped. [data-format.md](data-format.md) has the details. Events used:

| Event | Used for |
|---|---|
| `SessionStart` | Start from a clean slate (new or cleared conversation) |
| `SessionEnd` | Refresh right away (the session list itself comes from `~/.claude/sessions/`) |
| `UserPromptSubmit` | Clear "waiting for you", a pending permission and errors |
| `Stop`, `StopFailure` | "Finished replying" and "turn failed" |
| `Notification` | `idle_prompt`, `agent_needs_input` and elicitation dialogs: Claude is waiting for you. `permission_prompt` is ignored, since `PermissionRequest` already reported it with details |
| `PermissionRequest` | What Claude wants to run, tied to its tool call |
| `PostToolUse`, `PostToolUseFailure`, `PermissionDenied` | That tool call finished, failed or was denied, so its prompt is gone; refresh the session. No matcher on purpose: any tool call means Claude is working again |
| `SubagentStart`, `SubagentStop` | Refresh subagents |
| `TaskCreated`, `TaskCompleted` | Refresh tasks |

## Safety

- **Observe-only, whoever answers.** Each hook is a background command (`"async": true`) that posts the event, sends the reply to `NUL` and exits with `0`. Claude Code gets no output and no exit code to act on, so nothing that answers on port 47777, Bat-Signal or any other program, can approve or deny a permission, block a turn or add to Claude's context. (Until plugin 0.4.0 the hooks were HTTP hooks, whose replies Claude Code does act on: a program holding the port while Bat-Signal was closed could have answered them. Update with `claude plugin update bat-signal@bat-signal`.) Bat-Signal itself answers with an empty `204` anyway.
- **Order.** Each hook is its own background process, so two events fired a few milliseconds apart (a stop and the next prompt) can arrive in either order. What the panel shows doesn't depend on it: a finished reply only shows once Claude Code's own session file says the session is idle, and the next stop brings it up to date.
- **Fails open.** The hooks never make Claude Code wait. If Bat-Signal isn't running, `curl` gives up within a second, in the background.
- **Needs `curl.exe`,** which Windows 10 (since 1803) and Windows 11 include, as does Git for Windows. The command reads the same in Git Bash and in PowerShell, the two shells Claude Code runs hooks in on Windows.
- **Local only.** The server listens on `127.0.0.1` and rejects requests from web pages (any `Origin` header, or a `Host` other than `127.0.0.1`/`localhost`, which defeats DNS rebinding), non-JSON bodies and bodies over 1 MB. Other programs on your machine could still post fake events; since Bat-Signal only displays them, the worst case is a wrong alert.
- **Never reads secrets.** In `~/.claude/sessions/` Bat-Signal only opens `<pid>.json`, never the `*.key` files next to them (`app/src/main/sources/sessionRegistry.ts`). Outside it, it reads only the transcripts in `~/.claude/projects/`.

## One app at a time

Only one program can listen on `127.0.0.1:47777`. If you run Bat-Signal from a checkout while the installed app is open (see [Development beside the installed app](../CONTRIBUTING.md#development-beside-the-installed-app)), the first one started gets the hooks. The other can't open the port, logs `hook server unavailable`, and works from the files alone: no permission prompts and no "waiting for you", and the end of a turn is noticed from the session list. Quit the installed app before starting a development run if you want to test the hooks.
