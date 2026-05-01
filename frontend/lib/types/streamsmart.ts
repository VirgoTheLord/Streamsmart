// Types for the StreamSmart AI retrieval API

export interface StreamSmartResultMetadata {
  cluster_id?: number;
  actor?: string;
  adult?: boolean;
  title?: string;
  release_year?: number;
  cluster_safe?: boolean;
  genres?: string;
}

export interface ScoreBreakdown {
  semantic_weight: number;
  cluster_weight: number;
  temporal_weight?: number;
  actor_weight?: number;
  note?: string;
}

export interface StreamSmartExplanation {
  actor_constraint?: string | null;
  actor_confidence?: number | null;
  year_constraint?: string | null;
  temporal_fuzzy?: string | null;
  centroid_actors_applied?: string | null;
  semantic_components?: string[];
  soft_constraints?: Record<string, { matched_phrase: string; confidence: number }>;
  filters_applied?: string | null;
  weighted_score?: number;
  score_breakdown?: ScoreBreakdown;
}

export interface StreamSmartResult {
  tmdb_id: string;
  title: string;
  score: number;
  metadata: StreamSmartResultMetadata;
  explanation?: StreamSmartExplanation;
  slm_reasoning?: string;
  slm_confidence?: number;
  deterministic_score?: number;
}

export interface ParsedIntentConstraint {
  matched_phrase?: string;
  confidence?: number;
}

export interface ParsedIntentYear {
  year_from?: number | null;
  year_to?: number | null;
}

export interface ParsedIntentHardConstraints {
  actors?: string[];
  actor_confidence?: Record<string, number>;
  year?: ParsedIntentYear;
}

export interface ParsedIntentFilters {
  allow_adult?: boolean;
}

export interface ParsedIntent {
  intent_type?: string;
  hard_constraints?: ParsedIntentHardConstraints;
  soft_constraints?: Record<string, ParsedIntentConstraint>;
  inferred_signals?: Record<string, ParsedIntentConstraint>;
  fuzzy_constraints?: Record<string, unknown>;
  filters?: ParsedIntentFilters;
  confidence?: number;
  original_query?: string;
}

export interface StreamSmartResponse {
  mode?: string;
  query?: string;
  intent_passable?: boolean;
  intent_confidence?: number;
  parsed_intent?: ParsedIntent;
  result_count?: number;
  results: StreamSmartResult[];
}
