/* eslint-disable @next/next/no-img-element */
import {
  EyeIcon,
  LockClosedIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/20/solid'
import type { Meta, StoryObj } from '@storybook/react'
import Button from '../button/button'
import TextField from '../textfield/textfield'
import Grid from './grid'

const meta = {
  title: 'Components/Core/Grid',
  component: Grid,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['col1', 'col2', 'col3'],
    },
  },
  args: {
    theme: 'col1',
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryGrid: Story = {
  args: {
    theme: 'col1',
    children: (
      <>
        <Grid theme='col2'>
          <img
            className='mx-auto my-6 h-16 w-auto'
            src='static/media/public/images/img-logo-colored.svg'
            alt='logo'
          />
          <TextField
            name='username'
            errorMessage='Error message here'
            theme='default'
            label='Username'
            leftIcon
            lefticonblock={<UserIcon />}
            placeholder='Enter username here...'
            rightIcon
            righticonblock={<PencilSquareIcon />} 
            value={''} 
            onChange={(): void => {}}
          />
          <TextField
            name='password'
            errorMessage='Error message here'
            theme='active'
            label='Password'
            leftIcon
            lefticonblock={<LockClosedIcon />}
            placeholder='Password'
            rightIcon
            righticonblock={<EyeIcon />} 
            value={''} 
            onChange={(): void => {}}          
          />
          <Button
            buttontype='button'
            fullWidth
            theme='primary'
            label='Button'
            leftIcon
            size='lg'
          >
            <Squares2X2Icon />
          </Button>
        </Grid>
      </>
    ),
  },
}
