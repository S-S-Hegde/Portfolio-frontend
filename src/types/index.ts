export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  fullOverview: string;
  tags: string[];
  featured: boolean;
  category: 'AI & Backend' | 'Full-Stack Web' | 'Systems';
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  architecture: {
    title: string;
    flow: string[];
    details: string;
  };
  demoUrl?: string;
  githubUrl: string;
  accentColor: string;
  iconName: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: number;
    description: string;
    highlight?: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  scoreLabel: string;
  location: string;
  highlights: string[];
  icon: string;
  image?: string;
  websiteUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  issueDate: string;
  recipient: string;
  credentialId?: string;
  score?: string;
  scoreBreakdown?: { label: string; value: string }[];
  badgeType: 'Elite' | 'Specialization' | 'Foundation';
  authority: string;
  signatories: string;
  verificationUrl: string;
  description: string;
  skills: string[];
  icon: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}
