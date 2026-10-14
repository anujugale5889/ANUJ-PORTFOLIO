import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Portfolio } from './components/Portfolio';
import { WaveLoader } from './components/ui/wave-loader';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Audio instruction: Whenever website is opened, refreshed, or reloaded, start strictly from the beginning
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    // Smooth wave loader transition gate
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#07080a] text-[#18181b] dark:text-[#f4f4f5] relative selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* 1. WAVE LOADER GATE */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="wave-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] bg-[#020307] text-white flex flex-col items-center justify-center p-6 select-none"
          >
            <div className="flex flex-col items-center gap-5">
              <WaveLoader
                bars={5}
                className="w-1.5 sm:w-2 h-7 sm:h-8 bg-[#1a68ff] rounded-full shadow-[0_0_16px_rgba(26,104,255,0.6)]"
                message="Anuj Ugale"
                messagePlacement="bottom"
              />
              <span className="font-mono text-[11px] tracking-widest uppercase text-white/40 -mt-2">
                Portfolio 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN PORTFOLIO */}
      <main className="w-full">
        <Portfolio />
      </main>
    </div>
  );
}
