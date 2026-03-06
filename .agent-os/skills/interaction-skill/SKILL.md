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

---

# Core Principles

1. Users must always know what is interactive.
2. Every action must produce clear feedback.
3. State has a single source of truth.
4. Complexity is progressively disclosed.
5. Accessibility is part of the interaction design, not an add-on.

---

# Affordance Rules (MANDATORY)

## 1) Clickables Must Look Clickable

If an element is clickable, it must have at least **two** of:

- Cursor change (`cursor-pointer`)
- Hover state (visual change)
- Focus-visible style (keyboard)
- Underline/link styling (for text links)
- Button styling (for primary actions)

Never rely on clickability alone.

---

## 2) Cursor Pointer Rule (Mandatory)

- Any clickable element must use `cursor-pointer`.
- Exception: native elements that already imply clickability:
  - `<button>`
  - `<a>`
  - `<summary>`
  - `<label for=...>`  
    But even then, **still add** `cursor-pointer` if the design makes it ambiguous.

For non-semantic clickables (discouraged), you MUST add:

- `cursor-pointer`
- `role="button"` (or correct role)
- keyboard handlers
- focus-visible styles

---

## 3) Hover States Must Be Meaningful

Hover states must communicate intent:

- Links: underline/underline-reveal or color shift
- Buttons: subtle lift, tint shift, shadow change
- Cards-as-links: border/outline emphasis + micro translate (optional)
- Icon buttons: background tint + focus ring

Hover must NOT:

- Be purely decorative
- Be so subtle it’s invisible
- Be so strong it looks like a different component

---

## 4) Active/Pressed States Required

Clickable elements must show pressed feedback:

- `active:translate-y-[1px]` (or similar subtle)
- `active:opacity-*` adjustments
- or small shadow reduction

No "dead click" feeling.

---

## 5) Disabled Must Look Disabled (and Behave Disabled)

Disabled elements must:

- Remove interaction (`disabled`, `aria-disabled`)
- Remove pointer events where appropriate
- Reduce emphasis (opacity) AND change cursor (`cursor-not-allowed`)
- Not trigger hover/active animations

If an action is unavailable, provide a reason when appropriate (tooltip/help text).

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
- Storing server truth in local UI unless needed

---

# Interaction Flows (Required)

For any interactive feature, define:

- Primary action path
- Secondary actions
- Cancel path
- Error path
- Success confirmation path
- Retry path (if network involved)

Ask:

- What happens on slow network?
- What happens on failure?
- What happens after success (stay, redirect, toast, inline confirmation)?

---

# UX State Requirements (Non-Negotiable)

Every interactive feature must define:

- Loading state
- Error state
- Empty state
- Disabled state
- Success state

No silent transitions. No “nothing happened” clicks.

---

# Feedback Rules

## Immediate Feedback

On action:

- Show feedback within 100–200ms if possible.
- If async: show loading state immediately.

Examples:

- Button spinner + label change
- Inline skeleton
- Toast confirmation
- Inline error message

---

## Prevent Double Submit

If an action is in-flight:

- Disable button
- Prevent duplicate requests
- Show “in progress” feedback

---

## Undo / Confirmation (When Needed)

Use confirmation or undo when:

- Destructive action
- Irreversible state change
- Data loss risk

Prefer:

- Undo toast for reversible actions
- Confirm dialog for destructive actions

---

# Progressive Disclosure

Do not expose all complexity at once.

Use:

- Tabs for mode switching
- Accordions for secondary details
- Inline “advanced” toggles
- Step flows for multi-part tasks

But never hide critical info needed for correct action.

---

# Keyboard + Focus Interaction (Required)

- Tab order must be logical
- Focus must be visible (`focus-visible`)
- Modal/dialog:
  - focus trapped inside
  - focus returns to trigger on close
- No keyboard traps
- Enter/Space activates buttons
- Esc closes dismissible overlays

---

# Touch Targets and Hit Areas

- Minimum 44×44px for tap targets (mobile)
- Icon buttons must have padding to meet hit area
- Cards that are clickable must have clear hit boundaries
- Avoid tiny text links as primary actions on mobile

---

# Content + Interaction Safety

- Never hide critical CTA behind hover-only behavior (mobile)
- Never rely on color alone to signal state (pair with icon/text)
- Avoid “mystery meat” icon-only controls without labels/tooltips
- Avoid click targets too close together

---

# Interaction Checklist (Quick Gate)

Before marking an interactive UI done:

- [ ] Every clickable element signals clickability
- [ ] Cursor pointer is applied where appropriate
- [ ] Hover + focus styles exist and are visible
- [ ] Active/pressed feedback exists
- [ ] Disabled behavior is real and clearly communicated
- [ ] Loading/error/empty/success states exist
- [ ] Keyboard navigation works
- [ ] Focus management correct for dialogs/menus
- [ ] Tap targets meet minimum size

---

# When NOT To Use

- Static marketing sections with no interaction
- Token-only styling updates
- Pure layout refactors with no behavior changes

Use when behavior, state, or interactivity matters.
