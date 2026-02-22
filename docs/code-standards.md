# LobsterBoard - Code Standards & Structure

## Codebase Organization

```
lobsterboard/
├── server.cjs              (1800 lines - main HTTP server)
├── app.html                (Dashboard HTML entry point)
├── package.json            (Dependencies + build scripts)
├── config.json             (User dashboard layout - generated)
├── secrets.json            (Sensitive values - generated)
├── auth.json               (PIN hash + flags - generated)
├── crabwalk/               (CrabWalk monitor app)
│   ├── src/                (Nuxt app source)
│   ├── scripts/
│   │   ├── build-gateway-adapter.mjs
│   │   └── generate-spa-html.mjs
│   ├── .output/public/     (Build output - served at /crabwalk/)
│   ├── package.json
│   └── vite.config.ts
├── crabwalk-gateway-adapter.cjs  (Bundled tRPC gateway - generated)
├── js/
│   ├── builder.js          (Editor UI: drag-drop, zoom, config)
│   ├── widgets.js          (50+ widget definitions + renderers)
│   └── templates.js        (Template gallery + export)
├── css/
│   └── builder.css         (Dark theme styles)
├── pages/                  (Custom pages - auto-discovered)
│   ├── _shared/
│   │   └── nav.js         (Shared navigation component)
│   └── example-page/
│       ├── page.json      (Metadata)
│       ├── index.html     (Page UI)
│       └── api.cjs        (API routes)
├── templates/              (Dashboard templates)
│   ├── templates.json     (Index of templates)
│   └── template-id/
│       ├── meta.json      (Template metadata)
│       ├── config.json    (Dashboard config)
│       └── preview.png    (Screenshot)
├── data/                   (Custom page data - per-page subdirs)
│   └── example-page/      (Page-specific storage)
├── community-widgets/      (Contributed widget starter)
├── docs/                   (Developer documentation)
│   ├── project-overview-pdr.md
│   ├── system-architecture.md
│   ├── code-standards.md
│   └── codebase-summary.md
└── bin/
    └── lobsterboard.mjs   (CLI entry point for npm package)
```

## File Naming Conventions

### JavaScript/CommonJS Files
- **server.cjs** - Main server file (CommonJS for Node.js)
- **crabwalk-gateway-adapter.cjs** - Gateway adapter (generated bundle)
- **api.cjs** - Custom page API handlers (CommonJS)
- **builder.js** - Main client-side module (ES modules where possible)
- **widgets.js** - Widget registry
- **templates.js** - Template system

**Convention:** Use descriptive names with kebab-case for multi-word modules (e.g., `build-gateway-adapter.mjs`).

### Configuration Files
- `page.json` - Page metadata (strict schema)
- `meta.json` - Template metadata (auto-generated)
- `config.json` - Dashboard configuration (user-specific)
- `secrets.json` - Sensitive credentials (DO NOT commit)
- `auth.json` - Authentication state (DO NOT commit)

### Build Output
- `crabwalk/.output/public/` - CrabWalk SPA build
- `crabwalk-gateway-adapter.cjs` - Generated adapter bundle

## Coding Standards

### Server Code (server.cjs)

#### Structure
```javascript
// 1. Imports
const http = require('http');
const fs = require('fs');
const path = require('path');

// 2. Constants (SCREAMING_SNAKE_CASE)
const PORT = process.env.PORT || 7880;
const HOST = process.env.HOST || '127.0.0.1';
const MAX_BODY = 1024 * 1024;

// 3. Utility functions
function readJsonFile(filepath, fallback) {
  try { return JSON.parse(fs.readFileSync(filepath, 'utf8')); }
  catch (_) { return fallback; }
}

// 4. Main handler
const server = http.createServer(async (req, res) => {
  // Request routing logic
});

// 5. Server startup
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
```

#### Function Naming
- **Actions:** `handleRequest`, `parseConfig`, `extractSecrets`
- **Checks:** `isSensitiveKey`, `isPublicMode`, `isPrivateHost`
- **Getters:** `getAuth`, `getSecrets`, `getGatewayStatus`
- **Setters:** `writeJsonFile` (explicit action)
- **Factories:** `compileRoute`, `scanTemplates`

