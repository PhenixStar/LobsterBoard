# Phase 07: Testing and Cleanup

## Context Links
- Plan overview: [plan.md](./plan.md)
- All previous phases: [phase-01](./phase-01-branch-setup-crabwalk-clone.md) through [phase-06](./phase-06-config-ui-lobsterboard.md)

## Overview

**Priority:** P1
**Status:** complete
**Description:** End-to-end verification of the full integration, cleanup of dead code and build artifacts, documentation updates, and final commit before PR.

## Key Insights

- LobsterBoard has no automated test suite — testing is manual + curl-based smoke tests
- The primary failure modes to verify: tRPC WS connection, iframe loading, config persistence, auth/public-mode guards
- Cleanup targets: CrabWalk workspace files (if not already deleted in Phase 03), any debug/demo code, `demo-db.ts` if still referenced
- `package-lock.json` (already modified per git status) needs to reflect new `ws` + `@trpc/server` deps
- The `crabwalk/` directory must be committed without its own `.git` history (verified in Phase 01)
- Branch `match-made-in-heaven` should be clean: no secrets, no build artifacts in `.output/`

## Requirements

- All integration paths functional end-to-end
- No console errors in browser on load
- No orphaned files or dead imports
- `secrets.json` and `.env` excluded from commit
- `crabwalk/.output/` excluded via `.gitignore` (build artifacts regenerated via `npm run build:crabwalk`)
- Documentation updated: `README.md` and `docs/` reflect new architecture

## Test Plan

### 1. Server startup
```bash
npm run build:crabwalk   # builds crabwalk → .output/public/
node server.cjs
# Expect: "LobsterBoard Builder Server running at http://127.0.0.1:7880"
# Expect: no error about missing crabwalk-gateway-adapter.cjs
```

### 2. Landing page redirect
```bash
curl -I http://127.0.0.1:7880/
# Expect: HTTP/1.1 302, Location: /crabwalk/monitor

curl -I http://127.0.0.1:7880/app
# Expect: HTTP/1.1 200, Content-Type: text/html
```

### 3. CrabWalk static serving
```bash
curl -I http://127.0.0.1:7880/crabwalk/
# Expect: 200 text/html (index.html)

curl -I http://127.0.0.1:7880/crabwalk/monitor
# Expect: 200 text/html (SPA fallback to index.html)

curl -I http://127.0.0.1:7880/crabwalk/assets/  # pick a real asset filename
# Expect: 200 with correct MIME type
```

### 4. tRPC endpoints
```bash
curl http://127.0.0.1:7880/trpc/openclaw.status
# Expect: JSON tRPC response (not 404)

curl http://127.0.0.1:7880/api/gateway/config
# Expect: { url: "...", hasToken: bool, connected: bool }
```

### 5. Gateway config save
```bash
curl -X POST http://127.0.0.1:7880/api/gateway/config \
  -H 'Content-Type: application/json' \
  -d '{"gatewayUrl":"ws://127.0.0.1:18789"}'
# Expect: { status: 'ok' }
# Verify: secrets.json contains __gateway__.gatewayUrl
```

### 6. Browser tests (manual)
- [ ] Visit `http://localhost:7880/` → redirects to CrabWalk monitor
- [ ] CrabWalk loads without JS errors (check DevTools console)
- [ ] tRPC WS connects (check Network → WS tab in DevTools; frames flowing)
- [ ] Visit `http://localhost:7880/app` → LobsterBoard editor loads normally
- [ ] Drag `crabwalk-monitor` widget onto canvas (button mode) → status dot appears
- [ ] Click "Open Monitor" → fullscreen overlay opens with CrabWalk iframe
- [ ] Close overlay → canvas returns
- [ ] Change widget to embed mode → iframe fills tile
- [ ] Open Gateway Settings modal → URL pre-filled, token shows `••••••••`
- [ ] Save config → modal closes, no errors
- [ ] Reload `/app` → all widgets reload correctly from `config.json`
- [ ] Public mode: Gateway button hidden, overlay widget shows but config endpoints return 403

### 7. Auth / public mode guards
```bash
curl -X POST http://127.0.0.1:7880/api/mode -H 'Content-Type: application/json' \
  -d '{"publicMode":true}'
curl -X POST http://127.0.0.1:7880/api/gateway/config \
  -H 'Content-Type: application/json' -d '{}'
# Expect: 403 Forbidden in public mode
```

