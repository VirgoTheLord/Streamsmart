"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Sparkles, ArrowUpRight } from "lucide-react";
import { useFetchAnime, useSearchAnime, useFetchTVDetails } from "@/hooks/useTMDB";
import { AnimeCard } from "@/components/anime/anime-card";
import { AnimeModal } from "@/components/anime/anime-modal";
import { Input } from "@/components/ui/input";
import { MoviesNavbar } from "@/components/movies-navbar";
import { DraggableScroll } from "@/components/ui/draggable-scroll";
import { AnimeHeroSlider } from "@/components/anime/anime-hero-slider";

export default function AnimePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  
  const { data: trendingData, loading: trendingLoading } = useFetchAnime(1, 'popularity.desc');
  
  const { data: searchData, loading: searchLoading } = useSearchAnime(searchQuery, 1);
  
  const { data: animeDetails } = useFetchTVDetails(selectedAnimeId);

  const displayAnime = searchQuery.trim() ? searchData?.results : trendingData?.results;
  const isLoading = searchQuery.trim() ? searchLoading : trendingLoading;

  const handleWatchAnime = (animeId: number, title?: string) => {
    const params = new URLSearchParams({
      id: animeId.toString(),
      type: 'tv',
      ...(title && { title: encodeURIComponent(title) }),
      season: '1',
      episode: '1'
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-black dark:text-white">
      <MoviesNavbar /> 

      <section className="relative min-h-[75vh] flex flex-col justify-center px-8 overflow-hidden pt-32 pb-20">
        <AnimeHeroSlider />

        <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-black/50" />

        <div className="max-w-7xl mx-auto relative z-10 w-full -mt-40">
          <h2 className="text-5xl sm:text-7xl font-light font-star mb-4 tracking-wider text-center drop-shadow-2xl lowercase">
            worlds beyond<br /> imagination.
          </h2>
          <p className="text-lg text-black/90 dark:text-white/90 font-raleway max-w-2xl mx-auto text-center mb-10 font-medium drop-shadow-lg">
            Experience the artistry and storytelling of anime. From shonen battles to slice-of-life masterpieces.
          </p>

          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-5 opacity-70 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50 z-10 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search for anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-13 py-6 text-lg font-raleway bg-white/80 dark:bg-black/60 border border-purple-500/20 rounded-xl backdrop-blur-md focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-purple-500/50 transition-all placeholder:text-black/40 dark:placeholder:text-white/40"
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            {searchQuery.trim() ? (
              <>
                <Search className="w-6 h-6 text-purple-500" />
                <h3 className="text-2xl font-bold font-raleway">
                  Search Results for "{searchQuery}"
                </h3>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold font-raleway flex items-center gap-2">
                    What's New this Week in Anime
                </h3>
              </>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
          )}
        </div>

        {!isLoading && displayAnime && displayAnime.length > 0 && (
          <DraggableScroll className="gap-4 py-4 -mx-8 pr-8 pl-[max(2rem,calc(50vw-40rem))]">
            {displayAnime.slice(0, 10).map((anime: any) => (
              <div key={anime.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 select-none text-left">
                <AnimeCard
                  anime={anime}
                  onClick={() => setSelectedAnimeId(anime.id)}
                />
              </div>
            ))}
            
            <div className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 flex items-center justify-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex flex-col items-center justify-center">
                <span className="font-raleway font-bold text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
              </div>
                <button className="w-20 h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-8 h-8 text-white dark:text-black" />
                </button>
            </div>
          </DraggableScroll>
        )}

        <div className="max-w-7xl mx-auto">
          {!isLoading && displayAnime && displayAnime.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-black/20 dark:text-white/20 mx-auto mb-4" />
              <p className="text-xl text-black/60 dark:text-white/60 font-raleway">
                No anime found
              </p>
            </div>
          )}
        </div>
      </section>

      <AnimeModal
        anime={animeDetails || (displayAnime?.find((a:any) => a.id === selectedAnimeId) || null)}
        isOpen={selectedAnimeId !== null}
        onClose={() => setSelectedAnimeId(null)}
        onWatch={handleWatchAnime}
      />
    </div>
  );
}
