import { motion, AnimatePresence } from 'motion/react'
import type { MascotMood } from '@shared/view'
import { BatClawd } from './BatClawd'
import { BatEmblem } from './BatEmblem'
import { Icon } from './Icon'

interface HeaderProps {
  needsYou: number
  mood: MascotMood
  onSettings: () => void
  onFold: () => void
  onClose: () => void
}

/** Title bar of the frameless window: drag it to move. */
export function Header({ needsYou, mood, onSettings, onFold, onClose }: HeaderProps) {
  return (
    <header className="header">
      <BatEmblem size={34} />
      <h1 className="header__title">BATCAVE</h1>
      <AnimatePresence mode="popLayout">
        {needsYou > 0 && (
          <motion.span
            key={needsYou}
            className="header__count"
            title={`${needsYou} need${needsYou === 1 ? 's' : ''} you`}
            initial={{ scale: 1.8, opacity: 0, rotate: -14 }}
            animate={{ scale: 1, opacity: 1, rotate: -5 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 520, damping: 22 }}
          >
            {needsYou}
          </motion.span>
        )}
      </AnimatePresence>
      <div className={`header__mascot header__mascot--${mood}`}>
        <BatClawd mood={mood} />
      </div>
      <nav className="header__actions">
        <button className="icon-button" onClick={onSettings} aria-label="Settings" title="Settings">
          <Icon name="gear" />
        </button>
        <button
          className="icon-button"
          onClick={onFold}
          aria-label="Fold into the Bat-Signal"
          title="Fold into the Bat-Signal (Esc)"
        >
          <Icon name="fold" />
        </button>
        <button className="icon-button icon-button--danger" onClick={onClose} aria-label="Quit" title="Quit">
          <Icon name="close" />
        </button>
      </nav>
    </header>
  )
}

export type Tab = 'needs' | 'cases'

export function Tabs({
  tab,
  counts,
  onChange,
}: {
  tab: Tab
  counts: Record<Tab, number>
  onChange: (tab: Tab) => void
}) {
  const label: Record<Tab, string> = { needs: 'Needs you', cases: 'Cases' }
  return (
    <div className="tabs" role="tablist">
      {(['needs', 'cases'] as const).map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          className="tabs__tab"
          onClick={() => onChange(t)}
        >
          {label[t]}
          <span className="tabs__count">{counts[t]}</span>
          {tab === t && <motion.span layoutId="tab-underline" className="tabs__underline" />}
        </button>
      ))}
    </div>
  )
}
