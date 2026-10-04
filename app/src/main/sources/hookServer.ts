import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import type { AddressInfo } from 'node:net'

export const HOOK_PORT = 47777

/**
 * Receives Claude Code HTTP hooks (see plugin/bat-signal/hooks/hooks.json) on the loopback
 * interface. It is observe-only: every answer is an empty 204, which Claude Code reads as
 * "no decision", so Bat-Signal can never approve or block anything.
 */
export class HookServer {
  private readonly server: Server

  constructor(private readonly onEvent: (event: unknown) => void | Promise<void>) {
    this.server = createServer((req, res) => void this.handle(req, res))
  }

  /** Resolves with the port actually bound (pass 0 for any free port). */
  listen(port = HOOK_PORT): Promise<number> {
    return new Promise((resolve, reject) => {
      this.server.once('error', reject)
      this.server.listen(port, '127.0.0.1', () => {
        this.server.off('error', reject)
        resolve((this.server.address() as AddressInfo).port)
      })
    })
  }

  close(): Promise<void> {
    return new Promise((resolve) => this.server.close(() => resolve()))
  }

  private async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const reply = (status: number): void => {
      res.writeHead(status, { connection: 'close' }).end()
    }

    if (req.url !== '/hook') return reply(404)
    if (req.method !== 'POST') return reply(405)
    // Claude Code calls from a CLI process; an Origin header means a web page is trying.
    if (req.headers.origin !== undefined) return reply(403)
    // A web page could also point a hostname it controls at 127.0.0.1 (DNS rebinding).
    if (!LOOPBACK_HOST.test(req.headers.host ?? '')) return reply(403)
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415)

    const body = await readBody(req, MAX_BODY_BYTES)
    if (body === null) return reply(413)
    let event: unknown
    try {
      event = JSON.parse(body)
    } catch {
      return reply(400)
    }
    reply(204)
    // A bad event must never take the server down, whether the handler throws or rejects.
    await Promise.resolve()
      .then(() => this.onEvent(event))
      .catch((err: unknown) => console.warn('[bat-signal] hook handler failed:', err))
  }
}

const MAX_BODY_BYTES = 1024 * 1024
const LOOPBACK_HOST = /^(127\.0\.0\.1|localhost)(:\d+)?$/i

/** The request body as text, or null once it grows past `limit` bytes. */
async function readBody(req: IncomingMessage, limit: number): Promise<string | null> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req as AsyncIterable<Buffer>) {
    size += chunk.length
    if (size > limit) return null
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}
