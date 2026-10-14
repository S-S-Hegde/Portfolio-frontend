import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Wallet, Cpu, Activity, Eye, Terminal, Globe, TrendingUp } from 'lucide-react';

interface ProjectMockupVisualProps {
  projectId: string;
  accentColor: string;
  category: string;
}

export const ProjectMockupVisual: React.FC<ProjectMockupVisualProps> = ({
  projectId,
  accentColor,
  category,
}) => {
  if (projectId === 'veriproof') {
    return (
      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#050811] border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-500 flex flex-col justify-between p-3.5 select-none">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(#00F0FF 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Top Visual HUD */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ACE VISION GUARD // 30 FPS</span>
          </div>
          <span className="text-slate-400 font-mono">VP-TOKEN: #892F</span>
        </div>

        {/* Center Forensic Reticle & Biometric Wireframe */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="relative w-24 h-24 rounded-full border border-cyan-500/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            {/* Rotating reticle ring */}
            <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center backdrop-blur-md">
              <ShieldCheck className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_10px_#00F0FF]" />
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
          <span className="text-slate-300">TRUST SCORE: 98.4%</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Activity className="w-3 h-3" /> VERIFIED
          </span>
        </div>
      </div>
    );
  }

  if (projectId === 'tourease') {
    return (
      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#050C0A] border border-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500 flex flex-col justify-between p-3.5 select-none">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-teal-600/10 to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Top HUD */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
            <Globe className="w-3 h-3" />
            <span>GROK AI ROUTE VISUALIZER</span>
          </div>
          <span className="text-slate-400">WAYPOINTS: 14</span>
        </div>

        {/* Center Compass & Topo Nodes */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="relative w-24 h-24 rounded-full border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 rounded-full border-r-2 border-emerald-400/80 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-md">
              <Compass className="w-8 h-8 text-emerald-300 drop-shadow-[0_0_10px_#10B981]" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
          <span className="text-slate-300">48HR GROK PIPELINE</span>
          <span className="text-cyan-300 font-bold">MONGODB CLUSTER</span>
        </div>
      </div>
    );
  }

  // Expense Tracker / Default
  return (
    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#0D0904] border border-amber-500/20 group-hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between p-3.5 select-none">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-orange-600/10 to-transparent pointer-events-none" />

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300">
          <TrendingUp className="w-3 h-3" />
          <span>REAL-TIME AGGREGATION</span>
        </div>
        <span className="text-slate-400">JWT AUTH</span>
      </div>

      {/* Center Simulated Sparkline Area Chart */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="relative w-28 h-20 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {/* Dynamic SVG Area Graph */}
          <svg viewBox="0 0 100 40" className="w-full h-14 overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0 35 Q 25 10, 50 25 T 100 5 L 100 40 L 0 40 Z"
              fill="url(#chartGrad)"
            />
            <path
              d="M0 35 Q 25 10, 50 25 T 100 5"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
            />
            <circle cx="100" cy="5" r="3" fill="#FBBF24" className="animate-ping" />
            <circle cx="100" cy="5" r="2.5" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
        <span className="text-slate-300">MONTHLY ANALYTICS</span>
        <span className="text-amber-400 font-bold">CHART.JS LIVE</span>
      </div>
    </div>
  );
};