## Cleanup Checklist

### Dead code removal
- [ ] Confirm `crabwalk/src/routes/workspace/` deleted (Phase 03)
- [ ] Confirm `crabwalk/src/components/workspace/` deleted (Phase 03)
- [ ] Confirm `crabwalk/src/lib/workspace-fs.ts` deleted (Phase 03)
- [ ] Confirm `crabwalk/src/routes/api/trpc.$.ts` deleted (Phase 03)
- [ ] Remove `crabwalk/src/lib/demo-db.ts` if no longer imported
- [ ] Remove unused tRPC procedures from `router-slim.ts` (workspace router)
- [ ] Confirm `crabwalk/src/components/monitor/SettingsPanel.tsx` not imported anywhere

### Build artifacts / secrets
- [ ] Verify `.gitignore` excludes `crabwalk/.output/`, `crabwalk/.vinxi/`, `crabwalk/node_modules/`
- [ ] Verify `secrets.json` in `.gitignore` (already should be)
- [ ] `git status` shows no unintended files staged

### Documentation
- [ ] Update `README.md` — add section "CrabWalk Integration" describing:
  - `/` redirects to CrabWalk monitor
  - `/app` is the LobsterBoard editor
  - Gateway settings in editor toolbar
  - `npm run build:crabwalk` required after fresh clone
- [ ] Update `docs/system-architecture.md` — add CrabWalk as a component with tRPC/WS flow diagram
- [ ] Update `docs/codebase-summary.md` — add `crabwalk/` directory entry

## Related Code Files

- All files modified across Phases 01–06 (no new files in this phase)
- `README.md` — update
- `docs/system-architecture.md` — update
- `docs/codebase-summary.md` — update

## Implementation Steps

1. Run full test plan (curl + browser) as listed above
2. Fix any failures found (document what was fixed)
3. Execute cleanup checklist
4. Update documentation
5. Final `git status` review — confirm only intended files changed
6. Commit with message: `feat: integrate CrabWalk as landing page and widget tile`

## Todo

- [ ] Run server startup test
- [ ] Run all curl smoke tests (steps 1–5)
- [ ] Run all browser manual tests (step 6)
- [ ] Verify public mode guards (step 7)
- [ ] Dead code cleanup
- [ ] Build artifact / secrets gitignore verification
- [ ] `README.md` update
- [ ] `docs/system-architecture.md` update
- [ ] `docs/codebase-summary.md` update
- [ ] Final `git status` check
- [ ] Commit on `match-made-in-heaven` branch

## Success Criteria

- All curl smoke tests return expected status codes
- No JS console errors in browser on CrabWalk or LobsterBoard pages
- tRPC WebSocket connection established (visible in DevTools Network tab)
- Widget tile functional in both button and embed modes
- Gateway config saves and persists across server restart
- `git diff --stat main` shows only intentional files; no secrets or build artifacts
- Branch ready for PR review

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| tRPC WS never connects (missing upgrade handler) | Medium | Check `server.on('upgrade', ...)` wiring in Phase 02; re-test with wscat |
| CrabWalk blank screen (base path mismatch) | Medium | Verify `<base href="/crabwalk/">` in built index.html; check TanStack Start basepath config |
| `crabwalk-gateway-adapter.cjs` missing after fresh clone (gitignored) | Low | Add `postinstall` or note in README to run `npm run build:crabwalk` |
| Secrets committed accidentally | Low | Final `git diff` review before commit; `secrets.json` already in .gitignore |

## Security Considerations

- Final audit: confirm no API tokens, gateway credentials, or `secrets.json` content in any committed file
- Confirm `GET /api/gateway/config` response never contains raw `apiToken`
- Confirm WS upgrade only responds to `/trpc` path prefix

## Unresolved Questions

1. Should `crabwalk-gateway-adapter.cjs` be committed (convenience) or always generated via build script (cleaner)? Recommendation: commit it to avoid requiring esbuild on fresh install, but add it to a `npm run build:adapters` script for updates.
2. Does TanStack Start v1.0.11 support `preset: 'static'` or does it require a workaround? Needs verification in Phase 03 before Phase 07 testing.
3. If OpenClaw gateway is not running, should `server.cjs` still start cleanly (just disconnected)? Yes — `ClawdbotClient` must handle connection failure gracefully with retry, not crash the process.
