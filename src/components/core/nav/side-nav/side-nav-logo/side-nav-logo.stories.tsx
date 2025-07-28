import type { Meta, StoryObj } from '@storybook/react'
import SideNavLogo from './side-nav-logo'

const meta = {
  title: 'Components/Core/Nav/SideNav/SideNavLogo',
  component: SideNavLogo,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
  },
  args: {
    logoPath: 'static/media/public/images/img-logo-colored.svg',
  },
} satisfies Meta<typeof SideNavLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  args: {
    collapsed: false,
  },
}

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
}
