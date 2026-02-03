"use client";

import React from "react";

export function HeroTopBar() {
  return (
    <div className="w-full h-3 sm:h-4 flex">
      {/* Left side empty/white */}
      <div className="hidden lg:block w-[45%] bg-transparent"></div>
      
      {/* Right side black with barcode pattern */}
      <div className="w-full lg:w-[60%] bg-black dark:bg-white flex items-center overflow-hidden relative">
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
  );
}
