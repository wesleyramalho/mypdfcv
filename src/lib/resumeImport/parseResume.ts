import { generateId } from "@/lib/utils";
import type {
  ResumeData,
  ExperienceEntry,
  EducationEntry,
  SkillGroup,
  ProjectEntry,
} from "@/types/resume";

// ── Regex patterns ──────────────────────────────────────────────────────────

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.]+/;
const PHONE_RE = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const LINKEDIN_RE = /linkedin\.com\/in\/[\w-]+/i;
const URL_RE = /https?:\/\/[^\s,]+|www\.[^\s,]+/gi;
// Supports accented characters for international locations
const LOCATION_RE =
  /\b[A-ZÀ-Ú][a-zà-ú]+(?:\s(?:e\s)?[A-ZÀ-Ú][a-zà-ú]+)*,\s*(?:[A-Z]{2}|[A-ZÀ-Ú][a-zà-ú]+(?:\s[A-ZÀ-Ú][a-zà-ú]+)*)\b/;

const MONTH_NAMES: Record<string, string> = {
  // English
  jan: "01",
  january: "01",
  feb: "02",
  february: "02",
  mar: "03",
  march: "03",
  apr: "04",
  april: "04",
  may: "05",
  jun: "06",
  june: "06",
  jul: "07",
  july: "07",
  aug: "08",
  august: "08",
  sep: "09",
  september: "09",
  oct: "10",
  october: "10",
  nov: "11",
  november: "11",
  dec: "12",
  december: "12",
  // Portuguese
  janeiro: "01",
  fevereiro: "02",
  fev: "02",
  março: "03",
  marco: "03",
  abril: "04",
  abr: "04",
  maio: "05",
  mai: "05",
  junho: "06",
  julho: "07",
  agosto: "08",
  ago: "08",
  setembro: "09",
  set: "09",
  outubro: "10",
  out: "10",
  novembro: "11",
  dezembro: "12",
  dez: "12",
};

// Matches English and Portuguese month names + year, also plain year and MM/YYYY
const MONTH_PATTERN =
  "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?" +
  "|janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)";
const DATE_RE = new RegExp(
  `(?:${MONTH_PATTERN}(?:\\s+de)?\\s+\\d{4}|\\d{1,2}\\/\\d{4}|\\d{4}-\\d{2}|\\d{4})`,
  "gi",
);
const DATE_RANGE_RE = new RegExp(
  `(${DATE_RE.source})\\s*[-–—to]+\\s*(${DATE_RE.source}|Present|Current|Now|Presente|Atual)`,
  "gi",
);

const SECTION_PATTERNS: { key: string; re: RegExp }[] = [
  {
    key: "experience",
    re: /(?:experience|work\s*history|employment|professional\s*experience|career\s*history|work\s*experience|relevant\s*experience|experiência|experiencia)/i,
  },
  {
    key: "education",
    re: /(?:education|academic|qualifications|certifications?|academic\s*background|formação\s*acadêmica|formacao\s*academica|educação|educacao)/i,
  },
  {
    key: "skills",
    re: /(?:skills|technical\s*skills|core\s*competencies|competencies|technologies|expertise|areas?\s*of\s*expertise|technical\s*proficiencies|principais\s*competências|principais\s*competencias|competências|competencias|habilidades)/i,
  },
  {
    key: "projects",
    re: /(?:projects|personal\s*projects|portfolio|side\s*projects|key\s*projects|projetos)/i,
  },
  {
    key: "summary",
    re: /(?:summary|profile|objective|about\s*me|professional\s*summary|career\s*summary|career\s*objective|personal\s*statement|resumo|sobre)/i,
  },
  {
    key: "languages",
    re: /(?:^languages$|^idiomas$)/i,
  },
];

const DEGREE_RE =
  /\b(?:B\.?S\.?|B\.?A\.?|M\.?S\.?|M\.?A\.?|M\.?B\.?A\.?|Ph\.?D\.?|Bachelor|Master|Associate|Doctor|Diploma|Postgraduate\s*Degree|Technical\s*Degree|High\s*School|Bacharelado|Mestrado|Doutorado|Licenciatura|Pós[- ]?graduação|Tecnólogo)\b/i;

