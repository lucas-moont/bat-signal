// The opening: a searchlight cuts through the dark and the emblem flickers on, like a
// failing neon sign. About 1.4s; a click skips it.
import { useEffect, useState } from 'react'
import { BatEmblem } from './BatEmblem'
import './BatSignalIntro.css'

const DURATION_MS = 1400

/** Plays once when mounted, then removes itself. */
export function BatSignalIntro() {
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const leave = setTimeout(() => setLeaving(true), DURATION_MS - 300)
    const end = setTimeout(() => setDone(true), DURATION_MS)
    return () => {
      clearTimeout(leave)
      clearTimeout(end)
    }
  }, [])

  if (done) return null

  return (
    <div
      className={`intro${leaving ? ' intro--leaving' : ''}`}
      onClick={() => setDone(true)}
      role="presentation"
    >
      <div className="intro__beam" />
      <div className="intro__signal">
        <BatEmblem size={120} />
      </div>
      <div className="intro__title">BATCAVE</div>
    </div>
  )
}
