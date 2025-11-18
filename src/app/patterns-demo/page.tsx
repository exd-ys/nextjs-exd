'use client'

import {
  ActionPlan,
  Attachments,
  AutoFill,
  Branches,
  Caveat,
  ChainedAction,
  CitationMarks,
  Citations,
  Connectors,
  ConsentManager,
  Controls,
  CostEstimates,
  DataOwnership,
  Describe,
  Disclosure,
  DraftMode,
  ExampleGallery,
  Expand,
  Filters,
  FollowUpBar,
  FootprintsButton,
  GovernorPatternLearnMore,
  IncognitoMode,
  InitialCTA,
  InlineAction,
  Inpainting,
  InputPatternLearnMore,
  Madlibs,
  Memory,
  ModelManagement,
  Modes,
  Nudges,
  OpenInput,
  Parameters,
  PatternLearnMore,
  PresetStyles,
  PromptDetails,
  PromptEnhancer,
  Randomize,
  References,
  Regenerate,
  Restructure,
  Restyle,
  SampleResponse,
  SavedStyles,
  SharedVision,
  StreamOfThought,
  Suggestions,
  Summary,
  Synthesis,
  Templates,
  Transform,
  TrustPatternLearnMore,
  TunerPatternLearnMore,
  VariationCards,
  Variations,
  Verification,
  VoiceAndTone,
  Watermark,
} from '@/components/ai-patterns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMemo, useState } from 'react'

