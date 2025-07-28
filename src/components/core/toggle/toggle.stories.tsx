import type { Meta, StoryObj } from '@storybook/react'
import Toggle from './toggle'

const meta = {
  title: 'Components/Core/Toggle',
  component: Toggle,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    label: { control: 'text' },
    nolabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
    labelPosition: 'left',
    nolabel: false,
    label: 'Label',
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const LeftSideLabel: Story = {
  args: {
    label: 'Label',
    labelPosition: 'left',
    nolabel: false,
    disabled: false,
  },
}

export const RightSideLabel: Story = {
  args: {
    label: 'Label',
    labelPosition: 'right',
    nolabel: false,
    disabled: false,
  },
}

export const NoLabel: Story = {
  args: {
    label: 'Label',
    labelPosition: 'right',
    nolabel: true,
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    labelPosition: 'left',
    nolabel: false,
    disabled: true,
  },
}
