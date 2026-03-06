
---
name: frontend-ship-gate
description: Mandatory QA gate before marking frontend work as complete. Covers directive alignment, accessibility, contrast, code formatting (Prettier), code integrity, and anti-AI enforcement.
---

# Frontend Ship Gate (Mandatory Before Completion)

Run this after implementation and before final output.

If any check fails → fix before proceeding.

---

# 1️⃣ Directive Alignment

If a directive exists:

- Every section implemented
- No invented copy
- Layout matches structure
- Brand tokens applied consistently

---

# 2️⃣ Contrast & Accessibility

Verify:

- WCAG AA contrast for text
- Visible focus states
- Keyboard navigation works
- All images have alt text
- Icon buttons have aria-label
- Tap targets ≥ 44px
- Reduced motion respected

---

# 3️⃣ Code Formatting

Run check first:

```bash
npm run check-format
```

If violations exist, auto-fix:

```bash
npm run fix-format
```

Confirm:

- No formatting violations reported by Prettier
- Imports are organized (prettier-plugin-organize-imports)
- No files excluded from formatting that should be included

---

# 4️⃣ Code Integrity

Run:

```bash
npm run lint
```

Confirm:

- No `any` types without reason
- No unused imports
- No console logs
- No hardcoded colors
- GSAP cleaned up properly
- All mapped lists have keys
- next/image used correctly

---

# 5️⃣ Anti-AI Layout Check

Ask:

- Does this look like a template?
- Is the hero predictable?
- Are sections identical in rhythm?
- Is typography system-defined?
- Are buttons brand-specific?
- Is spacing varied intentionally?

If any answer is "Yes, it feels generic" → redesign.

---

# 6️⃣ Human-Designed Audit

Would a senior product designer ship this proudly?

If not → iterate.

---

# Final Status Block

Produce:

📋 SHIP STATUS  
[ ] Directive aligned  
[ ] Contrast verified  
[ ] Accessibility verified  
[ ] Prettier format clean  
[ ] Lint clean  
[ ] No AI-pattern layout

Status: READY or BLOCKED
