// The opening: a searchlight cuts through the dark and the emblem flickers on, like a
// failing neon sign. About 1.4s; a click skips it.
import { useEffect, useState } from 'react'
import { BatEmblem } from './BatEmblem'
import './BatSignalIntro.css'

const DURATION_MS = 1400

export function BatSignalIntro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leave = setTimeout(() => setLeaving(true), DURATION_MS - 300)
    const done = setTimeout(onDone, DURATION_MS)
    return () => {
      clearTimeout(leave)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div className={`intro${leaving ? ' intro--leaving' : ''}`} onClick={onDone} role="presentation">
      <div className="intro__beam" />
      <div className="intro__signal">
        <BatEmblem size={120} />
      </div>
      <div className="intro__title">BATCAVE</div>
    </div>
  )
}
