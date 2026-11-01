import { useEffect, useMemo, useState } from 'react'
import { FieldMap } from './FieldMap'
import { areaLabels, byId, log, related, solutions, steps, type Area, type Solution } from './data'
import { formatDay, relative, useLiveRepoStats, type Live } from './live'

const sections = [
  { id: 'solutions', label: 'Solutions' },
  { id: 'which-one', label: 'Which one do I need?' },
  { id: 'whats-new', label: 'What’s new' },
  { id: 'get-started', label: 'Get started' },
  { id: 'related', label: 'Related' },
] as const

const allAreas = Object.keys(areaLabels) as Area[]

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
  const detail = route.startsWith('/s/') ? byId(route.slice(3)) : undefined

  useEffect(() => {
    document.title = detail ? `${detail.name} | AI-DataLab` : 'AI-DataLab: Copilot and agent analytics by Keith McGrane'
  }, [detail])

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
      <Header />
      <main id="main" tabIndex={-1}>{detail ? <SolutionPage s={detail} live={live} /> : <Home live={live} />}</main>
      <Footer />
    </>
  )
}

function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M11 3h10M13 3v9L5 26a2 2 0 0 0 1.8 3h18.4a2 2 0 0 0 1.8-3L19 12V3" />
      <path className="logo-liquid" d="M8.2 21.2c2.6-1.6 4.6.8 7.6-.4s4.3-1 7.9.4L25.8 26H6.2Z" />
    </svg>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a className="brand" href="#">
          <Logo />
          <span>AI-DataLab</span>
        </a>
        <nav aria-label="Site">
          <a href="#solutions">Solutions</a>
          <a href="#which-one">Which one?</a>
          <a href="#get-started">Get started</a>
          <a className="gh" href="https://github.com/Keithland89" target="_blank" rel="noreferrer">
            <GitHubIcon /> <span>Keithland89</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

