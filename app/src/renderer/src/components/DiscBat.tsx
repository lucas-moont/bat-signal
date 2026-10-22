// The bat on the Signal disc (Signal.tsx): the Theme's emblem, as everywhere else, unless its disc is
// a lamp of its own, SERIOUS HOUSE's: the classic lamp's solid bat, scratched over after it was made,
// with the Joker's laugh gouged in (#123).

import { useId } from 'react'
import type { Emblem, Lamp } from '@shared/emblems'
import { gougesOf } from '../gouge'
import { batAt, BatEmblem, useEmblem } from './BatEmblem'

/** The bat's width on the lamp's face (0 to 100 across), as wide as the emblem draws it on the disc. */
const BAT_SIZE = 44
const FACE = 64
/** The glass inside the disc's rim, a radius on the face. */
const GLASS = 48
/** How strong the scratches are: through the bat to the light, into the glass, and the laugh unlit. */
const THROUGH = 0.85
const INTO = 0.4
const LAUGH_UNLIT = 0.3

export function DiscBat({ lit, count }: { lit: boolean; count: number }) {
  const emblem = useEmblem()
  return emblem.lamp ? (
    <ScratchedLamp emblem={emblem} lamp={emblem.lamp} lit={lit} />
  ) : (
    <BatEmblem
      size={BAT_SIZE}
      title=""
      fill={lit ? 'var(--lens-bat)' : 'var(--disc-bat)'}
      outline={lit ? 'var(--lens-bat-edge)' : undefined}
      lit={count > 0}
    />
  )
}

function ScratchedLamp({ emblem, lamp, lit }: { emblem: Emblem; lamp: Lamp; lit: boolean }) {
  // Their own ids: one shared by every lamp resolves to whichever comes first on the page.
  const glass = useId()
  const bat = useId()
  const { scratches, laugh } = gougesOf(lamp)
  // As wide as BatEmblem draws the bat on the disc: its box, with a unit of air each side, is BAT_SIZE.
  const width = ((BAT_SIZE / FACE) * 100 * emblem.bat.width) / (emblem.bat.width + 2)
  const at = batAt(emblem, 50, 50, width)
  const ink = lit ? 'var(--lens-bat)' : 'var(--disc-bat)'
  return (
    <svg className="disc__lamp" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <clipPath id={glass}>
          <circle cx="50" cy="50" r={GLASS} />
        </clipPath>
        <clipPath id={bat}>
          <path d={emblem.path} transform={at} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${glass})`}>
        {/* Into the glass first, the bat laid over them, then through the bat to the light. */}
        <path d={scratches} fill={ink} opacity={INTO} />
        <path d={emblem.path} transform={at} fill={ink} />
        <path
          d={scratches}
          fill={lit ? 'var(--lens-core)' : 'var(--glass-shine)'}
          clipPath={`url(#${bat})`}
          opacity={THROUGH}
        />
        <path
          d={laugh}
          fill={lit ? 'var(--signal-hot)' : 'var(--signal)'}
          opacity={lit ? undefined : LAUGH_UNLIT}
        />
      </g>
    </svg>
  )
}
