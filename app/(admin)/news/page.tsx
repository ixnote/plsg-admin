import React from 'react';
import { columns, News } from './columns';
import { DataTable } from './data-table';

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

const NewsPage = async () => {
  const data = await getData();
  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-4xl font-geistsans font-semibold'>News</h1>
        <div className='flex w-full'>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
