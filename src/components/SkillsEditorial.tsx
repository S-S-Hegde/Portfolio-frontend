import React from 'react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Boxes,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';

interface SkillItem {
  name: string;
  context: string;
  highlight?: string;
}

interface SkillGroup {
  category: string;
  icon: React.ElementType;
  description: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    icon: Code2,
    description: 'Core languages utilized for backend services, algorithmic logic, and web applications.',
    skills: [
      { name: 'JavaScript (ES6+)', context: 'Async event loop, functional patterns, Node.js runtime', highlight: 'Core Web Engine' },
      { name: 'TypeScript', context: 'Static type checking, interface contracts, React component safety', highlight: 'Type-Safe Full-Stack' },
      { name: 'Python', context: 'FastAPI microservices, AST module, PyTorch YOLOv10 & MediaPipe', highlight: 'VeriProof AI Engine' },
      { name: 'Java', context: 'Object-oriented programming, data structures, collections framework', highlight: 'Academic Foundations' },
      { name: 'C', context: 'Pointers, dynamic memory allocation, recursive data structures', highlight: 'IIT Kanpur Elite (73%)' },
    ],
  },
  {
    category: 'Frontend Development',
    icon: Layout,
    description: 'Building reactive, component-driven interfaces with accessible state management.',
    skills: [
      { name: 'React 18 & Vite', context: 'Hooks, custom state machines, component lifecycles, high-refresh bundler', highlight: 'Primary UI Framework' },
      { name: 'Tailwind CSS', context: 'Utility-first tokens, dark mode design systems, responsive layouts', highlight: 'Styling Architecture' },
      { name: 'WebGL & Three.js', context: 'GLSL shader rendering, 3D coordinate spaces, canvas interactivity', highlight: 'Creative Web' },
      { name: 'HTML5 & Semantic DOM', context: 'Semantic markup hierarchy, accessibility standards, screen-reader support', highlight: 'Web Standards' },
    ],
  },
  {
    category: 'Backend & System APIs',
    icon: Server,
    description: 'Architecting RESTful endpoints, streaming middleware, and asynchronous microservices.',
    skills: [
      { name: 'Node.js & Express 5', context: 'Asynchronous I/O, middleware pipelines, in-memory multipart streams', highlight: 'API Gateway' },
      { name: 'FastAPI (Python)', context: 'Asynchronous Python endpoints, Pydantic schemas, WebSocket streams', highlight: 'AI Microservice' },
      { name: 'RESTful API Architecture', context: 'Resource modeling, status codes, route validation, error handling', highlight: 'Backend Design' },
      { name: 'WebSockets', context: 'Bi-directional live communication, candidate proctoring heartbeats', highlight: 'Real-Time Telemetry' },
    ],
  },
  {
    category: 'Databases & Storage',
    icon: Database,
    description: 'Data modeling, aggregation computations, and secure session management.',
    skills: [
      { name: 'MongoDB Atlas', context: 'Document modeling, nested arrays, indexing, Atlas cloud clusters', highlight: 'Primary NoSQL Store' },
      { name: 'Mongoose ODM', context: 'Schema validation, pre/post middleware hooks, relational virtuals', highlight: 'Data Modeling' },
      { name: 'MongoDB Aggregations', context: 'Multi-stage pipelines ($group, $match, $sort) for live analytics', highlight: 'Expense Tracker Engine' },
      { name: 'JWT Authentication & RBAC', context: 'Stateless access/refresh tokens, role-based authorization gates', highlight: 'Security Scoping' },
    ],
  },
  {
    category: 'AI & Computer Vision Integration',
    icon: Cpu,
    description: 'Structured LLM extraction, on-device optical proctoring, and static AST code inspection.',
    skills: [
      { name: 'Google Gemini API', context: 'Structured JSON schema extraction from resumes and job specifications', highlight: 'VeriProof Core' },
      { name: 'YOLOv10 Nano (PyTorch)', context: 'Local optical detection for cell phones and multi-person presence', highlight: 'ACE Vision Guard' },
      { name: 'MediaPipe Biometrics', context: '468-point face mesh tracking, head pose estimation, gaze tracking', highlight: 'On-Device Telemetry' },
      { name: 'Python AST Module', context: 'Abstract syntax tree parsing to verify code complexity and authorship', highlight: 'Static Code Auditing' },
    ],
  },
  {
    category: 'DevOps, Tools & Workflows',
    icon: Boxes,
    description: 'Version control discipline, package workflows, and cloud application deployment.',
    skills: [
      { name: 'Git & GitHub', context: 'Branching workflows, commit auditing, GitHub REST API integrations', highlight: 'Daily Development' },
      { name: 'Vercel & Render', context: 'Continuous deployment pipelines, environment variable management', highlight: 'Cloud Deployment' },
      { name: 'Postman & cURL', context: 'API endpoint testing, mock servers, payload contract validation', highlight: 'API Verification' },
      { name: 'VS Code & npm', context: 'Modern tooling, linting, build optimization, workspace scripts', highlight: 'IDE Workflow' },
    ],
  },
];

export const SkillsEditorial: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-accent-lime" />
            <span className="uppercase tracking-wider">03 // TECHNICAL COMPETENCIES &amp; STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Architectural Domain Breakdown
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Honest representation of technologies applied across real project implementations—without fabricated percentage bars or unsupported seniority claims.
          </p>
        </div>

        {/* 6 Category Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0E1117] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-accent-lime">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {group.category}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {group.skills.length} Core Technologies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="space-y-3">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-accent-lime/30 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent-lime/10 border border-accent-lime/30 text-accent-lime shrink-0">
                              {skill.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsEditorial;
