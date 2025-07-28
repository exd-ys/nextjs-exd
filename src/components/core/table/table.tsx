import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const tableVariants = cva('', {
  variants: {},
  defaultVariants: {},
})

interface TableProps<T> extends VariantProps<typeof tableVariants> {
  items: T[]
  customColumn?: string
  children?: (item: T, index: number) => ReactNode
}

const Table: React.FC<TableProps<any>> = ({
  items,
  customColumn,
  children,
  ...props
}) => {
  type Headers = keyof any

  return (
    <div className='overflow-x-auto overflow-y-hidden'>
      <table className='h-fit w-full border-collapse rounded-md bg-secondary-white shadow-md'>
        <thead>
          <tr>
            {Object.keys(items[0]).map((header, index) => (
              <th
                key={index}
                className='px-4 py-4 text-left text-base font-bold text-secondary-400'
              >
                {camelCaseToWords(header)}
              </th>
              // TODO: sort icon button here
            ))}
            {!!children && !!customColumn && (
              <th className='px-4 py-4 text-left text-base font-bold text-secondary-400'>
                {customColumn}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {Object.keys(item).map((key, keyIndex) => (
                <td
                  key={keyIndex}
                  className='border-b border-secondary-100 px-4 py-4 text-base'
                >
                  {item[key as Headers]}
                </td>
              ))}
              {!!children && !!customColumn && (
                <td className='border-b border-secondary-100 px-4 py-4 text-base'>
                  <div className='inline-flex h-9 items-center justify-start gap-2.5'>
                    {children(item, itemIndex)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot className=''>
          <tr>
            <td className='p-4'>I am a footer</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table

// TODO: put somewhere else for reusability
function camelCaseToWords(input: string): string {
  const words = input.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return capitalizedWords.join(' ')
}
