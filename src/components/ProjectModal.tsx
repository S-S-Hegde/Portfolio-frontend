import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Sparkles, Shield, Eye, Lock, FileCode, BarChart3, Database } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project } from '../types';
import { soundFx } from '../utils/audio';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'llm' | 'proctor' | 'firewall' | 'metrics'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling while ProjectModal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).lenisInstance?.stop();
    } else {
      document.body.style.overflow = '';
      (window as any).lenisInstance?.start();
    }
    return () => {
      document.body.style.overflow = '';
      (window as any).lenisInstance?.start();
    };
  }, [isOpen]);

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, project]);

  if (!project) return null;

  const isVeriProof = project.id === 'veriproof';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto overscroll-contain bg-[#0A0D14] border border-cyan-500/30 rounded-3xl shadow-[0_0_80px_rgba(0,240,255,0.2)] p-6 md:p-8 custom-scrollbar z-10"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="absolute top-6 right-6 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 text-slate-400 hover:text-white transition-all z-20 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Category & Accent Glow */}
            <div className="pr-16">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="px-3.5 py-1 text-xs font-mono font-semibold rounded-full border shadow-sm"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}50`,
                    backgroundColor: `${project.accentColor}15`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {project.period}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="text-sm md:text-base text-cyan-300 font-medium mb-7 leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Sub-Navigation Tabs for Projects */}
            <div className="p-1.5 bg-black/40 rounded-2xl border border-white/10 flex items-center gap-2 overflow-x-auto pb-1.5 mb-8 custom-scrollbar">
              {(isVeriProof
                ? [
                    { id: 'overview', label: 'System Overview', icon: Layers },
                    { id: 'architecture', label: 'Architecture Topology', icon: Sparkles },
                    { id: 'llm', label: '6-Tier LLM Cascade', icon: Cpu },
                    { id: 'proctor', label: 'ACE Vision Guard', icon: Eye },
                    { id: 'firewall', label: 'Security & Math', icon: Lock },
                    { id: 'metrics', label: 'Codebase Metrics', icon: BarChart3 },
                  ]
                : [
                    { id: 'overview', label: 'System Overview', icon: Layers },
                    { id: 'architecture', label: 'Architecture Topology', icon: Sparkles },
                  ]
              ).map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab(t.id as any);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Project Metrics HUD */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-md"
                    >
                      <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mb-1.5">
                        {m.label}
                      </p>
                      <p className="text-base sm:text-lg font-bold text-white leading-snug">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Detailed Overview Box */}
                <div>
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Platform Architecture & Mission
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                    {project.fullOverview}
                  </p>
                </div>

                {/* Interactive Diagrammatical Architecture View */}
                <div>
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> System Architecture & Flowchart
                  </h3>
                  <ArchitectureDiagram projectId={project.id} />
                </div>

                {/* Key Technical Highlights / Bullet Points */}
                <div>
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Engineering Specifications
                  </h3>
                  <div className="space-y-2.5">
                    {project.bulletPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Dedicated Architecture Topology */}
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <ArchitectureDiagram projectId={project.id} />
              </div>
            )}

            {/* TAB CONTENT: 6-Tier Multi-LLM Cascade (VeriProof) */}
            {isVeriProof && activeTab === 'llm' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Multi-LLM 6-Tier Failover Cascade Architecture
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To eliminate single-provider rate-limit and outage risks, VeriProof executes an automatic priority-ordered cascade. If an upstream provider fails or returns unparseable JSON, the pipeline fails over down to Tier 6 with zero downtime.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { tier: 'Tier 1: Google Gemini 1.5 / 2.0 Flash', p95: '1.82s', desc: 'Primary synthesis engine with low temperature (0.2) schema compliance and zero option length bias.', status: 'Primary (P95 ~1.82s)' },
                    { tier: 'Tier 2: Groq Cloud Llama-3.3 70B', p95: '0.84s', desc: 'Ultra-low latency secondary failover (P95 ~0.84s) providing high-accuracy reasoning.', status: 'Sub-Second Fallback' },
                    { tier: 'Tier 3: Mistral AI (mistral-small-latest)', p95: '1.45s', desc: 'Tertiary failover with strict JSON schema adherence and structured validation.', status: 'Tertiary Gateway' },
                    { tier: 'Tier 4: OpenRouter Free LLaMA 3.1 8B', p95: '2.10s', desc: 'Quaternary community routing failover for high-volume contingency handling.', status: 'Quaternary' },
                    { tier: 'Tier 5: Python Engine Microservice', p95: '0.40s', desc: 'Internal FastAPI microservice executing cached capability prompts.', status: 'Internal Microservice' },
                    { tier: 'Tier 6: Algorithmic 2-Section Bank Generator', p95: '<0.01s', desc: 'Deterministic, zero-external-dependency in-memory generator guaranteeing 100% ground-truth questions even during total upstream outages.', status: 'Zero-Failure Guarantee' },
                  ].map((t, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-sm text-cyan-300 block">{t.tier}</span>
                        <span className="text-xs text-slate-400 mt-0.5 block">{t.desc}</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-400 self-start sm:self-center whitespace-nowrap">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Mathematical 2-Section Partition
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    Total Exam (35 Qs) = 20 Core Baseline (JD Requirements: 5 Easy, 10 Med, 5 Hard) + 15 Candidate Electives (Resume Claims: 5 Easy, 5 Med, 5 Hard). Prevents apples-to-oranges evaluation bias while verifying candidate depth.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ACE Vision Guard (VeriProof) */}
            {isVeriProof && activeTab === 'proctor' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    ACE Vision Guard: Local On-Device Optical Edge AI
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluates continuous 30 FPS camera frames in local client/host RAM via YOLOv10 and MediaPipe. Never transmits raw private video recordings to third-party cloud vendors (GDPR & SOC2 privacy-by-design).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { vector: 'Mobile Phone Detection', tech: 'YOLOv10 Nano (Class 67)', param: 'Confidence >= 0.22', action: 'Immediate Strike' },
                    { vector: 'Multi-Person Assistance', tech: 'YOLOv10 Nano (Class 0)', param: 'Count >= 2, Conf >= 0.40', action: 'Multi-Person Alert' },
                    { vector: 'Candidate Absence', tech: 'MediaPipe Face Mesh', param: 'Face count = 0 for >= 6 frames', action: 'Absence Strike' },
                    { vector: '3D Head Pose Deviation', tech: 'solvePnP Euler Angles', param: '|Yaw| > 30° || |Pitch| > 25°', action: 'Angle Warning' },
                    { vector: 'Iris Gaze Tracking', tech: 'Euclidean Eye Corner Ratios', param: 'Horizontal Ratio < 0.25 || > 0.75', action: 'Gaze Warning' },
                    { vector: 'Camera Shutter / Glare', tech: 'Mean Luminance (0-255)', param: 'Luma < 10.0 || > 235.0', action: 'Obscuration Strike' },
                  ].map((v, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <span className="text-xs font-mono font-bold text-purple-300 block mb-1">{v.vector}</span>
                      <p className="text-xs text-slate-300 mb-2">{v.tech} • <code className="text-cyan-400">{v.param}</code></p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300">
                        {v.action}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Event-Driven 3-Frame Burst Snapshot Ring Buffer
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Maintains an in-memory 15-frame rolling ring buffer (<code className="text-cyan-400">collections.deque(maxlen=15)</code>). Upon confirmed violation, extracts a 3-frame sequence (t_start, t_mid, t_end), dispatches compressed JPEGs to the backend, and automatically attaches proof to recruiter HTML audit emails.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Security & Math Firewall (VeriProof) */}
            {isVeriProof && activeTab === 'firewall' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    Anti-Tamper Submission Firewall & Composite Trust Scoring
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Protects exam grading integrity with server-authoritative reconciliation, fixed-denominator scoring, and multi-factor evidence fusion.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <h5 className="text-xs font-mono font-bold text-emerald-300 mb-1">1. Immutable 35-Question Denominator</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Prevents partial-submission exploits where a client submits only 1 correct answer to game a 100% score. The denominator is strictly locked to <code className="text-cyan-400">exam.questions.length (35)</code> on the server.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <h5 className="text-xs font-mono font-bold text-emerald-300 mb-1">2. Server-Authoritative Anti-Cheat Reconciliation</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Server maintains <code className="text-cyan-400">serverViolationCount</code>. Reconciles <code className="text-cyan-400">Effective = max(serverCount, clientCount)</code>. If Effective &gt;= 3, exam is auto-terminated with score 0 and 0 integrity.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <h5 className="text-xs font-mono font-bold text-emerald-300 mb-1">3. 3-Way Evidence Fusion Formula</h5>
                    <div className="p-3 my-2 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-cyan-300">
                      Composite Trust Score = 0.40(Assessment) + 0.40(Resume Match) + 0.20(GitHub Portfolio)
                    </div>
                    <p className="text-xs text-slate-400">
                      Composite score &gt;= 70% mints a cryptographically verified credential ID (e.g. <code className="text-emerald-400">VP-XXXXXXXX</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <h5 className="text-xs font-mono font-bold text-emerald-300 mb-1">4. AST Code & Complexity Grading</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Python native <code className="text-cyan-400">ast</code> compiles submitted candidate code to inspect tree depth, control flow branches, recursion instances, and cyclomatic complexity without arbitrary execution.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Codebase Metrics (VeriProof) */}
            {isVeriProof && activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    VeriProof Verified Codebase Metrics
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Active repository metrics calculated across the multi-tiered full-stack architecture (excluding node_modules and caches).
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-2xl font-black text-white">330</span>
                    <span className="text-xs font-mono text-cyan-400 block mt-1">Total Active Files</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-2xl font-black text-white">64,596</span>
                    <span className="text-xs font-mono text-cyan-400 block mt-1">Total Lines of Code</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-2xl font-black text-white">70</span>
                    <span className="text-xs font-mono text-purple-400 block mt-1">React (JSX) Components</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-2xl font-black text-white">141</span>
                    <span className="text-xs font-mono text-purple-400 block mt-1">Python Vision / AI Files</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-2xl font-black text-white">83</span>
                    <span className="text-xs font-mono text-emerald-400 block mt-1">Node.js API Modules</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <span className="text-2xl font-black text-white">83.3 MB</span>
                    <span className="text-xs font-mono text-emerald-400 block mt-1">Active Repo Footprint</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="my-8 pt-4 border-t border-white/10">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" /> Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  View GitHub Source
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
