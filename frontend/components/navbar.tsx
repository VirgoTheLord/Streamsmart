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
        <div className="text-serenya-green">
           {/* Simple flower icon placeholder */}
           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4V9H19C20.1 9 21 9.9 21 11V13C21 14.1 20.1 15 19 15H14V20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20V15H5C3.9 15 3 14.1 3 13V11C3 9.9 3.9 9 5 9H10V4C10 2.9 10.9 2 12 2ZM7 7L17 17M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
        <span className="text-4xl font-semibold tracking-wider text-serenya-dark font-hatolie">StreamSmart</span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 items-center font-raleway">
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
