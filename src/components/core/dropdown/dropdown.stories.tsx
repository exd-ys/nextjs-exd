import {
  ArchiveBoxIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from './dropdown'

const meta = {
  title: 'Components/Core/Dropdown',
  component: Dropdown,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['default', 'custom'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    items: { control: 'object' },
    value: { control: 'text' },
    label: { control: 'text' },
    rightIcon: { control: 'boolean' },
    nolabel: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    value: 'Headers',
    rightIcon: true,
    disabled: false,
    nolabel: false,
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'default',
    value: 'Settings',
    headerIcon: <Cog6ToothIcon></Cog6ToothIcon>,
    items: [
      {
        icon: <PencilIcon></PencilIcon>,
        label: 'Edit',
      },
      {
        icon: <DocumentDuplicateIcon></DocumentDuplicateIcon>,
        label: 'Duplicate',
      },
      {
        icon: <ArchiveBoxIcon></ArchiveBoxIcon>,
        label: 'Archive',
      },
      {
        icon: <ArrowTopRightOnSquareIcon></ArrowTopRightOnSquareIcon>,
        label: 'Move',
      },
      {
        icon: <TrashIcon></TrashIcon>,
        label: 'Delete',
      },
    ],
    fullWidth: false,
    disabled: false,
  },
}

export const Custom: Story = {
  args: {
    theme: 'custom',
    value: 'Settings',
    headerIcon: <Cog6ToothIcon></Cog6ToothIcon>,
    items: [
      {
        icon: <PencilIcon></PencilIcon>,
        label: 'Edit',
      },
      {
        icon: <DocumentDuplicateIcon></DocumentDuplicateIcon>,
        label: 'Duplicate',
      },
      {
        icon: <ArchiveBoxIcon></ArchiveBoxIcon>,
        label: 'Archive',
      },
      {
        icon: <ArrowTopRightOnSquareIcon></ArrowTopRightOnSquareIcon>,
        label: 'Move',
      },
      {
        icon: <TrashIcon></TrashIcon>,
        label: 'Delete',
      },
    ],
    fullWidth: false,
    disabled: false,
    rightIcon: true,
  },
}
