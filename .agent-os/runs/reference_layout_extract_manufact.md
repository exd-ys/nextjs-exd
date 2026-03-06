# Reference Layout Extract: Manufact

- **Source**: Full page screenshot provided by user
- **Date**: 2026-03-03
- **Primary Vibe**: Engineered, precise, industrial but highly polished. Alternating stark light and deep dark sections.

## Page Rhythm

The page utilizes a stark contrast strategy, alternating between a textured "warm off-white/light gray" base and deep charcoal/black sections.

- Spacing is generous (`py-24` to `py-32` equivalent) to allow the technical blueprints and large typography to breathe.
- Content is strictly bound to a centered max-width container, but background colors and major images bleed to the edges.
- Vertical guides (thin dotted/solid lines) traverse the light sections, reinforcing a "blueprint/CAD" aesthetic.

## Section Map

1. **Header**: Clean, light background. Logo left, center nav, dark CTA right. Thin orange top border accent.
2. **Hero Segment**: Split layout. Huge H1 left. Meta + CTA right. Seamlessly flows into a full-bleed industrial image below.
3. **Overlapping Stats Segment**: Light bg. Large overlapping circular badges (White, Dark Gray, Orange) containing metrics.
4. **Capabilities List (Modular Feature Row)**: Light bg. Asymmetric split: Section title left, vertical list of capabilities right (incorporating numbering, small image, title, bullets, and an arrow glyph).
5. **Technical Exploded View**: Dark bg section. Large central technical diagram with metrics ("50,000+"). Below it, a 4-column feature grid.
6. **Information/Contact Split**: Light bg. Two distinct columns (grey box left, white card right).
7. **Team/Leaders**: Dark bg section. Horizontal scrolling cards or grid of profiles.
8. **Banner CTA**: Full-width dark section with a centered title and orange button.
9. **Footer**: Dark bg. Navigation links top, massive brand wordmark spanning the very bottom.

## Layout System

- **Container rules**: Strict central column (likely ~1280px-1440px max) with internal grid alignments.
- **Grid rules**: 12-column underlying grid. Heavy use of asymmetrical splits (e.g., 4-col left title, 8-col right content).
- **Spacing rhythm**: High vertical padding between distinct sections. Tight grouping within data cards.
- **Background patterning**: Light sections feature a subtle grain and 4-6 vertical delimiter lines.
- **Media rules**: Photography is highly graded (warm/orange tones or desaturated cool tones) to pop against the neutral backgrounds.

## Component Inventory

- **Primary CTA Button**: Solid orange (`#C8370B`), sharp corners, often includes an arrow icon.
- **Secondary CTA Button**: Solid dark gray/black, white text.
- **Hero Title**: Extremely tight line-height (0.9), negative tracking, large scale. Highlights specific words in orange.
- **Capability List Item**: Horizontal composition: `[01] | [Small Image aspect-video] | [Title] | [Bullet List] | [Orange Square Arrow Icon]`. Bottom border delimiter between items.
- **Stat Circle**: Perfect circle, varying sizes. Contains large number and short label. Overlaps adjacent circles.
- **Grid Card (Dark Section)**: Dark gray surface, image top, title, description, bottom border delimiter, "Learn more" link.

## Motion Language

- **On-load**: Expect staggered text reveals in the hero (lines slide up and fade).
- **On-scroll**: Sections slide up gently. Image containers might have a slight parallax or scale-out effect.
- **Hover/focus**: Buttons exhibit slight scale or color shifts. The orange square arrow icons in the list likely translate X/Y on hover.

## Responsive Rules

- **Grid collapse**: The asymmetrical 4/8 splits collapse to stacked 1-column layouts on mobile.
- **Capability List**: The horizontal list items will stack internally (Image above title/bullets).
- **Stat Circles**: Overlap reduced or transformed into a horizontal scrolling row on mobile.

## Adaptation Levers (Fitting the PRD)

- **Hero**: Keep the structure. Copy becomes "Total traceability for field operations" (PRD).
- **Capabilities List**: Fits the "5 Core MVP Modules" perfectly.
- **Technical Exploded View**: Fits the "Drawing Annotation (Leaflet)" PRD requirement.
- **Stat Circles**: Can be used for "Strategic Benefits" (Eliminate Manual Processes, Faster Approvals, Mobility).

## Implementation Alignment

- **Framework**: `Next.js`, `Tailwind CSS`.
- **Skills**:
  - `frontend-skill`: Implementing the complex asymmetrical grid layouts and blueprint background lines.
  - `interaction-skill`: Using GSAP for the scroll-stagger reveals and hero text entry.
  - `use-shadcn`: Utilizing base primitives but stripping heavy shadows/radii to match the sharp, flat, industrial reference.
