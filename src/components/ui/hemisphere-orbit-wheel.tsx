import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Eye, 
  ScanFace, 
  ShieldAlert, 
  Calculator, 
  TrendingUp 
} from 'lucide-react';
import { LuminousText } from './text-animations';

interface ToolNode {
  id: string;
  name: string;
  category: string;
  project: string;
  iconBg: string;
  desc: string;
}

const HEMISPHERE_TOOLS: ToolNode[] = [
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'Deep Learning',
    project: 'RetiPath-AI',
    iconBg: '#EE4C2C',
    desc: 'Deep convolutional feature extraction and Grad-CAM explainability maps for clinical triage.'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Computer Vision',
    project: 'Neural Face & RetiPath',
    iconBg: '#4285F4',
    desc: 'Spatial frame matrix transforms, CLAHE contrast equalization and spatial preprocessing.'
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'Spatial Landmarks',
    project: 'Neural Face',
    iconBg: '#00A4FF',
    desc: 'Dense 468-point spatial facial landmark mesh tracking with 3D head pose estimation.'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'AI Engine & Logic',
    project: 'RetiPath, Neural Face, Buy or Wait',
    iconBg: '#3776AB',
    desc: 'Deterministic discrete-event simulations, vector embedding pipelines, and neural workflows.'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Async Backend',
    project: 'Microservice APIs',
    iconBg: '#059669',
    desc: 'High-throughput async ASGI inference endpoints delivering sub-15ms model latencies.'
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'UI Architecture',
    project: 'Portfolio & OhMyPoly',
    iconBg: '#61DAFB',
    desc: 'Component hierarchies, zero-runtime overhead rendering, and reactive micro-interactions.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Type Safety',
    project: 'Full-Stack Systems',
    iconBg: '#3178C6',
    desc: 'Strict compile-time type safety preventing runtime null/undefined state regressions.'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Web Framework',
    project: 'Production Apps',
    iconBg: '#111827',
    desc: 'Server-side rendering, edge caching, and optimized client bundles for search engines.'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containerization',
    project: 'Deployment Pipelines',
    iconBg: '#2496ED',
    desc: 'Reproducible multi-stage container builds ensuring identical execution environments.'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Design Systems',
    project: 'Glassmorphic Interfaces',
    iconBg: '#06B6D4',
    desc: 'Spatial glass tokens, tailored dark palettes, and responsive multi-display utilities.'
  }
];

export const HemisphereOrbitWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolNode>(HEMISPHERE_TOOLS[0]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Smooth continuous rotation of the 3D hemisphere wheel
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null && !isPaused) {
        const delta = (time - lastTimeRef.current) / 1000;
        // Rotate ~8 degrees per second for a serene, cinematic wheel
        setRotation(prev => (prev + delta * 9) % 360);
      }
      lastTimeRef.current = time;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPaused]);

  const totalTools = HEMISPHERE_TOOLS.length;
  const radius = 340; // 3D cylinder depth radius

  return (
    <div className="relative w-full max-w-5xl mx-auto px-6 py-14 overflow-hidden select-none">
      {/* SECTION SUBTITLE & INTRO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
              Spatial 3D Arc · Architecture Wheel
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
            End-to-End Applied Stack
          </h3>
        </div>
        <LuminousText 
          className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm"
          text="A continuous 3D rotating hemisphere. Click any node on the arc to inspect its architecture role and project application."
        />
      </div>

      {/* 3D HEMISPHERE CAROUSEL STAGE */}
      <div 
        className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-black/[0.02] via-sky-500/[0.03] to-transparent dark:from-white/[0.01] dark:via-sky-400/[0.03] dark:to-transparent border border-black/5 dark:border-white/10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft Vignette Masks on Left & Right to Create Hemisphere Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#fafafa] dark:from-[#05070d] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-[#fafafa] dark:from-[#05070d] to-transparent z-20 pointer-events-none" />

        {/* Ambient Hemisphere Dome Arc Glow */}
        <div className="absolute bottom-6 inset-x-12 h-28 rounded-[100%] bg-gradient-to-t from-sky-500/10 via-cyan-400/5 to-transparent blur-2xl pointer-events-none" />
        
        {/* Subtle Curved Horizon Track Line */}
        <div className="absolute bottom-12 inset-x-16 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none" />

        {/* 3D ROTATING PERSPECTIVE CONTAINER */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: '1100px',
            transformStyle: 'preserve-3d',
          }}
        >
          {HEMISPHERE_TOOLS.map((tool, index) => {
            const angle = (index * (360 / totalTools) + rotation) % 360;
            const rad = (angle * Math.PI) / 180;
            
            // 3D coordinates on cylindrical hemisphere
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius - 80;
            
            // Normalized depth: items in front (z > 0) are brighter, larger, and interactive
            const depthFactor = (z + radius) / (2 * radius);
            const isFront = z > -100;
            const opacity = Math.max(0.1, Math.min(1, depthFactor * 1.3));
            const isSelected = activeTool.id === tool.id;

            return (
              <div
                key={tool.id}
                onClick={() => setActiveTool(tool)}
                className={`absolute cursor-pointer transition-transform duration-150 ${
                  isFront ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{
                  transform: `translate3d(${x}px, ${-Math.cos(rad) * 20}px, ${z}px) scale(${0.75 + depthFactor * 0.35})`,
                  opacity,
                  zIndex: Math.round(z + 500),
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className={`flex flex-col items-center gap-2 p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-sky-500/20 border-cyan-400/80 shadow-[0_0_24px_rgba(56,189,248,0.5)] scale-110'
                      : 'bg-white/80 dark:bg-[#0c0e17]/80 border-black/10 dark:border-white/15 hover:border-cyan-400/50 hover:bg-white/95 dark:hover:bg-[#131624]'
                  }`}
                  style={{ width: '130px' }}
                >
                  {/* Tool Color Beacon Dot */}
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md"
                    style={{ backgroundColor: tool.iconBg }}
                  >
                    {tool.name.slice(0, 2)}
                  </div>

                  <div className="text-center w-full truncate">
                    <span className="block font-display text-xs font-bold text-gray-950 dark:text-white truncate">
                      {tool.name}
                    </span>
                    <span className="block font-mono text-[10px] text-gray-400 dark:text-gray-400 truncate">
                      {tool.category}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PAUSE / ROTATE HINT */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 dark:bg-[#05070d]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300 flex items-center gap-1.5 shadow-sm">
            <span>✦</span>
            <span>{isPaused ? 'Paused for inspection' : 'Continuous orbital rotation · Hover to pause'}</span>
          </span>
        </div>
      </div>

      {/* SELECTED TOOL TELEMETRY INSPECTOR CARD */}
      <motion.div 
        key={activeTool.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-5 p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#0a0d17]/70 backdrop-blur-xl border border-black/8 dark:border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0"
            style={{ backgroundColor: activeTool.iconBg }}
          >
            {activeTool.name.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-base font-bold text-gray-950 dark:text-white">
                {activeTool.name}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 dark:text-sky-400 font-mono text-[10px] font-semibold border border-sky-500/20">
                {activeTool.category}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
              {activeTool.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
            Deployed in:
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 font-mono text-xs font-semibold text-gray-800 dark:text-gray-200 border border-black/5 dark:border-white/5">
            {activeTool.project}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
