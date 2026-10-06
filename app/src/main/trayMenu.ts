// What the tray icon shows and offers, from the snapshot and the mode. Pure, so it is tested
// without a tray (tray.ts turns it into Electron's icon, tooltip and menu).
import type { ViewMode, WindowMode } from '../shared/settings'
import type { StoreSnapshot } from '../shared/types'
import { needsYouCount } from '../shared/view'

/** The icon lights up while something needs you, like the disc. */
export function trayLook({ attention }: StoreSnapshot): { lit: boolean; tooltip: string } {
  const count = attention.length
  return {
    lit: count > 0,
    tooltip: `Bat-Signal · ${count ? needsYouCount(count) : 'all quiet'}`,
  }
}

export type TrayAction = 'showHide' | ViewMode | 'settings' | 'quit'

/** A menu line, or a separator. A line with `checked` is one of a radio group. */
export type TrayItem = 'separator' | { label: string; action: TrayAction; checked?: boolean }

export function trayMenu(mode: WindowMode): TrayItem[] {
  return [
    { label: mode === 'hidden' ? 'Show Bat-Signal' : 'Hide Bat-Signal', action: 'showHide' },
    'separator',
    { label: 'Disc', action: 'signal', checked: mode === 'signal' },
    { label: 'Panel', action: 'panel', checked: mode === 'panel' },
    { label: 'Watch strip', action: 'watch', checked: mode === 'watch' },
    'separator',
    { label: 'Settings…', action: 'settings' },
    'separator',
    { label: 'Quit Bat-Signal', action: 'quit' },
  ]
}
