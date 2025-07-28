import { PencilSquareIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import Button from '../button/button'
import Table from './table'

const meta = {
  title: 'Components/Core/Table',
  component: Table,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'object' },
  },
  args: {
    customColumn: 'Actions',
    children: (item: any, index: number) => (
      <>
        <PencilSquareIcon
          className='relative h-6 w-6'
          onClick={() =>
            console.log(
              `PencilSquareIcon clicked for item ${index + 1}: ${item.taskId}`
            )
          }
        />
        <Button
          label='Badges'
          buttontype={'button'}
          onClick={(): void => {
            console.log(
              `Badges Button clicked for item ${index + 1}: ${item.taskId}`
            )
          }} 
        />
        <Button
          label='Delete'
          buttontype={'button'} 
          onClick={(): void => {
            console.log(
              `Delete Button clicked for item ${index + 1}: ${item.taskId}`
            )
          }}
        />
      </>
    ),
    items: [
      {
        taskId: 'US-20230244656',
        matter: 'DISTRIBUTED ELECTRONIC LEDGER WITH METADATA',
        entry: 'BARTOLUCCI; Silvia et al.',
        requestedBy: '08 Aug 2023 - 13:06',
      },
      {
        taskId: 'US-20230244656-A1',
        matter: 'DISTRIBUTED ELECTRONIC LEDGER WITH METADATA',
        entry: 'BARTOLUCCI; Silvia et al.',
        requestedBy: '08 Aug 2023 - 13:06',
      },
    ],
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Dfault: Story = {}
