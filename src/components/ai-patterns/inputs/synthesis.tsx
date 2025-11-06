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
import { Layers } from 'lucide-react'
import { useState } from 'react'

/**
 * Synthesis - Distill or reorganize complicated information into simple structure.
 * Based on the Shape of AI Inputs pattern.
 */
export interface SynthesisProps {
  content: string
  onSynthesize?: (synthesizedContent: string) => void
  className?: string
}

export function Synthesis({
  content,
  onSynthesize,
  className,
}: SynthesisProps) {
  const [originalContent, setOriginalContent] = useState(content)
  const [synthesizedContent, setSynthesizedContent] = useState('')
  const [isSynthesizing, setIsSynthesizing] = useState(false)

  const handleSynthesize = () => {
    if (!originalContent.trim() || !onSynthesize) return

    setIsSynthesizing(true)
    setTimeout(() => {
      const synthesized = `Synthesized Structure:\n\n1. Key Point A: [Main idea extracted]\n2. Key Point B: [Secondary concept]\n3. Key Point C: [Supporting information]\n\n[Complex information has been reorganized into a simple, structured format.]`
      setSynthesizedContent(synthesized)
      onSynthesize(synthesized)
      setIsSynthesizing(false)
    }, 1500)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Layers className='h-5 w-5' />
          Synthesis
        </CardTitle>
        <CardDescription>
          Distill or reorganize complicated information into simple structure
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='synthesis-content'>Content</Label>
          <Textarea
            id='synthesis-content'
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder='Enter complex information to synthesize...'
            className='min-h-32'
          />
        </div>

        {onSynthesize && (
          <Button
            onClick={handleSynthesize}
            disabled={!originalContent.trim() || isSynthesizing}
            className='w-full'
          >
            {isSynthesizing ? 'Synthesizing...' : 'Synthesize'}
          </Button>
        )}

        {synthesizedContent && (
          <div className='space-y-2 pt-2 border-t'>
            <Label>Synthesized Content</Label>
            <Textarea
              value={synthesizedContent}
              readOnly
              className='min-h-32 bg-muted'
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
