// Bat-Clawd: Claude Code's orange pixel Clawd in a Batman cowl, drawn on a 16x11 pixel grid.
import { useEffect, useRef, useState } from 'react'
import type { MascotMood } from '@shared/view'
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
const EYES: Px[] = [
  [5, 3, 2, 1],
  [9, 3, 2, 1],
]
// From the shoulder up the arm bone to the tip, then down the trailing edge in three scallops.
const LEFT_WING =
  'M3 5.2 L-1.2 1.6 L-5.8 2.4 Q-4.9 4.4 -5.4 6.4 Q-3.9 5.3 -2.7 7 Q-1.5 5.8 -0.1 7.4 Q1.2 6.3 3 7.2 Z'

const rects = (pixels: Px[]) =>
  pixels.map(([x, y, w = 1, h = 1]) => <rect key={`${x},${y}`} x={x} y={y} width={w} height={h} />)

/** How far the eyes may slide toward the pointer, in grid units. */
const GAZE = 0.6

export function BatClawd({ mood, calm, size = 46 }: { mood: MascotMood; calm: boolean; size?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const [gaze, setGaze] = useState({ x: 0, y: 0 })
  const [hopping, setHopping] = useState(false)

  // Eyes follow the pointer while awake.
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
        setGaze({ x: (dx / len) * GAZE, y: (dy / len) * GAZE * 0.5 })
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [mood, calm])

  const eyes = mood === 'sleeping' || calm ? { x: 0, y: 0 } : gaze
  const label = {
    sleeping: 'Bat-Clawd is asleep',
    flying: 'Bat-Clawd is on patrol',
    alarmed: 'Bat-Clawd needs you',
  }

  return (
    <svg
      ref={ref}
      className={`clawd clawd--${mood}${calm ? ' clawd--calm' : ''}${hopping ? ' clawd--hop' : ''}`}
      viewBox="-6 -1 28 13"
      width={size}
      height={(size * 13) / 28}
      role="img"
      aria-label={label[mood]}
      shapeRendering="crispEdges"
      onClick={() => {
        if (calm || hopping) return
        setHopping(true)
        setTimeout(() => setHopping(false), 700)
      }}
    >
      <g className="clawd__body">
        <g className="clawd__wings">
          <path className="clawd__wing" d={LEFT_WING} />
          {/* Mirrored by the group, so the path keeps the same CSS animation as the left wing. */}
          <g transform="translate(16 0) scale(-1 1)">
            <path className="clawd__wing" d={LEFT_WING} />
          </g>
        </g>
        <g fill="var(--clawd)">{rects(BODY)}</g>
        <g fill="var(--clawd-shade)">{rects(LEGS)}</g>
        <g fill="var(--cowl)">{rects(COWL)}</g>
        <g fill="var(--raised)">{rects(COWL_SHINE)}</g>
        <g className="clawd__eyes" style={{ transform: `translate(${eyes.x}px, ${eyes.y}px)` }}>
          {rects(EYES)}
        </g>
      </g>
    </svg>
  )
}
