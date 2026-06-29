"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export default function Trainers() {
  const trainers: Trainer[] = [
    {
      id: 1,
      name: "Priya Sharma",
      specialty: "Strength & Posture Specialist",
      bio: "10+ years coaching Olympic lifters. Specialized in structural alignment and high-threshold muscle recruitment.",
      image: "/images/trainer-priya.png",
    },
    {
      id: 2,
      name: "Raj Patel",
      specialty: "CrossFit & Functional Coach",
      bio: "Former national decathlete. Focuses on explosive power, metabolic conditioning, and agility training.",
      image: "/images/trainer-raj.png",
    },
    {
      id: 3,
      name: "Amit Shah",
      specialty: "Zumba & Cardio Director",
      bio: "ZIN-certified lead instructor. Blends high-intensity dance choreography with dynamic intervals for pure calorie burning.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Vikram Rathore",
      specialty: "Recovery & Mobility Specialist",
      bio: "Certified physiotherapist. Expert in dry needling, myofascial release, and passive stretching for joint integrity.",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400&h=400&fit=crop",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const autoPlayRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % trainers.length);
  }, [trainers.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
  }, [trainers.length]);

  // Handle autoplay with pause on hover
  useEffect(() => {
    autoPlayRef.current = handleNext;
  });

  useEffect(() => {
    if (isHovered) return;
    
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };

    const interval = setInterval(play, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // 3D Tilt effect handlers (Desktop only, triggers via mouse interactions)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Disable on tablet/mobile
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Normalize offsets
    const rotateX = -(y / (box.height / 2)) * 6; // Max 6 degrees rotation
    const rotateY = (x / (box.width / 2)) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section id="trainers" className="scroll-mt-24 py-24 md:py-32 bg-deep-charcoal/30 relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-heading font-extrabold uppercase tracking-[0.3em] text-electric-lime flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 fill-electric-lime" />
              ELITE COACHES
            </span>
            <h2 className="mt-3 font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-white">
              MEET THE <span className="text-neon-orange">TRAINERS</span>
            </h2>
            <div className="w-24 h-1 bg-electric-lime mt-4 origin-left" />
          </div>

          {/* Carousel Controls (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-neon-orange hover:border-neon-orange hover:text-black transition-all duration-300"
              aria-label="Previous Trainer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-neon-orange hover:border-neon-orange hover:text-black transition-all duration-300"
              aria-label="Next Trainer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel / stacked grid */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          {/* Mobile Stacked Grid & Desktop Sliding */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-center gap-8 justify-center overflow-hidden py-4">
            {trainers.map((trainer, idx) => {
              // On desktop, we highlight the active slider card but show others as slide-able
              const isActive = idx === activeIndex;

              return (
                <motion.div
                  key={trainer.id}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: "transform 0.15s ease-out" }}
                  className={`relative w-full lg:w-[280px] xl:w-[300px] flex-shrink-0 p-8 rounded-2xl glass-panel border border-white/5 shadow-2xl flex flex-col items-center text-center cursor-grab active:cursor-grabbing group overflow-hidden ${
                    isActive && "lg:border-neon-orange/40 lg:shadow-[0_10px_35px_rgba(255,107,26,0.15)]"
                  }`}
                  animate={
                    isDesktop
                      ? {
                          opacity: isActive ? 1 : 0.4,
                          scale: isActive ? 1.05 : 0.95,
                          x: -activeIndex * 40,
                        }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Trainer Circle Image with pulsing orange border */}
                  <div className="relative w-48 h-48 rounded-full mb-6 flex items-center justify-center z-10">
                    {/* Pulsing Border */}
                    <div className="absolute inset-0 rounded-full border-3 border-neon-orange group-hover:animate-ping opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="absolute inset-0.5 rounded-full border-2 border-white/10" />
                    
                    <div className="w-44 h-44 rounded-full overflow-hidden border-3 border-neon-orange/80 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        unoptimized={trainer.image.startsWith("http")}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                    {trainer.name}
                  </h3>
                  <span className="text-xs font-heading font-bold text-neon-orange mt-1 uppercase tracking-widest block">
                    {trainer.specialty}
                  </span>

                  {/* Bio Description (Always visible on mobile; slides open on hover on desktop) */}
                  <div className="mt-4 text-sm text-off-white/70 font-light font-sans max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 lg:transition-all lg:duration-500 lg:ease-out overflow-hidden md:max-h-24 md:opacity-100 text-center">
                    <p className="mt-2 leading-relaxed">{trainer.bio}</p>
                  </div>
                  
                  {/* Bio backup for static view */}
                  <div className="block lg:hidden mt-4 text-sm text-off-white/70 font-light font-sans text-center">
                    <p className="leading-relaxed">{trainer.bio}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator (Desktop Only) */}
          <div className="flex justify-center gap-2 mt-12 lg:hidden">
            {trainers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? "bg-neon-orange w-8" 
                    : "bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="hidden lg:flex justify-center gap-2.5 mt-12">
            {trainers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? "bg-neon-orange w-8" 
                    : "bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
