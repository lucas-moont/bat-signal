import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc'
import type { StoreSnapshot } from '../shared/types'

const api = {
  getSnapshot: (): Promise<StoreSnapshot> => ipcRenderer.invoke(IPC.getSnapshot),
  /** Calls back with every new snapshot; returns an unsubscribe function. */
  onSnapshot(callback: (snapshot: StoreSnapshot) => void): () => void {
    const listener = (_event: unknown, snapshot: StoreSnapshot) => callback(snapshot)
    ipcRenderer.on(IPC.snapshot, listener)
    return () => ipcRenderer.removeListener(IPC.snapshot, listener)
  },
  markSeen: (sessionId: string): void => ipcRenderer.send(IPC.markSeen, sessionId),
}

export type BatcaveApi = typeof api

contextBridge.exposeInMainWorld('batcave', api)
