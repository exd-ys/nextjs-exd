'use client'

import { Badge } from '@/components/ui/badge'
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
import { FileText } from 'lucide-react'
import { useState } from 'react'

/**
 * Describe - Decomposes content into its fundamental tokens and suggested prompts.
 * Based on the Shape of AI Inputs pattern.
 */
export interface SuggestedPrompt {
  id: string
  text: string
  tokens?: number
}

export interface DescribeProps {
  content?: string
  onDescribe?: (content: string) => void
  suggestedPrompts?: SuggestedPrompt[]
  onPromptSelect?: (prompt: SuggestedPrompt) => void
  className?: string
}

export function Describe({
  content = '',
  onDescribe,
  suggestedPrompts = [],
  onPromptSelect,
  className,
}: DescribeProps) {
  const [inputContent, setInputContent] = useState(content)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDescribe = () => {
    if (!inputContent.trim() || !onDescribe) return
    setIsAnalyzing(true)
    setTimeout(() => {
      onDescribe(inputContent)
      setIsAnalyzing(false)
    }, 1000)
  }

  const tokenCount = inputContent.split(/\s+/).length

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <FileText className='h-5 w-5' />
          Describe
        </CardTitle>
        <CardDescription>
          Decompose content into fundamental tokens and suggested prompts
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='describe-content'>Content</Label>
          <Textarea
            id='describe-content'
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder='Enter content to analyze...'
            className='min-h-32'
          />
          <div className='flex items-center justify-between'>
            <p className='text-xs text-muted-foreground'>
              Tokens: {tokenCount}
            </p>
            {onDescribe && (
              <Button
                onClick={handleDescribe}
                disabled={!inputContent.trim() || isAnalyzing}
                size='sm'
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            )}
          </div>
        </div>

        {suggestedPrompts.length > 0 && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Suggested Prompts</Label>
            <div className='space-y-2'>
              {suggestedPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className='p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors'
                  onClick={() => onPromptSelect?.(prompt)}
                >
                  <div className='flex items-center justify-between mb-1'>
                    <p className='text-sm'>{prompt.text}</p>
                    {prompt.tokens && (
                      <Badge variant='secondary' className='text-xs'>
                        {prompt.tokens} tokens
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
