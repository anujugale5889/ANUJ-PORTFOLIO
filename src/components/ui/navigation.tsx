import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  ArrowRight, 
  X,
  Compass,
  Cpu,
  Wrench,
  FolderGit2,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  MapPin,
  Command,
  FileText,
  ArrowUpRight
} from 'lucide-react';

interface NavigationProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  showThemeToggle?: boolean;
  onOpenCmd?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  theme, 
  onToggleTheme,
  showThemeToggle = true,
  onOpenCmd
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('portfolio');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Map scroll positions to nav items in exact page order (bottom to top)
      const scrollPos = window.scrollY + 320;
      const contactEl = document.getElementById('contact');
      const journeyEl = document.getElementById('journey');
      const workEl = document.getElementById('work');
      const toolkitEl = document.getElementById('toolkit');
      const disciplinesEl = document.getElementById('disciplines');
      const statementEl = document.getElementById('statement');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (journeyEl && scrollPos >= journeyEl.offsetTop) {
        setActiveSection('journey');
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveSection('work');
      } else if (toolkitEl && scrollPos >= toolkitEl.offsetTop) {
        setActiveSection('toolkit');
      } else if (disciplinesEl && scrollPos >= disciplinesEl.offsetTop) {
        setActiveSection('disciplines');
      } else if (statementEl && scrollPos >= statementEl.offsetTop) {
        setActiveSection('statement');
      } else {
        setActiveSection('portfolio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (id === 'portfolio' || id === 'hero') {
      if (window.scrollY < 120) {
        const heroEl = document.getElementById('hero-hi') || document.getElementById('hero-main');
        if (heroEl) {
          const top = heroEl.getBoundingClientRect().top + window.pageYOffset - 30;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('portfolio');
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 30;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const NAV_LINKS = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'disciplines', label: 'OS' },
    { id: 'work', label: 'Projects' },
    { id: 'toolkit', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const DIRECTORY_ITEMS = [
    { id: 'portfolio', label: 'Portfolio Home', num: '01', icon: Compass },
    { id: 'disciplines', label: 'Portfolio OS Simulator', num: '02', icon: Cpu },
    { id: 'work', label: '5 Flagship Projects', num: '03', icon: FolderGit2 },
    { id: 'toolkit', label: 'Engineering Toolkit', num: '04', icon: Wrench },
    { id: 'journey', label: 'Experience & Milestones', num: '05', icon: Calendar },
    { id: 'contact', label: 'Direct Channels', num: '06', icon: MessageSquare }
  ];

  return (
    <>
      <header className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        {/* SPATIAL GLASS FLOATING CAPSULE NAVBAR (BOTTOM DOCK) */}
        <div 
          className={`pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5 h-11 sm:h-12 px-3.5 sm:px-4 md:px-5 rounded-full bg-[#05070d]/90 dark:bg-[#05070d]/92 backdrop-blur-2xl border border-white/10 dark:border-white/15 transition-all duration-300 w-max max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-[940px] ${
            scrolled 
              ? 'shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(14,165,233,0.2)] scale-[0.98]' 
              : 'shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(14,165,233,0.15)]'
          }`}
        >
          {/* TOP LASER SPECULAR BORDER & SUBTLE AMBIENT BLUE FLARE */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none" />
          <div className="absolute top-0 inset-x-16 h-[2px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent blur-[1px] pointer-events-none" />
          
          {/* LEFT SECTION: AVATAR BADGE + BRAND IDENTITY + MENU */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Circular Glass Token with Glowing Cyan Orbit */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollTo('portfolio'); }}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
              aria-label="Back to top"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] bg-gradient-to-b from-sky-400/80 via-blue-500/30 to-sky-400/20 shadow-[0_0_12px_rgba(56,189,248,0.45)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#070b14] flex items-center justify-center relative overflow-hidden border border-white/20">
                  {/* Subtle inner grid reflection */}
                  <div className="absolute inset-0 bg-radial from-sky-500/20 to-transparent opacity-60" />
                  
                  {/* Stylized 'A' with 4-point sparkle above */}
                  <div className="relative flex flex-col items-center justify-center">
                    <span className="text-[6px] text-cyan-300 -mb-0.5 leading-none">✦</span>
                    <span className="text-white font-extrabold text-[12px] sm:text-[13px] leading-tight tracking-tight drop-shadow-sm">
                      A
                    </span>
                  </div>
                </div>
              </div>

              {/* Brand Typography: anuj .co */}
              <div className="flex items-baseline gap-0.5 whitespace-nowrap shrink-0">
                <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  anuj
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-sky-400 font-bold">.co</span>
              </div>
            </a>

            {/* Menu Trigger Button (Grid Dots + Menu + Chevron) */}
            <div className="pl-0.5 sm:pl-1 shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/10 text-xs font-medium text-gray-200 hover:text-white transition-all cursor-pointer border border-transparent hover:border-white/10 whitespace-nowrap shrink-0"
                aria-label="Toggle navigation directory"
              >
                {/* 6-dot matrix icon (2 rows of 3 dots) */}
                <div className="grid grid-cols-3 gap-[2px] items-center shrink-0">
                  <span className="w-1 h-1 rounded-full bg-current opacity-85" />
                  <span className="w-1 h-1 rounded-full bg-current opacity-85" />
                  <span className="w-1 h-1 rounded-full bg-current opacity-85" />
                  <span className="w-1 h-1 rounded-full bg-current opacity-85" />
                  <span className="w-1 h-1 rounded-full bg-current opacity-85" />
                  <span className="w-1 h-1 rounded-full bg-current opacity-85" />
                </div>
                <span className="text-xs whitespace-nowrap">Menu</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* CENTER SECTION: NAVIGATION LINKS (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-3 sm:gap-3.5 lg:gap-4.5 text-xs font-medium text-gray-300 shrink-0">
            {NAV_LINKS.map(item => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 group whitespace-nowrap shrink-0 ${
                    isActive ? 'text-white font-semibold' : 'hover:text-white text-gray-400'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  
                  {/* Glowing Neon Blue Active Underline Capsule */}
                  {isActive ? (
                    <span className="absolute -bottom-1 inset-x-0 mx-auto w-5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 shadow-[0_0_8px_#38bdf8,0_0_12px_#0ea5e9]" />
                  ) : (
                    <span className="absolute -bottom-1 inset-x-0 mx-auto w-0 h-[2px] rounded-full bg-sky-400 opacity-0 group-hover:w-3 group-hover:opacity-75 transition-all duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT SECTION: FREELANCE STATUS & THEME & GET IN TOUCH CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0">
            {/* Glowing Blue Freelance Status Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-300 font-medium pr-1 shrink-0 whitespace-nowrap">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-sky-400 blur-[3px] opacity-90 animate-pulse" />
                <span className="relative size-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              </span>
              <span className="tracking-tight text-white/90 text-[11px] whitespace-nowrap">Open to freelance</span>
            </div>

            {/* ⌘K COMMAND PALETTE BUTTON */}
            {onOpenCmd && (
              <button
                onClick={onOpenCmd}
                title="Command Palette (⌘K)"
                aria-label="Open Command Palette"
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10 font-mono text-[10px] shrink-0 whitespace-nowrap"
              >
                <Command className="w-3 h-3 text-sky-400 shrink-0" />
                <span>K</span>
              </button>
            )}

            {/* THEME TOGGLE BUTTON (VISIBLY RESTORED) */}
            {showThemeToggle && (
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="flex p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10 shrink-0"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                )}
              </button>
            )}

            {/* Inset Spatial Glass Capsule CTA: "✦ Get in touch →" */}
            <button
              onClick={() => scrollTo('contact')}
              className="group relative flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 py-1.5 text-xs font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ml-0.5"
            >
              <span className="text-sky-400 text-xs group-hover:scale-110 transition-transform shrink-0">
                ✦
              </span>
              <span className="hidden sm:inline whitespace-nowrap">Get in touch</span>
              <span className="sm:hidden whitespace-nowrap">Contact</span>
              <ArrowRight className="w-3 h-3 text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>

        {/* EXPANDED INTERACTIVE NAVIGATION OVERLAY (Matching "MENU WAALA" Reference Screenshot) */}
        {isOpen && (
          <>
            {/* Backdrop for click-to-dismiss */}
            <div 
              className="pointer-events-auto fixed inset-0 bg-black/50 backdrop-blur-xs z-40 animate-in fade-in duration-200"
              onClick={() => setIsOpen(false)}
            />

            {/* Spatial Glass Directory Card (Opens Upwards Above Bottom Dock) */}
            <div className="pointer-events-auto absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 w-[94vw] max-w-[430px] max-h-[82vh] overflow-y-auto rounded-[28px] bg-[#060a15]/95 backdrop-blur-3xl border border-sky-400/40 shadow-[0_0_40px_rgba(14,165,233,0.35),0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] p-5 sm:p-6 z-50 animate-in fade-in zoom-in-95 duration-200 select-none">
              
              {/* Top Header: Title + Cyan Lightbar + Circular Close Button */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-mono text-xs sm:text-[13px] tracking-[0.22em] text-white font-semibold uppercase">
                    Navigation Directory
                  </h3>
                  {/* Glowing Cyan Lightbar */}
                  <div className="w-9 h-[2.5px] rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] mt-2" />
                </div>

                {/* Circular Glass Close Button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Navigation Items (01 About to 06 Contact) */}
              <div className="space-y-1.5">
                {[
                  { id: 'statement', label: 'About', num: '01', icon: Compass },
                  { id: 'disciplines', label: 'Portfolio OS', num: '02', icon: Cpu },
                  { id: 'toolkit', label: 'Skills & Stack', num: '03', icon: Wrench },
                  { id: 'work', label: 'Projects (5)', num: '04', icon: FolderGit2 },
                  { id: 'journey', label: 'Experience', num: '05', icon: Calendar },
                  { id: 'contact', label: 'Contact', num: '06', icon: MessageSquare }
                ].map(item => {
                  const Icon = item.icon;
                  // If on top/hero/statement, About is active
                  const isSelected = activeSection === item.id || (item.id === 'statement' && activeSection === 'portfolio');

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'border-2 border-amber-500/90 bg-gradient-to-r from-amber-500/25 via-amber-500/10 to-transparent shadow-[0_0_24px_rgba(245,158,11,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                          : 'border border-transparent hover:border-white/10 hover:bg-white/[0.06] text-gray-200'
                      }`}
                    >
                      {/* Left: Icon Badge + Label */}
                      <div className="flex items-center gap-3.5">
                        {isSelected ? (
                          // Active circular gold emblem
                          <div className="w-8 h-8 rounded-full border border-amber-400/80 bg-amber-400/15 flex items-center justify-center text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                            <Icon className="w-4 h-4 text-amber-300" />
                          </div>
                        ) : (
                          // Inactive clean icon
                          <div className="w-8 h-8 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-sky-300 group-hover:text-white transition-colors" />
                          </div>
                        )}
                        
                        <span className={`text-[15px] font-semibold tracking-tight ${
                          isSelected ? 'text-amber-200' : 'text-white'
                        }`}>
                          {item.label}
                        </span>
                      </div>

                      {/* Right: Index Number + Arrow > */}
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-semibold ${
                          isSelected ? 'text-amber-400/90' : 'text-sky-200/50'
                        }`}>
                          {item.num}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${
                          isSelected ? 'text-amber-400' : 'text-sky-200/40 group-hover:text-sky-300'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Resume Download Action */}
              <div className="mt-3.5 pt-3 border-t border-white/10">
                <a
                  href="/Anuj_Ugale_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-white/[0.04] to-transparent hover:from-amber-500/25 border border-amber-500/30 text-xs font-mono text-amber-200 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Curriculum Vitae (Resume)</span>
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-300/80">
                    <span>PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>

              {/* Bottom Footer: Location (Pune, IN) & Open for Q1/Q2 Badge */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                {/* Location */}
                <div className="flex items-center gap-1.5 font-mono text-sky-200/70 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Pune, IN · IST</span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-medium">
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  <span>Open for Q1/Q2</span>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
