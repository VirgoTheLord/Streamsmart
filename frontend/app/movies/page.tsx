"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Search, TrendingUp, Home, Loader2 } from "lucide-react";
import { useFetchMovies, useSearchMovies, useFetchMovieDetails } from "@/hooks/useTMDB";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieModal } from "@/components/movies/movie-modal";
import { Input } from "@/components/ui/input";
import { MoviesNavbar } from "@/components/movies-navbar";
import { DraggableScroll } from "@/components/ui/draggable-scroll";
import { MoviesHeroSlider } from "@/components/movies/movies-hero-slider";
import { ArrowUpRight } from "lucide-react";

export default function MoviesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  
  // Fetch trending movies
  const { data: trendingData, loading: trendingLoading } = useFetchMovies("/trending/movie/week", 1);
  
  // Search movies
  const { data: searchData, loading: searchLoading } = useSearchMovies(searchQuery, 1);
  
  // Fetch selected movie details
  const { data: movieDetails } = useFetchMovieDetails(selectedMovieId);

  const displayMovies = searchQuery.trim() ? searchData?.results : trendingData?.results;
  const isLoading = searchQuery.trim() ? searchLoading : trendingLoading;

  const handleWatchMovie = (movieId: number, imdbId?: string, title?: string) => {
    // Navigate to player page with movie details
    const params = new URLSearchParams({
      id: movieId.toString(),
      ...(imdbId && { imdbId }),
      ...(title && { title: encodeURIComponent(title) }),
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020817] text-black dark:text-white">
      {/* Header */}
      <MoviesNavbar />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex flex-col justify-center px-8 overflow-hidden pt-32 pb-20">
        {/* Background Slider */}
        <MoviesHeroSlider />

        {/* Overlay Layer */}
        <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-black/50" />

        <div className="max-w-7xl mx-auto relative z-10 w-full -mt-40">
          <h2 className="text-5xl sm:text-7xl font-light font-star mb-4 tracking-wider text-center drop-shadow-2xl">
            Entertainment,<br /> Refined.
          </h2>
          <p className="text-lg text-black/90 dark:text-white/90 font-raleway max-w-2xl mx-auto text-center mb-10 font-medium drop-shadow-lg">
            Discover exceptional storytelling across genres, eras, and cultures — presented with clarity and care.
          </p>

          {/* Search Bar */}
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

      {/* Movies Grid */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-8">
            {searchQuery.trim() ? (
              <>
                <Search className="w-6 h-6 text-serenya-accent" />
                <h3 className="text-2xl font-bold font-raleway">
                  Search Results for "{searchQuery}"
                </h3>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold font-raleway">What's New This Week In Cinema.</h3>
              </>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-serenya-primary animate-spin" />
            </div>
          )}

          {/* Movies Carousel */}
          {!isLoading && displayMovies && displayMovies.length > 0 && (
            <DraggableScroll className="gap-4 py-4 -mx-8 px-8">
              {displayMovies.slice(0, 10).map((movie) => (
                <div key={movie.id} className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] flex-shrink-0 select-none text-left">
                  <MovieCard
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.id)}
                  />
                </div>
              ))}
              
              {/* See More Section */}
              <div className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] flex-shrink-0 flex items-center justify-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
                <div className="flex flex-col items-center justify-center">
                  <span className="font-raleway font-bold text-xl text-neutral-900 dark:text-white tracking-widest text-center ">SEE <br />MORE</span>
                </div>
                 <button className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight className="w-8 h-8 text-white dark:text-black" />
                 </button>
              </div>
            </DraggableScroll>
          )}

          {/* No Results */}
          {!isLoading && displayMovies && displayMovies.length === 0 && (
            <div className="text-center py-20">
              <Film className="w-16 h-16 text-black/20 dark:text-white/20 mx-auto mb-4" />
              <p className="text-xl text-black/60 dark:text-white/60 font-raleway">
                No movies found
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Movie Modal */}
      <MovieModal
        movie={movieDetails}
        isOpen={selectedMovieId !== null}
        onClose={() => setSelectedMovieId(null)}
        onWatchMovie={handleWatchMovie}
      />
    </div>
  );
}
