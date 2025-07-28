import type { Meta, StoryObj } from '@storybook/react'
import FormLabel from '../form-label/form-label'
import FormGroup from './form-group'

const meta = {
  title: 'Components/Core/Forms/FormGroup',
  component: FormGroup,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    theme: 'primary',
    children: (
      <>
        <FormLabel fontbold for='username' theme='primary'>
          Sample Label with Form Group
        </FormLabel>
      </>
    ),
  },
} satisfies Meta<typeof FormGroup>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryFormGroup: Story = {
  args: {
    theme: 'primary',
    children: (
      <>
        <FormLabel fontbold for='username' theme='primary'>
          Sample Label with Form Group
        </FormLabel>
      </>
    ),
  },
}

export const SecondaryFormGroup: Story = {
  args: {
    theme: 'secondary',
    children: (
      <>
        <FormLabel fontbold for='username' theme='secondary'>
          Sample Label with Form Group
        </FormLabel>
      </>
    ),
  },
}
