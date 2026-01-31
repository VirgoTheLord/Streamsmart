import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { FloatingFooter } from "@/components/floating-footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div 
             className="absolute inset-0 bg-background/80" 
             style={{
                backgroundImage: "var(--bg-image)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
             }}
          />
          <div className="absolute inset-0 bg-background/50 dark:bg-background/60" />
      </div>
      <Navbar />
      <Hero />
      <BentoGrid />
      <FloatingFooter />
    </main>
  );
}
