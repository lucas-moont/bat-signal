import { app, ipcMain } from 'electron'
import { IPC } from '../shared/ipc'
import { parseSettings, type WindowMode } from '../shared/settings'
import { startBatcave } from './batcave'
import { loadSettings, saveSettings } from './settings'
import { BatcaveWindow } from './window'

function start(): void {
  let settings = loadSettings()
  const window = new BatcaveWindow(settings)
  const stop = startBatcave(window.win)

  ipcMain.handle(IPC.getSettings, () => settings)
  ipcMain.on(IPC.setSettings, (_event, patch: unknown) => {
    settings = parseSettings({ ...settings, ...(patch && typeof patch === 'object' ? patch : {}) })
    saveSettings(settings)
    window.apply(settings)
    window.win.webContents.send(IPC.settings, settings)
  })
  ipcMain.on(IPC.setMode, (_event, mode: unknown) => {
    if (mode === 'full' || mode === 'pill') window.setMode(mode as WindowMode)
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
