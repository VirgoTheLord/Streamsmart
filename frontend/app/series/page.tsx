"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Search, Loader2, Tv, ArrowUpRight } from "lucide-react";
import { useFetchTV, useSearchTV, useFetchTVDetails } from "@/hooks/useTMDB";
import { SeriesCard } from "@/components/series/series-card";
import { MediaModal } from "@/components/shared/media-modal";
import { Input } from "@/components/ui/input";
import { MoviesNavbar } from "@/components/movies-navbar"; // Reuse for now, maybe rename later
import { DraggableScroll } from "@/components/ui/draggable-scroll";
import { SeriesHeroSlider } from "@/components/series/series-hero-slider";
import { FloatingFooter } from "@/components/floating-footer";

export default function SeriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(null);
  
  const { data: trendingData, loading: trendingLoading } = useFetchTV("/trending/tv/week", 1);
  
  const { data: searchData, loading: searchLoading } = useSearchTV(searchQuery, 1);
  
  const { data: seriesDetails } = useFetchTVDetails(selectedSeriesId);

  const displaySeries = searchQuery.trim() ? searchData?.results : trendingData?.results;
  const isLoading = searchQuery.trim() ? searchLoading : trendingLoading;

  const handleWatchSeries = (seriesId: number, title?: string) => {
    const params = new URLSearchParams({
      id: seriesId.toString(),
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

      <section className="relative min-h-[50vh] md:min-h-[75vh] flex flex-col justify-center px-4 md:px-8 overflow-hidden pt-16 md:pt-32 pb-8 md:pb-20">
        <SeriesHeroSlider />

        <div className="absolute inset-0 z-[1] bg-white/70 dark:bg-black/50" />

        <div className="max-w-7xl mx-auto relative z-10 w-full md:-mt-40">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light font-star mb-2 md:mb-4 tracking-wider text-center drop-shadow-2xl px-2">
            Television,<br /> Reimagined.
          </h2>
          <p className="text-base md:text-lg text-black/90 dark:text-white/90 font-raleway max-w-2xl mx-auto text-center mb-8 md:mb-10 font-medium drop-shadow-lg px-4">
            Dive into binge-worthy series, spanning every genre and era — curated for your ultimate viewing pleasure.
          </p>

          <div className="max-w-xl mx-auto relative mb-8 px-0 sm:px-4">
            <Search className="absolute left-4 sm:left-9 opacity-70 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50 z-10 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search for series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 sm:pl-13 py-6 text-lg font-raleway bg-white/80 dark:bg-black/60 border border-black/5 dark:border-white/10 rounded-xl backdrop-blur-md focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-black/40 dark:placeholder:text-white/40"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4 md:mb-8">
            {searchQuery.trim() ? (
              <>
                <Search className="w-6 h-6 text-serenya-accent" />
                <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[3px]">
                  Search Results for "{searchQuery}"
                </h3>
              </>
            ) : (
              <>
                <h3 className="text-xl md:text-2xl font-bold font-raleway ml-[7px] md:ml-0">What's New This Week In TV.</h3>
              </>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-serenya-primary animate-spin" />
            </div>
          )}
        </div>

        {!isLoading && displaySeries && displaySeries.length > 0 && (
          <DraggableScroll className="gap-2 md:gap-4 py-4 -mx-4 md:-mx-8 pr-4 md:pr-8 pl-[max(2rem,calc(50vw-40rem))] md:pl-[max(3rem,calc(50vw-40rem))]">
            {displaySeries.slice(0, 10).map((series: any) => (
              <div key={series.id} className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 select-none text-left">
                <SeriesCard
                  series={series}
                  onClick={() => setSelectedSeriesId(series.id)}
                />
              </div>
            ))}
            
            <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 flex items-center justify-center gap-2 md:gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex flex-col items-center justify-center">
                <span className="font-raleway font-bold text-lg md:text-xl text-neutral-900 dark:text-white tracking-widest text-center leading-none">SEE <br />MORE</span>
              </div>
                <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 dark:bg-white border border-black/5 dark:border-white/10 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white dark:text-black" />
                </button>
            </div>
          </DraggableScroll>
        )}

        <div className="max-w-7xl mx-auto">
          {!isLoading && displaySeries && displaySeries.length === 0 && (
            <div className="text-center py-20">
              <Tv className="w-16 h-16 text-black/20 dark:text-white/20 mx-auto mb-4" />
              <p className="text-xl text-black/60 dark:text-white/60 font-raleway">
                No series found
              </p>
            </div>
          )}
        </div>
      </section>

      <MediaModal
        media={seriesDetails || (displaySeries?.find((s:any) => s.id === selectedSeriesId) || null)}
        type="tv"
        isOpen={selectedSeriesId !== null}
        onClose={() => setSelectedSeriesId(null)}
        onWatch={handleWatchSeries}
      />
      
      <FloatingFooter />
    </div>
  );
}
