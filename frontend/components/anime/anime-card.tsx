"use client";

import { TVShow } from "@/lib/types/tv";
import { Star } from "lucide-react";
import Image from "next/image";

interface AnimeCardProps {
  anime: TVShow;
  onClick: () => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const imageUrl = anime.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${anime.poster_path}`
    : '/placeholder-movie.svg';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col gap-4 perspective-1000"
      style={{ perspective: "500px" }}
    >
      <div className="relative w-full aspect-[2/3] transition-all duration-500 ease-out transform-style-3d group-hover:transform-none shadow-xl hover:shadow-2xl"
           style={{ transform: "rotateY(12deg)" }}>
        
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900">
          <Image
            src={imageUrl}
            alt={anime.name}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <div className="px-1 mt-2">
        <h3 className="font-raleway font-bold text-neutral-900 dark:text-white text-lg leading-tight line-clamp-1 mb-1 drop-shadow-md">
          {anime.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm">
             <span className="text-neutral-500 dark:text-white/40 font-raleway font-medium">
                {anime.first_air_date ? new Date(anime.first_air_date).getFullYear() : 'N/A'}
            </span>
            
            <span className="text-neutral-300 dark:text-white/20">•</span>

            <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-neutral-900 dark:text-white font-bold font-raleway">
                {anime.vote_average.toFixed(1)}
                </span>
            </div>
             <span className="text-neutral-300 dark:text-white/20">•</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/60">JP</span>
        </div>
      </div>
    </div>
  );
}
