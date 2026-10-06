// The global shortcut in the settings sheet: its keys, and a click to record new ones. While
// recording, the main process lets the current shortcut go, so its keys reach this page.
import { useEffect, useEffectEvent, useState } from 'react'
import { acceleratorFromKey, keycaps } from '@shared/accelerator'
import type { ShortcutStatus } from '@shared/status'
import { batSignal } from '../bridge'

const HINTS: Record<ShortcutStatus['state'], string> = {
  active: 'Opens and folds Bat-Signal from any app',
  off: 'Off: click to set one',
  taken: 'Another app already uses it: click to pick another',
}

export function ShortcutField({
  status,
  onChange,
}: {
  status: ShortcutStatus
  onChange: (shortcut: string) => void
}) {
  const [recording, setRecording] = useState(false)
  const [problem, setProblem] = useState('')
  // The sheet re-renders with every snapshot: recording must not restart (and let the shortcut
  // go and come back) each time.
  const commit = useEffectEvent(onChange)

  useEffect(() => {
    if (!recording) return
    batSignal.recordShortcut(true)
    // Capture, before the sheet's own keys (Esc closes it) and before anything else on the page.
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const recorded = acceleratorFromKey(e)
      if (recorded.kind === 'partial') return
      if (recorded.kind === 'invalid') return setProblem(recorded.reason)
      if (recorded.kind === 'ok') commit(recorded.accelerator)
      if (recorded.kind === 'clear') commit('')
      setRecording(false)
    }
    window.addEventListener('keydown', onKey, { capture: true })
    return () => {
      window.removeEventListener('keydown', onKey, { capture: true })
      batSignal.recordShortcut(false)
    }
  }, [recording])

  const hint = recording ? problem || 'Esc cancels · Backspace turns it off' : HINTS[status.state]
  return (
    <div className="toggle shortcut">
      <span className="toggle__text">
        <span className="toggle__label">Global shortcut</span>
        <span className={`toggle__hint${status.state === 'taken' && !recording ? ' shortcut__warn' : ''}`}>
          {hint}
        </span>
      </span>
      <button
        className={`shortcut__keys${recording ? ' shortcut__keys--recording' : ''}`}
        onClick={() => {
          setProblem('')
          setRecording(true)
        }}
        onBlur={() => setRecording(false)}
        aria-label={recording ? 'Press the new shortcut' : 'Change the global shortcut'}
      >
        {recording ? (
          <span className="shortcut__listening">Press keys</span>
        ) : status.accelerator ? (
          keycaps(status.accelerator).map((key) => (
            <kbd key={key} className="shortcut__key">
              {key}
            </kbd>
          ))
        ) : (
          <span className="shortcut__listening">Off</span>
        )}
      </button>
    </div>
  )
}
