import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Check, Sparkles, Cpu, Radio } from 'lucide-react';
import { LuminousText } from './text-animations';

export const BentoProjectsGrid: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ═══ TOP ROW: 2 WIDE CARDS ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* ── CARD 1: RetiPath-AI (Top Left) ── */}
        <div className="group relative rounded-[28px] overflow-hidden bg-white/75 dark:bg-[#0c0d12]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.09] hover:border-blue-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] transition-all duration-300 flex flex-col justify-between">
          {/* Top Visual: RetiPath-AI Official Branding inside sleek bezel */}
          <div className="p-3 sm:p-4 pb-0">
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-[#000614] border border-black/[0.06] dark:border-white/[0.08] shadow-inner flex items-center justify-center p-5 sm:p-6">
              {/* Subtle Cyan/Blue Ambient Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16),transparent_70%)] pointer-events-none" />
              <img
                src="/projects/retipath-banner.png"
                alt="RetiPath-AI Official Branding"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out relative z-10"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-7 pt-4 sm:pt-5 relative z-10 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                  Insight · SIH 2026 Selection
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">© 2026</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight mb-3">
                RetiPath-AI
              </h3>

              <LuminousText
                className="text-sm leading-relaxed mb-6 text-gray-600 dark:text-gray-400"
                text="An AI-assisted retinal screening and clinical triage system engineered for early diabetic retinopathy detection. Integrates automated biomarker segmentation (microaneurysms, hard exudates, haemorrhages) and Grad-CAM explainability heatmaps for transparent clinical decision support."
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['PyTorch', 'Python', 'FastAPI', 'Grad-CAM', 'OpenCV', 'React'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/5 font-mono text-xs text-gray-700 dark:text-gray-300 border border-black/[0.06] dark:border-white/5 hover:bg-black/[0.07] dark:hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/[0.08] dark:border-white/[0.08] text-xs">
                <span className="font-mono text-gray-500 dark:text-gray-400">Team Oscillon · University Selected</span>
                <a
                  href="https://github.com/anujugale5889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>View Repository</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: Neural Face (Top Right) ── */}
        <div className="group relative rounded-[28px] overflow-hidden bg-white/75 dark:bg-[#0c0d12]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.09] hover:border-cyan-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-xl hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between">
          {/* Top Visual: Neural Face Official Branding inside sleek bezel */}
          <div className="p-3 sm:p-4 pb-0">
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-[#010817] border border-black/[0.06] dark:border-white/[0.08] shadow-inner flex items-center justify-center p-5 sm:p-6">
              {/* Subtle Cyan Ambient Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),transparent_70%)] pointer-events-none" />
              <img
                src="/projects/neuralface-banner.png"
                alt="Neural Face Official Branding"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out relative z-10"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-7 pt-4 sm:pt-5 relative z-10 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Biometrics · Sub-5ms Inference
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">© 2025</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white tracking-tight mb-3">
                Neural Face
              </h3>

              <LuminousText
                className="text-sm leading-relaxed mb-6 text-gray-600 dark:text-gray-400"
                text="A real-time college biometric attendance system using facial recognition. Developed to automatically log student attendance via dense 468-point spatial facial landmark tracking, head pose estimation (yaw, pitch, roll), and 512-dimensional vector embedding distance matching with sub-5ms inference latency."
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Python', 'OpenCV', 'MediaPipe', 'Vector Embeddings', 'FastAPI', 'Dual WebGL'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/5 font-mono text-xs text-gray-700 dark:text-gray-300 border border-black/[0.06] dark:border-white/5 hover:bg-black/[0.07] dark:hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/[0.08] dark:border-white/[0.08] text-xs">
                <span className="font-mono text-gray-500 dark:text-gray-400">Campus Attendance Biometrics</span>
                <a
                  href="https://github.com/anujugale5889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>View Repository</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM ROW: 3 CARDS ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

        {/* ── CARD 3: Email Guard (Bottom Left) ── */}
        <div className="group relative rounded-[28px] overflow-hidden bg-white/75 dark:bg-[#0c0d12]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.09] hover:border-emerald-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] transition-all duration-300 flex flex-col justify-between">
          {/* Top Visual: Cyber Threat Radar Mesh inside sleek bezel */}
          <div className="p-3 sm:p-4 pb-0">
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#07080b] border border-black/[0.06] dark:border-white/[0.08] shadow-inner flex flex-col justify-between p-4">
              {/* Floating Top Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Headquarter
                </span>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  Port 443 · TLS
                </span>
              </div>

              {/* Concentric Wireframe Threat Radar Animation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-60">
                {/* Dotted Radar concentric circles */}
                <div className="w-48 h-48 rounded-full border border-dashed border-emerald-500/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute w-36 h-36 rounded-full border border-emerald-500/25" />
                <div className="absolute w-24 h-24 rounded-full border border-emerald-500/30" />
                <div className="absolute w-12 h-12 rounded-full border border-emerald-500/40" />

                {/* Radar sweep beam */}
                <div
                  className="absolute w-44 h-44 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.25) 0deg, transparent 60deg, transparent 360deg)',
                    animation: 'spin 4s linear infinite',
                  }}
                />

                {/* Pulsing target node blips */}
                <div className="absolute top-10 left-16 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
                <div className="absolute bottom-12 right-20 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>

              {/* Gradient feather */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#07080b] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                Speed · Threat Defense
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight mb-2">
                Email Guard
              </h3>
              <LuminousText
                className="text-xs sm:text-sm leading-relaxed mb-4 text-gray-600 dark:text-gray-400"
                text="An intelligent email security agent engineered to detect spam, deceptive psychological urgency triggers, and phishing attacks using multi-token NLP heuristics."
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['NLP', 'Python', 'FastAPI', 'Regex Engine'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/5 font-mono text-[11px] text-gray-700 dark:text-gray-300 border border-black/[0.06] dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.08] text-xs">
                <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">Heuristic NLP Engine</span>
                <a
                  href="https://github.com/anujugale5889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Repo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 4: OhMyPoly (Bottom Center) ── */}
        <div className="group relative rounded-[28px] overflow-hidden bg-white/75 dark:bg-[#0c0d12]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.09] hover:border-amber-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-xl hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between">
          {/* Top Visual: Stacked Frosted Glass Cards inside sleek bezel */}
          <div className="p-3 sm:p-4 pb-0">
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#07080b] border border-black/[0.06] dark:border-white/[0.08] shadow-inner flex items-center justify-center p-4">
              {/* Circuit background traces */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.4) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Stacked Interactive Glass Cards matching reference image */}
              <div className="relative flex items-center justify-center gap-2.5 z-10">
                {/* Card 1: Checkmark Circle */}
                <motion.div
                  className="w-14 h-16 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/15 flex items-center justify-center shadow-lg"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                </motion.div>

                {/* Card 2: 75% Limit Threshold */}
                <motion.div
                  className="w-16 h-20 rounded-2xl bg-white/[0.1] backdrop-blur-md border border-amber-500/30 flex flex-col items-center justify-center shadow-xl shadow-amber-500/10"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-display text-lg font-bold text-amber-400">75%</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Limit</span>
                </motion.div>

                {/* Card 3: Safe Bunk Status */}
                <motion.div
                  className="w-14 h-16 rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/15 flex flex-col items-center justify-center shadow-lg"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-display text-xs font-bold text-white">SAFE</span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400">Status</span>
                </motion.div>
              </div>

              {/* Gradient feather */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#07080b] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Source · Student Utility
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight mb-2">
                OhMyPoly
              </h3>
              <LuminousText
                className="text-xs sm:text-sm leading-relaxed mb-4 text-gray-600 dark:text-gray-400"
                text="A student attendance utility tracking scheduled lectures and calculating exact mathematical thresholds to safely miss lectures while staying strictly above 75%."
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['TypeScript', 'React', 'Tailwind', 'Vite'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/5 font-mono text-[11px] text-gray-700 dark:text-gray-300 border border-black/[0.06] dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.08] text-xs">
                <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">Live Production App</span>
                <a
                  href="https://github.com/anujugale5889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <span>Repo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 5: Buy or Wait? (Bottom Right) ── */}
        <div className="group relative rounded-[28px] overflow-hidden bg-white/75 dark:bg-[#0c0d12]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.09] hover:border-purple-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-xl hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] transition-all duration-300 flex flex-col justify-between">
          {/* Top Visual: Sleek Apple-style AI Agent Chassis Card */}
          <div className="p-3 sm:p-4 pb-0">
            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#07080b] border border-black/[0.06] dark:border-white/[0.08] shadow-inner flex items-center justify-center p-4">
              <div className="relative w-44 h-28 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 p-3 flex flex-col justify-between shadow-xl">
                {/* Header inside simulated device card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-bold">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span>AI</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    96.0% Solvency
                  </span>
                </div>

                {/* 90-Day Simulation Cash Flow Horizon Bars */}
                <div className="space-y-1 my-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full bg-purple-500/40 w-3/4" />
                    <span className="font-mono text-[8px] text-gray-500">Day 30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full bg-blue-500/40 w-5/6" />
                    <span className="font-mono text-[8px] text-gray-500">Day 60</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full bg-emerald-500/50 w-full" />
                    <span className="font-mono text-[8px] text-emerald-400">Day 90</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 pt-1 border-t border-white/5">
                  <span>Orchestrate AI</span>
                  <span className="text-purple-300">19.3ms</span>
                </div>
              </div>

              {/* Gradient feather */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#07080b] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-1">
                Limitless · Autonomous Agent
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight mb-2">
                Buy or Wait?
              </h3>
              <LuminousText
                className="text-xs sm:text-sm leading-relaxed mb-4 text-gray-600 dark:text-gray-400"
                text="A hybrid neuro-symbolic financial decision agent with deterministic 90-day cash flow simulation and zero arithmetic hallucination. Built for HackerRank Orchestrate."
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Python', 'Neuro-Symbolic', 'Cash Flow Sim'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/5 font-mono text-[11px] text-gray-700 dark:text-gray-300 border border-black/[0.06] dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/[0.08] dark:border-white/[0.08] text-xs">
                <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">HackerRank Orchestrate</span>
                <a
                  href="https://github.com/anujugale5889/buy-or-wait-financial-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <span>Repo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
