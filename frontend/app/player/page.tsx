"use client";

import { Suspense } from "react";
import { MoviePlayer } from "@/components/player/movie-player";

export default function MoviePlayerPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      </div>
    }>
      <MoviePlayer />
    </Suspense>
  );
}
