# Inspiration Audit: manufact-wbs.framer.website

## Source

- URL: https://manufact-wbs.framer.website/
- Date Audited: 2026-03-03
- Directive: build_site_from_inspiration_plus_prd

---

## Layout System

### Grid

- Max-width container (~1200–1280px), centered
- 12-column grid underpinning most sections
- Section padding: ~100–120px vertical rhythm
- Generous internal whitespace within cards

### Section Patterns Identified

1. **Fullscreen Hero** — Dark bg, large serif/display headline, tag label (monospace), two CTAs, hero image flush right
2. **Stats Strip** — 3–4 large numeric stats with supporting labels; horizontal dividers
3. **Identity Strip** — Short mission statement + year tag, inline avatar row, secondary stat row
4. **Services/Capabilities Grid** — 3–4 service cards, icon + title + feature checklist + CTA button
5. **CTA Banner** — Full-width dark strip with headline, single CTA, background texture
6. **Products Showcase** — Horizontal scroll or 2-col cards: image + metadata (material, capability, size)
7. **Industry Tabs** — Tab/accordion for industries: icon, description, bullet list, image
8. **Case Studies** — Cards: headline, % metric, industry label, client logo, image
9. **Why Choose Strip** — Left-aligned feature checklist + avatar row + ratings
10. **Testimonials** — Single large quote, attribution, image beside right
11. **Blog Grid** — 3-card blog preview row + newsletter signup
12. **Footer** — 4-column: logo + tagline | links | contact | hours + social

---

## Typography Language

- **H1 / Hero headline**: Very large (64–80px), tight tracking, bold or semibold
- **H2 / Section headline**: Large (36–48px), semibold
- **Tags/Labels**: Monospace or small-caps uppercase, muted color, preceding headlines (e.g. `// SINCE - 2005 //`)
- **Body**: 16–18px, relaxed line height, secondary color (~#888)
- **Stats numbers**: Oversized display (56–80px), high contrast white
- **Check-list items**: Small caps or regular 14px with custom arrow-check icon

---

## Color Language

- Background: Near-black (~#0A0A0A / #0D0D0D)
- Surface/Card: ~#141414 / #1A1A1A with subtle 1px border (#222)
- Text Primary: Off-white (#F5F0EB or #EFEFEF)
- Text Secondary: Muted gray (#888 / #666)
- Accent: Not strongly visible — monochrome with structural line use
- Borders: Very subtle 1px solid #222 or #1F1F1F

---

## Motion Language

- **Entry animations**: Fade-up on scroll (opacity 0→1, y 24px→0), staggered on grid children
- **Stats counters**: Count-up animation on viewport entry
- **Hero headline**: Reveal with slight y translation + opacity
- **Card hover**: Subtle border/background lightening (CSS hover, no GSAP needed)
- **Easing**: `power2.out` — smooth deceleration, ~0.8–1.2s duration
- **Reduced motion**: All GSAP animations must check `prefers-reduced-motion`

---

## Tone

- Industrial, confident, precise
- Not warm/friendly — authoritative and technical
- Heavy use of numbers, certifications, specifics
- Clean and minimal: no decorative noise

---

## DESIGN.md Token Mapping

See `.agent-os/context/DESIGN.md`
