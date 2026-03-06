# instantiate_nextjs_tailwind_shadcn_gsap_project

## Objective

Instantiate a Next.js (App Router) project baseline aligned with `.agent-os/context/PROFILE.md`, including:

- Tailwind styling baseline
- shadcn/ui structure conventions
- GSAP-ready client animation pattern (via @gsap/react useGSAP)
- A working Home route that demonstrates styling + a simple animation safely

## Inputs (Provided in Chat)

- Project name
- Mode: Prototype or Production (default: Prototype-Friendly Production)
- Baseline page(s): Home only (default)

## Required Reads

- `.agent-os/AGENTS.md`
- `.agent-os/context/PROFILE.md`
- `.agent-os/context/DESIGN.md` (if present)
- `.agent-os/skills/SKILL_instantiate_nextjs_tailwind_shadcn_gsap_project.md`

## Outputs (Must Produce)

### Governance

- Ensure `.agent-os/` folders exist (policy/workflows/templates/runs/.tmp)
- Ensure `PROFILE.md` exists and reflects this project

### App Baseline (Create/Update)

- `app/layout.tsx` (Server Component, minimal, imports globals)
- `app/page.tsx` (Server Component that renders a leaf Client component)
- `components/hero-animated.tsx` (Client Component with GSAP animation)
- shadcn structure expectations:
  - `components/ui/` (primitives location)
  - `lib/utils.ts` (cn helper) if needed by shadcn approach
- If shadcn primitives are not yet installed, create placeholders + TODO notes (single TODO only)

### No-Terminal Checklist

If the environment cannot install dependencies, output:

- Required packages list (names only)
- Steps the user must perform in their editor/host to install/run

## Constraints

- Keep GSAP code in Client Components only. :contentReference[oaicite:7]{index=7}
- Prefer @gsap/react `useGSAP()` for cleanup-safe integration. :contentReference[oaicite:8]{index=8}
- Do not add dependencies beyond what’s needed for Next + Tailwind + shadcn + GSAP.
- If `.agent-os/context/DESIGN.md` exists, respect `## Token Mapping` before changing theme tokens.

## Procedure

1. Load PROFILE (+ DESIGN if present).
2. Use the instantiation skill to generate baseline files.
3. Implement a minimal animated element using GSAP in a leaf Client Component.
4. Ensure a clean Server/Client boundary: Server page → Client animated component.
5. Provide a no-terminal checklist for installs/verification.

## Validation

Minimum:

- Home route renders without crashing
- Tailwind classes visibly apply
- GSAP animation runs without hydration/runtime errors on the client

If commands are runnable:

- Run declared lint/typecheck/build scripts (and update PROFILE.md with actual commands).
