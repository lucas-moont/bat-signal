// Small pieces that pulse with the shared clock (see ticker.ts).
import type { ReactNode } from 'react'
import { useIsCalm } from '../calm'
import { beatAt, pulseAt, useLiveStyle } from '../ticker'

/** The breathing red glow around an urgent card. Steady when calm. */
export function Glow() {
  const ref = useLiveStyle<HTMLSpanElement>(!useIsCalm(), (el, now) => {
    el.style.opacity = now === null ? '1' : pulseAt(now).toFixed(2)
  })
  return <span ref={ref} className="card__glow" aria-hidden />
}

/** A heartbeat: scales its content with each beat while `beating`. */
export function Beat({
  beating,
  strength = 0.45,
  className,
  children,
}: {
  beating: boolean
  strength?: number
  className?: string
  children?: ReactNode
}) {
  const calm = useIsCalm()
  const ref = useLiveStyle<HTMLElement>(beating && !calm, (el, now) => {
    el.style.transform = now === null ? '' : `scale(${(1 + beatAt(now) * strength).toFixed(3)})`
  })
  return (
    <i ref={ref} className={className}>
      {children}
    </i>
  )
}
