import { useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, type Settings } from '@shared/settings'
import type { StoreSnapshot } from '@shared/types'
import { batcave } from './bridge'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

/** A value owned by the main process: fetched once, then kept current by its pushes. */
function useBridged<T>(initial: T, get: () => Promise<T>, on: (cb: (value: T) => void) => () => void): T {
  const [value, setValue] = useState(initial)
  useEffect(() => {
    let live = true
    void get().then((v) => live && setValue(v))
    const unsubscribe = on(setValue)
    return () => {
      live = false
      unsubscribe()
    }
  }, [get, on])
  return value
}

/** The latest store snapshot pushed by the main process. */
export const useSnapshot = (): StoreSnapshot => useBridged(EMPTY, batcave.getSnapshot, batcave.onSnapshot)

export const useSettings = (): [Settings, (patch: Partial<Settings>) => void] => [
  useBridged(DEFAULT_SETTINGS, batcave.getSettings, batcave.onSettings),
  batcave.setSettings,
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
