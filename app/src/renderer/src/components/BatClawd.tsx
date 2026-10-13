// Bat-Clawd: Claude Code's orange pixel Clawd dressed as the worn Theme's Batman, drawn on a
// 16x11 grid from the Theme's suit (shared/suits.ts): an outfit map for his body and cowl, and
// layers behind and in front of it.
//
// Animated like a flip-book: each mood has finished poses, and a slow shared clock (see
// ticker.ts) picks the pose and the wrapper position a few times a second. Between ticks
// nothing animates at all, so the mascot costs almost nothing while its cape flutters, it
// blinks or it breathes; CSS loops would keep the compositor busy at 60fps.
import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { mapRects, type OutfitMap, type Rect } from '@shared/outfits'
import type { Emblem } from '@shared/emblems'
import {
  BODY_BOX,
  GAZE,
  scriptAt,
  stillStep,
  type Layer,
  type Pose,
  type Poses,
  type Px,
  type Step,
  type Suit,
} from '@shared/suits'
import { THEMES } from '@shared/themes'
import type { MascotMood } from '@shared/view'
import { batAt, useEmblem } from './BatEmblem'
import { useIsCalm } from '../calm'
import { useTheme } from '../theme'
import { useWords } from '../words'
import { useFrame, useLiveStyle } from '../ticker'
import './BatClawd.css'

/** The worn Theme's suit. */
export const useSuit = (): Suit => THEMES[useTheme()].suit

const rects = (pixels: readonly Px[]) =>
  pixels.map(([x, y, w = 1, h = 1]) => <rect key={`${x},${y}`} x={x} y={y} width={w} height={h} />)

// A map's rects are worked out once: the suit is fixed data, and the frame redraws on the clock.
const mapped = new WeakMap<OutfitMap, Rect[]>()
function rectsOf(map: OutfitMap): Rect[] {
  let found = mapped.get(map)
  if (!found) mapped.set(map, (found = mapRects(map)))
  return found
}

const MIRROR = 'translate(16 0) scale(-1 1)'

/** A cape's rim shows everywhere but over his body: the view, with BODY_BOX cut out of it. */
const [bx, by, bw, bh] = BODY_BOX
const OFF_BODY = `M-10 -5 H30 V15 H-10 Z M${bx} ${by} h${bw} v${bh} h${-bw} Z`
/** An open cape's back, hanging behind him between his shoulders and his feet. */
const CAPE_BACK = 'M3.4 5 L12.6 5 L12.6 11.4 L3.4 11.4 Z'

/** His frame's height for its width: the 28x13 view around his 16x11 grid. */
const FRAME_ASPECT = 13 / 28

function layerShape(layer: Layer, key: number, emblem: Emblem, offBody: string) {
  switch (layer.kind) {
    case 'cape': {
      const halves = layer.mirrored ? [undefined, MIRROR] : [undefined]
      return (
        <Fragment key={key}>
          {layer.back && <path className="clawd__cape-cloth" d={CAPE_BACK} />}
          {halves.map((t) => (
            <path key={t ?? 'left'} className="clawd__cape-cloth" d={layer.d} transform={t} />
          ))}
          <g clipPath={`url(#${offBody})`}>
            {halves.map((t) => (
              <path key={t ?? 'left'} className="clawd__cape-rim" d={layer.d} transform={t} />
            ))}
          </g>
        </Fragment>
      )
    }
    case 'path':
      return (
        <Fragment key={key}>
          <path className={layer.className} d={layer.d} />
          {layer.mirrored && <path className={layer.className} d={layer.d} transform={MIRROR} />}
        </Fragment>
      )
    case 'rects':
      return (
        <g key={key} fill={layer.fill} className={layer.className}>
          {rects(layer.px)}
        </g>
      )
    case 'emblem':
      // Smooth, not pixel-snapped: at this size the snapped outline breaks into blocks.
      return (
        <path
          key={key}
          className="clawd__emblem"
          d={emblem.path}
          transform={batAt(emblem, layer.cx, layer.cy, layer.width)}
          shapeRendering="geometricPrecision"
        />
      )
  }
}

