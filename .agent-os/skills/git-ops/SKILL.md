---
name: git-ops
description: Use when the user wants to stage changes, commit with a message, and push to the remote. Handles the full git workflow: git status → create branch → git add → git commit → git push branch → open GitHub PR. Also use when the user says "commit my changes", "push this", "save my work to git", or asks to create a git commit. NEVER merges directly into main — always creates a branch and opens a Pull Request.
---

# Git Operations Skill

## Workflow

Run steps in order. Do not skip steps.

1. **Check status** — understand what changed before touching anything
2. **Create branch** — always work on a feature branch, never directly on `main`
3. **Stage changes** — add files intentionally (not blindly)
4. **Commit** — write a clear, conventional commit message
5. **Push branch** — push the feature branch to remote
6. **Open PR** — create a Pull Request targeting `main`

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

**If already on `main`/`master`** — do not commit here. Proceed to Step 2 to create a branch first.

---

## Step 2 — Create Branch

Always commit on a feature branch, never directly on `main` or `master`.

If the user provided a branch name → use it exactly.
If not → infer a short kebab-case name from the work being done (e.g. `feat/add-auth`, `fix/button-hover`, `chore/update-skills`).

```bash
git checkout -b <branch-name>
```

If already on a feature branch (not `main`/`master`) → skip this step.

---

## Step 3 — Stage Changes

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

## Step 4 — Commit

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

## Step 5 — Push Branch

```bash
git push origin <current-branch>
```

- Always push the **feature branch** — never push directly to `main`.
- If the branch has no upstream yet:
  ```bash
  git push --set-upstream origin <current-branch>
  ```
- **Never use `--force` unless the user explicitly requests it.** If force-push is needed, warn the user of the consequences first.

---

## Step 6 — Open Pull Request

After pushing the branch, open a PR targeting `main`.

**Option A — GitHub CLI (preferred if available):**

```bash
gh pr create --base main --head <branch-name> --title "<commit message summary>" --body ""
```

**Option B — Output the GitHub PR URL for the user to open manually:**

```
https://github.com/<owner>/<repo>/compare/main...<branch-name>
```

Always report the PR URL so the user can review and merge on GitHub.

**NEVER:**

- Merge locally with `git merge`
- Push directly to `main`
- Skip the PR step

---

## Safety Rules

- Do not run `git reset`, `git rebase`, or `git stash` unless explicitly asked.
- **Never merge directly into `main`/`master`** — always go through a PR.
- **Never push to `main`/`master` directly** — branch first, PR always.
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
Pushed:   origin/<branch-name>
PR:       <GitHub PR URL>
Status:   AWAITING REVIEW
```
