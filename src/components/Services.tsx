"use client";

import { motion } from "framer-motion";
import { Dumbbell, Zap, Music, Compass, Apple, HeartPulse } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "orange" | "lime";
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      title: "Strength Training",
      description: "Harness elite strength training utilizing our premium Hammer Strength machines and free-weight zones.",
      icon: Dumbbell,
      accentColor: "orange",
    },
    {
      title: "CrossFit & Functional",
      description: "High-octane CrossFit classes, custom turf zones, sled pulls, and battle ropes to build raw endurance.",
      icon: Zap,
      accentColor: "lime",
    },
    {
      title: "Zumba & Aerobics",
      description: "Express your energy with rhythm-based cardiac workouts led by certified premium choreographers.",
      icon: Music,
      accentColor: "orange",
    },
    {
      title: "Yoga & Flexibility",
      description: "Re-center your mind and enhance core joint mobility in our tranquil sound-insulated studios.",
      icon: Compass,
      accentColor: "lime",
    },
    {
      title: "Nutrition Planning",
      description: "Tailored food intake consultations and dynamic biometric profiling mapped by certified dietitians.",
      icon: Apple,
      accentColor: "orange",
    },
    {
      title: "Recovery & Mobility",
      description: "Recharge with professional sports massages, hyperbaric chambers, and targeted myofascial release.",
      icon: HeartPulse,
      accentColor: "lime",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    },
  };

  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-electric-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-heading font-extrabold uppercase tracking-[0.3em] text-neon-orange"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-white"
          >
            PUSH YOUR LIMITS WITH <br />
            <span className="text-stroke-orange font-black">PREMIUM SERVICES</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-1 bg-neon-orange mx-auto mt-6 origin-center"
          />
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOrange = service.accentColor === "orange";
            const accentClass = isOrange 
              ? "text-neon-orange bg-neon-orange/5 border-neon-orange/20" 
              : "text-electric-lime bg-electric-lime/5 border-electric-lime/20";
            
            const hoverGlow = isOrange
              ? "rgba(255, 107, 26, 0.15)"
              : "rgba(57, 255, 20, 0.15)";
              
            const borderAccent = isOrange
              ? "group-hover:border-neon-orange/80"
              : "group-hover:border-electric-lime/80";

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: `0 20px 40px ${hoverGlow}`,
                  backgroundColor: "rgba(22, 22, 22, 0.9)",
                }}
                className={`group relative p-8 md:p-10 rounded-2xl bg-deep-charcoal border border-white/5 transition-all duration-300 overflow-hidden flex flex-col justify-between h-full`}
              >
                {/* Accent Corner Glow */}
                <div 
                  className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none ${
                    isOrange ? "bg-neon-orange" : "bg-electric-lime"
                  }`} 
                />

                {/* Animated Expanding Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 pointer-events-none ${borderAccent}`} />

                <div>
                  {/* Icon Box */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className={`inline-flex items-center justify-center p-4 rounded-xl border ${accentClass} mb-8`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-xl md:text-2xl text-white uppercase tracking-wide group-hover:text-neon-orange transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm md:text-base text-off-white/70 leading-relaxed font-light font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Micro-arrow indicator */}
                <div className="mt-8 flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-off-white/30 group-hover:text-white transition-colors duration-300">
                  <span>Explore Class</span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
                    isOrange ? "bg-neon-orange" : "bg-electric-lime"
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
