import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import type { Meta, StoryObj } from '@storybook/react'
import SideNav from './side-nav'

const sideNavItems = [
  'Dashboard',
  'Profile',
  'Settings',
  'Notifications',
  'Logout',
]

const meta = {
  title: 'Components/Core/Nav/SideNav',
  component: SideNav,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    items: { control: 'object' },
  },
  args: {
    items: sideNavItems.map((label) => ({
      label,
      children: <Squares2X2Icon></Squares2X2Icon>,
    })),
    logoPath: 'static/media/public/images/img-logo-colored.svg',
  },
} satisfies Meta<typeof SideNav>

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
