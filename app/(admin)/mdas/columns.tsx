'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Mdas = {
  id: string;
  name: string;
  email: string;
  // director: string;
  location: string;

  status: 'draft' | 'suspended' | 'published';
};

export const columns: ColumnDef<Mdas>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  // {
  //   accessorKey: 'director',
  //   header: 'Director',
  // },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },

  {
    accessorKey: 'status',
    header: 'Status',
  },
];
