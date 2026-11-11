export interface SkillCategory {
  id: string;
  category: string;
  icon: "code" | "globe" | "cpu" | "circuit" | "wrench";
  accentColor: "purple" | "cyan" | "blue";
  items: string[];
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  status: string;
  description: string;
  coursework: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  metric: string;
  description: string;
}

export interface PortfolioConfig {
  identity: {
    name: string;
    greeting: string;
    headline: string;
    subheadline: string;
    tagLine: string;
    motto: string;
    portraitUrl: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  contact: {
    heading: string;
    subheading: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
}

/**
 * 10-step Live Portfolio Construction Sequence:
 * 0: Empty dark grid canvas initializing
 * 1: Ghost cursors enter from different directions
 * 2: Navigation bar construction
 * 3: Hero container & magnetic frame layout
 * 4: Hero text realistic typing animation
 * 5: Profile portrait hologram materialization
 * 6: About & Technical Skills population
 * 7: Project cards sequential assembly
 * 8: Experience, Education & Achievements build
 * 9: Contact section assembly
 * 10: Final polish sweep & completion banner
 */
export type ConstructionStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface GhostAgentDef {
  id: string;
  label: string;
  role: string;
  color: string;
  glow: string;
  assignedTarget: string;
  speed: number;
}

export interface ActivityLogEntry {
  id: string;
  agent: string;
  color: string;
  message: string;
  timestamp: string;
  type: "build" | "style" | "code" | "complete" | "think";
}
