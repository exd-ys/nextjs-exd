import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import type { Meta, StoryObj } from '@storybook/react'
import SideNavItem from './side-nav-item'

const meta = {
  title: 'Components/Core/Nav/SideNav/SideNavItem',
  component: SideNavItem,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    leftIcon: { control: 'boolean' },
    rightIcon: { control: 'boolean' },
    collapsed: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
  args: {
    label: 'Dashboard',
    children: <Squares2X2Icon></Squares2X2Icon>,
    selected: true,
  },
} satisfies Meta<typeof SideNavItem>

export default meta
type Story = StoryObj<typeof meta>

export const ExpandedRightIcon: Story = {
  args: {
    leftIcon: true,
    rightIcon: false,
    collapsed: false,
  },
}

export const ExpandedLeftIcon: Story = {
  args: {
    leftIcon: false,
    rightIcon: true,
    collapsed: false,
  },
}

export const ExpandedNoIcon: Story = {
  args: {
    leftIcon: false,
    rightIcon: false,
    collapsed: false,
  },
}

export const Collapsed: Story = {
  args: {
    leftIcon: true,
    rightIcon: false,
    collapsed: true,
  },
}