// ── LinkedIn PDF preprocessing ──────────────────────────────────────────────

function preprocessLinkedInText(text: string): string {
  return (
    text
      // Remove "Page X of Y" footers
      .replace(/\bPage\s+\d+\s+of\s+\d+\b/gi, "")
      // Remove LinkedIn URL labels like "(LinkedIn)", "(Portfolio)", "(Other)"
      .replace(/\s*\((?:LinkedIn|Portfolio|Other|Outro|Portfólio)\)\s*/gi, "")
      // Remove duration suffixes like "(1 ano)", "(10 meses)", "(2 anos 3 meses)", "(1 year)", "(9 months)"
      .replace(
        /\s*\(\d+\s*(?:anos?|meses?|mês|years?|months?)\s*(?:\d+\s*(?:anos?|meses?|mês|years?|months?))?\)\s*/gi,
        "",
      )
      // Remove standalone duration lines
      .replace(/^\d+\s+(?:anos?|meses?|years?|months?)\s*$/gim, "")
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function normalizeToYYYYMM(raw: string): string | null {
  const s = raw.trim();
  if (/present|current|now|presente|atual/i.test(s)) return null;

  // "abril de 2025" or "março de 2020" (Portuguese with "de")
  const ptDate = s.match(/^([A-Za-zçãéê]+)\s+de\s+(\d{4})$/);
  if (ptDate) {
    const m = MONTH_NAMES[ptDate[1].toLowerCase()];
    return m ? `${ptDate[2]}-${m}` : `${ptDate[2]}-01`;
  }

  // "Jan 2020" or "January 2020" or "janeiro 2020"
  const monthYear = s.match(/^([A-Za-zçãéê]+)\s+(\d{4})$/);
  if (monthYear) {
    const key = monthYear[1].toLowerCase();
    const m = MONTH_NAMES[key] ?? MONTH_NAMES[key.slice(0, 3)];
    return m ? `${monthYear[2]}-${m}` : `${monthYear[2]}-01`;
  }

  // "01/2020"
  const slashDate = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (slashDate) return `${slashDate[2]}-${slashDate[1].padStart(2, "0")}`;

  // "2020-01"
  if (/^\d{4}-\d{2}$/.test(s)) return s;

  // "2020"
  if (/^\d{4}$/.test(s)) return `${s}-01`;

  return null;
}

function isContactLine(line: string): boolean {
  return (
    EMAIL_RE.test(line) ||
    PHONE_RE.test(line) ||
    LINKEDIN_RE.test(line) ||
    /^https?:\/\//.test(line) ||
    /^www\./.test(line) ||
    /github\.com/i.test(line)
  );
}

function isSectionHeader(line: string): boolean {
  return looksLikeSectionHeader(line) !== null;
}

function cleanLine(line: string): string {
  return line.replace(/^[\s•·\-–—►▪▸○●■□]+/, "").trim();
}

// ── Section splitter ────────────────────────────────────────────────────────

interface Section {
  key: string;
  lines: string[];
}

function looksLikeSectionHeader(line: string): { key: string } | null {
  const trimmed = line.replace(/^[\s•·\-–—:]+|[\s•·\-–—:]+$/g, "").trim();
  // Section headers are short and mostly just the section name
  if (trimmed.length > 45) return null;
  // Don't match lines that have too many words (likely body text)
  if (trimmed.split(/\s+/).length > 5) return null;
  return SECTION_PATTERNS.find((p) => p.re.test(trimmed)) ?? null;
}

function splitSections(lines: string[]): {
  header: string[];
  sections: Section[];
} {
  const sections: Section[] = [];
  const header: string[] = [];
  let current: Section | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      current?.lines.push("");
      continue;
    }

    const matched = looksLikeSectionHeader(trimmed);
    if (matched) {
      current = { key: matched.key, lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(trimmed);
    } else {
      header.push(trimmed);
    }
  }

  return { header, sections };
}

// ── Section parsers ─────────────────────────────────────────────────────────

/** Check if a line looks like a LinkedIn date line (Portuguese or English) */
function isDateLine(line: string): boolean {
  DATE_RANGE_RE.lastIndex = 0;
  if (DATE_RANGE_RE.test(line)) return true;
  // Also match single dates like "abril de 2025 - Present"
  return /(?:janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(?:de\s+)?\d{4}\s*[-–—]/i.test(
    line,
  );
}

function parseExperience(lines: string[]): ExperienceEntry[] {
  // Find all date line indices
  const dateIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() && isDateLine(lines[i])) {
      dateIndices.push(i);
    }
  }

  // LinkedIn format: date lines with at least 2 lines before them (company + title)
  const isLinkedInFormat = dateIndices.length > 0 && dateIndices.some((di) => di >= 2);

  if (isLinkedInFormat) {
    return parseExperienceByDateAnchors(lines, dateIndices);
  }

  // Fallback: block-based parsing for standard resumes
  return parseExperienceByBlocks(lines);
}

