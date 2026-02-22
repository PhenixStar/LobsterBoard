# LobsterBoard - System Architecture

## System Overview

LobsterBoard is a self-contained Node.js dashboard builder with three layers:

1. **Server Layer** (Node.js HTTP + tRPC gateway + Pages system)
2. **Client Layer** (Browser-based drag-drop editor + 50 widgets)
3. **Data Layer** (JSON files + secrets store + SSE streaming)

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│ Browser (Client Layer)                              │
├─────────────────────────────────────────────────────┤
│  app.html                                           │
│  ├── builder.js (drag-drop editor)                 │
│  ├── widgets.js (50 widget types)                  │
│  └── templates.js (gallery system)                 │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP/WebSocket
┌──────────────────▼──────────────────────────────────┐
│ Server Layer (Node.js)                              │
├─────────────────────────────────────────────────────┤
│ server.cjs (1800 lines)                             │
│ ├── /config              [GET/POST config.json]    │
│ ├── /api/stats/stream    [SSE system monitoring]   │
│ ├── /api/pages           [list custom pages]       │
│ ├── /api/templates/*     [export/import templates] │
│ ├── /api/trpc/*          [CrabWalk tRPC gateway]   │
│ ├── /api/gateway/config  [CrabWalk settings]       │
│ ├── /api/todos           [todo data]               │
│ ├── /api/notes           [notes data]              │
│ ├── /pages/{id}/*        [custom pages]            │
│ ├── /crabwalk/*          [CrabWalk SPA]            │
│ └── /api/auth/*          [PIN auth + secrets]      │
│                                                     │
│ + Gateway Adapter (crabwalk-gateway-adapter.cjs)   │
│   ├── tRPC connection handling                      │
│   ├── OpenClaw gateway bridging                     │
│   └── Agent monitoring                              │
│                                                     │
│ + Pages System                                      │
│   ├── Auto-discovery (pages/)                       │
│   ├── Route compilation (params/query)              │
│   └── API handler loading                           │
│                                                     │
│ + Stats Collector                                   │
│   ├── CPU/Network (2s)                              │
│   ├── Memory (5s)                                   │
│   ├── Disk (30s)                                    │
│   ├── Docker (5s)                                   │
│   └── Broadcast to SSE clients                      │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│ Data Layer                                          │
├─────────────────────────────────────────────────────┤
│ config.json          [dashboard layout + widgets]  │
│ secrets.json         [sensitive API keys]          │
│ auth.json            [PIN hash + mode flags]       │
│ todos.json           [todo list data]              │
│ notes.json           [rich-text notes]             │
│ data/{page-id}/      [custom page data]            │
│ crabwalk/            [CrabWalk app + build output] │
│ templates/           [dashboard templates]        │
│ pages/               [custom page definitions]     │
└─────────────────────────────────────────────────────┘
```

## Server Layer Deep Dive

### Core Request Handlers (server.cjs)

#### 1. Configuration Endpoints
```
GET  /config
POST /config
├── Load: Parse config.json with masking applied
├── Save: Extract secrets, write to config.json + secrets.json
└── Size limit: 1 MB
```

**Security:** Mask sensitive fields (apiKey, token, etc.) on load to prevent exposure. Extract actual values on save.

#### 2. API Endpoints

##### System Stats (Real-time)
```
GET /api/stats/stream          [Server-Sent Events]
GET /api/stats                 [Snapshot JSON]

Collected metrics:
├── CPU: currentLoad + per-core breakdown
├── Memory: total, used, free, active
├── Disk: filesystem, mount, usage
├── Network: interfaces, rx/tx throughput
├── Docker: container list
└── Uptime: system uptime
```

**Collection Strategy:** Tiered intervals with guards against overlapping async calls.
- CPU/Network: 2s (real-time responsiveness)
- Memory: 5s (balances accuracy + overhead)
- Disk: 30s (stable, infrequent changes)
- Docker: 5s (container startup/shutdown)

##### Pages System
```
GET  /api/pages                [List enabled pages]
GET  /pages/{id}               [Serve index.html]
GET  /pages/{id}/{path}        [Static files]
POST /api/pages/{id}/{path}    [API routes from api.cjs]
```

**Auto-discovery process:**
1. Scan `pages/` directory for folders
2. Load `page.json` metadata for each
3. Compile route patterns (e.g., "GET /items/:id")
4. Execute handler with params/query/body context

##### Templates
```
GET  /api/templates            [List all templates]
GET  /api/templates/{id}       [Get template config.json]
GET  /api/templates/{id}/preview [Preview image]
POST /api/templates/import     [Import merge/replace]
POST /api/templates/export     [Export current dashboard]
DELETE /api/templates/{id}     [Delete template]
```

**Export process:**
1. Strip sensitive data (apiKey, private URLs, localhost)
2. Save clean config.json + meta.json
3. Generate templates.json index
4. Accept screenshot upload for preview

##### Authentication & Secrets
```
GET  /api/auth/status         [PIN status + public mode]
POST /api/auth/set-pin        [Create/change PIN]
POST /api/auth/verify-pin     [Verify PIN]
POST /api/auth/remove-pin     [Delete PIN]
POST /api/mode                [Toggle public mode]
POST /api/secrets/{id}        [Update widget secrets]
DELETE /api/secrets/{id}/{key} [Delete secret field]
```

**PIN format:** 4-6 digit numeric code, SHA256 hashed before storage.

**Public mode:** When enabled, blocks POST to /config and template management, allows read-only access.

##### CrabWalk Integration
```
GET  /api/gateway/config      [Get current connection status]
POST /api/gateway/config      [Update gateway URL/token]
GET  /api/trpc/*              [tRPC proxy to gateway adapter]
```

**Gateway config stored in secrets.json:**
```json
{
  "__gateway__": {
    "gatewayUrl": "ws://127.0.0.1:18789",
    "apiToken": "token-value"
  }
}
```

**tRPC routing:** `gatewayAdapter.handleTrpc(req, res)` delegates to CrabWalk adapter.

#### 3. Static Serving

##### Dashboard
```
GET  /              → app.html (main editor)
GET  /app.html      → Dashboard HTML
GET  /css/builder.css
GET  /js/builder.js
GET  /js/widgets.js
GET  /js/templates.js
```

##### CrabWalk SPA
```
GET  /crabwalk/              → index.html (CrabWalk app)
GET  /crabwalk/assets/*      → Static assets
GET  /crabwalk/pages/*       → SPA fallback (index.html)

Location: crabwalk/.output/public/
Built by: npm run build:crabwalk
```

#### 4. Data Proxies (SSRF-Protected)

##### RSS Feed Proxy
```
GET /api/rss?url={feedUrl}&widgetId={id}&secretKey={key}

Security:
├── Validate URL scheme (http/https only)
├── Block private/internal IPs (10.*, 192.168.*, 127.*, localhost)
├── Follow redirects (max 3)
├── 15s timeout
└── 5 MB size limit
```

##### iCal Feed Proxy
```
GET /api/calendar?url={icalUrl}&max={maxEvents}&widgetId={id}&secretKey={key}

Parse & return:
├── Upcoming events only (future dates)
├── Sort by start time
├── Handle timezones (TZID parameter)
├── Cache for 5 minutes
└── Limit to 50 events max
```

**Timezone handling:** Map Windows/iCal timezone names to UTC offsets (e.g., "Eastern Standard Time" → -5).

### Gateway Adapter (crabwalk-gateway-adapter.cjs)

**Size:** ~517 KB (bundled from CrabWalk source)

**Responsibilities:**
1. Bundle CrabWalk's server-side logic
2. Handle tRPC protocol translation
3. Manage WebSocket connection to OpenClaw gateway
4. Expose status via `getGatewayStatus()`
5. Support dynamic reconnection via `reconnectGateway(config)`

**Status fields:**
```javascript
{
  url: string,          // Gateway WebSocket URL
  connected: boolean,   // Current connection state
  authState: string     // 'authenticated' | 'pending' | 'failed' | 'unknown'
}
```

**Build process:**
```bash
npm run build:adapter
# Runs: node crabwalk/scripts/build-gateway-adapter.mjs
# Output: crabwalk-gateway-adapter.cjs (bundled + minified)
```

### Pages System

**Directory structure:**
```
pages/
├── _shared/                   (shared assets)
│   └── nav.js                (navigation component)
├── my-page/
│   ├── page.json             (metadata)
│   ├── index.html            (page UI)
│   └── api.cjs               (API routes)
└── README.md                 (contribution guide)
```

**page.json schema:**
```json
{
  "id": "my-page",            (unique identifier)
  "title": "My Page",
  "icon": "📝",
  "description": "My custom page",
  "order": 1,
  "enabled": true,
  "nav": true                 (show in navigation)
}
```

**api.cjs handler pattern:**
```javascript
module.exports = (ctx) => ({
  routes: {
    'GET /': (req, res, { query, params, body }) => {
      // Return JSON or void (res.json already handled)
      return { message: 'Hello' };
    },
    'POST /items/:id': (req, res, { query, params, body }) => {
      // Access form data via body
      ctx.writeData('items.json', body);
      return { status: 'ok' };
    },
    'GET /items/:id': async (req, res, { params }) => {
      const items = ctx.readData('items.json');
      return items[params.id];
    }
  }
});
```

**Context API:**
```javascript
ctx = {
  dataDir: '/path/to/data/my-page',      // Persistent storage
  readData(filename): Object,            // Read JSON from dataDir
  writeData(filename, data): void        // Write JSON to dataDir
}
```

**Route compilation:**
- Patterns: `"METHOD /path/:param/subpath/*"`
- Regex generation with parameter extraction
- Sorting by specificity (non-wildcard > wildcard, longer > shorter)
- Query string auto-parsing
- Path traversal protection

## Client Layer

### Dashboard Editor (app.html)

**Core modules:**
- **builder.js** - Drag-drop editor, zoom, canvas management
- **widgets.js** - 50 widget type definitions + renderers
- **templates.js** - Template gallery & export UI

**Editor workflow:**
1. Load config.json via GET /config (masked)
2. Render widgets on canvas
3. Ctrl+E to toggle edit mode
4. Drag/resize widgets, edit properties
5. Save to POST /config (extracts secrets)

### Widget System

**Widget definition structure:**
```javascript
{
  type: 'widget-name',
  category: 'System Monitoring',
  title: 'Display Name',
  properties: {
    propertyName: {
      type: 'text' | 'number' | 'url' | 'toggle',
      label: 'Human readable',
      default: 'value',
      placeholder: 'hint'
    }
  },
  render: (widget) => DOM,
  update: (widget) => void,
  size: { width: 400, height: 200 }
}
```

**Widget types (50+):**

| Category | Widgets |
|----------|---------|
| System | CPU, Memory, Disk, Network, Docker, Uptime |
| Weather | Local, World |
| Time | Clock, World Clock, Countdown, Pomodoro |
| Productivity | Todo, Notes |
| Media | RSS, Calendar, Now Playing, Quote |
| AI/LLM | Claude Usage, OpenAI Usage, AI Cost, Token Gauge, Active Sessions |
| Finance | Stock, Crypto |
| Smart Home | Climate, Camera, Power Usage |
| Embeds | Image, Iframe |
| Utility | Auth Status, GitHub Stats, Cron Jobs, Release, System Log |
| Layout | Header, Text, Lines, Pages Menu |

**Data fetching patterns:**
- **SSE polling:** `/api/stats/stream` for system metrics
- **HTTP GET:** `/api/todos`, `/api/notes`, `/api/cron`
- **Proxy endpoints:** `/api/rss?url=`, `/api/calendar?url=`
- **Gateway tRPC:** `/api/trpc/*` for CrabWalk data

## CrabWalk Integration

### Architecture

```
┌──────────────────────────────────┐
│ LobsterBoard Browser              │
├──────────────────────────────────┤
│ CrabWalk Monitor Widget           │
│ └─ GET /api/gateway/config        │
│ └─ POST /api/trpc/...             │
└──────────────┬───────────────────┘
               │
┌──────────────▼───────────────────┐
│ server.cjs                        │
├──────────────────────────────────┤
│ Endpoint: /api/gateway/config    │
│ Endpoint: /api/trpc/*            │
│ ├─ Load crabwalk-gateway-adapter │
│ ├─ Proxy tRPC calls              │
│ ├─ Manage WebSocket to gateway   │
│ └─ Return status JSON            │
└──────────────┬───────────────────┘
               │ WebSocket
┌──────────────▼───────────────────┐
│ OpenClaw Gateway                 │
│ (ws://127.0.0.1:18789)           │
├──────────────────────────────────┤
│ Agent Management                 │
│ Session Tracking                 │
│ Cron Job Execution               │
│ Activity Logging                 │
└──────────────────────────────────┘
```

### Configuration Flow

1. **Initial load:** Check `secrets.json` for `__gateway__` key
2. **On server start:** Call `reconnectGateway()` with saved config
3. **Settings modal:** POST to `/api/gateway/config` with new URL/token
4. **Status check:** GET `/api/gateway/config` returns connection state
5. **Widget updates:** Fetch via `/api/trpc/*` endpoints

### CrabWalk SPA

**Location:** `crabwalk/.output/public/`

**Build process:**
```bash
npm run build:crabwalk
# Steps:
# 1. cd crabwalk && pnpm build
# 2. node scripts/generate-spa-html.mjs
# Output: .output/public/index.html (pre-rendered SPA)
```

**Serving:** Accessible at `/crabwalk/` route, with SPA fallback for sub-routes.

## Security Architecture

### PIN Authentication
```
User enters PIN
     ↓
SHA256 hash
     ↓
Compare with auth.json pinHash
     ↓
Grant/deny edit access
```

**Pin requirements:** 4-6 digits, numeric only. Hashed with no salt (deterministic).

### Secret Storage
```
Browser:
  properties.apiKey = "__SECRET__"
             ↓
POST /config
             ↓
Server extracts:
  secrets.json → { widgetId: { apiKey: "actual-value" } }
  config.json  → { apiKey: "__SECRET__" }
             ↓
On load:
  Mask with "••••••••" before sending to browser
```

**Sensitive keys:**
- apiKey, api_key
- token
- secret
- password
- icalUrl

### SSRF Protection (RSS/iCal)
```
User provides URL
     ↓
Validate scheme (http/https only)
     ↓
Validate hostname (block private IPs)
  ├── 127.* (localhost)
  ├── 10.* (private)
  ├── 192.168.* (private)
  ├── 172.16-31.* (private)
  └── localhost, ::1, fc00::/7, fd00::/8
     ↓
Follow redirects (max 3)
     ↓
Fetch with timeout (15s) + size limit (5 MB)
     ↓
Return to client
```

## Data Persistence

### Configuration (config.json)
```json
{
  "canvas": {
    "width": 1920,
    "height": 1080
  },
  "widgets": [
    {
      "id": "widget-1",
      "type": "widget-type",
      "x": 0,
      "y": 0,
      "width": 400,
      "height": 200,
      "properties": {
        "title": "My Widget",
        "apiKey": "__SECRET__"
      }
    }
  ]
}
```

### Secrets (secrets.json)
```json
{
  "widget-1": {
    "apiKey": "sk-actual-key-value",
    "token": "token-value"
  },
  "__gateway__": {
    "gatewayUrl": "ws://127.0.0.1:18789",
    "apiToken": "gateway-token"
  }
}
```

### Authentication (auth.json)
```json
{
  "pinHash": "sha256-hash-of-pin",
  "publicMode": false
}
```

### Custom Page Data (data/{page-id}/)
```
data/
└── my-page/
    ├── items.json
    ├── settings.json
    └── notes.md
```

## Performance Optimizations

### Caching
- **Calendar events:** 5-minute TTL per URL+maxEvents
- **Release info:** 1-hour TTL
- **System stats:** Real-time SSE broadcast (no client polling)

### Request Optimization
- **Body size limits:** 1 MB (config), 256 KB (todos), 512 KB (notes)
- **SSE connection limit:** 10 concurrent clients
- **Response compression:** Native GZIP ready
- **Static asset versioning:** Not implemented (can add with build process)

### Async Guards
Prevent overlapping collection calls:
```javascript
let _cpuNetRunning = false;
if (_cpuNetRunning) return;
_cpuNetRunning = true;
// ... collect stats ...
_cpuNetRunning = false;
```

## Error Handling

### Server Errors
- Invalid JSON: Return 400 with error message
- File not found: Return 404 with "Not Found"
- Request too large: Return 413 with "Request body too large"
- SSRF violation: Return 400 with "URLs pointing to private addresses not allowed"
- Public mode violation: Return 403 with "Forbidden"

### Client Errors
- Widget load failure: Show error in widget container
- SSE disconnect: Attempt reconnect with exponential backoff
- Secret resolution failure: Show masked placeholder
- API timeout: Display "Connection error, retrying..."

## Testing Strategy

### Unit Tests
- Route compilation (params, wildcards)
- Secret extraction (mask/unmask logic)
- iCal date parsing (timezone handling)
- SSRF validation (IP blocking)

### Integration Tests
- Full dashboard save/load cycle
- Template import/export round-trip
- Custom page API route matching
- SSE client cleanup on disconnect
- Gateway adapter initialization

### Manual Testing
- Pin authentication flows
- Public mode restrictions
- Multiple concurrent editors
- Large dashboard (50+ widgets)
- RSS/iCal feed parsing

## Deployment Considerations

### System Requirements
- Node.js 16+
- 50 MB disk (with node_modules)
- 200 MB RAM (idle) / 500 MB (under load)
- Port binding permissions (default: 7880)

### Environment Setup
```bash
# Install dependencies
npm install

# Build CrabWalk (optional)
npm run build:adapter
npm run build:crabwalk

# Set permissions
chmod +x server.cjs

# Configure
export PORT=8080
export HOST=0.0.0.0
export ANTHROPIC_ADMIN_KEY="sk-..."
export CLAWDBOT_API_TOKEN="token-..."

# Run
node server.cjs
```

### Reverse Proxy (nginx)
```nginx
location / {
  proxy_pass http://localhost:7880;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /api/stats/stream {
  proxy_pass http://localhost:7880;
  proxy_set_header Connection "";
  proxy_buffering off;
}
```

## Future Architecture Improvements

- **Clustering:** Add Redis for shared state + horizontal scaling
- **Multi-user:** Implement user accounts + role-based access
- **Performance:** Move data layer to SQLite for better concurrency
- **Real-time:** Upgrade to WebSocket for bidirectional widget updates
- **Extensibility:** Plugin system for custom widget types
