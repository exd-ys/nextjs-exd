'use client'

import { VariantProps, cva } from 'class-variance-authority'
import React, { useState } from 'react'
import SideNavItem, { SideNavItemProps } from './side-nav-item/side-nav-item'
import SideNavLogo from './side-nav-logo/side-nav-logo'

const sideNavVariants = cva(
  'absolute h-screen bg-secondary-white space-y-6 px-8 py-8 inset-y-0 left-0 sm:relative sm:-translate-x-0 transform -translate-x-full transition duration-200 ease-in-out',
  {
    variants: {
      collapsed: {
        true: 'w-20',
        false: 'w-64',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)

const sideNavItemContainerVariants = cva(
  'flex flex-col justify-start items-start gap-3',
  {
    variants: {
      collapsed: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)

const sideNavLogoContainerVariants = cva(
  'flex flex-col items-center justify-center gap-3 mb-8',
  {
    variants: {
      collapsed: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)

interface SideNavProps extends VariantProps<typeof sideNavVariants> {
  items: SideNavItemProps[]
  logoPath: string
}

const SideNav: React.FC<SideNavProps> = ({
  collapsed,
  items,
  logoPath,
  ...props
}) => {
  const [selectedItem, setSelectedItem] = useState(0)

  const handleItemClick = (index: number) => {
    setSelectedItem(index)
  }

  return (
    <nav className={sideNavVariants({ collapsed })} {...props}>
      <div className={sideNavLogoContainerVariants({ collapsed })}>
        <SideNavLogo collapsed={collapsed} logoPath={logoPath} />
      </div>

      <div className={sideNavItemContainerVariants({ collapsed })}>
        {items.map((item, index) => (
          <div className='flex w-full justify-center' key={index}>
            {collapsed ? (
              <SideNavItem
                selected={selectedItem === index}
                label={item.label}
                onClick={() => handleItemClick(index)}
                collapsed
              >
                {item.children}
              </SideNavItem>
            ) : (
              <SideNavItem
                selected={selectedItem === index}
                label={item.label}
                onClick={() => handleItemClick(index)}
                leftIcon
              >
                {item.children}
              </SideNavItem>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default SideNav