/** LinkedIn: anchor on date lines, look back for company/title, forward for location + description */
function parseExperienceByDateAnchors(lines: string[], dateIndices: number[]): ExperienceEntry[] {
  const entries: ExperienceEntry[] = [];

  for (let d = 0; d < dateIndices.length; d++) {
    const dateIdx = dateIndices[d];

    // Company and title are the 2 lines before the date
    let company = "";
    let title = "";

    if (dateIdx >= 2) {
      const l2 = lines[dateIdx - 2].trim();
      const l1 = lines[dateIdx - 1].trim();
      if (l2 && l2.length < 60 && !l2.startsWith("-") && !l2.startsWith("•")) {
        company = l2;
      }
      if (l1 && l1.length < 60 && !l1.startsWith("-") && !l1.startsWith("•")) {
        title = l1;
      }
    } else if (dateIdx >= 1) {
      const l1 = lines[dateIdx - 1].trim();
      if (l1 && l1.length < 60 && !l1.startsWith("-") && !l1.startsWith("•")) {
        company = l1;
      }
    }

    // Parse dates from the date line
    DATE_RANGE_RE.lastIndex = 0;
    const dateMatch = lines[dateIdx].match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";
    let current = false;

    if (dateMatch) {
      const parts = dateMatch[0].split(/\s*[-–—]+\s*/i).filter(Boolean);
      if (parts.length >= 2) {
        startDate = normalizeToYYYYMM(parts[0]) ?? "";
        if (/present|current|now|presente|atual/i.test(parts[parts.length - 1])) {
          endDate = null;
          current = true;
        } else {
          endDate = normalizeToYYYYMM(parts[parts.length - 1]) ?? "";
        }
      }
    }

    // Location: line right after date, if short and not a bullet/date
    let location = "";
    const afterDate = dateIdx + 1;
    if (afterDate < lines.length) {
      const loc = lines[afterDate].trim();
      if (
        loc &&
        loc.length < 50 &&
        !loc.startsWith("-") &&
        !loc.startsWith("•") &&
        !isDateLine(loc)
      ) {
        location = loc;
      }
    }

    // Description: from after date+location until 2 lines before the next date line
    const descStart = location ? afterDate + 1 : afterDate;
    const nextDateIdx = d + 1 < dateIndices.length ? dateIndices[d + 1] : lines.length;
    // Next entry's company starts 2 lines before next date
    const descEnd =
      d + 1 < dateIndices.length ? Math.max(descStart, nextDateIdx - 2) : lines.length;

    const descLines: string[] = [];
    for (let j = descStart; j < descEnd; j++) {
      const cleaned = cleanLine(lines[j]);
      if (cleaned) descLines.push(cleaned);
    }

    if (company || title) {
      entries.push({
        id: generateId(),
        company,
        title,
        location,
        startDate,
        endDate,
        current,
        description: descLines.join("\n"),
      });
    }
  }

  return entries;
}

