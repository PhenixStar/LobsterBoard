# Phase 05: Widget Tile Integration

## Context Links
- Plan overview: [plan.md](./plan.md)
- Phase 03 (build pipeline): [phase-03-crabwalk-build-pipeline.md](./phase-03-crabwalk-build-pipeline.md)
- Scout report (widget system): [scout-01-lobsterboard-codebase.md](./scout/scout-01-lobsterboard-codebase.md)

## Overview

**Priority:** P1
**Status:** complete
**Description:** Add a `crabwalk-monitor` widget to LobsterBoard's `js/widgets.js`. Small tile shows a status badge and "Open" button; clicking opens CrabWalk full-screen in an overlay (not a new tab). Large tile embeds CrabWalk in an iframe directly on the canvas.

## Key Insights

- Widget pattern: `generateHtml(props)` returns an HTML string; `generateJs(props)` returns a JS string executed via `new Function(js)()`
- iframe is the correct embed mechanism — CrabWalk is React+Vite, not vanilla JS. No conversion needed.
- Two size modes driven by a `displayMode` property (`'button'` | `'embed'`):
  - `'button'` (small tile, ~200×120): shows connection status dot + "Open CrabWalk" button → clicks open a fullscreen overlay `<div>` with an iframe
  - `'embed'` (large tile, ~800×600+): renders iframe directly in the placed widget div, sized to fill the tile
- The fullscreen overlay is appended to `document.body` with `position:fixed; inset:0; z-index:9999` containing the iframe + a close button
- Connection status (connected/disconnected) shown in the button tile via polling `GET /api/gateway/config` every 10s
- Widget properties: `displayMode`, `title` (label shown on tile)
- Category: `'OpenClaw'` — already exists in sidebar
- Widget key: `'crabwalk-monitor'`

## Requirements

- Widget entry in `js/widgets.js` with key `'crabwalk-monitor'`
- `generateHtml(props)` produces correct HTML for both display modes
- `generateJs(props)` handles: button-mode overlay open/close, embed-mode iframe src, status polling (button mode only)
- Widget respects LobsterBoard's font-scale CSS variable
- Sidebar entry added to `app.html` under "OpenClaw" category
- `defaultWidth`/`defaultHeight` sensible for both modes
- Properties panel fields: `displayMode` (select), `title` (text)

## Architecture

### Button mode HTML
```html
<div class="crabwalk-tile" style="display:flex;flex-direction:column;align-items:center;
     justify-content:center;gap:8px;height:100%;cursor:pointer;">
  <div style="display:flex;align-items:center;gap:6px;">
    <span id="cw-status-{id}" style="width:8px;height:8px;border-radius:50%;
          background:#8b949e;display:inline-block;"></span>
    <span style="font-size:calc(13px * var(--font-scale));color:var(--text-primary);">
      {title}
    </span>
  </div>
  <button id="cw-open-{id}" style="padding:6px 16px;background:var(--accent-blue);
          color:#fff;border:none;border-radius:6px;cursor:pointer;
          font-size:calc(12px * var(--font-scale));">
    Open Monitor
  </button>
</div>
```

### Embed mode HTML
```html
<iframe src="/crabwalk/monitor" id="cw-frame-{id}"
  style="width:100%;height:100%;border:none;border-radius:4px;"
  allow="fullscreen">
</iframe>
```

### Button mode JS (overlay + status polling)
```js
// Open overlay
const btn = document.getElementById('cw-open-{id}');
btn.addEventListener('click', () => {
  if (document.getElementById('cw-overlay-{id}')) return;
  const overlay = document.createElement('div');
  overlay.id = 'cw-overlay-{id}';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#000;display:flex;flex-direction:column;';
  overlay.innerHTML = `
    <div style="display:flex;justify-content:flex-end;padding:8px;background:#161b22;">
      <button onclick="document.getElementById('cw-overlay-{id}').remove()"
        style="background:none;border:1px solid #30363d;color:#e6edf3;
               padding:4px 12px;border-radius:4px;cursor:pointer;">
        Close
      </button>
    </div>
    <iframe src="/crabwalk/monitor" style="flex:1;border:none;" allow="fullscreen"></iframe>
  `;
  document.body.appendChild(overlay);
});

// Status polling
const statusEl = document.getElementById('cw-status-{id}');
const pollStatus = async () => {
  try {
    const r = await fetch('/api/gateway/config');
    const d = await r.json();
    statusEl.style.background = d.connected ? '#3fb950' : '#f85149';
  } catch (_) { statusEl.style.background = '#8b949e'; }
};
pollStatus();
const _cwInterval = setInterval(pollStatus, 10000);
if (!window._widgetIntervals) window._widgetIntervals = [];
window._widgetIntervals.push(_cwInterval);
```

