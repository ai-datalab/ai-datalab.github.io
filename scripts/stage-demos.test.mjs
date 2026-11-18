import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { protectHtml, stageDemos, validateManifest } from './stage-demos.mjs'

const sha256 = (data) => createHash('sha256').update(data).digest('hex')

const demo = {
  slug: 'ai-in-one', solution: 'ai-in-one', kind: 'app',
  source: { repository: 'microsoft/AI-in-One-Dashboard', commit: 'a'.repeat(40), directory: 'app/demo' },
  build: { command: 'npm ci && npm run build:demo', runtime: 'Node.js 22' },
  safety: { inventedFixtures: true, noLiveServices: true, noAdminActions: true },
}
const manifest = (demos = []) => ({ schemaVersion: 1, demos })

test('requires supported unique routes, matching kinds, provenance and safety review', () => {
  assert.doesNotThrow(() => validateManifest(manifest()))
  assert.doesNotThrow(() => validateManifest(manifest([demo])))
  assert.doesNotThrow(() => validateManifest(manifest([{ ...demo, source: { ...demo.source, repository: 'Keithland89/AI-in-One-Dashboard' } }])))
  assert.doesNotThrow(() => validateManifest(manifest([{ ...demo, slug: 'ai-in-one-report', kind: 'report' }])))
  assert.doesNotThrow(() => validateManifest(manifest([{
    ...demo, slug: 'copilot-datahub', solution: 'ai-datahub',
    source: { ...demo.source, repository: 'microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots' },
  }])))
  assert.doesNotThrow(() => validateManifest(manifest([{
    ...demo, slug: 'datahub-business-impact', solution: 'ai-datahub',
    source: { ...demo.source, repository: 'microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots' },
  }])))
  const finops = { ...demo, slug: 'datahub-finops', solution: 'datahub-finops', source: { ...demo.source, repository: 'ai-datalab/DataHub-FinOps' } }
  assert.doesNotThrow(() => validateManifest(manifest([{ ...finops, webAssembly: true }])))
  for (const invalid of [
    { schemaVersion: 2, demos: [] },
    manifest([{ ...demo, slug: '../outside' }]), manifest([demo, demo]),
    manifest([{ ...demo, kind: 'report' }]),
    manifest([{ ...demo, source: { ...demo.source, commit: 'main' } }]),
    manifest([{ ...demo, source: { ...demo.source, directory: '../outside' } }]),
    manifest([{ ...demo, source: { ...demo.source, repository: 'example/wrong' } }]),
    manifest([{ ...demo, source: { ...demo.source, repository: 'microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots' } }]),
    manifest([{ ...demo, slug: 'valuelens', solution: 'valuelens', source: { ...demo.source, repository: 'Keithland89/AI-in-One-Dashboard' } }]),
    manifest([{ ...demo, build: {} }]),
    manifest([{ ...demo, safety: { ...demo.safety, noLiveServices: false } }]),
    manifest([{ ...finops, webAssembly: 'true' }]),
  ]) assert.throws(() => validateManifest(invalid))
})

test('isolation precedes scripts and allows only same-origin fixture connections', () => {
  const html = protectHtml('<html><HEAD><script src="./app.js"></script></HEAD></html>', 'index.html')
  assert.ok(html.indexOf('Content-Security-Policy') < html.indexOf('<script'))
  for (const rule of ["connect-src 'self'", "form-action 'none'", "frame-src 'none'"]) {
    assert.ok(html.includes(rule))
  }
  assert.equal(html.match(/connect-src ([^;]+)/)?.[1], "'self'")
  assert.ok(html.includes('rel="icon" href="data:image/svg+xml,'))
  const existingIcon = protectHtml('<html><head><link rel="icon" href="./favicon.svg"></head></html>', 'index.html')
  assert.equal((existingIcon.match(/rel="icon"/g) ?? []).length, 1)
  assert.ok(existingIcon.includes('href="./favicon.svg"'))
  assert.throws(() => protectHtml('<script></script>', 'index.html'))
})

test('only demos that declare WebAssembly may compile it', () => {
  const scriptSrc = (html) => html.match(/script-src ([^;]+)/)?.[1]
  assert.equal(scriptSrc(protectHtml('<head></head>', 'index.html')), "'self' 'unsafe-inline'")
  const wasm = protectHtml('<head></head>', 'index.html', { webAssembly: true })
  assert.equal(scriptSrc(wasm), "'self' 'wasm-unsafe-eval' 'unsafe-inline'")
  assert.ok(!wasm.includes("'unsafe-eval'"))
  assert.equal(wasm.replace(" 'wasm-unsafe-eval'", ''), protectHtml('<head></head>', 'index.html'))
})

