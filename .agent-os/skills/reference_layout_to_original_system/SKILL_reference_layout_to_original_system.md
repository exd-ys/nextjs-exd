# SKILL_reference_layout_to_original_system

## Purpose

Given a reference (URL or screenshot), extract the **layout system** + **section archetypes** + **component patterns** + **interaction language**, then translate them into an **original, implementation-ready system**.

This skill captures _structure and vibe_, not a 1:1 clone.

---

## When to Use

- You have an inspiration site/screenshot and need a similar-feeling page system
- You want repeatable section/component patterns to apply to PRD content
- You need an extraction pipeline that feeds design + frontend implementation

---

## Inputs

- Reference:
  - URL (preferred) OR
  - Screenshot(s) / image(s)
- Optional:
  - what to keep / avoid (notes)
  - target pages (home only vs multi-page)
- Project context:
  - `.agent-os/context/PROFILE.md`
  - `.agent-os/context/DESIGN.md` (if exists)
  - relevant frontend skills in `.agent-os/skills/` (e.g. shadcn, interaction, QA)

---

## Outputs

Write (unless a directive overrides paths):

1. `.agent-os/runs/reference_layout_extract_<slug>.md`

   - evidence-backed observations (what exists + where)
   - section list + structure map
   - component inventory + states
   - motion/interaction notes
   - responsive behavior notes
   - “Adaptation levers” (what can flex)

2. `.agent-os/templates/SECTION_ARCHEYPES_<slug>.md` (optional)

   - reusable section blueprints (inputs/slots, layout rules, variants)

3. Update or append to `.agent-os/context/DESIGN.md` (only if needed)

   - semantic style language
   - token roles and usage rules (not raw values unless required)

4. Include an implementation bridge:
   - `## Implementation Alignment` in the run file
   - reference relevant frontend skills (e.g. shadcn usage, interaction patterns, QA)

---

## Core Rules

- **Do not replicate** the reference exactly.
- Do not copy:
  - brand marks/logos
  - exact copywriting
  - distinctive illustrations/graphics
  - unique layout quirks that act like a signature
- Extract and translate:
  - section types, hierarchy, grid logic, spacing rhythm
  - component patterns and state behaviors
  - interaction language (timing, easing intent)
- Prefer describing behaviors and rules over pixel-perfect specs.

---

## Procedure

### Step 1 — Capture Evidence

If URL:

- record: site name, URL, date/time
- capture key screens:
  - header + hero
  - 3–5 mid-page sections
  - a dark/alternate section (if any)
  - testimonial/case study/blog (if present)
  - footer
- note desktop vs mobile differences

If image(s):

- identify visible sections top-to-bottom
- call out any nav, hero, grids, cards, CTAs, footers

---

### Step 2 — Build a Section Map

Create a top-to-bottom outline:

- Header archetype
- Hero archetype
- Section sequence + purpose (why it exists)
- “Rhythm notes”:
  - spacing cadence (tight/medium/airy)
  - background alternation (light/dark/surface)
  - where emphasis spikes (metrics, CTA bands)

Output format (in run file):

- `## Page Rhythm`
- `## Section Map`
  - S1 Hero (type, layout)
  - S2 Credibility band (type, layout)
  - S3 Feature index (type, layout)
  - ...

---

### Step 3 — Extract Layout System Rules

Document rules, not measurements:

- container width behavior (fixed max vs fluid)
- grid pattern (12-col, split columns, asymmetry)
- gutter rhythm
- alignment defaults (left-biased vs centered)
- section padding patterns
- media placement patterns (full-bleed, framed, masked)

Output format:

- `## Layout System`
  - Container rules
  - Grid rules
  - Spacing rhythm
  - Background patterning
  - Media rules

---

### Step 4 — Inventory Components + States

List components as reusable patterns:

For each component:

- role/purpose
- anatomy (parts/slots)
- variants (primary/secondary, dense/airy)
- states (hover, active, disabled, focus)
- content constraints (title length, image ratios)

Output format:

- `## Component Inventory`
  - Button (variants, states)
  - Card (image + title + meta)
  - Metric highlight (number + label)
  - Feature row (media + bullets)
  - Testimonial block
  - Blog card
  - Footer columns
  - ...

---

### Step 5 — Extract Motion & Interaction Language

Describe motion in intent terms:

- scroll reveal patterns (fade/slide/stagger)
- hover micro-interactions (lift, glow, underline)
- nav behavior on scroll (if present)
- carousel/tabs/accordion behaviors (if present)
- reduced motion expectation

Output format:

- `## Motion Language`
  - On-load
  - On-scroll
  - Hover/focus
  - Reduced motion notes

---

### Step 6 — Responsive Behavior Notes

Capture how the system adapts:

- grid collapse rules
- section reordering (if any)
- hero scaling (headline wraps, CTAs stack)
- card layout changes
- navigation pattern shift

Output format:

- `## Responsive Rules`

---

### Step 7 — Translate Into Original System Guidance

Add “Adaptation levers”:

- what must remain consistent (rhythm, grid feel, motion tone)
- what can change (section order, content density, component counts)
- recommended substitutions (e.g., replace “case study” section with “features” if PRD needs)

Output format:

- `## Adaptation Levers`
- `## Originality Safeguards`

---

### Step 8 — Implementation Alignment (Required)

In the run file include:

`## Implementation Alignment`

- Reference relevant frontend skills and how they apply:
  - component foundation (e.g. shadcn usage policy)
  - interaction patterns (motion skill)
  - QA/responsive validation (QA skill)
- Decide:
  - “Use existing component” vs “Customize shadcn primitive” vs “Create new component”
- List any new components required with names and responsibilities.

---

## Quality Checklist

- Section map is complete and ordered
- Layout rules are stated as reusable constraints (not pixel cloning)
- Component inventory includes anatomy + states
- Motion language is specific and consistent
- Responsive rules are explicit
- “Adaptation levers” make PRD-fitting easy
- Implementation Alignment references relevant frontend skills
- Output is clearly **original**, not a clone

---

## Known Failure Modes

- Copying too literally (structure and styling match 1:1)
- Vague motion notes (“smooth animations”) without describing triggers
- Listing components without states/anatomy
- Ignoring responsive behavior
- No Implementation Alignment (hard to build from)
- Over-specifying pixels instead of describing system rules
