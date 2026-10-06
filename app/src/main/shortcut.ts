// The global shortcut's registration: which accelerator Bat-Signal holds, and whether another app
// beat it to it. Windows grants each combination to one app; Electron's globalShortcut is the host
// in the app, a fake one in the tests.
import { SHORTCUT_OFF, type ShortcutStatus } from '../shared/status'

export interface ShortcutHost {
  /** False when the combination is already taken. */
  register(accelerator: string, callback: () => void): boolean
  unregister(accelerator: string): void
}

export function createShortcut(host: ShortcutHost, onPress: () => void) {
  let wanted = ''
  let held = ''
  let paused = false
  let status = SHORTCUT_OFF

  const release = () => {
    if (held) host.unregister(held)
    held = ''
  }

  /** Holds `wanted` if it can (it is not paused), and says how that went. */
  const sync = (): ShortcutStatus => {
    if (paused || held === wanted) return status
    release()
    if (!wanted) return (status = SHORTCUT_OFF)
    if (!host.register(wanted, onPress)) return (status = { accelerator: wanted, state: 'taken' })
    held = wanted
    return (status = { accelerator: wanted, state: 'active' })
  }

  return {
    /** The same object until something changes, so a change is cheap to spot. */
    get status(): ShortcutStatus {
      return status
    },
    /** The shortcut from settings ('' for none). A taken one is tried again each time. */
    apply(accelerator: string): ShortcutStatus {
      wanted = accelerator
      return sync()
    },
    /** While the sheet records a new shortcut, the current one must reach the page, not trigger. */
    pause(on: boolean): ShortcutStatus {
      paused = on
      if (on) release()
      return sync()
    },
    dispose(): void {
      release()
    },
  }
}
