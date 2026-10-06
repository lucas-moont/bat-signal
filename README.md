# Bat-Signal

> A small signal in the corner of your screen that lights up when your **Claude Code** sessions need you, with a Bat-Computer panel one click away.

<p align="center">
  <img src="docs/screenshots/signal-notice.png" width="320" alt="The Bat-Signal disc lit red, sending a permission notice up its beam">
</p>

<p align="center">
  <img src="docs/screenshots/needs-you.png" width="300" alt="The needs-you list: a permission prompt, an error, a wait, a new reply and a stalled task, each stamped in red">
  &nbsp;&nbsp;
  <img src="docs/screenshots/case-detail.png" width="300" alt="A case: its tasks, subagents, background commands and last words">
</p>

**Status:** under construction (v0). See the [roadmap](docs/ROADMAP.md).

Bat-Signal rests in a corner of your screen as a small signal disc. When something happens, the disc lights up and a notice card rises from it; click it to open the full panel right on that case. It:

- tells you when a Claude Code session finishes replying;
- shows which sessions are active and what each one is doing (tasks, subagents, background commands);
- tells you when tasks finish;
- gathers everything that **needs you** in one place (permission prompts, Claude waiting for input, errors);
- takes you **to the session's terminal** in one click, bringing its Windows Terminal window and tab to the front;
- shrinks to a **watch strip**, one line per session, to follow the work from the corner;
- has a mascot: **Bat-Clawd**, Claude Code's Clawd in a cowl and cape. He sleeps wrapped in his cape when all is quiet, takes off with it streaming behind him when a session is working, and throws it open, showing its red lining, when something needs you.

The look is inspired by the reds and blacks of *The Batman* (2022): every session is a case file, every alert a red ink stamp, with rain falling behind it all.

## A closer look

| Cases | Task drawer | All quiet |
|---|---|---|
| <img src="docs/screenshots/cases.png" width="240" alt="Case cards with case numbers, status and task progress, each with a terminal button"> | <img src="docs/screenshots/task-drawer.png" width="240" alt="A drawer with a task's brief and timeline"> | <img src="docs/screenshots/all-quiet.png" width="240" alt="Nothing pending: two quiet cases, Bat-Clawd asleep in the header"> |

| Watch strip | The night report theme | A case opened in the report |
|---|---|---|
| <img src="docs/screenshots/watch.png" width="240" alt="The watch strip: one row per session with its stamp, title, progress and pending request"> | <img src="docs/screenshots/night-report.png" width="240" alt="The night report: what awaits your signature, typed, with stamps in the margin and a red pen under each request"> | <img src="docs/screenshots/night-report-case.png" width="240" alt="Case notes with one case opened in place: its file line, a terminal button and typed task boxes"> |

| Settings | The Bat-Signal at rest |
|---|---|
| <img src="docs/screenshots/settings.png" width="240" alt="Settings: animations, rain, always on top, opacity"> | <img src="docs/screenshots/signal.png" width="96" alt="The Bat-Signal disc, lit, with five cases needing you"> |

| Bat-Clawd asleep | On patrol | Needs you |
|---|---|---|
| <img src="docs/screenshots/clawd-sleeping.png" width="190" alt="Bat-Clawd asleep, sitting wrapped in his cape"> | <img src="docs/screenshots/clawd-flying.png" width="190" alt="Bat-Clawd flying, his cape streaming behind him"> | <img src="docs/screenshots/clawd-alarmed.png" width="190" alt="Bat-Clawd alarmed, his black cape flung open to show its red lining"> |

Screenshots use made-up data (`npm run shots`), never real sessions.

## Getting started

Requirements: Windows 10/11, Node.js 24+ and Claude Code.

```bash
cd app
npm install
npm run dev
```

Bat-Signal already works from the files Claude Code writes. For instant alerts, including permission prompts, install the plugin:

```bash
claude plugin marketplace add lucas-moont/bat-signal
claude plugin install bat-signal@bat-signal
```

Without the plugin, Bat-Signal still lists sessions, their tasks and progress, and notices when a turn ends; with it, it also shows **permission prompts**, **Claude waiting for you** and **errors** the moment they happen. Needs you says so when the plugin is silent.

The plugin is observe-only and does nothing when the app is closed. Details in [docs/plugin.md](docs/plugin.md). Coming from Batcave? See [upgrading](docs/plugin.md#upgrading-from-batcave): the old plugin must be removed first.

Bat-Signal starts as the signal disc in the bottom-right corner: drag it anywhere, click it to open the panel. The strip button shrinks the panel to the watch strip, and the disc reopens whichever you used last. Drag the panel by its header and resize it from any edge; Esc or the fold button folds it back into the signal. The night report theme is in Settings.

The bat by the clock is Bat-Signal's tray icon, lit red while something needs you. Click it to open or fold the panel; its menu switches between the disc, the panel and the watch strip, hides everything, opens Settings, and quits. Closing the disc or the panel's close button hides Bat-Signal to the tray instead of quitting, and launching it again brings it back.

**Ctrl+Alt+B**, from any app, does what a click on the disc does: it opens the panel or the watch strip (whichever you used last) and folds it back, and it brings a hidden Bat-Signal back. Change it under Settings → Comfort: click the keys and press new ones (Esc cancels, Backspace turns it off). If another app already holds the combination, Settings says so in red. On keyboards where Ctrl+Alt acts as AltGr (Portuguese ABNT2, German, French), a combination that types a character is refused, so typing keeps it.

**Start with Windows** (Settings → Comfort) has Bat-Signal wake as the disc when you sign in, without taking the focus. The switch shows what Windows will do: turn the entry off in Task Manager's Startup apps and the switch says so.

**Windows notifications** (Settings → Windows notifications, all off at first) add a Windows toast to the Bat-Signal for the kinds of news you pick: Claude needs you, a reply is ready, a task is done, a case opened or closed. A burst of news is one toast (the most urgent, with a count of the rest), the same news never comes twice, and none come while the panel is the window in front. Click one to open its case.

## Light on resources

A window parked in a corner all day has to be cheap. Every looping effect runs off one clock ticking eight times a second instead of 60 fps CSS animations, Bat-Clawd is a flip-book of finished poses, and the rain only falls while you are looking. Measured on the real windows (all Bat-Signal processes, GPU included): about **1% of one CPU core** at rest, whether the signal is dark or lit. The disc only pulses for the few seconds an urgent notice is out.

---

Fan project. Not affiliated with Warner Bros., DC Comics or Anthropic.

License: [MIT](LICENSE).
