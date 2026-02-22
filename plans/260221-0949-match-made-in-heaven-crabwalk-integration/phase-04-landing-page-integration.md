# Phase 04: CrabWalk Route Mounting + Nav Link
<!-- Updated: Validation Session 1 - Routing changed: `/` stays as editor, CrabWalk at `/crabwalk/*` -->

## Context Links
- Plan overview: [plan.md](./plan.md)
- Phase 03 (build pipeline): [phase-03-crabwalk-build-pipeline.md](./phase-03-crabwalk-build-pipeline.md)
- Scout report: [scout-01-lobsterboard-codebase.md](./scout/scout-01-lobsterboard-codebase.md)

## Overview

**Priority:** P2
**Status:** complete
**Description:** Keep `/` serving `app.html` (LobsterBoard editor) unchanged. CrabWalk is served at `/crabwalk/*` (handled in Phase 03). This phase adds a nav link in LobsterBoard pointing to CrabWalk, and a back-link in CrabWalk pointing to `/`. No redirect, no route swap.

## Key Insights

- **Validation decision:** `/` stays as LobsterBoard editor. No redirect needed.
- `server.cjs` already serves `app.html` at `/` — no change required
- CrabWalk static serving at `/crabwalk/*` is handled in Phase 03
- Need: a "CrabWalk Monitor" link in LobsterBoard's UI (e.g. header toolbar or sidebar)
- Need: a "Back to Dashboard" link in CrabWalk's nav pointing to `/`
- Phase 03 already modifies `NavTabs.tsx` — the back-link can be added there

## Requirements

- `GET /` serves `app.html` (unchanged)
- `GET /crabwalk/monitor` serves CrabWalk (handled by Phase 03)
- LobsterBoard has a visible link/button to open CrabWalk
- CrabWalk has a back-link to LobsterBoard editor

## Architecture

```
Route table (server.cjs):
  GET /          → app.html (UNCHANGED)
  GET /crabwalk/* → CrabWalk static assets (Phase 03)
  GET /trpc/*    → tRPC handler (Phase 02)
  GET /css/*, /js/*, /dist/* → LobsterBoard static assets (unchanged)
```

### Nav link in LobsterBoard

In `app.html` header toolbar, add a link:
```html
<a href="/crabwalk/monitor" id="crabwalk-link" title="Open CrabWalk Monitor"
   style="color:var(--text-secondary);text-decoration:none;display:flex;align-items:center;gap:4px;">
  🦀 Monitor
</a>
```

### Back-link in CrabWalk

In `crabwalk/src/components/navigation/NavTabs.tsx`:
```tsx
<a href="/" className="nav-back-link">Dashboard</a>
```

## Related Code Files

- Modify: `app.html` — add CrabWalk nav link in header
- Modify: `crabwalk/src/components/navigation/NavTabs.tsx` — add `/` back-link

## Implementation Steps

1. **Add CrabWalk link to LobsterBoard header** in `app.html`:
   - Find the header toolbar area
   - Add a styled `<a href="/crabwalk/monitor">` link with 🦀 icon
   - Visible in both edit and view modes

2. **Add back-link to CrabWalk nav** in `NavTabs.tsx`:
   - Add `<a href="/">Dashboard</a>` as the last nav item

3. **Rebuild CrabWalk** after NavTabs change:
   ```bash
   cd crabwalk && pnpm build
   ```

4. **Test:**
   ```bash
   node server.cjs &
   curl -I http://127.0.0.1:7880/          # expect: 200 text/html (app.html)
   curl -I http://127.0.0.1:7880/crabwalk/monitor  # expect: 200 text/html
   ```

## Todo

- [ ] Add CrabWalk link in `app.html` header toolbar
- [ ] Add "Dashboard" back-link in `crabwalk/src/components/navigation/NavTabs.tsx`
- [ ] Rebuild CrabWalk after nav change
- [ ] Verify both links work in browser

## Success Criteria

- `http://localhost:7880/` shows LobsterBoard editor (unchanged behavior)
- LobsterBoard header has a clickable "🦀 Monitor" link → opens CrabWalk
- CrabWalk nav has "Dashboard" link → returns to LobsterBoard editor
- All existing LobsterBoard functionality unaffected

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| CrabWalk TanStack Start router doesn't recognise `/crabwalk/monitor` with base path | Medium | Configure `createRouter({ basepath: '/crabwalk' })` in CrabWalk root; verify in Phase 03 |

## Security Considerations

- Nav links are plain HTML anchors; no security concern
- CrabWalk still respects same-origin; no cross-origin issues

## Next Steps

- Phase 05: CrabWalk widget tile on the LobsterBoard dashboard
