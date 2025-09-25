'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Briefcase,
  Building,
  Calendar,
  Camera,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react'

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  badge?: {
    text: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

function InfoRow({ icon: Icon, label, value, badge }: InfoRowProps) {
  return (
    <div className='flex gap-4 items-center h-[46px]'>
      <div className='bg-muted flex items-center justify-center p-2 rounded-lg w-9 h-9'>
        <Icon className='w-5 h-5 text-muted-foreground' />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-sm text-muted-foreground'>{label}</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-semibold text-foreground'>{value}</span>
          {badge && (
            <Badge variant={badge.variant} className='text-xs'>
              {badge.text}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  description: string
}

function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-base font-semibold text-foreground'>{title}</h3>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-8'>
        <Card className='max-w-7xl mx-auto'>
          <CardContent className='p-8'>
            {/* Header Section */}
            <div className='flex items-center justify-between mb-8'>
              <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-semibold text-foreground'>
                  User Profile
                </h1>
                <p className='text-sm text-muted-foreground'>
                  Manage your account settings, authentication, and security
                  preferences.
                </p>
              </div>
              <Button className='bg-primary hover:bg-primary/90'>
                Edit profile
              </Button>
            </div>

            {/* Avatar Section */}
            <div className='flex flex-col items-center gap-4 mb-10'>
              <Avatar className='w-24 h-24'>
                <AvatarImage
                  src='https://avatar.iran.liara.run/public/40'
                  alt='Profile picture'
                />
                <AvatarFallback className='text-lg'>AW</AvatarFallback>
              </Avatar>
              <div className='flex flex-col items-center gap-1'>
                <Button variant='outline' size='sm' className='gap-2'>
                  <Camera className='w-4 h-4' />
                  Change photo
                </Button>
                <p className='text-sm text-muted-foreground'>
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className='space-y-6 mb-10'>
              <SectionHeader
                title='Personal information'
                description='View and update your name, contact details, and other personal info. Some fields may be managed by your organization.'
              />

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-6'>
                  <InfoRow icon={User} label='Name' value='Alice Wonder' />
                  <InfoRow
                    icon={Mail}
                    label='Email Address'
                    value='alice.wonder@email.com'
                  />
                  <InfoRow
                    icon={Phone}
                    label='Phone'
                    value='(+639) 01 0002 123'
                  />
                </div>

                <div className='space-y-6'>
                  <InfoRow icon={User} label='Gender' value='Female' />
                  <InfoRow
                    icon={Calendar}
                    label='Date of birth'
                    value='Aug. 16, 2000'
                  />
                  <InfoRow
                    icon={MapPin}
                    label='Address'
                    value='Gotham Heights, 42 Batcave Lane, Gotham City, NY 10001'
                  />
                </div>
              </div>
            </div>

            {/* Job Information Section */}
            <div className='space-y-6 mb-10'>
              <SectionHeader
                title='Job information'
                description='Review your current role and department. These details are set by your organization and cannot be changed manually.'
              />

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-6'>
                  <InfoRow
                    icon={Briefcase}
                    label='Employee ID'
                    value='129402'
                  />
                  <InfoRow
                    icon={Building}
                    label='Employment Status'
                    value=''
                    badge={{
                      text: 'Active',
                      variant: 'default',
                    }}
                  />
                </div>

                <div className='space-y-6'>
                  <InfoRow
                    icon={Briefcase}
                    label='Role'
                    value='Software Engineer'
                  />
                  <InfoRow
                    icon={Building}
                    label='Department'
                    value='Engineering'
                  />
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className='space-y-6'>
              <SectionHeader
                title='Account information'
                description='See when your account was created and your recent login activity. This information is read-only.'
              />

              <div className='space-y-6 max-w-2xl'>
                <InfoRow
                  icon={Calendar}
                  label='Account created'
                  value='Monday, January 15, 2024 at 6:30 PM'
                />
                <InfoRow
                  icon={Clock}
                  label='Last login'
                  value='Monday, July 22, 2024 at 10:20 PM'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
