import { areaLabels, solutions, type Area } from './data'

const W = 640
const H = 420
const PAD = { l: 84, r: 24, t: 28, b: 56 }
const plotW = W - PAD.l - PAD.r
const plotH = H - PAD.t - PAD.b
const px = (x: number) => PAD.l + x * plotW
const py = (y: number) => PAD.t + (1 - y) * plotH
const areas = Object.keys(areaLabels) as Area[]

interface Props {
  active: string | null
  onActive: (id: string | null) => void
}

export function FieldMap({ active, onActive }: Props) {
  const current = active
  const points = solutions.filter((s) => s.id !== 'analytics-hub')
  const hub = solutions.find((s) => s.id === 'analytics-hub')!

  return (
    <figure className="fieldmap">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-labelledby="fieldmap-title">
        <title id="fieldmap-title">
          Each solution plotted by what it measures, from adoption to governance, and whose activity, from people to agents
        </title>
        <defs>
          <pattern id="minor" width={plotW / 32} height={plotH / 20} patternUnits="userSpaceOnUse" x={PAD.l} y={PAD.t}>
            <path d={`M ${plotW / 32} 0 V ${plotH / 20} M 0 ${plotH / 20} H ${plotW / 32}`} className="grid-minor" />
          </pattern>
        </defs>
        <rect x={PAD.l} y={PAD.t} width={plotW} height={plotH} fill="url(#minor)" />

        {areas.map((a, i) => (
          <g key={a}>
            {i > 0 && <line className="grid-major" x1={px(i / 4)} x2={px(i / 4)} y1={PAD.t} y2={PAD.t + plotH} />}
            <text className="axis-tick" x={px((i + 0.5) / 4)} y={H - PAD.b + 22} textAnchor="middle">
              {areaLabels[a]}
            </text>
          </g>
        ))}
        <line className="grid-major" x1={PAD.l} x2={PAD.l + plotW} y1={py(0.5)} y2={py(0.5)} />

        <path className="axis draw" d={`M ${PAD.l} ${PAD.t} V ${PAD.t + plotH} H ${PAD.l + plotW}`} />
        <text className="axis-name" x={PAD.l + plotW} y={H - 8} textAnchor="end">
          What it measures
        </text>
        <text className="axis-tick" x={PAD.l - 12} y={py(0.05)} textAnchor="end">People</text>
        <text className="axis-tick" x={PAD.l - 12} y={py(0.95) + 4} textAnchor="end">Agents</text>

        <a
          href={`#/s/${hub.id}`}
          className={`hub-band reveal ${current === hub.id ? 'is-active' : ''}`}
          style={{ ['--d' as string]: '0.9s' }}
          onMouseEnter={() => onActive(hub.id)}
          onMouseLeave={() => onActive(null)}
          onFocus={() => onActive(hub.id)}
          onBlur={() => onActive(null)}
          aria-label="Analytics Hub, covering adoption, value and cost"
        >
          <rect x={px(0.03)} y={py(0.5) - 15} width={px(0.72) - px(0.03)} height={30} rx={15} />
          <text x={px(0.04) + 14} y={py(0.5) + 5}>Analytics Hub: adoption, value and cost</text>
        </a>

        {points.map((s, i) => {
          const x = px(s.map.x)
          const y = py(s.map.y)
          const labelLeft = s.map.x > 0.6
          return (
            <a
              key={s.id}
              href={`#/s/${s.id}`}
              className={`point reveal ${current === s.id ? 'is-active' : ''}`}
              style={{ ['--d' as string]: `${1.1 + i * 0.12}s` }}
              onMouseEnter={() => onActive(s.id)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(s.id)}
              onBlur={() => onActive(null)}
              aria-label={`${s.name}: ${s.question}`}
            >
              <circle className="halo" cx={x} cy={y} r={20} />
              <circle className="dot" cx={x} cy={y} r={7} />
              <text x={labelLeft ? x - 14 : x + 14} y={y - 12} textAnchor={labelLeft ? 'end' : 'start'}>
                {s.name}
              </text>
            </a>
          )
        })}
      </svg>
    </figure>
  )
}
