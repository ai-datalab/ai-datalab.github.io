# Copilot-DataLab

A hub site for my open-source Microsoft 365 Copilot and agent analytics solutions:
DataHub App for Microsoft Copilot, Agents, Cowork and Autopilots, the platform that brings them together (GitHub Copilot Panel isn't in it yet), and its components: AI in One (adoption),
ValueLens (value), Consumption Central (consumption and cost), Agent Monitor (agents) and GitHub Copilot Panel (GitHub Copilot).

The site uses the names Copilot-DataLab and DataHub App. The repos keep their own names: this one is AI-DataLab, and
DataHub App is [microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots](https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots).

It also has an Insights section (posts on measuring AI adoption and value, written with Shailendra Hegde, each readable
in full on the site) and an About page.

The `#installer` section describes only the DataHub App installer, using the
[installer reference](https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/blob/main/installer/README.md)
and [prerequisites](https://github.com/microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots/blob/main/docs/PREREQUISITES.md).
Keep its Fabric/Azure scope and cost/permission caveats explicit; it is not an
all-app installer. Keep the product name DataHub App and introduce it with the
tagline "for Microsoft Copilot, Agents, Cowork and Autopilots". Legacy solution IDs stay unchanged.

The `#installer-apis` section below the installer guide summarises data that
DataHub App can ingest through public APIs. Its cards are in `dataSources` in
`src/data.ts`, with official documentation links and a pinned implementation
reference in `dataSourceReference`. Check the deployed collectors before updating
the list; distinguish optional and Fabric-only paths, and do not list setup-only
APIs or undocumented routes as data sources.

Installer walkthroughs use the canonical narrated v3 MP4s in each product repository,
not copied video binaries. The `installerVideo` entries in `src/data.ts` feed the
embedded player on each solution's setup page (`#/setup/<id>`); the home page links
to those pages rather than embedding the videos.
Keep native player controls, no autoplay, deferred media loading and the visible
AI-narration/simulated-service disclosure. Verify public media URLs before changing them.

Setup pages share one template. Their steps, guides and downloads live in
`src/setup.ts`; take steps only from each repo's setup docs on `main` and link the
source. AI in One links to its own setup site instead. The DataHub App overview
(`overviewVideo`) uses the canonical MP4, captions, poster and transcript in the
DataHub App repository. The home hero and DataHub App page share that overview.

The understated **Explainer** links on the DataHub card and detail page open
`https://ai-datalab.github.io/#/watch/datahub-explainer`, also shared by the app
and its README. This dedicated watch page uses the unchanged long-form MP4 in
the DataHub repository's `media/datahub-app-explainer.mp4`, with local poster
and English captions in `public/media/`. The 47 chapter timings in
`dataHubExplainerVideo` follow the supplied chapter VTT; chapters stay collapsed
until opened and seeking does not start playback. Keep the hero overview separate.
Publish the source MP4 before publishing these links and verify the actual public
URL supports embedded playback, seeking and captions.

Watch pages are driven by each solution's optional `explainer` metadata in
`src/data.ts`. Its route, hosted video and short caveat feed the shared watch
template and secondary **Explainer** buttons on cards and detail pages. Add an
entry only when its reviewed media and companion assets are ready; solutions
without one show no link. Keep routes unique and chapter seeking user-initiated.

ValueLens, Consumption Central and Agent Monitor use the same template at
`#/watch/valuelens-explainer`, `#/watch/consumption-central-explainer` and
`#/watch/agent-monitor-explainer`. Their MP4s live once in each source repository;
only reviewed posters and captions are copied to this site's `public/media/`.
Their chapter timings come from each delivered chapter JSON. Keep the product
caveats: estimated value is not a measured outcome, missing source coverage is
not zero, and current app captures can differ from older public demo revisions.
Merge and verify source media before publishing the corresponding site links.

ValueLens and Consumption Central also have `powerBiExplainer` metadata.
Their existing watch pages show a small **Power BI version** disclosure,
collapsed by default, beneath the unchanged visible long app explainer.
Expanding it mounts a second native player; collapsing it unmounts and stops that
player. These short tours use approved demo report-canvas captures, the original
Ollie DragonHD narration workflow and OpenMontage/HyperFrames composition;
identifier tables are explicitly omitted. Posters and approximate English
captions are in `public/media/`. Each approved MP4 is hosted in its product
repository's published `main/media/` folder, not this site's Git history.
Any local review copies are Git-ignored and must not be included in the Pages
build. Verify canonical media, seeking and captions before publishing. Do not commit report
URLs, identifiers, account details or unreviewed report captures.

Built with Vite, React and TypeScript. It has no UI framework: the styling is plain CSS in `src/index.css`.

The header and hero link to `#demos`, a browser-demo directory generated from
the published manifest. Each solution has separately labelled app/report buttons
there and on its solution card. Unpublished bundles never create a live link;
adding a verified manifest entry also adds it to the directory.

The DataHub App bundle is pinned to `microsoft/DataHub-App-for-Microsoft-Copilot-Agents-Cowork-and-Autopilots` at
`938ca8dc057dda115125f4d606569116e353c442`. Its imported `SHA256SUMS.txt`
records the 83 payload files; the manifest itself has SHA-256
`2f9a25d51e60bdcd40207dbbc5fb36d3a4d30ac25d8596e53f8cd69500fc2885`.
Only the two HTML titles/descriptions and the provenance repository URL have been
updated for the product tagline and repository rename, with checksums refreshed.
Keep its MIT licence, dependency notices and remaining original bytes. Site staging only
adds the standard HTML isolation policy. The demo uses DataHub App branding;
the existing `/demo/copilot-datahub/` URL stays unchanged.
`SOURCE_PROVENANCE.json` pins the synthetic sample tree and 36 build inputs.
Original sample dates and separate export grains are preserved: 13,337 tasks,
170 inventory people and 2,476.65 typical expert-equivalent hours; all dated
tenant exports total 162,222.8531 credits. Filters narrow dated totals, while
user/agent exports remain separate snapshots. Missing Microsoft 365 telemetry,
evaluation, Defender and Resource Graph data are labelled rather than invented.
The demo's cross-vendor view uses a separately labelled synthetic comparison
period and local vendor/product filters, not the app-wide filters. Ask returns
labelled canned demo responses, not a live AI answer.

## Run it

```bash
npm ci
npm run dev      # local dev server
npm run test:content # data sources, DataHub copy and demo integrity
npm run build    # production build in dist/
```

## Edit the content

All the content is in `src/data.ts`:

- `solutions`: each solution's summary, the question it answers, what it shows, prerequisites, videos, preview image and the one component it covers (the platform has none).
- `log`: the "What's new" entries.
- `related`: external links.
- `dataSources`, `dataSourceReference`: the public data API cards and their source baseline.

Star counts and "last pushed" dates load live from the public GitHub API. If that call fails, the snapshot values in `data.ts` are shown.

The Insights posts are in two places:

- `src/insights.ts`: each post's title, date, topic, summary, reading time and authors (following the post's own byline), newest first.
- `src/posts/<slug>.md`: the post body in Markdown. Each body loads on its own when the post is opened, at `#/insights/<slug>`. Its images are in `public/insights/`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repo, go to **Settings > Pages** and set **Source** to **GitHub Actions**.

## Browser demos

The existing free Pages deployment also serves self-contained browser builds at
`/demo/<slug>/`. No additional hosting or backend is needed. Links on solution cards
and detail pages appear only for entries in `demos/manifest.json`. App and report
demos have separate, explicitly labelled links. The manifest starts empty so no
missing demos are advertised. Agent Evaluator gets a separate report link in the
solutions section only when its demo is available.

Supported paths: `ai-in-one`, `valuelens`, `consumption-central`, `agent-monitor`,
`github-copilot-panel`, `copilot-datahub` (after its release), `ai-in-one-report`,
`valuelens-report`, `consumption-central-report` and `agent-evaluator-report`.
GitHub Copilot Panel is a report demo, not an app demo.

### Integrating a source build

1. Supply a self-contained static bundle from a committed source revision. Put it
   in `demos/builds/<slug>/` with `index.html` and every asset, font and fixture.
   Keep its licence and required third-party notices. Use relative asset paths or
   `/demo/<slug>/` paths, never root `/assets/` paths or external CDNs.
   Use hash or in-memory navigation: Pages has no SPA rewrite fallback.
2. Review fixtures and source. All data must be invented, not anonymised production
   exports. Remove authentication, telemetry, APIs, backend calls and real admin
   actions. Simulated actions must be clearly labelled and change only demo state.
   Include a visible synthetic-data/no-sign-in notice and a back link to `/#solutions`.
   Do not include credentials, tenant data, private source maps or environment files.
3. Add a manifest entry together with the bundle, recording the exact repository,
   full source commit, relative source directory, actual build command and runtime.
   Rebuild from that revision and its lockfile; never copy an uncommitted live build.

Consumption Central's standalone app demo uses the `app/download/Consumption-Central-App.html`
output from the build command pinned in its manifest entry. Copy that file to
`demos/builds/consumption-central/index.html` before staging, and keep the source
commit, command, runtime and bundled file in sync.

Example entry inside the manifest's `demos` array (replace placeholder provenance):

```json
{
  "slug": "ai-in-one",
  "solution": "ai-in-one",
  "kind": "app",
  "source": {
    "repository": "microsoft/AI-in-One-Dashboard",
    "commit": "<full 40-character source commit>",
    "directory": "app/demo"
  },
  "build": {
    "command": "npm ci && npm run build:demo",
    "runtime": "Node.js 22"
  },
  "safety": {
    "inventedFixtures": true,
    "noLiveServices": true,
    "noAdminActions": true
  }
}
```

For report ports, use the matching `-report` slug and `kind: "report"` with the same
solution ID. Agent Evaluator uses solution ID `agent-evaluator` and repository
`microsoft/AgentEvaluator-for-Copilot-Studio`; DataHub App uses solution ID
`ai-datahub`. Supported source repositories and route combinations are validated
in `scripts/stage-demos.mjs`.

The safety fields record a completed human/source review, not an automated proof.
Run `npm run test:demos`, `npm run lint` and `npm run build`. Builds fail on invalid
provenance, missing bundles or missing entry points. Staging copies bundles into
`dist/demo/` and publishes `/demo/provenance.json`. A demo-only Content Security
Policy is inserted before resources in every HTML entry point, blocking cross-origin
connections, external assets, forms, frames, workers and plugins. Same-origin requests
are allowed so demos can fetch their bundled static fixtures. The main site's
behaviour is unchanged. CSP is defence in depth, not a substitute for source review.
Fixtures may be embedded or fetched from the demo's own static files. Source review
must still confirm that no live service calls occur; same-origin CSP is not a
restriction to a particular fixture directory or HTTP method.

Report ports also need fidelity acceptance before a manifest entry is enabled:
verify representative source-supported charts and metrics and that filters
recalculate their values. Page counts, visual inventories and measure search alone
are not acceptance. Record material differences from Power BI explicitly.
Consumption Central's report uses explicit source visual bindings, shared app
calculation modules and invented typed records. It is a source-backed approximation,
not a Power BI renderer or DAX interpreter: only active matrix levels are shown;
native drill, bookmarks, cross-highlighting and service/export menus are absent.
SVG/HTML typography and controls differ. Refresh-time rates stay fixed in fixture
settings; forecasts and task equivalents remain estimates. Studio's dated tenant
data and undated user/agent snapshots deliberately do not share one period total.
Its exact source revision and build command are recorded in the manifest.

GitHub Copilot Panel's enabled report demo ports the shipped template's
assumption-based Value page and labels those figures accordingly. Its demo-only
Assumptions panel changes those values locally. Group By Language is omitted.
These are browser calculations on invented fixtures, not a Power BI service or
an assertion of exhaustive DAX-engine parity. Representative source measures and
independent fixture recomputation support the headline metrics.

ValueLens's report uses 148 explicit source-measure bindings with independent
numerical/category references across its 16 pages. Native charts approximate
Power BI rendering; matrices are expanded leaf tables without native drill or
subtotal controls, and fit badges use accessible text. Dates are month-grain.
Hourly value and effort scenarios are interactive; penalty, monthly licence price
and grading remain at source defaults (1, 30 and Balanced). Narrow screens retain
the horizontally scrollable original canvas rather than a mobile report layout.
Feedback themes use invented text. This is not a general DAX engine.
The source bundle's `bundle-manifest.json` is the import allowlist; untracked files
must not be copied. It hashes the original imported bytes; site staging adds CSP
only to the published HTML.

AI in One's app is imported from its frozen release file manifest, with every
file hash verified. Its provenance points to the approved source fork
`Keithland89/AI-in-One-Dashboard`; the identical pinned commit is also available
in the Microsoft upstream. Only the app route is enabled, not the report port.
The app loads invented CSV fixtures from its own bundle.

Agent Monitor's five bundle files are imported from the pinned `bundleCommit`
in the site manifest. Its `PROVENANCE.md` records the separately pinned app source
and the copyright holder's permission to host and redistribute this demo and
required source-derived assets at `/demo/agent-monitor/`. This is not a general
open-source licence for its repository. Preserve its full third-party notices.
Live source, telemetry, upload and administration controls are unavailable.

Before publication, use `npm run preview` and exercise each demo's navigation and
filters, direct entry, refresh and narrow layouts. Check developer tools for sign-in,
external requests and CSP errors. After an approved Pages deployment, repeat in a
signed-out browser at the public URLs and follow every corresponding solution link.
Do not mark demos delivered until those live checks pass. This integration does not
deploy anything until its changes reach `main` through the usual approved process.
