# LobsterBoard Developer Documentation

Welcome! This directory contains comprehensive documentation for LobsterBoard developers. Start here to understand the codebase, architecture, and development practices.

## Documentation Files

### 1. **project-overview-pdr.md** (257 lines)
**Start here for the big picture**

Project vision, features, requirements, architecture overview, and success metrics.

**Contains:**
- Executive summary + CrabWalk integration overview
- Functional & non-functional requirements (F1-F6, NFR1-NFR5)
- Build commands (build:adapter, build:crabwalk, build:all)
- Gateway configuration details
- Roadmap and known limitations

**Use when:** Planning features, understanding scope, explaining the project to stakeholders.

### 2. **system-architecture.md** (657 lines)
**Deep dive into system design**

Complete technical architecture with diagrams, data flows, and integration points.

**Contains:**
- High-level architecture diagram (3-layer system)
- Server layer breakdown (endpoints, handlers, statistics collection)
- Gateway adapter details (tRPC, WebSocket, OpenClaw)
- Pages system (auto-discovery, route compilation, context API)
- Client layer (editor, widgets, templates)
- CrabWalk integration architecture
- Security architecture (PIN auth, secrets, SSRF protection)
- Data persistence (config.json, secrets.json, auth.json)
- Performance optimization patterns
- Deployment considerations

**Use when:** Implementing features, debugging issues, understanding data flows, deploying to production.

### 3. **code-standards.md** (699 lines)
**Coding guidelines and best practices**

Standards for writing, organizing, and reviewing code.

**Contains:**
- Codebase organization (directory structure)
- File naming conventions
- Server code patterns (functions, error handling, security)
- Client code patterns (widgets, events, API calls)
- Page API handler patterns
- HTML/CSS standards (dark theme)
- Commit message format
- Testing standards
- Performance guidelines
- Security guidelines
- Build & release process
- Code review checklist
- Anti-patterns to avoid

**Use when:** Writing code, reviewing PRs, onboarding new developers, refactoring.

### 4. **codebase-summary.md** (736 lines)
**Detailed inventory of all code**

Comprehensive file-by-file breakdown with line counts and responsibilities.

**Contains:**
- Project statistics (1,800 lines server.cjs, 50 KB file)
- server.cjs sections (8 major areas with line ranges)
- All route handlers enumerated
- Client files: builder.js, widgets.js, templates.js, builder.css
- CrabWalk integration files and build process
- Custom pages system structure
- Templates system format
- Data files (config.json, secrets.json, auth.json)
- Dependencies (systeminformation, ws, dev deps)
- Architecture patterns (request flow, data flow, widget updates)
- Security architecture (secrets, PIN, SSRF)
- Performance characteristics (memory, response times)
- File size summary
- External integrations (OpenClaw, Anthropic, OpenAI, etc.)
- Code quality metrics
- Future refactoring opportunities

**Use when:** Learning the codebase, adding new features, optimizing performance, documenting changes.

## Quick Reference

### New to LobsterBoard?
1. Read **project-overview-pdr.md** for context
2. Read **system-architecture.md** for how it works
3. Skim **codebase-summary.md** for where code lives
4. Refer to **code-standards.md** when writing code

### Want to add a feature?
1. Check **project-overview-pdr.md** for scope/requirements
2. Review **system-architecture.md** for affected components
3. Find related code in **codebase-summary.md**
4. Follow patterns in **code-standards.md**

### Need to understand a bug?
1. Check **system-architecture.md** for data flows
2. Locate code in **codebase-summary.md**
3. Review security patterns in **code-standards.md** (if security-related)

### Making a PR?
1. Follow **code-standards.md** formatting and patterns
2. Use commit message format from **code-standards.md**
3. Check code review checklist in **code-standards.md**

## Key Concepts

### CrabWalk Integration
LobsterBoard now integrates with CrabWalk (OpenClaw's agent monitor):
- New endpoints: `/api/trpc/*`, `/api/gateway/config`
- New widget: CrabWalk Monitor
- Gateway config stored in `secrets.json` under `__gateway__` key
- See **project-overview-pdr.md** "CrabWalk Integration" section

### Security Model
- PIN-based access control (SHA256 hashing)
- Secrets extraction to `secrets.json`
- Masking in browser (`••••••••`)
- SSRF protection for RSS/iCal proxies
- See **code-standards.md** "Security Guidelines"

### Pages System
- Custom pages auto-discovered from `pages/` directory
- Each page: `page.json` (metadata) + `index.html` (UI) + `api.cjs` (routes)
- Data persistence via `data/{page-id}/` directories
- See **system-architecture.md** "Pages System"

### Widget System
- 50+ widgets across 10 categories
- Each widget: type, category, properties, render(), update()
- Data fetching: SSE, HTTP, proxies, tRPC
- See **codebase-summary.md** "Widget System"

## Build Commands

```bash
# Development
npm install
node server.cjs

# Production
npm run build:adapter        # Build tRPC gateway adapter
npm run build:crabwalk       # Build CrabWalk SPA
npm run build:all            # Both

# Custom port
PORT=3000 node server.cjs

# Expose to network
HOST=0.0.0.0 node server.cjs
```

## Architecture Quick View

```
Browser ─────► server.cjs ─────► File System
    ▲              ▲                    ▲
    │              │                    │
    └─ HTTP/SSE ──┘                    │
                   │                    │
                   ├─ config.json ◄─────┘
                   ├─ secrets.json
                   ├─ auth.json
                   ├─ pages/ (custom)
                   └─ templates/

                 + CrabWalk Gateway Adapter
                 └─ WebSocket to OpenClaw
```

## File Locations

| Purpose | Location |
|---------|----------|
| Main server | `/server.cjs` |
| Editor UI | `/app.html` |
| Dashboard editor | `/js/builder.js` |
| Widget definitions | `/js/widgets.js` |
| Template system | `/js/templates.js` |
| Styling | `/css/builder.css` |
| CrabWalk app | `/crabwalk/` |
| Gateway adapter | `/crabwalk-gateway-adapter.cjs` (generated) |
| Custom pages | `/pages/` |
| Dashboard templates | `/templates/` |
| Page data | `/data/` |
| User config | `/config.json` (generated) |
| Secrets | `/secrets.json` (generated, .gitignore) |
| Auth state | `/auth.json` (generated, .gitignore) |

## Performance Targets

- Dashboard load: <1s
- Widget update: 2-5s
- SSE stats: Real-time (2-60s collection)
- Template import: <2s
- Gateway status: <1s delay

## Testing

Manual testing documented in project README.md.

Automated testing: See **code-standards.md** "Testing Standards" for guidelines.

## Contributing

1. Read relevant documentation (above)
2. Follow **code-standards.md** patterns
3. Use commit message format from **code-standards.md**
4. Check code review checklist in **code-standards.md**
5. Update documentation if adding features

## Getting Help

- **Architecture questions:** See **system-architecture.md**
- **Code patterns:** See **code-standards.md**
- **File locations:** See **codebase-summary.md**
- **Feature scope:** See **project-overview-pdr.md**

## Last Updated

2026-02-21 | CrabWalk integration complete | Version 0.2.5

---

**Documentation Status:** Complete and current
**Codebase:** server.cjs (1,800 lines), 50+ widgets, CrabWalk integrated
**Test Coverage:** Manual (documented), automated (planned)
