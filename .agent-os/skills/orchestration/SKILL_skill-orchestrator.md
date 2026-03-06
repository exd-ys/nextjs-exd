---
name: skill-orchestrator
description: Automatically discovers, selects, and applies the most relevant skills from the .agent-os/skills/ directory for any given task. Use when a task or directive is provided and the agent must determine which skills to use and how to apply them.
---

# Skill Orchestrator

This skill enables an agent to find and use the right skills from the skills folder when a task is given.

## Workflow

1. **Recursive Skill Discovery**

   - Scan all subfolders and files under `.agent-os/skills/`.
   - Build a list of available skills, reading their metadata (name, description).

2. **Domain and Keyword Matching**

   - For the given task, extract domain (e.g., UI, backend, QA) and keywords (task nouns, directive names, artifact names).
   - Match skills by domain and keyword relevance.

3. **Skill Plan Disclosure**

   - Before execution, present a Skill Plan listing selected skills and justifications for their selection.
   - If no relevant skills are found, state this and explain why.

4. **Skill Application**

   - Apply selected skills deterministically during orchestration.
   - If multiple skills apply, compose them and resolve conflicts using precedence rules (policy > profile > directive > workflow > skill).

5. **Skill Gap Protocol**
   - If no relevant skill exists and logic is reusable, extract and create a new skill for future use.

## Usage

- Use this skill whenever a task or directive is given and the agent must determine which skills to use from the skills folder.
- Always disclose the Skill Plan before executing any deterministic work.
- Follow selected skills precisely; do not improvise or skip skill discovery.

## Validation

- Confirm recursive scan of all skills folders.
- Verify domain and keyword matching logic.
- Ensure Skill Plan is presented before execution.
- Check that selected skills are followed in execution.
- Confirm extraction of new skills if gaps are found.

## Acceptance Criteria

- Skill discovery is recursive and covers all nested folders.
- Skill Plan is always disclosed before execution.
- Selected skills are applied and referenced in execution.
- New reusable logic is extracted as a skill if needed.
- Validation steps are documented and pass.
