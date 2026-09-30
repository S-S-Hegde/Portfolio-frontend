import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Eye, GitBranch, Key, CheckCircle2, Play, RefreshCw, Terminal, Activity, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { TiltCard } from './TiltCard';

interface AuditScenario {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  payload: string;
  stages: {
    title: string;
    detail: string;
    metric: string;
    metricLabel: string;
  }[];
  verdict: {
    status: 'VERIFIED' | 'FLAGGED' | 'COMPLIANT';
    trustScore: number;
    hash: string;
    summary: string;
  };
}

const SCENARIOS: AuditScenario[] = [
  {
    id: 'ast_audit',
    name: 'AST Code Integrity & Commit Audit',
    category: 'Static Analysis',
    icon: GitBranch,
    description: 'Scans candidate GitHub ASTs, complexity weights, and verifies cryptographically matching author signatures against resume claims.',
    payload: 'repo: github.com/candidate/distributed-cache | claim: "Architected custom LRU cache in Rust"',
    stages: [
      { title: 'Cloning Bare AST Tree', detail: 'Parsing 4,200 AST nodes, cyclomatic complexity index = 3.4', metric: '4.2K AST Nodes', metricLabel: 'Parsed' },
      { title: 'Commit Forensic Attribution', detail: 'GPG author key matched 98.4% of total code commits across 14 branches', metric: '98.4%', metricLabel: 'Attribution Match' },
      { title: 'Claim Cross-Correlation', detail: 'Identified LRU eviction policy logic in memory_pool.rs lines 140-280', metric: '100%', metricLabel: 'Claim Grounded' },
    ],
    verdict: {
      status: 'VERIFIED',
      trustScore: 97.8,
      hash: 'VP-8F29A4D1-AST-VERIFIED',
      summary: 'Candidate codebase authenticity verified. 0 plagiarized code patterns found in AST tree.'
    }
  },
  {
    id: 'vision_guard',
    name: 'ACE Vision Guard (YOLOv10 + MediaPipe)',
    category: 'Optical Edge AI',
    icon: Eye,
    description: 'On-device proctoring pipeline running local PyTorch YOLOv10 Nano and MediaPipe 468-point face mesh without cloud video streaming.',
    payload: 'camera: 1080p WebRTC stream | local worker: on-device WASM / PyTorch Nano',
    stages: [
      { title: 'Face Mesh 468 Landmark Tracking', detail: 'Head pose yaw: -1.2 deg, pitch: 0.8 deg. Gaze centered on IDE viewport', metric: '468 Pts', metricLabel: 'Mesh Tracked' },
      { title: 'YOLOv10 Nano Object Detection', detail: 'Class 67 (Cell phone): 0 detected. Class 0 (Person): 1 detected (Confidence 0.99)', metric: '0 Phone', metricLabel: 'Flag Count' },
      { title: 'Sub-Frame Liveness Heartbeat', detail: 'Blink rate = 14/min, micro-saccade frequency within normal biometric distribution', metric: '60 FPS', metricLabel: 'On-Device Rate' },
    ],
    verdict: {
      status: 'COMPLIANT',
      trustScore: 99.2,
      hash: 'VP-ACE-VISION-GUARD-CLEAN',
      summary: 'Zero unauthorized peripheral devices detected. Zero multi-person presence. 100% on-device privacy guarantee.'
    }
  },
  {
    id: 'llm_cascade',
    name: '6-Tier Multi-LLM Orchestration Cascade',
    category: 'AI Gateway',
    icon: Cpu,
    description: 'Cascading reasoning engine routing through Gemini 2.0 Flash, Groq Llama 3.3, Mistral Large, OpenRouter, Python microservice, and algorithmic fallbacks.',
    payload: 'query: "Evaluate candidate algorithmic submission for race conditions & time complexity"',
    stages: [
      { title: 'Primary Tier: Gemini 2.0 Flash', detail: 'Extracted semantic assertions with structured schema validation (Latency: 280ms)', metric: '280ms', metricLabel: 'Response Time' },
      { title: 'Fallback Tier Watchdog', detail: 'Groq & Mistral warm standby pinged. Zero rate-limit spillover triggered', metric: '6 Tiers', metricLabel: 'Resilience Mesh' },
      { title: 'Deterministic Guardrails', detail: 'Schema validator validated JSON AST contract with zero hallucination delta', metric: '100%', metricLabel: 'JSON Determinism' },
    ],
    verdict: {
      status: 'VERIFIED',
      trustScore: 98.5,
      hash: 'VP-LLM-CASCADE-6TIER-OK',
      summary: 'Multi-LLM consensus achieved. Robust semantic audit report compiled with zero gateway timeouts.'
    }
  }
];

