"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Search, TrendingUp, Home, Loader2 } from "lucide-react";
import { useFetchMovies, useSearchMovies, useFetchMovieDetails } from "@/hooks/useTMDB";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieModal } from "@/components/movies/movie-modal";
import { Input } from "@/components/ui/input";

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
      <header className="border-b border-black/10 dark:border-white/10 py-6 px-8 sticky top-0 bg-white/80 dark:bg-[#020817]/80 backdrop-blur-lg z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black font-star tracking-widest">STREAMSMART</h1>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-raleway hover:text-serenya-primary transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="/movies" className="text-sm font-raleway text-serenya-primary flex items-center gap-2">
              <Film className="w-4 h-4" />
              Movies
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-8 bg-gradient-to-b from-serenya-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Film className="w-12 h-12 text-serenya-accent" />
          </div>
          <h2 className="text-5xl font-light font-star mb-4 tracking-wider text-center">
            Discover Movies
          </h2>
          <p className="text-lg text-black/70 dark:text-white/70 font-raleway max-w-2xl mx-auto text-center mb-8">
            Browse through thousands of movies powered by TMDB
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg font-raleway bg-white dark:bg-neutral-900 border-2 border-black/10 dark:border-white/10 focus:border-serenya-primary dark:focus:border-serenya-accent rounded-xl"
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
                <TrendingUp className="w-6 h-6 text-serenya-accent" />
                <h3 className="text-2xl font-bold font-raleway">Trending This Week</h3>
              </>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-serenya-primary animate-spin" />
            </div>
          )}

          {/* Movies Grid */}
          {!isLoading && displayMovies && displayMovies.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovieId(movie.id)}
                />
              ))}
            </div>
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
