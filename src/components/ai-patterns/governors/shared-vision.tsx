'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface SharedVisionParticipant {
  id: string
  name: string
  role: string
  avatarUrl?: string
}

export interface SharedVisionMilestone {
  id: string
  title: string
  owner: SharedVisionParticipant
  status: 'not-started' | 'in-progress' | 'done'
  nextAction?: string
}

export interface SharedVisionProps {
  milestones: SharedVisionMilestone[]
  className?: string
}

const statusCopy: Record<SharedVisionMilestone['status'], string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Completed',
}

export function SharedVision({ milestones, className }: SharedVisionProps) {
  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>Shared vision</CardTitle>
        <CardDescription>
          Provide visibility into who’s responsible for what while collaborating
          with the assistant.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className='flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between'
          >
            <div className='flex items-center gap-3'>
              <Avatar>
                {milestone.owner.avatarUrl && (
                  <AvatarImage
                    src={milestone.owner.avatarUrl}
                    alt={milestone.owner.name}
                  />
                )}
                <AvatarFallback>
                  {milestone.owner.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>{milestone.title}</p>
                <p className='text-xs text-muted-foreground'>
                  {milestone.owner.name} · {milestone.owner.role}
                </p>
              </div>
            </div>
            <div className='flex flex-col items-start gap-2 text-sm md:items-end'>
              <Badge variant='secondary'>{statusCopy[milestone.status]}</Badge>
              {milestone.nextAction && (
                <span className='text-muted-foreground'>
                  Next: {milestone.nextAction}
                </span>
              )}
            </div>
          </div>
        ))}
        {milestones.length === 0 && (
          <p className='text-sm text-muted-foreground'>
            Add milestones to align expectations and responsibilities.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
