import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { dataHubExplainerRoute, dataHubExplainerVideo, dataHubOverviewVideo, hub, solutions } from '../src/data.ts'

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

test('explainers share secondary buttons and the existing deferred native player', async () => {
  const app = await read('src/App.tsx')
  assert.match(app, /function ExplainerLink\(\{ s, className = 'key' \}/)
  assert.match(app, /s\.explainer \? <a className=\{className\} href=\{`#\$\{s\.explainer\.route\}`\}>Explainer<\/a> : null/)
  assert.match(app, /<ExplainerLink s=\{hub\} \/>/)
  assert.match(app, /<ExplainerLink s=\{s\} className="key key-sm" \/>/)
  assert.match(app, /<ExplainerLink s=\{s\} \/>/)
  assert.doesNotMatch(await read('src/index.css'), /\.explainer-link/)
  assert.match(app, /solutions\.find\(\(s\) => s\.explainer\?\.route === route\)/)
  assert.match(app, /<ExplainerPage key=\{explainerFor\.id\}/)
  assert.match(app, /<details className="video-chapters">/)
  assert.match(app, /controls playsInline preload="none"/)
  assert.doesNotMatch(app, /autoPlay|autoplay/)
  assert.match(app, /<VideoPlayer video=\{dataHubOverviewVideo\} poster=\{hub\.preview\.src\} hero \/>/)
})

test('watch routes are unique and the existing DataHub destination is preserved', () => {
  assert.equal(hub.explainer.route, dataHubExplainerRoute)
  assert.equal(hub.explainer.video, dataHubExplainerVideo)
  const routes = solutions.flatMap((s) => s.explainer ? [s.explainer.route] : [])
  assert.equal(new Set(routes).size, routes.length)
  for (const route of routes) assert.match(route, /^\/watch\/[a-z-]+-explainer$/)
})

test('every registered explainer has captions, poster, ordered chapters and a public media source', async () => {
  for (const solution of solutions) {
    if (!solution.explainer) continue
    const { video, note } = solution.explainer
    const url = new URL(video.url)
    assert.equal(url.protocol, 'https:')
    assert.equal(url.hostname, 'raw.githubusercontent.com')
    assert.ok(url.pathname.startsWith(`/${solution.repo}/`), solution.id)
    assert.ok(url.pathname.endsWith('.mp4'))
    assert.ok(video.label && video.length && video.disclosure && note)
    assert.ok(video.chapters?.length > 0)
    assert.equal(video.chapters[0].time, 0)
    for (const [index, chapter] of video.chapters.entries()) {
      assert.ok(Number.isFinite(chapter.time) && chapter.time >= 0)
      assert.ok(chapter.label.trim())
      if (index) assert.ok(chapter.time > video.chapters[index - 1].time)
    }
    assert.match(video.captions, /^\/media\/[a-zA-Z0-9.-]+\.vtt$/)
    assert.match(video.poster, /^\/media\/[a-zA-Z0-9.-]+\.jpg$/)
    assert.match(await read(`public${video.captions}`), /^WEBVTT/)
    const poster = await readFile(new URL(`../public${video.poster}`, import.meta.url))
    assert.equal(poster.readUInt16BE(), 0xffd8)
  }
})

test('published Power BI tours stay collapsed beneath the unchanged app explainers', async () => {
  const app = await read('src/App.tsx')
  assert.match(app, /const powerBiVideo = s\.powerBiExplainer/)
  assert.doesNotMatch(app, /import\.meta\.env\.DEV \? s\.powerBiExplainer/)
  assert.match(app, /<VideoPlayer video=\{explainer\.video\}/)
  assert.match(app, /<VideoPlayer video=\{powerBiVideo\}/)
  assert.match(app, /Power BI version/)
  assert.match(app, /<h2 className="watch-player-title">The app<\/h2>/)
  assert.match(app, /<h2 className="watch-player-title" id="powerbi-explainer-title">Power BI · short tour<\/h2>/)
  const css = await read('src/index.css')
  assert.match(css, /\.watch-player-title \{ font-size: var\(--text-lg\)/)
  assert.match(css, /\.watch-alternate \{ margin-top: var\(--space-lg\)/)
  assert.ok(app.indexOf('<VideoPlayer video={explainer.video}') < app.indexOf('<details className="watch-alternate"'))
  assert.match(app, /<details className="watch-alternate" onToggle=/)
  assert.match(app, /const \[powerBiOpen, setPowerBiOpen\] = useState\(false\)/)
  assert.match(app, /powerBiOpen && \(/)
  assert.doesNotMatch(app, /<details className="watch-alternate"[^>]*\bopen[=\s>]/)
  const review = solutions.filter((s) => s.powerBiExplainer)
  assert.deepEqual(review.map((s) => s.id), ['valuelens', 'consumption-central'])
  for (const solution of review) {
    const video = solution.powerBiExplainer
    assert.ok(solution.explainer)
    assert.equal(video.url, `https://raw.githubusercontent.com/${solution.repo}/main/media/${solution.id}-powerbi-explainer.mp4`)
    assert.match(video.disclosure, /Demo data.*AI-generated narration/)
    assert.match(video.disclosure, /Caption timing is approximate/)
    assert.match(await read(`public${video.captions}`), /^WEBVTT/)
    const poster = await readFile(new URL(`../public${video.poster}`, import.meta.url))
    assert.equal(poster.readUInt16BE(), 0xffd8)
    assert.equal(video.chapters[0].time, 0)
    for (const [index, chapter] of video.chapters.entries()) {
      assert.ok(Number.isFinite(chapter.time) && chapter.time >= 0 && chapter.time < 180)
      if (index) assert.ok(chapter.time > video.chapters[index - 1].time)
    }
  }
})
