import { useState, useEffect, useCallback, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from '@tanstack/react-db'
import { motion } from 'framer-motion'
import { Loader2, Trash2 } from 'lucide-react'
import { trpc } from '~/integrations/trpc/client'
import { NavTabs } from '~/components/navigation'
import {
  sessionsCollection,
  actionsCollection,
  execsCollection,
  upsertSession,
  addAction,
  addExecEvent,
  updateSessionStatus,
  clearCollections,
  hydrateFromServer,
  clearCompletedExecs,
} from '~/integrations/openclaw'
import {
  ActionGraph,
  SessionList,
  StatusIndicator,
  MobileSessionDrawer,
  MobileMonitorToolbar,
} from '~/components/monitor'
import { CrabIdleAnimation } from '~/components/ani'
import { useIsMobile } from '~/hooks/useIsMobile'

export const Route = createFileRoute('/monitor/')({
  component: MonitorPageWrapper,
})

// Wrapper to ensure client-only rendering (useLiveQuery needs client)
function MonitorPageWrapper() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-shell-950 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="crab-icon-glow">
            <CrabIdleAnimation className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-3">
            <Loader2 size={18} className="animate-spin text-crab-400" />
            <span className="font-display text-sm text-gray-400 tracking-wide uppercase">
              Loading Monitor...
            </span>
          </div>
        </motion.div>
      </div>
    )
  }

  return <MonitorPage />
}

const RETRY_DELAY = 3000
const MAX_RETRIES = 10
type AuthState = 'unknown' | 'authorized' | 'unpaired' | 'unauthorized' | 'degraded'

interface PairingState {
  requestId?: string
  message?: string
}

