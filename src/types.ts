export interface PersonalInfo {
  name: string;
  title: string;
  nickname: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  languages: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Experience {
  role: string;
  link?: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ProjectDetail {
  title: string;
  link?: string;
  status: string;
  tech: string[];
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Certification {
  title: string;
  provider: string;
  period: string;
}

export interface ExcellenceItem {
  title: string;
  bullets: string[];
}
