export interface InputPatternGuidance {
  title: string
  description: string
  designConsiderations: string[]
  relatedPatterns: string[]
  examples: string[]
}

export type InputPatternKey =
  | 'auto-fill'
  | 'chained-action'
  | 'describe'
  | 'expand'
  | 'inline-action'
  | 'inpainting'
  | 'madlibs'
  | 'open-input'
  | 'regenerate'
  | 'restructure'
  | 'restyle'
  | 'summary'
  | 'synthesis'
  | 'transform'

export const inputPatternGuidance: Record<
  InputPatternKey,
  InputPatternGuidance
> = {
  'auto-fill': {
    title: 'Auto-fill',
    description:
      'Extend a single prompt or set of instructions across multiple fields to jump-start multi-part tasks.',
    designConsiderations: [
      'Make the mapping between source prompt and destination fields explicit.',
      'Let users preview or edit values before they are committed.',
      'Provide an easy way to revert to the original content if the auto-fill misses the mark.',
    ],
    relatedPatterns: ['Templates', 'Madlibs', 'Transform'],
    examples: [
      'Fill name, company, and introduction paragraphs based on a single LinkedIn URL.',
      'Populate multiple survey responses using a summarized transcript.',
    ],
  },
  'chained-action': {
    title: 'Chained Action',
    description:
      'Sequence several AI steps so the assistant can complete a multi-stage workflow from one trigger.',
    designConsiderations: [
      'Show the plan up front and allow the user to approve each stage if needed.',
      'Provide feedback when a step fails and offer recovery actions.',
      'Keep track of outputs between steps so users can inspect intermediate results.',
    ],
    relatedPatterns: ['Action Plan', 'Follow-up Bar', 'Synthesis'],
    examples: [
      'Analyze → Summarize → Draft email as a single chained action.',
      'Extract key points and then generate a slide outline automatically.',
    ],
  },
  describe: {
    title: 'Describe',
    description:
      'Help users express intent by decomposing the task into fundamental tokens or prompt ingredients.',
    designConsiderations: [
      'Offer guided questions that capture who, what, and why without overwhelming the user.',
      'Surface reusable prompt snippets or heuristics for future sessions.',
      'Allow quick handoff back to a free-form field once enough context is collected.',
    ],
    relatedPatterns: ['Prompt Details', 'Templates', 'Suggestions'],
    examples: [
      'Break down a video brief into audience, tone, and key message fields.',
      'Highlight missing context when a user writes a short or ambiguous request.',
    ],
  },
  expand: {
    title: 'Expand',
    description:
      'Lengthen existing content by adding detail, examples, or supportive context without changing the core message.',
    designConsiderations: [
      'Clarify whether the expansion should add depth, breadth, or both.',
      'Let users set target length or areas to elaborate.',
      'Show diffs or highlight additions so users can verify changes quickly.',
    ],
    relatedPatterns: ['Restructure', 'Summary', 'Transform'],
    examples: [
      'Take a short executive summary and elaborate into a full narrative.',
      'Add supporting anecdotes to a product launch announcement.',
    ],
  },
  'inline-action': {
    title: 'Inline Action',
    description:
      'Expose contextual AI actions right where the content lives so users can ask questions or request revisions without losing focus.',
    designConsiderations: [
      'Keep the trigger lightweight and clearly connected to the selected content.',
      'Reflect the scope of the request (e.g. paragraph vs. entire document).',
      'Provide quick follow-up actions to iterate on the result.',
    ],
    relatedPatterns: ['Controls', 'Footprints', 'Follow-up Bar'],
    examples: [
      'Inline “Ask AI” popover next to a highlighted paragraph.',
      'Context menu that rewrites, explains, or translates a selected sentence.',
    ],
  },
  inpainting: {
    title: 'Inpainting',
    description:
      'Target specific regions of generated output—text, images, or audio—for selective revision or remixing.',
    designConsiderations: [
      'Give precise tools for selecting the affected span or visual area.',
      'Offer transparent previews before committing the change.',
      'Keep a timeline of edits so users can revert if needed.',
    ],
    relatedPatterns: ['Randomize', 'Variations', 'Stream of Thought'],
    examples: [
      'Highlight part of a draft and request a rewrite in a different tone.',
      'Mask an area of an image to replace the background with a generated alternative.',
    ],
  },
  madlibs: {
    title: 'Madlibs',
    description:
      'Run the same generative task repeatedly while preserving a structured format and high accuracy.',
    designConsiderations: [
      'Ensure placeholders are clearly labeled and validated.',
      'Allow users to preview the full output before finalizing each run.',
      'Make it easy to reuse saved templates or example outputs.',
    ],
    relatedPatterns: ['Templates', 'Auto-fill', 'Synthesis'],
    examples: [
      'Generate multiple product descriptions by filling in product-specific details.',
      'Produce consistent customer support replies by updating key variables.',
    ],
  },
  'open-input': {
    title: 'Open Input',
    description:
      'Invite open-ended prompts that work for conversation or natural language instructions across tasks.',
    designConsiderations: [
      'Provide guardrails for length, tone, or supported actions if necessary.',
      'Surface history or context to remind users what the assistant already knows.',
      'Offer upgrade paths into more structured patterns when the request becomes complex.',
    ],
    relatedPatterns: ['Initial CTA', 'Suggestions', 'Randomize'],
    examples: [
      'Primary chat input field in an assistant workspace.',
      'Voice-to-text capture that feeds directly into an AI conversation.',
    ],
  },
  regenerate: {
    title: 'Regenerate',
    description:
      'Re-run the assistant’s previous response when the user wants another take without changing the prompt.',
    designConsiderations: [
      'Clarify what changes between regenerations (model randomness, new data, etc.).',
      'Allow comparison between attempts and support restoring the previous version.',
      'Track how many regenerations occur to help users understand impact on cost.',
    ],
    relatedPatterns: ['Variations', 'Controls', 'Summary'],
    examples: [
      'Retry a headline until the tone aligns with brand guidelines.',
      'Refresh an answer after new data sources are connected.',
    ],
  },
  restructure: {
    title: 'Restructure',
    description:
      'Use existing content as raw material to reshape into a new outline, order, or hierarchy.',
    designConsiderations: [
      'Let users choose the target structure (bullet list, table, storyboard).',
      'Keep a link back to the original content for verification.',
      'Surface confidence or uncertainty when the assistant reorders ambiguous sections.',
    ],
    relatedPatterns: ['Synthesis', 'Expand', 'Transform'],
    examples: [
      'Convert meeting notes into an action-item checklist.',
      'Resequence paragraphs of a report into a presentation outline.',
    ],
  },
  restyle: {
    title: 'Restyle',
    description:
      'Transfer new stylistic choices onto existing content without altering the underlying message.',
    designConsiderations: [
      'Offer a selection of tone presets or allow free-form style instructions.',
      'Make differences explicit (e.g. side-by-side view) so users can approve the change.',
      'Allow iterative tweaks to dial in the style with minimal friction.',
    ],
    relatedPatterns: ['Transform', 'Variations', 'Controls'],
    examples: [
      'Rewrite copy in an “executive brief” voice.',
      'Convert technical documentation into a playful blog post while keeping facts.',
    ],
  },
  summary: {
    title: 'Summary',
    description:
      'Condense content into its essential points so users can understand faster or share concise outputs.',
    designConsiderations: [
      'Provide toggles for length, format, or emphasis (e.g. bullets vs. paragraph).',
      'Call out sections of the source material that were omitted or deprioritized.',
      'Allow quick follow-ups to drill into a specific part of the summary.',
    ],
    relatedPatterns: ['Expand', 'Synthesis', 'Trust Builders: Citations'],
    examples: [
      'Summarize a long report into a 3-bullet executive brief.',
      'Condense an email thread into key decisions and next steps.',
    ],
  },
  synthesis: {
    title: 'Synthesis',
    description:
      'Reorganize complex information into frameworks or artifacts that reveal insights and relationships.',
    designConsiderations: [
      'Support multiple output formats (table, canvas, diagram) where relevant.',
      'Explain the rationale behind grouping or categorization decisions.',
      'Let users adjust the structure if the assistant’s chosen frames don’t fit their needs.',
    ],
    relatedPatterns: ['Restructure', 'Summary', 'Chained Action'],
    examples: [
      'Turn raw interview notes into themes and opportunity areas.',
      'Synthesize competitor research into a comparison matrix.',
    ],
  },
  transform: {
    title: 'Transform',
    description:
      'Change the modality of content—text to slides, audio to summary, image to code—while preserving meaning.',
    designConsiderations: [
      'Clarify the target format and expectations (length, tone, fidelity).',
      'Highlight areas where nuance might be lost in the new modality.',
      'Allow users to provide reference examples to guide the transformation.',
    ],
    relatedPatterns: ['Restyle', 'Synthesis', 'Randomize'],
    examples: [
      'Convert a blog post into a slide deck outline.',
      'Turn a transcript into a podcast show notes draft.',
    ],
  },
}
