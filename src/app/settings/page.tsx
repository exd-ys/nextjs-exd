'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Info, Lock, Mail, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'password', label: 'Password' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
]

const notificationTypes = [
  {
    id: 'critical',
    label: 'Critical alerts',
    description: 'Security alerts and system failures.',
    checked: true,
    icons: [Lock, Info],
  },
  {
    id: 'promotional',
    label: 'Promotional',
    description: 'Product updates and announcements.',
    checked: false,
    icons: [],
  },
  {
    id: 'system',
    label: 'System updates',
    description: 'Maintenance and service updates.',
    checked: true,
    icons: [],
  },
]

export default function SettingsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [notificationTypesState, setNotificationTypesState] = useState<
    Record<string, boolean>
  >(
    notificationTypes.reduce(
      (acc, type) => ({ ...acc, [type.id]: type.checked }),
      {} as Record<string, boolean>
    )
  )

  const handleNotificationTypeChange = (typeId: string, checked: boolean) => {
    setNotificationTypesState((prev) => ({ ...prev, [typeId]: checked }))
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <Tabs defaultValue='notifications' className='w-full'>
          <TabsList className='grid w-full grid-cols-4'>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='notifications' className='mt-8'>
            <div className='space-y-8'>
              {/* Header */}
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-3xl font-bold tracking-tight'>
                    Notifications
                  </h1>
                  <p className='text-muted-foreground mt-2'>
                    Configure your notification preferences for each channel.
                  </p>
                </div>
                <Button variant='outline' size='sm'>
                  Reset Default
                </Button>
              </div>

              {/* Email Notifications */}
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='email' className='border rounded-lg'>
                  <AccordionTrigger className='px-6 py-4'>
                    <div className='flex items-center space-x-4'>
                      <Mail className='h-5 w-5 text-muted-foreground' />
                      <div className='flex items-center space-x-3'>
                        <span className='font-medium'>Email</span>
                        <Badge
                          variant='secondary'
                          className='bg-green-100 text-green-800'
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pb-6'>
                    <div className='space-y-6'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-sm text-muted-foreground'>
                            Receive notifications and updates via email.
                          </p>
                        </div>
                        <Switch
                          checked={emailEnabled}
                          onCheckedChange={setEmailEnabled}
                        />
                      </div>

                      {emailEnabled && (
                        <div className='space-y-4'>
                          <div>
                            <label className='text-sm font-medium'>
                              Frequency
                            </label>
                            <Select defaultValue='instant'>
                              <SelectTrigger className='w-48'>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='instant'>Instant</SelectItem>
                                <SelectItem value='daily'>
                                  Daily digest
                                </SelectItem>
                                <SelectItem value='weekly'>
                                  Weekly digest
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className='space-y-4'>
                            <h4 className='font-medium'>Notification types</h4>
                            <p className='text-sm text-muted-foreground'>
                              Choose which types of notifications to receive.
                            </p>
                            <div className='space-y-3'>
                              {notificationTypes.map((type) => (
                                <div
                                  key={type.id}
                                  className='flex items-start space-x-3'
                                >
                                  <Checkbox
                                    id={type.id}
                                    checked={notificationTypesState[type.id]}
                                    onCheckedChange={(checked) =>
                                      handleNotificationTypeChange(
                                        type.id,
                                        checked as boolean
                                      )
                                    }
                                  />
                                  <div className='flex-1 space-y-1'>
                                    <div className='flex items-center space-x-2'>
                                      <label
                                        htmlFor={type.id}
                                        className='text-sm font-medium cursor-pointer'
                                      >
                                        {type.label}
                                      </label>
                                      {type.icons.map((Icon, index) => (
                                        <Icon
                                          key={index}
                                          className='h-4 w-4 text-muted-foreground'
                                        />
                                      ))}
                                    </div>
                                    <p className='text-sm text-muted-foreground'>
                                      {type.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* SMS Notifications */}
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='sms' className='border rounded-lg'>
                  <AccordionTrigger className='px-6 py-4'>
                    <div className='flex items-center space-x-4'>
                      <MessageSquare className='h-5 w-5 text-muted-foreground' />
                      <div className='flex items-center space-x-3'>
                        <span className='font-medium'>SMS</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pb-6'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm text-muted-foreground'>
                          Critical alerts and urgent notifications via text
                          message.
                        </p>
                      </div>
                      <Switch
                        checked={smsEnabled}
                        onCheckedChange={setSmsEnabled}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Push Notifications */}
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='push' className='border rounded-lg'>
                  <AccordionTrigger className='px-6 py-4'>
                    <div className='flex items-center space-x-4'>
                      <Bell className='h-5 w-5 text-muted-foreground' />
                      <div className='flex items-center space-x-3'>
                        <span className='font-medium'>Push</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='px-6 pb-6'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm text-muted-foreground'>
                          Real-time push notifications in your browser.
                        </p>
                      </div>
                      <Switch
                        checked={pushEnabled}
                        onCheckedChange={setPushEnabled}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value='account' className='mt-8'>
            <div className='text-center py-12'>
              <h2 className='text-2xl font-semibold mb-2'>Account Settings</h2>
              <p className='text-muted-foreground'>
                This section is coming soon.
              </p>
            </div>
          </TabsContent>

          <TabsContent value='password' className='mt-8'>
            <div className='text-center py-12'>
              <h2 className='text-2xl font-semibold mb-2'>Password Settings</h2>
              <p className='text-muted-foreground'>
                This section is coming soon.
              </p>
            </div>
          </TabsContent>

          <TabsContent value='appearance' className='mt-8'>
            <div className='text-center py-12'>
              <h2 className='text-2xl font-semibold mb-2'>
                Appearance Settings
              </h2>
              <p className='text-muted-foreground'>
                This section is coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
