# Phase 06: Config UI in LobsterBoard

## Context Links
- Plan overview: [plan.md](./plan.md)
- Phase 02 (backend integration): [phase-02-backend-integration.md](./phase-02-backend-integration.md)
- Scout report (config/secrets system): [scout-01-lobsterboard-codebase.md](./scout/scout-01-lobsterboard-codebase.md)

## Overview

**Priority:** P1
**Status:** complete
**Description:** Add a Gateway Settings panel to LobsterBoard's editor UI (`app.html`) so users can configure the OpenClaw gateway URL and API token. This replaces CrabWalk's removed `SettingsPanel.tsx`. Config is saved to `secrets.json` via `POST /api/gateway/config` and triggers a live reconnect.

## Key Insights

- LobsterBoard already has a secrets management system (`secrets.json`, `/api/secrets/*`) and a PIN/security modal in `app.html` — the gateway config UI fits naturally alongside it
- The existing Security Settings modal pattern (in `app.html`) is the right model: a button in the header toolbar opens a modal overlay; form submits via `fetch`
- `apiToken` must never be returned from the server in plaintext — the UI uses a password input that shows `••••••••` when a token is already set (same pattern as widget API keys)
- Gateway URL is non-sensitive and can be displayed/edited freely
- The `POST /api/gateway/config` endpoint (Phase 02) returns `{ status: 'ok', connected: bool }` — UI shows a connection indicator after save
- No framework needed — plain HTML form + vanilla JS `fetch`, matching LobsterBoard's existing style

## Requirements

### Functional
- Header toolbar gains a "Gateway" button (gear/plug icon) visible only in edit mode
- Clicking opens a modal with:
  - Gateway URL field (text input, pre-filled from `GET /api/gateway/config`)
  - API Token field (password input, shows `••••••••` if token already set)
  - "Test Connection" button → calls `POST /api/gateway/config` with current values, shows result
  - "Save" button → saves and closes modal
  - "Cancel" button → closes without saving
- Connection status indicator in modal header (green dot = connected, red = disconnected)
- Modal respects existing LobsterBoard dark theme CSS variables

### Non-functional
- No new JS files — all logic inline in `app.html` (consistent with existing modal patterns)
- Modal HTML under 80 lines

## Architecture

```
app.html
├── Header toolbar
│   └── <button id="gateway-settings-btn"> (edit mode only)
├── #gateway-modal (hidden by default)
│   ├── Status indicator (dot)
│   ├── Gateway URL input
│   ├── API Token input (password)
│   └── Save / Test / Cancel buttons
└── <script> block (inline)
    ├── openGatewayModal() — fetch GET /api/gateway/config, populate form
    ├── saveGatewayConfig() — POST /api/gateway/config, show result
    └── testGatewayConnection() — POST then show status without closing
```

### Modal HTML skeleton
```html
<div id="gateway-modal" style="display:none;position:fixed;inset:0;
     z-index:1000;background:rgba(0,0,0,0.7);align-items:center;justify-content:center;">
  <div style="background:var(--bg-secondary);border:1px solid var(--border);
       border-radius:8px;padding:24px;min-width:380px;max-width:480px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <h3 style="color:var(--text-primary);margin:0;">Gateway Settings</h3>
      <span id="gw-status-dot" style="width:10px;height:10px;border-radius:50%;
            background:#8b949e;"></span>
    </div>
    <label style="color:var(--text-secondary);font-size:12px;">Gateway URL</label>
    <input id="gw-url" type="text" placeholder="ws://127.0.0.1:18789"
      style="width:100%;box-sizing:border-box;padding:8px;margin:4px 0 12px;
             background:var(--bg-tertiary);border:1px solid var(--border);
             border-radius:4px;color:var(--text-primary);">
    <label style="color:var(--text-secondary);font-size:12px;">API Token</label>
    <input id="gw-token" type="password" placeholder="Leave blank to keep existing"
      style="width:100%;box-sizing:border-box;padding:8px;margin:4px 0 16px;
             background:var(--bg-tertiary);border:1px solid var(--border);
             border-radius:4px;color:var(--text-primary);">
    <div id="gw-msg" style="font-size:12px;color:var(--text-secondary);
         min-height:18px;margin-bottom:12px;"></div>
    <div style="display:flex;gap:8px;justify-content:flex-end;">
      <button onclick="closeGatewayModal()"
        style="padding:6px 14px;background:var(--bg-tertiary);border:1px solid var(--border);
               color:var(--text-primary);border-radius:4px;cursor:pointer;">Cancel</button>
      <button onclick="testGatewayConnection()"
        style="padding:6px 14px;background:var(--bg-tertiary);border:1px solid var(--border);
               color:var(--accent-blue);border-radius:4px;cursor:pointer;">Test</button>
      <button onclick="saveGatewayConfig()"
        style="padding:6px 14px;background:var(--accent-blue);border:none;
               color:#fff;border-radius:4px;cursor:pointer;">Save</button>
    </div>
  </div>
</div>
```

