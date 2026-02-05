"use client";

import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagonalLink } from "@/components/ui/diagonal-link";
import { ModeToggle } from "@/components/mode-toggle";

export function MoviesNavbar() {
  const [showSmartTooltip, setShowSmartTooltip] = useState(false);

  return (
    <nav className="flex justify-between items-center py-3 px-6 max-w-[1600px] mx-auto relative z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-2xl sm:text-3xl font-medium tracking-wider text-serenya-dark dark:text-white font-star">
          StreamSmart
        </Link>
      </div>

      <div className="hidden md:flex gap-8 items-center font-raleway absolute left-1/2 -translate-x-1/2">
        {[
          { name: "Movies", href: "/movies" },
          { name: "Series", href: "/series" },
          { name: "Anime", href: "/anime" }
        ].map((link) => (
          <DiagonalLink 
            key={link.name} 
            href={link.href}
            className="text-serenya-dark dark:text-white transition-colors text-sm font-medium [&_.char-replacement]:text-serenya-primary [&_.char-replacement]:dark:text-white"
          >
            {link.name}
          </DiagonalLink>
        ))}
      </div>

      <div className="flex gap-4 items-center">
         {/* Smart Mode Button with Tooltip */}
         <div 
          className="relative hidden sm:block "
          onMouseEnter={() => setShowSmartTooltip(true)}
          onMouseLeave={() => setShowSmartTooltip(false)}
        >
          <DiagonalLink 
            href="/" 
            className="text-serenya-accent dark:text-serenya-accent transition-colors text-sm [&_.char-replacement]:text-serenya-primary [&_.char-replacement]:dark:text-white"
          >
            Smart Mode
          </DiagonalLink>
          
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-4 bg-serenya-dark dark:bg-white text-white dark:text-serenya-dark text-xs font-raleway rounded-xl text-center shadow-xl pointer-events-none transition-all duration-300 z-50 leading-relaxed border border-white/10 dark:border-black/5 ${showSmartTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <span className="font-bold block mb-1 text-serenya-accent">Experience Cinema, Reimagined.</span>
            Describe your mood or perfect movie idea, and our AI will instantly curate and stream the exact title you're looking for.
            {/* Tooltip Arrow */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px">
              <div className="border-4 border-transparent border-b-serenya-dark dark:border-b-white" />
            </div>
          </div>
        </div>

         <div className="h-6 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

         <ModeToggle />
         <Button size="icon" variant="ghost" className="rounded-full hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
            <ShoppingBag className="w-4 h-4" />
         </Button>
         <Button size="icon" variant="ghost" className="rounded-full hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
            <User className="w-4 h-4" />
         </Button>
      </div>
    </nav>
  );
}
