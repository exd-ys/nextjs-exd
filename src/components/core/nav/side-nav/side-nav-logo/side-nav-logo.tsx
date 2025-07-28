import { VariantProps, cva } from 'class-variance-authority'
import Image from 'next/image'
import React from 'react'

const sideNavLogoVariants = cva('relative', {
  variants: {
    collapsed: {
      true: 'h-10 w-10',
      false: 'h-16 w-16',
    },
  },
  defaultVariants: {
    collapsed: false,
  },
})

interface SideNavLogoProps extends VariantProps<typeof sideNavLogoVariants> {
  logoPath: string
}

const SideNavLogo: React.FC<SideNavLogoProps> = ({
  collapsed,
  logoPath,
  ...props
}) => {
  const logoBlock = (
    <div className={sideNavLogoVariants({ collapsed })} {...props}>
      <Image
        className='relative'
        src={logoPath}
        alt='Underscore Logo'
        width={60}
        height={60}
        priority
      />
    </div>
  )

  const labelBlock = (
    <div className='text-neutral-700  text-sm font-bold'>Underscore</div>
  )

  return (
    <>
      {collapsed ? (
        logoBlock
      ) : (
        <div className='inline-flex h-24 w-28 flex-col items-center justify-start gap-3'>
          {logoBlock}
          {!collapsed && labelBlock}
        </div>
      )}
    </>
  )
}

export default SideNavLogo
