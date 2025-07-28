import type { Meta, StoryObj } from '@storybook/react'
import Alert from './alert'

const meta = {
  title: 'Components/Core/Alert',
  component: Alert,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['alert', 'inline'],
    },
    type: {
      control: 'radio',
      options: ['default', 'success', 'warning', 'error'],
    },
    showalert: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    theme: 'alert',
    type: 'default',
    children: 'Alert message',
    showalert: true,
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const InlineDefault: Story = {
  args: {
    theme: 'inline',
    type: 'default',
    children: 'Default message',
  },
}

export const InlineSuccess: Story = {
  args: {
    theme: 'inline',
    type: 'success',
    children: 'Success message',
  },
}

export const InlineWarning: Story = {
  args: {
    theme: 'inline',
    type: 'warning',
    children: 'Warning message',
  },
}

export const InlineError: Story = {
  args: {
    theme: 'inline',
    type: 'error',
    children: 'Error message',
  },
}

export const AlertDefault: Story = {
  args: {
    theme: 'alert',
    type: 'default',
    children: 'Default message',
  },
}

export const AlertSuccess: Story = {
  args: {
    theme: 'alert',
    type: 'success',
    children: 'Success message',
  },
}

export const AlertWarning: Story = {
  args: {
    theme: 'alert',
    type: 'warning',
    children: 'Warning message',
  },
}

export const AlertError: Story = {
  args: {
    theme: 'alert',
    type: 'error',
    children: 'Error message',
  },
}
