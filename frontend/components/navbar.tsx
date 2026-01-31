import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DiagonalLink } from "@/components/ui/diagonal-link";

export function Navbar() {
  const navLinks = [
    { name: "Shop", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "Philosophy", href: "#" },
    { name: "Contacts", href: "#" },
  ];

  return (
    <nav className="flex justify-between items-center py-5 px-8 md:px-6 max-w-[1600px] mx-auto">
      {/* Brand */}
      <div className="flex items-center gap-2">
        
        <span className="text-3xl font-medium tracking-wider text-serenya-dark font-star">StreamSmart</span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 items-center -ml-15 font-raleway">
        {navLinks.map((link) => (
          <DiagonalLink 
            key={link.name} 
            href={link.href}
            className="text-serenya-dark text-sm font-medium"
          >
            {link.name}
          </DiagonalLink>
        ))}
      </div>

      {/* Right Icons */}
      <div className="flex gap-4 items-center">
         <Button size="icon" variant="serenya" className="rounded-full shadow-lg hover:shadow-xl transition-all">
            <ShoppingBag className="w-4 h-4" />
         </Button>
         <Button size="icon" variant="serenya" className="rounded-full shadow-lg hover:shadow-xl transition-all">
            <User className="w-4 h-4" />
         </Button>
      </div>
    </nav>
  );
}
