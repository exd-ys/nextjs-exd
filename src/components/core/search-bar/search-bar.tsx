import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const searchBarParentVariants = cva('flex gap-2', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})

const searchbarVariants = cva(
  'flex h-6 w-full items-center justify-start gap-2',
  {
    variants: {
      fullWidth: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
      },
      leftIcon: {
        true: 'flex justify-start',
      },
    },
    defaultVariants: {
      fullWidth: false,
      disabled: false,
      leftIcon: false,
    },
  }
)

const searchbarContainerVariants = cva(
  'flex w-full h-10 items-center justify-start gap-14 rounded-md border border-secondary-200 bg-white p-3 bg-secondary-white focus-within:ring-2 focus-within:ring-primary-300',
  {
    variants: {
      disabled: {
        true: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

const searchBarIconVariants = cva('relative h-5 w-5 text-secondary-300', {
  variants: {},
})

interface SearchBarProps extends VariantProps<typeof searchbarVariants> {
  children?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
  label: string
  value: string
  onChange: () => void
  helperText?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  fullWidth,
  children,
  rightIcon,
  label,
  onChange,
  value,
  helperText,
  disabled = false,
  leftIcon = false,
  ...props
}) => {
  return (
    <div className={searchBarParentVariants({ fullWidth })}>
      <div className='pt-2'>{label}</div>
      <div className={`flex flex-col gap-1 ${fullWidth && 'w-full'}`}>
        <div className={searchbarContainerVariants({ disabled })}>
          <div className={searchbarVariants({ disabled, leftIcon })}>
            {leftIcon && (
              <div className={searchBarIconVariants()}>
                <MagnifyingGlassIcon />
              </div>
            )}
            <input
              onChange={() => {
                onChange()
              }}
              disabled={disabled}
              className='placeholder-secondary-300 max-w-full shrink grow text-base font-normal leading-tight text-secondary outline-hidden'
              placeholder={value}
            />
            {!!rightIcon && (
              <div className={searchBarIconVariants()}>{rightIcon}</div>
            )}
          </div>
        </div>
        {!!helperText && (
          <div className='pl-4 text-sm text-secondary-500'>{helperText}</div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
