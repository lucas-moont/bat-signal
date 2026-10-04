// A made-up Gotham night that exercises every state the window can show. Used for
// screenshots (BATCAVE_DEMO=1) and when the renderer runs in a plain browser.
import type { SessionSnapshot, StoreSnapshot, Task } from './types'

const ago = (now: Date, minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString()

export function demoSnapshot(now = new Date()): StoreSnapshot {
  const t = (minutes: number) => ago(now, minutes)
  const task = (
    id: string,
    subject: string,
    status: Task['status'],
    since: number,
    activeForm?: string,
  ): Task => ({
    id,
    subject,
    activeForm,
    description: `${subject}, before the Riddler's next move.`,
    status,
    history: [
      { status: 'pending', at: t(since + 6) },
      ...(status !== 'pending' ? [{ status: 'in_progress' as const, at: t(since + 3) }] : []),
      ...(status === 'completed' ? [{ status: 'completed' as const, at: t(since) }] : []),
    ],
  })
  const base = (
    sessionId: string,
    title: string,
    cwd: string,
  ): Omit<SessionSnapshot, 'status' | 'signals'> => ({
    sessionId,
    title,
    titleSource: 'ai',
    cwd,
    pid: 4000 + sessionId.charCodeAt(0),
    messages: [],
    tasks: [],
    subagents: [],
    background: [],
    lastActivityAt: t(1),
  })

  const sessions: SessionSnapshot[] = [
    {
      ...base('a3f9c2e1-riddler', 'Decode the Riddler’s cipher', '~/gcpd/evidence'),
      status: 'idle',
      signals: {
        pendingPermission: {
          toolName: 'Bash',
          detail: 'rm -rf ./old-case-files',
          toolUseId: 'toolu_1',
          at: t(1),
        },
      },
      messages: [
        { role: 'user', text: 'Clean up the old case files and decode the new card.', at: t(6) },
        {
          role: 'assistant',
          text: 'The cipher maps each letter to its position in “YOU ARE EL RATA ALADA”.',
          at: t(2),
        },
      ],
      tasks: [
        task('1', 'Collect the greeting cards', 'completed', 20),
        task('2', 'Map the cipher alphabet', 'completed', 9),
        task('3', 'Clear the old evidence folder', 'in_progress', 2, 'Clearing the old evidence folder'),
        task('4', 'Write the decoded message to the case file', 'pending', 0),
      ],
    },
    {
      ...base('7b21d004-batmobile', 'Tune the Batmobile’s engine', '~/wayne/garage'),
      status: 'busy',
      signals: {},
      messages: [
        { role: 'user', text: 'Get the engine telemetry dashboard running.', at: t(12) },
        {
          role: 'assistant',
          text: 'Starting the dev server and profiling the ignition sequence now.',
          at: t(0.3),
        },
      ],
      tasks: [
        task('1', 'Read the engine telemetry', 'completed', 10),
        task('2', 'Profile the ignition sequence', 'in_progress', 1, 'Profiling the ignition sequence'),
        task('3', 'Patch the fuel map', 'pending', 0),
      ],
      subagents: [
        {
          toolUseId: 'toolu_a',
          agentId: 'a1',
          agentType: 'Explore',
          description: 'Search the garage logs',
          prompt: 'Find every ignition failure in the garage logs since March.',
          status: 'running',
          startedAt: t(3),
          lastMessage: 'Found 14 failures, all after a cold start.',
        },
        {
          toolUseId: 'toolu_b',
          agentId: 'a2',
          agentType: 'Plan',
          description: 'Plan the fuel map patch',
          status: 'completed',
          startedAt: t(9),
          endedAt: t(5),
          summary: 'Three-step patch, no downtime',
        },
      ],
      background: [
        {
          id: 'bjob1',
          toolUseId: 'toolu_c',
          command: 'npm run telemetry -- --watch',
          description: 'Telemetry dashboard',
          status: 'running',
          startedAt: t(8),
        },
      ],
    },
    {
      ...base('e5c0aa91-penguin', 'Trace the Iceberg Lounge shipments', '~/gcpd/penguin'),
      status: 'idle',
      signals: { lastStopAt: t(4) },
      messages: [
        {
          role: 'assistant',
          text: 'Every crate on the manifest routes through dock 7 on Thursdays.',
          at: t(4),
        },
      ],
      tasks: [task('1', 'Cross-check the manifests', 'completed', 4)],
    },
    {
      ...base('c81f3b77-alfred', 'Answer Alfred’s questions', '~/wayne/manor'),
      status: 'idle',
      signals: { waitingSince: t(7) },
      messages: [{ role: 'assistant', text: 'Should the backups go to the cave or the manor?', at: t(7) }],
    },
    {
      ...base('9d4e2b10-oz', 'Index the GCPD archive', '~/gcpd/archive'),
      status: 'idle',
      signals: { error: { type: 'rate_limit', at: t(15) }, lastStopAt: t(15) },
      lastActivityAt: t(40),
      tasks: [task('1', 'Index the 1990s case boxes', 'in_progress', 38, 'Indexing the 1990s case boxes')],
    },
  ]

  return {
    sessions,
    attention: [
      {
        sessionId: 'a3f9c2e1-riddler',
        kind: 'permission',
        toolName: 'Bash',
        detail: 'rm -rf ./old-case-files',
        at: t(1),
      },
      { sessionId: '9d4e2b10-oz', kind: 'error', detail: 'rate_limit', at: t(15) },
      { sessionId: 'c81f3b77-alfred', kind: 'waiting', at: t(7) },
      { sessionId: 'e5c0aa91-penguin', kind: 'reply', at: t(4) },
      {
        sessionId: '9d4e2b10-oz',
        kind: 'stalled',
        taskId: '1',
        detail: 'Index the 1990s case boxes',
        at: t(38),
      },
    ],
  }
}

/** The same night with nothing pending and nobody working: Bat-Clawd sleeps. */
export function quietDemoSnapshot(now = new Date()): StoreSnapshot {
  const { sessions } = demoSnapshot(now)
  return {
    sessions: sessions.slice(1, 3).map((s) => ({ ...s, status: 'idle', signals: {} })),
    attention: [],
  }
}

/** The night a moment earlier, before the Riddler asked to run something: news for the Bat-Signal demo. */
export function beforeNewsDemoSnapshot(now = new Date()): StoreSnapshot {
  const snapshot = demoSnapshot(now)
  return { ...snapshot, attention: snapshot.attention.filter((a) => a.kind !== 'permission') }
}
