# SKILL_instantiate_nextjs_tailwind_shadcn_gsap_project

## Purpose

Provide a deterministic instantiation pattern for a Next.js (App Router) project using:

- Tailwind CSS
- shadcn/ui (in-repo primitives)
- GSAP with @gsap/react (useGSAP hook)

This skill establishes:

- Correct Server/Client boundaries
- Proper shadcn structure
- Safe GSAP integration
- Minimal, working animated baseline

It does not invent design tokens.
If `.agent-os/context/DESIGN.md` exists, it must be respected.

---

## When to Use

- Bootstrapping a new Next.js App Router project
- Standardizing an existing Next.js repo
- Creating a baseline animation-safe structure
- Preparing a project for further directives

---

## Required Context (Load Order)

1. `.agent-os/context/PROFILE.md`
2. `.agent-os/context/DESIGN.md` (if present)
3. Active directive invoking this skill

If PROFILE.md does not reflect Next.js App Router structure, stop and request clarification.

---

## Architectural Rules

### 1. Server/Client Boundary (Required)

- Pages and layouts are Server Components by default.
- GSAP must only run inside Client Components.
- Do not place `"use client"` in `app/layout.tsx` or route files unless strictly required.
- Animation must live in leaf components.

---

### 2. shadcn Structure (Required)

- Primitives live in: `components/ui/`
- Wrappers/composed components live outside primitives
- Shared utilities (e.g., `cn()`) live in `lib/`
- Do not scatter primitive copies
- Prefer wrapping over editing primitives

---

### 3. GSAP Integration Pattern (Required)

- Use `@gsap/react` and `useGSAP()` hook
- Avoid raw `useEffect` or `useLayoutEffect` for animation cleanup
- Scope animations using `ref`
- Avoid global side effects
- Do not reference DOM outside Client Components

---

## Canonical File Structure to Produce

### app/layout.tsx (Server Component)

- No `"use client"`
- Imports global styles
- Minimal HTML/body structure

---

### app/page.tsx (Server Component)

- Imports and renders a leaf Client animation component
- No GSAP code here

---

### components/hero-animated.tsx (Client Component)

- Contains `"use client"`
- Uses `useRef`
- Uses `useGSAP`
- Performs a simple entry animation

Example structure:

```tsx
'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function HeroAnimated() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.hero-title',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    },
    { scope }
  )

  return (
    <div ref={scope} className='py-16'>
      <h1 className='hero-title text-3xl font-semibold tracking-tight'>
        Baseline Ready
      </h1>
      <p className='mt-3 text-base text-neutral-600'>
        Next.js + Tailwind + shadcn + GSAP
      </p>
    </div>
  )
}
```

---

## Tailwind Expectations

- Do not overwrite existing Tailwind configuration
- Only ensure global styles are imported
- Styling must remain utility-class based
- Do not introduce a second styling system

---

## DESIGN.md Alignment (If Present)

If `.agent-os/context/DESIGN.md` exists and includes `## Token Mapping`:

- Apply theme adjustments at the token layer
- Modify CSS variables or Tailwind theme configuration
- Do not hardcode stylistic overrides inside components
- Do not guess theme semantics

If Token Mapping is missing:

- Do not proceed with theme customization
- Escalate via orchestration layer

---

## Dependency Handling (No-Terminal Mode)

If installation cannot be executed automatically, output only package names:

Required:

- `gsap`
- `@gsap/react`

Do not invent versions.
Do not list shadcn peer dependencies manually unless explicitly required.

---

## Guardrails

- Do not add extra animation libraries
- Do not convert Server Components to Client unnecessarily
- Do not edit shadcn primitives without documented reason
- Do not mix styling paradigms
- Do not introduce global GSAP side effects

---

## Validation Requirements

Minimum structural validation:

- Home page renders without runtime errors
- Animation runs only on client
- No hydration warnings
- Tailwind styles visibly apply

If validation scripts exist in PROFILE.md:

- Lint must pass
- Typecheck must pass
- Build must succeed

Instantiation is not complete until baseline route renders cleanly.
