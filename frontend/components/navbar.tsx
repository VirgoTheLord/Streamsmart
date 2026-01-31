import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";

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
          <Link 
            key={link.name} 
            href={link.href}
            className="text-serenya-dark text-sm font-medium hover:text-serenya-green transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right Icons */}
      <div className="flex gap-4 items-center">
         <button className="w-10 h-10 rounded-full bg-serenya-green text-white flex items-center justify-center hover:bg-serenya-primary transition-colors shadow-[0_0_15px_rgba(55,139,46,0.5)] hover:shadow-[0_0_20px_rgba(55,139,46,0.7)]">
            <ShoppingBag className="w-4 h-4" />
         </button>
         <button className="w-10 h-10 rounded-full bg-serenya-green text-white flex items-center justify-center hover:bg-serenya-primary transition-colors shadow-[0_0_15px_rgba(55,139,46,0.5)] hover:shadow-[0_0_20px_rgba(55,139,46,0.7)]">
            <User className="w-4 h-4" />
         </button>
      </div>
    </nav>
  );
}
