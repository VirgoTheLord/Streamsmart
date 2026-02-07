"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Search, TrendingUp, Home, Loader2, ArrowUpRight, Trophy, Flame } from "lucide-react";
import { useFetchMovies, useSearchMovies, useFetchMovieDetails } from "@/hooks/useTMDB";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieModal } from "@/components/movies/movie-modal";
import { Input } from "@/components/ui/input";
import { MoviesNavbar } from "@/components/movies-navbar";
import { DraggableScroll } from "@/components/ui/draggable-scroll";
import { MoviesHeroSlider } from "@/components/movies/movies-hero-slider";

export default function MoviesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  
  // Three sections: Trending, Top Rated, Action
  const { data: trendingData, loading: trendingLoading } = useFetchMovies("/trending/movie/week", 1);
  const { data: topRatedData, loading: topRatedLoading } = useFetchMovies("/movie/top_rated", 1);
  const { data: actionData, loading: actionLoading } = useFetchMovies("/discover/movie?with_genres=28&sort_by=popularity.desc", 1); 

  const { data: searchData, loading: searchLoading } = useSearchMovies(searchQuery, 1);
  const { data: movieDetails } = useFetchMovieDetails(selectedMovieId);

  const isSearching = searchQuery.trim().length > 0;
  const displaySearch = searchData?.results;
  const isLoading = isSearching ? searchLoading : (trendingLoading || topRatedLoading || actionLoading);

  const handleWatchMovie = (movieId: number, imdbId?: string, title?: string) => {
    const params = new URLSearchParams({
      id: movieId.toString(),
      ...(imdbId && { imdbId }),
      ...(title && { title: encodeURIComponent(title) }),
    });
    router.push(`/player?${params.toString()}`);
  };

  const Section = ({ title, icon: Icon, data, loading }: any) => {
    if (loading || !data?.results?.length) return null;
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 px-8 max-w-7xl mx-auto">
                 <h3 className="text-2xl font-bold font-raleway flex items-center gap-2">
                    {title} <Icon className="w-5 h-5 text-serenya-accent" />
                </h3>
            </div>
            <DraggableScroll className="gap-4 py-4 px-8">
            {data.results.slice(0, 15).map((movie: any) => (
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
        </div>
    );
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

      <section className="py-8 overflow-hidden">
        {isSearching ? (
             <div className="max-w-7xl mx-auto px-8">
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
                ): (
                    displaySearch && displaySearch.length > 0 ? (
                        <DraggableScroll className="gap-4 py-4 -mx-8 pr-8 pl-[max(2rem,calc(50vw-40rem))]">
                            {displaySearch.slice(0, 10).map((movie) => (
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
                <Section title="Trending This Week" icon={TrendingUp} data={trendingData} loading={trendingLoading} />
                <Section title="Top Rated Classics" icon={Trophy} data={topRatedData} loading={topRatedLoading} />
                <Section title="Action & Thriller" icon={Flame} data={actionData} loading={actionLoading} />
             </>
        )}
      </section>

      <MovieModal
        movie={movieDetails || (displaySearch?.find(m => m.id === selectedMovieId) || trendingData?.results?.find((m:any) => m.id === selectedMovieId) || topRatedData?.results?.find((m:any) => m.id === selectedMovieId) || actionData?.results?.find((m:any) => m.id === selectedMovieId) || null)}
        isOpen={selectedMovieId !== null}
        onClose={() => setSelectedMovieId(null)}
        onWatchMovie={handleWatchMovie}
      />
    </div>
  );
}
