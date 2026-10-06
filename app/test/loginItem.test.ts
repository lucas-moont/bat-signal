import { describe, expect, it } from 'vitest'
import { AT_LOGIN, launchOptions, loginItemFor, startupState } from '../src/main/loginItem'

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
    })
  })

  it('starts Electron on this checkout in development, so it works before Phase 5 packages it', () => {
    expect(loginItemFor(true, dev)).toEqual({
      openAtLogin: true,
      path: dev.execPath,
      args: [dev.appPath, AT_LOGIN],
    })
  })

  it('turns off the very entry it turned on (Windows matches path and arguments)', () => {
    const on = loginItemFor(true, dev)
    expect(loginItemFor(false, dev)).toEqual({ ...on, openAtLogin: false })
  })
})

describe('launchOptions', () => {
  it('knows a launch at sign-in by its flag', () => {
    expect(launchOptions(['electron.exe', '.', AT_LOGIN])).toEqual({ atLogin: true })
  })

  it('takes any other launch for the user opening it', () => {
    expect(launchOptions(['Bat-Signal.exe'])).toEqual({ atLogin: false })
    expect(launchOptions(['Bat-Signal.exe', `${AT_LOGIN}x`])).toEqual({ atLogin: false })
  })
})

describe('startupState: what the settings switch shows', () => {
  it('is on when Windows will start Bat-Signal at sign-in', () => {
    expect(startupState({ openAtLogin: true, executableWillLaunchAtLogin: true })).toBe('on')
  })

  it('is off when there is no entry', () => {
    expect(startupState({ openAtLogin: false, executableWillLaunchAtLogin: false })).toBe('off')
  })

  it('is blocked when the entry is there but Task Manager turned it off', () => {
    expect(startupState({ openAtLogin: true, executableWillLaunchAtLogin: false })).toBe('blocked')
  })
})
