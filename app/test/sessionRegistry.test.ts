import { describe, expect, it } from 'vitest'
import { isSessionAlive, parseEntry, type ProcessProbe } from '../src/main/sources/sessionRegistry'
import { registryEntry as entry } from './fixtures/lines'

/** Fake OS: pid → process start time (Windows FILETIME). */
const probe = (processes: Record<number, string>): ProcessProbe => ({
  isRunning: (pid) => pid in processes,
  startTimes: async (pids) => new Map(pids.map((pid) => [pid, processes[pid] ?? null])),
})

describe('isSessionAlive', () => {
  it('is false when the process is gone', async () => {
    expect(await isSessionAlive(entry(), probe({}))).toBe(false)
  })
})

describe('isSessionAlive with a running pid', () => {
  it('is true when the process started at the recorded time', async () => {
    expect(await isSessionAlive(entry(), probe({ 4242: '134355583899737171' }))).toBe(true)
  })

  it('is false when the pid was reused by a newer process', async () => {
    expect(await isSessionAlive(entry(), probe({ 4242: '134399999999999999' }))).toBe(false)
  })
})

describe('isSessionAlive for files without procStart', () => {
  it('trusts the pid alone', async () => {
    expect(await isSessionAlive(entry({ procStart: undefined }), probe({ 4242: '134355583899737171' }))).toBe(
      true,
    )
  })
})

describe('parseEntry: one session file', () => {
  const file = (sessionId: string) =>
    JSON.stringify({ pid: 4242, sessionId, cwd: '/home/bruce/wayne-enterprises', status: 'busy' })

  it('reads a session whose id is a UUID', () => {
    expect(parseEntry(file('00000000-0000-4000-8000-000000000001'))).toMatchObject({
      pid: 4242,
      sessionId: '00000000-0000-4000-8000-000000000001',
      status: 'busy',
    })
  })

  // The id goes into a file path (the transcript) and onto the clipboard (claude --resume <id>):
  // a file that names anything else is not a session to trust.
  it('skips a session whose id is not a UUID', () => {
    for (const id of [
      'x & calc',
      'x\r\ncalc',
      String.raw`..\..\elsewhere`,
      '00000000-0000-4000-8000-00000000000Z',
      '',
    ])
      expect(parseEntry(file(id)), id).toBeNull()
  })
})
