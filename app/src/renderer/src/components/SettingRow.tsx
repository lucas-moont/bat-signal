// One line of the settings sheet: a label, a hint under it, and its control on the right.
import type { ReactNode } from 'react'

export function SettingRow({
  label,
  hint,
  warn = false,
  as: Row = 'div',
  className = '',
  labelId,
  children,
}: {
  label: string
  hint: string
  /** The hint says something is wrong (in the warning ink). */
  warn?: boolean
  /** A label when the whole line toggles its control. */
  as?: 'div' | 'label'
  className?: string
  /** The label's id, for a control it names by aria-labelledby (a radio group). */
  labelId?: string
  children: ReactNode
}) {
  return (
    <Row className={`setting ${className}`.trim()}>
      <span className="setting__text">
        <span id={labelId} className="setting__label">
          {label}
        </span>
        <span className={`setting__hint${warn ? ' setting__hint--warn' : ''}`}>{hint}</span>
      </span>
      {children}
    </Row>
  )
}
