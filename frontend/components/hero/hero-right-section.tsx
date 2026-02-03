"use client";

import React from "react";
import { Play, Disc, AudioWaveform, Sparkles } from "lucide-react";
import { DiagonalLink } from "@/components/ui/diagonal-link";

export function HeroRightSection() {
  return (
    <div className="relative h-full min-h-[300px] lg:min-h-0">


      <div className="relative bg-serenya-primary dark:bg-serenya-accent h-[95%] lg:h-[97%] rounded-sm flex items-center justify-center z-10 overflow-hidden mx-4 lg:mx-0 my-3 lg:my-0">
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white/25 text-[10px] sm:text-[11px] font-light tracking-wide z-20">
          (AI)
        </div>

        {/* Streaming Icons */}
        <div className="flex items-center justify-center gap-[clamp(12px,2vw,24px)] scale-75 sm:scale-90 relative z-10">
            {/* Icon 1 - Play Button */}
            <div className="relative opacity-35">
              <Play className="w-16 sm:w-20 h-16 sm:h-20 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>

            {/* Icon 2 - Center Prominent */}
            <div className="relative">
              <Disc className="w-20 sm:w-24 h-20 sm:h-24 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>

            {/* Icon 3 - Waveform */}
            <div className="relative opacity-35">
              <AudioWaveform className="w-16 sm:w-20 h-16 sm:h-20 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>

            {/* Icon 4 - Star/Favorite */}
            <div className="relative">
              <Sparkles className="w-14 sm:w-16 h-14 sm:h-16 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>
        </div>

        {/* Watch Movies Link - Bottom Right */}
        <div className="absolute bottom-4 right-4 z-20">
          <DiagonalLink href="/movies" className="text-white dark:text-white font-raleway text-md [&_.char-replacement]:text-serenya-dark [&_.char-replacement]:dark:text-serenya-dark">
            Watch Movies Normally.
          </DiagonalLink>
        </div>
      </div>
    </div>
  );
}
