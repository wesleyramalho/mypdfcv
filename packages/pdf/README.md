# @mypdfcv/pdf-core

Resume types, templates, validation schemas, and PDF generation for [MyPDFCV](https://mypdfcv.com). Works standalone — no Next.js required.

## Installation

```bash
npm install @mypdfcv/pdf-core
```

## Usage

### Client (browser-safe)

Types, templates, schemas, and utilities — no server dependencies.

```typescript
import {
  type Resume,
  type ResumeData,
  createEmptyResumeData,
  TEMPLATES,
  getTemplate,
} from "@mypdfcv/pdf-core";

// Create blank resume data
const data = createEmptyResumeData();

// List available templates
console.log(TEMPLATES.map((t) => t.id));
// ["modern", "classic", "minimal", "executive", "bold", "balanced", "clear"]

// Get a specific template
const template = getTemplate("modern");
```

### Server (PDF generation)

```typescript
import { type Resume, createEmptyResumeData, generateId } from "@mypdfcv/pdf-core";
import { generateResumePDF } from "@mypdfcv/pdf-core/server";
import { getMessages } from "@mypdfcv/i18n/server";

const resume: Resume = {
  id: generateId(),
  name: "My Resume",
  templateId: "modern",
  status: "complete",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  exportCount: 0,
  data: {
    ...createEmptyResumeData(),
    fullName: "John Doe",
    headline: "Software Engineer",
  },
};

const buffer = await generateResumePDF(resume, "en", getMessages("en"));
// buffer is a Node.js Buffer containing the PDF
```

## Templates

| ID          | Name      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `modern`    | Modern    | Clean layout with blue accents              |
| `classic`   | Classic   | Traditional centered layout, text-only      |
| `minimal`   | Minimal   | Sleek and minimal with green accents        |
| `executive` | Executive | Navy sidebar for corporate roles            |
| `bold`      | Bold      | Deep red header banner                      |
| `balanced`  | Balanced  | Dark sidebar with centered photo            |
| `clear`     | Clear     | Teal header banner with right-aligned photo |

## Exports

### Main entry (`@mypdfcv/pdf-core`)

- **Types:** `Resume`, `ResumeData`, `ContactInfo`, `ExperienceEntry`, `EducationEntry`, `SkillGroup`, `ProjectEntry`
- **Templates:** `TEMPLATES`, `getTemplate()`, `getResumeStyle()`, `hexWithAlpha()`
- **Defaults:** `createEmptyResumeData()`
- **Schemas:** Zod validation schemas for all resume sections
- **Utilities:** `generateId()`, `formatMonthYear()`

### Server entry (`@mypdfcv/pdf-core/server`)

Everything from the main entry, plus:

- `generateResumePDF(resume, locale?, messages?)` — Returns a `Buffer` with the PDF
- `ResumePDFDocument` — React component for `@react-pdf/renderer`

## Peer Dependencies

- `react` ^18.0.0 || ^19.0.0

## Related

- [@mypdfcv/i18n](https://www.npmjs.com/package/@mypdfcv/i18n) — Internationalization with 7 bundled locales
- [@mypdfcv/mcp-server](https://www.npmjs.com/package/@mypdfcv/mcp-server) — MCP server for AI-powered resume generation
- [MyPDFCV](https://mypdfcv.com) — The full resume builder app

## License

MIT
