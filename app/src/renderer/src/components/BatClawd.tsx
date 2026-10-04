// Bat-Clawd: Claude Code's orange pixel Clawd in a Batman cowl, drawn on a 16x11 pixel grid.
//
// Animated like a flip-book: each mood has finished poses, and a slow shared clock (see
// ticker.ts) picks the pose and the wrapper position a few times a second. Between ticks
// nothing animates at all, so the mascot costs almost nothing while it flaps, blinks or
// sways; CSS loops would keep the compositor busy at 60fps.
import { useEffect, useRef, useState } from 'react'
import type { MascotMood } from '@shared/view'
import { useFrame } from '../ticker'
import './BatClawd.css'

type Px = [x: number, y: number, w?: number, h?: number]

const BODY: Px[] = [
  [3, 3, 10, 6], // head and body, the cowl covers the top rows
  [1, 6, 2, 1], // left arm
  [13, 6, 2, 1], // right arm
]
const LEGS: Px[] = [
  [4, 9, 1, 2],
  [6, 9, 1, 2],
  [9, 9, 1, 2],
  [11, 9, 1, 2],
]
const COWL: Px[] = [
  [4, 0, 1, 1], // left ear tip
  [11, 0, 1, 1], // right ear tip
  [4, 1, 8, 1],
  [3, 2, 10, 3], // over the eyes, down to the cheekbones
]
const COWL_SHINE: Px[] = [[5, 1, 2, 1]]
const EYES_OPEN: Px[] = [
  [5, 3, 2, 1],
  [9, 3, 2, 1],
]
const EYES_SHUT: Px[] = [
  [5, 3.6, 2, 0.3],
  [9, 3.6, 2, 0.3],
]
// From the shoulder up the arm bone to the tip, then down the trailing edge in three scallops.
const LEFT_WING =
  'M3 5.2 L-1.2 1.6 L-5.8 2.4 Q-4.9 4.4 -5.4 6.4 Q-3.9 5.3 -2.7 7 Q-1.5 5.8 -0.1 7.4 Q1.2 6.3 3 7.2 Z'
const SHOULDER = { x: 3, y: 6 }

interface Pose {
  /** Wing rotation in degrees around the shoulder (negative raises the left wing). */
  wing: number
  /** Horizontal squash of the wings: 1 open, small when wrapped around the body. */
  spread: number
  eyes: 'open' | 'shut'
  eyeColor: string
}

const POSES: Record<MascotMood, [Pose, Pose]> = {
  sleeping: [
    { wing: 0, spread: 0.35, eyes: 'shut', eyeColor: 'var(--bone)' },
    { wing: 0, spread: 0.35, eyes: 'shut', eyeColor: 'var(--bone)' },
  ],
  flying: [
    { wing: -24, spread: 1, eyes: 'open', eyeColor: 'var(--bone)' },
    { wing: 16, spread: 0.85, eyes: 'open', eyeColor: 'var(--bone)' },
  ],
  alarmed: [
    { wing: -12, spread: 1, eyes: 'open', eyeColor: 'var(--signal-hot)' },
    { wing: -12, spread: 1, eyes: 'open', eyeColor: 'rgb(227 18 27 / 18%)' },
  ],
}

const rects = (pixels: Px[]) =>
  pixels.map(([x, y, w = 1, h = 1]) => <rect key={`${x},${y}`} x={x} y={y} width={w} height={h} />)

function Wing({ pose, mirrored }: { pose: Pose; mirrored?: boolean }) {
  const { x, y } = SHOULDER
  const shape = `rotate(${pose.wing} ${x} ${y}) translate(${x} 0) scale(${pose.spread} 1) translate(${-x} 0)`
  return (
    <g transform={mirrored ? 'translate(16 0) scale(-1 1)' : undefined}>
      <path className="clawd__wing" d={LEFT_WING} transform={shape} />
    </g>
  )
}

