// One line of the settings sheet: a label, a hint under it, and its control on the right.
import type { ReactNode } from 'react'

export function SettingRow({
  label,
  hint,
  warn = false,
  as: Row = 'div',
  className = '',
  children,
}: {
  label: string
  hint: string
  /** The hint says something is wrong (in the warning ink). */
  warn?: boolean
  /** A label when the whole line toggles its control. */
  as?: 'div' | 'label'
  className?: string
  children: ReactNode
}) {
  return (
    <Row className={`toggle ${className}`.trim()}>
      <span className="toggle__text">
        <span className="toggle__label">{label}</span>
        <span className={`toggle__hint${warn ? ' toggle__hint--warn' : ''}`}>{hint}</span>
      </span>
      {children}
    </Row>
  )
}
