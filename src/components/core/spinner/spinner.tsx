import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const spinnerVariants = cva('relative flex animate-spin', {
  variants: {
    size: {
      lg: 'h-12 w-12',
      md: 'h-8 w-8',
      sm: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const spinnerTextVariants = cva(
  'text-secondary-400 text-center text-base font-mediun',
  {
    variants: {
      size: {
        lg: '',
        md: 'text-md',
        sm: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  size: 'lg' | 'md' | 'sm'
  nolabel: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ size, ...props }) => {
  const viewBoxMap = {
    lg: '0 0 51 51',
    md: '0 0 56 56',
    sm: '0 0 49 49',
  }

  return (
    <div className='flex w-fit flex-col items-center gap-1'>
      <div className={spinnerVariants({ size })}>
        <svg
          width='100%'
          height='100%'
          viewBox={viewBoxMap[size]}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M24.5 44C26.7092 44 28.5 42.2091 28.5 40C28.5 37.7909 26.7092 36 24.5 36C22.2909 36 20.5 37.7909 20.5 40C20.5 42.2091 22.2909 44 24.5 44Z'
            fill='#B1B3B2'
          />
          <path
            d='M24.5 12C26.7092 12 28.5 10.2091 28.5 8C28.5 5.79086 26.7092 4 24.5 4C22.2909 4 20.5 5.79086 20.5 8C20.5 10.2091 22.2909 12 24.5 12Z'
            fill='#B1B3B2'
          />
          <path
            d='M13.186 39.314C15.3952 39.314 17.186 37.5231 17.186 35.314C17.186 33.1049 15.3952 31.314 13.186 31.314C10.9769 31.314 9.18605 33.1049 9.18605 35.314C9.18605 37.5231 10.9769 39.314 13.186 39.314Z'
            fill='#B1B3B2'
          />
          <path
            d='M35.814 16.686C38.0232 16.686 39.814 14.8951 39.814 12.686C39.814 10.4769 38.0232 8.686 35.814 8.686C33.6049 8.686 31.814 10.4769 31.814 12.686C31.814 14.8951 33.6049 16.686 35.814 16.686Z'
            fill='#B1B3B2'
          />
          <path
            d='M8.50005 28.002C10.7103 28.002 12.502 26.2102 12.502 24C12.502 21.7898 10.7103 19.998 8.50005 19.998C6.2898 19.998 4.49805 21.7898 4.49805 24C4.49805 26.2102 6.2898 28.002 8.50005 28.002Z'
            fill='#B1B3B2'
          />
          <path
            d='M40.5 28C42.7092 28 44.5 26.2091 44.5 24C44.5 21.7909 42.7092 20 40.5 20C38.2909 20 36.5 21.7909 36.5 24C36.5 26.2091 38.2909 28 40.5 28Z'
            fill='#B1B3B2'
          />
          <path
            d='M13.186 16.688C15.3952 16.688 17.186 14.8971 17.186 12.688C17.186 10.4789 15.3952 8.688 13.186 8.688C10.9769 8.688 9.18605 10.4789 9.18605 12.688C9.18605 14.8971 10.9769 16.688 13.186 16.688Z'
            fill='#B1B3B2'
          />
          <path
            d='M35.814 39.316C38.0232 39.316 39.814 37.5251 39.814 35.316C39.814 33.1069 38.0232 31.316 35.814 31.316C33.6049 31.316 31.814 33.1069 31.814 35.316C31.814 37.5251 33.6049 39.316 35.814 39.316Z'
            fill='#B1B3B2'
          />
        </svg>
      </div>
      <div hidden={props.nolabel} className={spinnerTextVariants({ size })}>
        Loading
      </div>
    </div>
  )
}

export default Spinner
