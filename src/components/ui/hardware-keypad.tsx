import React, { useState } from 'react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Briefcase, 
  User, 
  Code,
  ArrowUp
} from 'lucide-react';

interface KeypadProps {
  onCopyEmail: () => void;
}

interface KeyConfig {
  id: string;
  slot: string;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  gradient: string;
  shadowColor: string;
  hoverShadowColor: string;
  action: () => void;
}

// Shared singleton AudioContext to prevent audio thread exhaustion and browser limits
let sharedAudioCtx: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
};

export const HardwareKeypad: React.FC<KeypadProps> = ({ onCopyEmail }) => {
  const [screenText, setScreenText] = useState("Have something worth shipping? Press a key_");
  const [slot, setSlot] = useState("P0");
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Synthesized mechanical switch click sound (clean, tactile, Cherry-style click)
  const playMechanicalClick = (type: 'hover' | 'press' | 'release' | 'knob' = 'hover') => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'hover') {
        // Subtle tactile pre-travel bump sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.025);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.025);
      } else if (type === 'press') {
        // Deep mechanical switch bottom-out "thock"
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.045);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.045);
      } else if (type === 'knob') {
        // Rotary encoder detent click
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
      }
    } catch {
      // Audio muted or not yet allowed by user gesture
    }
  };

  const handleKeyHover = (label: string, slotCode: string) => {
    playMechanicalClick('hover');
    setSlot(slotCode);
    setScreenText(`READY: [${label}] -> PRESS TO TRIGGER`);
  };

  const handleKeyLeave = () => {
    setSlot("P0");
    setScreenText("Have something worth shipping? Press a key_");
  };

  const handleKeyPress = (keyId: string, label: string, action: () => void) => {
    playMechanicalClick('press');
    setActiveKey(keyId);
    setSlot(keyId.toUpperCase().slice(0, 2));
    setScreenText(`TRIGGER: [${label}] -> EXECUTING ACTION...`);
    
    setTimeout(() => {
      action();
      setActiveKey(null);
    }, 180);
  };

  const scrollToTop = () => {
    playMechanicalClick('knob');
    setScreenText("COMMAND: RETURN TO TOP ↑");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const keys: KeyConfig[] = [
    {
      id: 'lk',
      slot: 'LK',
      label: 'LINKEDIN',
      subLabel: 'LinkedIn',
      icon: Linkedin,
      gradient: 'linear-gradient(180deg, #0a66c2 0%, #004d99 100%)',
      shadowColor: '#003366',
      hoverShadowColor: '#002244',
      action: () => window.open('https://linkedin.com/in/aanujugale56', '_blank')
    },
    {
      id: 'gh',
      slot: 'GH',
      label: 'GITHUB',
      subLabel: 'GitHub',
      icon: Github,
      gradient: 'linear-gradient(180deg, #282e38 0%, #171b22 100%)',
      shadowColor: '#0d1015',
      hoverShadowColor: '#080a0d',
      action: () => window.open('https://github.com/anujugale5889', '_blank')
    },
    {
      id: 'ml',
      slot: 'ML',
      label: 'COPY EMAIL',
      subLabel: 'Email',
      icon: Mail,
      gradient: 'linear-gradient(180deg, #e11d48 0%, #be123c 100%)',
      shadowColor: '#881337',
      hoverShadowColor: '#4c0519',
      action: onCopyEmail
    },
    {
      id: 'wk',
      slot: 'WK',
      label: 'PROJECTS',
      subLabel: 'Projects',
      icon: Briefcase,
      gradient: 'linear-gradient(180deg, #059669 0%, #047857 100%)',
      shadowColor: '#064e3b',
      hoverShadowColor: '#022c22',
      action: () => {
        const el = document.getElementById('work');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'dc',
      slot: 'DC',
      label: 'SYSTEMS',
      subLabel: 'Systems',
      icon: Code,
      gradient: 'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
      shadowColor: '#7c2d12',
      hoverShadowColor: '#431407',
      action: () => {
        const el = document.getElementById('disciplines');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'ab',
      slot: 'AB',
      label: 'ABOUT',
      subLabel: 'About',
      icon: User,
      gradient: 'linear-gradient(180deg, #7c3aed 0%, #6d28d9 100%)',
      shadowColor: '#4c1d95',
      hoverShadowColor: '#2e1065',
      action: () => {
        const el = document.getElementById('statement');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto select-none font-mono">
      {/* 3D MECHANICAL HARDWARE CHASSIS */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#242732] via-[#1c1e27] to-[#12141a] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.22)] border border-white/10">
        
        {/* TOP STATUS BAR: RETRO LCD SCREEN & CONTROL KNOB */}
        <div className="flex items-center gap-3 mb-4">
          {/* Retro Matrix LCD Screen */}
          <div className="flex-1 rounded-xl bg-[#090e0b] p-3 border border-emerald-500/30 shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-emerald-500/70 pb-1 border-b border-emerald-500/20 mb-1.5 font-bold uppercase tracking-wider">
              <span>SYS_TELEMETRY</span>
              <span className="text-amber-400 font-mono">{slot}</span>
            </div>
            
            <p className="text-emerald-400 text-xs font-mono font-medium leading-relaxed min-h-[34px] flex items-center">
              <span>{screenText}</span>
              <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-pulse" />
            </p>
          </div>

          {/* Rotary Knob / Back-to-Top Button with recessed socket & down-depression */}
          <div className="p-1 rounded-full bg-[#0d0f14] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.06)] border border-black/40">
            <button
              onClick={scrollToTop}
              title="Scroll to Top"
              className="w-11 h-11 rounded-full bg-gradient-to-b from-[#3a3e4d] to-[#1e212a] flex items-center justify-center text-white/75 hover:text-white transition-all duration-150 cursor-pointer group shadow-[0_5px_0_#12141b,0_8px_14px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:translate-y-[2.5px] hover:shadow-[0_2.5px_0_#12141b,0_4px_8px_rgba(0,0,0,0.4)] active:translate-y-[5px] active:shadow-[0_0px_0_#12141b,inset_0_2px_4px_rgba(0,0,0,0.5)]"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3x3 MECHANICAL KEYPAD MATRIX */}
        {/* Each keycap is housed inside a recessed switch well and depresses downward like an authentic mechanical keyboard switch */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {keys.map((k) => {
            const isPressed = activeKey === k.id;
            const Icon = k.icon;

            return (
              <div 
                key={k.id}
                className="relative rounded-2xl bg-[#0d0f15] p-1 shadow-[inset_0_4px_8px_rgba(0,0,0,0.85),0_1px_0_rgba(255,255,255,0.05)] border border-black/50"
              >
                <button
                  id={`key-${k.id}`}
                  onClick={() => handleKeyPress(k.id, k.label, k.action)}
                  onMouseEnter={() => handleKeyHover(k.label, k.slot)}
                  onMouseLeave={handleKeyLeave}
                  className={`group relative w-full h-16 rounded-xl flex flex-col items-center justify-center cursor-pointer transform-gpu transition-all duration-100 ease-out select-none ${
                    isPressed
                      ? 'translate-y-[7px] is-pressed'
                      : 'translate-y-0 hover:translate-y-[4.5px] active:translate-y-[7px]'
                  }`}
                  style={{
                    background: k.gradient
                  }}
                >
                  {/* Top specular edge highlight */}
                  <div className="absolute inset-x-2 top-0.5 h-px bg-white/45 pointer-events-none rounded-full" />
                  
                  {/* Keycap dished face highlight */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity" />

                  {/* Key Icon */}
                  <Icon className="w-5 h-5 text-white drop-shadow-sm transition-transform duration-100 group-hover:scale-105 relative z-10" />
                  
                  {/* Keycap Sublabel */}
                  <span className="text-[9px] font-bold tracking-wider text-white/95 uppercase mt-1 relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                    {k.subLabel}
                  </span>
                </button>

                {/* Inline CSS styling helper to guarantee exact mechanical travel shadow states */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    #key-${k.id} {
                      box-shadow: 0 7px 0 ${k.shadowColor}, 0 12px 18px rgba(0,0,0,0.5);
                    }
                    #key-${k.id}:hover {
                      box-shadow: 0 2.5px 0 ${k.shadowColor}, 0 5px 8px rgba(0,0,0,0.35);
                    }
                    #key-${k.id}:active,
                    #key-${k.id}.is-pressed {
                      box-shadow: 0 0px 0 ${k.shadowColor}, inset 0 3px 6px rgba(0,0,0,0.6) !important;
                    }
                  `
                }} />
              </div>
            );
          })}
        </div>

        {/* Chassis Footprint Badge */}
        <div className="mt-3.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30">
          <span>MODEL: UGALE-PAD-01</span>
          <span className="text-emerald-400/80 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
};
