// An emblem's scribble finish (BatEmblem.tsx): the pencil's strokes (scribble.ts) cut to the bat's
// shape, with no fill under them and no outline round them, as SERIOUS HOUSE's bat (#123).

import { useId } from 'react'
import type { Box } from '@shared/emblems'
import { strokesOf } from '../scribble'

/**
 * A scribbled bat's edge, as shares of its width: the mask's spill past the outline and how far the
 * edge wobbles, so the strokes stop unevenly, as a pencil does; and the wobble's grain, per width.
 */
const SPILL = 0.0076
const WOBBLE = 0.009
const WOBBLE_GRAIN = 27.6
/** Round the bat, the room its spilled and wobbling edge takes, with as much again to spare. */
const MARGIN = 2 * (SPILL + WOBBLE)
/** The finest a scribbled stroke is drawn, in pixels: finer fades to a smudge on the disc. */
const FINEST_PX = 0.6

export function ScribbledBat({
  path,
  bat,
  ink,
  unitPx,
}: {
  path: string
  bat: Box
  /** The strokes' color. */
  ink: string
  /** How many pixels one unit of the emblem's grid is drawn at. */
  unitPx: number
}) {
  // Their own ids: one shared by every emblem resolves to whichever comes first on the page.
  const cut = useId()
  const wobble = useId()
  const margin = bat.width * MARGIN
  return (
    <>
      <defs>
        {/* The bat's shape, a little past its outline and wobbling, so the strokes stop unevenly. */}
        <filter id={wobble} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={WOBBLE_GRAIN / bat.width}
            numOctaves={2}
            seed={3}
          />
          {/* Across by one channel of the noise and down by another, so every edge wobbles. */}
          <feDisplacementMap
            in="SourceGraphic"
            scale={bat.width * WOBBLE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <mask
          id={cut}
          maskUnits="userSpaceOnUse"
          // Read by its alpha, so the shape needs no color of its own.
          style={{ maskType: 'alpha' }}
          x={bat.x - margin}
          y={bat.y - margin}
          width={bat.width + 2 * margin}
          height={bat.height + 2 * margin}
        >
          <path
            d={path}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={bat.width * SPILL}
            strokeLinejoin="round"
            filter={`url(#${wobble})`}
          />
        </mask>
      </defs>
      <g mask={`url(#${cut})`} fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
        {strokesOf(bat).map((stroke, i) => (
          <polyline
            key={i}
            points={stroke.points}
            strokeWidth={Math.max(stroke.width * bat.width, FINEST_PX / unitPx)}
            opacity={stroke.opacity}
          />
        ))}
      </g>
    </>
  )
}
