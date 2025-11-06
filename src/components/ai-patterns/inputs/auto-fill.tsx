'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'

/**
 * AutoFill - Extend a prompt to multiple fields or inputs at once.
 * Based on the Shape of AI Inputs pattern.
 */
export interface AutoFillField {
  id: string
  label: string
  placeholder?: string
  value: string
}

export interface AutoFillProps {
  fields: AutoFillField[]
  onFieldsChange: (fields: AutoFillField[]) => void
  onAutoFill: (prompt: string) => void
  className?: string
}

export function AutoFill({
  fields,
  onFieldsChange,
  onAutoFill,
  className,
}: AutoFillProps) {
  const [prompt, setPrompt] = useState('')
  const [isFilling, setIsFilling] = useState(false)

  const handleFieldChange = (id: string, value: string) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    )
    onFieldsChange(updatedFields)
  }

  const handleAutoFill = () => {
    if (!prompt.trim()) return
    setIsFilling(true)
    // Simulate AI auto-fill - in real app, this would call an API
    setTimeout(() => {
      onAutoFill(prompt)
      setIsFilling(false)
      setPrompt('')
    }, 1000)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Sparkles className='h-5 w-5' />
          Auto-fill
        </CardTitle>
        <CardDescription>
          Extend a prompt to multiple fields or inputs at once
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='autofill-prompt'>Prompt</Label>
          <div className='flex gap-2'>
            <Input
              id='autofill-prompt'
              placeholder='Enter a prompt to auto-fill all fields...'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAutoFill()
              }}
            />
            <Button
              onClick={handleAutoFill}
              disabled={!prompt.trim() || isFilling}
            >
              {isFilling ? 'Filling...' : 'Auto-fill'}
            </Button>
          </div>
        </div>

        <div className='space-y-3 pt-2 border-t'>
          {fields.map((field) => (
            <div key={field.id} className='space-y-2'>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