function Frame({ pose, gaze, className }: { pose: Pose; gaze: { x: number; y: number }; className: string }) {
  return (
    <svg className={className} viewBox="-6 -1 28 13" shapeRendering="crispEdges" aria-hidden>
      <Wing pose={pose} />
      <Wing pose={pose} mirrored />
      <g fill="var(--clawd)">{rects(BODY)}</g>
      <g fill="var(--clawd-shade)">{rects(LEGS)}</g>
      <g fill="var(--cowl)">{rects(COWL)}</g>
      <g fill="var(--raised)">{rects(COWL_SHINE)}</g>
      <g fill={pose.eyeColor} transform={`translate(${gaze.x} ${gaze.y})`}>
        {rects(pose.eyes === 'open' ? EYES_OPEN : EYES_SHUT)}
      </g>
    </svg>
  )
}

const SWAY = [180, 181.5, 183, 181.5, 180, 178.5, 177, 178.5]
const BOB = [0, -1, -2, -1]

/** Each mood's flip-book: which pose to show and where to put it on a given frame. */
const MOTION: Record<MascotMood, (frame: number, poses: [Pose, Pose]) => { pose: Pose; transform: string }> =
  {
    // Hanging upside down from the top edge, swaying a little.
    sleeping: (f, [a]) => ({ pose: a, transform: `rotate(${SWAY[f % SWAY.length]}deg)` }),
    // Wings beat between two poses while the body bobs.
    flying: (f, [a, b]) => ({
      pose: f % 2 ? b : a,
      transform: `translateY(${BOB[(f >> 1) % BOB.length]}px)`,
    }),
    // Red eyes that blink every so often, and a shiver.
    alarmed: (f, [a, b]) => ({
      pose: f % 10 === 9 ? b : a,
      transform: `translateX(${f % 2 ? 0.6 : -0.6}px)`,
    }),
  }

/** How far the eyes may slide toward the pointer, in grid units. */
const GAZE = 0.6
const LABEL: Record<MascotMood, string> = {
  sleeping: 'Bat-Clawd is asleep',
  flying: 'Bat-Clawd is on patrol',
  alarmed: 'Bat-Clawd needs you',
}

export function BatClawd({ mood, calm, size = 60 }: { mood: MascotMood; calm: boolean; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [gaze, setGaze] = useState({ x: 0, y: 0 })
  const [hopping, setHopping] = useState(false)

  // Eyes follow the pointer while awake. Event-driven, so it costs nothing when the pointer rests.
  useEffect(() => {
    if (mood === 'sleeping' || calm) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = ref.current?.getBoundingClientRect()
        if (!box) return
        const dx = e.clientX - (box.left + box.width / 2)
        const dy = e.clientY - (box.top + box.height / 2)
        const len = Math.hypot(dx, dy) || 1
        setGaze({ x: Math.round((dx / len) * GAZE * 10) / 10, y: Math.round((dy / len) * GAZE * 5) / 10 })
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [mood, calm])

  const eyes = mood === 'sleeping' || calm ? { x: 0, y: 0 } : gaze
  // Pixel-art pace: sleeping sways at 2 frames a second, awake moods move at 4.
  const frame = useFrame(!calm, mood === 'sleeping' ? 4 : 2)
  const { pose, transform } = MOTION[mood](frame, POSES[mood])

  return (
    <span
      ref={ref}
      role="img"
      aria-label={LABEL[mood]}
      className={`clawd clawd--${mood}${calm ? ' clawd--calm' : ''}${hopping ? ' clawd--hop' : ''}`}
      style={{ width: size, height: (size * 13) / 28 }}
      onClick={() => {
        if (calm || hopping) return
        setHopping(true)
        setTimeout(() => setHopping(false), 700)
      }}
    >
      <span className="clawd__mover" style={{ transform }}>
        <Frame pose={pose} gaze={eyes} className="clawd__frame" />
      </span>
    </span>
  )
}
