import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { AmbientDualShader } from './ui/ambient-dual-shader';
import { Navigation } from './ui/navigation';
import { CosmicPortalHero } from './ui/cosmic-portal-hero';
import { MacOSDesktopSimulator } from './ui/macos-desktop-simulator';
import { ToolkitMarquee } from './ui/toolkit-marquee';
import { HardwareKeypad } from './ui/hardware-keypad';
import { BentoProjectsGrid } from './ui/bento-projects-grid';
import { WordReveal, CharReveal, FadeSlide, LuminousText } from './ui/text-animations';
import {
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  ArrowDown,
  ShieldCheck,
  Send,
  ArrowUp,
  Search,
  Command,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  FileText,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Float-in — scroll triggered, once
───────────────────────────────────────── */
const FloatIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
}> = ({ children, delay = 0, y = 36, className, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* Stagger container */
const StaggerGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  id?: string;
}> = ({ children, className, stagger = 0.09, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: stagger } }, hidden: {} }}
    >
      {children}
    </motion.div>
  );
};

const StaggerChild: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────
   GlassCard — High-End Apple/Vercel Glassmorphism
───────────────────────────────────────── */
const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => (
  <div
    style={style}
    className={`
      relative overflow-hidden
      bg-white/80 dark:bg-[#0c0e17]/70
      backdrop-blur-2xl
      border border-black/[0.08] dark:border-white/[0.12]
      hover:border-black/20 dark:hover:border-white/25
      shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.55)]
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)]
      transition-all duration-300
      ${className}
    `}
  >
    {/* Subtle top specular glass light highlight */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent pointer-events-none" />
    {children}
  </div>
);

/* ─────────────────────────────────────────
   Command Palette (⌘K)
───────────────────────────────────────── */
const COMMANDS = [
  { id: 'about', label: 'About Anuj', sub: 'Jump to about section', icon: '👋', section: 'statement' },
  { id: 'projects', label: 'Featured Projects', sub: '5 production builds', icon: '🚀', section: 'work' },
  { id: 'os', label: 'Portfolio OS', sub: 'Interactive desktop simulator', icon: '🖥️', section: 'disciplines' },
  { id: 'skills', label: 'Skills & Stack', sub: 'Tools I work with', icon: '⚡', section: 'toolkit' },
  { id: 'experience', label: 'Experience & Journey', sub: 'Milestones timeline', icon: '📅', section: 'journey' },
  { id: 'contact', label: 'Contact Me', sub: 'Let\'s build together', icon: '✉️', section: 'contact' },
  { id: 'github', label: 'Open GitHub', sub: 'github.com/anujugale5889', icon: '🐙', href: 'https://github.com/anujugale5889' },
  { id: 'linkedin', label: 'Open LinkedIn', sub: 'linkedin.com/in/aanujugale56', icon: '💼', href: 'https://linkedin.com/in/aanujugale56' },
];

const CommandPalette: React.FC<{ onClose: () => void; onScrollTo: (id: string) => void }> = ({ onClose, onScrollTo }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(
    c =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.sub.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setSelected(0); }, [query]);

  const execute = (cmd: typeof COMMANDS[0]) => {
    if (cmd.href) { window.open(cmd.href, '_blank'); }
    else if (cmd.section) { onScrollTo(cmd.section); }
    onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [filtered, selected]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />
      
      <motion.div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white/95 dark:bg-[#10121a]/98 border border-black/10 dark:border-white/15 shadow-[0_40px_100px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
        initial={{ scale: 0.95, y: -12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: -12, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/8 dark:border-white/8">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none font-medium"
          />
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px] font-mono text-gray-400">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">No results</div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => execute(cmd)}
                onMouseEnter={() => setSelected(i)}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                  selected === i
                    ? 'bg-amber-500/10 dark:bg-amber-500/10'
                    : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-lg leading-none">{cmd.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className={`block text-sm font-medium ${selected === i ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-white'}`}>
                    {cmd.label}
                  </span>
                  <span className="block text-xs text-gray-400 truncate">{cmd.sub}</span>
                </div>
                {cmd.href && <ExternalLink className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
                {selected === i && (
                  <kbd className="flex items-center px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono text-amber-600 dark:text-amber-400 shrink-0">
                    ↵
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-black/5 dark:border-white/5 flex items-center gap-3 text-[10px] font-mono text-gray-400">
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-black/5 dark:bg-white/10">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-black/5 dark:bg-white/10">↵</kbd> open</span>
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-black/5 dark:bg-white/10">esc</kbd> close</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Cursor glow follower (High-Performance GPU Lerp)
───────────────────────────────────────── */
const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number | null = null;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let isVisible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        glow.style.opacity = '1';
      }
    };

    const onLeave = () => {
      isVisible = false;
      glow.style.opacity = '0';
    };

    const tick = () => {
      if (isVisible) {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[1] dark:block hidden will-change-transform opacity-0 transition-opacity duration-300"
    >
      <div className="w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-[60px]" />
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
═══════════════════════════════════════ */
export const Portfolio: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [localTime, setLocalTime] = useState<string>('');
  const [formSent, setFormSent] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Centered "Hi" Screen In-View Transition (Fades in when in view, fades out on scroll past)
  const hiRef = useRef<HTMLDivElement>(null);
  const hiInView = useInView(hiRef, { once: false, margin: '-15%' });

  // Hero Main ("Anuj Ugale") scroll animation (consistent with standard in-view sections)
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: false, margin: '-70px' });

  const [scrolledPastPortal, setScrolledPastPortal] = useState(false);

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
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Theme synchronization with document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Live Pune, India (IST) clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('anuj.ugale5889@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const effectiveTheme = theme;

  return (
    <div className="relative min-h-screen w-full bg-[#f6f7fb] dark:bg-[#060709] text-[#0d0e11] dark:text-[#edeef2] antialiased selection:bg-amber-500 selection:text-white transition-colors duration-300 overflow-x-hidden">

      {/* Cursor glow */}
      <CursorGlow />

      {/* Command Palette */}
      <AnimatePresence>
        {cmdOpen && (
          <CommandPalette onClose={() => setCmdOpen(false)} onScrollTo={scrollTo} />
        )}
      </AnimatePresence>

      {/* WEBGL SHADER BACKGROUND */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 dark:opacity-65 transition-opacity duration-500">
        <AmbientDualShader theme={effectiveTheme} className="w-full h-full" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.018] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100,100,200,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,200,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <Navigation 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        showThemeToggle={true} 
        onOpenCmd={() => setCmdOpen(true)}
      />

      {/* ═══ 0. COSMIC ZERO-GRAVITY ENTRY ("MY PORTFOLIO") ═══ */}
      <CosmicPortalHero theme={theme} onEnter={() => scrollTo('hero-hi')} />

      {/* ═══ 0.5. CENTERED GREETING ("Hi") ═══ */}
      {/* Positioned between "MY PORTFOLIO" and "Anuj Ugale", centered on screen, fades in and out smoothly as user scrolls */}
      <section
        id="hero-hi"
        ref={hiRef}
        className="relative z-10 w-full min-h-[85vh] sm:min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden select-none"
      >
        {/* Soft Ambient Radial Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[700px] h-[360px] rounded-full bg-gradient-to-r from-sky-500/15 via-blue-600/20 to-cyan-400/15 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 28 }}
          animate={
            hiInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: -28 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center justify-center transform-gpu"
        >
          <h2 className="font-display text-6xl sm:text-7xl md:text-[110px] lg:text-[140px] font-black tracking-tight text-gray-950 dark:text-white leading-none inline-flex items-baseline justify-center drop-shadow-sm whitespace-nowrap">
            <span>Hi there</span>
            {/* Signature Electric Blue Glowing Period Dot */}
            <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-[4px] bg-[#1a68ff] shadow-[0_0_20px_#2563eb,0_0_40px_#3b82f6] ml-2 sm:ml-3.5 translate-y-[-2px]" />
          </h2>
        </motion.div>
      </section>

      {/* ═══ 1. HERO MAIN ("ANUJ UGALE") ═══ */}
      <motion.section
        id="hero-main"
        ref={heroRef}
        initial={{ opacity: 0, y: 28 }}
        animate={
          heroInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 28 }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-24 flex flex-col justify-center min-h-[85vh] transform-gpu"
      >
        <div className="max-w-4xl">
          {/* Large Name: Anuj Ugale. with Glowing Blue Period */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-extrabold tracking-tight text-gray-950 dark:text-white leading-[1.05]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Anuj
            </motion.span>
            <motion.span
              className="inline-flex items-baseline mt-2 sm:mt-4"
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Ugale
              {/* Electric Blue Glowing Period Dot */}
              <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] bg-[#1a68ff] shadow-[0_0_18px_#2563eb,0_0_35px_#3b82f6] ml-2 sm:ml-3 translate-y-[-2px]" />
            </motion.span>
          </h1>

          {/* Subtitle / Specialization */}
          <motion.div
            className="mt-5 sm:mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.28, duration: 0.6 }}
          >
            <LuminousText
              className="text-sm sm:text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
              text="AI Engineer · Computer Vision · Full-Stack Developer"
            />
          </motion.div>

          {/* Core Tagline: "Engineering AI into real products.|" with Amber Accent & Blinking Cursor */}
          <motion.div
            className="mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-gray-950 dark:text-white block leading-tight">
              Engineering AI
            </span>
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-amber-500 dark:text-amber-400 inline-flex items-baseline leading-tight">
              into real products.
              {/* Blinking Terminal Cursor */}
              <span className="inline-block w-[3px] h-8 sm:h-12 bg-sky-400 dark:bg-sky-300 ml-2 animate-pulse rounded-full" />
            </span>
          </motion.div>

          {/* Bio Description with Luminous Interactive Words */}
          <motion.div
            className="mt-6 sm:mt-8 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.48, duration: 0.6 }}
          >
            <LuminousText
              className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-sans mb-2"
              text="Student developer and AI builder at MIT-WPU, Pune."
            />
            <LuminousText
              className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-sans"
              text="I build intelligent systems, computer vision pipelines, and full-stack applications that solve real-world problems."
            />
          </motion.div>

          {/* The 3 Action Buttons */}
          <motion.div
            className="mt-8 sm:mt-12 flex flex-wrap items-center gap-3.5 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.58, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 1. Explore My Work -> */}
            <a
              href="#work"
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#1864ff] hover:bg-[#0051ff] text-white font-semibold text-sm sm:text-base shadow-[0_10px_28px_rgba(24,100,255,0.4)] hover:shadow-[0_14px_36px_rgba(24,100,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore My Work</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </a>

            {/* 2. GitHub */}
            <a
              href="https://github.com/anujugale5889"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/15 hover:border-black/20 dark:hover:border-white/30 text-gray-900 dark:text-white font-medium text-sm sm:text-base backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Github className="w-5 h-5 text-gray-900 dark:text-white" />
              <span>GitHub</span>
            </a>

            {/* 3. Resume -> */}
            <a
              href="/Anuj_Ugale_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/15 hover:border-black/20 dark:hover:border-white/30 text-gray-900 dark:text-white font-medium text-sm sm:text-base backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gray-700 dark:text-white/90" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-700 dark:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ 2. ABOUT ═══ */}
      <section id="statement" className="relative z-10 max-w-5xl mx-auto px-6 py-28 border-t border-black/8 dark:border-white/8">
        <FadeSlide>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-4">01 / About</span>
        </FadeSlide>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 dark:text-white leading-[1.15] mb-10">
          <WordReveal
            text="Bridging deep learning models with fast, intuitive user experiences."
            delay={0.05}
            stagger={0.045}
            duration={0.75}
          />
        </h2>

        <FadeSlide delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            <div className="md:col-span-7 space-y-4">
              <LuminousText 
                className="text-base text-gray-700 dark:text-gray-300"
                text="I'm Anuj Ugale, a Computer Engineering and AI student based in Pune. I build end-to-end applications — from training and fine-tuning models to crafting the responsive frontend interfaces that users interact with." 
              />
              <LuminousText 
                className="text-base text-gray-500 dark:text-gray-400"
                text="My recent projects span clinical retinal triage for diabetic retinopathy, facial biometrics for automated campus attendance, cybersecurity email threat scanners, and autonomous financial agents." 
              />
            </div>
            <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-black/8 dark:border-white/8 pt-4 md:pt-0 md:pl-8">
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Education & Grounding</p>
              <div className="space-y-1">
                <span className="font-display text-base font-bold text-gray-950 dark:text-white block">MIT World Peace University</span>
                <span className="text-sm text-amber-500 dark:text-amber-400 block font-medium">B.Tech Computer Engineering (AI & Data Science)</span>
                <LuminousText className="text-xs text-gray-400 dark:text-gray-500 font-mono" text="Class of 2026 · Pune, Maharashtra" />
              </div>
            </div>
          </div>
        </FadeSlide>
      </section>

      {/* ═══ 3. PORTFOLIO OS ═══ */}
      <section id="disciplines" className="relative z-10 max-w-5xl mx-auto px-6 py-28 border-t border-black/8 dark:border-white/8">
        <FloatIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">02 / Portfolio OS</span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 dark:text-white">
                Interactive Project Desktop
              </h2>
            </div>
            <LuminousText 
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm"
              text="A simulated desktop environment. Click any folder or dock app to explore files, inspect repositories, or run terminal commands."
            />
          </div>
        </FloatIn>
        <FloatIn delay={0.1}>
          <MacOSDesktopSimulator />
        </FloatIn>
      </section>

      {/* ═══ TOOLKIT MARQUEE ═══ */}
      <FloatIn id="toolkit">
        <ToolkitMarquee />
      </FloatIn>

      {/* ═══ 4. SELECTED WORK ═══ */}
      <section id="work" className="relative z-10 max-w-5xl mx-auto px-6 py-28 border-t border-black/8 dark:border-white/8">
        <FadeSlide>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">04 / Featured Projects</span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 dark:text-white">
                5 Projects built & deployed.
              </h2>
            </div>
            <LuminousText 
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm"
              text="Curated deep learning models, biometric trackers, and neuro-symbolic agents built for production."
            />
          </div>
        </FadeSlide>

        <FadeSlide delay={0.1}>
          <BentoProjectsGrid />
        </FadeSlide>
      </section>

      {/* ═══ 5. EXPERIENCE & MILESTONES ═══ */}
      <section id="journey" className="relative z-10 max-w-5xl mx-auto px-6 py-28 border-t border-black/8 dark:border-white/8">
        <FadeSlide>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-2">05 / Experience</span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 dark:text-white">
                Education & Milestones
              </h2>
            </div>
            <LuminousText 
              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xs" 
              text="Academic achievements, hackathon selections, and active engineering projects." 
            />
          </div>
        </FadeSlide>
        <StaggerGroup className="divide-y divide-black/8 dark:divide-white/8 border-y border-black/8 dark:border-white/8" stagger={0.1}>
          {[
            { period: '2026', entity: 'Smart India Hackathon', role: 'University Selection (RetiPath-AI)', detail: 'Engineered AI-assisted retinal screening and clinical triage system with PyTorch, Grad-CAM biomarker heatmaps, and doctor triage UI.' },
            { period: '2025', entity: 'Team Oscillon', role: 'Team Leader · Hackathons', detail: 'Led team planning and architectural solution proposals for the Smart India Hackathon 2026 internal university selection.' },
            { period: '2025', entity: 'NeuraFace Studio', role: 'Author & Creator', detail: 'Real-time college biometric attendance system with dense 468-point spatial facial landmarks and sub-5ms inference latency.' },
            { period: '2024 — Present', entity: 'MIT World Peace University', role: 'Diploma in AI & Data Science', detail: 'Second-year diploma student at MIT-WPU, Pune. First-year result: 7.56 CGPA. Specializing in computer vision and modern web development.' },
            { period: '2025 — 2026', entity: 'Certifications & Activities', role: 'Continuous Learning', detail: 'Cisco HTML Essentials (Nov 2025), Smart School FinTech Challenge (Aug 2026), Be10X, and student club coordination for IGNISIA/INCUBEX.' },
          ].map((item, idx) => (
            <StaggerChild key={idx}>
              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors px-2 rounded-xl">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-amber-500 dark:text-amber-400 font-bold block mb-1">{item.period}</span>
                  <span className="font-display text-base font-semibold text-gray-900 dark:text-white block">{item.entity}</span>
                </div>
                <div className="md:col-span-4">
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{item.role}</span>
                </div>
                <div className="md:col-span-5">
                  <LuminousText className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed" text={item.detail} />
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerGroup>
      </section>

      {/* ═══ 6. CONTACT ═══ */}
      <section id="contact" className="relative z-10 w-full py-28 border-t border-black/8 dark:border-white/8 overflow-hidden">

        <div className="max-w-5xl mx-auto px-6">
          <FadeSlide>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 dark:text-white mb-4">
              Let's build something great.
            </h2>
            <LuminousText 
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-12 font-medium leading-relaxed"
              text="Interested in collaborating, hiring for AI/full-stack roles, or discussing a project? Let's connect."
            />
          </FadeSlide>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-12 gap-5" stagger={0.09}>
            {/* Card 1: Availability */}
            <StaggerChild className="md:col-span-6">
              <GlassCard className="p-8 rounded-3xl flex flex-col justify-between h-full">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-wider mb-6">
                    <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-amber-500 opacity-75" /><span className="relative size-2 rounded-full bg-amber-500" /></span>
                    Open to freelance & internships
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-950 dark:text-white leading-none mb-4">
                    Let's build <br /><span className="text-amber-500">something great.</span>
                  </h3>
                </div>
                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block">Location</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">Pune, India (IST)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 dark:text-gray-500 block">Status</span>
                    <span className="text-xs font-mono text-emerald-500 font-semibold">Available for Work</span>
                  </div>
                </div>
              </GlassCard>
            </StaggerChild>

            {/* Card 2: Hardware Keypad */}
            <StaggerChild className="md:col-span-6">
              <GlassCard className="p-6 rounded-3xl flex flex-col justify-between h-full">
                <div className="mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-semibold block mb-1">Tactile Shortcuts</span>
                  <LuminousText className="text-xs text-gray-500 dark:text-gray-400" text="Interactive mechanical console keys. Click or press keys to trigger links." />
                </div>
                <HardwareKeypad onCopyEmail={copyEmail} />
              </GlassCard>
            </StaggerChild>

            {/* Card 3: Social links */}
            <StaggerChild className="md:col-span-5">
              <GlassCard className="p-7 rounded-3xl flex flex-col justify-between h-full gap-4">
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Direct Channels</span>
                <div className="space-y-3">
                  {/* Email */}
                  <button onClick={copyEmail} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-amber-500/8 dark:hover:bg-amber-500/10 border border-transparent hover:border-amber-400/20 transition-all group cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block text-xs font-semibold text-gray-900 dark:text-white">Email</span>
                      <span className="block text-[11px] font-mono text-gray-400 truncate">anuj.ugale5889@gmail.com</span>
                    </div>
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <Copy className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-amber-500 transition-colors shrink-0" />}
                  </button>

                  {/* GitHub */}
                  <a href="https://github.com/anujugale5889" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-gray-900/10 dark:bg-white/10 flex items-center justify-center">
                      <Github className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block text-xs font-semibold text-gray-900 dark:text-white">GitHub</span>
                      <span className="block text-[11px] font-mono text-gray-400">@anujugale5889</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-white transition-colors shrink-0" />
                  </a>

                  {/* LinkedIn */}
                  <a href="https://linkedin.com/in/aanujugale56" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-blue-500/8 dark:hover:bg-blue-500/10 border border-transparent hover:border-blue-400/20 transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block text-xs font-semibold text-gray-900 dark:text-white">LinkedIn</span>
                      <span className="block text-[11px] font-mono text-gray-400">aanujugale56</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors shrink-0" />
                  </a>

                  {/* Resume PDF */}
                  <a href="/Anuj_Ugale_Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-emerald-500/8 dark:hover:bg-emerald-500/10 border border-transparent hover:border-emerald-400/20 transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="block text-xs font-semibold text-gray-900 dark:text-white">Curriculum Vitae</span>
                      <span className="block text-[11px] font-mono text-gray-400">Anuj_Ugale_Resume.pdf</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors shrink-0" />
                  </a>
                </div>
              </GlassCard>
            </StaggerChild>

            {/* Card 4: Form */}
            <StaggerChild className="md:col-span-7">
              <GlassCard className="p-7 rounded-3xl h-full">
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-4">Send a quick message</span>
                {formSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 font-mono text-xs space-y-1"
                  >
                    <p className="font-bold">✓ Message dispatched!</p>
                    <p className="text-gray-500 dark:text-gray-400">Thank you for reaching out. Anuj will get back to your email directly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-4 text-xs font-mono">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" required placeholder="Your name" className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-amber-500 transition-colors" />
                      <input type="email" required placeholder="Your email" className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-amber-500 transition-colors" />
                    </div>
                    <textarea required rows={3} placeholder="Tell me about your project or opportunity..." className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none focus:border-amber-500 transition-colors resize-none" />
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-950 dark:bg-white text-white dark:text-black font-semibold text-xs hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all cursor-pointer">
                      <span>Send message</span><Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </GlassCard>
            </StaggerChild>
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ 7. FOOTER ═══ */}
      <footer className="relative z-10 w-full border-t border-black/8 dark:border-white/8 bg-black/[0.015] dark:bg-white/[0.008] pt-16 pb-32 sm:pb-40">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="font-display text-5xl sm:text-7xl font-extrabold tracking-tighter text-gray-950 dark:text-white block mb-4">
              Anuj<span className="text-amber-500 text-3xl font-mono">©</span>
            </span>
            <LuminousText className="text-xs text-gray-400 dark:text-gray-500 font-mono" text="Designed & engineered with React, TypeScript, and Tailwind CSS." />
          </div>
          <div className="flex flex-col md:items-end gap-3 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <a href="https://github.com/anujugale5889" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/aanujugale56" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">LinkedIn</a>
              <button onClick={copyEmail} className="hover:text-amber-500 transition-colors cursor-pointer">Email</button>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-gray-400 dark:text-gray-500">© 2026 Code by Anuj Ugale · Pune, IN</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <button onClick={() => setCmdOpen(true)} className="flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-amber-500 transition-colors cursor-pointer">
                <Command className="w-2.5 h-2.5" /><span>K</span>
              </button>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-amber-500 transition-colors cursor-pointer pt-2">
              <span>Back to top</span><ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
