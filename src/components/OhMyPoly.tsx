import React, { useState } from 'react';
import { 
  Calendar, 
  Bell, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  X,
  Info
} from 'lucide-react';

interface OhMyPolyProps {
  onBackToPortfolio?: () => void;
  isStandalone?: boolean;
}

interface CourseAttendance {
  code: string;
  name: string;
  attended: number;
  total: number;
  targetPercent: number;
  badge: 'Safe' | 'At Risk' | 'On Track';
  color: string;
}

export const OhMyPoly: React.FC<OhMyPolyProps> = ({ onBackToPortfolio, isStandalone = false }) => {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Attendance' | 'Timetable' | 'Analytics'>('Attendance');
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [selectedCourseModal, setSelectedCourseModal] = useState<string | null>(null);

  // Initial Attendance data matching Image 4
  const [courses, setCourses] = useState<CourseAttendance[]>([
    {
      code: 'CS-301',
      name: 'Computer Science (CS-301)',
      attended: 35,
      total: 38, // 35/38 = 92%
      targetPercent: 75,
      badge: 'Safe',
      color: '#3b82f6',
    },
    {
      code: 'AI-204',
      name: 'Artificial Intelligence (AI-204)',
      attended: 28,
      total: 36, // 28/36 = 77.7% ≈ 78%
      targetPercent: 75,
      badge: 'At Risk',
      color: '#6366f1',
    },
    {
      code: 'MAT-102',
      name: 'Mathematics (MAT-102)',
      attended: 34,
      total: 40, // 34/40 = 85%
      targetPercent: 75,
      badge: 'On Track',
      color: '#8b5cf6',
    },
    {
      code: 'PHY-105',
      name: 'Physics (PHY-105)',
      attended: 26,
      total: 30, // 86.6%
      targetPercent: 75,
      badge: 'Safe',
      color: '#0ea5e9',
    }
  ]);

  // Timetable grid cells matching Image 4
  const scheduleData = [
    {
      time: '8:00',
      mon: { code: 'CS-301', room: 'Buil 3021', bg: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]' },
      tue: null,
      wed: { code: 'CS-301', room: 'Buil 3021', bg: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]' },
      thu: null,
      fri: { code: 'CS-301', room: 'Buil 3021', bg: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]' },
    },
    {
      time: '9:00',
      mon: { code: 'CS-301', room: 'Buil 3011', bg: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]' },
      tue: { code: 'AI-204', room: 'Buil 0003', bg: 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]' },
      wed: { code: 'AI-204', room: 'Buil 0004', bg: 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]' },
      thu: { code: 'CS-301', room: 'Buil 3011', bg: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]' },
      fri: null,
    },
    {
      time: '10:00',
      mon: null,
      tue: { code: 'AI-204', room: 'Buil 0003', bg: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]' },
      wed: null,
      thu: { code: 'AI-204', room: 'Buil 0003', bg: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]' },
      fri: { code: 'CS-301', room: 'Buil 3021', bg: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]' },
    },
    {
      time: '12:00',
      mon: { code: 'MAT-102', room: 'Buil 0011', bg: 'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]' },
      tue: { code: 'MAT-102', room: 'Buil 0011', bg: 'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]' },
      wed: { code: 'MAT-102', room: 'Buil 0011', bg: 'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]' },
      thu: { code: 'MAT-102', room: 'Buil 0011', bg: 'bg-[#ffedd5] text-[#9a3412] border-[#fed7aa]' },
      fri: null,
    },
    {
      time: '13:00',
      mon: { code: 'PHY-105', room: 'Buil 0023', bg: 'bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]' },
      tue: { code: 'PHY-105', room: 'Buil 0003', bg: 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]' },
      wed: null,
      thu: { code: 'MAT-105', room: 'Buil 0003', bg: 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]' },
      fri: { code: 'PHY-105', room: 'Buil 0023', bg: 'bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]' },
    },
    {
      time: '14:00',
      mon: null,
      tue: { code: 'PHY-105', room: 'Buil 0021', bg: 'bg-[#ccfbf1] text-[#115e59] border-[#99f6e4]' },
      wed: null,
      thu: { code: 'PHY-105', room: 'Buil 0021', bg: 'bg-[#ccfbf1] text-[#115e59] border-[#99f6e4]' },
      fri: null,
    },
    {
      time: '15:00',
      mon: null,
      tue: null,
      wed: null,
      thu: null,
      fri: null,
    }
  ];

  // Helper to calculate how many bunks allowed while staying >= 75%
  // Formula: floor((attended - 0.75 * total) / 0.75)
  const calculateSafeBunks = (attended: number, total: number) => {
    let bunks = 0;
    while ((attended / (total + bunks + 1)) >= 0.75) {
      bunks++;
    }
    return Math.max(0, bunks);
  };

  const handleSimulateAttendance = (code: string, deltaAttended: number, deltaTotal: number) => {
    setCourses(prev => prev.map(c => {
      if (c.code === code) {
        const newAttended = Math.max(0, c.attended + deltaAttended);
        const newTotal = Math.max(newAttended, c.total + deltaTotal);
        const pct = Math.round((newAttended / newTotal) * 100);
        let badge: 'Safe' | 'At Risk' | 'On Track' = 'Safe';
        if (pct < 75) badge = 'At Risk';
        else if (pct < 85) badge = 'At Risk';
        else if (pct <= 88) badge = 'On Track';
        return {
          ...c,
          attended: newAttended,
          total: newTotal,
          badge
        };
      }
      return c;
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] text-[#1f2937] font-sans flex flex-col p-4 sm:p-6 select-none">
      {/* Top Application Container Card */}
      <div className="max-w-[1360px] w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Top Header Bar */}
        <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-gray-900">OhMyPoly</span>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
              {(['Dashboard', 'Attendance', 'Timetable', 'Analytics'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-1 relative transition-colors ${
                    activeTab === tab ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right User Lockup */}
          <div className="flex items-center gap-4">
            <button className="relative p-1.5 text-gray-400 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" 
                alt="Student Profile" 
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            </div>

            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="ml-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Exit to Portfolio
              </button>
            )}
          </div>
        </header>

        {/* Workspace Grid Layout */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#fbfcfd]">
          {/* Left Column (Cols 1-6): Weekly Lecture Timetable */}
          <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            {/* Timetable Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-gray-900 text-base">Weekly university lecture timetable</h2>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center border border-gray-200 rounded-md text-xs font-medium text-gray-600 bg-white shadow-2xs">
                  <button 
                    onClick={() => setWeekOffset(w => w - 1)}
                    className="p-1.5 hover:bg-gray-50 border-r border-gray-200"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-mono">Week {3 + weekOffset}</span>
                  <button 
                    onClick={() => setWeekOffset(w => w + 1)}
                    className="p-1.5 hover:bg-gray-50 border-l border-gray-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="px-3 py-1 rounded-md bg-[#2563eb] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Active ▾</span>
                </div>
              </div>
            </div>

            {/* Matrix Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-gray-500 font-medium border-b border-gray-100">
                    <th className="py-2.5 px-2 text-left font-normal w-12">Time</th>
                    <th className="py-2.5 px-2 text-center font-normal">Mon</th>
                    <th className="py-2.5 px-2 text-center font-normal">Tue</th>
                    <th className="py-2.5 px-2 text-center font-normal">Wed</th>
                    <th className="py-2.5 px-2 text-center font-normal">Thu</th>
                    <th className="py-2.5 px-2 text-center font-normal">Fri</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {scheduleData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="py-2 px-1 text-gray-400 font-mono text-[11px] align-top">{row.time}</td>
                      
                      {/* Mon */}
                      <td className="p-1 text-center align-middle">
                        {row.mon ? (
                          <div 
                            onClick={() => setSelectedCourseModal(row.mon.code)}
                            className={`p-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer shadow-2xs hover:scale-[1.02] transition-transform ${row.mon.bg}`}
                          >
                            <div>{row.mon.code}</div>
                            <div className="text-[9px] font-normal opacity-80">{row.mon.room}</div>
                          </div>
                        ) : null}
                      </td>

                      {/* Tue */}
                      <td className="p-1 text-center align-middle">
                        {row.tue ? (
                          <div 
                            onClick={() => setSelectedCourseModal(row.tue.code)}
                            className={`p-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer shadow-2xs hover:scale-[1.02] transition-transform ${row.tue.bg}`}
                          >
                            <div>{row.tue.code}</div>
                            <div className="text-[9px] font-normal opacity-80">{row.tue.room}</div>
                          </div>
                        ) : null}
                      </td>

                      {/* Wed */}
                      <td className="p-1 text-center align-middle">
                        {row.wed ? (
                          <div 
                            onClick={() => setSelectedCourseModal(row.wed.code)}
                            className={`p-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer shadow-2xs hover:scale-[1.02] transition-transform ${row.wed.bg}`}
                          >
                            <div>{row.wed.code}</div>
                            <div className="text-[9px] font-normal opacity-80">{row.wed.room}</div>
                          </div>
                        ) : null}
                      </td>

                      {/* Thu */}
                      <td className="p-1 text-center align-middle">
                        {row.thu ? (
                          <div 
                            onClick={() => setSelectedCourseModal(row.thu.code)}
                            className={`p-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer shadow-2xs hover:scale-[1.02] transition-transform ${row.thu.bg}`}
                          >
                            <div>{row.thu.code}</div>
                            <div className="text-[9px] font-normal opacity-80">{row.thu.room}</div>
                          </div>
                        ) : null}
                      </td>

                      {/* Fri */}
                      <td className="p-1 text-center align-middle">
                        {row.fri ? (
                          <div 
                            onClick={() => setSelectedCourseModal(row.fri.code)}
                            className={`p-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer shadow-2xs hover:scale-[1.02] transition-transform ${row.fri.bg}`}
                          >
                            <div>{row.fri.code}</div>
                            <div className="text-[9px] font-normal opacity-80">{row.fri.room}</div>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>Click any lecture tile to simulate attendance changes</span>
              <span className="font-mono text-blue-600">Spring Semester '26</span>
            </div>
          </div>

          {/* Middle Column (Cols 7-9): Circular Percentage Gauges */}
          <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <h2 className="font-display font-semibold text-gray-900 text-base mb-4">Circular Percentage Gauges</h2>

            <div className="space-y-6 flex-1 flex flex-col justify-around">
              {/* Gauge 1: Computer Science (CS-301) */}
              {courses.slice(0, 3).map((course) => {
                const pct = Math.round((course.attended / course.total) * 100);
                const safeBunks = calculateSafeBunks(course.attended, course.total);

                return (
                  <div key={course.code} className="flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 flex items-center justify-center mb-1">
                      {/* SVG Gauge */}
                      <svg className="w-28 h-28 -rotate-90">
                        <circle cx="56" cy="56" r="44" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="44" 
                          stroke={pct >= 85 ? '#3b82f6' : pct >= 75 ? '#818cf8' : '#f59e0b'} 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray="276"
                          strokeDashoffset={276 - (276 * pct) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                      </svg>
                      {/* Inner percentage */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display text-2xl font-bold text-gray-900 leading-none">{pct}%</span>
                      </div>

                      {/* Status Badge floating */}
                      <span className={`absolute top-1 -right-3 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        course.badge === 'Safe' 
                          ? 'bg-[#dcfce7] text-[#15803d]' 
                          : course.badge === 'At Risk' 
                            ? 'bg-[#ffedd5] text-[#c2410c]' 
                            : 'bg-[#dcfce7] text-[#15803d]'
                      }`}>
                        {course.badge}
                      </span>
                    </div>

                    <h3 className="font-medium text-xs text-gray-800">{course.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 font-mono">
                      <span>{course.attended}/{course.total} attended</span>
                      <span>·</span>
                      <span className="text-blue-600 font-medium">{safeBunks} safe bunks</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Cols 10-12): Attendance Projection & Bunk Calculator */}
          <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
            {/* Top Card: Attendance Projection */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="mb-2">
                <h2 className="font-display font-semibold text-gray-900 text-sm">Attendance projection</h2>
                <p className="text-[11px] text-gray-500 leading-snug">
                  How many classes student can safely miss while staying above 75%
                </p>
              </div>

              {/* Attendance Projection Graph */}
              <div className="w-full pt-2">
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mb-1">
                  <span>90%</span>
                  <span></span>
                </div>
                
                <div className="h-28 w-full relative">
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] text-gray-300 font-mono">
                    <div className="border-b border-gray-100 w-full" />
                    <div className="border-b border-gray-100 w-full" />
                    <div className="border-b border-gray-100 w-full" />
                    <div className="border-b border-gray-100 w-full" />
                  </div>

                  {/* Smooth SVG Line Chart */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 90" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Shaded Area Under Curve */}
                    <path 
                      d="M 10,65 Q 40,75 70,55 T 130,42 T 170,28 T 195,35 L 195,90 L 10,90 Z" 
                      fill="url(#chartGrad)" 
                    />

                    {/* Smooth Spline Curve */}
                    <path 
                      d="M 10,65 Q 40,75 70,55 T 130,42 T 170,28 T 195,35" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2.5" 
                    />

                    {/* Focal Dot at May (170, 28) */}
                    <circle cx="170" cy="28" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>

                {/* X-Axis Month Labels */}
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1 px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* Bottom Card: Bunk Calculator */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-display font-semibold text-gray-900 text-sm">Bunk Calculator</h2>
                  <Settings className="w-3.5 h-3.5 text-blue-600 cursor-pointer" />
                </div>
                <p className="text-[11px] text-gray-500 leading-snug mb-3">
                  How many classes you can safely miss while staying above 75%.
                </p>

                {/* Bunk Calculation Row items matching Image 4 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#fffbeb] border border-[#fef3c7]">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-800">AI-204: 1 safe bunk</span>
                    </div>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#fffbeb] border border-[#fef3c7]">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-800">AI-204: 2 safe bunk</span>
                    </div>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#fffbeb] border border-[#fef3c7]">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-800">MAT-102: 3 safe bunks</span>
                    </div>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#fffbeb] border border-[#fef3c7]">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-800">MAT-102: 3 safe bunks</span>
                    </div>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Quick simulation helper */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Live Quota Optimizer</span>
                <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  75% Threshold Enforced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Course Quick Simulator */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-gray-900 text-sm">
                Simulate: {selectedCourseModal}
              </h3>
              <button onClick={() => setSelectedCourseModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {(() => {
              const course = courses.find(c => c.code === selectedCourseModal) || courses[0];
              const pct = Math.round((course.attended / course.total) * 100);
              const safeBunks = calculateSafeBunks(course.attended, course.total);

              return (
                <div className="space-y-4 text-xs">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-gray-500 text-[11px]">Current Attendance</div>
                      <div className="text-lg font-bold text-gray-900">{pct}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 text-[11px]">Allowable Skips</div>
                      <div className="text-lg font-bold text-blue-600">{safeBunks} Classes</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-600 block mb-1.5 font-medium">Test attendance scenario:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleSimulateAttendance(course.code, 1, 1)}
                        className="p-2 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium flex items-center justify-center gap-1 border border-emerald-200"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Attend Lecture (+1)</span>
                      </button>

                      <button 
                        onClick={() => handleSimulateAttendance(course.code, 0, 1)}
                        className="p-2 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium flex items-center justify-center gap-1 border border-amber-200"
                      >
                        <Minus className="w-3 h-3" />
                        <span>Skip / Bunk (-1)</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex justify-end">
                    <button 
                      onClick={() => setSelectedCourseModal(null)}
                      className="px-4 py-1.5 rounded bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs"
                    >
                      Done
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
