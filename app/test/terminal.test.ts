import { describe, expect, it } from 'vitest'
import {
  findWindowOwner,
  pickSessionWindow,
  pickTab,
  pickWindowTab,
  resumeCommand,
  type DesktopWindow,
  type ProcessInfo,
} from '../src/main/terminal'

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

describe('pickTab with punctuation', () => {
  it('matches a session name that itself starts with punctuation', () => {
    expect(pickTab(['◑ [wip] api'], '[wip] api')).toBe(0)
  })
})

describe('pickWindowTab', () => {
  const windows = [
    { handle: 111, pid: 10, titles: ['✳ m3-doom-part-2', 'Command Prompt'] },
    { handle: 222, pid: 10, titles: ['◑ bat-computer'] },
  ]

  it('finds the window holding the tab of the session, not just the first window', () => {
    expect(pickWindowTab(windows, 'bat-computer')).toEqual({ handle: 222, pid: 10, tab: 0 })
  })

  it('finds nothing when no window has a tab of that name', () => {
    expect(pickWindowTab(windows, 'gcpd')).toBeUndefined()
    expect(pickWindowTab(windows, undefined)).toBeUndefined()
  })
})

describe('resumeCommand', () => {
  it('is what reopens the session in a terminal', () => {
    expect(resumeCommand('0b1e2d3c-4a5b-4c6d-8e7f-9a0b1c2d3e4f')).toBe(
      'claude --resume 0b1e2d3c-4a5b-4c6d-8e7f-9a0b1c2d3e4f',
    )
  })
})

describe('pickSessionWindow: the window of a session on Linux', () => {
  const win = (id: string, pid: number, title: string, focusOrder: number): DesktopWindow => ({
    id,
    pid,
    title,
    focusOrder,
  })
  // A session in a shell, in a terminal that hosts every window in one process (Ghostty, kitty).
  const ancestors = [
    { pid: 30, ppid: 20, name: 'claude' },
    { pid: 20, ppid: 10, name: 'zsh' },
    { pid: 10, ppid: 1, name: 'ghostty' },
    { pid: 1, ppid: 0, name: 'systemd' },
  ]

  it("picks, among its terminal's windows, the one titled with its name", () => {
    const windows = [
      win('0xa', 10, '◐ other case', 0),
      win('0xb', 10, '✳ bat-computer', 2),
      win('0xc', 99, 'Browser', 1),
    ]
    expect(pickSessionWindow(windows, ancestors, 30, 'bat-computer')?.id).toBe('0xb')
  })

  it('picks the window of its terminal used last when no title names it', () => {
    const windows = [win('0xa', 10, 'zsh', 3), win('0xb', 10, 'vim', 1), win('0xc', 99, 'Browser', 0)]
    expect(pickSessionWindow(windows, ancestors, 30, 'bat-computer')?.id).toBe('0xb')
  })

  it('falls back on a title anywhere when no ancestor owns a window (tmux, ssh)', () => {
    const detached = [
      { pid: 30, ppid: 20, name: 'claude' },
      { pid: 20, ppid: 1, name: 'tmux: server' },
    ]
    const windows = [win('0xa', 10, '◐ bat-computer', 1), win('0xc', 99, 'Browser', 0)]
    expect(pickSessionWindow(windows, detached, 30, 'bat-computer')?.id).toBe('0xa')
    expect(pickSessionWindow(windows, detached, 30, 'gcpd')).toBeUndefined()
  })

  it('picks the editor that hosts the session in its own terminal', () => {
    const inEditor = [
      { pid: 30, ppid: 25, name: 'claude' },
      { pid: 25, ppid: 15, name: 'bash' },
      { pid: 15, ppid: 1, name: 'code' },
    ]
    expect(pickSessionWindow([win('0xe', 15, 'app.ts - bat-signal', 0)], inEditor, 30, 'gcpd')?.id).toBe(
      '0xe',
    )
  })
})
