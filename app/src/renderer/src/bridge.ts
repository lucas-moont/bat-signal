// The window's link to the main process. Without the preload bridge a stand-in takes over:
// in a plain browser (design review) or when asked with #demo / #demo-quiet / #demo-busy / #demo-news (and -watch for the strip)
// (screenshots) it serves the made-up Gotham night; inside the real app a missing bridge is an error, and the
// window stays empty rather than showing fake sessions as if they were real.
import { beforeNewsDemoSnapshot, busyDemoSnapshot, demoSnapshot, quietDemoSnapshot } from '@shared/demo'
import { applySettingsPatch, DEFAULT_SETTINGS, type Settings, type WindowMode } from '@shared/settings'
import type { StoreSnapshot } from '@shared/types'
import type { BatSignalApi } from '../../preload/index'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

/** Both windows load the same page; the query says which one this is. */
export const isSignalView = new URLSearchParams(location.search).get('view') === 'signal'

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

/** NEWS_DELAY_MS after loading, #demo-news turns the night into the next one (a notice for the signal). */
const NEWS_DELAY_MS = 800

function standIn(first: StoreSnapshot, next?: StoreSnapshot): BatSignalApi {
  const snapshot = observable(first)
  if (next) setTimeout(() => snapshot.set(next), NEWS_DELAY_MS)
  const settings = observable<Settings>(DEFAULT_SETTINGS)
  const mode = observable<WindowMode>(
    isSignalView ? 'signal' : location.hash.includes('watch') ? 'watch' : 'panel',
  )
  return {
    getSnapshot: snapshot.get,
    onSnapshot: snapshot.on,
    markSeen: () => undefined,
    goToTerminal: async () => 'copied',
    warmTerminal: () => undefined,
    getSettings: settings.get,
    setSettings: (patch) => settings.set(applySettingsPatch(settings.current(), patch)),
    onSettings: settings.on,
    getMode: mode.get,
    setMode: (next) => mode.set(next),
    onFocusCase: () => () => undefined,
    setNoticeOut: async () => ({ below: false, right: false }),
    setInteractive: () => undefined,
    moveSignalBy: () => undefined,
    onMode: mode.on,
    reopen: () => mode.set('panel'),
    setWatchHeight: () => undefined,
    closeWindow: () => window.close(),
  }
}

function pickStandIn(): BatSignalApi {
  const inElectron = navigator.userAgent.includes('Electron')
  if (inElectron && !location.hash.startsWith('#demo')) {
    console.error('[bat-signal] preload bridge missing: no data source')
    return standIn(EMPTY)
  }
  if (location.hash.includes('quiet')) return standIn(quietDemoSnapshot())
  if (location.hash.includes('busy')) return standIn(busyDemoSnapshot())
  if (location.hash.includes('news')) return standIn(beforeNewsDemoSnapshot(), demoSnapshot())
  return standIn(demoSnapshot())
}

export const batSignal: BatSignalApi = (window as { batSignal?: BatSignalApi }).batSignal ?? pickStandIn()
