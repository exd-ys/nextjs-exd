'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Mic } from 'lucide-react'

/**
 * Voice and Tone - Ensure outputs match your voice, tone, and preferences in a consistent way.
 * Based on the Shape of AI Tuners pattern.
 */
export interface VoiceToneOption {
  id: string
  label: string
  description: string
}

export interface VoiceAndToneProps {
  voiceOptions: VoiceToneOption[]
  toneOptions: VoiceToneOption[]
  selectedVoice?: string
  selectedTone?: string
  customInstructions?: string
  onVoiceChange?: (voiceId: string) => void
  onToneChange?: (toneId: string) => void
  onInstructionsChange?: (instructions: string) => void
  className?: string
}

export function VoiceAndTone({
  voiceOptions,
  toneOptions,
  selectedVoice,
  selectedTone,
  customInstructions = '',
  onVoiceChange,
  onToneChange,
  onInstructionsChange,
  className,
}: VoiceAndToneProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Mic className='h-5 w-5' />
          Voice & Tone
        </CardTitle>
        <CardDescription>
          Configure voice, tone, and preferences for consistent outputs
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label>Voice</Label>
          <Select value={selectedVoice} onValueChange={onVoiceChange}>
            <SelectTrigger>
              <SelectValue placeholder='Select a voice' />
            </SelectTrigger>
            <SelectContent>
              {voiceOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div className='flex flex-col'>
                    <span>{option.label}</span>
                    <span className='text-xs text-muted-foreground'>
                      {option.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Tone</Label>
          <Select value={selectedTone} onValueChange={onToneChange}>
            <SelectTrigger>
              <SelectValue placeholder='Select a tone' />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  <div className='flex flex-col'>
                    <span>{option.label}</span>
                    <span className='text-xs text-muted-foreground'>
                      {option.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {onInstructionsChange && (
          <div className='space-y-2'>
            <Label htmlFor='custom-instructions'>Custom Instructions</Label>
            <Textarea
              id='custom-instructions'
              placeholder='Add specific instructions about your preferred writing style, terminology, or preferences...'
              value={customInstructions}
              onChange={(e) => onInstructionsChange(e.target.value)}
              className='min-h-24'
            />
            <p className='text-xs text-muted-foreground'>
              Provide additional context about your preferred communication
              style
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
