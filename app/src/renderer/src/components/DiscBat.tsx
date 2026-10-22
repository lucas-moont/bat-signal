// The bat on the Signal disc (Signal.tsx): the Theme's emblem, as everywhere else, unless its disc is
// a lamp of its own, SERIOUS HOUSE's: the classic lamp's solid bat, scratched over after it was made,
// with the Joker's laugh gouged in (#123).

import { useId } from 'react'
import type { Emblem, Lamp } from '@shared/emblems'
import { gougesOf } from '../gouge'
import { batAt, BatEmblem, emblemBox, useEmblem } from './BatEmblem'

/**
 * How wide the emblem is drawn on the disc, and the face the lamp fills, inside its border
 * (Signal.css's .disc__face: 64px across, a 1.5px border), in px.
 */
const BAT_SIZE = 44
const FACE = 64 - 2 * 1.5
/** The glass inside the disc's rim, a radius on the face (0 to 100 across). */
const GLASS = 48
/** How strong the marks are: through the bat to the light, into the glass, and the laugh unlit. */
const OPACITY = { through: 0.85, into: 0.4, laughUnlit: 0.3 }

export function DiscBat({ lit, count }: { lit: boolean; count: number }) {
  const emblem = useEmblem()
  const ink = lit ? 'var(--lens-bat)' : 'var(--disc-bat)'
  return emblem.lamp ? (
    <ScratchedLamp emblem={emblem} lamp={emblem.lamp} lit={lit} alarm={count > 0} ink={ink} />
  ) : (
    <BatEmblem
      size={BAT_SIZE}
      title=""
      fill={ink}
      outline={lit ? 'var(--lens-bat-edge)' : undefined}
      lit={count > 0}
    />
  )
}

function ScratchedLamp({
  emblem,
  lamp,
  lit,
  alarm,
  ink,
}: {
  emblem: Emblem
  lamp: Lamp
  lit: boolean
  /** Something needs the user: the only time the laugh is in the Alarm color. */
  alarm: boolean
  ink: string
}) {
  // Their own ids: one shared by every lamp resolves to whichever comes first on the page.
  const glass = useId()
  const bat = useId()
  const { scratches, laugh } = gougesOf(lamp)
  // As wide as BatEmblem draws the bat on the disc, where its box is BAT_SIZE across.
  const width = ((BAT_SIZE / FACE) * 100 * emblem.bat.width) / emblemBox(emblem).width
  const at = batAt(emblem, 50, 50, width)
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
        <path d={scratches} fill={ink} opacity={OPACITY.into} />
        <path d={emblem.path} transform={at} fill={ink} />
        <path
          d={scratches}
          fill={lit ? 'var(--lens-core)' : 'var(--glass-shine)'}
          clipPath={`url(#${bat})`}
          opacity={OPACITY.through}
        />
        {/* The Joker's scarlet only while something needs you; for news, or at rest, dried blood. */}
        <path
          d={laugh}
          fill={alarm ? 'var(--signal-hot)' : 'var(--blood)'}
          opacity={lit ? undefined : OPACITY.laughUnlit}
        />
      </g>
    </svg>
  )
}
