---
name: skill-updater
description: Updates an existing skill to align with the current project's specifications, conventions, and logic. USE WHEN: user asks to "update the X skill", "align the X skill with the project", "sync the frontend skill to our stack", "refresh a skill based on current code", "update skill to match project needs", or "the X skill is outdated". Reads the target skill and the project profile, then rewrites or patches the skill so its tech-stack references, patterns, examples, and guardrails reflect actual project conventions.
---

# Skill Updater

Patch an existing skill so that its instructions, patterns, and guardrails match the project's current conventions as declared in `.agent-os/context/PROFILE.md` and observed in the live codebase.

## Inputs Required

Before starting, identify:

1. **Target skill** — which skill to update (e.g., `frontend-skill`, `shadcn-ui`, `interaction-skill`)
2. **Reason** — what is out of date or misaligned (stack change, new pattern, new component, new rule)
3. **Source of truth** — profile, codebase observation, or explicit user instruction

If the target skill or reason is not clear, ask before proceeding.

---

## Workflow

### Step 1 — Load Inputs

Read in parallel:

- `.agent-os/context/PROFILE.md` — extract key stack facts (framework, UI lib, component paths, language, package manager, key dependencies)
- Target skill file(s) — read the full `SKILL.md` and any `references/` files that are relevant

> If the skill has references files, read them only when the update touches those domains. Do not load unrelated reference files.

---

### Step 2 — Diff Against Project Truth

Compare the skill's current content to the actual project state:

| Category                   | What to check                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| **Framework / versions**   | Does the skill name a version that differs from `PROFILE.md`?                            |
| **Component paths**        | Does the skill reference component directories that don't match `src/components/ui/`?    |
| **Import patterns**        | Do code examples use outdated import styles (e.g., default vs named, old package names)? |
| **Patterns / conventions** | Does the skill describe patterns that contradict how the codebase actually works?        |
| **Guardrails**             | Are project-specific rules (e.g., "use shadcn/ui over raw HTML") missing or wrong?       |
| **Dependencies**           | Does the skill reference libraries not in `package.json` or omit ones that are?          |
| **Routing style**          | Does the skill assume Pages Router when the project uses App Router?                     |

Record every mismatch as a numbered list before making changes.

---

### Step 3 — Plan Patches

For each mismatch, decide the minimal patch:

- **Version mismatch** → update the version string in-place
- **Wrong path** → update the path string in-place
- **Wrong pattern/example** → rewrite only the affected code block or paragraph
- **Missing guardrail** → add a concise rule to the appropriate section
- **Outdated section** → rewrite minimally; do not restructure the whole skill
- **Irrelevant section** → remove only if it actively contradicts the project; otherwise leave it

**Patch discipline:**

- Do not change what isn't broken.
- Do not add new sections unless something is genuinely absent.
- Do not change the skill's voice, structure, or heading order.
- Do not expand scope beyond what the skill already covers.

---

### Step 4 — Add / Update "Project Stack Constraints" Section

Every skill that touches UI, frontend, or components must have a **"Project Stack Constraints"** section. If it is missing, add it after the opening intro and before the first workflow section.

Only include fields relevant to the skill's domain:

```markdown
## Project Stack Constraints

- Framework: Next.js 15 (App Router), React 19
- UI components: shadcn/ui + Radix UI — live in `src/components/ui/`
- Styling: Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`)
- Language: TypeScript strict mode
- Auth: Firebase v11 modular SDK
- DI: InversifyJS v6 + `reflect-metadata`
- Package manager: npm
```

For non-frontend skills (Git, docs, orchestration), skip this section.

---

### Step 5 — Apply Patches

Edit the skill file(s) directly. For each change:

1. Make the edit in-place — do not create a new file.
2. Preserve all unchanged content exactly.
3. After all patches are applied, re-read the patched file to verify correctness.

---

### Step 6 — Report

After patching, output a concise summary:

```
Skill updated: <skill name>
File(s) changed: <list>

Changes made:
1. <what changed and why>
2. <what changed and why>
...

No changes needed:
- <section> — already aligned
```

If nothing needed updating, say so explicitly rather than making no-op edits.

---

## Guardrails

- Never delete a skill's core workflow instructions to make room for project-specific content.
- Never add project business logic that belongs in a directive, not a skill.
- Never modify `skill-creator/` — it is a meta-skill and intentionally profile-agnostic.
- Never rewrite a skill from scratch when a targeted patch will do.
- Skills are reusable patterns, not project-specific runbooks — keep them generalizable where possible.

---

## References

- Project profile: `.agent-os/context/PROFILE.md`
- Skill authoring conventions: `.agent-os/skills/skill-creator/SKILL_skill-creator.md`
