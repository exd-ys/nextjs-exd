import { Squares2X2Icon } from '@heroicons/react/20/solid'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from './search-bar'

const meta = {
  title: 'Components/Core/SearchBar',
  component: SearchBar,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Search',

    value: 'Search Here',
    disabled: false,
    onChange: action('Change Value'),
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fullWidth: false,
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

export const HelperText: Story = {
  args: {
    fullWidth: false,
    helperText: 'Helper Text',
  },
}

export const LeftIcon: Story = {
  args: {
    fullWidth: false,
    leftIcon: true,
  },
}

export const RightIcon: Story = {
  args: {
    fullWidth: false,
    rightIcon: <Squares2X2Icon></Squares2X2Icon>,
  },
}

export const SideIcons: Story = {
  args: {
    leftIcon: true,
    rightIcon: <Squares2X2Icon></Squares2X2Icon>,
  },
}
