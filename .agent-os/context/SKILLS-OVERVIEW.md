# Skills Registry

Reference index of all available skills under `.agent-os/skills/`.  
Use this file to quickly identify the right skill before executing any task.

---

## 1. `create-project-profile`

**File:** `.agent-os/skills/create-project-profile/SKILL.md`

**What it does:**  
Creates or repairs the structural project profile at `.agent-os/context/PROFILE.md`. Observes and records the repository as-is — root files, directories, declared scripts, dependency system — without assumptions or tech-stack interpretations.

**When to use:**

- `PROFILE.md` does not exist
- `PROFILE.md` is missing required sections
- `.agent-os/` is imported into a new repository
- Repository structure has significantly changed

**How to use:**  
Invoke before running any feature directive. Load this skill, scan the repository structure, then write or patch `PROFILE.md` using the exact section template defined in the skill.

---

## 2. `design-md`

**File:** `.agent-os/skills/design-md/SKILL.md`

**What it does:**  
Analyzes Stitch (Google) design projects via the Stitch MCP Server and synthesizes a semantic design system into a `DESIGN.md` file. Extracts color tokens, typography, component patterns, and visual descriptions to serve as the design source-of-truth for prompting new screens.

**When to use:**

- You have a Stitch project and need a reusable design spec
- You want to generate new screens that match an existing design language
- You need a `DESIGN.md` that governs visual consistency

**How to use:**  
Provide a Stitch project ID or let the skill discover it. The skill uses Stitch MCP tools to fetch screen metadata, download HTML/CSS, extract tokens, and write `DESIGN.md`.

---

## 3. `find-skills`

**File:** `.agent-os/skills/find-skills/SKILL.md`

**What it does:**  
Helps discover and install skills from the open agent skills ecosystem (skills.sh) using the `npx skills` CLI. Maps user questions to existing skills by domain and keyword.

**When to use:**

- User asks "how do I do X" where a skill might exist
- User wants to extend agent capabilities
- You need to search for community skills to avoid reinventing the wheel

**How to use:**  
Run `npx skills find [query]` with a relevant keyword derived from the user's request. Review results and install with `npx skills add <package>`. Browse at `https://skills.sh/`.

---

## 4. `frontend-QA-skill` (Frontend Ship Gate)

**File:** `.agent-os/skills/frontend-QA-skill/frontend-ship-gate.md`

**What it does:**  
A mandatory QA gate that must run before any frontend work is marked complete. Covers directive alignment, WCAG accessibility, contrast, code integrity (lint/typecheck), and anti-AI generic-UI checks.

**When to use:**

- Before finalizing any frontend implementation
- After completing a UI feature or component
- Before committing or shipping frontend code

**How to use:**  
Run this as a checklist after implementation. If any check fails, fix it before proceeding. Checks: directive alignment → contrast & accessibility → code integrity (typecheck + lint) → anti-AI layout review.

---

## 5. `frontend-skill` (Design-First UI/UX)

**File:** `.agent-os/skills/frontend-skill/frontend-skill.md`

**What it does:**  
Governs how to build high-quality, bespoke frontend interfaces. Enforces design-first thinking — visual system, UX structure, information hierarchy, design tokens, component architecture — before any code is written. Prevents generic/template-looking UI.

**When to use:**

- Building any new UI page, section, or component
- Refactoring an existing interface to feel more intentional
- Designing frontend features from a PRD

**How to use:**  
Before writing code, produce a Required Design Plan (visual hierarchy, spacing rhythm, typography scale, interaction states). Validate the plan passes the "non-generic" test before proceeding to implementation.

---

## 6. `inspiration_audit_to_design_spec`

**File:** `.agent-os/skills/inspiration_audit_to_design_spec/SKILL_inspiration_audit_to_design_spec.md`

**What it does:**  
Audits an inspiration source (URL or screenshot) and extracts layout structure, visual language, component patterns, interaction/scroll behavior, and responsive cues. Translates findings into a Design Spec for building an original site aligned to a PRD — not a copy.

**When to use:**

- User provides a website or screenshot as inspiration
- Building a site from a PRD but guided by a reference aesthetic
- You need a repeatable extraction pipeline (layout → motion → tokens)

**How to use:**  
Provide the inspiration URL or screenshot. The skill writes: (1) a raw audit run file at `.agent-os/runs/inspiration_audit_<slug>.md`, (2) updates `.agent-os/context/DESIGN.md`, and optionally (3) a layout map template.

---

## 7. `interaction-skill` (Interaction Architecture)

**File:** `.agent-os/skills/interaction-skill/SKILL.md`

**What it does:**  
Defines how the interface behaves and communicates interactivity. Governs state modeling, interaction flows, affordances (what is clickable), feedback systems (loading/success/error), UX states (empty/disabled), and keyboard/accessibility behavior. Prevents "looks fine but feels broken" UI.

