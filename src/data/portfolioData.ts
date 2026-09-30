import { Project, SkillCategory, EducationItem, CertificationItem } from '../types';

export const PERSONAL_INFO = {
  name: "Shridhar Sharatkumar Hegde",
  shortName: "Shridhar Hegde",
  title: "Full-Stack Web Developer & AI Systems Integrator",
  headline: "Architecting forensic assessment engines, multi-LLM orchestration pipelines, and scalable full-stack web platforms.",
  email: "shridharhhegde@gmail.com",
  phone: "+91-9449146533",
  location: "Karnataka, India",
  college: "SDM Institute of Technology, Ujire",
  graduation: "Expected May 2027",
  cgpa: "8.31 / 10",
  github: "https://github.com/S-S-Hegde",
  githubHandle: "S-S-Hegde",
  linkedin: "https://linkedin.com/in/shridhar-s-hegde-5655jmm",
  linkedinHandle: "shridhar-s-hegde-5655jmm",
  summary: "Information Science & Engineering undergraduate with hands-on experience building full-stack web applications using React.js, Node.js, Express.js, MongoDB, and Python AI microservices. Architect of VeriProof, an enterprise-grade forensic candidate skill verification and AI proctoring platform combining multi-LLM cascading, local YOLOv10/MediaPipe computer vision, AST code analysis, and server-authoritative submission firewalls. Specializing in high-throughput backend engineering, anti-tamper security, and multi-modal AI systems.",
  languages: ["English", "Kannada", "Hindi"],
  availability: "Available for Internships & Full-Time Roles (2027 Grad)",
  stats: [
    { label: "Engineering CGPA", value: "8.31", suffix: "/10", detail: "SDM Institute of Technology" },
    { label: "VeriProof Active Codebase", value: "64.5K+", suffix: "LOC", detail: "330+ Files Across React, Node & Python" },
    { label: "Failover Cascade", value: "6-Tier", suffix: "Engines", detail: "Gemini, Groq, Mistral, OpenRouter, Python, Algo" },
    { label: "Optical Edge AI", value: "YOLOv10", suffix: "+ MediaPipe", detail: "Local On-Device ACE Vision Guard" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "veriproof",
    title: "VeriProof",
    subtitle: "Automated Full-Stack Candidate Proof-of-Skill & Anti-Fraud Verification Platform",
    period: "Official Architecture v3.0.0",
    category: "AI & Backend",
    featured: true,
    accentColor: "#00F0FF",
    iconName: "ShieldCheck",
    description: "A multi-tier, distributed anti-fraud skill verification platform combining React 18 client hubs, Node.js/Express 5 API Gateway, Python 3.11 FastAPI AI inference microservices, YOLOv10/MediaPipe computer vision, AST repository fidelity auditing, and MongoDB Atlas.",
    fullOverview: "VeriProof is an enterprise-grade automated candidate verification ecosystem designed to eliminate resume fraud and credential inflation. The platform features an in-memory multipart streaming pipeline with anti-fraud email forensic validation (auto-rejecting registered vs resume email mismatches), multi-tier rate limiting (1,000 auth, 500 upload, 3,000 general polling), and autonomous server KeepAlive watchdogs. A Python 3.11 FastAPI microservice runs on-device YOLOv10/MediaPipe optical proctoring, Google Gemini semantic claim extraction, and repository AST code auditing. Verified skills compile dynamically into interactive Canvas/SVG skill trees, 3D holographic project cards, and recruiter investigator audit dossiers with cryptographic VP-XXXXXXXX credentials.",
    tags: ["React 18", "Express 5", "Python 3.11", "FastAPI", "MongoDB Atlas", "YOLOv10 Nano", "MediaPipe 468 Mesh", "Google Gemini", "AST Code Analysis", "JWT / RBAC", "KeepAlive Watchdog", "Multer Stream"],
    metrics: [
      { label: "Architecture Spec", value: "Official v3.0.0" },
      { label: "Gateway & Core", value: "Express 5 + Mongoose" },
      { label: "Optical Edge AI", value: "YOLOv10 + MediaPipe" },
      { label: "Database Cluster", value: "MongoDB Atlas NoSQL" }
    ],
    bulletPoints: [
      "Architected a multi-tier distributed ecosystem across React 18 (Vercel), Express 5 API Gateway (Render), Python 3.11 FastAPI AI services, and MongoDB Atlas.",
      "Implemented an in-memory multipart resume parsing pipeline with anti-fraud email forensic validation (auto-rejecting registered vs resume email mismatches).",
      "Engineered autonomous server Keep-Alive watchdogs (useServerKeepAlive.js, 3.5m heartbeat) and multi-tier rate limiters (1k auth, 500 upload, 3k live polling).",
      "Developed ACE Vision Guard: on-device zero-cloud-streaming proctoring with YOLOv10 Nano (Class 67 phone, Class 0 multi-person) and MediaPipe 468-point face mesh over WebSockets.",
      "Built an automated GitHub repository intelligence service indexing commit histories, language distributions, and raw codebase ASTs against resume claims.",
      "Designed dynamic skill progression graphs (XP logic, branch unlocking) and recruiter Investigator Hubs with bulk screening and cryptographic VP-credential minting."
    ],
    architecture: {
      title: "VeriProof End-to-End Distributed Ecosystem Architecture",
      flow: [
        "1. Client Layer (React 18 + Vite / Vercel): CandidateProcessingCenter, DynamicSkillTree, InvestigatorHub, useServerKeepAlive",
        "2. API Gateway (Node.js + Express 5 / Render): CORS Allowlist, Rate Limiters (1k/500/3k), Multer in-memory stream, Email forensic check",
        "3. AI Inference Engine (Python 3.11 / Render): FastAPI microservices, YOLOv10/MediaPipe vision, Google Gemini claim extraction, AST auditor",
        "4. Database Layer (MongoDB Atlas): User identities, ResumeAnalyses claims, Project repos, RecruiterApplicants, VerificationResults",
        "5. Evidence Ledger & Minting: 3-way composite trust scoring, recruiter HTML forensic audit reports, cryptographic VP-credential minting"
      ],
      details: "Official System Architecture v3.0.0 — Distributed full-stack architecture across React 18, Node.js Express 5, Python 3.11 FastAPI, PyTorch YOLOv10, and MongoDB Atlas."
    },
    demoUrl: "https://veriproof.vercel.app/",
    githubUrl: "https://github.com/S-S-Hegde"
  },
  {
    id: "tourease",
    title: "TourEase",
    subtitle: "AI-Assisted Travel Discovery & Smart Itinerary Planning Platform",
    period: "Completed Project",
    category: "Full-Stack Web",
    featured: true,
    accentColor: "#10B981",
    iconName: "Compass",
    description: "A comprehensive travel platform featuring intelligent destination discovery, interactive map-based route visualization, MongoDB-backed CRUD operations, and hybrid Grok AI itinerary planning.",
    fullOverview: "TourEase streamlines vacation planning from search to execution. It offers destination discovery across tourist attractions, hotels, dining, and lodging. Features a hybrid AI planner that generates high-context itineraries for the initial 48 hours using Grok AI and transitions into algorithmic rule-based planning for extended journeys.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Grok AI", "Map Visualization", "REST APIs", "Tailwind CSS"],
    metrics: [
      { label: "Itinerary Engine", value: "Hybrid Grok + Algorithmic" },
      { label: "Data Pipeline", value: "MongoDB CRUD" },
      { label: "Mapping", value: "Interactive Route Visuals" },
      { label: "Admin Suite", value: "Full Destination Management" }
    ],
    bulletPoints: [
      "Developed a full-stack travel planning platform with registration/login, destination search, and discovery of tourist places, hotels, dining, and lodging options.",
      "Implemented itinerary planning, map-based route visualization, REST APIs, MongoDB-backed CRUD operations, recommendations, and admin functionality.",
      "Integrated an AI chatbot and Grok-assisted itinerary generation for the first two days of a trip, with subsequent days handled by application-driven planning logic.",
      "Built interactive UI components in React with responsive state handling, seamless filtering, and fast map rendering."
    ],
    architecture: {
      title: "TourEase Hybrid Itinerary & Mapping Flow",
      flow: [
        "User specifies destination, preferences, dates & group dynamics",
        "Grok AI generates high-context custom day 1-2 curated schedules",
        "Algorithmic engine crafts optimized itinerary for remaining trip days",
        "Map layer plots geographic waypoints, lodging & recommended dining nodes",
        "MongoDB persists user itineraries with collaborative shareable links"
      ],
      details: "Built with performant RESTful endpoints on Express.js, secured session handling, and structured aggregation queries in MongoDB."
    },
    demoUrl: "https://tourease-six.vercel.app",
    githubUrl: "https://github.com/S-S-Hegde"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Core languages used for systems, backend algorithms, computer vision pipelines, and scalable web services.",
    icon: "Code2",
    skills: [
      { name: "Java", level: 88, description: "Object-oriented design, collections framework, data structures & algorithms", highlight: "Academic & Systems Problem Solving" },
      { name: "JavaScript (ES6+) & TypeScript", level: 94, description: "Async/await, event loop, functional patterns, Node.js runtime, type safety", highlight: "Full-Stack Core Engine" },
      { name: "Python", level: 90, description: "FastAPI, OpenCV, YOLOv10 integration, MediaPipe biometric landmarker pipelines, AST analysis", highlight: "VeriProof Vision AI Engine" },
      { name: "C", level: 85, description: "Memory management, pointers, low-level data structures (IIT Kanpur Elite Certified)", highlight: "IIT Kanpur 73% Certified" }
    ]
  },
  {
    category: "AI, Vision & LLM Engineering",
    description: "Multi-LLM cascading, on-device optical proctoring, and computer vision neural networks.",
    icon: "Cpu",
    skills: [
      { name: "Multi-LLM Cascade (Gemini, Groq, Mistral)", level: 93, description: "6-tier failover cascade, low-temp deterministic schema extraction, zero-length bias mitigation", highlight: "VeriProof AI Pipeline" },
      { name: "YOLOv10 Nano & Computer Vision", level: 89, description: "Local optical detection for cell phones (Class 67) & multi-person assistance (Class 0)", highlight: "ACE Vision Guard" },
      { name: "MediaPipe Biometrics & Gaze", level: 91, description: "468-point face mesh, iris Euclidean corner ratio tracking, solvePnP 3D head pose estimation", highlight: "Biometric Telemetry" },
      { name: "AST Code Analysis", level: 88, description: "Python abstract syntax tree compilation, cyclomatic complexity grading, syntax validation", highlight: "Automated Grading" }
    ]
  },
  {
    category: "Frontend Engineering",
    description: "Crafting reactive, accessible, high-performance user interfaces and assessment lockdown environments.",
    icon: "Layout",
    skills: [
      { name: "React 18 & Vite", level: 92, description: "State machines, WebSocket optical feeds, custom hooks, real-time violation modals, Tailwind CSS", highlight: "VeriProof & TourEase UI" },
      { name: "HTML5, CSS3 & WebGL Shaders", level: 95, description: "Semantic markup, GLSL 3D shader rendering, Three.js mesh integration, keyframe animations", highlight: "Modern Semantic Standards" },
      { name: "Tailwind CSS", level: 90, description: "Utility-first design system, dark mode architecture, custom tokens", highlight: "Production Styling" }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Architecting high-throughput REST APIs, WebSocket streaming servers, and middleware firewalls.",
    icon: "Server",
    skills: [
      { name: "Node.js & Express.js", level: 93, description: "Asynchronous I/O, RESTful routes, submission firewall middleware, Nodemailer forensic reports", highlight: "API & Security Backbone" },
      { name: "FastAPI & WebSockets", level: 90, description: "Asynchronous Python microservices, real-time optical video telemetry, 15-frame ring buffers", highlight: "Proctoring WebSocket" },
      { name: "REST APIs & Middleware", level: 94, description: "Resource modeling, anti-tamper validation, IDOR prevention, anti-replay session ownership", highlight: "Security Middleware" }
    ]
  },
  {
    category: "Databases & Security",
    description: "Data modeling, anti-tamper reconciliation ledgers, and identity management protocols.",
    icon: "ShieldAlert",
    skills: [
      { name: "MongoDB & Mongoose ODM", level: 90, description: "Document modeling, serverViolation arrays, 3-frame proof snapshot persistence, indexing", highlight: "Primary NoSQL Store" },
      { name: "JWT & Multi-Tenant RBAC", level: 92, description: "Stateless access/refresh tokens, Student, Recruiter, and Admin role permission gates", highlight: "Identity & RBAC" },
      { name: "Submission Firewall & Cryptography", level: 93, description: "Fixed denominator scoring, server-authoritative strike reconciliation, VP-credential minting", highlight: "Anti-Cheat Firewall" }
    ]
  },
  {
    category: "Developer Tools & Cloud",
    description: "Cloud hosting targets, version control workflows, and developer infrastructure.",
    icon: "Boxes",
    skills: [
      { name: "Git & GitHub", level: 92, description: "Branching workflows, commit velocity analysis, GitHub REST API repository code auditing", highlight: "Daily Workflow & Evidence Engine" },
      { name: "Vercel & Render", level: 88, description: "Continuous deployment, serverless hosting, environment variable config", highlight: "Cloud Hosting" },
      { name: "VS Code & npm", level: 95, description: "Modern IDE workflow, package scripting, build optimization", highlight: "Development Environment" }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "SDM Institute of Technology, Ujire, Karnataka",
    degree: "Bachelor of Engineering — Information Science & Engineering",
    period: "Expected Graduation: May 2027",
    score: "8.31 / 10",
    scoreLabel: "Current CGPA",
    location: "Ujire, Karnataka, India",
    highlights: [
      "Specializing in Data Structures, Algorithms, Backend Systems & Web Architectures",
      "Consistent academic excellence with 8.31 CGPA",
      "Lead architect of VeriProof: 64,500+ LOC forensic technical assessment and AI proctoring platform"
    ],
    icon: "GraduationCap",
    image: "/sdmit.jpg",
    websiteUrl: "https://sdmit.in"
  },
  {
    institution: "Sri Rama Pre-University College, Kalladka",
    degree: "Pre-University Course (PUC) — Science (PCMB)",
    period: "Completed",
    score: "91.83%",
    scoreLabel: "Score (551 / 600)",
    location: "Kalladka, Bantwal, Karnataka",
    highlights: [
      "Achieved 91.83% aggregate (551/600) with distinction across Science and Mathematics",
      "Shri Rama Vidyakendra Trust — rigorous academic training in physics, chemistry, and mathematics",
      "Built strong foundational analytical thinking, logic, and problem-solving discipline"
    ],
    icon: "Award",
    image: "/sri_rama_puc.jpg",
    websiteUrl: "https://shriramakalladka.in"
  },
  {
    institution: "Shriniketana School, Isloor, Sirsi",
    degree: "Central Board of Secondary Education (CBSE) — 10th Standard",
    period: "Completed",
    score: "94.0%",
    scoreLabel: "Aggregate Score",
    location: "Isloor, Sirsi, Uttara Kannada, Karnataka",
    highlights: [
      "Ranked in top academic bracket with a 94.0% CBSE aggregate score",
      "Managed by Sri Rajarajeshwari Vidya Samsthe of Sri Sonda Swarnavalli Maha Samsthana (CBSE Affiliation No: 830436)",
      "Demonstrated excellence in mathematical sciences, logical computing, and scientific problem-solving"
    ],
    icon: "BookOpen",
    image: "/shriniketana.jpg",
    websiteUrl: "http://www.shriniketansirsi.org"
  }
];


export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "nptel-c",
    title: "Introduction to Programming in C — NPTEL Online Certification (Elite)",
    issuer: "Indian Institute of Technology Kanpur / NPTEL",
    recipient: "SHRIDHAR SHARATKUMAR HEGDE",
    year: "2025",
    issueDate: "Jul-Sep 2025 (8 week course)",
    credentialId: "NPTEL25CS119S541500128",
    score: "73% (Elite Tier)",
    scoreBreakdown: [
      { label: "Consolidated Score", value: "73 %" },
      { label: "Online Assignments", value: "25 / 25" },
      { label: "Proctored Exam", value: "47.87 / 75" },
      { label: "Certified Candidates", value: "1,771" },
      { label: "Recommended Credits", value: "2 or 3 Credits" }
    ],
    badgeType: "Elite",
    authority: "Indian Institute of Technology Kanpur • Funded by MoE, Govt. of India • Skill India • SWAYAM",
    signatories: "Prof. B. V. Ratish Kumar (Chairman, Centre for Continuing Education, IIT Kanpur) & Prof. Satyaki Roy (NPTEL Coordinator, IIT Kanpur)",
    verificationUrl: "https://nptel.ac.in/noc",
    description: "Rigorous 8-week mastery in C language architecture, pointers, dynamic memory allocation, recursive data structures, and algorithmic logic verified through nationwide proctored examination by IIT Kanpur.",
    skills: ["C Programming", "Pointers & Memory", "Data Structures", "Dynamic Allocation", "Algorithmic Logic"],
    icon: "Cpu"
  },
  {
    id: "infosys-ml",
    title: "Explore Machine Learning using Python",
    issuer: "Infosys Springboard",
    recipient: "SHRIDHAR SHARATKUMAR HEGDE",
    year: "2026",
    issueDate: "Saturday, March 7, 2026",
    score: "Course Completion",
    scoreBreakdown: [
      { label: "Status", value: "Successfully Completed" },
      { label: "Issued Date", value: "March 7, 2026" },
      { label: "Verification Platform", value: "Infosys Wingspan" }
    ],
    badgeType: "Specialization",
    authority: "Infosys Limited — Springboard Digital Academy",
    signatories: "Satheesha B. Nanjappa (Senior Vice President and Head Education, Training and Assessment, Infosys Limited)",
    verificationUrl: "https://verify.onwingspan.com",
    description: "Applied machine learning fundamentals in Python covering supervised and unsupervised learning, regression pipelines, classification algorithms, validation matrices, and data preprocessing.",
    skills: ["Python", "Machine Learning", "Model Evaluation", "Data Pipelines", "Scikit-Learn"],
    icon: "Brain"
  },
  {
    id: "infosys-blockchain",
    title: "Blockchain Technologies & Architecture",
    issuer: "Infosys Springboard",
    recipient: "SHRIDHAR SHARATKUMAR HEGDE",
    year: "2026",
    issueDate: "Saturday, March 7, 2026",
    score: "Program Completion",
    scoreBreakdown: [
      { label: "Status", value: "Program Certified" },
      { label: "Issued Date", value: "March 7, 2026" },
      { label: "Verification Platform", value: "Infosys Wingspan" }
    ],
    badgeType: "Specialization",
    authority: "Infosys Limited — Springboard Digital Academy",
    signatories: "Satheesha B. Nanjappa (Senior Vice President and Head Education, Training and Assessment, Infosys Limited)",
    verificationUrl: "https://verify.onwingspan.com",
    description: "Comprehensive study of blockchain distributed ledgers, cryptographic hashing, consensus algorithms, peer-to-peer network topologies, smart contracts, and decentralized system security.",
    skills: ["Decentralized Systems", "Smart Contracts", "Cryptographic Hashing", "Consensus Topologies", "Security"],
    icon: "Boxes"
  },
  {
    id: "infosys-nextgen",
    title: "Next Gen Technologies",
    issuer: "Infosys Springboard",
    recipient: "SHRIDHAR SHARATKUMAR HEGDE",
    year: "2026",
    issueDate: "Saturday, March 7, 2026",
    score: "Course Completion",
    scoreBreakdown: [
      { label: "Status", value: "Successfully Completed" },
      { label: "Issued Date", value: "March 7, 2026" },
      { label: "Verification Platform", value: "Infosys Wingspan" }
    ],
    badgeType: "Foundation",
    authority: "Infosys Limited — Springboard Digital Academy",
    signatories: "Satheesha B. Nanjappa (Senior Vice President and Head Education, Training and Assessment, Infosys Limited)",
    verificationUrl: "https://verify.onwingspan.com",
    description: "Exploration of enterprise cloud paradigms, modern software engineering methodologies, distributed architectures, AI operationalization, and next-generation tech ecosystems.",
    skills: ["Cloud Paradigms", "Emerging Tech", "Enterprise AI", "Distributed Systems"],
    icon: "Sparkles"
  }
];

