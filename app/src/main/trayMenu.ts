// What the tray icon shows and offers, from the snapshot and the mode. Pure, so it is tested
// without a tray (tray.ts turns it into Electron's icon, tooltip and menu).
import type { WindowMode } from '../shared/settings'
import type { StoreSnapshot } from '../shared/types'

/** The icon lights up while something needs you, like the disc. */
export function trayLook({ attention }: StoreSnapshot): { lit: boolean; tooltip: string } {
  const count = attention.length
  return {
    lit: count > 0,
    tooltip: `Bat-Signal · ${count ? `${count} need${count === 1 ? 's' : ''} you` : 'all quiet'}`,
  }
}

export type TrayAction = 'showHide' | 'signal' | 'panel' | 'watch' | 'settings' | 'quit'

export type TrayItem =
  | { kind: 'item'; label: string; action: TrayAction }
  | { kind: 'radio'; label: string; action: TrayAction; checked: boolean }
  | { kind: 'separator' }

const VIEWS = [
  ['signal', 'Disc'],
  ['panel', 'Panel'],
  ['watch', 'Watch strip'],
] as const

export function trayMenu(mode: WindowMode): TrayItem[] {
  const separator = { kind: 'separator' } as const
  return [
    { kind: 'item', label: mode === 'hidden' ? 'Show Bat-Signal' : 'Hide Bat-Signal', action: 'showHide' },
    separator,
    ...VIEWS.map(([view, label]): TrayItem => ({
      kind: 'radio',
      label,
      action: view,
      checked: mode === view,
    })),
    separator,
    { kind: 'item', label: 'Settings…', action: 'settings' },
    separator,
    { kind: 'item', label: 'Quit Bat-Signal', action: 'quit' },
  ]
}
