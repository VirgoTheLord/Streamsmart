"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Film, Search, Loader2, ArrowUpRight, Sparkles, X } from "lucide-react";
import {
  useFetchMovies,
  useSearchMovies,
  useFetchMovieDetails,
  useFetchTV,
  useFetchTVDetails,
  useFetchAnime,
  useAISearch,
} from "@/hooks/useTMDB";
import { MovieCard } from "@/components/movies/movie-card";
import { SeriesCard } from "@/components/series/series-card";
import { AnimeCard } from "@/components/anime/anime-card";
import { MediaModal } from "@/components/shared/media-modal";
import { Input } from "@/components/ui/input";
import { MoviesNavbar } from "@/components/movies-navbar";
import { DraggableScroll } from "@/components/ui/draggable-scroll";
import { MoviesHeroSlider } from "@/components/movies/movies-hero-slider";
import { FloatingFooter } from "@/components/floating-footer";

// Inner component that reads searchParams
function MoviesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const aiQueryParam = searchParams.get("aiQuery") ?? "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);

  // Read safe mode preference from localStorage (set by hero search bar toggle)
  const [safeMode, setSafeMode] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem('streamsmart_safe_mode');
    if (stored !== null) setSafeMode(stored === 'true');
  }, []);

  // --- AI Search ---
  const { movies: aiMovies, loading: aiLoading, error: aiError, parsedIntent, query: aiQuery, search: runAISearch, reset: resetAI } = useAISearch();

  // Client-side filter: hide adult content when safeMode is on
  const filteredAIMovies = safeMode ? aiMovies.filter(m => !m.adult) : aiMovies;

  // Trigger AI search when URL param changes
  useEffect(() => {
    if (aiQueryParam) {
      runAISearch(aiQueryParam);
    } else {
      resetAI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiQueryParam]);

  // --- Standard TMDB fetching ---
  const { data: trendingData, loading: trendingLoading } = useFetchMovies("/trending/movie/week", 1);
  const { data: trendingSeries, loading: seriesLoading } = useFetchTV("/trending/tv/week", 1);
  const { data: trendingAnime, loading: animeLoading } = useFetchAnime(1);
  const { data: searchData, loading: searchLoading } = useSearchMovies(searchQuery, 1);

  const { data: movieDetails } = useFetchMovieDetails(selectedMovieId);
  const { data: seriesDetails } = useFetchTVDetails(selectedSeriesId);
  const { data: animeDetails } = useFetchTVDetails(selectedAnimeId);

  const displayMovies = searchQuery.trim() ? searchData?.results : trendingData?.results;
  const isLoading = searchQuery.trim() ? searchLoading : (trendingLoading || seriesLoading || animeLoading);

  const handleWatchMovie = (movieId: number, title?: string, imdbId?: string) => {
    const params = new URLSearchParams({
      id: movieId.toString(),
      ...(imdbId && { imdbId }),
      ...(title && { title: encodeURIComponent(title) }),
    });
    router.push(`/player?${params.toString()}`);
  };

  const handleWatchSeries = (seriesId: number, title?: string) => {
    const params = new URLSearchParams({
      id: seriesId.toString(),
      type: "tv",
      ...(title && { title: encodeURIComponent(title) }),
      season: "1",
      episode: "1",
    });
    router.push(`/player?${params.toString()}`);
  };

  const handleClearAI = () => {
    resetAI();
    router.push("/movies");
  };

  // Build intent context pills for display
  const intentPills: string[] = [];
  if (parsedIntent) {
    const actors = parsedIntent.hard_constraints?.actors;
    if (actors) {
      const actorList = Array.isArray(actors) ? actors : [actors];
      actorList.forEach((a) => intentPills.push(`🎬 ${a}`));
    }
    Object.entries(parsedIntent.soft_constraints ?? {}).forEach(([, v]) => {
      if (v.matched_phrase) intentPills.push(`✦ ${v.matched_phrase}`);
    });
    Object.entries(parsedIntent.inferred_signals ?? {}).forEach(([, v]) => {
      if (v.matched_phrase) intentPills.push(`◈ ${v.matched_phrase}`);
    });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white">
      <MoviesNavbar />

      <section className="relative min-h-[50vh] md:min-h-[75vh] flex flex-col justify-center px-4 md:px-8 overflow-hidden pt-16 md:pt-32 pb-8 md:pb-20">
        <MoviesHeroSlider />
        <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-black/50" />
        <div className="max-w-7xl mx-auto relative z-10 w-full md:-mt-40">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light font-star mb-2 md:mb-4 tracking-wider text-center drop-shadow-2xl px-2">
            Entertainment,<br /> Refined.
          </h2>
          <p className="text-base md:text-lg text-black/90 dark:text-white/90 font-raleway max-w-2xl mx-auto text-center mb-8 md:mb-10 font-medium drop-shadow-lg px-4">
            Discover exceptional storytelling across genres, eras, and cultures — presented with clarity and care.
          </p>
          <div className="max-w-xl mx-auto relative mb-8 px-0 sm:px-4">
            <Search className="absolute left-4 sm:left-9 opacity-70 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50 z-10 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 sm:pl-13 py-6 text-lg font-raleway bg-white/80 dark:bg-black/60 border border-black/5 dark:border-white/10 rounded-xl backdrop-blur-md focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-black/40 dark:placeholder:text-white/40"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 md:px-8 overflow-hidden">

        {/* ── AI RESULTS SECTION ── */}
        {aiQueryParam && (
          <div className="max-w-7xl mx-auto mb-16 px-0">
            {/* Section header */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-serenya-accent" />
                  <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[3px]">
                    AI Results
                    <span className="text-sm md:text-base font-normal text-black/50 dark:text-white/40 ml-2 font-raleway block sm:inline mt-1 sm:mt-0">
                      for &ldquo;{aiQueryParam}&rdquo;
                    </span>
                  </h3>
                </div>
                {/* Intent context pills */}
                {intentPills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {intentPills.map((pill, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-raleway px-2.5 py-1 rounded-full bg-serenya-accent/10 dark:bg-serenya-accent/20 text-serenya-accent border border-serenya-accent/20 dark:border-serenya-accent/30"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleClearAI}
                className="flex items-center gap-1.5 text-xs font-raleway text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70 transition-colors shrink-0 mt-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>

            {/* States: loading / error / results / empty */}
            {aiLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-serenya-accent animate-spin" />
                <span className="ml-4 font-raleway text-black/50 dark:text-white/40 text-sm">
                  Thinking with StreamSmart AI…
                </span>
              </div>
            ) : aiError ? (
              <div className="py-12 text-center">
                <p className="font-raleway text-red-400/80 text-sm">
                  {aiError.includes("fetch") || aiError.includes("Failed")
                    ? "Could not reach the AI backend. Is the server running on port 8080?"
                    : aiError}
                </p>
              </div>
            ) : filteredAIMovies.length > 0 ? (
              <DraggableScroll className="gap-2 md:gap-4 py-4 -mx-4 md:-mx-8 pr-4 md:pr-8 pl-[max(2rem,calc(50vw-40rem))] md:pl-[max(3rem,calc(50vw-40rem))]">
                {filteredAIMovies.map((movie: any) => (
                  <div key={movie.id} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 select-none text-left">
                    <MovieCard movie={movie} onClick={() => setSelectedMovieId(movie.id)} />
                  </div>
                ))}
              </DraggableScroll>
            ) : (
              <div className="text-center py-20">
                <Film className="w-12 h-12 text-black/20 dark:text-white/20 mx-auto mb-4" />
                <p className="text-black/50 dark:text-white/40 font-raleway text-sm">
                  No results found for this query.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── STANDARD SEARCH RESULTS ── */}
        {searchQuery.trim() ? (
          <div className="max-w-7xl mx-auto px-0">
            <div className="flex items-center gap-3 mb-8">
              <Search className="w-6 h-6 text-serenya-accent" />
              <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[3px]">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h3>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-serenya-primary animate-spin" />
              </div>
            ) : displayMovies && displayMovies.length > 0 ? (
              <DraggableScroll className="gap-2 md:gap-4 py-4 -mx-4 md:-mx-8 pr-4 md:pr-8 pl-[max(2rem,calc(50vw-40rem))] md:pl-[max(3rem,calc(50vw-40rem))]">
                {displayMovies.slice(0, 10).map((movie: any) => (
                  <div key={movie.id} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 select-none text-left">
                    <MovieCard movie={movie} onClick={() => setSelectedMovieId(movie.id)} />
                  </div>
                ))}
              </DraggableScroll>
            ) : (
              <div className="text-center py-20">
                <Film className="w-16 h-16 text-black/20 dark:text-white/20 mx-auto mb-4" />
                <p className="text-xl text-black/60 dark:text-white/60 font-raleway">No movies found</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Movies Section */}
            <div className="mb-8 md:mb-16">
              <div className="max-w-7xl mx-auto px-0">
                <div className="flex items-center gap-3 mb-2 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[7px] md:ml-0">What&apos;s New This Week In Cinema.</h3>
                </div>
              </div>
              {!isLoading && (trendingData?.results || []).length > 0 && (
                <DraggableScroll className="gap-2 md:gap-4 py-4 -mx-4 md:-mx-8 pr-4 md:pr-8 pl-[max(2rem,calc(50vw-40rem))] md:pl-[max(3rem,calc(50vw-40rem))]">
                  {(trendingData?.results || []).slice(0, 10).map((movie: any) => (
                    <div key={movie.id} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 select-none text-left">
                      <MovieCard movie={movie} onClick={() => setSelectedMovieId(movie.id)} />
                    </div>
                  ))}
                  <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-raleway font-bold text-lg md:text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
                    </div>
                    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white dark:text-black" />
                    </button>
                  </div>
                </DraggableScroll>
              )}
            </div>

            {/* Series Section */}
            <div className="mb-8 md:mb-16">
              <div className="max-w-7xl mx-auto px-0">
                <div className="flex items-center gap-3 mb-2 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[7px] md:ml-0">What&apos;s New This Week In Series.</h3>
                </div>
              </div>
              {!isLoading && (trendingSeries?.results || []).length > 0 && (
                <DraggableScroll className="gap-2 md:gap-4 py-4 -mx-4 md:-mx-8 pr-4 md:pr-8 pl-[max(2rem,calc(50vw-40rem))] md:pl-[max(3rem,calc(50vw-40rem))]">
                  {(trendingSeries?.results || []).slice(0, 10).map((series: any) => (
                    <div key={series.id} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 select-none text-left">
                      <SeriesCard series={series} onClick={() => setSelectedSeriesId(series.id)} />
                    </div>
                  ))}
                  <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-raleway font-bold text-lg md:text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
                    </div>
                    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white dark:text-black" />
                    </button>
                  </div>
                </DraggableScroll>
              )}
            </div>

            {/* Anime Section */}
            <div className="mb-0">
              <div className="max-w-7xl mx-auto px-0">
                <div className="flex items-center gap-3 mb-2 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[7px] md:ml-0">What&apos;s New This Week In Anime.</h3>
                </div>
              </div>
              {!isLoading && (trendingAnime?.results || []).length > 0 && (
                <DraggableScroll className="gap-2 md:gap-4 py-4 -mx-4 md:-mx-8 pr-4 md:pr-8 pl-[max(2rem,calc(50vw-40rem))] md:pl-[max(3rem,calc(50vw-40rem))]">
                  {(trendingAnime?.results || []).slice(0, 10).map((anime: any) => (
                    <div key={anime.id} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 select-none text-left">
                      <AnimeCard anime={anime} onClick={() => setSelectedAnimeId(anime.id)} />
                    </div>
                  ))}
                  <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-raleway font-bold text-lg md:text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
                    </div>
                    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white dark:text-black" />
                    </button>
                  </div>
                </DraggableScroll>
              )}
            </div>
          </>
        )}
      </section>

      <MediaModal
        media={movieDetails || (trendingData?.results?.find((m: any) => m.id === selectedMovieId) || null)}
        type="movie"
        isOpen={selectedMovieId !== null}
        onClose={() => setSelectedMovieId(null)}
        onWatch={handleWatchMovie}
      />
      <MediaModal
        media={seriesDetails || (trendingSeries?.results?.find((s: any) => s.id === selectedSeriesId) || null)}
        type="tv"
        isOpen={selectedSeriesId !== null}
        onClose={() => setSelectedSeriesId(null)}
        onWatch={handleWatchSeries}
      />
      <MediaModal
        media={animeDetails || (trendingAnime?.results?.find((a: any) => a.id === selectedAnimeId) || null)}
        type="anime"
        isOpen={selectedAnimeId !== null}
        onClose={() => setSelectedAnimeId(null)}
        onWatch={handleWatchSeries}
      />
      <FloatingFooter />
    </div>
  );
}

// Wrap in Suspense because useSearchParams requires it in Next.js App Router
export default function MoviesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-serenya-accent animate-spin" />
      </div>
    }>
      <MoviesPageInner />
    </Suspense>
  );
}
