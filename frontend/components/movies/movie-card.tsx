"use client";

import { Movie } from "@/lib/types/movie";
import { Star, Play } from "lucide-react";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-neutral-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play className="w-16 h-16 text-white" fill="white" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          <span className="text-white text-sm font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-raleway font-bold text-white text-lg line-clamp-1 mb-1">
          {movie.title}
        </h3>
        <p className="text-white/60 text-sm font-raleway">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </div>
  );
}
