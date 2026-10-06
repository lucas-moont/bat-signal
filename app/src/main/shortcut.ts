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

  /** Holds `wanted` if it can (it is not paused), and notes how that went in `status`. */
  const sync = (): void => {
    // Already holding what is wanted. (Holding nothing is no reason to keep the status: it may
    // still say a shortcut that was released or taken.)
    if (paused || (held && held === wanted)) return
    release()
    if (!wanted) status = SHORTCUT_OFF
    else if (!host.register(wanted, onPress)) {
      // Still taken on a retry: the same status, so nothing is sent for it.
      if (status.state !== 'taken' || status.accelerator !== wanted)
        status = { accelerator: wanted, state: 'taken' }
    } else {
      held = wanted
      status = { accelerator: wanted, state: 'active' }
    }
  }

  return {
    /** The same object until something changes, so a change is cheap to spot. */
    get status(): ShortcutStatus {
      return status
    },
    /** The shortcut from settings ('' for none). A taken one is tried again each time. */
    apply(accelerator: string): void {
      wanted = accelerator
      sync()
    },
    /** While the sheet records a new shortcut, the current one must reach the page, not trigger. */
    pause(on: boolean): void {
      paused = on
      if (on) release()
      sync()
    },
    dispose(): void {
      release()
    },
  }
}
