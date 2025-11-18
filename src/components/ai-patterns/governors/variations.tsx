'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface Variation {
  id: string
  label: string
  content: string
}

export interface VariationsProps {
  variations: Variation[]
  onSelect?: (variation: Variation) => void
  onFeedback?: (variation: Variation, feedback: string) => void
  className?: string
}

export function Variations({
  variations,
  onSelect,
  onFeedback,
  className,
}: VariationsProps) {
  const [activeVariationId, setActiveVariationId] = useState(variations[0]?.id)
  const [feedbackById, setFeedbackById] = useState<Record<string, string>>({})

  const activeVariation = useMemo(
    () => variations.find((variation) => variation.id === activeVariationId),
    [variations, activeVariationId]
  )

  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>Variations</CardTitle>
        <CardDescription>
          Trace each iteration back to the original request and choose the best
          path forward.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Tabs
          value={activeVariationId}
          onValueChange={(value) => {
            setActiveVariationId(value)
            const variation = variations.find((item) => item.id === value)
            if (variation) {
              onSelect?.(variation)
            }
          }}
          className='space-y-4'
        >
          <TabsList className='w-full justify-start overflow-x-auto'>
            {variations.map((variation, index) => (
              <TabsTrigger key={variation.id} value={variation.id}>
                Option {index + 1}: {variation.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {variations.map((variation) => (
            <TabsContent key={variation.id} value={variation.id}>
              <div className='rounded-lg border bg-muted/40 p-4 text-sm'>
                {variation.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        {activeVariation && (
          <Textarea
            value={feedbackById[activeVariation.id] ?? ''}
            onChange={(event) =>
              setFeedbackById((prev) => ({
                ...prev,
                [activeVariation.id]: event.target.value,
              }))
            }
            placeholder='Leave feedback to refine this variation.'
            aria-label='Feedback for selected variation'
            className='mt-2'
          />
        )}
      </CardContent>
      <CardFooter className='flex justify-end'>
        {activeVariation && (
          <Button
            onClick={() =>
              onFeedback?.(
                activeVariation,
                feedbackById[activeVariation.id] ?? ''
              )
            }
          >
            Approve variation
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
