import { VariantProps, cva } from 'class-variance-authority'
import { ReactNode } from 'react'

const gridVariants = cva('grid', {
  variants: {
    theme: {
      col1: 'grid-cols-1',
      col2: 'grid-cols-2',
      col3: 'grid-cols-3',
    },
  },
  defaultVariants: {
    theme: 'col1',
  },
})

interface GridProps extends VariantProps<typeof gridVariants> {
  children: ReactNode
}

const Grid: React.FC<GridProps> = ({ theme, ...props }) => {
  return (
    <>
      <div className={gridVariants({ theme })}>{props.children}</div>
    </>
  )
}

export default Grid
