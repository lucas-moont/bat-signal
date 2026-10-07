// The global shortcut's registration: which accelerator Bat-Signal holds, and whether another app
// beat it to it. Windows grants each combination to one app; Electron's globalShortcut is the host
// in the app, a fake one in the tests.
import { SHORTCUT_OFF, type ShortcutStatus } from '../shared/status'

export interface ShortcutHost {
  /** False when the combination is already taken. */
  register(accelerator: string, callback: () => void): boolean
  unregister(accelerator: string): void
}

/** How often a shortcut another app holds is tried again: that app may have let it go. */
export const SHORTCUT_RETRY_MS = 60_000

/** onChange: the status changed (and only then). */
export function createShortcut(
  host: ShortcutHost,
  onPress: () => void,
  onChange: () => void = () => undefined,
) {
  let wanted = ''
  let held = ''
  let paused = false
  let status = SHORTCUT_OFF
  let retry: ReturnType<typeof setInterval> | undefined

  const release = () => {
    if (held) host.unregister(held)
    held = ''
  }

  /** Holds `wanted` if it can, tells of a new status, and keeps trying while another app has it. */
  const sync = (): void => {
    const before = status
    take()
    if (status !== before) onChange()
    const taken = status.state === 'taken'
    if (taken && !retry) retry = setInterval(sync, SHORTCUT_RETRY_MS)
    if (!taken && retry) {
      clearInterval(retry)
      retry = undefined
    }
  }

  /** Holds `wanted` if it can (it is not paused), and notes how that went in `status`. */
  const take = (): void => {
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
      // Held again after a pause: the same status, so nothing is told for it.
      if (status.state !== 'active' || status.accelerator !== wanted)
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
      clearInterval(retry)
      retry = undefined
      release()
    },
  }
}