#### Error Handling
```javascript
// Always include context in error messages
sendError(res, `Failed to read config file: ${err.message}`);

// Use try-catch for async operations
try {
  const result = await someAsyncOp();
} catch (e) {
  console.error('Operation failed:', e.message);
  sendError(res, e.message);
}

// Graceful degradation for optional features
try {
  gatewayAdapter = require('./crabwalk-gateway-adapter.cjs');
} catch (e) {
  console.log('🦀 CrabWalk gateway adapter not found');
  gatewayAdapter = null;
}
```

#### Response Helpers
```javascript
// All responses should use consistent helpers
function sendResponse(res, statusCode, contentType, data, extraHeaders = {})
function sendJson(res, statusCode, data)
function sendError(res, message, statusCode = 500)
```

#### Security Patterns
```javascript
// 1. Validate URLs for SSRF
function isPrivateHost(hostname) {
  const patterns = [
    /^127\./, /^10\./, /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./, /^169\.254\./, /^localhost$/i
  ];
  return patterns.some(p => p.test(hostname));
}

// 2. Protect file paths
const resolved = path.resolve(filePath);
if (!resolved.startsWith(__dirname + path.sep)) {
  sendResponse(res, 403, 'text/plain', 'Forbidden');
  return;
}

// 3. Hash sensitive values
function hashPin(pin) {
  return crypto.createHash('sha256').update(pin).digest('hex');
}

// 4. Check public mode before sensitive operations
if (isPublicMode()) {
  sendJson(res, 403, { error: 'Forbidden in public mode' });
  return;
}
```

#### Async Pattern
```javascript
// For heavy I/O, prevent overlapping calls
let _collectorRunning = false;

setInterval(async () => {
  if (_collectorRunning) return;
  _collectorRunning = true;
  try {
    const data = await expensiveOperation();
    // Process data
  } catch (e) {
    console.error('Collection error:', e.message);
  }
  _collectorRunning = false;
}, 2000);
```

### Client Code (JavaScript)

#### Widget Definition Pattern
```javascript
const myWidget = {
  type: 'widget-name',
  category: 'Category Name',
  title: 'Display Title',
  description: 'What this widget does',

  // Configuration schema
  properties: {
    title: {
      type: 'text',
      label: 'Widget Title',
      default: 'My Widget',
      placeholder: 'Enter title'
    },
    apiKey: {
      type: 'text',
      label: 'API Key',
      sensitive: true  // Marks for secret handling
    },
    enabled: {
      type: 'toggle',
      label: 'Enabled',
      default: true
    }
  },

  // Default dimensions
  size: { width: 400, height: 200 },

  // Render DOM element
  render: (widget) => {
    const el = document.createElement('div');
    el.className = 'widget-content';
    el.innerHTML = `
      <h3>${widget.properties.title}</h3>
      <p>Loading...</p>
    `;
    return el;
  },

  // Update widget (fetch data, re-render)
  update: (widget) => {
    fetch(`/api/my-endpoint?key=${widget.properties.apiKey}`)
      .then(r => r.json())
      .then(data => {
        widget.element.innerHTML = data.html;
      })
      .catch(e => {
        widget.element.innerHTML = `<p class="error">${e.message}</p>`;
      });
  }
};
```

#### Event Handling
```javascript
// Use event delegation for dynamically created content
document.addEventListener('click', (e) => {
  if (e.target.matches('.widget-button')) {
    handleWidgetClick(e.target);
  }
});

// Clean up on widget destruction
function destroyWidget(widget) {
  if (widget.unsubscribe) widget.unsubscribe();
  if (widget.element) {
    widget.element.removeEventListener('click', widget.clickHandler);
  }
}
```

#### API Calls
```javascript
// Always include error handling
async function fetchConfigFromServer() {
  try {
    const response = await fetch('/config');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch config:', error);
    return getDefaultConfig();
  }
}

// Support masked secrets
function getSecretValue(value) {
  // If masked or placeholder, return empty
  if (value === '__SECRET__' || value === '••••••••') {
    return '';
  }
  return value;
}
```

### Page API Handlers (api.cjs)

