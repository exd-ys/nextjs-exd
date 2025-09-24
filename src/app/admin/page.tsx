'use client'
import AdminUserTable, {
  AdminUserTableStats,
} from '@/components/admin-user-table'
import { Card, CardContent } from '@/components/ui/card'
import { IconUserCheck, IconUserPlus, IconUsers } from '@tabler/icons-react'
import React from 'react'

export default function AdminPage() {
  const [stats, setStats] = React.useState<AdminUserTableStats>({
    total: 0,
    active: 0,
    newThisMonth: 0,
    activePercent: 0,
    newPercent: 0,
  })
  return (
    <div className='flex flex-1 flex-col p-6'>
      <div className='flex flex-col gap-6'>
        <div
          className='grid grid-cols-1 gap-4 lg:grid-cols-3 w-full md:gap-6'
          data-node-id='256:11410'
        >
          {/* Card 1: Total users */}
          <Card className='flex-1 min-w-[220px]'>
            <CardContent className='flex flex-row items-center justify-between p-6 gap-4'>
              <div className='flex flex-col items-start gap-1 w-full'>
                <div className='flex items-start justify-between w-full gap-2'>
                  <span className='text-muted-foreground text-sm font-medium leading-none'>
                    Total users
                  </span>
                  <div className='bg-muted rounded-lg flex items-center justify-center w-9 h-9'>
                    <IconUsers
                      className='text-muted-foreground'
                      size={20}
                      aria-label='Total users'
                    />
                  </div>
                </div>
                <span className='text-card-foreground text-2xl font-semibold leading-none'>
                  {stats.total}
                </span>
                <span className='text-card-foreground text-sm font-medium leading-relaxed'>
                  {/* Placeholder for growth, you can update this logic as needed */}
                  +2 from last month
                </span>
              </div>
            </CardContent>
          </Card>
          {/* Card 2: Active users */}
          <Card className='flex-1 min-w-[220px]'>
            <CardContent className='flex flex-row items-center justify-between p-6 gap-4'>
              <div className='flex flex-col items-start gap-1 w-full'>
                <div className='flex items-start justify-between w-full gap-2'>
                  <span className='text-muted-foreground text-sm font-medium leading-none'>
                    Active users
                  </span>
                  <div className='bg-accent rounded-lg flex items-center justify-center w-9 h-9'>
                    <IconUserCheck
                      className='text-accent-foreground'
                      size={20}
                      aria-label='Active users'
                    />
                  </div>
                </div>

                <span className='text-card-foreground text-2xl font-semibold leading-none'>
                  {stats.active}
                </span>
                <span className='text-card-foreground text-sm font-medium leading-relaxed'>
                  {stats.total > 0
                    ? `${stats.activePercent}% of total`
                    : '0% of total'}
                </span>
              </div>
            </CardContent>
          </Card>
          {/* Card 3: New this month */}
          <Card className='flex-1 min-w-[220px]'>
            <CardContent className='flex flex-row items-center justify-between p-6 gap-4'>
              <div className='flex flex-col items-start gap-1 w-full'>
                <div className='flex items-start justify-between w-full gap-2'>
                  <span className='text-muted-foreground text-sm font-medium leading-none'>
                    New this month
                  </span>
                  <div className='bg-primary/10 rounded-lg flex items-center justify-center w-9 h-9'>
                    <IconUserPlus
                      className='text-primary'
                      size={20}
                      aria-label='New this month'
                    />
                  </div>
                </div>

                <span className='text-card-foreground text-2xl font-semibold leading-none'>
                  {stats.newThisMonth}
                </span>
                <span className='text-card-foreground text-sm font-medium leading-relaxed'>
                  {stats.total > 0
                    ? `+${stats.newPercent}% from last month`
                    : '+0% from last month'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table Section */}
        <div className='bg-card border border-border rounded-lg shadow-sm'>
          <div className='flex flex-col gap-4 p-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
              <div>
                <h2 className='text-card-foreground text-2xl font-semibold leading-none'>
                  User Management
                </h2>
                <p className='text-muted-foreground text-sm font-medium leading-relaxed'>
                  Manage users, roles, and permissions
                </p>
              </div>
              <button className='bg-primary text-primary-foreground rounded-lg px-4 h-10 font-semibold text-sm hover:bg-primary/90 transition-colors'>
                Create new user
              </button>
            </div>
            <AdminUserTable onStatsChange={setStats} />
          </div>
        </div>
      </div>
    </div>
  )
}
