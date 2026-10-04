// Tiny coercions for untrusted JSON (transcripts, session files, hook payloads).

export type Json = Record<string, unknown>

export const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined)
export const num = (v: unknown): number | undefined => (typeof v === 'number' ? v : undefined)
export const obj = (v: unknown): Json => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Json) : {})
