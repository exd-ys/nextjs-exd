'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import { GovernorPatternKey, governorPatternGuidance } from './pattern-guidance'

export interface GovernorPatternLearnMoreProps {
  pattern: GovernorPatternKey
  className?: string
  buttonLabel?: string
}

export function GovernorPatternLearnMore({
  pattern,
  className,
  buttonLabel = 'Learn more',
}: GovernorPatternLearnMoreProps) {
  const guidance = governorPatternGuidance[pattern]

  if (!guidance) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn('gap-2', className)}
          aria-label={`Learn more about ${guidance.title}`}
        >
          <Info className='h-4 w-4' aria-hidden='true' />
          {buttonLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-full max-w-md overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>{guidance.title}</SheetTitle>
          <SheetDescription>
            Guidance from the Shape of AI Governors pattern collection.
          </SheetDescription>
        </SheetHeader>
        <div className='space-y-6 px-4'>
          <section className='space-y-2'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
              Description
            </h3>
            <p className='text-sm leading-6 text-muted-foreground'>
              {guidance.description}
            </p>
          </section>
          <section className='space-y-2'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
              Design considerations
            </h3>
            <ul className='space-y-2 text-sm leading-6 text-muted-foreground'>
              {guidance.designConsiderations.map((item, index) => (
                <li key={index} className='flex gap-2'>
                  <span aria-hidden='true'>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className='space-y-2'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
              Related patterns
            </h3>
            <ul className='space-y-1 text-sm leading-6 text-muted-foreground'>
              {guidance.relatedPatterns.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          <section className='space-y-2'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
              Examples
            </h3>
            <ul className='space-y-1 text-sm leading-6 text-muted-foreground'>
              {guidance.examples.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
