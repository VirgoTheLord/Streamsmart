"use client";

import { MovieDetails } from "@/lib/types/movie";
import { X, Play, Star, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MovieModalProps {
  movie: MovieDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onWatchMovie?: (movieId: number, imdbId?: string, title?: string) => void;
}

export function MovieModal({ movie, isOpen, onClose, onWatchMovie }: MovieModalProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowTrailer(false);
    }
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`
    : '/placeholder-backdrop.png';

  const trailer = movie.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleWatchMovie = () => {
    if (onWatchMovie) {
      onWatchMovie(movie.id, movie.imdb_id, movie.title);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Video Player or Backdrop */}
        {showTrailer && trailer ? (
          <div className="relative aspect-video w-full">
            <iframe
              src={`${process.env.NEXT_PUBLIC_YOUTUBE_EMBED_URL}/${trailer.key}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
            
            {/* Play Button - Now for watching the movie */}
            <button
              onClick={handleWatchMovie}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
            >
              <div className="w-20 h-20 rounded-full bg-serenya-primary hover:bg-serenya-accent transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </div>
            </button>
          </div>
        )}

        {/* Movie Details */}
        <div className="p-8">
          <h2 className="text-4xl font-black font-star text-white mb-2">
            {movie.title}
          </h2>
          
          {movie.tagline && (
            <p className="text-serenya-accent text-lg font-raleway italic mb-4">
              "{movie.tagline}"
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-white/70">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              <span className="font-raleway">{movie.vote_average.toFixed(1)}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-raleway">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </span>
            </div>
            {movie.runtime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-raleway">{movie.runtime} min</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-serenya-primary/20 border border-serenya-primary/40 rounded-full text-sm text-white font-raleway"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-bold font-raleway text-white mb-2">Overview</h3>
            <p className="text-white/80 font-raleway leading-relaxed">
              {movie.overview}
            </p>
          </div>

          {/* Watch Button */}
          <button
            onClick={handleWatchMovie}
            className="px-8 py-3 bg-serenya-primary hover:bg-serenya-accent transition-colors rounded-lg font-raleway font-bold text-white flex items-center gap-2"
          >
            <Play className="w-5 h-5" fill="white" />
            Watch Movie
          </button>
          
          {/* Watch Trailer Button (if available) */}
          {trailer && !showTrailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="ml-4 px-8 py-3 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg font-raleway font-bold text-white"
            >
              Watch Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
