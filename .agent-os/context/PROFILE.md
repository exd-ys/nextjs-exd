# Project Profile

## Project Mode

- Next.js Web Application (App Router)

## Repository Overview

Observed:

- Root files:

  - `AGENTS.md`
  - `AUTHENTICATION.md`
  - `README.md`
  - `components.json`
  - `next.config.js`
  - `postcss.config.js`
  - `server.js`
  - `tsconfig.json`
  - `.eslintrc.json`
  - `.nvmrc`
  - `.prettierignore`
  - `.prettierrc.json`

- Configuration files:

  - `next.config.js` — Next.js configuration
  - `tsconfig.json` — TypeScript compiler options
  - `postcss.config.js` — PostCSS configuration
  - `.eslintrc.json` — ESLint rules
  - `.prettierrc.json` — Prettier formatting rules
  - `components.json` — shadcn/ui component registry config

- Lock/build files:

  - `package-lock.json`

- Environment files:
  - `.gitignore`
  - `.nvmrc`

## Project Structure

Observed:

- Primary directories:

  - `src/app/` — Next.js App Router pages and layouts (includes `(external)/`, `(main-layout)/`, `admin/`, `billing-payments/`, `dashboard/`, `patterns-demo/`, `profile/`, `settings/`)
  - `src/components/` — Shared UI components (includes `ui/`, `ai-patterns/`)
  - `src/_shared/` — Shared utilities, constants, enums, helpers, interfaces, models, services
  - `src/environments/` — Environment configuration
  - `src/hooks/` — Custom React hooks
  - `src/lib/` — Utility libraries
  - `src/stories/` — Storybook story files
  - `public/` — Static assets (`animations/`, `images/`)
  - `.agent-os/` — Agent OS governance artifacts
  - `.storybook/` — Storybook configuration
  - `.github/` — GitHub Actions and instructions
  - `Prompt Json/` — Prompt specification files

- Entry-point candidates:

  - `src/app/layout.tsx` — Root layout
  - `src/app/page.tsx` — Root page
  - `server.js` — Custom Node.js server

- Test directories:

  - `src/stories/` — Storybook component stories (UI-level)

- Asset directories:
  - `public/animations/` — Lottie JSON animations
  - `public/images/` — Static images

## Declared Commands

Observed:

- Lint: `npm run lint` → `next lint`
- Typecheck: Not declared as standalone script (TypeScript via `tsconfig.json` and Next.js build)
- Test: Not declared (Storybook stories present: `npm run storybook`)
- Build: `npm run build` → `next build`
- Build (dev): `npm run build-dev` → `cross-env APP_ENV=development next build`
- Run/Dev: `npm run dev` → `next dev`
- Start: `npm run start` → `next start`
- Start (dev): `npm run start-dev` → `NODE_ENV=development next dev`
- Format check: `npm run check-format` → Prettier check
- Format fix: `npm run fix-format` → Prettier write
- Storybook: `npm run storybook` → Storybook dev server on port 6006

## Dependency Declaration System

Observed:

- Dependency definition files:
  - `package.json` — npm manifest with `dependencies` and `devDependencies`
- Lock mechanism present: `package-lock.json` (npm)

## Key Dependencies Observed

- Framework: `next@15.1.11`, `react@19.0.0`
- UI Library: shadcn/ui (via `components.json`), Radix UI primitives
- Styling: `tailwindcss@^4.1.13`, `tailwind-merge`, `class-variance-authority`
- Auth/Backend: `firebase@^11.2.0`
- DI Container: `inversify@^6.0.2` with `reflect-metadata`
- Forms/Validation: `formik`, `yup`, `zod`
- Data Fetching: `axios`
- Tables: `@tanstack/react-table`
- Charts: `recharts`
- Animation: `lottie-react`, `animate.css`
- Icons: `lucide-react`, `@tabler/icons-react`, `@heroicons/react`, `phosphor-react`
- DnD: `@dnd-kit/core`, `@dnd-kit/sortable`
- Date: `date-fns`, `react-day-picker`
- Themes: `next-themes`
- Toasts: `sonner`
- Drag/Drawers: `vaul`
- Stories/Docs: Storybook `@storybook/nextjs@^8.5.3`
- Linting: `eslint@^8`, `eslint-config-next`
- Formatting: Prettier with `prettier-plugin-organize-imports`

## Governance Location

- Agent OS located at: `.agent-os/`

## Guardrails (Structural Only)

- Do not commit secrets
- Do not mix governance files with application code
- Temporary artifacts must live in `.agent-os/.tmp/`
- Deterministic execution is required for task completion
- All shadcn/ui components live in `src/components/ui/`
- Application source code lives in `src/`; governance in `.agent-os/`
