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
import { FileMinus } from 'lucide-react'
import { useState } from 'react'

/**
 * Summary - Have AI distill a topic or resource down to its essence.
 * Based on the Shape of AI Inputs pattern.
 */
export interface SummaryProps {
  content: string
  onSummarize?: (summary: string) => void
  className?: string
}

export function Summary({ content, onSummarize, className }: SummaryProps) {
  const [originalContent, setOriginalContent] = useState(content)
  const [summary, setSummary] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)

  const handleSummarize = () => {
    if (!originalContent.trim() || !onSummarize) return

    setIsSummarizing(true)
    setTimeout(() => {
      const generatedSummary = `Summary: ${originalContent.substring(
        0,
        100
      )}... [This is a condensed version that captures the essential points and key information from the original content.]`
      setSummary(generatedSummary)
      onSummarize(generatedSummary)
      setIsSummarizing(false)
    }, 1500)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <FileMinus className='h-5 w-5' />
          Summary
        </CardTitle>
        <CardDescription>
          Distill a topic or resource down to its essence
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='summary-content'>Content</Label>
          <Textarea
            id='summary-content'
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder='Enter content to summarize...'
            className='min-h-32'
          />
        </div>

        {onSummarize && (
          <Button
            onClick={handleSummarize}
            disabled={!originalContent.trim() || isSummarizing}
            className='w-full'
          >
            {isSummarizing ? 'Summarizing...' : 'Summarize'}
          </Button>
        )}

        {summary && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Summary</Label>
            <Textarea value={summary} readOnly className='min-h-24 bg-muted' />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
