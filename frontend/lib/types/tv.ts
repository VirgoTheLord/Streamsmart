export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    original_language: string;
    original_name: string;
    origin_country: string[];
  }
  
  export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }
  
  export interface Episode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  }
  
  export interface TVShowDetails extends TVShow {
    created_by: any[];
    episode_run_time: number[];
    genres: { id: number; name: string }[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    next_episode_to_air: Episode;
    networks: any[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: any[];
    production_countries: any[];
    seasons: Season[];
    spoken_languages: any[];
    status: string;
    tagline: string;
    type: string;
    credits?: {
        cast: any[];
        crew: any[];
    };
    videos?: {
        results: any[];
    };
    similar?: {
        results: TVShow[];
    };
    recommendations?: {
        results: TVShow[];
    };
  }
  
  export interface TVResponse {
    page: number;
    results: TVShow[];
    total_pages: number;
    total_results: number;
  }
