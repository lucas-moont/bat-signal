// Bat-Signal's sounds, played in the page: the signal window for news, the settings sheet's test.
import type { Cue } from '@shared/announcer'
import light from './assets/sounds/light.ogg'
import thump from './assets/sounds/thump.ogg'

const SOUND: Record<Cue, string> = { light, thump }

/** Plays a sound at a volume from 0 to 1; a sound that cannot play is simply not heard. */
export function playCue(cue: Cue, volume: number): void {
  const audio = new Audio(SOUND[cue])
  audio.volume = volume
  void audio.play().catch(() => undefined)
}
