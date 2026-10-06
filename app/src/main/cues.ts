// Bat-Signal's sounds: one per burst, the burst's most urgent, never two within SOUND_GAP_MS, and
// none while Windows wants quiet. Played by the signal window, the page that is always loaded.
import { cueFor, soundGapOpen, type Cue } from '../shared/announcer'
import type { Notice } from '../shared/notices'
import { Burst } from './burst'
import { quietNow } from './quiet'

export class BatSignalCues {
  /** When the last sound played: the gap counts from there. */
  private lastAt?: number
  private readonly burst = new Burst<Notice>((news) => this.sound(cueFor(news)))

  /** play: plays the sound unless things changed meanwhile (sound off, panel in front); says if it did. */
  constructor(private readonly play: (cue: Cue) => boolean) {}

  /** News that makes a sound: it joins the burst. */
  add(news: readonly Notice[]): void {
    this.burst.add(news)
  }

  private sound(cue: Cue | undefined): void {
    if (!cue || !soundGapOpen(this.lastAt, Date.now())) return
    void quietNow().then((quiet) => {
      // Asked again: another sound may have played while Windows answered.
      if (quiet || !soundGapOpen(this.lastAt, Date.now())) return
      if (this.play(cue)) this.lastAt = Date.now()
    })
  }

  dispose(): void {
    this.burst.dispose()
  }
}
