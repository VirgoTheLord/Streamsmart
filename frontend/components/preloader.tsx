"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftShutterRef = useRef<HTMLDivElement>(null);
  const rightShutterRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  const fullText = "STREAMSMART";

  useLayoutEffect(() => {
    // Immediate check to skip if visited
    if (document.documentElement.classList.contains("no-preloader")) {
      setComplete(true);
      return;
    }

    // Lock scroll and force top position
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const hasVisited = sessionStorage.getItem("hasVisited");
      
      if (hasVisited) {
        setComplete(true);
        document.body.style.overflow = "";
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ""; // Restore scroll before unmounting/hiding
          setComplete(true);
          sessionStorage.setItem("hasVisited", "true");
        }
      });

      if (!textRef.current) return;

      const letters = Array.from(textRef.current.querySelectorAll(".letter"));
      const s1 = letters[0]; // First S
      const s2 = letters[6]; // Middle S (StreamSmart -> index 6 is the second S)
      
      const middleChars = letters.slice(1, 6); // TREAM
      const endChars = letters.slice(7); // MART

      const hiddenChars = [...middleChars, ...endChars].filter(Boolean);
      
      // Initial States
      gsap.set(hiddenChars, {
        width: 0, 
        opacity: 0,
        scale: 0,
        margin: 0,
        padding: 0
      });
      
      if (middleChars.length > 0) {
        gsap.set(middleChars.filter(Boolean), { width: "20px" });
      }

      if (s1) gsap.set(s1, { y: "-50vh", x: "-10vw", rotation: -30, scale: 2.5, opacity: 0 });
      if (s2) gsap.set(s2, { y: "50vh", x: "10vw", rotation: 30, scale: 2.5, opacity: 0 });

      // Ensure vertical shutters are closed
      if (leftShutterRef.current && rightShutterRef.current) {
        gsap.set(leftShutterRef.current, { xPercent: 0 });
        gsap.set(rightShutterRef.current, { xPercent: 0 });
      }


      // --- Animation Sequence ---

      // 1. Entry
      if (s1 && s2) {
        tl.to([s1, s2], {
          y: 0,
          x: 0,
          opacity: 1,
          rotation: 0,
          scale: 2,
          duration: 1.2,
          ease: "power4.out"
        });

        // 2. Expansion
        tl.to([s1, s2], {
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut"
        }, "expand");
      }

      if (hiddenChars.length > 0) {
        tl.to(hiddenChars, {
          width: "auto",
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: { amount: 0.3, from: "center" }
        }, "expand");
      }
      
      // 3. Hold
      tl.to({}, { duration: 0.5 });

      // 4. Cinematic Exit (Awards Style - Vertical Split)
      // Text zooms in and fades out
      if (textRef.current) {
        tl.to(textRef.current, {
           scale: 1.5,
           opacity: 0,
           duration: 0.8,
           ease: "power2.in"
        }, "exit");
      }

      // Shutters split open (Left goes Left, Right goes Right)
      if (leftShutterRef.current && rightShutterRef.current) {
         tl.to([leftShutterRef.current, rightShutterRef.current], {
             xPercent: (i) => i === 0 ? -100 : 100, // Left goes -100 (left), Right goes 100 (right)
             duration: 1.5,
             ease: "power4.inOut"
         }, "exit+=0.4");
      }

    }, containerRef);

    return () => {
      ctx.revert();
      // Cleanup might not run if component renders null instead of unmounting, 
      // but explicit unlock in onComplete handles the main flow.
      document.body.style.overflow = ""; 
    };
  }, []);

  if (complete) return null;

  return (
    <div 
      ref={containerRef} 
      className="preloader-container fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Left Shutter */}
      <div 
        ref={leftShutterRef}
        className="absolute top-0 left-0 w-[51%] h-full bg-white dark:bg-[#020817] z-0" 
      />
      
      {/* Right Shutter */}
      <div 
        ref={rightShutterRef}
        className="absolute top-0 right-0 w-[51%] h-full bg-white dark:bg-[#020817] z-0" 
      />

      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-10 flex items-center justify-center "
      >
         <h1 className="font-star text-[clamp(40px,6vw,90px)] font-bold tracking-widest flex items-center justify-center -mt-20">
            {fullText.split("").map((char, i) => (
                <span 
                  key={i} 
                  className={`letter inline-block origin-center whitespace-pre ${
                    (i === 0 || i === 6) ? "text-serenya-dark dark:text-white z-10" : "text-serenya-dark dark:text-white"
                  }`}
                >
                    {char}
                </span>
            ))}
         </h1>
      </div>
    </div>
  );
}
