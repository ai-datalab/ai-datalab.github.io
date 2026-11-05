import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const sources = {
  'ai-in-one': 'microsoft/AI-in-One-Dashboard',
  valuelens: 'microsoft/ValueLens-for-Microsoft-Copilot',
  'consumption-central': 'microsoft/ConsumptionCentral-for-Microsoft-Copilot',
  'agent-monitor': 'ai-datalab/Agent-Monitor',
  'github-copilot-panel': 'microsoft/GitHubCopilotPanel',
  'ai-datahub': 'microsoft/DataHub-App-for-Microsoft-Copilot-Agents-and-Autopilots',
  'agent-evaluator': 'microsoft/AgentEvaluator-for-Copilot-Studio',
}
const routes = {
  'ai-in-one': ['ai-in-one', 'app'],
  valuelens: ['valuelens', 'app'],
  'consumption-central': ['consumption-central', 'app'],
  'agent-monitor': ['agent-monitor', 'app'],
  'github-copilot-panel': ['github-copilot-panel', 'report'],
  'copilot-datahub': ['ai-datahub', 'app'],
  'ai-in-one-report': ['ai-in-one', 'report'],
  'valuelens-report': ['valuelens', 'report'],
  'consumption-central-report': ['consumption-central', 'report'],
  'agent-evaluator-report': ['agent-evaluator', 'report'],
}

const policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; form-action 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; base-uri 'self'"

export function validateManifest(manifest) {
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.demos)) {
    throw new Error('Demo manifest requires schemaVersion 1 and a demos array')
  }
  const seen = new Set()
  for (const demo of manifest.demos) {
    const route = demo && Object.hasOwn(routes, demo.slug) ? routes[demo.slug] : undefined
    if (!route || seen.has(demo.slug) || demo.solution !== route[0] || demo.kind !== route[1]) {
      throw new Error('Demo slug must be supported, unique and match its solution and kind')
    }
    seen.add(demo.slug)
    const repositories = [sources[demo.solution]]
    if (demo.solution === 'ai-in-one') repositories.push('Keithland89/AI-in-One-Dashboard')
    if (!repositories.includes(demo.source?.repository) ||
        !/^[a-f0-9]{40}$/i.test(demo.source?.commit ?? '') ||
        typeof demo.source?.directory !== 'string' || !demo.source.directory ||
        demo.source.directory.includes('\\') || demo.source.directory.startsWith('/') ||
        demo.source.directory.split('/').includes('..') ||
        typeof demo.build?.command !== 'string' || !demo.build.command.trim() ||
        typeof demo.build?.runtime !== 'string' || !demo.build.runtime.trim()) {
      throw new Error(`Demo ${demo.slug} needs exact source and reproducible build provenance`)
    }
    if (demo.safety?.inventedFixtures !== true || demo.safety?.noLiveServices !== true ||
        demo.safety?.noAdminActions !== true) {
      throw new Error(`Demo ${demo.slug} needs all three safety review declarations`)
    }
  }
}

async function bundleFiles(directory, relative = '') {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = path.join(relative, entry.name)
    if (entry.isSymbolicLink()) throw new Error(`Demo symlinks are not allowed: ${name}`)
    if (entry.isDirectory()) files.push(...await bundleFiles(path.join(directory, entry.name), name))
    else if (entry.isFile()) files.push(name)
    else throw new Error(`Unsupported demo entry: ${name}`)
  }
  return files
}

export function protectHtml(html, name) {
  if (!/<head(?:\s[^>]*)?>/i.test(html)) throw new Error(`Demo HTML needs a head element: ${name}`)
  const icon = /<link\b[^>]*\brel\s*=\s*["'][^"']*\bicon\b/i.test(html)
    ? ''
    : '\n<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1 1%22/%3E">'
  return html.replace(/<head(?:\s[^>]*)?>/i, (head) =>
    `${head}\n<meta http-equiv="Content-Security-Policy" content="${policy}">${icon}`)
}

export async function stageDemos(root) {
  const manifest = JSON.parse(await readFile(path.join(root, 'demos', 'manifest.json'), 'utf8'))
  validateManifest(manifest)
  for (const demo of manifest.demos) {
    const source = path.join(root, 'demos', 'builds', demo.slug)
    const files = await bundleFiles(source)
    if (!files.includes('index.html')) throw new Error(`Demo ${demo.slug} is missing index.html`)
    for (const file of files) {
      const target = path.join(root, 'dist', 'demo', demo.slug, file)
      const content = await readFile(path.join(source, file))
      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, /\.html?$/i.test(file) ? protectHtml(content.toString('utf8'), file) : content)
    }
  }
  const output = path.join(root, 'dist', 'demo')
  await mkdir(output, { recursive: true })
  await writeFile(path.join(output, 'provenance.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Staged ${manifest.demos.length} browser demos`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await stageDemos(fileURLToPath(new URL('..', import.meta.url)))
}
