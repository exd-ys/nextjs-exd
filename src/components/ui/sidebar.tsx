'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

// Constants for sidebar configuration
const SIDEBAR_COOKIE_NAME = 'sidebar_state' // Cookie name to persist sidebar state
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // Cookie expiration: 7 days
const SIDEBAR_WIDTH = '16rem' // Default sidebar width (256px)
const SIDEBAR_WIDTH_MOBILE = '18rem' // Mobile sidebar width (288px)
const SIDEBAR_WIDTH_ICON = '3rem' // Collapsed sidebar width (48px)
const SIDEBAR_KEYBOARD_SHORTCUT = 'b' // Keyboard shortcut to toggle sidebar

// Type definition for sidebar context properties
type SidebarContextProps = {
  state: 'expanded' | 'collapsed' // Current sidebar state
  open: boolean // Whether sidebar is open (desktop)
  setOpen: (open: boolean) => void // Function to set open state
  openMobile: boolean // Whether mobile sidebar is open
  setOpenMobile: (open: boolean) => void // Function to set mobile open state
  isMobile: boolean // Whether current viewport is mobile
  toggleSidebar: () => void // Function to toggle sidebar state
}

// React context for sharing sidebar state across components
const SidebarContext = React.createContext<SidebarContextProps | null>(null)

/**
 * Custom hook to access sidebar context
 * @returns SidebarContextProps - The sidebar context with state and control functions
 * @throws Error if used outside of SidebarProvider
 */
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

/**
 * SidebarProvider - Context provider that manages sidebar state and provides it to child components
 *
 * Features:
 * - Manages both desktop and mobile sidebar states
 * - Supports controlled and uncontrolled modes
 * - Persists sidebar state in cookies
 * - Provides keyboard shortcut (Cmd/Ctrl + B) to toggle sidebar
 * - Sets CSS custom properties for sidebar dimensions
 *
 * @param defaultOpen - Initial open state (default: true)
 * @param open - Controlled open state (overrides defaultOpen)
 * @param onOpenChange - Callback when open state changes
 * @param className - Additional CSS classes
 * @param style - Inline styles (can override CSS custom properties)
 * @param children - Child components that can access sidebar context
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // Internal state management with support for controlled/uncontrolled modes
  // openProp takes precedence over internal state when provided
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  // Unified setOpen function that handles both controlled and uncontrolled modes
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value

      // If controlled, call external handler; otherwise update internal state
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // Persist sidebar state in cookie for user preference
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Toggle function that switches between mobile and desktop behavior
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Keyboard shortcut handler (Cmd/Ctrl + B)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  // Convert boolean state to string for CSS data attributes
  const state = open ? 'expanded' : 'collapsed'

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot='sidebar-wrapper'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

/**
 * Sidebar - Main sidebar component that renders differently based on device and configuration
 *
 * Features:
 * - Supports left, right, and top positioning
 * - Three variants: sidebar (default), floating, inset
 * - Three collapsible modes: offcanvas, icon, none
 * - Responsive design with mobile sheet overlay
 * - CSS custom properties for dynamic sizing
 *
 * @param side - Position of sidebar: 'left' | 'right' | 'top' (default: 'left')
 * @param variant - Visual style: 'sidebar' | 'floating' | 'inset' (default: 'sidebar')
 * @param collapsible - Collapse behavior: 'offcanvas' | 'icon' | 'none' (default: 'offcanvas')
 * @param className - Additional CSS classes
 * @param children - Sidebar content components
 */
