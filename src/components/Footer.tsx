"use client";

import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterInput {
  email: string;
}

export default function Footer() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterInput>();

  const onSubmit = (data: NewsletterInput) => {
    console.log("Newsletter lead captured:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000); // Reset state after 5 seconds
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-24 bg-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          
          {/* Col 1: About & Newsletter (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-heading font-black text-2xl tracking-wider text-white uppercase">
                FITNESS <span className="text-neon-orange">PRO</span>
              </span>
              <p className="mt-4 text-sm md:text-base text-off-white/60 font-light font-sans max-w-sm leading-relaxed">
                {"Pimpalgaon's leading luxury health facility. Equipped with bio-mechanically precise gear, elite guidance, and recovery services."}
              </p>
            </div>

            {/* Newsletter lead capture with react-hook-form */}
            <div className="mt-8">
              <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider mb-3">
                Join Our Inner Circle
              </h4>
              <p className="text-xs text-off-white/40 font-sans mb-4">
                Subscribe to get fitness tips, trainer guides, and priority trial class updates.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-md">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className={`w-full bg-deep-charcoal border text-white text-sm px-4 py-3.5 rounded-full focus:outline-none focus:border-neon-orange transition-colors ${
                        errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10"
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    
                    {/* Error indicator */}
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute left-4 -bottom-6 text-[10px] text-red-500 font-sans font-semibold"
                        >
                          {errors.email.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-6 py-3.5 bg-neon-orange text-black font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(255,107,26,0.25)] hover:shadow-[0_0_20px_rgba(255,107,26,0.5)] transition-all flex items-center justify-center gap-2 group"
                  >
                    Subscribe
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </div>

                {/* Lead Success Toast */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 -bottom-14 bg-electric-lime/10 border border-electric-lime/30 rounded-xl px-4 py-3 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-electric-lime" />
                      <span className="text-xs text-electric-lime font-heading font-bold uppercase tracking-wider">
                        Subscribed! Check your inbox shortly.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Col 2: Operating Hours & Quick Links (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-8 lg:gap-0">
            <div>
              <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider border-l-2 border-neon-orange pl-3 mb-6">
                Hours of Grind
              </h4>
              <ul className="space-y-4 font-sans text-sm text-off-white/70">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-neon-orange mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Monday – Saturday</span>
                    <span className="text-xs text-off-white/40">6:00 AM – 10:00 PM</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-electric-lime mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Sunday</span>
                    <span className="text-xs text-off-white/40">7:00 AM – 12:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider border-l-2 border-neon-orange pl-3 mb-6">
                Contact Info
              </h4>
              <ul className="space-y-3 font-sans text-sm text-off-white/70">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neon-orange" />
                  <a href="tel:+919999999999" className="hover:text-neon-orange transition-colors">
                    +91 99999 99999
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neon-orange" />
                  <a href="mailto:hello@lifefitnesspro.com" className="hover:text-neon-orange transition-colors">
                    hello@lifefitnesspro.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Maps and Location (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider border-l-2 border-neon-orange pl-3 mb-6">
                Locate Our Arena
              </h4>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-neon-orange mt-1 flex-shrink-0" />
                <p className="text-sm font-sans text-off-white/70 leading-relaxed font-light">
                  123 Demo Street, Demo Block, Pimpalgaon, Maharashtra 422209
                </p>
              </div>
            </div>

            {/* Google Maps Responsive Frame */}
            <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.986684784408!2d72.50742431496582!3d23.006093984961726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b33a0dc4f67%3A0x6e24cb11ef6bc718!2sRatnanjali%20Square!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fitness Pro Location Map"
              />
            </div>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-off-white/40 border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <span>&copy; {currentYear} Fitness Pro. All Rights Reserved.</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>
              Developed by{" "}
              <a
                href="https://kiranugale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-orange hover:text-white transition-colors duration-300 font-semibold underline"
              >
                Kiran Ugale
              </a>
            </span>
          </div>
          
          {/* Quick Legal Links */}
          <div className="flex items-center gap-6 font-sans">
            <a href="#privacy" className="hover:text-neon-orange transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neon-orange transition-colors">Terms of Service</a>
          </div>

          {/* Social Icons with individual hover scaling */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-neon-orange hover:text-black hover:border-neon-orange transition-colors duration-300 text-off-white/70"
            >
              <Facebook className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://instagram.com/lifefitnessproofficial"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-neon-orange hover:text-black hover:border-neon-orange transition-colors duration-300 text-off-white/70"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-neon-orange hover:text-black hover:border-neon-orange transition-colors duration-300 text-off-white/70"
            >
              <Youtube className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

      </div>
    </footer>
  );
}
