import { describe, expect, it } from 'vitest'
import { findWindowOwner, pickTab, type ProcessInfo } from '../src/main/terminal'

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

describe('pickTab', () => {
  const tabs = ['✳ m3-doom-part-2', '◑ bat-computer', 'Command Prompt']

  it("finds the tab titled with the session's name, past Claude Code's status glyph", () => {
    expect(pickTab(tabs, 'bat-computer')).toBe(1)
  })
})

describe('pickTab when there is no clear match', () => {
  const tabs = ['✳ bat-computer-old', '◑ bat-computer', '✳ bat-computer']

  it('matches the whole name, never a longer one that starts with it', () => {
    expect(pickTab(['✳ bat-computer-old'], 'bat-computer')).toBeUndefined()
  })

  it('takes the first of two tabs with the same name', () => {
    expect(pickTab(tabs, 'bat-computer')).toBe(1)
  })

  it('finds nothing for a session without a name, or with no tab of its name', () => {
    expect(pickTab(tabs, undefined)).toBeUndefined()
    expect(pickTab(tabs, 'gcpd')).toBeUndefined()
  })

  it('matches a title that has no glyph at all', () => {
    expect(pickTab(['gcpd'], 'gcpd')).toBe(0)
  })
})
