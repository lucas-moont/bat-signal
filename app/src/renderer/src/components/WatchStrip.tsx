// The watch strip: Bat-Signal left in the corner to follow the active sessions. One row per case,
// the most urgent first; a click on a row goes to that session's terminal.
import { useEffect, useRef } from 'react'
import type { PanelLayout } from '@shared/settings'
import type { AttentionItem, SessionSnapshot } from '@shared/types'
import { orderCases, watchRow, type WatchRow } from '@shared/view'
import { batSignal } from '../bridge'
import { BatEmblem } from './BatEmblem'
import { Icon } from './Icon'
import { COPIED_NOTE, useTerminalJump } from './TerminalButton'
import './Cards.css'
import './WatchStrip.css'

export function WatchStrip({
  sessions,
  attention,
  layout,
}: {
  sessions: SessionSnapshot[]
  attention: AttentionItem[]
  layout: PanelLayout
}) {
  // The window is as tall as the strip: report every change of height to the main process.
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new ResizeObserver(() => batSignal.setWatchHeight(Math.ceil(el.scrollHeight)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const needsYou = new Set(attention.map((a) => a.sessionId)).size

  return (
    <main ref={root} className={`watch watch--${layout}`}>
      <header className="watch__bar">
        <BatEmblem size={22} />
        <h1 className="watch__name">Bat-Signal</h1>
        {needsYou > 0 && <span className="watch__count">{needsYou} need you</span>}
        <nav className="watch__actions">
          <button
            className="icon-button"
            onClick={() => batSignal.setMode('panel')}
            aria-label="Open the full panel"
            title="Open the full panel"
          >
            <Icon name="expand" />
          </button>
          <button
            className="icon-button"
            onClick={() => batSignal.setMode('signal')}
            aria-label="Fold into the signal disc"
            title="Fold into the signal disc"
          >
            <Icon name="fold" />
          </button>
        </nav>
      </header>
      {sessions.length === 0 ? (
        <p className="watch__nil">No open cases. Start Claude Code in a terminal to follow it here.</p>
      ) : (
        <ul className="watch__rows">
          {orderCases(sessions, attention).map((s) => (
            <Row key={s.sessionId} sessionId={s.sessionId} row={watchRow(s, attention)} />
          ))}
        </ul>
      )}
    </main>
  )
}

function Row({ sessionId, row }: { sessionId: string; row: WatchRow }) {
  const { go, busy, copied, warm } = useTerminalJump(sessionId)
  return (
    <li>
      <button
        className={`watch-row watch-row--${row.tone}`}
        onClick={go}
        onPointerEnter={warm}
        onFocus={warm}
        aria-busy={busy}
        title="Go to the terminal"
      >
        <span className="watch-row__stamp stamp">{row.stamp}</span>
        <span className="watch-row__title">{row.title}</span>
        {row.progress && <span className="watch-row__progress">{row.progress}</span>}
        {(copied || row.line) && (
          <span className="watch-row__line" role={copied ? 'status' : undefined}>
            {copied ? COPIED_NOTE : row.line}
          </span>
        )}
      </button>
    </li>
  )
}
