import { describe, expect, it } from "vitest";
import { cn, generateId, formatMonthYear } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("handles conflicting tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "end")).toBe("base end");
  });
});

describe("generateId", () => {
  it("returns a non-empty string", () => {
    const id = generateId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe("string");
  });

  it("returns unique values", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe("formatMonthYear", () => {
  it("formats a YYYY-MM string", () => {
    const result = formatMonthYear("2024-03", "en-US");
    expect(result).toContain("2024");
    expect(result).toContain("Mar");
  });

  it("returns presentLabel for null", () => {
    expect(formatMonthYear(null, "en-US", "Present")).toBe("Present");
  });
});
