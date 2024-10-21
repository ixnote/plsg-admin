'use client';
import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useGetOneMdaQuery } from '@/redux/services/mdas/mdas-api';
import StepperFormPage from '../../components/mdas/StepperForm';

const SingleMDAs = () => {
    const params = useParams();
    const router = useRouter();

    const { data, error, isLoading } = useGetOneMdaQuery(
        { id: params.id },
        {
            skip: !params?.id,
        }
    );

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            {data && (
                <div className='flex flex-col  gap-10 h-full overflow-y-scroll p-10'>
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
                    <StepperFormPage data={data.data} />
                </div>
            )}
        </>
    );
};

export default SingleMDAs;
