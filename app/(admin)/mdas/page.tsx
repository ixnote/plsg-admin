'use client';
import React, { useEffect, useState } from 'react';
import { columns, Mdas } from './columns';
import { DataTable } from './data-table';
import { useGetAllMdasQuery } from '@/redux/services/mdas/mdas-api';

const MDAs = () => {
  const [mdas, setMdas] = useState([]);

  const { data, isLoading } = useGetAllMdasQuery();

  useEffect(() => {
    if (data) {
      setMdas(
        data?.data?.mdas.map((item: any) => {
          return {
            id: item?.id,
            name: item?.name,
            director: item?.director?.name || 'No director provided',
            location: item?.contact?.location || 'No contact provided',
            phone: item?.contact?.phone_number || 'No phone number provided',
            email: item?.contact?.email || 'No email provided',
            status: item?.published ? 'Published' : 'Draft',
          };
        })
      );
    }
  }, [data]);

  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-2xl font-geistsans font-semibold'>
          Ministries, Departments and Agencies
        </h1>
        <div className='flex w-full'>
          {mdas && (
            <DataTable columns={columns} data={mdas} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MDAs;
