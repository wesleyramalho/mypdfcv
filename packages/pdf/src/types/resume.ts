export type ResumeStatus = "draft" | "complete";

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string; // "YYYY-MM"
  endDate: string | null; // null = Present
  current: boolean;
  description: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  gpa?: string;
  highlights: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
  startDate: string;
  endDate: string | null;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  year: string; // "YYYY" or ""
  credentialId: string;
  credentialUrl: string;
}

export interface ResumeData {
  fullName: string;
  headline: string;
  summary: string;
  photo?: string; // base64 data URL or external URL
  contact: ContactInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skillGroups: SkillGroup[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  sections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    certifications: boolean;
  };
  /** Ordered list of section IDs for the editor sidebar and PDF output. "personal" is always first. */
  sectionOrder: string[];
  linkedInImported?: boolean;
}

export interface Resume {
  id: string;
  name: string;
  templateId?: string;
  status: ResumeStatus;
  createdAt: string;
  updatedAt: string;
  exportCount: number;
  data: ResumeData;
}
