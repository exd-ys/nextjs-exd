import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from './checkbox'

const meta = {
  title: 'Components/Core/Checkbox',
  component: Checkbox,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary', 'disabled'],
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
  args: {
    nolabel: false,
    label: 'Checkbox 1',
  },
}

export const WithoutLabel: Story = {
  args: {
    nolabel: true,
    label: 'Checkbox 2',
  },
}
