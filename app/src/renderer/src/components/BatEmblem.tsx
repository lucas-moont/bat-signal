// The worn Theme's emblem (shared/emblems.ts): in the masthead, on the disc and in the intro,
// with its finish (VENGEANCE's scratched metal, SERIOUS HOUSE's pencil scribble) and on its plate if it has one (PALE MOONLIGHT's
// oval, lit with the disc); Bat-Clawd wears the same outline on his chest.

import { useId } from 'react'
import type { Emblem } from '@shared/emblems'
import { THEMES } from '@shared/themes'
import { PRODUCT } from '@shared/words'
import { strokesOf } from '../scribble'
import { useTheme } from '../theme'

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
 * An outline's stroke, a share of the bat's width: half of it shows outside the bat, about 1.5px
 * round a 44px bat, whatever the emblem's grid.
 */
export const OUTLINE_SHARE = 0.07

/**
 * A scribbled bat's edge, as shares of its width: the mask's spill past the outline and how far the
 * edge wobbles, so the strokes stop unevenly, as a pencil does; and the wobble's grain, per width.
 */
const SPILL = 0.0076
const WOBBLE = 0.009
const WOBBLE_GRAIN = 27.6
/** The finest a scribbled stroke is drawn, in pixels: finer fades to a smudge on the disc. */
const FINEST_PX = 0.6

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
  const worn = useEmblem()
  const { path, bat, finish, plate } = worn
  // The box around the bat, or its plate, with a unit of air on every side: the size a place
  // gives is the emblem's.
  const edge = plate?.box ?? bat
  const box = { x: edge.x - 1, y: edge.y - 1, width: edge.width + 2, height: edge.height + 2 }
  // Their own ids: one shared by every emblem resolves to whichever comes first on the page.
  const wear = useId()
  const light = useId()
  const scratch = useId()
  const wobble = useId()
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
      {/* Behind the bat and outside its finish: a worn bat's filter would clip and streak it. */}
      {outline && (
        <path
          d={path}
          fill="none"
          stroke={outline}
          strokeWidth={bat.width * OUTLINE_SHARE}
          strokeLinejoin="round"
        />
      )}
      {finish === 'scribble' ? (
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
              <feDisplacementMap in="SourceGraphic" scale={bat.width * WOBBLE} />
            </filter>
            <mask
              id={scratch}
              maskUnits="userSpaceOnUse"
              // Read by its alpha, so the shape needs no color of its own.
              style={{ maskType: 'alpha' }}
              x={bat.x - bat.width * 0.1}
              y={bat.y - bat.width * 0.1}
              width={bat.width * 1.2}
              height={bat.height + bat.width * 0.2}
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
          <g mask={`url(#${scratch})`} fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round">
            {strokesOf(worn).map((stroke, i) => (
              <polyline
                key={i}
                points={stroke.points}
                strokeWidth={Math.max(stroke.width * bat.width, (FINEST_PX * box.width) / size)}
                opacity={stroke.opacity}
              />
            ))}
          </g>
        </>
      ) : (
        <path d={path} fill={fill} filter={finish === 'wear' ? `url(#${wear})` : undefined} />
      )}
    </svg>
  )
}
