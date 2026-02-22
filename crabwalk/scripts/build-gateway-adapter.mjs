// Bundles CrabWalk server-side tRPC + OpenClaw client into a single CJS module
// Output: ../crabwalk-gateway-adapter.cjs (consumed by server.cjs)

import { build } from 'esbuild'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const crabwalkRoot = path.resolve(__dirname, '..')

await build({
  entryPoints: [path.join(crabwalkRoot, 'src/integrations/trpc/adapter-entry.ts')],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'cjs',
  outfile: path.join(crabwalkRoot, '..', 'crabwalk-gateway-adapter.cjs'),
  external: ['ws', 'bufferutil', 'utf-8-validate'],
  // Resolve ~/xxx path alias to src/xxx
  alias: { '~': path.join(crabwalkRoot, 'src') },
  logLevel: 'info',
})

console.log('Gateway adapter built: crabwalk-gateway-adapter.cjs')
