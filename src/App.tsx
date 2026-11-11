import { useEffect, useId, useRef, useState } from 'react'
import { Platform } from './Platform'
import { SignalField } from './SignalField'
import { byId, componentLabels, dataHubOverviewVideo, dataSourceCategories, dataSourceReference, dataSources, hub, log, ordered, parts, related, solutions, steps, type HostedVideo, type Solution } from './data'
import { insightBySlug, insights, keith, loadPost, shailendra, topics, type Insight, type PostBody, type Topic } from './insights'
import { formatDay, relative, useLiveRepoStats, type Live } from './live'
import { solutionDemos } from './demos'
import { externalSetup, setupHref, setups } from './setup'

const sections = [
  { id: 'demos', label: 'Browser demos' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'which-one', label: 'Which one do I need?' },
  { id: 'get-started', label: 'Get started' },
  { id: 'installer', label: 'DataHub App installer' },
  { id: 'installer-apis', label: 'Data sources' },
  { id: 'whats-new', label: 'What’s new' },
] as const

const count = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][parts.length] ?? String(parts.length)

function useRoute() {
  const get = () => window.location.hash.replace(/^#/, '')
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const on = () => {
      const r = get()
      setRoute(r)
      if (r.startsWith('/')) window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export default function App() {
  const route = useRoute()
  const live = useLiveRepoStats()
  // Old links to the hub's previous name still land on it.
  const detail = route.startsWith('/s/') ? byId(['analytics-hub', 'analytics-hub-app'].includes(route.slice(3)) ? hub.id : route.slice(3)) : undefined

  const setupFor = route.startsWith('/setup/') && setups[route.slice(7)] ? byId(route.slice(7)) : undefined
  const page = route === '/insights' || route === '/about' ? route : undefined
  const post = route.startsWith('/insights/') ? insightBySlug(route.slice(10)) : undefined
  const explainerFor = solutions.find((s) => s.explainer?.route === route)

  useEffect(() => {
    document.title = explainerFor
      ? `${explainerFor.name} explainer | Copilot-DataLab`
      : detail
      ? `${detail.name}${detail.tagline ? ` ${detail.tagline}` : ''} | Copilot-DataLab`
      : setupFor
        ? `Set up ${setupFor.name} | Copilot-DataLab`
        : post
        ? `${post.title} | Copilot-DataLab`
        : page === '/insights'
          ? 'Insights | Copilot-DataLab'
          : page === '/about'
            ? 'About Keith McGrane | Copilot-DataLab'
            : 'Copilot-DataLab: Copilot and agent analytics you run in your own tenant'
  }, [detail, setupFor, page, post, explainerFor])

  // Section links (#solutions) scroll within the home page; if we're on a
  // detail page, render home first and then scroll.
  useEffect(() => {
    if (!detail && route && !route.startsWith('/')) {
      document.getElementById(route)?.scrollIntoView()
    }
  }, [detail, route])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header current={post ? '/insights' : page} />
      <main id="main" tabIndex={-1}>
        {explainerFor?.explainer ? (
          <ExplainerPage key={explainerFor.id} s={explainerFor} explainer={explainerFor.explainer} />
        ) : detail ? (
          <SolutionPage s={detail} live={live} />
        ) : setupFor ? (
          <SetupPage s={setupFor} />
        ) : post ? (
          <ArticlePage key={post.slug} post={post} />
        ) : page === '/insights' ? (
          <InsightsPage />
        ) : page === '/about' ? (
          <AboutPage />
        ) : (
          <Home live={live} />
        )}
      </main>
      <Footer />
    </>
  )
}

// The mark: the L of Lab drawn as a chart's axes, cut like a Cobalt key,
// holding one plotted point exactly as the field map draws it.
function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <circle className="logo-halo" cx="20" cy="12" r="9" />
      <path className="logo-axes" d="M3 6 6 3H9V23H29V26L26 29H3Z" />
      <circle className="logo-point" cx="20" cy="12" r="5" />
    </svg>
  )
}

