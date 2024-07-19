'use client';
import React, { useEffect, useState } from 'react';
import { columns, News } from './columns';
import { DataTable } from './data-table';
import { useGetAllNewsQuery } from '@/redux/services/news/news-api';

async function getData(): Promise<News[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ];
}

const NewsPage = () => {
  const [news, setNews] = useState([]);

  const { data, isLoading } = useGetAllNewsQuery();

  console.log(data);

  useEffect(() => {
    if (data) {
      setNews(data);
    }
  }, [news, data]);

  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-4xl font-geistsans font-semibold'>News</h1>
        <div className='flex w-full'>
          {news && (
            <DataTable columns={columns} data={news} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
