# Madhav KRG — Sanity Headless CMS

The site reads all editable content from Sanity. Until you connect a project,
it falls back to the hard-coded content in each route so the site renders
perfectly out of the box.

## 1. Install Sanity Studio (separately)

```bash
npm create sanity@latest -- --template clean --create-project "Madhav KRG"
```

Copy the schemas in `sanity/schemas/` into your studio's `schemas/` folder and
register them in `sanity.config.ts`:

```ts
import { schemaTypes } from "./schemas";

export default defineConfig({
  // ...
  schema: { types: schemaTypes },
});
```

## 2. Configure environment variables

Set these in your Lovable Cloud secrets (or `.env` locally):

| Variable | Required | Default |
| --- | --- | --- |
| `VITE_SANITY_PROJECT_ID` | yes | – |
| `VITE_SANITY_DATASET` | no | `production` |
| `VITE_SANITY_API_VERSION` | no | `2024-10-01` |

## 3. Allow your origin (CORS)

In `sanity.io/manage` → your project → **API → CORS origins**, add:

- `http://localhost:8080` (local dev)
- `https://*.lovableproject.com` (Lovable preview)
- your production domain

Don't tick "Allow credentials" — the site uses public read-only queries.

## 4. Content types provided

| Type | Powers |
| --- | --- |
| `service` | Services page + home grid |
| `industry` | Industries page + home grid |
| `processStep` | Process page + home timeline |
| `milestone` | About → Journey timeline |
| `leader` | About → Leadership grid |
| `caseStudy` | Home → Case studies |
| `impactMetric` | Home + Sustainability counters (filter by `group`) |
| `post` | Insights / blog |

The `icon` field on `service` / `industry` accepts a Lucide icon name
(e.g. `Cpu`, `Recycle`, `Battery`, `Truck`). See `src/lib/icons.tsx` for the
full allow-list.