test('published bundles match their declared checksum manifests', async () => {
  const root = fileURLToPath(new URL('..', import.meta.url))
  const published = JSON.parse(await readFile(path.join(root, 'demos', 'manifest.json'), 'utf8'))
  for (const entry of published.demos.filter((item) => item.build.checksumManifest)) {
    const dir = path.join(root, 'demos', 'builds', entry.slug)
    const sums = await readFile(path.join(dir, entry.build.checksumManifest))
    assert.equal(sha256(sums), entry.build.checksumManifestSha256, entry.slug)
    for (const line of sums.toString('utf8').trim().split('\n')) {
      const [, hash, file] = line.match(/^([a-f0-9]{64})  (.+)$/) ?? assert.fail(`${entry.slug}: ${line}`)
      assert.equal(sha256(await readFile(path.join(dir, file))), hash, `${entry.slug}/${file}`)
    }
  }
})

test('Business impact preview has a clean pinned source and keeps the existing demo separate', async () => {
  const root = fileURLToPath(new URL('..', import.meta.url))
  const published = JSON.parse(await readFile(path.join(root, 'demos', 'manifest.json'), 'utf8'))
  const preview = published.demos.find((entry) => entry.slug === 'datahub-business-impact')
  const existing = published.demos.find((entry) => entry.slug === 'copilot-datahub')
  assert.ok(preview && existing)
  const directory = path.join(root, 'demos', 'builds', preview.slug)
  const provenance = JSON.parse(await readFile(path.join(directory, 'SOURCE_PROVENANCE.json'), 'utf8'))
  assert.equal(provenance.sourceRevision, preview.source.commit)
  assert.equal(provenance.sourceDirty, false)
  assert.equal(provenance.variant, 'business-impact-review')
  for (const file of ['index.html', 'demo.html']) {
    const html = await readFile(path.join(directory, file), 'utf8')
    assert.match(html, /name="robots" content="noindex, nofollow, noarchive"/)
    assert.match(html, /if \(!location.hash\).*#\/business-impact\/impact-summary/)
  }
})

async function fixture(t, demos) {
  const root = await mkdtemp(path.join(tmpdir(), 'datalab-demo-test-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(path.join(root, 'demos'))
  await writeFile(path.join(root, 'demos', 'manifest.json'), JSON.stringify(manifest(demos)))
  return root
}

test('empty manifest creates no demo entry point', async (t) => {
  const root = await fixture(t, [])
  await stageDemos(root)
  assert.deepEqual(JSON.parse(await readFile(path.join(root, 'dist', 'demo', 'provenance.json'), 'utf8')), manifest())
  await assert.rejects(readFile(path.join(root, 'dist', 'demo', demo.slug, 'index.html')), { code: 'ENOENT' })
})

test('copies nested assets, protects all HTML and retains provenance', async (t) => {
  const root = await fixture(t, [demo])
  const source = path.join(root, 'demos', 'builds', demo.slug)
  await mkdir(path.join(source, 'assets'), { recursive: true })
  for (const file of ['index.html', 'detail.html']) {
    await writeFile(path.join(source, file), '<html><head></head><body>Invented data</body></html>')
  }
  await writeFile(path.join(source, 'assets', 'app.js'), 'console.log("demo")')
  await stageDemos(root)
  const output = path.join(root, 'dist', 'demo', demo.slug)
  for (const file of ['index.html', 'detail.html']) {
    assert.match(await readFile(path.join(output, file), 'utf8'), /Content-Security-Policy/)
  }
  assert.equal(await readFile(path.join(output, 'assets', 'app.js'), 'utf8'), 'console.log("demo")')
  assert.deepEqual(JSON.parse(await readFile(path.join(root, 'dist', 'demo', 'provenance.json'), 'utf8')), manifest([demo]))
})

test('missing bundle or entry point fails publication', async (t) => {
  const root = await fixture(t, [demo])
  await assert.rejects(stageDemos(root), { code: 'ENOENT' })
  await mkdir(path.join(root, 'demos', 'builds', demo.slug), { recursive: true })
  await assert.rejects(stageDemos(root), /missing index.html/)
})
