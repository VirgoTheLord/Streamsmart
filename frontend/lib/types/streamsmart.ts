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
  note?: string;
}

export interface StreamSmartExplanation {
  actor_constraint?: string;
  semantic_components?: string[];
  soft_constraints?: Record<string, { matched_phrase: string; confidence: number }>;
  filters_applied?: null | string;
  weighted_score?: number;
  score_breakdown?: ScoreBreakdown;
}

export interface StreamSmartResult {
  tmdb_id: string;
  title: string;
  score: number;
  metadata: StreamSmartResultMetadata;
  explanation?: StreamSmartExplanation;
}

export interface ParsedIntentConstraint {
  matched_phrase?: string;
  confidence?: number;
}

export interface ParsedIntent {
  intent_type?: string;
  hard_constraints?: Record<string, string | string[]>;
  soft_constraints?: Record<string, ParsedIntentConstraint>;
  inferred_signals?: Record<string, ParsedIntentConstraint>;
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
