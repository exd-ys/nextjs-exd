# SKILL_nextjs_project_profile_instantiation

## Purpose

Provide a repeatable, deterministic way to scaffold a Next.js App Router project aligned with `/context/PROJECT_PROFILE.md`.

---

## When to Use

- Starting a new Next.js project
- Applying Agent OS structure to an existing Next.js repo
- Bootstrapping baseline before feature work

---

## When NOT to Use

- Non-Next.js projects
- Large-scale migrations (use a migration workflow instead)
- Projects with a different tech stack than defined in PROJECT_PROFILE

---

## Canonical Pattern

### 1. Enforce Repository Structure

Required:

- `/directives`
- `/skills`
- `/context`

Recommended:

- `/policy`
- `/workflows`
- `/templates`
- `/runs`
- `.tmp`

Standardize to `.tmp/` (not `tmp/`).

---

### 2. Create Baseline App Router Files

#### app/layout.tsx (Server Component)

- Must export metadata
- Must include `<html lang="en">`
- Must NOT include `"use client"`

Example:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'App',
  description: 'Next.js baseline',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
```

---

#### app/page.tsx

If shadcn installed:

```tsx
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='text-3xl font-semibold tracking-tight'>Baseline Ready</h1>
      <p className='mt-3 text-base text-neutral-600'>
        Project initialized from PROJECT_PROFILE.
      </p>
      <div className='mt-8'>
        <Button>Get started</Button>
      </div>
    </main>
  )
}
```

If shadcn NOT installed:

```tsx
export default function HomePage() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='text-3xl font-semibold tracking-tight'>Baseline Ready</h1>
      <p className='mt-3 text-base text-neutral-600'>
        shadcn not installed yet.
      </p>
      <div className='mt-8'>
        <button className='rounded-md bg-black px-4 py-2 text-white'>
          Get started
        </button>
      </div>
    </main>
  )
}
```

---

### 3. Tailwind Assumptions

Ensure `app/globals.css` contains:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Do not overwrite if already configured correctly.

---

### 4. shadcn Rules

- Primitives live in `components/ui/`
- Do not modify generated primitives
- Wrap instead of editing
- No emoji icons

If not installed:

- Create `components/ui/`
- Add README note explaining it requires shadcn init

---

### 5. Validation Mapping

If commands available:

Minimum:

```
pnpm lint
pnpm typecheck
pnpm dev
```

Full:

```
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If commands not available:

- Confirm structural correctness
- Confirm route renders logically
- Confirm no obvious type violations

---

## Guardrails

- Avoid unnecessary `"use client"`
- Keep baseline minimal
- Do not introduce dependencies
- Do not create extra pages unless directive requests them

---

## Cleanup Rules

- No stray files in root
- `.tmp/` never committed
- Leave only one TODO if shadcn not installed

---

## Known Failure Modes

- Converting everything to Client Components
- Editing shadcn primitives directly
- Introducing random CSS files
- Creating files outside defined structure
