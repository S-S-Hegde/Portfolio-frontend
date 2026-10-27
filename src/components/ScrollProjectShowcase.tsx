import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Compass, Wallet, ExternalLink, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectMockupVisual } from './ProjectMockupVisual';
import { soundFx } from '../utils/audio';

interface ScrollProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

// Individual project card that reveals on scroll
const ProjectScrollCard: React.FC<{
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}> = ({ project, index, onSelectProject }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const isVeriProof = project.id === 'veriproof';
  const isTourEase = project.id === 'tourease';
  const Icon = isVeriProof ? ShieldCheck : isTourEase ? Compass : Wallet;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.96 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-10 items-center p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#080C14]/80 border border-white/[0.07] hover:border-white/20 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden`}
    >
      {/* Accent top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 40%, transparent 100%)` }}
      />

      {/* Ambient glow blob */}
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${project.accentColor}08, transparent 70%)`,
        }}
      />

      {/* Visual Side */}
      <div className="w-full lg:w-[45%] shrink-0">
        <motion.div
          whileHover={{ scale: 1.02, rotateY: isEven ? 2 : -2 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-2xl overflow-hidden ring-1 ring-white/10"
        >
          <ProjectMockupVisual
            projectId={project.id}
            accentColor={project.accentColor}
            category={project.category}
          />
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="flex-1 space-y-4">
        {/* Project number + category */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-500 tracking-widest">
            {String(index + 1).padStart(2, '0')} —
          </span>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-semibold uppercase tracking-wider"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}40`,
              backgroundColor: `${project.accentColor}10`,
            }}
          >
            <Icon className="w-3 h-3" />
            {project.category}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="text-sm font-medium mt-1" style={{ color: `${project.accentColor}cc` }}>
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-slate-500 border border-white/5">
              +{project.tags.length - 5} more
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div
                  className="text-base font-black font-mono truncate"
                  style={{ color: project.accentColor }}
                >
                  {m.value}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <motion.button
            onClick={() => {
              soundFx.playClick();
              onSelectProject(project);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono border flex items-center gap-2 transition-all"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}50`,
              backgroundColor: `${project.accentColor}10`,
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture Spec
          </motion.button>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Horizontal counter ticker
const ScrollCounter: React.FC<{ value: number; suffix?: string; label: string; color: string }> = ({
  value, suffix = '', label, color,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-black font-mono" style={{ color }}>
        {value}{suffix}
      </div>
      <div className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

export const ScrollProjectShowcase: React.FC<ScrollProjectShowcaseProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax for the header
  const headerY = useTransform(smoothProgress, [0, 0.4], [60, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);

  const projects = PROJECTS.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="scroll-showcase"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      {/* Ambient background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [-40, 40]) }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px]"
        />
        <motion.div
          style={{ y: useTransform(smoothProgress, [0, 1], [40, -40]) }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header with scroll-linked parallax */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/60" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em]">
              Case Studies
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-cyan-500/60" />
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight"
            >
              Engineering{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400">
                Case Studies
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base max-w-2xl leading-relaxed"
          >
            Each project is a deep technical architecture — built with forensic precision,
            enterprise rigor, and production-grade engineering.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-8 sm:gap-12 pt-2"
          >
            <ScrollCounter value={3} suffix="+" label="Production Platforms" color="#00F0FF" />
            <ScrollCounter value={250} suffix="K+" label="Production LOC" color="#A855F7" />
            <ScrollCounter value={14} suffix="ms" label="P99 Netcode SLA" color="#10B981" />
            <ScrollCounter value={144} suffix=" FPS" label="WebGL Engine" color="#F59E0B" />
          </motion.div>
        </motion.div>

        {/* Scroll-animated project cards */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((project, i) => (
            <ProjectScrollCard
              key={project.id}
              project={project}
              index={i}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/projects"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/60 font-mono text-sm font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
