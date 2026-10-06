// The global shortcut as Electron writes it ("Ctrl+Alt+B"): recorded from a key press in the
// settings sheet, read back from settings.json, and shown as keycaps. One rule for all three, so a
// shortcut the sheet records is one the main process can register, and the other way round.

/** What a keydown carries that matters here. Keys are read by place (code), not by character. */
export interface KeyLike {
  code: string
  ctrlKey: boolean
  altKey: boolean
  shiftKey: boolean
  metaKey: boolean
}

export type Recorded =
  /** Only modifiers so far: keep listening. */
  | { kind: 'partial' }
  /** Esc: leave the shortcut as it was. */
  | { kind: 'cancel' }
  /** Backspace or Delete: no shortcut. */
  | { kind: 'clear' }
  | { kind: 'invalid'; reason: string }
  | { kind: 'ok'; accelerator: string }

const MODIFIERS = ['Ctrl', 'Alt', 'Shift', 'Super'] as const
type Modifier = (typeof MODIFIERS)[number]

const MODIFIER_ALIASES: Record<string, Modifier> = {
  ctrl: 'Ctrl',
  control: 'Ctrl',
  cmdorctrl: 'Ctrl',
  commandorcontrol: 'Ctrl',
  alt: 'Alt',
  option: 'Alt',
  shift: 'Shift',
  super: 'Super',
  meta: 'Super',
  win: 'Super',
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)

/** The keys a shortcut may end in, by KeyboardEvent.code, with their Electron names. */
const KEYS = new Map<string, string>([
  ...range(65, 90).map((c): [string, string] => [`Key${String.fromCharCode(c)}`, String.fromCharCode(c)]),
  ...range(0, 9).map((d): [string, string] => [`Digit${d}`, `${d}`]),
  ...range(0, 9).map((d): [string, string] => [`Numpad${d}`, `num${d}`]),
  ...range(1, 24).map((n): [string, string] => [`F${n}`, `F${n}`]),
  ['ArrowUp', 'Up'],
  ['ArrowDown', 'Down'],
  ['ArrowLeft', 'Left'],
  ['ArrowRight', 'Right'],
  ...['Space', 'Home', 'End', 'PageUp', 'PageDown', 'Insert'].map((k): [string, string] => [k, k]),
])
/** Electron key names, by their lowercase spelling (settings.json may be written by hand). */
const KEY_NAMES = new Map([...KEYS.values()].map((name) => [name.toLowerCase(), name]))

const MODIFIER_CODES = /^(Control|Alt|Shift|Meta)(Left|Right)$/

/** F13 to F24 type nothing, so they may stand alone; anything else needs Ctrl, Alt or Win. */
const standsAlone = (key: string) => /^F(1[3-9]|2[0-4])$/.test(key)

function compose(modifiers: ReadonlySet<Modifier>, key: string): Recorded {
  if (!standsAlone(key) && !['Ctrl', 'Alt', 'Super'].some((m) => modifiers.has(m as Modifier)))
    return { kind: 'invalid', reason: 'Add Ctrl, Alt or Win, so typing never triggers it' }
  return { kind: 'ok', accelerator: [...MODIFIERS.filter((m) => modifiers.has(m)), key].join('+') }
}

export function acceleratorFromKey(e: KeyLike): Recorded {
  if (MODIFIER_CODES.test(e.code)) return { kind: 'partial' }
  const bare = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey
  if (bare && e.code === 'Escape') return { kind: 'cancel' }
  if (bare && (e.code === 'Backspace' || e.code === 'Delete')) return { kind: 'clear' }
  const key = KEYS.get(e.code)
  if (!key) return { kind: 'invalid', reason: 'Use a letter, a number, an F key or an arrow' }
  const modifiers = new Set<Modifier>()
  if (e.ctrlKey) modifiers.add('Ctrl')
  if (e.altKey) modifiers.add('Alt')
  if (e.shiftKey) modifiers.add('Shift')
  if (e.metaKey) modifiers.add('Super')
  return compose(modifiers, key)
}

/** A shortcut from untrusted text, written the one way; undefined if it is no valid shortcut. */
export function normalizeAccelerator(raw: string): string | undefined {
  const tokens = raw.split('+').map((t) => t.trim().toLowerCase())
  const modifiers = new Set<Modifier>()
  let key: string | undefined
  for (const token of tokens) {
    const modifier = MODIFIER_ALIASES[token]
    if (modifier) {
      if (modifiers.has(modifier)) return undefined
      modifiers.add(modifier)
    } else {
      const name = KEY_NAMES.get(token)
      if (!name || key) return undefined
      key = name
    }
  }
  if (!key) return undefined
  const recorded = compose(modifiers, key)
  return recorded.kind === 'ok' ? recorded.accelerator : undefined
}

/** The keys to draw for a shortcut; the Windows key by the name on the keyboard. */
export const keycaps = (accelerator: string): string[] =>
  accelerator.split('+').map((key) => (key === 'Super' ? 'Win' : key))
