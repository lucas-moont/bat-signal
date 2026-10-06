// The global shortcut in the settings sheet: its keys, and a click to record new ones. While
// recording, the main process lets the current shortcut go, so its keys reach this page.
import { useEffect, useEffectEvent, useState } from 'react'
import { acceleratorFromKey, keycaps } from '@shared/accelerator'
import type { ShortcutStatus } from '@shared/status'
import { batSignal } from '../bridge'
import { SettingRow } from './SettingRow'

const HINTS: Record<ShortcutStatus['state'], string> = {
  active: 'Opens and folds Bat-Signal from any app',
  off: 'Off: click to set one',
  taken: 'Another app (or Windows) already uses it: click to pick another',
}

export function ShortcutField({
  status,
  onChange,
}: {
  status: ShortcutStatus
  onChange: (shortcut: string) => void
}) {
  // null while not recording; while recording, what was wrong with the last keys ('' if nothing).
  const [problem, setProblem] = useState<string | null>(null)
  const recording = problem !== null
  // The sheet re-renders with every snapshot: recording must not restart (and let the shortcut
  // go and come back) each time.
  const commit = useEffectEvent(onChange)

  useEffect(() => {
    if (!recording) return
    batSignal.recordShortcut(true)
    // Capture, before the sheet's own keys (Esc closes it) and before anything else on the page.
    const onKey = (e: KeyboardEvent) => {
      // Tab leaves, as it leaves any field: keyboard users move on instead of being held here.
      if (e.code === 'Tab') return setProblem(null)
      e.preventDefault()
      e.stopPropagation()
      const recorded = acceleratorFromKey(e)
      if (recorded.kind === 'partial') return
      if (recorded.kind === 'invalid') return setProblem(recorded.reason)
      if (recorded.kind === 'ok') commit(recorded.accelerator)
      if (recorded.kind === 'clear') commit('')
      setProblem(null)
    }
    window.addEventListener('keydown', onKey, { capture: true })
    return () => {
      window.removeEventListener('keydown', onKey, { capture: true })
      batSignal.recordShortcut(false)
    }
  }, [recording])

  const word = recording ? 'Press keys' : status.accelerator ? '' : 'Off'
  return (
    <SettingRow
      label="Global shortcut"
      hint={recording ? problem || 'Esc cancels · Backspace turns it off' : HINTS[status.state]}
      warn={!recording && status.state === 'taken'}
    >
      <button
        className={`shortcut__keys${recording ? ' shortcut__keys--recording' : ''}`}
        onClick={() => setProblem('')}
        onBlur={() => setProblem(null)}
        aria-label={recording ? 'Press the new shortcut' : 'Change the global shortcut'}
      >
        {word ? (
          <span className="shortcut__word">{word}</span>
        ) : (
          keycaps(status.accelerator).map((key) => (
            <kbd key={key} className="chip">
              {key}
            </kbd>
          ))
        )}
      </button>
    </SettingRow>
  )
}
