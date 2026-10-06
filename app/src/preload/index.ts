import { contextBridge, ipcRenderer } from 'electron'
import type { CuePlay } from '../shared/announcer'
import { IPC } from '../shared/ipc'
import type { NoticeLayout, Settings, SettingsPatch, ViewMode, WindowMode } from '../shared/settings'
import type { AppStatus } from '../shared/status'
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
  getStatus: (): Promise<AppStatus> => ipcRenderer.invoke(IPC.getStatus),
  onStatus: (callback: (status: AppStatus) => void) => subscribe(IPC.status, callback),
  /** On while the settings sheet records a shortcut: the current one then lets its keys through. */
  recordShortcut: (on: boolean): void => ipcRenderer.send(IPC.recordShortcut, on),
  /** Asks Windows to start Bat-Signal at sign-in, or not; the answer comes back as status. */
  setStartWithWindows: (on: boolean): void => ipcRenderer.send(IPC.setStartWithWindows, on),
  /** Asks the main process to read what may have changed outside the app (Task Manager). */
  refreshStatus: (): void => ipcRenderer.send(IPC.refreshStatus),

  getMode: (): Promise<WindowMode> => ipcRenderer.invoke(IPC.getMode),
  /** Shows the panel (optionally opened on one case) or folds back into the signal. */
  setMode: (mode: ViewMode, sessionId?: string): void => ipcRenderer.send(IPC.setMode, mode, sessionId),
  onMode: (callback: (mode: WindowMode) => void) => subscribe(IPC.mode, callback),
  onFocusCase: (callback: (sessionId: string) => void) => subscribe(IPC.focusCase, callback),
  /** The tray's Settings…: open the settings sheet. */
  onOpenSettings: (callback: () => void) => subscribe(IPC.openSettings, callback),
  /** A sound to play (the signal window plays them). */
  onCue: (callback: (play: CuePlay) => void) => subscribe(IPC.cue, callback),
  /** Grows the signal for a notice card (or shrinks it back); resolves once done, with the card's side. */
  setNoticeOut: (out: boolean): Promise<NoticeLayout> => ipcRenderer.invoke(IPC.noticeOut, out),
  /** The signal takes clicks only while the pointer is over the disc or a card. */
  setInteractive: (interactive: boolean): void => ipcRenderer.send(IPC.interactive, interactive),
  moveSignalBy: (dx: number, dy: number): void => ipcRenderer.send(IPC.moveSignal, dx, dy),
  /** Opens what the disc opened last: the panel or the watch strip. */
  reopen: (): void => ipcRenderer.send(IPC.reopen),
  /** The watch strip's rows changed height: fit the window to them. */
  setWatchHeight: (height: number): void => ipcRenderer.send(IPC.watchHeight, height),
  /** Hides Bat-Signal to the tray (the header's close button). */
  hide: (): void => ipcRenderer.send(IPC.hide),
}

export type BatSignalApi = typeof api

contextBridge.exposeInMainWorld('batSignal', api)
