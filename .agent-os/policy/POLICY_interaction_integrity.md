# POLICY_interaction_integrity

## Purpose

Enforce consistent, predictable, accessible interaction behavior across the entire product.

This policy operationalizes the Interaction Architecture Skill.

It is global and non-optional.

If UI behavior exists, this policy applies.

---

# Scope

This policy applies to:

- All interactive UI components
- All clickable elements
- All forms and submissions
- All async actions
- All modals, drawers, menus, overlays
- All navigation elements
- All destructive actions
- All stateful components

It applies regardless of framework or implementation method.

---

# Interaction Integrity Requirements (Non-Negotiable)

## 1. No Silent Interactions

Every user action must produce visible feedback.

Forbidden:

- Click → nothing appears to happen
- Hover → no visual indication on interactive element
- Disabled-looking UI that still triggers actions
- Async action with no loading state

All actions must:

- Provide immediate feedback (≤200ms)
- Show loading state if async
- Show success or error resolution state

---

## 2. Clickability Must Be Explicit

Every interactive element must signal interaction clearly.

Mandatory signals (at least two):

- Cursor change (`cursor-pointer`)
- Visible hover state
- Visible focus-visible style
- Underline for text links
- Button styling for primary actions

Non-semantic clickable containers are strongly discouraged.
If used, they MUST include:

- `role`
- keyboard handlers
- focus styles
- pointer cursor

---

## 3. Disabled Must Be Real

Disabled UI must:

- Block interaction
- Remove pointer events where applicable
- Use `aria-disabled` when required
- Show visual de-emphasis
- Use `cursor-not-allowed`

Disabled elements must not animate on hover or active.

If user confusion is likely, provide contextual explanation.

---

## 4. Required UX States

Every interactive feature must define:

- Loading state
- Error state
- Empty state (if data-driven)
- Disabled state
- Success state

If any of these states are missing, the feature is incomplete.

---

## 5. Prevent Duplicate Actions

While async action is in-flight:

- Disable trigger
- Prevent duplicate requests
- Provide visible in-progress state

No double submit.

---

## 6. Accessibility Is Mandatory

Keyboard and focus rules:

- Logical tab order
- Visible focus styles
- No keyboard traps
- Modals trap focus correctly
- Focus returns to trigger after close
- Enter/Space activate buttons
- Esc closes dismissible overlays

No interaction is considered complete without keyboard support.

---

## 7. Touch Target Minimum

Interactive targets must:

- Be at least 44×44px on touch devices
- Provide padding for icon buttons
- Avoid tiny tap targets
- Avoid adjacent overlapping targets

---

## 8. Destructive Action Protection

For destructive or irreversible actions:

- Require confirmation OR
- Provide undo capability

Never allow silent destructive actions.

---

## 9. No Hover-Only Critical Actions

Critical actions must not rely solely on hover visibility.

Hover-only controls must:

- Have mobile equivalents
- Be discoverable without hover

---

## 10. State Ownership Clarity

For stateful interactions:

- State must have a single source of truth
- Avoid duplicated derived state
- Avoid global state unless justified
- Avoid storing server truth locally unless required

Ambiguous state ownership is a violation.

---

# Enforcement Mechanism

This policy has higher precedence than:

- Directives
- Workflows
- Skills

Only `.agent-os/policy/*` can override this.

If a directive conflicts with this policy:

- The directive must be updated
- The policy remains authoritative

---

# Validation Requirement

Before marking an interactive feature complete, verify:

- All interactive elements visibly signal clickability
- Hover + focus styles are visible
- Active/pressed feedback exists
- Disabled states are functional
- Loading/error/empty/success states exist
- Keyboard navigation works
- Focus management is correct
- Touch targets meet minimum size

If any item fails, the feature is not done.

---

# Violation Conditions

The following are automatic failures:

- “Looks fine but feels broken”
- Clickable element without cursor pointer
- No loading state on async action
- No error feedback
- Keyboard interaction broken
- Invisible focus ring
- Double submit possible
- Silent destructive action

Violations must trigger correction and possible skill updates.

---

# System Alignment

This policy enforces:

- Predictable user experience
- Accessibility baseline
- Behavioral consistency
- Deterministic interaction modeling

It ensures the system does not degrade into visual-only design.

Interaction integrity is not optional.
