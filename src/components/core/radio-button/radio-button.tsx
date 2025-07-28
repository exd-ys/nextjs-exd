import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const radioLabelVariants = cva('text-base font-medium text-secondary', {
  variants: {
    theme: {
      primary: 'text-primary',
      secondary: 'text-danger',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    disabled: {
      false: '',
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

const radioButtonVariants = cva(
  'relative float-left h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-200 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[""] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[""]  checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full  checked:after:content-[""] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]',
  {
    variants: {
      theme: {
        primary:
          'checked:border-primary checked:after:border-primary checked:after:bg-primary',
        secondary:
          'checked:border-danger checked:after:border-danger checked:after:bg-danger',
        disabled: 'opacity-50 cursor-not-allowed border-secondary-200',
      },
      disabled: {
        false: '',
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

interface RadioProps extends VariantProps<typeof radioLabelVariants> {
  items: string[]
}

const RadioButton: React.FC<RadioProps> = ({ disabled, ...props }) => {
  return (
    <div>
      {props.items.map((item, index) => (
        <div className='relative flex flex-row items-center gap-2' key={index}>
          <input
            className={radioButtonVariants({ disabled, ...props })}
            type='radio'
            name='radio'
            id={item}
            value={item}
          />
          <label className={radioLabelVariants({ disabled, ...props })}>
            {item}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioButton
