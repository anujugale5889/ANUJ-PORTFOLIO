import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Video, 
  Terminal, 
  UserCheck, 
  Download, 
  Settings, 
  Activity, 
  Check, 
  X, 
  Minus, 
  Square, 
  Play, 
  Pause, 
  ShieldCheck, 
  Layers, 
  UserPlus, 
  RefreshCw 
} from 'lucide-react';

interface NeuraFaceStudioProps {
  onBackToPortfolio?: () => void;
  isStandalone?: boolean;
}

export const NeuraFaceStudio: React.FC<NeuraFaceStudioProps> = ({ onBackToPortfolio, isStandalone = false }) => {
  const [videoSource, setVideoSource] = useState<'simulated' | 'webcam'>('simulated');
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);
  const [isMeshVisible, setIsMeshVisible] = useState<boolean>(true);
  const [enrollmentProgress, setEnrollmentProgress] = useState<number>(78);
  const [logsPaused, setLogsPaused] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '[INFO] Frame: 2409 | Face detected at (342, 190)',
    '[INFO] Frame: 2495 | Face detected at (342, 190)',
    '[INFO] Frame: 2491 | Face detected at (342, 190)',
    '[DATA] Vector embedding extracted: 512-dim at 512-dim',
    '[INFO] Frame: 2409 | Face detected at (342, 190)',
    '[DATA] Vector embedding extracted: 512-dim at 512-dim',
    '[SYS]  Latency: 4.2ms',
    '[SYS]  Latency: 4.2ms',
  ]);
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);
  const [enrolledName, setEnrolledName] = useState<string>('');
  const [selectedUserFilter, setSelectedUserFilter] = useState<string>('Identified users');
  const [latency, setLatency] = useState<number>(4.2);
  const [identifiedConfidence, setIdentifiedConfidence] = useState<number>(99.4);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Hotlinked image from mockup for high fidelity
  const simulatedFaceImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8rXk836YHDaS46YQpMgWJwgmcLo0V2lIhHoswp3CNMPqz8r_pJ0NMjNQETVbK3phNJk_VTkX_EXYiaTKzQG-XtV52X4BHkJgoZ6wMvUwMwChUfGZgylI1stCYdRWY7EqXG_0FPR45Cl71UV3ND7XlZHNu6tCdAEMN18ZC8vWMtybKilk_DUe2QUdFrSAkWD9gFedH6b9VIXyfDOhU5qIyIJTMl5IPIxL4kkzRHnWrGt1qUjuv-CqYA";

  const [identifiedUsers, setIdentifiedUsers] = useState([
    {
      id: 'usr-1',
      name: 'Alex Carter',
      confidence: 99.2,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      time: '10:42:15 AM'
    },
    {
      id: 'usr-2',
      name: 'Alex Carter',
      confidence: 99.2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      time: '10:41:58 AM'
    },
    {
      id: 'usr-3',
      name: 'Shawn Honner',
      confidence: 98.7,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      time: '10:39:12 AM'
    },
    {
      id: 'usr-4',
      name: 'Sarah Chen',
      confidence: 97.9,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      time: '10:35:40 AM'
    }
  ]);

  // Telemetry real-time generator
  const [telemetryTime, setTelemetryTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTime(t => t + 0.15);
      // Slight latency jitter between 3.8ms and 4.6ms
      setLatency(Number((4.0 + Math.sin(Date.now() / 800) * 0.4).toFixed(1)));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Streaming console logs
  useEffect(() => {
    if (logsPaused) return;
    const interval = setInterval(() => {
      const frameNum = Math.floor(2400 + Math.random() * 200);
      const newLogs = [
        `[INFO] Frame: ${frameNum} | Face detected at (342, 190)`,
        `[DATA] Vector embedding extracted: 512-dim at 512-dim`,
        `[SYS]  Latency: ${(3.9 + Math.random() * 0.5).toFixed(1)}ms`
      ];
      setLogs(prev => [...prev.slice(-14), newLogs[Math.floor(Math.random() * newLogs.length)]]);
    }, 1800);
    return () => clearInterval(interval);
  }, [logsPaused]);

  // Webcam handler
  const toggleRealWebcam = async () => {
    if (videoSource === 'webcam') {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setVideoSource('simulated');
      setIsWebcamActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setVideoSource('webcam');
        setIsWebcamActive(true);
      } catch (err) {
        alert('Could not access webcam, falling back to high-fidelity simulated biometric feed.');
        setVideoSource('simulated');
        setIsWebcamActive(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      session: "NEURAFACE_SESSION_2409",
      identifiedUsers,
      enrollmentProgress,
      activeUser: { id: "USER_9824", confidence: identifiedConfidence, embeddingDim: 512 }
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "neuraface_telemetry_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full min-h-screen bg-[#0e1117] text-[#c9d1d9] font-sans flex flex-col select-none relative">
      {/* Top Application Window Bar */}
      <div className="h-11 bg-[#161b22] border-b border-[#21262d] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* Windows / Mac OS style controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <button 
              onClick={onBackToPortfolio}
              title="Return to Portfolio"
              className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#f59e0b] hover:opacity-80 transition-opacity" />
            <button className="w-3 h-3 rounded-full bg-[#10b981] hover:opacity-80 transition-opacity" />
          </div>

          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-semibold text-white text-sm">NeuraFace Studio</span>
            <span className="text-[10px] text-[#58a6ff] font-mono bg-[#1f2937] px-1.5 py-0.5 rounded">v2.4.1</span>
          </div>

          {/* Video Input Source Dropdown */}
          <div className="hidden sm:flex items-center ml-4">
            <button 
              onClick={toggleRealWebcam}
              className="px-2.5 py-1 text-xs bg-[#21262d] hover:bg-[#30363d] text-gray-200 rounded border border-[#30363d] flex items-center gap-1.5 transition-colors font-mono"
            >
              <Camera className="w-3 h-3 text-cyan-400" />
              <span>{videoSource === 'webcam' ? 'Live USB Webcam' : 'Direct Webcam Feed'}</span>
              <span className="text-[9px] text-gray-400">▾</span>
            </button>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 text-xs">
          <div className="hidden md:flex items-center gap-1">
            <span className="text-gray-400 font-mono text-[11px] px-2 py-0.5 bg-[#21262d] rounded">Pose convertor</span>
          </div>

          <button 
            onClick={() => setShowEnrollModal(true)}
            className="px-3 py-1 rounded bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs flex items-center gap-1 shadow transition-colors"
          >
            <UserPlus className="w-3 h-3" />
            <span>Enroll ▾</span>
          </button>

          <button 
            onClick={handleExportData}
            className="px-3 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-[#30363d] text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3 h-3 text-cyan-400" />
            <span>Export Data</span>
          </button>

          {onBackToPortfolio && (
            <button
              onClick={onBackToPortfolio}
              className="ml-2 text-xs text-[#8b949e] hover:text-white px-2 py-1 rounded hover:bg-[#21262d] transition-colors"
            >
              Exit
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left 8 Cols: Video Feed + Bottom Telemetry & Console */}
        <div className="lg:col-span-8 flex flex-col border-r border-[#21262d] bg-[#0d1117] overflow-hidden">
          {/* Main Video Viewport */}
          <div className="flex-1 flex flex-col bg-[#090d13] relative overflow-hidden">
            {/* Viewport Subheader */}
            <div className="h-8 px-4 bg-[#161b22] border-b border-[#21262d] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-200">Video</span>
                <span className="text-[#3fb950] font-mono text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  SYSTEM ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button 
                  onClick={() => setIsMeshVisible(!isMeshVisible)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    isMeshVisible ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-[#21262d] text-gray-400'
                  }`}
                >
                  Mesh: {isMeshVisible ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="flex-1 flex items-center justify-center p-4 relative bg-black overflow-hidden">
              <div className="relative max-w-[620px] w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#21262d] shadow-2xl flex items-center justify-center bg-[#070a0f]">
                {videoSource === 'webcam' ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={simulatedFaceImg} 
                    alt="Facial Tracking Biometric Target" 
                    className="w-full h-full object-cover filter contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Face Bounding Box & 468-point Mesh Wireframe */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {/* Bounding box outline matching mockup */}
                  <div className="absolute w-[44%] h-[64%] top-[14%] left-[28%] border-2 border-[#3b82f6] rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {/* Bounding box tags */}
                    <div className="absolute -top-5 left-0 text-[10px] font-mono text-[#60a5fa] font-semibold tracking-wider">
                      LIVE WEBCAM
                    </div>
                    <div className="absolute -top-1 -right-28 text-left text-[10px] font-mono text-gray-300 bg-black/70 px-1.5 py-0.5 rounded border border-gray-700">
                      <div>ID: USER_9824</div>
                      <div className="text-cyan-400">CONF: {identifiedConfidence}%</div>
                    </div>
                  </div>

                  {/* SVG 468-Point Cyan Landmark Wireframe Mesh */}
                  {isMeshVisible && (
                    <svg className="absolute w-[44%] h-[64%] top-[14%] left-[28%] overflow-visible">
                      <defs>
                        <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      {/* Facial Contour Polygon */}
                      <polygon 
                        points="50,45 80,35 120,32 160,35 190,45 205,75 210,120 195,175 160,215 120,230 80,215 45,175 30,120 35,75" 
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="1.2" 
                        opacity="0.85" 
                      />

                      {/* Forehead & Eyebrow Arches */}
                      <path d="M 60,65 Q 85,55 110,65" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.8" />
                      <path d="M 130,65 Q 155,55 180,65" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.8" />

                      {/* Eye Meshes */}
                      <polygon points="65,78 80,72 100,78 85,84" fill="rgba(34,211,238,0.15)" stroke="#38bdf8" strokeWidth="1" />
                      <circle cx="82" cy="78" r="3" fill="#22d3ee" />
                      
                      <polygon points="140,78 155,72 175,78 160,84" fill="rgba(34,211,238,0.15)" stroke="#38bdf8" strokeWidth="1" />
                      <circle cx="158" cy="78" r="3" fill="#22d3ee" />

                      {/* Bridge of Nose & Tip */}
                      <path d="M 120,65 L 120,130 L 105,140 L 120,145 L 135,140 Z" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" strokeWidth="1.2" />

                      {/* Cheekbone & Jaw Triangulation Lines */}
                      <line x1="50" y1="45" x2="82" y2="78" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="190" y1="45" x2="158" y2="78" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="82" y1="78" x2="120" y2="105" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="158" y1="78" x2="120" y2="105" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="30" y1="120" x2="85" y2="135" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="210" y1="120" x2="155" y2="135" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="85" y1="135" x2="105" y2="140" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="155" y1="135" x2="135" y2="140" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />

                      {/* Lips & Mouth Contour */}
                      <polygon points="95,165 120,160 145,165 135,178 120,180 105,178" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.2" />
                      <line x1="95" y1="165" x2="145" y2="165" stroke="#22d3ee" strokeWidth="1" />

                      {/* Chin Triangulation */}
                      <line x1="105" y1="178" x2="120" y2="230" stroke="#22d3ee" strokeWidth="0.8" opacity="0.7" />
                      <line x1="135" y1="178" x2="120" y2="230" stroke="#22d3ee" strokeWidth="0.8" opacity="0.7" />
                      <line x1="80" y1="215" x2="105" y2="178" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                      <line x1="160" y1="215" x2="135" y2="178" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Split: Live Telemetry Waves & Console */}
          <div className="h-44 border-t border-[#21262d] grid grid-cols-1 md:grid-cols-2 bg-[#0d1117]">
            {/* Live Telemetry Oscilloscope Section */}
            <div className="border-r border-[#21262d] p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-200">Live Telemetry</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-mono bg-[#161b22] px-1.5 py-0.5 rounded border border-[#21262d]">
                    Wave Graph Overlay
                  </span>
                  <Settings className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Wave Graph 1: Pose Stability */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Pose Stability</span>
                  <span className="font-mono text-cyan-400">98.4%</span>
                </div>
                <div className="w-full h-7 bg-[#161b22] rounded overflow-hidden flex items-center px-1">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
                    <path 
                      d={`M 0,12 Q 15,${12 + Math.sin(telemetryTime) * 6} 30,12 T 60,12 T 90,${12 + Math.cos(telemetryTime) * 5} L 100,12`} 
                      fill="none" 
                      stroke="#38bdf8" 
                      strokeWidth="1.8" 
                    />
                  </svg>
                </div>
              </div>

              {/* Wave Graph 2: Lighting Score */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Lighting Score</span>
                  <span className="font-mono text-teal-400">0.89</span>
                </div>
                <div className="w-full h-7 bg-[#161b22] rounded overflow-hidden flex items-center px-1">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
                    <path 
                      d={`M 0,12 Q 20,${12 + Math.cos(telemetryTime * 1.2) * 5} 40,12 T 80,${12 + Math.sin(telemetryTime * 0.9) * 4} L 100,12`} 
                      fill="none" 
                      stroke="#2dd4bf" 
                      strokeWidth="1.8" 
                    />
                  </svg>
                </div>
              </div>

              {/* Wave Graph 3: Embedding Distance */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Embedding Distance</span>
                  <span className="font-mono text-blue-400">0.14 (Match)</span>
                </div>
                <div className="w-full h-7 bg-[#161b22] rounded overflow-hidden flex items-center px-1">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
                    <path 
                      d={`M 0,14 Q 10,${8 + Math.sin(telemetryTime * 1.5) * 5} 25,14 T 50,${16 + Math.cos(telemetryTime * 2) * 4} T 80,11 L 100,14`} 
                      fill="none" 
                      stroke="#60a5fa" 
                      strokeWidth="1.8" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Console Log Terminal */}
            <div className="p-3 flex flex-col justify-between font-mono bg-[#090d13]">
              <div className="flex items-center justify-between text-xs mb-1 text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-gray-200">Console</span>
                </div>
                <button 
                  onClick={() => setLogsPaused(!logsPaused)}
                  className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1"
                >
                  {logsPaused ? <Play className="w-2.5 h-2.5" /> : <Pause className="w-2.5 h-2.5" />}
                  <span>{logsPaused ? 'Resume' : 'Pause'}</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 text-[11px] leading-tight text-gray-300 pr-1 select-text">
                {logs.map((log, i) => (
                  <div key={i} className="truncate">
                    {log.startsWith('[INFO]') && <span className="text-gray-400">{log}</span>}
                    {log.startsWith('[DATA]') && <span className="text-cyan-400">{log}</span>}
                    {log.startsWith('[SYS]') && <span className="text-[#3fb950] font-semibold">{log}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Enrollment & Identification Panel */}
        <div className="lg:col-span-4 flex flex-col bg-[#161b22] overflow-y-auto border-l border-[#21262d]">
          {/* Header */}
          <div className="h-10 px-4 bg-[#1f242c] border-b border-[#21262d] flex items-center justify-between text-xs font-semibold text-white">
            <span>Enrollment & Identification</span>
            <span className="text-[10px] font-mono text-cyan-400">READY</span>
          </div>

          <div className="p-4 space-y-5 flex-1">
            {/* Enrollment Progress Section */}
            <div className="bg-[#0d1117] p-3.5 rounded-lg border border-[#30363d]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-gray-200">Enrollment Progress</span>
                <span className="font-mono text-cyan-400 text-[11px]">{enrollmentProgress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${enrollmentProgress}%` }}
                />
              </div>

              {/* Circular Gauge and Checklist row */}
              <div className="flex items-center gap-4">
                {/* Circular Percentage Ring Gauge */}
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="#21262d" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      stroke="#38bdf8" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray="201"
                      strokeDashoffset={201 - (201 * enrollmentProgress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display font-bold text-sm text-white leading-none">{enrollmentProgress}%</span>
                    <span className="text-[9px] text-gray-400 leading-none mt-0.5">Complete</span>
                  </div>
                </div>

                {/* Status checklist */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#3fb950] font-medium text-[11px]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Face detected</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#3fb950] font-medium text-[11px]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Pose variations captured</span>
                  </div>
                  <div className="text-gray-400 text-[11px]">
                    <span>Status: </span>
                    <span className="text-gray-200">Extracting embeddings...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Identified Users Match List */}
            <div className="bg-[#0d1117] p-3.5 rounded-lg border border-[#30363d]">
              <div className="flex items-center justify-between mb-3">
                <select 
                  value={selectedUserFilter}
                  onChange={(e) => setSelectedUserFilter(e.target.value)}
                  className="bg-[#161b22] border border-[#30363d] text-gray-200 text-xs rounded px-2 py-1 font-medium focus:outline-none"
                >
                  <option>Identified users</option>
                  <option>Recent matches</option>
                  <option>All enrolled</option>
                </select>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setShowEnrollModal(true)}
                    className="px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 text-xs border border-[#30363d]"
                  >
                    Enroll
                  </button>
                  <button 
                    onClick={() => {
                      setIdentifiedConfidence(99.4);
                      alert('Identification scan complete: Matched Alex Carter (99.2%)');
                    }}
                    className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
                  >
                    Identify
                  </button>
                </div>
              </div>

              {/* Cards list */}
              <div className="space-y-2">
                {identifiedUsers.map((user, idx) => (
                  <div 
                    key={user.id + idx}
                    className="p-2 rounded bg-[#161b22] hover:bg-[#1c212c] border border-[#21262d] flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover border border-[#30363d]"
                      />
                      <div>
                        <div className="text-xs font-medium text-gray-200">{user.name}</div>
                        <div className="text-[11px] text-cyan-400 font-mono">
                          Match Found: {user.name} ({user.confidence}%)
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{user.time.split(' ')[0]}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Card Actions */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[#21262d]">
                <button 
                  onClick={() => {
                    setLogs(prev => [...prev, '[SYS] Real-time scan triggered']);
                  }}
                  className="px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 text-xs font-medium border border-[#30363d]"
                >
                  Identify
                </button>
                <button 
                  onClick={handleExportData}
                  className="px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-200 text-xs font-medium border border-[#30363d]"
                >
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="h-8 bg-[#090d13] border-t border-[#21262d] px-4 flex items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>NeuraFace Studio v2.4.1</span>
            <span className="text-[#3fb950]">LATENCY: {latency}ms</span>
          </div>
        </div>
      </div>

      {/* ENROLL MODAL */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-md w-full p-6 text-gray-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#21262d]">
              <h3 className="font-display font-semibold text-white text-base">Enroll New Subject</h3>
              <button onClick={() => setShowEnrollModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Subject Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Elena Rostova"
                  value={enrolledName}
                  onChange={(e) => setEnrolledName(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 bg-[#0d1117] rounded border border-[#21262d] text-gray-400 text-[11px] space-y-1">
                <div>• Look directly into the camera frame</div>
                <div>• Turn head slightly left and right for pose diversity</div>
                <div>• 512-dimensional vector embedding will be committed to local store</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#21262d]">
              <button onClick={() => setShowEnrollModal(false)} className="px-4 py-2 text-xs text-gray-400 hover:text-white">
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!enrolledName.trim()) {
                    alert('Please enter a subject name');
                    return;
                  }
                  setIdentifiedUsers(prev => [
                    {
                      id: `usr-${Date.now()}`,
                      name: enrolledName,
                      confidence: 99.6,
                      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
                      time: new Date().toLocaleTimeString()
                    },
                    ...prev
                  ]);
                  setEnrollmentProgress(100);
                  setShowEnrollModal(false);
                  setEnrolledName('');
                }}
                className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Capture & Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
