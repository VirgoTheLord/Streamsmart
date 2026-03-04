"use client";

import { useEffect, useState, useCallback } from 'react';
import { MoviesResponse, MovieDetails, Movie } from '@/lib/types/movie';
import { ParsedIntent } from '@/lib/types/streamsmart';
import { searchStreamsmart } from '@/lib/services/streamsmartApi';
import { fetchMoviesByIds } from '@/lib/services/tmdbService';
import { toast } from 'sonner';


const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const useFetchMovies = (endpoint: string, page: number = 1) => {
  const [data, setData] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('API Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, page]);

  return { data, loading, error };
};

export const useFetchMovieDetails = (movieId: number | null) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setData(null); 
        setError(null);
        
        const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,similar`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return { data, loading, error };
};

export const useSearchMovies = (query: string, page: number = 1) => {
  const [data, setData] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) {
        setData(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [query, page]);

  return { data, loading, error };
};

// --- TV SERIES HOOKS ---

export const useFetchTV = (endpoint: string, page: number = 1) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchTV = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;
          
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result);
        } catch (err) {
          console.error('API Error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchTV();
    }, [endpoint, page]);
  
    return { data, loading, error };
  };
  
  export const useFetchTVDetails = (tvId: number | null) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchTVDetails = async () => {
        try {
          setLoading(true);
          setData(null); 
          setError(null);
          
          const url = `${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,similar,recommendations,season/1`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      if (tvId) {
        fetchTVDetails();
      }
    }, [tvId]);
  
    return { data, loading, error };
  };

  export const useSearchTV = (query: string, page: number = 1) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const searchTV = async () => {
        if (!query.trim()) {
          setData(null);
          return;
        }
  
        try {
          setLoading(true);
          setError(null);
          
          const url = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      const timeoutId = setTimeout(searchTV, 500);
      return () => clearTimeout(timeoutId);
    }, [query, page]);
  
    return { data, loading, error };
  };

// --- ANIME HOOKS ---

export const useFetchAnime = (page: number = 1, sortBy: string = 'popularity.desc') => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchAnime = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const url = `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&page=${page}&with_genres=16&with_original_language=ja&sort_by=${sortBy}`;
          
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result);
        } catch (err) {
          console.error('API Error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchAnime();
    }, [page, sortBy]);
  
    return { data, loading, error };
};

export const useSearchAnime = (query: string, page: number = 1) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const searchAnime = async () => {
        if (!query.trim()) {
          setData(null);
          return;
        }
  
        try {
          setLoading(true);
          setError(null);
          
          const url = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          
          // Client-side filter for Anime (Genre 16 + Language JA)
          const filteredResults = result.results?.filter((show: any) => 
             show.genre_ids?.includes(16) && show.original_language === 'ja'
          ) || [];
          
          setData({ ...result, results: filteredResults });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      const timeoutId = setTimeout(searchAnime, 500);
      return () => clearTimeout(timeoutId);
    }, [query, page]);
  
    return { data, loading, error };
};

// --- AI SEARCH HOOK ---

export interface AISearchState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  parsedIntent: ParsedIntent | null;
  query: string;
}

/**
 * Orchestrates the StreamSmart retrieval API + TMDB batch fetch.
 * Returns `search(query)` as an imperative trigger.
 * Does NOT auto-search on mount — only fires when the user submits.
 */
export function useAISearch() {
  const [state, setState] = useState<AISearchState>({
    movies: [],
    loading: false,
    error: null,
    parsedIntent: null,
    query: '',
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setState(prev => ({ ...prev, loading: true, error: null, query }));

    try {
      // 1. Call StreamSmart retrieval backend
      const ssResponse = await searchStreamsmart(query);

      // 2. If the query is not movie-related, notify and bail out
      if (ssResponse.intent_passable === false) {
        toast.warning('That doesn\'t look like a movie query', {
          description: 'Try something like "thrilling Tom Cruise movies" or "romantic comedies from the 90s".',
          duration: 5000,
        });
        setState(prev => ({ ...prev, loading: false, query }));
        return;
      }

      // 2. Extract TMDB IDs in ranked order
      const tmdbIds = (ssResponse.results ?? [])
        .map(r => parseInt(r.tmdb_id, 10))
        .filter(id => !isNaN(id));

      // 3. Batch-fetch full TMDB movie details
      const movies = await fetchMoviesByIds(tmdbIds);

      setState({
        movies,
        loading: false,
        error: null,
        parsedIntent: ssResponse.parsed_intent ?? null,
        query,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'AI search failed',
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({ movies: [], loading: false, error: null, parsedIntent: null, query: '' });
  }, []);

  return { ...state, search, reset };
}