function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right' | 'top'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  // Non-collapsible sidebar - always visible with fixed width
  if (collapsible === 'none') {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  // Mobile sidebar - renders as a sheet overlay
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className='bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  // Top positioning - renders as horizontal bar at top of screen
  if (side === 'top') {
    return (
      <div
        className='group peer text-sidebar-foreground hidden md:block'
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
        data-slot='sidebar'
      >
        {/* Gap element that reserves space for the top sidebar */}
        <div
          data-slot='sidebar-gap'
          className={cn(
            'relative h-16 bg-transparent transition-[height] duration-200 ease-linear',
            'group-data-[collapsible=offcanvas]:h-0', // Hidden when collapsed
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:h-12' // Icon mode height
              : 'group-data-[collapsible=icon]:h-12'
          )}
        />
        {/* Main sidebar container for top positioning */}
        <div
          data-slot='sidebar-container'
          className={cn(
            'fixed inset-x-0 top-0 z-10 hidden h-16 w-full transition-[height] duration-200 ease-linear md:flex',
            'group-data-[collapsible=offcanvas]:h-0', // Hidden when collapsed
            // Adjust padding and styling based on variant
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:h-12'
              : 'group-data-[collapsible=icon]:h-12 border-b',
            className
          )}
          {...props}
        >
          {/* Inner sidebar with horizontal layout */}
          <div
            data-sidebar='sidebar'
            data-slot='sidebar-inner'
            className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-row items-center group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'
          >
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Default desktop sidebar (left/right positioning)
  return (
    <div
      className='group peer text-sidebar-foreground hidden md:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      {/* Main sidebar container */}
      <div
        data-slot='sidebar-container'
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex',
          // Position based on side prop
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust padding and borders based on variant
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-12'
            : 'group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        style={{
          width: 'var(--sidebar-width)',
        }}
        {...props}
      >
        {/* Inner sidebar with vertical layout */}
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'
        >
          {children}
        </div>
      </div>
      {/* Gap element that reserves space for the sidebar */}
      <div
        data-slot='sidebar-gap'
        className={cn(
          'relative bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0', // Hidden when collapsed
          // For left sidebar, create left gap
          'group-data-[side=left]:w-64',
          // For right sidebar, create right gap
          'group-data-[side=right]:w-64 group-data-[side=right]:ml-auto',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-12' // Icon mode width
            : 'group-data-[collapsible=icon]:w-12'
        )}
        style={{
          width:
            state === 'collapsed' && collapsible === 'offcanvas'
              ? '0'
              : 'var(--sidebar-width)',
          marginLeft: side === 'right' ? 'auto' : undefined,
        }}
      />
    </div>
  )
}

/**
 * SidebarTrigger - Button component that toggles the sidebar state
 *
 * Features:
 * - Ghost button variant with icon size
 * - Calls toggleSidebar function on click
 * - Supports custom onClick handler (called before toggle)
 * - Accessible with screen reader text
 * - Uses PanelLeftIcon from Lucide React
 *
 * @param className - Additional CSS classes
 * @param onClick - Custom click handler (called before toggle)
 * @param props - Additional button props
 */
function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event) // Call custom handler first
        toggleSidebar() // Then toggle sidebar
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  )
}

/**
 * SidebarRail - Invisible clickable area for toggling sidebar
 *
 * Features:
 * - Invisible rail that appears on hover
 * - Positioned at the edge of the sidebar
 * - Changes cursor based on sidebar position and state
 * - Only visible on larger screens (sm:flex)
 * - Provides visual feedback on hover
 *
 * @param className - Additional CSS classes
 * @param props - Additional button props
 */
function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar='rail'
      data-slot='sidebar-rail'
      aria-label='Toggle Sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      title='Toggle Sidebar'
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarInset - Main content area that adapts to sidebar position and state
 *
 * Features:
 * - Automatically adjusts margins based on sidebar position (left/right/top)
 * - Responds to sidebar collapsed state
 * - Uses peer selectors to detect sidebar state
 * - Provides proper spacing for all sidebar variants
 *
 * @param className - Additional CSS classes
 * @param props - Additional main element props
 */
