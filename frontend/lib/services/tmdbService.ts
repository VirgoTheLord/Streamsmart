import { Movie } from "@/lib/types/movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

/**
 * Batch-fetches TMDB movie details for an ordered list of IDs.
 * Preserves the original score order. Failures (e.g. deleted IDs)
 * are silently filtered out rather than crashing the whole batch.
 */
export async function fetchMoviesByIds(ids: number[]): Promise<Movie[]> {
  const results = await Promise.allSettled(
    ids.map((id) =>
      fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
      ).then((res) => {
        if (!res.ok) throw new Error(`TMDB ${id}: ${res.status}`);
        return res.json() as Promise<Movie>;
      })
    )
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Movie> => r.status === "fulfilled"
    )
    .map((r) => r.value);
}