/** Standard resumes: split by blank lines, heuristic company/title detection */
function parseExperienceByBlocks(lines: string[]): ExperienceEntry[] {
  const entries: ExperienceEntry[] = [];
  const blocks = splitIntoBlocks(lines);

  for (const block of blocks) {
    DATE_RANGE_RE.lastIndex = 0;
    const blockText = block.join(" ");
    const dateRangeMatch = blockText.match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";
    let current = false;

    if (dateRangeMatch) {
      const parts = dateRangeMatch[0].split(/\s*[-–—]+\s*/i).filter(Boolean);
      if (parts.length >= 2) {
        startDate = normalizeToYYYYMM(parts[0]) ?? "";
        if (/present|current|now|presente|atual/i.test(parts[parts.length - 1])) {
          endDate = null;
          current = true;
        } else {
          endDate = normalizeToYYYYMM(parts[parts.length - 1]) ?? "";
        }
      }
    }

    const titleLines = block.filter(
      (l) => !isDateLine(l) && !l.startsWith("•") && !l.startsWith("-") && l.length < 80,
    );

    let company = "";
    let title = "";
    let location = "";

    if (titleLines.length >= 2) {
      company = titleLines[0];
      title = titleLines[1];
    } else if (titleLines.length === 1) {
      const split = titleLines[0].split(/\s*[|–—@]\s*/);
      if (split.length >= 2) {
        title = split[0];
        company = split[1];
      } else {
        company = titleLines[0];
      }
    }

    const locMatch = blockText.match(LOCATION_RE);
    if (locMatch) location = locMatch[0];

    const skipSet = new Set<string>();
    if (company) skipSet.add(company);
    if (title) skipSet.add(title);
    if (location) skipSet.add(location);

    const descLines = block
      .filter((l) => !skipSet.has(l) && !isDateLine(l))
      .map(cleanLine)
      .filter(Boolean);

    if (company || title) {
      entries.push({
        id: generateId(),
        company,
        title,
        location,
        startDate,
        endDate,
        current,
        description: descLines.join("\n"),
      });
    }
  }

  return entries;
}

function parseEducation(lines: string[]): EducationEntry[] {
  const entries: EducationEntry[] = [];
  const blocks = splitIntoBlocks(lines);

  for (const block of blocks) {
    const text = block.join(" ");
    DATE_RANGE_RE.lastIndex = 0;
    const dateRangeMatch = text.match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";

    if (dateRangeMatch) {
      const parts = dateRangeMatch[0].split(/\s*[-–—]+\s*/i).filter(Boolean);
      startDate = normalizeToYYYYMM(parts[0]) ?? "";
      endDate = parts[1] ? (normalizeToYYYYMM(parts[1]) ?? "") : "";
    } else {
      // Try to find "(YYYY - YYYY)" pattern common in LinkedIn education
      const yearRange = text.match(/\((\d{4})\s*[-–—]\s*(\d{4})\)/);
      if (yearRange) {
        startDate = `${yearRange[1]}-01`;
        endDate = `${yearRange[2]}-01`;
      }
    }

    let degree = "";
    let field = "";
    let school = "";

    // LinkedIn format: "Degree, Field · (date)" on one line
    const linkedinEduLine = block.find((l) => l.includes("·") || l.includes("·"));
    if (linkedinEduLine) {
      const parts = linkedinEduLine.split(/\s*[·]\s*/);
      if (parts.length >= 1) {
        const degreeField = parts[0];
        const commaIdx = degreeField.indexOf(",");
        if (commaIdx > 0) {
          degree = degreeField.slice(0, commaIdx).trim();
          field = degreeField.slice(commaIdx + 1).trim();
        } else {
          degree = degreeField.trim();
        }
      }
      // School is the line before this one
      const eduLineIdx = block.indexOf(linkedinEduLine);
      if (eduLineIdx > 0) {
        school = block[eduLineIdx - 1].trim();
      }
    }

    // Fallback to original matching
    if (!degree) {
      const degreeMatch = text.match(DEGREE_RE);
      degree = degreeMatch ? degreeMatch[0] : "";
      if (degreeMatch) {
        const afterDegree = text.slice(text.indexOf(degreeMatch[0]) + degreeMatch[0].length);
        const fieldMatch = afterDegree.match(/\s*(?:in|of|em)\s+([^,·\n]+)/i);
        if (fieldMatch) field = fieldMatch[1].trim();
      }
    }

    if (!school) {
      for (const l of block) {
        if (!DEGREE_RE.test(l) && !isDateLine(l) && !l.includes("·") && l.length < 80 && l.trim()) {
          school = l.trim();
          break;
        }
      }
    }

    if (!school && block.length > 0) school = block[0];

    const gpaMatch = text.match(/GPA[:\s]*(\d+\.?\d*)/i);

    if (school || degree) {
      entries.push({
        id: generateId(),
        school,
        degree,
        field,
        startDate,
        endDate,
        gpa: gpaMatch?.[1],
        highlights: "",
      });
    }
  }

  return entries;
}

