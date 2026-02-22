# Phase 02: Backend Integration

## Context Links
- Plan overview: [plan.md](./plan.md)
- CrabWalk repo analysis: [researcher-01-crabwalk-repo-analysis.md](./research/researcher-01-crabwalk-repo-analysis.md)
- CrabWalk frontend/gateway: [researcher-02-crabwalk-frontend-gateway.md](./research/researcher-02-crabwalk-frontend-gateway.md)
- LobsterBoard codebase: [scout-01-lobsterboard-codebase.md](./scout/scout-01-lobsterboard-codebase.md)

## Overview

**Priority:** P1
**Status:** complete
**Description:** Migrate CrabWalk's server-side logic (WebSocket gateway client, tRPC router, persistence) into `server.cjs` as a CommonJS-compatible module. Add shared gateway config endpoints. This is the backbone phase — all other phases depend on it.

## Key Insights

- `server.cjs` is CommonJS (`require()`); CrabWalk source is ESM TypeScript. Solution: create a thin CJS wrapper (`crabwalk/src-cjs/gateway-adapter.cjs`) that is pre-transpiled, OR transpile CrabWalk's server-only code to CJS via a separate esbuild step
- CrabWalk's `ClawdbotClient` uses Node.js `ws` package (server-side only) — needs to be `require()`-able from `server.cjs`
- The tRPC layer (HTTP + WebSocket transport) must be mounted on the existing `http.Server` instance in `server.cjs` — tRPC v11 supports `fetch`-based adapters and WebSocket adapters
- Gateway config: `CLAWDBOT_URL` + `CLAWDBOT_API_TOKEN` must be readable from LobsterBoard's `secrets.json` (gateway config namespace), not just env vars
- CrabWalk's tRPC subscriptions use `ws` transport to push events to the browser — `server.cjs` must attach a `ws.Server` to the existing HTTP server via `server.on('upgrade', ...)`
- In-memory persistence (`persistence.ts`) stays in-process; no disk writes needed

## Requirements

### Functional
- `server.cjs` exposes `/trpc/*` endpoint handling tRPC HTTP requests
- `server.cjs` handles WebSocket upgrade for `/trpc` path (tRPC WS transport for subscriptions)
- `ClawdbotClient` singleton connects to OpenClaw gateway on startup (if config present)
- `GET /api/gateway/config` — returns `{ url, connected, authStatus }` (safe, token masked)
- `POST /api/gateway/config` — saves `{ gatewayUrl, apiToken }` to `secrets.json` under key `__gateway__`; triggers reconnect
- All CrabWalk tRPC procedures accessible: `openclaw.*`, `workspace.*`

### Non-functional
- Gateway reconnect on config change without server restart
- No TypeScript runtime in production — only pre-built JS
- `ws` package added to LobsterBoard's `package.json` dependencies

## Architecture

```
server.cjs (CommonJS)
├── http.createServer(requestHandler)
│   ├── /trpc/*            ← tRPC HTTP adapter (fetch-based)
│   ├── /api/gateway/config ← gateway config R/W
│   └── ... existing routes
├── server.on('upgrade', wsHandler)
│   └── /trpc WebSocket    ← tRPC WS adapter (subscriptions)
└── gatewayAdapter (CJS module)
    ├── ClawdbotClient (transpiled from CrabWalk TS)
    ├── AppRouter (openclaw + workspace procedures)
    └── In-memory collections (sessions, actions, execs)
```

### Build step for gateway adapter

CrabWalk's server-side TS code is transpiled to a single CJS bundle:
```
crabwalk/ → esbuild → crabwalk-gateway-adapter.cjs
```
This bundle is checked into the repo (small, ~50KB) and imported by `server.cjs`.

### Gateway config storage

