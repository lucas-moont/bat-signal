// Bat-Signal's sounds, played in the page: the signal window for news, the settings sheet's test.
import type { Cue } from '@shared/announcer'
import light from './assets/sounds/light.ogg'
import thump from './assets/sounds/thump.ogg'

/** One element per sound, loaded once and played again from the start. */
const AUDIO: Record<Cue, HTMLAudioElement> = { light: preload(light), thump: preload(thump) }

function preload(src: string): HTMLAudioElement {
  const audio = new Audio(src)
  audio.preload = 'auto'
  return audio
}

/** Plays a sound at a volume from 0 to 1; a sound that cannot play is simply not heard. */
export function playCue(cue: Cue, volume: number): void {
  const audio = AUDIO[cue]
  audio.currentTime = 0
  audio.volume = volume
  void audio.play().catch(() => undefined)
}

/** The thump waiting for the spotlight to end; a second test replaces it, so it plays once. */
let thenThump = (): void => undefined

/** Both sounds, one after the other: the spotlight, then the thump (the settings sheet's test). */
export function playEveryCue(volume: number): void {
  AUDIO.light.removeEventListener('ended', thenThump)
  thenThump = () => playCue('thump', volume)
  AUDIO.light.addEventListener('ended', thenThump, { once: true })
  playCue('light', volume)
}
