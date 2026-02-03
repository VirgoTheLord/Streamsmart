"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { X, RefreshCw, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

export default function MoviePlayerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const movieId = searchParams.get("id");
  const imdbId = searchParams.get("imdbId") || undefined;
  const title = searchParams.get("title");
  
  // State for current mirror
  const [currentMirrorIndex, setCurrentMirrorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showMirrorSelector, setShowMirrorSelector] = useState(false);

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

    // Reset loading state when mirror changes
    setIsLoading(true);
    setHasError(false);

    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      console.log("Message from player:", event.data);

      // Handle progress tracking (if supported by the player)
      if (event.data?.type === "PLAYER_EVENT") {
        const { event: playerEvent, currentTime, duration } = event.data.data;
        console.log(`Player event: ${playerEvent} at ${currentTime}/${duration}`);
        
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
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movieId, imdbId, playerUrl, currentMirror, router]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    console.error("Iframe failed to load");
    setIsLoading(false);
    setHasError(true);
  };

  const switchMirror = (index: number) => {
    if (index >= 0 && index < sortedMirrors.length) {
      setCurrentMirrorIndex(index);
      setShowMirrorSelector(false);
    }
  };

  const tryNextMirror = () => {
    const nextIndex = (currentMirrorIndex + 1) % sortedMirrors.length;
    switchMirror(nextIndex);
  };

  if (!movieId) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <p className="text-xl font-raleway">Invalid movie ID</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-serenya-primary hover:bg-serenya-accent rounded-lg font-raleway transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors text-white font-raleway"
          >
            <X className="w-5 h-5" />
            Close
          </button>
          
          <div className="flex items-center gap-4">
            {title && (
              <h1 className="text-white font-raleway font-semibold text-lg max-w-md truncate">
                {decodeURIComponent(title)}
              </h1>
            )}
          </div>

          {/* Mirror Selector */}
          <div className="relative">
            <button
              onClick={() => setShowMirrorSelector(!showMirrorSelector)}
              className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors text-white font-raleway text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              {currentMirror.name}
            </button>

            {showMirrorSelector && (
              <div className="absolute right-0 mt-2 bg-neutral-900 rounded-lg shadow-xl overflow-hidden min-w-[150px]">
                {sortedMirrors.map((mirror, index) => (
                  <button
                    key={mirror.id}
                    onClick={() => switchMirror(index)}
                    className={`w-full px-4 py-3 text-left font-raleway text-sm transition-colors ${
                      index === currentMirrorIndex
                        ? "bg-serenya-primary text-white"
                        : "text-white/80 hover:bg-neutral-800"
                    }`}
                  >
                    {mirror.name}
                    {index === currentMirrorIndex && (
                      <span className="ml-2 text-xs">(Active)</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-serenya-primary animate-spin mx-auto mb-4" />
            <p className="text-white font-raleway">Loading player...</p>
            <p className="text-white/60 font-raleway text-sm mt-2">
              Using {currentMirror.name}
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="text-center max-w-md px-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-white text-xl font-raleway font-bold mb-2">
              Failed to load player
            </h2>
            <p className="text-white/70 font-raleway mb-6">
              The current mirror ({currentMirror.name}) is not responding. Try switching to another mirror.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={tryNextMirror}
                className="px-6 py-3 bg-serenya-primary hover:bg-serenya-accent rounded-lg font-raleway font-bold transition-colors text-white flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Next Mirror
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-raleway font-bold transition-colors text-white"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Player */}
      <div className="flex-1 w-full h-full">
        <iframe
          ref={iframeRef}
          src={playerUrl}
          className="w-full h-full border-none"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          title={title ? decodeURIComponent(title) : "Movie Player"}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
}
