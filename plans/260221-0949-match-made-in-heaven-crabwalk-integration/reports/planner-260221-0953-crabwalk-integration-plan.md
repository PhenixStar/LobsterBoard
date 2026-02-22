# Planner Report: CrabWalk + LobsterBoard Integration

**Date:** 2026-02-21
**Plan dir:** `plans/260221-0949-match-made-in-heaven-crabwalk-integration/`

---

## Summary

Plan created across 7 phase files covering the full CrabWalk integration into LobsterBoard. Architecture decision: Option C (iframe + sub-route serving) selected as the only practical path given the React/Vite vs vanilla JS divide.

## Architecture Decision Rationale

| Option | Verdict |
|--------|---------|
| A: iframe/script tag (no build) | Rejected — CrabWalk requires a build step regardless; pure script tag won't work for TSX |
| B: Convert to vanilla JS | Rejected — enormous effort, loses ReactFlow |
| **C: Vite SPA build → static sub-route + iframe** | **Selected** — clean separation, no runtime framework mixing, CrabWalk stays maintainable |

Key refinement: CrabWalk's **tRPC server** (ClawdbotClient + AppRouter) is extracted via esbuild into `crabwalk-gateway-adapter.cjs` and mounted directly in `server.cjs`. This gives a single server process, single port, shared secrets.

## Phase Summary

| Phase | Files Changed | Effort |
|-------|--------------|--------|
| 01 Branch + Clone | `.gitignore` | 30m |
| 02 Backend Integration | `server.cjs`, `package.json`, new `crabwalk/scripts/build-gateway-adapter.mjs`, `crabwalk-gateway-adapter.cjs` | 3h |
| 03 Build Pipeline | `crabwalk/app.config.ts`, `vite.config.ts`, `monitor/index.tsx`, `NavTabs.tsx`, `trpc/client.ts`; delete workspace files | 2h |
| 04 Landing Page | `server.cjs` (route change), `NavTabs.tsx` (back-link) | 1h |
| 05 Widget Tile | `js/widgets.js`, `app.html` | 2h |
| 06 Config UI | `app.html` (modal + JS) | 2h |
| 07 Testing + Cleanup | docs, README, git hygiene | 1.5h |

**Total estimate: 12h**

## Critical Path

Phase 02 → Phase 03 → Phase 04 + Phase 05 (parallel) → Phase 06 → Phase 07

## Unresolved Questions

1. **TanStack Start `preset: 'static'` support** — needs verification in Phase 03; fallback is `preset: 'node-server'` and only serving `.output/public/` statically.
2. **`crabwalk-gateway-adapter.cjs` commit strategy** — recommended: commit the built file to avoid esbuild as a runtime dep; needs team sign-off.
3. **ClawdbotClient auth pairing** — does the device identity require a pre-existing paired entry in `~/.openclaw/openclaw.json`? If yes, fresh installs need a pairing step not covered in this plan.
4. **tRPC v11 CJS adapter API** — confirm `@trpc/server/adapters/standalone` and `@trpc/server/adapters/ws` export names before Phase 02 implementation.
