// A balloon that pops beside a fresh alert's stamp on the notice card, as the 1966 series' fight
// words do over the action (SAME BAT-TIME's POW!, adam-west.md section 7). It is decoration: the
// stamp beside it still names the alert, so the balloon says nothing a screen reader needs.
import { useState } from 'react'
import type { NoticeKind } from '@shared/notices'
import { useIsCalm } from '../calm'
import { useFrame } from '../ticker'
import { useWords } from '../words'
import './Balloon.css'

/** Its steps on the clock, one a tick: it grows, holds, and fades, then is gone. */
const STEPS = ['grow', 'hold', 'fade'] as const

/** Its size, in px: about the stamp's height and a word's width. */
const WIDTH = 34
const HEIGHT = 22

/**
 * A starburst's points, in shares of its half-width and half-height: twelve spikes, uneven as a
 * hand-drawn one's, about its middle.
 */
const SPIKES = [1, 0.86, 0.97, 0.8, 1, 0.9, 0.95, 0.82, 1, 0.88, 0.93, 0.84]
const BURST = SPIKES.flatMap((reach, i) => {
  const out = (2 * Math.PI * i) / SPIKES.length
  const into = out + Math.PI / SPIKES.length
  const at = (angle: number, r: number) =>
    `${(WIDTH / 2) * (1 + r * Math.cos(angle))},${(HEIGHT / 2) * (1 + r * Math.sin(angle))}`
  return [at(out, reach), at(into, 0.68)]
}).join(' ')

/**
 * The balloon for a notice, if the worn Theme has a word for its kind: it pops once as the card
 * comes, never under reduced motion.
 */
export function Balloon({ kind }: { kind: NoticeKind }) {
  const word = useWords().voice.balloon?.[kind]
  const calm = useIsCalm()
  const [done, setDone] = useState(false)
  const step = useFrame(!!word && !calm && !done)
  if (!word || calm || done) return null
  // Past its last step it stops the clock and is gone (set during render, React's pattern).
  if (step >= STEPS.length) {
    setDone(true)
    return null
  }
  return (
    <span className={`balloon balloon--${STEPS[step]}`} aria-hidden>
      <svg className="balloon__burst" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
        <polygon points={BURST} />
      </svg>
      <span className="balloon__word">{word}</span>
    </span>
  )
}
