import { createContext, useContext, useEffect, useState } from 'react'
import type { Settings } from '@shared/settings'

/**
 * True when the OS asks for reduced motion or the user turned animations off. Provided once
 * by App; motion.* components are already calmed by its MotionConfig, so this is only for
 * effects Motion doesn't drive (the mascot, the clock-driven pulses, the typewriter).
 */
export const CalmContext = createContext(false)

export const useIsCalm = (): boolean => useContext(CalmContext)

/** Whether to be calm: the OS asks for reduced motion or the user turned animations off. */
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
