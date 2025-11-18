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
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { PatternLearnMore } from './pattern-learn-more'

/**
 * Templates - Structured templates that can be filled by the user or pre-filled by the AI.
 * Based on the Shape of AI Wayfinders pattern.
 */
export interface TemplateField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'number'
  placeholder?: string
  defaultValue?: string | number
  required?: boolean
}

export interface Template {
  id: string
  title: string
  description?: string
  fields: TemplateField[]
  onSubmit: (values: Record<string, string | number>) => void
}

export interface TemplatesProps {
  templates: Template[]
  onSelect?: (template: Template) => void
  className?: string
  showLearnMore?: boolean
}

export function Templates({
  templates,
  onSelect,
  className,
  showLearnMore = true,
}: TemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  )
  const [formValues, setFormValues] = useState<Record<string, string | number>>(
    {}
  )

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    const initialValues: Record<string, string | number> = {}
    template.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initialValues[field.id] = field.defaultValue
      }
    })
    setFormValues(initialValues)
    onSelect?.(template)
  }

  const handleFieldChange = (fieldId: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTemplate) {
      selectedTemplate.onSubmit(formValues)
    }
  }

  if (selectedTemplate) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <div className='flex flex-wrap items-start justify-between gap-3'>
            <div>
              <CardTitle>{selectedTemplate.title}</CardTitle>
              {selectedTemplate.description && (
                <CardDescription>
                  {selectedTemplate.description}
                </CardDescription>
              )}
            </div>
            <div className='flex items-center gap-2'>
              {showLearnMore && (
                <PatternLearnMore pattern='templates' className='shrink-0' />
              )}
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSelectedTemplate(null)}
              >
                Back
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {selectedTemplate.fields.map((field) => (
              <div key={field.id} className='space-y-2'>
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && (
                    <span className='text-destructive ml-1'>*</span>
                  )}
                </Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={(formValues[field.id] as string) || ''}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    required={field.required}
                  />
                ) : field.type === 'number' ? (
                  <Input
                    id={field.id}
                    type='number'
                    placeholder={field.placeholder}
                    value={formValues[field.id] || ''}
                    onChange={(e) =>
                      handleFieldChange(field.id, Number(e.target.value))
                    }
                    required={field.required}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type='text'
                    placeholder={field.placeholder}
                    value={(formValues[field.id] as string) || ''}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div className='flex gap-2'>
              <Button type='submit' className='flex-1'>
                Submit
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => setSelectedTemplate(null)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='space-y-3'>
      {showLearnMore && (
        <div className='flex justify-end'>
          <PatternLearnMore pattern='templates' />
        </div>
      )}
      <div
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {templates.map((template) => (
          <Card
            key={template.id}
            className='cursor-pointer transition-all hover:shadow-md hover:border-primary'
            onClick={() => handleTemplateSelect(template)}
          >
            <CardHeader>
              <CardTitle className='text-base'>{template.title}</CardTitle>
              {template.description && (
                <CardDescription>{template.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground'>
                {template.fields.length} field
                {template.fields.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
