import { describe, expect, it } from 'vitest'
import { appIdFor } from '../src/main/identity'
import {
  approvedByTaskManager,
  AT_LOGIN,
  isLoginLaunch,
  loginItemFor,
  startupState,
} from '../src/main/loginItem'

const packaged = {
  isPackaged: true,
  execPath: String.raw`C:\Program Files\Bat-Signal\Bat-Signal.exe`,
  appPath: '',
}
const dev = {
  isPackaged: false,
  execPath: String.raw`C:\code\bat-signal\app\node_modules\electron\dist\electron.exe`,
  appPath: String.raw`C:\code\bat-signal\app`,
}

describe('loginItemFor: what Windows is asked to start at sign-in', () => {
  it('starts the installed app, marked as a login launch', () => {
    expect(loginItemFor(true, packaged)).toEqual({
      openAtLogin: true,
      path: packaged.execPath,
      args: [AT_LOGIN],
      name: appIdFor(true),
    })
  })

  it('starts Electron on this checkout in development, so it works before the app is packaged', () => {
    expect(loginItemFor(true, dev)).toEqual({
      openAtLogin: true,
      path: dev.execPath,
      args: [dev.appPath, AT_LOGIN],
      name: appIdFor(false),
    })
  })

  it('turns off the very entry it turned on (Windows matches path and arguments)', () => {
    const on = loginItemFor(true, dev)
    expect(loginItemFor(false, dev)).toEqual({ ...on, openAtLogin: false })
  })
})

describe('isLoginLaunch', () => {
  it('knows a launch at sign-in by its flag', () => {
    expect(isLoginLaunch(['electron.exe', '.', AT_LOGIN])).toBe(true)
  })

  it('takes any other launch for the user opening it', () => {
    expect(isLoginLaunch(['Bat-Signal.exe'])).toBe(false)
    expect(isLoginLaunch(['Bat-Signal.exe', `${AT_LOGIN}x`])).toBe(false)
  })
})

describe('approvedByTaskManager: reading what Task Manager wrote (reg query)', () => {
  const row = (bytes: string) =>
    `\r\nHKEY_CURRENT_USER\\Software\\...\\StartupApproved\\Run\r\n    ${appIdFor(true)}    REG_BINARY    ${bytes}\r\n\r\n`

  it('takes an even first byte for switched on', () => {
    expect(approvedByTaskManager(row('020000000000000000000000'))).toBe(true)
    expect(approvedByTaskManager(row('060000000000000000000000'))).toBe(true)
  })

  it('takes an odd first byte for switched off', () => {
    expect(approvedByTaskManager(row('030000000000000000000000'))).toBe(false)
    expect(approvedByTaskManager(row('0300000072A54D5B1D3DD901'))).toBe(false)
  })

  it('takes an entry Task Manager never touched for switched on', () => {
    expect(approvedByTaskManager('')).toBe(true)
  })
})

describe('startupState: what the settings switch shows', () => {
  it('is on when the entry is there and Task Manager allows it', () => {
    expect(startupState({ openAtLogin: true, approved: true })).toBe('on')
  })

  it('is off when there is no entry', () => {
    expect(startupState({ openAtLogin: false, approved: true })).toBe('off')
    expect(startupState({ openAtLogin: false, approved: false })).toBe('off')
  })

  it('is blocked when the entry is there but Task Manager turned it off', () => {
    expect(startupState({ openAtLogin: true, approved: false })).toBe('blocked')
  })
})
