import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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

// ─── Phase Header ───────────────────────────────────────────
const PhaseHeader: React.FC<{ label: string; icon: string; color: string; index: number }> = ({ label, icon, color, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 mb-8"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          border: `1px solid ${color}50`,
          boxShadow: `0 0 30px ${color}15`
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500">
          Phase {String(index + 1).padStart(2, '0')}
        </p>
        <h3
          className="text-2xl md:text-3xl font-black tracking-tight"
          style={{ color }}
        >
          {label}
        </h3>
      </div>
      <div className="flex-1 h-px ml-4" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
    </motion.div>
  );
};

// ─── Staircase Card ─────────────────────────────────────────
const StaircaseCard: React.FC<{
  item: JourneyItem;
  stepIndex: number;
  globalIndex: number;
}> = ({ item, stepIndex, globalIndex }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Staircase offset: each card shifts right and down
  const stairOffsetX = stepIndex * 48; // px shift per step within a phase
  const stairOffsetY = stepIndex * 16;

  // Alternate entrance: even from left, odd from right (for visual variety)
  const enterFromRight = globalIndex % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: enterFromRight ? 80 : -80,
        y: 40,
        scale: 0.92,
        rotateY: enterFromRight ? -8 : 8,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
      } : {}}
      transition={{
        duration: 0.8,
        delay: stepIndex * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{
        marginLeft: `${stairOffsetX}px`,
        marginTop: `${stairOffsetY}px`,
        perspective: '1200px',
      }}
      className="relative mb-6 max-w-xl group"
    >
      {/* Connecting stair line */}
      {stepIndex > 0 && (
        <div
          className="absolute -top-6 -left-12 w-12 h-6"
          style={{
            borderLeft: `2px dashed ${item.accentColor}30`,
            borderBottom: `2px dashed ${item.accentColor}30`,
            borderBottomLeftRadius: '12px',
          }}
        />
      )}

      {/* Step number indicator */}
      <div
        className="absolute -left-10 top-4 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black z-10"
        style={{
          background: `${item.accentColor}20`,
          border: `2px solid ${item.accentColor}60`,
          color: item.accentColor,
          boxShadow: `0 0 15px ${item.accentColor}20`,
        }}
      >
        {globalIndex + 1}
      </div>

      {/* The Card */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, rgba(9,14,23,0.85), rgba(9,14,23,0.65))`,
          border: `1px solid ${item.accentColor}25`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${item.accentColor}10`,
        }}
      >
        {/* Glow top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(to right, transparent, ${item.accentColor}, transparent)` }}
        />

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-[0.07]"
          style={{
            background: `radial-gradient(circle at top right, ${item.accentColor}, transparent 70%)`,
          }}
        />

        {/* Title */}
        <h4
          className="text-xl md:text-2xl font-black mb-1 tracking-tight"
          style={{
            background: `linear-gradient(135deg, ${item.accentColor}, ${item.accentColor}aa)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {item.title}
        </h4>

        {/* Subtitle */}
        <p className="text-sm text-slate-400 font-mono mb-3">{item.subtitle}</p>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 5).map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: `${item.accentColor}12`,
                border: `1px solid ${item.accentColor}25`,
                color: `${item.accentColor}cc`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Gallery ───────────────────────────────────────────
interface PhaseGroup {
  phase: string;
  phaseLabel: string;
  phaseIcon: string;
  accentColor: string;
  items: JourneyItem[];
}

export const StaircaseGallery: React.FC<{ items: JourneyItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group items by phase (preserve ordering)
  const phases: PhaseGroup[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    if (!seen.has(item.phase)) {
      seen.add(item.phase);
      phases.push({
        phase: item.phase,
        phaseLabel: item.phaseLabel,
        phaseIcon: item.phaseIcon,
        accentColor: item.accentColor,
        items: items.filter(i => i.phase === item.phase),
      });
    }
  }

  // Global index counter for step numbering
  let globalIndex = 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-6 md:px-12 py-16">
      {/* Vertical timeline spine */}
      <div className="absolute left-[22px] md:left-[46px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20 relative"
      >
        <p className="text-xs font-mono tracking-[0.5em] uppercase text-cyan-500/60 mb-3">
          Chronological Journey
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
            The Staircase
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          From the first classroom to building production systems — each step ascending higher.
        </p>
        <motion.div
          className="mt-8 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400/60">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Phase Groups */}
      {phases.map((group, phaseIndex) => {
        const phaseCards = group.items.map((item, stepIndex) => {
          const card = (
            <StaircaseCard
              key={item.id}
              item={item}
              stepIndex={stepIndex}
              globalIndex={globalIndex}
            />
          );
          globalIndex++;
          return card;
        });

        return (
          <div key={group.phase} className="mb-20 pl-8 md:pl-16">
            <PhaseHeader
              label={group.phaseLabel}
              icon={group.phaseIcon}
              color={group.accentColor}
              index={phaseIndex}
            />
            <div className="ml-2">{phaseCards}</div>
          </div>
        );
      })}

      {/* End marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center pt-8"
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-4" />
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500">
          And the journey continues...
        </p>
      </motion.div>
    </div>
  );
};
