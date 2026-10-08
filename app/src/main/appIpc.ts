// Bat-Signal's own page, and IPC that answers only it. The windows keep to that page (index.ts
// refuses every other navigation, window.ts sends to no other); these wrappers make sure a page that
// got in anyway is not heard.
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { app, ipcMain, type IpcMainEvent, type IpcMainInvokeEvent } from 'electron'
import { isAppPage } from './trust'

/** The built page both windows load (window.ts adds the view). */
export const RENDERER_FILE = join(__dirname, '../renderer/index.html')

/** electron-vite's dev server, in development only: the installed app never trusts the variable. */
export const DEV_SERVER = app.isPackaged ? undefined : process.env['ELECTRON_RENDERER_URL']

const APP_PAGES = { page: pathToFileURL(RENDERER_FILE).href, devServer: DEV_SERVER }

/** Whether `url` is Bat-Signal's own page. */
export const isOwnPage = (url: string): boolean => isAppPage(url, APP_PAGES)

const fromApp = (event: IpcMainEvent | IpcMainInvokeEvent): boolean => isOwnPage(event.senderFrame?.url ?? '')

/** ipcMain.on, for messages from Bat-Signal's own page only. Returns what takes it off again. */
export function onIpc(
  channel: string,
  listener: (event: IpcMainEvent, ...args: unknown[]) => void,
): () => void {
  const guarded = (event: IpcMainEvent, ...args: unknown[]) => {
    if (fromApp(event)) listener(event, ...args)
  }
  ipcMain.on(channel, guarded)
  return () => ipcMain.removeListener(channel, guarded)
}

/** ipcMain.handle, for requests from Bat-Signal's own page only. Returns what takes it off again. */
export function handleIpc(
  channel: string,
  handler: (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown,
): () => void {
  ipcMain.handle(channel, (event, ...args: unknown[]) => {
    if (!fromApp(event)) throw new Error(`${channel}: not Bat-Signal's page`)
    return handler(event, ...args)
  })
  return () => ipcMain.removeHandler(channel)
}
