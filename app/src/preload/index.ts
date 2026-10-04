import { contextBridge } from 'electron'

const api = {
  platform: process.platform,
}

export type BatcaveApi = typeof api

contextBridge.exposeInMainWorld('batcave', api)
