# Scout Report: LobsterBoard Codebase

Date: 2026-02-21 | Version: 0.2.4

## File Map

```
LobsterBoard/
├── app.html                   # Main SPA entry point
├── config.json                # Live config (canvas + widgets state)
├── config.example.json        # Example config schema
├── pages.json                 # Enable/disable pages + sort order
├── export-server.js           # Export server
├── site-script.js             # Site-level script
├── js/
│   ├── widgets.js             # WIDGETS object — all widget definitions (~42K tokens)
│   ├── builder.js             # Builder logic — drag/drop, render, save/load
│   └── templates.js           # Template gallery logic
├── css/
│   └── builder.css            # All styles; GitHub dark theme CSS vars
├── src/                       # Library source (ESM)
│   ├── index.js               # Public API exports
│   ├── widgets.js             # Widget defs (mirrors js/widgets.js)
│   └── builder.js             # Builder utilities (mirrors js/builder.js)
├── dist/                      # Rollup build outputs
│   ├── lobsterboard.esm.js / .min.js
│   └── lobsterboard.umd.js / .min.js
├── pages/
│   ├── README.md              # Custom page authoring guide
│   └── _shared/nav.js         # Shared nav bar component
├── community-widgets/
│   ├── README.md
│   └── _template/widget.js    # Widget contribution template
└── templates/                 # Dashboard templates
    ├── templates.json
    └── <template-name>/
        ├── config.json
        └── meta.json
```

## 1. Widget System (`js/widgets.js`)

`WIDGETS` is a plain JS object keyed by widget type string:

```js
const WIDGETS = {
  'weather': {
    name: 'Local Weather',
    icon: '🌡️',
    category: 'small' | 'large' | 'bar',
    description: '...',
    defaultWidth: 200,
    defaultHeight: 120,
    hasApiKey: false,
    // apiKeyName: 'MY_API_KEY',  // if hasApiKey true
    properties: { title, location, units, refreshInterval },
    preview: `<static html>`,
    generateHtml: (props) => `<html string>`,
    generateJs:   (props) => `<js string>`,
  },
  // ...40+ widgets
};
```

Shared SSE helpers exposed globally: `window.onSystemStats`, `window._formatBytes`, `window._formatBytesPerSec`, `window._formatUptime`

Widget categories in `app.html` sidebar: Basics, System, Health, OpenClaw, AI/LLM, Productivity, Finance, Entertainment, Content, Layout, Bars

## 2. Builder System (`js/builder.js`)

State object:
```js
const state = {
  canvas: { width: 1920, height: 1080 },
  zoom: 0.5,
  widgets: [],          // array of widget instances
  selectedWidget: null,
  idCounter: 0,
  fontScale: 1,
  editMode: false,
  pinVerified: false,
  hasPin: false,
  publicMode: false
};
```

Key functions:
- `loadConfig()` — `GET /config` → populates state → calls `renderWidget()` for each → `executeWidgetScripts()`
- `saveConfig()` — `POST /config` with `{ canvas, fontScale, widgets }`
- `renderWidget(widget)` — creates `.placed-widget` div, injects `template.generateHtml(props)`, attaches drag/resize events
- `renderWidgetPreview(widget)` — re-renders HTML of existing placed widget
- `executeWidgetScripts()` — runs `template.generateJs(props)` via `new Function(js)()` for each widget; tracks intervals via `window._widgetIntervals`
- `stopWidgetScripts()` — clears all intervals, closes SSE
- `setEditMode(bool)` — toggles `body[data-mode]`, shows/hides panels
- `scaleCanvasToFit()` — CSS transform scale for view mode
- `generateDashboardHtml()` (line 2049), `generateDashboardCss()` (line 2081), `generateDashboardJs()` (line 2771) — static export generation

## 3. Config System

### `config.json` schema:
```json
{
  "canvas": { "width": 1920, "height": 1080 },
  "fontScale": 1.25,
  "widgets": [
    {
      "id": "widget-N",
      "type": "<WIDGETS key>",
      "x": 600, "y": 120,
      "width": 200, "height": 140,
      "properties": { ...widget-specific props }
    }
  ]
}
```

- Loaded via `GET /config`, saved via `POST /config`
- `canvas.height` can be `"auto"` for scrollable mode

## 4. Pages System

### Registration: `pages.json`
```json
{ "pages": { "my-page": { "enabled": true, "order": 50 } } }
```

### Per-page: `pages/<slug>/`
```
page.json     — { id, title, icon, description, order, enabled, nav, standalone }
index.html    — page HTML; use <nav id="page-nav"></nav> + <script src="/pages/_shared/nav.js">
api.cjs       — optional server routes (CommonJS .cjs due to package.json "type":"module")
style.css     — optional extra styles
```

### API convention (`api.cjs`):
```js
module.exports = function(ctx) {
  // ctx.dataDir, ctx.readData(file), ctx.writeData(file, obj)
  return { routes: { 'GET /': (req, res, { query, body, params }) => ({}) } };
};
```

Data stored in `data/<page-id>/`. API routes mounted at `/api/pages/<slug>/`.

## 5. Entry Point (`app.html`)

- Loads `css/builder.css`, `js/widgets.js`, `js/builder.js`, `js/templates.js`
- Widget sidebar: hardcoded `<div class="widget-item" draggable="true" data-widget="<type>">` entries
- Canvas: `<div id="canvas" data-width="1920" data-height="1080">`
- Properties panel: right sidebar with per-widget prop fields (shown/hidden via CSS/JS)
- Modals: Preview, Template Gallery, Export Template, PIN, Security Settings
- On load: `fetch('/api/pages')` populates nav links

## 6. CSS / Styling (`css/builder.css`)

GitHub dark theme CSS variables:
```css
:root {
  --bg-primary: #0d1117;  --bg-secondary: #161b22;  --bg-tertiary: #21262d;
  --border: #30363d;       --text-primary: #e6edf3;  --text-secondary: #8b949e;
  --accent-blue: #58a6ff;  --accent-green: #3fb950;  --accent-red: #f85149;
  --font-scale: 1;
}
```

Font scaling: all widget text uses `calc(Npx * var(--font-scale))`. Widget-level override via `--font-scale` on `.placed-widget` element.

## Key API Routes (server-side)

| Endpoint | Purpose |
|---|---|
| `GET /config` | Load dashboard config |
| `POST /config` | Save dashboard config |
| `GET /api/pages` | List enabled pages |
| `GET /api/stats/stream` | SSE system stats |
| `GET /api/auth/status` | Check PIN/public mode |
| `POST /api/auth/verify-pin` | Verify PIN |
| `POST /api/auth/set-pin` | Set/change PIN |
| `POST /api/auth/remove-pin` | Remove PIN |
| `POST /api/mode` | Toggle public mode |

## Community Widget Format

Same shape as `WIDGETS` entries. Must export default object. On acceptance, maintainer adds key `'community-<name>'` to `js/widgets.js`. Template: `community-widgets/_template/widget.js`.

---

**Unresolved Questions:**
- `server.cjs` — main server (Node.js http, port 7880); handles config R/W, pages auto-discovery, system stats API
- `export-server.js` — minimal export server (for static HTML ZIP export)
- Is there an existing Crabwalk integration endpoint or is it entirely new?
