"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Search, TrendingUp, Home, Loader2, ArrowUpRight, Tv } from "lucide-react";
import { useFetchMovies, useSearchMovies, useFetchMovieDetails, useFetchTV, useFetchTVDetails, useFetchAnime } from "@/hooks/useTMDB";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieModal } from "@/components/movies/movie-modal";
import { SeriesCard } from "@/components/series/series-card";
import { SeriesModal } from "@/components/series/series-modal";
import { AnimeCard } from "@/components/anime/anime-card";
import { AnimeModal } from "@/components/anime/anime-modal";
import { Input } from "@/components/ui/input";
import { MoviesNavbar } from "@/components/movies-navbar";
import { DraggableScroll } from "@/components/ui/draggable-scroll";
import { MoviesHeroSlider } from "@/components/movies/movies-hero-slider";
import { FloatingFooter } from "@/components/floating-footer";

export default function MoviesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  
  const { data: trendingData, loading: trendingLoading } = useFetchMovies("/trending/movie/week", 1);
  const { data: trendingSeries, loading: seriesLoading } = useFetchTV("/trending/tv/week", 1);
  const { data: trendingAnime, loading: animeLoading } = useFetchAnime(1);
  
  const { data: searchData, loading: searchLoading } = useSearchMovies(searchQuery, 1);
  
  const { data: movieDetails } = useFetchMovieDetails(selectedMovieId);
  const { data: seriesDetails } = useFetchTVDetails(selectedSeriesId);
  const { data: animeDetails } = useFetchTVDetails(selectedAnimeId);

  const displayMovies = searchQuery.trim() ? searchData?.results : trendingData?.results;
  const isLoading = searchQuery.trim() ? searchLoading : (trendingLoading || seriesLoading || animeLoading);

  const handleWatchMovie = (movieId: number, imdbId?: string, title?: string) => {
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
      type: 'tv',
      ...(title && { title: encodeURIComponent(title) }),
      season: '1',
      episode: '1'
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white">
      <MoviesNavbar />

      <section className="relative min-h-[75vh] flex flex-col justify-center px-8 overflow-hidden pt-32 pb-20">
        <MoviesHeroSlider />

        <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-black/50" />

        <div className="max-w-7xl mx-auto relative z-10 w-full -mt-40">
          <h2 className="text-5xl sm:text-7xl font-light font-star mb-4 tracking-wider text-center drop-shadow-2xl">
            Entertainment,<br /> Refined.
          </h2>
          <p className="text-lg text-black/90 dark:text-white/90 font-raleway max-w-2xl mx-auto text-center mb-10 font-medium drop-shadow-lg">
            Discover exceptional storytelling across genres, eras, and cultures — presented with clarity and care.
          </p>

          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-5 opacity-70 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50 z-10 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-13 py-6 text-lg font-raleway bg-white/80 dark:bg-black/60 border border-black/5 dark:border-white/10 rounded-xl backdrop-blur-md focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-black/40 dark:placeholder:text-white/40"
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-8 overflow-hidden">
        {/* Search Results (Movies Only for simplicity as user requested "copy shown in movies page") */}
        {searchQuery.trim() ? (
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Search className="w-6 h-6 text-serenya-accent" />
                    <h3 className="text-2xl font-bold font-raleway">
                    Search Results for "{searchQuery}"
                    </h3>
                </div>
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-serenya-primary animate-spin" />
                    </div>
                ) : (
                    displayMovies && displayMovies.length > 0 ? (
                        <DraggableScroll className="gap-4 py-4 -mx-8 pr-8 pl-[max(2rem,calc(50vw-40rem))]">
                            {displayMovies.slice(0, 10).map((movie: any) => (
                            <div key={movie.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 select-none text-left">
                                <MovieCard
                                movie={movie}
                                onClick={() => setSelectedMovieId(movie.id)}
                                />
                            </div>
                            ))}
                        </DraggableScroll>
                    ) : (
                        <div className="text-center py-20">
                            <Film className="w-16 h-16 text-black/20 dark:text-white/20 mx-auto mb-4" />
                            <p className="text-xl text-black/60 dark:text-white/60 font-raleway">
                                No movies found
                            </p>
                        </div>
                    )
                )}
            </div>
        ) : (
          <>
            {/* Movies Section */}
            <div className="mb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold font-raleway">What's New This Week In Cinema.</h3>
                </div>
              </div>

              {!isLoading && (trendingData?.results || []).length > 0 && (
                <DraggableScroll className="gap-4 py-4 -mx-8 pr-8 pl-[max(2rem,calc(50vw-40rem))]">
                  {(trendingData?.results || []).slice(0, 10).map((movie: any) => (
                    <div key={movie.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 select-none text-left">
                      <MovieCard
                        movie={movie}
                        onClick={() => setSelectedMovieId(movie.id)}
                      />
                    </div>
                  ))}
                  
                  <div className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 flex items-center justify-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-raleway font-bold text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
                    </div>
                      <button className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <ArrowUpRight className="w-8 h-8 text-white dark:text-black" />
                      </button>
                  </div>
                </DraggableScroll>
              )}
            </div>

            {/* Series Section */}
            <div className="mb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold font-raleway">What's New This Week In Series.</h3>
                </div>
              </div>

              {!isLoading && (trendingSeries?.results || []).length > 0 && (
                <DraggableScroll className="gap-4 py-4 -mx-8 pr-8 pl-[max(2rem,calc(50vw-40rem))]">
                  {(trendingSeries?.results || []).slice(0, 10).map((series: any) => (
                    <div key={series.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 select-none text-left">
                      <SeriesCard
                        series={series}
                        onClick={() => setSelectedSeriesId(series.id)}
                      />
                    </div>
                  ))}
                  
                  <div className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 flex items-center justify-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-raleway font-bold text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
                    </div>
                      <button className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <ArrowUpRight className="w-8 h-8 text-white dark:text-black" />
                      </button>
                  </div>
                </DraggableScroll>
              )}
            </div>

            {/* Anime Section */}
            <div className="mb-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-2xl font-bold font-raleway">What's New This Week In Anime.</h3>
                </div>
              </div>

              {!isLoading && (trendingAnime?.results || []).length > 0 && (
                <DraggableScroll className="gap-4 py-4 -mx-8 pr-8 pl-[max(2rem,calc(50vw-40rem))]">
                  {(trendingAnime?.results || []).slice(0, 10).map((anime: any) => (
                    <div key={anime.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 select-none text-left">
                      <AnimeCard
                        anime={anime}
                        onClick={() => setSelectedAnimeId(anime.id)}
                      />
                    </div>
                  ))}
                  
                  <div className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 flex items-center justify-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-raleway font-bold text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
                    </div>
                      <button className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <ArrowUpRight className="w-8 h-8 text-white dark:text-black" />
                      </button>
                  </div>
                </DraggableScroll>
              )}
            </div>
          </>
        )}
      </section>

      <MovieModal
        movie={movieDetails || (trendingData?.results?.find((m:any) => m.id === selectedMovieId) || null)}
        isOpen={selectedMovieId !== null}
        onClose={() => setSelectedMovieId(null)}
        onWatchMovie={handleWatchMovie}
      />
      
      <SeriesModal
        series={seriesDetails || (trendingSeries?.results?.find((s:any) => s.id === selectedSeriesId) || null)}
        isOpen={selectedSeriesId !== null}
        onClose={() => setSelectedSeriesId(null)}
        onWatchSeries={handleWatchSeries}
      />

      <AnimeModal
        anime={animeDetails || (trendingAnime?.results?.find((a:any) => a.id === selectedAnimeId) || null)}
        isOpen={selectedAnimeId !== null}
        onClose={() => setSelectedAnimeId(null)}
        onWatch={handleWatchSeries} 
      />

      <FloatingFooter />
    </div>
  );
}
