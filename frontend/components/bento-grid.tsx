"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Film, 
  Sparkles, 
  Play, 
  Home, 
  TrendingUp, 
  Search, 
  Library,
  Star,
  Zap
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
}

const BentoItem = ({ className, children }: BentoItemProps) => (
  <Card
    className={cn(
      "relative overflow-hidden rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bento-item opacity-0 translate-y-8",
      className
    )}
  >
    <CardContent className="p-0 h-full">
      {children}
    </CardContent>
  </Card>
);

export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll(".bento-item");
      
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (

    <section ref={containerRef} className="min-h-[100dvh] flex items-center justify-center py-4 px-4 md:px-4 max-w-[1600px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-4 w-full h-full max-h-[800px]">
        

        <BentoItem className="md:col-span-2 lg:col-span-1 row-span-1 bg-neutral-900 border border-neutral-800">
            <div className="flex gap-2 h-full items-center justify-center p-6">

                 <div className="w-12 h-12 rounded-full bg-serenya-bg" title="Background"></div>
                 <div className="w-12 h-12 rounded-full bg-white"></div>
                 <div className="w-12 h-12 rounded-full bg-serenya-accent" title="Accent"></div>
                 <div className="w-12 h-12 rounded-full bg-serenya-dark" title="Dark"></div>
            </div>
        </BentoItem>


        <BentoItem className="md:col-span-4 lg:col-span-2 row-span-2 bg-white dark:bg-serenya-bg/5 group">
           <div className="w-full h-full flex items-center justify-center relative">
               <div className="w-[85%] aspect-video bg-neutral-900 rounded-lg shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                   <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                            src="/new.avif"
                            alt="Movie Scene"
                            fill
                            className="object-cover opacity-80"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center z-20">
                            
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-1 font-raleway">AI-Powered</h3>
                            <h2 className="text-3xl font-black text-serenya-accent font-star">SMART SEARCH</h2>
                            <p className="text-sm mt-2 text-white/70 font-raleway max-w-xs">Discover movies tailored to your mood and preferences</p>
                        </div>
                   </div>
               </div>
           </div>
        </BentoItem>


        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-4 relative group">
             <Image 
                src="/new.avif" 
                alt="Movie Poster" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-raleway p-6 z-20">
                 <h3 className="text-2xl font-bold text-center font-raleway">Personalized</h3>
                 <h3 className="text-2xl font-bold text-center font-raleway mb-2">Recommendations</h3>
                 <p className="text-xs text-center text-white/70 mt-2">Curated just for you</p>
             </div>
        </BentoItem>


        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-2 bg-serenya-dark relative group">
             <Image 
                src="/new.avif" 
                alt="Mobile App"
                fill
                className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-20 mix-blend-overlay"
                unoptimized
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] border-4 border-neutral-700/50 rounded-[2rem] bg-neutral-900 overflow-hidden shadow-2xl z-10">

                 <div className="w-full h-full relative">
                      <div className="absolute top-0 w-full h-6 bg-black z-10 flex justify-center"><div className="w-20 h-4 bg-neutral-800 rounded-b-xl"></div></div>
                      <div className="p-3 pt-8">
                          <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-full bg-serenya-accent flex items-center justify-center">
                                  <Play className="w-3 h-3 text-white fill-white" />
                              </div>
                              <div className="h-1.5 w-16 bg-neutral-700 rounded"></div>
                          </div>
                           <div className="h-24 w-full bg-gradient-to-br from-serenya-primary to-serenya-accent rounded-xl mb-2 opacity-80 flex items-center justify-center">
                               <Star className="w-8 h-8 text-white/50" />
                           </div>
                           <div className="h-1.5 w-full bg-neutral-700 rounded mb-1"></div>
                           <div className="h-1.5 w-2/3 bg-neutral-700 rounded"></div>
                      </div>
                 </div>
             </div>
        </BentoItem>


        <BentoItem className="md:col-span-3 lg:col-span-2 row-span-1 bg-serenya-accent flex items-center justify-center p-8 group">
            <div className="flex flex-row items-center gap-4 transition-transform duration-300 group-hover:scale-110">
                <h2 className="text-5xl font-black text-serenya-dark dark:text-white tracking-widest font-star">STREAMSMART</h2>
            </div>
        </BentoItem>


         <BentoItem className="md:col-span-3 lg:col-span-1 row-span-1 bg-serenya-primary text-white p-8">
             <div className="flex flex-col justify-center items-center h-full w-full">
                 <span className="text-sm uppercase tracking-[0.2em] mb-4 text-white/60">Main font</span>
                 <h3 className="text-6xl font-medium text-white mb-6 font-raleway">Raleway</h3>
                 <div className="text-sm space-x-2 opacity-60 text-center tracking-wider">
                     <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span>
                 </div>
             </div>
         </BentoItem>


        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-1 bg-neutral-900 p-6 relative overflow-hidden">

             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-serenya-primary/20 blur-3xl rounded-full"></div>
             
             <div className="flex flex-row items-center justify-center gap-8 h-full w-full relative z-10">
                 <div className="w-16 h-16 bg-serenya-bg rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1">
                     <Sparkles className="w-8 h-8 text-serenya-accent" />
                 </div>
                 <div className="w-16 h-16 bg-serenya-primary rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1 delay-75">
                     <Film className="w-8 h-8 text-white" />
                 </div>
                 <div className="w-16 h-16 bg-serenya-primary rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1 delay-150">
                     <Zap className="w-8 h-8 text-white" />
                 </div>
             </div>
        </BentoItem>


        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-1 bg-neutral-800 p-4">
             <div className="flex flex-row items-center justify-center gap-6 h-full w-full">
                 <div className="w-14 h-14 rounded-full bg-white dark:bg-serenya-bg/20 text-black dark:text-white flex items-center justify-center hover:bg-serenya-bg dark:hover:bg-serenya-bg/40 transition-colors cursor-pointer shadow-md">
                     <Home className="w-6 h-6" />
                 </div>
                 <div className="w-14 h-14 rounded-full bg-serenya-accent text-white flex items-center justify-center ring-4 ring-serenya-accent/20 cursor-pointer shadow-md">
                     <TrendingUp className="w-6 h-6" />
                 </div>
                 <div className="w-14 h-14 rounded-full bg-white dark:bg-serenya-bg/20 text-black dark:text-white flex items-center justify-center hover:bg-serenya-bg dark:hover:bg-serenya-bg/40 transition-colors cursor-pointer shadow-md">
                     <Search className="w-6 h-6" />
                 </div>
                 <div className="w-14 h-14 rounded-full bg-white dark:bg-serenya-bg/20 text-black dark:text-white flex items-center justify-center hover:bg-serenya-bg dark:hover:bg-serenya-bg/40 transition-colors cursor-pointer shadow-md">
                     <Library className="w-6 h-6" />
                 </div>
             </div>
        </BentoItem>

      </div>
    </section>
  );
}
