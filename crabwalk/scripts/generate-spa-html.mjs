// Post-build: start the SSR server briefly, fetch pre-rendered HTML, save to .output/public/
// This enables CrabWalk to be served as static files from LobsterBoard's server.cjs

import { spawn } from 'child_process'
import { writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.resolve(__dirname, '..', '.output')
const publicDir = path.join(outputDir, 'public')
const serverEntry = path.join(outputDir, 'server', 'index.mjs')

if (!existsSync(serverEntry)) {
  console.error('Server entry not found. Run pnpm build first.')
  process.exit(1)
}

const PORT = 19876 // Ephemeral port for pre-rendering
const routes = ['/', '/monitor/']

// Start the Nitro server
const server = spawn('node', [serverEntry], {
  env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
})

let serverOutput = ''
server.stdout.on('data', (d) => { serverOutput += d.toString() })
server.stderr.on('data', (d) => { serverOutput += d.toString() })

// Wait for server to be ready
async function waitForServer(maxWait = 10000) {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/crabwalk/`)
      if (res.ok) return true
    } catch {
      // not ready yet
    }
    await new Promise(r => setTimeout(r, 200))
  }
  return false
}

async function main() {
  console.log('Starting SSR server for pre-rendering...')
  const ready = await waitForServer()
  if (!ready) {
    console.error('Server failed to start:', serverOutput)
    server.kill()
    process.exit(1)
  }

  for (const route of routes) {
    const url = `http://127.0.0.1:${PORT}/crabwalk${route}`
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.warn(`Warning: ${url} returned ${res.status}`)
        continue
      }
      const html = await res.text()
      // Map /crabwalk/ -> index.html, /crabwalk/monitor/ -> monitor/index.html
      const filePath = route === '/'
        ? path.join(publicDir, 'index.html')
        : path.join(publicDir, route.slice(1), 'index.html')

      const dir = path.dirname(filePath)
      if (!existsSync(dir)) {
        const { mkdirSync } = await import('fs')
        mkdirSync(dir, { recursive: true })
      }
      writeFileSync(filePath, html)
      console.log(`  Saved ${route} -> ${path.relative(publicDir, filePath)} (${html.length} bytes)`)
    } catch (e) {
      console.warn(`Warning: failed to fetch ${url}:`, e.message)
    }
  }

  server.kill()
  console.log('Pre-rendering complete.')
}

main().catch((e) => {
  console.error('Pre-render failed:', e)
  server.kill()
  process.exit(1)
})
