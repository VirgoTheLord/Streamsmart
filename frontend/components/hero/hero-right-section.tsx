"use client";

import React from "react";
import { Play, Disc, AudioWaveform, Sparkles } from "lucide-react";

export function HeroRightSection() {
  return (
    <div className="relative h-full">


      <div className="relative bg-serenya-primary dark:bg-serenya-accent h-[97%] rounded-sm flex items-center justify-center z-10 overflow-hidden">
        <div className="absolute top-4 right-4 text-white/25 text-[11px] font-light tracking-wide z-20">
          (AI)
        </div>

        {/* Streaming Icons */}
        <div className="flex items-center justify-center gap-[clamp(16px,2vw,24px)] scale-90 relative z-10">
            {/* Icon 1 - Play Button */}
            <div className="relative opacity-35">
              <Play className="w-20 h-20 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>

            {/* Icon 2 - Center Prominent */}
            <div className="relative">
              <Disc className="w-24 h-24 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>

            {/* Icon 3 - Waveform */}
            <div className="relative opacity-35">
              <AudioWaveform className="w-20 h-20 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>

            {/* Icon 4 - Star/Favorite */}
            <div className="relative">
              <Sparkles className="w-16 h-16 text-white dark:text-[#0F2854]" strokeWidth={1} />
            </div>
        </div>
      </div>
    </div>
  );
}