export const TERMINAL_COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands in Shridhar OS Terminal v2.4:",
    "  • about        - Summary of Shridhar Sharatkumar Hegde",
    "  • skills       - Overview of technical skills & proficiencies",
    "  • projects     - Inspect featured projects (VeriProof, TourEase)",
    "  • veriproof    - Deep-dive into the VeriProof Forensic Assessment Platform",
    "  • architecture - Full architectural breakdown of VeriProof v2.4",
    "  • proctoring   - Inspect ACE Vision Guard on-device optical engine",
    "  • tourease     - Deep-dive into TourEase AI Travel Platform",
    "  • education    - View college & academic scores (SDM-IT 8.31 CGPA)",
    "  • certs        - Display verified certifications (IIT Kanpur, Infosys)",
    "  • contact      - Get email, phone, and direct social links",
    "  • stack        - Quick tech stack breakdown",
    "  • clear        - Clear the terminal screen",
    "  • sudo hire    - Fast-track recruiter action 🚀"
  ],
  about: [
    "👤 Shridhar Sharatkumar Hegde",
    "🎓 BE Information Science & Engineering @ SDM Institute of Technology (CGPA: 8.31)",
    "📍 Karnataka, India | Expected Graduation: May 2027",
    "💼 Full-Stack Engineer & AI Systems Integrator specializing in React 18, Node.js, Express, MongoDB, Python FastAPI, & Multi-LLM Pipelines."
  ],
  skills: [
    "💻 Programming: Java, JavaScript (ES6+), TypeScript, Python, C (IIT Kanpur Elite)",
    "🎨 Frontend: React 18, Vite, Tailwind CSS, WebGL Shaders, Three.js",
    "⚙️ Backend: Node.js, Express.js, FastAPI (Python), WebSockets, REST APIs",
    "🗄️ Database: MongoDB (Aggregation, Ring Buffer Snapshots, Mongoose), SQL",
    "👁️ Vision AI & Edge: YOLOv10 Nano, MediaPipe 468 Mesh, solvePnP 3D Head Pose, Iris Gaze",
    "🔒 Security: JWT (Access & Refresh), RBAC, Anti-Tamper Submission Firewall, AST Code Analysis",
    "🤖 Multi-LLM: 6-Tier Cascade (Gemini, Groq Llama 3.3, Mistral, OpenRouter, Python Gateway, Algo)"
  ],
  projects: [
    "1. [VeriProof] Enterprise Forensic Technical Assessment & Integrity Platform",
    "   → 64.5K+ LOC | 6-Tier LLM Cascade + ACE Vision Guard (YOLOv10 + MediaPipe) + Anti-Tamper Firewall",
    "2. [TourEase] AI-Assisted Travel Discovery & Smart Itinerary Planning Platform",
    "   → Grok AI 2-Day Itineraries + Algorithmic Planning + Route Visualizer"
  ],
  veriproof: [
    "🛡️ VeriProof — Automated Candidate Proof-of-Skill & Anti-Fraud Verification (v3.0.0)",
    "• Official Deployment: Client (Vercel) + Express 5 API Gateway (Render) + Python 3.11 AI (Render) + MongoDB Atlas.",
    "• Anti-Fraud Ingestion: Multer in-memory stream + Email forensic check (auto-rejects registered vs resume email mismatches).",
    "• ACE Vision Guard: On-device optical proctoring with YOLOv10 Nano & MediaPipe 468-mesh iris/head pose telemetry.",
    "• Infrastructure: Multi-tier rate limits (1k auth, 500 upload, 3k general) + autonomous KeepAlive watchdog.",
    "• Dynamic Skill Graph: Unlocks interactive skill tree branches, calculates XP, and mints cryptographic VP-credentials.",
    "• Recruiter Suite: Investigator Hub with bulk batch screening and automated candidate forensic audit dossiers."
  ],
  architecture: [
    "📐 VeriProof System Architecture & Codebase Map (v3.0.0):",
    "  [Client Layer] React 18 / Vite / CandidateProcessingCenter / StudentDashboard / InvestigatorHub / useServerKeepAlive",
    "  [API Gateway] Node.js / Express 5 / CORS Gateway / rateLimiter (1k/500/3k) / Mongoose ODM / Multer Streaming",
    "  [AI Engine] Python 3.11 / FastAPI / YOLOv10 Nano / MediaPipe 468 Face Mesh / Google Gemini / AST Code Auditor",
    "  [Database] MongoDB Atlas Clustered NoSQL (User, ResumeAnalysis, Project, RecruiterApplicant, VerificationResult)",
    "  [Security] Email forensic mismatch blocker, HttpOnly JWT cookies, cryptographic VP-XXXXXXXX credential minting"
  ],
  proctoring: [
    "👁️ ACE Vision Guard Telemetry:",
    "  • Mobile Phone Detection: YOLOv10 Class 67 (Conf >= 0.22)",
    "  • Multi-Person Detection: YOLOv10 Class 0 (Count >= 2, Conf >= 0.40)",
    "  • 3D Head Pose Deviation: |Yaw| > 30° / |Pitch| > 25° (solvePnP)",
    "  • Iris Gaze Tracking: Horizontal Ratio < 0.25 || > 0.75",
    "  • Forensic Ring Buffer: 15-frame deque extracts 3-frame burst (t_start, t_mid, t_end)"
  ],
  tourease: [
    "🧭 TourEase — AI-Assisted Travel Planning Platform",
    "• Live Demo: https://tourease-six.vercel.app",
    "• Destination exploration, hotels, dining, and map-based route visualization.",
    "• Hybrid Grok AI chatbot generates high-precision custom 2-day itineraries with algorithmic extension.",
    "• Tech: React.js, Node.js, Express.js, MongoDB, Leaflet Maps"
  ],
  education: [
    "🏫 SDM Institute of Technology, Ujire",
    "   Degree: B.E. in Information Science & Engineering (2023 - 2027) | CGPA: 8.31 / 10",
    "🏫 Sri Rama Pre-University College, Kalladka",
    "   Pre-University Course (PCMB / Science): 91.83% (551/600)",
    "🏫 Shriniketana School, Isloor, Sirsi",
    "   CBSE 10th Standard Board: 94.0%"
  ],
  certs: [
    "🏆 NPTEL Elite — Introduction to Programming in C, IIT Kanpur (73%, 2025)",
    "🏆 Explore Machine Learning using Python — Infosys Springboard (2026)",
    "🏆 Blockchain Technologies — Infosys Springboard (2026)",
    "🏆 Next Gen Technologies — Infosys Springboard (2026)"
  ],
  contact: [
    "📧 Email: shridharhhegde@gmail.com",
    "📱 Phone: +91-9449146533",
    "🐙 GitHub: https://github.com/S-S-Hegde",
    "💼 LinkedIn: https://linkedin.com/in/shridhar-s-hegde-5655jmm"
  ],
  stack: [
    "Full-Stack & AI Stack: React 18, Node.js, Express, MongoDB, Python FastAPI, YOLOv10, MediaPipe, Gemini, Groq, Tailwind CSS, TypeScript"
  ]
};
