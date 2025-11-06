'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link2, Play, Plus } from 'lucide-react'
import { useState } from 'react'

/**
 * Chained Action - Chain multiple AI actions together in sequence.
 * Based on the Shape of AI Inputs pattern.
 */
export interface Action {
  id: string
  label: string
  prompt: string
}

export interface ChainedActionProps {
  actions: Action[]
  onActionsChange?: (actions: Action[]) => void
  onExecute?: (actions: Action[]) => void
  className?: string
}

export function ChainedAction({
  actions,
  onActionsChange,
  onExecute,
  className,
}: ChainedActionProps) {
  const [isExecuting, setIsExecuting] = useState(false)

  const handleAddAction = () => {
    if (!onActionsChange) return
    const newAction: Action = {
      id: `action-${Date.now()}`,
      label: `Action ${actions.length + 1}`,
      prompt: '',
    }
    onActionsChange([...actions, newAction])
  }

  const handleRemoveAction = (id: string) => {
    if (!onActionsChange) return
    onActionsChange(actions.filter((a) => a.id !== id))
  }

  const handleActionChange = (id: string, updates: Partial<Action>) => {
    if (!onActionsChange) return
    onActionsChange(
      actions.map((a) => (a.id === id ? { ...a, ...updates } : a))
    )
  }

  const handleExecute = () => {
    if (!onExecute) return
    setIsExecuting(true)
    // Simulate chained execution
    setTimeout(() => {
      onExecute(actions)
      setIsExecuting(false)
    }, 2000)
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Link2 className='h-5 w-5' />
          Chained Action
        </CardTitle>
        <CardDescription>
          Chain multiple AI actions together in sequence
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-3'>
          {actions.map((action, index) => (
            <div
              key={action.id}
              className='p-3 border rounded-lg space-y-2 bg-muted/30'
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>
                  Step {index + 1}: {action.label}
                </span>
                {actions.length > 1 && onActionsChange && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRemoveAction(action.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className='text-sm text-muted-foreground'>{action.prompt}</p>
            </div>
          ))}
        </div>

        {onActionsChange && (
          <Button
            variant='outline'
            size='sm'
            onClick={handleAddAction}
            className='w-full'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Action
          </Button>
        )}

        {onExecute && actions.length > 0 && (
          <Button
            onClick={handleExecute}
            disabled={isExecuting}
            className='w-full'
          >
            <Play className='h-4 w-4 mr-2' />
            {isExecuting ? 'Executing...' : 'Execute Chain'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
