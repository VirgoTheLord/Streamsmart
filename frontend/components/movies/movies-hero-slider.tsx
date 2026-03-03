"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFetchMovies } from "@/hooks/useTMDB";
import Image from "next/image";

// Hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export function MoviesHeroSlider() {
  const { data: trendingData, loading } = useFetchMovies("/trending/movie/week", 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowWidth();

  // Track replacement poster URLs by Movie ID
  const [replacementPosters, setReplacementPosters] = useState<Record<number, string>>({});
  const [retryCounts, setRetryCounts] = useState<Record<number, number>>({});

  const movies = trendingData?.results || [];

  // Responsive layout config
  const isMobile = windowWidth > 0 && windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // How many cards to show on each side of center
  const sideCount = isMobile ? 0 : isTablet ? 1 : 2;

  // Responsive offsets (px) and scales
  const getCardStyle = (offset: number) => {
    if (offset === 0) {
      return { x: 0, scale: isMobile ? 1.05 : 1.3, opacity: 1, zIndex: 20, rotateY: 0 };
    }

    const absOffset = Math.abs(offset);
    const sign = Math.sign(offset);

    if (absOffset === 1) {
      const xVal = isMobile ? 0 : isTablet ? sign * 220 : sign * 350;
      return {
        x: xVal,
        scale: isTablet ? 0.9 : 1,
        opacity: isMobile ? 0 : 0.9,
        zIndex: 10,
        rotateY: sign * -15,
      };
    }

    // absOffset === 2 (desktop only)
    return {
      x: sign * (isTablet ? 400 : 650),
      scale: 0.8,
      opacity: isMobile || isTablet ? 0 : 0.8,
      zIndex: 5,
      rotateY: sign * -25,
    };
  };

  const fetchRandomPoster = async (movieId: number) => {
    try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${randomPage}`
      );
      const data = await res.json();
      const usedPosters = Object.values(replacementPosters);
      const currentFailedPoster = replacementPosters[movieId] || null;
      const validMovies = data.results?.filter((m: any) =>
        m.poster_path &&
        m.id !== movieId &&
        !usedPosters.includes(m.poster_path) &&
        m.poster_path !== currentFailedPoster
      ) || [];

      if (validMovies.length > 0) {
        const randomMovie = validMovies[Math.floor(Math.random() * validMovies.length)];
        setReplacementPosters((prev) => ({ ...prev, [movieId]: randomMovie.poster_path }));
      }
    } catch (e) {
      console.error("Failed to fetch fallback poster", e);
    }
  };

  const handleImageError = (movieId: number) => {
    setRetryCounts(prev => {
      const currentCount = prev[movieId] || 0;
      if (currentCount < 3) {
        fetchRandomPoster(movieId);
        return { ...prev, [movieId]: currentCount + 1 };
      } else {
        setReplacementPosters(prev => ({ ...prev, [movieId]: "PLACEHOLDER" }));
        return prev;
      }
    });
  };

  const getPosterSrc = (movie: any) => {
    const replacement = replacementPosters[movie.id];
    if (replacement) {
      if (replacement === "PLACEHOLDER") return '/placeholder-movie.svg';
      return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${replacement}`;
    }
    if (movie.poster_path) {
      return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}`;
    }
    return '/placeholder-movie.svg';
  };

  if (loading || movies.length === 0) return null;

  const getVisibleMovies = () => {
    if (movies.length < 5) return [];
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = ((currentIndex + i) % movies.length + movies.length) % movies.length;
      if (movies[index]) {
        items.push({ ...movies[index], offset: i });
      }
    }
    return items;
  };

  const visibleMovies = getVisibleMovies();

  // Card dimensions responsive
  const cardW = isMobile
    ? "w-48 sm:w-56"
    : isTablet
    ? "w-56 sm:w-64"
    : "w-64 sm:w-80";
  const cardH = isMobile
    ? "h-72"
    : isTablet
    ? "h-80 sm:h-[340px]"
    : "h-96 sm:h-[480px]";

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none mask-image-faded">
      <div
        ref={containerRef}
        className="relative w-full max-w-[1400px] h-[700px] flex items-center justify-center perspective-1000 translate-y-[80px] sm:translate-y-[100px]"
      >
        {visibleMovies.map((movie) => {
          // Only render if within visible sideCount
          if (Math.abs(movie.offset) > sideCount) return null;

          const { x, scale, opacity, zIndex, rotateY } = getCardStyle(movie.offset);

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
              <div className={`relative ${cardW} ${cardH} rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-neutral-900`}>
                <Image
                  src={getPosterSrc(movie)}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 320px"
                  onError={() => handleImageError(movie.id)}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom fade-out gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#020817] dark:via-transparent dark:to-transparent z-30" />
    </div>
  );
}
