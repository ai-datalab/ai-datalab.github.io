import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { hub } from '../src/data.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const demoDir = path.join(root, 'demos', 'builds', 'copilot-datahub')
const sha256 = (data) => createHash('sha256').update(data).digest('hex')

test('DataHub descriptions include the Cowork tagline', async () => {
  assert.equal(hub.name, 'DataHub App')
  assert.equal(hub.tagline, 'for Microsoft Copilot, Agents, Cowork and Autopilots')
  assert.match(hub.summary, /Cowork readiness/)

  const site = await readFile(path.join(root, 'index.html'), 'utf8')
  assert.match(site, /<title>Copilot-DataHub: Copilot and agent analytics you run in your own tenant<\/title>/)
  assert.match(site, /<meta property="og:site_name" content="Copilot-DataHub" \/>/)
  assert.match(site, /<meta property="og:title" content="Copilot-DataHub: Copilot and agent analytics you run in your own tenant" \/>/)
  for (const pattern of [
    /<meta name="description" content="([^"]+)"/,
    /<meta property="og:description" content="([^"]+)"/,
  ]) {
    assert.ok(site.match(pattern)?.[1].includes(`${hub.name} ${hub.tagline}`))
  }

  const htmlFiles = (await readdir(demoDir)).filter((file) => ['index.html', 'demo.html'].includes(file))
  assert.ok(htmlFiles.includes('index.html'))
  for (const file of htmlFiles) {
    const html = await readFile(path.join(demoDir, file), 'utf8')
    assert.ok(html.match(/<meta name="description" content="([^"]+)"/)?.[1].includes(hub.tagline))
    assert.ok(html.match(/<title>([^<]+)<\/title>/)?.[1].includes(hub.tagline))
  }
})

test('homepage hero headline includes Cowork', async () => {
  const app = await readFile(path.join(root, 'src', 'App.tsx'), 'utf8')
  assert.match(app, /<h1 className="hero-heading">Copilot, agent and Cowork analytics, in your tenant\.<\/h1>/)
  assert.match(app, /'Copilot-DataHub: Copilot and agent analytics you run in your own tenant'/)
  assert.match(app, /<span>Copilot-DataHub<\/span>/)
})

test('DataHub demo checksums match the bundle and manifest', async () => {
  const manifest = JSON.parse(await readFile(path.join(root, 'demos', 'manifest.json'), 'utf8'))
  const demo = manifest.demos.find((item) => item.slug === 'copilot-datahub')
  assert.ok(demo)

  const sums = await readFile(path.join(demoDir, 'SHA256SUMS.txt'))
  assert.equal(sha256(sums), demo.build.checksumManifestSha256)
  for (const line of sums.toString('utf8').trim().split('\n')) {
    const entry = line.match(/^([a-f0-9]{64})  (.+)$/)
    assert.ok(entry, `Invalid checksum entry: ${line}`)
    assert.equal(sha256(await readFile(path.join(demoDir, entry[2]))), entry[1], entry[2])
  }
})
