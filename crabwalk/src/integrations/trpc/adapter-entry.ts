// Gateway adapter entry point — bundled by esbuild into crabwalk-gateway-adapter.cjs
// Exports: handleTrpc, reconnectGateway, getGatewayStatus

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { initTRPC } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import superjson from 'superjson'
import { z } from 'zod'
import { ClawdbotClient } from '~/integrations/openclaw/client'
import { getPersistenceService } from '~/integrations/openclaw/persistence'
import {
  parseEventFrame,
  sessionInfoToMonitor,
  type MonitorSession,
  type MonitorAction,
  type MonitorExecEvent,
} from '~/integrations/openclaw'
import type { IncomingMessage, ServerResponse } from 'http'

// -- Configurable ClawdbotClient singleton --
let clientInstance: ClawdbotClient | null = null
let currentUrl = process.env.CLAWDBOT_URL || 'ws://127.0.0.1:18789'
let currentToken: string | undefined = process.env.CLAWDBOT_API_TOKEN
let currentPassword: string | undefined = process.env.CLAWDBOT_PASSWORD

function getClient(): ClawdbotClient {
  if (!clientInstance) {
    clientInstance = new ClawdbotClient(currentUrl, currentToken, currentPassword)
  }
  return clientInstance
}

export function reconnectGateway(config: { gatewayUrl?: string; apiToken?: string; password?: string }) {
  if (clientInstance) {
    clientInstance.disconnect()
    clientInstance = null
  }
  if (config.gatewayUrl) currentUrl = config.gatewayUrl
  if (config.apiToken) currentToken = config.apiToken
  if (config.password) currentPassword = config.password
  clientInstance = new ClawdbotClient(currentUrl, currentToken, currentPassword)
  // Auto-connect (fire and forget)
  clientInstance.connect().catch(() => {})
}

export function getGatewayStatus(): { url: string; connected: boolean; authState: string } {
  const client = getClient()
  return { url: currentUrl, connected: client.connected, authState: client.authState }
}

// -- tRPC router (openclaw only, no workspace) --
let debugMode = false
let collectLogs = false
const collectedEvents: Array<{ timestamp: number; event: unknown }> = []

const t = initTRPC.create({ transformer: superjson })
const router = t.router
const publicProcedure = t.procedure

