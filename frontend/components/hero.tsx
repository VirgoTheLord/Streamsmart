import Image from "next/image";
import { Leaf, HandHeart, Droplet, ArrowRight, Pause, VolumeX } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full max-w-[1600px] mx-auto pt-2 pb-2 px-6 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-100px)] min-h-[600px]">
      
      {/* Left Side: Portrait Image */}
      <div className="relative w-full h-full overflow-hidden group">
        <Image 
          src="/new.avif" 
          alt="Serenya Model" 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Play/Audio Controls (Bottom Left overlay) */}
        <div className="absolute bottom-4 left-4 flex gap-4">
           {/* Placeholder for video controls if this were video */}
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Pause className="w-5 h-5 text-serenya-dark" fill="currentColor" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <VolumeX className="w-5 h-5 text-serenya-dark" />
            </button>
        </div>

        {/* Action Button (Bottom Right overlay) */}
        <button className="absolute bottom-4 right-4 w-14 h-14 bg-serenya-green rounded-full flex items-center justify-center hover:bg-serenya-primary transition-colors">
            <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>



      {/* Right Side: Content */}
      <div className="relative w-full h-full flex flex-col items-start pl-2 justify-between overflow-hidden">
         {/* Icons (Top Left) */}
         <div className="hidden md:flex flex-col gap-6 z-20">
            {[Leaf, HandHeart, Droplet].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-serenya-dark/60 hover:text-serenya-green hover:shadow-md transition-all cursor-pointer">
                    <Icon className="w-5 h-5" />
                </div>
            ))}
         </div>
         {/* Typography */}
         <div className="text-left z-10 w-full max-w-3xl font-hatolie pl-6">
             <div className="relative inline-block">
                 <h1 className="text-6xl md:text-[7rem] leading-[0.9] tracking-wide text-serenya-dark font-medium ">
                     Where <span className="text-serenya-green font-black">Streaming</span>
                 </h1>
                 <h1 className="text-6xl md:text-[7rem] leading-[0.9] tracking-wide text-serenya-dark font-medium">
                     Meets <span className="text-serenya-green font-black">Intelligence.</span>
                 </h1>
             </div>
         </div>
       
      </div>

    </section>
  );
}