function MonitorPage() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [authState, setAuthState] = useState<AuthState>('unknown')
  const [scopes, setScopes] = useState<string[]>([])
  const [pairing, setPairing] = useState<PairingState | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  // Sidebar collapse state - default to collapsed
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  // Mobile state
  const isMobile = useIsMobile()
  const [sessionDrawerOpen, setSessionDrawerOpen] = useState(false)

  // Live queries from TanStack DB collections
  const sessionsQuery = useLiveQuery(sessionsCollection)
  const actionsQuery = useLiveQuery(actionsCollection)
  const execsQuery = useLiveQuery(execsCollection)

  const sessions = sessionsQuery.data ?? []
  const actions = actionsQuery.data ?? []
  const execs = execsQuery.data ?? []

  // Count clearable items (completed/failed execs)
  const completedCount = useMemo(() => {
    return execs.filter(e => e.status === 'completed' || e.status === 'failed').length
  }, [execs])

  // Handler for clearing completed execs
  const handleClearCompleted = useCallback(() => {
    const count = clearCompletedExecs()
    console.log(`[monitor] cleared ${count} completed execs`)
  }, [])

  // Check connection status on mount
  useEffect(() => {
    checkStatus()
    checkAuthStatus()
  }, [])

  const checkStatus = async () => {
    try {
      const status = await trpc.openclaw.status.query()
      setConnected(status.connected)
    } catch {
      setConnected(false)
    }
  }

  const checkAuthStatus = useCallback(async () => {
    try {
      const status = await trpc.openclaw.authStatus.query()
      setConnected(status.connected)
      setAuthState(status.authState as AuthState)
      setScopes(status.scopes ?? [])
      setPairing(status.pairing ?? null)
    } catch {
      // ignore
    }
  }, [])

  const canPollSessions = useMemo(() => {
    if (!connected) return false
    if (authState === 'unpaired' || authState === 'unauthorized' || authState === 'degraded') {
      return false
    }
    return true
  }, [connected, authState])

  const handleConnect = async (retry = 0) => {
    setConnecting(true)
    setRetryCount(retry)
    try {
      const result = await trpc.openclaw.connect.mutate()
      setAuthState((result.authState as AuthState) ?? 'unknown')
      setScopes(result.scopes ?? [])
      setPairing(result.pairing ?? null)
      if (result.status === 'connected' || result.status === 'already_connected') {
        setConnected(true)
        setRetryCount(0)
        setConnecting(false)
        if (result.authState === 'authorized' || result.authState === 'unknown') {
          await hydrateFromPersistence()
          await loadSessions()
        }
        return
      }
    } catch {
      // Will retry below
    }
    if (retry < MAX_RETRIES) {
      setTimeout(() => handleConnect(retry + 1), RETRY_DELAY)
    } else {
      setConnecting(false)
    }
  }

  const hydrateFromPersistence = async () => {
    try {
      const status = await trpc.openclaw.persistenceStatus.query()
      if (status.sessionCount > 0 || status.actionCount > 0 || status.execEventCount > 0) {
        const data = await trpc.openclaw.persistenceHydrate.query()
        hydrateFromServer(data.sessions, data.actions, data.execEvents ?? [])
        console.log(
          `[monitor] hydrated ${data.sessions.length} sessions, ${data.actions.length} actions, ${(data.execEvents ?? []).length} exec events`
        )
      }
    } catch (e) {
      console.error('Failed to hydrate:', e)
    }
  }

  const loadSessions = useCallback(async () => {
    try {
      const result = await trpc.openclaw.sessions.query({ activeMinutes: 60 })
      setAuthState((prev) => (result.authState as AuthState) ?? prev)
      setScopes((prev) => result.scopes ?? prev)
      setPairing((prev) => result.pairing ?? prev)

      if (result.sessions) {
        for (const session of result.sessions) {
          upsertSession(session)
        }
      }
    } catch (e) {
      console.error('Failed to load sessions:', e)
    }
  }, [])

  // Poll lightweight auth status while connected
  useEffect(() => {
    if (!connected) return
    const interval = setInterval(() => {
      checkAuthStatus()
    }, 10000)
    return () => clearInterval(interval)
  }, [connected, checkAuthStatus])

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    if (!connected && !connecting) {
      handleConnect()
    }
  }, [])

  // Poll for sessions while connected
  useEffect(() => {
    if (!canPollSessions) return
    const interval = setInterval(() => {
      loadSessions()
    }, 5000)
    return () => clearInterval(interval)
  }, [canPollSessions, loadSessions])

  // Subscribe to real-time events
  useEffect(() => {
    if (!canPollSessions) return

    const subscription = trpc.openclaw.events.subscribe(undefined, {
      onData: (data) => {
        if (data.type === 'session' && data.session?.key && data.session.status) {
          updateSessionStatus(data.session.key, data.session.status)
        }
        if (data.type === 'action' && data.action) {
          addAction(data.action)
        }
        if (data.type === 'exec' && data.execEvent) {
          addExecEvent(data.execEvent)
        }
      },
      onError: (err) => {
        console.error('[monitor] subscription error:', err)
      },
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [canPollSessions])

  const pairingHint = pairing?.requestId
    ? `openclaw devices approve ${pairing.requestId}`
    : 'openclaw devices list && openclaw devices approve <requestId>'

  return (
    <div className="h-screen flex flex-col bg-shell-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-shell-900 relative">
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-linear-to-r from-crab-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative flex items-center gap-4">
          {/* Navigation tabs (includes Dashboard back-link) */}
          <NavTabs />

          {/* Connection status */}
          <div className="flex items-center gap-2 ml-2">
            <StatusIndicator status={connecting ? 'thinking' : connected ? 'active' : 'idle'} />
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          {connecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Loader2 size={14} className="animate-spin text-neon-peach" />
              <span className="font-console text-xs text-shell-400">
                {retryCount > 0 ? `retrying (${retryCount}/${MAX_RETRIES})...` : 'connecting...'}
              </span>
            </motion.div>
          )}

          {/* Clear Completed button */}
          {completedCount > 0 && (
            <button
              onClick={handleClearCompleted}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all bg-shell-800/50 hover:bg-crab-900/50 hover:border-crab-700/50 border border-transparent group"
              title={`Clear ${completedCount} completed item${completedCount !== 1 ? 's' : ''}`}
            >
              <Trash2
                size={14}
                className="text-shell-400 group-hover:text-crab-400 transition-colors"
              />
              <span className="font-console text-xs text-shell-400 group-hover:text-crab-400 transition-colors">
                {completedCount}
              </span>
            </button>
          )}

          {/* Stats display */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-shell-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-console text-[11px] text-shell-500 uppercase">Sessions</span>
              <span className="font-display text-sm text-neon-mint">{sessions.length}</span>
            </div>
            <div className="w-px h-4 bg-shell-700" />
            <div className="flex items-center gap-2">
              <span className="font-console text-[11px] text-shell-500 uppercase">Actions</span>
              <span className="font-display text-sm text-neon-peach">{actions.length}</span>
            </div>
          </div>
        </div>
      </header>

      {connected && !canPollSessions && (
        <div className="px-4 py-2 border-y border-neon-peach/30 bg-neon-peach/10">
          <div className="font-console text-xs text-neon-peach">
            Authentication pending. Session polling is paused to avoid missing-scope errors.
          </div>
          <div className="font-console text-[11px] text-shell-300 mt-1">
            {pairing?.message ?? `Approve this device in OpenClaw: ${pairingHint}`}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - desktop only */}
        {!isMobile && (
          <SessionList
            sessions={sessions}
            selectedKey={selectedSession}
            onSelect={setSelectedSession}
            collapsed={sidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />
        )}

        {/* Graph area */}
        <div className={`flex-1 relative ${isMobile ? 'pb-20' : ''}`}>
          <ActionGraph
            sessions={sessions}
            actions={actions}
            execs={execs}
            selectedSession={selectedSession}
            onSessionSelect={setSelectedSession}
          />
        </div>
      </div>

      {/* Mobile components */}
      {isMobile && (
        <>
          <MobileMonitorToolbar
            onOpenDrawer={() => setSessionDrawerOpen(true)}
            connected={connected}
            connecting={connecting}
            sessionCount={sessions.length}
            actionCount={actions.length}
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />
          <MobileSessionDrawer
            open={sessionDrawerOpen}
            onClose={() => setSessionDrawerOpen(false)}
            sessions={sessions}
            selectedKey={selectedSession}
            onSelect={setSelectedSession}
          />
        </>
      )}
    </div>
  )
}
