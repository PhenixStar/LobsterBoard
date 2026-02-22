# CrabWalk Frontend & Gateway Research

**Date:** 2026-02-21
**Repo:** https://github.com/luccast/crabwalk (master branch, v1.0.11)
**Purpose:** Integration into LobsterBoard as embedded widget

---

## 1. Frontend Rendering

**Framework:** React 19 + TanStack Start (file-based SSR router, Vite 7 + Nitro)
**Language:** TypeScript 5.7, ESM
**Key UI libs:**
- `@xyflow/react` v12 (ReactFlow) — node graph for agent sessions/actions
- `Framer Motion` v12 — panel animations
- `TanStack DB` + TanStack Query — reactive in-memory collections
- `lucide-react` — icons; `react-markdown` — markdown rendering

**Route structure:**
```
src/routes/
  __root.tsx          # App shell, layout wrapper
  index.tsx           # Splash/home (animated crab, links to /monitor and /workspace)
  monitor/index.tsx   # Main monitor (ReactFlow graph + session list + settings)
  workspace/index.tsx # File browser/editor
  api/trpc.$.ts       # tRPC HTTP handler (server-side)
```

**Core render path:** `monitor/index.tsx` → `ActionGraph` (ReactFlow canvas) + `SessionList` + `SettingsPanel`.
ReactFlow node types: `CrabNode`, `ActionNode`, `ExecNode`, `SessionNode`, `ChaserCrabNode`.

**Build output:** `npm run build` → Nitro server at `.output/server/index.mjs`
**Dev:** `vite dev --port 3000 --host`

---

## 2. Gateway / Backend Communication

**CRITICAL:** `ClawdbotClient` uses Node.js `ws` package — server-side ONLY (not browser WebSocket).
The gateway connection lives in the Nitro/Node server process, not the browser.

**Flow:**
```
OpenClaw Gateway (ws://127.0.0.1:18789)
    ↕ WebSocket (Node ws, server-side)
CrabWalk Nitro Server (localhost:3000)
    ↕ tRPC subscriptions / HTTP
Browser (React frontend)
```

**Gateway defaults:**
- URL: `ws://127.0.0.1:18789` (env `CLAWDBOT_URL`)
- Auth: `CLAWDBOT_API_TOKEN` (env), challenge-response via `buildSignedDevice()`
- Protocol: JSON frames — `req` / `res` / `event` / `hello-ok`
- Auth scopes: requires `operator.read`; states: `authorized | unpaired | unauthorized | degraded`
- Reconnect: 5s auto-retry on non-1000 close code
- Request timeout: 30s per RPC call

**tRPC router procedures (`openclaw` namespace):**
| Procedure | Type | Purpose |
|---|---|---|
| `gatewayEndpoint` | query | returns WS URL |
| `events` | subscription | streams session/action/exec events to browser |
| `connect` / `disconnect` | mutation | manual gateway control |
| `status` / `authStatus` | query | connection + auth state |
| `sessions` | query | list sessions |
| `persistenceStart/Stop/Clear` | mutation | persistence service control |
| `setDebugMode` + log controls | mutation | debug/log management |

**Browser state:** `trpc.openclaw.events.subscribe()` → TanStack DB collections → ReactFlow nodes.

---

## 3. Config/Setup UI to Remove

**Home page** `src/routes/index.tsx`:
- Pure splash: animated crab PNG sprite (idle/jump/attack frames), "CRABWALK" title, two links
- No config form — entirely skippable by deep-linking to `/monitor`

**SettingsPanel** `src/components/monitor/SettingsPanel.tsx`:
- Slide-in panel (right side, `w-80` = 320px), Framer Motion animation
- Trigger: gear icon button (`hidden sm:block` — hidden on mobile)
- Contents:
  - Connection section: Wifi status, Connect/Disconnect/Refresh buttons
  - Debug Logging toggle
  - Background Service (persistence): start/stop/clear, session/action counts, 24h sync toggle
  - Log Collection: record/download/clear raw events, count display
  - Gateway Info: endpoint URL (read-only), protocol v3, online/offline status
  - Version badge (`crabwalk v{version}`)
