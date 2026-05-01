import { StreamSmartResponse } from "@/lib/types/streamsmart";

const STREAMSMART_BASE_URL = "https://pasta-oaf-dizziness.ngrok-free.dev";

/**
 * Calls the StreamSmart AI retrieval endpoint.
 * Returns ranked results with TMDB IDs in score order.
 */
export async function searchStreamsmart(
  query: string,
  options?: { genre?: string; useSlm?: boolean }
): Promise<StreamSmartResponse> {
  const payload: Record<string, unknown> = { query, use_slm: options?.useSlm ?? false };
  if (options?.genre) payload.genre = options.genre;

  const response = await fetch(`${STREAMSMART_BASE_URL}/retrieve`, {
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
