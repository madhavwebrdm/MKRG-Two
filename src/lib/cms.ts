import { useQuery } from "@tanstack/react-query";
import { sanityFetch, sanityEnabled } from "./sanity";

/**
 * useCmsList — fetches a list of documents from Sanity with a static fallback.
 * If Sanity isn't configured (no project id) or returns an empty result,
 * the fallback array is used so the site renders perfectly out of the box.
 */
export function useCmsList<T>(key: string, query: string, fallback: T[], params: Record<string, unknown> = {}): T[] {
  const { data } = useQuery({
    queryKey: ["sanity", key, params],
    queryFn: async () => {
      const docs = await sanityFetch<T[]>(query, params, []);
      return docs.length ? docs : fallback;
    },
    initialData: fallback,
    enabled: sanityEnabled,
    staleTime: 5 * 60 * 1000,
  });
  return data ?? fallback;
}
