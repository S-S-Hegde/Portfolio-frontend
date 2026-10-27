import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  GitBranch,
  Cpu,
  Eye,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
  Database,
  Terminal,
  Activity,
  AlertCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { soundFx } from '../utils/audio';

interface PipelineStage {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  input: string;
  stages: { title: string; detail: string; metric: string }[];
  output: { status: string; confidence: string; summary: string };
}

const PIPELINE_SCENARIOS: PipelineStage[] = [
  {
    id: 'ast_repo',
    name: 'GitHub Repository AST & Commit Audit',
    category: 'Code Intelligence',
    icon: GitBranch,
    description:
      'Analyzes candidate GitHub repositories against asserted resume claims, inspecting commit timestamps, author keys, and abstract syntax tree (AST) complexity.',
    input: 'Repo: github.com/candidate/distributed-cache | Resume Claim: "Architected custom LRU memory cache"',
    stages: [
      {
        title: 'AST Tree Parsing',
        detail: 'Traversed 4,200 AST nodes in memory_pool.rs; cyclomatic complexity evaluated at 3.4.',
        metric: '4.2K Nodes',
      },
      {
        title: 'Commit Signature Attribution',
        detail: 'Matched author Git signatures across 14 branches with 98.4% cryptographic continuity.',
        metric: '98.4% Match',
      },
      {
        title: 'Semantic Claim Grounding',
        detail: 'Verified eviction policy implementations in lines 140–280 correlating directly with resume claims.',
        metric: '100% Grounded',
      },
    ],
    output: {
      status: 'VERIFIED',
      confidence: '97.8% Confidence',
      summary: 'Candidate codebase authenticity verified. Authentic code creation confirmed via AST inspection.',
    },
  },
  {
    id: 'optical_guard',
    name: 'Client-Side Optical Proctoring (ACE Guard)',
    category: 'Edge Computer Vision',
    icon: Eye,
    description:
      'Zero-cloud-streaming optical proctoring running YOLOv10 Nano and MediaPipe 468-point face mesh locally in the candidate browser.',
    input: 'Camera Feed: 1080p Local Video Stream | Inference: On-Device WASM / PyTorch Nano',
    stages: [
      {
        title: 'MediaPipe 468 Face Mesh',
        detail: 'Continuous tracking of head pose pitch and yaw. Gaze vectors verified centered on test viewport.',
        metric: '468 Landmarks',
      },
      {
        title: 'YOLOv10 Object Detection',
        detail: 'Class 67 (Cell Phone): 0 detected. Class 0 (Person): Exactly 1 person detected with 0.99 confidence.',
        metric: '0 Unauthorized Devices',
      },
      {
        title: 'Privacy Verification',
        detail: 'Zero raw video frames transmitted over the network. Only anonymized telemetry events sent to API.',
        metric: '100% On-Device',
      },
    ],
    output: {
      status: 'COMPLIANT',
      confidence: '99.2% Integrity',
      summary: 'No unauthorized devices or secondary presence detected. Complete candidate privacy preserved.',
    },
  },
  {
    id: 'llm_extraction',
    name: 'Gemini 2.0 Structured Claim Extraction',
    category: 'AI Pipeline',
    icon: Cpu,
    description:
      'Extracts structured technical claims and experience timelines from unstructured PDF resumes and job descriptions using deterministic JSON schemas.',
    input: 'Document: Candidate_Resume.pdf (Multipart Stream) + Senior_Backend_JD.txt',
    stages: [
      {
        title: 'Schema-Constrained Parsing',
        detail: 'Mapped raw PDF text into validated JSON AST schemas without hallucination or length bias.',
        metric: '280ms Latency',
      },
      {
        title: 'Skill & Requirement Correlation',
        detail: 'Identified 12 core requirements: Node.js, Express, MongoDB Atlas, Redis, and WebSockets.',
        metric: '12 Requirements Matched',
      },
      {
        title: 'Multi-Tier Gateway Resilience',
        detail: 'Primary Gemini endpoint verified with warm standby fallbacks to ensure uninterrupted screening.',
        metric: 'Zero Downtime',
      },
    ],
    output: {
      status: 'VERIFIED',
      confidence: '96.5% Precision',
      summary: 'All claims structured and validated against job specification. Ready for recruiter evaluation.',
    },
  },
];

