"use client";

import { ShoppingBag, User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DiagonalLink } from "@/components/ui/diagonal-link";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  const navLinks = [
    { name: "Shop", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "Philosophy", href: "#" },
    { name: "Contacts", href: "#" },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center py-5 px-8 md:px-6 max-w-[1600px] mx-auto">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <span className="text-3xl font-medium tracking-wider text-serenya-dark dark:text-white font-star">StreamSmart</span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 items-center -ml-15 font-raleway">
        {navLinks.map((link) => (
          <DiagonalLink
            key={link.name}
            href={link.href}
            className="text-serenya-dark dark:text-white transition-colors text-sm font-medium"
          >
            {link.name}
          </DiagonalLink>
        ))}
      </div>

      {/* Right Icons */}
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button size="icon" variant="serenya" className="rounded-full shadow-lg hover:shadow-xl transition-all dark:bg-serenya-dark/20 dark:text-white dark:hover:bg-serenya-dark/40">
          <ShoppingBag className="w-4 h-4" />
        </Button>

        {/* Auth Button */}
        {isLoggedIn && user ? (
          <div className="relative" ref={profileRef}>
            <button
              id="profile-btn-home"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 bg-serenya-primary/10 dark:bg-serenya-primary/20 border border-serenya-primary/20 dark:border-serenya-accent/30 rounded-full pl-1 pr-2.5 py-1 hover:bg-serenya-primary/20 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-serenya-primary dark:bg-serenya-accent flex items-center justify-center text-white text-xs font-bold font-raleway">
                {user.initials}
              </div>
              <span className="text-xs font-raleway font-medium text-serenya-dark dark:text-white hidden sm:block max-w-[80px] truncate">
                {user.name}
              </span>
              <ChevronDown className={`w-3 h-3 text-serenya-dark/60 dark:text-white/60 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#0d1f3c] border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 border-b border-black/5 dark:border-white/5">
                  <p className="text-xs font-raleway font-semibold text-serenya-dark dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-black/40 dark:text-white/40 font-raleway truncate">{user.email}</p>
                </div>
                <button
                  id="sign-out-btn-home"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-raleway text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            id="sign-in-link-home"
            href="/login"
            className="flex items-center gap-1.5 text-sm font-raleway font-semibold text-white bg-serenya-primary hover:bg-serenya-primary/90 px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <User className="w-3.5 h-3.5" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
