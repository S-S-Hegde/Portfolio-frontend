import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Cpu,
  Eye,
  ShieldCheck,
  FileCode,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  Compass,
  MapPin,
  CheckCircle2,
  Server,
  Zap,
  Globe,
  Radio,
  FileText,
  Workflow,
  Code2,
  Search,
  Activity,
  FolderGit2,
  Terminal
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ArchitectureDiagramProps {
  projectId: string;
}

interface NodeDetail {
  id: string;
  title: string;
  badge: string;
  fileReference?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  description: string;
  tech: string[];
  specs: { label: string; value: string }[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ projectId }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'sequence' | 'codebase'>('diagram');

  const isVeriProof = projectId === 'veriproof';

  // VeriProof v3.0.0 Architecture Layers
  const veriproofNodes: { layer: string; subtitle: string; nodes: NodeDetail[] }[] = [
    {
      layer: 'Layer 1: Client Layer (React 18 + Vite on Vercel)',
      subtitle: 'State Management, Orbital Ring Processing & Investigator Dashboards',
      nodes: [
        {
          id: 'vp-client-processing',
          title: 'Candidate Processing Center & Orbital Ring',
          badge: 'Client / Real-Time UI',
          fileReference: 'CandidateProcessingCenter.jsx, ResumeUploadModal.jsx',
          icon: Activity,
          accentColor: '#00F0FF',
          description: 'Drag-and-drop resume upload (PDF/DOCX/TXT <=5MB), real-time orbital ring progression polling, and email forensic validation feedback.',
          tech: ['React 18', 'Vite', 'Framer Motion', 'useServerKeepAlive.js', 'Tailwind CSS'],
          specs: [
            { label: 'Max File Size', value: '5 MB' },
            { label: 'KeepAlive Ping', value: 'Every 3.5 mins' },
            { label: 'Polling Endpoints', value: '3 Concurrent Streams' },
            { label: 'State Sync', value: 'AuthContext + SkillTreeContext' }
          ]
        },
        {
          id: 'vp-client-dashboard',
          title: 'Student Dashboard & Dynamic Skill Tree',
          badge: 'Candidate Hub',
          fileReference: 'StudentDashboard.jsx, DynamicSkillTree.jsx, SkillTreePage.jsx',
          icon: Globe,
          accentColor: '#38BDF8',
          description: 'Candidate command center visualizing unlocked skill branches, XP progression curves, and 3D holographic verified project cards.',
          tech: ['Canvas / SVG', 'ProjectCard3D.jsx', 'SkillTreeContext', 'Framer Motion'],
          specs: [
            { label: 'Skill Branches', value: 'Dynamic Tree Mesh' },
            { label: 'Project Cards', value: 'Holographic 3D Cards' },
            { label: 'Auth Guard', value: 'Role-Based Protected Routes' }
          ]
        },
        {
          id: 'vp-client-recruiter',
          title: 'Investigator Hub & Talent Discovery',
          badge: 'Recruiter Suite',
          fileReference: 'InvestigatorHub.jsx, BulkScreening.jsx, JobRolesManager.jsx',
          icon: Search,
          accentColor: '#A855F7',
          description: 'Recruiter portal for candidate forensic dossier evaluation, automated bulk batch screening, role requirement mapping, and anti-fraud auditing.',
          tech: ['InvestigatorHub.jsx', 'BulkScreening.jsx', 'JobRolesManager.jsx', 'REST APIs'],
          specs: [
            { label: 'Audit Dossier', value: 'Evidence Breakdown' },
            { label: 'Batch Ingestion', value: 'Automated Multi-Candidate' },
            { label: 'Role Mapping', value: 'Skill Match Matrix' }
          ]
        }
      ]
    },
    {
      layer: 'Layer 2: API Gateway & Security Core (Node.js + Express 5 on Render)',
      subtitle: 'CORS Firewall, Rate Limiting, Asynchronous Pipeline Workers & KeepAlive Watchdog',
      nodes: [
        {
          id: 'vp-gateway',
          title: 'Express 5 Gateway & KeepAlive Watchdog',
          badge: 'Gateway Core',
          fileReference: 'server.js, config/db.js, useServerKeepAlive.js',
          icon: Server,
          accentColor: '#00F0FF',
          description: 'Express 5 entrypoint enforcing strict CORS allowlists (*.vercel.app, production, localhost), global error boundaries, and autonomous server-spin-down watchdogs.',
          tech: ['Node.js', 'Express 5', 'Mongoose ODM', 'Multer Buffer Streaming', 'CORS Guard'],
          specs: [
            { label: 'Cold-Start Guard', value: 'Watchdog Ping Warmed' },
            { label: 'Preflight Handling', value: 'Explicit OPTIONS Router' },
            { label: 'Credentials Mode', value: 'withCredentials (HttpOnly)' }
          ]
        },
        {
          id: 'vp-ratelimit',
          title: 'Multi-Tier Rate Limiting & Auth Guard',
          badge: 'Security Layer',
          fileReference: 'middleware/auth.js, middleware/rateLimiter.js',
          icon: Lock,
          accentColor: '#F59E0B',
          description: 'Multi-tiered rate limiters protecting against brute-force attacks, file flooding, and denial-of-service while preserving ultra-fast live polling.',
          tech: ['authLimiter (1,000/15m)', 'uploadLimiter (500/10m)', 'generalLimiter (3,000/15m)', 'JWT RBAC'],
          specs: [
            { label: 'Auth Limiter', value: '1,000 req / 15m' },
            { label: 'Upload Limiter', value: '500 req / 10m' },
            { label: 'General Polling', value: '3,000 req / 15m' },
            { label: 'Role Auth', value: 'Student / Recruiter RBAC' }
          ]
        },
        {
          id: 'vp-services',
          title: 'Intelligence Pipeline Workers',
          badge: 'Async Services',
          fileReference: 'services/resumeIntelligenceService.js, githubIntelligenceService.js',
          icon: Zap,
          accentColor: '#10B981',
          description: 'Asynchronous workers: email forensic check (registered vs resume email match), GitHub repo AST crawler, dynamic skill progression XP graph builder, and claim validation.',
          tech: ['resumeIntelligenceService', 'githubIntelligenceService', 'skillProgressionService', 'projectVerificationService'],
          specs: [
            { label: 'Email Forensic Check', value: 'Auto-Reject on Mismatch' },
            { label: 'GitHub Crawl', value: 'Async Non-Blocking AST' },
            { label: 'Claim Indexer', value: 'Unique claim_id Hashes' }
          ]
        }
      ]
    },
    {
      layer: 'Layer 3: AI Inference & Computer Vision (Python 3.11 on Render)',
      subtitle: 'FastAPI Microservices, YOLOv10 Nano Optical AI, MediaPipe Face Mesh & AST Code Grader',
      nodes: [
        {
          id: 'vp-python-vision',
          title: 'ACE Vision Guard & Edge Proctoring',
          badge: 'Edge Computer Vision',
          fileReference: 'python_engine/main.py, YOLOv10 Nano, MediaPipe 468-Mesh',
          icon: Eye,
          accentColor: '#EC4899',
          description: 'On-device optical proctoring running YOLOv10 Nano (Class 67 cell phone, Class 0 multi-person) and MediaPipe 468-point iris gaze & solvePnP 3D head pose estimation.',
          tech: ['FastAPI (Python 3.11)', 'YOLOv10 Nano', 'MediaPipe 468-Point Mesh', 'OpenCV', 'solvePnP'],
          specs: [
            { label: 'Mobile Detection', value: 'Class 67 (Conf >= 0.22)' },
            { label: 'Multi-Person Alert', value: 'Class 0 (Conf >= 0.40)' },
            { label: 'Head Pose Limit', value: '|Yaw| > 30° / |Pitch| > 25°' },
            { label: 'Privacy Standard', value: 'Zero Cloud Video Streaming' }
          ]
        },
        {
          id: 'vp-python-llm',
          title: 'Google Gemini & Hybrid NLP Claim Engine',
          badge: 'NLP & LLM Core',
          fileReference: 'python_engine/resume_intelligence/, trust_score_engine/',
          icon: Cpu,
          accentColor: '#A855F7',
          description: 'Deep semantic extraction analyzing parsed text against technical competency graphs, validating claims against raw GitHub code ASTs, and calculating composite trust scores.',
          tech: ['Google Gemini API', 'Local SLM Fallbacks', 'AST Code Crawler', 'Trust Score Engine'],
          specs: [
            { label: 'Extraction Mode', value: 'Deterministic Temp 0.2' },
            { label: 'AST Complexity', value: 'Cyclomatic Complexity Metric' },
            { label: 'Composite Score', value: '40% Test + 40% Resume + 20% Repo' }
          ]
        }
      ]
    },
    {
      layer: 'Layer 4: Database Layer & Evidence Store (MongoDB Atlas)',
      subtitle: 'Clustered Document Database, Cryptographic Verification Verdicts & Forensic Ledgers',
      nodes: [
        {
          id: 'vp-db-schemas',
          title: 'MongoDB Atlas Clustered NoSQL',
          badge: 'Database Cluster',
          fileReference: 'models/User.js, ResumeAnalysis.js, Project.js, VerificationResult.js',
          icon: Database,
          accentColor: '#10B981',
          description: 'Stores candidate & recruiter identities, parsed technical claims, unlocked skill tree nodes, synced GitHub project AST metadata, and cryptographic audit verdicts.',
          tech: ['MongoDB Atlas', 'Mongoose ODM', 'Compound Indexing', 'Atomic Schema Operations'],
          specs: [
            { label: 'User Model', value: 'Candidate & Recruiter RBAC' },
            { label: 'ResumeAnalysis', value: 'Parsed Claims & Skill Trees' },
            { label: 'Project Model', value: 'Verified Repos & AST Metrics' },
            { label: 'VerificationResult', value: 'Formal Verdicts & Credential ID' }
          ]
        }
      ]
    }
  ];

