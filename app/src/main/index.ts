import { app, ipcMain } from 'electron'
import { IPC } from '../shared/ipc'
import { applySettingsPatch, parseWindowMode } from '../shared/settings'
import { startBatcave } from './batcave'
import { settingsFile } from './settings'
import { BatcaveWindow } from './window'

function start(): void {
  let settings = settingsFile.load()
  const window = new BatcaveWindow(settings)
  const stop = startBatcave(window.win)

  ipcMain.handle(IPC.getSettings, () => settings)
  ipcMain.on(IPC.setSettings, (_event, patch: unknown) => {
    settings = applySettingsPatch(settings, patch)
    settingsFile.save(settings)
    window.apply(settings)
  })
  ipcMain.handle(IPC.getMode, () => window.mode)
  ipcMain.on(IPC.setMode, (_event, mode: unknown) => {
    const next = parseWindowMode(mode)
    if (next) window.setMode(next)
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
