export function FloatingFooter() {
  return (
    <div className="flex justify-center w-full px-4 pb-8 pt-5">
      <div className="relative w-full max-w-[1500px] bg-white dark:bg-black rounded-[3rem] border border-serenya-accent/20 dark:border-serenya-dark/10 overflow-hidden shadow-2xl transition-colors duration-300">
        

        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[150%] blur-[80px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(73,136,196,0.15)_0%,rgba(15,40,84,0)_70%)] dark:bg-[radial-gradient(circle,rgba(73,136,196,0.3)_0%,rgba(15,40,84,0)_70%)]" 
        />
        

        <div 
            className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full pointer-events-none opacity-40 mix-blend-screen dark:mix-blend-normal blur-[40px] bg-[radial-gradient(circle,rgba(189,232,245,0.3)_0%,rgba(73,136,196,0.1)_40%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(73,136,196,0.4)_0%,rgba(28,77,141,0.2)_40%,transparent_70%)]"
        />


        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-serenya-accent/5 dark:bg-serenya-dark/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 md:py-16 md:px-12 gap-6 h-full min-h-[200px]">

          <div className="flex flex-col items-center justify-center text-center">
             <div className="flex items-center justify-center gap-3 md:gap-5 mb-2 md:mb-4 group cursor-default">

                 <div className="relative w-10 h-10 md:w-14 md:h-14">
                    <div className="absolute inset-0 bg-serenya-accent blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    
                 </div>
                 
                 <h2 className="text-4xl sm:text-5xl md:text-8xl text-transparent bg-clip-text mr-4 md:mr-10 bg-gradient-to-b from-serenya-dark to-serenya-accent dark:from-white dark:to-neutral-400 font-star tracking-wider drop-shadow-sm dark:drop-shadow-none">
                    StreamSmart
                 </h2>
             </div>
             <p className="text-serenya-dark/60 dark:text-white/60 text-[10px] md:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase font-medium font-raleway md:ml-5 px-4 text-balance">
                Websites that work as good as they look
             </p>
          </div>

          <p className="text-neutral-500 dark:text-white/60 text-xs font-medium font-raleway">© 2026 StreamSmart. All rights reserved.</p>

        </div>
      </div>
    </div>
  );
}
