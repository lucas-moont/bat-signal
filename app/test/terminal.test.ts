import { describe, expect, it } from 'vitest'
import { findWindowOwner, type ProcessInfo } from '../src/main/terminal'

const proc = (pid: number, ppid: number, name: string, hasWindow = false): ProcessInfo => ({
  pid,
  ppid,
  name,
  hasWindow,
})

describe('findWindowOwner', () => {
  it('walks up from the session to the first process with a window', () => {
    const processes = [
      proc(500, 0, 'wininit.exe'),
      proc(10, 500, 'WindowsTerminal.exe', true),
      proc(20, 10, 'pwsh.exe'),
      proc(30, 20, 'claude.exe'),
    ]
    expect(findWindowOwner(processes, 30)).toBe(10)
  })
})

describe('findWindowOwner edge cases', () => {
  it('finds nothing when no ancestor has a window', () => {
    const processes = [proc(500, 0, 'services.exe'), proc(20, 500, 'pwsh.exe'), proc(30, 20, 'claude.exe')]
    expect(findWindowOwner(processes, 30)).toBeUndefined()
  })

  it('finds nothing for a process that is gone', () => {
    expect(findWindowOwner([proc(10, 0, 'WindowsTerminal.exe', true)], 99)).toBeUndefined()
  })

  it('stops on a parent loop left by a reused pid instead of spinning forever', () => {
    const processes = [proc(20, 30, 'pwsh.exe'), proc(30, 20, 'claude.exe')]
    expect(findWindowOwner(processes, 30)).toBeUndefined()
  })

  it('stops before system processes, which never host a session', () => {
    const processes = [proc(4, 0, 'System'), proc(800, 4, 'svchost.exe', true), proc(30, 800, 'claude.exe')]
    expect(findWindowOwner(processes, 30)).toBeUndefined()
  })
})
