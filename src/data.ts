// Each component covers one thing. DataHub App brings them together.
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

export interface HostedVideo extends Video {
  disclosure: string
  captions?: string
  transcript?: string
  poster?: string
  chapters?: { time: number; label: string }[]
}

const installerVideoDisclosure = 'AI-generated narration. This walkthrough uses simulated services; it is not a recording of a live deployment.'

// Pinned to the commit that adds the overview; switch to main once that change merges upstream.
const overviewMedia = 'https://raw.githubusercontent.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/b5c635e6bc311eeeadb1a19b26b48571734742c0/media/'

export const dataHubOverviewVideo: HostedVideo = {
  label: 'DataHub App overview',
  url: `${overviewMedia}DataHub-App-Overview-OpenMontage-42s.mp4`,
  length: '42 s',
  disclosure: 'AI-generated narration. Synthetic demo data; values shown are not customer results.',
  captions: `${overviewMedia}DataHub-App-Overview-OpenMontage.en-GB.vtt`,
  transcript: `${overviewMedia}DataHub-App-Overview-OpenMontage-transcript.txt`,
  poster: `${overviewMedia}DataHub-App-Overview-OpenMontage-poster.jpg`,
}

export const dataHubExplainerRoute = '/watch/datahub-explainer'

export const dataHubExplainerVideo: HostedVideo = {
  label: 'DataHub App explainer',
  url: 'https://raw.githubusercontent.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/main/media/datahub-app-explainer.mp4',
  length: '29 min 6 s',
  disclosure: 'AI-generated narration. Synthetic demo data; values shown are not customer results.',
  captions: '/media/datahub-explainer.en-GB.vtt',
  poster: '/media/datahub-explainer-poster.jpg',
  chapters: [
    { time: 0, label: 'Start here / How to read the DataHub App' },
    { time: 45.250, label: 'Start here / Dates, filters and coverage' },
    { time: 92.667, label: 'Executive summary / The bottom line' },
    { time: 140.333, label: 'Executive summary / Is it growing?' },
    { time: 186.583, label: 'Executive summary / Where it is landing' },
    { time: 234.917, label: 'Executive summary / What needs attention' },
    { time: 272.917, label: 'Adoption / Adoption' },
    { time: 319.667, label: 'Adoption / Activation' },
    { time: 359.917, label: 'Adoption / Habit formation' },
    { time: 406.250, label: 'Adoption / Trend heatmap' },
    { time: 446.250, label: 'Value / Task breakdown' },
    { time: 500.167, label: 'Value / Estimated value' },
    { time: 559.333, label: 'Value / Value by habit' },
    { time: 604.417, label: 'Value / Cost vs value' },
    { time: 665.333, label: 'Consumption / All products' },
    { time: 707.417, label: 'Consumption / Budget runway' },
    { time: 745.667, label: 'Consumption / Cowork / Work IQ' },
    { time: 792.417, label: 'Consumption / Copilot Studio' },
    { time: 838.583, label: 'Consumption / Azure' },
    { time: 889.583, label: 'Efficiency / Cowork fit' },
    { time: 937.417, label: 'Efficiency / Model fit' },
    { time: 976.500, label: 'Leaderboards / Leaderboard' },
    { time: 1015.167, label: 'Leaderboards / Agents' },
    { time: 1057.333, label: 'Work patterns / Microsoft 365 activity' },
    { time: 1089.250, label: 'Work patterns / Apps and devices' },
    { time: 1112.417, label: 'Work patterns / Copilot in the flow of work' },
    { time: 1140.417, label: 'Readiness / License readiness' },
    { time: 1184.167, label: 'Readiness / Heavy users without a licence' },
    { time: 1217.417, label: 'Readiness / Cowork readiness' },
    { time: 1251.083, label: 'Agent Evaluation / Performance' },
    { time: 1288.167, label: 'Agent Evaluation / Conversations & topics' },
    { time: 1313.167, label: 'Governance / Estate health' },
    { time: 1344.583, label: 'Governance / Exposure' },
    { time: 1371.583, label: 'Governance / Accountability' },
    { time: 1396.167, label: 'Governance / Review queue' },
    { time: 1423.250, label: 'Governance / Shadow AI' },
    { time: 1457.000, label: 'Feedback / Feedback' },
    { time: 1498.750, label: 'Reference / Time per task' },
    { time: 1530.333, label: 'Reference / Glossary' },
    { time: 1553.250, label: 'Reference / Signal to Impact' },
    { time: 1582.833, label: 'Reference / How grading works' },
    { time: 1608.250, label: 'Ask / Ask' },
    { time: 1630.500, label: 'Reports / Exec pre-read' },
    { time: 1651.917, label: 'Reports / Finance weekly' },
    { time: 1672.917, label: 'Reports / Adoption review' },
    { time: 1693.000, label: 'Reports / Custom packs and safe exports' },
    { time: 1712.667, label: 'Putting it together / A simple reading order' },
  ],
}

