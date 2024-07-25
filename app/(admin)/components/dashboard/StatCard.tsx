import React from 'react';

const StatCard = ({ title, amount, desc, Icon }: any) => {
  return (
    <div className='flex items-center justify-center p-6 border-gray-200 border-[1px] rounded-xl min-w-[200px] shadow-md'>
      <div className='flex flex-col gap-2'>
        <div className='flex w-full justify-between'>
          <h1 className='font-geistsans font-semibold text-sm'>
            {title ?? 'Total Users'}
          </h1>
          {Icon && <Icon className='w-7 h-7' />}
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold'>{amount ?? 250}</h1>
          <p className='text-xs text-gray-500'>
            {desc ?? 'Number of user using the system'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
