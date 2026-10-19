// Starting at sign-in on Linux: an XDG autostart entry, ~/.config/autostart/<app id>.desktop, which
// GNOME, KDE and the session managers that follow the spec (uwsm for Hyprland, among others) run as
// the session starts. The file is the one record of the choice, as Windows' login entry is there.
// Pure, so the entry and its reading are tested without Linux.
import { posix } from 'node:path'
import type { StartupState } from '../shared/status'
import { appIdFor } from './identity'
import { AT_LOGIN, type LaunchEnv } from './loginItem'

export interface AutostartEnv extends LaunchEnv {
  /** The AppImage file, when Bat-Signal runs from one: execPath is then a mount that changes per run. */
  appImage?: string
}

/** Where the entry lives: in the user's config folder ($XDG_CONFIG_HOME, else ~/.config). */
export function autostartFile(isPackaged: boolean, env: { home: string; configHome?: string }): string {
  return posix.join(
    env.configHome || posix.join(env.home, '.config'),
    'autostart',
    `${appIdFor(isPackaged)}.desktop`,
  )
}

/** What launches Bat-Signal: the AppImage, the installed binary, or this checkout's Electron with its folder. */
export function launchArgs(env: AutostartEnv): string[] {
  if (env.appImage) return [env.appImage, AT_LOGIN]
  return env.isPackaged ? [env.execPath, AT_LOGIN] : [env.execPath, env.appPath, AT_LOGIN]
}

/**
 * One argument of an Exec line, quoted as the Desktop Entry spec asks: \, ", ` and $ escaped inside
 * the quotes, then every \ doubled again (the file's own escaping), and % doubled (field codes).
 */
export function execArg(arg: string): string {
  const quoted = `"${arg.replace(/[\\"`$]/g, (c) => `\\${c}`)}"`
  return quoted.replace(/\\/g, '\\\\').replace(/%/g, '%%')
}

export function desktopEntry(env: AutostartEnv): string {
  return [
    '[Desktop Entry]',
    'Type=Application',
    'Name=Bat-Signal',
    'Comment=Watches your Claude Code sessions from a corner of the screen',
    `Exec=${launchArgs(env).map(execArg).join(' ')}`,
    'Terminal=false',
    'X-GNOME-Autostart-enabled=true',
    '',
  ].join('\n')
}

/**
 * On, off, or blocked: the entry is there, but the desktop's startup settings turned it off
 * (Hidden=true, or GNOME's X-GNOME-Autostart-enabled=false).
 */
export function autostartState(entry: string | undefined): StartupState {
  if (entry === undefined) return 'off'
  const value = (key: string) => new RegExp(`^${key}\\s*=\\s*(\\S+)`, 'm').exec(entry)?.[1]?.toLowerCase()
  return value('Hidden') === 'true' || value('X-GNOME-Autostart-enabled') === 'false' ? 'blocked' : 'on'
}
