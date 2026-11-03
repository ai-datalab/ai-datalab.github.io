// Each component covers one thing. DataHub is the platform that brings them together.
export type Component = 'adoption' | 'value' | 'cost' | 'agents' | 'github'

export const componentLabels: Record<Component, string> = {
  adoption: 'Adoption',
  value: 'Value',
  cost: 'Consumption & cost',
  agents: 'Agents',
  github: 'GitHub Copilot',
}

export const components = Object.keys(componentLabels) as Component[]

export interface Video {
  label: string
  url: string
  length?: string
}

export interface Solution {
  id: string
  name: string
  repo: string
  summary: string
  question: string
  /** The one thing this component covers. The platform has none. */
  component?: Component
  /** A component that is not inside the DataHub app yet. */
  notInHub?: boolean
  runsAs: string[]
  measures: string[]
  beforeYouStart: string[]
  tryFirst?: { label: string; url: string }
  videos: Video[]
  preview: { src: string; alt: string }
  includes?: string[]
  related?: string[]
  stars: number
}

export const solutions: Solution[] = [
  {
    id: 'ai-datahub',
    name: 'DataHub',
    repo: 'microsoft/AnalyticsHub-Dashboard',
    summary:
      'The platform that brings it together: one installer sets up an app on Microsoft Fabric or Azure with Copilot and agent adoption, value, consumption and governance in one place.',
    question: 'I want it all in one app, refreshed every day.',
    runsAs: ['The app', 'Power BI', 'Fabric', 'Azure'],
    measures: [
      'Copilot and agent use across the organisation',
      'Hours and value delivered, through the ValueLens report',
      'Credit consumption and cost, with the Consumption Central add-on',
      'Agent inventory and activity, through Agent Monitor',
      'Fresh data every day, kept in your own tenant',
    ],
    beforeYouStart: [
      'A Fabric capacity (F2 or a free trial), or Owner on an Azure subscription or resource group',
      'Power BI Pro',
      'Rights to register an app in Entra, or an admin who can',
      'A Windows 10 or 11 PC. No admin rights needed',
    ],
    videos: [{ label: 'The app, page by page', url: 'https://github.com/microsoft/AnalyticsHub-Dashboard#videos', length: '2 min' }],
    preview: { src: 'previews/analytics-hub.gif', alt: 'The DataHub app, cycling through its pages on sample data' },
    includes: ['valuelens', 'agent-monitor', 'consumption-central'],
    stars: 10,
  },
  {
    id: 'ai-in-one',
    component: 'adoption',
    name: 'AI in One',
    repo: 'microsoft/AI-in-One-Dashboard',
    summary:
      'One dashboard for every Microsoft 365 Copilot, Copilot Chat and agent adoption signal, with row-level security and privacy controls built in.',
    question: 'Who is using Copilot and agents, and where do we need enablement?',
    runsAs: ['The app', 'Power BI', 'SharePoint', 'Local CSV', 'Fabric'],
    measures: [
      'Use of licensed Copilot, unlicensed Copilot Chat and agents over time',
      'Adoption champions and teams that need more support',
      'Habits, agent health and licence priority',
      'Nearly 20 report pages, segmented by department or role',
    ],
    beforeYouStart: [
      'Data exported with the PAX tool. It never leaves your tenant',
      'Power BI Desktop for the report, or a Copilot Managed App for the app',
      'Somewhere for the PAX files: a local folder, SharePoint or OneLake',
    ],
    tryFirst: {
      label: 'Open the app on sample data',
      url: 'https://github.com/microsoft/AI-in-One-Dashboard/blob/main/app/download/AI-in-One-App.html',
    },
    videos: [
      { label: 'Overview', url: 'https://youtu.be/W9JWgF6wcqg', length: '2 min 32 s' },
      { label: 'Setup guide', url: 'https://youtu.be/z4FWazaBDS8', length: '10 min 12 s' },
    ],
    preview: { src: 'previews/ai-in-one.png', alt: 'The AI in One app’s Overview tab on sample data' },
    related: ['valuelens', 'ai-datahub'],
    stars: 102,
  },
  {
    id: 'valuelens',
    component: 'value',
    name: 'ValueLens',
    repo: 'microsoft/ValueLens-for-Microsoft-Copilot',
    summary:
      'The hours and value Microsoft 365 Copilot and agents deliver, by team, tool and task, as an app or a Power BI report.',
    question: 'What value are we getting from Copilot, and is it worth the cost?',
    runsAs: ['The app', 'Power BI', 'Fabric', 'Azure', 'SharePoint', 'Local CSV'],
    measures: [
      'Hours saved and value delivered, by team, tool and task',
      'Task-level activity, with a closer look at Cowork',
      'Model fit and efficiency',
      'Adoption, governance and user feedback alongside value',
    ],
    beforeYouStart: [
      'Power Apps Premium or Copilot Credits for the app, Power BI Pro for the report',
      'A home for the data: Fabric F2 or a free trial, Azure, or SharePoint',
      'A Global Admin to approve read-only Graph access',
      'A Power Platform Admin to allow managed apps',
    ],
    tryFirst: {
      label: 'Open the app on sample data',
      url: 'https://github.com/microsoft/ValueLens-for-Microsoft-Copilot/blob/main/app/download/ValueLens-App.html',
    },
    videos: [
      { label: 'Demo', url: 'https://youtu.be/P0uHJb13ZR0', length: '2 min' },
      { label: 'Fabric setup', url: 'https://youtu.be/-pAuSQSP5pc' },
    ],
    preview: { src: 'previews/valuelens.gif', alt: 'The ValueLens app, cycling through its pages on sample data' },
    related: ['ai-in-one', 'consumption-central', 'ai-datahub'],
    stars: 23,
  },
  {
    id: 'github-copilot-panel',
    component: 'github',
    notInHub: true,
    name: 'GitHub Copilot Panel',
    repo: 'microsoft/GitHubCopilotPanel',
    summary:
      'GitHub Copilot adoption, engagement depth and realised value, as a Power BI template on the Viva Insights GitHub Copilot query output.',
    question: 'Are our developers moving from autocomplete to delegation, and what is that worth?',
    runsAs: ['Power BI', 'Local CSV', 'Viva Insights'],
    measures: [
      'Reach: who has a seat, and who actually uses it',
      'Depth: the move from autocomplete to delegation',
      'Value: what that depth is worth, with every assumption in one table',
      'Seven pages over 120 measures, with synthetic sample data to explore',
    ],
    beforeYouStart: [
      'The Viva Insights GitHub Copilot Export query output, as CSVs or through the Viva Insights connector',
      'Power BI Desktop',
      'Your own seat cost, engineer cost and seat count, to replace the placeholder figures',
    ],
    videos: [{ label: 'Intro', url: 'https://youtu.be/EwzHwbXsWoU', length: '2 min 18 s' }],
    preview: { src: 'previews/github-copilot-panel.gif', alt: 'The GitHub Copilot Panel report, cycling through its pages on synthetic sample data' },
    related: ['ai-datahub', 'valuelens', 'consumption-central'],
    stars: 1,
  },
  {
    id: 'consumption-central',
    component: 'cost',
    name: 'Consumption Central',
    repo: 'microsoft/ConsumptionCentral-for-Microsoft-Copilot',
    summary:
      'Copilot credit consumption and cost across Cowork and Work IQ, Copilot Studio, GitHub Copilot and Azure AI Foundry, as an app or a Power BI report.',
    question: 'What are we consuming, what does it cost, and where can we trim?',
    runsAs: ['The app', 'Power BI', 'Fabric'],
    measures: [
      'Credit consumption and cost, in six tabs',
      'Savings: where to trim',
      'A forecast of what next year looks like',
      'Four products. Data for one is enough to start',
    ],
    beforeYouStart: [
      'Data for at least one product',
      'Two admin settings, turned on once',
      'Power Apps Premium or Copilot Credits for each app user',
      'Power BI Pro and Power BI Desktop, for the report',
    ],
    videos: [
      { label: 'Demo', url: 'https://youtu.be/JdOVx_6kw5Y', length: '1 min 51 s' },
      { label: 'Setup guide', url: 'https://youtu.be/0fgvP8mutTo', length: '10 min 49 s' },
    ],
    preview: { src: 'previews/consumption-central.gif', alt: 'The Consumption Central app, cycling through its tabs on sample data' },
    related: ['ai-datahub', 'valuelens', 'github-copilot-panel'],
    stars: 31,
  },
  {
    id: 'agent-monitor',
    component: 'agents',
    name: 'Agent Monitor',
    repo: 'ai-datalab/Agent-Monitor',
    summary:
      'The agent inventory and risk reporting Microsoft Agent 365 gives you, without an Agent 365 licence. It covers Agent Builder, Copilot Studio, agent flows and Azure AI Foundry, using roles your admins already hold. Pair it with DataHub for agent usage and cost.',
    question: 'Which agents exist across the tenant, who owns them, and which need attention?',
    runsAs: ['The app', 'Power BI', 'Local CSV'],
    measures: [
      'Every agent across Copilot Studio, Agent Builder, agent flows and Azure AI Foundry',
      'Who built and owns each one, and what it can reach',
      'A risk score with its reasons, and what to fix first',
      'Shadow AI and lifecycle review, with anonymised sample data to explore',
    ],
    beforeYouStart: [
      'No Agent 365 licence, and no Agent 365 export',
      'Power Platform Administrator, Global Reader or AI Administrator, for the inventory',
      'Reader on each Azure subscription in scope, for Azure AI Foundry',
      'Everything is read-only: nothing configures or controls an agent',
    ],
    videos: [],
    preview: { src: 'previews/agent-monitor.gif', alt: 'The Agent-Monitor app, cycling through its pages on anonymised sample data' },
    related: ['ai-datahub'],
    stars: 2,
  },
]

