"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { X, RefreshCw, AlertCircle, Server, Film, MonitorPlay } from "lucide-react";
import { useEffect, useRef, useState, Suspense } from "react";

// Define available player mirrors
interface PlayerMirror {
  id: string;
  name: string;
  buildUrl: (params: { movieId: string; imdbId?: string }) => string;
  priority: number;
}

const PLAYER_MIRRORS: PlayerMirror[] = [
  {
    id: "vidsrc",
    name: "VidSrc",
    buildUrl: ({ imdbId, movieId }) => {
      if (imdbId) {
        return `${process.env.NEXT_PUBLIC_VIDSRC_EMBED_URL}/movie?imdb=${imdbId}&autoplay=1`;
      }
      return `${process.env.NEXT_PUBLIC_VIDSRC_EMBED_URL}/movie?tmdb=${movieId}&autoplay=1`;
    },
    priority: 1,
  },
  {
    id: "2embed",
    name: "2Embed",
    buildUrl: ({ imdbId, movieId }) => {
      // 2Embed supports both IMDb and TMDB IDs directly in the URL
      const identifier = imdbId || movieId;
      return `${process.env.NEXT_PUBLIC_2EMBED_URL}/${identifier}`;
    },
    priority: 2,
  },
  {
    id: "vidking",
    name: "VidKing",
    buildUrl: ({ movieId }) => {
      // VidKing only supports TMDB IDs
      // Using custom color (16A085 - teal) and autoplay
      return `${process.env.NEXT_PUBLIC_VIDKING_EMBED_URL}/movie/${movieId}?color=16A085&autoPlay=true`;
    },
    priority: 3,
  },
  {
    id: "vidlink",
    name: "VidLink",
    buildUrl: ({ movieId }) => {
      // VidLink only supports TMDB IDs
      // Using custom colors (primaryColor and iconColor) and autoplay
      return `${process.env.NEXT_PUBLIC_VIDLINK_EMBED_URL}/movie/${movieId}?primaryColor=16A085&iconColor=16A085&autoplay=true`;
    },
    priority: 4,
  },
  {
    id: "vidfast",
    name: "VidFast",
    buildUrl: ({ imdbId, movieId }) => {
      const identifier = imdbId || movieId;
      return `${process.env.NEXT_PUBLIC_VIDFAST_EMBED_URL}/movie/${identifier}?autoPlay=true&theme=16A085`;
    },
    priority: 5,
  },
];

function MoviePlayer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const movieId = searchParams.get("id");
  const imdbId = searchParams.get("imdbId") || undefined;
  const title = searchParams.get("title");
  
  // State for current mirror
  const [currentMirrorIndex, setCurrentMirrorIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [showMirrorSelector, setShowMirrorSelector] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sort mirrors by priority
  const sortedMirrors = [...PLAYER_MIRRORS].sort((a, b) => a.priority - b.priority);
  const currentMirror = sortedMirrors[currentMirrorIndex];
  
  const playerUrl = movieId 
    ? currentMirror.buildUrl({ movieId, imdbId })
    : "";

  useEffect(() => {
    // Log player initialization
    console.log("Movie Player initialized");
    console.log("Movie ID:", movieId);
    console.log("IMDb ID:", imdbId);
    console.log("Current Mirror:", currentMirror.name);
    console.log("Player URL:", playerUrl);

    setHasError(false);

    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      // Handle progress tracking (if supported by the player)
      if (event.data?.type === "PLAYER_EVENT") {
        const { event: playerEvent, currentTime, duration } = event.data.data;
        
        // Save progress
        if (movieId) {
          localStorage.setItem(
            `movie_progress_${movieId}`,
            JSON.stringify({
              currentTime,
              duration,
              timestamp: Date.now(),
              mirror: currentMirror.id,
            })
          );
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Handle escape key to go back
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push('/movies');
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movieId, imdbId, playerUrl, currentMirror, router]);

  // Handle idle mouse to hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide after 3 seconds of inactivity
    };

    window.addEventListener("mousemove", handleMouseMove);
    // Initial timeout
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

  if (!movieId) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <p className="text-xl font-raleway">Invalid movie ID</p>
          <button
            onClick={() => router.push('/movies')}
            className="mt-4 px-6 py-2 bg-serenya-primary hover:bg-serenya-accent rounded-lg font-raleway transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      {/* Background Player */}
      <div className="absolute inset-0 z-0">
        <iframe
          ref={iframeRef}
          src={playerUrl}
          className="w-full h-full border-none"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          title={title ? decodeURIComponent(title) : "Movie Player"}
          onError={handleIframeError}
        />
      </div>

      {/* Cinematic UI Overlay */}
      <div 
        className={`absolute inset-0 z-10 pointer-events-none transition-all duration-500 ease-in-out ${
          showControls ? "bg-gradient-to-b from-black/70 via-transparent to-black/70 opacity-100" : "opacity-0"
        }`}
      >
        {/* Top Left: Close Button */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 pointer-events-auto">
          <button
            onClick={() => router.push('/movies')}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            title="Close Player"
          >
            <X className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        {/* Top Right: Server Selector */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 pointer-events-auto flex flex-col items-end">
          <button
            onClick={() => setShowMirrorSelector(!showMirrorSelector)}
            className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300 shadow-xl"
          >
            <span className="text-white/90 font-raleway font-medium text-sm hidden md:block">
              Server: <span className="text-serenya-accent font-bold">{currentMirror.name}</span>
            </span>
            <Server className="w-5 h-5 text-white/90 group-hover:text-serenya-accent transition-colors" />
          </button>

          {/* Dropdown */}
          <div 
            className={`mt-3 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 origin-top-right -mr-2 ${
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

        {/* Bottom Left: Title Info */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pointer-events-auto max-w-2xl">
          {title && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider shadow-sm">
                  Movies
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-serenya-primary/80 text-white backdrop-blur-sm border border-white/5 uppercase tracking-wider shadow-sm">
                  HD
                </span>
              </div>
              <h1 className="text-white font-raleway font-bold text-2xl md:text-3xl lg:text-4xl drop-shadow-2xl tracking-tight leading-none">
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

        {/* Bottom Right: Quick Actions (Reload/Refresh) */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-auto">
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

      {/* Error State Overlay */}
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
              <button
                onClick={() => {
                    const nextIndex = (currentMirrorIndex + 1) % sortedMirrors.length;
                    switchMirror(nextIndex);
                }}
                className="px-8 py-3 bg-serenya-primary hover:bg-serenya-accent rounded-xl font-raleway font-semibold transition-all shadow-lg hover:shadow-serenya-primary/25 text-white flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Next Server
              </button>
              <button
                onClick={() => router.push('/movies')}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-raleway font-medium transition-colors text-white"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MoviePlayerPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {/* Minimal loader if suspense triggers, but we try to avoid custom preloaders */}
      </div>
    }>
      <MoviePlayer />
    </Suspense>
  );
}
