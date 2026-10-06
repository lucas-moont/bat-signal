import { bool, clamp, num, obj } from './guards'

export const OPACITY_MIN = 0.5
export const OPACITY_MAX = 1

/** The kinds of news a Windows toast or a sound can carry, each switched on on its own. */
export const ALERT_GROUPS = ['needsYou', 'reply', 'taskDone', 'sessions'] as const
export type AlertGroup = (typeof ALERT_GROUPS)[number]

/** How news reaches the user beyond the Bat-Signal itself: all off until they ask. */
export interface AlertPrefs {
  /** Windows toasts, per kind of news. */
  toast: Record<AlertGroup, boolean>
  sound: boolean
  /** Sound volume, 0 to 1. */
  volume: number
}

export interface Settings {
  /** Motion beyond the essentials (intro, rain, typewriter, flying mascot). */
  animations: boolean
  /** The rain falling behind everything. */
  rain: boolean
  alwaysOnTop: boolean
  /** Window opacity, OPACITY_MIN to OPACITY_MAX. */
  opacity: number
  /** How the panel reads: as case files (the approved layout) or as one typed night report. */
  layout: PanelLayout
  alerts: AlertPrefs
}

export type PanelLayout = 'files' | 'report'

export const DEFAULT_SETTINGS: Settings = {
  animations: true,
  rain: true,
  alwaysOnTop: true,
  opacity: 1,
  layout: 'files',
  alerts: {
    toast: { needsYou: false, reply: false, taskDone: false, sessions: false },
    sound: false,
    volume: 0.6,
  },
}

function parseAlerts(raw: unknown): AlertPrefs {
  const o = obj(raw)
  const toast = obj(o['toast'])
  const defaults = DEFAULT_SETTINGS.alerts
  return {
    toast: Object.fromEntries(
      ALERT_GROUPS.map((group) => [group, bool(toast[group]) ?? defaults.toast[group]]),
    ) as AlertPrefs['toast'],
    sound: bool(o['sound']) ?? defaults.sound,
    volume: clamp(num(o['volume']) ?? defaults.volume, 0, 1),
  }
}

/** Settings from untrusted JSON: unknown keys dropped, bad values replaced by defaults. */
export function parseSettings(raw: unknown): Settings {
  const o = obj(raw)
  return {
    animations: bool(o['animations']) ?? DEFAULT_SETTINGS.animations,
    rain: bool(o['rain']) ?? DEFAULT_SETTINGS.rain,
    alwaysOnTop: bool(o['alwaysOnTop']) ?? DEFAULT_SETTINGS.alwaysOnTop,
    opacity: clamp(num(o['opacity']) ?? DEFAULT_SETTINGS.opacity, OPACITY_MIN, OPACITY_MAX),
    layout: o['layout'] === 'report' ? 'report' : 'files',
    alerts: parseAlerts(o['alerts']),
  }
}

/** A change to some settings: any one switch, down to a single toast, leaving the rest as they are. */
export type SettingsPatch = Partial<Omit<Settings, 'alerts'>> & {
  alerts?: Partial<Omit<AlertPrefs, 'toast'>> & { toast?: Partial<AlertPrefs['toast']> }
}

/**
 * Applies an untrusted partial update, validated like everything else. The alerts merge a level
 * deep, so turning one toast on never resets the others (or the sound).
 */
export function applySettingsPatch(current: Settings, patch: unknown): Settings {
  const p = obj(patch)
  const alerts = obj(p['alerts'])
  return parseSettings({
    ...current,
    ...p,
    alerts: { ...current.alerts, ...alerts, toast: { ...current.alerts.toast, ...obj(alerts['toast']) } },
  })
}

/** Which way a notice card opens from the disc: up and left unless the display has no room. */
export interface NoticeLayout {
  below: boolean
  right: boolean
}

/** Which window shows: the Bat-Signal disc at rest, the full panel, or the narrow watch strip. */
export type WindowMode = 'signal' | 'panel' | 'watch'

export const parseWindowMode = (raw: unknown): WindowMode | undefined =>
  raw === 'signal' || raw === 'panel' || raw === 'watch' ? raw : undefined
