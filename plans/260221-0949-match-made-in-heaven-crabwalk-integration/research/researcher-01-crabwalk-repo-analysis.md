# CrabWalk Repo Analysis
**Date:** 2026-02-21 | **Repo:** https://github.com/luccast/crabwalk | **v1.0.11**

---

## What It Is

Real-time companion monitor/dashboard for **OpenClaw (Clawdbot)** AI agents. Visualizes live agent activity (WhatsApp, Telegram, Discord, Slack) as an interactive ReactFlow node graph. Shows thinking states, tool calls, and response chains as they stream.

Not a standalone product — requires an OpenClaw gateway running.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | TanStack Start (SSR/SSG wrapper over Vite) |
| UI | React 19, ReactFlow (`@xyflow/react`), Framer Motion, Tailwind v4 |
| Data/State | TanStack DB, TanStack React Query |
| API | tRPC v11 (type-safe client/server, with subscriptions for streaming) |
| Realtime | WebSocket (`ws` package, server-side only) |
| Bundler | Vite 7 + Nitro (server engine) |
| Language | TypeScript 5.7 (94% of codebase) |
| Runtime | Node.js ESM (`"type": "module"`) |
| Serialization | SuperJSON (tRPC transformer) |
| Validation | Zod |

---

## File Structure

```
crabwalk/
├── src/
│   ├── routes/
│   │   ├── __root.tsx           # Root layout
│   │   ├── index.tsx            # Home page (crab animation + links)
│   │   ├── monitor/index.tsx    # Main monitor dashboard
│   │   ├── workspace/           # File browser route
│   │   └── api/trpc.ts          # tRPC HTTP handler (server)
│   ├── integrations/
│   │   ├── openclaw/
│   │   │   ├── client.ts        # ClawdbotClient (WebSocket, server-only)
│   │   │   ├── protocol.ts      # Gateway frame types
│   │   │   ├── parser.ts        # Event frame parsing
│   │   │   ├── collections.ts   # TanStack DB collections
│   │   │   └── persistence.ts   # In-memory persistence service
│   │   ├── trpc/
│   │   │   ├── router.ts        # AppRouter (openclawRouter + workspaceRouter)
│   │   │   └── client.ts        # tRPC client (browser)
│   │   └── query/               # TanStack Query setup
│   ├── components/
│   │   ├── monitor/             # ActionGraph, SessionList, SettingsPanel, StatusIndicator
│   │   ├── workspace/           # File browser components
│   │   ├── navigation/          # NavTabs
│   │   └── ani/                 # Crab sprite animations
│   ├── hooks/
│   │   └── useIsMobile.ts
│   └── lib/
│       ├── graph-layout.ts      # ReactFlow layout logic
│       ├── workspace-fs.ts      # Server-side file system ops
│       └── demo-db.ts           # Demo/seed data
├── bin/crabwalk                 # CLI entry (shell script)
├── vite.config.ts
├── tsconfig.json
├── Dockerfile
└── docker-compose.yml
```

---

## Gateway Connection

### Protocol
- **Transport:** WebSocket (`ws://`)
- **Default URL:** `ws://127.0.0.1:18789` (env: `CLAWDBOT_URL`)
- **Auth:** Bearer token (env: `CLAWDBOT_API_TOKEN`; auto-detected from `~/.openclaw/openclaw.json` at `gateway.auth.token`)
- **Client class:** `ClawdbotClient` in `src/integrations/openclaw/client.ts` — server-side only (Node.js `ws` package)
- **Auth states:** `unknown | authorized | unpaired | unauthorized | degraded`

### Data Flow
```
OpenClaw Gateway (ws://127.0.0.1:18789)
    ↓ WebSocket (server-side ClawdbotClient)
Nitro/Node.js Server
    ↓ tRPC subscription (SSE/WS)
React Frontend (TanStack DB collections + React Query)
    ↓
ReactFlow graph render
```

### tRPC Router Shape
- `openclaw.connect/disconnect/status/authStatus` — connection management
- `openclaw.sessions` — list active sessions (query)
- `openclaw.events` — real-time event stream (subscription)
- `openclaw.persistence*` — in-memory session/action persistence
- `openclaw.setDebugMode/downloadLogs` — debug tooling
- `workspace.*` — file system CRUD (`~/.openclaw/workspace`)

---

## Config / Environment Variables

| Var | Default | Purpose |
|---|---|---|
| `CLAWDBOT_URL` | `ws://127.0.0.1:18789` | Gateway WebSocket URL |
| `CLAWDBOT_API_TOKEN` | auto from `~/.openclaw/openclaw.json` | Auth token |
| `CRABWALK_DEBUG_OPENCLAW` | `0` | Enable raw event logging |
| `WORKSPACE_HOST_PATH` | `~/.openclaw/workspace` | Docker workspace mount |

Token auto-detection: reads `.gateway.auth.token` from `~/.openclaw/openclaw.json`.

---

## Key Integration Points for LobsterBoard

1. **`ClawdbotClient`** — single persistent WS connection, singleton per server process (`getClawdbotClient()`)
2. **`parseEventFrame`** — converts raw gateway frames to typed `MonitorSession | MonitorAction | MonitorExecEvent`
3. **tRPC `events` subscription** — the streaming mechanism; frontend subscribes via `trpc.openclaw.events.useSubscription()`
4. **TanStack DB collections** — `sessionsCollection`, `actionsCollection`, `execsCollection`; updated client-side via `useLiveQuery`
5. **No auth layer** — dashboard is open by default; token is server-side only

---

## Unresolved Questions

1. What is the OpenClaw gateway protocol exactly (frame schema)? Need `src/integrations/openclaw/protocol.ts` for LobsterBoard compatibility.
2. Does LobsterBoard run its own gateway or proxy through OpenClaw? Integration approach TBD.
3. `@tanstack/db` v0.5.0 + `@tanstack/react-db` — early release; API stability risk if LobsterBoard needs to adapt collections.
4. Nitro + TanStack Start adds SSR complexity — if LobsterBoard is pure SPA, the server rendering layer may conflict or require stripping.
