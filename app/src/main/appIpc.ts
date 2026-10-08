// Bat-Signal's own page, and IPC that answers only it. The windows keep to that page (index.ts
// refuses every other navigation); these wrappers make sure a page that got in anyway is not heard.
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { ipcMain, type IpcMainEvent, type IpcMainInvokeEvent } from 'electron'
import { isAppPage, type AppPages } from './trust'

/** The built page both windows load (window.ts adds the view). */
export const RENDERER_FILE = join(__dirname, '../renderer/index.html')

export const APP_PAGES: AppPages = {
  page: pathToFileURL(RENDERER_FILE).href,
  devServer: process.env['ELECTRON_RENDERER_URL'],
}

const fromApp = (event: IpcMainEvent | IpcMainInvokeEvent): boolean =>
  isAppPage(event.senderFrame?.url ?? '', APP_PAGES)

/** ipcMain.on, for messages from Bat-Signal's own page only; any other sender is ignored. */
export function onIpc(channel: string, listener: (event: IpcMainEvent, ...args: unknown[]) => void): void {
  ipcMain.on(channel, (event, ...args: unknown[]) => {
    if (fromApp(event)) listener(event, ...args)
  })
}

/** ipcMain.handle, for requests from Bat-Signal's own page only; any other sender is refused. */
export function handleIpc(
  channel: string,
  handler: (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown,
): void {
  ipcMain.handle(channel, (event, ...args: unknown[]) => {
    if (!fromApp(event)) throw new Error(`${channel}: not Bat-Signal's page`)
    return handler(event, ...args)
  })
}
