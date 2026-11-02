// Insights first published on AInROI (https://www.ainroi.com), source: github.com/shailendrahegde/ainroisite
// (public/blogs/manifest.json). Authors follow each post's own byline, in its order.

export const shailendra = { name: 'Shailendra Hegde', url: 'https://www.linkedin.com/in/shailendrahegde' }
export const keith = { name: 'Keith McGrane', url: 'https://www.linkedin.com/in/keith-mcgrane-46184029' }

export const topics = ['AI adoption', 'ROI analysis', 'License allocation', 'Investment decisions', 'Superusers'] as const
export type Topic = (typeof topics)[number]

export interface Insight {
  slug: string
  title: string
  summary: string
  topic: Topic
  date: string
  minutes: number
  authors: (typeof keith)[]
}

const sk = [shailendra, keith]
const ks = [keith, shailendra]

export const insights: Insight[] = [
  {
    slug: 'learning-curve-hidden-inside-ai-adoption',
    title: 'The Learning Curve Hidden Inside AI Adoption',
    summary:
      'AI maturity isn’t a usage curve. It’s a curve of adopting specific behaviours, and because later-stage behaviours carry far higher time benchmarks, the value curve is far steeper than the usage curve.',
    topic: 'AI adoption',
    date: '2026-10-15',
    minutes: 6,
    authors: sk,
  },
  {
    slug: 'valuing-cowork-assistance',
    title: 'Valuing Cowork Assistance: Why Measuring AI Value Has to Move From Prompts to Tasks',
    summary:
      'When AI orchestrates whole tasks end to end, counting prompts no longer captures its value. A task-based method that starts with intent, breaks work into activities, and anchors time saved in published research.',
    topic: 'ROI analysis',
    date: '2026-10-15',
    minutes: 5,
    authors: sk,
  },
  {
    slug: 'where-did-the-tokens-go',
    title: 'I Tracked Every Instruction I Gave to AI Coding Agents for 30 Days. Here’s What I Found.',
    summary:
      '20 hours of directed effort, 105 hours of human-effort equivalent: a 5.4× multiplier across GitHub Copilot and Claude Code, and the data on attention cost, late nights, and what it takes to direct AI well.',
    topic: 'ROI analysis',
    date: '2026-04-08',
    minutes: 8,
    authors: [shailendra],
  },
  {
    slug: 'ai-culture-ladder',
    title: 'The AI Culture Ladder: Four Stages From Curious to AI-Native, and How to Measure the Climb',
    summary:
      '95% of AI pilots fail to scale, and 70% of the gap is culture, not technology. A four-stage maturity ladder with measurable behavioural signals, leadership actions, and how agents change the equation.',
    topic: 'AI adoption',
    date: '2026-02-27',
    minutes: 7,
    authors: ks,
  },
  {
    slug: 'beyond-adoption-counts-ai-maturity',
    title: 'Beyond Adoption Counts: Three Dimensions That Reveal Real AI Maturity',
    summary:
      'Volume and consistency, complexity, and breadth of adoption: three dimensions that capture the behavioural signature of a genuinely AI-mature organisation.',
    topic: 'AI adoption',
    date: '2026-02-07',
    minutes: 5,
    authors: sk,
  },
  {
    slug: 'ai-license-allocation-strategies',
    title: 'How to Roll Out AI Licenses: Big Bang, Drip Feed, or Learn-and-Scale?',
    summary:
      'Three allocation strategies for AI licences, and which one fits your organisation’s maturity, resources and adoption goals.',
    topic: 'License allocation',
    date: '2026-02-06',
    minutes: 5,
    authors: ks,
  },
  {
    slug: 'cio-dilemma-ai-expansion-decisions',
    title: 'The CIO’s Dilemma: How to Make AI Expansion Decisions Before the Outcomes Arrive',
    summary:
      'Investment committees need confidence before long-term ROI shows up. How to show traction through habit-formation velocity, superuser benchmarks and workflow signals.',
    topic: 'Investment decisions',
    date: '2026-01-28',
    minutes: 5,
    authors: sk,
  },
  {
    slug: 'ai-license-allocation-model',
    title: 'Who Gets AI Licenses First? Five Allocation Models Compared',
    summary:
      'How many licences to buy and who gets them first: five allocation models, from lottery to behaviour-based, and the principles for faster adoption.',
    topic: 'License allocation',
    date: '2026-01-22',
    minutes: 5,
    authors: ks,
  },
  {
    slug: 'ai-superusers-hidden-advantage',
    title: 'AI Superusers: The Hidden Advantage in Your Organization',
    summary: 'A small fraction of employees generates 5 to 10 times more AI usage. How to find them, learn from them, and scale what works.',
    topic: 'Superusers',
    date: '2026-01-16',
    minutes: 4,
    authors: sk,
  },
  {
    slug: 'data-driven-ai-adoption',
    title: 'Stop Guessing: The Data-Driven Way to Scale Enterprise AI',
    summary: 'Build measurement into every adoption workstream to move from generic enablement to targeted interventions that shift behaviour.',
    topic: 'AI adoption',
    date: '2026-01-14',
    minutes: 5,
    authors: ks,
  },
  {
    slug: 'roi-demands-patience',
    title: 'ROI Demands Patience',
    summary: 'AI value unfolds in stages, and focusing on ROI too early can mean missed opportunities. What to focus on instead.',
    topic: 'ROI analysis',
    date: '2025-01-10',
    minutes: 3,
    authors: sk,
  },
  {
    slug: 'early-ai-adoption',
    title: 'What Early AI Adoption Really Looks Like in the Enterprise',
    summary: 'Early adoption is concentrated in a few surfaces and a small set of superusers, and that’s fine.',
    topic: 'AI adoption',
    date: '2025-01-08',
    minutes: 2,
    authors: ks,
  },
  {
    slug: 'tipping-point-habit-formation',
    title: 'The Tipping Point for Habit Formation',
    summary: 'At 12 to 15 AI actions a week, experimentation becomes habit. How to get users to that threshold faster.',
    topic: 'AI adoption',
    date: '2025-01-12',
    minutes: 2,
    authors: sk,
  },
]

export const insightUrl = (i: Insight) => `https://www.ainroi.com/?blog=${i.slug}`
