# LobsterBoard - Codebase Summary

## Project Statistics

- **Primary Language:** JavaScript (Node.js + Browser)
- **Total Lines (server.cjs):** ~1,800
- **Core Files:** 5 (server, builder, widgets, templates, HTML)
- **Integration:** CrabWalk (OpenClaw agent monitor)
- **Version:** 0.2.5
- **License:** BSL-1.1 (Business Source License)

## File Inventory

### Core Server (server.cjs)

**Size:** 1,800 lines | **Type:** CommonJS HTTP Server

**Sections:**
1. **Imports & Constants** (lines 1-16)
   - http, fs, path, os modules
   - systeminformation for system stats
   - PORT/HOST configuration

2. **CrabWalk Gateway Loading** (lines 18-27)
   - Optional: Load `crabwalk-gateway-adapter.cjs`
   - Graceful fallback if not found

3. **Pages System** (lines 29-193)
   - `loadPages()` - Auto-discover and load custom pages
   - `compileRoute()` - Convert route patterns to regex
   - `matchPageRoute()` - Route request matching logic
   - ~165 lines of sophisticated route compilation

4. **System Stats Collection** (lines 195-298)
   - `cachedStats` object
   - `broadcastStats()` - Send to SSE clients
   - Tiered collection intervals:
     - CPU + Network: 2s
     - Memory: 5s
     - Disk: 30s
     - Docker: 5s
     - Uptime: 60s

5. **MIME Types & Helpers** (lines 300-422)
   - `MIME_TYPES` - Content-type mapping
   - `readJsonFile()`, `writeJsonFile()`
   - `getAuth()`, `getSecrets()`
   - `maskConfig()`, `extractSecrets()`
   - Security helpers: `hashPin()`, `isSensitiveKey()`

6. **iCal Parser** (lines 423-495)
   - `parseIcal()` - Parse .ics format
   - Timezone handling (Windows + iCal names to UTC)
   - Event filtering (future only)
   - ~70 lines of RFC 5545 parsing

