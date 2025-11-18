export interface WayfinderGuidance {
  title: string
  description: string
  designConsiderations: string[]
  relatedPatterns: string[]
  examples: string[]
}

export const wayfinderGuidance: Record<string, WayfinderGuidance> = {
  'initial-cta': {
    title: 'Initial CTA',
    description:
      'A generous, low-friction entry point that invites first-time users to ask a question or share a goal. The focus is on overcoming blank canvas anxiety and signalling that anything is a valid starting point.',
    designConsiderations: [
      'Use approachable, plain-language prompts that reduce pressure to be perfect.',
      'Pair the input with helper copy that frames what the assistant can do.',
      'Provide affordances for keyboard submission and accessibility from the outset.',
    ],
    relatedPatterns: ['Suggestions', 'Templates', 'Prompt Details'],
    examples: [
      'Hero prompt on an onboarding page for a knowledge assistant.',
      'Context-aware CTA that references the user’s workspace or project.',
    ],
  },
  suggestions: {
    title: 'Suggestions',
    description:
      'Curated chips or quick-start prompts that highlight high-value questions the assistant can answer. Suggestions help users see breadth and inspire their own requests.',
    designConsiderations: [
      'Keep labels short and scannable so they fit comfortably on smaller screens.',
      'Use diverse topics or levels of complexity to appeal to different audiences.',
      'Reinforce that suggestions are optional and can be customised after selection.',
    ],
    relatedPatterns: ['Initial CTA', 'Variation Cards', 'Follow-up Bar'],
    examples: [
      'A set of “Try asking…” chips on a landing state.',
      'Role-specific prompts (e.g. Designer, Researcher, PM) surfaced contextually.',
    ],
  },
  randomize: {
    title: 'Randomize',
    description:
      'A mechanism to generate new prompt ideas or refresh options when someone is unsure what to ask next. Randomization keeps momentum when inspiration dips.',
    designConsiderations: [
      'Make the interaction fast with instant feedback so the user keeps exploring.',
      'Provide a clear escape hatch to revert if the randomised option is not helpful.',
      'Ensure generated ideas remain relevant to the user’s current task or domain.',
    ],
    relatedPatterns: ['Suggestions', 'Example Gallery', 'Nudges'],
    examples: [
      'Shuffle button that rotates through creative writing prompts.',
      '“Surprise me” action that proposes a new analysis direction.',
    ],
  },
  'prompt-details': {
    title: 'Prompt Details',
    description:
      'A structured reveal of the prompt, settings, or metadata that were used to generate the assistant’s response. Helps users understand and refine the underlying instruction.',
    designConsiderations: [
      'Show only the most relevant details to avoid overwhelming the interface.',
      'Allow users to copy or edit the prompt so they can iterate quickly.',
      'Surface system instructions or guardrails for transparency.',
    ],
    relatedPatterns: ['Suggestions', 'Trust Builders: Footprints', 'Templates'],
    examples: [
      'Expandable drawer showing system prompt, temperature, and data sources.',
      'Inline prompt preview next to a generated response for quick adjustments.',
    ],
  },
  nudges: {
    title: 'Nudges',
    description:
      'Contextual hints that appear just-in-time to guide the next action or unblock progress. Nudges are lightweight reminders rather than prescriptive flows.',
    designConsiderations: [
      'Trigger nudges sparingly so they feel helpful instead of interruptive.',
      'Match the tone to the brand voice and the urgency of the suggestion.',
      'Provide a clear action (primary or secondary) that resolves the nudge.',
    ],
    relatedPatterns: ['Follow-up Bar', 'Suggestions', 'Trust Builders: Caveat'],
    examples: [
      'Banner recommending the user add more context after a vague prompt.',
      'Gentle reminder to try voice input when typing speed is slow.',
    ],
  },
  'example-gallery': {
    title: 'Example Gallery',
    description:
      'A curated collection of prompts, responses, or workflows that demonstrate what great looks like. Galleries build confidence by showing tangible outputs.',
    designConsiderations: [
      'Group examples by goal or persona so users can find relevant inspiration.',
      'Highlight the parameters or inputs that produced each example.',
      'Keep previews concise with the option to drill into full case studies.',
    ],
    relatedPatterns: ['Templates', 'Variation Cards', 'Suggestions'],
    examples: [
      'Carousel of “before and after” copywriting revisions.',
      'Gallery of research summaries tagged by industry vertical.',
    ],
  },
  templates: {
    title: 'Templates',
    description:
      'Pre-structured forms or blueprints that guide users through proven prompt frameworks. Templates reduce cognitive load when crafting multi-field inputs.',
    designConsiderations: [
      'Keep required fields to the essentials and allow optional context.',
      'Explain what each field influences in the final output.',
      'Allow saving or duplicating templates for teams who rely on shared playbooks.',
    ],
    relatedPatterns: ['Initial CTA', 'Example Gallery', 'Data Ownership'],
    examples: [
      'Email draft template with recipient, subject, and key points fields.',
      'Meeting recap template that collects attendees, agenda, and decisions.',
    ],
  },
  'variation-cards': {
    title: 'Variation Cards',
    description:
      'Side-by-side explorations of the same idea in different styles or depths. Variations help users evaluate, compare, and choose the best direction.',
    designConsiderations: [
      'Provide clear labels that explain how each variation differs.',
      'Support quick selection or further refinement of the chosen variation.',
      'Allow bookmarking or sharing of a preferred variation with teammates.',
    ],
    relatedPatterns: [
      'Suggestions',
      'Trust Builders: Variations',
      'Follow-up Bar',
    ],
    examples: [
      'Three tone options (Professional, Friendly, Enthusiastic) for marketing copy.',
      'Alternate data visualisations generated from the same dataset.',
    ],
  },
  'follow-up-bar': {
    title: 'Follow-up Bar',
    description:
      'An inline toolbar placed near the response that offers smart follow-up actions. It keeps momentum by suggesting “where to go next.”',
    designConsiderations: [
      'Prioritise actions based on the user’s recent behaviour or open loops.',
      'Keep the bar lightweight so it doesn’t compete with the main content.',
      'Allow quick dismissal or customization to respect user control.',
    ],
    relatedPatterns: ['Nudges', 'Suggestions', 'Trust Builders: Controls'],
    examples: [
      'Buttons to simplify, expand, or add examples right under a response.',
      'Follow-up chips that branch into deeper workflows like “Create slides.”',
    ],
  },
}
