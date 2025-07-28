import type { Meta, StoryObj } from '@storybook/react'
import TopNav from './top-nav'

const meta = {
  title: 'Components/Core/Nav/TopNav',
  component: TopNav,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {
    page: 'Home',
  },
} satisfies Meta<typeof TopNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
