import { VariantProps, cva } from 'class-variance-authority'

const formLabelVariants = cva('block text-sm mb-2', {
  variants: {
    theme: {
      primary: 'text-primary',
      secondary: 'text-secondary',
    },
    fontbold: {
      true: 'font-bold',
    },
  },
  defaultVariants: {
    theme: 'primary',
    fontbold: false,
  },
})

interface FormLabelProps extends VariantProps<typeof formLabelVariants> {
  for: string
  children: string
}

const FormLabel: React.FC<FormLabelProps> = ({ theme, fontbold, ...props }) => {
  return (
    <>
      <label
        className={formLabelVariants({ theme, fontbold })}
        htmlFor={props.for}
      >
        {props.children}
      </label>
    </>
  )
}

export default FormLabel
