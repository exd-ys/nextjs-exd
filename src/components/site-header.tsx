import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Bell } from 'phosphor-react'

export function SiteHeader() {
  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='text-base font-semibold'>Dashboard</h1>
        <div className='ml-auto flex items-center gap-2'>
          <Button
            size='icon'
            className='size-8 rounded-full group-data-[collapsible=icon]:opacity-0 hover:bg-[#383AD8] bg-[#383AD8]'
            variant='default'
          >
            {Bell && <Bell />}
            <span className='sr-only'>Inbox</span>
          </Button>

          <Avatar className='h-8 w-8 rounded-lg grayscale'>
            <AvatarImage
              src={'https://avatar.iran.liara.run/public/40'}
              alt={'avatar'}
            />
            <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
          </Avatar>
          {/* <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
            <a
              href='https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard'
              rel='noopener noreferrer'
              target='_blank'
              className='dark:text-foreground'
            >
              GitHub
            </a>
          </Button> */}
        </div>
      </div>
    </header>
  )
}
