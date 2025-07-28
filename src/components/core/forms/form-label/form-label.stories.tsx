import type { Meta, StoryObj } from '@storybook/react'
import FormLabel from './form-label'

const meta = {
  title: 'Components/Core/Forms/FormsLabel',
  component: FormLabel,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    fontbold: { control: 'boolean' },
    for: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    theme: 'primary',
    fontbold: false,
    for: 'username',
    children: 'Username',
  },
} satisfies Meta<typeof FormLabel>

export default meta
type Story = StoryObj<typeof meta>

export const BoldPrimaryLabel: Story = {
  args: {
    theme: 'primary',
    fontbold: true,
    for: 'username',
    children: 'Username',
  },
}

export const OrdinarySecondaryLabel: Story = {
  args: {
    theme: 'secondary',
    fontbold: false,
    for: 'username',
    children: 'Username',
  },
}
