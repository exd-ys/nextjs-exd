# instantiate_expo_nativewind_shadcn_project

## Objective

Instantiate an Expo Go compatible React Native project scaffold aligned with `.agent-os/context/PROFILE.md`, using:

- NativeWind (Tailwind utilities)
- shadcn-style primitives via React Native Reusables patterns
- A minimal, working “Home” screen baseline

This directive establishes a deterministic baseline suitable for rapid prototyping.

---

## Inputs (Provided in Chat)

- Project name
- Entry style:
  - Option A: `App.tsx` single-entry prototype (default)
  - Option B: router-based structure (only if you already use one)
- Bootstrap UI:
  - Default: Home screen with a header, a card, and a primary button

---

## Required Reads

- `.agent-os/context/PROFILE.md`
- `.agent-os/directives/ensure_project_profile.md` (if PROFILE missing)

---

## Outputs (Must Produce)

### Governance

- Ensure `.agent-os/context/PROFILE.md` exists and is structurally valid.
- Ensure these folders exist:
  - `.agent-os/policy/`
  - `.agent-os/workflows/`
  - `.agent-os/templates/`
  - `.agent-os/runs/`
  - `.agent-os/.tmp/`
- Create minimal `.agent-os/policy/DEFINITION_OF_DONE.md` if missing.

### App Bootstrap (Create/Update)

Create/update project files to support:

- NativeWind configuration scaffolding:
  - `global.css`
  - `tailwind.config.*`
  - `metro.config.js`
  - `babel.config.js` (only if needed)
- UI primitives folder:
  - `components/ui/`
  - `components/` as needed
- Entry screen:
  - `App.tsx` (or chosen entry) renders a styled Home screen with:
    - Title + subtitle
    - Card section
    - Primary button
  - Use NativeWind utility classes (`className`) for styling.

### Dependency Manifest (If Agent Cannot Install)

If the environment cannot install packages automatically:

- Output a single “Required Packages” list (names only)
- Output a single “Optional Packages” list (names only)
- Do not invent versions

---

## Constraints

- Must remain compatible with Expo Go.
- Must keep styling consistent with NativeWind (utility classes).
- Must keep primitives in `components/ui/` and avoid editing vendored primitives directly.
- Must not add extra libraries beyond what is required for NativeWind + reusables + Expo baseline.

---

## Procedure

1. Ensure profile exists:
   - If `.agent-os/context/PROFILE.md` missing → run `ensure_project_profile`.
2. Confirm `.agent-os/` folder structure exists (create missing recommended folders).
3. Generate NativeWind scaffolding:
   - Create `global.css` and Tailwind directives.
   - Create `tailwind.config.*` with correct content globs.
   - Create/update `metro.config.js` as required by NativeWind.
   - Create/update `babel.config.js` only if required.
4. Create UI primitives structure:
   - Create `components/ui/` and add placeholder `Button` and `Card` components if reusables are not installed yet.
   - If reusables are installed, align primitives with those patterns.
5. Create Home screen entry:
   - Add a simple layout that visibly confirms NativeWind is working.
   - Use the `Button` and `Card` primitives.
6. Provide a No-Terminal checklist:
   - Where to paste files
   - What packages to install (if missing)
   - How to verify the app runs and styles apply

---

## Validation

Minimum:

- Entry renders without crashing.
- Utility class styling visibly applies.
- Home screen shows header + card + button.

If the environment supports running commands:

- Update PROFILE.md with actual scripts/commands observed.
- Ensure the primary flow remains functional.
