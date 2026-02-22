# Phase 01: Branch Setup + CrabWalk Clone

## Context Links
- Plan overview: [plan.md](./plan.md)
- Scout report: [scout-01-lobsterboard-codebase.md](./scout/scout-01-lobsterboard-codebase.md)
- CrabWalk repo: https://github.com/luccast/crabwalk

## Overview

**Priority:** P1
**Status:** complete
**Description:** Create the `match-made-in-heaven` branch, clone CrabWalk into `crabwalk/` subdirectory, and verify both projects can build independently.

## Key Insights

- LobsterBoard is `"type": "module"` in package.json but `server.cjs` uses CommonJS — no conflicts expected
- CrabWalk uses `pnpm` as package manager (pnpm-workspace.yaml present); must install with pnpm
- CrabWalk v1.0.11 uses TanStack Start + Nitro — the Nitro/SSR layer is only for CrabWalk's own dev server; the built output (Vite SPA bundle + server bundle) is what we care about
- The `crabwalk/` directory should NOT be nested inside any existing LobsterBoard subdirectory that gets served

## Requirements

- Git branch `match-made-in-heaven` created from `main`
- CrabWalk repo cloned at `/home/dgx/Desktop/LobsterBoard/crabwalk/`
- CrabWalk deps installed (`pnpm install` inside `crabwalk/`)
- Verify `pnpm build` runs in `crabwalk/` without error
- Verify LobsterBoard still starts (`node server.cjs`) after clone

## Architecture

```
LobsterBoard/
├── crabwalk/              ← cloned here (not a git submodule — simpler)
│   ├── src/
│   ├── .output/           ← TanStack Start/Nitro build output
│   │   └── public/        ← static assets to be served by LobsterBoard
│   ├── package.json
│   └── vite.config.ts
├── server.cjs
└── app.html
```

Note: `.output/` is the Nitro build output dir. The static client bundle is at `.output/public/`. This is what `server.cjs` will serve under `/crabwalk/*` in Phase 3.

## Related Code Files

- Create: none (clone only)
- Modify: `.gitignore` — add `crabwalk/node_modules`, `crabwalk/.output`

## Implementation Steps

1. Create and switch to branch:
   ```bash
   git checkout -b match-made-in-heaven
   ```

2. Clone CrabWalk (shallow, no submodule — simpler for monorepo-style):
   ```bash
   git clone --depth 1 https://github.com/luccast/crabwalk crabwalk
   rm -rf crabwalk/.git   # detach from upstream git history; LobsterBoard repo owns it
   ```

3. Install CrabWalk deps:
   ```bash
   cd crabwalk && pnpm install
   ```

4. Run a test build to confirm output structure:
   ```bash
   cd crabwalk && pnpm build
   ls .output/public/
   ```

5. Update LobsterBoard `.gitignore`:
   ```
   crabwalk/node_modules/
   crabwalk/.output/
   crabwalk/.vinxi/
   ```

6. Verify LobsterBoard server still starts:
   ```bash
   node server.cjs &
   curl -s http://127.0.0.1:7880/config
   kill %1
   ```

## Todo

- [ ] Create branch `match-made-in-heaven`
- [ ] Clone CrabWalk into `crabwalk/` and remove `.git`
- [ ] Install CrabWalk deps with pnpm
- [ ] Confirm `pnpm build` succeeds and `.output/public/` exists
- [ ] Update `.gitignore`
- [ ] Verify LobsterBoard server unaffected

## Success Criteria

- Branch exists and is checked out
- `crabwalk/.output/public/` contains built static assets after `pnpm build`
- `node server.cjs` still starts cleanly, serves `app.html` at `/`

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| pnpm not installed on host | Low | Document: `npm i -g pnpm` fallback |
| CrabWalk build fails (peer dep issues) | Medium | Pin to v1.0.11 tag; check node version >=20 |
| Nitro output dir differs from `.output/` | Low | Verify after build; check `vite.config.ts` for `output` setting |

## Security Considerations

- Remove `.git` from crabwalk clone to prevent accidental upstream pushes
- `.gitignore` must exclude `crabwalk/.output/` to keep build artifacts out of LobsterBoard repo

## Next Steps

- Phase 02: Backend integration — migrate CrabWalk's tRPC/gateway logic into `server.cjs`
