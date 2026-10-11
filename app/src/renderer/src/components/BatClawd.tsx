// Bat-Clawd: Claude Code's orange pixel Clawd dressed as the worn Theme's Batman, drawn on a
// 16x11 grid from the Theme's suit (shared/suits.ts): an outfit map for his body and cowl, and
// layers behind and in front of it.
//
// Animated like a flip-book: each mood has finished poses, and a slow shared clock (see
// ticker.ts) picks the pose and the wrapper position a few times a second. Between ticks
// nothing animates at all, so the mascot costs almost nothing while its cape flutters, it
// blinks or it breathes; CSS loops would keep the compositor busy at 60fps.
import { Fragment, useEffect, useRef, useState } from 'react'
import { mapRects, type OutfitMap, type Rect } from '@shared/outfits'
import type { Emblem } from '@shared/emblems'
import {
  GAZE,
  scriptAt,
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

function layerShape(layer: Layer, key: number, emblem: Emblem) {
  switch (layer.kind) {
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
  return (
    <svg className={className} viewBox="-6 -1 28 13" shapeRendering="crispEdges" aria-hidden>
      {pose.behind.map((layer, i) => layerShape(layer, i, emblem))}
      {rectsOf(pose.map).map((r) => (
        <rect key={`${r.x},${r.y}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
      {pose.front.map((layer, i) => layerShape(layer, i, emblem))}
      <g fill={pose.eyeColor} transform={`translate(${gaze.x} ${gaze.y})`}>
        {rects(pose.eyes === 'open' ? suit.eyes.open : suit.eyes.shut)}
      </g>
    </svg>
  )
}

/** Sleeping breath, in px: a slow rise and fall, one step every half second. */
const BREATH = [0, 0, -0.5, -1, -1, -0.5]
const BREATH_STEP_MS = 500
const BOB = [0, -1, -2, -1]

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
  // The Signature pose's reveal, on its own clock from its first step (the intro's, from the start).
  const [revealing, setRevealing] = useState(reveal && !!signature)
  const revealClock = useFrame(!calm && revealing, 2)
  // Under reduced motion a reveal is its final frame.
  const revealed = signature && revealing ? scriptAt(signature, calm ? Infinity : revealClock) : undefined
  // A click's reveal ends after its last step; the intro holds it until the intro leaves. Adjusted
  // during render (React's pattern for reacting to a changed input) rather than in an effect.
  if (!reveal && signature && revealing && revealClock >= signature.length) setRevealing(false)

  // Eyes follow the pointer while awake. Event-driven, so it costs nothing when the pointer rests.
  useEffect(() => {
    if (mood === 'sleeping' || calm || perched) return // the perch takes no pointer
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
  }, [mood, calm, perched])

  // On the perch he keeps watch whatever happens, until something needs you.
  const watching = perched && mood !== 'alarmed'
  // Pixel-art pace: awake moods move at 4 frames a second. On the perch, a transparent window that
  // costs more to redraw, the watch steps once a second (and mostly stands still) and an alarm twice.
  const frame = useFrame(!calm && (watching || mood !== 'sleeping'), watching ? 8 : perched ? 4 : 2)
  // On the perch the Theme's Signature pose stands in for the watch: revealed once, then held.
  const perchStep = watching
    ? signature
      ? scriptAt(signature, calm ? Infinity : frame)
      : suit.watch[frame % suit.watch.length]
    : undefined
  const step: Step | undefined = revealed ?? perchStep
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
      className={`clawd${hopping ? ' clawd--hop' : ''}${suit.aura && (mood === 'alarmed' || revealed) ? ' clawd--aura' : ''}`}
      style={{ width: size, height: (size * 13) / 28 }}
      onClick={() => {
        if (calm) return
        // A Theme with a Signature pose shows it on a click, in place of the hop.
        if (signature) {
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
