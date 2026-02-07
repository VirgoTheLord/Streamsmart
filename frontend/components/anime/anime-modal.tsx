"use client";

import { TVShow, TVShowDetails } from "@/lib/types/tv";
import { X, Play, Star, Calendar, Tv, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AnimeModalProps {
  anime: TVShow | TVShowDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onWatch: (animeId: number, title?: string) => void;
}

export function AnimeModal({ anime, isOpen, onClose, onWatch }: AnimeModalProps) {
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

  if (!isOpen || !anime) return null;

  const details = anime as TVShowDetails;

  const backdropUrl = anime.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${anime.backdrop_path}`
    : '/placeholder-backdrop.png';

  const trailer = details.videos?.results?.find(
    (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleWatch = () => {
    if (onWatch) {
      onWatch(anime.id, anime.name);
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
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 flex flex-col md:flex-row shadow-purple-500/5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>

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
                    alt={anime.name}
                    fill
                    className="object-cover transition-transform duration-1000 md:group-hover:scale-105"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a]" />
                <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay" /> {/* Subtle purple tint */}
                <div className="absolute inset-0 bg-black/20" />
                
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

        <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto md:max-h-[85vh] relative bg-[#0a0a0a] no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
             <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent md:hidden pointer-events-none" />

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-widest">Anime</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-star text-white mb-3 leading-tight tracking-wide">
                    {anime.name.toLowerCase()}
                </h2>
                 {details.tagline && (
                    <p className="text-lg text-white/50 font-raleway font-light italic">
                    "{details.tagline}"
                    </p>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-xs md:text-sm font-raleway font-medium text-white/60">
                <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span className="text-white">{anime.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{anime.first_air_date ? new Date(anime.first_air_date).getFullYear() : 'N/A'}</span>
                </div>
                {details.number_of_seasons && (
                    <div className="flex items-center gap-2">
                         <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>{details.number_of_seasons} Seasons</span>
                    </div>
                )}
            </div>

             {details.genres && details.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {details.genres.map((genre) => (
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
                <h3 className="text-base font-bold text-white mb-2 font-raleway">Synopsis</h3>
                <p className="text-white/70 font-raleway leading-relaxed text-sm md:text-base">
                    {anime.overview}
                </p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
                <button
                    onClick={handleWatch}
                    className="group/watch w-full py-4 bg-white hover:bg-purple-50 text-black rounded-xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                >
                    <div className="w-8 h-8 rounded-full border border-black/30 flex items-center justify-center group-hover/watch:border-black group-hover/watch:scale-110 transition-all duration-300">
                        <Play className="w-3 h-3 text-black fill-black" />
                    </div>
                    <span className="font-raleway font-bold text-black uppercase tracking-widest text-sm group-hover/watch:tracking-[0.2em] transition-all duration-300">Start Watching</span>
                </button>
                 {trailer && !showTrailer && (
                     <button 
                        onClick={() => setShowTrailer(true)}
                        className="group/trailer w-full py-4 bg-transparent border border-white/10 hover:border-white/30 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/5"
                     >
                         <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/trailer:border-white group-hover/trailer:scale-110 transition-all duration-300">
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
