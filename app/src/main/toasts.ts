// Windows toasts for the news the user picked. What becomes a toast is announcer.ts's call; this
// gathers each burst into one toast, shows it, and opens its case when it is clicked.
import { Notification } from 'electron'
import { announce, emptyAnnouncer, toastFor, type AnnounceContext } from '../shared/announcer'
import type { Notice } from '../shared/notices'
import type { StoreSnapshot } from '../shared/types'
import toastIcon from '../../resources/icons/toast.png?asset'

/** News this close together is one burst: a finished turn pushes its reply, then its tasks. */
const BURST_MS = 1000
/** Toasts kept for their clicks (from the Action Center too); older ones are let go. */
const KEPT = 20

export class BatSignalToasts {
  private state = emptyAnnouncer()
  /** The burst being gathered, and when it goes out. */
  private burst: Notice[] = []
  private burstTimer?: NodeJS.Timeout
  /** A Notification left to the garbage collector loses its click: these are held. */
  private readonly kept: Notification[] = []

  constructor(private readonly openCase: (sessionId: string) => void) {}

  /** A new snapshot: its news is remembered, and the news the user picked joins the burst. */
  update(snapshot: StoreSnapshot, ctx: AnnounceContext): void {
    const { state, toast } = announce(this.state, snapshot, ctx)
    this.state = state
    if (!toast.length) return
    this.burst.push(...toast)
    this.burstTimer ??= setTimeout(() => this.show(), BURST_MS)
  }

  private show(): void {
    const toast = toastFor(this.burst)
    this.burst = []
    this.burstTimer = undefined
    if (!toast || !Notification.isSupported()) return
    // Silent: Bat-Signal's own sound, when the user turns it on, is the one to hear.
    const shown = new Notification({ title: toast.title, body: toast.body, icon: toastIcon, silent: true })
    shown.on('click', () => this.openCase(toast.sessionId))
    this.kept.push(shown)
    if (this.kept.length > KEPT) this.kept.shift()
    shown.show()
  }

  dispose(): void {
    clearTimeout(this.burstTimer)
  }
}