  // TourEase Architecture Layers
  const toureaseNodes: { layer: string; subtitle: string; nodes: NodeDetail[] }[] = [
    {
      layer: 'Layer 1: Presentation & Map Canvas (React 18 + Vite)',
      subtitle: 'Interactive Destination Exploration, Map Visualizer & Dynamic Schedules',
      nodes: [
        {
          id: 'te-client',
          title: 'React 18 Interactive Client',
          badge: 'Single Page App',
          fileReference: 'client/src/pages/Home.tsx, Explore.tsx, InteractiveMap.tsx',
          icon: Globe,
          accentColor: '#10B981',
          description: 'Responsive user interface for destination discovery, multi-day itinerary building, interactive Leaflet route visualization, and user auth.',
          tech: ['React.js 18', 'Tailwind CSS', 'Leaflet Maps', 'Lucide Icons'],
          specs: [
            { label: 'Map Rendering', value: 'Dynamic Tile Layer' },
            { label: 'Filtering', value: 'Category, Budget, Rating' }
          ]
        }
      ]
    },
    {
      layer: 'Layer 2: REST Gateway & Security (Node.js + Express)',
      subtitle: 'Stateless JWT Session Management, Search Controllers & CRUD Routing',
      nodes: [
        {
          id: 'te-api',
          title: 'Express.js REST Gateway',
          badge: 'Backend Controller',
          fileReference: 'server/routes/destinations.js, auth.js, server.js',
          icon: Server,
          accentColor: '#38BDF8',
          description: 'Secure RESTful endpoints handling JWT authentication, search aggregation, hotel/dining curation, and CRUD operations for saved journeys.',
          tech: ['Node.js', 'Express.js', 'JWT Authentication', 'bcryptjs', 'CORS Guard'],
          specs: [
            { label: 'API Architecture', value: 'RESTful JSON' },
            { label: 'Auth Strategy', value: 'Stateless Bearer JWT' }
          ]
        }
      ]
    },
    {
      layer: 'Layer 3: Hybrid AI Itinerary Engine',
      subtitle: 'xAI Grok 48-Hour Synthesis & Algorithmic Route Optimization',
      nodes: [
        {
          id: 'te-ai',
          title: 'Hybrid Grok AI + Rule Planner',
          badge: 'Hybrid AI Core',
          fileReference: 'server/services/itineraryEngine.js',
          icon: Cpu,
          accentColor: '#A855F7',
          description: 'Generates high-context personalized day 1-2 curated schedules using Grok AI, smoothly transitioning into algorithmic rule-based optimization for extended multi-day travel.',
          tech: ['xAI Grok API', 'Algorithmic Router', 'Waypoint Distance Matrix', 'Time Allocation Heuristics'],
          specs: [
            { label: 'Day 1 - 2', value: 'Grok AI Custom Synthesis' },
            { label: 'Day 3+', value: 'Algorithmic Optimization' },
            { label: 'P95 Latency', value: '1.10s' }
          ]
        }
      ]
    },
    {
      layer: 'Layer 4: Persistence & Database (MongoDB Atlas)',
      subtitle: 'Clustered Document Store for Destinations, Hotels & Collaborative Links',
      nodes: [
        {
          id: 'te-db',
          title: 'MongoDB Atlas Persistence',
          badge: 'NoSQL Data Store',
          fileReference: 'server/models/Destination.js, User.js, Itinerary.js',
          icon: Database,
          accentColor: '#F59E0B',
          description: 'Structured document database storing tourist spots, lodging, dining metadata, ratings, and user itineraries with shareable collaboration keys.',
          tech: ['MongoDB Atlas', 'Mongoose ODM', 'Geospatial Indexing', 'Aggregation Pipeline'],
          specs: [
            { label: 'Data Model', value: 'Destinations, Users, Itineraries' },
            { label: 'Indexes', value: 'Compound & GeoSpatial' }
          ]
        }
      ]
    }
  ];

