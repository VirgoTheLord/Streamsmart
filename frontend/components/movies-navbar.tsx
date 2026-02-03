import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DiagonalLink } from "@/components/ui/diagonal-link";
import { ModeToggle } from "@/components/mode-toggle";

export function MoviesNavbar() {
  return (
    <nav className="flex justify-between items-center py-3 px-6 max-w-[1600px] mx-auto relative z-50">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <Link href="/" className="text-2xl sm:text-3xl font-medium tracking-wider text-serenya-dark dark:text-white font-star">
          StreamSmart
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 items-center font-raleway absolute left-1/2 -translate-x-1/2">
        {[
          { name: "Movies", href: "/movies" },
          { name: "Series", href: "/series" },
          { name: "Anime", href: "/anime" }
        ].map((link) => (
          <DiagonalLink 
            key={link.name} 
            href={link.href}
            className="text-serenya-dark dark:text-white transition-colors text-sm font-medium [&_.char-replacement]:text-serenya-primary [&_.char-replacement]:dark:text-white"
          >
            {link.name}
          </DiagonalLink>
        ))}
      </div>

      {/* Right Icons */}
      <div className="flex gap-3 items-center">
         <ModeToggle />
         <Button size="icon" variant="ghost" className="rounded-full hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
            <ShoppingBag className="w-4 h-4" />
         </Button>
         <Button size="icon" variant="ghost" className="rounded-full hover:bg-black/5 dark:text-white dark:hover:bg-white/10">
            <User className="w-4 h-4" />
         </Button>
      </div>
    </nav>
  );
}
