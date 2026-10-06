// Windows toasts for the news the user picked. What becomes a toast is announcer.ts's call; this
// only shows it, and opens its case when it is clicked.
import { Notification } from 'electron'
import { announce, emptyAnnouncer, type AnnounceContext } from '../shared/announcer'
import type { StoreSnapshot } from '../shared/types'
import toastIcon from '../../resources/tray/toast.png?asset'

/** Toasts kept for their clicks (from the Action Center too); older ones are let go. */
const KEPT = 20

export class BatSignalToasts {
  private state = emptyAnnouncer()
  /** A Notification left to the garbage collector loses its click: these are held. */
  private readonly kept: Notification[] = []

  constructor(private readonly openCase: (sessionId: string) => void) {}

  /** A new snapshot: its news is remembered, and the news the user picked shows as one toast. */
  update(snapshot: StoreSnapshot, ctx: AnnounceContext): void {
    const { state, toast } = announce(this.state, snapshot, ctx)
    this.state = state
    if (!toast || !Notification.isSupported()) return
    // Silent: Bat-Signal's own sound, when the user turns it on, is the one to hear.
    const shown = new Notification({ title: toast.title, body: toast.body, icon: toastIcon, silent: true })
    shown.on('click', () => this.openCase(toast.sessionId))
    this.kept.push(shown)
    if (this.kept.length > KEPT) this.kept.shift()
    shown.show()
  }
}
