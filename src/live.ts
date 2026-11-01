import { useEffect, useState } from 'react'
import { solutions } from './data'

export type Live = Record<string, { stars: number; pushedAt?: string }>

const CACHE_KEY = 'datalab-live-v1'
const CACHE_MS = 60 * 60 * 1000

// Star counts and last-push dates come from the public GitHub API. If that
// fails (rate limits, offline), the snapshot in data.ts is shown instead.
export function useLiveRepoStats(): Live {
  const [live, setLive] = useState<Live>(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null')
      if (cached && Date.now() - cached.at < CACHE_MS) return cached.data as Live
    } catch {
      /* ignore bad cache */
    }
    return {}
  })

  useEffect(() => {
    if (Object.keys(live).length) return
    let cancelled = false
    Promise.all(
      solutions.map(async (s) => {
        const res = await fetch(`https://api.github.com/repos/${s.repo}`)
        if (!res.ok) throw new Error(String(res.status))
        const json = await res.json()
        return [s.id, { stars: json.stargazers_count as number, pushedAt: json.pushed_at as string }] as const
      }),
    )
      .then((entries) => {
        if (cancelled) return
        const data = Object.fromEntries(entries)
        setLive(data)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
      })
      .catch(() => {
        /* keep snapshot values */
      })
    return () => {
      cancelled = true
    }
  }, [live])

  return live
}

export function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function relative(iso?: string) {
  if (!iso) return ''
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 14) return `${days} days ago`
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}
