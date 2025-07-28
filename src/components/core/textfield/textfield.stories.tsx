import {
  ExclamationCircleIcon,
  EyeIcon,
  LockClosedIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import TextField from './textfield'

const meta = {
  title: 'Components/Core/TextField',
  component: TextField,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['default', 'active', 'error'],
    },
    fieldType: {
      control: 'radio',
      options: ['text', 'email', 'password'],
    },
    name: { control: 'text' },
    label: { control: 'text' },
    errorMessage: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leftIcon: { control: 'boolean' },
    rightIcon: { control: 'boolean' },
    nolabel: { control: 'boolean' },
  },
  args: {
    fullWidth: false,
    disabled: false,
    leftIcon: true,
    rightIcon: true,
    label: 'TextField',
    name: 'textfield',
    fieldType: 'text',
    lefticonblock: <UserIcon></UserIcon>,
    righticonblock: <PencilSquareIcon></PencilSquareIcon>,
    errorMessage: 'Error message here',
    nolabel: false,
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'default',
    label: 'Username',
    value: 'Enter username here...',
    lefticonblock: <UserIcon></UserIcon>,
    righticonblock: <PencilSquareIcon></PencilSquareIcon>,
    fullWidth: false,
    leftIcon: true,
    rightIcon: true,
    disabled: false,
    name: 'username',
    fieldType: 'text',
    onChange: () => {},
  },
}

export const Password: Story = {
  args: {
    theme: 'active',
    label: 'Password',
    value: 'Password',
    lefticonblock: <LockClosedIcon></LockClosedIcon>,
    righticonblock: <EyeIcon></EyeIcon>,
    fullWidth: false,
    leftIcon: true,
    rightIcon: true,
    disabled: false,
    name: 'password',
    fieldType: 'password',
    onChange: () => {},
  },
}

export const Error: Story = {
  args: {
    theme: 'error',
    label: 'Username',
    value: 'Error Placeholder',
    errorMessage: 'This is an error message',
    lefticonblock: <LockClosedIcon></LockClosedIcon>,
    righticonblock: <ExclamationCircleIcon></ExclamationCircleIcon>,
    fullWidth: false,
    disabled: false,
    name: 'username',
    fieldType: 'email',
    onChange: () => {},
  },
}
