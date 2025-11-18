export interface GovernorPatternGuidance {
  title: string
  description: string
  designConsiderations: string[]
  relatedPatterns: string[]
  examples: string[]
}

export type GovernorPatternKey =
  | 'action-plan'
  | 'branches'
  | 'citations'
  | 'controls'
  | 'cost-estimates'
  | 'draft-mode'
  | 'memory'
  | 'references'
  | 'sample-response'
  | 'shared-vision'
  | 'stream-of-thought'
  | 'variations'
  | 'verification'

export const governorPatternGuidance: Record<
  GovernorPatternKey,
  GovernorPatternGuidance
> = {
  'action-plan': {
    title: 'Action plan',
    description:
      'Show the steps the AI will take before it executes, so users can approve or adjust the path forward.',
    designConsiderations: [
      'Keep steps scannable with clear status and estimated time where possible.',
      'Provide controls to reorder, remove, or add steps before execution.',
      'Allow exporting or sharing the plan for async review.',
    ],
    relatedPatterns: ['Chained Action', 'Verification', 'Controls'],
    examples: [
      'Preview a multi-step research workflow before the assistant runs it.',
      'Approve or reject a list of automation tasks the agent proposes.',
    ],
  },
  branches: {
    title: 'Branches',
    description:
      'Support branching conversations or explorations while keeping visibility into how each path relates to the original.',
    designConsiderations: [
      'Give each branch context (title, summary, origin) so users can navigate.',
      'Highlight differences between branches to aid decision-making.',
      'Allow merging or archiving branches when they are no longer needed.',
    ],
    relatedPatterns: ['Variations', 'Randomize', 'Saved Styles'],
    examples: [
      'Fork a chat into “formal rewrite” vs. “casual rewrite” branches.',
      'Track parallel explorations for different stakeholder requirements.',
    ],
  },
  citations: {
    title: 'Citations',
    description:
      'Reveal the sources behind AI statements so users can verify accuracy and follow the evidence.',
    designConsiderations: [
      'Link directly to original sources and show snippets for quick validation.',
      'Convey confidence or relevance scores when available.',
      'Support multiple citation formats (inline, popover, list) depending on medium.',
    ],
    relatedPatterns: ['Trust Builders: Watermark', 'References', 'Footprints'],
    examples: [
      'Inline numbered citations that expand to show the supporting text.',
      '“View source” buttons that open the referenced document in a sidebar.',
    ],
  },
  controls: {
    title: 'Controls',
    description:
      'Let people decide how autonomous the AI should be, pause activity, or gate sensitive actions midstream.',
    designConsiderations: [
      'Offer granular toggles (auto-continue, use private data, escalate) with clear descriptions.',
      'Surface current state (paused, active) so teams know who is in control.',
      'Log control changes for auditability.',
    ],
    relatedPatterns: ['Verification', 'Incognito Mode', 'Parameters'],
    examples: [
      'Pause the agent while a human reviews intermediate results.',
      'Disable certain connectors when handling sensitive projects.',
    ],
  },
  'cost-estimates': {
    title: 'Cost estimates',
    description:
      'Project resource usage—tokens, time, compute—before running an AI plan so users can make trade-offs.',
    designConsiderations: [
      'Show line items for each step or model invocation when possible.',
      'Highlight thresholds or budgets to prevent overruns.',
      'Update estimates based on selected options (e.g., model choice).',
    ],
    relatedPatterns: ['Parameters', 'Controls', 'Action Plan'],
    examples: [
      'Display predicted token usage for a batch of automated emails.',
      'Check estimated processing time before generating a large dataset.',
    ],
  },
  'draft-mode': {
    title: 'Draft mode',
    description:
      'Give users a safe space to iterate before publishing or sharing more broadly, emphasizing low-stakes exploration.',
    designConsiderations: [
      'Clearly label draft state and show when content becomes visible to others.',
      'Provide quick actions to publish, discard, or revert to prior versions.',
      'Auto-save frequently to prevent losing exploratory work.',
    ],
    relatedPatterns: ['Sample Response', 'Variations', 'Saved Styles'],
    examples: [
      'Experiment with prompts in a sandbox before committing the final answer.',
      'Invite teammates to comment on drafts before releasing the output.',
    ],
  },
  memory: {
    title: 'Memory',
    description:
      'Let users inspect, approve, or clear what the assistant remembers from the conversation.',
    designConsiderations: [
      'Group memories by type (preferences, facts, recent tasks) for clarity.',
      'Provide one-click removal and confirm before deleting critical context.',
      'Notify users when new memories are added and why.',
    ],
    relatedPatterns: ['Data Ownership', 'Incognito Mode', 'Saved Styles'],
    examples: [
      'Toggle whether the agent remembers voice and tone preferences.',
      'Review what personal details have been stored and clear them if needed.',
    ],
  },
  references: {
    title: 'References',
    description:
      'Manage the external sources the AI is allowed to consult, enabling oversight of influence and provenance.',
    designConsiderations: [
      'Show metadata (owner, freshness, tags) to aid curation.',
      'Allow quick enable/disable or prioritization of key references.',
      'Log which references were used in the latest response.',
    ],
    relatedPatterns: ['Citations', 'Connectors', 'Attachments'],
    examples: [
      'Curate a list of approved knowledge bases the assistant can cite.',
      'Remove outdated resources that should no longer influence answers.',
    ],
  },
  'sample-response': {
    title: 'Sample response',
    description:
      'Offer a dry-run output so users can confirm the assistant understands intent before executing the full task.',
    designConsiderations: [
      'Let users provide feedback inline and optionally re-run the sample.',
      'Clarify how the final output may differ once real data is used.',
      'Track approvals so teams know who green-lit the approach.',
    ],
    relatedPatterns: ['Draft Mode', 'Action Plan', 'Verification'],
    examples: [
      'Preview a sample paragraph to confirm tone and format.',
      'Show a short outline before generating a full-length report.',
    ],
  },
  'shared-vision': {
    title: 'Shared vision',
    description:
      'Surface responsibilities, milestones, and ownership between humans and AI to keep collaboration aligned.',
    designConsiderations: [
      'Represent both human and AI tasks with owners and next actions.',
      'Provide status indicators (not started, in progress, done).',
      'Support exporting or sharing the plan with stakeholders.',
    ],
    relatedPatterns: ['Action Plan', 'Branches', 'Stream of Thought'],
    examples: [
      'Show who is drafting vs. who is reviewing each part of a report.',
      'Track AI-initiated tasks alongside team commitments.',
    ],
  },
  'stream-of-thought': {
    title: 'Stream of thought',
    description:
      'Reveal the assistant’s reasoning process to build transparency, audit decisions, or troubleshoot errors.',
    designConsiderations: [
      'Provide controls to hide reasoning by default for privacy or bias concerns.',
      'Highlight key decision points or model assumptions.',
      'Log reasoning with timestamps for compliance reviews.',
    ],
    relatedPatterns: ['Footprints', 'Citations', 'Controls'],
    examples: [
      'Show the steps an agent took to select a data source before answering.',
      'Reveal why the assistant declined a request due to policy.',
    ],
  },
  variations: {
    title: 'Variations',
    description:
      'Let users compare multiple AI outputs side-by-side to pick or combine the best result.',
    designConsiderations: [
      'Label variations clearly (tone, length, angle) to speed evaluation.',
      'Allow rating, commenting, or merging elements from each variation.',
      'Track which variation was ultimately chosen for audit purposes.',
    ],
    relatedPatterns: ['Branches', 'Randomize', 'Summary'],
    examples: [
      'Compare three tone options for a marketing headline.',
      'Evaluate different synthesis styles for a long-form article.',
    ],
  },
  verification: {
    title: 'Verification',
    description:
      'Require explicit confirmation for critical decisions, providing checklists or evidence before proceeding.',
    designConsiderations: [
      'Identify which steps are mandatory vs. optional before approval.',
      'Capture who approved and when for audit trails.',
      'Provide context and supporting data within the verification view.',
    ],
    relatedPatterns: ['Controls', 'Action Plan', 'Citations'],
    examples: [
      'Checklist for verifying compliance before launching an automated campaign.',
      'Human sign-off required before publishing sensitive content.',
    ],
  },
}