const openclawRouter = router({
  connect: publicProcedure.mutation(async () => {
    const client = getClient()
    if (client.connected) {
      return { status: 'already_connected' as const, authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo }
    }
    try {
      const hello = await client.connect()
      return { status: 'connected' as const, protocol: hello.protocol, features: hello.features, presenceCount: hello.snapshot?.presence?.length ?? 0, authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo }
    } catch (error) {
      return { status: 'error' as const, message: error instanceof Error ? error.message : 'Connection failed', authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo }
    }
  }),
  disconnect: publicProcedure.mutation(() => { getClient().disconnect(); return { status: 'disconnected' as const } }),
  status: publicProcedure.query(() => ({ connected: getClient().connected })),
  authStatus: publicProcedure.query(() => {
    const c = getClient()
    return { connected: c.connected, authState: c.authState, scopes: c.scopes, pairing: c.pairingInfo }
  }),
  gatewayEndpoint: publicProcedure.query(() => ({ url: currentUrl })),
  setDebugMode: publicProcedure.input(z.object({ enabled: z.boolean() })).mutation(({ input }) => { debugMode = input.enabled; return { debugMode } }),
  getDebugMode: publicProcedure.query(() => ({ debugMode })),
  setLogCollection: publicProcedure.input(z.object({ enabled: z.boolean() })).mutation(({ input }) => { collectLogs = input.enabled; return { collectLogs, eventCount: collectedEvents.length } }),
  getLogCollection: publicProcedure.query(() => ({ collectLogs, eventCount: collectedEvents.length })),
  downloadLogs: publicProcedure.query(() => ({ events: collectedEvents, count: collectedEvents.length, collectedAt: new Date().toISOString() })),
  clearLogs: publicProcedure.mutation(() => { const count = collectedEvents.length; collectedEvents.length = 0; return { cleared: count } }),
  sessions: publicProcedure.input(z.object({ limit: z.number().optional(), activeMinutes: z.number().optional(), agentId: z.string().optional() }).optional()).query(async ({ input }) => {
    const client = getClient()
    const persistence = getPersistenceService()
    if (!client.connected) return { sessions: [], error: 'Not connected', authState: client.authState }
    try {
      const sessions = await client.listSessions(input)
      const monitorSessions = sessions.map(sessionInfoToMonitor)
      for (const session of monitorSessions) persistence.upsertSession(session)
      return { sessions: monitorSessions, authState: client.authState, scopes: client.scopes }
    } catch (error) {
      return { sessions: [], error: error instanceof Error ? error.message : 'Failed', authState: client.authState, scopes: client.scopes, pairing: client.pairingInfo }
    }
  }),
  events: publicProcedure.subscription(() => {
    return observable<{ type: 'session' | 'action' | 'exec'; session?: Partial<MonitorSession>; action?: MonitorAction; execEvent?: MonitorExecEvent }>((emit) => {
      const client = getClient()
      const persistence = getPersistenceService()
      const unsubscribe = client.onEvent((event) => {
        if (collectLogs) collectedEvents.push({ timestamp: Date.now(), event })
        const parsed = parseEventFrame(event)
        if (parsed) {
          if (parsed.session) emit.next({ type: 'session', session: parsed.session })
          if (parsed.action) { persistence.addAction(parsed.action); emit.next({ type: 'action', action: parsed.action }) }
          if (parsed.execEvent) { persistence.addExecEvent(parsed.execEvent); emit.next({ type: 'exec', execEvent: parsed.execEvent }) }
        }
      })
      return () => { unsubscribe() }
    })
  }),
  persistenceStatus: publicProcedure.query(() => getPersistenceService().getStatus()),
  persistenceStart: publicProcedure.mutation(() => getPersistenceService().start()),
  persistenceStop: publicProcedure.mutation(() => getPersistenceService().stop()),
  persistenceHydrate: publicProcedure.query(() => getPersistenceService().hydrate()),
  persistenceClear: publicProcedure.mutation(() => getPersistenceService().clear()),
})

const appRouter = router({
  openclaw: openclawRouter,
})

export type AppRouter = typeof appRouter

// -- HTTP handler for server.cjs --
export async function handleTrpc(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // Collect body for POST requests
  let body: string | undefined
  if (req.method === 'POST') {
    const chunks: Buffer[] = []
    for await (const chunk of req) chunks.push(chunk as Buffer)
    body = Buffer.concat(chunks).toString()
  }

  const url = `http://${req.headers.host}${req.url}`
  const headers = new Headers()
  for (const [key, val] of Object.entries(req.headers)) {
    if (val) headers.set(key, Array.isArray(val) ? val.join(', ') : val)
  }

  const request = new Request(url, {
    method: req.method,
    headers,
    body: req.method === 'POST' ? body : undefined,
  })

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => ({}),
  })

  // Write response headers
  const responseHeaders: Record<string, string> = {}
  response.headers.forEach((val, key) => { responseHeaders[key] = val })
  res.writeHead(response.status, responseHeaders)

  if (response.body) {
    // Stream body (handles SSE subscriptions)
    const reader = response.body.getReader()
    const pump = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (!res.writableEnded) res.write(value)
        }
      } catch {
        // Client disconnected
      } finally {
        if (!res.writableEnded) res.end()
      }
    }
    // Handle client disconnect — cancel the reader
    req.on('close', () => { reader.cancel().catch(() => {}) })
    await pump()
  } else {
    res.end(await response.text())
  }
}

// Auto-connect on load (non-blocking)
getClient().connect().catch(() => {})