  // Codebase Feature Matrix (VeriProof v3.0.0 official mapping)
  const veriproofFeatureMatrix = [
    {
      feature: 'Authentication & User State',
      frontend: 'AuthContext.jsx, UserAuthentication.jsx',
      backend: 'POST /api/users/register, POST /api/users/login, GET /api/users/profile',
      models: 'User.js (Candidate & Recruiter identity)'
    },
    {
      feature: 'Resume Upload & Polling Pipeline',
      frontend: 'ResumeUploadModal.jsx, CandidateProcessingCenter.jsx, useServerKeepAlive.js',
      backend: 'POST /api/users/profile/resume-file, GET /api/users/profile/resume-analysis, GET /api/keep-alive',
      models: 'ResumeAnalysis.js, User.js'
    },
    {
      feature: 'Anti-Fraud Email Forensic Check',
      frontend: 'CandidateProcessingCenter.jsx (Real-time reject alert)',
      backend: 'resumeIntelligenceService.js (extractEmailFromText + normalization)',
      models: 'ResumeAnalysis.js (status: Rejected on email mismatch)'
    },
    {
      feature: 'GitHub Repository Intelligence',
      frontend: 'StudentDashboard.jsx, ProjectCard3D.jsx',
      backend: 'githubIntelligenceService.js, GET /api/github/status, POST /api/projects/sync',
      models: 'Project.js (sourceType: resume_auto, match scores)'
    },
    {
      feature: 'Dynamic Skill Tree & XP Progression',
      frontend: 'SkillTreePage.jsx, DynamicSkillTree.jsx, SkillTreeContext.jsx',
      backend: 'skillProgressionService.js, GET /api/skill-tree',
      models: 'ResumeAnalysis.js (claims.skills), User.js'
    },
    {
      feature: 'Recruiter & Investigator Portal',
      frontend: 'InvestigatorHub.jsx, BulkScreening.jsx, JobRolesManager.jsx',
      backend: 'GET /api/users/applicants, POST /api/verify/audit',
      models: 'RecruiterApplicant.js, VerificationResult.js'
    },
    {
      feature: 'Edge Optical Proctoring & AI Grader',
      frontend: 'ACE Vision Guard WebSockets, ExamFlowManager',
      backend: 'FastAPI (Python 3.11), YOLOv10 Nano, MediaPipe 468-Mesh',
      models: 'VerificationResult.js, Python AST Cyclomatic Grader'
    }
  ];