function Home({ live }: { live: Live }) {
  const [hover, setHover] = useState<string | null>(null)
  const hovered = hover ? byId(hover) : undefined
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>Copilot and agent analytics you run in your own tenant.</h1>
            <p className="lede">
              AI-DataLab collects the open-source apps and Power BI reports I build for Microsoft 365 Copilot and agents. They
              show who uses them, the value they deliver, what they cost and which agents need attention.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#solutions">Browse the solutions</a>
              <a className="btn" href="#which-one">Find the right one</a>
            </div>
          </div>
          <div className="hero-map">
            <FieldMap active={hover} onActive={setHover} />
            <p className="map-caption" aria-live="polite">
              {hovered ? (
                <>
                  <strong>{hovered.name}</strong> answers “{hovered.question}”
                </>
              ) : (
                'Each solution, plotted by what it measures and whose activity it covers. Point at one to see the question it answers.'
              )}
            </p>
          </div>
        </div>
        <div className="wrap">
          <ul className="facts">
            <li><strong>Free and open source.</strong> You pay only for the Fabric, Azure or Power Platform capacity it runs on.</li>
            <li><strong>Your data stays put.</strong> Everything reads from, and stays in, your own tenant.</li>
            <li><strong>An app or a report.</strong> Most come as an app for leaders and a Power BI report for analysts.</li>
          </ul>
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

function AreaStrip({ areas }: { areas: Area[] }) {
  const label = `Measures ${areas.map((a) => areaLabels[a].toLowerCase()).join(', ')}`
  return (
    <span className="strip" role="img" aria-label={label} title={label}>
      {allAreas.map((a) => (
        <span key={a} className={areas.includes(a) ? 'on' : ''} />
      ))}
    </span>
  )
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
  const [filter, setFilter] = useState<Area | 'all'>('all')
  const hub = solutions[0]
  const shownRest = useMemo(() => {
    const rest = solutions.slice(1)
    return filter === 'all' ? rest : rest.filter((s) => s.areas.includes(filter))
  }, [filter])
  const showHub = filter === 'all' || hub.areas.includes(filter)

  return (
    <section id="solutions" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>The solutions</h2>
          <p>Five solutions, each a public GitHub repo with an installer, setup guides and sample data.</p>
        </div>
        <div className="chips" role="group" aria-label="Filter by what it measures">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
          {allAreas.map((a) => (
            <button key={a} type="button" aria-pressed={filter === a} onClick={() => setFilter(a)}>
              {areaLabels[a]}
            </button>
          ))}
        </div>

        {showHub && (
          <article className="hub-card">
            <a className="hub-media" href={`#/s/${hub.id}`} tabIndex={-1} aria-hidden="true">
              <img src={hub.preview.src} alt="" loading="lazy" />
            </a>
            <div className="hub-body">
              <div className="card-meta">
                <AreaStrip areas={hub.areas} />
                <Stars s={hub} live={live} />
              </div>
              <h3><a href={`#/s/${hub.id}`}>{hub.name}</a></h3>
              <p className="summary">{hub.summary}</p>
              <p className="includes">
                Includes <a href="#/s/valuelens">ValueLens</a> and, as an add-on, <a href="#/s/consumption-central">Consumption Central</a>.
              </p>
              <RunsAs list={hub.runsAs} />
              <div className="card-actions">
                <a className="btn btn-primary" href={`#/s/${hub.id}`}>See what’s inside</a>
                <a className="btn" href={`https://github.com/${hub.repo}`} target="_blank" rel="noreferrer">Open the repo</a>
              </div>
            </div>
          </article>
        )}

        {shownRest.length > 0 && (
          <div className="sheet-grid">
            {shownRest.map((s) => (
              <article key={s.id} className="sheet">
                <div className="card-meta">
                  <AreaStrip areas={s.areas} />
                  <Stars s={s} live={live} />
                </div>
                <h3><a href={`#/s/${s.id}`}>{s.name}</a></h3>
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
              </article>
            ))}
          </div>
        )}
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
  const order = ['ai-in-one', 'valuelens', 'consumption-central', 'agent-monitor', 'analytics-hub']
  const list = order.map((id) => byId(id)!)
  const [pick, setPick] = useState(list[0].id)
  const s = byId(pick)!
  return (
    <section id="which-one" className="section section-ink">
      <div className="wrap">
        <div className="section-head">
          <h2>Which one do I need?</h2>
          <p>Start from the question your leaders are asking.</p>
        </div>
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
          <div className="answer" aria-live="polite">
            <h3>Use {s.name}</h3>
            <p>{s.summary}</p>
            <ul>
              {s.measures.slice(0, 3).map((m) => <li key={m}>{m}</li>)}
            </ul>
            <a className="btn btn-signal" href={`#/s/${s.id}`}>Open {s.name}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsNew({ live }: { live: Live }) {
  const hasLive = solutions.every((s) => live[s.id]?.pushedAt)
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
            {solutions.map((s, i) => (
              <span key={s.id}>
                {s.name} {relative(live[s.id]?.pushedAt)}
                {i < solutions.length - 1 ? '; ' : '.'}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}

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
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
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
  const pairs = [...(s.includes ?? []), ...(s.related ?? [])].map((id) => byId(id)).filter((p): p is Solution => Boolean(p))
  return (
    <article className="detail">
      <div className="wrap">
        <a className="back" href="#solutions">All solutions</a>
        <div className="detail-head">
          <h1>{s.name}</h1>
          <p className="lede">{s.summary}</p>
          <div className="card-meta">
            <AreaStrip areas={s.areas} />
            <Stars s={s} live={live} />
            {live[s.id]?.pushedAt && <span className="muted">Updated {relative(live[s.id]?.pushedAt)}</span>}
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href={`https://github.com/${s.repo}`} target="_blank" rel="noreferrer">
              <GitHubIcon /> Open the repo
            </a>
            {s.tryFirst && (
              <a className="btn" href={s.tryFirst.url} target="_blank" rel="noreferrer">{s.tryFirst.label}</a>
            )}
          </div>
        </div>
        <figure className="detail-media">
          <img src={s.preview.src} alt={s.preview.alt} />
          <figcaption>Sample data. Every name shown is invented.</figcaption>
        </figure>
        <div className="detail-grid">
          <section>
            <h2>What it shows</h2>
            <ul className="ticks">{s.measures.map((m) => <li key={m}>{m}</li>)}</ul>
          </section>
          <section>
            <h2>Before you start</h2>
            <ul className="boxes">{s.beforeYouStart.map((m) => <li key={m}>{m}</li>)}</ul>
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
          <section className="pairs">
            <h2>{s.includes ? 'Includes and pairs with' : 'Pairs with'}</h2>
            <ul>
              {pairs.map((p) => (
                <li key={p.id}>
                  <a href={`#/s/${p.id}`}>
                    <strong>{p.name}</strong>
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <a className="brand" href="#"><Logo /><span>AI-DataLab</span></a>
          <p>Built by Keith McGrane (<a href="https://github.com/Keithland89">@Keithland89</a>).</p>
        </div>
        <p className="disclaimer">
          These are community templates, provided as-is. They are not official Microsoft Copilot reports, and they aren’t
          covered by Microsoft support. Report problems as issues in each repo. You own the data you extract.
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
