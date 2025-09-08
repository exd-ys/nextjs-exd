import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const textfieldContainerVariants = cva('flex flex-col gap-1', {
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
  },
  defaultVariants: {
    theme: 'default',
    fullWidth: false,
  },
})

const textfieldVariants = cva(
  'flex items-center justify-between gap-2 rounded-md border py-3 px-4 bg-secondary-white focus-within:ring-2 focus-within:ring-primary-300',
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
    },
    defaultVariants: {
      theme: 'default',
      fullWidth: false,
    },
  }
)

const textfieldLabelVariants = cva(
  'flex items-center relative font-medium text-sm tracking-wide',
  {
    variants: {
      theme: {
        default: 'text-secondary',
        active: 'text-primary',
        error: 'text-danger',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      theme: 'default',
      fullWidth: false,
    },
  }
)

const textfieldInputVariants = cva(
  'group w-full outline-hidden text-secondary value:text-secondary-200 text-base sm:leading-6',
  {
    variants: {
      theme: {
        default: 'text-secondary-black',
        active: 'text-primary',
        error: 'text-danger',
      },
      fullWidth: {
        true: 'w-full',
      },
      leftIcon: {
        true: 'flex justify-start',
      },
      rightIcon: {
        true: 'flex justify-end',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      theme: 'default',
      fullWidth: false,
      disabled: false,
    },
  }
)

const textIconVariants = cva('relative flex w-5 h-5', {
  variants: {
    theme: {
      default: 'text-secondary',
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

const textErrorVariants = cva(
  'w-full text-danger py-1 px-1 text-sm rounded-sm relative',
  {
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
  }
)

interface TextFieldProps extends VariantProps<typeof textfieldInputVariants> {
  name: string
  placeholder?: string
  label?: string
  nolabel?: boolean
  value: string
  lefticonblock?: ReactNode
  righticonblock?: ReactNode
  leftIcon?: boolean
  rightIcon?: boolean
  fieldType?: 'text' | 'email' | 'password'
  errorMessage?: string
  onChange: () => void
}

const TextField: React.FC<TextFieldProps> = ({
  theme,
  fullWidth,
  disabled,
  lefticonblock,
  righticonblock,
  onChange,
  ...props
}) => {
  return (
    <div className={textfieldContainerVariants({ theme, fullWidth })}>
      <div hidden={!!props.nolabel}>
        <label className={textfieldLabelVariants({ theme, fullWidth })}>
          {props.label}
        </label>
      </div>

      <div className={textfieldVariants({ theme, fullWidth })}>
        {props.leftIcon && !!lefticonblock && (
          <div className={textIconVariants({ theme, disabled })}>
            {lefticonblock}
          </div>
        )}

        <input
          name={props.name}
          placeholder={props.placeholder}
          type={props.fieldType}
          disabled={!!disabled}
          value={props.fieldType === 'password' ? '**********' : props.value}
          className={textfieldInputVariants({
            theme,
            disabled,
            leftIcon: props.leftIcon,
            rightIcon: props.rightIcon,
          })}
          onChange={onChange}
        />

        {props.rightIcon && !!righticonblock && (
          <div className={textIconVariants({ theme, disabled })}>
            {righticonblock}
          </div>
        )}
      </div>

      <div
        hidden={theme !== 'error'}
        className={textErrorVariants({ theme, fullWidth })}
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

export default TextField