## Related Code Files

- Modify: `js/widgets.js` — add `'crabwalk-monitor'` entry
- Modify: `app.html` — add sidebar widget item under OpenClaw category

## Implementation Steps

1. **Add widget entry to `js/widgets.js`** — find the end of the `WIDGETS` object (before closing `}`):
   ```js
   'crabwalk-monitor': {
     name: 'CrabWalk Monitor',
     icon: '🦀',
     category: 'large',
     description: 'Real-time OpenClaw agent monitor. Small tile = status button with fullscreen overlay. Large tile = embedded live view.',
     defaultWidth: 220,
     defaultHeight: 130,
     properties: {
       title: 'CrabWalk',
       displayMode: 'button',  // 'button' | 'embed'
     },
     preview: `<div style="display:flex;align-items:center;justify-content:center;height:100%;
                gap:8px;color:#58a6ff;font-size:13px;">🦀 CrabWalk Monitor</div>`,
     generateHtml: (props) => { /* button or embed HTML — see Architecture */ },
     generateJs:   (props) => { /* button JS with overlay + polling, or empty for embed */ },
   },
   ```

2. **Use widget `id`** — `generateHtml`/`generateJs` receive `props` which includes `props.id` (the widget instance id). Use it for unique element IDs to avoid collisions when multiple widgets are on canvas.
   - Note: LobsterBoard passes the widget object as `props`; `props.id` is the widget instance id string (e.g. `"widget-3"`). Sanitize for use in HTML attribute: `props.id.replace(/[^a-z0-9-]/g, '')`.

3. **Set `defaultWidth`/`defaultHeight` per mode:**
   - Button mode defaults: 220×130
   - Embed mode defaults: 800×550 — the properties panel lets users resize anyway

4. **Add sidebar entry in `app.html`** — find the OpenClaw category `<div class="widget-category">` section and add:
   ```html
   <div class="widget-item" draggable="true" data-widget="crabwalk-monitor"
        title="CrabWalk Monitor">
     <span class="widget-icon">🦀</span>
     <span class="widget-name">CrabWalk</span>
   </div>
   ```

5. **Add `displayMode` property field to properties panel** in `app.html` — find the properties panel section and add a `<select>` for `displayMode` (similar to other select props in existing widgets).

6. **Test in browser:**
   - Drag widget onto canvas in button mode → see status dot + Open button
   - Click "Open Monitor" → fullscreen overlay with CrabWalk iframe
   - Close overlay → canvas returns to normal
   - Change `displayMode` to embed → iframe fills tile

## Todo

- [ ] Add `'crabwalk-monitor'` entry to `js/widgets.js`
- [ ] Implement `generateHtml(props)` — handle `button` and `embed` modes
- [ ] Implement `generateJs(props)` — overlay logic + status polling for button mode
- [ ] Add sidebar item in `app.html` under OpenClaw category
- [ ] Add `displayMode` select to properties panel in `app.html`
- [ ] Manual test: drag onto canvas, both display modes, overlay open/close
- [ ] Verify `window._widgetIntervals` interval registration (no memory leak)

## Success Criteria

- Widget appears in sidebar under OpenClaw category
- Button mode: tile shows green/red status dot based on `GET /api/gateway/config`
- Button mode: clicking "Open Monitor" shows full-screen overlay with working CrabWalk iframe
- Overlay close button removes overlay from DOM
- Embed mode: iframe fills the widget tile, CrabWalk loads within it
- Widget config saves/loads correctly via `config.json`
- No JS errors in console

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `props.id` not available inside `generateHtml`/`generateJs` | Low | Check existing widgets — `props.id` confirmed in scout report; use it directly |
| iframe cross-origin issues (if LobsterBoard ever runs on different port) | Low | Same-origin: both served from `server.cjs` port 7880 |
| Multiple overlay instances stacking | Low | Guard: `if (document.getElementById('cw-overlay-{id}')) return;` |
| Overlay iframe not cleaning up WS connections on close | Low | iframe teardown on `remove()` closes WS automatically via browser GC |
| `js/widgets.js` exceeds 200 lines (already ~42K tokens) | Known | File already large; adding ~60 lines is acceptable; no refactor needed now |

## Security Considerations

- iframe `src="/crabwalk/monitor"` is same-origin; no `sandbox` restriction needed for full functionality
- Overlay is appended to `document.body` — not a security concern since LobsterBoard is self-hosted
- Status polling only reads `GET /api/gateway/config` which returns no secrets

## Next Steps

- Phase 06: Gateway config UI in LobsterBoard editor
