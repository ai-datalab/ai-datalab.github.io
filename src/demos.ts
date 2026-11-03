import manifest from '../demos/manifest.json'

interface Demo {
  slug: string
  solution: string
  kind: string
}

const demos: Demo[] = manifest.demos

export function solutionDemos(solution: string) {
  return demos.filter((demo) => demo.solution === solution).map((demo) => ({
    url: `/demo/${demo.slug}/`,
    label: demo.kind === 'report' ? 'Try the report demo' : 'Try the app demo',
  }))
}
