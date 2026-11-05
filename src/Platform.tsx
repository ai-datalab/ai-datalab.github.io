import type { ReactNode } from 'react'
import { componentLabels, hub, parts, type Solution } from './data'

interface Props {
  active: string | null
  onActive: (id: string | null) => void
  meta: (s: Solution) => ReactNode
}

// The platform on top, its components hanging from one rail below it. Each
// component meets the rail at a plotted point.
export function Platform({ active, onActive, meta }: Props) {
  const on = (id: string) => ({
    onMouseEnter: () => onActive(id),
    onMouseLeave: () => onActive(null),
    onFocus: () => onActive(id),
    onBlur: () => onActive(null),
  })
  return (
    <figure className="platform" aria-label={`${hub.name}, the platform, and its ${parts.length} components`}>
      <a href={`#/s/${hub.id}`} className={`platform-hub reveal ${active === hub.id ? 'is-active' : ''}`} style={{ ['--d' as string]: '0.15s' }} {...on(hub.id)}>
        <span className="platform-kicker">The platform</span>
        <strong>{hub.name}</strong>
        <span className="platform-note">{hub.tagline}</span>
        <span className="platform-meta">{meta(hub)}</span>
      </a>
      <ol className="platform-parts">
        {parts.map((s, i) => (
          <li key={s.id} className="reveal" style={{ ['--d' as string]: `${0.45 + i * 0.08}s` }}>
            <a href={`#/s/${s.id}`} className={`part ${active === s.id ? 'is-active' : ''}`} {...on(s.id)}>
              <span className="part-label">
                {componentLabels[s.component!]}
                {s.notInHub && <span className="not-in-hub">Not in {hub.name} yet</span>}
              </span>
              <strong>{s.name}</strong>
              <span className="platform-meta">{meta(s)}</span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  )
}
