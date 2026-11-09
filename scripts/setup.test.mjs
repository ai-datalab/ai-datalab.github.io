import assert from 'node:assert/strict'
import { test } from 'node:test'
import { setups } from '../src/setup.ts'

test('ValueLens and Consumption Central link to their published installer releases', () => {
  for (const [id, repo, tag] of [
    ['valuelens', 'microsoft/ValueLens-for-Microsoft-Copilot', 'valuelens-installer-v0.1.0'],
    ['consumption-central', 'microsoft/ConsumptionCentral-for-Microsoft-Copilot', 'consumption-central-installer-v0.1.0'],
  ]) {
    assert.equal(setups[id].downloads.label, 'Installer downloads')
    assert.equal(setups[id].downloads.url, `https://github.com/${repo}/releases/tag/${tag}`)
  }
})
