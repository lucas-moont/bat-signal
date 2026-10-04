// The window's link to the main process. Without the preload bridge a stand-in takes over:
// in a plain browser (design review) or when asked with #demo / #demo-quiet (screenshots) it
// serves the made-up Gotham night; inside the real app a missing bridge is an error, and the
// window stays empty rather than showing fake sessions as if they were real.
import { demoSnapshot, quietDemoSnapshot } from '@shared/demo'
import { applySettingsPatch, DEFAULT_SETTINGS, type Settings, type WindowMode } from '@shared/settings'
import type { StoreSnapshot } from '@shared/types'
import type { BatcaveApi } from '../../preload/index'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

function standIn(snapshot: () => StoreSnapshot): BatcaveApi {
  let settings = DEFAULT_SETTINGS
  const settingsListeners = new Set<(s: Settings) => void>()
  let mode: WindowMode = 'full'
  const modeListeners = new Set<(m: WindowMode) => void>()
  return {
    getSnapshot: async () => snapshot(),
    onSnapshot: () => () => undefined,
    markSeen: () => undefined,
    getSettings: async () => settings,
    setSettings: (patch) => {
      settings = applySettingsPatch(settings, patch)
      settingsListeners.forEach((l) => l(settings))
    },
    onSettings: (callback) => {
      settingsListeners.add(callback)
      return () => settingsListeners.delete(callback)
    },
    getMode: async () => mode,
    setMode: (next) => {
      mode = next
      modeListeners.forEach((l) => l(mode))
    },
    onMode: (callback) => {
      modeListeners.add(callback)
      return () => modeListeners.delete(callback)
    },
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
