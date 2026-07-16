import { ResumeData } from "../types/resume";

export function createEmptyResumeData(): ResumeData {
  return {
    fullName: "",
    headline: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    experience: [],
    education: [],
    skillGroups: [],
    projects: [],
    certifications: [],
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
    },
    sectionOrder: ["summary", "experience", "education", "certifications", "skills", "projects"],
  };
}