function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot='sidebar-inset'
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        // Handle top positioning - add top margin when sidebar is at top
        'peer-data-[side=top]:mt-16 peer-data-[side=top]:peer-data-[state=collapsed]:mt-12',
        // Handle left positioning - add left margin when sidebar is on the left
        'peer-data-[side=left]:ml-0 peer-data-[side=left]:peer-data-[state=collapsed]:ml-0 peer-data-[side=left]:peer-data-[collapsible=offcanvas]:ml-0',
        // Handle right positioning - add right margin when sidebar is on the right
        'peer-data-[side=right]:mr-64 peer-data-[side=right]:peer-data-[state=collapsed]:mr-12 peer-data-[side=right]:peer-data-[collapsible=offcanvas]:mr-0',
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarInput - Input component styled for sidebar use
 *
 * Features:
 * - Consistent height and styling
 * - Removes default shadow
 * - Uses background color from theme
 *
 * @param className - Additional CSS classes
 * @param props - Additional input props
 */
function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot='sidebar-input'
      data-sidebar='input'
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  )
}

/**
 * SidebarHeader - Header section of the sidebar
 *
 * Features:
 * - Flex column layout with gap
 * - Consistent padding
 * - Used for logo, title, or header content
 *
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

/**
 * SidebarFooter - Footer section of the sidebar
 *
 * Features:
 * - Flex column layout with gap
 * - Consistent padding
 * - Used for user info, settings, or footer content
 *
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-footer'
      data-sidebar='footer'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

/**
 * SidebarSeparator - Visual separator line for sidebar sections
 *
 * Features:
 * - Uses theme border color
 * - Horizontal margin for proper spacing
 * - Auto width to fit container
 *
 * @param className - Additional CSS classes
 * @param props - Additional separator props
 */
function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot='sidebar-separator'
      data-sidebar='separator'
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  )
}

/**
 * SidebarContent - Main content area of the sidebar
 *
 * Features:
 * - Scrollable content area
 * - Hides overflow when in icon mode
 * - Flexible layout that takes remaining space
 *
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarGroup - Container for grouping related sidebar items
 *
 * Features:
 * - Relative positioning for absolute children
 * - Full width with minimum width constraint
 * - Consistent padding
 * - Used to group related menu items
 *
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

/**
 * SidebarGroupLabel - Label for sidebar groups
 *
 * Features:
 * - Supports asChild prop for custom components
 * - Fades out when sidebar is collapsed to icon mode
 * - Accessible with focus ring
 * - Consistent typography and spacing
 *
 * @param className - Additional CSS classes
 * @param asChild - Render as child component instead of div
 * @param props - Additional div props
 */
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot='sidebar-group-label'
      data-sidebar='group-label'
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0', // Hidden when collapsed
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarGroupAction - Action button for sidebar groups
 *
 * Features:
 * - Positioned absolutely in top-right corner
 * - Supports asChild prop for custom components
 * - Hidden when sidebar is collapsed to icon mode
 * - Larger hit area on mobile devices
 * - Hover and focus states
 *
 * @param className - Additional CSS classes
 * @param asChild - Render as child component instead of button
 * @param props - Additional button props
 */
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='sidebar-group-action'
      data-sidebar='group-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden', // Hidden when collapsed
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarGroupContent - Content area for sidebar groups
 *
 * Features:
 * - Full width container
 * - Consistent text sizing
 * - Used for group content like menu items
 *
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-group-content'
      data-sidebar='group-content'
      className={cn('w-full text-sm', className)}
      {...props}
    />
  )
}

/**
 * SidebarMenu - Container for sidebar menu items
 *
 * Features:
 * - Vertical flex layout with gap
 * - Full width with minimum width constraint
 * - Used to contain menu items
 *
 * @param className - Additional CSS classes
 * @param props - Additional ul props
 */
function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

/**
 * SidebarMenuItem - Container for individual menu items
 *
 * Features:
 * - Relative positioning for absolute children
 * - Group class for hover states
 * - Used to wrap menu buttons and actions
 *
 * @param className - Additional CSS classes
 * @param props - Additional li props
 */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
}

/**
 * sidebarMenuButtonVariants - Class variance authority configuration for menu buttons
 *
 * Features:
 * - Multiple variants: default, outline
 * - Multiple sizes: default, sm, lg
 * - Responsive behavior for collapsed state
 * - Hover, focus, and active states
 * - Icon and text truncation support
 * - Accessibility features
 */
