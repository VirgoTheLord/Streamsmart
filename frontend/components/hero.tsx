"use client";

import { Search, Globe, Paperclip, Mic, ArrowRight, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DiagonalLink } from "@/components/ui/diagonal-link";

export function Hero() {
  return (
    <div className="h-[100dvh] bg-white dark:bg-[#020817] text-serenya-dark dark:text-white overflow-hidden flex flex-col">
      {/* Top Decorative Bar */}
      <div className="w-full bg-serenya-dark dark:bg-serenya-primary h-2 relative flex-shrink-0">
        <div className="absolute right-0 top-0 bottom-0 flex">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className={`w-[2px] h-full ${i % 2 === 0 ? 'bg-white dark:bg-serenya-bg' : 'bg-serenya-dark dark:bg-serenya-primary'}`} />
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="px-6 pt-4 pb-2 flex-shrink-0">
        <div className="w-full">
          <div className="flex justify-between items-start">
            {/* Left Column - EST and Mission */}
            <div className="flex flex-col gap-4">
              <div className="text-[10px] font-light tracking-wide">
                EST <span className="mx-2">―――</span> 2024
              </div>
              <div className="text-[9px] leading-relaxed font-light max-w-[120px]">
                Intelligent streaming<br />platform
              </div>
              <div className="text-[8px] leading-relaxed text-serenya-dark/60 dark:text-white/60 max-w-[120px]">
                Our mission is<br />
                transforming how you<br />
                discover and enjoy<br />
                content
              </div>
            </div>

            {/* Right Column - Search, Navigation, Theme Toggle, Profile */}
            <div className="flex flex-col items-end gap-1">
              
              <div className="flex items-center gap-3">
                {/* Expandable Search */}
                <div className="group relative">
                  <div className="flex items-center overflow-hidden transition-all duration-300 w-4 group-hover:w-32">
                    <Search className="w-3.5 h-3.5 flex-shrink-0 cursor-pointer" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="ml-2 bg-transparent border-none outline-none text-[10px] w-0 group-hover:w-full transition-all duration-300 placeholder:text-current/50"
                    />
                  </div>
                </div>

                <nav className="flex items-center gap-3">
                  <DiagonalLink href="#" className="text-[10px] font-light tracking-wide">SHOP</DiagonalLink>
                  <DiagonalLink href="#" className="text-[10px] font-light tracking-wide">GALLERY</DiagonalLink>
                  <DiagonalLink href="#" className="text-[10px] font-light tracking-wide">PHILOSOPHY</DiagonalLink>
                  <DiagonalLink href="#" className="text-[10px] font-light tracking-wide">CONTACTS</DiagonalLink>
                </nav>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Profile Icon */}
                <button className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 transition-opacity">
                  <User className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-0 h-full">
            {/* Left Section - StreamSmart Branding and Content */}
            <div className="relative bg-white dark:bg-[#020817] h-full flex flex-col">
              {/* StreamSmart Text */}
              <div className="px-6 pt-4 pb-0 flex-shrink-0">
                <h1 className="text-[5vw] font-medium leading-[0.75] tracking-wider font-star">
                  STREAMSMART<sup className="pl-1 text-[0.25em] font-normal align-super">©</sup>
                </h1>
                <div className="flex items-center gap-2 mt-3 ml-0.5">
                  <span className="text-[11px] font-light">(explore all)</span>
                  <div className="flex items-center">
                    <div className="w-[160px] h-[0.5px] bg-serenya-dark dark:bg-white"></div>
                    <svg width="10" height="10" viewBox="0 0 10 10" className="ml-[-1px]">
                      <polygon points="0,0 10,5 0,10" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Large S Watermark */}
              <div className="absolute top-[140px] left-4 opacity-[0.06] pointer-events-none select-none z-0">
                <span className="text-[clamp(200px,25vw,400px)] font-bold leading-none font-hatolie">S</span>
              </div>

              {/* Search Input Section */}
              <div className="relative flex-1 px-6 pb-4 pt-2">
                <div className="relative w-full h-full bg-serenya-accent dark:bg-serenya-primary overflow-hidden rounded-lg">
                  
                  {/* Input Container */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full max-w-2xl font-raleway">
                      <div className="relative bg-white dark:bg-serenya-bg/10 border border-white/30 dark:border-serenya-accent/20 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-all duration-300 p-4 backdrop-blur-sm">
                        
                        <Textarea 
                          placeholder="Ask anything..." 
                          className="w-full bg-transparent border-none outline-none text-md text-serenya-dark dark:text-white placeholder:text-serenya-dark/50 dark:placeholder:text-white/50 resize-none h-[60px] p-2 font-medium shadow-none min-h-[60px]"
                        />

                        <div className="flex items-center justify-between mt-2 pt-2">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-full text-serenya-dark/80 hover:text-serenya-dark border-serenya-dark/20 bg-white/50 h-8 gap-2 px-3 dark:text-white/80 dark:hover:text-white dark:border-white/20 dark:bg-white/10">
                              <Search className="w-4 h-4" />
                              <span>Focus</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full text-serenya-dark/60 hover:text-serenya-dark hover:bg-white/30 h-8 w-8 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                              <Globe className="w-5 h-5" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-white/30 rounded-full h-9 w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                              <Paperclip className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-white/30 rounded-full h-9 w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                              <Mic className="w-5 h-5" />
                            </Button>
                            <Button variant="default" size="icon" className="group rounded-full h-9 w-9 bg-serenya-primary hover:bg-serenya-dark dark:bg-serenya-dark dark:hover:bg-serenya-primary shadow-sm">
                              <ArrowRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {["Action", "Comedy", "Drama", "Sci-Fi"].map((pill) => (
                          <Button 
                            key={pill} 
                            variant="secondary"
                            size="sm"
                            className="rounded-lg bg-white/70 dark:bg-white/10 border border-white/40 text-serenya-dark/80 hover:text-serenya-dark hover:bg-white dark:hover:bg-white/20 hover:border-white/60 transition-all cursor-pointer h-7 text-xs font-medium dark:text-white/80 dark:hover:text-white"
                          >
                            <span className="opacity-50 mr-1.5">❖</span>
                            {pill}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text Overlays */}
                  <div className="absolute bottom-4 left-4 text-white/65 font-light">
                    <div className="text-[clamp(24px,3.5vw,38px)] leading-[1.1] tracking-tight font-raleway">
                      Where Streaming <br />Meets Intelligence.
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-white/55 text-[clamp(60px,8vw,90px)] font-light leading-none font-hatolie">
                    S
                  </div>
                  
                  <div className="absolute top-4 font-star right-4 text-white text-[clamp(20px,2.5vw,25px)] font-medium leading-none tracking-wider">
                    SMART SEARCH.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Visual Panel */}
            <div className="relative bg-serenya-primary dark:bg-serenya-accent h-full flex items-center justify-center p-6">
              <div className="absolute top-4 right-4 text-white/25 text-[11px] font-light tracking-wide">
                (AI)
              </div>
              
              {/* Streaming Icons */}
              <div className="flex items-center justify-center gap-[clamp(16px,2vw,24px)] scale-90">
                {/* Icon 1 - Play Button */}
                <div className="relative opacity-35">
                  <svg width="75" height="110" viewBox="0 0 75 110" className="text-serenya-dark dark:text-[#0F2854]">
                    <circle cx="37.5" cy="55" r="35" fill="currentColor" />
                    <polygon points="30,35 30,75 55,55" fill="white" opacity="0.7" />
                  </svg>
                </div>

                {/* Icon 2 - Center Prominent */}
                <div className="relative">
                  <svg width="95" height="120" viewBox="0 0 95 120" className="text-white dark:text-serenya-bg">
                    <circle cx="47.5" cy="60" r="45" fill="currentColor" />
                    <circle cx="47.5" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="16" opacity="0.3" />
                  </svg>
                </div>

                {/* Icon 3 - Waveform */}
                <div className="relative opacity-35">
                  <svg width="70" height="105" viewBox="0 0 70 105" className="text-serenya-dark dark:text-[#0F2854]">
                    <rect x="10" y="35" width="8" height="35" fill="currentColor" rx="2" />
                    <rect x="22" y="25" width="8" height="55" fill="currentColor" rx="2" />
                    <rect x="34" y="40" width="8" height="25" fill="currentColor" rx="2" />
                    <rect x="46" y="30" width="8" height="45" fill="currentColor" rx="2" />
                  </svg>
                </div>

                {/* Icon 4 - Star/Favorite */}
                <div className="relative">
                  <svg width="65" height="130" viewBox="0 0 65 130" className="text-white dark:text-serenya-bg">
                    <polygon points="32.5,25 40,50 65,50 45,65 52.5,90 32.5,75 12.5,90 20,65 0,50 25,50" fill="currentColor" />
                    <circle cx="32.5" cy="100" r="8" fill="currentColor" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-3.5 h-3.5" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-70 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5" />
      ) : (
        <Moon className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
