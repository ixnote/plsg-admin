'use client';

import React, { useEffect, useState } from 'react';
import { useGetAGovernmentQuery } from '@/redux/services/government/government-api';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import LegislativeCard from '../../components/government/LegislativeCard';

const SingleGovernment = ({id}: any) => {
    const [members, setMembers] = useState<any>([]);
    const [executives, setExecutives] = useState<any>([]);
    const { data } = useGetAGovernmentQuery({ governmentId: id });
    const { push } = useRouter();

    useEffect(() => {
        if (data) {
            setMembers(data?.data?.members);
            setExecutives(data?.data?.executives);
        }
    }, [data]);

    return (
        <div className='flex w-full h-full p-6 overflow-y-scroll scrollbar-hide'>
            <div className='flex flex-col w-full gap-6'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold font-oswald'>Governor</h1>

                    {/* <Button
            className='w-full sm:w-fit'
            onClick={() => {
              push(`/governments/update/${id}`);
            }}
          >
            Update Government
          </Button> */}
                </div>
                <div className='flex w-full h-full'>
                    <LegislativeCard />
                    {/* <DataTable columns={columns} data={members} isLoading={false} /> */}
                </div>
                <h1 className='text-2xl font-semibold font-oswald'>
                    Government Executives
                </h1>
                <div className='flex w-full h-full'>
                    <LegislativeCard />
                    {/* <DataTable columns={columns} data={executives} isLoading={false} /> */}
                </div>
                <h1 className='text-2xl font-semibold font-oswald'>
                    Government Members
                </h1>
                <div className='flex w-full h-full'>
                    <LegislativeCard />
                    {/* <DataTable columns={columns} data={executives} isLoading={false} /> */}
                </div>
            </div>
        </div>
    );
};

export default SingleGovernment;
