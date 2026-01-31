"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Map as MapIcon, 
  MessageSquare, 
  Video, 
  Home, 
  Grid, 
  Search, 
  Trees 
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

// Register ScrollTrigger
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
    <section ref={containerRef} className="h-[100dvh] flex items-center justify-center py-4 px-4 md:px-4 max-w-[1600px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-4 w-full h-full max-h-[800px]">
        
        {/* Item 1: Color Palette (Top Left) */}
        <BentoItem className="md:col-span-2 lg:col-span-1 row-span-1 bg-neutral-900 border border-neutral-800">
            <div className="flex gap-2 h-full items-center justify-center p-6">
                 <div className="w-12 h-12 rounded-full bg-[#FFD700]"></div>
                 <div className="w-12 h-12 rounded-full bg-white"></div>
                 <div className="w-12 h-12 rounded-full bg-[#4A5D23]"></div>
                 <div className="w-12 h-12 rounded-full bg-[#1A1A1A]"></div>
            </div>
        </BentoItem>

        {/* Item 2: Laptop Mockup (Top Center) */}
        <BentoItem className="md:col-span-4 lg:col-span-2 row-span-2 bg-[#e0e0e0] group">
           <div className="w-full h-full flex items-center justify-center relative">
               <div className="w-[85%] aspect-video bg-neutral-900 rounded-lg shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                   <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                            src="/new.avif"
                            alt="Mountain Landscape"
                            fill
                            className="object-cover opacity-80"
                            unoptimized
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center z-10">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-1">Take the Trail</h3>
                            <h2 className="text-3xl font-black text-yellow-500">FIND FREEDOM</h2>
                        </div>
                   </div>
               </div>
           </div>
        </BentoItem>

        {/* Item 3: Hiker Image (Right Column) - EXTENDED to row-span-4 to fill gap */}
        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-4 relative group">
             <Image 
                src="/new.avif" 
                alt="Hiker" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
             />
        </BentoItem>

        {/* Item 4: Phone Mockup (Left Column) */}
        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-2 bg-neutral-800 relative group">
             <Image 
                src="/new.avif" 
                alt="Mobile App"
                fill
                className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-70"
                unoptimized
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] border-4 border-neutral-700 rounded-[2rem] bg-neutral-900 overflow-hidden shadow-2xl z-10">
                 {/* Fake Phone UI */}
                 <div className="w-full h-full relative">
                      <div className="absolute top-0 w-full h-6 bg-black z-10 flex justify-center"><div className="w-20 h-4 bg-neutral-800 rounded-b-xl"></div></div>
                      <div className="p-3 pt-8">
                          <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                              <div className="h-1.5 w-16 bg-neutral-700 rounded"></div>
                          </div>
                           <div className="h-24 w-full bg-neutral-800 rounded-xl mb-2 opacity-50"></div>
                           <div className="h-1.5 w-full bg-neutral-700 rounded mb-1"></div>
                           <div className="h-1.5 w-2/3 bg-neutral-700 rounded"></div>
                      </div>
                 </div>
             </div>
        </BentoItem>

        {/* Item 5: Brand Block (Center) */}
        <BentoItem className="md:col-span-3 lg:col-span-2 row-span-1 bg-[#FFE600] flex items-center justify-center p-8 group">
            <div className="flex flex-row items-center gap-4 transition-transform duration-300 group-hover:scale-110">
                <Trees className="w-16 h-16 text-neutral-900" />
                <h2 className="text-5xl font-black text-neutral-900 tracking-tighter">CRESTLINE</h2>
            </div>
        </BentoItem>

         {/* Item 6: Typography (Center Bottom) */}
         <BentoItem className="md:col-span-3 lg:col-span-1 row-span-1 bg-neutral-950 text-neutral-400 p-8">
             <div className="flex flex-col justify-center items-center h-full w-full">
                 <span className="text-sm uppercase tracking-[0.2em] mb-4 text-neutral-500">Main font</span>
                 <h3 className="text-6xl font-medium text-white mb-6">Roboto</h3>
                 <div className="text-sm space-x-2 opacity-60 text-center tracking-wider">
                     <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span>
                 </div>
             </div>
         </BentoItem>

        {/* Item 7: App Icons (Bottom Left) */}
        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-1 bg-neutral-900 p-6 relative overflow-hidden">
             {/* Matching the image 3 icons: Yellow Trees, Green Bubble, Green Video/Camera */}
             <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-500/10 blur-3xl rounded-full"></div>
             
             <div className="flex flex-row items-center justify-center gap-8 h-full w-full relative z-10">
                 <div className="w-16 h-16 bg-[#FFE600] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1">
                     <Trees className="w-8 h-8 text-neutral-900" />
                 </div>
                 <div className="w-16 h-16 bg-[#4ade80] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1 delay-75">
                     <MessageSquare className="w-8 h-8 text-white fill-current" />
                 </div>
                 <div className="w-16 h-16 bg-[#4ade80] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1 delay-150">
                     <Video className="w-8 h-8 text-white fill-current" />
                 </div>
             </div>
        </BentoItem>

        {/* Item 8: Icon Strip (Bottom Right) */}
        <BentoItem className="md:col-span-3 lg:col-span-1 row-span-1 bg-neutral-800 p-4">
             <div className="flex flex-row items-center justify-center gap-6 h-full w-full">
                 <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#FFE600] transition-colors cursor-pointer shadow-md">
                     <Home className="w-6 h-6" />
                 </div>
                 <div className="w-14 h-14 rounded-full bg-[#FFE600] text-black flex items-center justify-center ring-4 ring-[#FFE600]/20 cursor-pointer shadow-md">
                     <MapIcon className="w-6 h-6 fill-current" />
                 </div>
                 <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#FFE600] transition-colors cursor-pointer shadow-md">
                     <Search className="w-6 h-6" />
                 </div>
                 <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#FFE600] transition-colors cursor-pointer shadow-md">
                     <Grid className="w-6 h-6" />
                 </div>
             </div>
        </BentoItem>

      </div>
    </section>
  );
}
