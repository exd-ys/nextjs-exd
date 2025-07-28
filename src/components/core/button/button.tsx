import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'
import Spinner from '../spinner/spinner'

const buttonVariants = cva('rounded-md flex justify-center items-center', {
  variants: {
    theme: {
      primary: 'bg-primary',
      secondary: 'border-primary border-solid border-2',
      link: '',
    },
    size: {
      lg: 'px-5 py-3 gap-2',
      md: 'px-4 py-2 gap-3',
      sm: 'px-4 py-2 gap-2 rounded-sm',
    },
    fullWidth: {
      true: 'w-full',
      false: 'h-fit w-fit',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    isLoading: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    theme: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
})

const buttonLabelVariants = cva('font-semibold', {
  variants: {
    theme: {
      primary: 'text-secondary-white',
      secondary: 'text-primary',
      link: 'text-primary',
    },
    size: {
      lg: 'text-base',
      md: 'text-base',
      sm: 'text-sm',
    },
    leftIcon: {
      true: 'flex justify-start',
    },
    rightIcon: {
      true: 'flex justify-end',
    },
    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    theme: 'primary',
    size: 'md',
    disabled: false,
  },
})

const buttonIconVariants = cva('', {
  variants: {
    theme: {
      primary: 'text-secondary-white',
      secondary: 'text-primary',
      link: 'text-primary',
    },
    size: {
      lg: 'h-6 w-6',
      md: 'h-4 w-4',
      sm: 'h-3 w-3',
    },
    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    theme: 'primary',
    size: 'md',
    disabled: false,
  },
})

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string
  buttontype: 'button' | 'submit'
  children?: ReactNode
  leftIcon?: boolean
  rightIcon?: boolean
  isLoading?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  theme,
  size,
  fullWidth,
  disabled,
  isLoading,
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}) => {
  return (
    <button
      type={props.buttontype}
      className={buttonVariants({
        theme,
        size,
        fullWidth,
        disabled,
        isLoading,
      })}
      disabled={!!disabled || isLoading}
      {...props}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      aria-label='button'
    >
      {leftIcon && !isLoading && !!children && (
        <div className={buttonIconVariants({ theme, size })}>{children}</div>
      )}

      {isLoading && <Spinner nolabel size='sm' />}

      <div
        className={buttonLabelVariants({
          theme,
          size,
          leftIcon,
          rightIcon,
        })}
      >
        {props.label}
      </div>
      {rightIcon && !!children && (
        <div className={buttonIconVariants({ theme, size })}>{children}</div>
      )}
    </button>
  )
}

export default Button
