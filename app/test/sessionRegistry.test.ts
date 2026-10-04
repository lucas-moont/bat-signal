import { describe, expect, it } from 'vitest'
import { isSessionAlive, type ProcessProbe, type RegistryEntry } from '../src/main/sources/sessionRegistry'

const entry = (overrides: Partial<RegistryEntry> = {}): RegistryEntry => ({
  pid: 4242,
  sessionId: '00000000-0000-4000-8000-000000000001',
  cwd: '/home/bruce/wayne-enterprises',
  procStart: '134355583899737171',
  status: 'idle',
  ...overrides,
})

/** Fake OS: pid → process start time (Windows FILETIME). */
const probe = (processes: Record<number, string>): ProcessProbe => ({
  isRunning: (pid) => pid in processes,
  startTime: async (pid) => processes[pid] ?? null,
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
