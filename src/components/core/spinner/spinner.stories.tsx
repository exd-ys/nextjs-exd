import type { Meta, StoryObj } from '@storybook/react'
import Spinner from './spinner'

const meta = {
  title: 'Components/Core/Spinner',
  component: Spinner,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    nolabel: { control: 'boolean' },
  },
  args: {
    size: 'lg',
    nolabel: false,
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}
