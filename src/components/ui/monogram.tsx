import React from 'react';

interface MonogramProps {
  className?: string;
  size?: number;
}

export const AnujMonogram: React.FC<MonogramProps> = ({ 
  className = "w-9 h-9",
  size = 36 
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#3b5bff] to-[#60a5fa] opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300" />
      
      {/* Outer Glass Bezel */}
      <div className="relative w-full h-full rounded-xl bg-[#141418] border border-white/15 shadow-inner flex items-center justify-center overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b5bff_1px,transparent_1px)] [background-size:6px_6px]" />
        
        {/* Interlocking AU Modern Geometric Logo */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="auGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#bac3ff" />
              <stop offset="100%" stopColor="#3b5bff" />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b5bff" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>

          {/* Letter 'A' Stylized Apex */}
          <path 
            d="M20 7L29 25H24L20 16L16 25H11L20 7Z" 
            fill="url(#auGrad)" 
          />

          {/* Horizontal Tech Bar */}
          <rect 
            x="14" 
            y="21" 
            width="12" 
            height="2.5" 
            rx="1.25" 
            fill="url(#accentGrad)" 
          />

          {/* Letter 'U' Interlocking Bottom Cradle */}
          <path 
            d="M11 26V30C11 32.7614 13.2386 35 16 35H24C26.7614 35 29 32.7614 29 30V26H25V30C25 30.5523 24.5523 31 24 31H16C15.4477 31 15 30.5523 15 30V26H11Z" 
            fill="url(#auGrad)" 
          />

          {/* Precision Center Core Dot */}
          <circle cx="20" cy="27" r="1.5" fill="#3b5bff" />
        </svg>
      </div>
    </div>
  );
};

export default AnujMonogram;
