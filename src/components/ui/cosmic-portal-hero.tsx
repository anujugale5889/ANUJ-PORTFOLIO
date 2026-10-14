import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface CosmicPortalHeroProps {
  onEnter?: () => void;
  theme?: 'dark' | 'light';
}

export const CosmicPortalHero: React.FC<CosmicPortalHeroProps> = ({ 
  onEnter, 
  theme = 'dark' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean, professional scroll parallax (no artificial blur, no hover distortion)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.3, 0]);
  const promptOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const scrollToMain = () => {
    if (onEnter) {
      onEnter();
      return;
    }
    const el = document.getElementById('hero-hi') || document.getElementById('hero-main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen h-[100dvh] bg-[#020307] text-white overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 1. Subtle Cosmic Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1200px] h-[60vh] rounded-full bg-[#0048ff]/[0.18] blur-[140px] pointer-events-none"
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[800px] h-[40vh] rounded-full bg-[#00d0ff]/[0.10] blur-[100px] pointer-events-none"
        />
      </div>

      {/* CENTERPIECE: ZERO-GRAVITY ARTWORK IN WIDER FLOATING FRAME (Both Themes) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center justify-center px-3 sm:px-5 md:px-8 py-3 sm:py-5 w-full my-auto"
      >
        <div className="relative w-full max-w-[95vw] xl:max-w-[1400px] 2xl:max-w-[1540px] aspect-[16/9] max-h-[80vh] sm:max-h-[84vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(0,80,255,0.25)] bg-black">
          {/* Subtle Outer Electric Shadow Glow behind the Frame */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-400/15 to-blue-700/20 blur-[30px] pointer-events-none" />

          {/* High-Resolution Cosmic Artwork (Used on BOTH light and dark themes) */}
          <img
            src="/portfolio-hero-cosmic.png"
            alt="Anuj Ugale — Zero Gravity Portfolio Entry"
            className="w-full h-full object-cover object-center block"
            loading="eager"
            style={{
              imageRendering: 'auto',
            }}
          />

          {/* Crisp 1px Specular Glass Rim Border */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/15 pointer-events-none" />
        </div>
      </motion.div>

      {/* 4. Bottom Professional Scroll Action Prompt */}
      <motion.div
        style={{ opacity: promptOpacity }}
        className="relative z-20 pb-6 sm:pb-8 flex flex-col items-center justify-center gap-2"
      >
        <button
          onClick={scrollToMain}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
        </button>
      </motion.div>

      {/* Bottom Gradient Fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020307] to-transparent pointer-events-none z-10" />
    </div>
  );
};
