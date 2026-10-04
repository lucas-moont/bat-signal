import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc'
import type { NoticeLayout, Settings, WindowMode } from '../shared/settings'
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
  /** Grows the signal for a notice card (or shrinks it back); resolves once done, with the card's side. */
  setNoticeOut: (out: boolean): Promise<NoticeLayout> => ipcRenderer.invoke(IPC.noticeOut, out),
  /** The signal takes clicks only while the pointer is over the disc or a card. */
  setInteractive: (interactive: boolean): void => ipcRenderer.send(IPC.interactive, interactive),
  moveSignalBy: (dx: number, dy: number): void => ipcRenderer.send(IPC.moveSignal, dx, dy),
  closeWindow: (): void => ipcRenderer.send(IPC.closeWindow),
}

export type BatcaveApi = typeof api

contextBridge.exposeInMainWorld('batcave', api)
