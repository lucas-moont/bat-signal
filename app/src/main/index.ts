import { app, ipcMain } from 'electron'
import { IPC } from '../shared/ipc'
import { applySettingsPatch, parseWindowMode } from '../shared/settings'
import { startBatcave } from './batcave'
import { settingsFile } from './settings'
import { BatcaveWindows } from './window'

function start(): void {
  let settings = settingsFile.load()
  const windows = new BatcaveWindows(settings)
  const stop = startBatcave((snapshot) => windows.publish(snapshot))

  ipcMain.handle(IPC.getSettings, () => settings)
  ipcMain.on(IPC.setSettings, (_event, patch: unknown) => {
    settings = applySettingsPatch(settings, patch)
    settingsFile.save(settings)
    windows.apply(settings)
  })
  ipcMain.handle(IPC.getMode, () => windows.mode)
  ipcMain.on(IPC.setMode, (_event, mode: unknown, sessionId: unknown) => {
    const next = parseWindowMode(mode)
    if (next) windows.setMode(next, typeof sessionId === 'string' ? sessionId : undefined)
  })
  ipcMain.handle(IPC.noticeOut, (_event, out: unknown) => windows.setNoticeOut(out === true))
  ipcMain.on(IPC.interactive, (_event, on: unknown) => windows.setInteractive(on === true))
  ipcMain.on(IPC.moveSignal, (_event, dx: unknown, dy: unknown) => {
    if (typeof dx === 'number' && typeof dy === 'number') windows.moveSignalBy(dx, dy)
  })
  ipcMain.on(IPC.closeWindow, () => app.quit())

  app.once('before-quit', stop)
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.setAppUserModelId('com.lucasmoont.batcave')
  void app.whenReady().then(start)
  app.on('window-all-closed', () => app.quit())
}
