import { z } from "zod";

const optionalEmail = z
  .string()
  .max(255, "tooLong")
  .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "invalidEmail",
  });

const optionalUrl = z
  .string()
  .max(200, "tooLong")
  .refine((val) => val === "" || /^https?:\/\/.+/.test(val) || /^[\w-]+(\.[\w-]+)+/.test(val), {
    message: "invalidUrl",
  });

export const contactSchema = z.object({
  email: optionalEmail,
  phone: z.string().max(30, "tooLong"),
  location: z.string().max(100, "tooLong"),
  linkedin: z.string().max(200, "tooLong"),
  website: optionalUrl,
});

export const personalInfoSchema = z.object({
  fullName: z.string().max(100, "tooLong"),
  headline: z.string().max(150, "tooLong"),
  contact: contactSchema,
});

export const experienceEntrySchema = z.object({
  id: z.string(),
  company: z.string().max(100, "tooLong"),
  title: z.string().max(100, "tooLong"),
  location: z.string().max(100, "tooLong"),
  startDate: z.string(),
  endDate: z.string().nullable(),
  current: z.boolean(),
  description: z.string().max(3000, "tooLong"),
});

export const educationEntrySchema = z.object({
  id: z.string(),
  school: z.string().max(100, "tooLong"),
  degree: z.string().max(100, "tooLong"),
  field: z.string().max(100, "tooLong"),
  startDate: z.string(),
  endDate: z.string().nullable(),
  gpa: z.string().max(10, "tooLong").optional(),
  highlights: z.string().max(2000, "tooLong"),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string().max(50, "tooLong"),
  skills: z.array(z.string().max(50, "tooLong")),
});

export const projectEntrySchema = z.object({
  id: z.string(),
  name: z.string().max(100, "tooLong"),
  description: z.string().max(3000, "tooLong"),
  url: optionalUrl.optional(),
  technologies: z.array(z.string().max(50, "tooLong")),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type ExperienceEntryFormValues = z.infer<typeof experienceEntrySchema>;
export type EducationEntryFormValues = z.infer<typeof educationEntrySchema>;
export type SkillGroupFormValues = z.infer<typeof skillGroupSchema>;
export type ProjectEntryFormValues = z.infer<typeof projectEntrySchema>;
