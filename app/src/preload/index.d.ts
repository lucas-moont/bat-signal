import type { BatcaveApi } from './index'

declare global {
  interface Window {
    batcave: BatcaveApi
  }
}
