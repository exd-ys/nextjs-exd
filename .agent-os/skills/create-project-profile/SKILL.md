# SKILL_create_project_profile

## Purpose

Create or repair a structural project profile at:

.agent-os/context/PROFILE.md

This profile describes observable characteristics of the repository.

It must:

- Record what exists
- Avoid assumptions
- Avoid ecosystem-specific logic
- Avoid behavioral prescriptions

It is descriptive, not interpretive.

---

## When to Use

- PROFILE.md does not exist
- PROFILE.md is incomplete
- .agent-os/ is imported into a new repository
- Repository structure has significantly changed

---

## When NOT to Use

- PROFILE.md exists and is structurally valid
- The user explicitly forbids governance updates

---

## Core Rule

This skill must only describe observable repository structure.

It must never:

- Assume a tech stack
- Infer framework conventions
- Prescribe best practices
- Inject feature-level requirements
- Guess validation tooling

If ambiguity exists, request clarification.

---

## Step 1 — Inspect Repository Structure

Observe and record:

### Root-Level Files

List:

- All root files
- All lock files
- All configuration files
- All build-related files
- All environment-related files

Do not interpret them.

---

### Top-Level Directories

List:

- Primary source directories
- Asset directories
- Infrastructure directories
- Documentation directories
- Test directories

Do not categorize by language.

Only record names and apparent purpose.

---

### Declared Scripts or Commands

If the repository contains a script definition file:

- Record the script names exactly as declared.
- Do not assume their purpose.
- Do not invent missing commands.

If no validation or build commands are discoverable:

Record:

- "No declared validation commands found."

---

## Step 2 — Create PROFILE.md

Create or update:

.agent-os/context/PROFILE.md

Using the exact structure below.

Do not modify section headings.

Do not remove sections.

Do not add extra sections.

---

# Project Profile

## Project Mode

- Undefined (may be set later by directive or policy)

## Repository Overview

Observed:

- Root files:
- Configuration files:
- Lock/build files:
- Environment files:

## Project Structure

Observed:

- Primary directories:
- Entry-point candidates (if any identifiable):
- Test directories:
- Asset directories:

## Declared Commands

Observed:

- Lint:
- Typecheck:
- Test:
- Build:
- Run/Dev:

(If none found, state "Not declared")

## Dependency Declaration System

Observed:

- Dependency definition files:
- Lock mechanism present:

(If none detected, state "Not declared")

## Governance Location

- Agent OS located at: .agent-os/

## Guardrails (Structural Only)

- Do not commit secrets
- Do not mix governance files with application code
- Temporary artifacts must live in .agent-os/.tmp/
- Deterministic execution is required for task completion

---

## Step 3 — Patch Behavior

If PROFILE.md exists:

- Preserve all existing user-written content
- Only fill missing sections
- Do not overwrite without explicit instruction
- Do not duplicate files

---

## Ambiguity Handling

If the repository structure is unclear:

- Ask the user:
  - What is the primary execution environment?
  - Which directories contain production code?
  - Which commands represent validation?

Do not fabricate.

---

## Known Failure Modes

- Interpreting file names as specific ecosystems
- Inventing validation commands
- Embedding feature requirements
- Creating multiple profile files
- Overwriting user-defined profile content

---

## Architectural Boundary

This skill answers:

"What structurally exists in this repository?"

It does NOT answer:

"What technology is this?"
"How should this framework be used?"
"What conventions should apply?"

Those belong to other skills or directives.