export default function PatternsDemoPage() {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null
  )
  const [answer, setAnswer] = useState(
    'Artificial intelligence is transforming how we interact with technology, enabling more intuitive and personalized experiences across various domains.'
  )
  const [attachments, setAttachments] = useState<
    Array<{ id: string; name: string; type: string; size?: number }>
  >([])
  const [connectors, setConnectors] = useState<
    Array<{
      id: string
      name: string
      type: 'api' | 'database' | 'url' | 'service'
      endpoint?: string
      enabled: boolean
    }>
  >([
    {
      id: '1',
      name: 'Customer Database',
      type: 'database',
      endpoint: 'postgres://db.example.com/customers',
      enabled: true,
    },
  ])
  const [filterValues, setFilterValues] = useState<
    Record<string, string | string[]>
  >({})
  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo')
  const [selectedMode, setSelectedMode] = useState('default')
  const [parameters, setParameters] = useState([
    {
      id: 'temperature',
      label: 'Temperature',
      type: 'range' as const,
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      description: 'Controls randomness',
      unit: '',
    },
    {
      id: 'max_tokens',
      label: 'Max Tokens',
      type: 'number' as const,
      value: 500,
      min: 1,
      max: 4000,
      description: 'Maximum response length',
    },
  ])
  const [selectedStyle, setSelectedStyle] = useState<string>()
  const [prompt, setPrompt] = useState('')
  const [savedStyles, setSavedStyles] = useState<
    Array<{
      id: string
      name: string
      description?: string
      settings: Record<string, unknown>
    }>
  >([
    {
      id: '1',
      name: 'Professional',
      description: 'Business formal tone',
      settings: { tone: 'professional' },
    },
  ])
  const [selectedVoice, setSelectedVoice] = useState('neutral')
  const [selectedTone, setSelectedTone] = useState('friendly')
  const [customInstructions, setCustomInstructions] = useState('')

  const actionPlanSteps = [
    {
      id: 'plan-1',
      title: 'Align on objective',
      description: 'Restate the user goal to confirm shared understanding.',
      status: 'ready' as const,
      estimateMinutes: 1,
    },
    {
      id: 'plan-2',
      title: 'Propose outline',
      description: 'Draft a 3-step approach to reach the outcome.',
      status: 'in-progress' as const,
      estimateMinutes: 3,
    },
    {
      id: 'plan-3',
      title: 'Highlight dependencies',
      description: 'Call out any data or approvals required.',
      status: 'pending' as const,
      estimateMinutes: 2,
    },
  ]
  const [approvedPlanSteps, setApprovedPlanSteps] = useState<string[] | null>(
    null
  )

  const governorBranches = useMemo(
    () => [
      {
        id: 'branch-1',
        title: 'Structured summary',
        summary: 'Creates a concise overview with bullet highlights.',
        createdAt: new Date('2025-01-15T10:00:00Z'),
        promptPreview: 'Summarize the AI article focusing on key takeaways.',
        steps: [
          {
            id: 'step-1',
            label: 'Read source',
            output: 'Captured main thesis.',
          },
          {
            id: 'step-2',
            label: 'Extract bullets',
            output: 'Listed 5 bullets.',
          },
          {
            id: 'step-3',
            label: 'Draft summary',
            output: 'Delivered 120-word executive summary.',
          },
        ],
        status: 'active' as const,
      },
      {
        id: 'branch-2',
        title: 'Narrative version',
        summary: 'Generates a story-driven explanation with examples.',
        createdAt: new Date('2025-01-14T16:30:00Z'),
        promptPreview: 'Explain the article using a narrative hook.',
        steps: [
          {
            id: 'step-1',
            label: 'Collect anecdotes',
            output: 'Identified two real-world examples.',
          },
          {
            id: 'step-2',
            label: 'Draft narrative',
            output: 'Wrote a story about a design team adopting AI.',
          },
        ],
        status: 'archived' as const,
      },
    ],
    []
  )
  const [selectedBranchTitle, setSelectedBranchTitle] = useState<string | null>(
    () => governorBranches[0]?.title ?? null
  )

  const [controlSettings, setControlSettings] = useState([
    {
      id: 'auto-continue',
      label: 'Auto-continue actions',
      description: 'Allow the assistant to run follow-up tasks automatically.',
      enabled: true,
    },
    {
      id: 'sensitive',
      label: 'Flag sensitive data',
      description: 'Require confirmation before using confidential inputs.',
      enabled: false,
    },
    {
      id: 'notifications',
      label: 'Send status updates',
      description: 'Notify you when multi-step plans complete.',
      enabled: true,
    },
  ])
  const [assistantPaused, setAssistantPaused] = useState(false)

  const governorCitations = [
    {
      id: 'c1',
      title: 'Designing oversight loops',
      summary:
        'Research on how design teams incorporate review checkpoints into AI workflows.',
      url: 'https://example.com/oversight',
      confidence: 0.92,
    },
    {
      id: 'c2',
      title: 'Responsible AI field guide',
      summary: 'Best practices for human-in-the-loop AI governance.',
      url: 'https://example.com/responsible-ai',
      confidence: 0.87,
    },
    {
      id: 'c3',
      title: 'Stakeholder feedback session notes',
      summary: 'Highlights from the latest product review meeting.',
      confidence: 0.75,
    },
  ]

  const governorEstimates = [
    {
      id: 'estimate-1',
      label: 'Draft plan generation',
      tokens: 820,
      costUsd: 0.0016,
    },
    {
      id: 'estimate-2',
      label: 'Outline review',
      tokens: 410,
      costUsd: 0.0008,
    },
    {
      id: 'estimate-3',
      label: 'Final summary',
      tokens: 950,
      costUsd: 0.0019,
    },
  ]

  const [memoryItems, setMemoryItems] = useState([
    {
      id: 'memory-1',
      title: 'Preferred format',
      description: 'Summaries should include executive bullet points.',
      isStored: true,
    },
    {
      id: 'memory-2',
      title: 'Team context',
      description: 'Working with the research ops team this quarter.',
      isStored: true,
    },
    {
      id: 'memory-3',
      title: 'Exclude details',
      description: 'Avoid referencing unreleased roadmap milestones.',
      isStored: false,
    },
  ])

  const [referenceItems, setReferenceItems] = useState([
    {
      id: 'ref-1',
      title: 'Q1 Strategy Doc',
      description: 'North star outcomes for the AI research program.',
      type: 'document' as const,
      url: 'https://example.com/strategy',
    },
    {
      id: 'ref-2',
      title: 'Research Survey Results',
      description: 'Latest customer insights to cite in summaries.',
      type: 'dataset' as const,
    },
    {
      id: 'ref-3',
      title: 'Design principles',
      description: 'Brand guidelines for tone and narrative style.',
      type: 'note' as const,
    },
  ])

  const [sampleFeedback, setSampleFeedback] = useState<string | null>(null)
  const [draftPublished, setDraftPublished] = useState(false)
  const [isReasoningVisible, setIsReasoningVisible] = useState(false)

  const governorVariations = [
    {
      id: 'variation-1',
      label: 'Executive brief',
      content:
        'AI adoption accelerates decision-making by surfacing insights faster, enabling leaders to align cross-functional teams around shared outcomes.',
    },
    {
      id: 'variation-2',
      label: 'Guided explainer',
      content:
        'Imagine a researcher asking for trend analysis. The assistant reviews sources, highlights top signals, and proposes next best actions while keeping you in control.',
    },
    {
      id: 'variation-3',
      label: 'Data-backed recap',
      content:
        'Across 42 feedback sessions, teams reported a 30% reduction in review loops when using human-in-the-loop oversight patterns.',
    },
  ]
  const [selectedVariationLabel, setSelectedVariationLabel] = useState<
    string | null
  >(null)
  const [variationFeedback, setVariationFeedback] = useState<string | null>(
    null
  )

  const governorVerificationSteps = [
    {
      id: 'verify-1',
      label: 'Confirm data sources',
      description: 'Double-check that references are approved for sharing.',
      required: true,
    },
    {
      id: 'verify-2',
      label: 'Validate tone',
      description: 'Ensure language aligns with brand voice.',
    },
    {
      id: 'verify-3',
      label: 'Check next steps',
      description: 'Verify follow-up actions and owners.',
      required: true,
    },
  ]
  const [verifiedSteps, setVerifiedSteps] = useState<string[]>([])
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'approved'
  >('pending')

  const sharedVisionMilestones = [
    {
      id: 'milestone-1',
      title: 'Collect research artifacts',
      owner: {
        id: 'owner-1',
        name: 'Avery Brooks',
        role: 'Research Ops',
      },
      status: 'in-progress' as const,
      nextAction: 'Upload interview insights by Friday',
    },
    {
      id: 'milestone-2',
      title: 'Synthesize findings',
      owner: {
        id: 'owner-2',
        name: 'Luis Ortega',
        role: 'Design Strategist',
      },
      status: 'not-started' as const,
      nextAction: 'Review assistant draft once action plan is approved',
    },
    {
      id: 'milestone-3',
      title: 'Executive review',
      owner: {
        id: 'owner-3',
        name: 'Priya Desai',
        role: 'Product Lead',
      },
      status: 'done' as const,
      nextAction: 'Share approved recap with leadership team',
    },
  ]

  const reasoningTrace =
    'Analyzed prior summaries, identified key metrics, and cross-referenced approved references before drafting this answer.'

  // Input components state
  const [autoFillFields, setAutoFillFields] = useState<
    Array<{ id: string; label: string; value: string; placeholder?: string }>
  >([
    { id: 'field1', label: 'Name', value: '', placeholder: 'Enter name' },
    { id: 'field2', label: 'Email', value: '', placeholder: 'Enter email' },
    { id: 'field3', label: 'Message', value: '', placeholder: 'Enter message' },
  ])
  const [chainedActions, setChainedActions] = useState([
    { id: '1', label: 'Analyze', prompt: 'Analyze the document' },
    { id: '2', label: 'Summarize', prompt: 'Create a summary' },
  ])
  const [inpaintingAreas, setInpaintingAreas] = useState<
    Array<{ id: string; start: number; end: number; prompt: string }>
  >([])
  const [madlibsValues, setMadlibsValues] = useState<Record<string, string>>({})

  const suggestionItems = [
    { id: '1', label: 'Explain AI basics', hint: 'Beginner' },
    { id: '2', label: 'Compare ML models', hint: 'Advanced' },
    { id: '3', label: 'Show use cases', hint: 'Examples' },
    { id: '4', label: 'Discuss ethics', hint: 'Important' },
  ]

  const exampleItems = [
    {
      id: '1',
      title: 'Creative Writing',
      prompt: 'Write a short story about a robot learning to paint',
      result: 'Once upon a time, in a workshop filled with...',
      parameters: { temperature: 0.8, max_tokens: 500 },
    },
    {
      id: '2',
      title: 'Code Generation',
      prompt: 'Create a React component for a todo list',
      result: 'function TodoList() { ... }',
      parameters: { temperature: 0.3, max_tokens: 1000 },
    },
    {
      id: '3',
      title: 'Data Analysis',
      prompt: 'Analyze sales trends for Q4 2024',
      result: 'Sales increased by 15% compared to...',
      parameters: { temperature: 0.5, max_tokens: 300 },
    },
  ]

  const templateItems = [
    {
      id: '1',
      title: 'Email Template',
      description: 'Professional email composition',
      fields: [
        { id: 'to', label: 'Recipient', type: 'text' as const, required: true },
        {
          id: 'subject',
          label: 'Subject',
          type: 'text' as const,
          required: true,
        },
        {
          id: 'body',
          label: 'Message',
          type: 'textarea' as const,
          required: true,
        },
      ],
      onSubmit: (values: Record<string, string | number>) => {
        console.log('Email template submitted:', values)
        alert('Email template filled! Check console for details.')
      },
    },
    {
      id: '2',
      title: 'Meeting Summary',
      description: 'Structure meeting notes',
      fields: [
        {
          id: 'title',
          label: 'Meeting Title',
          type: 'text' as const,
          required: true,
        },
        {
          id: 'date',
          label: 'Date',
          type: 'text' as const,
          placeholder: 'YYYY-MM-DD',
        },
        { id: 'attendees', label: 'Attendees', type: 'text' as const },
        {
          id: 'notes',
          label: 'Notes',
          type: 'textarea' as const,
          required: true,
        },
      ],
      onSubmit: (values: Record<string, string | number>) => {
        console.log('Meeting summary submitted:', values)
        alert('Meeting summary created! Check console for details.')
      },
    },
  ]

  const nudgeItems = [
    {
      id: '1',
      message:
        'Try asking "Explain quantum computing in simple terms" to get started!',
      action: {
        label: 'Try it',
        onClick: () => {
          setAnswer(
            'Quantum computing uses quantum mechanical phenomena like superposition and entanglement to perform computations that would be infeasible for classical computers.'
          )
        },
      },
      dismissible: true,
      variant: 'info' as const,
    },
    {
      id: '2',
      message:
        'You can use the Randomize button to get inspiration for your next prompt.',
      dismissible: true,
    },
  ]

  const promptDetails = [
    {
      label: 'System Prompt',
      value:
        'You are a helpful AI assistant that explains complex topics clearly.',
      description: 'The base instruction for the AI model',
    },
    {
      label: 'Temperature',
      value: 0.7,
      description: 'Controls randomness (0.0 = deterministic, 1.0 = creative)',
    },
    {
      label: 'Max Tokens',
      value: 500,
      description: 'Maximum length of the generated response',
    },
    {
      label: 'Model',
      value: 'gpt-4-turbo',
      description: 'The AI model being used',
    },
  ]

  const followUpItems = [
    'Make it simpler',
    'Add more examples',
    'Explain the technical details',
    'Show real-world applications',
  ]

  const citations = [
    {
      id: '1',
      title: 'AI Fundamentals Guide',
      snippet:
        'A comprehensive introduction to artificial intelligence concepts and applications.',
      href: 'https://example.com/ai-fundamentals',
    },
    {
      id: '2',
      title: 'Machine Learning Research Paper',
      snippet:
        'Recent advances in neural network architectures and training methodologies.',
      href: 'https://example.com/ml-research',
    },
    {
      id: '3',
      title: 'Industry Best Practices',
      snippet:
        'Guidelines for implementing AI systems in production environments.',
    },
  ]

  const caveatItems = [
    {
      id: 'caveat-1',
      label: 'May include outdated statistics',
      description:
        'Some training data predates 2024; verify numbers before sharing externally.',
    },
    {
      id: 'caveat-2',
      label: 'Limited awareness of internal policies',
      description:
        'The assistant does not automatically apply your organization’s latest compliance rules.',
    },
    {
      id: 'caveat-3',
      label: 'Does not access private repositories',
      description:
        'Provide attachments or connectors for proprietary docs before requesting audits.',
    },
  ]

  const consentRequests = [
    {
      id: 'consent-1',
      label: 'Use customer excerpts',
      description:
        'Allow the assistant to reference anonymized customer quotes.',
      required: true,
      granted: true,
    },
    {
      id: 'consent-2',
      label: 'Share draft with product teams',
      description: 'Let the assistant circulate drafts to subscribers.',
      granted: false,
    },
    {
      id: 'consent-3',
      label: 'Store prompts for tuning',
      description: 'Retain this conversation to improve future responses.',
      granted: false,
    },
  ]
  const [consentSummary, setConsentSummary] = useState<string | null>(null)

  const dataOwnershipCategories = [
    {
      id: 'category-1',
      name: 'Conversation history',
      description: 'Previous prompts and responses stored for context.',
      retained: true,
    },
    {
      id: 'category-2',
      name: 'Uploaded files',
      description: 'Documents you or your teammates attached.',
      retained: false,
    },
    {
      id: 'category-3',
      name: 'Personal preferences',
      description: 'Voice, tone, and formatting instructions saved for reuse.',
      retained: true,
    },
  ]
  const [dataOwnershipNotice, setDataOwnershipNotice] = useState<string | null>(
    null
  )

  const [incognitoEnabled, setIncognitoEnabled] = useState(false)
  const [sessionCleared, setSessionCleared] = useState(false)

  const disclosureMessage =
    'Generated by the Atlas AI assistant. Review and edit before you share with clients.'

  const watermarkPreview = `AI Summary:
- Highlights last week's research sync
- Includes sentiment metrics
- Suggests next steps for prototype testing`

  const variationItems = [
    {
      id: '1',
      title: 'Concise Version',
      text: 'AI transforms technology interactions, enabling intuitive, personalized experiences.',
    },
    {
      id: '2',
      title: 'Detailed Version',
      text: 'Artificial intelligence represents a paradigm shift in computational systems, fundamentally altering how humans interact with technology. By leveraging advanced algorithms and machine learning techniques, AI enables the creation of more intuitive interfaces and highly personalized user experiences that adapt to individual preferences and behaviors across diverse domains including healthcare, education, finance, and entertainment.',
    },
    {
      id: '3',
      title: 'Technical Version',
      text: 'AI systems utilize neural networks, natural language processing, and computer vision to process complex data patterns, enabling adaptive decision-making and predictive analytics that enhance user engagement through context-aware interactions.',
    },
  ]

  const footprintsData = {
    model: 'GPT-4 Turbo',
    sources: [
      'AI Research Database v2.1',
      'Industry Standards Documentation',
      'Academic Publications 2024',
    ],
    safety: {
      level: 'High',
      checks: [
        'Content safety verified',
        'Bias detection passed',
        'Fact-checking completed',
      ],
    },
    generatedAt: new Date().toISOString(),
    traceId: 'trace-abc123xyz789',
    reviewers: [
      {
        name: 'Dr. Sarah Chen',
        role: 'AI Ethics Specialist',
        approvedAt: new Date().toISOString(),
      },
      {
        name: 'John Martinez',
        role: 'Technical Reviewer',
        approvedAt: new Date().toISOString(),
      },
    ],
  }

  const handleSuggestionPick = (item: { id: string; label: string }) => {
    setSelectedSuggestion(item.id)
    console.log('Suggestion selected:', item)
  }

  const handleFollowUpPick = (item: string) => {
    if (item === 'Make it simpler') {
      setAnswer(
        'AI makes technology easier to use by learning what you like and adapting to your needs.'
      )
    } else if (item === 'Add more examples') {
      setAnswer(
        'Artificial intelligence is transforming how we interact with technology, enabling more intuitive and personalized experiences. Examples include: smart assistants that understand natural language, recommendation systems that suggest content you might enjoy, and autonomous vehicles that navigate complex environments.'
      )
    } else if (item === 'Explain the technical details') {
      setAnswer(
        'Artificial intelligence leverages machine learning algorithms, neural networks, and natural language processing to analyze patterns in data. These systems use training data to build models that can make predictions, recognize patterns, and generate responses, enabling more intuitive and personalized user experiences across various domains.'
      )
    } else if (item === 'Show real-world applications') {
      setAnswer(
        'Artificial intelligence is transforming how we interact with technology in real-world applications: healthcare (diagnostic imaging, drug discovery), finance (fraud detection, algorithmic trading), transportation (autonomous vehicles, route optimization), and customer service (chatbots, sentiment analysis), enabling more intuitive and personalized experiences across these domains.'
      )
    }
  }

  const handleVariationSelect = (item: {
    id: string
    title: string
    text: string
  }) => {
    setAnswer(item.text)
    console.log('Variation selected:', item)
  }

  const handleRandomize = () => {
    const randomPrompts = [
      'Explain how neural networks learn',
      'What is the difference between AI and machine learning?',
      'Describe a futuristic AI application',
      'How does natural language processing work?',
    ]
    const randomPrompt =
      randomPrompts[Math.floor(Math.random() * randomPrompts.length)]
    setAnswer(`Random prompt generated: "${randomPrompt}"`)
  }

  return (
    <div className='container mx-auto max-w-5xl space-y-6 p-6'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>AI Patterns Demo</h1>
        <p className='text-muted-foreground'>
          Interactive demonstration of the AI Patterns component library based
          on{' '}
          <a
            href='https://www.shapeof.ai/pattern-types'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline'
          >
            Shape of AI
          </a>
        </p>
      </div>

      <Tabs defaultValue='wayfinders' className='w-full'>
        <TabsList>
          <TabsTrigger value='wayfinders'>Wayfinders</TabsTrigger>
          <TabsTrigger value='inputs'>Inputs</TabsTrigger>
          <TabsTrigger value='tuners'>Tuners</TabsTrigger>
          <TabsTrigger value='governors'>Governors</TabsTrigger>
          <TabsTrigger value='trust-builders'>Trust Builders</TabsTrigger>
          <TabsTrigger value='identifiers'>Identifiers</TabsTrigger>
        </TabsList>

        <TabsContent value='wayfinders' className='mt-6 space-y-6'>
          <div>
            <p className='text-sm text-muted-foreground mb-6'>
              Components that help users construct their first prompt and get
              started
            </p>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Initial CTA</CardTitle>
                      <CardDescription>
                        Large, open-ended input inviting users to start their
                        first interaction
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='initial-cta' />
                  </div>
                </CardHeader>
                <CardContent>
                  <InitialCTA
                    label='Start a conversation'
                    helperText='Ask anything and get AI-powered responses'
                    placeholder='What would you like to know?'
                    onSubmit={(value) => {
                      console.log('Submitted:', value)
                      setAnswer(
                        `You asked: "${value}". Here's a response about that topic...`
                      )
                    }}
                    showLearnMore={false}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Suggestions</CardTitle>
                      <CardDescription>
                        Solves the blank canvas dilemma with clues for how to
                        prompt
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='suggestions' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Suggestions
                    items={suggestionItems}
                    onPick={handleSuggestionPick}
                    showLearnMore={false}
                  />
                  {selectedSuggestion && (
                    <p className='mt-4 text-sm text-muted-foreground'>
                      Selected:{' '}
                      {
                        suggestionItems.find((w) => w.id === selectedSuggestion)
                          ?.label
                      }
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Example Gallery</CardTitle>
                      <CardDescription>
                        Sample generations, prompts, and parameters to educate
                        and inspire
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='example-gallery' />
                  </div>
                </CardHeader>
                <CardContent>
                  <ExampleGallery
                    examples={exampleItems}
                    onSelect={(example) => {
                      console.log('Example selected:', example)
                      setAnswer(example.result || example.prompt)
                    }}
                    showLearnMore={false}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Templates</CardTitle>
                      <CardDescription>
                        Structured templates that can be filled by the user or
                        pre-filled by the AI
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='templates' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Templates templates={templateItems} showLearnMore={false} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Nudges</CardTitle>
                      <CardDescription>
                        Alerts users to actions they can take to use AI
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='nudges' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Nudges nudges={nudgeItems} showLearnMore={false} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Follow-up</CardTitle>
                      <CardDescription>
                        Get more information when the initial prompt isn't
                        sufficiently clear
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='follow-up-bar' />
                  </div>
                </CardHeader>
                <CardContent>
                  <FollowUpBar
                    items={followUpItems}
                    onPick={handleFollowUpPick}
                    showLearnMore={false}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Randomize</CardTitle>
                      <CardDescription>
                        Kickstart the prompting experience with a low bar and
                        fun results
                      </CardDescription>
                    </div>
                    <div className='flex flex-wrap gap-2 justify-end'>
                      <PatternLearnMore pattern='randomize' />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    <Randomize
                      onRandomize={handleRandomize}
                      showLearnMore={false}
                    />
                    <PromptDetails
                      details={promptDetails}
                      showLearnMore={false}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Variations</CardTitle>
                      <CardDescription>
                        Alternative output cards users can select
                      </CardDescription>
                    </div>
                    <PatternLearnMore pattern='variation-cards' />
                  </div>
                </CardHeader>
                <CardContent>
                  <VariationCards
                    items={variationItems}
                    onSelect={handleVariationSelect}
                    showLearnMore={false}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='inputs' className='mt-6 space-y-6'>
          <div>
            <p className='text-sm text-muted-foreground mb-6'>
              Components that handle user input and interaction
            </p>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Open Input</CardTitle>
                      <CardDescription>
                        Open ended prompt inputs for AI conversations and
                        natural language prompting
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='open-input' />
                  </div>
                </CardHeader>
                <CardContent>
                  <OpenInput
                    placeholder='Ask me anything...'
                    onSubmit={(input: string) => {
                      console.log('Submitted:', input)
                      setAnswer(`You asked: "${input}". Here's a response...`)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Auto-fill</CardTitle>
                      <CardDescription>
                        Extend a prompt to multiple fields or inputs at once
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='auto-fill' />
                  </div>
                </CardHeader>
                <CardContent>
                  <AutoFill
                    fields={autoFillFields}
                    onFieldsChange={setAutoFillFields}
                    onAutoFill={(prompt: string) => {
                      console.log('Auto-filling with:', prompt)
                      alert('Fields auto-filled! Check console.')
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Chained Action</CardTitle>
                      <CardDescription>
                        Chain multiple AI actions together in sequence
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='chained-action' />
                  </div>
                </CardHeader>
                <CardContent>
                  <ChainedAction
                    actions={chainedActions}
                    onActionsChange={setChainedActions}
                    onExecute={(
                      actions: Array<{
                        id: string
                        label: string
                        prompt: string
                      }>
                    ) => {
                      console.log('Executing chain:', actions)
                      alert('Chain executed! Check console.')
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Describe</CardTitle>
                      <CardDescription>
                        Decompose content into fundamental tokens and suggested
                        prompts
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='describe' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Describe
                    content='Artificial intelligence is transforming technology.'
                    onDescribe={(content: string) => {
                      console.log('Analyzing:', content)
                      alert('Content analyzed! Check console.')
                    }}
                    suggestedPrompts={[
                      { id: '1', text: 'Explain AI basics', tokens: 3 },
                      {
                        id: '2',
                        text: 'Describe technology transformation',
                        tokens: 4,
                      },
                    ]}
                    onPromptSelect={(prompt: {
                      id: string
                      text: string
                      tokens?: number
                    }) => {
                      console.log('Selected prompt:', prompt)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Expand</CardTitle>
                      <CardDescription>
                        Lengthen content or add depth and details
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='expand' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Expand
                    content='AI is powerful.'
                    onExpand={(expanded: string) => {
                      console.log('Expanded:', expanded)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Inline Action</CardTitle>
                      <CardDescription>
                        Ask or interact with AI contextually based on page
                        content
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='inline-action' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='p-4 border rounded-lg'>
                    <p className='mb-4'>
                      This is some sample content. Select text and use the
                      inline action button.
                    </p>
                    <InlineAction
                      context='This is some sample content. Select text and use the inline action button.'
                      onAction={(query: string, context: string) => {
                        console.log('Inline action:', query, context)
                        alert(`Query: ${query}`)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Inpainting</CardTitle>
                      <CardDescription>
                        Target specific areas to regenerate or remix
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='inpainting' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Inpainting
                    content='This is a sample paragraph with multiple sentences. You can select specific parts to regenerate. Each sentence can be targeted individually for inpainting.'
                    areas={inpaintingAreas}
                    onAreaAdd={(area: {
                      id: string
                      start: number
                      end: number
                      prompt: string
                    }) => {
                      setInpaintingAreas([...inpaintingAreas, area])
                    }}
                    onAreaRemove={(id: string) => {
                      setInpaintingAreas(
                        inpaintingAreas.filter((a) => a.id !== id)
                      )
                    }}
                    onRegenerate={(areaId: string, prompt: string) => {
                      console.log('Regenerating area:', areaId, prompt)
                      alert('Area regenerated!')
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Madlibs</CardTitle>
                      <CardDescription>
                        Repeatedly run generative tasks without compromising
                        format or accuracy
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='madlibs' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Madlibs
                    template={{
                      id: '1',
                      template:
                        'The {noun} is {adjective} and {verb} {adverb}.',
                      fields: [
                        { id: 'noun', label: 'Noun' },
                        { id: 'adjective', label: 'Adjective' },
                        { id: 'verb', label: 'Verb' },
                        { id: 'adverb', label: 'Adverb' },
                      ],
                    }}
                    values={madlibsValues}
                    onValueChange={(fieldId: string, value: string) => {
                      setMadlibsValues({ ...madlibsValues, [fieldId]: value })
                    }}
                    onGenerate={(values: Record<string, string>) => {
                      console.log('Generated with:', values)
                      alert('Content generated! Check console.')
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Regenerate</CardTitle>
                      <CardDescription>
                        Reproduce AI response without additional input
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='regenerate' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>
                      Current response: {answer.substring(0, 100)}...
                    </p>
                    <Regenerate
                      onRegenerate={() => {
                        console.log('Regenerating response...')
                        setAnswer('Regenerated: ' + answer)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Restructure</CardTitle>
                      <CardDescription>
                        Use existing content as the starting point for prompting
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='restructure' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Restructure
                    content='Point A. Point B. Point C.'
                    structureOptions={[
                      {
                        id: 'list',
                        label: 'Bullet List',
                        description: 'Convert to bullet points',
                      },
                      {
                        id: 'paragraph',
                        label: 'Paragraph',
                        description: 'Convert to paragraph format',
                      },
                      {
                        id: 'outline',
                        label: 'Outline',
                        description: 'Convert to structured outline',
                      },
                    ]}
                    onRestructure={(content: string, structureId: string) => {
                      console.log('Restructuring:', content, structureId)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Restyle</CardTitle>
                      <CardDescription>
                        Transfer styles without changing the underlying
                        structure
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='restyle' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Restyle
                    content='This is a sample text that can be restyled.'
                    styleOptions={[
                      {
                        id: 'formal',
                        label: 'Formal',
                        description: 'Professional and formal tone',
                      },
                      {
                        id: 'casual',
                        label: 'Casual',
                        description: 'Relaxed and conversational',
                      },
                      {
                        id: 'academic',
                        label: 'Academic',
                        description: 'Scholarly and precise',
                      },
                    ]}
                    onRestyle={(content: string, styleId: string) => {
                      console.log('Restyling:', content, styleId)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Summary</CardTitle>
                      <CardDescription>
                        Distill a topic or resource down to its essence
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='summary' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Summary
                    content='Artificial intelligence represents a paradigm shift in computational systems. By leveraging advanced algorithms, AI enables the creation of intuitive interfaces and personalized experiences across diverse domains including healthcare, education, and finance.'
                    onSummarize={(summary: string) => {
                      console.log('Summary:', summary)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Synthesis</CardTitle>
                      <CardDescription>
                        Distill or reorganize complicated information into
                        simple structure
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='synthesis' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Synthesis
                    content='Complex information about AI, machine learning, neural networks, and their applications in various industries with technical details and extensive explanations.'
                    onSynthesize={(synthesized: string) => {
                      console.log('Synthesized:', synthesized)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Transform</CardTitle>
                      <CardDescription>
                        Change the modality of content using AI
                      </CardDescription>
                    </div>
                    <InputPatternLearnMore pattern='transform' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Transform
                    content='A description of an image: A beautiful sunset over mountains.'
                    modalityOptions={[
                      {
                        id: 'text-to-image',
                        label: 'Text to Image',
                        from: 'Text',
                        to: 'Image',
                        description: 'Generate image from text description',
                      },
                      {
                        id: 'text-to-code',
                        label: 'Text to Code',
                        from: 'Text',
                        to: 'Code',
                        description: 'Convert description to code',
                      },
                      {
                        id: 'text-to-audio',
                        label: 'Text to Audio',
                        from: 'Text',
                        to: 'Audio',
                        description: 'Convert text to speech',
                      },
                    ]}
                    onTransform={(content: string, modalityId: string) => {
                      console.log('Transforming:', content, modalityId)
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='tuners' className='mt-6 space-y-6'>
          <div>
            <p className='text-sm text-muted-foreground mb-6'>
              Components that allow users to adjust contextual data, token
              weights, and input details to refine the prompt
            </p>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Attachments</CardTitle>
                      <CardDescription>
                        Give the AI a specific reference to anchor its response
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='attachments' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Attachments
                    attachments={attachments}
                    onAdd={(files) => {
                      const newAttachments = files.map((file, idx) => ({
                        id: `att-${Date.now()}-${idx}`,
                        name: file.name,
                        type: file.type || 'unknown',
                        size: file.size,
                      }))
                      setAttachments([...attachments, ...newAttachments])
                    }}
                    onRemove={(id) => {
                      setAttachments(attachments.filter((a) => a.id !== id))
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Connectors</CardTitle>
                      <CardDescription>
                        Allow AI to reference external data and context
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='connectors' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Connectors
                    connectors={connectors}
                    onAdd={(connector) => {
                      setConnectors([
                        ...connectors,
                        { ...connector, id: `conn-${Date.now()}` },
                      ])
                    }}
                    onRemove={(id) => {
                      setConnectors(connectors.filter((c) => c.id !== id))
                    }}
                    onToggle={(id, enabled) => {
                      setConnectors(
                        connectors.map((c) =>
                          c.id === id ? { ...c, enabled } : c
                        )
                      )
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Filters</CardTitle>
                      <CardDescription>
                        Constrain inputs or outputs by source, type, modality,
                        etc.
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='filters' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Filters
                    filterGroups={[
                      {
                        id: 'source',
                        label: 'Source',
                        type: 'select',
                        options: [
                          { id: '1', label: 'Web', value: 'web' },
                          { id: '2', label: 'Database', value: 'database' },
                          { id: '3', label: 'API', value: 'api' },
                        ],
                      },
                      {
                        id: 'type',
                        label: 'Content Type',
                        type: 'multiselect',
                        options: [
                          { id: '1', label: 'Text', value: 'text' },
                          { id: '2', label: 'Image', value: 'image' },
                          { id: '3', label: 'Video', value: 'video' },
                          { id: '4', label: 'Audio', value: 'audio' },
                        ],
                      },
                      {
                        id: 'modality',
                        label: 'Modality',
                        type: 'multiselect',
                        options: [
                          {
                            id: '1',
                            label: 'Text-to-Text',
                            value: 'text-text',
                          },
                          {
                            id: '2',
                            label: 'Text-to-Image',
                            value: 'text-image',
                          },
                          {
                            id: '3',
                            label: 'Image-to-Text',
                            value: 'image-text',
                          },
                        ],
                      },
                    ]}
                    values={filterValues}
                    onChange={(filterId, value) => {
                      setFilterValues({ ...filterValues, [filterId]: value })
                    }}
                    onClear={(filterId) => {
                      if (filterId) {
                        const newValues = { ...filterValues }
                        delete newValues[filterId]
                        setFilterValues(newValues)
                      } else {
                        setFilterValues({})
                      }
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Model Management</CardTitle>
                      <CardDescription>
                        Let users specify what model to use for their prompts
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='model-management' />
                  </div>
                </CardHeader>
                <CardContent>
                  <ModelManagement
                    models={[
                      {
                        id: 'gpt-4-turbo',
                        name: 'GPT-4 Turbo',
                        provider: 'OpenAI',
                        description:
                          'Most capable model with improved instruction following',
                        capabilities: ['Text', 'Code', 'Analysis'],
                        cost: '$0.01 / 1K tokens',
                      },
                      {
                        id: 'gpt-3.5-turbo',
                        name: 'GPT-3.5 Turbo',
                        provider: 'OpenAI',
                        description: 'Fast and cost-effective for most tasks',
                        capabilities: ['Text', 'Code'],
                        cost: '$0.0015 / 1K tokens',
                      },
                      {
                        id: 'claude-3-opus',
                        name: 'Claude 3 Opus',
                        provider: 'Anthropic',
                        description:
                          'Highly capable model for complex reasoning',
                        capabilities: ['Text', 'Analysis', 'Writing'],
                        cost: '$0.015 / 1K tokens',
                      },
                    ]}
                    selectedModel={selectedModel}
                    onSelect={setSelectedModel}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Modes</CardTitle>
                      <CardDescription>
                        Adjust training, constraints, and persona for specific
                        contexts
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='modes' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Modes
                    modes={[
                      {
                        id: 'default',
                        name: 'Default',
                        description: 'Standard AI assistant mode',
                      },
                      {
                        id: 'creative',
                        name: 'Creative',
                        description:
                          'Optimized for creative writing and ideation',
                      },
                      {
                        id: 'analytical',
                        name: 'Analytical',
                        description: 'Focused on data analysis and reasoning',
                      },
                      {
                        id: 'technical',
                        name: 'Technical',
                        description: 'Specialized for technical documentation',
                      },
                    ]}
                    selectedMode={selectedMode}
                    onSelect={setSelectedMode}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Parameters</CardTitle>
                      <CardDescription>
                        Include constraints with your prompt for the AI to
                        reference
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='parameters' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Parameters
                    parameters={parameters}
                    onChange={(id, value) => {
                      setParameters(
                        parameters.map((p) => {
                          if (p.id === id) {
                            // Preserve type based on parameter type
                            const numValue =
                              typeof value === 'number'
                                ? value
                                : Number.parseFloat(String(value)) || 0
                            return { ...p, value: numValue }
                          }
                          return p
                        })
                      )
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Preset Styles</CardTitle>
                      <CardDescription>
                        Default options to change texture, aesthetic, or tone
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='preset-styles' />
                  </div>
                </CardHeader>
                <CardContent>
                  <PresetStyles
                    styles={[
                      {
                        id: 'professional',
                        name: 'Professional',
                        category: 'Business',
                        description: 'Formal and business-appropriate',
                      },
                      {
                        id: 'casual',
                        name: 'Casual',
                        category: 'Conversational',
                        description: 'Relaxed and friendly',
                      },
                      {
                        id: 'creative',
                        name: 'Creative',
                        category: 'Artistic',
                        description: 'Expressive and imaginative',
                      },
                      {
                        id: 'academic',
                        name: 'Academic',
                        category: 'Formal',
                        description: 'Scholarly and precise',
                      },
                      {
                        id: 'technical',
                        name: 'Technical',
                        category: 'Professional',
                        description: 'Precise and detailed',
                      },
                      {
                        id: 'minimalist',
                        name: 'Minimalist',
                        category: 'Design',
                        description: 'Clean and simple',
                      },
                    ]}
                    selectedStyle={selectedStyle}
                    onSelect={setSelectedStyle}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Prompt Enhancer</CardTitle>
                      <CardDescription>
                        Enhance and improve prompts for better AI responses
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='prompt-enhancer' />
                  </div>
                </CardHeader>
                <CardContent>
                  <PromptEnhancer
                    prompt={prompt}
                    onPromptChange={setPrompt}
                    onEnhance={(enhanced) => {
                      setPrompt(enhanced)
                      alert('Prompt enhanced! Check the textarea.')
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Saved Styles</CardTitle>
                      <CardDescription>
                        Define your own style presets for reuse
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='saved-styles' />
                  </div>
                </CardHeader>
                <CardContent>
                  <SavedStyles
                    styles={savedStyles}
                    onSave={(style) => {
                      setSavedStyles([
                        ...savedStyles,
                        { ...style, id: `style-${Date.now()}` },
                      ])
                    }}
                    onDelete={(id) => {
                      setSavedStyles(savedStyles.filter((s) => s.id !== id))
                    }}
                    onSelect={(style) => {
                      console.log('Style selected:', style)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Voice & Tone</CardTitle>
                      <CardDescription>
                        Ensure outputs match your voice, tone, and preferences
                      </CardDescription>
                    </div>
                    <TunerPatternLearnMore pattern='voice-and-tone' />
                  </div>
                </CardHeader>
                <CardContent>
                  <VoiceAndTone
                    voiceOptions={[
                      {
                        id: 'neutral',
                        label: 'Neutral',
                        description: 'Balanced and objective',
                      },
                      {
                        id: 'professional',
                        label: 'Professional',
                        description: 'Formal and authoritative',
                      },
                      {
                        id: 'friendly',
                        label: 'Friendly',
                        description: 'Warm and approachable',
                      },
                      {
                        id: 'expert',
                        label: 'Expert',
                        description: 'Knowledgeable and confident',
                      },
                    ]}
                    toneOptions={[
                      {
                        id: 'friendly',
                        label: 'Friendly',
                        description: 'Warm and approachable',
                      },
                      {
                        id: 'formal',
                        label: 'Formal',
                        description: 'Professional and respectful',
                      },
                      {
                        id: 'casual',
                        label: 'Casual',
                        description: 'Relaxed and conversational',
                      },
                      {
                        id: 'empathetic',
                        label: 'Empathetic',
                        description: 'Understanding and supportive',
                      },
                    ]}
                    selectedVoice={selectedVoice}
                    selectedTone={selectedTone}
                    customInstructions={customInstructions}
                    onVoiceChange={setSelectedVoice}
                    onToneChange={setSelectedTone}
                    onInstructionsChange={setCustomInstructions}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='governors' className='mt-6 space-y-6'>
          <div>
            <p className='text-sm text-muted-foreground mb-6'>
              Human-in-the-loop features that give people clarity and oversight
              while collaborating with AI.
            </p>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Action Plan</CardTitle>
                      <CardDescription>
                        Preview the steps the assistant will take before
                        approving.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='action-plan' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <ActionPlan
                    steps={actionPlanSteps}
                    onApprove={(stepIds) => {
                      setApprovedPlanSteps(stepIds)
                      console.log('Action plan approved:', stepIds)
                    }}
                    onCancel={() => setApprovedPlanSteps(null)}
                  />
                  {approvedPlanSteps && (
                    <p className='text-sm text-muted-foreground'>
                      Approved {approvedPlanSteps.length} steps for execution.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Verification</CardTitle>
                      <CardDescription>
                        Confirm required checkpoints before allowing the
                        assistant to proceed.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='verification' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Verification
                    steps={governorVerificationSteps}
                    onVerify={(steps) => {
                      setVerificationStatus('approved')
                      setVerifiedSteps(steps)
                      console.log('Verification complete:', steps)
                    }}
                  />
                  <p className='text-sm text-muted-foreground'>
                    Status:{' '}
                    <span className='font-medium text-foreground'>
                      {verificationStatus === 'approved'
                        ? 'Approved'
                        : 'Awaiting review'}
                    </span>
                    {verifiedSteps.length > 0 && (
                      <> · {verifiedSteps.length} checks completed</>
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Controls</CardTitle>
                      <CardDescription>
                        Adjust autonomy settings or pause the assistant
                        mid-session.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='controls' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Controls
                    settings={controlSettings}
                    onChange={(updated) => setControlSettings(updated)}
                    onPause={() => setAssistantPaused((prev) => !prev)}
                    isPaused={assistantPaused}
                  />
                  <p className='text-sm text-muted-foreground'>
                    Assistant is currently{' '}
                    <span className='font-medium text-foreground'>
                      {assistantPaused ? 'paused' : 'active'}
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Cost Estimates</CardTitle>
                      <CardDescription>
                        Review token and cost projections before moving forward.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='cost-estimates' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <CostEstimates estimates={governorEstimates} />
                  <p className='text-sm text-muted-foreground'>
                    Estimates help modulate compute usage ahead of time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Sample Response</CardTitle>
                      <CardDescription>
                        Validate the AI&apos;s understanding before it runs the
                        full task.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='sample-response' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <SampleResponse
                    prompt='Create a recap of our weekly research sync.'
                    sample='Here is a concise recap with highlights, key metrics, and agreed next steps.'
                    onConfirm={(feedback) => {
                      setSampleFeedback(
                        feedback.trim().length > 0 ? feedback : 'Approved as-is'
                      )
                      console.log('Sample response feedback:', feedback)
                    }}
                  />
                  {sampleFeedback && (
                    <p className='text-sm text-muted-foreground'>
                      Feedback recorded: {sampleFeedback}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Draft Mode</CardTitle>
                      <CardDescription>
                        Explore in a sandbox before publishing to teammates.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='draft-mode' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <DraftMode
                    initialDraft={answer}
                    onPublish={(finalDraft) => {
                      setAnswer(finalDraft)
                      setDraftPublished(true)
                      console.log('Draft published:', finalDraft)
                    }}
                  />
                  {draftPublished && (
                    <p className='text-sm text-muted-foreground'>
                      Draft published to the shared workspace.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Stream of Thought</CardTitle>
                      <CardDescription>
                        Reveal the model&apos;s reasoning when you need
                        additional transparency.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='stream-of-thought' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <StreamOfThought
                    reasoning={reasoningTrace}
                    answer={answer}
                    onToggleVisibility={(visible) => {
                      setIsReasoningVisible(visible)
                      console.log('Reasoning visibility:', visible)
                    }}
                  />
                  <p className='text-sm text-muted-foreground'>
                    Reasoning is {isReasoningVisible ? 'visible' : 'hidden'} to
                    collaborators.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Citations</CardTitle>
                      <CardDescription>
                        Inspect the sources backing the assistant&apos;s
                        response.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='citations' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Citations
                    response={answer}
                    citations={governorCitations}
                    onOpenSource={(citation) =>
                      console.log('Open citation:', citation)
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Variations</CardTitle>
                      <CardDescription>
                        Compare alternative drafts while preserving the original
                        path.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='variations' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Variations
                    variations={governorVariations}
                    onSelect={(variation) => {
                      setSelectedVariationLabel(variation.label)
                      setVariationFeedback(null)
                      console.log('Variation selected:', variation)
                    }}
                    onFeedback={(variation, feedback) => {
                      setSelectedVariationLabel(variation.label)
                      setVariationFeedback(
                        feedback.trim().length > 0 ? feedback : null
                      )
                      console.log('Variation feedback:', variation, feedback)
                    }}
                  />
                  <p className='text-sm text-muted-foreground'>
                    {selectedVariationLabel ? (
                      <>
                        Selected: {selectedVariationLabel}
                        {variationFeedback && (
                          <> · Feedback: {variationFeedback}</>
                        )}
                      </>
                    ) : (
                      'Select a variation to refine further.'
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Branches</CardTitle>
                      <CardDescription>
                        Track divergent paths and keep visibility into their
                        history.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='branches' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Branches
                    branches={governorBranches}
                    onSelectBranch={(branch) => {
                      setSelectedBranchTitle(branch.title)
                      console.log('Branch selected:', branch)
                    }}
                  />
                  {selectedBranchTitle && (
                    <p className='text-sm text-muted-foreground'>
                      Viewing branch: {selectedBranchTitle}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>References</CardTitle>
                      <CardDescription>
                        Manage external materials that influence the assistant.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='references' />
                  </div>
                </CardHeader>
                <CardContent>
                  <References
                    references={referenceItems}
                    onOpenReference={(reference) =>
                      console.log('Open reference:', reference)
                    }
                    onRemoveReference={(reference) => {
                      setReferenceItems((prev) =>
                        prev.filter((item) => item.id !== reference.id)
                      )
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Memory Controls</CardTitle>
                      <CardDescription>
                        Decide what the assistant keeps or forgets for next
                        time.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='memory' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Memory
                    items={memoryItems}
                    onUpdate={(items) => setMemoryItems(items)}
                  />
                  <p className='text-sm text-muted-foreground'>
                    {memoryItems.filter((item) => item.isStored).length} of{' '}
                    {memoryItems.length} memories stored.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Shared Vision</CardTitle>
                      <CardDescription>
                        Maintain alignment across teammates and the assistant.
                      </CardDescription>
                    </div>
                    <GovernorPatternLearnMore pattern='shared-vision' />
                  </div>
                </CardHeader>
                <CardContent>
                  <SharedVision milestones={sharedVisionMilestones} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='trust-builders' className='mt-6 space-y-6'>
          <div>
            <p className='text-sm text-muted-foreground mb-6'>
              Components that give users confidence that AI results are ethical,
              accurate, and trustworthy
            </p>

            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Caveats</CardTitle>
                      <CardDescription>
                        Surface limitations so users understand risks before
                        acting.
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='caveat' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Caveat caveats={caveatItems} severity='medium' />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Consent Manager</CardTitle>
                      <CardDescription>
                        Collect explicit permission before the assistant shares
                        or stores information.
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='consent-manager' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <ConsentManager
                    items={consentRequests}
                    onSubmit={(items) => {
                      const grantedCount = items.filter(
                        (item) => item.granted
                      ).length
                      setConsentSummary(
                        `${grantedCount} of ${items.length} permissions granted`
                      )
                      console.log('Consent submitted:', items)
                    }}
                    onCancel={() => {
                      setConsentSummary('Consent request canceled.')
                      console.log('Consent canceled')
                    }}
                  />
                  {consentSummary && (
                    <p className='text-sm text-muted-foreground'>
                      {consentSummary}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Data Ownership</CardTitle>
                      <CardDescription>
                        Let people decide what data the assistant may retain.
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='data-ownership' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <DataOwnership
                    categories={dataOwnershipCategories}
                    onToggleCategory={(categoryId, retained) => {
                      const status = retained ? 'retained' : 'forgotten'
                      const category = dataOwnershipCategories.find(
                        (item) => item.id === categoryId
                      )
                      setDataOwnershipNotice(
                        `${category?.name ?? 'Category'} will be ${status}.`
                      )
                    }}
                    onDownload={() => {
                      setDataOwnershipNotice('Preparing data export…')
                      console.log('Download data requested')
                    }}
                    onDelete={() => {
                      setDataOwnershipNotice('Data deletion initiated.')
                      console.log('Delete data requested')
                    }}
                  />
                  {dataOwnershipNotice && (
                    <p className='text-sm text-muted-foreground'>
                      {dataOwnershipNotice}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Disclosure</CardTitle>
                      <CardDescription>
                        Clearly indicate when content is AI-generated.
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='disclosure' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Disclosure message={disclosureMessage} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Incognito Mode</CardTitle>
                      <CardDescription>
                        Offer a privacy-first session that leaves no memory
                        behind.
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='incognito-mode' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <IncognitoMode
                    enabled={incognitoEnabled}
                    onToggle={(enabled) => {
                      setIncognitoEnabled(enabled)
                      if (enabled) {
                        setSessionCleared(false)
                      }
                      console.log('Incognito toggled:', enabled)
                    }}
                    onClearHistory={() => {
                      setSessionCleared(true)
                      console.log('Session history cleared')
                    }}
                  />
                  <p className='text-sm text-muted-foreground'>
                    Incognito is currently{' '}
                    <span className='font-medium text-foreground'>
                      {incognitoEnabled ? 'enabled' : 'disabled'}
                    </span>
                    .
                    {sessionCleared && ' Session history cleared for this run.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Watermark</CardTitle>
                      <CardDescription>
                        Embed an unobtrusive label that automated tools can
                        detect.
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='watermark' />
                  </div>
                </CardHeader>
                <CardContent>
                  <Watermark>
                    <div className='space-y-2 p-4 text-sm'>
                      <h4 className='text-base font-semibold'>
                        Weekly research recap
                      </h4>
                      <p className='whitespace-pre-line text-muted-foreground'>
                        {watermarkPreview}
                      </p>
                    </div>
                  </Watermark>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>AI Response with Citations</CardTitle>
                      <CardDescription>
                        Generated answer with inline citation marks
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='citation-marks' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-base leading-relaxed'>
                    {answer} <CitationMarks citations={citations} />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div>
                      <CardTitle>Footprints</CardTitle>
                      <CardDescription>
                        View metadata and audit information
                      </CardDescription>
                    </div>
                    <TrustPatternLearnMore pattern='footprints' />
                  </div>
                </CardHeader>
                <CardContent>
                  <FootprintsButton data={footprintsData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='identifiers' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Identifiers</CardTitle>
              <CardDescription>
                Distinct qualities of AI that can be modified at the brand or
                model level to stand out
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Identifier components coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