Stored in `secrets.json` under `__gateway__` key (already managed by LobsterBoard's secrets system):
```json
{
  "__gateway__": {
    "gatewayUrl": "ws://127.0.0.1:18789",
    "apiToken": "..."
  }
}
```

## Related Code Files

- Modify: `server.cjs` — add tRPC mount, WS upgrade handler, gateway config endpoints
- Modify: `package.json` — add `ws`, `@trpc/server` dependencies
- Create: `crabwalk/scripts/build-gateway-adapter.mjs` — esbuild script to bundle server-side TS to CJS
- Create: `crabwalk-gateway-adapter.cjs` — generated bundle (committed or gitignored with build step)
- Create: `crabwalk/src/integrations/trpc/router-slim.ts` — stripped router (no workspace routes)

## Implementation Steps

1. **Install dependencies in LobsterBoard root:**
   ```bash
   npm install ws @trpc/server
   ```

2. **Create esbuild script** `crabwalk/scripts/build-gateway-adapter.mjs`:
   ```js
   import { build } from 'esbuild';
   await build({
     entryPoints: ['src/integrations/trpc/router.ts'],
     bundle: true,
     platform: 'node',
     format: 'cjs',
     outfile: '../crabwalk-gateway-adapter.cjs',
     external: ['ws'],  // ws provided by LobsterBoard's node_modules
     packages: 'external',  // all node_modules external
   });
   ```

3. **Add build script to CrabWalk `package.json`:**
   ```json
   "build:adapter": "node scripts/build-gateway-adapter.mjs"
   ```

4. **Strip workspace routes** from `router.ts` for adapter (or create `router-slim.ts`):
   - Remove `workspaceRouter` import and merge
   - Keep only `openclawRouter`

5. **Mount tRPC in `server.cjs`** — add before the static file fallback:
   ```js
   const { createHTTPHandler } = require('@trpc/server/adapters/standalone');
   const { applyWSSHandler } = require('@trpc/server/adapters/ws');
   const { WebSocketServer } = require('ws');
   const { appRouter, createContext } = require('./crabwalk-gateway-adapter.cjs');

   const trpcHandler = createHTTPHandler({ router: appRouter, createContext });

   // In request handler — add before static file fallback:
   if (pathname.startsWith('/trpc')) {
     return trpcHandler(req, res);
   }

   // WebSocket upgrade:
   const wss = new WebSocketServer({ noServer: true });
   applyWSSHandler({ wss, router: appRouter, createContext });
   server.on('upgrade', (req, socket, head) => {
     const url = new URL(req.url, `http://${req.headers.host}`);
     if (url.pathname.startsWith('/trpc')) {
       wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
     }
   });
   ```

6. **Add gateway config endpoints** in `server.cjs`:
   ```js
   // GET /api/gateway/config
   if (req.method === 'GET' && pathname === '/api/gateway/config') {
     const secrets = getSecrets();
     const gw = secrets['__gateway__'] || {};
     sendJson(res, 200, {
       url: gw.gatewayUrl || 'ws://127.0.0.1:18789',
       hasToken: !!gw.apiToken,
       connected: gatewayAdapter.getStatus(),
     });
     return;
   }

   // POST /api/gateway/config
   if (req.method === 'POST' && pathname === '/api/gateway/config') {
     // parse body, save to secrets['__gateway__'], trigger reconnect
   }
   ```

7. **Expose reconnect hook** in `crabwalk-gateway-adapter.cjs` — adapter exports `{ appRouter, createContext, reconnect(config), getStatus() }`

8. **Run build and verify:**
   ```bash
   cd crabwalk && node scripts/build-gateway-adapter.mjs
   node server.cjs
   curl http://127.0.0.1:7880/api/gateway/config
   ```

## Todo

- [ ] `npm install ws @trpc/server` in LobsterBoard root
- [ ] Create `crabwalk/scripts/build-gateway-adapter.mjs`
- [ ] Create `crabwalk/src/integrations/trpc/router-slim.ts` (openclaw only, no workspace)
- [ ] Run esbuild; verify `crabwalk-gateway-adapter.cjs` emitted
- [ ] Mount tRPC HTTP handler in `server.cjs`
- [ ] Add WS upgrade handler in `server.cjs`
- [ ] Add `GET /api/gateway/config` endpoint
- [ ] Add `POST /api/gateway/config` endpoint (saves to secrets, triggers reconnect)
- [ ] Verify tRPC endpoint accessible: `curl http://127.0.0.1:7880/trpc/openclaw.status`
- [ ] Verify WS upgrade works (connect with wscat or test client)

## Success Criteria

- `GET /api/gateway/config` returns JSON with url + connected status
- `POST /api/gateway/config` saves config and triggers reconnect
- CrabWalk frontend (when built) can subscribe to `trpc.openclaw.events` via WS on same port
- No TypeScript compilation required at runtime

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| tRPC CJS/ESM mismatch | Medium | Use `@trpc/server` CJS build explicitly; check exports map |
| `ws` version conflict between CrabWalk and LobsterBoard | Low | Pin `ws@^8` in LobsterBoard root; esbuild externalizes it |
| esbuild can't resolve TanStack Start internal imports | Medium | Only bundle `src/integrations/` subtree, not TanStack Start routes |
| tRPC v11 adapter API differs from v10 | Low | Confirm with `@trpc/server@^11` docs before coding |

## Security Considerations

- `apiToken` stored only in `secrets.json`, never returned in `GET /api/gateway/config` response (only `hasToken: bool`)
- Gateway config endpoints blocked in public mode (same guard as other edit APIs)
- WS upgrade only handled for `/trpc` path prefix; other upgrade requests rejected

## Next Steps

- Phase 03: Build CrabWalk's frontend and wire static serving from `server.cjs`
