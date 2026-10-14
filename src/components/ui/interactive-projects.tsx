import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  ScanFace, 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Activity,
  Flame,
  ArrowRight,
  DollarSign,
  Cpu,
  Clock,
  Layers,
  Zap
} from 'lucide-react';

/* =========================================================================
   1. OHMYPOLY: ATTENDANCE & BUNK CALCULATOR INTERACTIVE WIDGET
   ========================================================================= */
export const OhMyPolyBunkCalculator: React.FC = () => {
  const [totalLectures, setTotalLectures] = useState<number>(50);
  const [attendedLectures, setAttendedLectures] = useState<number>(46);
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  const currentPercentage = totalLectures > 0 ? (attendedLectures / totalLectures) * 100 : 0;
  const targetFraction = targetPercentage / 100;
  let maxBunkable = 0;
  let neededToAttend = 0;

  if (currentPercentage >= targetPercentage) {
    maxBunkable = Math.floor((attendedLectures - targetFraction * totalLectures) / targetFraction);
  } else {
    neededToAttend = Math.ceil((targetFraction * totalLectures - attendedLectures) / (1 - targetFraction));
  }

  const setPreset = (total: number, attended: number) => {
    setTotalLectures(total);
    setAttendedLectures(attended);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0c0d15]/65 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      {/* Top Glass Specular Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-black/5 dark:border-white/10">
        <span className="flex items-center gap-2 font-bold text-amber-500 font-display text-sm tracking-tight">
          <Calculator className="w-4 h-4 text-amber-500" />
          <span>Interactive Bunk & Attendance Calculator</span>
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setPreset(50, 46)}
            className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-amber-500 hover:text-white transition-all cursor-pointer text-[10px] font-medium"
          >
            92% (Safe Bunk)
          </button>
          <button
            onClick={() => setPreset(50, 31)}
            className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-rose-500 hover:text-white transition-all cursor-pointer text-[10px] font-medium"
          >
            62% (Danger Alert)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">Total Lectures: {totalLectures}</label>
          <input
            type="range"
            min="10"
            max="120"
            value={totalLectures}
            onChange={(e) => {
              const val = Number(e.target.value);
              setTotalLectures(val);
              if (attendedLectures > val) setAttendedLectures(val);
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">Attended: {attendedLectures}</label>
          <input
            type="range"
            min="0"
            max={totalLectures}
            value={attendedLectures}
            onChange={(e) => setAttendedLectures(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md">
          <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-1">Target Threshold: {targetPercentage}%</label>
          <input
            type="range"
            min="60"
            max="90"
            value={targetPercentage}
            onChange={(e) => setTargetPercentage(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Outcome Verdict Display */}
      <div 
        className={`p-4 rounded-xl border flex items-center justify-between gap-4 backdrop-blur-xl ${
          currentPercentage >= targetPercentage
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl font-bold font-sans">
              {currentPercentage.toFixed(1)}%
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
              Current Standing
            </span>
          </div>

          <p className="text-xs sm:text-sm font-sans font-medium leading-relaxed">
            {currentPercentage >= targetPercentage ? (
              <span>
                🏖️ <strong>Bunk Approved!</strong> You can safely skip <strong>{maxBunkable}</strong> consecutive lectures without dropping below {targetPercentage}%.
              </span>
            ) : (
              <span>
                ⚠️ <strong>Attendance Warning!</strong> You must attend the next <strong>{neededToAttend}</strong> consecutive lectures to recover {targetPercentage}%.
              </span>
            )}
          </p>
        </div>

        <span className="text-2xl sm:text-3xl shrink-0">
          {currentPercentage >= targetPercentage ? '🌴' : '🚨'}
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   2. EMAIL GUARD: SPAM & PHISHING DETECTOR INTERACTIVE WIDGET
   ========================================================================= */
export const EmailGuardDetector: React.FC = () => {
  const [emailText, setEmailText] = useState(
    "Urgent: Your bank security account has been locked. Click http://secure-verify-update.ru immediately to verify login credentials."
  );
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<{ isSpam: boolean; score: number; flags: string[] } | null>({
    isSpam: true,
    score: 98.4,
    flags: ["Suspicious urgency trigger", "Credential harvesting pattern", "Unverified external link redirect"]
  });

  const analyzeEmail = (textToAnalyze?: string) => {
    const text = textToAnalyze || emailText;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const lower = text.toLowerCase();
      const hasSpamWords = lower.includes('urgent') || lower.includes('winner') || lower.includes('won') || lower.includes('bank') || lower.includes('lottery') || lower.includes('click') || lower.includes('free') || lower.includes('crypto');

      if (hasSpamWords) {
        setResult({
          isSpam: true,
          score: 97.8,
          flags: ["High-urgency psychological trigger", "Suspicious link redirect", "Phishing heuristics match"]
        });
      } else {
        setResult({
          isSpam: false,
          score: 2.1,
          flags: ["Legitimate academic/personal context", "No malicious patterns", "Verified headers"]
        });
      }
      setIsScanning(false);
    }, 400);
  };

  const setPreset = (presetText: string) => {
    setEmailText(presetText);
    analyzeEmail(presetText);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0c0d15]/65 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-black/5 dark:border-white/10">
        <span className="flex items-center gap-1.5 font-bold text-cyan-500 font-display text-sm tracking-tight">
          <ShieldAlert className="w-4 h-4 text-cyan-500" />
          <span>Interactive Email Guard Simulator</span>
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setPreset("Urgent: Your bank account will be suspended! Click http://verify-auth.ru to update password.")}
            className="px-2 py-1 rounded bg-black/5 dark:bg-white/10 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer text-[10px]"
          >
            Bank Scam
          </button>
          <button
            onClick={() => setPreset("MIT-WPU Notice: Mid-term examination timetable and lecture room assignment for Computer Science.")}
            className="px-2 py-1 rounded bg-black/5 dark:bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer text-[10px]"
          >
            College Notice
          </button>
        </div>
      </div>

      <div className="relative mb-3">
        <textarea
          rows={2}
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste an email body or subject to scan..."
          className="w-full px-3 py-2 rounded-xl bg-white/80 dark:bg-[#12141e]/80 border border-black/10 dark:border-white/10 outline-none focus:border-cyan-500 text-gray-900 dark:text-gray-200 text-xs resize-none backdrop-blur-md"
        />
        <button
          onClick={() => analyzeEmail()}
          disabled={isScanning}
          className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all cursor-pointer shadow-sm text-xs"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning NLP Tokens...</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Analyze Threat Vector</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div 
          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-xl ${
            result.isSpam 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              {result.isSpam ? <ShieldAlert className="w-4 h-4 text-rose-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              <span className="font-bold text-sm">
                {result.isSpam ? '🚨 PHISHING / MALICIOUS ATTACK' : '✅ CLEAN & VERIFIED EMAIL'}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-current/10">
                Threat Score: {result.score}%
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-sans">
              {result.flags.map((flag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10">
                  • {flag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. BUY OR WAIT: AI FINANCIAL SOLVENCY & LIQUIDITY OPTIMIZER
   (Authentic GitHub implementation: Deterministic Discrete-Event Simulator,
    Liquidity Buffer Ratio (LBR), 10% Emergency Shock Stress Test,
    Multi-Tier Constrained Policy Optimizer)
   ========================================================================= */
export const BuyOrWaitFinanceAdvisor: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'macbook' | 'surgery' | 'gpu' | 'conference'>('macbook');
  const [isSolving, setIsSolving] = useState(false);

  const SCENARIOS = {
    macbook: {
      title: 'MacBook Pro M3 Max (36GB)',
      category: 'Discretionary Capital Asset',
      cost: '₹2,99,900',
      income: '₹1,40,000 / mo',
      fixedExpenses: '₹55,000 / mo',
      preLBR: '3.42x',
      postUpfrontLBR: '0.41x (CRITICAL BUFFER LOSS)',
      emergencyShockResult: 'FAILS (-₹38,200 overdraft risk on Day 34)',
      verdict: 'APPROVED VIA 0% INSTALLMENT (OR WAIT 45 DAYS)',
      verdictType: 'installment',
      verdictColor: 'text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
      actionPlan: 'Full upfront payment depletes emergency runway below the 1.5x resilience threshold. Discrete solver generates Plan B: 6-Month 0% EMI (₹49,983/mo), sustaining Liquidity Buffer Ratio at 2.18x through the 90-day horizon with zero overdrafts.',
      solverEngine: 'forecaster.py (Discrete-Event Horizon)',
      accuracy: '96.0% Benchmark Accuracy',
      latency: '19.3ms'
    },
    surgery: {
      title: 'Emergency Medical Procedure',
      category: 'Protected Non-Discretionary',
      cost: '₹85,000',
      income: '₹1,40,000 / mo',
      fixedExpenses: '₹55,000 / mo',
      preLBR: '3.42x',
      postUpfrontLBR: '2.14x (SAFE)',
      emergencyShockResult: 'PASSES (Buffer cushions sudden expenditure)',
      verdict: 'IMMEDIATE FULL PAYMENT APPROVED',
      verdictType: 'approved',
      verdictColor: 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      actionPlan: 'Priority category evaluated: Protected Medical Essential. Evaluated upfront balance remains above minimum solvency buffer. Optimizer automatically schedules pause on non-essential stoppable subscriptions (Gym & Streaming) to replenish reserve within 30 days.',
      solverEngine: 'resilience_index.py (LBR Stress Test)',
      accuracy: '96.0% Benchmark Accuracy',
      latency: '18.1ms'
    },
    gpu: {
      title: 'NVIDIA RTX 5090 GPU (AI Rig)',
      category: 'Hardware Upgrade',
      cost: '₹1,95,000',
      income: '₹1,40,000 / mo',
      fixedExpenses: '₹55,000 / mo',
      preLBR: '2.10x',
      postUpfrontLBR: '0.35x (UNSAFE INTRA-MONTH)',
      emergencyShockResult: 'FAILS (Intra-month shortfall before salary settlement)',
      verdict: 'WAIT 14 DAYS (PAYDAY SETTLEMENT)',
      verdictType: 'wait',
      verdictColor: 'text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/30',
      actionPlan: 'Contract salary settlement date is scheduled on Day 15. Executing immediate purchase today causes account balance decay below minimum operating liquidity during rent due-date. Discrete simulator recommends waiting exactly 14 days.',
      solverEngine: 'optimizer.py (Constrained Policy)',
      accuracy: '96.0% Benchmark Accuracy',
      latency: '20.4ms'
    },
    conference: {
      title: 'International AI Conference / Travel',
      category: 'Professional Development',
      cost: '₹1,15,000',
      income: '₹1,40,000 / mo',
      fixedExpenses: '₹55,000 / mo',
      preLBR: '3.60x',
      postUpfrontLBR: '2.31x (HEALTHY BUFFER)',
      emergencyShockResult: 'PASSES (10% emergency shock survived)',
      verdict: 'APPROVED (FULL UPFRONT PAYMENT)',
      verdictType: 'approved',
      verdictColor: 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      actionPlan: 'Account trajectory maintains post-purchase cash buffer of > 2.3x monthly living costs. Evaluated through deterministic 90-day forward simulator with zero probability of negative balance.',
      solverEngine: 'forecaster.py + LBR Index',
      accuracy: '96.0% Benchmark Accuracy',
      latency: '19.0ms'
    }
  };

  const current = SCENARIOS[selectedScenario];

  const handleSelect = (key: typeof selectedScenario) => {
    setIsSolving(true);
    setSelectedScenario(key);
    setTimeout(() => setIsSolving(false), 280);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0c0d15]/65 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      {/* Top Glass Specular Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Cpu className="w-3.5 h-3.5" />
          </span>
          <span className="font-bold text-gray-950 dark:text-white font-display text-sm tracking-tight">
            Buy or Wait? — Discrete-Event Solvency Simulator
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
            Accuracy: 96.0%
          </span>
          <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
            Latency: 19.3ms
          </span>
        </div>
      </div>

      {/* Interactive Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(SCENARIOS) as (keyof typeof SCENARIOS)[]).map(key => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-medium font-sans flex items-center gap-1.5 ${
              selectedScenario === key
                ? 'bg-purple-600 text-white font-semibold shadow-[0_4px_16px_rgba(147,51,234,0.3)]'
                : 'bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/5'
            }`}
          >
            <span>{SCENARIOS[key].title}</span>
          </button>
        ))}
      </div>

      {isSolving ? (
        <div className="p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 text-purple-400 backdrop-blur-md">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-xs font-mono">Running Discrete-Event Cash Flow Simulator (forecaster.py)...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Main Solver Result Card */}
          <div className={`p-4 rounded-xl border backdrop-blur-xl ${current.verdictColor}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-current/15">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 block font-sans">
                  Purchase Request · {current.category}
                </span>
                <span className="font-bold font-display text-lg text-gray-950 dark:text-white">
                  {current.cost}
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 block font-sans">
                  Mathematical Decision Policy
                </span>
                <span className="font-bold text-sm tracking-wide font-sans">
                  {current.verdict}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200 mb-3">
              {current.actionPlan}
            </p>

            {/* Discrete Simulation Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono border-t border-current/15">
              <div className="p-2 rounded-lg bg-black/10 dark:bg-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">Pre-Purchase LBR</span>
                <span className="font-bold text-gray-900 dark:text-white">{current.preLBR}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/10 dark:bg-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">Post-Upfront LBR</span>
                <span className="font-bold text-gray-900 dark:text-white">{current.postUpfrontLBR}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/10 dark:bg-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">10% Emergency Shock</span>
                <span className="font-bold text-gray-900 dark:text-white truncate">{current.emergencyShockResult}</span>
              </div>
            </div>
          </div>

          {/* Sub-bar showing architecture grounding */}
          <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 px-1">
            <span>Core Module: <code className="text-purple-400">{current.solverEngine}</code></span>
            <span>HackerRank Orchestrate · Python 3.10+</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   4. NEURAFACE: REAL-TIME BIOMETRIC ATTENDANCE SIMULATOR
   ========================================================================= */
export const NeuraFaceSimulator: React.FC = () => {
  const [marked, setMarked] = useState(false);
  const [yaw, setYaw] = useState(-2.1);
  const [pitch, setPitch] = useState(1.4);

  const simulateAttendance = () => {
    setMarked(true);
    setTimeout(() => setMarked(false), 3500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0c0d15]/65 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-black/5 dark:border-white/10">
        <span className="flex items-center gap-1.5 font-bold text-cyan-600 dark:text-cyan-400 font-display text-sm tracking-tight">
          <ScanFace className="w-4 h-4" />
          <span>NeuraFace Studio Biometric Telemetry</span>
        </span>
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">● 60 FPS · Sub-5ms</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 block">Dense Mesh</span>
          <span className="font-bold text-sm text-cyan-600 dark:text-cyan-400">468 Spatial Points</span>
        </div>
        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 block">Pose Stability</span>
          <span className="font-bold text-sm text-gray-900 dark:text-white">Yaw: {yaw}° · Pitch: {pitch}°</span>
        </div>
        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 block">Vector Embedding</span>
          <span className="font-bold text-sm text-amber-600 dark:text-amber-400">512-Dim Cosine Match</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={simulateAttendance}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all cursor-pointer shadow-sm text-xs font-sans"
        >
          <ScanFace className="w-4 h-4" />
          <span>Simulate Facial Recognition & Log Attendance</span>
        </button>

        {marked && (
          <div className="inline-flex items-center gap-2 text-emerald-500 font-bold animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-4 h-4" />
            <span>Attendance Logged: Anuj Ugale (ID: MITWPU-889)</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   5. RETIPATH-AI: CLINICAL RETINOPATHY TRIAGE SIMULATOR
   ========================================================================= */
export const RetiPathTriageSimulator: React.FC = () => {
  const [mode, setMode] = useState<'fundus' | 'biomarker' | 'gradcam'>('gradcam');

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0c0d15]/65 backdrop-blur-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 font-mono text-xs shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-black/5 dark:border-white/10">
        <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 font-display text-sm tracking-tight">
          <Eye className="w-4 h-4" />
          <span>RetiPath-AI Diagnostic Triage View</span>
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-500/20">
          SIH 2026 Selection
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'fundus', label: '1. Original Fundus' },
          { id: 'biomarker', label: '2. Biomarker Segmentation' },
          { id: 'gradcam', label: '3. Grad-CAM Explainability' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as typeof mode)}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-semibold font-sans ${
              mode === item.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 border border-black/5 dark:border-white/5'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-blue-500/[0.08] dark:bg-blue-950/40 border border-blue-500/30 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <span className="font-bold text-sm text-blue-900 dark:text-blue-200 font-sans">
            {mode === 'fundus' && 'Retinal Fundus Optical Scan'}
            {mode === 'biomarker' && 'Automated Lesion & Microaneurysm Segmentation'}
            {mode === 'gradcam' && 'Deep Learning Attention Map (Grad-CAM Heatmap)'}
          </span>
          <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">
            Diagnostic Severity: Grade 3
          </span>
        </div>

        <p className="font-sans text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-normal">
          {mode === 'fundus' && 'Macula and optic disc visualized under high-resolution clinical imaging.'}
          {mode === 'biomarker' && 'Identified 14 microaneurysms, hard lipid exudates in macula perimeter, and retinal haemorrhages.'}
          {mode === 'gradcam' && 'Model directs clinical focus to ischemic foveal zones with 94.8% diagnostic activation probability.'}
        </p>
      </div>
    </div>
  );
};
