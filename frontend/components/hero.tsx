import Image from "next/image";
import { Leaf, HandHeart, Droplet, ArrowRight, Pause, VolumeX, Search, Globe, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function Hero() {
  return (
    <section className="relative w-full max-w-[1600px] mx-auto pt-2 mb-12 pb-2 px-6 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-100px)] min-h-[600px]">
      

      <div className="relative w-full h-full overflow-hidden group">
        <Image 
          src="/new.avif" 
          alt="Serenya Model" 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        

        <div className="absolute bottom-4 left-4 flex gap-4">

            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Pause className="w-5 h-5 text-serenya-dark" fill="currentColor" />
            </button>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <VolumeX className="w-5 h-5 text-serenya-dark" />
            </button>
        </div>


        <button className="absolute bottom-4 right-4 w-14 h-14 bg-serenya-accent rounded-full flex items-center justify-center hover:bg-serenya-primary transition-colors">
            <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>



      <div className="relative w-full h-full flex flex-col items-start justify-center pl-2 overflow-hidden">
         
         <div className="flex flex-col items-start justify-center w-full max-w-4xl gap-6 z-10 pl-6 md:pl-0">
             

             <div className="text-left w-full font-hatolie pl-6">
                 <h1 className="text-6xl md:text-[7rem] leading-[0.9] tracking-wide text-serenya-dark font-medium">
                     Where <span className="text-serenya-primary font-black">Streaming</span>
                 </h1>
                 <h1 className="text-6xl md:text-[7rem] leading-[0.9] tracking-wide text-serenya-dark font-medium">
                     Meets <span className="text-serenya-primary font-black">Intelligence.</span>
                 </h1>
             </div>


             <div className="w-full max-w-2xl font-raleway">
                 <div className="relative bg-white border border-serenya-accent/20 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 p-4">
                     

                     <Textarea 
                        placeholder="Ask anything..." 
                        className="w-full bg-transparent border-none outline-none text-lg text-serenya-dark placeholder:text-serenya-dark/50 resize-none h-[60px] p-2 font-medium shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px]"
                     />


                     <div className="flex items-center justify-between mt-2 pt-2">
                        

                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="sm" className="rounded-full text-serenya-dark/60 hover:text-serenya-dark border-serenya-dark/10 bg-serenya-bg/30 h-8 gap-2 px-3">
                                 <Search className="w-4 h-4" />
                                 <span>Focus</span>
                             </Button>
                             <Button variant="ghost" size="icon" className="rounded-full text-serenya-dark/40 hover:text-serenya-dark hover:bg-serenya-bg/50 h-8 w-8">
                                <Globe className="w-5 h-5" />
                             </Button>
                        </div>


                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-serenya-dark/40 hover:text-serenya-dark hover:bg-serenya-bg/50 rounded-full h-9 w-9">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-serenya-dark/40 hover:text-serenya-dark hover:bg-serenya-bg/50 rounded-full h-9 w-9">
                                <Mic className="w-5 h-5" />
                            </Button>
                            <Button variant="default" size="icon" className="group rounded-full h-9 w-9 bg-serenya-accent hover:bg-serenya-primary shadow-sm">
                                <ArrowRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                            </Button>
                        </div>
                     </div>
                 </div>

                 <div className="flex flex-wrap justify-center gap-2 mt-4">
                     {["Action", "Comedy", "Drama", "Sci-Fi"].map((pill) => (
                        <Button 
                            key={pill} 
                            variant="secondary"
                            size="sm"
                            className="rounded-lg bg-white/60 border border-serenya-dark/5 text-serenya-dark/60 hover:text-serenya-dark hover:bg-white hover:border-serenya-dark/20 transition-all cursor-pointer h-7 text-xs font-medium"
                        >
                            <span className="opacity-50 mr-1.5">❖</span>
                            {pill}
                        </Button>
                     ))}
                 </div>
             </div>
             
         </div>
       
      </div>

    </section>
  );
}
