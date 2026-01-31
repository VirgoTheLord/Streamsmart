"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface DiagonalLinkProps {
  href: string;
  children: string;
  className?: string;
}

export function DiagonalLink({ href, children, className }: DiagonalLinkProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const chars = children.split("");

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onMouseEnter = contextSafe(() => {
    // Select all original characters and replacement characters using locally scoped classes
    const originals = containerRef.current?.querySelectorAll(".char-original");
    const replacements = containerRef.current?.querySelectorAll(".char-replacement");

    if (originals && replacements) {
        gsap.to(originals, {
            y: "-100%",
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out"
        });
        
        gsap.to(replacements, {
            y: "0%",
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out"
        });
    }
  });

  const onMouseLeave = contextSafe(() => {
    const originals = containerRef.current?.querySelectorAll(".char-original");
    const replacements = containerRef.current?.querySelectorAll(".char-replacement");

    if (originals && replacements) {
        gsap.to(originals, {
            y: "0%",
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.to(replacements, {
            y: "100%",
            stagger: 0.02,
            duration: 0.4,
            ease: "power2.out"
        });
    }
  });

  return (
    <Link
      ref={containerRef}
      href={href}
      className={cn(
        "relative overflow-hidden inline-flex cursor-pointer text-lg font-medium leading-[1em]", // inline-flex to keep chars together
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Original Text Container */}
      <span className="relative inline-flex overflow-hidden">
        {chars.map((char, i) => (
          <span key={i} className="char-original inline-block relative translate-y-0">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      
      {/* Replacement Text Container (Absolute) */}
      <span className="absolute top-0 left-0 inline-flex overflow-hidden text-serenya-primary">
        {chars.map((char, i) => (
          <span key={i} className="char-replacement inline-block relative translate-y-full">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </Link>
  );
}
