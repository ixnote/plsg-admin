'use client';
import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useGetAllResourcesQuery } from '@/redux/services/resources/resources-api';
import LoadingSkeleton from '../components/dashboard/LoadingSkeleton';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [resourcesPagination, setResourcesPagination] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useGetAllResourcesQuery({
    page: currentPage,
    pageSize,
  });

  // console.log(resourcesPagination);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  useEffect(() => {
    // console.log("🚀 ~ Resources ~  ata:", data);
    if (data) {
      setResources(
        data?.data?.resources.map((item: any) => {
          return {
            id: item?.id,
            name: item?.name,
            main_topic_tag:
              item?.main_topic_tag?.name || 'Main Topic Tag not set',
            main_type_tag: item?.main_type_tag?.name || 'Main Type Tag not set',
          };
        })
      );
      setResourcesPagination(data);
    }
  }, [data]);

  return (
    <div className='flex w-full h-full p-6 overflow-y-scroll'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-2xl font-semibold font-oswald'>Articles</h1>
        <div className='flex w-full'>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={resources}
              isLoading={isLoading}
              pagination={resourcesPagination?.data?.pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
