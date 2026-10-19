import { describe, expect, it } from 'vitest'
import { autostartFile, autostartState, desktopEntry, execArg, launchArgs } from '../src/main/autostart'
import { appIdFor } from '../src/main/identity'
import { AT_LOGIN } from '../src/main/loginItem'

const installed = {
  isPackaged: true,
  execPath: '/opt/Bat-Signal/bat-signal',
  appPath: '/opt/Bat-Signal/resources/app.asar',
}
const dev = {
  isPackaged: false,
  execPath: '/home/bruce/code/bat-signal/app/node_modules/electron/dist/electron',
  appPath: '/home/bruce/code/bat-signal/app',
}

describe('autostartFile: where the entry lives', () => {
  it("is in the user's config folder, named after the app, apart for a checkout", () => {
    expect(autostartFile(true, { home: '/home/bruce' })).toBe(
      `/home/bruce/.config/autostart/${appIdFor(true)}.desktop`,
    )
    expect(autostartFile(false, { home: '/home/bruce' })).toBe(
      `/home/bruce/.config/autostart/${appIdFor(false)}.desktop`,
    )
  })

  it('follows $XDG_CONFIG_HOME when it is set', () => {
    expect(autostartFile(true, { home: '/home/bruce', configHome: '/cave/config' })).toBe(
      `/cave/config/autostart/${appIdFor(true)}.desktop`,
    )
  })
})

describe('launchArgs: what starts at sign-in', () => {
  it('starts the installed app, marked as a login launch', () => {
    expect(launchArgs(installed)).toEqual([installed.execPath, AT_LOGIN])
  })

  it('starts the AppImage file, not the mount it runs from this time', () => {
    expect(
      launchArgs({
        ...installed,
        execPath: '/tmp/.mount_BatSig1a2b/bat-signal',
        appImage: '/home/bruce/Apps/Bat-Signal.AppImage',
      }),
    ).toEqual(['/home/bruce/Apps/Bat-Signal.AppImage', AT_LOGIN])
  })

  it("starts a checkout's Electron with its app folder", () => {
    expect(launchArgs(dev)).toEqual([dev.execPath, dev.appPath, AT_LOGIN])
  })
})

describe('execArg: one argument of the Exec line', () => {
  it('quotes it, so a path with spaces stays one argument', () => {
    expect(execArg('/home/bruce/My Apps/bat-signal')).toBe('"/home/bruce/My Apps/bat-signal"')
  })

  it('escapes what the spec reserves inside quotes, then the file escapes its backslashes again', () => {
    expect(execArg('a"b`c$d')).toBe('"a\\\\"b\\\\`c\\\\$d"')
    expect(execArg(String.raw`a\b`)).toBe(String.raw`"a\\\\b"`)
  })

  it('doubles %, which would otherwise be a field code', () => {
    expect(execArg('/apps/100%/bat-signal')).toBe('"/apps/100%%/bat-signal"')
  })
})

describe('desktopEntry', () => {
  it('is an application entry that launches Bat-Signal at sign-in', () => {
    const entry = desktopEntry(installed)
    expect(entry.split('\n')[0]).toBe('[Desktop Entry]')
    expect(entry).toContain('Type=Application\n')
    expect(entry).toContain(`Exec="${installed.execPath}" "${AT_LOGIN}"\n`)
    expect(autostartState(entry)).toBe('on')
  })
})

describe('autostartState', () => {
  it('is off without an entry', () => {
    expect(autostartState(undefined)).toBe('off')
  })

  it('is blocked when the desktop turned the entry off', () => {
    expect(autostartState('[Desktop Entry]\nExec=bat-signal\nHidden=true\n')).toBe('blocked')
    expect(autostartState('[Desktop Entry]\nX-GNOME-Autostart-enabled=false\n')).toBe('blocked')
  })

  it('is on otherwise', () => {
    expect(autostartState('[Desktop Entry]\nHidden=false\nX-GNOME-Autostart-enabled=true\n')).toBe('on')
  })
})
