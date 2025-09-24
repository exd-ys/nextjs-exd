'use client'

import {
  CaretDown,
  CaretRight,
  ChartBar,
  ChartLine,
  Database,
  FileText,
  Gauge,
  GearSix,
  Headphones,
  LockKey,
  Money,
  Strategy,
  Target,
  UserCircle,
  Users,
} from 'phosphor-react'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

import { Card, CardDescription, CardHeader } from '@/components/ui/card'

// Type definitions
interface MenuItem {
  title: string
  url?: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
  items?: MenuItem[]
}

// Custom collapsible menu item component
function CollapsibleMenuItem({
  item,
  pathname,
}: {
  item: MenuItem
  pathname: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Check if any submenu item is active and expand accordingly
  React.useEffect(() => {
    if (item.items) {
      const hasActiveSubmenu = item.items.some(
        (subItem) => subItem.url === pathname
      )
      if (hasActiveSubmenu) {
        setIsOpen(true)
      }
    }
  }, [pathname, item.items])

  if (!item.items) {
    // Regular menu item without submenu
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={item.url === pathname}>
          <a href={item.url}>
            {item.icon && <item.icon className='h-4 w-4' />}
            <span>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  // Menu item with submenu
  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => setIsOpen(!isOpen)}>
        {item.icon && <item.icon className='h-4 w-4' />}
        <span>{item.title}</span>
        {isOpen ? (
          <CaretDown className='ml-auto h-4 w-4' />
        ) : (
          <CaretRight className='ml-auto h-4 w-4' />
        )}
      </SidebarMenuButton>
      {isOpen && (
        <SidebarMenuSub>
          {item.items.map((subItem: MenuItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild isActive={subItem.url === pathname}>
                <a href={subItem.url}>
                  {subItem.icon && <subItem.icon className='h-4 w-4' />}
                  <span>{subItem.title}</span>
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      icon: ChartBar,
      active: true,
      items: [
        {
          title: 'Analytics',
          url: '/dashboard',
          icon: ChartBar,
        },
        {
          title: 'Operational',
          url: '/dashboard/operational',
          icon: Gauge,
        },
        {
          title: 'Strategic',
          url: '/dashboard/strategic',
          icon: Strategy,
        },
        {
          title: 'Tactical',
          url: '/dashboard/tactical',
          icon: Target,
        },
      ],
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
  navOther: [
    {
      title: 'Reports',
      url: '/reports',
      icon: FileText,
      active: false,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: ChartLine,
      active: false,
    },
    {
      title: 'Data Sources',
      url: '/data-sources',
      icon: Database,
      active: false,
    },
    {
      title: 'Team Management',
      url: '/team',
      icon: Users,
      active: false,
    },
    {
      title: 'System Config',
      url: '/system-config',
      icon: GearSix,
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
  const pathname = usePathname()
  // For top positioning, create a horizontal layout
  if (side === 'top') {
    return (
      <Sidebar collapsible='offcanvas' side={side} {...props}>
        <div className='flex h-full w-full items-center justify-between px-4'>
          {/* Left side - Logo and main nav */}
          <div className='flex items-center gap-6'>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild size='sm'>
                      <a href='#'>
                        <span className='text-base font-semibold'>
                          Acme Inc.
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Main navigation items */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className='flex-row gap-1'>
                  {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        size='sm'
                        className='h-8 px-3'
                      >
                        {item.icon && <item.icon className='h-4 w-4' />}
                        <span className='text-sm'>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>

          {/* Right side - User section */}
          <div className='flex items-center gap-4'>
            <SidebarGroup>
              <SidebarGroupContent>
                <NavUser user={data.user} />
              </SidebarGroupContent>
            </SidebarGroup>
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
            <SidebarMenuButton asChild size='lg' className='h-12'>
              <div className='flex flex-row items-center justify-center w-full'>
                <img
                  src='/images/ys-new-logo.png'
                  alt='logo'
                  className='h-8 w-auto'
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <CollapsibleMenuItem
                  key={item.title}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Other Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navOther.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <a href={item.url}>
                      {item.icon && <item.icon className='h-4 w-4' />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <Card className='shadow-none border-0 bg-transparent'>
              <CardHeader className='p-4'>
                <CardDescription className='space-y-2'>
                  <div className='text-sm font-semibold text-foreground'>
                    Need help?
                  </div>
                  <span className='hidden sm:block text-sm text-muted-foreground'>
                    Total for the last 3 months
                  </span>
                  <span className='sm:hidden text-sm text-muted-foreground'>
                    Get answers or talk to support
                  </span>
                  <SidebarMenuButton
                    asChild
                    className='w-full justify-center h-auto p-2 text-foreground bg-accent hover:bg-accent/80 hover:text-accent-foreground'
                  >
                    <div className='flex flex-row items-center gap-2'>
                      {Headphones && <Headphones className='h-4 w-4' />}
                      <span className='text-sm font-semibold'>
                        Contact Support
                      </span>
                    </div>
                  </SidebarMenuButton>
                </CardDescription>
              </CardHeader>
            </Card>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
