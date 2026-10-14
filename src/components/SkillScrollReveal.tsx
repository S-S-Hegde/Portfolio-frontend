import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Code2, Cpu, Database, GitBranch, Layers, Shield, Zap } from 'lucide-react';

const SKILLS_DATA = [
  {
    icon: Code2,
    title: 'Full-Stack Engineering',
    subtitle: 'React 18 + Node.js + Express 5',
    description: 'Building end-to-end web platforms with TypeScript-first codebases, server-side rendering, and component-driven architecture.',
    gradient: 'from-cyan-400 to-blue-500',
    color: '#00F0FF',
    tags: ['React 18', 'TypeScript', 'Node.js', 'Express 5', 'REST APIs'],
    stat: '3+ Production Apps',
  },
  {
    icon: Cpu,
    title: 'AI & LLM Orchestration',
    subtitle: 'Multi-LLM Cascade Pipelines',
    description: 'Designing 6-tier failover LLM cascades with Gemini, Groq, Mistral, Cohere, and custom algorithmic fallbacks for zero-downtime AI services.',
    gradient: 'from-purple-400 to-pink-500',
    color: '#A855F7',
    tags: ['Gemini AI', 'Groq', 'Mistral', 'Cohere', 'LangChain', 'FastAPI'],
    stat: '6-Tier Failover Engine',
  },
  {
    icon: Shield,
    title: 'Security & Anti-Fraud Systems',
    subtitle: 'Forensic Verification Architecture',
    description: 'Engineering anti-tamper submission firewalls, email forensic validation pipelines, and cryptographic credential minting with JWT/RBAC.',
    gradient: 'from-emerald-400 to-teal-500',
    color: '#10B981',
    tags: ['JWT / RBAC', 'Rate Limiting', 'Email Forensics', 'Anti-Fraud', 'Crypto Creds'],
    stat: 'Server-Authoritative Firewall',
  },
  {
    icon: Database,
    title: 'Database & Data Architecture',
    subtitle: 'MongoDB Atlas + Mongoose ODM',
    description: 'Designing NoSQL schemas for complex multi-tenant platforms, optimizing aggregation pipelines and indexing strategies for sub-100ms queries.',
    gradient: 'from-amber-400 to-orange-500',
    color: '#F59E0B',
    tags: ['MongoDB Atlas', 'Mongoose', 'Aggregation', 'Indexing', 'CRUD APIs'],
    stat: '4+ Schema Systems',
  },
  {
    icon: Zap,
    title: 'Computer Vision & Edge AI',
    subtitle: 'YOLOv10 + MediaPipe On-Device',
    description: 'Running zero-cloud-streaming optical proctoring with YOLOv10 Nano object detection and MediaPipe 468-point face mesh over WebSockets.',
    gradient: 'from-rose-400 to-red-500',
    color: '#F43F5E',
    tags: ['YOLOv10 Nano', 'MediaPipe', 'WebSockets', 'PyTorch', 'Python 3.11'],
    stat: 'On-Device Edge Inference',
  },
];

export const SkillScrollReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Section label */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-purple-500/60" />
          <span className="text-xs font-mono text-purple-400 uppercase tracking-[0.3em]">
            Core Competencies
          </span>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight"
          >
            What I{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-cyan-400">
              Build With
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Skills cards — staggered scroll reveal */}
      <div ref={containerRef} className="max-w-6xl mx-auto space-y-5">
        {SKILLS_DATA.map((skill, i) => (
          <SkillRevealCard key={skill.title} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
};

const SkillRevealCard: React.FC<{ skill: (typeof SKILLS_DATA)[0]; index: number }> = ({
  skill,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.85,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="relative group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 p-6 sm:p-8 rounded-3xl bg-[#080C14]/70 border border-white/[0.06] hover:border-white/15 backdrop-blur-xl cursor-default transition-all duration-500 overflow-hidden"
    >
      {/* Left-side sliding accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to bottom, transparent, ${skill.color}, transparent)` }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? '0%' : '100%'} 50%, ${skill.color}08 0%, transparent 70%)`,
        }}
      />

      {/* Icon + stat side */}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${skill.gradient} shadow-lg mb-4`}
          >
            <skill.icon className="w-5 h-5 text-white" />
          </div>
          <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: skill.color }}>
            Domain {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="text-xl font-black text-white">{skill.title}</h3>
          <p className="text-sm font-medium text-slate-400 mt-0.5">{skill.subtitle}</p>
        </div>

        <div
          className="inline-block px-3 py-1.5 rounded-xl text-xs font-mono font-bold border"
          style={{
            color: skill.color,
            borderColor: `${skill.color}30`,
            backgroundColor: `${skill.color}10`,
          }}
        >
          {skill.stat}
        </div>
      </div>

      {/* Description + tags side */}
      <div className="flex flex-col justify-center gap-4">
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{skill.description}</p>
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-white/25 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