const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * SidebarMenuButton - Interactive button for sidebar menu items
 *
 * Features:
 * - Supports asChild prop for custom components
 * - Multiple variants and sizes
 * - Active state support
 * - Optional tooltip (shown when collapsed)
 * - Responsive behavior for collapsed state
 * - Accessibility features
 *
 * @param asChild - Render as child component instead of button
 * @param isActive - Whether the button is in active state
 * @param variant - Visual variant: 'default' | 'outline'
 * @param size - Size variant: 'default' | 'sm' | 'lg'
 * @param tooltip - Tooltip content (string or TooltipContent props)
 * @param className - Additional CSS classes
 * @param props - Additional button props
 */
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  // Return button without tooltip if none provided
  if (!tooltip) {
    return button
  }

  // Convert string tooltip to object
  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    }
  }

  // Wrap button with tooltip (only shown when collapsed and not mobile)
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

/**
 * SidebarMenuAction - Action button for menu items
 *
 * Features:
 * - Positioned absolutely in top-right corner
 * - Supports asChild prop for custom components
 * - Optional showOnHover behavior
 * - Hidden when sidebar is collapsed to icon mode
 * - Responsive positioning based on menu button size
 * - Larger hit area on mobile devices
 *
 * @param className - Additional CSS classes
 * @param asChild - Render as child component instead of button
 * @param showOnHover - Show only on hover/focus (default: false)
 * @param props - Additional button props
 */
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='sidebar-menu-action'
      data-sidebar='menu-action'
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden', // Hidden when collapsed
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarMenuBadge - Badge component for menu items
 *
 * Features:
 * - Positioned absolutely in top-right corner
 * - Non-interactive (pointer-events-none)
 * - Responsive positioning based on menu button size
 * - Hidden when sidebar is collapsed to icon mode
 * - Tabular numbers for consistent width
 *
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-menu-badge'
      data-sidebar='menu-badge'
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden', // Hidden when collapsed
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarMenuSkeleton - Loading skeleton for menu items
 *
 * Features:
 * - Random width between 50-90% for realistic loading
 * - Optional icon skeleton
 * - Consistent height and spacing
 * - Used for loading states
 *
 * @param className - Additional CSS classes
 * @param showIcon - Whether to show icon skeleton (default: false)
 * @param props - Additional div props
 */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90% for realistic loading appearance
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot='sidebar-menu-skeleton'
      data-sidebar='menu-skeleton'
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className='size-4 rounded-md'
          data-sidebar='menu-skeleton-icon'
        />
      )}
      <Skeleton
        className='h-4 max-w-(--skeleton-width) flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

/**
 * SidebarMenuSub - Container for submenu items
 *
 * Features:
 * - Indented with left border for visual hierarchy
 * - Hidden when sidebar is collapsed to icon mode
 * - Vertical flex layout with gap
 * - Slightly offset positioning for visual separation
 *
 * @param className - Additional CSS classes
 * @param props - Additional ul props
 */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden', // Hidden when collapsed
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarMenuSubItem - Container for individual submenu items
 *
 * Features:
 * - Relative positioning for absolute children
 * - Group class for hover states
 * - Used to wrap submenu buttons
 *
 * @param className - Additional CSS classes
 * @param props - Additional li props
 */
function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='sidebar-menu-sub-item'
      data-sidebar='menu-sub-item'
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  )
}

/**
 * SidebarMenuSubButton - Button component for submenu items
 *
 * Features:
 * - Supports asChild prop for custom components
 * - Multiple sizes: sm, md
 * - Active state support
 * - Hidden when sidebar is collapsed to icon mode
 * - Indented styling for visual hierarchy
 * - Hover and focus states
 *
 * @param asChild - Render as child component instead of anchor
 * @param size - Size variant: 'sm' | 'md' (default: 'md')
 * @param isActive - Whether the button is in active state
 * @param className - Additional CSS classes
 * @param props - Additional anchor props
 */
function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot='sidebar-menu-sub-button'
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden', // Hidden when collapsed
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
