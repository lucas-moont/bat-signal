import type { AttentionItem } from '../../src/shared/types'
import { STANDARD_TERMS, STANDARD_VOICE, type Words } from '../../src/shared/words'

/** A Theme's words in the style of the jury's §5: Nolan's ops, a renamed stamp and count, and a Voice of its own. */
export const opsWords: Words = {
  terms: {
    ...STANDARD_TERMS,
    case: { one: 'Op', many: 'Ops' },
    needsYou: { label: 'On you', count: (n) => `${n} on you` },
    stamp: { ...STANDARD_TERMS.stamp, permission: 'Clearance', 'session-opened': 'Op opened' },
  },
  voice: { ...STANDARD_VOICE, wordmark: 'Watchful Protector' },
}

/** Claude asking to run a command. */
export const permission: AttentionItem = {
  sessionId: 's1',
  kind: 'permission',
  at: '2026-10-10T20:00:00.000Z',
  toolName: 'Bash',
  detail: 'npm test',
}
