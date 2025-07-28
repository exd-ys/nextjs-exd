import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { VariantProps, cva } from 'class-variance-authority'
import Image from 'next/image'
import React from 'react'

const avatarVariants = cva('', {
  variants: {
    theme: {
      image: '',
      text: '',
      icon: '',
    },
  },
  defaultVariants: {
    theme: 'text',
  },
})

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  label?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ theme, ...props }) => {
  return (
    <div className='inline-flex items-center gap-2'>
      <div className='flex h-10 w-10 items-center justify-center'>
        {theme === 'image' && (
          <Image
            className='h-10 w-10 rounded-full'
            src='https://via.placeholder.com/40x40'
            alt='Avatar'
            width={40}
            height={40}
            priority
          />
        )}
        {theme === 'text' && (
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary-white'>
            DT
          </div>
        )}
        {theme === 'icon' && (
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary-white'>
            <UserIcon className='h-5 w-5 origin-center' />
          </div>
        )}
      </div>
      {!props.label && (
        <div className='flex items-center gap-2'>
          <p className='whitespace-nowrap text-base text-secondary'>
            Dominik Tyka
          </p>
          <div className='h-4 w-4 origin-center'>
            <ChevronDownIcon />
          </div>
        </div>
      )}
    </div>
  )
}

export default Avatar
