import Link from "next/link";
import { Twitter, Instagram, Globe } from "lucide-react";


export function FloatingFooter() {
  return (
    <div className="flex justify-center w-full px-4 pb-8 pt-20">
      <div className="relative w-full max-w-[1500px] bg-neutral-950 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Advanced Lighting Effects */}
        {/* 1. Main Central Glow (behind text) - Subtle ambient */}
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[150%] bg-white/5 blur-[80px] rounded-full pointer-events-none" 
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)' }}
        />
        
        {/* 2. Bottom Center White Radial Glow */}
        <div 
            className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full pointer-events-none opacity-60 mix-blend-screen"
            style={{ 
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
                filter: 'blur(40px)'
            }}
        />

        {/* 3. Subtle Color Tint (Serenya Green) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-serenya-green/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between py-16 px-12 gap-10 md:gap-4 h-full min-h-[250px]">
          
          {/* Left: Socials & Copyright */}
          <div className="flex flex-col items-center md:items-start justify-between gap-6 flex-1 order-2 md:order-1">
             <div className="flex flex-col gap-3 flex-1 justify-center">
               <Link href="#" className="hover:text-white hover:scale-110 transition-all text-neutral-400">
                  <Globe className="w-5 h-5" />
               </Link>
               <Link href="#" className="hover:text-white hover:scale-110 transition-all text-neutral-400">
                  <Twitter className="w-5 h-5" />
               </Link>
             </div>
             <p className="text-neutral-500 text-xs font-medium font-raleway">© 2026 StreamSmart.<br /> All rights reserved.</p>
          </div>

          {/* Center: Brand */}
          <div className="flex flex-col items-center justify-center flex-[2] text-center order-1 md:order-2">
             <div className="flex items-center justify-center gap-5 mb-4 group cursor-default">
                 {/* Logo with Inner Glow */}
                 <div className="relative w-14 h-14">
                    <div className="absolute inset-0 bg-serenya-green blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    
                 </div>
                 
                 <h2 className="text-6xl md:text-8xl text-transparent bg-clip-text mr-10 bg-gradient-to-b from-white to-white/70 font-star tracking-wider drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                    StreamSmart
                 </h2>
             </div>
             <p className="text-neutral-400 text-sm tracking-[0.2em] uppercase opacity-60 font-medium font-raleway ml-5">
                Websites that work as good as they look
             </p>
          </div>

          {/* Right: Legal Links */}
          <div className="flex flex-col items-center md:items-end justify-between flex-1 text-sm text-neutral-400 order-3">
             <div className="flex flex-col items-center md:items-end gap-2 font-raleway font-medium flex-1 justify-center">
                <Link href="#" className="hover:text-white transition-colors hover:underline decoration-serenya-green underline-offset-4">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors hover:underline decoration-serenya-green underline-offset-4">Terms of Service</Link>
             </div>
             <a href="mailto:hello@streamsmart.com" className="mt-4 font-raleway text-xs tracking-wider hover:text-white transition-colors">
                hello@streamsmart.com
             </a>
          </div>

        </div>
      </div>
    </div>
  );
}
