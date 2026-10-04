import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc'
import type { Settings, WindowMode } from '../shared/settings'
import type { StoreSnapshot } from '../shared/types'

/** Subscribes to a push channel; returns an unsubscribe function. */
function subscribe<T>(channel: string, callback: (value: T) => void): () => void {
  const listener = (_event: unknown, value: T) => callback(value)
  ipcRenderer.on(channel, listener)
  return () => ipcRenderer.removeListener(channel, listener)
}

const api = {
  getSnapshot: (): Promise<StoreSnapshot> => ipcRenderer.invoke(IPC.getSnapshot),
  onSnapshot: (callback: (snapshot: StoreSnapshot) => void) => subscribe(IPC.snapshot, callback),
  markSeen: (sessionId: string): void => ipcRenderer.send(IPC.markSeen, sessionId),

  getSettings: (): Promise<Settings> => ipcRenderer.invoke(IPC.getSettings),
  setSettings: (patch: Partial<Settings>): void => ipcRenderer.send(IPC.setSettings, patch),
  onSettings: (callback: (settings: Settings) => void) => subscribe(IPC.settings, callback),

  getMode: (): Promise<WindowMode> => ipcRenderer.invoke(IPC.getMode),
  /** Shows the panel (optionally opened on one case) or folds back into the signal. */
  setMode: (mode: WindowMode, sessionId?: string): void => ipcRenderer.send(IPC.setMode, mode, sessionId),
  onMode: (callback: (mode: WindowMode) => void) => subscribe(IPC.mode, callback),
  onFocusCase: (callback: (sessionId: string) => void) => subscribe(IPC.focusCase, callback),
  /** The signal grows upward while a notice card is out. */
  setNoticeOut: (out: boolean): void => ipcRenderer.send(IPC.noticeOut, out),
  moveSignalBy: (dx: number, dy: number): void => ipcRenderer.send(IPC.moveSignal, dx, dy),
  closeWindow: (): void => ipcRenderer.send(IPC.closeWindow),
}

export type BatcaveApi = typeof api

contextBridge.exposeInMainWorld('batcave', api)
