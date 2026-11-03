# Copilot-DataLab

A hub site for my open-source Microsoft 365 Copilot and agent analytics solutions:
DataHub, the platform that brings them together (GitHub Copilot Panel isn't in it yet), and its components: AI in One (adoption),
ValueLens (value), Consumption Central (consumption and cost), Agent Monitor (agents) and GitHub Copilot Panel (GitHub Copilot).

The site uses the names Copilot-DataLab and DataHub. The repos keep their own names: this one is AI-DataLab, and
DataHub is [microsoft/AnalyticsHub-Dashboard](https://github.com/microsoft/AnalyticsHub-Dashboard).

It also has an Insights section (posts on measuring AI adoption and value, written with Shailendra Hegde, each readable
in full on the site) and an About page.

The `#installer` section describes only the DataHub installer, using the
[installer reference](https://github.com/microsoft/AnalyticsHub-Dashboard/blob/main/installer/README.md)
and [prerequisites](https://github.com/microsoft/AnalyticsHub-Dashboard/blob/main/docs/PREREQUISITES.md).
Keep its Fabric/Azure scope and cost/permission caveats explicit; it is not an
all-app installer. Product copy says DataHub, while repository URLs, legacy
solution IDs and imported demo provenance retain their original names.

Built with Vite, React and TypeScript. It has no UI framework: the styling is plain CSS in `src/index.css`.

## Run it

```bash
npm ci
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Edit the content

All the content is in `src/data.ts`:

- `solutions`: each solution's summary, the question it answers, what it shows, prerequisites, videos, preview image and the one component it covers (the platform has none).
- `log`: the "What's new" entries.
- `related`: external links.

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
`microsoft/AgentEvaluator-for-Copilot-Studio`; DataHub uses solution ID
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
