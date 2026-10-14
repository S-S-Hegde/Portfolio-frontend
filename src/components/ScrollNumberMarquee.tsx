import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * AUGE-style horizontal scrolling number strip.
 * As you scroll past the section, large numbers slide horizontally (parallax marquee).
 */
export const ScrollNumberMarquee: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // Row 1 moves left, Row 2 moves right
  const x1 = useTransform(smooth, [0, 1], ['0%', '-25%']);
  const x2 = useTransform(smooth, [0, 1], ['-25%', '0%']);

  const stats1 = [
    '8.31 CGPA', '64.5K LOC', '6-TIER AI', 'EXPRESS 5',
    '8.31 CGPA', '64.5K LOC', '6-TIER AI', 'EXPRESS 5',
  ];
  const stats2 = [
    'VERIPROOF', 'YOLOV10', 'REACT 18', 'MEDIAPIPE',
    'VERIPROOF', 'YOLOV10', 'REACT 18', 'MEDIAPIPE',
  ];

  return (
    <div ref={ref} className="relative py-10 sm:py-16 overflow-hidden select-none">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#05070B] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#05070B] to-transparent pointer-events-none" />

      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-6 mb-4 whitespace-nowrap w-[200%]">
        {stats1.map((s, i) => (
          <React.Fragment key={i}>
            <span className="text-4xl sm:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600 tracking-tight">
              {s}
            </span>
            <span className="text-4xl sm:text-6xl font-black font-mono text-cyan-500/20">·</span>
          </React.Fragment>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex gap-6 whitespace-nowrap w-[200%]">
        {stats2.map((s, i) => (
          <React.Fragment key={i}>
            <span className="text-4xl sm:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-700 tracking-tight">
              {s}
            </span>
            <span className="text-4xl sm:text-6xl font-black font-mono text-purple-500/20">·</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
