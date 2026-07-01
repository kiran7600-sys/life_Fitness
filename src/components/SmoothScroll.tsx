"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Sync Lenis with GSAP Ticker
    function update(time: number) {
      // time is in seconds from GSAP Ticker, Lenis raf expects milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Initial ScrollTrigger refresh
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easeOutExpo
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        autoRaf: false, // Disable built-in RAF loop so GSAP handles it
      }}
    >
      {children}
    </ReactLenis>
  );
}
