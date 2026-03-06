# ensure_project_profile

## Objective

Ensure that a valid structural project profile exists at:

.agent-os/context/PROFILE.md

The profile must accurately describe the observable repository structure.

The system must not proceed with feature directives if the profile is missing or structurally invalid.

---

## When to Run

- Immediately after importing `.agent-os/`
- Before running any feature directive
- When PROFILE.md is missing
- When repository structure has changed
- When validation commands are unclear

---

## Required Reads

- .agent-os/AGENTS.md
- .agent-os/context/PROFILE.md (if present)
- .agent-os/skills/SKILL_create_project_profile.md

---

## Core Rule

This directive does not create profiles directly.

It delegates structural profile creation or repair to:

.agent-os/skills/SKILL_create_project_profile.md

---

## Procedure

### Step 1 — Check Existence

Check if:

.agent-os/context/PROFILE.md

exists.

If it does not exist:

- Invoke `SKILL_create_project_profile`
- Create PROFILE.md
- Continue to Step 3

If it exists:

- Continue to Step 2

---

### Step 2 — Validate Structural Integrity

PROFILE.md must contain these sections:

- Project Mode
- Repository Overview
- Project Structure
- Declared Commands
- Dependency Declaration System
- Governance Location
- Guardrails

If any section is missing:

- Invoke `SKILL_create_project_profile`
- Patch only missing sections
- Do not overwrite existing valid content

---

### Step 3 — Confirm Alignment

Confirm that PROFILE.md reflects actual repository structure.

Specifically verify:

- Listed root files exist
- Listed directories exist
- Declared commands match observable configuration
- Governance location correctly states `.agent-os/`

If discrepancies are found:

- Update PROFILE.md via the skill
- Do not invent missing structure

---

### Step 4 — Ambiguity Handling

If structural signals are unclear:

- Pause execution
- Ask the user for clarification
- Do not guess

---

## Constraints

- Do not assume technology stack
- Do not inject framework-specific behavior
- Do not add feature-level requirements
- Do not overwrite user-written content without instruction
- Do not create duplicate profile files

---

## Validation

This directive is complete when:

- `.agent-os/context/PROFILE.md` exists
- It contains all required sections
- It accurately reflects observable repository structure
- No structural assumptions were fabricated

If PROFILE.md cannot be validated, execution of other directives must halt.
