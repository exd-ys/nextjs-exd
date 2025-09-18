# 📘 Project Context & Coding Guidelines for AI

## Project Context

- The project is built with **React + TailwindCSS**.
- We use **shadcn/ui** as the primary component library.
- Code should follow **established project patterns** for consistency, readability, and maintainability.
- **Goal:** Ensure AI-generated code integrates seamlessly with existing components and conventions.

---

## Coding Guidelines

### 1. Use shadcn Components Always

- Prefer `shadcn/ui` components over raw HTML or custom code unless a component does not exist.
- Example: use `<Button />` from shadcn instead of a `<button>` tag.
- Extend existing components via props or composition before creating new ones.

### 2. Follow Project Code Patterns

- Match existing **naming conventions**, **folder structure**, and **import patterns**.
- Respect **state management strategy** (e.g., hooks, context, zustand, etc. depending on project).
- Maintain **consistent styling** (e.g., Tailwind utility classes layered with project tokens).
- Write **type-safe code** (TypeScript, strict mode).

### 3. Component Development Rules

- Components should be **functional** (`React.FC` or arrow functions).
- Keep components **small, reusable, and composable**.
- Accept **props** for customization, avoid hardcoding values.
- Default props must align with project’s **design tokens & standards**.

### 4. Accessibility & UX

- Ensure ARIA attributes and semantic HTML when applicable.
- Always make components keyboard-navigable.
- Follow the **accessibility baseline** defined in shadcn components.

### 5. Documentation & Comments

- Provide **inline comments** for complex logic.
- Include **usage examples** if generating new reusable components.
- Keep comments short, clear, and contextual.

### 6. Reviewing Changes

When reviewing AI-suggested code:

- ✅ Confirm **shadcn components** are used.
- ✅ Verify **consistency with existing patterns**.
- ✅ Check **type-safety** and **error handling**.
- ✅ Ensure **readability & maintainability**.
- ❌ Reject raw HTML where shadcn alternatives exist.
- ❌ Reject code that introduces conflicting design or architecture patterns.

---

## ⚡ Priority Hierarchy

1. **shadcn/ui**
2. **Project code patterns**
3. **Type safety**
4. **Accessibility**
