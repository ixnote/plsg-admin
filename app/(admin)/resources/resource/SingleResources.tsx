'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '../../components/Loader';
import ResourceInfoSection from '../../components/resources/ResourceInfoSection';
import { useGetOneResourceQuery } from '@/redux/services/resources/resources-api';
import LoadingSkeleton from '../../components/dashboard/LoadingSkeleton';

const SingleResources = ({id}:any) => {
    const router = useRouter();

    const { data, error, isLoading } = useGetOneResourceQuery(
        { id: id },
        {
            skip: !id,
        }
    );

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className='flex w-full h-full p-6 overflow-y-scroll'>
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className='flex flex-col w-full gap-6'>
                    <div className='flex w-full items-center justify-between'>
                        <div
                            className='flex gap-3 items-center cursor-pointer'
                            onClick={handleGoBack}
                        >
                            <ArrowLeftIcon />
                            <h1 className='text-2xl font-geistsans font-semibold'>
                                Update Resource
                            </h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-center w-full  gap-3'>
                        <ResourceInfoSection data={data} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleResources;
