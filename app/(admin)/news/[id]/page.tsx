'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetOneNewsQuery } from '@/redux/services/news/news-api';
import { ArrowLeftIcon } from 'lucide-react';
import NewsInfoSection from '../../components/news/NewsInfoSection';
import SectionInfoSection from '../../components/news/SectionInfoSection';
const UpdateNews = () => {
  const params = useParams();
  const router = useRouter();

  const { data, error, isLoading } = useGetOneNewsQuery(
    { id: params.id },
    {
      skip: !params?.id,
    }
  );

  const handleGoBack = () => {
    router.back();
  };

  // return <div>{data && <div>{data.data.headline}</div>}</div>;
  return (
    <div className='flex w-full h-full p-6'>
      <div className='flex flex-col w-full gap-6'>
        <div
          className='flex gap-3 items-center cursor-pointer'
          onClick={handleGoBack}
        >
          <ArrowLeftIcon />
          <h1 className='text-2xl font-geistsans font-semibold'>Update News</h1>
        </div>
        <div className='flex w-full gap-3'>
          <NewsInfoSection data={data} />
          <SectionInfoSection data={data} />
        </div>
      </div>
    </div>
  );
};

export default UpdateNews;
