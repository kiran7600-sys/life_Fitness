"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element locally on client side
    audioRef.current = new Audio("/audio/gym-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume for comfortable background level

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser: ", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <div className="relative">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-deep-charcoal border border-white/10 text-off-white text-[11px] font-heading font-extrabold uppercase tracking-wider py-2 px-4 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap z-50"
            >
              {isPlaying ? "Pause Gym Music" : "Play Gym Music"}
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-deep-charcoal border-l-0" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Backlight when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-electric-lime/20 animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayback}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_5px_25px_rgba(0,0,0,0.5)] transition-all duration-300 border cursor-pointer ${
            isPlaying 
              ? "bg-black border-electric-lime text-electric-lime shadow-[0_0_20px_rgba(57,255,20,0.3)]" 
              : "bg-deep-charcoal border-white/15 text-off-white/70 hover:border-neon-orange hover:text-neon-orange"
          }`}
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? (
            <div className="flex flex-col items-center gap-1">
              <Volume2 className="w-5 h-5" />
              {/* Dancing Equalizer Bars */}
              <div className="flex items-end gap-[2px] h-3 w-5 justify-center">
                <motion.div
                  animate={{ height: [3, 9, 3] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
                  className="w-[2.5px] bg-electric-lime rounded-full"
                />
                <motion.div
                  animate={{ height: [6, 3, 10, 6] }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                  className="w-[2.5px] bg-neon-orange rounded-full"
                />
                <motion.div
                  animate={{ height: [3, 7, 3] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                  className="w-[2.5px] bg-electric-lime rounded-full"
                />
              </div>
            </div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
