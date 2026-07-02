"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, MessageSquareQuote, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialTile {
  type: "text";
  quote: string;
  name: string;
  category: string;
  accent: "orange" | "lime";
}

interface MetricTile {
  type: "metric";
  metric: string;
  subtext: string;
  name: string;
  accent: "orange" | "lime";
}

interface ImageTile {
  type: "before-after";
  beforeImage: string;
  afterImage: string;
  name: string;
  summary: string;
}

type Tile = TestimonialTile | MetricTile | ImageTile;

export default function WallOfFame() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const tiles: Tile[] = [
    {
      type: "text",
      quote: "Fitness Pro completely changed how I look at training. The coaches here don't just count reps; they analyze movement patterns. Best facility in Pimpalgaon!",
      name: "Raj Patel",
      category: "Strength Journey",
      accent: "orange",
    },
    {
      type: "metric",
      metric: "50 lbs",
      subtext: "Lost in 5 Months",
      name: "Smit Shah",
      accent: "lime",
    },
    {
      type: "before-after",
      beforeImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&h=250&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&h=250&fit=crop&hue=100&sat=120", // hue shifted for "after" feel
      name: "Karan Mehta",
      summary: "Fat Loss & Muscle Gain Program",
    },
    {
      type: "text",
      quote: "The CrossFit sessions are absolutely legendary. The high-energy environment and community vibe in the evening pushes you to do better every single day.",
      name: "Aarav Mehta",
      category: "Endurance Athlete",
      accent: "lime",
    },
    {
      type: "metric",
      metric: "+15% Max Squat",
      subtext: "In 8 Weeks of Strength Training",
      name: "Neha Patel",
      accent: "orange",
    },
    {
      type: "text",
      quote: "As a working professional, the 6:00 AM slots are a lifesaver. The equipment is always clean, and there is never a queue for the racks.",
      name: "Sneha Vyas",
      category: "Early Bird Member",
      accent: "orange",
    },
    {
      type: "before-after",
      beforeImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=200&h=250&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=250&fit=crop",
      name: "Pooja Trivedi",
      summary: "Flexibility & Core Rebuild",
    },
    {
      type: "metric",
      metric: "90 Days",
      subtext: "Consistent Attendance Streak",
      name: "Vikram Dave",
      accent: "lime",
    },
  ];

  // GSAP ScrollTrigger Animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animate
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".reveal-header"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );

    // Masonry grid reveal
    gsap.fromTo(
      sectionRef.current.querySelector(".masonry-grid"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".masonry-grid",
          start: "top 85%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="reviews" className="scroll-mt-24 py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-20">
          <span className="reveal-header text-xs font-heading font-extrabold uppercase tracking-[0.3em] text-neon-orange block">
            Wall of Fame
          </span>
          <h2 className="reveal-header mt-3 font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-white">
            TRANSFORMATIONS & <span className="text-stroke-orange font-black">STORIES</span>
          </h2>
          <div className="reveal-header w-24 h-1 bg-neon-orange mx-auto mt-6" />
        </div>

        {/* Masonry Columns Grid */}
        <div className="masonry-grid columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 opacity-0">
          {tiles.map((tile, idx) => {
            if (tile.type === "text") {
              const isOrange = tile.accent === "orange";
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="break-inside-avoid mb-6 p-6 rounded-2xl bg-deep-charcoal border border-white/5 glow-orange-hover hover:border-neon-orange/40 hover:bg-black/60 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <MessageSquareQuote className={`w-8 h-8 ${isOrange ? "text-neon-orange" : "text-electric-lime"}`} />
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-neon-orange text-neon-orange" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-off-white/80 italic font-sans font-light leading-relaxed group-hover:text-neon-orange transition-colors duration-300">
                    &ldquo;{tile.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-white/5 pt-4">
                    <div className="font-heading font-extrabold text-sm text-white uppercase tracking-wider">
                      {tile.name}
                    </div>
                    <div className={`text-[10px] uppercase font-bold mt-0.5 tracking-wider ${isOrange ? "text-neon-orange" : "text-electric-lime"}`}>
                      {tile.category}
                    </div>
                  </div>
                </motion.div>
              );
            }

            if (tile.type === "metric") {
              const isOrange = tile.accent === "orange";
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="break-inside-avoid mb-6 p-6 rounded-2xl bg-gradient-to-br from-deep-charcoal to-black border border-white/5 flex flex-col justify-between hover:border-electric-lime/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      isOrange ? "border-neon-orange/20 text-neon-orange" : "border-electric-lime/20 text-electric-lime"
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-off-white/40">
                      Verified Result
                    </span>
                  </div>
                  <div className={`text-4xl md:text-5xl font-heading font-black tracking-tighter ${
                    isOrange ? "text-neon-orange" : "text-electric-lime"
                  }`}>
                    {tile.metric}
                  </div>
                  <p className="text-sm text-white font-semibold font-sans mt-2">
                    {tile.subtext}
                  </p>
                  <span className="text-xs text-off-white/40 font-light mt-4 block">
                    — {tile.name}
                  </span>
                </motion.div>
              );
            }

            if (tile.type === "before-after") {
              return (
                <motion.div
                  key={idx}
                  className="break-inside-avoid mb-6 rounded-2xl bg-deep-charcoal border border-white/5 overflow-hidden group cursor-pointer"
                >
                  {/* Side by side image layout */}
                  <div className="relative flex w-full h-[220px] overflow-hidden">
                    <div className="relative w-1/2 h-full overflow-hidden border-r border-black/30">
                      <Image
                        src={tile.beforeImage}
                        alt="Before"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 rounded text-[9px] font-heading font-bold uppercase tracking-wider text-off-white z-10">
                        Before
                      </div>
                    </div>
                    <div className="relative w-1/2 h-full overflow-hidden">
                      <Image
                        src={tile.afterImage}
                        alt="After"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-neon-orange rounded text-[9px] font-heading font-bold uppercase tracking-wider text-black z-10">
                        After
                      </div>
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="p-5">
                    <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider">
                      {tile.name}
                    </h4>
                    <p className="text-xs text-off-white/60 font-sans mt-1">
                      {tile.summary}
                    </p>
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </div>

        {/* Google Reviews Call To Action */}
        <div className="mt-16 text-center">
          <motion.a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-black bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-neon-orange hover:shadow-[0_0_25px_rgba(255,107,26,0.5)] group"
          >
            {/* Custom Google Styled G Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.111 4.114-3.414 0-6.19-2.775-6.19-6.19 0-3.414 2.776-6.19 6.19-6.19 1.488 0 2.851.528 3.918 1.404l2.97-2.97C19.043 2.124 15.842 1 12.24 1c-6.076 0-11 4.924-11 11s4.924 11 11 11c5.783 0 10.596-4.148 10.596-11 0-.663-.075-1.332-.2-1.933H12.24z"/>
            </svg>
            See All Reviews on Google
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
