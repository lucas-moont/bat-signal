import { app, globalShortcut, ipcMain } from 'electron'
import { obj } from '../shared/guards'
import { IPC } from '../shared/ipc'
import { applySettingsPatch, parseViewMode } from '../shared/settings'
import type { AppStatus } from '../shared/status'
import { startBatSignal } from './batSignal'
import { settingsFile } from './settings'
import { createShortcut } from './shortcut'
import { migrateUserData } from './userData'
import { BatSignalTray } from './tray'
import { BatSignalWindows } from './window'

/** Brings Bat-Signal forward when it is launched again; nothing to bring until it has started. */
let summon = (): void => undefined

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
  // The global shortcut opens what the disc would, and folds it back.
  const shortcut = createShortcut(globalShortcut, () => windows.act('shortcut'))
  shortcut.apply(settings.shortcut)
  // What is happening now, read from each feature; sent to the pages only when it changed (each
  // feature keeps the same object until then).
  const readStatus = (): AppStatus => ({ shortcut: shortcut.status })
  let published = readStatus()
  const publishStatus = () => {
    const next = readStatus()
    if ((Object.keys(next) as (keyof AppStatus)[]).every((key) => next[key] === published[key])) return
    published = next
    windows.publishStatus(next)
  }

  ipcMain.handle(IPC.getSettings, () => settings)
  ipcMain.on(IPC.setSettings, (_event, patch: unknown) => {
    settings = applySettingsPatch(settings, patch)
    settingsFile.save(settings)
    windows.apply(settings)
    // Only a patch that names the shortcut touches it (and retries it, if another app had it).
    if ('shortcut' in obj(patch)) {
      shortcut.apply(settings.shortcut)
      publishStatus()
    }
  })
  ipcMain.handle(IPC.getStatus, () => readStatus())
  // While the settings sheet records a new shortcut, the current one must reach it as keys.
  ipcMain.on(IPC.recordShortcut, (_event, on: unknown) => {
    shortcut.pause(on === true)
    publishStatus()
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

  summon = () => windows.act('summon')
  app.once('before-quit', stop)
  app.once('will-quit', () => shortcut.dispose())
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.setAppUserModelId('com.lucasmoont.bat-signal')
  // Launching Bat-Signal again (it runs once) brings it back instead of doing nothing; listened
  // for from the start, since a second launch can come while this one is still getting ready.
  app.on('second-instance', () => summon())
  void app.whenReady().then(start)
  app.on('window-all-closed', () => app.quit())
}
