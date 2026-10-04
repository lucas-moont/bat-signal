import { clamp, num, obj } from './guards'

export const OPACITY_MIN = 0.5
export const OPACITY_MAX = 1

export interface Settings {
  /** Motion beyond the essentials (intro, rain, typewriter, flying mascot). */
  animations: boolean
  /** The rain falling behind everything. */
  rain: boolean
  alwaysOnTop: boolean
  /** Window opacity, OPACITY_MIN to OPACITY_MAX. */
  opacity: number
}

export const DEFAULT_SETTINGS: Settings = { animations: true, rain: true, alwaysOnTop: true, opacity: 1 }

/** Settings from untrusted JSON: unknown keys dropped, bad values replaced by defaults. */
export function parseSettings(raw: unknown): Settings {
  const o = obj(raw)
  const bool = (key: 'animations' | 'rain' | 'alwaysOnTop') =>
    typeof o[key] === 'boolean' ? o[key] : DEFAULT_SETTINGS[key]
  const opacity = num(o['opacity'])
  return {
    animations: bool('animations'),
    rain: bool('rain'),
    alwaysOnTop: bool('alwaysOnTop'),
    opacity: opacity === undefined ? DEFAULT_SETTINGS.opacity : clamp(opacity, OPACITY_MIN, OPACITY_MAX),
  }
}

/** Applies an untrusted partial update, validated like everything else. */
export const applySettingsPatch = (current: Settings, patch: unknown): Settings =>
  parseSettings({ ...current, ...obj(patch) })

export type WindowMode = 'full' | 'pill'
