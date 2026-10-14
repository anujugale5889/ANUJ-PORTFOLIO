import React, { useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface ToolItem {
  name: string;
  category: string;
  color: string;
  icon: React.ReactNode;
}

// Crisp, high-fidelity SVG brand logos
const PyTorchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path
      d="M13.2 2.2L12 3.4l1.2 1.2a6.5 6.5 0 014.6 6.5c0 3.6-2.9 6.5-6.5 6.5A6.5 6.5 0 014.8 11l-1.5-.7A8 8 0 0019.3 11a8 8 0 00-6.1-8.8z"
      fill="#EE4C2C"
    />
    <circle cx="15.8" cy="4.8" r="1.4" fill="#EE4C2C" />
  </svg>
);

const OpenCVIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <circle cx="12" cy="7" r="3.6" fill="#EA4335" />
    <circle cx="7.2" cy="15.5" r="3.6" fill="#34A853" />
    <circle cx="16.8" cy="15.5" r="3.6" fill="#4285F4" />
    <circle cx="12" cy="7" r="1.4" fill="#000" fillOpacity="0.7" />
    <circle cx="7.2" cy="15.5" r="1.4" fill="#000" fillOpacity="0.7" />
    <circle cx="16.8" cy="15.5" r="1.4" fill="#000" fillOpacity="0.7" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path
      d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h2.9v.4H6.3S4 4.8 4 8c0 3.1 2 3 2 3h1.2V9.4s-.1-1.9 1.9-1.9h3.2s1.8 0 1.8-1.8V3.8S14.3 2 11.9 2z"
      fill="#3776AB"
    />
    <circle cx="8.5" cy="4.5" r=".7" fill="#fff" />
    <path
      d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-2.9v-.4h5.6s2.3.3 2.3-2.9c0-3.1-2-3-2-3h-1.2v1.6s.1 1.9-1.9 1.9h-3.2s-1.8 0-1.8 1.8v1.9s-.2 1.7 2.2 1.7z"
      fill="#FFD43B"
    />
    <circle cx="15.5" cy="19.5" r=".7" fill="#fff" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <ellipse cx="12" cy="12" rx="3" ry="8.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="8.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="8.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
    <circle cx="12" cy="12" r="1.6" fill="#61DAFB" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M4 11h7v2H8.6v7H6.4v-7H4v-2zm8.5 4.8c.6.5 1.4.8 2.2.8.9 0 1.4-.4 1.4-.9 0-.6-.4-.8-1.5-1.2-1.6-.5-2.6-1.2-2.6-2.5 0-1.5 1.2-2.6 3.1-2.6 1.1 0 2 .3 2.7.8l-.6 1.7c-.5-.4-1.2-.6-1.9-.6-.8 0-1.2.4-1.2.8 0 .5.4.7 1.4 1.1 1.7.5 2.7 1.2 2.7 2.6 0 1.6-1.3 2.6-3.3 2.6-1.3 0-2.4-.4-3.1-1l.6-1.7z" fill="#fff" />
  </svg>
);

const NextJsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <path d="M7 7.5v9h2v-5.2l6.8 5.2h2.2V7.5h-2v5.2L9.2 7.5H7z" fill="#fff" />
  </svg>
);

const MediaPipeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#00A4FF" strokeWidth="1.5" />
    <circle cx="12" cy="6" r="2" fill="#00E5FF" />
    <circle cx="6" cy="14" r="2" fill="#00A4FF" />
    <circle cx="18" cy="14" r="2" fill="#0072FF" />
    <path d="M12 6L6 14h12L12 6z" stroke="#00A4FF" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const FastAPIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="4" fill="#059669" />
    <path d="M13 2L4 14h6l-1 8 10-12h-6l2-8z" fill="#fff" />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M1.5 12.5c.3 3.5 3 6.5 6.5 7.5 4 .9 8.5-.2 11.5-3 .4-.3.7-.8.7-1.3-.2-.5-1-.9-1.5-.7-.8.3-1.6.3-2.4.1-.3-.6-.3-1.4-.1-2.1.2-.5.5-.9 1-1.1 1.1-.5 2.4.3 3.3 1.1.5.5.9 1.1 1.4 1.7.5-.9.7-2 .6-3-.2-1.7-1.4-3.2-3-3.6-1.3-.4-2.8 0-3.8.9V9h-3V6.5h-3V9H6V6.5H3V9H1.5v3.5z" fill="#2496ED" />
    <rect x="6.5" y="6.8" width="2" height="1.8" rx=".3" fill="#2496ED" />
    <rect x="9.5" y="6.8" width="2" height="1.8" rx=".3" fill="#2496ED" />
    <rect x="6.5" y="9.4" width="2" height="1.8" rx=".3" fill="#2496ED" />
    <rect x="9.5" y="9.4" width="2" height="1.8" rx=".3" fill="#2496ED" />
    <rect x="12.5" y="9.4" width="2" height="1.8" rx=".3" fill="#2496ED" />
  </svg>
);

const PostgreSQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M12 2C7 2 3.5 5.5 3.5 10c0 3 1.5 5.5 4 7l-.5 3 3-1.5c.7.3 1.4.5 2 .5 5 0 8.5-3.5 8.5-8S17 2 12 2zm1 14.5c-.7.3-1.5.5-2.2.5-.4 0-.8 0-1.1-.1l.3-1.8c.8.2 1.6.2 2.4 0l.6 1.4zm2.6-3.8c-.8.8-1.9 1.3-3.1 1.3-.8 0-1.6-.2-2.3-.6l.7-1.4c.5.3 1 .4 1.6.4.8 0 1.5-.3 2-1l1.1 1.3zm1.4-2.7c0 .5-.1 1-.4 1.4l-1.3-.8c.2-.2.2-.4.2-.6 0-.8-.7-1.5-1.5-1.5-.4 0-.7.1-1 .3l-.7-1.4c.5-.3 1.1-.4 1.7-.4 1.7 0 3 1.3 3 3z" fill="#336791" />
  </svg>
);

const NodeJsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" fill="#539E43" fillOpacity="0.2" stroke="#539E43" strokeWidth="1.5" />
    <path d="M12 6.5l5.5 3.2v6.4L12 19.3l-5.5-3.2V9.7L12 6.5z" fill="#539E43" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M6 8c1.3-2 3.3-3 6-3 4 0 5.3 3 7 4.5 1.3 1.2 2.7 1.5 4.5 1.5-1.3 2-3.3 3-6 3-4 0-5.3-3-7-4.5C9.2 8.3 7.8 8 6 8zm-5.5 7c1.3-2 3.3-3 6-3 4 0 5.3 3 7 4.5 1.3 1.2 2.7 1.5 4.5 1.5-1.3 2-3.3 3-6 3-4 0-5.3-3-7-4.5-1.3-1.2-2.7-1.5-4.5-1.5z" fill="#06B6D4" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.9 4.5l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.7 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.3.4.3.7 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.7.4-1V9.5c-.3-.2-.4-.5-.4-.9 0-.6.4-1.2 1-1.4L8.5 4.5 2.4 10.6c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.5c.6-.6.6-1.6 0-2.2z" fill="#F05032" />
  </svg>
);

const ScikitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <circle cx="8" cy="8" r="5" fill="#F7931E" />
    <circle cx="16" cy="14" r="5" fill="#3499CD" />
    <circle cx="12" cy="11" r="3" fill="#fff" fillOpacity="0.4" />
  </svg>
);

const TOOLS: ToolItem[] = [
  { name: 'PyTorch', category: 'Deep Learning', color: '#ee4c2c', icon: <PyTorchIcon /> },
  { name: 'OpenCV', category: 'Computer Vision', color: '#4285f4', icon: <OpenCVIcon /> },
  { name: 'Python', category: 'Core & AI Engine', color: '#3776ab', icon: <PythonIcon /> },
  { name: 'MediaPipe', category: 'Spatial Landmarks', color: '#00a4ff', icon: <MediaPipeIcon /> },
  { name: 'Next.js', category: 'Full-Stack Web', color: '#ffffff', icon: <NextJsIcon /> },
  { name: 'React', category: 'Interface Architecture', color: '#61dafb', icon: <ReactIcon /> },
  { name: 'TypeScript', category: 'Type Safety', color: '#3178c6', icon: <TypeScriptIcon /> },
  { name: 'FastAPI', category: 'Async Inference API', color: '#059669', icon: <FastAPIIcon /> },
  { name: 'Docker', category: 'Containerization', color: '#2496ed', icon: <DockerIcon /> },
  { name: 'PostgreSQL', category: 'Relational Store', color: '#336791', icon: <PostgreSQLIcon /> },
  { name: 'Tailwind CSS', category: 'Design Systems', color: '#06b6d4', icon: <TailwindIcon /> },
  { name: 'Node.js', category: 'Backend Runtime', color: '#539e43', icon: <NodeJsIcon /> },
  { name: 'Git', category: 'Version Control', color: '#f05032', icon: <GitIcon /> },
  { name: 'Scikit-Learn', category: 'Machine Learning', color: '#f7931e', icon: <ScikitIcon /> },
];