export interface ExternalResource {
  title: string
  by: string
  description: string
  url: string
}

export const related: ExternalResource[] = [
  {
    title: 'Agent Inventory in the Copilot Studio Kit',
    by: 'Power CAT',
    description:
      'A Power Apps code app that inventories custom and declarative agents across Power Platform environments, with governance actions and usage metrics.',
    url: 'https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit/blob/main/AGENT_INVENTORY.md',
  },
  {
    title: 'Analytics Hub site',
    by: 'Microsoft',
    description: 'Every report and guide for Copilot analytics with Microsoft Analytics, Purview and Viva Insights.',
    url: 'https://microsoft.github.io/Analytics-Hub/',
  },
  {
    title: 'Copilot Analytics Labs',
    by: 'Microsoft',
    description: 'Templates, sample code and research for measuring Copilot and agent adoption, impact and ROI.',
    url: 'https://microsoft.github.io/CopilotAnalyticsLabs/',
  },
]

export interface LogEntry {
  date: string
  solution: string
  text: string
  url: string
}

export const log: LogEntry[] = [
  { date: '2026-11-01', solution: 'valuelens', text: 'The installer branch is merged, and the app picks up a round of design fixes.', url: 'https://github.com/microsoft/ValueLens-for-Microsoft-Copilot/pull/216' },
  { date: '2026-11-01', solution: 'consumption-central', text: 'The Fabric App gets the same design fixes as ValueLens.', url: 'https://github.com/microsoft/ConsumptionCentral-for-Microsoft-Copilot/pull/79' },
  { date: '2026-10-27', solution: 'ai-datahub', text: 'Links that keep your place, a phone layout, and plainer errors.', url: 'https://github.com/microsoft/AnalyticsHub-Dashboard/pull/217' },
  { date: '2026-10-27', solution: 'agent-monitor', text: 'A pinned filter dock, denser tables and tighter page layouts.', url: 'https://github.com/ai-datalab/Agent-Monitor/pull/12' },
  { date: '2026-10-26', solution: 'ai-datahub', text: 'Installer 0.6.8 released.', url: 'https://github.com/microsoft/AnalyticsHub-Dashboard/releases/tag/installer-v0.6.8' },
  { date: '2026-10-25', solution: 'ai-in-one', text: 'The app now copes with missing users, Agent 365 and empty interactions files.', url: 'https://github.com/microsoft/AI-in-One-Dashboard/pull/81' },
  { date: '2026-10-14', solution: 'github-copilot-panel', text: 'A two-minute intro video walks through the report, page by page.', url: 'https://github.com/microsoft/GitHubCopilotPanel/pull/8' },
  { date: '2026-10-06', solution: 'ai-in-one', text: 'AI in One 2.0 released.', url: 'https://github.com/microsoft/AI-in-One-Dashboard/releases/tag/AIO-v2.0.0' },
]

export const steps = [
  { title: 'Pick a solution', text: 'Start from the question you need answered. If you want all of it, start with DataHub.' },
  { title: 'Try it on sample data', text: 'Watch the demo, or open the app on sample data. There is nothing to install.' },
  { title: 'Line up your admins', text: 'Each repo has a "Before you start" list that says who grants what. Send it round early.' },
  { title: 'Install and share', text: 'Run the installer or open the Power BI template, then share the app with the people who need it.' },
]

export const byId = (id: string) => solutions.find((s) => s.id === id)

export const hub = solutions.find((s) => !s.component)!

/** The components, in the order they are shown. */
export const parts = components.map((c) => solutions.find((s) => s.component === c)!)

/** The platform first, then its components. */
export const ordered = [hub, ...parts]
