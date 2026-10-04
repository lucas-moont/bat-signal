import { useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, type Settings, type WindowMode } from '@shared/settings'
import type { StoreSnapshot } from '@shared/types'
import { batcave } from './bridge'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

/**
 * A value owned by the main process: fetched once, then kept current by its pushes. Returns
 * the value and whether the real one has arrived yet.
 */
function useBridgedState<T>(
  initial: T,
  get: () => Promise<T>,
  on: (cb: (value: T) => void) => () => void,
): [T, boolean] {
  const [state, setState] = useState({ value: initial, loaded: false })
  useEffect(() => {
    let live = true
    const set = (value: T) => live && setState({ value, loaded: true })
    void get().then(set)
    const unsubscribe = on(set)
    return () => {
      live = false
      unsubscribe()
    }
  }, [get, on])
  return [state.value, state.loaded]
}

const useBridged = <T>(initial: T, get: () => Promise<T>, on: (cb: (value: T) => void) => () => void): T =>
  useBridgedState(initial, get, on)[0]

/** The latest store snapshot pushed by the main process. */
export const useSnapshot = (): StoreSnapshot => useBridged(EMPTY, batcave.getSnapshot, batcave.onSnapshot)

/** The settings, a setter, and whether the saved settings have arrived (render nothing before). */
export function useSettings(): [Settings, (patch: Partial<Settings>) => void, boolean] {
  const [settings, loaded] = useBridgedState(DEFAULT_SETTINGS, batcave.getSettings, batcave.onSettings)
  return [settings, batcave.setSettings, loaded]
}

/** Full window or pill: the main process owns it, the window asks to change it. */
export const useWindowMode = (): [WindowMode, (mode: WindowMode) => void] => [
  useBridged<WindowMode>('full', batcave.getMode, batcave.onMode),
  batcave.setMode,
]

/** The current time, refreshed often enough for "2m ago" labels. */
export function useNow(everyMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), everyMs)
    return () => clearInterval(timer)
  }, [everyMs])
  return now
}

/** True when the OS asks for reduced motion or the user turned animations off. */
export function useCalm(settings: Settings): boolean {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced || !settings.animations
}
