import React, { useRef } from 'react';
import { motion, useScroll, useTransform, transform } from 'framer-motion';
import { Project } from '../types';

interface StaircaseCardProps {
  item: Project;
  index: number;
  scrollYProgress: any;
  totalItems: number;
}

const StaircaseCard: React.FC<StaircaseCardProps> = ({ item, index, scrollYProgress, totalItems }) => {
  const step = 1 / totalItems;
  const start = index * step;
  const end = start + step;

  // The rotation curves the element like a spiral
  const rotateY = useTransform(scrollYProgress, (v: number) => transform(v, [start - 0.15, end + 0.15], [75, -75]));
  const scale = useTransform(scrollYProgress, (v: number) => transform(v, [start - 0.2, start, end, end + 0.2], [0.4, 1, 1, 0.4]));
  const opacity = useTransform(scrollYProgress, (v: number) => transform(v, [start - 0.2, start, end, end + 0.2], [0, 1, 1, 0]));
  
  // They start high and translate down
  const translateY = useTransform(scrollYProgress, (v: number) => transform(v, [start - 0.2, end + 0.2], [400, -400]));
  
  // Translating Z pushes it back when it's at the edges
  const translateZ = useTransform(scrollYProgress, (v: number) => transform(v, [start - 0.2, start + (step/2), end + 0.2], [-800, 150, -800]));

  return (
    <motion.div
      style={{
        rotateY,
        scale,
        opacity,
        y: translateY,
        z: translateZ,
        transformPerspective: 1600, 
        transformStyle: "preserve-3d"
      }}
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <div className="bg-[#090e17]/80 backdrop-blur-2xl border border-cyan-500/20 p-8 rounded-2xl w-full max-w-2xl shadow-[0_20px_60px_rgba(0,240,255,0.1)] text-white hover:border-cyan-400/80 transition-colors group">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div>
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{item.title}</h3>
            <p className="text-sm font-mono text-cyan-500/80">{item.subtitle}</p>
          </div>
        </div>
        <p className="text-slate-300 text-lg mb-6 leading-relaxed line-clamp-3">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 5).map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const StaircaseGallery: React.FC<{ items: Project[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${items.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden flex-col">
        <motion.div 
           style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
           className="absolute top-1/4 text-center z-10 pointer-events-none"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            Scroll to Phase Time
          </h2>
          <p className="text-cyan-400 animate-pulse font-mono tracking-widest uppercase">Descend the Stairwell</p>
        </motion.div>

        <div className="relative w-full h-[600px] perspective-[1500px] mt-10">
          {items.map((item, index) => (
            <StaircaseCard 
              key={item.id} 
              item={item} 
              index={index} 
              scrollYProgress={scrollYProgress} 
              totalItems={items.length} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
