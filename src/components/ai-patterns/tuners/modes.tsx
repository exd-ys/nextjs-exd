'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { Settings } from 'lucide-react'

/**
 * Modes - Adjust the underlying training, constraints, and persona to a specific context of use.
 * Based on the Shape of AI Tuners pattern.
 */
export interface Mode {
  id: string
  name: string
  description: string
  icon?: string
}

export interface ModesProps {
  modes: Mode[]
  selectedMode?: string
  onSelect: (modeId: string) => void
  className?: string
}

export function Modes({
  modes,
  selectedMode,
  onSelect,
  className,
}: ModesProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Settings className='h-5 w-5' />
          Mode Selection
        </CardTitle>
        <CardDescription>
          Adjust training, constraints, and persona for specific contexts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMode} onValueChange={onSelect}>
          <div className='space-y-3'>
            {modes.map((mode) => (
              <div
                key={mode.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                  selectedMode === mode.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                )}
              >
                <RadioGroupItem
                  value={mode.id}
                  id={mode.id}
                  className='mt-0.5'
                />
                <Label
                  htmlFor={mode.id}
                  className='flex-1 cursor-pointer space-y-1'
                >
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>{mode.name}</span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {mode.description}
                  </p>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
