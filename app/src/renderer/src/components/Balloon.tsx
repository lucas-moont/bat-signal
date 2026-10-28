// A balloon that pops beside a fresh alert's stamp on the notice card, as the 1966 series' fight
// words do over the action (SAME BAT-TIME's POW!, adam-west.md section 7). It is decoration: the
// stamp beside it still names the alert, so the balloon says nothing a screen reader needs.
import type { NoticeKind } from '@shared/notices'
import { useIsCalm } from '../calm'
import { useWords } from '../words'
import './Balloon.css'

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
 * comes (Balloon.css), never under reduced motion.
 */
export function Balloon({ kind }: { kind: NoticeKind }) {
  const word = useWords().voice.balloon?.[kind]
  const calm = useIsCalm()
  if (!word || calm) return null
  return (
    <span className="balloon" aria-hidden>
      <svg className="balloon__burst" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
        <polygon points={BURST} />
      </svg>
      <span className="balloon__word">{word}</span>
    </span>
  )
}
