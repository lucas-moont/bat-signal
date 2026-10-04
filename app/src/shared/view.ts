// Pure presentation rules shared by the window and its tests.
import type { StoreSnapshot } from './types'

export type MascotMood = 'sleeping' | 'flying' | 'alarmed'

/** How Bat-Clawd should look given everything Batcave knows. */
export function mascotMood({ sessions, attention }: StoreSnapshot): MascotMood {
  if (attention.some((a) => a.kind === 'permission' || a.kind === 'error')) return 'alarmed'
  return sessions.some((s) => s.status === 'busy') ? 'flying' : 'sleeping'
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Compact age of a timestamp: "now", "2m", "3h", "1d". Empty for missing or invalid times. */
export function relativeTime(iso: string | undefined, now: Date): string {
  const at = iso ? Date.parse(iso) : NaN
  if (Number.isNaN(at)) return ''
  const age = now.getTime() - at
  if (age < MINUTE) return 'now'
  if (age < HOUR) return `${Math.floor(age / MINUTE)}m`
  if (age < DAY) return `${Math.floor(age / HOUR)}h`
  return `${Math.floor(age / DAY)}d`
}
