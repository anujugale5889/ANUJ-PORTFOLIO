import React from 'react';
import { Sparkles, Ban, ShieldAlert, Cpu } from 'lucide-react';

export const SlopCraftSection: React.FC = () => {
  return (
    <section id="craft" className="relative z-10 max-w-5xl mx-auto px-6 py-28 border-t border-black/10 dark:border-white/10">
      
      {/* Editorial Header */}
      <div className="max-w-2xl mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#3b5bff] dark:text-[#bac3ff] font-semibold block mb-3">
          (04 / Craft)
        </span>
        
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-950 dark:text-white leading-[1.05]">
          I use AI, but <br />
          I don't ship <span className="accent-serif font-serif italic text-amber-500 font-normal">slop.</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
          The models make me faster. The decisions stay mine: every architecture, every spatial coordinate, and every line of code is read, tested, and rewritten until it earns its place.
        </p>
      </div>

      {/* AI TEMPLATE SLOP vs HANDCRAFTED CODE COLLAGE */}
      <div className="relative rounded-3xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 p-6 sm:p-10 overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-black/5 dark:border-white/5 font-mono text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-500" />
            <span>Fig. 1 · The Default AI Output Problem</span>
          </span>
          <span className="text-gray-400 dark:text-gray-500">
            Same Prompts. Same Looking UIs. Zero Thought.
          </span>
        </div>

        {/* Collage Display of Generic Templates with Sticky Critiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
          
          {/* Card 1: Generic AI Pricing */}
          <div className="relative p-5 rounded-2xl bg-white dark:bg-[#121319] border border-black/10 dark:border-white/10 shadow-sm opacity-85 hover:opacity-100 transition-opacity">
            {/* Sticky critique tag */}
            <span className="absolute -top-3 -right-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold border border-rose-500/20 rotate-3">
              ✕ generic copies
            </span>

            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">FlowAI Cloud</span>
            <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">Ship 10x Faster With AI</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Unlock seamless cutting-edge workflows and supercharge productivity with next-gen AI.
            </p>
            <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 space-y-1.5 text-[11px] text-gray-600 dark:text-gray-400">
              <div className="flex justify-between"><span>Starter</span><b>$0</b></div>
              <div className="flex justify-between"><span>Pro Plan</span><b>$29</b></div>
            </div>
          </div>

          {/* Card 2: Generic AI Dashboard */}
          <div className="relative p-5 rounded-2xl bg-white dark:bg-[#121319] border border-black/10 dark:border-white/10 shadow-sm opacity-85 hover:opacity-100 transition-opacity">
            {/* Sticky critique tag */}
            <span className="absolute -top-3 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold border border-amber-500/20 -rotate-2">
              ✕ no real value
            </span>

            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">Nexora Suite</span>
            <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">Your AI Co-Pilot for Everything</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              AI credits: 12.4k · Revenue: $45,231 · Trusted by 10,000+ teams globally.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-full text-center py-1.5 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-medium text-gray-500">
                Generated Demo Mockup
              </span>
            </div>
          </div>

          {/* Card 3: The Contrast — Anuj's Engineering Standards */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-transparent border border-amber-500/30 shadow-md">
            {/* Stamp Badge */}
            <span className="absolute -top-3 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
              ✓ REAL CODE
            </span>

            <span className="text-[11px] font-mono text-amber-500 dark:text-amber-400 uppercase tracking-wider block mb-2">
              How I Engineer
            </span>
            <h4 className="font-bold text-gray-900 dark:text-white text-base mb-2">
              Custom Math & Real Hardware
            </h4>
            <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">→</span>
                <span>468 facial landmark mesh coordinates (no canned APIs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">→</span>
                <span>Grad-CAM heatmaps for explainable clinical validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">→</span>
                <span>Custom WebGL GLSL fragment shaders</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Editorial Callout */}
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-sans">
            "I'd rather build one tool that solves a real problem in an eye clinic or college campus than 50 generic landing pages with ChatGPT wrappers."
          </p>
          <span className="font-mono text-xs text-gray-400 whitespace-nowrap">
            — Anuj Ugale
          </span>
        </div>
      </div>
    </section>
  );
};
