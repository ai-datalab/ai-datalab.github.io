import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { solutions } from '../src/data.ts'

test('live Power BI demos point to the matching walkthroughs only', () => {
  const links = Object.fromEntries(solutions.filter((s) => s.powerBiDemo).map((s) => [s.id, s.powerBiDemo]))
  const base = 'https://microsoft.github.io/Analytics-Hub/demos/#'
  assert.deepEqual(links, {
    'ai-in-one': `${base}ai-in-one`,
    valuelens: `${base}value-lens`,
    'consumption-central': `${base}consumption-central`,
  })
})

test('restricted walkthroughs are shown only on solution pages with an access note', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
  const [before, solutionPage] = app.split('function SolutionPage(')
  const [detail, after] = solutionPage.split('function SetupPage(')
  assert.doesNotMatch(before + after, /powerBiDemo/)
  assert.match(detail, /href=\{s\.powerBiDemo\} target="_blank" rel="noreferrer">Live Power BI demo/)
  assert.match(detail, /Microsoft employees and partners; sign-in and access required\./)
})
