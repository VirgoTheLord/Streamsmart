"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Infinity, Sun, Moon } from "lucide-react";

export function HeroHeader() {
  return (
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
