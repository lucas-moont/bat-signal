// The window's link to the main process. Without the preload bridge a stand-in takes over:
// in a plain browser (design review) or when asked with #demo / #demo-quiet (screenshots) it
// serves the made-up Gotham night; inside the real app a missing bridge is an error, and the
// window stays empty rather than showing fake sessions as if they were real.
import { demoSnapshot, quietDemoSnapshot } from '@shared/demo'
import { applySettingsPatch, DEFAULT_SETTINGS, type Settings, type WindowMode } from '@shared/settings'
import type { StoreSnapshot } from '@shared/types'
import type { BatcaveApi } from '../../preload/index'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

/** A value with listeners: what the main process keeps for real, kept in memory. */
function observable<T>(initial: T) {
  let value = initial
  const listeners = new Set<(v: T) => void>()
  return {
    get: async () => value,
    set: (next: T) => {
      value = next
      listeners.forEach((l) => l(value))
    },
    current: () => value,
    on: (callback: (v: T) => void) => {
      listeners.add(callback)
      return () => listeners.delete(callback)
    },
  }
}

function standIn(snapshot: () => StoreSnapshot): BatcaveApi {
  const settings = observable<Settings>(DEFAULT_SETTINGS)
  const mode = observable<WindowMode>('full')
  return {
    getSnapshot: async () => snapshot(),
    onSnapshot: () => () => undefined,
    markSeen: () => undefined,
    getSettings: settings.get,
    setSettings: (patch) => settings.set(applySettingsPatch(settings.current(), patch)),
    onSettings: settings.on,
    getMode: mode.get,
    setMode: mode.set,
    onMode: mode.on,
    closeWindow: () => window.close(),
  }
}

function pickStandIn(): BatcaveApi {
  const inElectron = navigator.userAgent.includes('Electron')
  if (inElectron && !location.hash.startsWith('#demo')) {
    console.error('[batcave] preload bridge missing: no data source')
    return standIn(() => EMPTY)
  }
  return standIn(location.hash.includes('quiet') ? quietDemoSnapshot : demoSnapshot)
}

export const batcave: BatcaveApi = (window as { batcave?: BatcaveApi }).batcave ?? pickStandIn()
