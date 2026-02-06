"use client";

import { Movie } from "@/lib/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
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
            alt={movie.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <div className="px-1 mt-2">
        <h3 className="font-raleway font-bold text-neutral-900 dark:text-white text-lg leading-tight line-clamp-1 mb-1 drop-shadow-md">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm">
             <span className="text-neutral-500 dark:text-white/40 font-raleway font-medium">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            
            <span className="text-neutral-300 dark:text-white/20">•</span>

            <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-neutral-900 dark:text-white font-bold font-raleway">
                {movie.vote_average.toFixed(1)}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}
