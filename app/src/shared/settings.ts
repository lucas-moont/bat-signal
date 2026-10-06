import { bool, clamp, isRecord, num, obj, type Json } from './guards'

export const OPACITY_MIN = 0.5
export const OPACITY_MAX = 1

/** The kinds of news a Windows toast or a sound can carry, each switched on on its own. */
export const NEWS_GROUPS = ['needsYou', 'reply', 'taskDone', 'sessions'] as const
export type NewsGroup = (typeof NEWS_GROUPS)[number]

/** How news is announced beyond the Bat-Signal itself: all off until the user asks. */
export interface AnnouncePrefs {
  /** Windows toasts, per kind of news. */
  toast: Record<NewsGroup, boolean>
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
  announce: AnnouncePrefs
}

export type PanelLayout = 'files' | 'report'

export const DEFAULT_SETTINGS: Settings = {
  animations: true,
  rain: true,
  alwaysOnTop: true,
  opacity: 1,
  layout: 'files',
  announce: {
    toast: Object.fromEntries(NEWS_GROUPS.map((group) => [group, false])) as AnnouncePrefs['toast'],
    sound: false,
    volume: 0.6,
  },
}

function parseAnnounce(raw: unknown): AnnouncePrefs {
  const o = obj(raw)
  const toast = obj(o['toast'])
  const defaults = DEFAULT_SETTINGS.announce
  return {
    toast: Object.fromEntries(
      NEWS_GROUPS.map((group) => [group, bool(toast[group]) ?? defaults.toast[group]]),
    ) as AnnouncePrefs['toast'],
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
    announce: parseAnnounce(o['announce']),
  }
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

/** A change to some settings: any one switch, down to a single toast, leaving the rest as they are. */
export type SettingsPatch = DeepPartial<Settings>

/**
 * An untrusted patch laid over a value, key by key, all the way down: a value of the wrong type
 * (or none) keeps the current one, and only keys the settings already have are taken, so no
 * __proto__ gets in. A map that must gain keys (per-project rules, one day) needs its own rule.
 */
function mergePatch(current: unknown, patch: unknown): unknown {
  if (!isRecord(current)) return typeof patch === typeof current ? patch : current
  if (!isRecord(patch)) return current
  const merged: Json = { ...current }
  for (const [key, value] of Object.entries(patch))
    if (Object.hasOwn(current, key)) merged[key] = mergePatch(current[key], value)
  return merged
}

/** Applies an untrusted partial update, validated like everything else. */
export const applySettingsPatch = (current: Settings, patch: unknown): Settings =>
  parseSettings(mergePatch(current, patch))

/** Which way a notice card opens from the disc: up and left unless the display has no room. */
export interface NoticeLayout {
  below: boolean
  right: boolean
}

/**
 * Which window shows: the Bat-Signal disc at rest, the full panel, the narrow watch strip, or
 * nothing but the tray icon (hidden).
 */
export type WindowMode = 'signal' | 'panel' | 'watch' | 'hidden'

/** A mode a page may ask for. Hiding is the main process's call (the tray, closing the disc). */
export const parseWindowMode = (raw: unknown): WindowMode | undefined =>
  raw === 'signal' || raw === 'panel' || raw === 'watch' ? raw : undefined