export const VeriProofCaseStudy: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<PipelineStage>(PIPELINE_SCENARIOS[0]);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simStage, setSimStage] = useState<number>(3); // 3 = fully completed

  const runSimulation = () => {
    soundFx.playClick();
    setSimulating(true);
    setSimStage(0);

    setTimeout(() => setSimStage(1), 500);
    setTimeout(() => setSimStage(2), 1100);
    setTimeout(() => {
      setSimStage(3);
      setSimulating(false);
      try {
        soundFx.playSuccess();
      } catch {
        // audio restriction
      }
    }, 1700);
  };

  return (
    <section id="veriproof" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Masthead */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-bold tracking-wider uppercase">01 // FLAGSHIP ENGINEERING CASE STUDY</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                VeriProof
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 font-medium mt-2 max-w-2xl">
                Automated Candidate Proof-of-Skill &amp; Repository Forensic Auditing Platform
              </p>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://veriproof.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-5 py-2.5 rounded-full bg-accent-lime hover:bg-[#B8E600] text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(204,255,0,0.25)]"
              >
                <span>Live Application</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>
              <a
                href="https://github.com/S-S-Hegde"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* Problem vs Solution Editorial Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span className="font-bold">The Technical Problem</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Resume Fraud &amp; Unverified Skill Inflation
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Technical hiring teams face severe recruiter fatigue filtering hundreds of applicant resumes
              filled with keyword-stuffed claims. Traditional screening lacks automated mechanisms to
              verify whether a candidate genuinely authored code in their linked repositories or simply
              forked boilerplate repositories.
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-rose-400 font-bold">&bull;</span>
              <span>Keyword inflation without verifiable proof of contribution</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-accent-lime/30 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-lime/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-accent-lime font-mono text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-bold">The VeriProof Solution</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Evidence-Based Forensic Skill Auditing
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              VeriProof extracts asserted skills using structured Gemini schemas, audits public GitHub
              repository ASTs and commit author signatures, and deploys on-device optical proctoring
              (YOLOv10 + MediaPipe) to generate an objective recruiter dossier with verifiable trust metrics.
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3 text-xs font-mono text-accent-lime">
              <span className="font-bold">&bull;</span>
              <span>Real code contribution analysis replacing superficial resume scoring</span>
            </div>
          </div>
        </div>

        {/* System Architecture Flow Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-lime" />
              <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono text-xs">
                End-to-End Distributed Architecture Flow
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              MERN Stack + Python FastAPI Microservices
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                step: '01',
                title: 'Client Intake',
                tech: 'React 18 + Vite',
                detail: 'Multipart resume upload, recruiter intake portal & live test runner',
              },
              {
                step: '02',
                title: 'API Gateway',
                tech: 'Express 5 + Node.js',
                detail: 'In-memory streaming, JWT/RBAC auth, and rate-limiting firewalls',
              },
              {
                step: '03',
                title: 'AI Claim Extraction',
                tech: 'Google Gemini 2.0',
                detail: 'Schema-constrained structured extraction of skills and timelines',
              },
              {
                step: '04',
                title: 'Repo AST Auditing',
                tech: 'Python 3.11 AST',
                detail: 'GitHub commit attribution, cyclomatic weights & code authorship',
              },
              {
                step: '05',
                title: 'Optical Proctoring',
                tech: 'YOLOv10 + MediaPipe',
                detail: 'Client-side 468-point face mesh & device detection over WebSockets',
              },
            ].map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-lime/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-accent-lime font-bold block mb-1">
                    STEP {node.step}
                  </span>
                  <h4 className="text-sm font-bold text-white">{node.title}</h4>
                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                    {node.tech}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {node.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Engineering Trade-Offs & Decisions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-accent-lime" />
            <span>Key Engineering Decisions &amp; Trade-Offs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-colors space-y-2">
              <span className="text-xs font-mono text-accent-lime font-bold">
                DECISION 01 // PRIVACY &amp; BANDWIDTH
              </span>
              <h4 className="text-sm font-bold text-white">
                Client-Side vs. Cloud Optical Vision
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than streaming raw camera video to expensive cloud GPU instances, YOLOv10 Nano
                and MediaPipe run locally in the browser via WebAssembly. This preserves complete candidate
                privacy and slashes bandwidth costs to zero.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-colors space-y-2">
              <span className="text-xs font-mono text-accent-lime font-bold">
                DECISION 02 // IN-MEMORY STREAMING
              </span>
              <h4 className="text-sm font-bold text-white">
                RAM Buffering vs. Disk Persistence
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multer was configured with memory storage rather than disk storage. PDF resumes are
                parsed directly in ephemeral RAM streams, eliminating persistent file-injection attack
                surfaces on the backend server.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-colors space-y-2">
              <span className="text-xs font-mono text-accent-lime font-bold">
                DECISION 03 // MICROSERVICE ISOLATION
              </span>
              <h4 className="text-sm font-bold text-white">
                Node.js Gateway + Python Worker
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Separating the Express.js API gateway from the Python FastAPI AI inference engine
                guarantees that heavy AST parsing and PyTorch evaluations never block the main Node.js
                event loop for active HTTP client requests.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Verification Pipeline Sandbox */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0D13] border border-white/[0.1] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-lime" />
                <h3 className="text-base font-bold text-white font-mono uppercase text-xs">
                  Interactive Pipeline Scenario Inspector
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Select an inspection module to inspect live audit simulation stages and verifiable outputs.
              </p>
            </div>

            {/* Scenario Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {PIPELINE_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveScenario(scenario);
                    setSimStage(3);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    activeScenario.id === scenario.id
                      ? 'bg-accent-lime text-black font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                      : 'bg-white/[0.05] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  {scenario.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Scenario Card */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#12151D] border border-white/[0.06] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-accent-lime font-bold uppercase">
                  {activeScenario.category} // {activeScenario.name}
                </span>
                <button
                  onClick={runSimulation}
                  disabled={simulating}
                  className="px-3 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-all"
                >
                  {simulating ? (
                    <RotateCcw className="w-3 h-3 animate-spin text-accent-lime" />
                  ) : (
                    <Play className="w-3 h-3 text-accent-lime" />
                  )}
                  <span>{simulating ? 'Auditing...' : 'Re-run Pipeline'}</span>
                </button>
              </div>
              <p className="text-xs font-mono text-slate-400 break-all pt-1">
                <strong className="text-slate-300">INPUT:</strong> {activeScenario.input}
              </p>
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeScenario.stages.map((stage, idx) => {
                const isPassed = simStage >= idx + 1;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isPassed
                        ? 'bg-white/[0.02] border-white/15'
                        : 'bg-white/[0.01] border-white/[0.04] opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-400">
                        PHASE 0{idx + 1}
                      </span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />}
                    </div>
                    <h5 className="text-xs font-bold text-white">{stage.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {stage.detail}
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/[0.06] text-xs font-mono font-bold text-accent-lime">
                      {stage.metric}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Output Verification Dossier */}
            <div className="p-4 rounded-xl bg-accent-lime/[0.04] border border-accent-lime/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-accent-lime text-black">
                    {activeScenario.output.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {activeScenario.output.confidence}
                  </span>
                </div>
                <p className="text-xs text-slate-300 pt-1">
                  {activeScenario.output.summary}
                </p>
              </div>

              <a
                href="https://veriproof.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="shrink-0 px-4 py-2 rounded-lg bg-accent-lime hover:bg-[#B8E600] text-black font-extrabold text-xs flex items-center gap-1.5 transition-all"
              >
                <span>Launch Live Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeriProofCaseStudy;
