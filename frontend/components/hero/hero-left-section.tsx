"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DiagonalLink } from "@/components/ui/diagonal-link";
import { Search, Paperclip, Mic, ArrowRight, ChevronRight, ShieldOff, ShieldCheck, BrainCircuit } from "lucide-react";

export function HeroLeftSection() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [query, setQuery] = useState("");
  const [safeMode, setSafeMode] = useState(true);
  const [useSlm, setUseSlm] = useState(false);

  // Persist preferences in localStorage
  useEffect(() => {
    const storedSafe = localStorage.getItem('streamsmart_safe_mode');
    if (storedSafe !== null) setSafeMode(storedSafe === 'true');
    const storedSlm = localStorage.getItem('streamsmart_use_slm');
    if (storedSlm !== null) setUseSlm(storedSlm === 'true');
  }, []);

  const toggleSafeMode = () => {
    setSafeMode(prev => {
      const next = !prev;
      localStorage.setItem('streamsmart_safe_mode', String(next));
      return next;
    });
  };

  const toggleSlm = () => {
    setUseSlm(prev => {
      const next = !prev;
      localStorage.setItem('streamsmart_use_slm', String(next));
      return next;
    });
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/movies?aiQuery=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl/Cmd + Enter
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePillClick = (pill: string) => {
    router.push(`/movies?aiQuery=${encodeURIComponent(pill)}`);
  };

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-[#020817] h-full flex flex-col">
      {/* StreamSmart Text */}
      <div className="px-4 sm:px-6 pt-0 sm:pt-1 pb-0 flex-shrink-0">
        <h1 className="text-[clamp(24px,5vw,60px)] font-medium leading-[0.9] tracking-wider font-star overflow-hidden">
          STREAMSMART
          <sup className="pl-1 text-[0.25em] font-normal align-super">©</sup>
        </h1>
        <div className="flex items-center gap-2 mt-2 sm:mt-3 ml-0.5">
          <span className="text-[11px] font-light">(explore all)</span>
          <div className="flex items-center">
            <div className="w-[100px] sm:w-[160px] h-[0.5px] bg-serenya-dark dark:bg-white"></div>
            <ChevronRight className="w-3 h-3 ml-[-2px] text-serenya-dark dark:text-white" />
          </div>
        </div>
      </div>

      {/* Large S Watermark */}
      <div className="absolute top-[100px] sm:top-[140px] left-2 sm:left-4 opacity-[0.06] pointer-events-none select-none z-0">
        <span className="text-[clamp(150px,25vw,400px)] font-bold leading-none font-hatolie">S</span>
      </div>
      <div className="hidden lg:block absolute -top-[100px] left-[1275px] opacity-[0.06] pointer-events-none select-none rotate-[10deg] z-0">
          <span className="text-[clamp(350px,40vw,500px)] font-bold leading-none font-hatolie">S</span>
      </div>

      {/* Search Input Section */}
      <div className="relative flex-1 px-4 sm:px-6 pb-3 sm:pb-4 pt-2 z-50">
        <div className="relative w-full h-full bg-serenya-accent dark:bg-serenya-primary rounded-lg xl:overflow-hidden">
          
          {/* Input Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-visible">
            <div className="w-full max-w-2xl font-raleway">
              <div className="relative bg-white dark:bg-serenya-bg/10 border border-white/30 dark:border-serenya-accent/20 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-all duration-300 p-3 sm:p-4 backdrop-blur-sm z-50">
                
                <Textarea 
                  placeholder="Ask anything..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-[15px] sm:text-md text-serenya-dark dark:text-white placeholder:text-serenya-dark/50 dark:placeholder:text-white/50 resize-none h-[50px] sm:h-[60px] p-2 font-medium shadow-none min-h-[50px] sm:min-h-[60px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <div className="flex items-center justify-between mt-1 sm:mt-2 pt-1 sm:pt-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Watch Direct Pill with Tooltip */}
                    <div 
                      className="relative z-[100] flex items-center gap-1.5 sm:gap-2 rounded-full border border-serenya-dark/20 bg-white/50 h-8 sm:h-9 px-3 sm:px-4 dark:border-white/20 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-all cursor-pointer text-serenya-dark/80 hover:text-serenya-dark dark:text-white/80 dark:hover:text-white"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 opacity-80" />
                      <DiagonalLink 
                        href="/movies" 
                        className="font-raleway text-xs sm:text-sm font-medium [&_.char-replacement]:text-serenya-primary [&_.char-replacement]:dark:text-white"
                      >
                        Watch Direct
                      </DiagonalLink>
                      
                      {/* Smooth Tooltip */}
                      <div className={`absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-serenya-dark dark:bg-white text-white dark:text-serenya-dark text-xs font-raleway rounded-lg whitespace-nowrap pointer-events-none transition-all duration-300 z-[9999] shadow-2xl ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                        Watch movies normally without using this feature
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-8 -mt-px">
                          <div className="border-4 border-transparent border-t-serenya-dark dark:border-t-white" />
                        </div>
                      </div>
                    </div>

                    {/* Safe Mode / 18+ Toggle */}
                    <button
                      type="button"
                      onClick={toggleSafeMode}
                      className={`relative z-[100] flex items-center gap-1.5 sm:gap-2 rounded-full border h-8 sm:h-9 px-3 sm:px-4 transition-all cursor-pointer text-xs sm:text-sm font-medium font-raleway ${
                        safeMode
                          ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400/30 dark:bg-emerald-500/10 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/20'
                          : 'border-red-400/40 bg-red-500/10 text-red-600 dark:text-red-400 dark:border-red-400/30 dark:bg-red-500/10 hover:bg-red-500/20 dark:hover:bg-red-500/20'
                      }`}
                    >
                      {safeMode ? (
                        <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      ) : (
                        <ShieldOff className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      )}
                      <span>{safeMode ? 'Safe' : '18+'}</span>
                    </button>

                    {/* Reason Mode Toggle */}
                    <button
                      type="button"
                      onClick={toggleSlm}
                      className={`relative z-[100] flex items-center gap-1.5 sm:gap-2 rounded-full border h-8 sm:h-9 px-3 sm:px-4 transition-all cursor-pointer text-xs sm:text-sm font-medium font-raleway ${
                        useSlm
                          ? 'border-purple-400/40 bg-purple-500/10 text-purple-600 dark:text-purple-400 dark:border-purple-400/30 dark:bg-purple-500/10 hover:bg-purple-500/20 dark:hover:bg-purple-500/20'
                          : 'border-serenya-dark/20 bg-white/50 text-serenya-dark/80 dark:border-white/20 dark:bg-white/10 dark:text-white/80 hover:bg-white/80 dark:hover:bg-white/20'
                      }`}
                    >
                      <BrainCircuit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      <span>{useSlm ? 'Reason' : 'Fast'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 rounded-full h-8 w-8 sm:h-9 sm:w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                      <Paperclip className="w-4 sm:w-5 h-4 sm:h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 rounded-full h-8 w-8 sm:h-9 sm:w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                      <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={handleSubmit}
                      disabled={!query.trim()}
                      className="group rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-serenya-primary hover:bg-serenya-dark dark:bg-serenya-dark dark:hover:bg-serenya-primary shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                    >
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-white group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {["Action blockbusters", "Romantic comedies", "Sci-Fi classics", "Dark thrillers"].map((pill) => (
                  <Button 
                    key={pill} 
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePillClick(pill)}
                    className="rounded-lg bg-white/70 dark:bg-white/10 border border-white/40 text-serenya-dark/80 hover:text-serenya-dark hover:bg-white dark:hover:bg-white/20 hover:border-white/60 transition-all cursor-pointer h-6 sm:h-7 text-[10px] sm:text-xs font-medium px-2 sm:px-3 dark:text-white/80 dark:hover:text-white"
                  >
                    <span className="opacity-50 mr-1.5">❖</span>
                    {pill}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Text Overlays - Slogan (Static) */}
          <div className="hidden lg:block absolute bottom-3 sm:bottom-4 left-4 sm:left-5 text-white font-light">
            <div className="text-[clamp(18px,3.5vw,30px)] leading-[1.1] tracking-tight font-star">
              SMART SEARCH.
            </div>
          </div>
          
          <div className="hidden lg:block absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white/55 text-[clamp(40px,8vw,90px)] font-light leading-none font-hatolie">
            S
          </div>
        
        </div>
      </div>
    </div>
  );
}