7. **Main Request Handler** (lines 497-1769)
   - HTTP server request processing
   - ~1,270 lines of route handlers:

   **Config Routes:**
   - GET /config - Load dashboard
   - POST /config - Save dashboard

   **API Routes:**
   - GET /api/stats/stream - SSE system stats
   - GET /api/stats - Snapshot stats
   - GET /api/pages - List custom pages
   - POST /api/pages/{id}/* - Custom page API
   - GET /api/templates - List templates
   - POST /api/templates/import - Import template
   - POST /api/templates/export - Export dashboard
   - DELETE /api/templates/{id} - Delete template

   **Proxy Routes:**
   - GET /api/rss?url= - RSS feed proxy (SSRF-protected)
   - GET /api/calendar?url= - iCal proxy (SSRF-protected)
   - GET /api/usage/claude - Anthropic usage API
   - GET /api/usage/openai - OpenAI usage API

   **Auth Routes:**
   - GET /api/auth/status - Check PIN status
   - POST /api/auth/set-pin - Set PIN
   - POST /api/auth/verify-pin - Verify PIN
   - POST /api/auth/remove-pin - Remove PIN
   - GET /api/mode - Check public mode
   - POST /api/mode - Toggle public mode

   **Gateway Routes:**
   - GET /api/gateway/config - Gateway status
   - POST /api/gateway/config - Update gateway config
   - GET /api/trpc/* - tRPC proxy

   **Data Routes:**
   - GET /api/todos - Todo list
   - POST /api/todos - Save todos
   - GET /api/notes - Notes
   - POST /api/notes - Save notes
   - GET /api/cron - Cron jobs from OpenClaw
   - GET /api/system-log - Structured logs
   - GET /api/auth - OpenClaw auth status
   - GET /api/releases - OpenClaw version check
   - GET /api/lb-release - LobsterBoard version check
   - GET /api/today - Today's activity
   - GET /api/activity - Activity timeline

   **Static Routes:**
   - GET /pages/{id}/* - Custom page static files
   - GET /crabwalk/* - CrabWalk SPA serving
   - GET /* - Dashboard + assets

8. **Helper Functions** (lines 1771-1795)
   - `latestImageHandler()` - Newest image from directory
   - Graceful shutdown handlers

### Client-Side Files

#### app.html (Entry Point)
**Size:** ~200 lines | **Type:** HTML5

**Structure:**
- `<!DOCTYPE html>` modern HTML5
- Meta tags (charset, viewport)
- Link to builder.css (dark theme)
- Scripts: builder.js, widgets.js, templates.js
- `<div id="app">` mount point
- Canvas, sidebar, property panel

**Key Elements:**
- `#canvas` - Main dashboard area
- `#sidebar` - Widget palette
- `#properties` - Widget config panel
- `#toolbar` - Save, view mode, template buttons

#### builder.js (Editor UI)
**Size:** ~400 lines | **Type:** JavaScript Module

**Responsibilities:**
- Drag-and-drop widget placement
- Zoom + pan controls
- Property panel updates
- Canvas grid (20px snap)
- Config save/load via /config endpoint
- Secret masking in UI

**Key Functions:**
- `startEdit()` / `endEdit()` - Toggle edit mode
- `dragStart()`, `dragEnd()`, `updatePosition()` - Drag handling
- `updateProperty()` - Property panel changes
- `saveConfig()` / `loadConfig()` - Persistence
- `renderCanvas()` - Redraw all widgets

#### widgets.js (Widget Registry)
**Size:** ~500 lines | **Type:** JavaScript Module

**Widget Categories:**
1. **System Monitoring** (6 widgets)
   - CPU, Memory, Disk, Network, Docker, Uptime

2. **Weather** (2 widgets)
   - Local Weather, World Weather

3. **Time & Productivity** (6 widgets)
   - Clock, World Clock, Countdown, Todo, Pomodoro, Notes

4. **Media & Content** (5 widgets)
   - RSS Ticker, Calendar, Now Playing, Quote, Quick Links

5. **AI/LLM** (5 widgets)
   - Claude Usage, OpenAI Usage, AI Cost Tracker, Token Gauge, Active Sessions

6. **Finance** (2 widgets)
   - Stock Ticker, Crypto Price

7. **Smart Home** (3 widgets)
   - Indoor Climate, Camera Feed, Power Usage

8. **Embeds & Media** (4 widgets)
   - Image, Random Image, Web Image, Latest Image, Iframe

9. **Utility** (8 widgets)
   - Auth Status, Sleep Score, GitHub Stats, Unread Emails, System Log, Activity List, Cron Jobs, Release Checkers

10. **Layout** (4 widgets)
    - Header, Text, Horizontal Line, Vertical Line, Pages Menu

**Widget Structure:**
```javascript
{
  type: string,              // Unique ID
  category: string,          // For grouping
  title: string,             // Display name
  properties: {},            // Config schema
  size: {width, height},     // Default dimensions
  render: (widget) => DOM,   // Create element
  update: (widget) => void   // Fetch data + update
}
```

**Key Functions:**
- `getWidgetDefinition(type)` - Lookup widget
- `renderWidget(widget)` - Create DOM
- `updateWidget(widget)` - Refresh data
- `getDefaultProperties(type)` - Initial config

#### templates.js (Template System)
**Size:** ~300 lines | **Type:** JavaScript Module

**Responsibilities:**
- Load template gallery from /api/templates
- Display preview images
- Import with merge/replace mode
- Export current dashboard with screenshot
- Template metadata management

**Key Functions:**
- `loadTemplateGallery()` - Fetch /api/templates
- `showImportDialog(template)` - Import UI
- `exportDashboard()` - Export current config
- `captureScreenshot()` - Canvas to PNG
- `stripSensitiveData(config)` - Security

#### builder.css (Dark Theme)
**Size:** ~200 lines | **Type:** CSS

**Theme:**
- Background: #1a1a1a (dark)
- Text: #f0f0f0 (light)
- Accent: #0066ff (blue)
- Borders: #333 (dark gray)

**Components:**
- Canvas styling
- Widget containers
- Drag handles
- Property panel
- Modal dialogs
- Toolbar buttons

### CrabWalk Integration Files

#### crabwalk-gateway-adapter.cjs (Generated)
**Size:** ~517 KB | **Type:** CommonJS Bundle

**Purpose:** Bundle CrabWalk's tRPC server-side logic

**Source:** Generated by `npm run build:adapter`
```bash
node crabwalk/scripts/build-gateway-adapter.mjs
```

**Exports:**
```javascript
{
  handleTrpc(req, res),           // Route tRPC calls
  getGatewayStatus(),             // Return {url, connected, authState}
  reconnectGateway(config),       // Update gateway connection
}
```

**Configuration:**
```javascript
{
  gatewayUrl: "ws://127.0.0.1:18789",  // WebSocket endpoint
  apiToken: "token-value"               // Auth token
}
```

#### crabwalk/ (CrabWalk Application)
**Type:** Nuxt 3 + TypeScript Application

**Directory Structure:**
```
crabwalk/
├── src/
│   ├── app.vue              # Main app component
│   ├── pages/               # Page routes
│   ├── components/          # Vue components
│   ├── composables/         # Vue composables
│   └── server/              # Server middleware
├── public/                  # Static assets
├── scripts/
│   ├── build-gateway-adapter.mjs
│   └── generate-spa-html.mjs
├── .output/public/          # Built SPA output
├── package.json
├── vite.config.ts
└── nuxt.config.ts
```

**Build Output:**
- Location: `crabwalk/.output/public/`
- Served at: `/crabwalk/`
- SPA fallback: Unknown routes → index.html

**Build Command:**
```bash
npm run build:crabwalk
# 1. cd crabwalk && pnpm build
# 2. node scripts/generate-spa-html.mjs
```

### Custom Pages System

#### pages/ Directory
**Auto-discovered** on server startup

**Page Structure:**
```
pages/example-page/
├── page.json        # Metadata
├── index.html       # UI template
└── api.cjs          # API routes (optional)
```

**page.json Schema:**
```json
{
  "id": "page-id",
  "title": "Page Title",
  "icon": "📝",
  "description": "Description",
  "enabled": true,
  "order": 1,
  "nav": true
}
```

**api.cjs Handler:**
```javascript
module.exports = (ctx) => ({
  routes: {
    'GET /': (req, res, {query, params, body}) => {
      return { status: 'ok' };
    }
  }
});
```

**Context API:**
```javascript
ctx = {
  dataDir: string,              // Page data directory
  readData(filename): Object,   // Read JSON
  writeData(filename, obj): void // Write JSON
}
```

#### pages/_shared/
**Shared resources for all pages**

**Files:**
- `nav.js` - Navigation component (included in custom pages)
- Shared CSS (optional)

### Templates System

#### templates/ Directory
**User dashboard templates**

**Structure:**
```
templates/
├── templates.json        # Index
└── template-id/
    ├── meta.json        # Metadata
    ├── config.json      # Dashboard config
    └── preview.png      # Screenshot
```

**meta.json Schema:**
```json
{
  "id": "template-id",
  "name": "Template Name",
  "description": "Description",
  "author": "Author Name",
  "tags": ["tag1", "tag2"],
  "canvasSize": "1920x1080",
  "widgetCount": 5,
  "widgetTypes": ["type1", "type2"],
  "preview": "preview.png"
}
```

**Config Export:**
```json
{
  "canvas": {width: 1920, height: 1080},
  "widgets": [
    {
      "id": "widget-1",
      "type": "widget-type",
      "x": 0, "y": 0,
      "width": 400, "height": 200,
      "properties": {...}
    }
  ]
}
```

### Data Files

#### config.json (User Dashboard)
**Generated on first save**

```json
{
  "canvas": {"width": 1920, "height": 1080},
  "widgets": [...]
}
```

**Not tracked in git** (user-specific)

#### secrets.json (Sensitive Values)
**Generated from extractSecrets()**

```json
{
  "widget-id": {
    "apiKey": "actual-key",
    "token": "token-value"
  },
  "__gateway__": {
    "gatewayUrl": "ws://127.0.0.1:18789",
    "apiToken": "gateway-token"
  }
}
```

**DO NOT commit** - Add to .gitignore

#### auth.json (Authentication)
**Generated on PIN setup**

```json
{
  "pinHash": "sha256-hex-string",
  "publicMode": false
}
```

**DO NOT commit** - Add to .gitignore

#### data/ (Custom Page Storage)
**Per-page data directories**

```
data/
└── page-id/
    ├── items.json
    ├── settings.json
    └── other-data.json
```

### Build System

#### package.json Scripts
```json
{
  "build": "rollup -c",
  "build:watch": "rollup -c -w",
  "build:adapter": "node crabwalk/scripts/build-gateway-adapter.mjs",
  "build:crabwalk": "cd crabwalk && pnpm build && node scripts/generate-spa-html.mjs",
  "build:all": "npm run build:adapter && npm run build:crabwalk"
}
```

**Build Outputs:**
- `dist/` - Rollup output (ESM + UMD)
- `crabwalk-gateway-adapter.cjs` - Gateway bundle
- `crabwalk/.output/public/` - CrabWalk SPA

#### rollup.config.js
**Builds ESM + UMD distributions**

- Input: src files
- Output: dist/
- Minification with @rollup/plugin-terser

#### crabwalk Build Scripts
**build-gateway-adapter.mjs**
- Bundle CrabWalk server code
- Output: crabwalk-gateway-adapter.cjs
- Size: ~517 KB

**generate-spa-html.mjs**
- Generate pre-rendered index.html
- Include Nitro preload hints
- Output: .output/public/index.html

## Dependencies

### Runtime (package.json)
```json
{
  "systeminformation": "^5.30.7",  // System stats collection
  "ws": "^8.19.0"                  // WebSocket support
}
```

**Total:** 2 dependencies (minimal)

### Dev Dependencies
```json
{
  "@rollup/plugin-terser": "^0.4.4",
  "esbuild": "^0.27.3",
  "rollup": "^4.9.6",
  "rollup-plugin-copy": "^3.5.0"
}
```

### CrabWalk Dependencies (crabwalk/package.json)
- Nuxt 3
- Vue 3
- Vite
- TypeScript
- Nitro (server framework)

## Architecture Patterns

### Request Flow
```
Browser
  ↓ (HTTP/WebSocket)
server.cjs (request handler)
  ├─ Route matching (pathname, method)
  ├─ Security checks (PIN, public mode)
  ├─ Process (load file, proxy, compute)
  └─ Response (JSON, HTML, SSE)
  ↓
Browser (update DOM)
```

### Data Flow
```
Edit Dashboard (browser)
  ↓
Save: POST /config
  ↓
Extract secrets
  ↓
Write config.json + secrets.json
  ↓
Load: GET /config
  ↓
Mask secrets
  ↓
Send to browser
```

### Widget Update Flow
```
Widget render() called
  ↓
fetch(/api/endpoint)
  ↓
Server collects data
  ↓
Returns JSON
  ↓
Widget.update() receives data
  ↓
Update DOM
```

## Security Architecture

### Secrets Handling
```
Browser Input: apiKey = "sk-123"
  ↓
POST /config
  ↓
extractSecrets()
  ├─ secrets.json: {widgetId: {apiKey: "sk-123"}}
  └─ config.json: {apiKey: "__SECRET__"}
  ↓
GET /config
  ↓
maskConfig()
  ├─ "__SECRET__" → "••••••••"
  └─ Return masked config
  ↓
Browser: Show "••••••••" in property field
```

### PIN Protection
```
Set PIN: "1234"
  ↓
SHA256 hash
  ↓
auth.json: {pinHash: "sha256-hex"}
  ↓
Edit dashboard (if PIN set)
  ↓
Verify PIN
  ↓
Compare hash
  ↓
Grant/deny access
```

### SSRF Protection
```
RSS proxy request: /api/rss?url=http://private.local
  ↓
Parse URL
  ↓
Check hostname
  ├─ 127.* → BLOCKED
  ├─ 10.* → BLOCKED
  ├─ 192.168.* → BLOCKED
  ├─ localhost → BLOCKED
  └─ example.com → ALLOWED
  ↓
Fetch with timeout (15s)
  ↓
Return to client
```

## Performance Characteristics

### Memory Usage
- Idle: ~200 MB (with node_modules)
- Per SSE client: +5 MB
- Per concurrent request: +2 MB

### Response Times
- GET /config: ~10 ms
- POST /config (save): ~50 ms
- GET /api/stats/stream (SSE): streaming
- GET /api/stats (snapshot): ~2 ms
- GET /api/templates: ~20 ms
- GET /crabwalk/*: ~50 ms (first load)

### Update Intervals
- CPU/Network: 2s
- Memory: 5s
- Disk: 30s
- Docker: 5s
- Calendar cache: 5 min
- Release cache: 1 hour

## File Size Summary

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| server.cjs | 50 KB | 1,800 | Main HTTP server |
| crabwalk-gateway-adapter.cjs | 517 KB | N/A | Generated gateway bundle |
| builder.js | 25 KB | 400 | Dashboard editor |
| widgets.js | 30 KB | 500 | Widget definitions |
| templates.js | 15 KB | 300 | Template system |
| builder.css | 8 KB | 200 | Dark theme styles |
| app.html | 5 KB | 200 | HTML entry point |

**Total production:** ~650 KB (uncompressed, before gzip)

## External Integrations

### OpenClaw Gateway
- WebSocket connection (configured in secrets.json)
- tRPC protocol
- Agent monitoring
- Cron job tracking

### Third-party APIs
- Anthropic: Claude usage tracking (/api/usage/claude)
- OpenAI: API usage (/api/usage/openai)
- GitHub: Repository stats (via widget)
- RSS/Atom feeds: News aggregation
- iCal feeds: Calendar integration
- Weather APIs: Local/world weather
- Stock/Crypto APIs: Market data

### System APIs
- systeminformation: System stats collection
- fs/path: File operations
- os: Hostname, homedir
- child_process: exec for git history

## Code Quality Metrics

### Maintainability
- **Single file server:** 1,800 lines (could split into modules)
- **Clear separation:** Client (builder.js) vs Server (server.cjs)
- **Naming:** Consistent conventions (sendJson, isSensitiveKey)
- **Comments:** Adequate (especially security-critical code)

### Security
- SSRF protection: ✓ (URL validation, IP blocking)
- Secret handling: ✓ (extraction, masking)
- Path traversal: ✓ (path.resolve validation)
- Input validation: ✓ (JSON parsing, size limits)
- Error handling: ✓ (try-catch, error messages)

### Performance
- Tiered collection: ✓ (prevents data collection bottlenecks)
- Caching: ✓ (5 min calendar, 1 hour releases)
- Async guards: ✓ (prevent overlapping calls)
- Size limits: ✓ (1 MB config, 15s timeouts)

### Testing
- Unit tests: ✗ (not implemented)
- Integration tests: ✗ (not implemented)
- Manual testing: ✓ (documented in README)

## Future Refactoring Opportunities

1. **Extract routes into modules**
   - Split server.cjs by concern (config, stats, pages, auth, etc.)
   - Each module: routes + handlers
   - Reduces main file to ~500 lines

2. **Widget library**
   - Move widget definitions to separate files
   - One file per widget category
   - Makes it easier to add/maintain widgets

3. **Dedicated test suite**
   - Unit: Route compilation, secret extraction
   - Integration: Full request/response cycles
   - E2E: Dashboard workflows

4. **Database migration**
   - Move from JSON files to SQLite
   - Better concurrency support
   - Query capabilities

5. **TypeScript conversion**
   - Add type safety
   - Better IDE support
   - Fewer runtime errors