function parseSkills(lines: string[]): SkillGroup[] {
  const groups: SkillGroup[] = [];
  const allSkills: string[] = [];

  // Detect LinkedIn one-skill-per-line format: most lines are short with no separators
  const nonEmpty = lines.filter((l) => l.trim());
  const shortLines = nonEmpty.filter((l) => l.length < 30 && !l.includes(",") && !l.includes(":"));
  const isOnePerLine = nonEmpty.length > 0 && shortLines.length / nonEmpty.length > 0.7;

  for (const line of lines) {
    if (!line.trim()) continue;

    // "Category: skill1, skill2, skill3"
    const colonSplit = line.match(/^([^:]+):\s*(.+)$/);
    if (colonSplit && !isOnePerLine) {
      const category = colonSplit[1].trim();
      const skills = colonSplit[2]
        .split(/[,|;]/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (skills.length > 0) {
        groups.push({ id: generateId(), category, skills });
      }
    } else if (isOnePerLine) {
      // LinkedIn format: one skill per line
      const skill = line.trim();
      if (skill.length > 0 && skill.length < 40) {
        allSkills.push(skill);
      }
    } else {
      // Collect as flat skills
      const skills = line
        .split(/[,|;•·]/)
        .map((s) => s.trim())
        .filter((s) => s && s.length < 40);
      allSkills.push(...skills);
    }
  }

  if (allSkills.length > 0 && groups.length === 0) {
    groups.push({ id: generateId(), category: "", skills: allSkills });
  } else if (allSkills.length > 0) {
    groups.push({ id: generateId(), category: "Other", skills: allSkills });
  }

  return groups;
}

function parseProjects(lines: string[]): ProjectEntry[] {
  const entries: ProjectEntry[] = [];
  const blocks = splitIntoBlocks(lines);

  for (const block of blocks) {
    const text = block.join(" ");
    const name =
      block.find((l) => l.length < 60 && !l.startsWith("•") && !l.startsWith("-"))?.trim() ?? "";
    const urlMatch = text.match(URL_RE);
    const descLines = block
      .filter((l) => l !== name && !URL_RE.test(l))
      .map(cleanLine)
      .filter(Boolean);

    DATE_RANGE_RE.lastIndex = 0;
    const dateRangeMatch = text.match(DATE_RANGE_RE);
    let startDate = "";
    let endDate: string | null = "";
    if (dateRangeMatch) {
      const parts = dateRangeMatch[0].split(/\s*[-–—]+\s*/i).filter(Boolean);
      startDate = normalizeToYYYYMM(parts[0]) ?? "";
      endDate = parts[1] ? (normalizeToYYYYMM(parts[1]) ?? "") : "";
    }

    if (name) {
      entries.push({
        id: generateId(),
        name,
        description: descLines.join("\n"),
        url: urlMatch?.[0],
        technologies: [],
        startDate,
        endDate,
      });
    }
  }

  return entries;
}

// ── Block splitter (groups lines into logical entries) ──────────────────────

function splitIntoBlocks(lines: string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      if (current.length > 0) {
        blocks.push(current);
        current = [];
      }
      continue;
    }
    current.push(line);
  }
  if (current.length > 0) blocks.push(current);

  // If we only got one block, try splitting by date ranges
  if (blocks.length <= 1 && lines.length > 3) {
    const byDate: string[][] = [];
    let cur: string[] = [];
    for (const line of lines) {
      DATE_RANGE_RE.lastIndex = 0;
      if (DATE_RANGE_RE.test(line) && cur.length > 0) {
        byDate.push(cur);
        cur = [line];
      } else if (line.trim()) {
        cur.push(line);
      }
    }
    if (cur.length > 0) byDate.push(cur);
    if (byDate.length > 1) return byDate;
  }

  return blocks;
}

