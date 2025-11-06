'use client'

import {
  Attachments,
  CitationMarks,
  Connectors,
  ExampleGallery,
  Filters,
  FollowUpBar,
  FootprintsButton,
  InitialCTA,
  ModelManagement,
  Modes,
  Nudges,
  Parameters,
  PresetStyles,
  PromptDetails,
  PromptEnhancer,
  Randomize,
  SavedStyles,
  Suggestions,
  Templates,
  VariationCards,
  VoiceAndTone,
} from '@/components/ai-patterns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

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
          <TabsTrigger value='trust-builders'>Trust Builders</TabsTrigger>
          <TabsTrigger value='inputs'>Inputs</TabsTrigger>
          <TabsTrigger value='tuners'>Tuners</TabsTrigger>
          <TabsTrigger value='governors'>Governors</TabsTrigger>
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
                  <CardTitle>Initial CTA</CardTitle>
                  <CardDescription>
                    Large, open-ended input inviting users to start their first
                    interaction
                  </CardDescription>
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
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suggestions</CardTitle>
                  <CardDescription>
                    Solves the blank canvas dilemma with clues for how to prompt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suggestions
                    items={suggestionItems}
                    onPick={handleSuggestionPick}
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
                  <CardTitle>Example Gallery</CardTitle>
                  <CardDescription>
                    Sample generations, prompts, and parameters to educate and
                    inspire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExampleGallery
                    examples={exampleItems}
                    onSelect={(example) => {
                      console.log('Example selected:', example)
                      setAnswer(example.result || example.prompt)
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Templates</CardTitle>
                  <CardDescription>
                    Structured templates that can be filled by the user or
                    pre-filled by the AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Templates templates={templateItems} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nudges</CardTitle>
                  <CardDescription>
                    Alerts users to actions they can take to use AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Nudges nudges={nudgeItems} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow-up</CardTitle>
                  <CardDescription>
                    Get more information when the initial prompt isn't
                    sufficiently clear
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FollowUpBar
                    items={followUpItems}
                    onPick={handleFollowUpPick}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Randomize</CardTitle>
                  <CardDescription>
                    Kickstart the prompting experience with a low bar and fun
                    results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex gap-2'>
                    <Randomize onRandomize={handleRandomize} />
                    <PromptDetails details={promptDetails} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Variations</CardTitle>
                  <CardDescription>
                    Alternative output cards users can select
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VariationCards
                    items={variationItems}
                    onSelect={handleVariationSelect}
                  />
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
                  <CardTitle>AI Response with Citations</CardTitle>
                  <CardDescription>
                    Generated answer with inline citation marks
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-base leading-relaxed'>
                    {answer} <CitationMarks citations={citations} />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Footprints</CardTitle>
                  <CardDescription>
                    View metadata and audit information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FootprintsButton data={footprintsData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='inputs' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Components that handle user input and interaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Input components coming soon...
              </p>
            </CardContent>
          </Card>
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
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>
                    Give the AI a specific reference to anchor its response
                  </CardDescription>
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
                  <CardTitle>Connectors</CardTitle>
                  <CardDescription>
                    Allow AI to reference external data and context
                  </CardDescription>
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
                  <CardTitle>Filters</CardTitle>
                  <CardDescription>
                    Constrain inputs or outputs by source, type, modality, etc.
                  </CardDescription>
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
                  <CardTitle>Model Management</CardTitle>
                  <CardDescription>
                    Let users specify what model to use for their prompts
                  </CardDescription>
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
                  <CardTitle>Modes</CardTitle>
                  <CardDescription>
                    Adjust training, constraints, and persona for specific
                    contexts
                  </CardDescription>
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
                  <CardTitle>Parameters</CardTitle>
                  <CardDescription>
                    Include constraints with your prompt for the AI to reference
                  </CardDescription>
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
                  <CardTitle>Preset Styles</CardTitle>
                  <CardDescription>
                    Default options to change texture, aesthetic, or tone
                  </CardDescription>
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
                  <CardTitle>Prompt Enhancer</CardTitle>
                  <CardDescription>
                    Enhance and improve prompts for better AI responses
                  </CardDescription>
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
                  <CardTitle>Saved Styles</CardTitle>
                  <CardDescription>
                    Define your own style presets for reuse
                  </CardDescription>
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
                  <CardTitle>Voice & Tone</CardTitle>
                  <CardDescription>
                    Ensure outputs match your voice, tone, and preferences
                  </CardDescription>
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

        <TabsContent value='governors' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Governors</CardTitle>
              <CardDescription>
                Human-in-the-loop features to maintain user oversight and agency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Governor components coming soon...
              </p>
            </CardContent>
          </Card>
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
