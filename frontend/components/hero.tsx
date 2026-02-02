"use client";

import { HeroTopBar } from "@/components/hero/hero-top-bar";
import { HeroHeader } from "@/components/hero/hero-header";
import { HeroLeftSection } from "@/components/hero/hero-left-section";
import { HeroRightSection } from "@/components/hero/hero-right-section";

export function Hero() {
  return (
    <div className="h-[100dvh] bg-white dark:bg-[#020817] text-serenya-dark dark:text-white overflow-hidden flex flex-col font-sans transition-colors duration-300">
      
      {/* --- NEW HEADER (Barcode Style) --- */}
      <header className="w-full flex-shrink-0 relative bg-white dark:bg-black text-black dark:text-white border-b border-black/5 dark:border-white/10">
        <HeroTopBar />
        <HeroHeader />
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-0 h-full">
            {/* Left Section - StreamSmart Branding and Content */}
            <HeroLeftSection />

            {/* Right Section - Visual Panel */}
            <HeroRightSection />
          </div>
        </div>
      </main>
    </div>
  );
}