# Phase 03: CrabWalk Build Pipeline

## Context Links
- Plan overview: [plan.md](./plan.md)
- CrabWalk frontend/gateway: [researcher-02-crabwalk-frontend-gateway.md](./research/researcher-02-crabwalk-frontend-gateway.md)
- Phase 02 (backend integration): [phase-02-backend-integration.md](./phase-02-backend-integration.md)

## Overview

**Priority:** P1
**Status:** complete
**Description:** Configure CrabWalk's Vite build to produce a client-side SPA bundle scoped to base path `/crabwalk/`, strip `SettingsPanel` and workspace routes, configure the tRPC client to point at `server.cjs`'s `/trpc` endpoint, and serve the built static output from `server.cjs`.

## Key Insights

- TanStack Start uses Nitro as its server engine; in production the build outputs to `.output/public/` (static) and `.output/server/` (SSR). We want **CSR/SPA mode only** — no Nitro SSR in production. TanStack Start supports `ssr: false` in `app.config.ts` to output a pure SPA.
- Vite `base` must be set to `/crabwalk/` so all asset paths are relative to that prefix
- The tRPC WS client in CrabWalk reads gateway URL from `trpc.openclaw.gatewayEndpoint` query — this already abstracts the server-side config. No frontend env var needed; the client just connects to `ws://<same-host>/trpc`
- `SettingsPanel.tsx` removal: delete the import + JSX block from `monitor/index.tsx`; gear icon button also removed
- Workspace route removal: delete `src/routes/workspace/` and remove from nav if present in `NavTabs.tsx`; also remove `src/lib/workspace-fs.ts` and `src/routes/api/trpc.$.ts` (tRPC is now server.cjs)
- After build, `crabwalk/.output/public/` is a self-contained SPA. `server.cjs` serves it under `/crabwalk/*`

## Requirements

### Functional
- `pnpm build` in `crabwalk/` produces `.output/public/` with SPA assets
- All asset URLs in built HTML start with `/crabwalk/`
- CrabWalk SPA connects to tRPC at `ws://<host>/trpc` (same origin, dynamic)
- No `SettingsPanel` in built output
- No workspace route in built output

### Non-functional
- Build must be reproducible; add `pnpm build:crabwalk` script to LobsterBoard root `package.json`
- Built output does NOT include Nitro SSR server bundle (CSR mode only)
<!-- Updated: Validation Session 1 - Add friendly "waiting for gateway" UI when disconnected -->
- When gateway is unreachable, CrabWalk monitor shows a friendly "Waiting for gateway..." pulsing indicator with auto-reconnect (not an error state)

## Architecture

```
crabwalk/
├── app.config.ts          ← add: ssr: false, server.preset: 'static'
├── vite.config.ts         ← add: base: '/crabwalk/'
└── src/
    ├── routes/
    │   ├── monitor/index.tsx   ← remove SettingsPanel import/JSX + gear button
    │   └── workspace/          ← DELETE entire directory
    ├── integrations/trpc/
    │   └── client.ts           ← update WS URL to use window.location host
    └── lib/
        └── workspace-fs.ts     ← DELETE (server-only, not needed)

After build:
crabwalk/.output/public/
├── index.html             ← entry, loads /crabwalk/assets/...
└── assets/
    └── *.js, *.css
```

### tRPC client URL update

