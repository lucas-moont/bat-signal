// Who this Bat-Signal is to Windows: one id for the taskbar, the toasts and the login entry. A
// development run is another app, so a checkout runs beside the installed Bat-Signal and never
// takes its login entry (index.ts gives it its own settings folder, too).

const APP_ID = 'com.lucasmoont.bat-signal'

/**
 * The app user model id, which also names the login entry: the installed app's, which the installer
 * gives its Start menu shortcut for toasts, or, in development, another app's.
 */
export const appIdFor = (isPackaged: boolean): string => (isPackaged ? APP_ID : `${APP_ID}.dev`)
