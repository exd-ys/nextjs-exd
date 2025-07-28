'use client'

import Button from '@/components/core/button/button'
import Card from '@/components/core/card/card'
import CheckBox from '@/components/core/checkbox/checkbox'
import SideNav from '@/components/core/nav/side-nav/side-nav'
import TopNav from '@/components/core/nav/top-nav/top-nav'
import Table from '@/components/core/table/table'
import TextArea from '@/components/core/textarea/textarea'
import TextField from '@/components/core/textfield/textfield'
import {
  BellIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Metadata, NextPage } from 'next'

interface Props {}

export const metadata: Metadata = {
  title: 'Home',
}

const Home: NextPage<Props> = () => {
  return (
    <div className='min-height-screen relative flex'>
      <SideNav
        items={[
          {
            label: 'Dashboard',
            children: <Squares2X2Icon></Squares2X2Icon>,
            selected: true,
          },
          {
            label: 'Profile',
            children: <UserIcon></UserIcon>,
          },
          {
            label: 'Settings',
            children: <Cog6ToothIcon></Cog6ToothIcon>,
          },
          {
            label: 'Notifications',
            children: <BellIcon></BellIcon>,
          },
        ]}
        logoPath={'images/img-logo-colored.svg'}
      />

      <div className='flex-1'>
        <TopNav page={'Dashboard'} />

        <main className='flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-100 p-6 sm:w-full'>
          <div className=' grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
            <Card
              theme='vertical'
              title='Noteworthy technology acquisitions 2021'
              body='Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
            ></Card>
            <Card
              theme='vertical'
              title='Noteworthy technology acquisitions 2021'
              body='Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
            ></Card>
            <Card
              theme='vertical'
              title='Noteworthy technology acquisitions 2021'
              body='Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
            ></Card>
            <Card
              theme='vertical'
              title='Noteworthy technology acquisitions 2021'
              body='Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
            ></Card>
          </div>

          <div>
            <Table
              customColumn='Actions'
              items={[
                {
                  entry: 'BARTOLUCCI; Silvia et al.',
                  matter: 'DISTRIBUTED ELECTRONIC LEDGER WITH METADATA',
                  requestedBy: '08 Aug 2023 - 13:06',
                  status: 'Active',
                  taskId: 'US-20230244656',
                  test: 'active',
                },
                {
                  entry: 'BARTOLUCCI; Silvia et al.',
                  matter: 'DISTRIBUTED ELECTRONIC LEDGER WITH METADATA',
                  requestedBy: '08 Aug 2023 - 13:06',
                  status: 'Inactive',
                  taskId: 'US-20230244656-A1',
                  test: 'active',
                },
                {
                  entry: 'BARTOLUCCI; Silvia et al.',
                  matter: 'DISTRIBUTED ELECTRONIC LEDGER WITH METADATA',
                  requestedBy: '08 Aug 2023 - 13:06',
                  status: 'Inactive',
                  taskId: 'US-20230244656-A1',
                  test: 'active',
                },
              ]}
            >
              {(item, index) => (
                <>
                  <PencilSquareIcon
                    className='relative h-6 w-6'
                    onClick={() =>
                      console.log(
                        `PencilSquareIcon clicked for item ${index + 1}: ${
                          item.taskId
                        }`
                      )
                    }
                  />
                  <Button
                    buttontype={'button'}
                    label='Badges'
                    onClick={() =>
                      console.log(
                        `Badges Button clicked for item ${index + 1}: ${
                          item.taskId
                        }`
                      )
                    }
                  />
                  <Button
                    buttontype={'button'}
                    label='Delete'
                    onClick={() =>
                      console.log(
                        `Delete Button clicked for item ${index + 1}: ${
                          item.taskId
                        }`
                      )
                    }
                  />
                </>
              )}
            </Table>
          </div>

          <div className='components grid grid-cols-1 gap-4 py-8 sm:grid-cols-4'>
            <Button
              theme='primary'
              label='Cool Button'
              leftIcon
              size='md'
              buttontype={'button'}
            >
              <Squares2X2Icon></Squares2X2Icon>
            </Button>

            <CheckBox theme='primary' label='Checkbox 1' nolabel={false} />
            <TextField
              label={'Text field'}
              placeholder={'Enter text here'}
              fullWidth
              name={'textfield'}
              value={''}
              onChange={() => {}}
            />
            <TextArea
              label={'test'}
              placeholder={'test'}
              icon={undefined}
              fullWidth
              value={''}
              onChange={() => {}}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