**When to use:**

- Defining component interaction logic
- Implementing forms, async actions, modals, or menus
- Setting up state management and user flows
- Ensuring keyboard navigation and accessibility compliance

**How to use:**  
Apply before and during UI implementation. Follow the affordance rules (clickables need `cursor-pointer` + hover state), feedback rules (every action must have visible feedback ≤200ms), and state rules (single source of truth).

---

## 8. `martinholovsky-gsap` (GSAP Animation)

**File:** `.agent-os/skills/martinholovsky-gsap/SKILL.md`

**What it does:**  
Provides GSAP (GreenSock Animation Platform) expertise for creating smooth, professional animations. Covers HUD panel transitions, status indicators, scroll-triggered effects, and complex timeline sequences. Enforces TDD-first, performance-aware, and cleanup-safe animation patterns.

**When to use:**

- Adding entrance/exit animations to components
- Building scroll-triggered effects
- Creating timeline-based animation sequences
- Implementing motion that requires GPU-acceleration

**How to use:**  
Follow the TDD-first workflow (write failing test → implement → verify cleanup). Use `gsap.context()` for scoping, always call `.revert()` on unmount, prefer `transforms` and `opacity` for GPU performance. Respect `prefers-reduced-motion`.

---

## 9. `orchestration` (Skill Orchestrator)

**File:** `.agent-os/skills/orchestration/SKILL_skill-orchestrator.md`

**What it does:**  
Automates skill discovery, selection, and application for any given task. Recursively scans `.agent-os/skills/`, matches skills by domain and keyword, presents a Skill Plan before execution, and composes multiple skills when needed. Extracts new reusable skills when gaps are found.

**When to use:**

- A task or directive is given and the right skills are unclear
- You need to determine which combination of skills applies
- You must present a Skill Plan before executing any work

**How to use:**  
Load this skill first, then: (1) scan all skills, (2) extract domain + keywords from the task, (3) match and select skills, (4) disclose the Skill Plan, (5) execute using selected skills, (6) extract new skill if a gap is found.

---

## 10. `reference_layout_to_original_system`

**File:** `.agent-os/skills/reference_layout_to_original_system/SKILL_reference_layout_to_original_system.md`

**What it does:**  
Given a reference URL or screenshot, extracts the layout system, section archetypes, component patterns, and interaction language, then translates them into an original, implementation-ready system. Captures structure and vibe — not a 1:1 clone.

**When to use:**

- You have an inspiration site and need a similar-feeling page system
- You need repeatable section/component patterns based on a reference
- Building a multi-page site guided by layout extraction

**How to use:**  
Provide the reference URL or screenshot. The skill produces: (1) a layout extraction run file, (2) optional section archetype templates, (3) updates to `DESIGN.md`. Always include an `## Implementation Alignment` section referencing relevant frontend skills.

---

## 11. `shadcn-ui`

**File:** `.agent-os/skills/shadcn-ui/SKILL.md`

**What it does:**  
Expert guidance for integrating and building applications with shadcn/ui components. Covers component discovery via MCP tools, installation (`npx shadcn@latest add`), customization, Radix UI vs Base UI primitives, custom registries, and project-specific theming.

**When to use:**

- Installing a new shadcn component
- Exploring the shadcn component catalog
- Setting up or configuring a shadcn project from scratch
- Working with custom component registries

**How to use:**  
Use `list_components` / `get_component_metadata` MCP tools to discover components. Install via `npx shadcn@latest add [component-name]`. Customize by modifying the copied source in `components/ui/`. Use `get_project_config` to inspect `components.json`.

---

## 12. `skill-creator`

**File:** `.agent-os/skills/skill-creator/SKILL_skill-creator.md`

**What it does:**  
Guides the creation and updating of effective skills. Defines skill anatomy (YAML frontmatter + Markdown instructions + optional bundled resources), best practices (concise, right level of freedom, no redundant explanations), and how to structure skills for different task types.

**When to use:**

- Creating a new skill for a reusable pattern
- Updating an existing skill
- Extracting ad-hoc logic into a reusable skill (self-annealing)
- Validating whether a skill is well-formed

**How to use:**  
Load this skill, then define: (1) YAML frontmatter (`name`, `description`), (2) purpose and when-to-use, (3) instructions at the right freedom level (high/medium/low), (4) optional bundled resources. Keep it concise — only add what Claude doesn't already know.

---

## 13. `use-shadcn`

**File:** `.agent-os/skills/use-shadcn/SKILL_use_shadcn_components.md`

**What it does:**  
Governs _how_ shadcn components are used as the default UI primitive source in this project. Enforces that shadcn base styling is never shipped unchanged — all components must be adapted to match the project's design language. Defines override rules for theming, variants, and composition.

**When to use:**

