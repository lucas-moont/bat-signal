// Who this Bat-Signal is to Windows: one id for the taskbar, the toasts and the login entry, and
// the folder its settings live in. A development run is another app, so a checkout runs beside the
// installed Bat-Signal: each holds its own single-instance lock and its own login entry.

/** The installed app's id; the installer gives its Start menu shortcut the same one, for toasts. */
export const APP_ID = 'com.lucasmoont.bat-signal'

export interface Identity {
  /** The app user model id, which also names the login entry. */
  id: string
  /** Its folder under %APPDATA%, which holds the settings and the single-instance lock. */
  dataFolder: string
}

export const identityFor = (isPackaged: boolean): Identity =>
  isPackaged
    ? { id: APP_ID, dataFolder: 'Bat-Signal' }
    : { id: `${APP_ID}.dev`, dataFolder: 'Bat-Signal Dev' }
