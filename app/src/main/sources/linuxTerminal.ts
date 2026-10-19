// Brings a session's terminal to the front on Linux. Only the compositor can say which window a
// process owns and raise it, so this works where Bat-Signal speaks to the compositor (Hyprland);
// elsewhere, and whenever no window is found, the command that resumes the session goes on the
// clipboard. The choice of window is the pure rule in ../terminal.
import { clipboard } from 'electron'
import type { TerminalOutcome } from '../../shared/types'
import type { Hyprland } from '../hyprland'
import { dispatchers } from '../hyprland'
import { pickSessionWindow, resumeCommand } from '../terminal'
import { ancestry } from './procfs'

export async function goToTerminal(
  hyprland: Hyprland | undefined,
  session: { pid: number; name?: string; sessionId: string },
): Promise<TerminalOutcome> {
  const copy = (): TerminalOutcome => {
    clipboard.writeText(resumeCommand(session.sessionId))
    return 'copied'
  }
  if (!hyprland || session.pid <= 0) return copy()
  try {
    const [clients, ancestors] = await Promise.all([hyprland.clients(), ancestry(session.pid)])
    const windows = clients
      .filter((c) => c.mapped && !c.hidden)
      .map((c) => ({ id: c.address, pid: c.pid, title: c.title, focusOrder: c.focusHistoryID }))
    const found = pickSessionWindow(windows, ancestors, session.pid, session.name)
    if (!found) return copy()
    await hyprland.dispatch(dispatchers.focus(found.id))
    return 'focused'
  } catch (err) {
    console.warn('[bat-signal] could not reach the terminal:', err)
    return copy()
  }
}
