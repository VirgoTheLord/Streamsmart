export interface PlayerMirror {
  id: string;
  name: string;
  buildUrl: (params: { movieId: string; imdbId?: string }) => string;
  priority: number;
}

export const PLAYER_MIRRORS: PlayerMirror[] = [
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
      const identifier = imdbId || movieId;
      return `${process.env.NEXT_PUBLIC_2EMBED_URL}/${identifier}`;
    },
    priority: 2,
  },
  {
    id: "vidking",
    name: "VidKing",
    buildUrl: ({ movieId }) => {
      return `${process.env.NEXT_PUBLIC_VIDKING_EMBED_URL}/movie/${movieId}?color=16A085&autoPlay=true`;
    },
    priority: 3,
  },
  {
    id: "vidlink",
    name: "VidLink",
    buildUrl: ({ movieId }) => {
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
