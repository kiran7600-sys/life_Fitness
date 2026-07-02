"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Plus } from "lucide-react";

interface InstagramItem {
  id: number;
  image: string;
  link: string;
}

export default function InstagramGrid() {
  const initialItems: InstagramItem[] = [
    {
      id: 1,
      image: "/images/insta-workout.png",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
  ];

  const paginatedItems: InstagramItem[] = [
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=400&h=400&fit=crop",
      link: "https://instagram.com/lifefitnessproofficial",
    },
  ];

  const [visibleItems, setVisibleItems] = useState<InstagramItem[]>(initialItems);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setVisibleItems((prev) => [...prev, ...paginatedItems]);
    setHasMore(false);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-deep-charcoal/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-heading font-extrabold uppercase tracking-[0.3em] text-electric-lime">
            Social Vibe
          </span>
          <h2 className="mt-3 font-heading font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
            FOLLOW THE VIBE <br />
            <a 
              href="https://instagram.com/lifefitnessproofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-orange hover:text-white transition-colors duration-300 inline-flex items-center gap-2 mt-2"
            >
              @lifefitnessproofficial
              <Instagram className="w-6 md:w-8 h-6 md:h-8" />
            </a>
          </h2>
        </div>

        {/* Instagram Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {visibleItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-square overflow-hidden rounded-xl bg-deep-charcoal border border-white/5 group cursor-pointer block"
            >
              {/* Image with blur loading placeholder representation */}
              <Image
                src={item.image}
                alt="Fitness Pro Instagram Post"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out group-hover:brightness-[0.75]"
                unoptimized={item.image.startsWith("http")}
              />

              {/* Hover overlay with interactive rotating Instagram logo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-neon-orange flex items-center justify-center shadow-lg text-black"
                >
                  <Instagram className="w-6 h-6" />
                </motion.div>
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-[0.2em] text-white bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  View on Instagram
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 font-heading text-xs font-bold uppercase tracking-wider text-white border border-white/20 rounded-full hover:border-neon-orange hover:bg-neon-orange/5 transition-all duration-300"
            >
              <Plus className="w-4 h-4 text-neon-orange" />
              Load More Vibe
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
