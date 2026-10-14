import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  Terminal as TerminalIcon, 
  FileText, 
  Award, 
  X, 
  Minus, 
  Maximize2, 
  Search, 
  Wifi, 
  BatteryCharging, 
  SlidersHorizontal,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Calculator,
  TrendingUp,
  ScanFace,
  Eye,
  ShieldAlert,
  ArrowRight,
  Globe,
  RotateCw,
  Star,
  GitFork,
  Code2,
  Send,
  HelpCircle,
  Check
} from 'lucide-react';

interface WindowContent {
  id: string;
  title: string;
  type: 'folder' | 'file' | 'terminal' | 'github' | 'linkedin' | 'mail';
  items?: {
    name: string;
    type: 'app' | 'code' | 'doc' | 'data';
    size: string;
    desc: string;
    badge?: string;
    link?: string;
  }[];
  markdown?: string;
  url?: string;
}

const FOLDER_DATA: Record<string, WindowContent> = {
  'retipath': {
    id: 'retipath',
    title: 'RetiPath-AI (Ophthalmology Triage)',
    type: 'folder',
    items: [
      {
        name: 'RetiPath-AI.app',
        type: 'app',
        size: '142 MB',
        desc: 'Diabetic Retinopathy Clinical Triage System with Grad-CAM Explainability',
        badge: 'SIH 2026 Selection',
        link: 'https://github.com/anujugale5889'
      },
      {
        name: 'Biomarker_Segmentation.py',
        type: 'code',
        size: '24 KB',
        desc: 'Automated microaneurysm, exudate and haemorrhage spatial mapping',
        badge: 'PyTorch / OpenCV'
      },
      {
        name: 'Clinical_Inference_API.py',
        type: 'code',
        size: '18 KB',
        desc: 'FastAPI async microservice returning sub-50ms diagnostic inferences',
        badge: 'FastAPI'
      }
    ]
  },
  'neuralface': {
    id: 'neuralface',
    title: 'Neural Face (Campus Attendance Biometrics)',
    type: 'folder',
    items: [
      {
        name: 'NeuralFaceStudio.app',
        type: 'app',
        size: '98 MB',
        desc: 'College facial recognition biometric attendance system with 468 landmarks',
        badge: 'College Project',
        link: 'https://github.com/anujugale5889'
      },
      {
        name: 'Spatial_HeadPose.py',
        type: 'code',
        size: '31 KB',
        desc: '3D yaw, pitch and roll telemetry with spatial landmark projection',
        badge: 'MediaPipe / Math'
      },
      {
        name: 'Vector_Distance_512.py',
        type: 'code',
        size: '15 KB',
        desc: 'Cosine distance biometric verification with sub-5ms inference',
        badge: 'OpenCV'
      }
    ]
  },
  'email-guard': {
    id: 'email-guard',
    title: 'Email Guard (Spam & Phishing Detector)',
    type: 'folder',
    items: [
      {
        name: 'EmailGuard_Engine.app',
        type: 'app',
        size: '38 MB',
        desc: 'AI detector distinguishing legitimate communications from phishing scams',
        badge: 'Cybersecurity Threat Engine',
        link: 'https://github.com/anujugale5889'
      },
      {
        name: 'Phishing_Heuristics_NLP.py',
        type: 'code',
        size: '19 KB',
        desc: 'Urgency psychological trigger detection and deceptive link classification',
        badge: 'NLP Classifier'
      }
    ]
  },
  'ohmypoly': {
    id: 'ohmypoly',
    title: 'OhMyPoly (Attendance & Bunk Calculator)',
    type: 'folder',
    items: [
      {
        name: 'OhMyPoly_PWA.app',
        type: 'app',
        size: '52 MB',
        desc: 'College attendance tracking and smart bunking calculator for students',
        badge: 'Full-Stack Web',
        link: 'https://github.com/anujugale5889'
      },
      {
        name: 'Bunk_Planner_Algorithm.ts',
        type: 'code',
        size: '12 KB',
        desc: 'Calculates safe bunk allowance (e.g. 92% -> 11 bunks) or recovery sessions',
        badge: 'Math Engine'
      }
    ]
  },
  'buyorwait': {
    id: 'buyorwait',
    title: 'Buy or Wait (Finance AI Agent)',
    type: 'folder',
    items: [
      {
        name: 'BuyOrWait_Agent.app',
        type: 'app',
        size: '64 MB',
        desc: 'Autonomous agent analyzing market price floors, deals, and optimal entry timing',
        badge: 'HackerRank AI Hackathon',
        link: 'https://github.com/anujugale5889/buy-or-wait-financial-agent'
      },
      {
        name: 'Cash_Flow_Forecaster.py',
        type: 'code',
        size: '22 KB',
        desc: 'Deterministic discrete-event simulator over 90-day liquidity buffer horizon',
        badge: 'Neuro-Symbolic'
      }
    ]
  },
  'experience': {
    id: 'experience',
    title: 'Experience.md',
    type: 'file',
    markdown: `
# Anuj Ugale — Professional & Academic Chronicle

### Current Status
* **Student Developer & AI Researcher** at MIT World Peace University (MIT-WPU), Pune
* **Focus Areas**: Machine Learning, Computer Vision, Agentic Workflows, Full-Stack Web
* **Class of 2026**

### Core Flagship Systems
1. **RetiPath-AI (Ophthalmology Diagnostic System)**
   * Smart India Hackathon (SIH 2026) University Selection
   * Biomarker segmentation (microaneurysms, exudates) & Grad-CAM explainability heatmaps

2. **Neural Face (College Attendance Biometrics)**
   * Facial recognition attendance system with 468-point spatial facial landmark mesh

3. **Email Guard (Phishing & Spam Detector)**
   * NLP-driven threat scanner for deceptive emails and credential-harvesting links

4. **OhMyPoly (Attendance & Bunk Planner)**
   * Smart attendance threshold tracker and bunk allowance calculator for polytechnic students

5. **Buy or Wait? (Finance Agent)**
   * Autonomous AI financial intelligence agent with zero arithmetic hallucination
`
  },
  'github': {
    id: 'github',
    title: 'GitHub — @anujugale5889',
    type: 'github',
    url: 'https://github.com/anujugale5889'
  },
  'linkedin': {
    id: 'linkedin',
    title: 'LinkedIn — Anuj Ugale',
    type: 'linkedin',
    url: 'https://linkedin.com/in/aanujugale56'
  },
  'mail': {
    id: 'mail',
    title: 'Mail — anuj.ugale5889@gmail.com',
    type: 'mail'
  }
};

