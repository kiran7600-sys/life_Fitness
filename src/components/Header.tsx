"use client";

import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Trainers", href: "#trainers" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isScrolled
            ? "glass-panel py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-white/5"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <motion.div
              animate={{ scale: isScrolled ? 0.95 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="bg-neon-orange p-2 rounded-lg glow-orange shadow-md flex items-center justify-center">
                <Flame className="w-6 h-6 text-black fill-black" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-wider uppercase bg-gradient-to-r from-white via-white to-neon-orange bg-clip-text text-transparent group-hover:to-electric-lime transition-all duration-500">
                LIFE FITNESS <span className="text-neon-orange group-hover:text-electric-lime transition-colors duration-500">PRO</span>
              </span>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-heading text-sm font-semibold uppercase tracking-wider text-off-white hover:text-neon-orange transition-colors duration-300 py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-heading text-xs font-bold uppercase tracking-wider text-black bg-neon-orange rounded-full shadow-[0_0_15px_rgba(255,107,26,0.3)] transition-all duration-300 hover:scale-105 hover:bg-neon-orange hover:shadow-[0_0_25px_rgba(255,107,26,0.6)] active:scale-95"
            >
              Free Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-off-white hover:text-neon-orange transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 w-full h-[calc(100vh-60px)] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 mb-8">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-xl font-bold uppercase tracking-widest text-off-white hover:text-neon-orange transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-black bg-neon-orange rounded-full shadow-[0_0_20px_rgba(255,107,26,0.4)]"
              >
                Free Trial
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
