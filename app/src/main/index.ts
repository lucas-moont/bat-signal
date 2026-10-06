import { app, ipcMain } from 'electron'
import { IPC } from '../shared/ipc'
import { applySettingsPatch, parseViewMode } from '../shared/settings'
import { startBatSignal } from './batSignal'
import { settingsFile } from './settings'
import { migrateUserData } from './userData'
import { BatSignalTray } from './tray'
import { BatSignalWindows } from './window'

function start(): void {
  migrateUserData()
  let settings = settingsFile.load()
  const windows = new BatSignalWindows(settings)
  // Before anything can hide the windows: the tray is the way back.
  const tray = new BatSignalTray(windows)
  const stop = startBatSignal((snapshot) => {
    windows.publish(snapshot)
    tray.update(snapshot)
  })

  ipcMain.handle(IPC.getSettings, () => settings)
  ipcMain.on(IPC.setSettings, (_event, patch: unknown) => {
    settings = applySettingsPatch(settings, patch)
    settingsFile.save(settings)
    windows.apply(settings)
  })
  ipcMain.handle(IPC.getMode, () => windows.mode)
  ipcMain.on(IPC.setMode, (_event, mode: unknown, sessionId: unknown) => {
    const next = parseViewMode(mode)
    if (next) windows.setMode(next, typeof sessionId === 'string' ? sessionId : undefined)
  })
  ipcMain.handle(IPC.noticeOut, (_event, out: unknown) => windows.setNoticeOut(out === true))
  ipcMain.on(IPC.interactive, (_event, on: unknown) => windows.setInteractive(on === true))
  ipcMain.on(IPC.moveSignal, (_event, dx: unknown, dy: unknown) => {
    if (typeof dx === 'number' && typeof dy === 'number') windows.moveSignalBy(dx, dy)
  })
  ipcMain.on(IPC.reopen, () => windows.reopen())
  ipcMain.on(IPC.watchHeight, (_event, height: unknown) => {
    if (typeof height === 'number') windows.setWatchHeight(height)
  })
  ipcMain.on(IPC.hide, () => windows.act('close'))

  // Launching Bat-Signal again (it runs once) brings it forward instead of doing nothing.
  app.on('second-instance', () => windows.act('summon'))
  app.once('before-quit', stop)
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.setAppUserModelId('com.lucasmoont.bat-signal')
  void app.whenReady().then(start)
  app.on('window-all-closed', () => app.quit())
}