#### Handler Function Pattern
```javascript
module.exports = (ctx) => ({
  routes: {
    // Simple GET
    'GET /': (req, res, { query, params, body }) => {
      return { message: 'Hello' };
    },

    // With parameters
    'GET /items/:id': async (req, res, { params }) => {
      const items = ctx.readData('items.json');
      return items[params.id];
    },

    // POST with body
    'POST /items': (req, res, { body }) => {
      let items = [];
      try { items = ctx.readData('items.json'); } catch (_) {}
      items.push(body);
      ctx.writeData('items.json', items);
      return { status: 'ok', id: items.length - 1 };
    },

    // With wildcards
    'GET /files/*': async (req, res, { params }) => {
      const filePath = params['*'];
      // Handle file serving
      return null;  // Or res.writeHead + res.end
    }
  }
});
```

#### Data Persistence
```javascript
// Read (with defaults)
function getItems() {
  try {
    return ctx.readData('items.json');
  } catch (e) {
    return [];  // Default empty
  }
}

// Write with validation
function saveItems(items) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  ctx.writeData('items.json', items);
}
```

## HTML/CSS Standards

### Page HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="/_shared/styles.css">
  <style>
    /* Page-specific styles */
    .container { max-width: 1200px; margin: 0 auto; }
  </style>
</head>
<body>
  <div id="app"><!-- Content --></div>
  <script src="/_shared/nav.js"></script>
  <script>
    // Page initialization
    document.addEventListener('DOMContentLoaded', () => {
      // Load data, set up event listeners
    });
  </script>
</body>
</html>
```

### Dark Theme CSS
```css
/* Use CSS custom properties for theming */
:root {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #f0f0f0;
  --text-secondary: #a0a0a0;
  --accent: #0066ff;
  --border: #333;
  --danger: #ff3333;
}

/* Dark theme only (no light mode) */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