const STACK_WORDS = [
  'A', 'production', 'stack', 'engineered', 'end-to-end.', 
  'From', 'training', 'computer', 'vision', 'neural', 'networks', 
  'to', 'crafting', 'high-speed,', 'glassmorphic', 'interfaces', 
  'with', 'millimeter', 'precision.'
];

const InteractiveStackText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-40px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div 
      ref={containerRef}
      className="max-w-md text-sm sm:text-base leading-relaxed font-sans cursor-default select-none"
    >
      <p className="flex flex-wrap gap-x-1.5 gap-y-1">
        {STACK_WORDS.map((word, idx) => {
          // Check proximity to hovered word for radiant torch light falloff
          const isDirectHover = hoveredIdx === idx;
          const isNearHover = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;
          
          return (
            <span
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`inline-block transition-all duration-300 transform-gpu ${
                isDirectHover
                  ? 'text-gray-950 dark:text-white font-bold scale-110 drop-shadow-[0_0_14px_rgba(255,255,255,0.9)] -translate-y-0.5'
                  : isNearHover
                  ? 'text-gray-800 dark:text-white/80 font-semibold scale-105'
                  : isInView
                  ? 'text-gray-700 dark:text-white/60 font-normal hover:text-white'
                  : 'text-gray-400/40 dark:text-white/20 font-normal'
              }`}
            >
              {word}
            </span>
          );
        })}
      </p>
      <span className="block mt-2 font-mono text-[11px] text-gray-400 dark:text-gray-500">
        ✦ Hover words to inspect luminescence
      </span>
    </div>
  );
};

export const ToolkitMarquee: React.FC = () => {
  return (
    <section id="toolkit" className="relative z-10 w-full py-24 border-t border-black/10 dark:border-white/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#3b5bff] dark:text-[#bac3ff] font-semibold block mb-2">
              03 / Toolkit
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-gray-950 dark:text-white leading-none">
              My key skills <br />
              <span className="text-gray-400 dark:text-gray-500 font-normal">ready to build.</span>
            </h2>
          </div>

          <InteractiveStackText />
        </div>
      </div>

      {/* INFINITE MARQUEE RAIL WITH GLASSMORPHISM & MACOS DOCK POP */}
      <div className="relative w-full overflow-hidden py-8">
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-[#fafafa] dark:from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-[#fafafa] dark:from-[#09090b] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-5">
          {/* Double list for smooth infinite loop */}
          {[...TOOLS, ...TOOLS].map((tool, idx) => (
            <div
              key={idx}
              className="
                group relative flex items-center gap-3.5 px-4.5 py-3 rounded-2xl
                bg-white/80 dark:bg-[#12141c]/60
                backdrop-blur-2xl
                border border-black/10 dark:border-white/10
                hover:border-blue-500/50 dark:hover:border-blue-400/50
                shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                hover:shadow-[0_16px_36px_rgba(0,102,255,0.22)]
                shrink-0 cursor-pointer
                transform-gpu
                hover:scale-115 hover:-translate-y-2.5 active:scale-95
                transition-all duration-200 ease-out
              "
              style={{
                willChange: 'transform',
              }}
            >
              {/* Tool Icon Badge with subtle glass frame */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center p-2 bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-200 shadow-inner"
              >
                {tool.icon}
              </div>

              <div>
                <span className="block font-semibold text-sm text-gray-950 dark:text-white leading-tight font-display tracking-tight">
                  {tool.name}
                </span>
                <span className="block text-[11px] font-mono text-gray-500 dark:text-gray-400">
                  {tool.category}
                </span>
              </div>

              {/* macOS Dock-style top reflection highlight */}
              <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
