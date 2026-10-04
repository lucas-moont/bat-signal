import type { MascotMood } from '@shared/view'
import { BatClawd } from './BatClawd'
import { BatEmblem } from './BatEmblem'
import { Icon } from './Icon'

/** The shrunken window: emblem, counter and mascot. Drag it anywhere; the arrow brings the full window back. */
export function Pill({
  needsYou,
  mood,
  onExpand,
}: {
  needsYou: number
  mood: MascotMood
  onExpand: () => void
}) {
  return (
    <div className={`pill${needsYou ? ' pill--alert' : ''}`}>
      <BatEmblem size={30} />
      <span className="pill__count">{needsYou || '—'}</span>
      <div className="pill__mascot">
        <BatClawd mood={mood} size={36} />
      </div>
      <button className="icon-button" onClick={onExpand} aria-label="Open the full window" title="Open">
        <Icon name="expand" />
      </button>
    </div>
  )
}
