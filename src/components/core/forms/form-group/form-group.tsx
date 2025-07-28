import { VariantProps, cva } from 'class-variance-authority'
import { ReactNode } from 'react'

const formGroupVariants = cva('mb-6', {
  variants: {
    theme: {
      primary: '',
      secondary: 'bg-primary-200',
    },
  },
  defaultVariants: {
    theme: 'primary',
  },
})

interface FormGroupProps extends VariantProps<typeof formGroupVariants> {
  children?: ReactNode
}

const FormGroup: React.FC<FormGroupProps> = ({ theme, ...props }) => {
  return (
    <>
      <div className={formGroupVariants({ theme })}>{props.children}</div>
    </>
  )
}

export default FormGroup
