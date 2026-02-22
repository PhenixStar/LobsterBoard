# LobsterBoard - Project Overview & PDR

## Executive Summary

LobsterBoard is a self-hosted, drag-and-drop dashboard builder with 50+ widgets, template gallery, custom pages, and zero cloud dependencies. Now integrated with **CrabWalk**, the OpenClaw agent monitor, enabling real-time monitoring of agent activity and gateway status directly from the dashboard.

**Status:** v0.2.5 | CrabWalk integration complete

## Project Vision

Enable developers and system administrators to create powerful, customized dashboards without cloud lock-in. Serve as a general-purpose monitoring platform for homelabs, infrastructure, AI workloads, and personal productivity—with seamless integration to OpenClaw agent networks.

## Core Features

### Dashboard Builder
- **Drag-and-drop editor** with 20px snap grid and resize handles
- **50+ widgets** covering system monitoring, weather, calendars, RSS, smart home, finance, AI tracking, and utilities
- **Template gallery** for exporting, importing, and sharing layouts
- **Custom pages** system for extending beyond widgets
- **Canvas sizes** (presets or custom)
- **Live data** streaming via Server-Sent Events
- **Dark theme** default interface

### Security & Authentication
- **PIN authentication** (optional 4-6 digit protection)
- **Public mode** for read-only dashboard sharing
- **Secrets management** for sensitive credentials (API keys, tokens)
- **Secret extraction** into separate `secrets.json` file

### CrabWalk Integration
- **Monitor OpenClaw agents** and gateway status
- **tRPC gateway adapter** bundling CrabWalk's server-side logic
- **Real-time agent metrics** and activity tracking
- **Gateway configuration** modal in UI
- **New widget:** CrabWalk Monitor (button/embed modes)
- **Seamless authentication** with OpenClaw credentials

### Pages System
- **Auto-discovery** of custom page directories
- **Page metadata** via `page.json` configuration
- **API routes** support in `api.cjs` or `api.js`
- **Data persistence** via `data/` directory
- **Navigation integration** in header

### Template & Widget System
- **Export** current dashboard as reusable template
- **Import** with merge or replace mode
- **Auto-screenshot** preview generation
- **Community widget** support via `community-widgets/` directory
- **Template metadata** in `meta.json`

## Functional Requirements

### F1: Dashboard Editing
- Load/save dashboard configuration via `/config` endpoints
- Support 50+ widget types with configurable properties
- Apply canvas size constraints and layout validation
- Persist layout to `config.json`

### F2: Widget System
- Each widget must support:
  - Type identifier and category
  - Position (x, y), dimensions (width, height)
  - Properties object for widget-specific config
  - Data fetching from `/api/*` endpoints
  - Live updates via SSE or polling
- Render consistently across different canvas sizes

### F3: Security Model
- Mask sensitive properties on load (show as `••••••••`)
- Extract secrets on save into `secrets.json`
- Support PIN-based access control
- Enforce public mode restrictions on POST endpoints
- Prevent SSRF attacks on RSS/iCal proxy endpoints

### F4: Custom Pages
- Auto-discover pages in `pages/` directory
- Load `page.json` metadata (title, icon, order, enabled status)
- Register routes from `api.cjs` handler
- Serve static HTML from `pages/{id}/index.html`
- Support dynamic API routes with query/body/params

### F5: CrabWalk Integration
- Load `crabwalk-gateway-adapter.cjs` on server startup
- Proxy tRPC calls to `/api/trpc/*`
- Serve CrabWalk SPA from `/crabwalk/*`
- Support gateway configuration via `/api/gateway/config`
- Display connection status and authentication state

### F6: Data Integrity
- Validate JSON before saving
- Handle file I/O errors gracefully
- Implement request body size limits (1 MB default)
- Support concurrent SSE clients with cleanup

## Non-Functional Requirements

### NFR1: Performance
- Cache system stats with tiered collection intervals:
  - CPU/Network: 2s
  - Memory: 5s
  - Disk: 30s
  - Docker: 5s
  - Uptime: 60s
- Calendar events cache: 5 minutes
- Release info cache: 1 hour

### NFR2: Reliability
- Graceful degradation if OpenClaw is unavailable
- SSE connection limit: 10 concurrent clients
- RSS/iCal request timeout: 15 seconds
- No single point of failure for widget rendering

