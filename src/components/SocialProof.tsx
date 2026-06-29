"use client";

import { useEffect, useRef } from "react";
import { Star, Users, MapPin } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface CounterProps {
  from: number;
  to: number;
  decimals?: number;
  suffix?: string;
  trigger: boolean;
}

function AnimatedCounter({ from, to, decimals = 0, suffix = "", trigger }: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  
  // Transform the motion value to a formatted string
  const displayValue = useTransform(motionValue, (value) => 
    value.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (!trigger) return;

    const controls = animate(motionValue, to, {
      duration: 1.5,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motionValue, to, trigger]);

  // Sync motion value updates directly to DOM node without triggering React re-renders
  useEffect(() => {
    const unsubscribe = displayValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = latest;
      }
    });
    return () => unsubscribe();
  }, [displayValue]);

  return <span ref={nodeRef} className="tabular-nums">{from.toFixed(decimals) + suffix}</span>;
}

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 mt-10 md:mt-16">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-panel rounded-2xl md:rounded-full px-8 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-neon-orange/20"
      >
        {/* Rating Stat */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          <div className="w-12 h-12 rounded-full bg-neon-orange/10 flex items-center justify-center border border-neon-orange/30">
            <Star className="w-6 h-6 text-neon-orange fill-neon-orange" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-heading font-black text-white flex items-center gap-1">
              <AnimatedCounter from={4.0} to={4.8} decimals={1} trigger={isInView} />
              <span className="text-sm text-off-white/40 font-normal">/5</span>
            </div>
            <div className="text-xs uppercase tracking-wider text-off-white/50 font-semibold mt-0.5">
              Google Rating (500+ Reviews)
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="hidden md:block w-px h-12 bg-white/10" />
        <div className="md:hidden w-full h-px bg-white/5" />

        {/* Happy Members Stat */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center">
          <div className="w-12 h-12 rounded-full bg-electric-lime/10 flex items-center justify-center border border-electric-lime/30">
            <Users className="w-6 h-6 text-electric-lime" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-heading font-black text-white">
              <AnimatedCounter from={0} to={930} suffix="+" trigger={isInView} />
            </div>
            <div className="text-xs uppercase tracking-wider text-off-white/50 font-semibold mt-0.5">
              Active Happy Members
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="hidden md:block w-px h-12 bg-white/10" />
        <div className="md:hidden w-full h-px bg-white/5" />

        {/* Location Stat */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          <div className="w-12 h-12 rounded-full bg-neon-orange/10 flex items-center justify-center border border-neon-orange/30">
            <MapPin className="w-6 h-6 text-neon-orange" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-heading font-black text-white hover:text-neon-orange transition-colors">
              Prahladnagar
            </div>
            <div className="text-xs uppercase tracking-wider text-off-white/50 font-semibold mt-0.5">
              Ahmedabad, Gujarat
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
