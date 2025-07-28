import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const sideNavItemVariants = cva(
  'inline-flex h-14 gap-4 rounded-md p-4 hover:bg-primary group',
  {
    variants: {
      collapsed: {
        true: 'w-14',
        false: 'w-56',
      },
      selected: {
        true: 'bg-primary',
      },
      leftIcon: {
        true: 'items-center justify-start',
        false: 'items-center justify-center',
      },
      rightIcon: {
        true: 'items-end justify-end',
        false: 'items-end justify-center',
      },
    },
    defaultVariants: {
      collapsed: false,
      selected: false,
    },
  }
)

const sideNavItemLabelVariants = cva(
  'text-base text-secondary-500 leading-tight group-hover:text-secondary-white font-semibold',
  {
    variants: {
      selected: {
        true: 'text-secondary-white',
        false: 'text-zinc-500',
      },
      leftIcon: {
        true: 'grow',
      },
      rightIcon: {
        true: 'grow',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

const sideNavItemiconVariants = cva(
  'relative h-6 w-6 group-hover:text-secondary-white',
  {
    variants: {
      selected: {
        true: 'text-secondary-white',
        false: 'text-secondary-300',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

interface SideNavItemProps extends VariantProps<typeof sideNavItemVariants> {
  label: string
  leftIcon?: boolean
  rightIcon?: boolean
  children?: ReactNode
  onClick?: () => void
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  collapsed,
  selected,
  children,
  ...props
}) => {
  const iconBlock = (
    <div className={sideNavItemiconVariants({ selected })}>{children}</div>
  )

  return (
    <div
      className={sideNavItemVariants({
        collapsed,
        selected,
        leftIcon: props.leftIcon,
        rightIcon: props.rightIcon,
      })}
      onClick={props.onClick}
    >
      {collapsed ? (
        iconBlock
      ) : (
        <>
          {props.leftIcon && iconBlock}
          <div
            className={sideNavItemLabelVariants({
              selected,
              leftIcon: props.leftIcon,
              rightIcon: props.rightIcon,
            })}
          >
            {props.label}
          </div>
          {props.rightIcon && iconBlock}
        </>
      )}
    </div>
  )
}

export default SideNavItem
export type { SideNavItemProps }
