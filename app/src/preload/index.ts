import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc'
import type { NoticeLayout, Settings, SettingsPatch, WindowMode } from '../shared/settings'
import type { StoreSnapshot, TerminalOutcome } from '../shared/types'

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
  /** Brings the session's terminal to the front, or copies its resume command; says which. */
  goToTerminal: (sessionId: string): Promise<TerminalOutcome | undefined> =>
    ipcRenderer.invoke(IPC.goToTerminal, sessionId),
  /** The pointer reached a terminal button: get ready to answer quickly. */
  warmTerminal: (): void => ipcRenderer.send(IPC.warmTerminal),

  getSettings: (): Promise<Settings> => ipcRenderer.invoke(IPC.getSettings),
  setSettings: (patch: SettingsPatch): void => ipcRenderer.send(IPC.setSettings, patch),
  onSettings: (callback: (settings: Settings) => void) => subscribe(IPC.settings, callback),

  getMode: (): Promise<WindowMode> => ipcRenderer.invoke(IPC.getMode),
  /** Shows the panel (optionally opened on one case) or folds back into the signal. */
  setMode: (mode: WindowMode, sessionId?: string): void => ipcRenderer.send(IPC.setMode, mode, sessionId),
  onMode: (callback: (mode: WindowMode) => void) => subscribe(IPC.mode, callback),
  onFocusCase: (callback: (sessionId: string) => void) => subscribe(IPC.focusCase, callback),
  /** The tray's Settings…: open the settings sheet. */
  onOpenSettings: (callback: () => void) => subscribe(IPC.openSettings, callback),
  /** Grows the signal for a notice card (or shrinks it back); resolves once done, with the card's side. */
  setNoticeOut: (out: boolean): Promise<NoticeLayout> => ipcRenderer.invoke(IPC.noticeOut, out),
  /** The signal takes clicks only while the pointer is over the disc or a card. */
  setInteractive: (interactive: boolean): void => ipcRenderer.send(IPC.interactive, interactive),
  moveSignalBy: (dx: number, dy: number): void => ipcRenderer.send(IPC.moveSignal, dx, dy),
  /** Opens what the disc opened last: the panel or the watch strip. */
  reopen: (): void => ipcRenderer.send(IPC.reopen),
  /** The watch strip's rows changed height: fit the window to them. */
  setWatchHeight: (height: number): void => ipcRenderer.send(IPC.watchHeight, height),
  closeWindow: (): void => ipcRenderer.send(IPC.closeWindow),
}

export type BatSignalApi = typeof api

contextBridge.exposeInMainWorld('batSignal', api)
