// The Theme's Atmosphere (VENGEANCE's is rain), over its backdrop if it has one (a still drawing,
// HOLIDAY's moon), film grain, a haze of the Theme's light (from a street below, unless the Theme's
// falls from above) and its decor if it has one (stains, a fence) behind everything, in the Theme's
// colors; and its light failing now and then while it moves, if the Theme's light fails.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Atmosphere as AtmosphereData } from '@shared/atmospheres'
import { THEMES } from '@shared/themes'
import { useIsCalm } from '../calm'
import { backdropFor, painterFor, type Painter } from '../painters'
import { useTheme } from '../theme'
import { useEveryTick } from '../ticker'
import './Atmosphere.css'

/**
 * A canvas its painter paints: a step on every tick of the shared clock (which stops while hidden)
 * while it moves; still, it keeps its last frame, painted again only after a resize or new colors.
 */
function Painted({ make, moving }: { make: () => Painter; moving: boolean }) {
  // The scene lives as long as the canvas; a Theme change mounts a new one (keyed by its Theme).
  const [painter] = useState(make)
  const canvas = useRef<HTMLCanvasElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const last = useRef<number | null>(null)
  useEveryTick(moving, (now) => {
    if (context.current)
      painter.paint(context.current, last.current === null ? 0 : (now - last.current) / 1000)
    last.current = now
  })

  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    context.current = ctx

    // A canvas can't read CSS variables: its painter asks for each of its colors by name. A value
    // it can't use (none, with no Theme on the page, or something that isn't a color) keeps the
    // last good one, rather than the canvas's default black on a black page.
    const lastGood = new Map<string, string>()
    const recolor = () => {
      const style = getComputedStyle(el)
      painter.recolor((variable) => {
        const value = style.getPropertyValue(variable).trim()
        if (value && CSS.supports('color', value)) lastGood.set(variable, value)
        return lastGood.get(variable) ?? ''
      })
      // Painted at once: a still scene would otherwise keep its old colors until it moves.
      painter.paint(ctx, 0)
    }

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      el.width = Math.round(width * devicePixelRatio)
      el.height = Math.round(height * devicePixelRatio)
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      ctx.lineWidth = 1
      painter.resize(width, height)
      // Painted at once, rather than blank until the next tick.
      painter.paint(ctx, 0)
    }

    recolor()
    // The observer reports the canvas's size as it starts, and on every change after.
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    // A new Theme on the page brings its own color: read it once the page wears it.
    const themes = new MutationObserver(recolor)
    themes.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      context.current = null
      observer.disconnect()
      themes.disconnect()
    }
  }, [painter])

  return <canvas ref={canvas} className="atmosphere__canvas" aria-hidden />
}

/**
 * Whether the Atmosphere's canvas is on the page: while it moves; and, on in the settings and not
 * moving, if it is still, or still under reduced motion and calm.
 */
export const isShown = (
  still: AtmosphereData['still'],
  { on, moving, calm }: { on: boolean; moving: boolean; calm: boolean },
): boolean => moving || (on && (still === true || (still === 'calm' && calm)))

/** How the Atmosphere's motion, and its backdrop, come and go. */
const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1.2 },
}

/** How long the Atmosphere keeps moving after the pointer leaves or something changes. */
const LINGER_MS = 8000

/**
 * The Atmosphere moves while you are looking (pointer over the window) and for a few seconds after
 * `activity` changes, then stops: a canvas redrawn on every tick costs a few points of a core,
 * which a window parked in a corner shouldn't pay all day.
 */
function useAtmosphereVisible(enabled: boolean, activity: unknown): boolean {
  const [hovering, setHovering] = useState(false)
  const [lingering, setLingering] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    const enter = () => setHovering(true)
    const leave = () => setHovering(false)
    root.addEventListener('pointerenter', enter)
    root.addEventListener('pointerleave', leave)
    return () => {
      root.removeEventListener('pointerenter', enter)
      root.removeEventListener('pointerleave', leave)
    }
  }, [])

  // New activity, or the pointer just left: keep it moving a little longer. Adjusted during
  // render (React's pattern for reacting to a changed input) rather than in an effect.
  const [seen, setSeen] = useState({ activity, hovering })
  if (seen.activity !== activity || seen.hovering !== hovering) {
    setSeen({ activity, hovering })
    setLingering(true)
  }

  useEffect(() => {
    if (!lingering) return
    const timer = setTimeout(() => setLingering(false), LINGER_MS)
    return () => clearTimeout(timer)
  }, [lingering, seen])

  return enabled && (hovering || lingering)
}

/**
 * The Atmosphere, while it is on in the settings. It moves while you are looking, never under
 * reduced motion; then rain or snow leaves, a still scene stays, frozen, and ash stays frozen under
 * reduced motion only.
 */
export function Atmosphere({ on, activity }: { on: boolean; activity: unknown }) {
  const calm = useIsCalm()
  const moving = useAtmosphereVisible(on && !calm, activity)
  const theme = useTheme()
  const atmosphere = THEMES[theme].atmosphere
  const shown = isShown(atmosphere.still, { on, moving, calm })
  const { backdrop } = atmosphere
  return (
    <div className="atmosphere" aria-hidden>
      <div className="atmosphere__glow" />
      {/* Still, like the backdrop: a Theme's decor stays while the Atmosphere is on, moving or not. */}
      {on && <div className="atmosphere__decor" />}
      <AnimatePresence>
        {/* The backdrop never moves: it stays while the Atmosphere is on, under its motion. */}
        {on && backdrop && (
          <motion.div key="backdrop" className="atmosphere__backdrop" {...FADE}>
            <Painted key={theme} make={() => backdropFor(backdrop)} moving={false} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shown && (
          <motion.div key="atmosphere" className="atmosphere__layer" {...FADE}>
            <Painted key={theme} make={() => painterFor(atmosphere)} moving={moving} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="atmosphere__grain" />
      {/* A Theme's failing light: animated in CSS, so only on the page while the Atmosphere moves, and
          faded in and out with the motion, so it never snaps off mid-dim. The fade is its own layer:
          on the dark layer itself it would hold it at full strength over the whole scene. */}
      <AnimatePresence>
        {moving && (
          <motion.div key="flicker" className="atmosphere__failing" {...FADE}>
            <div className="atmosphere__flicker" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
