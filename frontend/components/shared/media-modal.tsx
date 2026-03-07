"use client";

import { Movie, MovieDetails } from "@/lib/types/movie";
import { TVShow, TVShowDetails } from "@/lib/types/tv";
import { X, Play, Star, Calendar, Clock, Tv, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export type MediaType = 'movie' | 'tv' | 'anime';

interface MediaModalProps {
  media: Movie | MovieDetails | TVShow | TVShowDetails | null;
  type: MediaType;
  isOpen: boolean;
  onClose: () => void;
  onWatch?: (id: number, title?: string, imdbId?: string) => void;
}

export function MediaModal({ media, type, isOpen, onClose, onWatch }: MediaModalProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      setShowTrailer(false);
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !media) return null;

  const isMovie = type === 'movie';
  const title = isMovie ? (media as Movie).title : (media as TVShow).name;
  const releaseDate = isMovie ? (media as Movie).release_date : (media as TVShow).first_air_date;
  
  const movieDetails = isMovie ? (media as MovieDetails) : null;
  const tvDetails = !isMovie ? (media as TVShowDetails) : null;
  
  const tagline = movieDetails?.tagline || tvDetails?.tagline;
  const genres = movieDetails?.genres || tvDetails?.genres;
  const videos = movieDetails?.videos || tvDetails?.videos;

  const backdropUrl = media.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${media.backdrop_path}`
    : '/placeholder-backdrop.png';

  const trailer = videos?.results?.find(
    (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleWatch = () => {
    if (onWatch) {
      if (isMovie) {
        onWatch(media.id, title, movieDetails?.imdb_id);
      } else {
        onWatch(media.id, title, undefined);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  let borderClass = 'border-white/10';
  let badgeStyle = null;
  let WatchButtonClasses = 'group/watch w-full py-4 bg-white hover:bg-neutral-200 text-black rounded-xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]';
  let WatchButtonText = 'Watch Now';
  let tintOverlay = <div className="absolute inset-0 bg-black/20" />;

  if (type === 'anime') {
    borderClass = 'border-purple-500/20 shadow-purple-500/5';
    badgeStyle = (
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-widest">Anime</span>
      </div>
    );
    WatchButtonClasses = 'group/watch w-full py-4 bg-white hover:bg-purple-50 text-black rounded-xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]';
    WatchButtonText = 'Start Watching';
    tintOverlay = (
      <>
        <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/20" />
      </>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] bg-[#0a0a0a] md:rounded-none overflow-hidden shadow-2xl border-0 md:border ${borderClass} flex flex-col md:flex-row`}>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-full bg-black/60 md:bg-black/40 hover:bg-white/20 text-white/90 md:text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full md:w-2/3 h-[45vh] md:h-auto shrink-0 overflow-hidden group">
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
                    alt={title || "Poster"}
                    fill
                    className="object-cover transition-transform duration-1000 md:group-hover:scale-105"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a]" />
                {tintOverlay}
                
                {trailer && (
                     <button
                        onClick={() => setShowTrailer(true)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group/play"
                     >
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white/20">
                         <Play className="w-8 h-8 text-white fill-white ml-1 opacity-80 group-hover/play:opacity-100" />
                        </div>
                    </button>
                )}
                </>
            )}
        </div>

        <div className="flex-1 p-6 md:p-10 pr-4 md:pr-6 flex flex-col overflow-y-auto w-full md:max-h-[85vh] relative bg-[#0a0a0a] [&::-webkit-scrollbar]:w-3 md:[&::-webkit-scrollbar]:w-5 [&::-webkit-scrollbar-track]:bg-[#141414] [&::-webkit-scrollbar-track]:rounded-full md:[&::-webkit-scrollbar-track]:mt-8 md:[&::-webkit-scrollbar-track]:mb-8 [&::-webkit-scrollbar-track]:border-[4px] md:[&::-webkit-scrollbar-track]:border-[6px] [&::-webkit-scrollbar-track]:border-solid [&::-webkit-scrollbar-track]:border-[#0a0a0a] [&::-webkit-scrollbar-track]:bg-clip-padding [&::-webkit-scrollbar-thumb]:bg-blue-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[4px] md:[&::-webkit-scrollbar-thumb]:border-[6px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#0a0a0a] [&::-webkit-scrollbar-thumb]:bg-clip-padding hover:[&::-webkit-scrollbar-thumb]:bg-blue-500 [scrollbar-width:thin] [scrollbar-color:#2563eb_#141414]">
             <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent md:hidden pointer-events-none" />

            <div className="mb-6 relative z-10">
                {badgeStyle}
                <h2 className="text-3xl md:text-3xl lg:text-4xl mt-2 font-black font-star text-white mb-3 leading-tight tracking-wide">
                    {(title || "").toLowerCase()}
                </h2>
                 {tagline && (
                    <p className="text-base md:text-lg text-white/50 font-raleway font-light italic">
                    "{tagline}"
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-xs md:text-sm font-raleway font-medium text-white/60">
                <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span className="text-white">{media.vote_average?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
                </div>
                
                {isMovie && movieDetails?.runtime && (
                    <div className="flex items-center gap-2">
                         <Clock className="w-4 h-4" />
                        <span>{movieDetails.runtime} min</span>
                    </div>
                )}
                
                {!isMovie && tvDetails?.number_of_seasons && (
                    <div className="flex items-center gap-2">
                         {type === 'anime' ? <Sparkles className="w-4 h-4 text-purple-400" /> : <Tv className="w-4 h-4" />}
                        <span>{tvDetails.number_of_seasons} Seasons</span>
                    </div>
                )}
            </div>

             {genres && genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/80 font-raleway hover:bg-white/10 transition-colors cursor-default"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

            <div className="mb-8 flex-grow">
                <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 font-raleway">Synopsis</h3>
                <p className="text-white/70 font-raleway leading-relaxed text-sm md:text-base">
                    {media.overview || "No synopsis available."}
                </p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3 pb-8 md:pb-0">
                <button
                    onClick={handleWatch}
                    className={WatchButtonClasses}
                >
                    <div className="w-8 h-8 rounded-full border border-black/30 flex items-center justify-center group-hover/watch:border-black group-hover/watch:scale-110 transition-all duration-300 shrink-0">
                        <Play className="w-3 h-3 text-black fill-black" />
                    </div>
                    <span className="font-raleway font-bold text-black uppercase tracking-widest text-sm group-hover/watch:tracking-[0.2em] transition-all duration-300">{WatchButtonText}</span>
                </button>
                 {trailer && !showTrailer && (
                     <button 
                        onClick={() => setShowTrailer(true)}
                        className="group/trailer w-full py-4 bg-transparent border border-white/10 hover:border-white/30 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/5"
                     >
                         <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/trailer:border-white group-hover/trailer:scale-110 transition-all duration-300 shrink-0">
                             <Play className="w-3 h-3 text-white fill-white" />
                         </div>
                         <span className="font-raleway font-bold text-white uppercase tracking-widest text-sm group-hover/trailer:tracking-[0.2em] transition-all duration-300">Trailer</span>
                     </button>
                 )}
            </div>

        </div>
      </div>
    </div>
  );
}
