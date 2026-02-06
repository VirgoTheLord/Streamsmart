"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFetchMovies } from "@/hooks/useTMDB";
import Image from "next/image";

export function HeroRightSection() {
  const { data: trendingData, loading } = useFetchMovies("/trending/movie/week", 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get first 10 movies for the carousel
  const movies = trendingData?.results?.slice(0, 10) || [];

  // Auto-scroll effect
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      
      // Reset transition flag after animation
      setTimeout(() => setIsTransitioning(false), 600);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  // Preload next image for smooth transitions
  useEffect(() => {
    if (movies.length > 0) {
      const nextIndex = (currentIndex + 1) % movies.length;
      const nextMovie = movies[nextIndex];
      if (nextMovie?.poster_path) {
        const img = new window.Image();
        img.src = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${nextMovie.poster_path}`;
      }
    }
  }, [currentIndex, movies]);

  // Track replacement poster URLs by Movie ID
  const [replacementPosters, setReplacementPosters] = useState<Record<number, string>>({});

  const fetchRandomPoster = async (movieId: number) => {
    try {
      // Fetch a random page of trending movies (1-5) to get variety
      const randomPage = Math.floor(Math.random() * 5) + 1;
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${randomPage}`
      );
      const data = await res.json();
      
      // Filter for movies with posters
      const validMovies = data.results?.filter((m: any) => m.poster_path && m.id !== movieId) || [];
      
      if (validMovies.length > 0) {
        // Pick a random movie from the results
        const randomMovie = validMovies[Math.floor(Math.random() * validMovies.length)];
        const newPosterPath = randomMovie.poster_path;
        
        // Update state with the new URL
        setReplacementPosters((prev) => ({
          ...prev,
          [movieId]: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}`, // We'll append size in getPosterSrc, wait.
          // Actually, store the full path or just the poster_path?
          // Let's store the poster_path so we can resize dynamically.
          [movieId]: newPosterPath 
        }));
      }
    } catch (e) {
      console.error("Failed to fetch fallback poster", e);
    }
  };

  const handleImageError = (movieId: number) => {
    // Only fetch if we haven't already replaced it to avoid loops
    if (!replacementPosters[movieId]) {
       fetchRandomPoster(movieId);
    }
  };

  const getPosterSrc = (movie: any, size: string) => {
    // If we have a replacement, use it
    if (replacementPosters[movie.id]) {
      return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${replacementPosters[movie.id]}`;
    }
    // Otherwise use original
    if (movie?.poster_path) {
      return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${movie.poster_path}`;
    }
    // Temporary failsafe if both fail (though simple fallback logic covers this via replacement)
    return ""; 
  };

  return (
    <div className="relative h-full min-h-[300px] lg:min-h-0">
      <div ref={containerRef} className="relative bg-serenya-primary dark:bg-serenya-accent h-[95%] lg:h-[97%] rounded-sm flex items-center justify-center z-10 overflow-hidden mx-4 lg:mx-0 my-3 lg:my-0">
        
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white/25 text-[10px] sm:text-[11px] font-light tracking-wide z-20">
          (AI)
        </div>

        {/* Movie Poster Carousel */}
        <div 
          className="relative w-full h-full flex items-center justify-center overflow-hidden -mt-6 sm:-mt-8 md:-mt-8"
        >
          {loading ? (
            // Loading skeleton
            <div className="w-full h-full flex items-center justify-center gap-4 px-8">
              <div className="w-32 sm:w-40 h-48 sm:h-60 bg-white/10 dark:bg-black/20 rounded-lg animate-pulse" />
              <div className="w-40 sm:w-52 h-60 sm:h-80 bg-white/20 dark:bg-black/30 rounded-lg animate-pulse" />
              <div className="w-32 sm:w-40 h-48 sm:h-60 bg-white/10 dark:bg-black/20 rounded-lg animate-pulse" />
            </div>
          ) : movies.length > 0 ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Previous poster (left, faded) */}
              <div className="absolute left-4 sm:left-8 z-10 opacity-35 scale-80 transition-all duration-600">
                {(() => {
                   const prevMovie = movies[(currentIndex - 1 + movies.length) % movies.length];
                   return prevMovie && (
                    <div className="relative w-28 sm:w-36 md:w-44 h-42 sm:h-54 md:h-66 rounded-lg overflow-hidden shadow-2xl">
                      <Image
                        src={getPosterSrc(prevMovie, "w500")}
                        alt={prevMovie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
                        loading="lazy"
                        onError={() => handleImageError(prevMovie.id)}
                      />
                    </div>
                  );
                })()}
              </div>

              {/* Current poster (center, large) */}
              <div 
                className={`relative z-20 transition-all duration-600 ${
                  isTransitioning ? 'scale-80 opacity-90' : 'scale-90 opacity-100'
                }`}
              >
                {(() => {
                  const currentMovie = movies[currentIndex];
                  return currentMovie && (
                    <div className="relative w-52 sm:w-64 md:w-80 h-78 sm:h-96 md:h-[480px] rounded-lg overflow-hidden shadow-2xl ring-2 ring-white/20">
                      <Image
                        src={getPosterSrc(currentMovie, "w780")}
                        alt={currentMovie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
                        priority
                        onError={() => handleImageError(currentMovie.id)}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Rating - Top Right (Minimal) */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1">
                        <span className="text-yellow-400 text-sm sm:text-base">★</span>
                        <span className="text-white font-raleway font-semibold text-sm sm:text-base">
                          {currentMovie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      {/* Movie Title - Bottom Left */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                        <h3 className="text-white font-raleway font-bold text-sm sm:text-base md:text-lg line-clamp-2">
                          {currentMovie.title}
                        </h3>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Next poster (right, faded) */}
              <div className="absolute right-4 sm:right-8 z-10 opacity-35 scale-80 transition-all duration-600">
                {(() => {
                   const nextMovie = movies[(currentIndex + 1) % movies.length];
                   return nextMovie && (
                    <div className="relative w-28 sm:w-36 md:w-44 h-42 sm:h-54 md:h-66 rounded-lg overflow-hidden shadow-2xl">
                      <Image
                        src={getPosterSrc(nextMovie, "w500")}
                        alt={nextMovie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
                        loading="lazy"
                        onError={() => handleImageError(nextMovie.id)}
                      />
                    </div>
                  );
                })()}
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                {movies.slice(0, 10).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsTransitioning(false), 600);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Fallback if no movies
            <div className="text-white/50 font-raleway text-sm">
              Loading trending movies...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
