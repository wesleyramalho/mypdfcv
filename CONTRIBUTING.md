# Contributing

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
git clone <repo-url>
cd mypdfcv
cp .env.example .env.local
npm install
npm run build:packages
npm run dev
```

## Project Structure

```
src/          → Next.js app (App Router)
packages/
  i18n/       → @mypdfcv/i18n — locale config, message loader, translations
  pdf/        → @mypdfcv/pdf-core — PDF generation, Zod schemas, templates
  ui/         → @mypdfcv/ui — shared UI primitives (Storybook)
e2e/          → Playwright end-to-end tests
```

For detailed architecture and conventions, see [AGENTS.md](AGENTS.md).

## Development Workflow

1. Create a branch from `main`
2. Make changes following [conventional commits](https://www.conventionalcommits.org/)
3. Open a PR against `main`

### Commit Format

```
type(scope): description

feat(app): add template search
fix(pdf-core): correct date formatting for CJK locales
chore(ci): update Node version in workflow
```

**Scopes:** `app`, `i18n`, `pdf-core`, `ui`, `e2e`, `ci`, `deps`

## Scripts

| Script                   | Description                               |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Start Next.js dev server                  |
| `npm run build`          | Build packages + Next.js app              |
| `npm run build:packages` | Build internal packages (i18n → pdf → ui) |
| `npm run lint`           | Run ESLint                                |
| `npm run format`         | Format all files with Prettier            |
| `npm run format:check`   | Check formatting without writing          |
| `npm run typecheck`      | Type-check all workspaces                 |
| `npm run test:e2e`       | Run Playwright E2E tests                  |
| `npm run test:e2e:ui`    | Run E2E tests with Playwright UI          |
| `npm run storybook`      | Start Storybook for UI package            |

## Code Style

- **Formatting:** Prettier (enforced by pre-commit hook)
- **Linting:** ESLint v9 with Next.js presets
- **TypeScript:** Strict mode across all packages

## Adding a New Locale

See the "Adding a new locale" section in [AGENTS.md](AGENTS.md) for the complete checklist.

## PR Checklist

- [ ] `npm run format:check` passes
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] New features have tests where applicable
