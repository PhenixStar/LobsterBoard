import { initTRPC } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import superjson from 'superjson'
import { z } from 'zod'
import { getClawdbotClient, getClawdbotEndpoint } from '~/integrations/openclaw/client'
import { getPersistenceService } from '~/integrations/openclaw/persistence'
import {
  parseEventFrame,
  sessionInfoToMonitor,
  type MonitorSession,
  type MonitorAction,
  type MonitorExecEvent,
} from '~/integrations/openclaw'

// Server-side debug mode state
let debugMode = false

// Server-side log collection
let collectLogs = false
const collectedEvents: Array<{ timestamp: number; event: unknown }> = []

const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

// Clawdbot router
const openclawRouter = router({
  connect: publicProcedure.mutation(async () => {
    const client = getClawdbotClient()
    if (client.connected) {
      return {
        status: 'already_connected' as const,
        authState: client.authState,
        scopes: client.scopes,
        pairing: client.pairingInfo,
      }
    }
    try {
      const hello = await client.connect()
      return {
        status: 'connected' as const,
        protocol: hello.protocol,
        features: hello.features,
        presenceCount: hello.snapshot?.presence?.length ?? 0,
        authState: client.authState,
        scopes: client.scopes,
        pairing: client.pairingInfo,
      }
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Connection failed',
        authState: client.authState,
        scopes: client.scopes,
        pairing: client.pairingInfo,
      }
    }
  }),

  disconnect: publicProcedure.mutation(() => {
    const client = getClawdbotClient()
    client.disconnect()
    return { status: 'disconnected' as const }
  }),

  status: publicProcedure.query(() => {
    const client = getClawdbotClient()
    return { connected: client.connected }
  }),

  authStatus: publicProcedure.query(() => {
    const client = getClawdbotClient()
    return {
      connected: client.connected,
      authState: client.authState,
      scopes: client.scopes,
      pairing: client.pairingInfo,
    }
  }),

  gatewayEndpoint: publicProcedure.query(() => {
    return { url: getClawdbotEndpoint() }
  }),

  setDebugMode: publicProcedure
    .input(z.object({ enabled: z.boolean() }))
    .mutation(({ input }) => {
      debugMode = input.enabled
      console.log(`[openclaw] debug mode ${debugMode ? 'enabled' : 'disabled'}`)
      return { debugMode }
    }),

  getDebugMode: publicProcedure.query(() => {
    return { debugMode }
  }),

  // Log collection
  setLogCollection: publicProcedure
    .input(z.object({ enabled: z.boolean() }))
    .mutation(({ input }) => {
      collectLogs = input.enabled
      if (input.enabled) {
        console.log(`[openclaw] log collection started`)
      } else {
        console.log(`[openclaw] log collection stopped, ${collectedEvents.length} events collected`)
      }
      return { collectLogs, eventCount: collectedEvents.length }
    }),

  getLogCollection: publicProcedure.query(() => {
    return { collectLogs, eventCount: collectedEvents.length }
  }),

  downloadLogs: publicProcedure.query(() => {
    return {
      events: collectedEvents,
      count: collectedEvents.length,
      collectedAt: new Date().toISOString(),
    }
  }),

  clearLogs: publicProcedure.mutation(() => {
    const count = collectedEvents.length
    collectedEvents.length = 0
    console.log(`[openclaw] cleared ${count} collected events`)
    return { cleared: count }
  }),

  sessions: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          activeMinutes: z.number().optional(),
          agentId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const client = getClawdbotClient()
      const persistence = getPersistenceService()
      if (!client.connected) {
        return { sessions: [], error: 'Not connected', authState: client.authState }
      }
      try {
        const sessions = await client.listSessions(input)
        const monitorSessions = sessions.map(sessionInfoToMonitor)
        // Persist sessions if service is enabled
        for (const session of monitorSessions) {
          persistence.upsertSession(session)
        }
        return { sessions: monitorSessions, authState: client.authState, scopes: client.scopes }
      } catch (error) {
        return {
          sessions: [],
          error: error instanceof Error ? error.message : 'Failed to list sessions',
          authState: client.authState,
          scopes: client.scopes,
          pairing: client.pairingInfo,
        }
      }
    }),

  events: publicProcedure.subscription(() => {
    return observable<{
      type: 'session' | 'action' | 'exec'
      session?: Partial<MonitorSession>
      action?: MonitorAction
      execEvent?: MonitorExecEvent
    }>((emit) => {
      const client = getClawdbotClient()
      const persistence = getPersistenceService()

      const unsubscribe = client.onEvent((event) => {
        // Collect raw event when log collection is enabled
        if (collectLogs) {
          collectedEvents.push({
            timestamp: Date.now(),
            event,
          })
        }

        // Log raw event when debug mode is enabled
        if (debugMode) {
          console.log('\n[DEBUG] Raw event:', JSON.stringify(event, null, 2))
        }

        const parsed = parseEventFrame(event)
        if (parsed) {
          if (debugMode && parsed.action) {
            console.log('[DEBUG] Parsed action:', parsed.action.type, parsed.action.eventType, 'sessionKey:', parsed.action.sessionKey)
          }
          if (debugMode && parsed.execEvent) {
            console.log('[DEBUG] Parsed exec:', parsed.execEvent.eventType, 'runId:', parsed.execEvent.runId, 'pid:', parsed.execEvent.pid)
          }
          if (parsed.session) {
            emit.next({ type: 'session', session: parsed.session })
          }
          if (parsed.action) {
            // Persist action if service is enabled
            persistence.addAction(parsed.action)
            emit.next({ type: 'action', action: parsed.action })
          }
          if (parsed.execEvent) {
            persistence.addExecEvent(parsed.execEvent)
            emit.next({ type: 'exec', execEvent: parsed.execEvent })
          }
        }
      })

      return () => {
        unsubscribe()
      }
    })
  }),

  // Persistence service
  persistenceStatus: publicProcedure.query(() => {
    const persistence = getPersistenceService()
    return persistence.getStatus()
  }),

  persistenceStart: publicProcedure.mutation(() => {
    const persistence = getPersistenceService()
    return persistence.start()
  }),

  persistenceStop: publicProcedure.mutation(() => {
    const persistence = getPersistenceService()
    return persistence.stop()
  }),

  persistenceHydrate: publicProcedure.query(() => {
    const persistence = getPersistenceService()
    return persistence.hydrate()
  }),

  persistenceClear: publicProcedure.mutation(() => {
    const persistence = getPersistenceService()
    return persistence.clear()
  }),
})

export const appRouter = router({
  openclaw: openclawRouter,
})

export type AppRouter = typeof appRouter
