import {
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import TextArea from './textarea'

const meta = {
  title: 'Components/Core/TextArea',
  component: TextArea,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: { control: 'radio', options: ['active', 'default', 'error'] },
    label: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rightIcon: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
  args: {
    rightIcon: false,
    icon: <PencilSquareIcon></PencilSquareIcon>,
    errorMessage: 'Error message here',
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'default',
    label: 'Default Message:',
    placeholder: 'Enter your message...',
    value: 'Please write your message here...',
    fullWidth: false,
    disabled: false,
    rightIcon: true,
    onChange: () => {},
  }
}

export const Disabled: Story = {
  args: {
    theme: 'default',
    label: 'Disabled Message:',
    placeholder: 'Enter your message...',
    value: 'Please write your message here...',
    fullWidth: false,
    disabled: true,
    rightIcon: true,
    onChange: () => {},
  },
}

export const Active: Story = {
  args: {
    theme: 'active',
    label: 'Active Message:',
    placeholder: 'Enter your message...',
    value: 'Please write your message here...',
    fullWidth: false,
    disabled: false,
    rightIcon: true,
    onChange: () => {},
  },
}

export const Error: Story = {
  args: {
    theme: 'error',
    label: 'Error Message:',
    placeholder: 'Enter your message...',
    value: 'Please write your message here...',
    errorMessage: 'This is an error message',
    icon: <ExclamationCircleIcon></ExclamationCircleIcon>,
    fullWidth: false,
    disabled: false,
    rightIcon: true,
    onChange: () => {},
  },
}
