import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <div className='flex flex-col w-full h-full p-6 gap-4'>
      <div className='flex flex-col gap-2 w-full'>
        <Skeleton className=' h-6 w-[250px]' />
        <Skeleton className='h-4 w-[400px]' />
      </div>
      <div className='flex w-full justify-between gap-3'>
        <Skeleton className='h-[125px] w-full rounded-xl' />
        <Skeleton className='h-[125px] w-full rounded-xl' />
        <Skeleton className='h-[125px] w-full rounded-xl' />
        <Skeleton className='h-[125px] w-full rounded-xl' />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
