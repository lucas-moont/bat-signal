import { useEffect, useState } from 'react'
import type { StoreSnapshot } from '@shared/types'

const EMPTY: StoreSnapshot = { sessions: [], attention: [] }

/** The latest store snapshot pushed by the main process. */
export function useSnapshot(): StoreSnapshot {
  const [snapshot, setSnapshot] = useState(EMPTY)
  useEffect(() => {
    let live = true
    void window.batcave.getSnapshot().then((s) => live && setSnapshot(s))
    const unsubscribe = window.batcave.onSnapshot(setSnapshot)
    return () => {
      live = false
      unsubscribe()
    }
  }, [])
  return snapshot
}
