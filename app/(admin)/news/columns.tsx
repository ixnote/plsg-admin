'use client';

import { ColumnDef } from '@tanstack/react-table';

export type News = {
  id: string;
  headline: string;
  sections: string;
  is_posted: boolean;
};

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: 'headline',
    header: 'Headline',
  },
  {
    accessorKey: 'sections',
    header: 'Sections',
  },
  {
    accessorKey: 'is_posted',
    header: () => <div className='text-right'>published</div>,
    cell: ({ row }) => {
      const published = row.getValue('is_posted');
      return published ? (
        <div className='flex justify-end'>
          <div className='flex justify-center items-center text-xs bg-green-200 text-green-500 p-2 rounded-lg w-28'>
            published
          </div>
        </div>
      ) : (
        <div className='flex justify-end'>
          <div className='flex justify-center items-center  text-xs bg-gray-200 text-gray-500 p-2 rounded-lg w-28'>
            Draft
          </div>
        </div>
      );
    },
  },
];