// ── Main parser ─────────────────────────────────────────────────────────────

export function parseResumeText(text: string): Partial<ResumeData> {
  // Preprocess LinkedIn-specific noise
  const cleaned = preprocessLinkedInText(text);
  const lines = cleaned.split(/\n/).map((l) => l.trim());
  const { header, sections } = splitSections(lines);

  // ── Contact info from entire text ──
  const fullText = cleaned;
  const email = fullText.match(EMAIL_RE)?.[0] ?? "";
  const phone = fullText.match(PHONE_RE)?.[0] ?? "";
  const linkedinMatch = fullText.match(LINKEDIN_RE);
  const linkedin = linkedinMatch ? `https://${linkedinMatch[0]}` : "";
  const location = fullText.match(LOCATION_RE)?.[0] ?? "";

  // Website: first URL that isn't LinkedIn or GitHub
  const allUrls = fullText.match(URL_RE) ?? [];
  const website =
    allUrls.find(
      (u) => !LINKEDIN_RE.test(u) && !u.includes("mailto:") && !u.includes("github.com"),
    ) ?? "";

  // ── Name: first header line that isn't contact info ──
  const fullName =
    header.find((l) => l.length > 1 && l.length < 60 && !isContactLine(l) && !isSectionHeader(l)) ??
    "";

  // ── Headline: second short non-contact header line ──
  const headlineCandidate = header.find(
    (l) =>
      l !== fullName && l.length > 1 && l.length < 100 && !isContactLine(l) && !isSectionHeader(l),
  );
  const headline = headlineCandidate ?? "";

  // ── Sections ──
  const sectionMap = new Map<string, string[]>();
  for (const s of sections) {
    // Merge languages into skills if both exist, or use as skills fallback
    if (s.key === "languages") {
      const existing = sectionMap.get("skills") ?? [];
      sectionMap.set("skills", [...existing, ...s.lines]);
    } else {
      sectionMap.set(s.key, s.lines);
    }
  }

  const experience = sectionMap.has("experience")
    ? parseExperience(sectionMap.get("experience")!)
    : [];
  const education = sectionMap.has("education") ? parseEducation(sectionMap.get("education")!) : [];
  const skillGroups = sectionMap.has("skills") ? parseSkills(sectionMap.get("skills")!) : [];
  const projects = sectionMap.has("projects") ? parseProjects(sectionMap.get("projects")!) : [];

  const summaryLines = sectionMap.get("summary");
  const summary = summaryLines ? summaryLines.filter(Boolean).join(" ") : "";

  return {
    fullName,
    headline,
    summary,
    contact: { email, phone, location, linkedin, website },
    experience,
    education,
    skillGroups,
    projects,
    certifications: [],
    sections: {
      summary: !!summary,
      experience: experience.length > 0,
      education: education.length > 0,
      skills: skillGroups.length > 0,
      projects: projects.length > 0,
      certifications: true,
    },
  };
}
