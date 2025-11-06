'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'

/**
 * Prompt Enhancer - Enhance and improve prompts for better AI responses.
 * Based on the Shape of AI Tuners pattern.
 */
export interface PromptEnhancerProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onEnhance?: (enhancedPrompt: string) => void
  className?: string
}

export function PromptEnhancer({
  prompt,
  onPromptChange,
  onEnhance,
  className,
}: PromptEnhancerProps) {
  const [isEnhancing, setIsEnhancing] = useState(false)

  const handleEnhance = async () => {
    if (!onEnhance) return

    setIsEnhancing(true)
    // Simulate enhancement - in real app, this would call an API
    setTimeout(() => {
      const enhanced = `Enhanced: ${prompt}\n\nPlease provide a detailed, well-structured response with examples and clear explanations.`
      onEnhance(enhanced)
      setIsEnhancing(false)
    }, 1000)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Sparkles className='h-5 w-5' />
          Prompt Enhancer
        </CardTitle>
        <CardDescription>
          Improve your prompt for better AI responses
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Your Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder='Enter your prompt here...'
            className='min-h-24'
          />
        </div>
        {onEnhance && (
          <Button
            onClick={handleEnhance}
            disabled={!prompt.trim() || isEnhancing}
            className='w-full'
          >
            {isEnhancing ? 'Enhancing...' : 'Enhance Prompt'}
          </Button>
        )}
        {prompt && (
          <div className='p-3 bg-muted rounded-lg'>
            <p className='text-xs font-medium mb-1'>
              Word count: {prompt.split(/\s+/).length}
            </p>
            <p className='text-xs text-muted-foreground'>
              Character count: {prompt.length}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
