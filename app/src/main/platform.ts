// What Bat-Signal asks of the operating system, one answer per system: which processes still run,
// the way to a session's terminal, whether the desktop wants quiet, starting at sign-in, and where
// windows land. The rest of the main process asks this file, never the system itself.
import type { TerminalOutcome } from '../shared/types'
import { electronDesktop, type Desktop } from './desktop'
import { sessionHyprland } from './hyprland'
import { HyprlandDesktop } from './hyprlandDesktop'
import { createLinuxStartup } from './linuxStartup'
import { powershell } from './powershell'
import { quietNow as windowsQuietNow, warmQuiet as windowsWarmQuiet } from './quiet'
import { createStartup, type Startup } from './startup'
import { createLinuxProbe } from './sources/linuxProbe'
import { goToTerminal as linuxGoToTerminal } from './sources/linuxTerminal'
import type { ProcessProbe } from './sources/sessionRegistry'
import { createWindowsProbe } from './sources/windowsProbe'
import {
  goToTerminal as windowsGoToTerminal,
  warmTerminal as windowsWarmTerminal,
} from './sources/windowsTerminal'

export interface Platform {
  createProbe(): ProcessProbe
  /** Brings a session's terminal to the front, or copies the command that resumes it. */
  goToTerminal(session: { pid: number; name?: string; sessionId: string }): Promise<TerminalOutcome>
  /** Gets the terminal button's answer ready: the pointer reached it. */
  warmTerminal(): void
  /** Whether the desktop wants quiet now (something full screen): then no sound plays. */
  quietNow(): Promise<boolean>
  /** Gets the quiet check ready ahead of the first sound. */
  warmQuiet(): void
  createStartup(onChange: () => void): Startup
  /** Where windows land, once it has read what it needs to place the first one. */
  createDesktop(): Promise<Desktop>
  /** Lets go of what it keeps running, as Bat-Signal quits. */
  close(): void
}

const windows: Platform = {
  createProbe: createWindowsProbe,
  goToTerminal: windowsGoToTerminal,
  warmTerminal: windowsWarmTerminal,
  quietNow: windowsQuietNow,
  warmQuiet: windowsWarmQuiet,
  createStartup,
  createDesktop: () => Promise.resolve(electronDesktop),
  close: () => powershell.close(),
}

/** Hyprland's full-screen states that mean quiet: full screen (2), and full screen over maximized (3). */
const isFullscreen = (fullscreen: number | undefined) => ((fullscreen ?? 0) & 2) !== 0

function linux(): Platform {
  const hyprland = sessionHyprland()
  // Asked once, and not before Electron is ready: until then the main process can stall long enough
  // for Hyprland to drop the connection. An older Hyprland, or none, leaves Bat-Signal as on any
  // other Linux desktop.
  let speaking: Promise<boolean> | undefined
  const ours = async () => {
    speaking ??= hyprland ? hyprland.speaksLua() : Promise.resolve(false)
    return (await speaking) ? hyprland : undefined
  }
  return {
    createProbe: createLinuxProbe,
    goToTerminal: async (session) => linuxGoToTerminal(await ours(), session),
    warmTerminal: () => undefined,
    async quietNow() {
      const active = await (await ours())?.activeWindow().catch(() => undefined)
      return isFullscreen(active?.fullscreen)
    },
    warmQuiet: () => undefined,
    createStartup: createLinuxStartup,
    async createDesktop() {
      const found = await ours()
      if (!found) return electronDesktop
      const desktop = new HyprlandDesktop(found)
      await desktop.ready()
      return desktop
    },
    close: () => undefined,
  }
}

export const platform: Platform = process.platform === 'win32' ? windows : linux()
