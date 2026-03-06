# SKILL_use_shadcn_components

## Purpose

Use shadcn components as the default foundation for UI primitives — while adapting them to match the project’s visual design and structural requirements.

This skill governs _how_ shadcn is used, not how it is installed.

---

## Core Rule

- Use shadcn components by default for standard UI primitives.
- Do NOT ship shadcn base styling unchanged.
- Always adapt styling to match the project’s design language.
- If a required component does not exist in shadcn, create a new custom component.

---

## When To Use

- Building UI components for pages
- Refactoring components
- Implementing PRD-driven sections
- Standardizing component behavior

---

## Component Usage Rules

### 1. Use shadcn As Default Primitive Source

For common components such as:

- Button
- Card
- Input
- Dialog
- Dropdown
- Tabs
- Table
- Sheet
- Accordion
- Form elements

Start from shadcn.

---

### 2. Adapt Styling to Match Design

Before shipping a component:

- Adjust radius to match design language
- Adjust spacing and density
- Adjust typography scale
- Adjust color roles
- Adjust elevation/shadow
- Adjust hover/focus states
- Adjust motion behavior

Never rely on:

- Default radius
- Default color palette
- Default spacing scale
- Default visual density

The component must visually belong to the system.

---

### 3. Do Not Force-Fit

If:

- The PRD requires a pattern that shadcn does not provide
- The layout requires a unique structure
- The inspiration includes a distinct UI pattern
- The interaction behavior differs significantly

Then:

- Create a new custom component
- Compose from primitives if helpful
- Keep accessibility intact
- Follow project conventions

Do not distort an existing shadcn component into something unnatural.

---

### 4. Composition > Over-Varianting

Avoid turning one component into 10 unrelated variants.

If behavior or structure diverges:

- Create a new component
- Keep responsibilities clear

---

### 5. Accessibility Must Be Preserved

When modifying:

- Keep ARIA attributes
- Preserve keyboard behavior
- Maintain focus visibility
- Maintain semantic structure

Visual customization must not break accessibility.

---

## Definition of Done

- Standard primitives use shadcn as base
- No component visually resembles default shadcn styling
- Custom components are created when appropriate
- Accessibility preserved
- Visual consistency across the system
