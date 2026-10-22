// The worn Theme's emblem (shared/emblems.ts): in the masthead, on the disc and in the intro,
// with its finish (VENGEANCE's scratched metal, SERIOUS HOUSE's pencil scribble) and on its plate
// if it has one (PALE MOONLIGHT's oval, lit with the disc); Bat-Clawd wears the same outline on his
// chest.

import { useId } from 'react'
import type { Box, Emblem } from '@shared/emblems'
import { THEMES } from '@shared/themes'
import { PRODUCT } from '@shared/words'
import { useTheme } from '../theme'
import { ScribbledBat } from './ScribbledBat'

/** The worn Theme's emblem. */
export const useEmblem = (): Emblem => THEMES[useTheme()].emblem

/**
 * An SVG transform that draws an emblem `width` units wide, centred on (cx, cy), as tall as its shape
 * makes it, or `height` units if given.
 */
export function batAt({ bat }: Emblem, cx: number, cy: number, width: number, height?: number): string {
  const kx = width / bat.width
  const ky = height === undefined ? kx : height / bat.height
  return `translate(${cx - (bat.x + bat.width / 2) * kx} ${cy - (bat.y + bat.height / 2) * ky}) scale(${kx} ${ky})`
}

/**
 * The box an emblem is drawn in: round the bat, or its plate, with a unit of air on every side. The
 * size a place gives is this box's.
 */
export function emblemBox({ bat, plate }: Emblem): Box {
  const edge = plate?.box ?? bat
  return { x: edge.x - 1, y: edge.y - 1, width: edge.width + 2, height: edge.height + 2 }
}

/**
 * An outline's stroke, a share of the bat's width: half of it shows outside the bat, about 1.5px
 * round a 44px bat, whatever the emblem's grid.
 */
export const OUTLINE_SHARE = 0.07

export function BatEmblem({
  size = 40,
  title,
  fill = 'var(--emblem)',
  lit = false,
  outline,
}: {
  size?: number
  /** What a screen reader says; the product's name unless given ("" for a decorative one). */
  title?: string
  /** The bat's color: the Theme's emblem color unless a place gives its own (the disc's). */
  fill?: string
  /** Something needs the user: a plate lights in the Alarm color. */
  lit?: boolean
  /** An outline under the bat's fill, in this color (a lit lens too pale to hold its shape alone). */
  outline?: string
}) {
  const emblem = useEmblem()
  const { path, bat, finish, plate } = emblem
  const box = emblemBox(emblem)
  // Their own ids: one shared by every emblem resolves to whichever comes first on the page.
  const wear = useId()
  const light = useId()
  return (
    <svg
      width={size}
      height={(size * box.height) / box.width}
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      role="img"
      aria-label={title ?? PRODUCT}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {finish === 'wear' && (
        <defs>
          {/* Fine noise dims the fill in streaks that read as wear and scratches, never cut through. */}
          <filter id={wear} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.4 0.25"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -6 4.6"
              result="mask"
            />
            {/* A scratch keeps 62.5% of the bat: worn, not holed. */}
            <feComponentTransfer in="mask" result="wear">
              <feFuncA type="linear" slope="0.375" intercept="0.625" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="wear" operator="in" />
          </filter>
        </defs>
      )}
      {plate && (
        <>
          {lit && (
            <defs>
              {/* Lit: the Alarm color's light at its middle, fading to the plate's own rest color. */}
              <radialGradient id={light}>
                <stop offset="0%" style={{ stopColor: 'var(--signal-hot)' }} />
                <stop offset="65%" style={{ stopColor: 'var(--signal)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--emblem-plate)' }} />
              </radialGradient>
            </defs>
          )}
          <ellipse
            className="emblem__plate"
            cx={plate.box.x + plate.box.width / 2}
            cy={plate.box.y + plate.box.height / 2}
            rx={(plate.box.width - plate.rim) / 2}
            ry={(plate.box.height - plate.rim) / 2}
            fill={lit ? `url(#${light})` : 'var(--emblem-plate)'}
            stroke="var(--emblem-plate-rim)"
            strokeWidth={plate.rim}
          />
        </>
      )}
      {/* Behind the bat and outside its finish: a worn bat's filter would clip and streak it. A
          scribbled bat has none: its strokes miss the edge, some past it, some short of it. */}
      {outline && finish !== 'scribble' && (
        <path
          d={path}
          fill="none"
          stroke={outline}
          strokeWidth={bat.width * OUTLINE_SHARE}
          strokeLinejoin="round"
        />
      )}
      {finish === 'scribble' ? (
        <ScribbledBat emblem={emblem} ink={fill} unitPx={size / box.width} />
      ) : (
        <path d={path} fill={fill} filter={finish === 'wear' ? `url(#${wear})` : undefined} />
      )}
    </svg>
  )
}
