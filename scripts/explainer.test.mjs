import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { dataHubExplainerRoute, dataHubExplainerVideo, dataHubOverviewVideo } from '../src/data.ts'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('explainer uses the shared watch route and canonical media without replacing the overview', () => {
  assert.equal(dataHubExplainerRoute, '/watch/datahub-explainer')
  assert.equal(dataHubExplainerVideo.url, 'https://raw.githubusercontent.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/main/media/datahub-app-explainer.mp4')
  assert.match(dataHubOverviewVideo.url, /DataHub-App-Overview-OpenMontage-42s\.mp4$/)
  assert.equal(dataHubOverviewVideo.length, '42 s')
  assert.match(dataHubExplainerVideo.disclosure, /AI-generated narration.*Synthetic demo data/)
})

test('all 47 chapters are ordered, finite and within the video', () => {
  const chapters = dataHubExplainerVideo.chapters
  assert.equal(chapters.length, 47)
  assert.equal(chapters[0].time, 0)
  assert.equal(chapters.at(-1).time, 1712.667)
  for (const [index, chapter] of chapters.entries()) {
    assert.ok(Number.isFinite(chapter.time) && chapter.time >= 0 && chapter.time < 1745.5)
    if (index) assert.ok(chapter.time > chapters[index - 1].time)
    assert.ok(chapter.label.length > 0)
    assert.doesNotMatch(chapter.label, /[\u00c2\u00c3\u00e2\ufffd]/)
  }
})

test('local captions and poster are present with valid timing coverage', async () => {
  const captions = await read(`public${dataHubExplainerVideo.captions}`)
  assert.match(captions, /^WEBVTT/)
  const cues = [...captions.matchAll(/(\d\d):(\d\d):(\d\d\.\d{3}) --> (\d\d):(\d\d):(\d\d\.\d{3})/g)]
  assert.ok(cues.length > 200)
  const seconds = (h, m, s) => Number(h) * 3600 + Number(m) * 60 + Number(s)
  let end = 0
  for (const cue of cues) {
    const start = seconds(...cue.slice(1, 4))
    const nextEnd = seconds(...cue.slice(4, 7))
    assert.ok(start >= end && nextEnd > start)
    end = nextEnd
  }
  assert.ok(end > 1740 && end <= 1746)
  const poster = await readFile(new URL(`../public${dataHubExplainerVideo.poster}`, import.meta.url))
  assert.equal(poster.readUInt16BE(), 0xffd8)
})

test('explainer stays in DataHub actions and uses the existing deferred native player', async () => {
  const app = await read('src/App.tsx')
  assert.equal((app.match(/<a className="key" href=\{`#\$\{dataHubExplainerRoute\}`\}>Explainer<\/a>/g) ?? []).length, 2)
  assert.match(app, /s\.id === hub\.id && <a className="key" href=\{`#\$\{dataHubExplainerRoute\}`\}/)
  assert.doesNotMatch(await read('src/index.css'), /\.explainer-link/)
  assert.match(app, /route === dataHubExplainerRoute/)
  assert.match(app, /<details className="video-chapters">/)
  assert.match(app, /controls playsInline preload="none"/)
  assert.doesNotMatch(app, /autoPlay|autoplay/)
  assert.match(app, /<VideoPlayer video=\{dataHubOverviewVideo\} poster=\{hub\.preview\.src\} hero \/>/)
})
