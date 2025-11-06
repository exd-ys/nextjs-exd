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
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

/**
 * Madlibs - Repeatedly run generative tasks without compromising on the
 * format or accuracy.
 * Based on the Shape of AI Inputs pattern.
 */
export interface MadlibsTemplate {
  id: string
  template: string
  fields: Array<{ id: string; label: string; placeholder?: string }>
}

export interface MadlibsProps {
  template: MadlibsTemplate
  values: Record<string, string>
  onValueChange: (fieldId: string, value: string) => void
  onGenerate?: (values: Record<string, string>) => void
  className?: string
}

export function Madlibs({
  template,
  values,
  onValueChange,
  onGenerate,
  className,
}: MadlibsProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!onGenerate) return
    setIsGenerating(true)
    setTimeout(() => {
      onGenerate(values)
      setIsGenerating(false)
    }, 1000)
  }

  // Replace placeholders in template with actual values or placeholders
  const renderTemplate = () => {
    let rendered = template.template
    template.fields.forEach((field) => {
      const value = values[field.id] || `[${field.label}]`
      rendered = rendered.replace(`{${field.id}}`, value)
    })
    return rendered
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <RefreshCw className='h-5 w-5' />
          Madlibs
        </CardTitle>
        <CardDescription>
          Repeatedly run generative tasks without compromising format or
          accuracy
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-3'>
          {template.fields.map((field) => (
            <div key={field.id} className='space-y-2'>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                value={values[field.id] || ''}
                onChange={(e) => onValueChange(field.id, e.target.value)}
                placeholder={
                  field.placeholder || `Enter ${field.label.toLowerCase()}...`
                }
              />
            </div>
          ))}
        </div>

        {onGenerate && (
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className='w-full'
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        )}

        <div className='pt-3 border-t'>
          <Label>Preview</Label>
          <div className='mt-2 p-4 bg-muted rounded-lg'>
            <p className='text-sm whitespace-pre-wrap'>{renderTemplate()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
