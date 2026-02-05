import { cookies } from "next/headers";
import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { FloatingFooter } from "@/components/floating-footer";
import { Preloader } from "@/components/preloader";

export default async function Home() {
  const cookieStore = await cookies();
  const hasVisited = cookieStore.get("hasVisited");
  const showAnimation = !hasVisited;

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {showAnimation && <Preloader />}
      <Hero showAnimation={showAnimation} />
      <BentoGrid />
      <FloatingFooter />
    </main>
  );
}
