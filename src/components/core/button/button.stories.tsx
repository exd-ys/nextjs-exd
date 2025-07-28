import { Squares2X2Icon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

const meta = {
  title: 'Components/Core/Button',
  component: Button,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary', 'link'],
    },
    fullWidth: { control: 'boolean' },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    leftIcon: { control: 'boolean' },
    rightIcon: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    buttontype: {
      control: 'radio',
      options: ['button', 'submit'],
    },
  },
  args: {
    label: 'Button',
    children: <Squares2X2Icon></Squares2X2Icon>,
    fullWidth: false,
    disabled: false,
    leftIcon: true,
    rightIcon: false,
    isLoading: false,
    buttontype: 'button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryLarge: Story = {
  args: {
    theme: 'primary',
    size: 'lg',
  },
}

export const PrimaryMedium: Story = {
  args: {
    theme: 'primary',
    size: 'md',
  },
}

export const PrimarySmall: Story = {
  args: {
    theme: 'primary',
    size: 'sm',
  },
}

export const SecondaryLarge: Story = {
  args: {
    theme: 'secondary',
    size: 'lg',
  },
}

export const SecondaryMedium: Story = {
  args: {
    theme: 'secondary',
    size: 'md',
  },
}

export const SecondarySmall: Story = {
  args: {
    theme: 'secondary',
    size: 'sm',
  },
}

export const LinkLarge: Story = {
  args: {
    theme: 'link',
    size: 'lg',
  },
}

export const LinkMedium: Story = {
  args: {
    theme: 'link',
    size: 'md',
  },
}

export const LinkSmall: Story = {
  args: {
    theme: 'link',
    size: 'sm',
  },
}
