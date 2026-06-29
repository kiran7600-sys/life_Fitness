"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-deep-charcoal hover:bg-neon-orange border border-white/10 hover:border-neon-orange text-white hover:text-black flex items-center justify-center shadow-[0_5px_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Chat Button */}
      <div className="relative">
        {/* Hover Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-deep-charcoal border border-white/10 text-off-white text-[11px] font-heading font-extrabold uppercase tracking-wider py-2 px-4 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap z-50"
            >
              Chat with us!
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-deep-charcoal border-r-0" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Backlight */}
        <span className="absolute -inset-1 rounded-full bg-neon-orange/20 animate-ping opacity-60 pointer-events-none" />

        {/* Main WhatsApp Button */}
        <motion.a
          href="https://wa.me/919999999999?text=Hello%20Life%20Fitness%20Pro%2C%20I%20would%20like%20to%20claim%20my%20Free%20Trial%20Class!"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-neon-orange hover:bg-white flex items-center justify-center shadow-[0_5px_25px_rgba(255,107,26,0.55)] transition-all duration-300 cursor-pointer"
          aria-label="Open WhatsApp chat"
        >
          {/* Custom SVG WhatsApp Icon */}
          <svg
            className="w-7 h-7 fill-black"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.386 9.805-9.789.002-2.618-1.01-5.078-2.853-6.924C16.38 2.045 13.924.996 11.312.996 5.91.996 1.51 5.385 1.508 10.787c-.001 1.511.416 2.992 1.207 4.287L1.75 20.358l5.244-1.378-.347.174zm10.718-7.795c-.32-.16-1.89-.93-2.185-1.038-.295-.107-.51-.16-.723.16-.214.32-.828 1.038-1.014 1.253-.186.214-.373.241-.693.08-1.6-.8-2.73-1.477-3.83-3.364-.29-.497.29-.462.83-1.536.09-.18.04-.34-.02-.45-.06-.11-.51-1.228-.7-1.69-.184-.445-.37-.384-.51-.39-.13-.007-.28-.009-.43-.009-.15 0-.39.056-.6.287-.21.23-.8.78-.8 1.905s.82 2.21.93 2.36c.11.15 1.62 2.476 3.93 3.473.55.237 1 .378 1.34.484.55.176 1.06.15 1.46.09.45-.067 1.89-.773 2.155-1.48.267-.706.267-1.31.187-1.437-.08-.127-.295-.207-.615-.367z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
