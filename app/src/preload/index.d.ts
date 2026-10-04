import type { BatSignalApi } from './index'

declare global {
  interface Window {
    batSignal: BatSignalApi
  }
}
