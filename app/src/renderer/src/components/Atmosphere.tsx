// The Theme's Atmosphere (VENGEANCE's is rain), film grain and a low street-light haze behind
// everything, in the Theme's colors.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Atmosphere as AtmosphereData } from '@shared/atmospheres'
import { THEMES } from '@shared/themes'
import { painterFor } from '../painters'
import { useTheme } from '../theme'
import { useEveryTick } from '../ticker'
import './Atmosphere.css'

/** The Atmosphere's canvas, painted a step on every tick of the shared clock (which stops while hidden). */
function Painted({ atmosphere }: { atmosphere: AtmosphereData }) {
  // The scene lives as long as the canvas; a Theme change mounts a new one (keyed by its Theme).
  const [painter] = useState(() => painterFor(atmosphere))
  const canvas = useRef<HTMLCanvasElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const last = useRef<number | null>(null)
  useEveryTick(true, (now) => {
    if (context.current)
      painter.paint(context.current, last.current === null ? 0 : (now - last.current) / 1000)
    last.current = now
  })

  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    context.current = ctx

    // A canvas can't read CSS variables: it takes the Atmosphere's color as a value. One it can't
    // use (none, with no Theme on the page, or something that isn't a color) keeps the last good
    // one, even across a resize, rather than the canvas's default black on a black page.
    let color = ''
    const recolor = () => {
      const value = getComputedStyle(el).getPropertyValue(atmosphere.color).trim()
      if (value && CSS.supports('color', value)) color = value
      if (color) ctx.strokeStyle = color
    }

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      el.width = Math.round(width * devicePixelRatio)
      el.height = Math.round(height * devicePixelRatio)
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      ctx.lineWidth = 1
      // Resizing the canvas resets its stroke, like the line width.
      recolor()
      painter.resize(width, height)
      // Painted at once, rather than blank until the next tick.
      painter.paint(ctx, 0)
    }

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
  }, [painter, atmosphere.color])

  return <canvas ref={canvas} className="atmosphere__canvas" aria-hidden />
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

export function Atmosphere({ on, activity }: { on: boolean; activity: unknown }) {
  const shown = useAtmosphereVisible(on, activity)
  const theme = useTheme()
  const atmosphere = THEMES[theme].atmosphere
  return (
    <div className="atmosphere" aria-hidden>
      <div className="atmosphere__glow" />
      <AnimatePresence>
        {shown && (
          <motion.div
            key="atmosphere"
            className="atmosphere__layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Painted key={theme} atmosphere={atmosphere} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="atmosphere__grain" />
    </div>
  )
}