function Header({ current }: { current?: string }) {
  const here = (r: string) => (current === r ? 'page' : undefined)
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a className="brand" href="#">
          <Logo />
          <span>Copilot-DataLab</span>
        </a>
        <nav aria-label="Site">
          <a href="#demos">Browser demos</a>
          <a href="#solutions">Solutions</a>
          <a className="nav-section" href="#which-one">Which one?</a>
          <a className="nav-section" href="#get-started">Get started</a>
          <a href="#/insights" aria-current={here('/insights')}>Insights</a>
          <a href="#/about" aria-current={here('/about')}>About</a>
          <a className="key key-sm gh" href="https://github.com/ai-datalab" target="_blank" rel="noreferrer">
            <GitHubIcon /> <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

function Home({ live }: { live: Live }) {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <h1 className="hero-heading">Copilot, agent and Cowork analytics, in your tenant.</h1>
          <div className="hero-shot" data-ui="screen">
            <p className="hero-shot-title">
              <span className="kind kind-platform">The platform</span> {hub.name} {hub.tagline}
            </p>
            <VideoPlayer video={dataHubOverviewVideo} poster={hub.preview.src} hero />
          </div>
          <div className="opening">
            <p className="lede">Open-source apps and reports, one per question, joined up in {hub.name} {hub.tagline}. The tools are flexible, adaptable starting points. Many can be tailored to your organisation’s needs; customisation and deployment options vary by product.</p>
            <div className="cta-row">
              <a className="key key-primary" href="#demos">Try the browser demos</a>
              <a className="key" href="#solutions">Browse the solutions</a>
              <a className="key" href="#which-one">Find the right one</a>
            </div>
            <p className="muted">Invented sample data. No sign-in or installation.</p>
          </div>
          <ul className="facts">
            <li><strong>Free and open source.</strong> You pay only for the Fabric, Azure or Power Platform capacity it runs on.</li>
            <li><strong>Your data stays put.</strong> Everything reads from, and stays in, your own tenant.</li>
            <li><strong>An app or a report.</strong> Most come as an app for leaders and a Power BI report for analysts.</li>
          </ul>
        </div>
      </section>
      <SectionTabs />
      <BrowserDemos />
      <SolutionsSection live={live} />
      <WhichOne />
      <GetStarted />
      <InstallerSection />
      <DataSourcesSection />
      <WhatsNew live={live} />
    </>
  )
}

