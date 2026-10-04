import { request } from 'node:http'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { HookServer } from '../src/main/sources/hookServer'

let server: HookServer
let received: unknown[]
let base: string

beforeEach(async () => {
  received = []
  server = new HookServer((event) => received.push(event))
  const port = await server.listen(0) // any free port
  base = `http://127.0.0.1:${port}`
})
afterEach(() => server.close())

const post = (path: string, body: string, contentType = 'application/json') =>
  fetch(base + path, { method: 'POST', headers: { 'content-type': contentType }, body })

describe('HookServer', () => {
  it('hands each hook payload to the handler and answers with an empty 204', async () => {
    const res = await post('/hook', JSON.stringify({ session_id: 's1', hook_event_name: 'Stop' }))
    expect(res.status).toBe(204)
    expect(await res.text()).toBe('')
    expect(received).toEqual([{ session_id: 's1', hook_event_name: 'Stop' }])
  })
})

describe('HookServer rejects', () => {
  it('other paths with 404', async () => {
    expect((await post('/other', '{}')).status).toBe(404)
    expect(received).toEqual([])
  })

  it('other methods with 405', async () => {
    expect((await fetch(base + '/hook')).status).toBe(405)
  })

  it('bodies that are not JSON with 400', async () => {
    expect((await post('/hook', '{oops')).status).toBe(400)
    expect((await post('/hook', 'hi', 'text/plain')).status).toBe(415)
    expect(received).toEqual([])
  })

  it('bodies over 1 MB with 413', async () => {
    const res = await post('/hook', JSON.stringify({ big: 'x'.repeat(1_100_000) }))
    expect(res.status).toBe(413)
    expect(received).toEqual([])
  })

  it('requests that come through a browser page (Origin header) with 403', async () => {
    const res = await fetch(base + '/hook', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://evil.example' },
      body: '{}',
    })
    expect(res.status).toBe(403)
    expect(received).toEqual([])
  })
})

describe('HookServer and DNS rebinding', () => {
  // fetch won't let us set Host, so use node:http directly.
  const postWithHost = (host: string) =>
    new Promise<number>((resolve, reject) => {
      const req = request(
        base + '/hook',
        { method: 'POST', headers: { host, 'content-type': 'application/json' } },
        (res) => {
          res.resume()
          resolve(res.statusCode ?? 0)
        },
      )
      req.on('error', reject)
      req.end('{}')
    })

  it('rejects requests addressed to another host name', async () => {
    expect(await postWithHost('evil.example:47777')).toBe(403)
    expect(received).toEqual([])
  })

  it('accepts 127.0.0.1 and localhost', async () => {
    const port = new URL(base).port
    expect(await postWithHost(`127.0.0.1:${port}`)).toBe(204)
    expect(await postWithHost(`localhost:${port}`)).toBe(204)
  })
})
