"use client";

import { HeroTopBar } from "@/components/hero/hero-top-bar";
import { HeroHeader } from "@/components/hero/hero-header";
import { HeroLeftSection } from "@/components/hero/hero-left-section";
import { HeroRightSection } from "@/components/hero/hero-right-section";

interface HeroProps {
  showAnimation?: boolean;
}

export function Hero({ showAnimation = true }: HeroProps) {
  return (
    <div className="h-[100dvh] bg-white dark:bg-[#020817] text-serenya-dark dark:text-white overflow-hidden flex flex-col font-sans transition-colors duration-300 relative">
      
      {/* Mobile Not Supported Overlay */}
      <div className="lg:hidden absolute inset-0 bg-white dark:bg-[#020817] z-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-raleway text-3xl sm:text-4xl font-bold mb-4 text-black dark:text-white">
            StreamSmart
          </h1>
          <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 font-light">
            This experience is not built for mobile devices.
          </p>
          <p className="text-sm sm:text-base text-black/50 dark:text-white/50 mt-4 font-light">
            Please visit us on a desktop or laptop for the full experience.
          </p>
        </div>
      </div>

      {/* --- NEW HEADER (Barcode Style) --- */}
      <header className="w-full flex-shrink-0 relative bg-white dark:bg-black text-black dark:text-white border-b border-black/5 dark:border-white/10">
        <HeroTopBar />
        <HeroHeader showAnimation={showAnimation} />
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 h-full">
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