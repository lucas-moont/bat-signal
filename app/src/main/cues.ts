// Bat-Signal's sounds: one per burst (pickCue), unless Windows wants quiet. Played by the signal
// window, the page that is always loaded.
import { pickCue, type Cue } from '../shared/announcer'
import type { Notice } from '../shared/notices'
import { quietNow } from './quiet'

export class BatSignalCues {
  private state: { lastAt?: number } = {}

  constructor(private readonly play: (cue: Cue) => void) {}

  /** News that makes a sound: the burst's sound plays, if Windows does not want quiet. */
  add(news: readonly Notice[]): void {
    const { cue, state } = pickCue(this.state, news, Date.now())
    this.state = state
    if (cue) void quietNow().then((quiet) => quiet || this.play(cue))
  }
}
