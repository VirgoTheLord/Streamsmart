"use client";

import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Infinity, Sun, Moon, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function HeroHeader() {
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Main Title - Staggered Reveal
      const words = headerTextRef.current?.querySelectorAll(".header-word");
      if (words && words.length > 0) {
        const hasVisited = sessionStorage.getItem("hasVisited");
        const shouldAnimate = !hasVisited;

        if (!shouldAnimate) {
             gsap.set(words, { y: 0, opacity: 1 });
             return;
        }

        // Set initial state
        gsap.set(words, { y: -30, opacity: 0 });

        // Animate TO visible
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 4.2 // Sync with Preloader exit (slightly before shutters open fully)
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-4 w-full max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start">
        
        {/* Column 1: Meta Info (EST, Mission) */}
        <div className="md:col-span-3 font-mono text-xs flex flex-col gap-4 sm:gap-6 md:gap-8 text-black dark:text-white/90">
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
        <div className="md:col-span-2 hidden sm:flex items-center justify-center opacity-40 pt-4">
          <Infinity className="w-40 h-20 text-black dark:text-white opacity-40" strokeWidth={1} />
        </div>

        {/* Column 3: Main Title */}
        <div className="md:col-span-5 flex flex-col justify-center pt-2">
          <h1 ref={headerTextRef} className="font-raleway text-[clamp(28px,5.5vw,54px)] leading-[0.9] sm:leading-[1] tracking-tight text-center md:text-left text-black dark:text-white uppercase">
            {/* Split "Where Streaming" */}
            <div className="inline-block">
              {"Where Streaming".split(" ").map((word, i) => (
                <span key={i} className="header-word inline-block mr-[0.25em]" style={{opacity: 0}}>
                  {word}
                </span>
              ))}
            </div>
            <br />
            {/* Split "Meets Intelligence." */}
            <div className="inline-block whitespace-nowrap">
              {"Meets Intelligence.".split(" ").map((word, i) => (
                <span key={i + 2} className="header-word inline-block mr-[0.25em]" style={{opacity: 0}}>
                  {word}
                </span>
              ))}
            </div>
          </h1>
        </div>

        {/* Column 4: Controls (Toggle & Menu) */}
        <div className="md:col-span-2 flex justify-center md:justify-end items-center gap-4 sm:gap-6 pt-2 relative z-[60]">
          <ThemeToggle />
          
          {isLoggedIn && user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-[#F2F0EA] dark:bg-white/10 border border-black/5 dark:border-white/5 rounded-full pl-1.5 pr-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/20 transition-all select-none"
              >
                <div className="w-7 h-7 rounded-full bg-serenya-primary dark:bg-serenya-accent flex items-center justify-center text-white text-xs font-bold font-raleway">
                  {user.initials}
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-black dark:text-white hidden sm:block max-w-[80px] truncate">
                  {user.name.toUpperCase()}
                </span>
                <ChevronDown className={`w-3 h-3 text-black/60 dark:text-white/60 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#0d1f3c] border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2.5 border-b border-black/5 dark:border-white/5">
                    <p className="text-xs font-raleway font-semibold text-serenya-dark dark:text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-black/40 dark:text-white/40 font-raleway truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-raleway text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center bg-[#F2F0EA] dark:bg-white/10 px-4 py-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity gap-2"
            >
              <UserIcon className="w-3.5 h-3.5 text-black dark:text-white" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-black dark:text-white">
                SIGN IN
              </span>
            </Link>
          )}
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
