
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";


export default function Home() {
  return (
    <div className="min-h-screen bg-serenya-bg font-sans text-foreground overflow-x-hidden">
      
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-[1600px] mx-auto">
          <Hero />
        </main>
      </div>
    </div>
  );
}
