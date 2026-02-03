"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFetchMovies } from "@/hooks/useTMDB";
import Image from "next/image";
import gsap from "gsap";

export function MoviesHeroSlider() {
  const { data: trendingData, loading } = useFetchMovies("/trending/movie/week", 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const movies = trendingData?.results || [];

  // Auto-scroll effect removed
  /*
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);
  */

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
                  src={movie.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}` : 'https://placehold.co/600x900/1a1a1a/ffffff?text=No+Poster'}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x900/1a1a1a/ffffff?text=No+Poster';
                  }}
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
