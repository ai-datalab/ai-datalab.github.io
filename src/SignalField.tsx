import { useEffect, useRef } from 'react'
import { areaLabels, solutions, type Area } from './data'

// The field map again, drawn as a character field on the theme's 8 by 16 cell.
// Each solution is a plotted point; the one the picker has chosen grows its halo.
const RAMP = ' .:-=+*#%@'
const CELL_W = 8
const CELL_H = 16
const areas = Object.keys(areaLabels) as Area[]

const hash = (c: number, r: number) => {
  let h = (c * 374761393 + r * 668265263) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

interface Props {
  active: string
}

export function SignalField({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const axisRef = useRef<HTMLDivElement>(null)
  const last = useRef<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const axis = axisRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !axis || !ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const grow = last.current !== null && last.current !== active && !reduce
    last.current = active
    let raf = 0

    const draw = (p: number) => {
      const css = getComputedStyle(canvas)
      const tok = (n: string) => css.getPropertyValue(n).trim()
      const ink = { g1: tok('--color-graphite-glyph-1'), g2: tok('--color-graphite-glyph-2'), g3: tok('--color-graphite-glyph-3'), hi: tok('--color-accent-2'), top: tok('--color-graphite-ink'), label: tok('--color-graphite-muted') }
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const box = axis.getBoundingClientRect()
      const host = canvas.getBoundingClientRect()
      const plotL = box.left - host.left
      const plotW = box.width
      const plotT = CELL_H * 2
      const plotH = h - CELL_H * 6
      const X = (x: number) => plotL + x * plotW
      const Y = (y: number) => plotT + (1 - y) * plotH
      const narrow = w < 640
      const scale = narrow ? 0.62 : 1

      const pts = solutions.filter((s) => s.id !== 'analytics-hub').map((s) => ({ id: s.id, x: X(s.map.x), y: Y(s.map.y), right: s.map.x > 0.6 }))
      const hub = { x0: X(0.03), x1: X(0.72), y: Y(0.5) }
      const hubOn = active === 'analytics-hub'

      ctx.font = `13px ${tok('--font-outlier')}`
      const labels = pts
        .filter((pt) => !narrow || pt.id === active)
        .map((pt) => {
          const tw = ctx.measureText(pt.id).width
          const on = pt.id === active
          const off = (on ? 148 : 30) * scale
          const lx = pt.right ? pt.x - off - tw : pt.x + off
          return { text: pt.id, x: lx, y: on ? pt.y : pt.y - 22, w: tw, on }
        })
      if (!narrow || hubOn) labels.push({ text: 'analytics-hub', x: hub.x0, y: hub.y - 30, w: ctx.measureText('analytics-hub').width, on: hubOn })
      const underLabel = (cx: number, cy: number) => labels.some((l) => cx > l.x - 6 && cx < l.x + l.w + 6 && cy > l.y - 12 && cy < l.y + 8)

      const cols = Math.ceil(w / CELL_W)
      const rows = Math.floor(h / CELL_H)
      const dividers = [0.25, 0.5, 0.75].map((f) => Math.floor(X(f) / CELL_W))
      ctx.textBaseline = 'middle'
      ctx.font = `12px ${tok('--font-outlier')}`

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * CELL_W + CELL_W / 2
          const cy = r * CELL_H + CELL_H / 2
          if (underLabel(cx, cy)) continue
          const n = hash(c, r)
          let v = 0.03 + 0.11 * n * n * n
          let mine = 0
          for (const pt of pts) {
            const d = Math.hypot(cx - pt.x, (cy - pt.y) * 1.15) / scale
            if (pt.id === active) {
              const a = Math.exp(-((d / 22) ** 2)) + 0.8 * Math.exp(-(((d - 58 * p) / 9) ** 2)) + 0.5 * Math.exp(-(((d - 124 * p) / 13) ** 2)) + 0.22 * Math.exp(-((d / (190 * p + 1)) ** 2))
              mine = Math.max(mine, a)
              v = Math.max(v, a + 0.08 * n)
            } else {
              v = Math.max(v, Math.exp(-((d / 20) ** 2)) + 0.5 * Math.exp(-(((d - 40) / 8) ** 2)))
            }
          }
          if (cx > hub.x0 && cx < hub.x1) {
            const dy = Math.abs(cy - hub.y)
            const b = hubOn ? Math.exp(-((dy / 14) ** 2)) + 0.3 * Math.exp(-((dy / (90 * p + 1)) ** 2)) : 0.62 * Math.exp(-((dy / 10) ** 2))
            if (hubOn) mine = Math.max(mine, b)
            v = Math.max(v, b)
          }
          let ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))]
          let fill = v < 0.35 ? ink.g1 : v < 0.65 ? ink.g2 : ink.g3
          if (mine > 0.2) fill = mine > 0.75 ? ink.top : mine > 0.4 ? ink.hi : ink.g3
          if (ch === ' ' && dividers.includes(c) && r % 2 === 0) {
            ch = ':'
            fill = ink.g1
          }
          if (ch === ' ') continue
          ctx.fillStyle = fill
          ctx.fillText(ch, c * CELL_W, cy)
        }
      }

      ctx.font = `13px ${tok('--font-outlier')}`
      for (const l of labels) {
        ctx.fillStyle = l.on ? ink.top : ink.label
        ctx.fillText(l.text, l.x, l.y)
      }
    }

    let progress = grow ? 0 : 1
    if (grow) {
      const t0 = performance.now()
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 520)
        progress = 1 - (1 - k) ** 3
        draw(progress)
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    } else {
      draw(1)
    }

    const ro = new ResizeObserver(() => draw(progress))
    ro.observe(canvas)
    document.fonts?.ready.then(() => draw(progress))
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [active])

  return (
    <div className="field" aria-hidden="true">
      <canvas ref={canvasRef} className="field-canvas" />
      <div ref={axisRef} className="wrap field-axis">
        {areas.map((a) => (
          <span key={a}>{areaLabels[a]}</span>
        ))}
      </div>
    </div>
  )
}
