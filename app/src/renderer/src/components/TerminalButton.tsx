// Goes to a session's terminal: brings its window and tab to the front, or copies the command
// that resumes it when no window hosts it.
import { useEffect, useRef, useState } from 'react'
import { batSignal } from '../bridge'
import { Icon } from './Icon'

/** How long "Resume command copied" stays up. */
const NOTE_MS = 2600

export function TerminalButton({
  sessionId,
  label,
  className = '',
}: {
  sessionId: string
  /** Show a word next to the icon (the case detail has room for one). */
  label?: string
  className?: string
}) {
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const go = async () => {
    if (busy) return
    setBusy(true)
    const outcome = await batSignal.goToTerminal(sessionId).finally(() => setBusy(false))
    if (outcome !== 'copied') return
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), NOTE_MS)
  }

  return (
    <span className={`terminal-button ${className}`}>
      <button
        className={`icon-button${label ? ' icon-button--labelled' : ''}`}
        onPointerEnter={batSignal.warmTerminal}
        onFocus={batSignal.warmTerminal}
        onClick={go}
        aria-busy={busy}
        aria-label="Go to the terminal"
        title="Go to the terminal"
      >
        <Icon name="terminal" />
        {label && <span>{label}</span>}
      </button>
      {copied && (
        <span className="terminal-button__note" role="status">
          No window found. Resume command copied.
        </span>
      )}
    </span>
  )
}
