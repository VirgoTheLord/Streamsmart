import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { FloatingFooter } from "@/components/floating-footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Hero />
      <BentoGrid />
      <FloatingFooter />
    </main>
  );
}
