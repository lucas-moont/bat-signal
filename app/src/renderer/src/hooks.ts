import { useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, type Settings } from '@shared/settings'
import type { StoreSnapshot } from '@shared/types'
import { batcave } from './bridge'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

/** The latest store snapshot pushed by the main process. */
export function useSnapshot(): StoreSnapshot {
  const [snapshot, setSnapshot] = useState(EMPTY)
  useEffect(() => {
    let live = true
    void batcave.getSnapshot().then((s) => live && setSnapshot(s))
    const unsubscribe = batcave.onSnapshot(setSnapshot)
    return () => {
      live = false
      unsubscribe()
    }
  }, [])
  return snapshot
}

export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  useEffect(() => {
    let live = true
    void batcave.getSettings().then((s) => live && setSettings(s))
    const unsubscribe = batcave.onSettings(setSettings)
    return () => {
      live = false
      unsubscribe()
    }
  }, [])
  return [settings, batcave.setSettings]
}

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
