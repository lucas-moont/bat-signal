export interface Settings {
  /** Motion beyond the essentials (intro, rain, typewriter, flying mascot). */
  animations: boolean
  /** The rain falling behind everything. */
  rain: boolean
  alwaysOnTop: boolean
  /** Window opacity, 0.5 to 1. */
  opacity: number
}

export const DEFAULT_SETTINGS: Settings = { animations: true, rain: true, alwaysOnTop: true, opacity: 1 }

/** Settings from untrusted JSON: unknown keys dropped, bad values replaced by defaults. */
export function parseSettings(raw: unknown): Settings {
  const o = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
  const bool = (key: keyof Settings) =>
    typeof o[key] === 'boolean' ? (o[key] as boolean) : (DEFAULT_SETTINGS[key] as boolean)
  const opacity = typeof o['opacity'] === 'number' ? Math.min(1, Math.max(0.5, o['opacity'])) : 1
  return { animations: bool('animations'), rain: bool('rain'), alwaysOnTop: bool('alwaysOnTop'), opacity }
}

export type WindowMode = 'full' | 'pill'
