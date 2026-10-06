// Windows toasts for the news the user picked. What becomes a toast is announcer.ts's call; this
// gathers each burst into one toast, shows it, and opens its case when it is clicked.
import { Notification } from 'electron'
import { toastFor } from '../shared/announcer'
import type { Notice } from '../shared/notices'
import { Burst } from './burst'
import toastIcon from '../../resources/icons/toast.png?asset'

/** Toasts kept for their clicks (from the Action Center too); older ones are taken back. */
const KEPT = 20

export class BatSignalToasts {
  private readonly burst = new Burst<Notice>((news) => this.show(news))
  /** A Notification left to the garbage collector loses its click: these are held. */
  private readonly kept: Notification[] = []

  /** openCase: opens the panel, on the case when there is one. */
  constructor(private readonly openCase: (sessionId?: string) => void) {}

  /** News the user picked for a toast: it joins the burst, which goes out as one toast. */
  add(news: readonly Notice[]): void {
    this.burst.add(news)
  }

  private show(news: readonly Notice[]): void {
    const toast = toastFor(news)
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
    this.burst.dispose()
  }
}