export const MacOSDesktopSimulator: React.FC = () => {
  const [activeWindow, setActiveWindow] = useState<WindowContent | null>(null);
  const [activeTab, setActiveTab] = useState<'desktop' | 'terminal'>('desktop');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [mailSent, setMailSent] = useState(false);
  
  // Terminal commands state
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string | React.ReactNode }>>([
    { cmd: 'whoami', out: 'anuj_ugale — AI Engineer & Full-Stack Developer (MIT-WPU Pune, IN)' },
    { cmd: 'projects', out: '1. RetiPath-AI  2. Neural Face  3. Email Guard  4. OhMyPoly  5. Buy or Wait?' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmdToRun?: string) => {
    const command = (cmdToRun || terminalInput).trim().toLowerCase();
    if (!command) return;

    let output: string | React.ReactNode = '';
    switch (command) {
      case 'help':
        output = 'Available commands: whoami, projects, bunk, neuralface, emailguard, buyorwait, skills, contact, clear';
        break;
      case 'whoami':
        output = 'Anuj Ugale · AI Engineer & Web Developer · MIT-WPU Pune (Class of 2026)';
        break;
      case 'projects':
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-amber-400 font-bold">5 ACTIVE FLAGSHIP PROJECTS:</p>
            <p>1. <strong className="text-blue-400">RetiPath-AI</strong> — Diabetic Retinopathy Diagnostic AI (SIH 2026)</p>
            <p>2. <strong className="text-cyan-400">Neural Face</strong> — College biometric attendance with 468 facial landmarks</p>
            <p>3. <strong className="text-emerald-400">Email Guard</strong> — AI-driven spam & phishing detector</p>
            <p>4. <strong className="text-amber-400">OhMyPoly</strong> — Student attendance & smart bunk calculator</p>
            <p>5. <strong className="text-purple-400">Buy or Wait?</strong> — Autonomous financial deal timing agent</p>
          </div>
        );
        break;
      case 'bunk':
        output = 'OhMyPoly Engine: Total 50 lectures, 46 attended (92%). Verdict: Safe to bunk 11 lectures while staying strictly above 75%! 🏖️';
        break;
      case 'neuralface':
        output = 'Neural Face Engine: 468 facial landmark mesh synced. 512-dim cosine distance match verified in 4.2ms [ACCESS GRANTED ✅]';
        break;
      case 'emailguard':
        output = 'Email Guard Test: "Urgent: Verify banking credential" -> Threat Score 98.4% [PHISHING DETECTED 🚨]';
        break;
      case 'buyorwait':
        output = 'Buy or Wait Agent: Target [RTX 5090] -> Discrete-Event Verdict: WAIT (Predicted 12% price correction in 3 weeks)! 🟡';
        break;
      case 'skills':
        output = 'Python, PyTorch, OpenCV, MediaPipe, React 19, TypeScript, Next.js, FastAPI, Docker, Tailwind CSS';
        break;
      case 'contact':
        output = 'Email: anuj.ugale5889@gmail.com | GitHub: github.com/anujugale5889 | LinkedIn: linkedin.com/in/aanujugale56';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `command not found: ${command}. Type 'help' for available commands.`;
    }

    setTerminalHistory(prev => [...prev, { cmd: command, out: output }]);
    setTerminalInput('');
  };

  const openWindow = (key: string) => {
    setActiveTab('desktop');
    setActiveWindow(FOLDER_DATA[key]);
    setActiveMenu(null);
  };

  const sendMailAction = (e: React.FormEvent) => {
    e.preventDefault();
    setMailSent(true);
    setTimeout(() => {
      window.location.href = `mailto:anuj.ugale5889@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      setMailSent(false);
    }, 400);
  };

  return (
    <div className="w-full select-none" onClick={() => setActiveMenu(null)}>
      {/* IPAD HARDWARE FRAME (Sleek Apple Space Gray Aluminum Bezel) */}
      <div className="relative mx-auto max-w-5xl rounded-[30px] sm:rounded-[38px] bg-[#14151c] p-3 sm:p-4 shadow-[0_32px_100px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5">
        
        {/* Landscape iPad Top Camera & Sensor Array */}
        <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-40 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#050608] border border-white/15 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#1b2238] shadow-[0_0_2px_#38bdf8]" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#07080c] opacity-60" />
        </div>

        {/* SCREEN DISPLAY */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9.6] w-full rounded-[20px] sm:rounded-[26px] overflow-hidden bg-[#07080d] border border-white/10 shadow-inner">
          
          {/* Minimalist Matte Blackout Wallpaper */}
          <div className="absolute inset-0 bg-[#050608] pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent pointer-events-none" />

          {/* 1. TOP MACOS / IPADOS MENU BAR */}
          <div className="relative z-40 h-7 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 px-3 sm:px-4 flex items-center justify-between text-white/90 text-[11px] sm:text-xs font-medium">
            {/* Left Menu Items with Working Dropdowns */}
            <div className="flex items-center gap-3 sm:gap-4 relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer text-white"
                aria-label="Portfolio OS menu"
              >
                <span className="text-xs font-sans"></span>
                <span className="font-bold text-white tracking-tight text-[11px] sm:text-xs font-display">Finder</span>
              </button>

              {/* Apple / Finder Menu Dropdown */}
              {activeMenu === 'apple' && (
                <div className="absolute top-7 left-0 w-52 bg-[#161822]/95 backdrop-blur-2xl rounded-xl border border-white/15 shadow-2xl p-1 z-50 text-xs text-white/90">
                  <div className="px-3 py-1.5 text-white/40 text-[10px] font-mono">Portfolio OS v2.0 · Anuj Ugale</div>
                  <button 
                    onClick={() => { setActiveTab('terminal'); setActiveMenu(null); }}
                    className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    Open Terminal Console
                  </button>
                  <button 
                    onClick={() => { openWindow('experience'); setActiveMenu(null); }}
                    className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    About Anuj Ugale
                  </button>
                  <div className="h-px bg-white/10 my-1" />
                  <button 
                    onClick={() => { openWindow('github'); setActiveMenu(null); }}
                    className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    Open GitHub App...
                  </button>
                  <button 
                    onClick={() => { openWindow('linkedin'); setActiveMenu(null); }}
                    className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    Open LinkedIn App...
                  </button>
                </div>
              )}

              {/* Window Title or Current App */}
              <span className="font-semibold text-white/80 hidden sm:inline">
                {activeTab === 'terminal' ? 'Terminal' : activeWindow ? activeWindow.title : 'Workspace'}
              </span>

              {/* File Menu */}
              <button 
                onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
                className="hidden sm:inline text-white/70 hover:text-white cursor-pointer"
              >
                File
              </button>
              {activeMenu === 'file' && (
                <div className="absolute top-7 left-14 w-44 bg-[#161822]/95 backdrop-blur-2xl rounded-xl border border-white/15 shadow-2xl p-1 z-50 text-xs text-white/90">
                  <button onClick={() => { openWindow('retipath'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white">RetiPath-AI</button>
                  <button onClick={() => { openWindow('neuralface'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white">Neural Face</button>
                  <button onClick={() => { openWindow('buyorwait'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white">Buy or Wait?</button>
                  <div className="h-px bg-white/10 my-1" />
                  <button onClick={() => { setActiveWindow(null); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white">Close Window</button>
                </div>
              )}

              {/* Window Menu */}
              <button 
                onClick={() => setActiveMenu(activeMenu === 'window' ? null : 'window')}
                className="hidden md:inline text-white/70 hover:text-white cursor-pointer"
              >
                Window
              </button>
              {activeMenu === 'window' && (
                <div className="absolute top-7 left-28 w-44 bg-[#161822]/95 backdrop-blur-2xl rounded-xl border border-white/15 shadow-2xl p-1 z-50 text-xs text-white/90">
                  <button onClick={() => { setActiveTab('terminal'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white">Terminal</button>
                  <button onClick={() => { setActiveTab('desktop'); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-sky-500 hover:text-white">Desktop Canvas</button>
                  <button onClick={() => { setActiveWindow(null); setActiveMenu(null); }} className="w-full text-left px-3 py-1.5 rounded-md hover:bg-rose-500 hover:text-white">Minimize All</button>
                </div>
              )}

              {/* Help Menu */}
              <button 
                onClick={() => setActiveMenu(activeMenu === 'help' ? null : 'help')}
                className="hidden md:inline text-white/70 hover:text-white cursor-pointer"
              >
                Help
              </button>
              {activeMenu === 'help' && (
                <div className="absolute top-7 left-40 w-52 bg-[#161822]/95 backdrop-blur-2xl rounded-xl border border-white/15 shadow-2xl p-2 z-50 text-xs text-white/90 space-y-1">
                  <div className="font-semibold text-sky-400 pb-1 border-b border-white/10">Terminal Commands:</div>
                  <div className="font-mono text-[11px] text-white/70">whoami, projects, bunk, neuralface, emailguard, buyorwait, skills</div>
                </div>
              )}
            </div>

            {/* Right Telemetry */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-white/80">
              <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <BatteryCharging className="w-3.5 h-3.5" />
                <span>100%</span>
              </span>
              <Wifi className="w-3.5 h-3.5" />
              <Search className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setActiveTab('terminal')} />
              <span className="font-mono text-[11px] text-white font-medium pl-1">
                {currentTime || '8:00 PM'}
              </span>
            </div>
          </div>

          {/* 2. DESKTOP WORKSPACE */}
          <div className="relative h-[calc(100%-28px)] w-full p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
            
            {/* Desktop Folder Grid: Anuj's 5 Exact Projects + GitHub + LinkedIn */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-4 z-10 w-fit">
              {[
                { id: 'retipath', label: 'RetiPath-AI', icon: Eye, color: 'from-blue-500 to-indigo-600' },
                { id: 'neuralface', label: 'Neural Face', icon: ScanFace, color: 'from-cyan-500 to-blue-600' },
                { id: 'email-guard', label: 'Email Guard', icon: ShieldAlert, color: 'from-emerald-500 to-teal-700' },
                { id: 'ohmypoly', label: 'OhMyPoly', icon: Calculator, color: 'from-amber-500 to-orange-600' },
                { id: 'buyorwait', label: 'Buy or Wait', icon: TrendingUp, color: 'from-purple-500 to-indigo-700' },
                { id: 'github', label: 'GitHub.app', icon: Github, color: 'from-gray-700 to-black' },
                { id: 'linkedin', label: 'LinkedIn.app', icon: Linkedin, color: 'from-blue-600 to-blue-800' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => openWindow(item.id)}
                    className="group flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer text-center w-18 sm:w-22"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform"
                      style={{
                        background: item.id === 'retipath' 
                          ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                          : item.id === 'neuralface'
                          ? 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)'
                          : item.id === 'email-guard'
                          ? 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
                          : item.id === 'ohmypoly'
                          ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                          : item.id === 'buyorwait'
                          ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
                          : item.id === 'github'
                          ? 'linear-gradient(135deg, #374151 0%, #111827 100%)'
                          : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                      }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white text-shadow drop-shadow-md truncate w-full group-hover:text-amber-300 transition-colors">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3. INTERACTIVE IN-WINDOW APP VIEWS */}
            {activeWindow && (
              <div className="absolute inset-2 sm:inset-6 z-30 rounded-2xl bg-[#11131c]/95 backdrop-blur-2xl border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Window Header */}
                <div className="h-9 px-3.5 bg-[#171a25]/90 border-b border-white/10 flex items-center justify-between text-white">
                  {/* Traffic Light Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setActiveWindow(null)}
                      className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center text-black/60 group cursor-pointer"
                      title="Close Window"
                    >
                      <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button 
                      onClick={() => setActiveWindow(null)}
                      className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center text-black/60 group cursor-pointer"
                      title="Minimize"
                    >
                      <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button 
                      className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center text-black/60 group cursor-pointer"
                      title="Zoom"
                    >
                      <Maximize2 className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100" />
                    </button>
                  </div>

                  {/* Window Title / Browser Search Bar */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 border border-white/10 text-[11px] font-mono text-gray-300 max-w-sm truncate">
                    <Globe className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">{activeWindow.url || `macOS://apps/${activeWindow.id}`}</span>
                  </div>

                  {/* External Launch Button */}
                  <div className="flex items-center gap-2">
                    {activeWindow.url && (
                      <a 
                        href={activeWindow.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-white transition-colors"
                      >
                        <span>Open Ext</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Window Body: Dedicated App Views */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                  {/* A. GITHUB SIMULATED PROFILE APP */}
                  {activeWindow.type === 'github' && (
                    <div className="space-y-4">
                      {/* GitHub Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center font-extrabold text-white text-lg border border-white/20">
                            AU
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-display text-lg font-bold text-white">Anuj Ugale</h3>
                              <span className="font-mono text-xs text-gray-400">anujugale5889</span>
                            </div>
                            <p className="text-xs text-gray-300">AI Engineer · Computer Vision & Full-Stack Systems · MIT-WPU Pune</p>
                          </div>
                        </div>
                        <a 
                          href="https://github.com/anujugale5889" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 flex items-center gap-1.5 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View on GitHub</span>
                        </a>
                      </div>

                      {/* Pinned Repositories Grid */}
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">Pinned Repositories</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { name: 'buy-or-wait-financial-agent', desc: 'Neuro-Symbolic discrete-event cash flow simulator with zero arithmetic hallucination.', lang: 'Python', stars: 18, link: 'https://github.com/anujugale5889/buy-or-wait-financial-agent' },
                            { name: 'retipath-ai', desc: 'Diabetic retinopathy triage with automated biomarker segmentation and Grad-CAM explainability.', lang: 'PyTorch', stars: 24, link: 'https://github.com/anujugale5889' },
                            { name: 'neural-face-biometrics', desc: 'Dense 468 facial landmark tracking and biometric attendance verification in sub-5ms.', lang: 'Python / OpenCV', stars: 15, link: 'https://github.com/anujugale5889' },
                            { name: 'ohmypoly-attendance', desc: 'College attendance threshold tracker and smart bunk allowance calculator.', lang: 'TypeScript', stars: 22, link: 'https://github.com/anujugale5889' },
                          ].map((repo, i) => (
                            <a 
                              key={i} 
                              href={repo.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex flex-col justify-between group"
                            >
                              <div>
                                <span className="font-mono text-xs font-bold text-sky-400 group-hover:underline flex items-center gap-1">
                                  <Code2 className="w-3.5 h-3.5" />
                                  {repo.name}
                                </span>
                                <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">{repo.desc}</p>
                              </div>
                              <div className="flex items-center gap-3 mt-3 text-[10px] font-mono text-gray-400">
                                <span>{repo.lang}</span>
                                <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-400" /> {repo.stars}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* B. LINKEDIN SIMULATED PROFILE APP */}
                  {activeWindow.type === 'linkedin' && (
                    <div className="space-y-4">
                      {/* LinkedIn Card Header */}
                      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d1017]">
                        <div className="h-18 bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-800 w-full" />
                        <div className="p-4 pt-0 -mt-7 flex items-end justify-between">
                          <div className="flex items-end gap-3">
                            <div className="w-14 h-14 rounded-full bg-[#0a0d14] p-1 border-2 border-white/30 shadow-xl flex items-center justify-center font-bold text-sky-400 text-xl">
                              AU
                            </div>
                            <div>
                              <h3 className="font-display text-base font-bold text-white">Anuj Ugale</h3>
                              <p className="text-xs text-gray-300">B.Tech AI & Data Science · MIT World Peace University, Pune</p>
                            </div>
                          </div>
                          <a 
                            href="https://linkedin.com/in/aanujugale56" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>Connect</span>
                          </a>
                        </div>
                      </div>

                      {/* Education & Achievements Highlight */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <span className="font-mono text-[10px] text-sky-400 uppercase tracking-wider block mb-1">Education</span>
                          <span className="font-bold text-white block">MIT World Peace University</span>
                          <span className="text-gray-300 block">B.Tech Computer Science (AI & Data Science)</span>
                          <span className="text-gray-500 font-mono text-[11px] block mt-1">Class of 2026 · Pune, India</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                          <span className="font-mono text-[10px] text-sky-400 uppercase tracking-wider block mb-1">Honors & Competitions</span>
                          <span className="font-bold text-white block">Smart India Hackathon (SIH 2026)</span>
                          <span className="text-gray-300 block">University Selection for RetiPath-AI</span>
                          <span className="text-gray-500 font-mono text-[11px] block mt-1">HackerRank Orchestrate AI Hackathon</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* C. MAIL SIMULATED COMPOSE APP */}
                  {activeWindow.type === 'mail' && (
                    <form onSubmit={sendMailAction} className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
                        <span className="font-mono text-gray-400 w-16">To:</span>
                        <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">anuj.ugale5889@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs">
                        <span className="font-mono text-gray-400 w-16">Subject:</span>
                        <input 
                          type="text" 
                          value={mailSubject}
                          onChange={e => setMailSubject(e.target.value)}
                          placeholder="Project Collaboration / Opportunity" 
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 font-sans text-xs"
                          required
                        />
                      </div>
                      <div>
                        <textarea 
                          rows={4} 
                          value={mailBody}
                          onChange={e => setMailBody(e.target.value)}
                          placeholder="Hi Anuj, let's talk about building something impactful together..." 
                          className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-sky-400/50 resize-none font-sans"
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono text-[10px] text-gray-400">Response turnaround: within 24 hours</span>
                        <button 
                          type="submit" 
                          className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>{mailSent ? 'Opening Mail Client...' : 'Send Message'}</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* D. FOLDER / CODE VIEW */}
                  {activeWindow.type === 'folder' && activeWindow.items && (
                    <div className="space-y-2">
                      {activeWindow.items.map((item, idx) => (
                        <div 
                          key={idx}
                          className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-mono text-xs text-sky-400 font-bold">
                              {item.name.endsWith('.app') ? 'APP' : 'PY'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-white">{item.name}</span>
                                {item.badge && (
                                  <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 font-mono text-[9px] font-semibold border border-sky-500/30">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-300 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-gray-500 shrink-0">{item.size}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* E. MARKDOWN / DOCUMENT VIEW */}
                  {activeWindow.type === 'file' && (
                    <div className="prose prose-invert prose-xs max-w-none font-sans text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {activeWindow.markdown}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. TERMINAL CONSOLE VIEW */}
            {activeTab === 'terminal' && (
              <div className="absolute inset-2 sm:inset-6 z-30 rounded-2xl bg-[#090b10]/95 backdrop-blur-2xl border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
                <div className="h-9 px-3.5 bg-[#12151f] border-b border-white/10 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setActiveTab('desktop')} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center text-black/60 group cursor-pointer">
                      <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    </button>
                    <button onClick={() => setActiveTab('desktop')} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center text-black/60 group cursor-pointer">
                      <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    </button>
                  </div>
                  <span className="font-mono text-xs text-gray-400">anuj_ugale@mit-wpu: ~ (zsh)</span>
                  <div className="w-12" />
                </div>
                <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2">
                  {terminalHistory.map((h, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-gray-400">
                        <span className="text-emerald-400 font-bold">➜</span>{' '}
                        <span className="text-sky-400">~</span>{' '}
                        <span className="text-white font-semibold">{h.cmd}</span>
                      </p>
                      <div className="text-gray-300 pl-4 leading-relaxed">{h.out}</div>
                    </div>
                  ))}
                  <form onSubmit={(e) => { e.preventDefault(); handleCommand(); }} className="flex items-center gap-2 pt-1">
                    <span className="text-emerald-400 font-bold">➜</span>
                    <span className="text-sky-400">~</span>
                    <input 
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="type a command (whoami, projects, bunk, clear)..."
                      className="flex-1 bg-transparent border-none outline-none text-amber-400 font-mono text-xs placeholder:text-white/20"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            )}

            {/* 5. BOTTOM MACOS / IPADOS DOCK */}
            <div className="relative z-20 flex justify-center pb-1">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {/* Finder */}
                <button
                  onClick={() => openWindow('retipath')}
                  className="group relative p-2 rounded-xl hover:bg-white/15 transition-all hover:-translate-y-1 cursor-pointer"
                  title="Finder"
                >
                  <Folder className="w-5 h-5 text-blue-400" />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Finder
                  </span>
                </button>

                {/* Terminal */}
                <button
                  onClick={() => setActiveTab('terminal')}
                  className="group relative p-2 rounded-xl hover:bg-white/15 transition-all hover:-translate-y-1 cursor-pointer"
                  title="Terminal"
                >
                  <TerminalIcon className="w-5 h-5 text-emerald-400" />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Terminal
                  </span>
                  {activeTab === 'terminal' && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </button>

                {/* Notes (Experience) */}
                <button
                  onClick={() => openWindow('experience')}
                  className="group relative p-2 rounded-xl hover:bg-white/15 transition-all hover:-translate-y-1 cursor-pointer"
                  title="Notes"
                >
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Notes
                  </span>
                </button>

                <div className="w-px h-6 bg-white/15 mx-0.5" />

                {/* GitHub App Window */}
                <button
                  onClick={() => openWindow('github')}
                  className="group relative p-2 rounded-xl hover:bg-white/15 transition-all hover:-translate-y-1 cursor-pointer"
                  title="GitHub.app"
                >
                  <Github className="w-5 h-5 text-white" />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    GitHub.app
                  </span>
                </button>

                {/* LinkedIn App Window */}
                <button
                  onClick={() => openWindow('linkedin')}
                  className="group relative p-2 rounded-xl hover:bg-white/15 transition-all hover:-translate-y-1 cursor-pointer"
                  title="LinkedIn.app"
                >
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    LinkedIn.app
                  </span>
                </button>

                {/* Mail App Window */}
                <button
                  onClick={() => openWindow('mail')}
                  className="group relative p-2 rounded-xl hover:bg-white/15 transition-all hover:-translate-y-1 cursor-pointer"
                  title="Mail"
                >
                  <Mail className="w-5 h-5 text-rose-400" />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Mail
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* IPADOS HOME INDICATOR BAR */}
        <div className="mt-2 flex items-center justify-center">
          <div className="w-32 sm:w-40 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
};
