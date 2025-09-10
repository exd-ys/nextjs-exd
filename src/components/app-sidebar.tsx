'use client'

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import * as React from 'react'

import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: IconListDetails,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: IconChartBar,
    },
    {
      title: 'Projects',
      url: '#',
      icon: IconFolder,
    },
    {
      title: 'Team',
      url: '#',
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({
  side,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // For top positioning, create a horizontal layout
  if (side === 'top') {
    return (
      <Sidebar collapsible='offcanvas' side={side} {...props}>
        <div className='flex h-full w-full items-center justify-between px-4'>
          {/* Left side - Logo and main nav */}
          <div className='flex items-center gap-6'>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className='data-[slot=sidebar-menu-button]:!p-1.5'
                >
                  <a href='#'>
                    <IconInnerShadowTop className='!size-5' />
                    <span className='text-base font-semibold'>Acme Inc.</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* Main navigation items */}
            <div className='flex items-center gap-1'>
              {data.navMain.map((item) => (
                <SidebarMenu key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className='h-8 px-3'
                    >
                      {item.icon && <item.icon className='h-4 w-4' />}
                      <span className='text-sm'>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </div>
          </div>

          {/* Right side - Documents, Settings, User */}
          <div className='flex items-center gap-4'>
            {/* Documents dropdown */}
            <div className='flex items-center gap-1'>
              {data.documents.map((item) => (
                <SidebarMenu key={item.name}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className='h-8 px-3'>
                      <a href={item.url}>
                        <item.icon className='h-4 w-4' />
                        <span className='text-sm'>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </div>

            {/* Secondary nav */}
            <div className='flex items-center gap-1'>
              {data.navSecondary.map((item) => (
                <SidebarMenu key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className='h-8 px-3'>
                      <a href={item.url}>
                        <item.icon className='h-4 w-4' />
                        <span className='text-sm'>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </div>

            {/* User section */}
            <NavUser user={data.user} />
          </div>
        </div>
      </Sidebar>
    )
  }

  // Default vertical layout for left/right positioning
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <IconInnerShadowTop className='!size-5' />
                <span className='text-base font-semibold'>Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
