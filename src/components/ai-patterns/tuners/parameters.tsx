'use client'

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
import { Sliders } from 'lucide-react'

/**
 * Parameters - Include constraints with your prompt for the AI to reference when generating its result.
 * Based on the Shape of AI Tuners pattern.
 */
export interface Parameter {
  id: string
  label: string
  type: 'number' | 'text' | 'range'
  value: number | string
  min?: number
  max?: number
  step?: number
  description?: string
  unit?: string
}

export interface ParametersProps {
  parameters: Parameter[]
  onChange: (id: string, value: number | string) => void
  className?: string
}

export function Parameters({
  parameters,
  onChange,
  className,
}: ParametersProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Sliders className='h-5 w-5' />
          Parameters
        </CardTitle>
        <CardDescription>
          Adjust constraints and settings for prompt generation
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {parameters.map((param) => (
          <div key={param.id} className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor={param.id}>
                {param.label}
                {param.unit && (
                  <span className='text-muted-foreground ml-1'>
                    ({param.unit})
                  </span>
                )}
              </Label>
              {param.type === 'range' && (
                <span className='text-sm text-muted-foreground'>
                  {param.value}
                  {param.unit}
                </span>
              )}
            </div>
            {param.description && (
              <p className='text-xs text-muted-foreground'>
                {param.description}
              </p>
            )}
            {param.type === 'number' || param.type === 'range' ? (
              <Input
                id={param.id}
                type='number'
                value={param.value}
                min={param.min}
                max={param.max}
                step={param.step || 1}
                onChange={(e) =>
                  onChange(param.id, Number.parseFloat(e.target.value) || 0)
                }
                className='w-full'
              />
            ) : (
              <Input
                id={param.id}
                type='text'
                value={param.value}
                onChange={(e) => onChange(param.id, e.target.value)}
                className='w-full'
              />
            )}
            {param.type === 'range' &&
              param.min !== undefined &&
              param.max !== undefined && (
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-muted-foreground'>
                    {param.min}
                  </span>
                  <input
                    type='range'
                    min={param.min}
                    max={param.max}
                    step={param.step || 1}
                    value={param.value}
                    onChange={(e) =>
                      onChange(param.id, Number.parseFloat(e.target.value))
                    }
                    className='flex-1'
                  />
                  <span className='text-xs text-muted-foreground'>
                    {param.max}
                  </span>
                </div>
              )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
