import assert from 'node:assert/strict'
import { test } from 'node:test'
import { dataSourceCategories, dataSourceReference, dataSources } from '../src/data.ts'

test('data source cards are concise and link to public API documentation', () => {
  const names = new Set()
  for (const source of dataSources) {
    assert.ok(source.name && !names.has(source.name), `Duplicate or empty source name: ${source.name}`)
    names.add(source.name)
    assert.ok(Object.hasOwn(dataSourceCategories, source.category), `Unknown category: ${source.category}`)
    assert.ok(source.description && source.description.length <= 120, `Keep ${source.name} concise`)
    assert.ok(source.links.length > 0, `Missing API documentation for ${source.name}`)

    const urls = new Set()
    for (const link of source.links) {
      const url = new URL(link.url)
      assert.equal(url.protocol, 'https:')
      assert.ok(['learn.microsoft.com', 'docs.github.com'].includes(url.hostname), `Non-official API link: ${link.url}`)
      assert.ok(link.label && !urls.has(link.url), `Duplicate or unlabelled API link: ${link.url}`)
      urls.add(link.url)
    }
  }
  assert.match(dataSourceReference, /^https:\/\/github\.com\/microsoft\/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots\/tree\/[a-f0-9]{40}$/)
})

test('catalogue keeps key ingestion paths and their limitations visible', () => {
  const sources = new Map(dataSources.map((source) => [source.name, source]))
  for (const name of [
    'Microsoft 365 usage', 'People & organisation', 'Agent 365 catalogue',
    'Agent & Foundry inventory', 'Copilot Studio conversations', 'Copilot interactions',
    'Sentinel & Defender', 'Discovered cloud apps', 'Copilot Studio credits',
    'Azure AI costs', 'Azure AI usage & pricing', 'GitHub Copilot',
  ]) {
    assert.ok(sources.has(name), `Missing data source: ${name}`)
  }

  assert.match(sources.get('Agent 365 catalogue').availability, /Fabric.*Azure.*export/)
  assert.match(sources.get('GitHub Copilot').availability, /Optional Fabric notebook/)
  assert.ok(sources.get('Copilot interactions').links.some((link) => link.label.includes('beta')))
  assert.ok(sources.get('Copilot Studio credits').links.some((link) => link.label.includes('deprecated')))
})
