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

test('restricted walkthroughs appear beside main-page app demos and on solution pages', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
  const [directory, solutionsSection] = app.split('function BrowserDemos(')[1].split('function SolutionsSection(')
  const tiles = solutionsSection.split('function SolutionPage(')[0]
  const detail = app.split('function SolutionPage(')[1].split('function SetupPage(')[0]
  assert.match(directory, /App demos use invented sample data and need no sign-in/)
  assert.match(directory, /Live Power BI demos require access/)
  assert.match(directory, /<PowerBiDemoLink s=\{byId\(s\.id\)\} className="key" \/>/)
  assert.match(tiles, /<PowerBiDemoLink s=\{s\} className="key key-sm" \/>/)
  assert.match(app, /aria-label=\{`\$\{s\.name\}: Live Power BI demo`\}/)
  assert.match(detail, /href=\{s\.powerBiDemo\} target="_blank" rel="noreferrer">Live Power BI demo/)
  assert.match(app, /Microsoft employees &amp; partners<br \/>Sign-in and access required/)
  assert.match(detail, /Microsoft employees and partners; sign-in and access required\./)
  assert.doesNotMatch(app, /Try the report demo/)
})
