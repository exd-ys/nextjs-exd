export interface TunerPatternGuidance {
  title: string
  description: string
  designConsiderations: string[]
  relatedPatterns: string[]
  examples: string[]
}

export type TunerPatternKey =
  | 'attachments'
  | 'connectors'
  | 'filters'
  | 'model-management'
  | 'modes'
  | 'parameters'
  | 'preset-styles'
  | 'prompt-enhancer'
  | 'saved-styles'
  | 'voice-and-tone'

export const tunerPatternGuidance: Record<
  TunerPatternKey,
  TunerPatternGuidance
> = {
  attachments: {
    title: 'Attachments',
    description:
      'Let users hand AI concrete references—documents, images, datasets—so responses anchor to the right source material.',
    designConsiderations: [
      'Surface supported file types, size limits, and privacy guidance before upload.',
      'Show attachment metadata and allow reordering or removal before the prompt runs.',
      'Offer a “why attach this” hint to reinforce the value of grounding outputs.',
    ],
    relatedPatterns: [
      'Connectors',
      'Trust Builders: References',
      'Inline Action',
    ],
    examples: [
      'Upload a PDF brief to guide a proposal draft.',
      'Attach screenshots to ensure visual references inform the output.',
    ],
  },
  connectors: {
    title: 'Connectors',
    description:
      'Let AI tap external data sources—APIs, knowledge bases, CRMs—so responses stay current and contextual.',
    designConsiderations: [
      'Indicate connection status, freshness, and permissions to avoid surprises.',
      'Allow scoping to specific datasets or tables to control retrieval.',
      'Track usage or cost so users understand the impact of enabling connectors.',
    ],
    relatedPatterns: ['Attachments', 'Filters', 'Action Plan'],
    examples: [
      'Connect to a product catalog to personalize copy with live inventory.',
      'Link a research repository so AI can cite the newest findings.',
    ],
  },
  filters: {
    title: 'Filters',
    description:
      'Help users constrain the inputs or outputs of the assistant by source, type, modality, or lifecycle stage.',
    designConsiderations: [
      'Make the impact of each filter obvious before it is applied.',
      'Support multi-select and saved filter sets for recurring workflows.',
      'Communicate when filters produce no results and suggest fallbacks.',
    ],
    relatedPatterns: ['Connectors', 'Parameters', 'Suggestions'],
    examples: [
      'Filter search results to peer-reviewed studies only.',
      'Limit generated imagery to licensed brand assets.',
    ],
  },
  'model-management': {
    title: 'Model management',
    description:
      'Expose which AI model is being used and let people switch to variants that better match their task.',
    designConsiderations: [
      'Explain trade-offs (speed, cost, quality) in approachable language.',
      'Prevent access to restricted models unless the user has privileges.',
      'Remember per-project defaults so teams don’t need to reconfigure each session.',
    ],
    relatedPatterns: ['Modes', 'Parameters', 'Controls'],
    examples: [
      'Toggle between fast and high-fidelity models depending on deadline.',
      'Select a multimodal model when working with both text and images.',
    ],
  },
  modes: {
    title: 'Modes',
    description:
      'Shift the assistant’s persona, constraints, or training data slices to match a specific context of use.',
    designConsiderations: [
      'Label modes with clear outcomes rather than internal jargon.',
      'Allow per-mode customization so teams can fine-tune tone or guardrails.',
      'Make it simple to switch or compare modes without losing work.',
    ],
    relatedPatterns: ['Voice & Tone', 'Parameters', 'Saved Styles'],
    examples: [
      'Switch from “Brainstorming” to “Legal Review” mode to tighten compliance.',
      'Offer a “Beginner” vs. “Expert” mode for teaching complex concepts.',
    ],
  },
  parameters: {
    title: 'Parameters',
    description:
      'Expose token limits, temperature, and other knobs so advanced users can tune generation behavior.',
    designConsiderations: [
      'Explain how each parameter affects the output with practical examples.',
      'Allow presets to avoid overwhelming new users with too many sliders.',
      'Highlight default or recommended ranges to prevent error states.',
    ],
    relatedPatterns: ['Prompt Enhancer', 'Modes', 'Controls'],
    examples: [
      'Adjust temperature and top-p when drafting creative marketing copy.',
      'Set max tokens and presence penalties for longer technical summaries.',
    ],
  },
  'preset-styles': {
    title: 'Preset styles',
    description:
      'Provide default styles or tone options so users can quickly match brand or aesthetic guidelines.',
    designConsiderations: [
      'Show previews or descriptors so style differences are obvious.',
      'Group presets by use case (email, social, executive) for quick scanning.',
      'Allow admin governance to manage and update presets across the org.',
    ],
    relatedPatterns: ['Saved Styles', 'Restyle', 'Voice & Tone'],
    examples: [
      'Toggle between “Case Study”, “Press Release”, and “Blog Post” presets.',
      'Offer ready-made prompt augmentations for cinematic vs. minimalist imagery.',
    ],
  },
  'prompt-enhancer': {
    title: 'Prompt enhancer',
    description:
      'Suggest improvements, additional context, or best practices before the prompt is sent to the model.',
    designConsiderations: [
      'Explain why each enhancement helps and let users accept or reject it.',
      'Keep enhancements diffable so users trust what changed.',
      'Allow teams to save custom enhancements for repeatable playbooks.',
    ],
    relatedPatterns: ['Suggestions', 'Templates', 'Parameters'],
    examples: [
      'Recommend adding target audience, voice, and desired format before submission.',
      'Highlight missing constraints (length, region) that improve localization accuracy.',
    ],
  },
  'saved-styles': {
    title: 'Saved styles',
    description:
      'Let people capture their own prompt settings—tone, instructions, filters—so they can reuse them later or share with teammates.',
    designConsiderations: [
      'Show who created each style and when it was last updated.',
      'Support versioning or cloning to evolve styles without breaking existing ones.',
      'Allow tagging or search so large libraries stay navigable.',
    ],
    relatedPatterns: ['Preset Styles', 'Modes', 'Voice & Tone'],
    examples: [
      'Store “Executive Weekly Update” prompt settings for leadership reports.',
      'Share a “Product Launch Hype” tone pack with the marketing squad.',
    ],
  },
  'voice-and-tone': {
    title: 'Voice & tone',
    description:
      'Ensure outputs match a desired voice, tone, and personality consistently across a team or brand.',
    designConsiderations: [
      'Offer a blend of preset voices and customization knobs for nuance.',
      'Provide example outputs to illustrate how the voice impacts content.',
      'Allow quick overrides so users can adapt tone to different audiences.',
    ],
    relatedPatterns: ['Saved Styles', 'Modes', 'Restyle'],
    examples: [
      'Switch between “Professional”, “Friendly”, and “Empathetic” tone profiles.',
      'Define first-person vs. third-person voice for support replies.',
    ],
  },
}
