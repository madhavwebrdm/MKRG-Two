import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity client (headless CMS).
 *
 * Set the following env vars (in Lovable Cloud secrets / .env):
 *   VITE_SANITY_PROJECT_ID  – your Sanity project id
 *   VITE_SANITY_DATASET     – dataset name (defaults to "production")
 *   VITE_SANITY_API_VERSION – ISO date (defaults to "2024-10-01")
 *
 * Don't forget to add the site origin under
 * sanity.io/manage → API → CORS origins.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? "2024-10-01";

export const sanityEnabled = Boolean(projectId);

export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

type SanityImageSource = Parameters<NonNullable<typeof builder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity client not configured");
  return builder.image(source);
}

/** Safe fetch: returns `fallback` if Sanity is not configured or request fails. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return fallback;
  }
}

/* ---------- Typed content models ---------- */

export interface SanityImage {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
}

export const postsQuery = /* groq */ `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, publishedAt, coverImage
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, publishedAt, coverImage, body
  }
`;