- Building any UI component or page
- Refactoring components to use shadcn primitives
- Implementing PRD-driven sections
- Standardizing component behavior across the project

**How to use:**  
Always start from the corresponding shadcn primitive (Button, Card, Input, Dialog, etc.). Adapt: radius, spacing, typography, color roles, hover/focus states, and motion. If no shadcn primitive exists, create a custom component. Never scatter primitive copies — wrap, don't fork.

---

## 14. `nextjs_project_profile_instantiation`

**File:** `.agent-os/skills/nextjs_project_profile_instantiation.md`

**What it does:**  
Provides a repeatable, deterministic way to scaffold a Next.js App Router project aligned with `/context/PROJECT_PROFILE.md`. Establishes `.agent-os/` governance structure, baseline App Router files (`layout.tsx`, `page.tsx`, `globals.css`), and correct Server/Client component boundaries.

**When to use:**

- Starting a new Next.js App Router project
- Applying Agent OS structure to an existing Next.js repo
- Bootstrapping a baseline before feature work begins

**How to use:**  
Load `PROFILE.md` first. Then enforce `.agent-os/` directory structure, create baseline App Router files following the Server Component default rule, configure `globals.css` with Tailwind directives, and set up path aliases in `tsconfig.json`.

---

## 15. `SKILL_instantiate_nextjs_tailwind_shadcn_gsap_project`

**File:** `.agent-os/skills/SKILL_instantiate_nextjs_tailwind_shadcn_gsap_project.md`

**What it does:**  
Deterministic instantiation pattern for a Next.js (App Router) + Tailwind CSS + shadcn/ui + GSAP project. Establishes correct Server/Client boundaries, proper shadcn `components/ui/` structure, safe GSAP integration with `useGSAP`, and a minimal working animated baseline.

**When to use:**

- Bootstrapping a new Next.js project with this exact stack
- Standardizing an existing Next.js repo to this stack
- Adding GSAP animation infrastructure to a Next.js + shadcn project
- Preparing the animation-safe structure before feature directives

**How to use:**  
Load `PROFILE.md` and `DESIGN.md` (if present) first. Follow the three architectural rules: (1) Server/Client boundary — GSAP lives only in Client leaf components, (2) shadcn primitives in `components/ui/` only, wrapped never forked, (3) GSAP uses `useGSAP` hook with `gsap.context()` scoping and cleanup on unmount.

---

## 16. `git-ops`

**File:** `.agent-os/skills/git-ops/SKILL.md`

**What it does:**  
Handles the full git workflow in a single skill: status check → stage changes → commit with a conventional commit message → push to remote. Enforces branch safety (warns before pushing to `main`/`master`), Conventional Commits format, and never force-pushes without explicit user confirmation.

**When to use:**

- User says "commit my changes", "push this", or "save my work to git"
- After completing a feature, fix, or any meaningful set of changes
- Any time you need to run `git add` → `git commit` → `git push`

**How to use:**  
The skill runs 4 steps in order: (1) `git status` + `git diff --stat` to inspect changes, (2) `git add .` or specific files, (3) `git commit -m` using Conventional Commits format (`feat`, `fix`, `chore`, `refactor`, etc.), (4) `git push origin <branch>`. If no commit message is provided, the skill infers one from staged changes and confirms before committing.

---

## Quick Reference Table

| Skill                                                   | Domain        | Key Trigger                                      |
| ------------------------------------------------------- | ------------- | ------------------------------------------------ |
| `create-project-profile`                                | Governance    | PROFILE.md missing or invalid                    |
| `design-md`                                             | Design        | Need DESIGN.md from Stitch project               |
| `find-skills`                                           | Discovery     | Looking for community skills                     |
| `frontend-QA-skill`                                     | QA            | Before shipping any frontend work                |
| `frontend-skill`                                        | Frontend/UI   | Building any UI page or component                |
| `git-ops`                                               | Git           | Commit and push changes                          |
| `inspiration_audit_to_design_spec`                      | Design        | Have inspiration URL/screenshot                  |
| `interaction-skill`                                     | UX/Behavior   | Defining interaction logic and states            |
| `martinholovsky-gsap`                                   | Animation     | Adding GSAP animations                           |
| `orchestration`                                         | Meta          | Determining which skills to apply                |
| `reference_layout_to_original_system`                   | Design/Layout | Extracting layout from reference site            |
| `shadcn-ui`                                             | Components    | Installing/discovering shadcn components         |
| `skill-creator`                                         | Governance    | Creating or updating a skill                     |
| `use-shadcn`                                            | Components    | Using shadcn as UI primitive source              |
| `nextjs_project_profile_instantiation`                  | Setup         | Scaffolding Next.js App Router project           |
| `SKILL_instantiate_nextjs_tailwind_shadcn_gsap_project` | Setup         | Bootstrapping Next.js + Tailwind + shadcn + GSAP |