In `src/integrations/trpc/client.ts`, replace hardcoded/env-based URL with:
```ts
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const trpcWsUrl = `${wsProtocol}//${window.location.host}/trpc`;
```
This way the client always connects back to the same server that served the page.

## Related Code Files

- Modify: `crabwalk/app.config.ts` — add `ssr: false`, static preset
- Modify: `crabwalk/vite.config.ts` — add `base: '/crabwalk/'`
- Modify: `crabwalk/src/routes/monitor/index.tsx` — remove SettingsPanel
- Modify: `crabwalk/src/components/navigation/NavTabs.tsx` — remove workspace tab
- Modify: `crabwalk/src/integrations/trpc/client.ts` — dynamic WS URL
- Delete: `crabwalk/src/routes/workspace/` (entire dir)
- Delete: `crabwalk/src/lib/workspace-fs.ts`
- Delete: `crabwalk/src/components/workspace/` (entire dir)
- Delete: `crabwalk/src/routes/api/trpc.$.ts` (tRPC is now in server.cjs)
- Modify: `package.json` (LobsterBoard root) — add `build:crabwalk` script
- Modify: `server.cjs` — add `/crabwalk/*` static serving

## Implementation Steps

1. **Set SPA/static mode in `crabwalk/app.config.ts`:**
   ```ts
   import { defineConfig } from '@tanstack/start/config';
   export default defineConfig({
     server: { preset: 'static' },
   });
   ```

2. **Set base path in `crabwalk/vite.config.ts`:**
   ```ts
   export default defineConfig({
     base: '/crabwalk/',
     // ...existing config
   });
   ```

3. **Update tRPC WS client URL** in `src/integrations/trpc/client.ts`:
   - Replace static `CLAWDBOT_URL` env reference with dynamic `window.location.host` construction (see Architecture section)

4. **Remove SettingsPanel** from `crabwalk/src/routes/monitor/index.tsx`:
   - Delete import line for `SettingsPanel`
   - Delete `settingsOpen` state and setter
   - Delete gear icon button JSX
   - Delete `{settingsOpen && <SettingsPanel ... />}` block

5. **Remove workspace route** from `NavTabs.tsx`:
   - Delete the workspace tab entry

6. **Delete workspace files:**
   ```bash
   rm -rf crabwalk/src/routes/workspace
   rm -rf crabwalk/src/components/workspace
   rm -f crabwalk/src/lib/workspace-fs.ts
   rm -f crabwalk/src/routes/api/trpc.$.ts
   ```

7. **Add friendly waiting UI** in CrabWalk monitor (`src/routes/monitor/index.tsx` or the main graph component):
   - When tRPC subscription is disconnected/errored, show a centered pulsing indicator:
     ```
     🦀 Waiting for gateway...
     ```
   - Use CSS animation (pulse/breathe). Auto-reconnect via tRPC subscription retry.
   - No manual "Retry" button needed — tRPC subscriptions auto-retry.

8. **Build and verify:**
   ```bash
   cd crabwalk && pnpm build
   ls .output/public/
   # Expect: index.html + assets/
   grep -r '/crabwalk/' .output/public/index.html  # verify base path in asset URLs
   ```

8. **Add static serving in `server.cjs`** — before the generic static file fallback:
   ```js
   const CRABWALK_PUBLIC = path.join(__dirname, 'crabwalk', '.output', 'public');

   if (pathname.startsWith('/crabwalk/') || pathname === '/crabwalk') {
     const subPath = pathname === '/crabwalk' ? '/index.html'
                   : pathname.slice('/crabwalk'.length) || '/index.html';
     const filePath = path.join(CRABWALK_PUBLIC, subPath);
     const resolved = path.resolve(filePath);
     if (!resolved.startsWith(CRABWALK_PUBLIC)) {
       sendResponse(res, 403, 'text/plain', 'Forbidden'); return;
     }
     fs.readFile(filePath, (err, data) => {
       if (err) {
         // SPA fallback: unknown paths → index.html
         fs.readFile(path.join(CRABWALK_PUBLIC, 'index.html'), (e2, html) => {
           if (e2) { sendResponse(res, 404, 'text/plain', 'Not Found'); return; }
           sendResponse(res, 200, 'text/html', html);
         });
         return;
       }
       const ext = path.extname(filePath).toLowerCase();
       const ct = MIME_TYPES[ext] || 'application/octet-stream';
       sendResponse(res, 200, ct, data);
     });
     return;
   }
   ```

9. **Add `build:crabwalk` to LobsterBoard root `package.json`:**
   ```json
   "build:crabwalk": "cd crabwalk && pnpm build"
   ```

10. **Smoke test:** `node server.cjs` → `curl http://127.0.0.1:7880/crabwalk/` → returns CrabWalk index.html

## Todo

- [ ] Set `preset: 'static'` in `crabwalk/app.config.ts`
- [ ] Set `base: '/crabwalk/'` in `crabwalk/vite.config.ts`
- [ ] Update tRPC WS client URL to use `window.location.host`
- [ ] Remove SettingsPanel from `monitor/index.tsx`
- [ ] Remove workspace tab from `NavTabs.tsx`
- [ ] Delete workspace dirs + `workspace-fs.ts` + `api/trpc.$.ts`
- [ ] Run `pnpm build` in `crabwalk/`; verify `.output/public/` exists with correct asset paths
- [ ] Add `/crabwalk/*` static serving block in `server.cjs`
- [ ] Add `build:crabwalk` script to root `package.json`
- [ ] Smoke test: `curl http://127.0.0.1:7880/crabwalk/` returns HTML

## Success Criteria

- `GET /crabwalk/` returns CrabWalk index.html with status 200
- Asset URLs in HTML contain `/crabwalk/assets/`
- CrabWalk SPA loads in browser at `http://localhost:7880/crabwalk/`
- No SettingsPanel gear icon visible
- No workspace tab in nav
- tRPC WS connects to `ws://localhost:7880/trpc` successfully

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| TanStack Start `preset: 'static'` not supported in v1.0.11 | Medium | Fallback: use `preset: 'node-server'` but only copy `.output/public/` |
| Vite base path breaks TanStack Start router | Medium | Test with `<base href="/crabwalk/">` in index.html as alternative; configure TanStack Start router `basepath` option |
| SPA routing for sub-paths (e.g. `/crabwalk/monitor`) returns 404 | Low | Handled by SPA fallback in server.cjs static handler (step 8) |
| CSS isolation: CrabWalk Tailwind styles bleed into LobsterBoard | Low | CrabWalk served in iframe for widget; landing page is full-screen so no bleed |

## Security Considerations

- Path traversal guard on `/crabwalk/*` handler (same pattern as existing LobsterBoard static handler)
- Built assets are read-only static files; no execution path

## Next Steps

- Phase 04: Make `/` redirect to `/crabwalk/` (landing page)
- Phase 05: Widget tile using iframe to `/crabwalk/`
