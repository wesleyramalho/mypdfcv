import { describe, expect, it } from "vitest";
import { contactSchema, personalInfoSchema, experienceEntrySchema } from "../lib/schemas";

describe("contactSchema", () => {
  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse({
      email: "user@example.com",
      phone: "+1234567890",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/user",
      website: "https://example.com",
    });
    expect(result.success).toBe(true);
  });

  it("accepts empty optional fields", () => {
    const result = contactSchema.safeParse({
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      email: "not-an-email",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("personalInfoSchema", () => {
  it("accepts valid personal info", () => {
    const result = personalInfoSchema.safeParse({
      fullName: "John Doe",
      headline: "Software Engineer",
      contact: {
        email: "john@example.com",
        phone: "",
        location: "NYC",
        linkedin: "",
        website: "",
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects name exceeding max length", () => {
    const result = personalInfoSchema.safeParse({
      fullName: "A".repeat(101),
      headline: "",
      contact: { email: "", phone: "", location: "", linkedin: "", website: "" },
    });
    expect(result.success).toBe(false);
  });
});

describe("experienceEntrySchema", () => {
  it("accepts valid experience entry", () => {
    const result = experienceEntrySchema.safeParse({
      id: "exp-1",
      company: "Acme Inc",
      title: "Engineer",
      location: "Remote",
      startDate: "2023-01",
      endDate: null,
      current: true,
      description: "Built things.",
    });
    expect(result.success).toBe(true);
  });
});
