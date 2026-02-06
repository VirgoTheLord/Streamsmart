import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { FloatingFooter } from "@/components/floating-footer";

import { Preloader } from "@/components/preloader";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Preloader />
      <Hero />
      <BentoGrid />
      <FloatingFooter />
    </main>
  );
}
