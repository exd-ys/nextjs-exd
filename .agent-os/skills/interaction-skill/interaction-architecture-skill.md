---
name: interaction-architecture-skill
description: Use when defining state management, user flows, component boundaries, and interaction behaviors. Governs how UI behaves and signals interactivity (hover, cursor, feedback, states, accessibility) — not how it looks.
---

# Interaction Architecture Skill

## Purpose

Define how the interface behaves and how it communicates interactivity.

This skill governs:

- State modeling and ownership
- Interaction flows and user intent
- Clear affordances (what is clickable and what is not)
- Feedback systems (loading/success/error)
- UX states (empty/disabled)
- Accessibility and keyboard interaction

It prevents "looks fine but feels broken" UI.

This skill must operate together with:

- `.agent-os/policy/POLICY_interaction_integrity.md`
- `.agent-os/skills/frontend-ship-gate.md` (when shipping UI)

The policy enforces global rules.  
This skill defines interaction design logic.  
The ship gate enforces completion integrity.

---

# Core Principles

1. Users must always know what is interactive.
2. Every action must produce clear feedback.
3. State has a single source of truth.
4. Complexity is progressively disclosed.
5. Accessibility is part of the interaction design, not an add-on.

---

# Mandatory Policy Cross-Check

Before finalizing any interactive feature, you MUST:

1. Load:

.agent-os/policy/POLICY_interaction_integrity.md

2. Validate that all interaction rules defined in the policy are satisfied.

3. Explicitly confirm compliance in your output.

Include this section before marking interaction work complete:

## Interaction Integrity Check

- [ ] No silent interactions
- [ ] Clickability clearly signaled
- [ ] Disabled states are real and functional
- [ ] Loading/error/empty/success states defined
- [ ] Duplicate submissions prevented
- [ ] Keyboard interaction works
- [ ] Focus management correct
- [ ] Touch targets meet minimum size
- [ ] Destructive actions protected

If any item fails:

- The feature is incomplete.
- It must not be marked done.

---

# Completion Cross-Checks (When Shipping UI)

If the task involves frontend implementation (not just planning or modeling), you MUST also run:

.agent-os/skills/frontend-ship-gate.md

This ensures:

- Directive alignment
- Accessibility verification
- Contrast compliance
- Code integrity
- Anti-template enforcement
- Human-level design audit

Do not mark frontend work complete until:

1. Interaction Integrity Check passes.
2. Frontend Ship Gate passes.
3. All failures are resolved.

Interaction correctness + Ship integrity = completion.

---

# Affordance Rules (MANDATORY)

## 1) Clickables Must Look Clickable

If an element is clickable, it must have at least **two** of:

- Cursor change (`cursor-pointer`)
- Hover state (visual change)
- Focus-visible style
- Underline for text links
- Button styling for primary actions

Never rely on clickability alone.

---

## 2) Cursor Pointer Rule (Mandatory)

- Any clickable element must use `cursor-pointer`.
- Native semantic elements:

  - `<button>`
  - `<a>`
  - `<summary>`
  - `<label for=...>`

  Still add `cursor-pointer` if ambiguity exists.

For non-semantic clickables (discouraged), you MUST add:

- `cursor-pointer`
- proper `role`
- keyboard handlers
- focus-visible styles

---

## 3) Hover States Must Be Meaningful

Hover states must communicate intent:

- Links: underline or color shift
- Buttons: subtle lift, tint shift, shadow change
- Cards-as-links: border emphasis + micro translate
- Icon buttons: background tint + focus ring

Hover must NOT:

- Be decorative only
- Be invisible
- Change component identity

---

## 4) Active / Pressed States Required

Clickable elements must show pressed feedback:

- subtle translate
- slight opacity shift
- shadow reduction

No dead-click feeling.

---

## 5) Disabled Must Look Disabled (and Behave Disabled)

Disabled elements must:

- Remove interaction
- Use `disabled` or `aria-disabled`
- Remove pointer events when appropriate
- Show `cursor-not-allowed`
- Suppress hover/active animation

---

# State Modeling

Before coding, define:

- What state exists?
- Where does it live?
- Who owns it?
- What triggers it?
- Is it local, shared, derived, or server-driven?

Avoid:

- Redundant derived state
- Multiple sources of truth
- Global state by default
- Copying server truth locally without reason

---

# Interaction Flows (Required)

For any interactive feature, define:

- Primary action path
- Secondary actions
- Cancel path
- Error path
- Success confirmation path
- Retry path (if async)

Ask:

- What happens on slow network?
- What happens on failure?
- What happens after success?

---

# UX State Requirements (Non-Negotiable)

Every interactive feature must define:

- Loading state
- Error state
- Empty state (if data-driven)
- Disabled state
- Success state

No silent transitions.

---

# Progressive Disclosure

Do not expose all complexity at once.

Use:

- Tabs
- Accordions
- Inline advanced toggles
- Multi-step flows

Never hide critical information required for correct action.

---

# Keyboard + Focus Interaction (Required)

- Logical tab order
- Visible focus styles
- No keyboard traps
- Modal focus trap
- Focus returns to trigger
- Enter/Space activate buttons
- Esc closes dismissible overlays

---

# Touch Targets and Hit Areas

- Minimum 44×44px for tap targets
- Icon buttons padded properly
- Clear hit boundaries for cards
- Avoid tiny primary actions on mobile

---

# When NOT To Use

- Static marketing sections with no interaction
- Pure styling updates
- Layout-only refactors without behavioral changes

Use when behavior, state, or interactivity matters.

---

# Definition of Done (Interaction Layer)

An interactive feature is complete only when:

- State modeling defined
- Interaction flows defined
- UX states implemented
- Accessibility behavior implemented
- Interaction Integrity Check passes
- Frontend Ship Gate passes (if applicable)
- POLICY_interaction_integrity is satisfied
