// An emblem's scribble finish (BatEmblem.tsx): the pencil's strokes (scribble.ts), with no fill
// under them, no outline round them and nothing cutting them to the bat, as SERIOUS HOUSE's bat (#123).

import type { Emblem } from '@shared/emblems'
import { strokesOf } from '../scribble'

/** The finest a scribbled stroke is drawn, in pixels: finer fades to a smudge on the disc. */
const FINEST_PX = 0.6

export function ScribbledBat({
  emblem,
  ink,
  unitPx,
}: {
  emblem: Emblem
  /** The strokes' color. */
  ink: string
  /** How many pixels one unit of the emblem's grid is drawn at. */
  unitPx: number
}) {
  return (
    <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
      {strokesOf(emblem).map((stroke, i) => (
        <polyline
          key={i}
          points={stroke.points}
          strokeWidth={Math.max(stroke.width * emblem.bat.width, FINEST_PX / unitPx)}
          opacity={stroke.opacity}
        />
      ))}
    </g>
  )
}