button {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
```

## Commit Message Standards

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat:` New feature (widget, page, endpoint)
- `fix:` Bug fix
- `refactor:` Code restructuring (no behavior change)
- `perf:` Performance improvement
- `docs:` Documentation update
- `chore:` Build, deps, tooling
- `test:` Test updates

### Examples
```
feat(widgets): add CrabWalk monitor widget

- Displays gateway connection status
- Shows real-time agent metrics
- Supports button and embed modes

Closes #42

---

fix(security): prevent SSRF in RSS proxy

Block private IP ranges and validate redirects

---

docs(architecture): add CrabWalk integration guide

---

chore(deps): upgrade systeminformation to 5.30.7
```

## Testing Standards

### Test File Organization
```
tests/
├── unit/
│   ├── route-compiler.test.js
│   ├── secret-handler.test.js
│   └── ical-parser.test.js
├── integration/
│   ├── dashboard-lifecycle.test.js
│   ├── custom-pages.test.js
│   └── gateway-adapter.test.js
└── e2e/
    ├── editor-flow.test.js
    └── template-import.test.js
```

### Test Pattern
```javascript
describe('RouteCompiler', () => {
  describe('compileRoute', () => {
    it('should compile simple routes', () => {
      const result = compileRoute('GET /items');
      expect(result.method).toBe('GET');
      expect(result.paramNames).toEqual([]);
    });

    it('should extract path parameters', () => {
      const result = compileRoute('GET /items/:id');
      expect(result.paramNames).toEqual(['id']);
    });

    it('should handle wildcard patterns', () => {
      const result = compileRoute('GET /files/*');
      expect(result.paramNames).toContain('*');
    });
  });
});
```

### Testing Best Practices
1. Test single responsibility per test
2. Use descriptive test names
3. Mock external dependencies (fs, fetch)
4. Test error paths, not just happy paths
5. Use fixtures for test data
6. Keep tests DRY with shared setup

## Documentation Standards

### README Structure
1. **Title & badges**
2. **Quick start** (3-5 steps)
3. **Features** (with emojis/icons)
4. **Installation**
5. **Configuration**
6. **API reference** (if needed)
7. **Contributing**
8. **License**

### Code Comments
```javascript
// Good: Why, not what
// Prevent overlapping async calls that could cause race conditions
if (_running) return;

// Bad: States the obvious
// Increment the counter
count++;

// Good: Complex logic needs explanation
// Map Windows timezone names to UTC offsets for iCal TZID parsing
const tzOffsets = { 'eastern standard time': -5, ... };

// Bad: Too much commenting
// This is a loop that iterates over items
for (const item of items) {
  // Process the item
  process(item);
}
```

### Inline Documentation
```javascript
/**
 * Parse iCal (.ics) text into upcoming events
 * @param {string} text - Raw iCal format text
 * @param {number} maxEvents - Maximum events to return
 * @returns {Array} Array of event objects with {summary, start, end, location, allDay}
 */
function parseIcal(text, maxEvents) {
  // Implementation
}
```

## Performance Guidelines

### Code Patterns
```javascript
// Good: Reuse compiled regexes
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
if (emailRegex.test(email)) { /* ... */ }

// Bad: Compile regex on every call
if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { /* ... */ }

// Good: Cache collection results
const timestamp = Date.now();
const results = expensiveCalculation();
// Reuse results within time window

// Bad: Recalculate every access
const result1 = expensiveCalculation();
const result2 = expensiveCalculation();
```

### Memory Management
```javascript
// Good: Clean up event listeners
function destroyWidget(widget) {
  if (widget.element) {
    widget.element.removeEventListener('click', widget.handler);
  }
}

// Good: Limit cache size
const MAX_CACHE = 100;
if (cache.size > MAX_CACHE) {
  const oldestKey = Array.from(cache.keys())[0];
  cache.delete(oldestKey);
}
```

## Security Guidelines

### Never commit
- `.env` files with actual credentials
- `secrets.json` (generated, ignore in `.gitignore`)
- `auth.json` (generated, ignore in `.gitignore`)
- Private API keys or tokens

### Always validate
- User input (sanitize before use)
- File paths (prevent traversal)
- URLs (prevent SSRF)
- JSON parsing (wrap in try-catch)
- Request bodies (size limits)

### Always mask
- Sensitive properties in responses
- API keys in error logs
- Credentials in template exports

## Build & Release

### Version Numbering
Semantic versioning: `MAJOR.MINOR.PATCH`
- `MAJOR`: Breaking changes
- `MINOR`: New features, backward compatible
- `PATCH`: Bug fixes

### Build Process
```bash
# Development
npm run build:watch          # Auto-rebuild on changes

# Production
npm run build                # Main build
npm run build:adapter        # CrabWalk gateway adapter
npm run build:crabwalk       # CrabWalk SPA
npm run build:all            # All of above

# Publishing
npm run prepublishOnly        # Runs build before publish
npm publish                   # Push to npm registry
```

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Build all targets (`npm run build:all`)
- [ ] Test in development mode
- [ ] Create git tag
- [ ] Push to GitHub
- [ ] Publish to npm

## Code Review Checklist

- [ ] Code follows naming conventions
- [ ] Error handling is complete
- [ ] Security measures are in place (no SSRF, path traversal, etc.)
- [ ] Performance impact is minimal (no N+1 queries, unnecessary loops)
- [ ] Comments explain complex logic
- [ ] No console.log left behind (use proper logging)
- [ ] Tests pass
- [ ] No secrets committed
- [ ] Backward compatible (or breaking change documented)
- [ ] Documentation updated

## Anti-patterns to Avoid

```javascript
// AVOID: Catching all errors silently
try { something(); } catch (_) { }

// INSTEAD: Log or handle appropriately
try { something(); } catch (e) { console.error('Operation failed:', e); }

// AVOID: Sync operations on large data
fs.readFileSync(largeFile);  // Blocks event loop

// INSTEAD: Use async
const data = await fs.promises.readFile(largeFile);

// AVOID: String concatenation for file paths
const filePath = dir + '/' + id + '.json';

// INSTEAD: Use path.join
const filePath = path.join(dir, id + '.json');

// AVOID: Global variables
let globalConfig = {};

// INSTEAD: Pass as parameters or use closures
function createServer(config) { /* use config */ }

// AVOID: Magic numbers
const x = value * 1024 * 1024;

// INSTEAD: Named constants
const MB = 1024 * 1024;
const x = value * MB;
```

## References

- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [OWASP Security Guidelines](https://owasp.org/)
