import { useEffect, useRef } from 'react'
import type { MascotMood } from '@shared/view'
import { BatClawd } from './BatClawd'
import { BatEmblem } from './BatEmblem'
import { Icon } from './Icon'

/** How long the pointer must rest on the pill before it opens the full window. */
const HOVER_OPEN_MS = 700

/**
 * The shrunken window: emblem, counter and mascot. Rest the pointer on it to open the full
 * window again. The emblem is the drag handle: on Windows a drag region swallows pointer
 * events, so the rest of the pill must stay a normal area for hover to work.
 */
export function Pill({
  needsYou,
  mood,
  onExpand,
}: {
  needsYou: number
  mood: MascotMood
  onExpand: () => void
}) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const cancel = () => clearTimeout(timer.current)
  useEffect(() => cancel, [])

  return (
    <div className={`pill${needsYou ? ' pill--alert' : ''}`}>
      <span className="pill__grip" title="Drag to move">
        <BatEmblem size={30} />
      </span>
      {/* Resting here opens the window; the grip is left out so dragging never triggers it. */}
      <div
        className="pill__body"
        onPointerEnter={() => {
          cancel()
          timer.current = setTimeout(onExpand, HOVER_OPEN_MS)
        }}
        onPointerLeave={cancel}
      >
        <span className="pill__count">{needsYou || '—'}</span>
        <div className="pill__mascot">
          <BatClawd mood={mood} size={36} />
        </div>
        <button className="icon-button" onClick={onExpand} aria-label="Open the full window" title="Open">
          <Icon name="expand" />
        </button>
      </div>
    </div>
  )
}
