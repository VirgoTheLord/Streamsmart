"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { X, RefreshCw, AlertCircle, Server, MonitorPlay, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { PLAYER_MIRRORS } from "@/lib/config/player-mirrors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFetchTVDetails, useFetchTVSeason } from "@/hooks/useTMDB";

export function MoviePlayer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const movieId = searchParams.get("id");
  const imdbId = searchParams.get("imdbId") || undefined;
  const title = searchParams.get("title");
  const type = searchParams.get("type") as 'movie' | 'tv' || 'movie';
  
  // State for TV Series
  const [season, setSeason] = useState(Number(searchParams.get("season")) || 1);
  const [episode, setEpisode] = useState(Number(searchParams.get("episode")) || 1);
  const [showSeasonSelector, setShowSeasonSelector] = useState(false);
  const [showEpisodeSelector, setShowEpisodeSelector] = useState(false);

  const { data: tvDetails } = useFetchTVDetails(type === 'tv' ? Number(movieId) : null);
  const { data: seasonData } = useFetchTVSeason(type === 'tv' ? Number(movieId) : null, season);

  const [currentMirrorIndex, setCurrentMirrorIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [showMirrorSelector, setShowMirrorSelector] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sortedMirrors = [...PLAYER_MIRRORS].sort((a, b) => a.priority - b.priority);
  const currentMirror = sortedMirrors[currentMirrorIndex];
  
  const playerUrl = useMemo(() => {
    if (!movieId) return "";
    return currentMirror.buildUrl({ 
        movieId, 
        imdbId, 
        type, 
        season: type === 'tv' ? season : undefined, 
        episode: type === 'tv' ? episode : undefined 
    });
  }, [movieId, imdbId, type, season, episode, currentMirror]);

  useEffect(() => {
    // Update URL params when season/episode changes without reloading page entirely if possible
    // actually router.push will reload if we don't use shallow routing or similar, but nextjs 13+ app router is better.
    // However, for the player, we might just want to update the internal state and let the iframe reload.
    // We already do that via state. But we should also sync URL so sharing works.
    
    // params.set only works if we create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'tv') {
        params.set('season', season.toString());
        params.set('episode', episode.toString());
        // router.replace(`?${params.toString()}`, { scroll: false }); 
        // Commented out to avoid re-triggering full page reloads unnecessarily, 
        // but ideally we sync URL. For now let's just use local state to drive the player.
    }
  }, [season, episode, type, searchParams, router]);

  useEffect(() => {
    setHasError(false);

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "PLAYER_EVENT") {
        const { event: playerEvent, currentTime, duration } = event.data.data;
        
        if (movieId) {
          localStorage.setItem(
            `progress_${type}_${movieId}` + (type === 'tv' ? `_s${season}_e${episode}` : ''),
            JSON.stringify({
              currentTime,
              duration,
              timestamp: Date.now(),
              mirror: currentMirror.id,
              season: type === 'tv' ? season : undefined,
              episode: type === 'tv' ? episode : undefined
            })
          );
        }
      }
    };

    window.addEventListener("message", handleMessage);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push(type === 'tv' ? '/series' : '/movies');
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movieId, imdbId, playerUrl, currentMirror, router, type, season, episode]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const handleIframeError = () => {
    console.error("Iframe failed to load");
    setHasError(true);
  };

  const switchMirror = (index: number) => {
    if (index >= 0 && index < sortedMirrors.length) {
      setCurrentMirrorIndex(index);
      setShowMirrorSelector(false);
    }
  };

  // Note: we fetch detailed episodes per season instead of relying on a fallback.
  // Season Data fetch covers this inherently with useFetchTVSeason
  const episodes = seasonData?.episodes || [];

  if (!movieId) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <p className="text-xl font-raleway">Invalid ID</p>
          <Button
            onClick={() => router.push('/movies')}
            className="mt-4 px-6 py-2 bg-serenya-primary hover:bg-serenya-accent rounded-lg font-raleway transition-colors"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <iframe
          ref={iframeRef}
          src={playerUrl}
          className="w-full h-full border-none"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          title={title ? decodeURIComponent(title) : "Player"}
          onError={handleIframeError}
        />
      </div>

      <div 
        className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 ease-in-out ${
          showControls ? "bg-gradient-to-b from-black/70 via-transparent to-black/70 opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-4 left-4 md:top-8 md:left-8 pointer-events-auto">
          <button
            onClick={() => router.push(type === 'tv' ? '/series' : '/movies')}
            className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            title="Close Player"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        <div className="absolute top-4 right-4 md:top-8 md:right-8 pointer-events-auto flex flex-col items-end gap-2 md:gap-3">
          {type === 'tv' && tvDetails && (
             <div className="flex gap-2">
                {/* Season Selector */}
                <div className="relative">
                    <button
                        onClick={() => { setShowSeasonSelector(!showSeasonSelector); setShowEpisodeSelector(false); }}
                        className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white font-raleway text-xs md:text-sm"
                    >
                        <span>Season {season}</span>
                        {showSeasonSelector ? <ChevronUp className="w-3 h-3 md:w-4 md:h-4"/> : <ChevronDown className="w-3 h-3 md:w-4 md:h-4"/>}
                    </button>
                    {showSeasonSelector && (
                        <div className="absolute top-full right-0 mt-2 w-32 max-h-64 overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-1 z-50 no-scrollbar">
                             {tvDetails.seasons?.filter((s:any) => s.season_number > 0).map((s: any) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setSeason(s.season_number); setEpisode(1); setShowSeasonSelector(false); }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${season === s.season_number ? "bg-serenya-primary text-white" : "text-white/70 hover:bg-white/10"}`}
                                >
                                    Season {s.season_number}
                                </button>
                             ))}
                        </div>
                    )}
                </div>

                {/* Episode Selector */}
                 <div className="relative">
                    <button
                        onClick={() => { setShowEpisodeSelector(!showEpisodeSelector); setShowSeasonSelector(false); }}
                         className="flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white font-raleway text-xs md:text-sm"
                    >
                        <span className="hidden sm:inline">Episode</span><span className="sm:hidden">Ep</span> <span>{episode}</span>
                        {showEpisodeSelector ? <ChevronUp className="w-3 h-3 md:w-4 md:h-4"/> : <ChevronDown className="w-3 h-3 md:w-4 md:h-4"/>}
                    </button>
                    {showEpisodeSelector && (
                        <div className="absolute top-full right-0 mt-2 w-32 max-h-64 overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-1 z-50 no-scrollbar">
                             {episodes.length > 0 ? (
                                episodes.map((ep: any) => (
                                    <button
                                        key={ep.id}
                                        onClick={() => { setEpisode(ep.episode_number); setShowEpisodeSelector(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${episode === ep.episode_number ? "bg-serenya-primary text-white" : "text-white/70 hover:bg-white/10"}`}
                                    >
                                        <div className="font-semibold">Episode {ep.episode_number}</div>
                                        <div className="text-[10px] opacity-70 truncate mt-0.5">{ep.name}</div>
                                    </button>
                                ))
                             ) : (
                                <div className="text-white/50 text-xs px-3 py-2">Loading episodes...</div>
                             )}
                        </div>
                    )}
                </div>
             </div>
          )}

          <div className="relative flex flex-col items-end">
            <button
                onClick={() => setShowMirrorSelector(!showMirrorSelector)}
                className="group flex items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300 shadow-xl"
            >
                <span className="text-white/90 font-raleway font-medium text-xs md:text-sm hidden md:block">
                Server: <span className="text-serenya-accent font-bold">{currentMirror.name}</span>
                </span>
                <span className="text-white/90 font-raleway font-bold text-xs md:hidden">
                    {currentMirror.name}
                </span>
                <Server className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-serenya-accent transition-colors hidden md:block" />
            </button>

            <div 
                className={`mt-2 md:mt-3 w-40 md:w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-top-right -mr-0 md:-mr-2 ${
                showMirrorSelector ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                }`}
            >
                <div className="p-2 space-y-1">
                {sortedMirrors.map((mirror, index) => (
                    <button
                    key={mirror.id}
                    onClick={() => switchMirror(index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-raleway text-sm transition-all ${
                        index === currentMirrorIndex
                        ? "bg-serenya-primary text-white font-medium"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    >
                    <span className="flex items-center gap-2">
                        <MonitorPlay className="w-3.5 h-3.5" />
                        {mirror.name}
                    </span>
                    {index === currentMirrorIndex && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white box-shadow-glow" />
                    )}
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-4 right-20 md:bottom-10 md:left-10 md:right-auto pointer-events-auto max-w-2xl">
          {title && (
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 text-[9px] md:text-[10px]">
                <span className="px-1.5 md:px-2 py-0.5 rounded font-bold bg-white/20 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider shadow-sm">
                  {type === 'tv' ? 'Series' : 'Movies'}
                </span>
                <span className="px-1.5 md:px-2 py-0.5 rounded font-bold bg-serenya-primary/80 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider shadow-sm">
                  HD
                </span>
                 {type === 'tv' && (
                     <span className="px-1.5 md:px-2 py-0.5 rounded font-bold bg-white/10 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider shadow-sm truncate max-w-[120px]">
                        S{season} E{episode}
                     </span>
                 )}
              </div>
              <h1 className="text-white font-raleway font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-2xl tracking-tight leading-tight line-clamp-2 md:leading-none">
                {decodeURIComponent(title)}
              </h1>
              <div className="flex items-center gap-2 text-white/60 font-raleway text-sm mt-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="leading-none pt-0.5">
                    Watching on <span className="text-white/90 font-medium">{currentMirror.name}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 right-4 md:bottom-10 md:right-10 pointer-events-auto">
             <button
                onClick={() => {
                    const iframe = iframeRef.current;
                    if (iframe) {
                        iframe.src = iframe.src; // Reload iframe
                    }
                }}
                className="group p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/5 hover:bg-white/10 transition-all duration-300 text-white/50 hover:text-white shadow-xl"
                title="Reload Stream"
              >
                <RefreshCw className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
            </button>
        </div>
      </div>

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
          <div className="text-center max-w-md px-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-white text-2xl font-raleway font-bold mb-3">
              Stream Unavailable
            </h2>
            <p className="text-white/60 font-raleway mb-8 leading-relaxed">
              We couldn't load the stream from <strong>{currentMirror.name}</strong>. Please try switching to a different server.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                    const nextIndex = (currentMirrorIndex + 1) % sortedMirrors.length;
                    switchMirror(nextIndex);
                }}
                className="px-8 py-6 bg-serenya-primary hover:bg-serenya-accent rounded-xl font-raleway font-semibold shadow-lg hover:shadow-serenya-primary/25 text-white flex items-center justify-center gap-2 h-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Try Next Server
              </Button>
              <Button
                onClick={() => router.push(type === 'tv' ? '/series' : '/movies')}
                variant="outline"
                className="px-8 py-6 bg-white/5 hover:bg-white/10 border-white/10 rounded-xl font-raleway font-medium transition-colors text-white hover:text-white h-auto"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
