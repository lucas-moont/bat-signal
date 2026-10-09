// Bat-Signal's sounds, played in the page: the signal window for news, the settings sheet's test.
import type { Cue } from '@shared/announcer'
import light from './assets/sounds/light.ogg'

const SOURCE: Record<Cue, string> = { light }
/**
 * One element per sound, made the first time it plays (sound starts off, so most pages never load
 * one) and played again from the start after that.
 */
const made: Partial<Record<Cue, HTMLAudioElement>> = {}
const audioOf = (cue: Cue): HTMLAudioElement => (made[cue] ??= new Audio(SOURCE[cue]))

/** Plays a sound at a volume from 0 to 1; a sound that cannot play is simply not heard. */
export function playCue(cue: Cue, volume: number): void {
  const audio = audioOf(cue)
  audio.currentTime = 0
  audio.volume = volume
  void audio.play().catch(() => undefined)
}
