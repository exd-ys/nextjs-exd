# SKILL_inspiration_audit_to_design_spec

## Purpose

Audit an inspiration source (website link or image) and extract:

- layout structure
- visual language (look & feel)
- component patterns
- interaction + scroll animation behavior
- responsive behavior cues

Then translate those findings into a **Design Spec** that can be used to build an original site aligned to a PRD.

This skill is descriptive + translational. It does not copy a site.

It must explicitly reference relevant frontend implementation skills in this project’s skill folder.

---

## When to Use

- User provides a website link or screenshot and wants a similar vibe/layout system
- User wants a site built from a PRD but guided by reference inspiration
- You need a repeatable extraction pipeline (layout, motion, tokens)

---

## Inputs

- Inspiration source:
  - A URL (preferred), OR
  - Screenshot(s) / image(s)
- Optional: notes about what the user likes/dislikes
- Project context:
  - `.agent-os/context/PROFILE.md`
  - `.agent-os/context/DESIGN.md` (if it already exists)

---

## Outputs

Write these artifacts (unless a directive overrides paths):

1. `.agent-os/runs/inspiration_audit_<slug>.md`

   - raw audit notes, observations, and evidence references

2. `.agent-os/context/DESIGN.md` (create or update)

   - semantic style language (tone, tokens, component rules)
   - include `## Token Mapping` if applicable

3. `.agent-os/templates/INSPIRATION_LAYOUT_MAP.md` (optional template usage)
   - page sections
   - grid rules
   - spacing system
   - component inventory
   - motion/scroll interaction spec

---

## Core Rules

- **Do not replicate** the inspiration site exactly. Create an original design.
- Avoid copying distinctive brand marks, logos, exact copy, or unique illustrations.
- Use inspiration as a reference for _structure and vibe_, not as a blueprint.
- Always reference relevant frontend implementation skills from the skill folder when translating design into spec.

---

## Frontend Skill Integration (Required)

When producing the Design Spec, explicitly reference relevant frontend skills in the project’s skill folder.

Examples:

- `frontend-skill`
- `frontend-QA-skill`
- `interaction-skill`
- `use-shadcn`
- `design-md`
- `skill-creator`
- Any other relevant implementation skill

### How to Reference

In the final Design Spec, include a section:

Implementation Alignment

Inside that section:

- List which frontend skills are relevant
- Briefly describe how each one applies to:
  - layout system
  - components
  - motion/interaction
  - responsive behavior

Example:

- Use `use-shadcn` for card and form primitives
- Use `interaction-skill` for scroll reveal and hover motion system
- Use `frontend-skill` for layout grid and spacing implementation
- Use `frontend-QA-skill` for responsive validation and motion consistency

This ensures the output is not just descriptive, but implementation-aware.

---

## Procedure

### Step 1 — Capture the Inspiration

If URL:

- Record: site name, URL, date/time observed
- Capture key screens:
  - Home above-the-fold
  - One inner page (if relevant)
  - Navigation + footer
  - 1–2 representative content sections
- Note responsive behavior if visible (desktop vs mobile)

If Image(s):

- Identify what is visible:
  - grid/columns
  - typography scale
  - spacing rhythm
  - components present
  - motion cues (if implied)

---

### Step 2 — Extract Layout System (Structural)

Create a “layout map”:

- Information architecture: header → sections → footer
- Section patterns:
  - hero pattern (headline, subtext, CTAs, media)
  - feature grid pattern
  - testimonial/social proof pattern
  - pricing/CTA pattern
- Grid rules:
  - max width behavior
  - column counts
  - gutter rhythm
  - alignment rules (centered vs left-biased)
- Spacing system:
  - vertical rhythm (tight / medium / airy)
  - section padding patterns

---

### Step 3 — Extract Visual Language (Look & Feel)

Describe:

- mood/atmosphere (e.g., minimalist, editorial, futuristic)
- color roles (primary, surface, muted, border)
- typography style (font mood, hierarchy, weights)
- shape language (radius: sharp / subtle / soft / pill)
- elevation/shadows (flat / soft / structured)

Write this into `.agent-os/context/DESIGN.md` as semantic descriptions.

If an existing DESIGN.md exists, merge carefully—do not overwrite without directive.

---

### Step 4 — Extract Components (Inventory + Behavior)

List component patterns with notes:

- nav (sticky? transparent to solid on scroll?)
- buttons (size, radius, variants, hover states)
- cards (borders/shadows, media placement)
- section headers (kicker + title + subtitle)
- forms (newsletter, contact)
- footers (link columns, CTA strip)

---

### Step 5 — Extract Motion & Scroll Behavior

Create a motion spec:

- page load: fade / slide / stagger patterns
- scroll reveal: threshold, direction, stagger cadence
- parallax or pinned sections (if present)
- hover micro-interactions
- easing style (snappy vs smooth) and duration ranges
- reduced motion behavior (if detectable)

Express motion in **intent terms**, not framework-specific code:

- “staggered reveal of children at section entry”
- “nav background transitions after 24px scroll”
- “CTA button hover lifts 2px with soft shadow”

---

### Step 6 — Write the Design Spec Artifact

Write `.agent-os/runs/inspiration_audit_<slug>.md` with:

- Summary: “what makes this site feel like itself”
- Layout map (sections + grid rules)
- Component inventory (patterns + notes)
- Motion spec (scroll/load/hover)
- Responsive notes
- Adaptation levers (what can flex for PRD)
- Implementation Alignment (referencing relevant frontend skills)

---

### Step 7 — Prepare for PRD Fit

Add an “Adaptation Strategy” section:

- Which section patterns are reusable
- Which patterns should be swapped based on PRD content
- Rules for bending layout:
  - keep grid + spacing rhythm consistent
  - allow section order and component density to change
  - preserve motion language (timing/easing), not exact choreography

---

## Quality Checklist

- Layout map is complete enough to rebuild a similar-feeling page system
- Motion spec describes behavior (not just “nice animations”)
- DESIGN.md has semantic descriptions and (if used) token mapping
- Explicitly avoids 1:1 copying
- Includes `## Implementation Alignment`
- References relevant frontend skills from the skill folder

---

## Known Failure Modes

- Copying too literally (layout and visuals identical)
- Motion spec too vague (“smooth animations”)
- Not accounting for PRD content shape (sections don’t fit)
- Ignoring accessibility/reduced motion
- Failing to reference relevant frontend skills