### NFR3: Security
- CORS headers on all JSON endpoints
- Path traversal protection for file serving
- SSRF protection for RSS/iCal feeds
- Secret key rotation support

### NFR4: Scalability
- Support 50+ widgets per dashboard without performance degradation
- Handle large custom pages (>10KB HTML)
- Template directory with arbitrary number of templates
- Page directory with 20+ custom pages

### NFR5: Compatibility
- Node.js 16+
- Works standalone or with OpenClaw
- Zero external dependencies for core features
- Minimal footprint (<50 MB disk with node_modules)

## Architecture Overview

### Server Layer (Node.js)
```
server.cjs
├── HTTP listener (PORT, HOST)
├── Gateway adapter (tRPC bridging)
├── Pages system (auto-discovery, routing)
├── Stats collection (system monitoring)
├── Template system (export/import)
├── Security (PIN auth, secrets)
└── Static serving (dashboard, CrabWalk, pages)
```

### Client Layer (Browser)
```
app.html
├── builder.js (editor: drag-drop, zoom, config)
├── widgets.js (all 50 widget definitions)
└── templates.js (gallery & export)
```

### Data Persistence
```
config.json        → Dashboard layout & widget config
secrets.json       → Sensitive values (API keys, tokens)
auth.json          → PIN hash, public mode flag
todos.json         → Todo list data
notes.json         → Rich-text notes
data/{page-id}/    → Custom page data
```

### Integration Points
- `/api/stats/stream` → System monitoring (SSE)
- `/api/pages` → Custom pages listing
- `/api/templates/*` → Template management
- `/api/trpc/*` → CrabWalk tRPC gateway
- `/crabwalk/*` → CrabWalk SPA serving
- `pages/{id}/*` → Custom page routes

## Build & Deployment

### Build Commands
```bash
npm run build:adapter    # Build tRPC gateway adapter
npm run build:crabwalk   # Build CrabWalk SPA + generate index.html
npm run build:all        # Both adapter and CrabWalk

node server.cjs          # Run development server
PORT=3000 node server.cjs # Custom port
HOST=0.0.0.0 node server.cjs # Expose to network
```

### Deployment Options
- **Standalone:** Single Node.js process
- **PM2:** Process manager with auto-restart
- **systemd:** Linux service with dependencies
- **launchd:** macOS launch agent
- **Docker:** Container with environment variables

## Configuration

### Environment Variables
- `PORT` (default: 7880)
- `HOST` (default: 127.0.0.1)
- `ANTHROPIC_ADMIN_KEY` (optional, for Claude usage widget)
- `OPENAI_API_KEY` (optional, for OpenAI usage widget)
- `CLAWDBOT_API_TOKEN` (optional, for CrabWalk auth)

### Gateway Configuration
Stored in `secrets.json` under `__gateway__` key:
```json
{
  "__gateway__": {
    "gatewayUrl": "ws://127.0.0.1:18789",
    "apiToken": "your-api-token"
  }
}
```

Configurable via GET/POST `/api/gateway/config` endpoint with UI modal.

## Success Metrics

- Dashboard loads in <1s over LAN
- Widget updates within 2-5s of data change
- Support 50+ widgets without layout degradation
- Template export/import <2s
- CrabWalk monitor reflects gateway status <1s delay
- 100% uptime for SSE stat streaming
- Zero unhandled exceptions in server logs

## Known Limitations

- Single-machine deployment (no clustering)
- In-memory caching (lost on restart)
- 10 concurrent SSE client limit
- No multi-user dashboard synchronization
- RSS/iCal feeds limited to 5MB download
- CrabWalk requires OpenClaw installation

## Roadmap

- [ ] Multi-user support with role-based access
- [ ] Dashboard versioning and rollback
- [ ] Widget marketplace for community extensions
- [ ] Mobile-responsive layouts
- [ ] Data export to CSV/JSON
- [ ] Performance metrics dashboard
- [ ] Cloud backup integration (optional)

## License

Business Source License 1.1 (BSL-1.1) - Free for non-commercial use.
Commercial licenses available - contact curbob on GitHub.

## Getting Started

1. Clone repository: `git clone https://github.com/curbob/LobsterBoard.git`
2. Install: `npm install`
3. Build CrabWalk (optional): `npm run build:all`
4. Start: `node server.cjs`
5. Open: http://localhost:7880
6. Press Ctrl+E to edit dashboard

For detailed setup and configuration, see `./docs/system-architecture.md`.
