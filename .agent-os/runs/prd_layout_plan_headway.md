# PRD Layout Plan — HEADWAY ERP Website

> Directive: build_site_from_inspiration_plus_prd
> Inspiration: https://manufact-wbs.framer.website/
> PRD: ManyHeads_PRD.md
> Date: 2026-03-03

---

## PRD Content Model

### Target Users

- Welding supervisors, inspectors, and managers
- Industrial SMEs in mining, LNG, construction
- Compliance officers needing ISO 3834 / AS/NZS audit readiness

### Jobs to Be Done

- Replace fragmented Excel/Sheets with one unified platform
- Ensure 100% traceability for compliance audits
- Speed up approvals (drawing annotations, NDT requests)
- Enable field access on tablet/mobile

### Key Value Props

1. Full weld traceability (ISO 3834, ISO 9606, AS/NZS)
2. 5 integrated compliance modules
3. Excel-familiar interface — low training overhead
4. Built for field use (tablet/mobile optimized)
5. Indigenous-owned Australian tech company (trust signal)

### Required Sections

- Hero (CTA: Book Demo / View Platform)
- Stats proof strip
- About/Identity (Many Heads + Clement's credentials)
- 5 Modules showcase
- Strategic benefits (3 benefits)
- Pricing (Free / Pro / Enterprise)
- Partners (You Source / Gilroy / First Nation Start Up)
- CTA Banner (Book Demo)
- Footer

### Content Entities

- 3 pricing tiers
- 5 modules
- 3 strategic benefits
- 3 strategic partners
- 4 stat numbers

---

## Section Order (Funnel)

```
1. NAV (fixed)
2. HERO — Headline, 2 CTAs
3. STATS STRIP — 4 proof numbers
4. ABOUT / IDENTITY — Who Many Heads is, credentials
5. MODULES GRID — 5 core modules as cards
6. BENEFITS — 3 benefit narrative blocks
7. PRICING — 3 tier cards
8. PARTNERS — 3 partner names
9. CTA BANNER — Book a Demo
10. FOOTER
```

---

## Mapping: PRD Requirements → Layout Components

| PRD Section        | Layout Component  | Inspiration Pattern                                   |
| ------------------ | ----------------- | ----------------------------------------------------- |
| Hero               | `HeroSection`     | Fullscreen Hero (headline + tag + 2 CTAs)             |
| Stats / proof      | `StatsStrip`      | Stats Strip (3–4 large numbers)                       |
| About Many Heads   | `AboutIdentity`   | Identity Strip                                        |
| 5 Core Modules     | `ModulesGrid`     | Services/Capabilities Grid                            |
| Strategic Benefits | `BenefitsSection` | Why Choose Strip                                      |
| Pricing            | `PricingSection`  | (added; no direct inspiration analog — use card grid) |
| Partners           | `PartnersSection` | Client logos row (adapted to named partners)          |
| CTA                | `CtaBanner`       | CTA Banner full-width                                 |
| Footer             | `FooterSection`   | Footer multi-column                                   |

---

## Motion Plan

| Section                 | Animation         | Trigger                    | GSAP Pattern                    |
| ----------------------- | ----------------- | -------------------------- | ------------------------------- |
| Hero headline           | Fade up, y offset | On load                    | `fromTo`, `power2.out`, 1.0s    |
| Hero subheadline + CTAs | Stagger fade up   | Immediately after headline | `stagger: 0.12`, `power2.out`   |
| Stats numbers           | Count-up          | Scroll into view           | Custom counter in `useGSAP`     |
| Module cards            | Stagger fade up   | Scroll into view           | `stagger: 0.08`, `power2.out`   |
| Benefits blocks         | Fade in left      | Scroll into view           | `fromTo`, x offset              |
| Pricing cards           | Stagger scale in  | Scroll into view           | `stagger: 0.1`, `back.out(1.2)` |

All animations must be skipped if `prefers-reduced-motion: reduce`.

---

## Implementation Alignment

| Skill                                                   | Role in this plan                                                                                                                                                      |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontend-skill`                                        | Governs section IA, hierarchy, and anti-generic requirements. Section spacing is intentionally varied. Hero breaks symmetry with right-side compliance visual element. |
| `interaction-skill`                                     | All module cards, pricing cards, and CTA links must satisfy: cursor-pointer, hover state, focus-visible ring, active:translate-y-px on buttons.                        |
| `shadcn-ui`                                             | `cn()` helper from `lib/utils.ts` used for composition. Primitives in `components/ui/`.                                                                                |
| `frontend-QA-skill`                                     | Validates after build: directive aligned, contrast AA, no hardcoded colors, no AI-pattern layout.                                                                      |
| `SKILL_instantiate_nextjs_tailwind_shadcn_gsap_project` | Server/Client boundary, useGSAP pattern, ScrollTrigger scoped to Client components.                                                                                    |