### JS functions
```js
async function openGatewayModal() {
  const r = await fetch('/api/gateway/config');
  const d = await r.json();
  document.getElementById('gw-url').value = d.url || '';
  document.getElementById('gw-token').value = d.hasToken ? '••••••••' : '';
  document.getElementById('gw-status-dot').style.background =
    d.connected ? '#3fb950' : '#f85149';
  document.getElementById('gw-msg').textContent = '';
  document.getElementById('gateway-modal').style.display = 'flex';
}
function closeGatewayModal() {
  document.getElementById('gateway-modal').style.display = 'none';
}
async function saveGatewayConfig() {
  const url = document.getElementById('gw-url').value.trim();
  const token = document.getElementById('gw-token').value;
  const body = { gatewayUrl: url };
  if (token && token !== '••••••••') body.apiToken = token;
  const r = await fetch('/api/gateway/config', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  const d = await r.json();
  if (d.status === 'ok') closeGatewayModal();
  else document.getElementById('gw-msg').textContent = d.message || 'Error saving';
}
async function testGatewayConnection() {
  document.getElementById('gw-msg').textContent = 'Testing...';
  await saveGatewayConfig();  // save first, then re-fetch status
  const r = await fetch('/api/gateway/config');
  const d = await r.json();
  const dot = document.getElementById('gw-status-dot');
  dot.style.background = d.connected ? '#3fb950' : '#f85149';
  document.getElementById('gw-msg').textContent =
    d.connected ? 'Connected' : 'Not connected — check URL and token';
}
```

## Related Code Files

- Modify: `app.html` — add modal HTML, toolbar button, inline JS functions

## Implementation Steps

1. **Add Gateway button to header toolbar** in `app.html`:
   - Find the edit-mode toolbar (buttons like "Save", "Add Widget", etc.)
   - Add: `<button id="gateway-settings-btn" onclick="openGatewayModal()" title="Gateway Settings">🔌 Gateway</button>`
   - Wrap in same edit-mode visibility guard as other toolbar buttons

2. **Add modal HTML** to `app.html` body (before closing `</body>`):
   - Paste the modal skeleton from Architecture section above

3. **Add JS functions** to `app.html` script block:
   - `openGatewayModal`, `closeGatewayModal`, `saveGatewayConfig`, `testGatewayConnection`

4. **Close modal on backdrop click:**
   ```js
   document.getElementById('gateway-modal').addEventListener('click', (e) => {
     if (e.target === e.currentTarget) closeGatewayModal();
   });
   ```

5. **Test flow:**
   - Open LobsterBoard at `/app` in edit mode
   - Click "Gateway" button → modal opens with current config
   - Enter gateway URL + token → click "Test" → dot turns green/red
   - Click "Save" → modal closes, config persisted

## Todo

- [ ] Add gateway toolbar button to `app.html` (edit mode only)
- [ ] Add `#gateway-modal` HTML to `app.html`
- [ ] Add `openGatewayModal`, `closeGatewayModal`, `saveGatewayConfig`, `testGatewayConnection` JS functions
- [ ] Add backdrop-click-to-close handler
- [ ] Verify `GET /api/gateway/config` populates form correctly
- [ ] Verify `POST /api/gateway/config` with blank token preserves existing token
- [ ] Verify token field never shows actual token value (only `••••••••`)
- [ ] Verify modal hidden in view/public mode

## Success Criteria

- "Gateway" button visible in edit mode toolbar
- Modal opens with current URL pre-filled and token field showing `••••••••` if set
- Save persists to `secrets.json` under `__gateway__` key
- Test button shows live connection status (green/red dot)
- Token value never appears in DOM or network response in plaintext

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Token inadvertently echoed in `GET /api/gateway/config` | Low | Phase 02 spec: only return `hasToken: bool`, never the token value |
| Modal z-index conflict with existing LobsterBoard modals | Low | Use z-index 1000; existing modals use similar values; test visually |
| `app.html` already large; adding modal bloats it further | Low | Modal HTML ~40 lines, JS ~30 lines — acceptable; no modularization needed |

## Security Considerations

- Gateway button must be hidden in public mode (`data-mode` guard)
- `apiToken` stored in `secrets.json`, never returned in API responses
- Modal closes on backdrop click to prevent accidental config exposure when screen-sharing

## Next Steps

- Phase 07: Testing and cleanup