  const currentLayers = isVeriProof ? veriproofNodes : toureaseNodes;
  const allNodes = currentLayers.flatMap((l) => l.nodes);
  const activeNodeDetail = allNodes.find((n) => n.id === selectedNode) || null;

  return (
    <div className="space-y-6">
      {/* Diagram Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-wider">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span>
              {isVeriProof ? 'VeriProof v3.0.0 Architecture & Codebase Map' : 'TourEase Architecture Topology'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isVeriProof
              ? 'Multi-tier distributed architecture spanning React 18, Express 5, Python 3.11 AI microservices & MongoDB Atlas.'
              : 'Interactive system topology connecting React 18, Node.js Express REST APIs, Grok AI, and MongoDB Atlas.'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 self-start sm:self-center">
          <button
            onClick={() => {
              soundFx.playClick();
              setViewMode('diagram');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'diagram'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diagram View
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setViewMode('sequence');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'sequence'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sequence View
          </button>
          {isVeriProof && (
            <button
              onClick={() => {
                soundFx.playClick();
                setViewMode('codebase');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewMode === 'codebase'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Codebase Map
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE: DIAGRAM */}
      {viewMode === 'diagram' && (
        <div className="space-y-6">
          {/* Visual Architecture Layers Grid */}
          <div className="space-y-5 relative">
            {currentLayers.map((layerGroup, lIdx) => (
              <div
                key={lIdx}
                className="p-5 md:p-6 rounded-3xl bg-[#090D15]/95 border border-white/10 relative overflow-hidden backdrop-blur-xl shadow-lg"
              >
                {/* Layer Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]" />
                      {layerGroup.layer}
                    </span>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {layerGroup.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20 self-start sm:self-center whitespace-nowrap">
                    Layer {lIdx + 1} of {currentLayers.length}
                  </span>
                </div>

                {/* Nodes in this Layer */}
                <div className={`grid gap-4 ${layerGroup.nodes.length >= 3 ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {layerGroup.nodes.map((node) => {
                    const NodeIcon = node.icon;
                    const isSelected = selectedNode === node.id;

                    return (
                      <motion.div
                        layout
                        key={node.id}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedNode(isSelected ? null : node.id);
                        }}
                        whileHover={{ scale: isSelected ? 1.0 : 1.012 }}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-b from-[#0e1626] to-[#0a101b] border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.25)] ring-1 ring-cyan-400'
                            : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div>
                          {/* Card Top Bar */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="p-2.5 rounded-xl border flex-shrink-0"
                                style={{
                                  backgroundColor: `${node.accentColor}15`,
                                  borderColor: `${node.accentColor}40`,
                                  color: node.accentColor,
                                }}
                              >
                                <NodeIcon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-200 leading-snug">
                                  {node.title}
                                </h4>
                                <span className="text-xs font-mono text-slate-400 block mt-0.5">
                                  {node.badge}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                            {node.description}
                          </p>

                          {/* File Reference Badge */}
                          {node.fileReference && (
                            <div className="mb-3 text-xs font-mono text-cyan-300/90 bg-black/50 p-2.5 rounded-xl border border-cyan-500/20 break-words leading-relaxed">
                              <span className="text-slate-400 block text-[10px] uppercase mb-0.5">Source Implementation:</span>
                              📁 <span className="text-slate-200">{node.fileReference}</span>
                            </div>
                          )}

                          {/* Action Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFx.playClick();
                              setSelectedNode(isSelected ? null : node.id);
                            }}
                            className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 mb-2 ${
                              isSelected
                                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                                : 'bg-white/5 border-white/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/40'
                            }`}
                          >
                            <span>{isSelected ? 'Collapse Specs ▲' : 'Inspect Specs & Metrics ▼'}</span>
                          </button>
                        </div>

                        {/* Inline Expandable Technical Dossier */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 pt-3 border-t border-cyan-500/30 space-y-3.5"
                            >
                              <div className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                                ⚡ Technical Specs & Benchmarks:
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {node.specs.map((spec, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="p-2.5 rounded-xl bg-black/60 border border-cyan-500/25 flex flex-col justify-center"
                                  >
                                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                                      {spec.label}
                                    </span>
                                    <span className="text-xs font-mono font-bold text-cyan-300">
                                      {spec.value}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 border-t border-white/5">
                                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
                                  Integrated Technologies:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {node.tech.map((t, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2.5 py-1 text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 rounded-lg"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Compact Tech pills when collapsed */}
                        {!isSelected && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                            {node.tech.slice(0, 3).map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 text-[11px] font-mono bg-white/5 rounded-lg border border-white/10 text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                            {node.tech.length > 3 && (
                              <span className="px-2 py-1 text-[11px] font-mono text-slate-400 bg-white/[0.02] rounded-lg border border-white/5">
                                +{node.tech.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Animated Connecting Vector (except last layer) */}
                {lIdx < currentLayers.length - 1 && (
                  <div className="flex justify-center my-2 pt-4">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono animate-pulse">
                      <span>Data Pipeline Stream (HTTPS / REST / WebSockets)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE: SEQUENCE (End-to-End Data Flow) */}
      {viewMode === 'sequence' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-cyan-950/30 via-[#090D15] to-purple-950/20 border border-cyan-500/30 shadow-xl">
          <div className="mb-6 pb-4 border-b border-white/10">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              {isVeriProof ? 'VeriProof End-to-End Resume Lifecycle Data Flow' : 'TourEase Dynamic Route Planning Lifecycle'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isVeriProof
                ? 'Chronological pipeline from multipart candidate upload through in-memory extraction, email anti-fraud check, GitHub AST sync to 100% dashboard hydration.'
                : 'Step-by-step pipeline from preference selection to Grok AI prompt synthesis and MongoDB persistence.'}
            </p>
          </div>

          <div className="space-y-4 relative">
            {(isVeriProof
              ? [
                  { step: '1. Resume Drop & File Stream', desc: 'Candidate drags PDF/DOCX/TXT (<=5MB) into ResumeUploadModal. Validated locally and streamed as FormData to POST /api/users/profile/resume-file.', target: 'Candidate Browser -> Express Backend' },
                  { step: '2. In-Memory Ingestion & Text Parsing', desc: 'Multer streams the binary buffer directly into memory; pdf-parse extracts raw UTF-8 text, contact identifiers, and candidate GitHub handle.', target: 'Express Gateway (Memory Buffer)' },
                  { step: '3. Anti-Fraud Email Forensic Check', desc: 'Extracts and normalizes email (handling Gmail plus/dot alias rules). If resume email contradicts authenticated session email, execution auto-rejects immediately with "Email Mismatch".', target: 'Security Gate (resumeIntelligenceService)' },
                  { step: '4. Async Claim Extraction & Skill Indexing', desc: 'Gemini LLM and deterministic parsers extract technical competency claims, index unique claim_id hashes, and map skills to ResumeAnalysis.claims.skills.', target: 'Python AI / Gemini -> MongoDB Atlas' },
                  { step: '5. Non-Blocking Live Polling Loop', desc: 'CandidateProcessingCenter simultaneously polls GET /api/users/profile/resume-analysis and GET /api/users/profile, advancing the orbital ring (25% -> 55% -> 85%).', target: 'Client Polling (Heartbeat Watchdog)' },
                  { step: '6. Automated GitHub Intelligence Pipeline', desc: 'Crawls candidate repositories asynchronously, analyzes language distributions, checks AST code structure, and auto-generates verified project cards.', target: 'githubIntelligenceService -> GitHub REST API' },
                  { step: '7. Dynamic Skill Graph Rebuild & Unlock', desc: 'Calculates node mastery levels, applies experience points (XP), and unlocks corresponding interactive branches on the visual skill graph.', target: 'skillProgressionService -> SkillTreeContext' },
                  { step: '8. Profile Finalization & Dashboard Hydration', desc: 'Backend marks user.resumeStatus = "Analyzed". Client accelerates orbital progress to 100%, updates global AuthContext, and renders the fully hydrated StudentDashboard.', target: 'MongoDB Atlas -> StudentDashboard.jsx' }
                ]
              : allNodes.map((n) => ({ step: n.title, desc: n.description, target: n.badge }))
            ).map((s, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xs font-mono font-black text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    {idx + 1}
                  </div>
                  {idx < (isVeriProof ? 7 : allNodes.length - 1) && (
                    <div className="w-0.5 h-14 bg-cyan-500/30 my-1" />
                  )}
                </div>
                <div className="pt-0.5 flex-1 p-4 sm:p-5 rounded-2xl bg-[#080C14] border border-white/10 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-sm sm:text-base font-bold text-white">{s.step}</span>
                    <span className="text-xs font-mono px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 self-start sm:self-auto font-medium">
                      {s.target}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE: CODEBASE FEATURE MATRIX (VeriProof v3.0.0 Map) */}
      {viewMode === 'codebase' && isVeriProof && (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#090D14] border border-white/10 space-y-5 shadow-xl">
          <div className="pb-4 border-b border-white/10">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              VeriProof Codebase Architecture & Feature-to-File Map
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comprehensive mapping connecting frontend React components, Express REST endpoints, Python AI microservices, and MongoDB Atlas database models.
            </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-cyan-400 uppercase text-[11px] bg-white/[0.03]">
                  <th className="py-3.5 px-4 font-bold">Feature Domain</th>
                  <th className="py-3.5 px-4 font-bold">Frontend React Components</th>
                  <th className="py-3.5 px-4 font-bold">Backend Handlers & Endpoints</th>
                  <th className="py-3.5 px-4 font-bold">Database Models</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {veriproofFeatureMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap bg-white/[0.01]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-slate-300 leading-relaxed">
                      {row.frontend}
                    </td>
                    <td className="py-4 px-4 text-emerald-300 font-mono leading-relaxed">
                      {row.backend}
                    </td>
                    <td className="py-4 px-4 text-purple-300 leading-relaxed">
                      {row.models}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