export interface Solution {
  id: string
  name: string
  tagline?: string
  repo: string
  summary: string
  question: string
  /** The one thing this component covers. The platform has none. */
  component?: Component
  /** A component that is not inside DataHub App yet. */
  notInHub?: boolean
  runsAs: string[]
  measures: string[]
  beforeYouStart: string[]
  tryFirst?: { label: string; url: string }
  powerBiDemo?: string
  videos: Video[]
  installerVideo?: HostedVideo
  overviewVideo?: HostedVideo
  explainer?: { route: string; video: HostedVideo; note: string }
  powerBiExplainer?: HostedVideo
  preview: { src: string; alt: string }
  includes?: string[]
  related?: string[]
  stars: number
}

export const solutions: Solution[] = [
  {
    id: 'ai-datahub',
    name: 'DataHub App',
    tagline: 'for Microsoft Copilot, Agents, Cowork and Autopilots',
    repo: 'microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots',
    summary:
      'The platform that brings it together: one installer sets up an app on Microsoft Fabric or Azure for Copilot and agent adoption, value, consumption, governance and Cowork readiness.',
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
    videos: [{ label: 'The app, page by page', url: 'https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots#videos', length: '2 min' }],
    installerVideo: {
      label: 'DataHub App installer walkthrough',
      url: 'https://raw.githubusercontent.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/main/media/datahub-app-installer-walkthrough-v3.mp4',
      disclosure: installerVideoDisclosure,
    },
    overviewVideo: dataHubOverviewVideo,
    explainer: {
      route: dataHubExplainerRoute,
      video: dataHubExplainerVideo,
      note: 'A page-by-page guide. Cross-vendor views are excluded. Some optional sources show their demo empty states; worked arithmetic is fictional. Captions are approximate.',
    },
    preview: { src: 'previews/analytics-hub.gif', alt: 'DataHub App, cycling through its pages on sample data' },
    includes: ['valuelens', 'agent-monitor', 'consumption-central'],
    stars: 10,
  },
  {
    id: 'ai-in-one',
    component: 'adoption',
    name: 'AI in One',
    powerBiDemo: 'https://microsoft.github.io/Analytics-Hub/demos/#ai-in-one',
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
    powerBiDemo: 'https://microsoft.github.io/Analytics-Hub/demos/#value-lens',
    powerBiExplainer: {
      label: 'ValueLens in Power BI',
      url: 'https://raw.githubusercontent.com/microsoft/ValueLens-for-Microsoft-Copilot/main/media/valuelens-powerbi-explainer.mp4',
      length: '2 min 33 s',
      disclosure: 'Demo data. AI-generated narration. Agent-name detail is omitted. Caption timing is approximate. Modelled value is not a measured outcome or realised cash saving.',
      captions: '/media/valuelens-powerbi-explainer.en-GB.vtt',
      poster: '/media/valuelens-powerbi-explainer-poster.jpg',
      chapters: [
        { time: 0, label: 'Start with activation' },
        { time: 23.25, label: 'Read adoption over time' },
        { time: 48.75, label: 'Understand the work' },
        { time: 73.667, label: 'Treat value as an estimate' },
        { time: 99.917, label: 'Find the next conversation' },
        { time: 125.083, label: 'Check the assumptions' },
      ],
    },
    explainer: {
      route: '/watch/valuelens-explainer',
      video: {
        label: 'ValueLens explainer',
        url: 'https://raw.githubusercontent.com/microsoft/ValueLens-for-Microsoft-Copilot/main/media/ValueLens-App-Explainer.mp4',
        length: '23 min 28 s',
        disclosure: 'Synthetic demo data. AI-generated narration. Fictional worked examples are labelled. Estimates and rule-based grades are not measured outcomes.',
        captions: '/media/valuelens-explainer.en-GB.vtt',
        poster: '/media/valuelens-explainer-poster.jpg',
        chapters: [
          { time: 0, label: 'Start here' },
          { time: 72.416667, label: 'Data and filters' },
          { time: 150.333334, label: 'Assumptions' },
          { time: 226.583334, label: 'Adoption / Activation' },
          { time: 309.083334, label: 'Adoption / Usage' },
          { time: 384.333334, label: 'Adoption / Heatmap' },
          { time: 452.666667, label: 'Adoption / Leaderboard' },
          { time: 528.333334, label: 'Habits' },
          { time: 601.750001, label: 'Agents' },
          { time: 686.250001, label: 'Value / Tasks' },
          { time: 761.500001, label: 'Value / Estimated value' },
          { time: 854.916668, label: 'Value / Signal map' },
          { time: 929.500001, label: 'Fit / Cowork fit' },
          { time: 1008.916668, label: 'Fit / Model fit' },
          { time: 1085.916668, label: 'Readiness / Licences' },
          { time: 1166.916668, label: 'Readiness / Cowork' },
          { time: 1246.083335, label: 'Feedback' },
          { time: 1326.333335, label: 'Guide' },
        ],
      },
      note: 'ValueLens is experimental. Audit evidence can differ from official Microsoft reports. Missing or unmatched evidence is not proof of non-use. Licence and agent dormancy are relative to the loaded audit window, not today. The sample cannot demonstrate your collection, identity, permission or licence configuration. Captions are approximate.',
    },
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
    installerVideo: {
      label: 'ValueLens installer walkthrough',
      url: 'https://raw.githubusercontent.com/microsoft/ValueLens-for-Microsoft-Copilot/main/media/valuelens-installer-walkthrough-v3.mp4',
      disclosure: installerVideoDisclosure,
    },
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
    powerBiDemo: 'https://microsoft.github.io/Analytics-Hub/demos/#consumption-central',
    powerBiExplainer: {
      label: 'Consumption Central in Power BI',
      url: 'https://raw.githubusercontent.com/microsoft/ConsumptionCentral-for-Microsoft-Copilot/main/media/consumption-central-powerbi-explainer.mp4',
      length: '2 min 56 s',
      disclosure: 'Demo data. AI-generated narration. Agent, resource and application identifiers are omitted. Caption timing is approximate. Credit units, cost bases and snapshot periods differ; forecasts are scenarios, not invoices.',
      captions: '/media/consumption-central-powerbi-explainer.en-GB.vtt',
      poster: '/media/consumption-central-powerbi-explainer-poster.jpg',
      chapters: [
        { time: 0, label: 'One reading order' },
        { time: 25.25, label: 'Compare the right things' },
        { time: 49.75, label: 'Follow Cowork demand' },
        { time: 76.667, label: 'Separate totals from snapshots' },
        { time: 101.583, label: 'Look beyond model tokens' },
        { time: 130.333, label: 'Distinguish usage value from billing' },
        { time: 153.333, label: 'Use forecasts as scenarios' },
      ],
    },
    explainer: {
      route: '/watch/consumption-central-explainer',
      video: {
        label: 'Consumption Central explainer',
        url: 'https://raw.githubusercontent.com/microsoft/ConsumptionCentral-for-Microsoft-Copilot/main/media/consumption-central-explainer.mp4',
        length: '34 min 19 s',
        disclosure: 'Synthetic demo data. AI-generated narration. Fictional examples are not dashboard results or contract prices.',
        captions: '/media/consumption-central-explainer.en-GB.vtt',
        poster: '/media/consumption-central-explainer-poster.jpg',
        chapters: [
          { time: 0, label: 'Start here / A simple guide to Consumption Central' },
          { time: 63.75, label: 'Start here / Dates, filters and detail' },
          { time: 132.5, label: 'Start here / Rates and settings' },
          { time: 196, label: 'Start here / Change data and source coverage' },
          { time: 261.75, label: 'Overview / Overview' },
          { time: 328.917, label: 'Cowork & Work IQ / Consumption' },
          { time: 396.333, label: 'Cowork & Work IQ / Cost' },
          { time: 464.25, label: 'Cowork & Work IQ / Chargeback' },
          { time: 534, label: 'Cowork & Work IQ / Tasks' },
          { time: 610, label: 'Cowork & Work IQ / Optimization' },
          { time: 682.417, label: 'Cowork & Work IQ / Forecast' },
          { time: 753, label: 'Copilot Studio / Consumption' },
          { time: 824.75, label: 'Copilot Studio / Cost' },
          { time: 897.75, label: 'Copilot Studio / Optimization' },
          { time: 971.25, label: 'Copilot Studio / Forecast' },
          { time: 1043.5, label: 'GitHub Copilot / Consumption' },
          { time: 1109, label: 'GitHub Copilot / Cost' },
          { time: 1176.75, label: 'GitHub Copilot / Optimization' },
          { time: 1245, label: 'GitHub Copilot / Forecast' },
          { time: 1312.333, label: 'Azure AI Foundry / Spend' },
          { time: 1390.583, label: 'Azure AI Foundry / Capacity & health' },
          { time: 1471.5, label: 'Azure AI Foundry / Reconciliation' },
          { time: 1545.833, label: 'Guide / Start here' },
          { time: 1613.583, label: 'Guide / How to read' },
          { time: 1681.75, label: 'Guide / Products: Cowork & Work IQ' },
          { time: 1743.083, label: 'Guide / Products: Copilot Studio' },
          { time: 1804.25, label: 'Guide / Products: GitHub Copilot' },
          { time: 1858.833, label: 'Guide / Products: Azure AI Foundry' },
          { time: 1915.333, label: 'Guide / Glossary' },
          { time: 1979.667, label: 'Putting it together / A practical review routine' },
        ],
      },
      note: 'Main visuals show the current source build using the public repository synthetic sample. One labelled Overview comparison shows the older deployed public demo with an optional source missing. Captions are sentence-timed approximations, not word-aligned transcription.',
    },
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
    installerVideo: {
      label: 'Consumption Central installer walkthrough',
      url: 'https://raw.githubusercontent.com/microsoft/ConsumptionCentral-for-Microsoft-Copilot/main/media/consumption-central-installer-walkthrough-v3.mp4',
      disclosure: installerVideoDisclosure,
    },
    preview: { src: 'previews/consumption-central.gif', alt: 'The Consumption Central app, cycling through its tabs on sample data' },
    related: ['ai-datahub', 'valuelens', 'github-copilot-panel'],
    stars: 31,
  },
  {
    id: 'agent-monitor',
    component: 'agents',
    name: 'Agent Monitor',
    explainer: {
      route: '/watch/agent-monitor-explainer',
      video: {
        label: 'Agent Monitor explainer',
        url: 'https://raw.githubusercontent.com/ai-datalab/Agent-Monitor/main/media/Agent-Monitor-App-Explainer.mp4',
        length: '15 min 33 s',
        disclosure: 'Current app screens with wholly synthetic fictional data. AI-generated narration. No live telemetry, live AI answers or agent changes. Risk scores, lifecycle verdicts and policy labels are review aids, not verified security outcomes.',
        captions: '/media/agent-monitor-explainer.en-GB.vtt',
        poster: '/media/agent-monitor-explainer-poster.jpg',
        chapters: [
          { time: 0, label: 'A simple guide to Agent-Monitor' },
          { time: 42.083333, label: 'Read the scope before the number' },
          { time: 89.166666, label: 'Start with the estate and attention list' },
          { time: 138.333333, label: 'All agents' },
          { time: 186.166666, label: 'One agent, with its reasons' },
          { time: 229.583333, label: 'Agent inventory' },
          { time: 274.333333, label: 'Creators and ownership' },
          { time: 320.5, label: 'SharePoint agents' },
          { time: 367.5, label: 'Risk and review' },
          { time: 434.583333, label: 'Lifecycle review' },
          { time: 505.5, label: 'Tools' },
          { time: 553.916667, label: 'Knowledge and grounding' },
          { time: 600.25, label: 'Knowledge sources' },
          { time: 648.25, label: 'Azure AI Foundry' },
          { time: 698.666667, label: 'Shadow AI' },
          { time: 749.666667, label: 'Data sources and gaps' },
          { time: 794.666667, label: 'Live lane status' },
          { time: 839.583334, label: 'Ask about the loaded inventory' },
          { time: 883.833334, label: 'From a signal to a considered review' },
        ],
      },
      note: 'Current app screens use fictional fixtures adapted from the older public demo; retired usage and cost views are excluded. Inventory counts, snapshot dates, identities, sites and observations are fictional. Capability reference tables document source limitations, not live probes. Missing source coverage is unknown, not zero. Captions are approximate.',
    },
    repo: 'ai-datalab/Agent-Monitor',
    summary:
      'The agent inventory and risk reporting Microsoft Agent 365 gives you, without an Agent 365 licence. It covers Agent Builder, Copilot Studio, agent flows and Azure AI Foundry, using roles your admins already hold. Pair it with DataHub App for agent usage and cost.',
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
    installerVideo: {
      label: 'Agent Monitor installer walkthrough',
      url: 'https://raw.githubusercontent.com/ai-datalab/Agent-Monitor/main/Images/agent-monitor-installer-walkthrough-v3.mp4',
      disclosure: installerVideoDisclosure,
    },
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
  { date: '2026-10-27', solution: 'ai-datahub', text: 'Links that keep your place, a phone layout, and plainer errors.', url: 'https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/pull/217' },
  { date: '2026-10-27', solution: 'agent-monitor', text: 'A pinned filter dock, denser tables and tighter page layouts.', url: 'https://github.com/ai-datalab/Agent-Monitor/pull/12' },
  { date: '2026-10-26', solution: 'ai-datahub', text: 'Installer 0.6.8 released.', url: 'https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/releases/tag/installer-v0.6.8' },
  { date: '2026-10-25', solution: 'ai-in-one', text: 'The app now copes with missing users, Agent 365 and empty interactions files.', url: 'https://github.com/microsoft/AI-in-One-Dashboard/pull/81' },
  { date: '2026-10-14', solution: 'github-copilot-panel', text: 'A two-minute intro video walks through the report, page by page.', url: 'https://github.com/microsoft/GitHubCopilotPanel/pull/8' },
  { date: '2026-10-06', solution: 'ai-in-one', text: 'AI in One 2.0 released.', url: 'https://github.com/microsoft/AI-in-One-Dashboard/releases/tag/AIO-v2.0.0' },
]

export const steps = [
  { title: 'Pick a solution', text: 'Start from the question you need answered. If you want all of it, start with DataHub App.' },
  { title: 'Try it on sample data', text: 'Watch the demo, or open the app on sample data. There is nothing to install.' },
  { title: 'Line up your admins', text: 'Each repo has a "Before you start" list that says who grants what. Send it round early.' },
  { title: 'Install and share', text: 'Run the installer or open the Power BI template, then share the app with the people who need it.' },
]

export type DataSourceCategory = 'usage' | 'agents' | 'security' | 'cost'

interface DataSource {
  name: string
  category: DataSourceCategory
  description: string
  links: { label: string; url: string }[]
  availability?: string
}

export const dataSourceCategories: Record<DataSourceCategory, string> = {
  usage: 'Usage & identity',
  agents: 'Agents',
  security: 'Audit & security',
  cost: 'Consumption & cost',
}

export const dataSourceReference = 'https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/tree/2eaf37cc2f5f4d0e5a79ca1d8c8b617212811573'

export const dataSources: DataSource[] = [
  {
    name: 'Microsoft 365 usage',
    category: 'usage',
    description: 'Copilot-enabled users and Microsoft 365 app activity.',
    links: [
      { label: 'Copilot usage API', url: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/api/admin-settings/reports/copilotreportroot-getmicrosoft365copilotusageuserdetail' },
      { label: 'Microsoft 365 reports API', url: 'https://learn.microsoft.com/en-us/graph/api/reportroot-getoffice365activeuserdetail?view=graph-rest-1.0' },
    ],
  },
  {
    name: 'People & organisation',
    category: 'usage',
    description: 'Users, departments, manager hierarchy and Copilot licence flags.',
    links: [{ label: 'Microsoft Graph users API', url: 'https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0' }],
  },
  {
    name: 'Agent 365 catalogue',
    category: 'agents',
    description: 'Agent catalogue, creators and data-access capabilities.',
    availability: 'Fabric API; Azure uses an export.',
    links: [{ label: 'Graph Copilot packages API', url: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/api/admin-settings/package/copilotpackages-list' }],
  },
  {
    name: 'Agent & Foundry inventory',
    category: 'agents',
    description: 'Copilot Studio agents and environments, plus Foundry accounts and projects.',
    links: [
      { label: 'Power Platform inventory API', url: 'https://learn.microsoft.com/en-us/rest/api/power-platform/resourcequery/resource-query/query-resources' },
      { label: 'Azure Resource Graph API', url: 'https://learn.microsoft.com/en-us/rest/api/azureresourcegraph/resourcegraph/resources/resources' },
    ],
  },
  {
    name: 'Copilot Studio conversations',
    category: 'agents',
    description: 'Conversation transcripts for the optional Agent Evaluator.',
    links: [{ label: 'Dataverse Web API', url: 'https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query/overview' }],
  },
  {
    name: 'Copilot interactions',
    category: 'security',
    description: 'Copilot interaction audit records from Microsoft 365.',
    links: [
      { label: 'Office 365 Management Activity API', url: 'https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-reference' },
      { label: 'Graph audit search API (beta)', url: 'https://learn.microsoft.com/en-us/graph/api/security-auditcoreroot-post-auditlogqueries?view=graph-rest-beta' },
    ],
  },
  {
    name: 'Sentinel & Defender',
    category: 'security',
    description: 'Copilot audit activity and device or agent risk signals.',
    links: [
      { label: 'Graph advanced hunting API', url: 'https://learn.microsoft.com/en-us/graph/api/security-security-runhuntingquery?view=graph-rest-1.0' },
      { label: 'Azure Monitor Logs API', url: 'https://learn.microsoft.com/en-us/azure/azure-monitor/logs/api/overview' },
    ],
  },
  {
    name: 'Discovered cloud apps',
    category: 'security',
    description: 'Discovered AI cloud apps and associated risk indicators.',
    links: [{ label: 'Graph Cloud Discovery API (beta)', url: 'https://learn.microsoft.com/en-us/defender-cloud-apps/discovered-apps-api-graph' }],
  },
  {
    name: 'Copilot Studio credits',
    category: 'cost',
    description: 'Credit entitlements, allocations and consumption by agent or environment.',
    links: [
      { label: 'Power Platform licensing API', url: 'https://learn.microsoft.com/en-us/rest/api/power-platform/licensing/entitlement/get-entitlement' },
      { label: 'Resource consumption API (deprecated)', url: 'https://learn.microsoft.com/en-us/rest/api/power-platform/licensing/entitlement-insight/get-tenant-resources-across-environments' },
    ],
  },
  {
    name: 'Azure AI costs',
    category: 'cost',
    description: 'Azure AI and Copilot pay-as-you-go spend by service and resource.',
    links: [{ label: 'Azure Cost Management API', url: 'https://learn.microsoft.com/en-us/rest/api/cost-management/query/usage' }],
  },
  {
    name: 'Azure AI usage & pricing',
    category: 'cost',
    description: 'Model token and request metrics, plus published prices for cost estimates.',
    links: [
      { label: 'Azure Monitor metrics API', url: 'https://learn.microsoft.com/en-us/rest/api/monitor/metrics/list' },
      { label: 'Azure Retail Prices API', url: 'https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices' },
    ],
  },
  {
    name: 'GitHub Copilot',
    category: 'cost',
    description: 'Copilot seats and AI credit consumption.',
    availability: 'Optional Fabric notebook.',
    links: [
      { label: 'Copilot seats API (preview)', url: 'https://docs.github.com/en/enterprise-cloud@latest/rest/copilot/copilot-user-management#list-all-copilot-seat-assignments-for-an-enterprise' },
      { label: 'AI credit billing API', url: 'https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage#get-billing-ai-credit-usage-report-for-an-enterprise' },
    ],
  },
]

export const byId = (id: string) => solutions.find((s) => s.id === id)

export const hub = solutions.find((s) => !s.component)!

/** The components, in the order they are shown. */
export const parts = components.map((c) => solutions.find((s) => s.component === c)!)

/** The platform first, then its components. */
export const ordered = [hub, ...parts]
