import { Squares2X2Icon } from '@heroicons/react/24/outline'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import Button from '../button/button'

const cardVariants = cva('shadow', {
  variants: {
    theme: {
      vertical: 'overflow-hidden rounded-lg bg-secondary-white shadow-md',
      horizontal:
        'flex h-fit w-full flex-col overflow-hidden rounded-lg bg-secondary-white shadow-md sm:flex-row',
    },
  },
  defaultVariants: {
    theme: 'vertical',
  },
})

const cardImageAnchorVariants = cva('', {
  variants: {
    theme: {
      vertical: '',
      horizontal: 'md:w-7/12',
    },
  },
  defaultVariants: {
    theme: 'vertical',
  },
})

const cardImageVariants = cva('', {
  variants: {
    theme: {
      vertical: 'w-full rounded-t-lg',
      horizontal: 'h-full object-cover object-center',
    },
  },
  defaultVariants: {
    theme: 'vertical',
  },
})

const cardContentVariants = cva('px-8 py-7', {
  variants: {
    theme: {
      vertical: '',
      horizontal: 'md:w-10/12',
    },
  },
  defaultVariants: {
    theme: 'vertical',
  },
})

interface CardProps extends VariantProps<typeof cardVariants> {
  title: string
  body: string
}

const Card: React.FC<CardProps> = ({ theme, ...props }) => {
  return (
    <div className={cardVariants({ theme })}>
      <a href='#' className={cardImageAnchorVariants({ theme })}>
        <img
          className={cardImageVariants({ theme })}
          src='https://images.pexels.com/photos/207305/pexels-photo-207305.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt=''
        />
      </a>
      <div className={cardContentVariants({ theme })}>
        <a href='#'>
          <div className='mb-2 text-base font-bold tracking-tight text-secondary-black'>
            {props.title}
          </div>
        </a>
        <p className='mb-3  line-clamp-2 font-normal text-secondary'>
          {props.body}
        </p>
        <Button theme='primary' label='Cool Button' leftIcon size='md' buttontype={'button'}>
          <Squares2X2Icon></Squares2X2Icon>
        </Button>
      </div>
    </div>
  )
}

export default Card
