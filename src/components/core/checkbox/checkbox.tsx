import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const checkboxLabelVariants = cva(
  'text-base text-secondary font-medium flex items-center ml-2',
  {
    variants: {
      theme: {
        primary: '',
        secondary: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      theme: 'primary',
    },
  }
)

const checkboxInputVariants = cva(
  'before:content[""] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:primary hover:before:opacity-10',
  {
    variants: {
      theme: {
        primary: 'border-primary',
        secondary: 'border-secondary-200',
        disabled: 'opacity-50 cursor-not-allowed border-secondary-200',
      },
    },
    defaultVariants: {
      theme: 'primary',
    },
  }
)

interface CheckboxProps extends VariantProps<typeof checkboxLabelVariants> {
  nolabel: boolean
  label: string
}

const CheckBox: React.FC<CheckboxProps> = ({ theme, ...props }) => {
  return (
    <div>
      {!props.nolabel ? (
        <label className='relative flex cursor-pointer items-center'>
          <div className='relative flex items-center gap-2'>
            <input
              id='default-checkbox'
              type='checkbox'
              value=''
              disabled={theme === 'disabled'}
              className={checkboxInputVariants({ theme, ...props })}
            />
            <div className='text-white pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5 fill-secondary-white'
                viewBox='0 0 20 20'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </div>
          <label
            htmlFor='default-checkbox'
            className={checkboxLabelVariants({ theme, ...props })}
          >
            {props.label}
          </label>
        </label>
      ) : (
        <div className={checkboxInputVariants({ theme, ...props })}>
          <input
            id='default-checkbox'
            type='checkbox'
            value=''
            className={checkboxInputVariants({ theme, ...props })}
          />
          <div className='text-white pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5 fill-secondary-white'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckBox
