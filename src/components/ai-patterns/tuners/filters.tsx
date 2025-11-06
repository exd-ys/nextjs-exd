'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Filter, X } from 'lucide-react'

/**
 * Filters - Constrain the inputs or the outputs of the AI by source, type, modality, etc.
 * Based on the Shape of AI Tuners pattern.
 */
export interface FilterOption {
  id: string
  label: string
  value: string
}

export interface FilterGroup {
  id: string
  label: string
  type: 'select' | 'multiselect'
  options: FilterOption[]
}

export interface FiltersProps {
  filterGroups: FilterGroup[]
  values: Record<string, string | string[]>
  onChange: (filterId: string, value: string | string[]) => void
  onClear?: (filterId?: string) => void
  className?: string
}

export function Filters({
  filterGroups,
  values,
  onChange,
  onClear,
  className,
}: FiltersProps) {
  const handleSelectChange = (filterId: string, value: string) => {
    // Treat "all" as clearing the selection
    if (value === '__all__') {
      onChange(filterId, '')
    } else {
      onChange(filterId, value)
    }
  }

  const handleMultiSelectChange = (
    filterId: string,
    optionId: string,
    checked: boolean
  ) => {
    const currentValues = (values[filterId] as string[]) || []
    if (checked) {
      onChange(filterId, [...currentValues, optionId])
    } else {
      onChange(
        filterId,
        currentValues.filter((v) => v !== optionId)
      )
    }
  }

  const getActiveFiltersCount = () => {
    return Object.values(values).filter(
      (v) =>
        (Array.isArray(v) && v.length > 0) ||
        (!Array.isArray(v) && v !== '' && v !== undefined)
    ).length
  }

  const activeCount = getActiveFiltersCount()

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Filter className='h-5 w-5' />
              Filters
            </CardTitle>
            <CardDescription>
              Constrain inputs and outputs by source, type, modality, etc.
            </CardDescription>
          </div>
          {activeCount > 0 && onClear && (
            <Button variant='ghost' size='sm' onClick={() => onClear()}>
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {filterGroups.map((group) => (
          <div key={group.id} className='space-y-2'>
            <Label className='text-sm font-medium'>{group.label}</Label>
            {group.type === 'select' ? (
              <Select
                value={(values[group.id] as string) || '__all__'}
                onValueChange={(value) => handleSelectChange(group.id, value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${group.label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='__all__'>All</SelectItem>
                  {group.options.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className='space-y-2'>
                {group.options.map((option) => {
                  const isChecked =
                    (values[group.id] as string[])?.includes(option.value) ||
                    false
                  return (
                    <div key={option.id} className='flex items-center gap-2'>
                      <Checkbox
                        id={`${group.id}-${option.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange(
                            group.id,
                            option.value,
                            checked as boolean
                          )
                        }
                      />
                      <label
                        htmlFor={`${group.id}-${option.id}`}
                        className='text-sm cursor-pointer flex-1'
                      >
                        {option.label}
                      </label>
                    </div>
                  )
                })}
              </div>
            )}
            {values[group.id] &&
              values[group.id] !== '' &&
              values[group.id] !== '__all__' &&
              onClear && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 text-xs'
                  onClick={() => onClear(group.id)}
                >
                  <X className='h-3 w-3 mr-1' />
                  Clear
                </Button>
              )}
          </div>
        ))}

        {activeCount > 0 && (
          <div className='flex flex-wrap gap-2 pt-2 border-t'>
            {filterGroups.map((group) => {
              const value = values[group.id]
              if (
                !value ||
                value === '__all__' ||
                (Array.isArray(value) && value.length === 0)
              )
                return null

              const displayValues = Array.isArray(value)
                ? group.options
                    .filter((opt) => value.includes(opt.value))
                    .map((opt) => opt.label)
                : [
                    group.options.find((opt) => opt.value === value)?.label ||
                      value,
                  ]

              return (
                <Badge key={group.id} variant='secondary' className='gap-1'>
                  {group.label}: {displayValues.join(', ')}
                </Badge>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