- Props interface fully defined — component is self-contained, no side effects on removal
- **To remove:** delete `<SettingsPanel .../>` block + gear button from `monitor/index.tsx`

**Mobile toolbar** `src/components/monitor/MobileMonitorToolbar.tsx`:
- Contains mobile equivalent of settings controls — also removable for embedded use

---

## 4. Embedding in LobsterBoard

No native embed/widget/iframe support. Three options:

### Option A: iframe (simplest, least invasive)
- Run CrabWalk as sidecar (`crabwalk start -d` or Docker), embed `<iframe src="http://localhost:3000/monitor" />`
- Pros: zero code changes, full isolation, auth handled by env vars at startup
- Cons: cross-origin cookie/style isolation, can't theme to match LobsterBoard, double Node process

### Option B: Fork + strip to React component (recommended)
- Remove splash route (`src/routes/index.tsx`)
- Remove SettingsPanel + mobile toolbar (config via env/CLI only)
- Remove workspace routes/components (`src/routes/workspace/`, `src/components/workspace/`)
- Remove `src/lib/workspace-fs.ts`, `NavTabs`
- Wrap `monitor/index.tsx` logic as `<CrabWalkMonitor gatewayUrl={...} apiToken={...} />`
- Run stripped CrabWalk as embedded Nitro server inside LobsterBoard's Node process, OR as sidecar with tRPC calls proxied

### Option C: Browser-native WS (most invasive)
- Port `ClawdbotClient` from Node `ws` to browser `WebSocket` API (API surface is compatible)
- Remove Nitro server entirely; tRPC becomes optional
- Mount monitor component directly in LobsterBoard's React tree
- Requires LobsterBoard to expose gateway URL + token to browser (security consideration)

---

## 5. File Map: Keep vs Remove for Widget

| Path | Action |
|---|---|
| `src/integrations/openclaw/client.ts` | KEEP (or port to browser WS for Option C) |
| `src/integrations/openclaw/{collections,parser,protocol,persistence}.ts` | KEEP |
| `src/integrations/openclaw/device.ts` | KEEP (auth signing) |
| `src/components/monitor/ActionGraph.tsx` | KEEP — core canvas |
| `src/components/monitor/*Node.tsx` (5 files) | KEEP — graph nodes |
| `src/components/monitor/SessionList.tsx` | KEEP |
| `src/components/monitor/StatusIndicator.tsx` | KEEP |
| `src/components/monitor/SettingsPanel.tsx` | REMOVE |
| `src/components/monitor/MobileMonitorToolbar.tsx` | REMOVE |
| `src/components/monitor/MobileSessionDrawer.tsx` | OPTIONAL |
| `src/components/workspace/*` | REMOVE |
| `src/routes/index.tsx` | REMOVE (splash) |
| `src/routes/workspace/` | REMOVE |
| `src/routes/api/trpc.$.ts` | KEEP if running Nitro server |
| `src/integrations/trpc/router.ts` | KEEP (server) or refactor (CSR) |
| `src/components/navigation/NavTabs.tsx` | REMOVE |
| `src/components/ani/*` | KEEP (small, decorative) |
| `src/lib/workspace-fs.ts` | REMOVE |
| `src/lib/demo-db.ts` | OPTIONAL |

---

## Unresolved Questions

1. Does `ClawdbotClient` device pairing persist to disk (`device.ts` / `persistence.ts`) or is it per-session? Affects how LobsterBoard manages device identity across restarts.
2. If using Option B (fork), does LobsterBoard's Node server run Nitro as a sub-process or co-locate it? Nitro generates its own `index.mjs` — may conflict with host server.
3. `src/integrations/openclaw/persistence.ts` — unclear if it writes to disk (would need path config) or in-memory only.
4. TanStack Start CSR-only mode: possible but undocumented — may need Vite config changes to disable SSR.
5. Gateway token security: Option C exposes token to browser — acceptable in LobsterBoard's threat model?
