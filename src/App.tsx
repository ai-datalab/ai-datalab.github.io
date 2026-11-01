import { useEffect, useState } from 'react'
import { Platform } from './Platform'
import { SignalField } from './SignalField'
import { byId, componentLabels, hub, log, ordered, parts, related, steps, type Solution } from './data'
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
          <a className="key key-sm gh" href="https://github.com/Keithland89" target="_blank" rel="noreferrer">
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
          <div className="opening">
            <h1>Copilot and agent analytics you run in your own tenant.</h1>
            <p className="lede">
              AI-DataLab collects the open-source apps and Power BI reports I build for Microsoft 365 Copilot and agents. Each
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
          <div className="hero-map cut" data-ui="report">
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
  const peekId = peek ?? hub.id
  const peeked = byId(peekId)

  // Scrolling the index plays the screens: the row crossing the middle of the
  // viewport takes the stage. Hover and focus still win while they happen.
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

  const sheet = (s: Solution, body: React.ReactNode) => (
    <article
      key={s.id}
      className={`sheet ${s.component ? '' : 'sheet-hub'} ${peekId === s.id ? 'is-peek' : ''}`}
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
      <div className="sheet-body">
        <span className="shot sheet-shot" aria-hidden="true">
          <img src={s.preview.src} alt="" loading="lazy" />
        </span>
        {body}
      </div>
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
              ),
            )}
          </div>
          <div className="stage" aria-hidden="true" data-ui="screen">
            <div className="stage-frame cut">
              {ordered.map((s) => (
                <span key={s.id} className={`shot stage-shot ${peekId === s.id ? 'is-on' : ''}`}>
                  <img src={s.preview.src} alt="" loading="lazy" />
                </span>
              ))}
            </div>
            <p className="stage-caption">
              <strong>{peeked && <Kind s={peeked} />} {peeked?.name}</strong>
              <span>Sample data. Every name shown is invented.</span>
            </p>
          </div>
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
