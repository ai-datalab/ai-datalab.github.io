# AI-DataLab

A hub site for my open-source Microsoft 365 Copilot and agent analytics solutions:
AI-DataHub, the platform that brings them together, and its components: AI in One (adoption),
ValueLens (value), Consumption Central (consumption and cost), Agent Monitor (agents) and GitHub Copilot Panel (GitHub Copilot).

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

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repo, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