function Frame({
  suit,
  pose,
  gaze,
  className,
}: {
  suit: Suit
  pose: Pose
  gaze: { x: number; y: number }
  className: string
}) {
  const emblem = useEmblem()
  const offBody = useId()
  const layers = [...pose.behind, ...pose.front]
  return (
    <svg className={className} viewBox="-6 -1 28 13" shapeRendering="crispEdges" aria-hidden>
      {layers.some((layer) => layer.kind === 'cape') && (
        <clipPath id={offBody}>
          <path d={OFF_BODY} clipRule="evenodd" />
        </clipPath>
      )}
      {pose.behind.map((layer, i) => layerShape(layer, i, emblem, offBody))}
      {rectsOf(pose.map).map((r) => (
        <rect key={`${r.x},${r.y}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
      {pose.front.map((layer, i) => layerShape(layer, i, emblem, offBody))}
      <g fill={pose.eyeColor} transform={`translate(${gaze.x} ${gaze.y})`}>
        {rects(pose.eyes === 'open' ? suit.eyes.open : suit.eyes.shut)}
      </g>
    </svg>
  )
}

/**
 * The Theme's Bat-Clawd (the worn one, or the one previewed), still: its portrait (stillStep), with
 * no clock, pointer or click. Decoration, for a preview.
 */
export function BatClawdStill({ size }: { size: number }) {
  const suit = useSuit()
  const { pose, look } = stillStep(suit)
  return (
    <span className="clawd" style={{ width: size, height: size * FRAME_ASPECT }} aria-hidden="true">
      <span className="clawd__mover">
        <Frame suit={suit} pose={pose} gaze={{ x: look, y: 0 }} className="clawd__frame" />
      </span>
    </span>
  )
}

/** Sleeping breath, in px: a slow rise and fall, one step every half second. */
const BREATH = [0, 0, -0.5, -1, -1, -0.5]
const BREATH_STEP_MS = 500
const BOB = [0, -1, -2, -1]
/** How long a click's Signature pose holds its final step before he returns to his Mood: a second. */
const CLICK_HOLD_STEPS = 4

/** Each mood's flip-book: which pose to show and where to put it on a given frame. */
const MOTION: Record<MascotMood, (frame: number, poses: Poses) => { pose: Pose; transform: string }> = {
  // Sitting still, wrapped in the cape; the breath is written straight to the element.
  sleeping: (_f, [a]) => ({ pose: a, transform: '' }),
  // The cape flutters between two frames while the body bobs.
  flying: (f, [a, b = a]) => ({
    pose: f % 2 ? b : a,
    transform: `translateY(${BOB[(f >> 1) % BOB.length]}px)`,
  }),
  // The cape flung open, eyes that blink every so often, and a shiver.
  alarmed: (f, [a, b = a]) => ({
    pose: f % 10 === 9 ? b : a,
    transform: `translateX(${f % 2 ? 0.6 : -0.6}px)`,
  }),
}

export function BatClawd({
  mood,
  size = 60,
  perched = false,
  reveal = false,
}: {
  mood: MascotMood
  size?: number
  /** Standing watch on the edge of the watch strip: the cape in the wind, the eyes sweeping. */
  perched?: boolean
  /** Reveals the Theme's Signature pose as he appears, then holds it (the intro). */
  reveal?: boolean
}) {
  const suit = useSuit()
  const calm = useIsCalm()
  const said = useWords().voice.mascot
  const ref = useRef<HTMLSpanElement>(null)
  const [gaze, setGaze] = useState({ x: 0, y: 0 })
  const [hopping, setHopping] = useState(false)
  const signature = suit.signature
  // On the perch he keeps watch whatever happens, until something needs you.
  const watching = perched && mood !== 'alarmed'
  // The Signature pose's reveal, on one clock wherever it plays (four steps a second). The intro's
  // and the perch's start at once and hold the final step; a click's holds it a moment, then lets go.
  const holds = reveal || perched
  const [revealing, setRevealing] = useState(holds && !!signature)
  const [settled, setSettled] = useState(false)
  // Something needs the user: the alarm's pose wins, and the perch's reveal waits for his watch.
  const revealShown = !!signature && revealing && mood !== 'alarmed'
  const revealClock = useFrame(!calm && revealShown && !settled, 2)
  const finalStep = (signature?.length ?? 1) - 1
  // Settled on its final step (the clock then stops), or let go; under reduced motion at once, so
  // nothing is left half revealed. Adjusted during render (React's pattern for reacting to a changed
  // input) rather than in an effect.
  if (revealShown && !settled && (calm || revealClock >= finalStep + (holds ? 0 : CLICK_HOLD_STEPS))) {
    if (holds) setSettled(true)
    else setRevealing(false)
  }
  const revealed =
    signature && revealShown ? scriptAt(signature, settled || calm ? Infinity : revealClock) : undefined

  // Eyes follow the pointer while awake. Event-driven, so it costs nothing when the pointer rests.
  useEffect(() => {
    // The perch takes no pointer, and a reveal sets where he looks.
    if (mood === 'sleeping' || calm || perched || reveal) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        const dx = e.clientX - (box.left + box.width / 2)
        const dy = e.clientY - (box.top + box.height / 2)
        const len = Math.hypot(dx, dy) || 1
        const x = Math.round((dx / len) * GAZE * 10) / 10
        const y = Math.round((dy / len) * GAZE * 5) / 10
        // Same rounded gaze: keep the old object so React skips the render.
        setGaze((prev) => (prev.x === x && prev.y === y ? prev : { x, y }))
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [mood, calm, perched, reveal])

  // Pixel-art pace: awake moods move at 4 frames a second. On the perch, a transparent window that
  // costs more to redraw, the watch steps once a second (and mostly stands still) and an alarm twice.
  // A Theme's Signature pose takes the perch's place of the watch, so that clock stays off there.
  const ticking = watching ? !signature : mood !== 'sleeping' && !revealed
  const clock = useFrame(!calm && ticking, watching ? 8 : perched ? 4 : 2)
  const frame = calm ? 0 : clock
  const step: Step | undefined =
    revealed ?? (watching && !signature ? suit.watch[frame % suit.watch.length] : undefined)
  const { pose, transform } = step
    ? { pose: step.pose, transform: step.transform ?? '' }
    : MOTION[mood](frame, suit.poses[mood])
  // Still eyes when calm or asleep; on the perch they follow the watch, otherwise the pointer.
  const stillEyes = calm || (!watching && mood === 'sleeping')
  const eyes = stillEyes ? { x: 0, y: 0 } : step ? { x: step.look, y: 0 } : gaze
  // Asleep only the breath changes, so it skips React: the CSS `translate` property composes
  // with the `transform` React sets.
  const mover = useLiveStyle<HTMLSpanElement>(!calm && !perched && mood === 'sleeping', (el, now) => {
    el.style.translate = now === null ? '' : `0 ${BREATH[Math.floor(now / BREATH_STEP_MS) % BREATH.length]}px`
  })

  return (
    <span
      ref={ref}
      role="img"
      aria-label={watching ? said.watching : said[mood]}
      className={`clawd${hopping ? ' clawd--hop' : ''}${suit.aura && (mood === 'alarmed' || (revealed && !settled && !calm)) ? ' clawd--aura' : ''}`}
      style={{ width: size, height: size * FRAME_ASPECT }}
      onClick={() => {
        if (calm) return
        // A Theme with a Signature pose shows it on a click, in place of the hop (an alarm keeps the hop).
        if (signature && mood !== 'alarmed') {
          setRevealing(true)
          return
        }
        if (hopping) return
        setHopping(true)
        setTimeout(() => setHopping(false), 700)
      }}
    >
      <span ref={mover} className="clawd__mover" style={{ transform }}>
        <Frame suit={suit} pose={pose} gaze={eyes} className="clawd__frame" />
      </span>
    </span>
  )
}
