# Madhav KRG — Sanity CMS setup

The site reads content via `@sanity/client` from `src/lib/sanity.ts`.

## 1. Create a Sanity project

1. Go to https://sanity.io/manage and create a new project.
2. Copy the **Project ID** and **Dataset** name (default: `production`).
3. Add your site origin under **API → CORS origins**
   (e.g. `https://*.lovableproject.com` and your production domain).

## 2. Configure env vars in Lovable

| Variable | Example |
| --- | --- |
| `VITE_SANITY_PROJECT_ID` | `abc12345` |
| `VITE_SANITY_DATASET` | `production` |
| `VITE_SANITY_API_VERSION` | `2024-10-01` |

The site auto-detects whether Sanity is configured. Until then it shows
the static fallback content.

## 3. Schemas

Copy the files in `sanity/schemas/` into your Sanity Studio project
(`schemas/index.ts`). Initial content type: `post`.

## 4. Available queries

Defined in `src/lib/sanity.ts`:

- `postsQuery` — list all posts (newest first)
- `postBySlugQuery` — single post by slug

Add new content types by extending `src/lib/sanity.ts` and your Studio schemas.