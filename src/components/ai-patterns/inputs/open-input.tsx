'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

/**
 * Open Input - Open ended prompt inputs that can be used in AI conversations
 * and other natural language prompting.
 * Based on the Shape of AI Inputs pattern.
 */
export interface OpenInputProps {
  placeholder?: string
  onSubmit: (input: string) => void
  className?: string
  label?: string
  maxLength?: number
}

export function OpenInput({
  placeholder = 'Type your prompt here...',
  onSubmit,
  className,
  label = 'Prompt',
  maxLength,
}: OpenInputProps) {
  const [input, setInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(input)
      setInput('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const remainingChars = maxLength ? maxLength - input.length : undefined

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MessageCircle className='h-5 w-5' />
          Open Input
        </CardTitle>
        <CardDescription>
          Open ended prompt inputs for AI conversations and natural language
          prompting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='open-input'>{label}</Label>
            <Textarea
              id='open-input'
              value={input}
              onChange={(e) => {
                const value = e.target.value
                if (!maxLength || value.length <= maxLength) {
                  setInput(value)
                }
              }}
              placeholder={placeholder}
              className='min-h-32 resize-none'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit(e)
                }
              }}
            />
            {maxLength && (
              <p className='text-xs text-muted-foreground text-right'>
                {remainingChars} characters remaining
              </p>
            )}
          </div>
          <Button
            type='submit'
            disabled={!input.trim() || isSubmitting}
            className='w-full'
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <p className='text-xs text-muted-foreground text-center'>
            Press Cmd/Ctrl + Enter to submit
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
