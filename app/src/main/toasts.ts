// Windows toasts for the news the user picked. What becomes a toast is announcer.ts's call; this
// gathers each burst into one toast, shows it, and opens its case when it is clicked.
import { Notification } from 'electron'
import { toastFor } from '../shared/announcer'
import type { Notice } from '../shared/notices'
import toastIcon from '../../resources/icons/toast.png?asset'

/** News this close together is one burst: a finished turn pushes its reply, then its tasks. */
const BURST_MS = 1000
/** Toasts kept for their clicks (from the Action Center too); older ones are taken back. */
const KEPT = 20

export class BatSignalToasts {
  /** The burst being gathered, and when it goes out. */
  private burst: Notice[] = []
  private burstTimer?: NodeJS.Timeout
  /** A Notification left to the garbage collector loses its click: these are held. */
  private readonly kept: Notification[] = []

  /** openCase: opens the panel, on the case when there is one. */
  constructor(private readonly openCase: (sessionId?: string) => void) {}

  /** News the user picked for a toast: it joins the burst, which goes out as one toast. */
  add(news: readonly Notice[]): void {
    if (!news.length) return
    this.burst.push(...news)
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
    // One let go would sit in the Action Center with a click that does nothing: it goes too.
    if (this.kept.length > KEPT) this.kept.shift()?.close()
    shown.show()
  }

  dispose(): void {
    clearTimeout(this.burstTimer)
  }
}