export const VeriProofSandbox: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<AuditScenario>(SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const startAudit = () => {
    soundFx.playClick();
    setIsRunning(true);
    setCurrentStage(0);
    setProgress(10);
    setCompleted(false);
    setLogs([
      `[SYS_INIT] Initializing VeriProof Forensic Audit Protocol v3.0.0...`,
      `[LOAD_PAYLOAD] ${selectedScenario.payload}`,
    ]);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer1 = setTimeout(() => {
      setCurrentStage(0);
      setProgress(35);
      setLogs((prev) => [
        ...prev,
        `[STAGE 1/3] ${selectedScenario.stages[0].title}`,
        ` -> ${selectedScenario.stages[0].detail}`,
      ]);
    }, 600);

    const timer2 = setTimeout(() => {
      setCurrentStage(1);
      setProgress(70);
      setLogs((prev) => [
        ...prev,
        `[STAGE 2/3] ${selectedScenario.stages[1].title}`,
        ` -> ${selectedScenario.stages[1].detail}`,
      ]);
    }, 1400);

    const timer3 = setTimeout(() => {
      setCurrentStage(2);
      setProgress(100);
      setLogs((prev) => [
        ...prev,
        `[STAGE 3/3] ${selectedScenario.stages[2].title}`,
        ` -> ${selectedScenario.stages[2].detail}`,
        `[AUDIT_COMPLETE] Minting cryptographic audit proof hash: ${selectedScenario.verdict.hash}`,
      ]);
      setCompleted(true);
      setIsRunning(false);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isRunning, selectedScenario]);

  const handleSelectScenario = (sc: AuditScenario) => {
    soundFx.playClick();
    setSelectedScenario(sc);
    setIsRunning(false);
    setCurrentStage(-1);
    setProgress(0);
    setCompleted(false);
    setLogs([`[SCENARIO_READY] Target scenario: ${sc.name}`, `[PAYLOAD] ${sc.payload}`]);
  };

  const Icon = selectedScenario.icon;

  return (
    <div className="rounded-3xl bg-[#090D15] border border-cyan-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.08)] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>INTERACTIVE FORENSIC ENGINE SANDBOX</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>VeriProof Live Audit Simulator</span>
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Experience the automated forensic verification pipeline. Choose an audit vector and trigger real-time simulated AI analysis.
          </p>
        </div>

        {/* Audit Vector Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {SCENARIOS.map((sc) => {
            const ScIcon = sc.icon;
            const isSelected = sc.id === selectedScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                data-cursor-text="SELECT"
                className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <ScIcon className="w-4 h-4" />
                <span>{sc.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Col: Target Spec & Trigger */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Icon className="w-4 h-4" />
                <span>{selectedScenario.category}</span>
              </div>
              <h4 className="text-lg font-bold text-white">{selectedScenario.name}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedScenario.description}</p>
            </div>

            {/* Target Payload Terminal Preview */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300">
              <span className="text-cyan-400 font-bold block text-[10px] uppercase tracking-wider mb-1">
                Test Ingestion Vector:
              </span>
              <p className="text-slate-400 truncate">{selectedScenario.payload}</p>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="pt-2">
            <button
              onClick={startAudit}
              disabled={isRunning}
              data-cursor-text="RUN AUDIT"
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all ${
                isRunning
                  ? 'bg-cyan-500/50 text-black cursor-wait'
                  : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-[1.01]'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Forensic Verification Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Run Live Forensic Audit Test</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Col: Live Pipeline Stages & Terminal Feed */}
        <div className="lg:col-span-7 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verification State Pipeline</span>
              </span>
              <span className="text-cyan-300 font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Stage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {selectedScenario.stages.map((stage, idx) => {
              const isActive = currentStage === idx;
              const isPast = currentStage > idx || completed;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : isPast
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-200'
                      : 'bg-white/[0.02] border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      Phase 0{idx + 1}
                    </span>
                    {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <p className="text-xs font-bold text-white truncate">{stage.title}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-[10px] text-slate-400 font-mono">{stage.metricLabel}</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{stage.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Log Terminal Output */}
          <div className="p-3.5 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs max-h-36 overflow-y-auto space-y-1 scrollbar-thin">
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>Forensic Stream Output</span>
              </span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className="text-slate-300 text-[11px] leading-relaxed">
                {log.startsWith('[AUDIT_COMPLETE]') ? (
                  <span className="text-emerald-300 font-bold">{log}</span>
                ) : log.startsWith('[STAGE') ? (
                  <span className="text-cyan-300">{log}</span>
                ) : (
                  <span className="text-slate-400">{log}</span>
                )}
              </div>
            ))}
          </div>

          {/* Verified Cryptographic Verdict Card (Appears on Completion) */}
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-[#0A1220] to-purple-950/70 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-400 text-black font-extrabold flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wide">
                        STATUS: {selectedScenario.verdict.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• Score: {selectedScenario.verdict.trustScore}%</span>
                    </div>
                    <p className="text-xs text-slate-200 mt-0.5">{selectedScenario.verdict.summary}</p>
                    <span className="text-[10px] font-mono text-cyan-400/80 block mt-1">
                      Token Hash: {selectedScenario.verdict.hash}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-semibold self-end sm:self-center flex-shrink-0">
                  VP-CERTIFIED
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
