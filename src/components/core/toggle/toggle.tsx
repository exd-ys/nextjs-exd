import { Switch } from '@headlessui/react'
import { VariantProps, cva } from 'class-variance-authority'
import React, { useState } from 'react'

const containerVariants = cva('py-16 relative inline-flex', {
  variants: {
    active: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    active: false,
  },
})

const toggleVariants = cva(
  'relative border inline-flex h-6 w-11 items-center rounded-full',
  {
    variants: {
      active: {
        true: 'bg-primary border-primary',
        false: 'text-secondary-700 border-secondary-200',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

const toggleCircleVariants = cva(
  ' relative inline-flex h-4 w-4 items-center rounded-full',
  {
    variants: {
      active: {
        true: 'translate-x-5 bg-secondary-white',
        false: 'translate-x-1 bg-secondary-300',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

const labelVariants = cva('', {
  variants: {
    labelPosition: {
      left: 'mr-4',
      right: 'ml-4',
    },
  },
  defaultVariants: {
    labelPosition: 'left',
  },
})

interface ToggleProps extends VariantProps<typeof toggleVariants> {
  label?: string
  labelPosition?: 'left' | 'right'
  nolabel?: boolean
}

const Toggle: React.FC<ToggleProps> = ({
  labelPosition,
  disabled,
  ...props
}) => {
  const [active, setActive] = useState(false)

  return (
    <div className={containerVariants({ disabled })}>
      <div hidden={!!props.nolabel}>
        <div hidden={labelPosition !== 'left'}>
          <label className={labelVariants({ labelPosition })}>
            {props.label}
          </label>
        </div>
      </div>

      <Switch
        disabled={disabled ? true : false}
        checked={active}
        onChange={setActive}
        className={toggleVariants({ active, disabled })}
        aria-label={props.label}
      >
        <span className={toggleCircleVariants({ active, disabled })} />
      </Switch>

      <div hidden={!!props.nolabel}>
        <div hidden={labelPosition !== 'right'}>
          <label className={labelVariants({ labelPosition })}>
            {props.label}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Toggle
