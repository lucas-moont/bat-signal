// Tiny coercions for untrusted JSON (transcripts, session files, hook payloads).

export type Json = Record<string, unknown>

export const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined)
/** A boolean written as one: a string or a 1 counts as missing. */
export const bool = (v: unknown): boolean | undefined => (typeof v === 'boolean' ? v : undefined)
/** A finite number: NaN and Infinity from untrusted input count as missing. */
export const num = (v: unknown): number | undefined =>
  typeof v === 'number' && Number.isFinite(v) ? v : undefined
/** A plain object: not null, not an array. */
export const isRecord = (v: unknown): v is Json => !!v && typeof v === 'object' && !Array.isArray(v)
export const obj = (v: unknown): Json => (isRecord(v) ? v : {})
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)
