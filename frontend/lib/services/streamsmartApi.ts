import { StreamSmartResponse } from "@/lib/types/streamsmart";

const STREAMSMART_BASE_URL = "http://10.171.120.41:8080";

/**
 * Calls the StreamSmart AI retrieval endpoint.
 * Returns ranked results with TMDB IDs in score order.
 */
export async function searchStreamsmart(
  query: string,
  options?: { genre?: string }
): Promise<StreamSmartResponse> {
  const payload: Record<string, unknown> = { query, use_slm: false };
  if (options?.genre) payload.genre = options.genre;

  const response = await fetch(`${STREAMSMART_BASE_URL}/retrieve/core`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `StreamSmart API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<StreamSmartResponse>;
}
