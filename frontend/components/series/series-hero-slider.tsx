"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFetchTV } from "@/hooks/useTMDB";
import Image from "next/image";

export function SeriesHeroSlider() {
  const { data: trendingData, loading } = useFetchTV("/trending/tv/week", 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track replacement poster URLs by Show ID
  const [replacementPosters, setReplacementPosters] = useState<Record<number, string>>({});
  // Track usage count to prevent loops (retry limit)
  const [retryCounts, setRetryCounts] = useState<Record<number, number>>({});

  const shows = trendingData?.results || [];

  const fetchRandomPoster = async (showId: number) => {
    try {
      // Fetch a random page of trending TV shows (1-10) for more variety
      const randomPage = Math.floor(Math.random() * 10) + 1; 
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${randomPage}`
      );
      const data = await res.json();
      
      // Get all currently used replacement posters to ensure uniqueness
      const usedPosters = Object.values(replacementPosters);
      
      // Filter for valid shows: 
      // 1. Has poster
      // 2. Not the same show
      // 3. Poster not already used as a replacement elsewhere
      // 4. Poster is not the same as the current failed one (if applicable)
      const currentFailedPoster = replacementPosters[showId] || null;

      const validShows = data.results?.filter((s: any) => 
        s.poster_path && 
        s.id !== showId && 
        !usedPosters.includes(s.poster_path) &&
        s.poster_path !== currentFailedPoster
      ) || [];
      
      if (validShows.length > 0) {
        const randomShow = validShows[Math.floor(Math.random() * validShows.length)];
        
        setReplacementPosters((prev) => ({
          ...prev,
          [showId]: randomShow.poster_path 
        }));
      } else {
        // If no unique poster found in this batch, try one more time or just give up for this cycle
        // to avoid thrashing.
      }
    } catch (e) {
      console.error("Failed to fetch fallback poster", e);
    }
  };

  const handleImageError = (showId: number) => {
    setRetryCounts(prev => {
        const currentCount = prev[showId] || 0;
        if (currentCount < 3) { // Max 3 retries
            // Trigger fetch
            fetchRandomPoster(showId);
            return { ...prev, [showId]: currentCount + 1 };
        } else {
            // Give up and show placeholder (by setting invalid path that falls back to placeholder logic or specific flag)
            // Actually, getPosterSrc handles fallback if replacementPosters[showId] is still failing. 
            // We can explicitly set it to a placeholder value or just stop updating.
            // If we stop updating, it keeps the broken image. 
            // Let's set it to empty string to force placeholder?
            // Or better, set replacement to a known safe internal placeholder to stop network requests.
            setReplacementPosters(prev => ({ ...prev, [showId]: "PLACEHOLDER" }));
            return prev;
        }
    });
  };

  const getPosterSrc = (show: any) => {
     const replacement = replacementPosters[show.id];
     if (replacement) {
        if (replacement === "PLACEHOLDER") return '/placeholder-movie.svg'; // Safe local fallback
        return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${replacement}`;
     }
     if (show.poster_path) {
        return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${show.poster_path}`;
     }
     return '/placeholder-movie.svg';
  };

  if (loading || shows.length === 0) return null;

  // We want to show 5 items: center, left-1, left-2, right-1, right-2
  const getVisibleShows = () => {
    if (shows.length < 5) return [];
    
    const items = [];
    for (let i = -2; i <= 2; i++) {
        // Ensure accurate modulo for negative numbers
        const index = ((currentIndex + i) % shows.length + shows.length) % shows.length;
        if (shows[index]) {
          items.push({ ...shows[index], offset: i });
        }
    }
    return items;
  };

  const visibleShows = getVisibleShows();

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none mask-image-faded">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[1400px] h-[800px] flex items-center justify-center perspective-1000 translate-y-[100px]"
      >
        {visibleShows.map((show, i) => {
          // Calculate positions based on offset
          // offset -2 (far left), -1 (left), 0 (center), 1 (right), 2 (far right)
          
          let x = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          let rotateY = 0;

          if (show.offset === 0) {
            // Center
            x = 0;
            scale = 1.3;
            opacity = 1;
            zIndex = 20;
            rotateY = 0;
          } else if (show.offset === -1) {
            // Left 1
            x = -350;
            scale = 1;
            opacity = 0.9;
            zIndex = 10;
            rotateY = 15;
          } else if (show.offset === 1) {
            // Right 1
            x = 350;
            scale = 1;
            opacity = 0.9;
            zIndex = 10;
            rotateY = -15;
          } else if (show.offset === -2) {
            // Left 2
            x = -650;
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            rotateY = 25;
          } else if (show.offset === 2) {
             // Right 2
            x = 650;
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            rotateY = -25;
          }

          return (
            <div
              key={`${show.id}-${show.offset}`}
              className="absolute transition-all duration-700 ease-in-out will-change-transform"
              style={{
                transform: `translateX(${x}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
              }}
            >
              <div className="relative w-64 h-96 sm:w-80 sm:h-[480px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-neutral-900">
                <Image
                  src={getPosterSrc(show)}
                  alt={show.name}
                  fill
                  className="object-cover"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => handleImageError(show.id)}
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
