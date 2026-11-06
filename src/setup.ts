export interface Link {
  label: string
  url: string
}

export interface Setup {
  /** Three short steps, summarised from the repo's own setup guide. */
  steps: { title: string; text: string }[]
  guide: string
  downloads: Link
  /** The repo pages the steps come from, and the rest of its setup guides. */
  links: Link[]
}

const gh = (repo: string, path: string) => `https://github.com/${repo}/blob/main/${path}`

const dh = 'microsoft/DataHub-App-for-Microsoft-Copilot-Agents-and-Autopilots'
const vl = 'microsoft/ValueLens-for-Microsoft-Copilot'
const cc = 'microsoft/ConsumptionCentral-for-Microsoft-Copilot'
const am = 'ai-datalab/Agent-Monitor'
const gcp = 'microsoft/GitHubCopilotPanel'

/** AI in One keeps its own setup site. */
export const externalSetup: Record<string, string> = {
  'ai-in-one': 'https://microsoft.github.io/AI-in-One-Dashboard/',
}

export const setups: Record<string, Setup> = {
  'ai-datahub': {
    steps: [
      { title: 'Choose your path', text: 'Microsoft Fabric or your Azure subscription. Check the prerequisites first.' },
      { title: 'Run the installer', text: 'Start it from PowerShell or the exe, sign in, answer the questions and approve the plan. Nothing is created until you do.' },
      { title: 'Check it worked', text: 'Wait about 15 minutes, read the Done page, then open the app from its link.' },
    ],
    guide: gh(dh, 'docs/INSTALL.md'),
    downloads: { label: 'Installer downloads', url: `https://github.com/${dh}/releases/latest` },
    links: [
      { label: 'Prerequisites', url: gh(dh, 'docs/PREREQUISITES.md') },
      { label: 'Manual install', url: gh(dh, 'docs/MANUAL-INSTALL.md') },
      { label: 'Troubleshooting', url: gh(dh, 'docs/TROUBLESHOOTING.md') },
      { label: 'Installer reference', url: gh(dh, 'installer/README.md') },
    ],
  },
  valuelens: {
    steps: [
      { title: 'Choose your path', text: 'Fabric, or No Fabric: PAX + SharePoint. Check what your route needs.' },
      { title: 'Run the installer', text: 'Start it from PowerShell or the exe, choose Set up ValueLens and sign in. Answer the questions and approve the plan.' },
      { title: 'Check it worked', text: 'Read the Done page, then open the report, and the app on the PAX route.' },
    ],
    guide: gh(vl, 'docs/INSTALL.md'),
    downloads: { label: 'Installer downloads', url: `https://github.com/${vl}/releases?q=valuelens-installer-v` },
    links: [
      { label: 'Prerequisites', url: gh(vl, 'docs/PREREQUISITES.md#the-valuelens-installer') },
      { label: 'Manual setup: Fabric', url: gh(vl, '1.%20Fabric/README.md') },
      { label: 'Manual setup: SharePoint', url: gh(vl, '4.%20SharePoint/README.md') },
      { label: 'Troubleshooting', url: gh(vl, 'installer/README.md#troubleshooting') },
    ],
  },
  'consumption-central': {
    steps: [
      { title: 'Choose your path', text: 'Fabric, or No Fabric: SharePoint + PAX. Local CSV needs no installer.' },
      { title: 'Run the installer', text: 'Start it from PowerShell or the exe, choose Set up Consumption Central and sign in. Answer the questions and approve the plan.' },
      { title: 'Check it worked', text: 'Open the link to the report, and the app on the No Fabric route.' },
    ],
    guide: gh(cc, 'docs/INSTALL.md'),
    downloads: { label: 'Installer downloads', url: `https://github.com/${cc}/releases?q=consumption-central-installer-v` },
    links: [
      { label: 'Prerequisites', url: gh(cc, 'installer/README.md#before-you-start') },
      { label: 'Manual setup', url: gh(cc, 'README.md#manual') },
      { label: 'Troubleshooting', url: gh(cc, 'installer/README.md#editing-setup-and-recovering-from-failures') },
      { label: 'Installer reference', url: gh(cc, 'installer/README.md') },
    ],
  },
  'agent-monitor': {
    steps: [
      { title: 'Check what it needs', text: 'The admin roles, the Managed Apps settings and Node.js. A missing role becomes a hand-off, not a failure.' },
      { title: 'Run the installer', text: 'Run the PowerShell one-liner with the version from the releases page. It signs you in and checks your roles.' },
      { title: 'Approve and check', text: 'Nothing changes until you approve the plan. Run check later to see each lane’s newest run.' },
    ],
    guide: gh(am, 'installer/README.md#quick-start'),
    downloads: { label: 'Installer downloads', url: `https://github.com/${am}/releases?q=installer-v` },
    links: [
      { label: 'Prerequisites', url: gh(am, 'installer/README.md#prerequisites') },
      { label: 'Manual setup', url: gh(am, 'docs/deployment.md') },
      { label: 'Troubleshooting', url: gh(am, 'installer/README.md#troubleshooting') },
      { label: 'Installer reference', url: gh(am, 'installer/README.md') },
    ],
  },
  'github-copilot-panel': {
    steps: [
      { title: 'Download', text: 'The GitHub Copilot Panel.pbit template and the sample-data folder.' },
      { title: 'Add the data', text: 'Put the CSVs in C:\\GitHub Copilot Panel\\Data, the default folder.' },
      { title: 'Open and load', text: 'Open the template, leave DataSource as CSV and load. Your own data needs one parameter change.' },
    ],
    guide: `https://github.com/${gcp}#try-it-in-about-ten-minutes`,
    downloads: { label: 'Download the template', url: gh(gcp, 'GitHub%20Copilot%20Panel.pbit') },
    links: [
      { label: 'Data sources', url: gh(gcp, 'docs/DATA-SOURCES.md') },
      { label: 'Sample data', url: `https://github.com/${gcp}/tree/main/sample-data` },
      { label: 'Reading the report', url: gh(gcp, 'docs/INTERPRETING.md') },
    ],
  },
}

export const setupHref = (id: string) => externalSetup[id] ?? (setups[id] ? `#/setup/${id}` : undefined)
