'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Link, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

/**
 * Connectors - Allow AI to reference external data and context.
 * Based on the Shape of AI Tuners pattern.
 */
export interface Connector {
  id: string
  name: string
  type: 'api' | 'database' | 'url' | 'service'
  endpoint?: string
  enabled: boolean
}

export interface ConnectorsProps {
  connectors: Connector[]
  onAdd?: (connector: Omit<Connector, 'id'>) => void
  onRemove?: (id: string) => void
  onToggle?: (id: string, enabled: boolean) => void
  className?: string
}

export function Connectors({
  connectors,
  onAdd,
  onRemove,
  onToggle,
  className,
}: ConnectorsProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newConnector, setNewConnector] = useState({
    name: '',
    type: 'api' as Connector['type'],
    endpoint: '',
  })

  const handleAdd = () => {
    if (!newConnector.name || !onAdd) return

    onAdd({
      ...newConnector,
      enabled: true,
    })
    setNewConnector({ name: '', type: 'api', endpoint: '' })
    setIsAdding(false)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-sm font-semibold'>Connected Data Sources</h3>
          <p className='text-xs text-muted-foreground'>
            Link external data sources for AI to reference
          </p>
        </div>
        {onAdd && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsAdding(!isAdding)}
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Connector
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Add New Connector</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='connector-name'>Name</Label>
              <Input
                id='connector-name'
                placeholder='e.g., Customer Database'
                value={newConnector.name}
                onChange={(e) =>
                  setNewConnector({ ...newConnector, name: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='connector-endpoint'>Endpoint / URL</Label>
              <Input
                id='connector-endpoint'
                placeholder='https://api.example.com/data'
                value={newConnector.endpoint}
                onChange={(e) =>
                  setNewConnector({ ...newConnector, endpoint: e.target.value })
                }
              />
            </div>
            <div className='flex gap-2'>
              <Button onClick={handleAdd} size='sm'>
                Add
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setIsAdding(false)
                  setNewConnector({ name: '', type: 'api', endpoint: '' })
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className='space-y-2'>
        {connectors.length === 0 ? (
          <p className='text-sm text-muted-foreground text-center py-8'>
            No connectors added yet
          </p>
        ) : (
          connectors.map((connector) => (
            <Card key={connector.id}>
              <CardContent className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-3 flex-1'>
                  <Link className='h-5 w-5 text-muted-foreground' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium'>{connector.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {connector.type}{' '}
                      {connector.endpoint && `• ${connector.endpoint}`}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  {onToggle && (
                    <Button
                      variant={connector.enabled ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => onToggle(connector.id, !connector.enabled)}
                    >
                      {connector.enabled ? 'Enabled' : 'Disabled'}
                    </Button>
                  )}
                  {onRemove && (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() => onRemove(connector.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                      <span className='sr-only'>Remove</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
