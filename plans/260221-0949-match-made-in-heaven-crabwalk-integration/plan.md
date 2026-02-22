---
title: "Match Made in Heaven: CrabWalk + LobsterBoard Integration"
description: "Integrate CrabWalk agent monitor into LobsterBoard as widget tile and `/crabwalk/monitor` route with shared backend"
status: complete
priority: P1
effort: 12h
branch: match-made-in-heaven
tags: [crabwalk, integration, widget, gateway, websocket]
created: 2026-02-21
---

# Match Made in Heaven: CrabWalk + LobsterBoard Integration

## Architecture Decision

**Option C selected:** Build CrabWalk separately (Vite), serve its built output as `/crabwalk/*` static sub-route from `server.cjs`. Use iframe for widget tile. `/` stays as LobsterBoard editor; CrabWalk at `/crabwalk/monitor`. CrabWalk's tRPC server logic migrated into `server.cjs` as CommonJS module via esbuild. No Nitro/TanStack Start runtime in production.

## Phases

| # | Phase | Status | Effort |
|---|-------|--------|--------|
| 1 | [Branch Setup + CrabWalk Clone](./phase-01-branch-setup-crabwalk-clone.md) | complete | 30m |
| 2 | [Backend Integration](./phase-02-backend-integration.md) | complete | 3h |
| 3 | [CrabWalk Build Pipeline](./phase-03-crabwalk-build-pipeline.md) | complete | 2h |
| 4 | [CrabWalk Route Mounting + Nav Link](./phase-04-landing-page-integration.md) | complete | 30m |
| 5 | [Widget Tile Integration](./phase-05-widget-tile-integration.md) | complete | 2h |
| 6 | [Config UI in LobsterBoard](./phase-06-config-ui-lobsterboard.md) | complete | 2h |
| 7 | [Testing and Cleanup](./phase-07-testing-cleanup.md) | complete | 1.5h |

## Key Dependencies

- Phase 2 must complete before 3, 4, 5, 6
- Phase 3 must complete before 4 and 5
- Phase 6 depends on Phase 2 (shared config API)
- Phase 7 runs last

## Related Files

- `server.cjs` — backend, receives tRPC adapter in Phase 2
- `js/widgets.js` — CrabWalk widget added in Phase 5
- `app.html` — sidebar widget entry added in Phase 5
- `crabwalk/` — vendored clone added in Phase 1

## Validation Log

### Session 1 — 2026-02-21
**Trigger:** Initial plan creation validation
**Questions asked:** 7

#### Questions & Answers

1. **[Routing]** The plan redirects `/` to CrabWalk and moves the LobsterBoard editor to `/app`. This changes the default experience for existing users. Is this the right routing?
   - Options: `/` → CrabWalk, `/app` → editor | `/` → editor, `/monitor` → CrabWalk | `/` → launcher page with both
   - **Answer:** `/` → editor, `/monitor` → CrabWalk
   - **Rationale:** Keep LobsterBoard as the default landing page. CrabWalk is an add-on at `/crabwalk/monitor`, not a replacement. Preserves backward compat for existing users.

2. **[Source mgmt]** Clone CrabWalk into `crabwalk/` — vendored copy (rm .git), git submodule, or subtree merge?
   - Options: Vendored copy | Git submodule | Subtree merge
   - **Answer:** Vendored copy (rm .git)
   - **Rationale:** Full control to modify CrabWalk freely. No submodule complexity.

3. **[Backend]** CrabWalk uses tRPC+WebSocket. Bundle server-side TS via esbuild into CJS adapter, simple WS proxy, or run CrabWalk's own Nitro server alongside?
   - Options: tRPC adapter via esbuild | Simple WS proxy (no tRPC) | Run CrabWalk Nitro alongside
   - **Answer:** tRPC adapter via esbuild
   - **Rationale:** CrabWalk frontend works as-is with tRPC client. More complex backend but zero frontend rewrites.

4. **[Scope]** Remove CrabWalk workspace routes entirely or keep hidden?
   - Options: Strip completely | Keep but hide
   - **Answer:** Strip workspace completely
   - **Rationale:** Clean integration, less code. Can re-add if needed later.

5. **[Build artifact]** Should `crabwalk-gateway-adapter.cjs` be committed or always generated?
   - Options: Commit the adapter | Always generate | Generate in postinstall hook
   - **Answer:** Commit the adapter
   - **Rationale:** Fresh clones work immediately without esbuild. Regenerate only after CrabWalk source changes.

6. **[Widget default]** Default widget display mode when dragged onto canvas?
   - Options: Button mode | Embed mode
   - **Answer:** Button mode
   - **Rationale:** Small footprint by default. Users can resize/switch to embed mode.

7. **[Error state]** When gateway is unreachable, show friendly waiting UI or error state?
   - Options: Friendly waiting UI | Error state + retry button | Redirect to config
   - **Answer:** Friendly waiting UI
   - **Rationale:** Auto-reconnect with pulsing "Waiting for gateway..." is better UX than manual retry.

#### Confirmed Decisions
- **Routing:** `/` = LobsterBoard editor (unchanged), `/crabwalk/monitor` = CrabWalk
- **Source:** Vendored copy, full control
- **Backend:** tRPC adapter via esbuild, mounted in server.cjs
- **Scope:** Workspace stripped completely
- **Adapter:** Committed to repo
- **Widget:** Button mode default
- **Error UX:** Friendly waiting + auto-reconnect

#### Action Items
- [ ] Rewrite Phase 04 — remove `/` redirect; keep `/` serving `app.html`; add `/crabwalk/*` serving only
- [ ] Update Phase 03 — add "waiting for gateway" UI in CrabWalk monitor when disconnected
- [ ] Update Phase 05 — confirm button mode as default
- [ ] Add nav link in LobsterBoard (`app.html`) pointing to `/crabwalk/monitor`

#### Impact on Phases
- Phase 04: Major rewrite — no longer a redirect phase. `/` stays as editor. Phase becomes "CrabWalk route mounting + nav link in LobsterBoard"
- Phase 03: Add friendly "waiting for gateway" connection state in CrabWalk monitor
- Phase 05: Confirm `displayMode: 'button'` as default (already planned, just confirm)
