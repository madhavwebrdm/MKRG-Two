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

/* ---------- Shared types ---------- */

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

export interface Service {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  bullets?: string[];
  order?: number;
}

export interface Industry {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface ProcessStep {
  _id: string;
  title: string;
  description?: string;
  order?: number;
}

export interface Milestone {
  _id: string;
  year: string;
  title: string;
  description?: string;
}

export interface Leader {
  _id: string;
  name: string;
  role?: string;
  photo?: SanityImage;
}

export interface CaseStudy {
  _id: string;
  title: string;
  tag?: string;
  description?: string;
  coverImage?: SanityImage;
}

export interface ImpactMetric {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  group?: "home" | "sustainability";
  order?: number;
}

/* ---------- GROQ queries ---------- */

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, category, publishedAt, coverImage
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, category, publishedAt, coverImage, body
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id, title, description, icon, bullets, order
}`;

export const industriesQuery = `*[_type == "industry"] | order(order asc) {
  _id, title, description, icon, order
}`;

export const processStepsQuery = `*[_type == "processStep"] | order(order asc) {
  _id, title, description, order
}`;

export const milestonesQuery = `*[_type == "milestone"] | order(year asc) {
  _id, year, title, description
}`;

export const leadersQuery = `*[_type == "leader"] | order(order asc) {
  _id, name, role, photo
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(order asc) {
  _id, title, tag, description, coverImage
}`;

export const impactMetricsQuery = `*[_type == "impactMetric" && group == $group] | order(order asc) {
  _id, label, value, suffix, group, order
}`;
