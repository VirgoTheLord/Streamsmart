"use client";

import { MovieDetails } from "@/lib/types/movie";
import { X, Play, Star, Calendar, Clock, Film } from "lucide-react";
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
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Visual Section (Backdrop/Trailer) */}
        <div className="relative w-full md:w-2/3 h-[40vh] md:h-auto overflow-hidden group">
            {showTrailer && trailer ? (
                 <iframe
                 src={`${process.env.NEXT_PUBLIC_YOUTUBE_EMBED_URL}/${trailer.key}?autoplay=1`}
                 className="w-full h-full absolute inset-0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
            ) : (
                <>
                <Image
                    src={backdropUrl}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-1000 md:group-hover:scale-105"
                    priority
                    unoptimized
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a]" />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Play Button Overlay (Large) */}
                 <button
                    onClick={() => setShowTrailer(true)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group/play"
                 >
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white/20">
                     <Play className="w-8 h-8 text-white fill-white ml-1 opacity-80 group-hover/play:opacity-100" />
                    </div>
                </button>
                </>
            )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto md:max-h-[85vh] relative bg-[#0a0a0a]">
             {/* Mobile Gradient connection */}
             <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent md:hidden pointer-events-none" />

            <div className="mb-6">
                <h2 className="text-3xl md:text-5xl font-black font-star text-white mb-3 leading-tight tracking-tight">
                    {movie.title}
                </h2>
                 {movie.tagline && (
                    <p className="text-xl text-white/50 font-raleway font-light italic">
                    "{movie.tagline}"
                    </p>
                )}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base font-raleway font-medium text-white/60">
                <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="w-5 h-5 fill-yellow-500" />
                    <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                </div>
                {movie.runtime && (
                    <div className="flex items-center gap-2">
                         <Clock className="w-5 h-5" />
                        <span>{movie.runtime} min</span>
                    </div>
                )}
            </div>

            {/* Genres */}
             {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white/80 font-raleway hover:bg-white/10 transition-colors cursor-default"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

             {/* Overview */}
            <div className="mb-8 flex-grow">
                <h3 className="text-lg font-bold text-white mb-3 font-raleway">Synopsis</h3>
                <p className="text-white/70 font-raleway leading-relaxed text-base md:text-lg">
                    {movie.overview}
                </p>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-6 border-t border-white/5 flex gap-4">
                <button
                    onClick={handleWatchMovie}
                    className="flex-1 py-4 bg-white hover:bg-neutral-200 text-black rounded-xl font-bold font-raleway text-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    <Play className="w-5 h-5 fill-black" />
                    Watch Now
                </button>
                 {trailer && !showTrailer && (
                     <button 
                        onClick={() => setShowTrailer(true)}
                        className="px-6 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-xl font-bold font-raleway flex items-center gap-2 transition-colors"
                     >
                         Trailer
                     </button>
                 )}
            </div>

        </div>
      </div>
    </div>
  );
}
