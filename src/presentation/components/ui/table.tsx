import * as React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function Table<T extends { [key: string]: any }>({ columns, data }: TableProps<T>) {
  return (
    <div className='rounded-md border'>
      <table className='w-full text-sm'>
        <thead className='bg-gray-100'>
          <tr>
            {columns.map((col) => (
              <th key={col.header} className='px-4 py-2 border-b font-semibold text-left'>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i} className='hover:bg-gray-50'>
                {columns.map((col) => (
                  <td key={col.header} className='px-4 py-2 border-b'>
                    {col.cell ? col.cell(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className='px-4 py-2 text-center' colSpan={columns.length}>
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
