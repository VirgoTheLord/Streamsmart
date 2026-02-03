"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Globe, Paperclip, Mic, ArrowRight, ChevronRight } from "lucide-react";

export function HeroLeftSection() {
  return (
    <div className="relative bg-white dark:bg-[#020817] h-full flex flex-col">
      {/* StreamSmart Text */}
      <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-0 flex-shrink-0">
        <h1 className="text-[clamp(24px,5vw,60px)] font-medium leading-[0.75] tracking-wider font-star">
          STREAMSMART<sup className="pl-1 text-[0.25em] font-normal align-super">©</sup>
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
      <div className="relative flex-1 px-4 sm:px-6 pb-3 sm:pb-4 pt-2">
        <div className="relative w-full h-full bg-serenya-accent dark:bg-serenya-primary overflow-hidden rounded-lg">
          
          {/* Input Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-2xl font-raleway">
              <div className="relative bg-white dark:bg-serenya-bg/10 border border-white/30 dark:border-serenya-accent/20 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-all duration-300 p-3 sm:p-4 backdrop-blur-sm">
                
                <Textarea 
                  placeholder="Ask anything..." 
                  className="w-full bg-transparent border-none outline-none text-sm sm:text-md text-serenya-dark dark:text-white placeholder:text-serenya-dark/50 dark:placeholder:text-white/50 resize-none h-[50px] sm:h-[60px] p-2 font-medium shadow-none min-h-[50px] sm:min-h-[60px] focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <div className="flex items-center justify-between mt-1 sm:mt-2 pt-1 sm:pt-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="outline" size="sm" className="rounded-full text-serenya-dark/80 hover:text-serenya-dark border-serenya-dark/20 bg-white/50 h-7 sm:h-8 gap-1 sm:gap-2 px-2 sm:px-3 text-xs sm:text-sm dark:text-white/80 dark:hover:text-white dark:border-white/20 dark:bg-white/10">
                      <Search className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>Focus</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 h-7 w-7 sm:h-8 sm:w-8 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                      <Globe className="w-4 sm:w-5 h-4 sm:h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 rounded-full h-8 w-8 sm:h-9 sm:w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                      <Paperclip className="w-4 sm:w-5 h-4 sm:h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-serenya-dark/60 hover:text-serenya-dark hover:bg-black/5 rounded-full h-8 w-8 sm:h-9 sm:w-9 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10">
                      <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                    </Button>
                    <Button variant="default" size="icon" className="group rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-serenya-primary hover:bg-serenya-dark dark:bg-serenya-dark dark:hover:bg-serenya-primary shadow-sm">
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-white group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {["Action", "Comedy", "Drama", "Sci-Fi"].map((pill) => (
                  <Button 
                    key={pill} 
                    variant="secondary"
                    size="sm"
                    className="rounded-lg bg-white/70 dark:bg-white/10 border border-white/40 text-serenya-dark/80 hover:text-serenya-dark hover:bg-white dark:hover:bg-white/20 hover:border-white/60 transition-all cursor-pointer h-6 sm:h-7 text-[10px] sm:text-xs font-medium px-2 sm:px-3 dark:text-white/80 dark:hover:text-white"
                  >
                    <span className="opacity-50 mr-1.5">❖</span>
                    {pill}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Text Overlays */}
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
