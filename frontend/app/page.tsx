import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { FloatingFooter } from "@/components/floating-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <BentoGrid />
      <FloatingFooter />
    </main>
  );
}
