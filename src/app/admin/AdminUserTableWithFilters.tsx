import AdminUserTable from '@/components/admin-user-table'
import AdminUserTableSearchFilters from '@/components/admin-user-table-search-filters'
import * as React from 'react'

export default function AdminUserTableWithFilters() {
  const [search, setSearch] = React.useState('')
  const [department, setDepartment] = React.useState('All')
  const [status, setStatus] = React.useState('All')

  // TODO: Filter logic for AdminUserTable based on search, department, status

  return (
    <>
      <div className='mb-4'>
        <AdminUserTableSearchFilters
          search={search}
          department={department}
          status={status}
          onSearch={setSearch}
          onDepartmentChange={setDepartment}
          onStatusChange={setStatus}
        />
      </div>
      <div>
        <AdminUserTable
          search={search}
          department={department}
          status={status}
        />
      </div>
    </>
  )
}
