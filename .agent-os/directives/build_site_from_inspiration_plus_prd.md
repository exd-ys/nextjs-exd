# build_site_from_inspiration_plus_prd

## Objective

Given:

1. a website inspiration (URL or image)
2. a PRD document (tagged in chat)

Create an original website that:

- captures the inspiration’s layout system, animation language, and look/feel
- adapts (“bends”) structure to fit the PRD’s content and requirements
- does NOT copy the inspiration 1:1
- explicitly aligns implementation decisions with relevant frontend skills in the project skill folder

---

## Inputs (Provided in Chat)

- Inspiration:
  - URL or image(s)
- PRD:
  - A PRD document you will tag in chat (source of truth for content + requirements)
- Optional:
  - pages required (Home only vs multi-page)
  - target device priority (mobile-first vs desktop-first)

---

## Required Reads

- `.agent-os/context/PROFILE.md`
- `.agent-os/context/DESIGN.md` (if exists)
- `.agent-os/skills/SKILL_inspiration_audit_to_design_spec.md`
- Relevant frontend implementation skills in `.agent-os/skills/` including but not limited to:
  - `frontend-skill`
  - `frontend-QA-skill`
  - `interaction-skill`
  - `shadcn-ui`
  - `use-shadcn`
  - `design-md`
  - Any layout, component, or motion-related skills

---

## Outputs

### A) Audit + Design Spec

- `.agent-os/runs/inspiration_audit_<slug>.md`
- `.agent-os/context/DESIGN.md` (created/updated with semantics; include Token Mapping if used)
- Must include `## Implementation Alignment` referencing relevant frontend skills

### B) PRD-to-Layout Plan

- `.agent-os/runs/prd_layout_plan_<slug>.md` containing:
  - PRD section breakdown
  - proposed page IA and section order
  - mapping: PRD requirements → layout components/sections
  - motion plan (aligned to inspiration language)
  - Implementation Alignment section referencing frontend skills used

### C) Implementation (Execution Layer)

Create/update website code in the actual project codebase (outside `.agent-os/`) following PROFILE constraints:

- pages/routes
- components
- styling
- animation implementation
- content replaced with PRD-derived copy

All implementation decisions must:

- Reference relevant frontend skills from the skill folder
- Follow patterns defined in those skills
- Avoid ad-hoc patterns that contradict existing skill guidance

---

## Constraints

- Do not copy the inspiration exactly (structure can be similar, but must be original).
- Use PRD as the source of truth for content and requirements.
- Layout should adapt to PRD content shape (sections may be added/removed/reordered).
- Respect reduced motion and accessibility basics.
- Avoid introducing new dependencies unless allowed by policy/skill/directive.
- Implementation must remain consistent with referenced frontend skills.

---

## Procedure

### Step 1 — Audit Inspiration

Use `SKILL_inspiration_audit_to_design_spec` to produce:

- audit run log
- DESIGN.md semantics + motion language
- Implementation Alignment referencing frontend skills

---

### Step 2 — Parse PRD and Build Content Model

From the PRD, extract:

- target users + jobs-to-be-done
- key features/value props
- required sections (e.g., pricing, FAQs, signup)
- content entities (plans, testimonials, feature list)
- success metrics and constraints

Write a “PRD Content Model” in the PRD layout plan file.

---

### Step 3 — Create a PRD-Fit Layout Plan

Using the inspiration layout patterns:

- pick section patterns that match PRD needs
- bend the layout to fit PRD content:
  - change number of cards/items
  - swap section types (grid ↔ narrative)
  - reorder sections to match PRD funnel

Keep consistent:

- spacing rhythm
- grid behavior
- typography scale feel
- motion/easing language

Add:

Implementation Alignment

List:

- which frontend skills are being used
- how they influence layout, components, motion, and responsiveness
- which skill governs QA/validation

---

### Step 4 — Implement Pages + Components

Implement:

- page skeleton(s)
- reusable section components
- design tokens (if applicable)
- motion system consistent with the audit spec

All copy/content must come from the PRD (not from the inspiration site).

Each major implementation decision should be traceable to:

- the audit
- the PRD
- a referenced frontend skill

---

### Step 5 — Validation

Minimum:

- pages render without errors
- layout responsive at common breakpoints
- motion does not cause jank
- reduced motion supported (no essential content hidden behind animation)

If validation commands exist in PROFILE, run them.

Validation should align with `frontend-QA-skill` if available.

---

## Definition of Done

- Audit log exists
- DESIGN.md reflects inspiration semantics + token mapping where relevant
- PRD layout plan exists and clearly maps PRD → sections/components
- Implementation Alignment sections exist in both spec artifacts
- Website implemented with PRD content
- Relevant frontend skills explicitly referenced
- Inspiration is recognizable in vibe/system, not a clone
