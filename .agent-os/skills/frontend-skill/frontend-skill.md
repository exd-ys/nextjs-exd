---
name: frontend-skill
description: Use when building a high-quality, bespoke frontend interface. Focuses on design-first thinking, UX structure, visual systems, and non-generic UI. Tech-stack agnostic.
---

# Frontend Skill (Design-First UI/UX)

## Objective

Produce frontends that feel intentional, structured, and product-designed — not template-like, not default-library styled, not generic.

This skill governs:

- Visual system
- UX structure
- Information hierarchy
- Design tokens
- Component architecture
- Interaction clarity

It does NOT govern:

- Animation framework (handled separately)
- Performance architecture (handled separately)
- Production QA enforcement (handled separately)

---

# Core Principles

1. Design before implementation.
2. Hierarchy must be obvious at a glance.
3. Typography defines structure.
4. Spacing creates rhythm.
5. Interaction clarifies state.
6. Accessibility and clarity are mandatory.
7. Systems before components.

---

# Non-Negotiable Rule

## Never Ship Generic / Template-Looking UI

Before implementation, ask:

- Does this look like a common template?
- Is the layout predictable and symmetrical everywhere?
- Are sections identical in weight and rhythm?
- Is typography default with no defined hierarchy?
- Is the primary action visually indistinguishable from common UI kits?

If yes → redesign before coding.

---

# Required Design Plan (Before Code)

You must output the following before writing UI code.

---

## A) Product Intent

- One sentence describing how the interface should feel.
- Primary user task.
- Cognitive load level (minimal / medium / dense).
- 3 differentiators from generic UI.

---

## B) Information Architecture

- Primary vs secondary content.
- Critical actions.
- What is progressive vs immediate.
- What can be hidden or deferred.
- Clear interaction flow.

---

## C) Visual Language System

Define a system — not isolated styles.

- Typography roles (display, heading, body, utility)
- Font pairing (if applicable)
- Color roles (primary, accent, surface, subtle, destructive, success)
- Spacing rhythm (base unit + section cadence)
- Surface hierarchy (background layers, elevation logic)
- Shape language (radius system, border weight rules)
- Icon sizing + stroke rules

No arbitrary styling decisions.

---

## D) Layout System

- Grid definition (columns + gap logic)
- Max width rules
- Alignment principles
- Density level (compact vs spacious)
- Section rhythm (not uniform padding everywhere)
- Responsive behavior principles

Layouts must reflect hierarchy — not repetition.

---

## E) Accessibility Intent

Before coding, confirm:

- Keyboard navigation considered
- Focus styles visible and intentional
- Contrast expectations defined
- Interaction states planned
- Touch target size considered
- Reduced motion awareness (if motion exists)

Accessibility must be structural, not decorative.

---

# Implementation Rules (Framework Agnostic)

## 1) System Before Components

Define:

- Design tokens (colors, spacing, radius, typography scale)
- Component variants
- Interaction states

Then build components that inherit from the system.

Do not hardcode visual values in isolated components.

---

## 2) No Library-Default Styling

If using a component library:

- Override default styles to match your visual system.
- Wrap primitives instead of modifying vendor internals directly (unless necessary).
- Ensure components visually belong to the product.

If a component looks like it came directly from a UI kit → redesign.

---

## 3) No One-Off Styling

Avoid:

- Inline arbitrary values
- Magic numbers
- Random spacing adjustments
- Inconsistent border radii
- Unsystematic color usage

Every visual choice must map to a defined token or rule.

---

## 4) Clear Component API Design

Custom components must:

- Expose consistent variants (e.g. size, tone, emphasis)
- Have predictable naming
- Avoid uncontrolled visual overrides
- Support interaction states properly

No visual hacks.

---

# UX Behavior Requirements

Every interactive feature must define:

- Loading state
- Error state
- Empty state
- Disabled state
- Success state

No silent transitions.
No invisible state changes.

---

# Deliverables (Strict Order)

When this skill is invoked, you must produce:

1. Product Intent
2. Information Architecture
3. Visual Language System
4. Layout System
5. Accessibility intent
6. Component map (primitives vs custom)
7. Token definitions
8. Implementation structure
9. Code in small, incremental steps

No UI code before the plan.

Before marking complete → invoke the ship/QA gate skill.

---

# Human-Designed Audit

Before completion, ask:

- Is there at least one layout decision that breaks symmetry intentionally?
- Is spacing paced (not uniform)?
- Is typography system-defined?
- Do primary actions feel deliberate and brand-specific?
- Does this feel assembled or designed?

If it feels assembled → refine.

---

# When NOT To Use

Do not use for:

- Quick scaffolding
- Internal tools
- CRUD dashboards
- Pure backend tasks
- Prototype-only work

Use for intentional, product-level frontend experiences.
