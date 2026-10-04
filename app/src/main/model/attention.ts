import { ATTENTION_URGENCY as URGENCY, type AttentionItem, type SessionView } from '../../shared/types'

const STALLED_AFTER_MS = 30 * 60 * 1000

/** Everything that needs the user, most urgent first. */
export function deriveAttention(sessions: SessionView[], now: Date): AttentionItem[] {
  const items = sessions.flatMap(({ state, signals, status, seenAt }) => {
    const sessionId = state.sessionId
    const found: AttentionItem[] = []
    const { pendingPermission, error, waitingSince, lastStopAt } = signals

    if (pendingPermission) {
      const { toolName, detail, at } = pendingPermission
      found.push({ sessionId, kind: 'permission', at, toolName, ...(detail ? { detail } : {}) })
    }
    if (error) found.push({ sessionId, kind: 'error', at: error.at, detail: error.type })

    if (waitingSince && !seenSince(seenAt, waitingSince)) {
      found.push({ sessionId, kind: 'waiting', at: waitingSince })
    } else if (lastStopAt && status !== 'busy' && !seenSince(seenAt, lastStopAt)) {
      found.push({ sessionId, kind: 'reply', at: lastStopAt })
    }

    // "Stalled" means no news at all: neither the task nor its session moved recently.
    const sessionQuietFor = now.getTime() - time(state.lastActivityAt)
    if (status !== 'busy' && sessionQuietFor >= STALLED_AFTER_MS) {
      for (const task of state.tasks) {
        const since = task.history.at(-1)?.at
        if (task.status === 'in_progress' && since && now.getTime() - time(since) >= STALLED_AFTER_MS) {
          found.push({ sessionId, kind: 'stalled', at: since, taskId: task.id, detail: task.subject })
        }
      }
    }
    return found
  })

  return items.sort((a, b) => URGENCY[a.kind] - URGENCY[b.kind] || time(b.at) - time(a.at))
}

/** Epoch ms, with missing or unparseable times sorting as the oldest. */
const time = (iso: string | undefined): number => (iso && Date.parse(iso)) || 0

const seenSince = (seenAt: string | undefined, at: string): boolean =>
  seenAt !== undefined && time(seenAt) >= time(at)
