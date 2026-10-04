// The window's link to the main process. In a plain browser (design review, `vite` preview)
// there is no preload bridge, so a stand-in serves the demo snapshot and in-memory settings.
import { demoSnapshot, quietDemoSnapshot } from '@shared/demo'
import { DEFAULT_SETTINGS, type Settings } from '@shared/settings'
import type { BatcaveApi } from '../../preload/index'

function browserStandIn(): BatcaveApi {
  let settings = DEFAULT_SETTINGS
  const settingsListeners = new Set<(s: Settings) => void>()
  return {
    getSnapshot: async () => (location.hash === '#quiet' ? quietDemoSnapshot() : demoSnapshot()),
    onSnapshot: () => () => undefined,
    markSeen: () => undefined,
    getSettings: async () => settings,
    setSettings: (patch) => {
      settings = { ...settings, ...patch }
      settingsListeners.forEach((l) => l(settings))
    },
    onSettings: (callback) => {
      settingsListeners.add(callback)
      return () => settingsListeners.delete(callback)
    },
    setMode: () => undefined,
    closeWindow: () => window.close(),
  }
}

export const batcave: BatcaveApi = (window as { batcave?: BatcaveApi }).batcave ?? browserStandIn()
