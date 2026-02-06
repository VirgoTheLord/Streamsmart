"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFetchMovies } from "@/hooks/useTMDB";
import Image from "next/image";
import gsap from "gsap";

export function MoviesHeroSlider() {
  const { data: trendingData, loading } = useFetchMovies("/trending/movie/week", 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track replacement poster URLs by Movie ID
  const [replacementPosters, setReplacementPosters] = useState<Record<number, string>>({});
  // Track usage count to prevent loops (retry limit)
  const [retryCounts, setRetryCounts] = useState<Record<number, number>>({});

  const movies = trendingData?.results || [];

  const fetchRandomPoster = async (movieId: number) => {
    try {
      // Fetch a random page of trending movies (1-10) for more variety
      const randomPage = Math.floor(Math.random() * 10) + 1; 
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${randomPage}`
      );
      const data = await res.json();
      
      // Get all currently used replacement posters to ensure uniqueness
      const usedPosters = Object.values(replacementPosters);
      
      // Filter for valid movies: 
      // 1. Has poster
      // 2. Not the same movie
      // 3. Poster not already used as a replacement elsewhere
      // 4. Poster is not the same as the current failed one (if applicable)
      const currentFailedPoster = replacementPosters[movieId] || null;

      const validMovies = data.results?.filter((m: any) => 
        m.poster_path && 
        m.id !== movieId && 
        !usedPosters.includes(m.poster_path) &&
        m.poster_path !== currentFailedPoster
      ) || [];
      
      if (validMovies.length > 0) {
        const randomMovie = validMovies[Math.floor(Math.random() * validMovies.length)];
        
        setReplacementPosters((prev) => ({
          ...prev,
          [movieId]: randomMovie.poster_path 
        }));
      } else {
        // If no unique poster found in this batch, try one more time or just give up for this cycle
        // to avoid thrashing.
      }
    } catch (e) {
      console.error("Failed to fetch fallback poster", e);
    }
  };

  const handleImageError = (movieId: number) => {
    setRetryCounts(prev => {
        const currentCount = prev[movieId] || 0;
        if (currentCount < 3) { // Max 3 retries
            // Trigger fetch
            fetchRandomPoster(movieId);
            return { ...prev, [movieId]: currentCount + 1 };
        } else {
            // Give up and show placeholder (by setting invalid path that falls back to placeholder logic or specific flag)
            // Actually, getPosterSrc handles fallback if replacementPosters[movieId] is still failing. 
            // We can explicitly set it to a placeholder value or just stop updating.
            // If we stop updating, it keeps the broken image. 
            // Let's set it to empty string to force placeholder?
            // Or better, set replacement to a known safe internal placeholder to stop network requests.
            setReplacementPosters(prev => ({ ...prev, [movieId]: "PLACEHOLDER" }));
            return prev;
        }
    });
  };

  const getPosterSrc = (movie: any) => {
     const replacement = replacementPosters[movie.id];
     if (replacement) {
        if (replacement === "PLACEHOLDER") return '/placeholder-movie.svg'; // Safe local fallback
        return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${replacement}`;
     }
     if (movie.poster_path) {
        return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}`;
     }
     return '/placeholder-movie.svg';
  };

  if (loading || movies.length === 0) return null;

  // We want to show 5 items: center, left-1, left-2, right-1, right-2
  const getVisibleMovies = () => {
    if (movies.length < 5) return [];
    
    const items = [];
    for (let i = -2; i <= 2; i++) {
        // Ensure accurate modulo for negative numbers
        const index = ((currentIndex + i) % movies.length + movies.length) % movies.length;
        if (movies[index]) {
          items.push({ ...movies[index], offset: i });
        }
    }
    return items;
  };

  const visibleMovies = getVisibleMovies();

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none mask-image-faded">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[1400px] h-[800px] flex items-center justify-center perspective-1000 translate-y-[100px]"
      >
        {visibleMovies.map((movie, i) => {
          // Calculate positions based on offset
          // offset -2 (far left), -1 (left), 0 (center), 1 (right), 2 (far right)
          
          let x = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          let rotateY = 0;

          if (movie.offset === 0) {
            // Center
            x = 0;
            scale = 1.3;
            opacity = 1;
            zIndex = 20;
            rotateY = 0;
          } else if (movie.offset === -1) {
            // Left 1
            x = -350;
            scale = 1;
            opacity = 0.9;
            zIndex = 10;
            rotateY = 15;
          } else if (movie.offset === 1) {
            // Right 1
            x = 350;
            scale = 1;
            opacity = 0.9;
            zIndex = 10;
            rotateY = -15;
          } else if (movie.offset === -2) {
            // Left 2
            x = -650;
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            rotateY = 25;
          } else if (movie.offset === 2) {
             // Right 2
            x = 650;
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            rotateY = -25;
          }

          return (
            <div
              key={`${movie.id}-${movie.offset}`}
              className="absolute transition-all duration-700 ease-in-out will-change-transform"
              style={{
                transform: `translateX(${x}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
              }}
            >
              <div className="relative w-64 h-96 sm:w-80 sm:h-[480px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-neutral-900">
                <Image
                  src={getPosterSrc(movie)}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => handleImageError(movie.id)}
                />
                {/* Reduced overlay opacity */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Subtle Gradient Overlay only at bottom edge to blend with page content */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#020817] dark:via-transparent dark:to-transparent z-30" />
    </div>
  );
}
