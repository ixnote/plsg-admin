'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useGetAllUsersQuery } from '@/redux/services/users/user-api';

const UsersPage = () => {
  const [users, setUsers] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, refetch } = useGetAllUsersQuery({
    page: currentPage,
    pageSize,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleUserCreated = () => {
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    console.log(size);

    setPageSize(size);
  };

  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-2xl font-semibold font-oswald'>Users</h1>
        <div className='flex w-full justify-between'></div>
        <div className='flex w-full'>
          {users?.data?.users && (
            <DataTable
              columns={columns}
              data={users.data.users}
              isLoading={isLoading}
              pagination={users.data.pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onUserCreated={handleUserCreated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
