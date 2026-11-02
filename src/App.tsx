import { useEffect, useState } from 'react'
import { Platform } from './Platform'
import { SignalField } from './SignalField'
import { byId, componentLabels, hub, log, ordered, parts, related, steps, type Solution } from './data'
import { insightBySlug, insights, keith, loadPost, shailendra, topics, type Insight, type PostBody, type Topic } from './insights'
import { formatDay, relative, useLiveRepoStats, type Live } from './live'

const sections = [
  { id: 'solutions', label: 'Solutions' },
  { id: 'which-one', label: 'Which one do I need?' },
  { id: 'whats-new', label: 'What’s new' },
  { id: 'get-started', label: 'Get started' },
  { id: 'related', label: 'Related' },
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

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

export default function App() {
  const route = useRoute()
  const live = useLiveRepoStats()
  // Old links to the hub's previous name still land on it.
  const detail = route.startsWith('/s/') ? byId(route.slice(3) === 'analytics-hub' ? hub.id : route.slice(3)) : undefined

  const page = route === '/insights' || route === '/about' ? route : undefined
  const post = route.startsWith('/insights/') ? insightBySlug(route.slice(10)) : undefined

  useEffect(() => {
    document.title = detail
      ? `${detail.name} | Copilot-DataLab`
      : post
        ? `${post.title} | Copilot-DataLab`
        : page === '/insights'
          ? 'Insights | Copilot-DataLab'
          : page === '/about'
            ? 'About Keith McGrane | Copilot-DataLab'
            : 'Copilot-DataLab: Copilot and agent analytics by Keith McGrane'
  }, [detail, page, post])

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
        {detail ? (
          <SolutionPage s={detail} live={live} />
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
        <div className="brand-row">
          <a className="brand" href="#">
            <Logo />
            <span>Copilot-DataLab</span>
          </a>
          <p className="byline">
            <span>by <a href="#/about">Keith McGrane</a></span>
            <a className="byline-icon" href={keith.url} target="_blank" rel="noreferrer" aria-label="Keith McGrane on LinkedIn"><LinkedInIcon /></a>
            <a className="byline-icon" href="https://github.com/Keithland89" target="_blank" rel="noreferrer" aria-label="Keith McGrane on GitHub"><GitHubIcon /></a>
          </p>
        </div>
        <nav aria-label="Site">
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

// Every page of every screen recording, dealt out one product at a time.
const wallFrames: [string, number][] = [
  ['valuelens', 7], ['consumption-central', 8], ['github-copilot-panel', 7],
  ['agent-monitor', 6], ['analytics-hub', 6], ['ai-in-one', 1],
]
const stills = Array.from({ length: 8 }, (_, n) =>
  wallFrames.filter(([, count]) => n < count).map(([id]) => `wall/${id}-${n}.webp`),
).flat()
// Seven rows of seven, so the wall reaches the hero's bottom edge.
const wall = [...stills, ...stills].slice(0, 49)

function Home({ live }: { live: Live }) {
  return (
    <>
      <section className="hero">
        <div className="hero-wall" aria-hidden="true">
          {wall.map((src, i) => <img key={i} src={src} alt="" decoding="async" />)}
        </div>
        <div className="wrap hero-grid">
          <div className="opening">
            <h1>Copilot and agent analytics you run in your own tenant.</h1>
            <p className="lede">
              Copilot-DataLab collects the open-source apps and Power BI reports I build for Microsoft 365 Copilot and agents. Each
              component covers one thing, and {hub.name} brings them together in one platform.
            </p>
            <div className="cta-row">
              <a className="key key-primary" href="#solutions">Browse the solutions</a>
              <a className="key" href="#which-one">Find the right one</a>
            </div>
          </div>
          <ul className="facts plotted">
            <li><strong>Free and open source.</strong> You pay only for the Fabric, Azure or Power Platform capacity it runs on.</li>
            <li><strong>Your data stays put.</strong> Everything reads from, and stays in, your own tenant.</li>
            <li><strong>An app or a report.</strong> Most come as an app for leaders and a Power BI report for analysts.</li>
          </ul>
          <figure className="hero-shot" data-ui="screen">
            <figcaption>
              <span className="kind kind-platform">The platform</span> {hub.name}
            </figcaption>
            <img src={hub.preview.src} alt={hub.preview.alt} width="1100" height="658" />
          </figure>
        </div>
      </section>
      <SectionTabs />
      <SolutionsSection live={live} />
      <WhichOne />
      <WhatsNew live={live} />
      <GetStarted />
      <Related />
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

function SolutionsSection({ live }: { live: Live }) {
  const [peek, setPeek] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const hovered = hover ? byId(hover) : undefined

  // The row crossing the middle of the viewport gets the plotted point.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setPeek((hit.target as HTMLElement).dataset.id ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll<HTMLElement>('.sheet[data-id]').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const sheet = (s: Solution, body: React.ReactNode, media: React.ReactNode) => (
    <article
      key={s.id}
      className={`sheet ${s.component ? '' : 'sheet-hub'} ${peek === s.id ? 'is-peek' : ''}`}
      data-id={s.id}
      onMouseEnter={() => setPeek(s.id)}
      onFocus={() => setPeek(s.id)}
    >
      <div className="sheet-name">
        <Kind s={s} />
        <h3><a href={`#/s/${s.id}`}>{s.name}</a></h3>
        <div className="card-meta">
          <Stars s={s} live={live} />
        </div>
      </div>
      <div className="sheet-body">{body}</div>
      <div className="sheet-media">{media}</div>
    </article>
  )

  return (
    <section id="solutions" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>One platform, {count} components</h2>
          <p>Use {hub.name} for all of it in one app, or start with the one component you need. Each is a public GitHub repo with setup guides and sample data.</p>
        </div>

        <div className="index">
          <div className="index-rows">
            {sheet(
              hub,
              <>
                <p className="summary">{hub.summary}</p>
                <p className="includes">
                  Includes <a href="#/s/valuelens">ValueLens</a>, <a href="#/s/agent-monitor">Agent Monitor</a> and, as an add-on, <a href="#/s/consumption-central">Consumption Central</a>. <a href="#/s/github-copilot-panel">GitHub Copilot Panel</a> isn’t in it yet.
                </p>
                <RunsAs list={hub.runsAs} />
                <div className="card-actions">
                  <a className="key key-primary" href={`#/s/${hub.id}`}>See what’s inside</a>
                  <a className="key" href={`https://github.com/${hub.repo}`} target="_blank" rel="noreferrer">Open the repo</a>
                </div>
              </>,
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
              </div>,
            )}
            <p className="index-group">The components, one thing each</p>
            {parts.map((s) =>
              sheet(
                s,
                <>
                  <p className="question">“{s.question}”</p>
                  <p className="summary">{s.summary}</p>
                  <RunsAs list={s.runsAs} />
                  <div className="card-actions">
                    <a className="text-link" href={`#/s/${s.id}`}>Details</a>
                    <a className="text-link" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">Repo</a>
                    {s.videos[0] && (
                      <a className="text-link" href={s.videos[0].url} target="_blank" rel="noreferrer">Watch the {s.videos[0].label.toLowerCase()}</a>
                    )}
                  </div>
                </>,
                <a className="shot sheet-shot" href={`#/s/${s.id}`} tabIndex={-1}>
                  <img src={s.preview.src} alt={s.preview.alt} loading="lazy" />
                </a>,
              ),
            )}
          </div>
          <p className="index-note">Every screen runs on sample data. Every name shown is invented.</p>
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
        <ol className="log">
          {log.map((e) => {
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

// A working fragment: the four steps drive a panel that shows the real thing
// each step asks for, for the solution picked in step one.
function GetStarted() {
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState(hub.id)
  const s = byId(chosen)!
  const narrow = useMedia('(max-width: 960px)')
  const panel = (
    <div id="walk-panel" className="walk-panel cut" data-ui="setup">
      {step === 0 && (
        <fieldset className="walk-pick">
          <legend>Pick a solution</legend>
          {ordered.map((o) => (
            <label key={o.id} className={chosen === o.id ? 'is-picked' : undefined}>
              <input type="radio" name="start" value={o.id} checked={chosen === o.id} onChange={() => setChosen(o.id)} />
              <span>
                <strong>{o.name} <Kind s={o} /></strong>
                <span>{o.question}</span>
              </span>
            </label>
          ))}
        </fieldset>
      )}
      {step === 1 && (
        <div className="walk-body">
          <p className="walk-title">{s.name}</p>
          <span className="shot walk-shot" aria-hidden="true">
            <img src={s.preview.src} alt="" loading="lazy" />
          </span>
          {s.tryFirst ? (
            <a className="key key-primary" href={s.tryFirst.url} target="_blank" rel="noreferrer">{s.tryFirst.label}</a>
          ) : (
            <a className="key" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">Open the repo</a>
          )}
          {s.videos.length > 0 && (
            <>
              <p className="walk-label">Videos</p>
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
        </div>
      )}
      {step === 2 && (
        <div className="walk-body">
          <p className="walk-title">{s.name}</p>
          <p className="walk-label">Before you start</p>
          <Checklist key={s.id} items={s.beforeYouStart} />
          <p className="muted">The README has the full list, by who does what.</p>
        </div>
      )}
      {step === 3 && (
        <div className="walk-body">
          <p className="walk-title">{s.name}</p>
          <RunsAs list={s.runsAs} />
          <a className="key key-primary" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">
            <GitHubIcon /> Open the repo
          </a>
        </div>
      )}
    </div>
  )
  return (
    <section id="get-started" className="section section-tint">
      <div className="wrap">
        <div className="section-head">
          <h2>Get started</h2>
          <p>Admin approvals usually take the longest, so ask for them early.</p>
        </div>
        <div className="walk">
          <ol className="steps">
            {steps.map((st, i) => (
              <li key={st.title} className={step === i ? 'is-on' : undefined}>
                <span className="step-n" aria-hidden="true">{i + 1}</span>
                <h3>
                  <button type="button" aria-pressed={step === i} aria-controls="walk-panel" onClick={() => setStep(i)}>
                    {st.title}
                  </button>
                </h3>
                <p>{st.text}</p>
                {narrow && step === i && panel}
              </li>
            ))}
          </ol>
          {!narrow && panel}
        </div>
      </div>
    </section>
  )
}

function Related() {
  return (
    <section id="related" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Related</h2>
          <p>Other places to look, including Power CAT’s Agent Inventory, which pairs well with Agent Monitor.</p>
        </div>
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
          <p className="lede">{s.summary}</p>
          <div className="card-meta">
            <Stars s={s} live={live} />
            {live[s.id]?.pushedAt && <span className="muted">Updated {relative(live[s.id]?.pushedAt)}</span>}
          </div>
          <div className="cta-row">
            <a className="key key-primary" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">
              <GitHubIcon /> Open the repo
            </a>
            {s.tryFirst && (
              <a className="key" href={s.tryFirst.url} target="_blank" rel="noreferrer">{s.tryFirst.label}</a>
            )}
          </div>
        </div>
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
          <p>Built by Keith McGrane (<a href="https://github.com/Keithland89">@Keithland89</a>).</p>
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
      </div>
    </footer>
  )
}

function LinkedInIcon() {
  return (
    <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M0 1.15C0 .52.52 0 1.15 0h13.7C15.48 0 16 .52 16 1.15v13.7c0 .63-.52 1.15-1.15 1.15H1.15C.52 16 0 15.48 0 14.85V1.15ZM4.94 13.4V6.17h-2.4v7.23h2.4ZM3.74 5.18c.84 0 1.36-.56 1.36-1.25-.02-.71-.52-1.25-1.34-1.25-.82 0-1.36.54-1.36 1.25 0 .69.52 1.25 1.33 1.25h.01Zm2.53 8.22h2.4V9.36c0-.21.02-.43.08-.58.17-.43.57-.88 1.23-.88.87 0 1.22.66 1.22 1.63v3.87h2.4V9.25c0-2.22-1.18-3.25-2.76-3.25-1.28 0-1.85.7-2.17 1.19v.03h-.02l.02-.03V6.17h-2.4c.03.68 0 7.23 0 7.23Z" />
    </svg>
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
