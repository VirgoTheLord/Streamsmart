"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface HoverLinkProps {
  href: string;
  children: string;
  className?: string;
}

export function HoverLink({ href, children, className }: HoverLinkProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onMouseEnter = contextSafe(() => {
    if (!text1Ref.current || !text2Ref.current) return;
    
    gsap.to(text1Ref.current, {
      y: "-100%",
      duration: 0.4,
      ease: "power2.out",
    });
    
    gsap.to(text2Ref.current, {
      y: "0%",
      duration: 0.4,
      ease: "power2.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    gsap.to(text1Ref.current, {
      y: "0%",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(text2Ref.current, {
      y: "100%",
      duration: 0.4,
      ease: "power2.out",
    });
  });

  return (
    <Link
      ref={containerRef}
      href={href}
      className={cn(
        "relative overflow-hidden inline-block h-[1.2em] leading-[1.2em] cursor-pointer",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Original Text */}
      <span
        ref={text1Ref}
        className="block"
      >
        {children}
      </span>
      
      {/* Replacement Text (Hidden below initially) */}
      <span
        ref={text2Ref}
        className="absolute top-0 left-0 block w-full translate-y-full text-serenya-primary" // Use primary color for the hover state text
      >
        {children}
      </span>
    </Link>
  );
}
