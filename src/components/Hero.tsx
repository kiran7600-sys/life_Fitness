"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Play } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Synchronized GSAP ScrollTrigger for Parallax and Zoom
  useGSAP(() => {
    if (!containerRef.current) return;

    // Zoom/parallax effect on background video
    gsap.to(videoWrapperRef.current, {
      scale: 1.15,
      yPercent: 8,
      opacity: 0.4,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Parallax translation and fade on hero content
    gsap.to(textRef.current, {
      y: 120,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 40%",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Intersection Observer to lazy-play video only when visible in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch((err) => {
            console.log("Video play interrupted or blocked: ", err);
          });
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
    >

      {/* Cinematic Bottom Letterbox Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[8vh] bg-black z-30 flex items-center justify-between px-8 border-t border-white/5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-heading">
          Fitness Pro © 2026
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
          <span className="text-[9px] tracking-wider uppercase text-electric-lime font-heading font-semibold">
            Live Facility Status: Active
          </span>
        </div>
      </div>

      {/* Hero Video / Poster Wrapper */}
      <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-75"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/gymvideo.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Overlay and Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Parallax Content Container */}
      <div
        ref={textRef}
        className="relative z-20 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center justify-center pt-28 md:pt-36 pb-12"
      >

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="font-heading font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] text-white select-none"
        >
          {"PIMPALGAON'S PREMIER"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-red-500 drop-shadow-[0_4px_12px_rgba(255,107,26,0.35)]">
            FITNESS DESTINATION
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base md:text-xl text-off-white/80 max-w-2xl font-light leading-relaxed font-sans"
        >
          Experience cutting-edge equipment, elite personal training, and a high-energy community that pushes you to your absolute limits.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-black bg-neon-orange rounded-full shadow-[0_0_20px_rgba(255,107,26,0.4)] transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center gap-2 group"
          >
            Claim Free Trial Class
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-white border-2 border-neon-orange/60 rounded-full transition-all duration-300 hover:scale-105 hover:bg-neon-orange/10 hover:border-neon-orange active:scale-95 flex items-center justify-center gap-2"
          >
            Explore Facility
            <Play className="w-3.5 h-3.5 fill-white text-white" />
          </a>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-heading">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 text-white/50" />
      </motion.div>
    </section>
  );
}
