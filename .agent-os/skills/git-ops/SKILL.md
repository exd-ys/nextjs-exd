---
name: git-ops
description: Use when the user wants to stage changes, commit with a message, and push to the remote. Handles the full git workflow: git status → git add → git commit → git push. Also use when the user says "commit my changes", "push this", "save my work to git", or asks to create a git commit.
---

# Git Operations Skill

## Workflow

Run steps in order. Do not skip steps.

1. **Check status** — understand what changed before touching anything
2. **Stage changes** — add files intentionally (not blindly)
3. **Commit** — write a clear, conventional commit message
4. **Push** — push to the correct remote branch

---

## Step 1 — Check Status

```bash
git status
git diff --stat
```

Report back:

- Current branch
- Untracked files
- Modified files
- Staged files

**Stop and ask** if the branch is `main` or `master` — confirm the user intends to push directly to that branch.

---

## Step 2 — Stage Changes

**Option A — Stage everything:**

```bash
git add .
```

**Option B — Stage specific files (if user specified):**

```bash
git add <file1> <file2>
```

Default to Option A unless the user specifies files or a partial commit.

---

## Step 3 — Commit

```bash
git commit -m "<type>(<scope>): <short description>"
```

### Commit Message Rules

Follow Conventional Commits format:

| Type       | When to use                          |
| ---------- | ------------------------------------ |
| `feat`     | New feature or visible UI change     |
| `fix`      | Bug fix                              |
| `chore`    | Tooling, config, dependencies        |
| `refactor` | Code restructure, no behavior change |
| `style`    | Formatting, whitespace, naming       |
| `docs`     | Documentation only                   |
| `test`     | Tests added or updated               |

**Examples:**

```
feat(auth): add forgot password flow
fix(dashboard): correct chart data aggregation
chore: update dependencies
refactor(sidebar): extract nav items to component
```

If the user provides a commit message → use it verbatim (do not reformat unless asked).  
If no message is given → infer from `git diff --stat` and staged files, then confirm with the user before committing.

---

## Step 4 — Push

```bash
git push origin <current-branch>
```

- Always push to the **current branch** by default.
- If the branch has no upstream yet:
  ```bash
  git push --set-upstream origin <current-branch>
  ```
- **Never use `--force` unless the user explicitly requests it.** If force-push is needed, warn the user of the consequences first.

---

## Safety Rules

- Do not run `git reset`, `git rebase`, or `git stash` unless explicitly asked.
- Do not push to `main`/`master` without confirming with the user.
- Do not amend published commits.
- If `git push` is rejected (non-fast-forward), report the error and ask how to proceed — do not auto-pull.

---

## Final Status Block

After completing the workflow, report:

```
✅ GIT COMMIT STATUS
Branch:   <branch-name>
Files:    <number> file(s) changed
Commit:   <commit hash (short)> — <commit message>
Pushed:   <remote/branch>
Status:   DONE
```
