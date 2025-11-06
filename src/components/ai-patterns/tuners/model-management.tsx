'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Cpu } from 'lucide-react'

/**
 * Model Management - Let users specify what model to use for their prompts.
 * Based on the Shape of AI Tuners pattern.
 */
export interface Model {
  id: string
  name: string
  provider: string
  description?: string
  capabilities?: string[]
  cost?: string
}

export interface ModelManagementProps {
  models: Model[]
  selectedModel?: string
  onSelect: (modelId: string) => void
  className?: string
}

export function ModelManagement({
  models,
  selectedModel,
  onSelect,
  className,
}: ModelManagementProps) {
  const selected = models.find((m) => m.id === selectedModel)

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Cpu className='h-5 w-5' />
          Model Selection
        </CardTitle>
        <CardDescription>
          Choose the AI model to use for your prompts
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Select value={selectedModel} onValueChange={onSelect}>
          <SelectTrigger>
            <SelectValue placeholder='Select a model' />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className='flex flex-col'>
                  <span>{model.name}</span>
                  <span className='text-xs text-muted-foreground'>
                    {model.provider}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selected && (
          <div className='space-y-2 p-4 bg-muted rounded-lg'>
            <div>
              <p className='text-sm font-medium'>{selected.name}</p>
              <p className='text-xs text-muted-foreground'>
                {selected.provider}
              </p>
            </div>
            {selected.description && (
              <p className='text-sm text-muted-foreground'>
                {selected.description}
              </p>
            )}
            {selected.capabilities && selected.capabilities.length > 0 && (
              <div>
                <p className='text-xs font-medium mb-1'>Capabilities:</p>
                <div className='flex flex-wrap gap-1'>
                  {selected.capabilities.map((cap, index) => (
                    <span
                      key={index}
                      className='text-xs bg-background px-2 py-0.5 rounded'
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selected.cost && (
              <p className='text-xs text-muted-foreground'>
                Cost: {selected.cost}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
