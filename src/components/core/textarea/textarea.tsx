import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const containerVariants = cva('flex flex-col gap-1', {
  variants: {
    theme: {
      default: '',
      active: '',
      error: '',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
    disabled: {
      true: 'cursor-not-allowed',
    },
  },
  defaultVariants: {
    theme: 'default',
    fullWidth: false,
    disabled: false,
  },
})

const labelVariants = cva(
  'flex items-center relative font-medium text-sm tracking-wide',
  {
    variants: {
      theme: {
        default: 'text-secondary-400',
        active: 'text-primary',
        error: 'text-danger',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'cursor-not-allowed',
      },
    },
    defaultVariants: {
      theme: 'default',
      fullWidth: false,
      disabled: false,
    },
  }
)

const contentVariants = cva('relative', {
  variants: {
    theme: {
      default: '',
      active: '',
      error: '',
    },

    fullWidth: {
      true: 'w-full',
      false: 'w-full',
    },

    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    theme: 'default',
    disabled: false,
    fullWidth: false,
  },
})

const textAreaVariants = cva(
  'flex w-full outline-hidden items-center justify-between gap-2 rounded-md border py-3 px-4 text-secondary bg-secondary-white value:text-secondary-200 focus:ring-2 focus:ring-inset focus:ring-primary-300 text-base sm:leading-6',
  {
    variants: {
      theme: {
        default: 'border-secondary-200',
        active: 'border-primary',
        error: 'border-danger',
      },

      fullWidth: {
        true: 'w-full',
      },

      disabled: {
        true: 'bg-secondary-100 cursor-not-allowed',
      },
    },
    defaultVariants: {
      theme: 'default',
      disabled: false,
      fullWidth: false,
    },
  }
)

const iconVariants = cva('h-5 w-5', {
  variants: {
    theme: {
      default: 'text-secondary-300',
      active: 'text-primary',
      error: 'text-danger',
    },
    size: {
      lg: 'h-6 w-6',
      md: 'h-4 w-4',
      sm: 'h-3 w-3',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    theme: 'default',
    size: 'md',
    disabled: false,
  },
})

const errorVariants = cva('text-danger py-1 px-1 text-sm rounded-sm relative', {
  variants: {
    theme: {
      default: '',
      active: '',
      error: '',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    theme: 'default',
    disabled: false,
  },
})

interface TextAreaProps extends VariantProps<typeof containerVariants> {
  label: string
  placeholder: string
  value: string
  rightIcon?: boolean
  icon: ReactNode
  errorMessage?: string
  onChange: () => void
}

const TextArea: React.FC<TextAreaProps> = ({
  theme,
  fullWidth,
  disabled,
  icon,
  onChange,
  ...props
}) => {
  return (
    <div className={containerVariants({ theme, fullWidth, disabled })}>
      <label
        htmlFor='label'
        className={labelVariants({ theme, fullWidth, disabled })}
      >
        {props.label}
      </label>

      <div className={contentVariants({ theme, fullWidth, disabled })}>
        <textarea
          disabled={!!disabled}
          className={textAreaVariants({ theme, fullWidth, disabled })}
          value={props.value}
          placeholder={props.placeholder}
          onChange={onChange}
        ></textarea>
        <div className='absolute bottom-3 right-3'>
          {props.rightIcon && !!icon && (
            <div className=''>
              <div className={iconVariants({ theme, disabled })}>{icon}</div>
            </div>
          )}
        </div>
      </div>

      <div
        hidden={theme !== 'error'}
        className={errorVariants({ theme, fullWidth })}
        role='alert'
      >
        <span hidden={theme !== 'error'} className='text-sm'>
          {props.errorMessage}
        </span>
        <span
          hidden={theme !== 'error'}
          className='absolute bottom-0 right-0 top-0 px-4 py-3'
        ></span>
      </div>
    </div>
  )
}

export default TextArea
