import React, { useState } from 'react';
import { 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  PenTool, 
  MousePointer, 
  Trash2, 
  RotateCcw, 
  FileText, 
  Send, 
  Sliders, 
  Maximize2, 
  Minimize2, 
  AlertTriangle, 
  Check, 
  X, 
  Layers, 
  Info,
  Download,
  Share2
} from 'lucide-react';

interface RetiPathAIProps {
  onBackToPortfolio?: () => void;
  isStandalone?: boolean;
}

export const RetiPathAI: React.FC<RetiPathAIProps> = ({ onBackToPortfolio, isStandalone = false }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTool, setActiveTool] = useState<string>('pointer');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(0.85);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showReferralModal, setShowReferralModal] = useState<boolean>(false);
  const [showOverrideModal, setShowOverrideModal] = useState<boolean>(false);
  const [clinicalNotes, setClinicalNotes] = useState<string>('Patient presents with moderate vision blurriness in right eye. Microaneurysms noted in superior and temporal quadrants.');
  const [triageStatus, setTriageStatus] = useState<'High Priority' | 'Moderate' | 'Routine'>('High Priority');
  const [drConfidence, setDrConfidence] = useState<number>(92.4);

  const annotations = [
    { id: 'box-1', label: 'Exudates', confidence: 94, top: '22%', left: '54%', width: '18%', height: '18%', color: '#ef4444' },
    { id: 'box-2', label: 'Hemorrhages', confidence: 88, top: '30%', left: '62%', width: '16%', height: '18%', color: '#f59e0b' },
    { id: 'box-3', label: 'Samroges', confidence: 94, top: '44%', left: '66%', width: '15%', height: '16%', color: '#ec4899' },
    { id: 'box-4', label: 'Hemorrhages', confidence: 98, top: '56%', left: '60%', width: '18%', height: '24%', color: '#ef4444' },
    { id: 'box-5', label: 'Lipid Exudates', confidence: 86, top: '65%', left: '48%', width: '19%', height: '18%', color: '#eab308' },
  ];

  const radarPoints = [
    { label: 'Optic', val: 0.82, x: 120, y: 35 },
    { label: 'Macular', val: 0.91, x: 185, y: 85 },
    { label: 'Insight', val: 0.75, x: 165, y: 165 },
    { label: 'Glaucoma', val: 0.28, x: 75, y: 165 },
    { label: 'Exudates', val: 0.88, x: 55, y: 85 },
  ];

  const retinalImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCrhDuFgfETP_LM2uRqSzKTW4E-1bQBwzYpmyrP8FR4UmJ50iaJisbinGRp6zAHx7taerCrc_xIm37ZCT6l7CW_02CShXojwGCy30DSGeT8qgetXv-LDJ0-AjEvPtcu3NPtOa-ROP4a3UxU24yDGw6vntUfSAQe-C8sVG_AkyKo_thiNDzcLE5mK6SOIY5QAVJDnunbfedimxyUA-SImSnBKFoXWVHqyLbLFFAosAz_sDZpYl67F_7L3w";

  return (
    <div className={`w-full min-h-screen bg-[#111319] text-[#e2e8f0] font-sans flex flex-col select-none ${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}>
      {/* Top macOS-style Window Titlebar */}
      <div className="h-12 bg-[#171b24] border-b border-[#252b38] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* macOS window control buttons */}
          <div className="flex items-center gap-1.5 mr-2">
            <button 
              onClick={onBackToPortfolio}
              title="Return to Portfolio"
              className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onClick={() => setZoomLevel(100)}
              title="Reset Zoom"
              className="w-3 h-3 rounded-full bg-[#f59e0b] hover:opacity-80 transition-opacity"
            />
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Toggle Fullscreen"
              className="w-3 h-3 rounded-full bg-[#10b981] hover:opacity-80 transition-opacity"
            />
          </div>

          <div className="flex items-center gap-2 font-display text-white text-base font-semibold tracking-tight">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <span>RetiPath-AI</span>
          </div>

          <div className="hidden md:flex items-center gap-4 ml-6 text-xs text-[#94a3b8] font-mono">
            <span>ID: <strong className="text-white font-medium">#PT-88294</strong></span>
            <span className="text-[#334155]">|</span>
            <span>Age: <strong className="text-white font-medium">64</strong></span>
            <span className="text-[#334155]">|</span>
            <span>Gender: <strong className="text-white font-medium">F</strong></span>
            <span className="text-[#334155]">|</span>
            <span>Triage Status: <span className="text-red-400 font-semibold">{triageStatus}</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#7f1d1d]/40 border border-[#ef4444]/40 text-[#fca5a5] text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Triage Status: {triageStatus} {triageStatus === 'High Priority' ? 'Referral' : ''}</span>
          </div>

          {onBackToPortfolio && (
            <button
              onClick={onBackToPortfolio}
              className="px-2.5 py-1 text-xs text-[#94a3b8] hover:text-white hover:bg-[#232a39] rounded transition-colors ml-2"
            >
              Exit to Portfolio
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left 8 Cols: Dual Retinal Imaging Viewports */}
        <div className="lg:col-span-8 flex flex-col border-r border-[#252b38] bg-[#0c0e14] overflow-hidden">
          {/* Section Header */}
          <div className="h-10 px-4 bg-[#141822] border-b border-[#252b38] flex items-center justify-between text-xs">
            <span className="font-semibold text-white tracking-wide">Imagery & AI Analysis</span>
            <div className="flex items-center gap-3 text-[#94a3b8]">
              <button 
                onClick={() => setShowHeatmap(!showHeatmap)} 
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${showHeatmap ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-[#1e2433] text-gray-400'}`}
              >
                Heatmap: {showHeatmap ? 'ON' : 'OFF'}
              </button>
              <button 
                onClick={() => setShowAnnotations(!showAnnotations)} 
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${showAnnotations ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-[#1e2433] text-gray-400'}`}
              >
                Bounding Boxes: {showAnnotations ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Dual Viewports Split Canvas */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-3 overflow-hidden bg-[#090b10] items-center justify-center">
            {/* Viewport 1: Raw Fundus Photograph */}
            <div className="h-full flex flex-col bg-[#12151e] rounded-lg border border-[#232a3b] overflow-hidden relative group">
              <div className="px-3 py-1.5 bg-[#171c28] border-b border-[#232a3b] flex items-center justify-between text-[11px] text-[#94a3b8]">
                <span className="font-medium text-gray-200">Retinal Fundus Photograph</span>
                <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono bg-black/40 px-1 rounded">OD (Right Eye)</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-3 relative overflow-hidden bg-black">
                <div 
                  className="relative w-full aspect-square max-w-[420px] rounded-full overflow-hidden border border-[#2a3449] shadow-2xl transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  <img 
                    src={retinalImgUrl} 
                    alt="Retinal Fundus Photograph" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette circle mask */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>
              </div>

              <div className="px-3 py-1 bg-[#171c28] border-t border-[#232a3b] flex items-center justify-between text-[11px] text-[#64748b]">
                <span>50° Field of View</span>
                <span>4096 × 4096 px</span>
              </div>
            </div>

            {/* Viewport 2: AI Segmentation & Grad-CAM Heatmap Annotation */}
            <div className="h-full flex flex-col bg-[#12151e] rounded-lg border border-[#232a3b] overflow-hidden relative group">
              <div className="px-3 py-1.5 bg-[#171c28] border-b border-[#232a3b] flex items-center justify-between text-[11px] text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200">AI Segmentation & Annotation</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-indigo-400">Grad-CAM v3</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-3 relative overflow-hidden bg-black">
                <div 
                  className="relative w-full aspect-square max-w-[420px] rounded-full overflow-hidden border border-[#2a3449] shadow-2xl transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Base Retinal image */}
                  <img 
                    src={retinalImgUrl} 
                    alt="AI Segmentation View" 
                    className="w-full h-full object-cover filter brightness-95"
                    referrerPolicy="no-referrer"
                  />

                  {/* Grad-CAM Heatmap Overlay simulation */}
                  {showHeatmap && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
                      style={{ opacity: heatmapOpacity }}
                    >
                      {/* Thermal gradient hotspots */}
                      <div className="absolute top-[20%] left-[52%] w-24 h-24 rounded-full bg-gradient-to-r from-red-600 via-yellow-500 to-transparent blur-md opacity-85" />
                      <div className="absolute top-[28%] left-[60%] w-20 h-20 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-transparent blur-md opacity-90" />
                      <div className="absolute top-[42%] left-[64%] w-18 h-18 rounded-full bg-gradient-to-r from-red-600 via-yellow-400 to-transparent blur-sm opacity-85" />
                      <div className="absolute top-[54%] left-[58%] w-24 h-28 rounded-full bg-gradient-to-br from-red-600 via-amber-400 to-transparent blur-md opacity-90" />
                      <div className="absolute top-[64%] left-[46%] w-28 h-20 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-transparent blur-md opacity-75" />
                      <div className="absolute top-[32%] left-[38%] w-40 h-40 rounded-full bg-blue-600/20 blur-xl" />
                    </div>
                  )}

                  {/* Interactive Bounding Boxes */}
                  {showAnnotations && annotations.map((box) => (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box.id === selectedBox ? null : box.id)}
                      className={`absolute border border-dashed cursor-pointer transition-all duration-150 z-10 ${
                        selectedBox === box.id 
                          ? 'border-white bg-white/10 ring-2 ring-white/50' 
                          : 'border-white/80 hover:border-yellow-300 bg-black/10'
                      }`}
                      style={{
                        top: box.top,
                        left: box.left,
                        width: box.width,
                        height: box.height,
                      }}
                    >
                      <span className="absolute -top-5 left-0 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white whitespace-nowrap shadow border border-white/20">
                        {box.label} ({box.confidence}%)
                      </span>
                    </div>
                  ))}

                  {/* Dark edge vignette */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.85)] pointer-events-none" />
                </div>
              </div>

              {/* Zoom & Opacity Sliders Bar */}
              <div className="px-3 py-1.5 bg-[#171c28] border-t border-[#232a3b] flex items-center justify-between text-[11px] text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <input 
                    type="range" 
                    min="80" 
                    max="180" 
                    value={zoomLevel} 
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="w-24 h-1 bg-[#2e374d] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="font-mono text-[10px] text-gray-300 w-8">{zoomLevel}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Heatmap</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={heatmapOpacity * 100} 
                    onChange={(e) => setHeatmapOpacity(Number(e.target.value) / 100)}
                    className="w-20 h-1 bg-[#2e374d] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Canvas Toolset Strip */}
          <div className="h-12 bg-[#121622] border-t border-[#252b38] px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'pointer', icon: MousePointer, label: 'Select' },
                { id: 'pen', icon: PenTool, label: 'Annotate' },
                { id: 'move', icon: Move, label: 'Pan' },
                { id: 'zoom-in', icon: ZoomIn, label: 'Zoom In', action: () => setZoomLevel(z => Math.min(200, z + 15)) },
                { id: 'zoom-out', icon: ZoomOut, label: 'Zoom Out', action: () => setZoomLevel(z => Math.max(70, z - 15)) },
                { id: 'reset', icon: RotateCcw, label: 'Reset View', action: () => setZoomLevel(100) },
              ].map(t => {
                const IconComponent = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (t.action) t.action();
                      else setActiveTool(t.id);
                    }}
                    title={t.label}
                    className={`p-2 rounded-md transition-colors ${
                      activeTool === t.id && !t.action
                        ? 'bg-indigo-600 text-white' 
                        : 'text-[#94a3b8] hover:text-white hover:bg-[#202737]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#64748b] font-mono">
              <span>Selected: {selectedBox ? annotations.find(a => a.id === selectedBox)?.label : 'None'}</span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Diagnostics, XAI Radar & Action Panels */}
        <div className="lg:col-span-4 flex flex-col bg-[#141824] overflow-y-auto">
          {/* Header */}
          <div className="h-10 px-4 bg-[#181d2c] border-b border-[#252b38] flex items-center justify-between text-xs font-semibold text-white">
            <span>Diagnostics & Confidence</span>
            <span className="text-[10px] text-indigo-400 font-mono">AI ASSISTED</span>
          </div>

          <div className="p-4 space-y-5 flex-1">
            {/* Primary Confidence Bar */}
            <div className="bg-[#191f30] p-3.5 rounded-lg border border-[#2b354c]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-200">Diabetic Retinopathy (DR)</span>
                <span className="text-xs font-semibold text-indigo-300 font-mono">{drConfidence}%</span>
              </div>
              <div className="text-[11px] text-amber-300 font-medium mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Referral Warranted (Severe NPDR)</span>
              </div>
              <div className="w-full h-2.5 bg-[#0f121b] rounded-full overflow-hidden p-0.5 border border-[#2b354c]">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                  style={{ width: `${drConfidence}%` }}
                />
              </div>

              {/* Secondary Metric 1: Macular Edema */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#94a3b8]">Macular Edema</span>
                  <span className="font-mono text-gray-300">41.2%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0f121b] rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '41.2%' }} />
                </div>
              </div>

              {/* Secondary Metric 2: Glaucoma */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#94a3b8]">Glaucoma</span>
                  <span className="font-mono text-gray-300">12.5%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0f121b] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500/70 rounded-full" style={{ width: '12.5%' }} />
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-[#64748b] font-mono mt-3 px-0.5">
                <span>0%</span>
                <span>20%</span>
                <span>40%</span>
                <span>60%</span>
                <span>80%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Explainable AI (XAI) Insight Radar */}
            <div className="bg-[#191f30] p-3.5 rounded-lg border border-[#2b354c]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-200">Explainable AI (XAI) Insight</span>
                <Info className="w-3.5 h-3.5 text-[#64748b] hover:text-white cursor-pointer" />
              </div>

              {/* Interactive SVG Radar Chart */}
              <div className="w-full flex items-center justify-center py-2">
                <svg width="240" height="190" className="overflow-visible">
                  {/* Concentric reference polygons */}
                  <polygon points="120,40 180,80 160,150 80,150 60,80" fill="none" stroke="#2a354c" strokeWidth="1" />
                  <polygon points="120,60 160,90 145,135 95,135 80,90" fill="none" stroke="#253045" strokeWidth="1" />
                  <polygon points="120,80 140,95 135,120 105,120 100,95" fill="none" stroke="#202a3d" strokeWidth="1" />

                  {/* Spokes */}
                  <line x1="120" y1="100" x2="120" y2="40" stroke="#2a354c" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="120" y1="100" x2="180" y2="80" stroke="#2a354c" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="120" y1="100" x2="160" y2="150" stroke="#2a354c" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="120" y1="100" x2="80" y2="150" stroke="#2a354c" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="120" y1="100" x2="60" y2="80" stroke="#2a354c" strokeWidth="1" strokeDasharray="2,2" />

                  {/* Shaded AI Feature polygon */}
                  <polygon 
                    points="120,45 175,82 145,145 92,130 65,85" 
                    fill="rgba(99, 102, 241, 0.25)" 
                    stroke="#818cf8" 
                    strokeWidth="2" 
                  />

                  {/* Interactive Nodes */}
                  {radarPoints.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="3.5" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5" />
                      <text 
                        x={p.x} 
                        y={p.y > 100 ? p.y + 14 : p.y - 7} 
                        textAnchor="middle" 
                        fill="#94a3b8" 
                        fontSize="9.5" 
                        fontFamily="monospace"
                      >
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Key Features Bullet List */}
              <div className="mt-2 pt-2 border-t border-[#232b3c] text-xs">
                <span className="text-[#94a3b8] font-medium block mb-1">Key features identified:</span>
                <p className="text-gray-300 leading-relaxed font-sans text-[12px]">
                  Microaneurysms in the temporal arcade, hard exudates in macular region.
                </p>
              </div>
            </div>

            {/* Action Buttons Cluster */}
            <div className="space-y-2 pt-2">
              <button 
                onClick={() => setShowReportModal(true)}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setShowReferralModal(true)}
                  className="py-2 px-3 rounded-lg bg-[#222938] hover:bg-[#2c3547] text-gray-200 font-medium text-xs border border-[#323d53] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Refer to Specialist</span>
                </button>

                <button 
                  onClick={() => setShowOverrideModal(true)}
                  className="py-2 px-3 rounded-lg bg-[#222938] hover:bg-[#2c3547] text-gray-200 font-medium text-xs border border-[#323d53] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Override AI</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="h-8 bg-[#121622] border-t border-[#252b38] px-4 flex items-center justify-between text-[10px] text-[#64748b] font-mono">
            <span>AI Model: v3.4.1</span>
            <span>Processing Time: 1.4s</span>
          </div>
        </div>
      </div>

      {/* MODAL 1: Clinical Report Generation */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181d2a] border border-[#2f394f] rounded-xl max-w-2xl w-full p-6 text-gray-200 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#2d374d]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-white text-base font-semibold">Ophthalmological Triage Report</h3>
                  <span className="text-xs text-[#94a3b8] font-mono">Report ID: RPT-2026-88294</span>
                </div>
              </div>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3 bg-[#11141e] p-3 rounded-lg font-mono text-[11px]">
                <div><span className="text-gray-400">Patient:</span> #PT-88294</div>
                <div><span className="text-gray-400">DOB/Age:</span> 64 Y / Female</div>
                <div><span className="text-gray-400">Eye Examined:</span> Right (OD)</div>
              </div>

              <div className="border border-[#283247] p-3 rounded-lg">
                <h4 className="text-indigo-400 font-semibold mb-1">Algorithmic Assessment Summary</h4>
                <p className="text-gray-300 leading-relaxed">
                  High-probability Severe Non-Proliferative Diabetic Retinopathy (NPDR) detected with 92.4% model confidence. Multiple microaneurysms, blot hemorrhages, and lipid exudates localized within temporal vascular arcade. Macular edema risk flagged at 41.2%.
                </p>
              </div>

              <div>
                <label className="text-gray-300 font-medium block mb-1">Attending Clinician Notes:</label>
                <textarea 
                  value={clinicalNotes} 
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="w-full h-20 bg-[#11141e] border border-[#2b354b] rounded p-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2d374d]">
              <button 
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded text-xs text-gray-300 hover:bg-[#252e42]"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert('Report generated and downloaded as PDF!');
                  setShowReportModal(false);
                }}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export & Print PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Refer to Specialist */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181d2a] border border-[#2f394f] rounded-xl max-w-lg w-full p-6 text-gray-200 shadow-2xl relative">
            <h3 className="font-display text-white text-base font-semibold mb-2">Priority Specialist Referral</h3>
            <p className="text-xs text-gray-400 mb-4">Route patient #PT-88294 to retinal fellowship trained ophthalmologist.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Referral Urgency</label>
                <select className="w-full bg-[#11141e] border border-[#2b354b] rounded p-2 text-white">
                  <option>Urgent — Within 48 hours (Recommended)</option>
                  <option>Semi-Urgent — Within 2 weeks</option>
                  <option>Routine Checkup — Within 3 months</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Designated Department / Clinic</label>
                <select className="w-full bg-[#11141e] border border-[#2b354b] rounded p-2 text-white">
                  <option>Vitreoretinal Specialty Clinic — Room 402</option>
                  <option>Diabetic Eye Care Program — Memorial Center</option>
                  <option>Cornea & Glaucoma Associates</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-3 border-t border-[#2d374d]">
              <button onClick={() => setShowReferralModal(false)} className="px-4 py-2 text-xs text-gray-400 hover:text-white">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Referral successfully dispatched to Vitreoretinal Specialty Clinic.');
                  setShowReferralModal(false);
                }}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Referral</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Override AI */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181d2a] border border-[#2f394f] rounded-xl max-w-md w-full p-6 text-gray-200 shadow-2xl relative">
            <h3 className="font-display text-white text-base font-semibold mb-2">Physician Override Control</h3>
            <p className="text-xs text-gray-400 mb-4">Adjust algorithmic assessment based on clinical diagnostic discretion.</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 block mb-1 font-medium">Triage Priority Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['High Priority', 'Moderate', 'Routine'] as const).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setTriageStatus(lvl)}
                      className={`p-2 rounded border text-center transition-all ${
                        triageStatus === lvl 
                          ? 'bg-indigo-600 text-white border-indigo-500' 
                          : 'bg-[#121622] text-gray-400 border-[#283249]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Calibrated DR Confidence (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={drConfidence}
                  onChange={(e) => setDrConfidence(Number(e.target.value))}
                  className="w-full bg-[#11141e] border border-[#2b354b] rounded p-2 text-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-3 border-t border-[#2d374d]">
              <button onClick={() => setShowOverrideModal(false)} className="px-4 py-2 text-xs text-gray-400 hover:text-white">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowOverrideModal(false);
                }}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Override</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