function SectionTabs() {
  const [active, setActive] = useState<string>(sections[0].id)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return (
    <nav className="tabs" aria-label="Sections">
      <div className="wrap tabs-row">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Kind({ s }: { s: Solution }) {
  return <span className={`kind ${s.component ? '' : 'kind-platform'}`}>{s.component ? componentLabels[s.component] : 'The platform'}</span>
}

function Stars({ s, live }: { s: Solution; live: Live }) {
  const n = live[s.id]?.stars ?? s.stars
  return (
    <span className="stars" title="GitHub stars">
      <StarIcon /> {n} <span className="sr-only">stars</span>
    </span>
  )
}

function DemoLinks({ id, className }: { id: string; className: string }) {
  return solutionDemos(id).map((demo) => (
    <a key={demo.url} className={className} href={demo.url}>{demo.label}</a>
  ))
}

function SetupLink({ s, className }: { s: { id: string; name: string }; className: string }) {
  const href = setupHref(s.id)
  if (!href) return null
  const external = Boolean(externalSetup[s.id])
  return (
    <a className={className} href={href} aria-label={`Set up ${s.name}${external ? ' (opens its setup site)' : ''}`} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      Set up
    </a>
  )
}

function ExplainerLink({ s, className = 'key' }: { s: Solution; className?: string }) {
  return s.explainer ? <a className={className} href={`#${s.explainer.route}`}>Explainer</a> : null
}

function BrowserDemos() {
  const available = [...ordered, { id: 'agent-evaluator', name: 'Agent Evaluator' }]
    .filter((s) => solutionDemos(s.id).length > 0)
  return (
    <section id="demos" className="section" aria-labelledby="demos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="demos-title">Try the browser demos</h2>
          <p>Explore clickable dashboards and filters with invented sample data. No sign-in, installation or connection to your tenant. App demos and static browser report ports are labelled separately.</p>
        </div>
        <ul className="demo-directory">
          {available.map((s) => (
            <li key={s.id}>
              <h3>{byId(s.id) ? <a href={`#/s/${s.id}`}>{s.name}</a> : s.name}</h3>
              {s.id === hub.id && <p>{hub.tagline}</p>}
              <div className="demo-actions">
                {solutionDemos(s.id).map((demo) => (
                  <a key={demo.url} className="key" href={demo.url} aria-label={`${s.name}: ${demo.label}`}>{demo.label}</a>
                ))}
                <SetupLink s={s} className="key" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SolutionsSection({ live }: { live: Live }) {
  const [hover, setHover] = useState<string | null>(null)
  const hovered = hover ? byId(hover) : undefined

  return (
    <section id="solutions" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>One platform, {count} components</h2>
          <p>Use {hub.name} for all of it in one app, or start with the one component you need. Each is a public GitHub repo with setup guides and sample data.</p>
        </div>

        <div className="index">
          <article className="sheet sheet-hub" data-id={hub.id}>
            <div className="sheet-name">
              <Kind s={hub} />
              <h3><a href={`#/s/${hub.id}`}>{hub.name}</a></h3>
              <div className="card-meta">
                <Stars s={hub} live={live} />
              </div>
            </div>
            <div className="sheet-body">
              <p>{hub.tagline}</p>
              <p className="summary">{hub.summary}</p>
              <p className="includes">
                Includes <a href="#/s/valuelens">ValueLens</a>, <a href="#/s/agent-monitor">Agent Monitor</a> and, as an add-on, <a href="#/s/consumption-central">Consumption Central</a>. <a href="#/s/github-copilot-panel">GitHub Copilot Panel</a> isn’t in it yet.
              </p>
              <RunsAs list={hub.runsAs} />
              <div className="card-actions">
                <a className="key key-primary" href={`#/s/${hub.id}`}>See what’s inside</a>
                <DemoLinks id={hub.id} className="key" />
                <SetupLink s={hub} className="key" />
                <ExplainerLink s={hub} />
                <a className="key" href={`https://github.com/${hub.repo}`} target="_blank" rel="noreferrer">Open the repo</a>
              </div>
            </div>
            <div className="sheet-media">
              <div className="sheet-map cut" data-ui="report">
                <Platform active={hover} onActive={setHover} meta={(s) => <Stars s={s} live={live} />} />
                <p className="map-caption" aria-live="polite">
                  {hovered ? (
                    <>
                      <strong>{hovered.name}</strong> answers “{hovered.question}”
                    </>
                  ) : (
                    `${hub.name} on top, its ${count} components below. Each is its own repo. Point at one to see the question it answers.`
                  )}
                </p>
              </div>
            </div>
          </article>
          <ul className="tiles">
            {parts.map((s) => (
              <li key={s.id} className="tile">
                <a className="tile-shot" href={`#/s/${s.id}`} tabIndex={-1} aria-hidden="true">
                  <img src={s.preview.src} alt="" loading="lazy" />
                </a>
                <Kind s={s} />
                <h3><a href={`#/s/${s.id}`}>{s.name}</a></h3>
                <p className="tile-question">{s.question}</p>
                <div className="demo-actions">
                  <DemoLinks id={s.id} className="key key-sm" />
                  <SetupLink s={s} className="key key-sm" />
                  <ExplainerLink s={s} className="key key-sm" />
                </div>
                <div className="tile-links">
                  <a className="text-link" href={`#/s/${s.id}`}>Details</a>
                  <a className="text-link" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">Repo</a>
                  <Stars s={s} live={live} />
                </div>
              </li>
            ))}
          </ul>
          <p className="index-note">Every screen runs on sample data. Every name shown is invented.</p>
          {solutionDemos('agent-evaluator').length > 0 && (
            <p className="index-note">
              Agent Evaluator for Copilot Studio: <DemoLinks id="agent-evaluator" className="text-link" />{' '}
              (static browser report, invented data, no sign-in).{' '}
              <a href="https://github.com/microsoft/AgentEvaluator-for-Copilot-Studio" target="_blank" rel="noreferrer">Source repository</a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function RunsAs({ list, hideLabel = false }: { list: string[]; hideLabel?: boolean }) {
  return (
    <dl className="runs-as">
      <dt className={hideLabel ? 'sr-only' : undefined}>Runs as</dt>
      {list.map((r) => <dd key={r}>{r}</dd>)}
    </dl>
  )
}

function WhichOne() {
  const list = [...parts, hub]
  const [pick, setPick] = useState(list[0].id)
  const s = byId(pick)!
  return (
    <section id="which-one" className="section band">
      <div className="wrap">
        <div className="section-head">
          <h2>Which one do I need?</h2>
          <p>Start from the question your leaders are asking.</p>
        </div>
      </div>
      <SignalField active={pick} />
      <div className="wrap">
        <div className="picker">
          <fieldset>
            <legend className="sr-only">Pick a question</legend>
            {list.map((q) => (
              <label key={q.id} className={pick === q.id ? 'is-picked' : ''}>
                <input type="radio" name="question" value={q.id} checked={pick === q.id} onChange={() => setPick(q.id)} />
                <span>{q.question}</span>
              </label>
            ))}
          </fieldset>
          <div className="answer cut" aria-live="polite">
            <Kind s={s} />
            <h3>Use {s.name}</h3>
            <p>{s.summary}</p>
            <ul className="plotted">
              {s.measures.slice(0, 3).map((m) => <li key={m}>{m}</li>)}
            </ul>
            <a className="key key-primary" href={`#/s/${s.id}`}>Open {s.name}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsNew({ live }: { live: Live }) {
  const hasLive = ordered.every((s) => live[s.id]?.pushedAt)
  return (
    <section id="whats-new" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>What’s new</h2>
          <p>Recent changes across the repos.</p>
        </div>
        <div className="news">
        <div className="news-log">
        <ol className="log">
          {log.slice(0, 5).map((e) => {
            const s = byId(e.solution)!
            return (
              <li key={e.url}>
                <time dateTime={e.date}>{formatDay(e.date)}</time>
                <a className="log-tag" href={`#/s/${s.id}`}>{s.name}</a>
                <a className="log-text" href={e.url} target="_blank" rel="noreferrer">{e.text}</a>
              </li>
            )
          })}
        </ol>
        {hasLive && (
          <p className="pulse">
            Last pushed:{' '}
            {ordered.map((s, i) => (
              <span key={s.id}>
                {s.name} {relative(live[s.id]?.pushedAt)}
                {i < ordered.length - 1 ? '; ' : '.'}
              </span>
            ))}
          </p>
        )}
        </div>
        <aside className="news-related" aria-labelledby="related">
          <h3 id="related">Related</h3>
          <ul className="related">
            {related.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  <span className="related-by">{r.by}</span>
                  <span className="related-title">{r.title}</span>
                  <span className="related-desc">{r.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
        </div>
      </div>
    </section>
  )
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((m) => (
        <li key={m}>
          <label>
            <input type="checkbox" />
            <span>{m}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

// Four steps in one line; each solution's own page carries its setup list, videos and installer.
function GetStarted() {
  return (
    <section id="get-started" className="section section-tint">
      <div className="wrap">
        <div className="section-head">
          <h2>Get started</h2>
          <p>Admin approvals usually take the longest, so ask for them early.</p>
        </div>
        <ol className="steps">
          {steps.map((st, i) => (
            <li key={st.title}>
              <span className="step-n" aria-hidden="true">{i + 1}</span>
              <h3>{i === 0 ? <a href="#which-one">{st.title}</a> : st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function InstallerSection() {
  const repo = `https://github.com/${hub.repo}`
  return (
    <section id="installer" className="section" aria-labelledby="installer-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="installer-title">Install DataHub App in your tenant</h2>
          <p>One guided setup for DataHub App {hub.tagline}, on Microsoft Fabric or Azure. It is not a universal installer for every standalone dashboard.</p>
        </div>
        <ol className="steps">
          <li>
            <span className="step-n" aria-hidden="true">1</span>
            <h3>Choose Fabric or Azure</h3>
            <p>Run the Windows installer and choose where DataHub App will live. Your data stays in your tenant.</p>
          </li>
          <li>
            <span className="step-n" aria-hidden="true">2</span>
            <h3>Check prerequisites</h3>
            <p>Line up capacity, Power BI licensing and the admin approvals needed for your chosen target and modules.</p>
          </li>
          <li>
            <span className="step-n" aria-hidden="true">3</span>
            <h3>Review before deploying</h3>
            <p>Sign in, choose the supported modules and review the deployment plan, access grants and costs before approving.</p>
          </li>
          <li>
            <span className="step-n" aria-hidden="true">4</span>
            <h3>Load, check and maintain</h3>
            <p>The installer loads the first data and checks the setup. Use its documented refresh, repair and update paths afterwards.</p>
          </li>
        </ol>
        <p className="muted installer-note">The installer is free; Fabric or Azure resources and required licences can incur charges. Standalone apps and reports retain their own setup instructions.</p>
        <div className="cta-row">
          <a className="key key-primary" href={`${repo}/releases/latest`} target="_blank" rel="noreferrer">Get the DataHub App installer</a>
          <a className="key" href={`${repo}/blob/main/installer/README.md`} target="_blank" rel="noreferrer">Read the installer guide</a>
          <a className="key" href={`${repo}/blob/main/docs/PREREQUISITES.md`} target="_blank" rel="noreferrer">Check prerequisites</a>
          <a className="key" href="#installer-apis">Explore data sources</a>
        </div>
        <div className="installer-video-guide">
          <h3>Installer walkthroughs</h3>
          <p>
            Each walkthrough is on its solution's setup page:{' '}
            {ordered.filter((s) => s.installerVideo && setups[s.id]).map((s, i, list) => (
              <span key={s.id}>
                {i > 0 && (i === list.length - 1 ? ' and ' : ', ')}
                <a href={`#/setup/${s.id}`}>{s.name}</a>
              </span>
            ))}
            .
          </p>
        </div>
      </div>
    </section>
  )
}

function VideoPlayer({ video, poster, hero = false }: { video: HostedVideo; poster: string; hero?: boolean }) {
  const captionId = useId()
  const [failed, setFailed] = useState(false)
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pendingSeek = useRef<number | null>(null)
  const seek = (time: number) => {
    const player = videoRef.current
    if (!player) {
      setFailed(true)
      return
    }
    if (player.readyState === 0) {
      pendingSeek.current = time
      player.load()
    } else {
      player.currentTime = time
    }
    player.focus()
  }
  const onLoadedMetadata = () => {
    if (pendingSeek.current !== null && videoRef.current) {
      videoRef.current.currentTime = pendingSeek.current
      pendingSeek.current = null
    }
  }
  const play = () => {
    const player = videoRef.current
    if (!player) {
      setFailed(true)
      return
    }
    player.focus()
    void player.play().catch(() => setFailed(true))
  }
  return (
    <figure className={`video-player${hero ? ' video-player-hero' : ''}`}>
      <div className="video-frame">
        <video ref={videoRef} width="1920" height="1080" controls playsInline preload="none" crossOrigin={video.captions ? 'anonymous' : undefined} poster={video.poster ?? poster} aria-label={video.label} aria-describedby={captionId} onLoadedMetadata={onLoadedMetadata} onPlay={() => setStarted(true)} onEnded={() => setStarted(false)} onError={() => setFailed(true)}>
          <source src={video.url} type="video/mp4" onError={() => setFailed(true)} />
          {video.captions && <track kind="captions" src={video.captions} srcLang="en-GB" label="English captions" default />}
          Your browser does not support embedded video. Use the video link below.
        </video>
        {hero && !started && (
          <button type="button" className="video-play" onClick={play} aria-label={`Play ${video.label}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 4.5v15l12-7.5Z" /></svg>
          </button>
        )}
      </div>
      <figcaption id={captionId}>
        {hero ? <p>AI narration · Synthetic demo data</p> : (
          <>
            <p><strong>{video.label}</strong>{video.length && ` (${video.length})`}</p>
            <p>{video.disclosure}</p>
          </>
        )}
        {failed && <p role="status">The video could not load here. Try opening the video directly.</p>}
        <span className="video-links">
          <a href={video.url} target="_blank" rel="noreferrer">Open the video</a>
          {video.transcript && <a href={video.transcript} target="_blank" rel="noreferrer">Read the transcript</a>}
        </span>
      </figcaption>
      {video.chapters && (
        <details className="video-chapters">
          <summary>Chapters</summary>
          <ol>
            {video.chapters.map((chapter) => (
              <li key={chapter.time}>
                <button type="button" onClick={() => seek(chapter.time)}>
                  <span>{Math.floor(chapter.time / 60)}:{String(Math.floor(chapter.time % 60)).padStart(2, '0')}</span>
                  {chapter.label}
                </button>
              </li>
            ))}
          </ol>
        </details>
      )}
    </figure>
  )
}

function ExplainerPage({ s, explainer }: { s: Solution; explainer: NonNullable<Solution['explainer']> }) {
  const powerBiVideo = s.powerBiExplainer
  const [powerBiOpen, setPowerBiOpen] = useState(false)
  return (
    <article className="detail watch-page">
      <div className="wrap">
        <a className="back" href={`#/s/${s.id}`}>{s.name}</a>
        <h1>{s.name} explainer</h1>
        {powerBiVideo && <h2 className="watch-player-title">The app</h2>}
        <VideoPlayer video={explainer.video} poster={s.preview.src} />
        <p className="watch-note">{explainer.note}</p>
        {powerBiVideo && (
          <details className="watch-alternate" onToggle={(event) => setPowerBiOpen(event.currentTarget.open)}>
            <summary>Power BI version · {powerBiVideo.length}</summary>
            {powerBiOpen && (
              <section id="powerbi-explainer" aria-labelledby="powerbi-explainer-title">
                <h2 className="watch-player-title" id="powerbi-explainer-title">Power BI · short tour</h2>
                <VideoPlayer video={powerBiVideo} poster={s.preview.src} />
              </section>
            )}
          </details>
        )}
      </div>
    </article>
  )
}

function DataSourcesSection() {
  return (
    <section id="installer-apis" className="section section-tint" aria-labelledby="data-sources-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="data-sources-title">Data sources for DataHub App</h2>
          <p>Public APIs can bring this data into DataHub App. Sources depend on your setup, licences and permissions.</p>
        </div>
        <ul className="data-source-grid">
          {dataSources.map((source) => (
            <li className={`data-source-card data-source-card--${source.category}`} key={source.name}>
              <div className="data-source-content">
                <p className="data-source-category">{dataSourceCategories[source.category]}</p>
                <h3>{source.name}</h3>
                <p className="data-source-description">{source.description}</p>
                {source.availability && <p className="data-source-availability">{source.availability}</p>}
              </div>
              <ul className="data-source-links">
                {source.links.map((link) => (
                  <li key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="data-source-footnote">File exports and dataflow sources are not listed here. <a href={`${dataSourceReference}/docs/PERMISSIONS.md`} target="_blank" rel="noreferrer">See source requirements and permissions</a>.</p>
      </div>
    </section>
  )
}

function SolutionPage({ s, live }: { s: Solution; live: Live }) {
  const pairs = s.component
    ? [...(s.includes ?? []), ...(s.related ?? [])].map((id) => byId(id)).filter((p): p is Solution => Boolean(p))
    : parts
  return (
    <article className="detail">
      <div className="wrap">
        <a className="back" href="#solutions">All solutions</a>
        <div className="detail-head">
          <Kind s={s} />
          <h1>{s.name}</h1>
          {s.tagline && <p>{s.tagline}</p>}
          <p className="lede">{s.summary}</p>
          <div className="card-meta">
            <Stars s={s} live={live} />
            {live[s.id]?.pushedAt && <span className="muted">Updated {relative(live[s.id]?.pushedAt)}</span>}
          </div>
          <div className="cta-row">
            <DemoLinks id={s.id} className="key" />
            <SetupLink s={s} className="key" />
            <ExplainerLink s={s} />
            <a className="key key-primary" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">
              <GitHubIcon /> Open the repo
            </a>
            {s.tryFirst && (
              <a className="key" href={s.tryFirst.url} target="_blank" rel="noreferrer">{s.tryFirst.label}</a>
            )}
          </div>
        </div>
        {s.overviewVideo && (
          <section className="detail-walkthrough detail-overview" aria-label={`${s.name} overview video`}>
            <VideoPlayer key={s.overviewVideo.url} video={s.overviewVideo} poster={s.preview.src} />
          </section>
        )}
        <figure className="detail-media">
          <span className="shot">
            <img src={s.preview.src} alt={s.preview.alt} />
          </span>
          <figcaption>Sample data. Every name shown is invented.</figcaption>
        </figure>
        <div className="detail-grid">
          <section>
            <h2>What it shows</h2>
            <ul className="plotted">{s.measures.map((m) => <li key={m}>{m}</li>)}</ul>
          </section>
          <section>
            <h2>Before you start</h2>
            <Checklist key={s.id} items={s.beforeYouStart} />
            <p className="muted">The README has the full list, by who does what.</p>
          </section>
          <section>
            <h2>Runs as</h2>
            <RunsAs list={s.runsAs} hideLabel />
            {s.videos.length > 0 && (
              <>
                <h2 className="spaced">Videos</h2>
                <ul className="videos">
                  {s.videos.map((v) => (
                    <li key={v.url}>
                      <a href={v.url} target="_blank" rel="noreferrer">{v.label}</a>
                      {v.length && <span className="muted"> ({v.length})</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
        {pairs.length > 0 && (
          <section className={`pairs ${s.component ? '' : 'pairs-parts'}`}>
            <h2>{s.component ? 'Pairs with' : 'The components'}</h2>
            <ul>
              {pairs.map((p) => (
                <li key={p.id} className="cut">
                  <a href={`#/s/${p.id}`}>
                    <Kind s={p} />
                    <strong>{p.name}</strong>
                    {!s.component && p.notInHub && <span className="not-in-hub">Not in {s.name} yet</span>}
                    <span>{p.question}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  )
}

const day = (iso: string) => formatDay(`${iso}T12:00:00`)

// One template for every solution: walkthrough, three steps, then the repo's own guides.
function SetupPage({ s }: { s: Solution }) {
  const setup = setups[s.id]
  const guidePage = decodeURIComponent(setup.guide.replace(/^https:\/\/github\.com\/[^/]+\/[^/]+(\/blob\/main\/)?/, '').replace(/#.*/, '')) || 'README'
  return (
    <article className="detail setup">
      <div className="wrap">
        <a className="back" href={`#/s/${s.id}`}>{s.name}</a>
        <div className="detail-head">
          <Kind s={s} />
          <h1>Set up {s.name}</h1>
          {s.tagline && <p>{s.tagline}</p>}
        </div>
        {s.installerVideo && (
          <section className="detail-walkthrough" aria-label={`${s.name} installer video`}>
            <VideoPlayer key={s.installerVideo.url} video={s.installerVideo} poster={s.preview.src} />
          </section>
        )}
        <ol className="steps setup-steps">
          {setup.steps.map((st, i) => (
            <li key={st.title}>
              <span className="step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h2>{st.title}</h2>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
        <div className="cta-row">
          <a className="key key-primary" href={setup.guide} target="_blank" rel="noreferrer">Full setup guide</a>
          <DemoLinks id={s.id} className="key" />
          <a className="key" href={setup.downloads.url} target="_blank" rel="noreferrer">{setup.downloads.label}</a>
        </div>
        <div className="detail-grid setup-grid">
          <section>
            <h2>Before you start</h2>
            <Checklist key={s.id} items={s.beforeYouStart} />
          </section>
          <section>
            <h2>More from the repo</h2>
            <ul className="videos">
              {setup.links.map((l) => (
                <li key={l.url}><a href={l.url} target="_blank" rel="noreferrer">{l.label}</a></li>
              ))}
            </ul>
          </section>
        </div>
        <p className="muted setup-source">Steps summarised from <a href={setup.guide} target="_blank" rel="noreferrer">{guidePage}</a> on main.</p>
      </div>
    </article>
  )
}

// "Title: the rest" sets the short title large and the rest below it.
function Title({ text }: { text: string }) {
  const at = text.indexOf(': ')
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="title-rest">{text.slice(at + 2)}</span>
    </>
  )
}

function Byline({ authors }: { authors: Insight['authors'] }) {
  return (
    <p className="insight-by">
      By{' '}
      {authors.map((a, i) => (
        <span key={a.name}>
          {i > 0 && ' and '}
          <a href={a.url} target="_blank" rel="noreferrer">{a.name}</a>
        </span>
      ))}
    </p>
  )
}

function Meta({ i }: { i: Insight }) {
  return (
    <p className="insight-meta">
      <span className="insight-topic">{i.topic}</span>
      <time dateTime={i.date}>{day(i.date)}</time>
      <span>{i.minutes} min read</span>
    </p>
  )
}

// One column of plotted points per value; the top point of each is the site's mark.
function Cover({ values }: { values: number[] }) {
  const rows = 8
  const w = 120
  const h = rows * 12
  const max = Math.max(...values)
  const gap = w / values.length
  return (
    <svg className="cover" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {values.map((v, c) => {
        const n = Math.max(1, Math.round((v / max) * rows))
        const x = gap * (c + 0.5)
        return (
          <g key={c}>
            {Array.from({ length: n - 1 }, (_, r) => (
              <circle key={r} className="cover-dot" cx={x} cy={h - 6 - r * 12} r={2} />
            ))}
            <circle className="cover-halo" cx={x} cy={h - 6 - (n - 1) * 12} r={5.5} />
            <circle className="cover-top" cx={x} cy={h - 6 - (n - 1) * 12} r={2.6} />
          </g>
        )
      })}
    </svg>
  )
}

function InsightsPage() {
  const [topic, setTopic] = useState<Topic | 'all'>('all')
  const shown = topic === 'all' ? insights : insights.filter((i) => i.topic === topic)
  const [lead, ...rest] = shown
  const filters: { id: Topic | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: insights.length },
    ...topics.map((t) => ({ id: t, label: t, count: insights.filter((i) => i.topic === t).length })),
  ]
  return (
    <article className="detail">
      <div className="wrap">
        <a className="back" href="#">Home</a>
        <header className="page-head">
          <h1>Insights</h1>
          <p className="lede">Notes on measuring AI adoption, value and licence decisions.</p>
        </header>
        <div className="filters" role="group" aria-label="Filter by topic">
          {filters.map((f) => (
            <button key={f.id} type="button" aria-pressed={topic === f.id} onClick={() => setTopic(f.id)}>
              {f.label} <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {lead && (
            <section className="insight-lead" aria-label="Latest">
              <div className="insight-lead-text">
                <h2>
                  <a href={`#/insights/${lead.slug}`}><Title text={lead.title} /></a>
                </h2>
                <p className="lede">{lead.summary}</p>
                <Meta i={lead} />
                <Byline authors={lead.authors} />
              </div>
              <Cover values={lead.cover} />
            </section>
          )}
          {rest.length > 0 && (
            <ol className="insights">
              {rest.map((i) => (
                <li key={i.slug}>
                  <Meta i={i} />
                  <div>
                    <h2>
                      <a href={`#/insights/${i.slug}`}>{i.title}</a>
                    </h2>
                    <p>{i.summary}</p>
                    <Byline authors={i.authors} />
                  </div>
                  <Cover values={i.cover} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </article>
  )
}

function ArticlePage({ post }: { post: Insight }) {
  const [body, setBody] = useState<PostBody | null>()
  useEffect(() => {
    let current = true
    loadPost(post.slug).then((b) => current && setBody(b ?? null))
    return () => {
      current = false
    }
  }, [post.slug])
  const at = insights.indexOf(post)
  const newer = insights[at - 1]
  const older = insights[at + 1]
  // Hash routing owns the URL fragment, so contents links scroll instead of navigating.
  const jump = (id: string) => (e: { preventDefault(): void }) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <article className="detail article">
      <div className="wrap">
        <a className="back" href="#/insights">Insights</a>
        <header className="article-head">
          <h1><Title text={post.title} /></h1>
          <p className="lede">{post.summary}</p>
          <div className="article-by">
            <Byline authors={post.authors} />
            <Meta i={post} />
          </div>
        </header>
        <div className="article-grid">
          <aside className="article-aside">
            {body && body.contents.length > 2 && (
              <nav aria-label="On this page">
                <h2>On this page</h2>
                <ol>
                  {body.contents.map((c) => (
                    <li key={c.id}>
                      <a href={`#/insights/${post.slug}`} onClick={jump(c.id)}>{c.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>
          {body ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: body.html }} />
          ) : (
            <p className="prose muted">{body === null ? 'This post isn’t available.' : 'Loading the post…'}</p>
          )}
        </div>
        <nav className="article-more" aria-label="More insights">
          {newer && (
            <a href={`#/insights/${newer.slug}`}>
              <span>Newer</span>
              <strong>{newer.title}</strong>
            </a>
          )}
          {older && (
            <a className="older" href={`#/insights/${older.slug}`}>
              <span>Older</span>
              <strong>{older.title}</strong>
            </a>
          )}
        </nav>
      </div>
    </article>
  )
}

function AboutPage() {
  return (
    <article className="detail">
      <div className="wrap about">
        <div className="about-side">
          <a className="back" href="#">Home</a>
          <img className="about-photo" src="keith-mcgrane.jpg" alt="Keith McGrane" width="460" height="460" />
        </div>
        <div className="about-body">
          <h1>Keith McGrane</h1>
          <p className="about-role">AI &amp; Data Solutions Specialist</p>
          <p className="about-statement">
            AI transformation isn’t about the technology. It’s about the people and processes that make it work.
          </p>
          <section>
            <h2>Why I do this work</h2>
            <p>
              I’m driven by helping organisations cut through the complexity and hype to find practical, results-driven
              approaches to AI deployment that deliver real-world business impact teams can see and stakeholders can trust.
            </p>
          </section>
          <section>
            <h2>What I build</h2>
            <p>Open templates and an app for measuring Copilot and agents. Each part answers one question.</p>
            <ul className="about-list">
              {[...parts, hub].map((s) => (
                <li key={s.id}>
                  <a href={`#/s/${s.id}`}>{s.name}</a>
                  <span>{s.question}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>What I write</h2>
            <p>
              <a href="#/insights">Insights</a> on measuring adoption and value, written with{' '}
              <a href={shailendra.url} target="_blank" rel="noreferrer">Shailendra Hegde</a>. The latest:
            </p>
            <ul className="about-list about-posts">
              {insights.slice(0, 3).map((i) => (
                <li key={i.slug}>
                  <span>{day(i.date)}</span>
                  <a href={`#/insights/${i.slug}`}>{i.title}</a>
                </li>
              ))}
            </ul>
          </section>
          <div className="cta-row">
            <a className="key key-primary" href={keith.url} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="key" href="https://github.com/Keithland89" target="_blank" rel="noreferrer">
              <GitHubIcon /> Keithland89
            </a>
          </div>
          <p className="muted about-note">
            Views here are my own. They don’t represent Microsoft Corporation or any other organisation.
          </p>
        </div>
      </div>
    </article>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <a className="brand" href="#"><Logo /><span>Copilot-DataLab</span></a>
          <p className="footer-links">
            <a href="#solutions">Solutions</a>
            <a href="#/insights">Insights</a>
            <a href="#/about">About</a>
          </p>
        </div>
        <p className="disclaimer">
          These are community templates, provided as-is. They are not official Microsoft Copilot reports, and they aren’t
          covered by Microsoft support. Report problems as issues in each repo. You own the data you extract.
        </p>
        <p className="footer-credit">
          Made by <a href="#/about">Keith McGrane</a>
          <span aria-hidden="true"> · </span>
          <a href={keith.url} target="_blank" rel="noreferrer">LinkedIn</a>
          <span aria-hidden="true"> · </span>
          <a href="https://github.com/Keithland89" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </div>
    </footer>
  )
}

function GitHubIcon() {
  return (
    <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.070-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.150-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M8 .75l2.2 4.6 5.05.65-3.7 3.5.95 5L8 12.1l-4.5 2.4.95-5L.75 6l5.05-.65L8 .75Z" />
    </svg>
  )
}
