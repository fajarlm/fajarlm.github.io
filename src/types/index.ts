export interface Skill {
  name: string;
  icon: string;
  desc: { en: string; id: string };
}

export interface Project {
  id: number;
  title: string;
  description: { en: string; id: string };
  type: 'web' | 'mobile' | 'desktop';
  tech: string[];
  img: string;
  gallery?: string[];
  github?: string;
  demo?: string;
  apk?: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  file: string;
}

export interface ExperienceItem {
  role: { en: string; id: string };
  company: string;
  companyUrl?: string;
  period: { en: string; id: string };
  type: { en: string; id: string };
  points: { en: string[]; id: string[] };
}

export type Theme = 'light' | 'dark' | 'cyan';
export type Language = 'en' | 'id';