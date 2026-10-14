import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

const ROLES = [
  "AI Engineering",
  "Computer Vision",
  "Full-Stack Web",
  "Agentic Systems",
  "Deep Learning",
  "UI/UX Architecture"
];

export const ModernPreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Role switcher interval
    const roleTimer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 450);

    // Fast counter from 01 to 25
    const countTimer = setInterval(() => {
      setCount(prev => {
        if (prev >= 25) {
          clearInterval(countTimer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 350);
          return 25;
        }
        return prev + 1;
      });
    }, 60);

    return () => {
      clearInterval(roleTimer);
      clearInterval(countTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <div className="fixed inset-0 z-[999] pointer-events-auto flex items-center justify-center overflow-hidden">
          {/* Top Curtain Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 inset-x-0 h-1/2 bg-[#090a0d] border-b border-white/[0.06]"
          />

          {/* Bottom Curtain Half */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#090a0d] border-t border-white/[0.06]"
          />

          {/* Center Stage Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-lg sm:text-2xl md:text-3xl font-medium text-white/70">
              <span className="font-normal text-white/50">Need a guy for</span>
              <span className="h-8 sm:h-10 flex items-center justify-center min-w-[200px] text-white font-semibold font-mono tracking-tight bg-white/[0.06] px-4 rounded-lg border border-white/10 text-base sm:text-xl text-amber-400">
                {ROLES[roleIndex]}
              </span>
            </div>

            <p className="mt-4 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>You found</span>
              <span className="text-amber-500 font-display italic font-extrabold text-3xl sm:text-5xl md:text-6xl">
                him.
              </span>
            </p>

            {/* Bottom Progress Counter */}
            <div className="mt-12 flex items-center gap-3 font-mono text-xs sm:text-sm text-white/40">
              <span className="text-amber-400 font-bold tabular-nums">
                ({String(count).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>25)</span>
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
