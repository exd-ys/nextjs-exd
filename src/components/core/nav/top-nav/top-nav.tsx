import { BellIcon } from '@heroicons/react/24/outline'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import Avatar from '../../avatar/avatar'
import IconButton from '../../icon-button/icon-button'
import SearchBar from '../../search-bar/search-bar'

const topNavVariants = cva('', {
  variants: {},
  defaultVariants: {},
})

interface TopNavProps extends VariantProps<typeof topNavVariants> {
  page: string
}

const TopNav: React.FC<TopNavProps> = ({ ...props }) => {
  return (
    <nav className='duration-999 sticky top-0 flex h-20 items-center border-l border-secondary-100 bg-secondary-white p-6 transition ease-in-out'>
      {/* // TODO: Convert as breadcrumbs component
       */}
      <div className='flex h-5 shrink grow basis-0 items-center justify-start gap-2.5 text-base font-bold text-secondary-black'>
        {props.page}
      </div>

      <div className='flex h-10 items-center justify-end gap-4'>
        <SearchBar 
          label={''} 
          value={''} 
          onChange={(): void => {}}
        />
        <IconButton dot>
          <BellIcon />
        </IconButton>
        <Avatar theme={'text'}></Avatar>
      </div>
    </nav>
  )
}

export default TopNav
