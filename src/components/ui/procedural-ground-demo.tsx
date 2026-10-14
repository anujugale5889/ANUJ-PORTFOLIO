import React from 'react';
import ProceduralGroundBackground from '@/components/ui/procedural-ground-background';

export default function ProceduralGroundDemo() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-white">
      <ProceduralGroundBackground />
      <div className="relative z-10 text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-lg mx-4">
        <h1 className="font-display text-3xl font-bold mb-2">Procedural Ground WebGL</h1>
        <p className="font-mono text-xs text-indigo-300 mb-4">Topographic Neon Contours & Kinetic Ground Perspective</p>
        <p className="text-sm text-gray-300">
          Fragment-shader accelerated terrain simulation running with real-time procedural noise and perspective depth.
        </p>
      </div>
    </div>
  );
}
