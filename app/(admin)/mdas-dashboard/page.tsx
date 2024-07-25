'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import { Rss, SquareLibrary, Users } from 'lucide-react';
import { useGetAllNewsQuery } from '@/redux/services/news/news-api';
import { columns } from '../news/columns';
import { DataTable } from './data-table';
import { useGetMdasDashboardQuery } from '@/redux/services/mdas/mdas-api';

const MDASDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [news, setNews] = useState([]);

  const { data, isLoading } = useGetAllNewsQuery({
    page: currentPage,
    pageSize,
  });

  const { data: mdasDashboardData } = useGetMdasDashboardQuery({});
  console.log(mdasDashboardData);

  useEffect(() => {
    if (data) {
      const res = data.data.news.map((item: any) => ({
        id: item.id,
        headline: item.headline,
        sections: item.newsSections.length,
        is_posted: item.is_posted,
      }));
      setNews(res);
    }
  }, [data]);
  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-2xl font-geistsans font-semibold'>Dashboard</h1>
        <div className='grid grid-flow-row grid-cols-4 gap-4'>
          <StatCard
            title={'Total news'}
            desc='Number of news using the system'
            amount={5}
            Icon={Rss}
          />
          <StatCard
            title='Total resource'
            desc='Number of resource on the system'
            amount={500}
            Icon={SquareLibrary}
          />
          <StatCard
            title='team members'
            desc='Number of team members on the system'
            amount={300}
            Icon={Users}
          />
          <StatCard
            title='number of users'
            desc='Number of users on the system'
            amount={400}
            Icon={Users}
          />
        </div>

        <h1 className='text-2xl font-geistsans font-semibold'>Recent News</h1>
        <div className='flex w-full'>
          <DataTable columns={columns} data={news} isLoading={isLoading} />
        </div>

        <h1 className='text-2xl font-geistsans font-semibold'>
          Recent Resource
        </h1>
        <div className='flex w-full'>
          {/* <DataTable columns={columns} data={news} isLoading={isLoading} /> */}
        </div>
      </div>
    </div>
  );
};

export default MDASDashboard;
