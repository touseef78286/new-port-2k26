export type ParticleState = 'portrait' | 'statement1' | 'statement2' | 'neural' | 'statement3';

export interface ParticleTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  accentHex: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  architectureOverview: string;
  architectureSteps: { title: string; desc: string; icon: string }[];
  challengesSolved: string[];
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Frontend & Backend' | 'Databases & Storage' | 'AI & Automation' | 'DevOps & Cloud';
  level: number; // 0 - 100
  isHighlight?: boolean;
  yearsExp: string;
  description: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  status: 'active' | 'standby' | 'syncing';
  latency: string;
}
