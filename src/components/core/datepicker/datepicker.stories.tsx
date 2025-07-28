import type { Meta, StoryObj } from '@storybook/react'
import DatePicker from './datepicker'

const meta = {
  title: 'Components/Core/DatePicker',
  component: DatePicker,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    fullWidth: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    theme: 'primary',
    label: 'Tailwind Calendar',
    fullWidth: false,
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {
  args: {
    theme: 'primary',
    label: 'Tailwind Calendar',
    fullWidth: false,
  },
}

export const Expanded: Story = {
  args: {
    theme: 'primary',
    label: 'Tailwind Calendar',
    fullWidth: true,
  },
}
