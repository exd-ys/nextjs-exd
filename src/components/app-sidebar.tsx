'use client'

import {
  ChartPie,
  GearSix,
  Headphones,
  LockKey,
  Money,
  UserCircle,
} from 'phosphor-react'

import * as React from 'react'

import { NavMain } from '@/components/nav-main'
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

import { Card, CardDescription, CardHeader } from '@/components/ui/card'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: ChartPie,
      active: true,
    },
    {
      title: 'Billing & Payments',
      url: '/billing-payments',
      icon: Money,
      active: false,
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: UserCircle,
      active: false,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: GearSix,
      active: false,
    },
    {
      title: 'Admin',
      url: '/admin',
      icon: LockKey,
      active: false,
    },
  ],
  // navClouds: [
  //   {
  //     title: 'Capture',
  //     icon: IconCamera,
  //     isActive: true,
  //     url: '#',
  //     items: [
  //       {
  //         title: 'Active Proposals',
  //         url: '#',
  //       },
  //       {
  //         title: 'Archived',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Proposal',
  //     icon: IconFileDescription,
  //     url: '#',
  //     items: [
  //       {
  //         title: 'Active Proposals',
  //         url: '#',
  //       },
  //       {
  //         title: 'Archived',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Prompts',
  //     icon: IconFileAi,
  //     url: '#',
  //     items: [
  //       {
  //         title: 'Active Proposals',
  //         url: '#',
  //       },
  //       {
  //         title: 'Archived',
  //         url: '#',
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: 'Settings',
  //     url: '#',
  //     icon: IconSettings,
  //   },
  //   {
  //     title: 'Get Help',
  //     url: '#',
  //     icon: IconHelp,
  //   },
  //   {
  //     title: 'Search',
  //     url: '#',
  //     icon: IconSearch,
  //   },
  // ],
  // documents: [
  //   {
  //     name: 'Data Library',
  //     url: '#',
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: 'Reports',
  //     url: '#',
  //     icon: IconReport,
  //   },
  //   {
  //     name: 'Word Assistant',
  //     url: '#',
  //     icon: IconFileWord,
  //   },
  // ],
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
                    {/* <IconInnerShadowTop className='!size-5' /> */}
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
            {/* <div className='flex items-center gap-1'>
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
            </div> */}

            {/* Secondary nav */}
            {/* <div className='flex items-center gap-1'>
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
            </div> */}

            {/* User section */}
            <NavUser user={data.user} />
          </div>
        </div>
      </Sidebar>
    )
  }

  // Default vertical layout for left/right positioning
  return (
    <Sidebar collapsible='offcanvas' className='px-2' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <div className='flex flex-row items-center justify-center w-full'>
                <img
                  src='/images/ys-new-logo.png'
                  alt='logo'
                  className='h-[32px] w-auto'
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='padding-md'>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            // Render icon as React element, no props spread
            icon: item.icon ? () => <item.icon /> : undefined,
          }))}
        />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className='mt-auto' /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <Card className='@container/card shadow-none'>
          <CardHeader>
            <CardDescription>
              <div className='text-sm font-semibold text-[#363636]'>
                Need help?
              </div>
              <span className='hidden @[540px]/card:block'>
                Total for the last 3 months
              </span>
              <span className='@[540px]/card:hidden text-sm text-[#363636]'>
                Get answers or talk to support
              </span>
              <div className='mt-2 flex flex-row justify-center rounded-sm text-[#363636] bg-[#EDF3FF] border border-[#EDF3FF] hover:border-[#383AD8]  hover:text-primary-foreground active:text-primary-foreground min-w-8 duration-200 ease-linear'>
                <div className='text-[#383AD8] font-semibold flex flex-row  items-center gap-2 p-2 text-sm'>
                  {Headphones && <Headphones />}
                  Contact Support
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </SidebarFooter>
    </Sidebar>
  )
}
