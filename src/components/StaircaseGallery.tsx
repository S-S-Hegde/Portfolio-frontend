import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export interface JourneyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  phase: 'school' | 'pucollege' | 'engineering' | 'projects';
  phaseLabel: string;
  phaseIcon: string;
  accentColor: string;
}

const HelixCard: React.FC<{ 
  item: JourneyItem; 
  index: number; 
  progress: MotionValue<number>; 
  total: number 
}> = ({ item, index, progress, total }) => {
  // progress goes from 0 to 1 over the whole scroll range.
  const activePoint = index / Math.max(1, total - 1);
  
  // Calculate relative distance from active point (0 = active)
  const distance = useTransform(progress, p => (p - activePoint) * (total - 1));

  // The 3D Helix transformations
  const rotateY = useTransform(distance, [-2, -1, 0, 1, 2], [70, 35, 0, -35, -70]);
  const translateY = useTransform(distance, [-2, -1, 0, 1, 2], [-450, -250, 0, 250, 450]);
  const translateZ = useTransform(distance, [-2, -1, 0, 1, 2], [-400, -200, 50, -200, -400]);
  const scale = useTransform(distance, [-2, -1, 0, 1, 2], [0.65, 0.85, 1, 0.85, 0.65]);
  const opacity = useTransform(distance, [-1.5, -0.8, 0, 0.8, 1.5], [0, 0.4, 1, 0.4, 0]);
  const zIndex = useTransform(distance, [-2, -1, -0.5, 0, 0.5, 1, 2], [0, 10, 20, 30, 20, 10, 0]);
  const blur = useTransform(distance, [-2, -1, 0, 1, 2], ["blur(12px)", "blur(4px)", "blur(0px)", "blur(4px)", "blur(12px)"]);

  // Calculate opacity for the edge glow so it only glows when active
  const glowOpacity = useTransform(distance, [-0.5, 0, 0.5], [0, 1, 0]);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 md:p-8 backdrop-blur-xl border transform-style-3d"
      style={{
        rotateY,
        y: translateY,
        z: translateZ,
        scale,
        opacity,
        zIndex,
        filter: blur,
        background: `linear-gradient(135deg, rgba(9,14,23,0.9), rgba(9,14,23,0.7))`,
        borderColor: `${item.accentColor}40`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${item.accentColor}20`,
        transformOrigin: "center center",
      }}
    >
      {/* Dynamic Glow Aura */}
      <motion.div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ opacity: glowOpacity, boxShadow: `0 0 50px ${item.accentColor}20` }}
      />
      
      {/* Header Info */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg relative overflow-hidden"
          style={{ background: `${item.accentColor}15`, border: `1px solid ${item.accentColor}40` }}
        >
          <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle, ${item.accentColor}, transparent)` }} />
          <span className="relative z-10">{item.phaseIcon}</span>
        </div>
        <div>
          <div className="text-[11px] font-mono tracking-[0.2em] uppercase mb-1" style={{ color: item.accentColor }}>
            Phase {String(index + 1).padStart(2, '0')} • {item.phaseLabel}
          </div>
          <h4 className="text-2xl md:text-3xl font-black text-white">{item.title}</h4>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm font-semibold mb-3 text-white/90 font-mono bg-white/5 inline-block px-3 py-1 rounded-lg">
        {item.subtitle}
      </p>
      <p className="text-slate-300 text-sm leading-relaxed mb-6 h-20 overflow-hidden line-clamp-4">
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.slice(0, 5).map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ 
              background: `${item.accentColor}12`, 
              color: `${item.accentColor}ee`, 
              border: `1px solid ${item.accentColor}30` 
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const StaircaseGallery: React.FC<{ items: JourneyItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up scroll tracking for the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply a spring for ultra-smooth buttery interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.8
  });

  // Extract exactly 4 distinct cards based on the prompt's request:
  // 1. School, 2. PU College, 3. Engineering College, 4. Projects (combining to 1 if needed, but we can just use the first 4 items or group them)
  // The current items array has 3 education phases and multiple projects.
  // Let's filter to just the 4 core phases.
  const corePhases = items.reduce((acc, item) => {
    if (!acc.find(i => i.phase === item.phase)) {
      acc.push(item);
    }
    return acc;
  }, [] as JourneyItem[]);
  
  // Use the core phases (should be exactly 4 based on the user's prompt).
  const displayItems = corePhases;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${displayItems.length * 100}vh` }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center perspective-[1600px]">
        
        {/* Fixed Title Background */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none w-full px-4">
          <p className="text-xs font-mono tracking-[0.5em] uppercase text-cyan-500/60 mb-3">
            Chronological Journey
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
              The Staircase
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
            Scroll to ascend through the timeline.
          </p>
        </div>

        {/* 3D Helix Scene */}
        <div className="relative w-full max-w-3xl h-full flex items-center justify-center transform-style-3d mt-20">
          {displayItems.map((item, index) => (
            <HelixCard 
              key={item.id} 
              item={item} 
              index={index} 
              progress={smoothProgress} 
              total={displayItems.length} 
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-500 mb-2">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>

      </div>
    </div>
  );
};
