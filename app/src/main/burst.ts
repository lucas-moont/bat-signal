// News gathered for BURST_MS, then handed over at once: the toasts and the sound each make one of
// a burst, however many pushes it took.
import { BURST_MS } from '../shared/announcer'

export class Burst<T> {
  private items: T[] = []
  private timer?: NodeJS.Timeout

  constructor(private readonly flush: (items: T[]) => void) {}

  add(items: readonly T[]): void {
    if (!items.length) return
    this.items.push(...items)
    this.timer ??= setTimeout(() => {
      const burst = this.items
      this.items = []
      this.timer = undefined
      this.flush(burst)
    }, BURST_MS)
  }

  dispose(): void {
    clearTimeout(this.timer)
  }
}
