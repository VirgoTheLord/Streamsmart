"use client";

import { Search, Globe, Paperclip, Mic, ArrowRight, Moon, Sun, User, Infinity, ChevronRight, Play, Disc, AudioWaveform, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Hero() {
  return (
    <div className="h-[100dvh] bg-white dark:bg-[#020817] text-serenya-dark dark:text-white overflow-hidden flex flex-col font-sans transition-colors duration-300">
      
      {/* --- NEW HEADER (Barcode Style) --- */}
      <header className="w-full flex-shrink-0 relative bg-white dark:bg-black text-black dark:text-white border-b border-black/5 dark:border-white/10">
        {/* Top Decorative Bar */}
        <div className="w-full h-4 flex">
            {/* Left side empty/white */}
            <div className="hidden md:block w-[45%] bg-transparent"></div>
            
            {/* Right side black with barcode pattern */}
            <div className="w-full md:w-[60%] bg-black dark:bg-white flex items-center overflow-hidden relative">
                <div className="flex items-center justify-end w-full h-full pr-4 gap-[2px]">
                    {/* Barcode lines */}
                    {Array.from({ length: 80 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-full bg-white/90 dark:bg-black/90 ${
                                i % 3 === 0 ? 'w-[1px]' : i % 2 === 0 ? 'w-[3px]' : 'w-[6px]'
                            } ${i % 5 === 0 ? 'opacity-50' : 'opacity-100'}`} 
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Header Content Grid */}
        <div className="px-6 py-8 md:px-10 md:py-4 w-full max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Column 1: Meta Info (EST, Mission) */}
                <div className="md:col-span-3 font-mono text-xs flex flex-col gap-8 text-black dark:text-white/90">
                    <div className="flex items-center gap-4 tracking-widest">
                        <span>EST</span>
                        <span className="h-[1px] w-12 bg-current"></span>
                        <span>2010</span>
                    </div>
                    
                    <div className="leading-relaxed">
                        Unique streaming<br />
                        and intelligence shop
                    </div>

                    <div className="opacity-60 leading-relaxed max-w-[150px]">
                        Our mission is<br />
                        preserving long-term<br />
                        knowledge retrieval<br />
                        traditions
                    </div>
                </div>

                {/* Column 2: Scribble (Visual Balance) */}
                <div className="md:col-span-2 hidden md:flex items-center justify-center opacity-40 pt-4">
                    <Infinity className="w-40 h-20 text-black dark:text-white opacity-40" strokeWidth={1} />
                </div>

                {/* Column 3: Main Title */}
                <div className="md:col-span-5 flex flex-col justify-center pt-2">
                    <h1 className="font-raleway text-[clamp(36px,4.5vw,54px)] leading-[1] tracking-tight text-center md:text-left text-black dark:text-white uppercase">
                        Where Streaming<br />
                        Meets Intelligence.
                    </h1>
                </div>

                {/* Column 4: Controls (Toggle & Menu) */}
                <div className="md:col-span-2 flex justify-start md:justify-end items-center gap-6 pt-2">
                    <ThemeToggle />
                    <div className="flex items-center bg-[#F2F0EA] dark:bg-white/10 px-4 py-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="text-[11px] font-mono font-bold tracking-widest text-black dark:text-white">
                            MENU =
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Main Hero Section (Exactly from your code) */}
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
                    <ChevronRight className="w-3 h-3 ml-[-2px] text-serenya-dark dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Large S Watermark */}
              <div className="absolute top-[140px] left-4 opacity-[0.06] pointer-events-none select-none z-0">
                <span className="text-[clamp(200px,25vw,400px)] font-bold leading-none font-hatolie">S</span>
              </div>
              <div className="absolute -top-[100px] left-[1275px] opacity-[0.06] pointer-events-none select-none rotate-[10deg] z-0">
                  <span className="text-[clamp(350px,40vw,500px)] font-bold leading-none font-hatolie">S</span>
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
                          className="w-full bg-transparent border-none outline-none text-md text-serenya-dark dark:text-white placeholder:text-serenya-dark/50 dark:placeholder:text-white/50 resize-none h-[60px] p-2 font-medium shadow-none min-h-[60px] focus-visible:ring-0 focus-visible:ring-offset-0"
                        />

                        <div className="flex items-center justify-between mt-2 pt-2">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-full text-serenya-dark/80 hover:text-serenya-dark border-serenya-dark/20 bg-white/50 h-8 gap-2 px-3 dark:text-white/80 dark:hover:text-white dark:border-white/20 dark:bg-white/10">
                              <Search className="w-4 h-4" />
                              <span>Focus</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 h-8 w-8 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                              <Globe className="w-5 h-5" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 rounded-full h-9 w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                              <Paperclip className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 rounded-full h-9 w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
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
                  <div className="absolute bottom-4 left-5 text-white font-light">
                    <div className="text-[clamp(24px,3.5vw,30px)] leading-[1.1] tracking-tight font-star">
                      SMART SEARCH.
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-white/55 text-[clamp(60px,8vw,90px)] font-light leading-none font-hatolie">
                    S
                  </div>
                
                </div>
              </div>
            </div>

            {/* Right Section - Visual Panel */}
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
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-black dark:text-white" />
      ) : (
        <Moon className="w-4 h-4 text-black dark:text-white" />
      )}
    </button>
  );
}