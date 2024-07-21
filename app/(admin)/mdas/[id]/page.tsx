'use client';
import React from 'react';
import StepperForm from '../../components/mdas/StepperForm';
import { ArrowLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useGetOneMdaQuery } from '@/redux/services/mdas/mdas-api';

const UpdateNews = () => {
  const params = useParams();
  const router = useRouter();

  const { data, error, isLoading } = useGetOneMdaQuery(
    { id: params.id },
    {
      skip: !params?.id,
    }
  );

  console.log(data);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      {data && (
        <div className='flex flex-col px-20 gap-10'>
          <div className='flex flex-col gap-4'>
            <div className='flex w-full items-center justify-between'>
              <div
                className='flex gap-3 items-center cursor-pointer'
                onClick={handleGoBack}
              >
                <ArrowLeftIcon />
                <h1 className='text-2xl font-geistsans font-semibold'>
                  Edit MDA
                </h1>
              </div>
            </div>
            <h1>{data.data.name}</h1>
          </div>
          <StepperForm />
        </div>
      )}
    </>
  );
};

export default UpdateNews;
